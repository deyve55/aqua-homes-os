const LAST_OPENED_MODULE_KEY = "aquaHomes.lastOpenedModule";
const DEMO_DATA_KEY = "aquaHomes.structuredDemoData";

const modules = [
  {
    name: "Projects",
    description: "Track active builds, milestones, and next actions across Aqua Homes projects.",
  },
  {
    name: "Receipts",
    description: "Collect job receipts and keep spend details ready for review.",
  },
  {
    name: "Payroll Prep",
    description: "Stage crew hours, notes, and payroll handoff items before processing.",
  },
  {
    name: "Accounting Review",
    description: "Review financial checkpoints, reconciliations, and open accounting questions.",
  },
  {
    name: "Maintenance + HVAC",
    description: "Monitor service items, HVAC follow-ups, and recurring maintenance needs.",
  },
  {
    name: "Inventory / Tools",
    description: "Keep lightweight visibility into tools, supplies, and inventory requests.",
  },
  {
    name: "Field Walkthrough",
    description: "Capture walkthrough notes, punch items, and jobsite observations.",
  },
  {
    name: "Aquabona Investor Portal",
    description: "Open a simple hub for investor updates, documents, and AquaBona context.",
  },
  {
    name: "Bug Capture",
    description: "Log product issues, UI notes, and starter shell improvement ideas.",
  },
];

const demoDefaults = {
  projects: [
    {
      name: "Canal House Retrofit",
      status: "Active",
      budget: "185000",
    },
  ],
  receipts: [
    {
      vendor: "Harbor Supply",
      project: "Canal House Retrofit",
      amount: "742.18",
      status: "Needs Review",
    },
  ],
  maintenancePlusHvac: [
    {
      request: "Replace upstairs return filter",
      priority: "Medium",
      status: "Queued",
    },
  ],
  inventoryTools: [
    {
      name: "Laser Level",
      tag: "AH-204",
      holder: "Mia",
      status: "Checked Out",
    },
  ],
  bugCapture: [
    {
      title: "Tighten mobile spacing on project card",
      notes: "Check the dashboard cards after the next prototype pass.",
    },
  ],
};

const demoModules = {
  projects: {
    storageKey: "projects",
    eyebrow: "Demo project log",
    submitLabel: "Save Project",
    fields: [
      { name: "name", label: "Project name", placeholder: "Poolside Residence", required: true },
      { name: "status", label: "Status", placeholder: "Active", required: true },
      { name: "budget", label: "Budget", placeholder: "250000", type: "number", required: true },
    ],
    empty: "No demo projects yet.",
    format: (item) => ({
      title: item.name,
      meta: `${item.status} · ${formatCurrency(item.budget)}`,
    }),
  },
  receipts: {
    storageKey: "receipts",
    eyebrow: "Demo receipt inbox",
    submitLabel: "Save Receipt",
    fields: [
      { name: "vendor", label: "Vendor", placeholder: "Harbor Supply", required: true },
      { name: "project", label: "Project", placeholder: "Canal House Retrofit", required: true },
      { name: "amount", label: "Amount", placeholder: "742.18", type: "number", required: true },
      { name: "status", label: "Review status", placeholder: "Needs Review", required: true },
    ],
    empty: "No demo receipts yet.",
    format: (item) => ({
      title: item.vendor,
      meta: `${item.project} · ${formatCurrency(item.amount)} · ${item.status}`,
    }),
  },
  maintenancePlusHvac: {
    storageKey: "maintenancePlusHvac",
    eyebrow: "Demo service board",
    submitLabel: "Save Service Request",
    fields: [
      { name: "request", label: "Service request", placeholder: "Inspect air handler", required: true },
      { name: "priority", label: "Priority", placeholder: "High", required: true },
      { name: "status", label: "Dispatch status", placeholder: "Dispatched", required: true },
    ],
    empty: "No demo service requests yet.",
    format: (item) => ({
      title: item.request,
      meta: `${item.priority} priority · ${item.status}`,
    }),
  },
  inventoryTools: {
    storageKey: "inventoryTools",
    eyebrow: "Demo tool tracker",
    submitLabel: "Save Tool / Item",
    fields: [
      { name: "name", label: "Tool / item name", placeholder: "Hammer Drill", required: true },
      { name: "tag", label: "Tag", placeholder: "AH-312", required: true },
      { name: "holder", label: "Holder", placeholder: "Jordan", required: true },
      { name: "status", label: "Checkout status", placeholder: "Checked Out", required: true },
    ],
    empty: "No demo tools or inventory yet.",
    format: (item) => ({
      title: item.name,
      meta: `${item.tag} · ${item.holder} · ${item.status}`,
    }),
  },
  bugCapture: {
    storageKey: "bugCapture",
    eyebrow: "Demo bug notes",
    submitLabel: "Save Bug",
    fields: [
      { name: "title", label: "Bug title", placeholder: "Navigation label wraps", required: true },
      { name: "notes", label: "Notes", placeholder: "Add context or steps to reproduce", required: true },
    ],
    empty: "No demo bugs yet.",
    format: (item) => ({
      title: item.title,
      meta: item.notes,
    }),
  },
};

const navButtons = document.querySelectorAll(".bottom-nav button");
const cardGrid = document.querySelector("[data-module-grid]");
const detailPanel = document.querySelector("[data-module-detail]");
const detailTitle = document.querySelector("[data-module-title]");
const detailDescription = document.querySelector("[data-module-description]");
const detailClose = document.querySelector("[data-module-close]");
const detailDemo = document.querySelector("[data-module-demo]");
const resetDemoData = document.querySelector("[data-reset-demo]");

let demoData = loadDemoData();
let activeModule = null;

const getModuleId = (name) =>
  name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(value) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function readLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Keep the shell usable if localStorage is unavailable.
  }
}

function cloneDemoDefaults() {
  return JSON.parse(JSON.stringify(demoDefaults));
}

function loadDemoData() {
  const storedData = readLocalStorage(DEMO_DATA_KEY);

  if (!storedData) {
    return cloneDemoDefaults();
  }

  try {
    return {
      ...cloneDemoDefaults(),
      ...JSON.parse(storedData),
    };
  } catch (error) {
    return cloneDemoDefaults();
  }
}

function saveDemoData() {
  writeLocalStorage(DEMO_DATA_KEY, JSON.stringify(demoData));
}

const saveLastOpenedModule = (moduleId) => {
  writeLocalStorage(LAST_OPENED_MODULE_KEY, moduleId);
};

const getLastOpenedModule = () => readLocalStorage(LAST_OPENED_MODULE_KEY);

const setActiveModuleCard = (moduleId) => {
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.moduleId === moduleId);
  });
};

function getDemoCount(moduleId) {
  const demoModule = demoModules[moduleId];

  if (!demoModule) {
    return 0;
  }

  return demoData[demoModule.storageKey]?.length ?? 0;
}

function renderDemoList(moduleId) {
  const demoModule = demoModules[moduleId];
  const items = demoData[demoModule.storageKey] ?? [];
  const list = detailDemo.querySelector("[data-demo-list]");

  if (!items.length) {
    list.innerHTML = `<li class="demo-empty">${demoModule.empty}</li>`;
    return;
  }

  list.innerHTML = items
    .map((item) => {
      const formattedItem = demoModule.format(item);

      return `
        <li>
          <strong>${escapeHtml(formattedItem.title)}</strong>
          <span>${escapeHtml(formattedItem.meta)}</span>
        </li>
      `;
    })
    .join("");
}

function renderDemoModule(moduleId) {
  const demoModule = demoModules[moduleId];

  if (!demoModule) {
    detailDemo.hidden = true;
    detailDemo.replaceChildren();
    return;
  }

  const fields = demoModule.fields
    .map(
      (field) => `
        <label>
          <span>${field.label}</span>
          <input
            name="${field.name}"
            type="${field.type ?? "text"}"
            placeholder="${field.placeholder}"
            ${field.required ? "required" : ""}
          />
        </label>
      `,
    )
    .join("");

  detailDemo.hidden = false;
  detailDemo.innerHTML = `
    <div class="demo-header">
      <div>
        <p class="eyebrow">${demoModule.eyebrow}</p>
        <h4>${getDemoCount(moduleId)} saved</h4>
      </div>
      <button type="button" class="ghost-button" data-reset-demo>Reset demo data</button>
    </div>
    <form class="demo-form" data-demo-form>
      ${fields}
      <button type="submit">${demoModule.submitLabel}</button>
    </form>
    <ul class="demo-list" data-demo-list></ul>
  `;

  detailDemo.querySelector("[data-demo-form]").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextItem = Object.fromEntries(
      demoModule.fields.map((field) => [field.name, String(formData.get(field.name) ?? "").trim()]),
    );

    demoData[demoModule.storageKey] = [nextItem, ...(demoData[demoModule.storageKey] ?? [])];
    saveDemoData();
    event.currentTarget.reset();
    renderModules();
    renderDemoModule(moduleId);
  });

  detailDemo.querySelector("[data-reset-demo]").addEventListener("click", resetAllDemoData);
  renderDemoList(moduleId);
}

const openModuleDetail = (module) => {
  const moduleId = getModuleId(module.name);

  activeModule = module;
  detailTitle.textContent = module.name;
  detailDescription.textContent = module.description;
  detailPanel.hidden = false;
  setActiveModuleCard(moduleId);
  renderDemoModule(moduleId);
  saveLastOpenedModule(moduleId);
};

const closeModuleDetail = () => {
  activeModule = null;
  detailPanel.hidden = true;
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.remove("active");
  });
};

const renderModules = () => {
  const fragment = document.createDocumentFragment();

  modules.forEach((module, index) => {
    const moduleId = getModuleId(module.name);
    const demoCount = getDemoCount(moduleId);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "brain-card";
    card.dataset.moduleId = moduleId;
    card.setAttribute("aria-label", `Open ${module.name} module`);
    card.innerHTML = `
      <span class="card-icon">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-title">${module.name}</span>
      <span class="card-copy">${module.description}</span>
      ${demoCount ? `<span class="card-count">${demoCount} demo saved</span>` : ""}
    `;
    card.addEventListener("click", () => openModuleDetail(module));
    fragment.appendChild(card);
  });

  cardGrid.replaceChildren(fragment);

  if (activeModule) {
    setActiveModuleCard(getModuleId(activeModule.name));
  }
};

function resetAllDemoData() {
  demoData = cloneDemoDefaults();
  saveDemoData();
  renderModules();

  if (activeModule) {
    renderDemoModule(getModuleId(activeModule.name));
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

detailClose.addEventListener("click", closeModuleDetail);
resetDemoData.addEventListener("click", resetAllDemoData);

renderModules();

const lastOpenedModule = modules.find((module) => getModuleId(module.name) === getLastOpenedModule());

if (lastOpenedModule) {
  openModuleDetail(lastOpenedModule);
}
