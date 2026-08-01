const apps = [
  {
    name: "Aqua CRM",
    cardName: "CRM",
    motion: "crm",
    short: "CUSTOMERS & JOBS",
    icon: "A",
    color: "#20dcff",
    preview: { eyebrow: "COMMAND CENTER", title: "Good morning", metric: "Active Jobs", value: "—", tiles: ["Pipeline", "Clients", "Schedule"] },
    packages: ["com.aquasoftware.crm.fieldtest", "com.aquasoftware.crm.test", "com.aquasoftware.crm"],
    status: "CRM workspace ready",
    primaryTitle: "Customer Operations",
    primaryValue: "CRM",
    primaryDetail: "Customers, leads, jobs, communications and scheduling",
    secondaryTitle: "Sentinel Authority",
    secondaryValue: "Full access",
    secondaryDetail: "Authorized read, write, search and action interface",
    activity: ["Customer command ready", "Job workspace ready", "Scheduling interface registered"],
    widgets: ["Customers", "Jobs", "Pipeline"],
    connected: false,
  },
  {
    name: "AquaDraw",
    cardName: "Draw",
    motion: "draw",
    short: "FINANCIAL DRAWS",
    icon: "◇",
    color: "#ffbd3c",
    preview: { eyebrow: "AQUADRAW", title: "Company Financial Health", metric: "Available", value: "—", tiles: ["Clients", "Jobs", "SOW"] },
    packages: ["com.aquahomesdesigngroup.draw.v0189option1", "com.aquahomesdesigngroup.draw.v0187fresh", "com.aquahomesdesigngroup.draw.beta", "com.aquahomesdesigngroup.draw"],
    status: "Draw workspace ready",
    primaryTitle: "Financial Health",
    primaryValue: "Draws",
    primaryDetail: "Budgets, SOW, requests, approvals and client portal",
    secondaryTitle: "Selected Job",
    secondaryValue: "Ready",
    secondaryDetail: "Job financial context and draw workflow",
    activity: ["Job landing page ready", "SOW interface registered", "Draw approval route ready"],
    widgets: ["Budgets", "SOW", "Draws"],
    connected: false,
  },
  {
    name: "AquaCam",
    cardName: "Cam",
    motion: "cam",
    short: "FIELD VISION",
    icon: "◉",
    color: "#5fd9ff",
    preview: { eyebrow: "AQUACAM", title: "Field Command", metric: "Today", value: "—", tiles: ["Clock In", "Capture", "Evidence"] },
    packages: ["com.aquahomesdesign.cam.obsidianpreview", "com.aquahomesdesign.cam"],
    status: "Field workspace ready",
    primaryTitle: "Site Intelligence",
    primaryValue: "Awaiting live data",
    primaryDetail: "Sentinel has not received an AquaCam home snapshot yet",
    secondaryTitle: "Latest Capture",
    secondaryValue: "Not confirmed",
    secondaryDetail: "Open AquaCam or connect its Sentinel preview contract",
    activity: ["Walkthrough interface ready", "Evidence review available", "Photo comparison available"],
    widgets: ["Zones", "Flags", "Evidence"],
    connected: false,
  },
  {
    name: "Aqua Knowledge Vault",
    cardName: "Knowledge Vault",
    motion: "vault",
    short: "CODE INTELLIGENCE",
    icon: "⌘",
    color: "#a88cff",
    preview: { eyebrow: "KNOWLEDGE VAULT", title: "Active Job Knowledge", metric: "Jurisdictions", value: "—", tiles: ["Quick Q&A", "Quick Scan", "Field Scan"] },
    packages: ["com.aquahomes.knowledgevault"],
    status: "Vault workspace ready",
    primaryTitle: "Knowledge Status",
    primaryValue: "Awaiting live data",
    primaryDetail: "Sentinel has not received a Knowledge Vault home snapshot yet",
    secondaryTitle: "Code Checks",
    secondaryValue: "Not confirmed",
    secondaryDetail: "Open Knowledge Vault or connect its Sentinel preview contract",
    activity: [
      "NH stair query prepared",
      "MA framing source indexed",
      "ME lookup awaiting gateway",
    ],
    widgets: ["Jurisdictions", "Code checks", "Evidence mode"],
    connected: false,
  },
  {
    name: "Aqua Timesheet",
    cardName: "Timesheet",
    motion: "timesheet",
    short: "WORKFORCE",
    icon: "◷",
    color: "#41e39a",
    preview: { eyebrow: "AQUA TIMESHEET", title: "Workforce Today", metric: "On Clock", value: "—", tiles: ["Clock", "Travel", "Payroll"] },
    packages: ["com.aquahomes.timesheet.engineering", "com.aquahomes.timesheet"],
    status: "Timesheet workspace ready",
    primaryTitle: "Today’s Labor",
    primaryValue: "Awaiting live data",
    primaryDetail: "Sentinel has not received a Timesheet home snapshot yet",
    secondaryTitle: "Payroll Review",
    secondaryValue: "Not confirmed",
    secondaryDetail: "Open Timesheet or connect its Sentinel preview contract",
    activity: ["Crew clock-in available", "Exception review available", "Payroll summary available"],
    widgets: ["Crew", "Capture", "Exceptions"],
    connected: false,
  },
  {
    name: "Aqua Books",
    cardName: "Books",
    motion: "books",
    short: "ACCOUNTING",
    icon: "$",
    color: "#ffca54",
    preview: { eyebrow: "AQUA BOOKS", title: "Financial Command", metric: "Cash Position", value: "$—", tiles: ["Review", "Bills", "Reports"] },
    packages: ["com.aquasoftware.aquabooks"],
    status: "Books workspace ready",
    primaryTitle: "Accounting Command",
    primaryValue: "Books",
    primaryDetail: "Ledger, bills, expenses, reconciliation and reporting",
    secondaryTitle: "Financial Authority",
    secondaryValue: "Protected",
    secondaryDetail: "Aqua Books remains the accounting system of record",
    activity: ["Review interface ready", "Bills interface registered", "Receipt intake boundary preserved"],
    widgets: ["Review", "Bills", "Reports"],
    connected: false,
  },
  {
    name: "Aqua Receipts",
    cardName: "Receipts",
    motion: "receipts",
    short: "RECEIPT INTELLIGENCE",
    icon: "▤",
    color: "#ff8f72",
    preview: { eyebrow: "AQUA RECEIPTS", title: "Receipt Command", metric: "Needs Attention", value: "—", tiles: ["Camera", "Inbox", "Projects"] },
    packages: ["com.aquasoftware.receipts.test", "com.aquasoftware.receipts"],
    status: "Receipts workspace ready",
    primaryTitle: "Receipt Intake",
    primaryValue: "Ready",
    primaryDetail: "Photo, email, text, WhatsApp and project routing",
    secondaryTitle: "Evidence State",
    secondaryValue: "Truthful",
    secondaryDetail: "Captured, queued and filed remain separate states",
    activity: ["Camera intake ready", "Project routing registered", "Books handoff boundary preserved"],
    widgets: ["Capture", "Inbox", "Projects"],
    connected: false,
  },
];

const stateLabels = {
  idle: "Tap here to speak to Aqua",
  connecting: "AQUA IS CONNECTING",
  listening: "AQUA IS LISTENING",
  thinking: "AQUA IS ANALYZING",
  speaking: "AQUA IS SPEAKING",
  error: "AQUA NEEDS ATTENTION",
};

let active = 0;
let rotating = false;
let rotationTimer = null;
let drag = null;
let inertiaFrame = null;
let suppressCardClickUntil = 0;
let authenticated = false;
let authenticatedEmail = "";
let filingInbox = [];
let filingBriefAnnounced = false;
let sound = true;
let notifications = true;
const widgetMessageStorageKey = "aqua-sentinel-widget-messages-v1";
let widgetMessages = loadWidgetMessages();
let widgetCommandInFlight = null;
const liveSnapshots = new Map();
const customerPreviewSnapshots = new Map();
const ecosystemPresentationSnapshots = new Map();
const snapshotStates = new Map();

function enableEcosystemPresentationMode() {
  let enabled = false;
  try {
    enabled = Boolean(window.AquaBridge?.isEcosystemPresentationMode?.());
  } catch (_) {
    enabled = false;
  }
  if (!enabled) return;

  const previews = {
    "Aqua CRM": {
      preview: { eyebrow: "AQUA CRM · PRESENTATION", title: "Customer Command", metric: "Active jobs", value: "12", tiles: ["Pipeline", "Clients", "Schedule"] },
      primary: { title: "Pipeline Today", value: "8 open leads", detail: "3 proposals due · 2 callbacks", rows: [["New leads", "4"], ["Proposals", "3"], ["Follow-ups", "2"]] },
      secondary: { title: "Job Operations", value: "12 active jobs", detail: "4 site visits scheduled today", rows: [["Today", "4 visits"], ["Overdue", "1 task"], ["Messages", "6 unread"]] },
    },
    AquaDraw: {
      preview: { eyebrow: "AQUADRAW · PRESENTATION", title: "Company Financial Health", metric: "Active budget", value: "$186K", tiles: ["Clients", "Jobs", "SOW"] },
      primary: { title: "Company Financial Health", value: "$186K active", detail: "$74K available across current jobs", rows: [["Original", "$214K"], ["Actual", "$112K"], ["Remaining", "$74K"]] },
      secondary: { title: "Draw Activity", value: "2 awaiting approval", detail: "$38,500 requested this cycle", rows: [["Approved", "$91K"], ["Requested", "$38.5K"], ["Overages", "$6.2K"]] },
    },
    AquaCam: {
      preview: { eyebrow: "AQUACAM · PRESENTATION", title: "Field Command", metric: "Crews active", value: "3", tiles: ["Clock In", "Capture", "Evidence"] },
      primary: { title: "Field Activity", value: "3 crews active", detail: "2 job sites reporting now", rows: [["Clocked in", "7 people"], ["Site scans", "5"], ["Flags", "2 review"]] },
      secondary: { title: "Evidence Today", value: "18 captures", detail: "Morning, progress, and closing evidence", rows: [["Photos", "11"], ["Videos", "5"], ["Before / after", "2 sets"]] },
    },
    "Aqua Knowledge Vault": {
      preview: { eyebrow: "KNOWLEDGE VAULT · PRESENTATION", title: "Enterprise Master Brain", metric: "Jurisdictions", value: "3", tiles: ["Sources", "Tax", "Code checks"] },
      primary: { title: "Current Knowledge", value: "3 jurisdictions", detail: "Massachusetts · New Hampshire · Maine", rows: [["Code checks", "6 ready"], ["Sources", "24 indexed"], ["Updates", "2 review"]] },
      secondary: { title: "Strategy & Risk", value: "4 active reviews", detail: "Tax strategy, workers’ comp, and liability", rows: [["Tax strategies", "2"], ["Workers’ comp", "1 audit"], ["Liability", "1 review"]] },
    },
    "Aqua Timesheet": {
      preview: { eyebrow: "AQUA TIMESHEET · PRESENTATION", title: "Workforce Today", metric: "On clock", value: "7", tiles: ["Crew", "Travel", "Payroll"] },
      primary: { title: "Today’s Labor", value: "7 on clock", detail: "42.5 labor hours recorded today", rows: [["Job site", "5"], ["Travel", "1"], ["Material stop", "1"]] },
      secondary: { title: "Payroll Review", value: "1 exception", detail: "Monday–Sunday payroll window", rows: [["Regular", "198.0 h"], ["Overtime", "6.5 h"], ["Queued punches", "1"]] },
    },
    "Aqua Books": {
      preview: { eyebrow: "AQUA BOOKS · PRESENTATION", title: "Financial Command", metric: "Cash position", value: "$84.2K", tiles: ["Review", "Bills", "Reports"] },
      primary: { title: "Cash & Ledger", value: "$84.2K available", detail: "Three operating accounts reconciled", rows: [["Receivables", "$46.8K"], ["Payables", "$19.4K"], ["Unmatched", "4 items"]] },
      secondary: { title: "Accounting Review", value: "6 items", detail: "Bills, coding, and close controls", rows: [["Bills due", "3"], ["Needs coding", "2"], ["Close alert", "1"]] },
    },
    "Aqua Receipts": {
      preview: { eyebrow: "AQUA RECEIPTS · PRESENTATION", title: "Receipt Command", metric: "Inbox", value: "14", tiles: ["Camera", "Email", "Projects"] },
      primary: { title: "Receipt Intake", value: "14 received", detail: "Photo, email, text, and WhatsApp", rows: [["Photographed", "6"], ["Email", "5"], ["Text / WhatsApp", "3"]] },
      secondary: { title: "Routing & Reconciliation", value: "3 need attention", detail: "Project, cost code, and bank matching", rows: [["Auto-routed", "9"], ["Duplicates", "2"], ["Needs project", "3"]] },
    },
  };

  Object.entries(previews).forEach(([name, snapshot]) => {
    ecosystemPresentationSnapshots.set(name, {
      ...snapshot,
      previewOnly: true,
      presentationMode: true,
    });
  });
}

function enableCustomerPreviewIfAuthorized() {
  let enabled = false;
  try {
    enabled = Boolean(window.AquaBridge?.isCustomerPreviewBuild?.());
  } catch (_) {
    enabled = false;
  }
  if (!enabled) return;
  customerPreviewSnapshots.set("Aqua Knowledge Vault", {
    previewOnly: true,
    preview: {
      eyebrow: "KNOWLEDGE VAULT · CUSTOMER PREVIEW",
      title: "Enterprise Master Brain",
      metric: "Current information",
      value: "Ready",
      tiles: ["Sources", "Syncs", "Code checks"],
    },
    primary: {
      title: "Current Information",
      value: "Customer view",
      detail: "Codes, tax, safety and job knowledge preview",
    },
    secondary: {
      title: "Sources · Syncs · Code Checks",
      value: "Preview ready",
      detail: "Synthetic test content until the verified app snapshot arrives",
    },
  });
}

function loadWidgetMessages() {
  try {
    const parsed = JSON.parse(localStorage.getItem(widgetMessageStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 40) : [];
  } catch {
    return [];
  }
}

function saveWidgetMessages() {
  try {
    localStorage.setItem(widgetMessageStorageKey, JSON.stringify(widgetMessages.slice(0, 40)));
  } catch (_) {}
}

function recordWidgetMessage(role, text, state) {
  const message = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text: String(text || "").trim(),
    state,
    createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
  };
  widgetMessages.unshift(message);
  widgetMessages = widgetMessages.slice(0, 40);
  saveWidgetMessages();
  return message;
}

function flushNextWidgetCommand() {
  if (!authenticated || widgetCommandInFlight) return;
  const pending = [...widgetMessages]
    .reverse()
    .find((message) => message.role === "You" && message.state.startsWith("Saved locally"));
  if (!pending) return;
  pending.state = "Sending to Aqua";
  widgetCommandInFlight = pending.id;
  saveWidgetMessages();
  window.receiveAquaText(pending.text);
}

function widgetMessagesMarkup() {
  const messages = widgetMessages.length
    ? widgetMessages.map((message) => `
        <article class="widget-message ${message.role === "Aqua" ? "aqua" : "owner"}">
          <header><strong>${escapeHtml(message.role)}</strong><small>${escapeHtml(message.createdAt)}</small></header>
          <p>${escapeHtml(message.text)}</p>
          <footer>${escapeHtml(message.state)}</footer>
        </article>`).join("")
    : `<div class="widget-message-empty">Messages fired from the Aqua Command Center widget will appear here.</div>`;
  return `${systemHeader("Messages")}
    <div class="widget-message-receipt">Command Center messages are saved locally first, then sent through Aqua when authenticated.</div>
    <div class="widget-message-list">${messages}</div>`;
}

const sentinel = document.getElementById("sentinel");
const appDeck = document.getElementById("appDeck");
const cardsTrack = document.getElementById("cardsTrack");
const deckDots = document.getElementById("deckDots");
const selectedAppLabel = document.getElementById("selectedAppLabel");
const appDashboard = document.getElementById("appDashboard");
const workspace = document.getElementById("workspace");
const detailSheet = document.getElementById("detailSheet");
const systemPanel = document.getElementById("systemPanel");
const authPanel = document.getElementById("authPanel");
const authForm = document.getElementById("authForm");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authSubmit = document.getElementById("authSubmit");
const authMessage = document.getElementById("authMessage");
const toast = document.getElementById("sentinelToast");
const aquaStateLabel = document.getElementById("aquaStateLabel");
let speechBeatTimer = null;

function relative(index) {
  let value = (index - active + apps.length) % apps.length;
  if (value > apps.length / 2) value -= apps.length;
  return value;
}

function setAquaState(state) {
  clearTimeout(speechBeatTimer);
  sentinel.className = `sentinel state-${state}`;
  aquaStateLabel.textContent = stateLabels[state] || stateLabels.idle;
}

window.pulseAquaSpeech = () => {
  if (!sentinel.classList.contains("state-speaking")) return;
  sentinel.classList.remove("speech-beat");
  void sentinel.offsetWidth;
  sentinel.classList.add("speech-beat");
  clearTimeout(speechBeatTimer);
  speechBeatTimer = setTimeout(() => {
    sentinel.classList.remove("speech-beat");
  }, 180);
};

let toastTimer = null;
function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 4200);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function selectedView(app) {
  const snapshot =
    liveSnapshots.get(app.name) ||
    ecosystemPresentationSnapshots.get(app.name) ||
    customerPreviewSnapshots.get(app.name);
  if (!snapshot) return app;
  return {
    ...app,
    previewOnly: Boolean(snapshot.previewOnly),
    preview: { ...app.preview, ...(snapshot.preview || {}) },
    previewImage: snapshot.previewImage || null,
    capturedAt: snapshot.capturedAt || null,
    primaryTitle: snapshot.primary?.title || app.primaryTitle,
    primaryValue: snapshot.primary?.value || app.primaryValue,
    primaryDetail: snapshot.primary?.detail || app.primaryDetail,
    primaryRows: Array.isArray(snapshot.primary?.rows) ? snapshot.primary.rows : [],
    secondaryTitle: snapshot.secondary?.title || app.secondaryTitle,
    secondaryValue: snapshot.secondary?.value || app.secondaryValue,
    secondaryDetail: snapshot.secondary?.detail || app.secondaryDetail,
    secondaryRows: Array.isArray(snapshot.secondary?.rows) ? snapshot.secondary.rows : [],
  };
}

function renderFallbackPreview(app, view) {
  const tile = (index) => escapeHtml(view.preview.tiles[index] || app.widgets[index] || "Open");
  const sharedHeader = `
    <div class="mini-appbar">
      <b>${escapeHtml(app.icon)}</b>
      <span>${escapeHtml(view.preview.eyebrow)}</span>
      <i></i>
    </div>`;
  const layouts = {
    "Aqua CRM": `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-kpis"><i><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong></i><i><small>Today</small><strong>—</strong></i></div>
      <div class="mini-list"><span><b></b>${tile(0)}<em>›</em></span><span><b></b>${tile(1)}<em>›</em></span><span><b></b>${tile(2)}<em>›</em></span></div>`,
    AquaDraw: `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-finance"><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong><i><b></b></i></div>
      <div class="mini-budget"><span>${tile(0)}<b></b></span><span>${tile(1)}<b></b></span><span>${tile(2)}<b></b></span></div>`,
    AquaCam: `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-viewfinder"><i></i><span>LIVE FIELD VIEW</span><b>+</b></div>
      <div class="mini-actions"><span>${tile(0)}</span><span>${tile(1)}</span><span>${tile(2)}</span></div>`,
    "Aqua Knowledge Vault": `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-search">Ask codes, tax, or compliance <b>⌕</b></div>
      <div class="mini-docs"><span><b>§</b>${tile(0)}</span><span><b>✓</b>${tile(1)}</span><span><b>▤</b>${tile(2)}</span></div>`,
    "Aqua Timesheet": `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-clock"><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong><i>READY</i></div>
      <div class="mini-week"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span></div>
      <div class="mini-actions"><span>${tile(0)}</span><span>${tile(1)}</span><span>${tile(2)}</span></div>`,
    "Aqua Books": `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-ledger-head"><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong></div>
      <div class="mini-ledger"><span>${tile(0)}<b>—</b></span><span>${tile(1)}<b>—</b></span><span>${tile(2)}<b>—</b></span></div>`,
    "Aqua Receipts": `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-inbox"><span><b>▣</b>${tile(0)}</span><span><b>✉</b>${tile(1)}</span><span><b>▤</b>${tile(2)}</span></div>
      <div class="mini-receipt"><i></i><span><b>Receipt inbox</b><small>Awaiting confirmed items</small></span><em>›</em></div>`,
  };
  return layouts[app.name] || `${sharedHeader}<h3>${escapeHtml(view.preview.title)}</h3>`;
}

function renderCarouselCover(app) {
  const motionMarkup = {
    crm: '<i></i><i></i><i></i><i></i><i></i>',
    draw: '<i class="fund-stream"></i><b class="approval-flare"></b>',
    cam: '<i class="focus-ring"></i><b class="capture-flash"></b>',
    vault: '<i class="vault-door"></i><b class="verified-document">✓</b>',
    timesheet: '<i class="signal-path"></i><b class="punch-marker">✓</b>',
    books: '<i class="balance-beam"></i><b class="cash-pulse">$</b>',
    receipts: '<i class="scan-line"></i><b class="scan-confirm">✓</b>',
  };
  return `
    <img class="carousel-art" src="./assets/carousel-v2/${escapeHtml(app.motion)}.webp" alt="">
    <div class="carousel-motion motion-${escapeHtml(app.motion)}" aria-hidden="true">
      ${motionMarkup[app.motion] || "<i></i>"}
    </div>`;
}

function dashboardPanelMarkup(app, view, previewImageUrl, kind) {
  if (previewImageUrl && !view.previewOnly) {
    return `
      <div class="dashboard-screen-sheet has-image">
        <div class="app-landing-preview has-image">
          <img src="${previewImageUrl}" alt="">
        </div>
      </div>`;
  }
  const primary = kind === "primary";
  const title = primary ? view.primaryTitle : view.secondaryTitle;
  const value = primary ? view.primaryValue : view.secondaryValue;
  const detail = primary ? view.primaryDetail : view.secondaryDetail;
  const rows = primary ? view.primaryRows : view.secondaryRows;
  const rowMarkup = (rows.length ? rows : app.widgets.map((label) => [label, "Ready"]))
    .slice(0, 3)
    .map(([label, rowValue]) => `
      <span><small>${escapeHtml(label)}</small><b>${escapeHtml(rowValue)}</b></span>`)
    .join("");
  return `
    <div class="dashboard-panel-preview">
      <div class="dashboard-panel-top">
        <i>${escapeHtml(app.icon)}</i>
        <span><small>${escapeHtml(app.name)}</small><strong>${escapeHtml(title)}</strong></span>
      </div>
      <div class="dashboard-panel-metric">
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(detail)}</small>
      </div>
      <div class="dashboard-panel-rows">
        ${rowMarkup}
      </div>
      <footer><span>PRESENTATION DATA</span><b>Preview only</b></footer>
    </div>`;
}

function snapshotPresentation(app) {
  const raw = snapshotStates.get(app.name) || "awaiting-live-connection";
  const hasSnapshot = liveSnapshots.has(app.name);
  if (!hasSnapshot && customerPreviewSnapshots.has(app.name)) {
    return { label: "Customer preview", className: "preview" };
  }
  if (!hasSnapshot && ecosystemPresentationSnapshots.has(app.name)) {
    return { label: "Presentation", className: "preview" };
  }
  if (raw === "needs-attention") return { label: "Needs attention", className: "needs-attention" };
  if (raw.includes("refresh")) return { label: hasSnapshot ? "Cached · refreshing" : "Refreshing", className: "refreshing" };
  if (hasSnapshot && /confirmed|live|connected/.test(raw)) return { label: "Live · confirmed", className: "confirmed" };
  if (hasSnapshot) return { label: "Verified snapshot", className: "confirmed" };
  return { label: "Local preview", className: "preview" };
}

function formatSnapshotTime(value) {
  if (!value) return "No confirmed refresh yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Confirmed time unavailable";
  return `Updated ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function safePreviewImage(previewImage) {
  if (!previewImage || typeof previewImage !== "object") return "";
  const mimeType = previewImage.mimeType;
  const base64 = previewImage.base64;
  if (!/^(image\/webp|image\/png)$/.test(mimeType || "")) return "";
  if (typeof base64 !== "string" || !/^[A-Za-z0-9+/=\r\n]+$/.test(base64)) return "";
  return `data:${mimeType};base64,${base64.replace(/\s/g, "")}`;
}

function requestSnapshot(app) {
  if (!window.AquaBridge?.requestAppSnapshot) return;
  snapshotStates.set(app.name, "refreshing");
  window.AquaBridge.requestAppSnapshot(app.name, JSON.stringify(app.packages));
}

window.refreshSelectedAppSnapshot = () => requestSnapshot(apps[active]);

window.receiveAppSnapshot = (appName, snapshotJson, state) => {
  const app = apps.find((item) => item.name === appName);
  if (!app) return;
  snapshotStates.set(appName, state || "awaiting");
  if (snapshotJson) {
    try {
      const snapshot = JSON.parse(snapshotJson);
      if (snapshot && typeof snapshot === "object") liveSnapshots.set(appName, snapshot);
    } catch (_) {
      snapshotStates.set(appName, "needs-attention");
    }
  }
  render();
};

function renderCards() {
  cardsTrack.innerHTML = "";
  deckDots.innerHTML = "";

  apps.forEach((app, index) => {
    const view = selectedView(app);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "app-card";
    card.dataset.index = String(index);
    card.style.setProperty("--app-color", app.color);
    card.setAttribute(
      "aria-label",
      index === active ? `Open ${app.name}` : `Move ${app.name} to center`,
    );
    card.innerHTML = `
      <div class="carousel-cover cover-${escapeHtml(app.motion)}" aria-hidden="true">
        ${renderCarouselCover(app)}
      </div>`;
    card.addEventListener("click", () => {
      if (performance.now() < suppressCardClickUntil) return;
      if (relative(index) !== 0) {
        centerApp(index, false);
        return;
      }
      if (!rotating) openWorkspace();
    });
    cardsTrack.appendChild(card);
  });

  apps.forEach((app, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === active ? "active" : "";
    dot.setAttribute("aria-label", `Center ${app.name}`);
    dot.addEventListener("click", () => centerApp(index, false));
    deckDots.appendChild(dot);
  });
  applyDeckPosition(0, false);
}

const DECK_PATH = [
  { offset: 0, width: 28.6, height: 76, top: 7.5, depth: 92, angle: 0, opacity: 1 },
  { offset: 22.7, width: 21, height: 68, top: 10, depth: -30, angle: 33, opacity: 0.91 },
  { offset: 39.6, width: 19.4, height: 62, top: 12, depth: -132, angle: 53, opacity: 0.68 },
  { offset: 51, width: 17.5, height: 56, top: 14, depth: -220, angle: 65, opacity: 0 },
];

function interpolate(from, to, progress) {
  return from + (to - from) * progress;
}

function deckGeometry(position) {
  const direction = Math.sign(position);
  const distance = Math.min(Math.abs(position), DECK_PATH.length - 1);
  const lowerIndex = Math.min(Math.floor(distance), DECK_PATH.length - 2);
  const upperIndex = lowerIndex + 1;
  const progress = distance - lowerIndex;
  const lower = DECK_PATH[lowerIndex];
  const upper = DECK_PATH[upperIndex];
  return {
    center: 50 + direction * interpolate(lower.offset, upper.offset, progress),
    width: interpolate(lower.width, upper.width, progress),
    height: interpolate(lower.height, upper.height, progress),
    top: interpolate(lower.top, upper.top, progress),
    depth: interpolate(lower.depth, upper.depth, progress),
    angle: -direction * interpolate(lower.angle, upper.angle, progress),
    opacity: interpolate(lower.opacity, upper.opacity, progress),
  };
}

function applyDeckPosition(offsetPx, animate) {
  const progress = offsetPx / deckStepPx();
  cardsTrack.querySelectorAll(".app-card").forEach((card) => {
    const index = Number(card.dataset.index);
    let position = relative(index) + progress;
    if (position > apps.length / 2) position -= apps.length;
    if (position < -apps.length / 2) position += apps.length;
    const distance = Math.abs(position);
    const geometry = deckGeometry(position);
    const visible = distance < DECK_PATH.length - 1;
    card.className = `app-card${Math.abs(position) < 0.5 ? " active" : ""}`;
    card.style.transition = animate
      ? "left .28s cubic-bezier(.18,.78,.22,1),top .28s cubic-bezier(.18,.78,.22,1),width .28s cubic-bezier(.18,.78,.22,1),height .28s cubic-bezier(.18,.78,.22,1),transform .28s cubic-bezier(.18,.78,.22,1),opacity .2s"
      : "none";
    card.style.left = `${geometry.center}%`;
    card.style.top = `${geometry.top}%`;
    card.style.width = `${geometry.width}%`;
    card.style.height = `${geometry.height}%`;
    card.style.zIndex = String(Math.max(1, 12 - Math.round(distance * 3)));
    card.style.opacity = visible ? String(Math.max(0, geometry.opacity)) : "0";
    card.style.pointerEvents = visible ? "auto" : "none";
    card.style.transform = `translateX(-50%) translateZ(${geometry.depth}px) rotateY(${geometry.angle}deg)`;
    card.setAttribute(
      "aria-label",
      Math.abs(position) < 0.5 ? `Open ${apps[index].name}` : `Move ${apps[index].name} to center`,
    );
  });
}

function renderDashboard() {
  const selected = selectedView(apps[active]);
  const presentation = snapshotPresentation(selected);
  const updated = selected.previewOnly
    ? "Presentation mode · synthetic preview"
    : formatSnapshotTime(selected.capturedAt);
  const previewImageUrl = safePreviewImage(selected.previewImage);
  appDashboard.style.setProperty("--app-color", selected.color);
  selectedAppLabel.textContent = selected.name;
  selectedAppLabel.style.setProperty("--app-color", selected.color);
  document.getElementById("primaryTitle").textContent = selected.primaryTitle;
  document.getElementById("primaryDetail").textContent = selected.primaryDetail;
  document.getElementById("primaryValue").textContent = selected.primaryValue;
  document.getElementById("primarySource").textContent = selected.name;
  document.getElementById("primaryStatus").textContent = presentation.label;
  document.getElementById("primaryBadge").textContent = presentation.label;
  document.getElementById("primaryBadge").className = presentation.className;
  document.getElementById("primaryUpdated").textContent = updated;
  document.getElementById("primaryScreen").innerHTML = dashboardPanelMarkup(
    selected,
    selected,
    previewImageUrl,
    "primary",
  );
  document.getElementById("secondaryTitle").textContent = selected.secondaryTitle;
  document.getElementById("secondaryDetail").textContent =
    selected.secondaryDetail;
  document.getElementById("secondaryValue").textContent =
    selected.secondaryValue;
  document.getElementById("secondarySource").textContent = selected.name;
  document.getElementById("secondaryStatus").textContent = presentation.label;
  document.getElementById("secondaryBadge").textContent = presentation.label;
  document.getElementById("secondaryBadge").className = presentation.className;
  document.getElementById("secondaryUpdated").textContent = updated;
  document.getElementById("secondaryScreen").innerHTML = dashboardPanelMarkup(
    selected,
    selected,
    previewImageUrl,
    "secondary",
  );
}

function render() {
  renderCards();
  renderDashboard();
}

function revealSelectedAppLabel() {
  selectedAppLabel.classList.remove("is-visible");
  void selectedAppLabel.offsetWidth;
  selectedAppLabel.classList.add("is-visible");
}

function finishRotation(openAfter) {
  rotating = false;
  appDeck.classList.remove("is-rotating");
  appDeck.classList.add("is-settled");
  renderDashboard();
  revealSelectedAppLabel();
  deckDots.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === active);
  });
  requestSnapshot(apps[active]);
  if (openAfter) openWorkspace();
}

function snapDeck(openAfter = false) {
  applyDeckPosition(0, true);
  clearTimeout(rotationTimer);
  rotationTimer = setTimeout(() => finishRotation(openAfter), 290);
}

function centerApp(index, openAfter) {
  clearTimeout(rotationTimer);
  rotating = true;
  appDeck.classList.remove("is-settled");
  appDeck.classList.add("is-rotating");
  selectedAppLabel.classList.remove("is-visible");
  active = (index + apps.length) % apps.length;
  closeOverlays();
  render();
  requestSnapshot(apps[active]);
  rotationTimer = setTimeout(() => finishRotation(openAfter), 320);
}

function rotate(direction) {
  centerApp(active + direction, false);
}

function openWorkspace() {
  if (rotating) return;
  const selected = apps[active];
  if (window.AquaBridge?.launchApp) {
    window.AquaBridge.launchApp(selected.name, JSON.stringify(selected.packages));
    return;
  }
  workspace.style.setProperty("--app-color", selected.color);
  workspace.innerHTML = `
    <button class="workspace-close" type="button" aria-label="Return to Sentinel">‹</button>
    <div class="workspace-brand">
      <span>${escapeHtml(selected.icon)}</span>
      <small>${escapeHtml(selected.short)}</small>
      <h1>${escapeHtml(selected.name)}</h1>
      <p>Opened inside Aqua Sentinel OS</p>
    </div>
    <div class="workspace-widgets">
      ${selected.widgets.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="workspace-grid">
      <button type="button" data-detail="primary">
        <small>${escapeHtml(selected.primaryTitle)}</small>
        <strong>${escapeHtml(selected.primaryValue)}</strong>
        <p>${escapeHtml(selected.primaryDetail)}</p>
      </button>
      <button type="button" data-detail="secondary">
        <small>${escapeHtml(selected.secondaryTitle)}</small>
        <strong>${escapeHtml(selected.secondaryValue)}</strong>
        <p>${escapeHtml(selected.secondaryDetail)}</p>
      </button>
    </div>
    <section class="workspace-activity">
      <small>RECENT SENTINEL ACTIVITY</small>
      ${selected.activity.map((item) => `<p><i>✓</i>${escapeHtml(item)}</p>`).join("")}
    </section>
    <div class="workspace-actions">
      <button class="ask-aqua" type="button">Ask Aqua about ${escapeHtml(selected.name)}</button>
      <button class="connection-status" type="button">
        ${selected.connected ? "Open connected app" : "Connection status"}
      </button>
    </div>
  `;
  workspace.hidden = false;
  workspace.querySelector(".workspace-close").addEventListener("click", () => {
    workspace.hidden = true;
  });
  workspace.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.detail));
  });
  workspace.querySelector(".ask-aqua").addEventListener("click", startVoice);
  workspace.querySelector(".connection-status").addEventListener("click", () => {
    notify(
      selected.connected
        ? `${selected.name} is registered with Sentinel`
        : `${selected.name} is awaiting its production data gateway`,
    );
  });
}

function openDetail(kind) {
  const selected = selectedView(apps[active]);
  const primary = kind === "primary";
  detailSheet.style.setProperty("--app-color", selected.color);
  detailSheet.innerHTML = `
    <button class="sheet-close" type="button" aria-label="Close details">×</button>
    <small>${escapeHtml(selected.name)} · ${primary ? "01" : "02"}</small>
    <h2>${escapeHtml(primary ? selected.primaryTitle : selected.secondaryTitle)}</h2>
    <strong>${escapeHtml(primary ? selected.primaryValue : selected.secondaryValue)}</strong>
    <p>${escapeHtml(primary ? selected.primaryDetail : selected.secondaryDetail)}</p>
    <div class="sheet-list">
      ${selected.activity.map((item) => `<span>✓ ${escapeHtml(item)}</span>`).join("")}
    </div>
    <button class="open-workspace" type="button">Open ${escapeHtml(selected.name)} workspace</button>
  `;
  detailSheet.hidden = false;
  detailSheet.querySelector(".sheet-close").addEventListener("click", () => {
    detailSheet.hidden = true;
  });
  detailSheet.querySelector(".open-workspace").addEventListener("click", () => {
    detailSheet.hidden = true;
    openWorkspace();
  });
}

function launchAppByIndex(index) {
  const app = apps[index];
  if (!app) return;
  if (window.AquaBridge?.launchApp) {
    window.AquaBridge.launchApp(app.name, JSON.stringify(app.packages));
  } else {
    active = index;
    notify(`${app.name} opens from the installed Android app.`);
  }
}

function portalMaterialization(index) {
  if (index >= apps.length) {
    window.refreshFilingInbox();
    openPanel("files");
    return;
  }
  const app = apps[index];
  showMaterialization({
    present: true,
    kind: "collection",
    title: app.name,
    subtitle: app.status,
    sourceApp: app.name,
    sourceRecordId: `portal-${app.motion}`,
    sourceState: app.connected ? "Confirmed" : "Needs Attention",
    confidence: 1,
    previewUri: "",
    fields: [
      { label: "Authority", value: app.secondaryDetail },
      { label: "Available here", value: app.widgets.join(" · ") },
      { label: "Connection", value: app.connected ? "Confirmed" : "Adapter pending" },
    ],
    actions: [
      { id: "open-source", label: `Open ${app.name}`, kind: "open_source", requiresConfirmation: false },
      { id: "dismiss", label: "Return to Neural Link", kind: "dismiss", requiresConfirmation: false },
    ],
    appIndex: index,
  });
}

function safeMaterializationUri(value) {
  const uri = String(value || "");
  if (/^data:image\/(png|webp|jpeg);base64,[A-Za-z0-9+/=\r\n]+$/.test(uri)) return uri;
  try {
    const parsed = new URL(uri);
    return parsed.protocol === "https:" ? parsed.href : "";
  } catch {
    return "";
  }
}

function showMaterialization(materialization) {
  if (!materialization?.present) return;
  const fields = Array.isArray(materialization.fields) ? materialization.fields : [];
  const actions = Array.isArray(materialization.actions) ? materialization.actions : [];
  const previewUri = safeMaterializationUri(materialization.previewUri);
  detailSheet.classList.add("aqua-materialization");
  detailSheet.style.setProperty("--app-color", "#34dcff");
  detailSheet.innerHTML = `
    <button class="sheet-close" type="button" aria-label="Return to Aqua">×</button>
    <div class="materialized-source"><i></i><span><small>${escapeHtml(materialization.sourceApp || "Aqua Sentinel")}</small><b>${escapeHtml(materialization.sourceState || "Needs Attention")}</b></span></div>
    <small>AQUA BROUGHT THIS FORWARD</small>
    <h2>${escapeHtml(materialization.title || "Requested item")}</h2>
    <p>${escapeHtml(materialization.subtitle || "")}</p>
    ${previewUri ? `<div class="materialized-preview"><img src="${escapeHtml(previewUri)}" alt="${escapeHtml(materialization.title || "Requested item")}" /></div>` : `<div class="materialized-object"><span>${escapeHtml(String(materialization.kind || "file").slice(0, 1).toUpperCase())}</span><i></i></div>`}
    <div class="materialized-fields">${fields.map((field) => `<span><small>${escapeHtml(field.label)}</small><strong>${escapeHtml(field.value)}</strong></span>`).join("")}</div>
    <div class="materialized-actions">
      <button type="button" data-materialized-expand>Open full screen</button>
      ${actions.map((action) => `<button type="button" data-materialized-action="${escapeHtml(action.kind)}">${escapeHtml(action.label)}</button>`).join("")}
    </div>`;
  detailSheet.hidden = false;
  detailSheet.querySelector(".sheet-close").addEventListener("click", () => {
    detailSheet.hidden = true;
    detailSheet.classList.remove("is-full", "aqua-materialization");
  });
  detailSheet.querySelector("[data-materialized-expand]").addEventListener("click", () => {
    detailSheet.classList.add("is-full");
  });
  detailSheet.addEventListener("click", (event) => {
    if (
      event.target.closest("button") ||
      detailSheet.classList.contains("is-full")
    ) return;
    detailSheet.classList.add("is-full");
  }, { once: true });
  detailSheet.querySelectorAll("[data-materialized-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const kind = button.dataset.materializedAction;
      if (kind === "dismiss") {
        detailSheet.hidden = true;
        detailSheet.classList.remove("is-full", "aqua-materialization");
        return;
      }
      if (kind === "open_source") {
        const index = Number.isInteger(materialization.appIndex)
          ? materialization.appIndex
          : apps.findIndex((app) => app.name === materialization.sourceApp);
        if (index >= 0) launchAppByIndex(index);
        else notify("The authoritative source app has not registered a verified deep link yet.");
      }
    });
  });
}

function closeOverlays() {
  workspace.hidden = true;
  detailSheet.hidden = true;
  detailSheet.classList.remove("is-full", "aqua-materialization");
  systemPanel.hidden = true;
}

function systemHeader(title) {
  return `
    <header>
      <button type="button" class="panel-close">‹</button>
      <div><small>AQUA SENTINEL OS</small><h2>${escapeHtml(title)}</h2></div>
    </header>
  `;
}

function filingTypeIcon(type) {
  if (type === "photo") return "▧";
  if (type === "video") return "▶";
  return "▤";
}

function filingCabinetMarkup(includeHeader = true) {
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  const routed = filingInbox.filter((item) => item.destination).length;
  const items = filingInbox.length
    ? filingInbox.map((item) => `
        <article class="filing-item">
          <header>
            <i>${filingTypeIcon(item.type)}</i>
            <span><strong>${escapeHtml(item.title || "Captured item")}</strong><small>${escapeHtml(item.destination || "Aqua needs a filing destination")}</small></span>
            <b>${escapeHtml(item.state || "Saved Locally")}</b>
          </header>
          <p>${escapeHtml(item.note || "Evidence captured and protected.")}</p>
          <small>${escapeHtml(item.createdLabel || "Captured just now")}</small>
          ${item.needsClarification ? `<button class="filing-clarify" type="button" data-clarify-id="${escapeHtml(item.id)}">Tell Aqua where this goes</button>` : ""}
        </article>`).join("")
    : `<div class="filing-empty">The filing tray is clear. Voice, photo, and video captures from the Command Center will appear here.</div>`;
  return `${includeHeader ? systemHeader("Aqua File Cabinet") : ""}
    <div class="filing-summary">
      <article><small>Pending clarification</small><strong>${pending}</strong></article>
      <article><small>Auto-routed</small><strong>${routed}</strong></article>
    </div>
    <div class="filing-actions">
      <button type="button" data-filing-action="voice">File by voice</button>
      <button type="button" data-filing-action="photo">Add photo</button>
      <button type="button" data-filing-action="video">Add video</button>
    </div>
    <div class="filing-list">${items}</div>`;
}

function neuralWorkspaceMarkup() {
  const portalPositions = [
    [50, 10], [78, 20], [88, 47], [76, 74],
    [50, 83], [24, 74], [12, 47], [22, 20],
  ];
  const portalApps = [
    ...apps,
    {
      name: "File Cabinet",
      short: "SENTINEL EVIDENCE",
      icon: "▤",
      color: "#8cecff",
      authority: "Local captures, filing queue, and authorized projections",
    },
  ];
  const portals = portalApps.map((app, index) => {
    const [x, y] = portalPositions[index];
    return `<article class="neural-portal" style="--portal-x:${x}%;--portal-y:${y}%;--portal-color:${app.color}" data-portal-index="${index}">
      <button class="portal-pull" type="button" data-neural-portal="${index}" aria-label="Pull ${escapeHtml(app.name)} forward">
        <i>${escapeHtml(app.icon)}</i><span>${escapeHtml(app.name.replace("Aqua ", ""))}</span><small>Preview</small>
      </button>
      <button class="portal-open" type="button" data-neural-open="${index}" aria-label="Open ${escapeHtml(app.name)} immediately"><span>↗</span></button>
    </article>`;
  }).join("");
  const paths = portalPositions.map(([x, y], index) =>
    `<line x1="${x}" y1="${y}" x2="50" y2="47" data-neural-path="${index}"></line>`,
  ).join("");

  return `${systemHeader("Neural Workspace")}
    <section class="neural-shell" aria-label="Aqua Sentinel Neural Link">
      <div class="neural-identity">
        <small>AQUA SENTINEL NEURAL LINK</small>
        <h1>Neural Workspace</h1>
        <p>Ask Aqua · Pull to preview · Arrow to open</p>
      </div>
      <div class="neural-stage">
        <div class="neural-horizon" aria-hidden="true"></div>
        <svg class="neural-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>
        <div class="neural-flow" aria-hidden="true"><i></i><i></i><i></i></div>
        <button class="neural-core" type="button" data-neural-ask aria-label="Talk to Aqua">
          <span class="neural-a">A</span>
          <small>Talk to Aqua</small>
        </button>
        ${portals}
        <div class="neural-tools" aria-label="Sentinel controls">
          <button type="button" data-neural-destination="diagnostics" aria-label="Open Diagnostics"><i>◇</i><strong>Diagnostics</strong></button>
          <button type="button" data-neural-destination="settings" aria-label="Open Settings"><i>☷</i><strong>Settings</strong></button>
        </div>
      </div>
      <nav class="space-switcher" aria-label="Sentinel spaces">
        <button type="button" data-space="home">Home</button>
        <button class="active" type="button" data-space="neural">Neural Link</button>
        <button type="button" data-space="command">Command</button>
      </nav>
    </section>`;
}

function commandCenterMarkup() {
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  const queuedMessages = widgetMessages.filter((message) => /saved|attention/i.test(message.state)).length;
  return `${systemHeader("Command Center")}
    <section class="command-shell">
      <div class="command-identity">
        <small>AQUA SENTINEL OS</small>
        <h1>Your company, held together by Aqua.</h1>
        <p>Files, captures, commands, and broken connections stay visible until their authoritative destination confirms them.</p>
      </div>
      <button class="command-vault" type="button" data-command-view="files">
        <span class="vault-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="vault-copy"><small>AQUA FILE CABINET</small><strong>${pending ? `${pending} ${pending === 1 ? "item needs" : "items need"} your direction` : "Everything filed is within reach"}</strong><em>Receipts · contracts · photographs · timecards · evidence</em></span>
        <b>${pending ? "Needs Attention" : "Open Vault"}</b>
      </button>
      <div class="command-capture" aria-label="Quick filing actions">
        <button type="button" data-filing-action="voice"><i>≈</i><span>File by voice</span></button>
        <button type="button" data-filing-action="photo"><i>▧</i><span>Add photo</span></button>
        <button type="button" data-filing-action="video"><i>▶</i><span>Add video</span></button>
      </div>
      <div class="command-status">
        <article><i>◌</i><span><strong>Aqua conversation</strong><small>${queuedMessages ? `${queuedMessages} locally retained` : "No unsent owner commands"}</small></span><b>${authenticated ? "Connected" : "Local"}</b></article>
        <article><i>◇</i><span><strong>Ecosystem links</strong><small>Satellite adapters report their own authority</small></span><b>Inspect</b></article>
      </div>
      <div class="command-actions">
        <button type="button" data-command-view="messages"><span>Conversation receipts</span><small>Saved, delivered, and needs-attention commands</small></button>
        <button type="button" data-command-view="diagnostics"><span>Diagnostics</span><small>Find the exact broken boundary</small></button>
        <button type="button" data-command-view="settings"><span>Settings</span><small>Configure Sentinel without leaving Aqua</small></button>
      </div>
      <nav class="space-switcher" aria-label="Sentinel spaces">
        <button type="button" data-space="home">Home</button>
        <button type="button" data-space="neural">Neural Link</button>
        <button class="active" type="button" data-space="command">Command</button>
      </nav>
    </section>`;
}

function diagnosticsMarkup() {
  const nativeReady = Boolean(window.AquaBridge);
  const issues = [];
  if (!authenticated) issues.push("Owner session is not connected.");
  if (!nativeReady) issues.push("Native Android bridges are unavailable in this browser preview.");
  apps.filter((app) => !app.connected).forEach((app) => {
    issues.push(`${app.name} has not published a confirmed Sentinel adapter.`);
  });
  return `${systemHeader("Diagnostics")}
    <section class="diagnostic-shell">
      <div class="diagnostic-orb ${issues.length ? "attention" : "confirmed"}"><i></i><strong>${issues.length ? "Aqua found connection boundaries" : "Sentinel is fully connected"}</strong><small>No silent failures</small></div>
      <div class="diagnostic-list">
        <article><span><strong>Owner session</strong><small>Encrypted device session and gateway identity</small></span><b>${authenticated ? "Confirmed" : "Needs Attention"}</b></article>
        <article><span><strong>Aqua gateway</strong><small>Server-only AI and guarded capability routing</small></span><b>${authenticated ? "Session ready" : "Sign in required"}</b></article>
        <article><span><strong>Voice and device bridge</strong><small>Speech, capture, File Cabinet, and app launch</small></span><b>${nativeReady ? "Available" : "Preview only"}</b></article>
      </div>
      <div class="diagnostic-reports">${issues.length
        ? issues.map((issue) => `<p><i>!</i><span>${escapeHtml(issue)}</span></p>`).join("")
        : `<p><i>✓</i><span>No actionable failures are visible.</span></p>`}</div>
      <button class="diagnostic-return" type="button" data-space="command">Return to Command Center</button>
    </section>`;
}

function settingsMarkup() {
  return `${systemHeader("Settings")}
    <section class="settings-hero"><small>AQUA SENTINEL OS</small><h1>Make Aqua feel like yours.</h1><p>These controls change Sentinel’s behavior and connected services. The approved Home artwork remains protected.</p></section>
    <div class="settings-list enriched">
      <button type="button" data-setting="sound"><i>◉</i><span><strong>Aqua voice feedback</strong><small>Speech, shimmer, and speaking presence</small></span><b>${sound ? "ON" : "OFF"}</b></button>
      <button type="button" data-setting="notifications"><i>◇</i><span><strong>Owner notifications</strong><small>Approvals, receipts, filing, and failures</small></span><b>${notifications ? "ON" : "OFF"}</b></button>
      <button type="button" data-setting="voice-test"><i>≈</i><span><strong>Voice and presence test</strong><small>Hear Aqua and verify the living center</small></span><b>TEST</b></button>
      <button type="button" data-setting="permissions"><i>⌾</i><span><strong>Privacy and permissions</strong><small>Microphone, camera, files, and connected app access</small></span><b>REVIEW</b></button>
      <button type="button" data-setting="integrations"><i>∞</i><span><strong>Ecosystem connections</strong><small>Authoritative apps, capabilities, and deep links</small></span><b>${apps.filter((app) => app.connected).length}/${apps.length}</b></button>
      <button type="button" data-setting="storage"><i>▤</i><span><strong>Storage and synchronization</strong><small>Local evidence, queues, cloud confirmation, and retention</small></span><b>OPEN</b></button>
      <button type="button" data-setting="diagnostics"><i>◇</i><span><strong>Diagnostics</strong><small>Actionable reports with correlation receipts</small></span><b>CHECK</b></button>
      <button type="button" data-setting="about"><i>A</i><span><strong>About Aqua Sentinel OS</strong><small>Version, security boundary, and connected contracts</small></span><b>0.6</b></button>
    </div>`;
}

function updateFilingBadge() {
  const badge = document.getElementById("filingPendingBadge");
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  badge.textContent = String(Math.min(99, pending));
  badge.hidden = pending === 0;
}

function openPanel(kind) {
  const railKind = ["messages", "files", "diagnostics"].includes(kind)
    ? "command"
    : kind;
  document.querySelectorAll(".bottom-rail button").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === railKind);
  });
  if (kind === "home") {
    closeOverlays();
    return;
  }

  if (kind === "neural") {
    systemPanel.innerHTML = neuralWorkspaceMarkup();
  } else if (kind === "command") {
    systemPanel.innerHTML = commandCenterMarkup();
  } else if (kind === "messages") {
    systemPanel.innerHTML = widgetMessagesMarkup();
  } else if (kind === "files") {
    systemPanel.innerHTML = filingCabinetMarkup();
  } else if (kind === "diagnostics") {
    systemPanel.innerHTML = diagnosticsMarkup();
  } else if (kind === "data") {
    systemPanel.innerHTML =
      systemHeader("Data Hub") +
      `<div class="registry-grid">${apps
        .map(
          (app, index) => `
            <button type="button" data-app="${index}">
              <i style="color:${app.color}">${escapeHtml(app.icon)}</i>
              <strong>${escapeHtml(app.name)}</strong>
              <small>${app.connected ? "SENTINEL CORE" : "GATEWAY PENDING"}</small>
            </button>`,
        )
        .join("")}</div>`;
  } else if (kind === "settings") {
    systemPanel.innerHTML = settingsMarkup();
  } else {
    systemPanel.innerHTML =
      systemHeader("Sign Out") +
      `<div class="signout-panel">
        <div>A</div>
        <h3>End this Sentinel session?</h3>
        <p>Aqua’s server memory remains secure and available after your next sign-in.</p>
        <button class="confirm-signout" type="button">Confirm sign out</button>
        <button class="panel-close" type="button">Cancel</button>
      </div>`;
  }

  systemPanel.hidden = false;
  systemPanel.dataset.panel = kind;
  systemPanel.querySelectorAll(".panel-close").forEach((button) => {
    button.addEventListener("click", () => openPanel("home"));
  });
  systemPanel.querySelectorAll("[data-space]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.space));
  });
  systemPanel.querySelector("[data-neural-ask]")?.addEventListener("click", startVoice);
  systemPanel.querySelectorAll("[data-neural-portal]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      const portal = button.closest(".neural-portal");
      portal?.classList.add("is-pulling");
      button.dataset.pullStartX = String(event.clientX);
      button.dataset.pullStartY = String(event.clientY);
      button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener("pointermove", (event) => {
      if (!button.hasPointerCapture?.(event.pointerId)) return;
      const startX = Number(button.dataset.pullStartX || event.clientX);
      const startY = Number(button.dataset.pullStartY || event.clientY);
      const distance = Math.hypot(event.clientX - startX, event.clientY - startY);
      button.closest(".neural-portal")?.style.setProperty(
        "--portal-pull",
        String(Math.min(1, distance / 64)),
      );
    });
    button.addEventListener("pointerup", (event) => {
      const portal = button.closest(".neural-portal");
      portal?.classList.remove("is-pulling");
      portal?.classList.add("is-routing");
      portal?.style.removeProperty("--portal-pull");
      try { button.releasePointerCapture?.(event.pointerId); } catch {}
      setTimeout(() => portal?.classList.remove("is-routing"), 760);
    });
    button.addEventListener("pointercancel", () => {
      const portal = button.closest(".neural-portal");
      portal?.classList.remove("is-pulling");
      portal?.style.removeProperty("--portal-pull");
    });
    button.addEventListener("click", () => {
      const index = Number(button.dataset.neuralPortal);
      const stage = button.closest(".neural-stage");
      stage?.querySelectorAll("[data-neural-path]").forEach((path) => {
        path.classList.toggle("is-active", Number(path.dataset.neuralPath) === index);
      });
      stage?.classList.add("is-routing");
      setTimeout(() => stage?.classList.remove("is-routing"), 920);
      setTimeout(() => portalMaterialization(index), 180);
    });
  });
  systemPanel.querySelectorAll("[data-neural-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.neuralOpen);
      if (index >= apps.length) openPanel("files");
      else launchAppByIndex(index);
    });
  });
  systemPanel.querySelectorAll("[data-neural-destination]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.neuralDestination));
  });
  systemPanel.querySelectorAll("[data-command-view]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.commandView));
  });
  systemPanel.querySelectorAll("[data-app]").forEach((button) => {
    button.addEventListener("click", () => {
      centerApp(Number(button.dataset.app), false);
      openPanel("home");
    });
  });
  systemPanel.querySelectorAll("[data-setting]").forEach((button) => {
    button.addEventListener("click", () => {
      const setting = button.dataset.setting;
      if (setting === "sound") {
        sound = !sound;
        openPanel("settings");
      } else if (setting === "notifications") {
        notifications = !notifications;
        openPanel("settings");
      } else if (setting === "voice-test") {
        systemPanel.hidden = true;
        setAquaState("speaking");
        if (sound && window.AquaBridge?.speak) {
          window.AquaBridge.speak("Aqua Sentinel voice systems are ready.");
        } else {
          setTimeout(() => setAquaState("idle"), 1800);
        }
      } else if (setting === "diagnostics") {
        openPanel("diagnostics");
      } else if (setting === "integrations") {
        openPanel("data");
      } else if (setting === "storage") {
        openPanel("files");
      } else if (setting === "permissions") {
        notify("Android permission controls open from the installed app when a protected capability is requested.");
      } else {
        notify(
          "Aqua Sentinel OS · server-owned AI · encrypted device sessions · authoritative satellite records",
        );
      }
    });
  });
  systemPanel.querySelectorAll("[data-filing-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.AquaBridge?.startFilingCapture) {
        const mode = button.dataset.filingAction;
        openPanel("home");
        window.AquaBridge.startFilingCapture(mode);
      } else {
        notify("Filing capture is available in the installed Android app.");
      }
    });
  });
  systemPanel.querySelectorAll("[data-clarify-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.AquaBridge?.startFilingClarification) {
        window.AquaBridge.startFilingClarification(button.dataset.clarifyId);
      } else {
        notify("Filing clarification is available in the installed Android app.");
      }
    });
  });
  systemPanel.querySelector(".confirm-signout")?.addEventListener("click", () => {
    window.AquaBridge?.signOut();
    receiveAuthState(JSON.stringify({ authenticated: false }));
  });
}

function applyAquaAction(action) {
  if (!action || action.type === "none") return;
  if (action.type === "open_neural_link") {
    openPanel("neural");
    return;
  }
  if (action.type === "open_command_center") {
    openPanel("command");
    return;
  }
  if (action.type === "open_source_app") {
    const requested = String(action.app || "").toLowerCase();
    const index = apps.findIndex((app) => app.name.toLowerCase().includes(requested));
    if (index >= 0) launchAppByIndex(index);
    return;
  }
  if (action.type === "rotate_next") {
    rotate(1);
    return;
  }
  if (action.type === "rotate_previous") {
    rotate(-1);
    return;
  }
  if (action.type === "open_primary") {
    openDetail("primary");
    return;
  }
  if (action.type === "open_secondary") {
    openDetail("secondary");
    return;
  }
  if (action.type === "open_app") {
    const requested = String(action.app || "").toLowerCase();
    const index = apps.findIndex(
      (app) =>
        app.name.toLowerCase() === requested ||
        app.name.toLowerCase().includes(requested) ||
        requested.includes(app.name.toLowerCase()),
    );
    if (index >= 0) centerApp(index, true);
  }
}

function activateDeterministicPreviewRoute() {
  const previewPanel = new URLSearchParams(window.location.search).get("preview");
  if (!["neural", "command", "settings", "diagnostics"].includes(previewPanel)) {
    return false;
  }
  authenticated = true;
  authPanel.hidden = true;
  openPanel(previewPanel);
  document.documentElement.dataset.aquaPreviewReady = previewPanel;
  return true;
}

function startVoice() {
  if (!authenticated) {
    authPanel.hidden = false;
    authMessage.textContent = "Owner sign-in is required before Aqua can listen.";
    return;
  }
  if (!window.AquaBridge?.startListening) {
    notify("Native voice is available in the installed Android APK.");
    return;
  }
  setAquaState("listening");
  window.AquaBridge.startListening();
}

window.receiveAquaPartial = (text) => {
  if (text) aquaStateLabel.textContent = "AQUA IS LISTENING";
};

window.receiveAquaText = (text) => {
  const command = String(text || "").trim();
  if (!command) {
    setAquaState("idle");
    return;
  }
  setAquaState("thinking");
  const selected = apps[active];
  const context = {
    surface: systemPanel.hidden ? "Home" : systemPanel.dataset.panel || "Home",
    selectedApp: selected.name,
    primary: {
      title: selected.primaryTitle,
      value: selected.primaryValue,
      detail: selected.primaryDetail,
    },
    secondary: {
      title: selected.secondaryTitle,
      value: selected.secondaryValue,
      detail: selected.secondaryDetail,
    },
    connected: selected.connected,
  };
  window.AquaBridge.askAqua(command, selected.name, JSON.stringify(context));
};

window.receiveWidgetCommand = (text) => {
  const command = String(text || "").trim();
  if (!command) return;
  recordWidgetMessage("You", command, "Saved locally · awaiting Aqua");
  openPanel("command");
  notify(authenticated ? "Command Center message received. Sending to Aqua." : "Command Center message saved locally.");
  if (authenticated) {
    flushNextWidgetCommand();
  } else {
    authMessage.textContent = "Your widget message is saved locally. Sign in to send it through Aqua Brain.";
  }
};

window.receiveAquaResponse = (raw) => {
  try {
    const response = typeof raw === "string" ? JSON.parse(raw) : raw;
    applyAquaAction(response.action);
    showMaterialization(response.materialization);
    const reply = String(response.reply || "I’m ready.");
    if (widgetCommandInFlight) {
      const delivered = widgetMessages.find((message) => message.id === widgetCommandInFlight);
      if (delivered) delivered.state = "Delivered to Aqua";
      widgetCommandInFlight = null;
      saveWidgetMessages();
    }
    recordWidgetMessage("Aqua", reply, String(response.receipt?.status || "Needs Attention"));
    if (systemPanel.dataset.panel === "messages") {
      openPanel("messages");
    }
    notify(reply);
    if (sound && window.AquaBridge?.speak) {
      window.AquaBridge.speak(reply);
    } else {
      setAquaState("idle");
    }
    flushNextWidgetCommand();
  } catch {
    window.receiveAquaError("Aqua received an unreadable secure response.");
  }
};

window.receiveAquaError = (message) => {
  if (widgetCommandInFlight) {
    const failed = widgetMessages.find((item) => item.id === widgetCommandInFlight);
    if (failed) failed.state = "Needs attention · retained locally";
    widgetCommandInFlight = null;
    saveWidgetMessages();
  }
  setAquaState("error");
  notify(String(message || "Aqua could not complete that request."));
  setTimeout(() => setAquaState("idle"), 3500);
};

window.setAquaSpeaking = (speaking) => {
  setAquaState(speaking ? "speaking" : "idle");
};

window.setAquaThinking = () => {
  setAquaState("thinking");
};

window.receiveAuthState = (raw) => {
  let state = raw;
  try {
    if (typeof raw === "string") state = JSON.parse(raw);
  } catch {
    state = { authenticated: false };
  }
  authenticated = Boolean(state?.authenticated);
  authenticatedEmail = String(state?.email || "");
  authPanel.hidden = authenticated;
  if (authenticated) {
    authMessage.textContent = "";
    authPassword.value = "";
    setAquaState("idle");
    window.refreshFilingInbox();
    flushNextWidgetCommand();
  }
};

window.receiveAuthResult = (raw) => {
  let result = raw;
  try {
    if (typeof raw === "string") result = JSON.parse(raw);
  } catch {
    result = { success: false, error: "Aqua sign-in returned an unreadable result." };
  }
  authSubmit.disabled = false;
  authSubmit.textContent = "Connect Aqua Brain";
  if (!result?.success) {
    authMessage.textContent = String(
      result?.error || "Aqua could not verify that sign-in.",
    );
    return;
  }
  receiveAuthState(
    JSON.stringify({ authenticated: true, email: result.email || authEmail.value }),
  );
  notify("Aqua Brain connected. Persistent memory is ready.");
};

window.closeAquaDetails = () => {
  if (!systemPanel.hidden) {
    openPanel("home");
  } else if (!detailSheet.hidden) {
    detailSheet.hidden = true;
  } else if (!workspace.hidden) {
    workspace.hidden = true;
  }
};

window.receiveFilingInbox = (raw) => {
  try {
    const payload = typeof raw === "string" ? JSON.parse(raw) : raw;
    filingInbox = Array.isArray(payload?.items) ? payload.items : [];
  } catch {
    filingInbox = [];
  }
  updateFilingBadge();
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  if (authenticated && sound && pending > 0 && !filingBriefAnnounced) {
    filingBriefAnnounced = true;
    window.AquaBridge?.speak(`Hey, you have ${pending} pending ${pending === 1 ? "item" : "items"} that ${pending === 1 ? "needs" : "need"} to be filed.`);
  }
  if (!systemPanel.hidden && ["files", "command"].includes(systemPanel.dataset.panel)) {
    openPanel(systemPanel.dataset.panel);
  }
};

window.refreshFilingInbox = () => {
  if (window.AquaBridge?.getFilingInbox) {
    window.receiveFilingInbox(window.AquaBridge.getFilingInbox());
  }
};

window.openFilingCabinet = () => {
  window.refreshFilingInbox();
  openPanel("files");
};

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  authMessage.textContent = "";
  authSubmit.disabled = true;
  authSubmit.textContent = "Connecting…";
  if (!window.AquaBridge?.signIn) {
    authSubmit.disabled = false;
    authSubmit.textContent = "Connect Aqua Brain";
    authMessage.textContent =
      "Secure owner sign-in is available in the installed Android APK.";
    return;
  }
  window.AquaBridge.signIn(authEmail.value.trim(), authPassword.value);
});

document.getElementById("aquaButton").addEventListener("click", startVoice);
document.getElementById("previousApp").addEventListener("click", () => rotate(-1));
document.getElementById("nextApp").addEventListener("click", () => rotate(1));
document
  .getElementById("primaryDashboard")
  .addEventListener("click", () => openDetail("primary"));
document
  .getElementById("secondaryDashboard")
  .addEventListener("click", () => openDetail("secondary"));

document.querySelectorAll(".bottom-rail button").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.panel));
});

function stopDeckInertia() {
  if (inertiaFrame !== null) cancelAnimationFrame(inertiaFrame);
  inertiaFrame = null;
}

function stepDeck(direction) {
  active = (active + direction + apps.length) % apps.length;
  closeOverlays();
}

function deckStepPx() {
  return Math.max(44, Math.min(92, appDeck.clientWidth * 0.112));
}

function coastDeck(initialVelocity) {
  stopDeckInertia();
  rotating = true;
  appDeck.classList.remove("is-settled");
  appDeck.classList.add("is-rotating");
  selectedAppLabel.classList.remove("is-visible");
  let velocity = Math.max(-3.4, Math.min(3.4, initialVelocity));
  let position = 0;
  let lastTime = performance.now();
  const coast = (now) => {
    const stepPx = deckStepPx();
    const elapsed = Math.min(34, now - lastTime);
    lastTime = now;
    position += velocity * elapsed;
    while (Math.abs(position) >= stepPx) {
      const direction = position < 0 ? 1 : -1;
      stepDeck(direction);
      position += direction * stepPx;
    }
    applyDeckPosition(position, false);
    velocity *= Math.pow(0.972, elapsed / 16.67);
    if (Math.abs(velocity) > 0.012) {
      inertiaFrame = requestAnimationFrame(coast);
      return;
    }
    inertiaFrame = null;
    if (Math.abs(position) >= stepPx * 0.24) {
      stepDeck(position < 0 ? 1 : -1);
    }
    snapDeck(false);
  };
  inertiaFrame = requestAnimationFrame(coast);
}

appDeck.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  stopDeckInertia();
  clearTimeout(rotationTimer);
  rotating = false;
  drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startedAt: performance.now(),
    lastX: event.clientX,
    lastTime: performance.now(),
    velocityX: 0,
    residualX: 0,
    horizontal: false,
  };
  appDeck.setPointerCapture?.(event.pointerId);
});

appDeck.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const totalX = event.clientX - drag.startX;
  const totalY = event.clientY - drag.startY;
  const now = performance.now();
  if (!drag.horizontal && Math.abs(totalX) > 1.5 && Math.abs(totalX) > Math.abs(totalY) * 0.72) {
    drag.horizontal = true;
    rotating = true;
    appDeck.classList.remove("is-settled");
    appDeck.classList.add("is-rotating");
  }
  if (!drag.horizontal) return;
  event.preventDefault();
  const frameX = event.clientX - drag.lastX;
  const frameTime = Math.max(1, now - drag.lastTime);
  drag.velocityX = drag.velocityX * 0.42 + (frameX / frameTime) * 0.58;
  drag.residualX += frameX;
  const stepPx = deckStepPx();
  while (Math.abs(drag.residualX) >= stepPx) {
    const direction = drag.residualX < 0 ? 1 : -1;
    stepDeck(direction);
    drag.residualX += direction * stepPx;
  }
  applyDeckPosition(drag.residualX, false);
  drag.lastX = event.clientX;
  drag.lastTime = now;
});

function finishDeckDrag(event, cancelled = false) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const wasHorizontal = drag.horizontal;
  const elapsed = Math.max(1, performance.now() - drag.startedAt);
  const averageVelocity = (event.clientX - drag.startX) / elapsed;
  const velocityX = cancelled
    ? 0
    : drag.velocityX * 0.68 + averageVelocity * 0.32;
  const residualX = drag.residualX;
  const stepPx = deckStepPx();
  try { appDeck.releasePointerCapture?.(event.pointerId); } catch {}
  drag = null;
  if (!wasHorizontal) {
    applyDeckPosition(0, false);
    return;
  }
  suppressCardClickUntil = performance.now() + 450;
  if (Math.abs(velocityX) >= 0.035) {
    coastDeck(velocityX);
    return;
  }
  if (Math.abs(residualX) >= stepPx * 0.24) {
    stepDeck(residualX < 0 ? 1 : -1);
  }
  snapDeck(false);
}

appDeck.addEventListener("pointerup", (event) => finishDeckDrag(event));
appDeck.addEventListener("pointercancel", (event) => finishDeckDrag(event, true));
appDeck.addEventListener("lostpointercapture", (event) => {
  if (drag && event.pointerId === drag.pointerId) finishDeckDrag(event, true);
});

enableCustomerPreviewIfAuthorized();
enableEcosystemPresentationMode();
render();
const deterministicPreviewActive = activateDeterministicPreviewRoute();
requestAnimationFrame(revealSelectedAppLabel);
requestSnapshot(apps[active]);
setInterval(() => {
  if (document.visibilityState === "visible") requestSnapshot(apps[active]);
}, 60_000);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") requestSnapshot(apps[active]);
});

if (deterministicPreviewActive) {
  // CI-only visual proof route. Normal Android and browser startup remain unchanged.
} else if (window.AquaBridge?.bootstrap) {
  window.AquaBridge.bootstrap();
} else {
  authenticated = true;
  authPanel.hidden = true;
}
window.refreshFilingInbox();
