const LAST_OPENED_MODULE_KEY = "aquaHomes.lastOpenedModule";
const DEMO_DATA_KEY = "aquaHomes.structuredDemoData";
const RECENT_ACTIVITY_KEY = "aquaHomes.structuredRecentActivity";
const SELECTED_PROJECT_KEY = "aquaHomes.selectedProjectName";
const MAX_RECENT_ACTIVITY = 10;
const RECEIPT_REVIEW_STATUSES = ["Needs Review", "Coded", "Accounting Hold"];
const PAYROLL_PREP_STATUSES = ["Draft", "Office Review", "Approved Hold"];
const INVENTORY_TOOL_STATUSES = ["Available", "Checked Out", "Assigned to Job", "Lost / Damaged", "Needs Review"];
const MAINTENANCE_PRIORITIES = ["Low", "Normal", "Urgent"];
const MAINTENANCE_TRADES = ["Maintenance", "HVAC", "Plumbing", "Electrical", "Carpentry"];
const MAINTENANCE_DISPATCH_STATUSES = [
  "New Request",
  "Approved",
  "Dispatched",
  "En Route",
  "On Site",
  "Complete",
  "Office Reconciliation Hold",
];
const ACTIVE_MAINTENANCE_STATUSES = ["Dispatched", "En Route", "On Site"];

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
      scope: "Kitchen refresh, dock repairs, punch list closeout, and final owner walkthrough.",
      nextTask: "Confirm material delivery window and crew start time.",
      proof: "Before photos saved in demo notes; completion photos pending.",
      permit: "Permit check placeholder for city inspection follow-up.",
      notes: "Keep owner updates lightweight until backend document storage is approved.",
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
  payrollPrep: [
    {
      workerName: "Mia Rivera",
      project: "Canal House Retrofit",
      hours: "6.5",
      rate: "38",
      status: "Draft",
    },
    {
      workerName: "Jordan Lee",
      project: "Canal House Retrofit",
      hours: "8",
      rate: "42",
      status: "Office Review",
    },
  ],
  maintenancePlusHvac: [
    {
      title: "Replace upstairs return filter",
      propertyProject: "Canal House Retrofit",
      priority: "Normal",
      tradeType: "HVAC",
      assignedTechnician: "Jordan Lee",
      status: "New Request",
      estimatedCost: "185",
    },
    {
      title: "Kitchen sink supply-line check",
      propertyProject: "Canal House Retrofit",
      priority: "Urgent",
      tradeType: "Plumbing",
      assignedTechnician: "Mia Rivera",
      status: "Dispatched",
      estimatedCost: "420",
    },
  ],
  inventoryTools: [
    {
      name: "Laser Level",
      tag: "AH-204",
      holder: "Mia",
      project: "Canal House Retrofit",
      status: "Checked Out",
    },
    {
      name: "Submersible Pump",
      tag: "QR-AH-118",
      holder: "Truck 2",
      project: "Dock Repair Hold",
      status: "Available",
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
    getCount: (items) => items.filter((item) => getReceiptStatus(item) === "Needs Review").length,
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
      { name: "scope", label: "Scope note", placeholder: "Interior punch list and exterior repairs" },
      { name: "nextTask", label: "Next task", placeholder: "Schedule inspection walkthrough" },
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
  "payroll-prep": {
    storageKey: "payrollPrep",
    eyebrow: "Demo payroll prep",
    submitLabel: "Save Labor Record",
    fields: [
      { name: "workerName", label: "Worker name", placeholder: "Mia Rivera", required: true },
      { name: "project", label: "Project", placeholder: "Canal House Retrofit", required: true },
      { name: "hours", label: "Hours", placeholder: "8", type: "number", step: "0.25", min: "0", required: true },
      { name: "rate", label: "Rate", placeholder: "42", type: "number", step: "0.01", min: "0", required: true },
      { name: "status", label: "Status", options: PAYROLL_PREP_STATUSES, required: true },
    ],
    empty: "No demo payroll/labor records yet.",
    format: (item) => ({
      title: item.workerName,
      meta: `${item.project} · ${Number(item.hours) || 0} hrs × ${formatCurrency(item.rate)} · ${formatCurrency(getLaborCost(item))} · ${getPayrollStatus(item)}`,
    }),
  },
  "maintenance-plus-hvac": {
    storageKey: "maintenancePlusHvac",
    eyebrow: "Demo dispatch board",
    submitLabel: "Save Dispatch Request",
    fields: [
      { name: "title", label: "Request title", placeholder: "Inspect air handler", required: true },
      { name: "propertyProject", label: "Property / project", placeholder: "Canal House Retrofit", required: true },
      { name: "priority", label: "Priority", options: MAINTENANCE_PRIORITIES, required: true },
      { name: "tradeType", label: "Trade type", options: MAINTENANCE_TRADES, required: true },
      { name: "assignedTechnician", label: "Assigned technician", placeholder: "Jordan Lee", required: true },
      { name: "status", label: "Dispatch status", options: MAINTENANCE_DISPATCH_STATUSES, required: true },
      {
        name: "estimatedCost",
        label: "Estimated repair cost",
        placeholder: "250",
        type: "number",
        step: "0.01",
        min: "0",
        required: true,
      },
    ],
    empty: "No demo maintenance/HVAC dispatch requests yet.",
    format: (item) => ({
      title: getMaintenanceTitle(item),
      meta: `${getMaintenancePriority(item)} priority · ${getMaintenanceTrade(item)} · ${getMaintenanceStatus(item)} · ${formatCurrency(item.estimatedCost)}`,
    }),
  },
  inventoryTools: {
    storageKey: "inventoryTools",
    eyebrow: "Inventory / Tool Checkout",
    submitLabel: "Save Tool / Item",
    fields: [
      { name: "name", label: "Item / tool name", placeholder: "Hammer Drill", required: true },
      { name: "tag", label: "Tag / QR code", placeholder: "AH-312", required: true },
      { name: "holder", label: "Holder / worker / truck", placeholder: "Jordan or Truck 2", required: true },
      { name: "project", label: "Project", placeholder: "Canal House Retrofit", required: true },
      { name: "status", label: "Status", options: INVENTORY_TOOL_STATUSES, required: true },
    ],
    empty: "No demo tools or inventory yet.",
    format: (item) => ({
      title: item.name,
      meta: `${item.tag} · ${item.holder} · ${item.project || "Unassigned project"} · ${getInventoryToolStatus(item)}`,
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
let selectedProjectName = readLocalStorage(SELECTED_PROJECT_KEY);

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


function normalizeMaintenanceRequest(request) {
  return {
    title: getMaintenanceTitle(request),
    propertyProject: String(request?.propertyProject ?? request?.project ?? "").trim(),
    priority: getMaintenancePriority(request),
    tradeType: getMaintenanceTrade(request),
    assignedTechnician: String(request?.assignedTechnician ?? request?.technician ?? "").trim(),
    status: getMaintenanceStatus(request),
    estimatedCost: String(request?.estimatedCost ?? request?.cost ?? "0").trim(),
  };
}

function normalizeInventoryToolItem(item) {
  return {
    name: String(item?.name ?? item?.toolName ?? item?.itemName ?? "Inventory item").trim() || "Inventory item",
    tag: String(item?.tag ?? item?.qrCode ?? item?.code ?? "").trim(),
    holder: String(item?.holder ?? item?.worker ?? item?.truck ?? "").trim(),
    project: String(item?.project ?? item?.job ?? "").trim(),
    status: getInventoryToolStatus(item),
  };
}

function normalizeDemoData(value) {
  const source = value?.demoData && typeof value.demoData === "object" ? value.demoData : value;
  const defaults = cloneDemoDefaults();

  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return null;
  }

  return Object.fromEntries(
    Object.keys(defaults).map((key) => {
      const items = Array.isArray(source[key]) ? source[key] : defaults[key];

      if (key === "maintenancePlusHvac") {
        return [key, items.map(normalizeMaintenanceRequest)];
      }

      if (key === "inventoryTools") {
        return [key, items.map(normalizeInventoryToolItem)];
      }

      return [key, items];
    }),
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

function getReceiptStatus(receipt) {
  const status = String(receipt?.status ?? "").trim();

  return RECEIPT_REVIEW_STATUSES.includes(status) ? status : RECEIPT_REVIEW_STATUSES[0];
}

function getPayrollStatus(record) {
  const status = String(record?.status ?? "").trim();

  return PAYROLL_PREP_STATUSES.includes(status) ? status : PAYROLL_PREP_STATUSES[0];
}

function getInventoryToolStatus(item) {
  const status = String(item?.status ?? "").trim();

  return INVENTORY_TOOL_STATUSES.includes(status) ? status : INVENTORY_TOOL_STATUSES[0];
}

function getLaborCost(record) {
  return (Number(record?.hours) || 0) * (Number(record?.rate) || 0);
}

function getMaintenanceTitle(request) {
  return String(request?.title ?? request?.request ?? "Maintenance request").trim() || "Maintenance request";
}

function getMaintenancePriority(request) {
  const priority = String(request?.priority ?? "").trim();

  if (priority === "Medium") {
    return "Normal";
  }

  return MAINTENANCE_PRIORITIES.includes(priority) ? priority : "Normal";
}

function getMaintenanceTrade(request) {
  const trade = String(request?.tradeType ?? request?.trade ?? "").trim();

  return MAINTENANCE_TRADES.includes(trade) ? trade : "Maintenance";
}

function getMaintenanceStatus(request) {
  const status = String(request?.status ?? "").trim();

  if (["Queued", "Open", "Pending"].includes(status)) {
    return "New Request";
  }

  return MAINTENANCE_DISPATCH_STATUSES.includes(status) ? status : "New Request";
}

function getMaintenanceSummary(requests = demoData.maintenancePlusHvac ?? []) {
  return {
    total: requests.length,
    urgent: requests.filter((request) => getMaintenancePriority(request) === "Urgent").length,
    active: requests.filter((request) => ACTIVE_MAINTENANCE_STATUSES.includes(getMaintenanceStatus(request))).length,
    complete: requests.filter((request) => getMaintenanceStatus(request) === "Complete").length,
    totalEstimatedCost: requests.reduce((total, request) => total + (Number(request.estimatedCost) || 0), 0),
  };
}

function getPayrollPrepSummary(records = demoData.payrollPrep ?? []) {
  return {
    totalLaborCost: records.reduce((total, record) => total + getLaborCost(record), 0),
    draft: records.filter((record) => getPayrollStatus(record) === "Draft").length,
    officeReview: records.filter((record) => getPayrollStatus(record) === "Office Review").length,
    approvedHold: records.filter((record) => getPayrollStatus(record) === "Approved Hold").length,
  };
}

function getReceiptAccountingSummary(receipts = demoData.receipts ?? []) {
  return {
    totalAmount: receipts.reduce((total, receipt) => total + (Number(receipt.amount) || 0), 0),
    needsReview: receipts.filter((receipt) => getReceiptStatus(receipt) === "Needs Review").length,
    coded: receipts.filter((receipt) => getReceiptStatus(receipt) === "Coded").length,
    accountingHold: receipts.filter((receipt) => getReceiptStatus(receipt) === "Accounting Hold").length,
  };
}

function getInventoryToolSummary(items = demoData.inventoryTools ?? []) {
  return {
    total: items.length,
    available: items.filter((item) => getInventoryToolStatus(item) === "Available").length,
    checkedOut: items.filter((item) => getInventoryToolStatus(item) === "Checked Out").length,
    assignedToJob: items.filter((item) => getInventoryToolStatus(item) === "Assigned to Job").length,
    lostDamaged: items.filter((item) => getInventoryToolStatus(item) === "Lost / Damaged").length,
  };
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

function addPayrollStatusActivity(record, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-payroll-status`,
      module: "Payroll Prep",
      title: record.workerName || "Labor status",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${record.project || "Unassigned project"} · ${formatCurrency(getLaborCost(record))} labor hold`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}


function addMaintenanceStatusActivity(request, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-maintenance-status`,
      module: "Maintenance + HVAC",
      title: getMaintenanceTitle(request),
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${request.propertyProject || "Unassigned property/project"} · ${getMaintenanceTrade(request)} · ${formatCurrency(request.estimatedCost)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addReceiptStatusActivity(receipt, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-receipt-status`,
      module: "Receipts",
      title: receipt.vendor || "Receipt status",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${receipt.project || "Unassigned project"} · ${formatCurrency(receipt.amount)}`,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity,
  ].slice(0, MAX_RECENT_ACTIVITY);

  saveRecentActivity();
  renderRecentActivity();
}

function addInventoryToolStatusActivity(item, previousStatus, nextStatus) {
  recentActivity = [
    {
      id: `${Date.now()}-inventory-status`,
      module: "Inventory / Tools",
      title: item.name || "Inventory item",
      meta: `Status changed from ${previousStatus} to ${nextStatus} · ${item.tag || "No tag"} · ${item.holder || "No holder"} · ${item.project || "Unassigned project"}`,
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

const saveSelectedProject = (projectName) => {
  selectedProjectName = projectName;
  writeLocalStorage(SELECTED_PROJECT_KEY, projectName);
};

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

function getProjectReceipts(projectName) {
  return (demoData.receipts ?? []).filter((receipt) => receipt.project === projectName);
}

function getSelectedProject(items) {
  if (!items.length) {
    return null;
  }

  return items.find((item) => item.name === selectedProjectName) ?? null;
}

function getProjectFolderSections(project) {
  const projectReceipts = getProjectReceipts(project.name);
  const receiptTotal = projectReceipts.reduce((total, receipt) => total + (Number(receipt.amount) || 0), 0);

  return [
    {
      title: "Scope of Work",
      body: project.scope || "Placeholder scope summary for this saved project.",
    },
    {
      title: "Schedule / Tasks",
      body: project.nextTask || "Placeholder task list and schedule milestones for the field team.",
    },
    {
      title: "Photos / Proof",
      body: project.proof || "Placeholder proof log for before, progress, and completion photos.",
    },
    {
      title: "Receipts",
      body: projectReceipts.length
        ? `${projectReceipts.length} demo receipt${projectReceipts.length === 1 ? "" : "s"} linked · ${formatCurrency(receiptTotal)} total.`
        : "No demo receipts linked to this project yet.",
    },
    {
      title: "Permits / Inspections",
      body: project.permit || "Placeholder permit and inspection checkpoints for office follow-up.",
    },
    {
      title: "Notes",
      body: project.notes || "Placeholder notes for owner updates, field context, and open questions.",
    },
  ];
}

function renderProjectFolder(project) {
  if (!project) {
    return `
      <section class="project-folder-empty" aria-label="Project detail placeholder">
        <p class="eyebrow">Job Folder</p>
        <h4>Select a saved project</h4>
        <p>Choose a project from the demo list to preview the lightweight job folder sections.</p>
      </section>
    `;
  }

  const sections = getProjectFolderSections(project)
    .map(
      (section) => `
        <article class="project-folder-card">
          <h5>${escapeHtml(section.title)}</h5>
          <p>${escapeHtml(section.body)}</p>
        </article>
      `,
    )
    .join("");

  return `
    <section class="project-folder" aria-label="Project job folder">
      <div class="project-folder-header">
        <div>
          <p class="eyebrow">Job Folder</p>
          <h4>${escapeHtml(project.name)}</h4>
        </div>
        <span class="project-folder-status">${escapeHtml(project.status || "Demo")}</span>
      </div>
      <p class="project-folder-meta">${escapeHtml(formatCurrency(project.budget))} demo budget · localStorage only</p>
      <div class="project-folder-grid">${sections}</div>
    </section>
  `;
}

function renderReceiptReviewPanel(receipts) {
  const summary = getReceiptAccountingSummary(receipts);

  if (!receipts.length) {
    return `
      <section class="receipt-review-panel" aria-label="Receipts review and accounting feed">
        <div class="receipt-review-header">
          <div>
            <p class="eyebrow">Accounting Feed</p>
            <h4>Receipts Review</h4>
          </div>
          <span class="receipt-feed-status">Local demo feed</span>
        </div>
        <div class="accounting-summary-grid" aria-label="Accounting summary">
          <article><strong>${escapeHtml(formatCurrency(summary.totalAmount))}</strong><span>Total receipt amount</span></article>
          <article><strong>${summary.needsReview}</strong><span>Needs review</span></article>
          <article><strong>${summary.coded}</strong><span>Coded</span></article>
          <article><strong>${summary.accountingHold}</strong><span>Accounting hold</span></article>
        </div>
        <p class="receipt-review-empty">No saved receipt demo records yet.</p>
      </section>
    `;
  }

  const receiptRows = receipts
    .map((receipt, index) => {
      const currentStatus = getReceiptStatus(receipt);
      const statusOptions = RECEIPT_REVIEW_STATUSES
        .map(
          (status) =>
            `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
        )
        .join("");

      return `
        <article class="receipt-review-card">
          <div>
            <strong>${escapeHtml(receipt.vendor || "Receipt")}</strong>
            <span>${escapeHtml(receipt.project || "Unassigned project")} · ${escapeHtml(formatCurrency(receipt.amount))}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-receipt-status-index="${index}" aria-label="Receipt status for ${escapeHtml(receipt.vendor || "receipt")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="receipt-review-panel" aria-label="Receipts review and accounting feed">
      <div class="receipt-review-header">
        <div>
          <p class="eyebrow">Accounting Feed</p>
          <h4>Receipts Review</h4>
        </div>
        <span class="receipt-feed-status">Local demo feed</span>
      </div>
      <div class="accounting-summary-grid" aria-label="Accounting summary">
        <article><strong>${escapeHtml(formatCurrency(summary.totalAmount))}</strong><span>Total receipt amount</span></article>
        <article><strong>${summary.needsReview}</strong><span>Needs review</span></article>
        <article><strong>${summary.coded}</strong><span>Coded</span></article>
        <article><strong>${summary.accountingHold}</strong><span>Accounting hold</span></article>
      </div>
      <div class="receipt-review-list">${receiptRows}</div>
    </section>
  `;
}

function updateReceiptStatus(index, nextStatus) {
  const receipt = demoData.receipts?.[index];

  if (!receipt || !RECEIPT_REVIEW_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getReceiptStatus(receipt);

  if (previousStatus === nextStatus) {
    return;
  }

  receipt.status = nextStatus;
  saveDemoData();
  addReceiptStatusActivity(receipt, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("receipts");
}


function renderMaintenanceDispatchPanel(requests) {
  const summary = getMaintenanceSummary(requests);
  const summaryGrid = `
    <div class="maintenance-summary-grid" aria-label="Maintenance and HVAC summary">
      <article><strong>${summary.total}</strong><span>Total requests</span></article>
      <article><strong>${summary.urgent}</strong><span>Urgent requests</span></article>
      <article><strong>${summary.active}</strong><span>Dispatched / active</span></article>
      <article><strong>${summary.complete}</strong><span>Completed requests</span></article>
      <article><strong>${escapeHtml(formatCurrency(summary.totalEstimatedCost))}</strong><span>Total estimated repair cost</span></article>
    </div>
  `;

  if (!requests.length) {
    return `
      <section class="maintenance-dispatch-panel" aria-label="Maintenance and HVAC dispatch panel">
        <div class="maintenance-dispatch-header">
          <div>
            <p class="eyebrow">Dispatch Panel</p>
            <h4>Maintenance + HVAC Summary</h4>
          </div>
          <span class="maintenance-dispatch-status">Local demo dispatch</span>
        </div>
        <p class="maintenance-dispatch-note">Live dispatch, GPS, tenant-sensitive storage, and billing are locked until backend/security gates are complete.</p>
        ${summaryGrid}
        <p class="maintenance-dispatch-empty">No saved maintenance/HVAC dispatch demo records yet.</p>
      </section>
    `;
  }

  const requestRows = requests
    .map((request, index) => {
      const currentStatus = getMaintenanceStatus(request);
      const statusOptions = MAINTENANCE_DISPATCH_STATUSES
        .map(
          (status) =>
            `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
        )
        .join("");

      return `
        <article class="maintenance-dispatch-card">
          <div>
            <strong>${escapeHtml(getMaintenanceTitle(request))}</strong>
            <span>${escapeHtml(request.propertyProject || "Unassigned property/project")}</span>
            <span>${escapeHtml(getMaintenancePriority(request))} priority · ${escapeHtml(getMaintenanceTrade(request))} · ${escapeHtml(request.assignedTechnician || "Unassigned technician")}</span>
            <span>${escapeHtml(formatCurrency(request.estimatedCost))} estimated repair cost</span>
          </div>
          <label>
            <span>Dispatch status</span>
            <select data-maintenance-status-index="${index}" aria-label="Dispatch status for ${escapeHtml(getMaintenanceTitle(request))}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="maintenance-dispatch-panel" aria-label="Maintenance and HVAC dispatch panel">
      <div class="maintenance-dispatch-header">
        <div>
          <p class="eyebrow">Dispatch Panel</p>
          <h4>Maintenance + HVAC Summary</h4>
        </div>
        <span class="maintenance-dispatch-status">Local demo dispatch</span>
      </div>
      <p class="maintenance-dispatch-note">Live dispatch, GPS, tenant-sensitive storage, and billing are locked until backend/security gates are complete.</p>
      ${summaryGrid}
      <div class="maintenance-dispatch-list">${requestRows}</div>
    </section>
  `;
}

function updateMaintenanceStatus(index, nextStatus) {
  const request = demoData.maintenancePlusHvac?.[index];

  if (!request || !MAINTENANCE_DISPATCH_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getMaintenanceStatus(request);

  if (previousStatus === nextStatus) {
    return;
  }

  request.status = nextStatus;
  saveDemoData();
  addMaintenanceStatusActivity(request, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("maintenance-plus-hvac");
}

function renderInventoryToolCheckoutPanel(items) {
  const summary = getInventoryToolSummary(items);
  const summaryGrid = `
    <div class="inventory-summary-grid" aria-label="Inventory summary">
      <article><strong>${summary.total}</strong><span>Total items</span></article>
      <article><strong>${summary.available}</strong><span>Available items</span></article>
      <article><strong>${summary.checkedOut}</strong><span>Checked out items</span></article>
      <article><strong>${summary.assignedToJob}</strong><span>Assigned-to-job items</span></article>
      <article><strong>${summary.lostDamaged}</strong><span>Lost/damaged items</span></article>
    </div>
  `;

  if (!items.length) {
    return `
      <section class="inventory-checkout-panel" aria-label="Inventory and tool checkout panel">
        <div class="inventory-checkout-header">
          <div>
            <p class="eyebrow">Inventory / Tool Checkout</p>
            <h4>Inventory Summary</h4>
          </div>
          <span class="inventory-checkout-status">Local demo checkout</span>
        </div>
        <p class="inventory-lock-note">Live scanner hardware, GPS, purchasing sync, and accounting impact are locked until backend/security gates are complete.</p>
        ${summaryGrid}
        <p class="inventory-checkout-empty">No saved inventory/tool demo records yet.</p>
      </section>
    `;
  }

  const itemRows = items
    .map((item, index) => {
      const currentStatus = getInventoryToolStatus(item);
      const statusOptions = INVENTORY_TOOL_STATUSES
        .map(
          (status) =>
            `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
        )
        .join("");

      return `
        <article class="inventory-checkout-card">
          <div>
            <strong>${escapeHtml(item.name || "Inventory item")}</strong>
            <span>${escapeHtml(item.tag || "No tag / QR code")}</span>
            <span>${escapeHtml(item.holder || "No holder / worker / truck")}</span>
            <span>${escapeHtml(item.project || "Unassigned project")}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-inventory-status-index="${index}" aria-label="Inventory status for ${escapeHtml(item.name || "inventory item")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="inventory-checkout-panel" aria-label="Inventory and tool checkout panel">
      <div class="inventory-checkout-header">
        <div>
          <p class="eyebrow">Inventory / Tool Checkout</p>
          <h4>Inventory Summary</h4>
        </div>
        <span class="inventory-checkout-status">Local demo checkout</span>
      </div>
      <p class="inventory-lock-note">Live scanner hardware, GPS, purchasing sync, and accounting impact are locked until backend/security gates are complete.</p>
      ${summaryGrid}
      <div class="inventory-checkout-list">${itemRows}</div>
    </section>
  `;
}

function updateInventoryToolStatus(index, nextStatus) {
  const item = demoData.inventoryTools?.[index];

  if (!item || !INVENTORY_TOOL_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getInventoryToolStatus(item);

  if (previousStatus === nextStatus) {
    return;
  }

  item.status = nextStatus;
  saveDemoData();
  addInventoryToolStatusActivity(item, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("inventory-tools");
}

function renderPayrollPrepPanel(records) {
  const summary = getPayrollPrepSummary(records);
  const summaryGrid = `
    <div class="payroll-summary-grid" aria-label="Payroll prep summary">
      <article><strong>${escapeHtml(formatCurrency(summary.totalLaborCost))}</strong><span>Total labor cost</span></article>
      <article><strong>${summary.draft}</strong><span>Draft records</span></article>
      <article><strong>${summary.officeReview}</strong><span>Office review records</span></article>
      <article><strong>${summary.approvedHold}</strong><span>Approved hold records</span></article>
    </div>
  `;

  if (!records.length) {
    return `
      <section class="payroll-prep-panel" aria-label="Payroll prep labor hold panel">
        <div class="payroll-prep-header">
          <div>
            <p class="eyebrow">Labor Hold</p>
            <h4>Payroll Prep Summary</h4>
          </div>
          <span class="payroll-lock-status">Prep only</span>
        </div>
        <p class="payroll-lock-note">Payroll processing is locked. This is prep/review data only.</p>
        ${summaryGrid}
        <p class="payroll-prep-empty">No saved payroll/labor demo records yet.</p>
      </section>
    `;
  }

  const recordRows = records
    .map((record, index) => {
      const currentStatus = getPayrollStatus(record);
      const statusOptions = PAYROLL_PREP_STATUSES
        .map(
          (status) =>
            `<option value="${escapeHtml(status)}" ${status === currentStatus ? "selected" : ""}>${escapeHtml(status)}</option>`,
        )
        .join("");

      return `
        <article class="payroll-prep-card">
          <div>
            <strong>${escapeHtml(record.workerName || "Worker")}</strong>
            <span>${escapeHtml(record.project || "Unassigned project")} · ${Number(record.hours) || 0} hrs × ${escapeHtml(formatCurrency(record.rate))} · ${escapeHtml(formatCurrency(getLaborCost(record)))}</span>
          </div>
          <label>
            <span>Status</span>
            <select data-payroll-status-index="${index}" aria-label="Payroll prep status for ${escapeHtml(record.workerName || "worker")}">
              ${statusOptions}
            </select>
          </label>
        </article>
      `;
    })
    .join("");

  return `
    <section class="payroll-prep-panel" aria-label="Payroll prep labor hold panel">
      <div class="payroll-prep-header">
        <div>
          <p class="eyebrow">Labor Hold</p>
          <h4>Payroll Prep Summary</h4>
        </div>
        <span class="payroll-lock-status">Prep only</span>
      </div>
      <p class="payroll-lock-note">Payroll processing is locked. This is prep/review data only.</p>
      ${summaryGrid}
      <div class="payroll-prep-list">${recordRows}</div>
    </section>
  `;
}

function updatePayrollStatus(index, nextStatus) {
  const record = demoData.payrollPrep?.[index];

  if (!record || !PAYROLL_PREP_STATUSES.includes(nextStatus)) {
    return;
  }

  const previousStatus = getPayrollStatus(record);

  if (previousStatus === nextStatus) {
    return;
  }

  record.status = nextStatus;
  saveDemoData();
  addPayrollStatusActivity(record, previousStatus, nextStatus);
  renderModules();
  renderDemoModule("payroll-prep");
}

function renderDemoList(moduleId) {
  const demoModule = demoModules[moduleId];
  const items = demoData[demoModule.storageKey] ?? [];
  const list = detailDemo.querySelector("[data-demo-list]");
  const projectFolderSlot = detailDemo.querySelector("[data-project-folder]");
  const receiptReviewSlot = detailDemo.querySelector("[data-receipt-review]");
  const payrollPrepSlot = detailDemo.querySelector("[data-payroll-prep]");
  const maintenanceDispatchSlot = detailDemo.querySelector("[data-maintenance-dispatch]");
  const inventoryCheckoutSlot = detailDemo.querySelector("[data-inventory-checkout]");

  if (!items.length) {
    list.innerHTML = `<li class="demo-empty">${demoModule.empty}</li>`;
    if (projectFolderSlot) {
      projectFolderSlot.innerHTML = renderProjectFolder(null);
    }
    if (receiptReviewSlot) {
      receiptReviewSlot.innerHTML = renderReceiptReviewPanel(items);
    }
    if (payrollPrepSlot) {
      payrollPrepSlot.innerHTML = renderPayrollPrepPanel(items);
    }
    if (maintenanceDispatchSlot) {
      maintenanceDispatchSlot.innerHTML = renderMaintenanceDispatchPanel(items);
    }
    if (inventoryCheckoutSlot) {
      inventoryCheckoutSlot.innerHTML = renderInventoryToolCheckoutPanel(items);
    }
    return;
  }

  if (moduleId === "projects" && !getSelectedProject(items)) {
    saveSelectedProject(items[0].name);
  }

  list.innerHTML = items
    .map((item) => {
      const formattedItem = demoModule.format(item);
      const isSelectedProject = moduleId === "projects" && item.name === selectedProjectName;

      return `
        <li class="${moduleId === "projects" ? "project-list-item" : ""} ${isSelectedProject ? "selected" : ""}">
          <div>
            <strong>${escapeHtml(formattedItem.title)}</strong>
            <span>${escapeHtml(formattedItem.meta)}</span>
          </div>
          ${
            moduleId === "projects"
              ? `<button type="button" class="ghost-button project-select" data-project-select="${escapeHtml(item.name)}">${
                  isSelectedProject ? "Selected" : "Open job folder"
                }</button>`
              : ""
          }
        </li>
      `;
    })
    .join("");

  list.querySelectorAll("[data-project-select]").forEach((button) => {
    button.addEventListener("click", () => {
      saveSelectedProject(button.dataset.projectSelect);
      renderDemoList(moduleId);
    });
  });

  if (projectFolderSlot) {
    projectFolderSlot.innerHTML = renderProjectFolder(getSelectedProject(items));
  }

  if (receiptReviewSlot) {
    receiptReviewSlot.innerHTML = renderReceiptReviewPanel(items);
    receiptReviewSlot.querySelectorAll("[data-receipt-status-index]").forEach((select) => {
      select.addEventListener("change", () => updateReceiptStatus(Number(select.dataset.receiptStatusIndex), select.value));
    });
  }

  if (payrollPrepSlot) {
    payrollPrepSlot.innerHTML = renderPayrollPrepPanel(items);
    payrollPrepSlot.querySelectorAll("[data-payroll-status-index]").forEach((select) => {
      select.addEventListener("change", () => updatePayrollStatus(Number(select.dataset.payrollStatusIndex), select.value));
    });
  }

  if (maintenanceDispatchSlot) {
    maintenanceDispatchSlot.innerHTML = renderMaintenanceDispatchPanel(items);
    maintenanceDispatchSlot.querySelectorAll("[data-maintenance-status-index]").forEach((select) => {
      select.addEventListener("change", () =>
        updateMaintenanceStatus(Number(select.dataset.maintenanceStatusIndex), select.value),
      );
    });
  }

  if (inventoryCheckoutSlot) {
    inventoryCheckoutSlot.innerHTML = renderInventoryToolCheckoutPanel(items);
    inventoryCheckoutSlot.querySelectorAll("[data-inventory-status-index]").forEach((select) => {
      select.addEventListener("change", () =>
        updateInventoryToolStatus(Number(select.dataset.inventoryStatusIndex), select.value),
      );
    });
  }
}

function renderDemoModule(moduleId) {
  const demoModule = demoModules[moduleId];

  if (!demoModule) {
    detailDemo.hidden = true;
    detailDemo.replaceChildren();
    return;
  }

  const fields = demoModule.fields
    .map((field) => {
      const requiredAttribute = field.required ? "required" : "";

      if (field.options?.length) {
        const options = field.options
          .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
          .join("");

        return `
          <label>
            <span>${field.label}</span>
            <select name="${field.name}" ${requiredAttribute}>
              ${options}
            </select>
          </label>
        `;
      }

      return `
        <label>
          <span>${field.label}</span>
          <input
            name="${field.name}"
            type="${field.type ?? "text"}"
            placeholder="${field.placeholder}"
            ${field.step ? `step="${field.step}"` : ""}
            ${field.min ? `min="${field.min}"` : ""}
            ${requiredAttribute}
          />
        </label>
      `;
    })
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
    ${moduleId === "projects" ? '<div data-project-folder></div>' : ""}
    ${moduleId === "receipts" ? '<div data-receipt-review></div>' : ""}
    ${moduleId === "payroll-prep" ? '<div data-payroll-prep></div>' : ""}
    ${moduleId === "maintenance-plus-hvac" ? '<div data-maintenance-dispatch></div>' : ""}
    ${moduleId === "inventory-tools" ? '<div data-inventory-checkout></div>' : ""}
  `;

  detailDemo.querySelector("[data-demo-form]").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextItem = Object.fromEntries(
      demoModule.fields.map((field) => [field.name, String(formData.get(field.name) ?? "").trim()]),
    );

    demoData[demoModule.storageKey] = [nextItem, ...(demoData[demoModule.storageKey] ?? [])];
    if (moduleId === "projects") {
      saveSelectedProject(nextItem.name);
    }
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
