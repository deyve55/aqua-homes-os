const LAST_OPENED_MODULE_KEY = "aquaHomes.lastOpenedModule";
const DEMO_DATA_KEY = "aquaHomes.structuredDemoData";
const RECENT_ACTIVITY_KEY = "aquaHomes.structuredRecentActivity";
const MAX_RECENT_ACTIVITY = 10;

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

const dashboardSummaryItems = [
  {
    label: "Active Projects",
    storageKey: "projects",
    helper: "Projects marked active",
    getCount: (items) => items.filter((item) => item.status?.toLowerCase() === "active").length,
  },
  {
    label: "Receipts Review",
    storageKey: "receipts",
    helper: "Receipts needing review",
    getCount: (items) => items.filter((item) => item.status?.toLowerCase().includes("review")).length,
  },
  {
    label: "Maintenance / HVAC",
    storageKey: "maintenancePlusHvac",
    helper: "Open service requests",
  },
  {
    label: "Inventory / Tools",
    storageKey: "inventoryTools",
    helper: "Tracked items",
  },
  {
    label: "Bug Reports",
    storageKey: "bugCapture",
    helper: "Captured product notes",
  },
];

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
const dashboardSummary = document.querySelector("[data-dashboard-summary]");
const aiInsightsList = document.querySelector("[data-ai-insights]");
const refreshInsights = document.querySelector("[data-refresh-insights]");
const aiInsightsUpdated = document.querySelector("[data-ai-insights-updated]");
const activityList = document.querySelector("[data-activity-list]");
const clearActivity = document.querySelector("[data-clear-activity]");
const cardGrid = document.querySelector("[data-module-grid]");
const detailPanel = document.querySelector("[data-module-detail]");
const detailTitle = document.querySelector("[data-module-title]");
const detailDescription = document.querySelector("[data-module-description]");
const detailClose = document.querySelector("[data-module-close]");
const detailDemo = document.querySelector("[data-module-demo]");
const backupJson = document.querySelector("[data-backup-json]");
const backupStatus = document.querySelector("[data-backup-status]");
const exportDemoData = document.querySelector("[data-export-demo]");
const importDemoData = document.querySelector("[data-import-demo]");
const backupResetDemoData = document.querySelector("[data-backup-reset]");
const resetDemoData = document.querySelector("[data-reset-demo]");

let demoData = loadDemoData();
let recentActivity = loadRecentActivity();
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

function normalizeDemoData(value) {
  const source = value?.demoData && typeof value.demoData === "object" ? value.demoData : value;
  const defaults = cloneDemoDefaults();

  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }

  return Object.fromEntries(
    Object.keys(defaults).map((key) => [key, Array.isArray(source[key]) ? source[key] : defaults[key]]),
  );
}

function normalizeRecentActivity(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      id: String(entry.id ?? `${Date.now()}-${Math.random()}`),
      module: String(entry.module ?? "Demo Data"),
      title: String(entry.title ?? "Saved demo entry"),
      meta: String(entry.meta ?? ""),
      createdAt: String(entry.createdAt ?? new Date().toISOString()),
    }))
    .slice(0, MAX_RECENT_ACTIVITY);
}

function loadRecentActivity() {
  const storedActivity = readLocalStorage(RECENT_ACTIVITY_KEY);

  if (!storedActivity) {
    return [];
  }

  try {
    return normalizeRecentActivity(JSON.parse(storedActivity));
  } catch (error) {
    return [];
  }
}

function saveRecentActivity() {
  writeLocalStorage(RECENT_ACTIVITY_KEY, JSON.stringify(recentActivity.slice(0, MAX_RECENT_ACTIVITY)));
}

function formatActivityTime(createdAt) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function renderRecentActivity() {
  clearActivity.disabled = recentActivity.length === 0;

  if (!recentActivity.length) {
    activityList.innerHTML = '<li class="activity-empty">No recent demo activity yet.</li>';
    return;
  }

  activityList.innerHTML = recentActivity
    .map(
      (entry) => `
        <li>
          <div>
            <strong>${escapeHtml(entry.module)} · ${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(entry.meta)}</span>
          </div>
          <span class="activity-time">${escapeHtml(formatActivityTime(entry.createdAt))}</span>
        </li>
      `,
    )
    .join("");
}

function addRecentActivity(moduleId, item) {
  const demoModule = demoModules[moduleId];

  if (!demoModule) {
    return;
  }

  const module = modules.find((candidate) => getModuleId(candidate.name) === moduleId);
  const formattedItem = demoModule.format(item);

  recentActivity = [
    {
      id: `${Date.now()}-${moduleId}`,
      module: module?.name ?? demoModule.eyebrow,
      title: formattedItem.title,
      meta: `Saved ${demoModule.submitLabel.replace(/^Save\s+/i, "").toLowerCase()} · ${formattedItem.meta}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function clearRecentActivity() {
  recentActivity = [];
  saveRecentActivity();
  renderRecentActivity();
}

function setBackupStatus(message) {
  backupStatus.textContent = message;
}

function refreshDemoViews() {
  renderModules();

  if (activeModule) {
    renderDemoModule(getModuleId(activeModule.name));
  }
}

function exportDemoDataAsJson() {
  backupJson.value = JSON.stringify(demoData, null, 2);
  backupJson.focus();
  backupJson.select();
  setBackupStatus("Demo data exported as JSON.");
}

function importDemoDataFromJson() {
  try {
    const importedData = normalizeDemoData(JSON.parse(backupJson.value));

    if (!importedData) {
      setBackupStatus("Import needs a JSON object from the demo data export.");
      return;
    }

    demoData = importedData;
    saveDemoData();
    refreshDemoViews();
    setBackupStatus("Demo data imported from pasted JSON.");
  } catch (error) {
    setBackupStatus("Import failed. Check that the pasted demo data is valid JSON.");
  }
}

function loadDemoData() {
  const storedData = readLocalStorage(DEMO_DATA_KEY);

  if (!storedData) {
    return cloneDemoDefaults();
  }

  try {
    return normalizeDemoData(JSON.parse(storedData)) ?? cloneDemoDefaults();
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

function getSummaryCount(summaryItem) {
  const items = demoData[summaryItem.storageKey] ?? [];

  return summaryItem.getCount ? summaryItem.getCount(items) : items.length;
}

function getInsightMessage(summaryItem) {
  const count = getSummaryCount(summaryItem);

  switch (summaryItem.storageKey) {
    case "projects":
      return `${count} active ${count === 1 ? "project is" : "projects are"} in the local demo project log.`;
    case "receipts":
      return `${count} ${count === 1 ? "receipt needs" : "receipts need"} review before office handoff.`;
    case "maintenancePlusHvac":
      return `${count} maintenance/HVAC ${count === 1 ? "request is" : "requests are"} saved for follow-up.`;
    case "inventoryTools":
      return `${count} inventory/tool ${count === 1 ? "record is" : "records are"} being tracked.`;
    case "bugCapture":
      return `${count} bug ${count === 1 ? "report is" : "reports are"} captured for the structured starter.`;
    default:
      return `${count} ${summaryItem.label.toLowerCase()} saved in demo storage.`;
  }
}

function renderAiInsights() {
  const fragment = document.createDocumentFragment();

  dashboardSummaryItems.forEach((summaryItem) => {
    const insight = document.createElement("li");
    insight.textContent = getInsightMessage(summaryItem);
    fragment.appendChild(insight);
  });

  aiInsightsList.replaceChildren(fragment);
  aiInsightsUpdated.textContent = `Insights refreshed from local demo data at ${formatActivityTime(new Date().toISOString())}.`;
}

function refreshAiInsights() {
  demoData = loadDemoData();
  renderDashboardSummary();
  renderAiInsights();
}

function renderDashboardSummary() {
  const fragment = document.createDocumentFragment();

  dashboardSummaryItems.forEach((summaryItem) => {
    const card = document.createElement("article");
    card.className = "summary-card";
    card.innerHTML = `
      <span class="summary-count">${getSummaryCount(summaryItem)}</span>
      <span class="summary-label">${summaryItem.label}</span>
      <span class="summary-helper">${summaryItem.helper}</span>
    `;
    fragment.appendChild(card);
  });

  dashboardSummary.replaceChildren(fragment);
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
    addRecentActivity(moduleId, nextItem);
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
  renderDashboardSummary();
  renderAiInsights();

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
  refreshDemoViews();
  setBackupStatus("Demo data reset to starter defaults.");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

detailClose.addEventListener("click", closeModuleDetail);
exportDemoData.addEventListener("click", exportDemoDataAsJson);
importDemoData.addEventListener("click", importDemoDataFromJson);
backupResetDemoData.addEventListener("click", resetAllDemoData);
resetDemoData.addEventListener("click", resetAllDemoData);
clearActivity.addEventListener("click", clearRecentActivity);
refreshInsights.addEventListener("click", refreshAiInsights);

window.addEventListener("storage", (event) => {
  if (event.key === DEMO_DATA_KEY) {
    demoData = loadDemoData();
    refreshDemoViews();
    setBackupStatus("Demo data updated in another tab.");
  }

  if (event.key === RECENT_ACTIVITY_KEY) {
    recentActivity = loadRecentActivity();
    renderRecentActivity();
  }
});

renderRecentActivity();
renderModules();

const lastOpenedModule = modules.find((module) => getModuleId(module.name) === getLastOpenedModule());

if (lastOpenedModule) {
  openModuleDetail(lastOpenedModule);
}
