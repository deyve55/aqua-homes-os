const STORAGE_KEY = "aquaHomes.lastOpenedModule";

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

const navButtons = document.querySelectorAll(".bottom-nav button");
const cardGrid = document.querySelector("[data-module-grid]");
const detailPanel = document.querySelector("[data-module-detail]");
const detailTitle = document.querySelector("[data-module-title]");
const detailDescription = document.querySelector("[data-module-description]");
const detailClose = document.querySelector("[data-module-close]");

const getModuleId = (name) =>
  name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const saveLastOpenedModule = (moduleId) => {
  try {
    localStorage.setItem(STORAGE_KEY, moduleId);
  } catch (error) {
    // Keep the shell usable if localStorage is unavailable.
  }
};

const getLastOpenedModule = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

const setActiveModuleCard = (moduleId) => {
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.moduleId === moduleId);
  });
};

const openModuleDetail = (module) => {
  const moduleId = getModuleId(module.name);

  detailTitle.textContent = module.name;
  detailDescription.textContent = module.description;
  detailPanel.hidden = false;
  setActiveModuleCard(moduleId);
  saveLastOpenedModule(moduleId);
};

const closeModuleDetail = () => {
  detailPanel.hidden = true;
  cardGrid.querySelectorAll(".brain-card").forEach((card) => {
    card.classList.remove("active");
  });
};

const renderModules = () => {
  const fragment = document.createDocumentFragment();

  modules.forEach((module, index) => {
    const moduleId = getModuleId(module.name);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "brain-card";
    card.dataset.moduleId = moduleId;
    card.setAttribute("aria-label", `Open ${module.name} module`);
    card.innerHTML = `
      <span class="card-icon">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-title">${module.name}</span>
      <span class="card-copy">${module.description}</span>
    `;
    card.addEventListener("click", () => openModuleDetail(module));
    fragment.appendChild(card);
  });

  cardGrid.replaceChildren(fragment);
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

detailClose.addEventListener("click", closeModuleDetail);

renderModules();

const lastOpenedModule = modules.find((module) => getModuleId(module.name) === getLastOpenedModule());

if (lastOpenedModule) {
  openModuleDetail(lastOpenedModule);
}
