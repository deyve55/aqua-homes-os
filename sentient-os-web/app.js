const apps = [
  {
    name: "Aqua CRM",
    cardName: "CRM",
    motion: "crm",
    short: "CUSTOMERS & JOBS",
    icon: "A",
    neuralAsset: "./assets/carousel-v2/crm.webp",
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
    neuralAsset: "./assets/carousel-v2/draw.webp",
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
    neuralAsset: "./assets/carousel-v2/cam.webp",
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
    neuralAsset: "./assets/carousel-v2/vault.webp",
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
    neuralAsset: "./assets/carousel-v2/timesheet.webp",
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
    neuralAsset: "./assets/carousel-v2/books.webp",
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
    neuralAsset: "./assets/carousel-v2/receipts.webp",
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
  {
    name: "AquaPulse",
    cardName: "Pulse",
    motion: "pulse",
    short: "CASH FLOW",
    icon: "A",
    cardAsset: "./assets/carousel-v2/pulse.svg",
    neuralAsset: "./assets/carousel-v2/pulse.svg",
    color: "#38d9ef",
    preview: { eyebrow: "AQUA PULSE", title: "Cash Flow Command", metric: "Current pulse", value: "—", tiles: ["Accounts", "Jobs", "Forecast"] },
    packages: ["com.aquasoftware.aquapulse"],
    status: "Pulse workspace ready",
    primaryTitle: "Cash Flow Pulse",
    primaryValue: "Awaiting live data",
    primaryDetail: "Sentinel has not received an AquaPulse home snapshot yet",
    secondaryTitle: "Needs Attention",
    secondaryValue: "Not confirmed",
    secondaryDetail: "Open AquaPulse or connect its Sentinel preview contract",
    activity: ["Account registry available", "Job cash-flow view available", "File Cabinet intake registered"],
    widgets: ["Accounts", "Jobs", "Forecast"],
    connected: false,
  },
  {
    name: "Future Aqua App One",
    cardName: "Coming Next",
    motion: "future",
    short: "RESERVED PORTAL",
    icon: "+",
    color: "#557786",
    preview: { eyebrow: "AQUA ECOSYSTEM", title: "New application portal", metric: "Status", value: "Reserved", tiles: ["Identity", "Workflow", "Data"] },
    packages: [],
    status: "Reserved for the next Aqua application",
    primaryTitle: "Application Portal",
    primaryValue: "Coming online",
    primaryDetail: "This card preserves the approved position for a new Aqua application",
    secondaryTitle: "Integration State",
    secondaryValue: "Not assigned",
    secondaryDetail: "The app name, package, and capability contract will be connected when approved",
    activity: ["Portal position preserved", "App identity not assigned", "No backend claim"],
    widgets: ["Identity", "Workflow", "Data"],
    connected: false,
    placeholder: true,
  },
  {
    name: "Future Aqua App Two",
    cardName: "Coming Next",
    motion: "future",
    short: "RESERVED PORTAL",
    icon: "+",
    color: "#6b7185",
    preview: { eyebrow: "AQUA ECOSYSTEM", title: "New application portal", metric: "Status", value: "Reserved", tiles: ["Identity", "Workflow", "Data"] },
    packages: [],
    status: "Reserved for the next Aqua application",
    primaryTitle: "Application Portal",
    primaryValue: "Coming online",
    primaryDetail: "This card preserves the approved position for a new Aqua application",
    secondaryTitle: "Integration State",
    secondaryValue: "Not assigned",
    secondaryDetail: "The app name, package, and capability contract will be connected when approved",
    activity: ["Portal position preserved", "App identity not assigned", "No backend claim"],
    widgets: ["Identity", "Workflow", "Data"],
    connected: false,
    placeholder: true,
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

let active = apps.findIndex((app) => app.name === "AquaDraw");
let rotating = false;
let rotationTimer = null;
let drag = null;
let inertiaFrame = null;
let suppressCardClickUntil = 0;
let authenticated = false;
let authenticatedEmail = "";
let gatewayConfigured = false;
let filingInbox = [];
let filingBriefAnnounced = false;
const preferenceStorageKey = "aqua-sentinel-owner-preferences-v1";
let sound = loadOwnerPreferences().sound;
let notifications = loadOwnerPreferences().notifications;
const widgetMessageStorageKey = "aqua-sentinel-widget-messages-v1";
let widgetMessages = loadWidgetMessages();
let widgetCommandInFlight = null;
const liveSnapshots = new Map();
const customerPreviewSnapshots = new Map();
const ecosystemPresentationSnapshots = new Map();
const snapshotStates = new Map();
// Sentinel sits above the ecosystem. CRM is its one direct child; every other
// satellite occupies a lower branch. The nodes never orbit or leave the frame.
const NEURAL_ORIGIN = { x: 50, y: 30 };
const neuralRingSlots = [
  { x: 50, y: 47, scale: 1.18, c1x: 50, c1y: 35, c2x: 50, c2y: 41 },
  { x: 22, y: 49, scale: .94, c1x: 42, c1y: 34, c2x: 30, c2y: 40 },
  { x: 78, y: 49, scale: .94, c1x: 58, c1y: 34, c2x: 70, c2y: 40 },
  { x: 13, y: 65, scale: .84, c1x: 37, c1y: 38, c2x: 21, c2y: 54 },
  { x: 38, y: 66, scale: .84, c1x: 46, c1y: 41, c2x: 40, c2y: 54 },
  { x: 62, y: 66, scale: .84, c1x: 54, c1y: 41, c2x: 60, c2y: 54 },
  { x: 87, y: 65, scale: .84, c1x: 63, c1y: 38, c2x: 79, c2y: 54 },
];
const NEURAL_SELECT_MILLIS = 220;
const NEURAL_FIRE_MILLIS = 320;
const NEURAL_MORPH_MILLIS = 420;
const NEURAL_ACK_BUDGET_MILLIS = 100;
const NEURAL_ADDED_UI_DELAY_MILLIS = 0;
const NEURAL_AMBIENT_FIRE_MILLIS = NEURAL_SELECT_MILLIS + NEURAL_FIRE_MILLIS;
const NEURAL_DESTINATION_OPEN_MILLIS = NEURAL_AMBIENT_FIRE_MILLIS + 180;
const NEURAL_MATERIALIZATION_LAG_MILLIS = 0;
const NEURAL_MIN_FIRE_DWELL_MILLIS = 0;
const NEURAL_SEQUENCE_MORPH_AT = NEURAL_SELECT_MILLIS
  + NEURAL_FIRE_MILLIS
  + NEURAL_MATERIALIZATION_LAG_MILLIS
  + NEURAL_MIN_FIRE_DWELL_MILLIS;
const NEURAL_SEQUENCE_RESULT_AT = NEURAL_SEQUENCE_MORPH_AT + NEURAL_MORPH_MILLIS;
let neuralFocusIndex = -1;
let neuralSupportIndexes = [];
let neuralVisibleIndexes = [0, 1, 7, 2, 4, 5, 6];
let neuralPhase = "rest";
let neuralThought = "Aqua is listening across your company.";
let neuralThoughtDetail = "Every system stays ready while her attention moves.";
let neuralTransitionTimer = null;
let neuralFireTimer = null;
let neuralDestinationTimer = null;
let neuralMotionToken = 0;
let neuralMorphProgress = 0;
let neuralPhaseReadyAt = 0;
let neuralRequestStartedAt = 0;
let neuralAcknowledgedAt = 0;
let pendingNeuralIntent = null;
let neuralMaterialization = null;
let suppressNeuralPortalClickUntil = 0;
let neuralMaterializationAnimation = null;
let neuralMaterializationContentAnimation = null;
let neuralSubstratePreload = null;
let commandWidgetState = {
  supported: false,
  installedCount: 0,
  state: "Checking",
};
let deviceDiagnostics = {
  generatedAt: 0,
  platform: "Browser preview",
  versionName: "0.8.1-field-test-navigation-recovery",
  versionCode: 2026080501,
  gatewayConfigured: false,
  authenticated: false,
  microphoneGranted: false,
  speechRecognizerAvailable: false,
  calendarReadGranted: false,
  calendarWriteGranted: false,
  photoCaptureAvailable: false,
  videoCaptureAvailable: false,
  widgetInstalledCount: 0,
  filingPendingCount: 0,
  filedTodayCount: 0,
  installedAppCount: 0,
  registeredAppCount: apps.length,
  apps: [],
};

function neuralSourceAt(index) {
  if (index >= 0 && index < apps.length) return apps[index];
  if (index === apps.length) {
    return {
      name: "File Cabinet",
      short: "SENTINEL EVIDENCE",
      icon: "▤",
      neuralAsset: "./assets/carousel-v2/receipts.webp",
      color: "#8cecff",
      authority: "Local captures, filing queue, and authorized projections",
      widgets: ["Contracts", "Evidence", "Protected filings"],
      connected: true,
    };
  }
  return null;
}

function neuralConnectionState(index) {
  if (index === apps.length) return { label: "LOCAL", detail: "SENTINEL CORE" };
  const app = apps[index];
  if (!app) return { label: "UNAVAILABLE", detail: "NO SOURCE" };
  if (liveSnapshots.has(app.name) || app.connected) {
    return { label: "CONFIRMED", detail: "LIVE LINK" };
  }
  if (
    ecosystemPresentationSnapshots.has(app.name) ||
    customerPreviewSnapshots.has(app.name)
  ) {
    return { label: "PREVIEW", detail: "NOT LIVE" };
  }
  return { label: "READY", detail: "LINK PENDING" };
}

function neuralModulo(value, size) {
  return ((value % size) + size) % size;
}

function aquaMarkMarkup(prefix = "aqua") {
  const safePrefix = String(prefix).replace(/[^a-z0-9_-]/gi, "-");
  return `<svg class="aqua-mark" viewBox="0 0 340 360" role="img" aria-label="Aqua metallic faceted A">
    <defs>
      <linearGradient id="${safePrefix}-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f7fcff"/><stop offset=".12" stop-color="#8d9ba8"/>
        <stop offset=".3" stop-color="#182632"/><stop offset=".52" stop-color="#03080d"/>
        <stop offset=".75" stop-color="#152634"/><stop offset=".9" stop-color="#6f8493"/>
        <stop offset="1" stop-color="#e8f6fb"/>
      </linearGradient>
      <linearGradient id="${safePrefix}-edge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#14d9ff"/><stop offset=".48" stop-color="#dffbff"/>
        <stop offset="1" stop-color="#eab052"/>
      </linearGradient>
      <linearGradient id="${safePrefix}-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#183043" stop-opacity=".72"/>
        <stop offset=".58" stop-color="#02070d" stop-opacity=".98"/>
        <stop offset="1" stop-color="#07131e"/>
      </linearGradient>
      <radialGradient id="${safePrefix}-orb">
        <stop offset="0" stop-color="#fff"/><stop offset=".16" stop-color="#baf9ff"/>
        <stop offset=".44" stop-color="#19dfff" stop-opacity=".92"/>
        <stop offset="1" stop-color="#0bbbdc" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path class="aqua-mark-outer" d="M170 18 322 329 256 329 216 246 124 246 84 329 18 329 170 18Zm0 112-28 60h56l-28-60Z" fill="url(#${safePrefix}-metal)" stroke="url(#${safePrefix}-edge)" stroke-width="2.2"/>
    <path class="aqua-mark-face" d="M170 65 286 307 254 307 170 132 86 307 54 307 170 65Z" fill="url(#${safePrefix}-face)" stroke="url(#${safePrefix}-edge)" stroke-width="1.35"/>
    <path class="aqua-mark-spine" d="M170 116 238 259 211 259 170 176 129 259 102 259 170 116Z" fill="rgba(2,9,14,.92)" stroke="rgba(194,249,255,.8)" stroke-width="1.15"/>
    <path class="aqua-mark-crossbar" d="M104 231 170 191 236 231 209 251 170 228 131 251Z" fill="url(#${safePrefix}-face)" stroke="url(#${safePrefix}-edge)" stroke-width="1.5"/>
    <path d="M103 231H237" fill="none" stroke="#e9feff" stroke-opacity=".72" stroke-width="1"/>
    <circle class="aqua-mark-orb" cx="170" cy="228" r="39" fill="url(#${safePrefix}-orb)"/>
    <circle class="aqua-mark-orb-core" cx="170" cy="228" r="5.5" fill="#fff"/>
  </svg>`;
}

function neuralFixedSlotForSource(sourceIndex) {
  const slotIndex = neuralVisibleIndexes.indexOf(sourceIndex);
  if (slotIndex < 0) {
    return { x: 50, y: 84, scale: .72, opacity: 0, c1x: 50, c1y: 58, c2x: 50, c2y: 74 };
  }
  return { ...neuralRingSlots[slotIndex], opacity: 1, slotIndex };
}

function promoteNeuralSource(sourceIndex) {
  const previousTop = neuralVisibleIndexes[0];
  if (previousTop === sourceIndex) return;
  const existingSlot = neuralVisibleIndexes.indexOf(sourceIndex);
  const destinationSlot = existingSlot > 0 ? existingSlot : 3;
  neuralVisibleIndexes[destinationSlot] = previousTop;
  neuralVisibleIndexes[0] = sourceIndex;
}

function neuralPathForSlot(slot) {
  return `M${NEURAL_ORIGIN.x} ${NEURAL_ORIGIN.y} C${slot.c1x} ${slot.c1y} ${slot.c2x} ${slot.c2y} ${slot.x} ${slot.y}`;
}

function neuralRouteTransform(slot) {
  const base = neuralRingSlots[0];
  const baseLength = Math.max(.01, Math.hypot(base.x - NEURAL_ORIGIN.x, base.y - NEURAL_ORIGIN.y));
  const dx = Number(slot.x) - NEURAL_ORIGIN.x;
  const dy = Number(slot.y) - NEURAL_ORIGIN.y;
  const length = Math.max(.01, Math.hypot(dx, dy));
  const baseAngle = Math.atan2(base.y - NEURAL_ORIGIN.y, base.x - NEURAL_ORIGIN.x);
  const angle = (Math.atan2(dy, dx) - baseAngle) * 180 / Math.PI;
  const stretch = length / baseLength;
  return `translate(${NEURAL_ORIGIN.x} ${NEURAL_ORIGIN.y}) rotate(${angle.toFixed(3)}) scale(1 ${stretch.toFixed(4)}) translate(-${NEURAL_ORIGIN.x} -${NEURAL_ORIGIN.y})`;
}

function cancelNeuralMotion() {
  neuralMotionToken += 1;
  neuralMaterializationAnimation?.cancel();
  neuralMaterializationAnimation = null;
  neuralMaterializationContentAnimation?.cancel();
  neuralMaterializationContentAnimation = null;
}

function neuralStageMetrics(stage) {
  const rect = stage.getBoundingClientRect();
  return {
    width: Math.max(1, rect.width || stage.clientWidth || 430),
    height: Math.max(1, rect.height || stage.clientHeight || 932),
  };
}

function neuralPortalTransform(slot, metrics) {
  return `translate3d(${(slot.x * metrics.width / 100).toFixed(2)}px,${(slot.y * metrics.height / 100).toFixed(2)}px,0) translate3d(-50%,-50%,0) scale(${slot.scale.toFixed(4)})`;
}

function paintNeuralMorphProgress(stage, progress) {
  const bounded = Math.max(0, Math.min(1, progress));
  neuralMorphProgress = bounded;
  stage.dataset.morphProgress = bounded.toFixed(3);
  stage.style.setProperty("--neural-morph-progress", bounded.toFixed(3));
}

async function animateNeuralMorph(duration) {
  cancelNeuralMotion();
  const stage = systemPanel.querySelector(".neural-stage");
  if (!stage) return;
  const token = neuralMotionToken;
  neuralPhase = "transitioning";
  neuralMorphProgress = 0;
  stage.dataset.motion = "morph";
  layoutNeuralStage(0);
  renderNeuralMaterialization();
  const startedAt = performance.now();
  await new Promise((resolve) => {
    const paintMorph = (now) => {
      if (token !== neuralMotionToken || neuralMaterialization === null) {
        resolve();
        return;
      }
      const progress = Math.max(0, Math.min(1, (now - startedAt) / duration));
      paintNeuralMorphProgress(stage, progress);
      if (progress < 1) requestAnimationFrame(paintMorph);
      else resolve();
    };
    requestAnimationFrame(paintMorph);
  });
  if (token !== neuralMotionToken || neuralMaterialization === null) return;
  neuralMorphProgress = 1;
  neuralPhase = "result";
  delete stage.dataset.motion;
  layoutNeuralStage(1);
  renderNeuralMaterialization();
}

function layoutNeuralStage(morphOverride = null) {
  const stage = systemPanel.querySelector(".neural-stage");
  if (!stage) return;
  const morphProgress = Number.isFinite(morphOverride)
    ? Math.max(0, Math.min(1, morphOverride))
    : neuralPhase === "result"
      ? 1
      : neuralPhase === "transitioning"
        ? neuralMorphProgress
        : 0;
  stage.dataset.phase = neuralPhase;
  document.documentElement.dataset.aquaNeuralPhase = neuralPhase;
  stage.dataset.focus = neuralFocusIndex >= 0 ? String(neuralFocusIndex) : "none";
  paintNeuralMorphProgress(stage, morphProgress);
  stage.dataset.addedUiDelayMillis = String(NEURAL_ADDED_UI_DELAY_MILLIS);
  stage.dataset.ackBudgetMillis = String(NEURAL_ACK_BUDGET_MILLIS);
  stage.dataset.presentationBudgetMillis = String(NEURAL_SEQUENCE_RESULT_AT);
  stage.dataset.fixedPortals = "true";
  stage.dataset.referenceComposition = "live-neural-substrate-v080";
  stage.dataset.referenceState = ["transitioning", "result"].includes(neuralPhase) ? "morphed" : "rest";
  stage.dataset.materializationKind = String(neuralMaterialization?.kind || "");
  stage.dataset.selectedApp = neuralSourceAt(neuralFocusIndex)?.name || "All systems";
  stage.dataset.acknowledged = neuralAcknowledgedAt >= neuralRequestStartedAt && neuralRequestStartedAt > 0
    ? "true"
    : "false";
  stage.dataset.ackLatencyMillis = stage.dataset.acknowledged === "true"
    ? Math.max(0, neuralAcknowledgedAt - neuralRequestStartedAt).toFixed(3)
    : "";
  const metrics = neuralStageMetrics(stage);
  stage.querySelectorAll("[data-portal-index]").forEach((portal) => {
    const index = Number(portal.dataset.portalIndex);
    const isPrimary = index === neuralFocusIndex;
    const isSupporting = neuralSupportIndexes.includes(index);
    const slot = neuralFixedSlotForSource(index);
    const slotIndex = Number(slot.slotIndex ?? 6);
    portal.style.transform = neuralPortalTransform(slot, metrics);
    portal.style.opacity = String(slot.opacity ?? 1);
    portal.style.pointerEvents = Number(portal.style.opacity) > .15 ? "auto" : "none";
    portal.setAttribute("aria-hidden", Number(portal.style.opacity) > .15 ? "false" : "true");
    portal.style.setProperty("--neural-scale", String(slot.scale));
    portal.style.setProperty("--neural-depth", String(12 - slotIndex));
    portal.classList.toggle("is-primary", isPrimary);
    portal.classList.toggle("is-supporting", isSupporting);
    portal.classList.toggle("is-dormant", Number(slot.opacity ?? 1) <= .15);
  });
  stage.querySelectorAll("[data-neural-source-group]").forEach((group) => {
    const sourceIndex = Number(group.dataset.neuralSourceGroup);
    const slot = neuralFixedSlotForSource(sourceIndex);
    group.setAttribute("transform", neuralRouteTransform(slot));
    group.style.visibility = Number(slot.opacity ?? 1) > .15 ? "visible" : "hidden";
    group.classList.toggle("is-active", neuralFocusIndex >= 0 && sourceIndex === neuralFocusIndex);
    group.classList.toggle("is-supporting", neuralSupportIndexes.includes(sourceIndex));
  });
  stage.querySelectorAll("[data-neural-path]").forEach((route) => {
    const sourceIndex = Number(route.dataset.neuralPath);
    route.classList.toggle("is-active", neuralFocusIndex >= 0 && sourceIndex === neuralFocusIndex);
    route.classList.toggle("is-supporting", neuralSupportIndexes.includes(sourceIndex));
  });
  stage.querySelectorAll("[data-neural-burst]").forEach((burst) => {
    const sourceIndex = Number(burst.dataset.neuralBurst);
    burst.classList.toggle("is-active", neuralFocusIndex >= 0 && sourceIndex === neuralFocusIndex);
    burst.classList.toggle("is-supporting", neuralSupportIndexes.includes(sourceIndex));
  });
  const thought = stage.querySelector("[data-neural-thought]");
  const detail = stage.querySelector("[data-neural-thought-detail]");
  const focus = stage.querySelector("[data-neural-focus-name]");
  const selected = stage.querySelector("[data-neural-selected-name]");
  if (thought) thought.textContent = neuralThought;
  if (detail) detail.textContent = neuralThoughtDetail;
  if (focus) {
    const source = neuralSourceAt(neuralFocusIndex);
    focus.textContent = source ? source.name : "ALL SYSTEMS";
  }
  if (selected) {
    const source = neuralSourceAt(neuralFocusIndex);
    selected.textContent = source ? source.name : "Aqua CRM";
  }
}

function setNeuralPhase(phase, thought, detail) {
  neuralPhase = phase;
  neuralMorphProgress = phase === "result" ? 1 : 0;
  if (!["transitioning", "result"].includes(phase)) neuralMaterialization = null;
  if (thought) neuralThought = thought;
  if (detail) neuralThoughtDetail = detail;
  layoutNeuralStage();
  renderNeuralMaterialization();
}

function focusNeuralSource(index, supporting = [], command = "") {
  const source = neuralSourceAt(index);
  if (!source) return;
  cancelNeuralMotion();
  clearTimeout(neuralFireTimer);
  if (!(neuralRequestStartedAt > 0)) neuralRequestStartedAt = performance.now();
  neuralFocusIndex = index;
  neuralSupportIndexes = supporting.filter(
    (supportIndex) => supportIndex !== index && neuralSourceAt(supportIndex),
  );
  neuralThought = command
    ? `Aqua is working in ${source.name}.`
    : `${source.name} is ready.`;
  neuralThoughtDetail = neuralSupportIndexes.length
    ? `Connected with ${neuralSupportIndexes.map((supportIndex) => neuralSourceAt(supportIndex).name.replace("Aqua ", "")).join(" · ")}`
    : "The rest of Aqua’s mind remains connected and ready.";
  promoteNeuralSource(index);
  neuralPhase = "selecting";
  neuralMorphProgress = 0;
  neuralPhaseReadyAt = neuralRequestStartedAt + NEURAL_AMBIENT_FIRE_MILLIS;
  neuralMaterialization = null;
  neuralAcknowledgedAt = performance.now();
  layoutNeuralStage();
  renderNeuralMaterialization();
  neuralFireTimer = setTimeout(() => {
    if (neuralFocusIndex !== index || neuralPhase !== "selecting") return;
    neuralPhase = "firing";
    neuralThought = `${source.name} is live on its Sentinel tether.`;
    neuralThoughtDetail = "Aqua is firing one clean cyan-and-gold synapse along the requested path.";
    layoutNeuralStage();
    renderNeuralMaterialization();
    neuralFireTimer = setTimeout(() => {
      if (neuralFocusIndex !== index || neuralPhase !== "firing" || neuralMaterialization) return;
      neuralPhase = "working";
      neuralThought = `${source.name} is working.`;
      neuralThoughtDetail = "The request is underway. The portals stay fixed while Aqua waits for the source.";
      layoutNeuralStage();
      renderNeuralMaterialization();
    }, NEURAL_FIRE_MILLIS);
  }, NEURAL_SELECT_MILLIS);
}

function identifyNeuralIntent(rawText) {
  const text = String(rawText || "").toLowerCase();
  if (!text.trim()) return null;
  if (/receipt|vendor|purchase|store charge|proof of purchase/.test(text)) {
    return { primary: 6, supporting: [0, 5, 4, 3], kind: "receipt" };
  }
  if (/timesheet|time card|timecard|clocked|crew hours|labor hours|payroll/.test(text)) {
    return { primary: 4, supporting: [0, 5], kind: "workforce" };
  }
  if (/aqua\s*pulse|aquapulse|cash flow|cash position|cash forecast|pulse/.test(text)) {
    return { primary: 7, supporting: [5, 1, 0], kind: "pulse" };
  }
  if (/cash|books|accounting|ledger|bank|profit|revenue|bill|invoice|financial/.test(text)) {
    return { primary: 5, supporting: [0, 1, 6], kind: "financial" };
  }
  if (/draw|budget|scope of work|\bsow\b|contract|payment request|overage/.test(text)) {
    return { primary: 1, supporting: [5, 0], kind: "draw" };
  }
  if (/code|tax|law|knowledge|workers.? comp|liability|compliance/.test(text)) {
    return { primary: 3, supporting: [0, 5], kind: "knowledge" };
  }
  if (/camera|aquacam|job site|site evidence|field evidence|walkthrough|before and after/.test(text)) {
    return { primary: 2, supporting: [4, 0], kind: "field" };
  }
  if (/file cabinet|document|contract file|find a file|bring up (?:a |the )?file|pull up (?:a |the )?file|filing|\bfile\b/.test(text)) {
    return { primary: apps.length, supporting: [0, 6], kind: "file" };
  }
  if (/customer|client|lead|pipeline|sales|job|company|business|how.*doing|today.*company/.test(text)) {
    return { primary: 0, supporting: [5, 4, 6], kind: "company" };
  }
  return null;
}

function identifySentinelNavigation(rawText) {
  const text = String(rawText || "").toLowerCase().trim();
  if (!/\b(?:open|show|go to|take me to|navigate to|bring up|run|check)\b/.test(text)) return null;
  if (/\b(?:diagnostics?|system check|device check|repair receipt)\b/.test(text)) {
    return { panel: "diagnostics", label: "Diagnostics", refresh: true };
  }
  if (/\b(?:command center|sentinel command)\b/.test(text)) return { panel: "command", label: "Command Center" };
  if (/\b(?:file cabinet|filing cabinet|captured items?|filing tray)\b/.test(text)) return { panel: "files", label: "File Cabinet" };
  if (/\b(?:settings?|preferences?|privacy controls?)\b/.test(text)) return { panel: "settings", label: "Settings" };
  if (/\b(?:connections?|integrations?|connected apps?|ecosystem)\b/.test(text)) return { panel: "data", label: "Ecosystem Connections" };
  if (/\b(?:messages?|conversation receipts?|command receipts?)\b/.test(text)) return { panel: "messages", label: "Conversation Receipts" };
  if (/\b(?:home|home screen|main screen)\b/.test(text)) return { panel: "home", label: "Home" };
  if (/\b(?:neural link|neuro page|neural page)\b/.test(text)) return { panel: "neural", label: "Neural Link" };
  return null;
}

function navigateSentinelByVoice(destination) {
  if (!destination) return false;
  clearTimeout(neuralDestinationTimer);
  neuralFocusIndex = -1;
  neuralSupportIndexes = [];
  neuralPhase = "firing";
  neuralThought = `Aqua is opening ${destination.label}.`;
  neuralThoughtDetail = "Sentinel is routing this command inside its own operating layer.";
  layoutNeuralStage();
  neuralDestinationTimer = setTimeout(() => {
    if (destination.refresh) window.refreshDeviceDiagnostics();
    if (destination.panel === "neural") {
      returnNeuralToRest();
    } else {
      openPanel(destination.panel);
    }
    const reply = `${destination.label} is open.`;
    notify(reply);
    if (sound && window.AquaBridge?.speak) window.AquaBridge.speak(reply);
    else setAquaState("idle");
  }, 360);
  return true;
}

function isExplicitDeepOpen(rawText) {
  const text = String(rawText || "").toLowerCase();
  return /\b(?:let'?s\s+go(?:\s+to)?|take me to|switch to|go to|go deeper(?:(?: into| to))?|go into|launch|open)\s+(?:the\s+)?(?:actual\s+)?(?:aqua\s+)?(?:crm|draw|cam|pulse|knowledge(?: vault)?|timesheet|books|receipts|file cabinet|app)\b/.test(text);
}

function beginNeuralRequest(command) {
  const intent = identifyNeuralIntent(command);
  if (!intent) return null;
  neuralRequestStartedAt = performance.now();
  neuralAcknowledgedAt = 0;
  pendingNeuralIntent = { ...intent, command };
  neuralFocusIndex = intent.primary;
  neuralSupportIndexes = intent.supporting;
  neuralPhase = "working";
  const source = neuralSourceAt(intent.primary);
  neuralThought = `Aqua is reaching into ${source.name}.`;
  neuralThoughtDetail = "Request sent immediately. Connected systems remain available.";
  openPanel("neural");
  focusNeuralSource(intent.primary, intent.supporting, command);
  return intent;
}

const neuralCapabilityIndexes = Object.freeze({
  crm: 0,
  draw: 1,
  cam: 2,
  "knowledge-vault": 3,
  timesheet: 4,
  books: 5,
  receipts: 6,
  pulse: 7,
  "sentinel-files": apps.length,
});

function beginLiveAquaRequest(command, intent = null) {
  cancelNeuralMotion();
  clearTimeout(neuralFireTimer);
  clearTimeout(neuralTransitionTimer);
  neuralRequestStartedAt = performance.now();
  neuralAcknowledgedAt = 0;
  pendingNeuralIntent = intent ? { ...intent, command } : { command };
  neuralFocusIndex = -1;
  neuralSupportIndexes = [];
  neuralPhase = "working";
  neuralMorphProgress = 0;
  neuralMaterialization = null;
  neuralThought = "Aqua is deciding which source should answer.";
  neuralThoughtDetail = "Aqua stays centered until the secure gateway confirms a real application route.";
  layoutNeuralStage();
  renderNeuralMaterialization();
}

function confirmedNeuralIntent(response) {
  const sourceApp = String(
    response?.materialization?.sourceApp || response?.action?.app || "",
  ).toLowerCase();
  let primary = apps.findIndex((app) => {
    const name = app.name.toLowerCase();
    return sourceApp && (
      name === sourceApp || name.includes(sourceApp) || sourceApp.includes(name)
    );
  });
  if (primary < 0) {
    const sources = Array.isArray(response?.receipt?.sources)
      ? response.receipt.sources.map((source) => String(source).toLowerCase())
      : [];
    const capability = sources.find((source) => Number.isInteger(neuralCapabilityIndexes[source]));
    if (capability) primary = neuralCapabilityIndexes[capability];
  }
  if (!Number.isInteger(primary) || primary < 0) return null;
  const pending = pendingNeuralIntent || {};
  return {
    primary,
    supporting: Array.isArray(pending.supporting) ? pending.supporting : [],
    kind: pending.kind || response?.materialization?.kind || "record",
    command: pending.command || "",
  };
}

function activateConfirmedNeuralRoute(response) {
  const intent = confirmedNeuralIntent(response);
  if (!intent) return null;
  neuralRequestStartedAt = performance.now();
  pendingNeuralIntent = intent;
  if (systemPanel.hidden || systemPanel.dataset.panel !== "neural") openPanel("neural");
  focusNeuralSource(intent.primary, intent.supporting, intent.command);
  return intent;
}

function neuralMaterializationFor(intent) {
  const source = neuralSourceAt(intent.primary);
  if (!source) return null;
  if (intent.primary === apps.length) {
    return {
      present: true,
      kind: "file",
      title: "Aqua File Cabinet",
      subtitle: filingInbox.length
        ? `${filingInbox.length} locally protected item${filingInbox.length === 1 ? "" : "s"}`
        : "The local filing tray is ready.",
      sourceApp: "Aqua Sentinel OS",
      sourceState: "Local",
      sourceRecordId: "sentinel-file-cabinet",
      fields: [
        { label: "Saved locally", value: String(filingInbox.length) },
        { label: "Needs direction", value: String(filingInbox.filter((item) => item.needsClarification).length) },
        { label: "Authority", value: "Sentinel encrypted filing inbox" },
      ],
      actions: [
        { id: "open-source", label: "Go deeper into File Cabinet", kind: "open_source", requiresConfirmation: false },
        { id: "dismiss", label: "Keep talking to Aqua", kind: "dismiss", requiresConfirmation: false },
      ],
      appIndex: apps.length,
    };
  }
  const app = apps[intent.primary];
  const view = selectedView(app);
  const hasLiveSource = liveSnapshots.has(app.name) || app.connected;
  const hasPresentationSource = ecosystemPresentationSnapshots.has(app.name) || customerPreviewSnapshots.has(app.name);
  const primaryRows = Array.isArray(view.primaryRows) ? view.primaryRows : [];
  const secondaryRows = Array.isArray(view.secondaryRows) ? view.secondaryRows : [];
  const fields = [
    { label: view.primaryTitle, value: view.primaryValue },
    { label: view.secondaryTitle, value: view.secondaryValue },
    ...primaryRows.slice(0, 2).map(([label, value]) => ({ label, value })),
    ...secondaryRows.slice(0, 1).map(([label, value]) => ({ label, value })),
  ];
  if (!hasLiveSource && !hasPresentationSource) {
    fields.push({ label: "Connection", value: "Authoritative app link pending" });
  }
  return {
    present: true,
    kind: intent.kind,
    title: intent.kind === "company" ? "Company Today" : view.primaryTitle,
    subtitle: hasLiveSource
      ? view.primaryDetail
      : hasPresentationSource
        ? `${view.primaryDetail} · Presentation data, not a live company record.`
        : `${app.name} is ready, but its authoritative data link is not connected.`,
    sourceApp: app.name,
    sourceState: hasLiveSource ? "Confirmed" : hasPresentationSource ? "Presentation · Not Live" : "Needs Attention",
    sourceRecordId: `neural-${app.motion}-${Date.now()}`,
    fields,
    actions: [
      { id: "open-source", label: `Go deeper into ${app.name}`, kind: "open_source", requiresConfirmation: false },
      { id: "dismiss", label: "Keep talking to Aqua", kind: "dismiss", requiresConfirmation: false },
    ],
    appIndex: intent.primary,
  };
}

function completeStandaloneNeuralRequest(intent) {
  const materialization = neuralMaterializationFor(intent);
  if (!materialization) return;
  neuralThought = `${materialization.sourceApp} returned the requested view.`;
  neuralThoughtDetail = materialization.sourceState === "Confirmed"
    ? "The source is confirmed and Aqua remains connected everywhere."
    : "This is visibly labeled so presentation data is never mistaken for a live record.";
  showMaterialization(materialization, true);
  const reply = materialization.sourceState === "Confirmed"
    ? `I brought ${materialization.title} forward from ${materialization.sourceApp}.`
    : `I brought forward the ${materialization.sourceApp} presentation view. It is not live company data yet.`;
  notify(reply);
  if (sound && window.AquaBridge?.speak) window.AquaBridge.speak(reply);
  else setAquaState("idle");
  pendingNeuralIntent = null;
}

function enableEcosystemPresentationMode() {
  let enabled = false;
  let deterministicPreviewProof = false;
  try {
    const previewPanel = new URLSearchParams(window.location.search).get("preview");
    deterministicPreviewProof =
      window.location.protocol === "file:" && ["home", "neural"].includes(previewPanel);
  } catch (_) {
    deterministicPreviewProof = false;
  }
  try {
    enabled =
      deterministicPreviewProof ||
      Boolean(window.AquaBridge?.isEcosystemPresentationMode?.());
  } catch (_) {
    enabled = deterministicPreviewProof;
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

function loadOwnerPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceStorageKey) || "{}");
    return {
      sound: saved.sound !== false,
      notifications: saved.notifications !== false,
    };
  } catch {
    return { sound: true, notifications: true };
  }
}

function saveOwnerPreferences() {
  try {
    localStorage.setItem(
      preferenceStorageKey,
      JSON.stringify({ sound, notifications }),
    );
  } catch (_) {}
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
  const retained = widgetMessages.filter((message) => /saved|attention/i.test(message.state)).length;
  const messages = widgetMessages.length
    ? widgetMessages.map((message) => `
        <article class="widget-message ${message.role === "Aqua" ? "aqua" : "owner"}">
          <header><strong>${escapeHtml(message.role)}</strong><small>${escapeHtml(message.createdAt)}</small></header>
          <p>${escapeHtml(message.text)}</p>
          <footer>${escapeHtml(message.state)}</footer>
        </article>`).join("")
    : `<div class="widget-message-empty">Messages fired from the Aqua Command Center widget will appear here.</div>`;
  return `${systemHeader("Messages")}
    <section class="receipt-shell">
      <div class="widget-message-receipt"><strong>Conversation receipts</strong><span>Every handoff is saved locally first, then sent through Aqua when authenticated.</span><b>${retained ? `${retained} RETAINED` : "CURRENT"}</b></div>
      <div class="receipt-actions">
        <button type="button" data-message-action="voice">Give Aqua another instruction</button>
        <button type="button" data-message-action="retry" ${retained ? "" : "disabled"}>Retry retained commands</button>
      </div>
    </section>
    <div class="widget-message-list">${messages}</div>`;
}

const sentinel = document.getElementById("sentinel");
document.documentElement.classList.toggle("aqua-native-runtime", Boolean(window.AquaBridge));
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
const authContinueStandalone = document.getElementById("authContinueStandalone");
const ownerAccessButton = document.getElementById("ownerAccessButton");
const ownerAccessLabel = document.getElementById("ownerAccessLabel");
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
  const neuralStage = systemPanel.querySelector(".neural-stage");
  if (neuralStage) neuralStage.dataset.aquaState = state;
}

function updateOwnerAccessControl() {
  ownerAccessButton.dataset.panel = authenticated ? "signout" : "connect";
  ownerAccessLabel.textContent = authenticated ? "Sign Out" : "Connect";
}

function openOwnerAccess() {
  authPanel.hidden = false;
  authEmail.disabled = !gatewayConfigured;
  authPassword.disabled = !gatewayConfigured;
  authSubmit.disabled = !gatewayConfigured;
  authSubmit.textContent = gatewayConfigured
    ? "Connect Aqua Brain"
    : "Gateway Not Configured";
  authMessage.textContent = gatewayConfigured
    ? "Connect Aqua Brain when the gateway is available, or continue in Standalone mode."
    : "Aqua Brain is not configured in this test build. Sentinel remains available in Standalone mode.";
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
function notify(message, force = false) {
  const critical = /could not|failed|attention|required|unavailable|not installed|not configured/i.test(String(message || ""));
  if (!notifications && !critical && !force) return;
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
    AquaPulse: `
      ${sharedHeader}
      <h3>${escapeHtml(view.preview.title)}</h3>
      <div class="mini-pulse"><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong><i><b></b></i></div>
      <div class="mini-budget"><span>${tile(0)}<b></b></span><span>${tile(1)}<b></b></span><span>${tile(2)}<b></b></span></div>`,
  };
  return layouts[app.name] || `${sharedHeader}<h3>${escapeHtml(view.preview.title)}</h3>`;
}

function renderCarouselCover(app) {
  if (app.placeholder) {
    return `<div class="future-card-placeholder" aria-hidden="true">
      <i>A</i><strong>COMING NEXT</strong><small>RESERVED AQUA APP PORTAL</small><span></span>
    </div>`;
  }
  const motionMarkup = {
    crm: '<i></i><i></i><i></i><i></i><i></i>',
    draw: '<i class="fund-stream"></i><b class="approval-flare"></b>',
    cam: '<i class="focus-ring"></i><b class="capture-flash"></b>',
    vault: '<i class="vault-door"></i><b class="verified-document">✓</b>',
    timesheet: '<i class="signal-path"></i><b class="punch-marker">✓</b>',
    books: '<i class="balance-beam"></i><b class="cash-pulse">$</b>',
    receipts: '<i class="scan-line"></i><b class="scan-confirm">✓</b>',
    pulse: '<i class="pulse-line"></i><b class="pulse-core">A</b>',
  };
  const asset = app.cardAsset || `./assets/carousel-v2/${app.motion}.webp`;
  return `
    <img class="carousel-art" src="${escapeHtml(asset)}" alt="">
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
  const rawRows = primary ? view.primaryRows : view.secondaryRows;
  const rows = Array.isArray(rawRows) ? rawRows : [];
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
  if (!app || app.placeholder || !app.packages.length) return;
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

function isInstalledAquaApp(app) {
  if (!app || app.placeholder || !app.packages.length) return false;
  if (!window.AquaBridge?.isAppInstalled) return false;
  try {
    return Boolean(window.AquaBridge.isAppInstalled(JSON.stringify(app.packages)));
  } catch (_) {
    return false;
  }
}

function openWorkspace() {
  if (rotating) return;
  const selected = apps[active];
  const installed = isInstalledAquaApp(selected);
  if (installed && window.AquaBridge?.launchApp) {
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
      <p>${selected.placeholder ? "Reserved inside Aqua Sentinel OS" : "Opened inside Aqua Sentinel OS for field testing"}</p>
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
        ${selected.placeholder ? "Coming online" : installed ? "Open installed app" : "Test workspace · app not installed"}
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
    if (installed && window.AquaBridge?.launchApp) {
      window.AquaBridge.launchApp(selected.name, JSON.stringify(selected.packages));
      return;
    }
    notify(
      selected.placeholder
        ? "This Aqua app portal is reserved and has not been assigned yet."
        : selected.connected
        ? `${selected.name} is registered with Sentinel`
        : `${selected.name} is available as a Sentinel test workspace; install its APK to open the full app`,
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
  active = index;
  render();
  document.querySelectorAll(".bottom-rail button").forEach((button) => {
    button.classList.toggle("active", button.dataset.appName === app.name);
  });
  if (isInstalledAquaApp(app) && window.AquaBridge?.launchApp) {
    window.AquaBridge.launchApp(app.name, JSON.stringify(app.packages));
  } else {
    closeOverlays();
    openWorkspace();
    notify(
      app.placeholder
        ? "This Aqua app portal is reserved for a future application."
        : `${app.name} opened in Sentinel test mode; install its APK for the full application`,
    );
  }
}

function returnNeuralToRest() {
  cancelNeuralMotion();
  clearTimeout(neuralFireTimer);
  clearTimeout(neuralTransitionTimer);
  clearTimeout(neuralDestinationTimer);
  neuralFocusIndex = -1;
  neuralSupportIndexes = [];
  neuralVisibleIndexes = [0, 1, 7, 2, 4, 5, 6];
  neuralPhase = "rest";
  neuralMorphProgress = 0;
  neuralPhaseReadyAt = 0;
  neuralRequestStartedAt = 0;
  neuralAcknowledgedAt = 0;
  pendingNeuralIntent = null;
  neuralMaterialization = null;
  neuralThought = "Aqua is listening across your company.";
  neuralThoughtDetail = "Every system stays ready while her attention moves.";
  layoutNeuralStage();
  renderNeuralMaterialization();
}

function scheduleNeuralDestination(intent) {
  if (!intent || !Number.isInteger(intent.primary)) return;
  clearTimeout(neuralDestinationTimer);
  pendingNeuralIntent = { ...intent, command: intent.command || "" };
  neuralDestinationTimer = setTimeout(() => {
    const destination = pendingNeuralIntent;
    if (!destination || destination.primary !== intent.primary) return;
    if (destination.primary === apps.length) openPanel("files");
    else launchAppByIndex(destination.primary);
    setAquaState("idle");
  }, NEURAL_DESTINATION_OPEN_MILLIS);
}

function portalMaterialization(index) {
  const materialization = neuralMaterializationFor({
    primary: index,
    supporting: neuralSupportIndexes,
    kind: index >= apps.length ? "file" : apps[index].motion,
  });
  if (!materialization) return;
  neuralThought = `${materialization.sourceApp} returned a view to Aqua.`;
  neuralThoughtDetail = materialization.sourceState === "Confirmed"
    ? "Confirmed source. The rest of Aqua’s mind remains active behind it."
    : "Connection truth stays visible while Aqua keeps the conversation open.";
  showMaterialization(materialization, true);
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

function neuralMaterializationMarkup(materialization) {
  if (!materialization?.present) return "";
  const fields = Array.isArray(materialization.fields) ? materialization.fields.slice(0, 5) : [];
  const isReceipt = ["receipt", "receipts"].includes(materialization.kind);
  const previewUri = safeMaterializationUri(materialization.previewUri);
  const spokenReply = isReceipt
    ? "I found the receipt, Dave."
    : `${materialization.title || "The requested item"} is ready, Dave.`;
  const receiptObject = `<button class="neural-returned-document neural-approved-receipt" type="button" data-materialized-action="open_source" aria-label="Open the Home Depot receipt">
      <span class="neural-receipt-crop" aria-hidden="true"><img src="${previewUri || "./assets/home-depot-receipt-owner-approved-v074.png"}" alt="" /></span>
      <span>Home Depot receipt&nbsp; · &nbsp;Marlborough Kitchen</span>
    </button>`;
  const recordObject = `<section class="neural-returned-record" aria-label="${escapeHtml(materialization.title || "Materialized record")}">
      <header><small>${escapeHtml(materialization.sourceApp || "Aqua Sentinel")}</small><strong>${escapeHtml(materialization.title || "Requested item")}</strong><em>${escapeHtml(materialization.sourceState || "Ready")}</em></header>
      <p>${escapeHtml(materialization.subtitle || "Aqua materialized the requested information.")}</p>
      <div>${fields.map((field) => `<span><small>${escapeHtml(field.label)}</small><b>${escapeHtml(field.value)}</b></span>`).join("")}</div>
    </section>`;
  return `<i class="neural-morph-shell" aria-hidden="true"></i><article class="neural-materialization-approved ${isReceipt ? "is-receipt" : ""}" data-neural-materialized="${neuralPhase === "transitioning" ? "pending" : "true"}" data-materialization-phase="${neuralPhase}" data-materialization-kind="${escapeHtml(materialization.kind || "record")}">
    <svg class="neural-materialization-circuit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="materialization-circuit-base" d="M22 21 C25 21 27 20 29 18 L33 11 Q35 8 40 8 H92 Q97 8 97 14 V90 Q97 95 92 95 H34 Q29 95 29 89 V28 C29 25 26 23 22 22" pathLength="100"></path>
      <path class="materialization-circuit-fire materialization-circuit-fire-a" d="M22 21 C25 21 27 20 29 18 L33 11 Q35 8 40 8 H92 Q97 8 97 14 V90 Q97 95 92 95 H34 Q29 95 29 89 V28 C29 25 26 23 22 22" pathLength="100"></path>
      <path class="materialization-circuit-fire materialization-circuit-fire-b" d="M22 21 C25 21 27 20 29 18 L33 11 Q35 8 40 8 H92 Q97 8 97 14 V90 Q97 95 92 95 H34 Q29 95 29 89 V28 C29 25 26 23 22 22" pathLength="100"></path>
    </svg>
    <header class="neural-approved-voice" aria-live="polite">
      <span class="neural-voice-mark" aria-hidden="true">A</span>
      <div aria-hidden="true">${Array.from({ length: 34 }, (_, index) => `<i style="--voice:${(index * 19) % 31}"></i>`).join("")}</div>
      <p>${escapeHtml(spokenReply)}</p>
    </header>
    <div class="neural-live-object">${isReceipt ? receiptObject : recordObject}</div>
    <button class="neural-open-materialized-file" type="button" data-materialized-action="open_source" aria-label="Open ${escapeHtml(materialization.title || "materialized file")}">OPEN FILE <span aria-hidden="true">›</span></button>
  </article>`;
}

function bindNeuralMaterializationActions() {
  const slot = systemPanel.querySelector("[data-neural-materialization-slot]");
  if (!slot) return;
  slot.querySelectorAll("[data-materialized-action=\"open_source\"]").forEach((button) => button.addEventListener("click", () => {
    const appIndex = Number(neuralMaterialization?.appIndex);
    if (appIndex >= apps.length) openPanel("files");
    else if (appIndex >= 0) launchAppByIndex(appIndex);
  }));
}

function animateMaterializationFromPortal() {
  if (neuralPhase !== "transitioning") return;
  const stage = systemPanel.querySelector(".neural-stage");
  const source = stage?.querySelector(".neural-portal.is-primary .portal-pull");
  const shell = stage?.querySelector(".neural-morph-shell");
  const surface = stage?.querySelector("[data-neural-materialized]");
  if (!stage || !source || !shell || !surface || surface.dataset.morphStarted === "true") return;
  surface.dataset.morphStarted = "true";
  if (typeof surface.animate !== "function") {
    shell.dataset.morphComplete = "true";
    surface.dataset.morphReady = "true";
    surface.style.opacity = "1";
    return;
  }
  requestAnimationFrame(() => {
    if (!surface.isConnected || neuralPhase !== "transitioning") return;
    const sourceBounds = source.getBoundingClientRect();
    const targetBounds = surface.getBoundingClientRect();
    if (
      sourceBounds.width <= 0
        || sourceBounds.height <= 0
        || targetBounds.width <= 0
        || targetBounds.height <= 0
    ) {
      shell.dataset.morphComplete = "true";
      surface.dataset.morphReady = "true";
      surface.style.opacity = "1";
      return;
    }
    const containingBounds = surface.offsetParent?.getBoundingClientRect()
      || stage.getBoundingClientRect();
    const sourceBox = {
      left: sourceBounds.left - containingBounds.left,
      top: sourceBounds.top - containingBounds.top,
      width: sourceBounds.width,
      height: sourceBounds.height,
    };
    const targetBox = {
      left: targetBounds.left - containingBounds.left,
      top: targetBounds.top - containingBounds.top,
      width: targetBounds.width,
      height: targetBounds.height,
    };
    const mix = (from, to, progress) => from + (to - from) * progress;
    const targetRadius = getComputedStyle(surface).borderRadius || "24px";
    const animations = typeof shell.getAnimations === "function"
      ? [...shell.getAnimations(), ...surface.getAnimations()]
      : [];
    animations.forEach((animation) => animation.cancel());
    const materializationAnimation = shell.animate([
      {
        left: `${sourceBox.left}px`,
        top: `${sourceBox.top}px`,
        width: `${sourceBox.width}px`,
        height: `${sourceBox.height}px`,
        right: "auto",
        bottom: "auto",
        borderRadius: "50%",
        opacity: 1,
        offset: 0,
      },
      {
        left: `${mix(sourceBox.left, targetBox.left, .46)}px`,
        top: `${mix(sourceBox.top, targetBox.top, .46)}px`,
        width: `${mix(sourceBox.width, targetBox.width, .46)}px`,
        height: `${mix(sourceBox.height, targetBox.height, .46)}px`,
        right: "auto",
        bottom: "auto",
        borderRadius: "28%",
        opacity: 1,
        offset: .46,
      },
      {
        left: `${targetBox.left}px`,
        top: `${targetBox.top}px`,
        width: `${targetBox.width}px`,
        height: `${targetBox.height}px`,
        right: "auto",
        bottom: "auto",
        borderRadius: targetRadius,
        opacity: 1,
        offset: 1,
      },
    ], {
      duration: NEURAL_MORPH_MILLIS,
      easing: "cubic-bezier(.16,.76,.18,1)",
      fill: "both",
    });
    materializationAnimation.id = "aqua-neural-materialization-box";
    neuralMaterializationAnimation = materializationAnimation;
    const contentAnimation = surface.animate([
      { opacity: 0, offset: 0 },
      { opacity: 0, offset: .04 },
      { opacity: 1, offset: 1 },
    ], {
      duration: NEURAL_MORPH_MILLIS,
      easing: "linear",
      fill: "both",
    });
    contentAnimation.id = "aqua-neural-materialization-content";
    neuralMaterializationContentAnimation = contentAnimation;
    const parameters = new URLSearchParams(window.location.search);
    const deterministicSequence = parameters.get("preview") === "neural"
      && parameters.get("neuralDemo") === "sequence"
      && parameters.has("neuralAt");
    if (deterministicSequence) {
      materializationAnimation.pause();
      materializationAnimation.currentTime = neuralMorphProgress * NEURAL_MORPH_MILLIS;
      contentAnimation.pause();
      contentAnimation.currentTime = neuralMorphProgress * NEURAL_MORPH_MILLIS;
    } else {
      materializationAnimation.finished.then(() => {
        if (neuralMaterializationAnimation !== materializationAnimation) return;
        shell.dataset.morphComplete = "true";
      }).catch(() => {});
    }
    surface.dataset.morphReady = "true";
  });
}

function renderNeuralMaterialization() {
  const slot = systemPanel.querySelector("[data-neural-materialization-slot]");
  if (!slot) return;
  if (!["transitioning", "result"].includes(neuralPhase) || !neuralMaterialization) {
    slot.innerHTML = "";
    return;
  }
  const existing = slot.querySelector("[data-neural-materialized]");
  const kind = String(neuralMaterialization.kind || "record");
  if (existing && existing.dataset.materializationKind === kind) {
    existing.dataset.neuralMaterialized = neuralPhase === "result" ? "true" : "pending";
    existing.dataset.materializationPhase = neuralPhase;
    return;
  }
  slot.innerHTML = neuralMaterializationMarkup(neuralMaterialization);
  bindNeuralMaterializationActions();
  animateMaterializationFromPortal();
}

function showMaterialization(materialization, animateNeuralTransition = true) {
  if (!materialization?.present) return;
  if (!systemPanel.hidden && systemPanel.dataset.panel === "neural") {
    clearTimeout(neuralTransitionTimer);
    neuralMaterialization = materialization;
    detailSheet.hidden = true;
    detailSheet.classList.remove("is-full", "aqua-materialization");
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (animateNeuralTransition && !reducedMotion) {
      const isSelecting = ["selecting", "firing"].includes(neuralPhase);
      const fireDwell = isSelecting
        ? Math.max(0, neuralPhaseReadyAt - performance.now())
        : 0;
      neuralTransitionTimer = setTimeout(() => {
        if (neuralMaterialization !== materialization) return;
        animateNeuralMorph(NEURAL_MORPH_MILLIS);
      }, fireDwell);
    } else {
      cancelNeuralMotion();
      neuralMorphProgress = 1;
      neuralPhase = "result";
      layoutNeuralStage();
      renderNeuralMaterialization();
    }
    return;
  }
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
        if (index === apps.length) openPanel("files");
        else if (index >= 0) launchAppByIndex(index);
        else notify("The authoritative source app has not registered a verified deep link yet.");
      }
    });
  });
}

function closeOverlays() {
  clearTimeout(neuralTransitionTimer);
  clearTimeout(neuralDestinationTimer);
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
  const pending = filingInbox.filter((item) => item.needsClarification || item.needsApproval).length;
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
          ${item.brainReply ? `<p class="filing-brain-reply"><b>Aqua</b>${escapeHtml(item.brainReply)}</p>` : ""}
          <small>${escapeHtml(item.handoffState || "Captured")} · ${escapeHtml(item.createdLabel || "Captured just now")}</small>
          ${item.needsApproval ? `<p class="filing-owner-gate">Owner confirmation is required before Aqua can execute this external action.</p>` : ""}
          <div class="filing-item-actions">
            ${item.needsClarification ? `<button class="filing-clarify" type="button" data-clarify-id="${escapeHtml(item.id)}">Ask Aqua what this is for</button>` : ""}
            ${!item.needsClarification && !item.needsApproval && !["Filed Locally", "Confirmed"].includes(item.state) ? `<button class="filing-file" type="button" data-file-id="${escapeHtml(item.id)}">File now</button>` : ""}
            ${item.type !== "action" ? `<button class="filing-discard" type="button" data-discard-id="${escapeHtml(item.id)}">Discard</button>` : ""}
          </div>
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
      <button type="button" data-filing-refresh>Refresh cabinet</button>
    </div>
    <div class="filing-list">${items}</div>`;
}

function neuralWorkspaceMarkup() {
  const portalApps = [
    ...apps
      .map((app, index) => ({ app, index }))
      .filter(({ app }) => !app.placeholder),
    { app: neuralSourceAt(apps.length), index: apps.length },
  ];
  const portals = portalApps.map(({ app, index }) => {
    const connection = neuralConnectionState(index);
    const name = app.name.replace("Aqua Knowledge Vault", "Knowledge Vault").replace("Aqua ", "");
    const environment = app.neuralAsset
      ? `<img src="${escapeHtml(app.neuralAsset)}" alt="${escapeHtml(`${app.name} presentation home screen`)}" />`
      : "";
    return `<article class="neural-portal" style="--portal-color:${app.color}" data-portal-index="${index}">
      <button class="portal-pull" type="button" data-neural-portal="${index}" aria-label="Pull ${escapeHtml(app.name)} forward">
        <span class="portal-node${app.neuralAsset ? " has-environment" : ""}">${environment}<span class="portal-environment-shade"></span><i>${escapeHtml(app.icon)}</i><strong>${escapeHtml(name)}</strong><em>${connection.label}</em><b></b><u></u></span>
      </button>
    </article>`;
  }).join("");
  const baseNeuralPath = neuralPathForSlot(neuralRingSlots[0]);
  const routes = portalApps.map(({ app, index }) => {
    const slot = neuralFixedSlotForSource(index);
    const bursts = [0, 1, 2, 3].map((laneIndex) => `
      <path class="neural-burst burst-${laneIndex}" d="${baseNeuralPath}" pathLength="100" data-neural-burst="${index}" data-neural-lane="${laneIndex}" style="--burst-delay:${(-index * .31 - laneIndex * .67).toFixed(2)}s;--burst-speed:${(2.15 + (index % 3) * .38 + laneIndex * .29).toFixed(2)}s"></path>`).join("");
    return `
    <g class="neural-route-group" data-neural-source-group="${index}" transform="${neuralRouteTransform(slot)}">
      <path class="neural-route" d="${baseNeuralPath}" pathLength="100" data-neural-route="${index}"></path>
      <path class="neural-signal" d="${baseNeuralPath}" pathLength="100" data-neural-path="${index}"></path>
      <g class="neural-microbursts">${bursts}</g>
    </g>`;
  }).join("");
  const confirmedSources = apps.filter((app) => !app.placeholder && (app.connected || liveSnapshots.has(app.name))).length;

  return `<section class="neural-shell" aria-label="Aqua Neuralink" data-neural-contract="AQUA SENTINEL NEURAL LINK">
      <div class="neural-stage" data-phase="${escapeHtml(neuralPhase)}" data-neural-visible-portals="7" data-neural-added-ui-delay-ms="0" data-neural-acknowledged="false" data-reference-composition="live-neural-substrate-v080">
        <header class="neural-titlebar">
          <button type="button" class="panel-close" aria-label="Back to Aqua Sentinel Home">‹</button>
          <h1>AQUA SENTINEL</h1>
        </header>
        <span class="neural-source-count" aria-label="${confirmedSources} confirmed Aqua systems">${confirmedSources} CONFIRMED</span>
        <div class="neural-vignette" aria-hidden="true"></div>
        <div class="neural-substrate-map neural-substrate-rest" aria-hidden="true"><i class="neural-substrate-fire neural-substrate-cyan"></i><i class="neural-substrate-fire neural-substrate-gold"></i></div>
        <div class="neural-substrate-map neural-substrate-result" aria-hidden="true"><i class="neural-substrate-fire neural-substrate-cyan"></i><i class="neural-substrate-fire neural-substrate-gold"></i></div>
        <div class="neural-jolt" aria-hidden="true"><b></b><i></i><i></i><span></span></div>
        <svg class="neural-thought-residue" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path class="neural-residue-bed" d="M50 49 C49.7 57 55.2 60.4 52.5 66.2 C49.5 72.5 43.8 70.4 46.4 77 C48.7 82.8 54.5 81.2 51 89" pathLength="100"></path>
          <path class="neural-residue-trace" d="M50 49 C49.7 57 55.2 60.4 52.5 66.2 C49.5 72.5 43.8 70.4 46.4 77 C48.7 82.8 54.5 81.2 51 89" pathLength="100"></path>
        </svg>
        <div class="neural-rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <svg class="neural-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="aqua-neural-core"><stop offset="0" stop-color="#ffffff"/><stop offset=".22" stop-color="#7df4ff"/><stop offset="1" stop-color="#00a9d8" stop-opacity="0"/></radialGradient>
          </defs>
          <circle class="neural-core-glow" cx="50" cy="45" r="10" fill="url(#aqua-neural-core)"></circle>
          ${routes}
        </svg>
        <div class="neural-core-field" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <button class="neural-core" type="button" data-neural-ask aria-label="Talk to Aqua">
          <span class="neural-core-hit" aria-hidden="true"></span>${aquaMarkMarkup("neural")}<b></b>
        </button>
        ${portals}
        <div class="neural-selected-chip" aria-live="polite"><i aria-hidden="true"></i><span><small>PRIMARY</small><strong data-neural-selected-name>Aqua CRM</strong></span></div>
        <div class="neural-thought" aria-live="polite">
          <div class="neural-waveform" aria-hidden="true">${Array.from({ length: 28 }, (_, index) => `<i style="--wave:${(index * 17) % 29}"></i>`).join("")}</div>
          <small><i></i><span data-neural-focus-name>ALL SYSTEMS</span></small>
          <strong data-neural-thought>${escapeHtml(neuralThought)}</strong>
          <p data-neural-thought-detail>${escapeHtml(neuralThoughtDetail)}</p>
          <ol class="neural-request-trail" aria-label="Aqua request state">
            <li>Request sent</li><li>Working</li><li>Result returning</li>
          </ol>
        </div>
        <div class="neural-materialization-slot" data-neural-materialization-slot aria-live="polite"></div>
        <button class="neural-continuation" type="button" data-neural-ask aria-label="Keep talking to Aqua"><i>A</i><span><b>Ask Aqua anything…</b><em>Keep talking to Aqua…</em></span><u aria-hidden="true"></u></button>
      </div>
    </section>`;
}

function commandCenterMarkup() {
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  const queuedMessages = widgetMessages.filter((message) => /saved|attention/i.test(message.state)).length;
  const widgetInstalled = commandWidgetState.installedCount > 0;
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
        <button type="button" data-command-ask><i>A</i><span>Aqua Action</span></button>
        <button type="button" data-filing-action="voice"><i>≈</i><span>File by voice</span></button>
        <button type="button" data-filing-action="photo"><i>▧</i><span>Add photo</span></button>
        <button type="button" data-filing-action="video"><i>▶</i><span>Add video</span></button>
      </div>
      <button class="command-widget-health ${widgetInstalled ? "is-installed" : ""}" type="button" data-command-widget>
        <i>A</i>
        <span><small>HOME-SCREEN COMMAND WIDGET</small><strong>${widgetInstalled ? `${commandWidgetState.installedCount} installed · tap to repair and refresh` : "Install the working Aqua widget"}</strong></span>
        <b>${widgetInstalled ? "READY" : commandWidgetState.supported ? "ADD" : "CHECK"}</b>
      </button>
      <div class="command-status">
        <article><i>◌</i><span><strong>Aqua conversation</strong><small>${queuedMessages ? `${queuedMessages} locally retained` : "No unsent owner commands"}</small></span><b>${authenticated ? "Connected" : "Local"}</b></article>
        <article><i>◇</i><span><strong>Ecosystem links</strong><small>${deviceDiagnostics.installedAppCount || 0} of ${deviceDiagnostics.registeredAppCount || apps.length} apps found on this phone</small></span><b>${deviceDiagnostics.installedAppCount ? "Inspect" : "Check"}</b></article>
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

function diagnosticReceiptText() {
  const state = deviceDiagnostics;
  const surface = systemPanel.hidden ? "Home" : systemPanel.dataset.panel || "Home";
  const appStates = Array.isArray(state.apps)
    ? state.apps.map((app) => `${app.name}=${app.installed ? "installed" : "not found"}`).join("; ")
    : "unavailable";
  return [
    "Aqua Sentinel OS diagnostic receipt",
    `Generated: ${state.generatedAt ? new Date(state.generatedAt).toISOString() : new Date().toISOString()}`,
    `Version: ${state.versionName || "unknown"} (${state.versionCode || "unknown"})`,
    `Platform: ${state.platform || "unknown"}`,
    `Surface: ${surface}; Neural phase: ${neuralPhase}; Aqua state: ${aquaStateLabel.textContent || "unknown"}`,
    `Aqua Brain: ${state.gatewayConfigured ? (state.authenticated ? "connected" : "configured, owner session needed") : "standalone; gateway not configured"}`,
    `Voice: ${state.microphoneGranted && state.speechRecognizerAvailable ? "ready" : "needs attention"}`,
    `Calendar: ${state.calendarReadGranted && state.calendarWriteGranted ? "ready" : "permission needed"}`,
    `Capture: photo=${Boolean(state.photoCaptureAvailable)} video=${Boolean(state.videoCaptureAvailable)}`,
    `Widget: ${state.widgetInstalledCount || 0} installed`,
    `File Cabinet: ${state.filingPendingCount || 0} pending; ${state.filedTodayCount || 0} captured today`,
    `Ecosystem: ${state.installedAppCount || 0}/${state.registeredAppCount || apps.length} apps installed`,
    `Applications: ${appStates}`,
  ].join("\n");
}

function diagnosticsMarkup() {
  const state = deviceDiagnostics;
  const nativeReady = Boolean(window.AquaBridge);
  const voiceReady = Boolean(state.microphoneGranted && state.speechRecognizerAvailable);
  const calendarReady = Boolean(state.calendarReadGranted && state.calendarWriteGranted);
  const captureReady = Boolean(state.photoCaptureAvailable && state.videoCaptureAvailable);
  const widgetReady = Number(state.widgetInstalledCount) > 0;
  const issues = [];
  if (nativeReady && !voiceReady) issues.push("Open Android permissions and allow microphone access so Aqua can listen.");
  if (nativeReady && !calendarReady) issues.push("Calendar read/write permission is needed for verified scheduling actions.");
  if (nativeReady && !captureReady) issues.push("Android did not report both photo and video capture handlers.");
  if (nativeReady && !widgetReady) issues.push("The Aqua Command Center widget has not been placed on this launcher.");
  if (Number(state.filingPendingCount) > 0) issues.push(`${state.filingPendingCount} File Cabinet ${state.filingPendingCount === 1 ? "item needs" : "items need"} direction.`);
  if (state.diagnosticError) issues.push(state.diagnosticError);
  const confirmed = nativeReady && issues.length === 0;
  return `${systemHeader("Diagnostics")}
    <section class="diagnostic-shell">
      <div class="diagnostic-orb ${confirmed ? "confirmed" : "attention"}"><i></i><strong>${confirmed ? "Sentinel device systems are ready" : "Aqua found actionable boundaries"}</strong><small>${nativeReady ? `Checked ${escapeHtml(state.platform || "Android")}` : "Live checks run inside the installed APK"}</small></div>
      <div class="diagnostic-list expanded">
        <article><i>◌</i><span><strong>Owner and Aqua Brain</strong><small>${state.gatewayConfigured ? "Server-owned gateway is configured" : "Standalone is active; gateway is not configured in this test build"}</small></span><b>${state.authenticated ? "Connected" : state.gatewayConfigured ? "Sign in" : "Standalone"}</b></article>
        <article><i>≈</i><span><strong>Voice and microphone</strong><small>Permission plus Android speech recognition</small></span><b>${voiceReady ? "Ready" : nativeReady ? "Review" : "APK check"}</b></article>
        <article><i>◷</i><span><strong>Calendar action path</strong><small>Read-back verification and duplicate protection</small></span><b>${calendarReady ? "Ready" : nativeReady ? "Permission" : "APK check"}</b></article>
        <article><i>▧</i><span><strong>Photo and video handoff</strong><small>Protected evidence return to the File Cabinet</small></span><b>${captureReady ? "Ready" : nativeReady ? "Review" : "APK check"}</b></article>
        <article><i>A</i><span><strong>Command Center widget</strong><small>${state.filedTodayCount || 0} captured today · ${state.filingPendingCount || 0} pending</small></span><b>${widgetReady ? `${state.widgetInstalledCount} active` : nativeReady ? "Add" : "APK check"}</b></article>
        <article><i>∞</i><span><strong>Aqua ecosystem</strong><small>Installed applications found on this phone</small></span><b>${state.installedAppCount || 0}/${state.registeredAppCount || apps.length}</b></article>
      </div>
      <div class="diagnostic-reports">${issues.length
        ? issues.map((issue) => `<p><i>!</i><span>${escapeHtml(issue)}</span></p>`).join("")
        : `<p class="confirmed"><i>✓</i><span>No actionable device failures are visible.</span></p>`}</div>
      <div class="diagnostic-actions">
        <button type="button" data-diagnostic-action="refresh">Run checks again</button>
        <button type="button" data-diagnostic-action="permissions">Open Android permissions</button>
        <button type="button" data-diagnostic-action="copy">Copy repair receipt</button>
      </div>
      <button class="diagnostic-return" type="button" data-space="command">Return to Command Center</button>
    </section>`;
}

function connectionsMarkup() {
  const nativeStates = Array.isArray(deviceDiagnostics.apps) ? deviceDiagnostics.apps : [];
  const rows = apps.map((app, index) => {
    const nativeState = nativeStates.find((entry) => entry?.name === app.name);
    const live = app.connected || liveSnapshots.has(app.name);
    const installed = Boolean(nativeState?.installed);
    const state = live ? "CONFIRMED" : installed ? "INSTALLED" : "NOT FOUND";
    const detail = live
      ? "Authoritative home snapshot received"
      : installed
        ? "App can open; Sentinel snapshot adapter is awaiting confirmation"
        : "Install this Aqua app to activate its local launch path";
    return `<article class="connection-row ${live ? "confirmed" : installed ? "installed" : "missing"}">
      <i style="--connection-color:${escapeHtml(app.color)}">${escapeHtml(app.icon)}</i>
      <span><strong>${escapeHtml(app.name)}</strong><small>${escapeHtml(detail)}</small></span>
      <b>${state}</b>
      <div><button type="button" data-integration-open="${index}">Open app</button><button type="button" data-integration-refresh="${index}" ${installed ? "" : "disabled"}>Refresh link</button></div>
    </article>`;
  }).join("");
  return `${systemHeader("Ecosystem Connections")}
    <section class="connections-shell">
      <div class="connections-summary"><small>AQUA NERVOUS SYSTEM</small><strong>${deviceDiagnostics.installedAppCount || 0} of ${deviceDiagnostics.registeredAppCount || apps.length} applications found</strong><p>Installed, connected, and authoritative are separate states. Aqua never labels a missing adapter as live.</p></div>
      <div class="connection-list">${rows}</div>
      <button class="diagnostic-return" type="button" data-space="settings">Return to Settings</button>
    </section>`;
}

function aboutMarkup() {
  return `${systemHeader("About")}
    <section class="about-shell">
      <div class="about-mark">${aquaMarkMarkup("about")}</div>
      <small>AQUA SOFTWARE COMPANY</small>
      <h1>Aqua Sentinel OS</h1>
      <p>Aqua is the owner command layer across the Aqua application ecosystem. Each satellite keeps its own authoritative records; Sentinel coordinates, explains, routes, and preserves receipts.</p>
      <div class="about-version"><span><small>TEST VERSION</small><strong>${escapeHtml(deviceDiagnostics.versionName || "0.8.1-field-test-navigation-recovery")}</strong></span><b>${escapeHtml(deviceDiagnostics.platform || "Android")}</b></div>
      <div class="about-boundaries">
        <article><i>✓</i><span><strong>Protected Home</strong><small>The approved first screen is unchanged by this repair.</small></span></article>
        <article><i>✓</i><span><strong>Server-owned intelligence</strong><small>API credentials and guarded actions do not live inside the APK.</small></span></article>
        <article><i>✓</i><span><strong>Truthful authority</strong><small>Local, queued, preview, and confirmed states remain visibly different.</small></span></article>
      </div>
      <button class="diagnostic-return" type="button" data-space="settings">Return to Settings</button>
    </section>`;
}

function settingsMarkup() {
  const state = deviceDiagnostics;
  const voiceReady = Boolean(state.microphoneGranted && state.speechRecognizerAvailable);
  const calendarReady = Boolean(state.calendarReadGranted && state.calendarWriteGranted);
  return `${systemHeader("Settings")}
    <section class="settings-hero"><small>AQUA SENTINEL OS</small><h1>Make Aqua feel like yours.</h1><p>These controls change Sentinel’s operating behavior and open the real Android boundaries behind it. The approved Home artwork remains protected.</p></section>
    <div class="settings-runtime"><span><small>OPERATING MODE</small><strong>${authenticated ? "Sentinel connected" : "Standalone"}</strong></span><span><small>DEVICE CHECK</small><strong>${voiceReady && calendarReady ? "Ready" : "Review permissions"}</strong></span></div>
    <div class="settings-list enriched">
      <button type="button" data-setting="sound"><i>◉</i><span><strong>Aqua voice feedback</strong><small>Spoken responses and filing briefs</small></span><b>${sound ? "ON" : "OFF"}</b></button>
      <button type="button" data-setting="notifications"><i>◇</i><span><strong>In-app owner alerts</strong><small>Routine receipts and confirmations; critical failures remain visible</small></span><b>${notifications ? "ON" : "OFF"}</b></button>
      <button type="button" data-setting="voice-test"><i>≈</i><span><strong>Voice and presence test</strong><small>Hear Aqua and verify the living center</small></span><b>TEST</b></button>
      <button type="button" data-setting="permissions"><i>⌾</i><span><strong>Privacy and permissions</strong><small>Microphone and calendar access in Android settings</small></span><b>${voiceReady && calendarReady ? "READY" : "REVIEW"}</b></button>
      <button type="button" data-setting="integrations"><i>∞</i><span><strong>Ecosystem connections</strong><small>Installed applications, snapshots, and authoritative links</small></span><b>${state.installedAppCount || 0}/${state.registeredAppCount || apps.length}</b></button>
      <button type="button" data-setting="storage"><i>▤</i><span><strong>File Cabinet and synchronization</strong><small>Protected evidence, queues, cloud confirmation, and retention</small></span><b>${state.filingPendingCount || 0} PENDING</b></button>
      <button type="button" data-setting="diagnostics"><i>◇</i><span><strong>Diagnostics</strong><small>Run device checks and copy a repair receipt</small></span><b>CHECK</b></button>
      <button type="button" data-setting="about"><i>A</i><span><strong>About Aqua Sentinel OS</strong><small>Version, security boundary, and connected contracts</small></span><b>0.8.1</b></button>
    </div>`;
}

function updateFilingBadge() {
  const badge = document.getElementById("filingPendingBadge");
  const pending = filingInbox.filter((item) => item.needsClarification).length;
  badge.textContent = String(Math.min(99, pending));
  badge.hidden = pending === 0;
}

function openPanel(kind) {
  if (kind === "connect") {
    openOwnerAccess();
    return;
  }
  const railKind = ["messages", "files", "diagnostics"].includes(kind)
    ? "command"
    : ["data", "about"].includes(kind)
      ? "settings"
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
    systemPanel.innerHTML = connectionsMarkup();
  } else if (kind === "settings") {
    systemPanel.innerHTML = settingsMarkup();
  } else if (kind === "about") {
    systemPanel.innerHTML = aboutMarkup();
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
    button.addEventListener("click", () => {
      if (kind === "neural" && neuralPhase !== "rest") {
        returnNeuralToRest();
        return;
      }
      openPanel("home");
    });
  });
  systemPanel.querySelectorAll("[data-space]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.space));
  });
  systemPanel.querySelectorAll("[data-neural-ask]").forEach((button) => {
    button.addEventListener("click", startVoice);
  });
  systemPanel.querySelectorAll("[data-neural-portal]").forEach((button) => {
    button.addEventListener("click", () => {
      if (performance.now() < suppressNeuralPortalClickUntil) return;
      const index = Number(button.dataset.neuralPortal);
      const supporting = index === 6
        ? [0, 5, 4, 3]
        : index === apps.length
          ? [0, 6, 5, 4]
          : [0, 5, 6, 4, 3].filter((supportIndex) => supportIndex !== index).slice(0, 4);
      neuralRequestStartedAt = performance.now();
      neuralAcknowledgedAt = 0;
      focusNeuralSource(index, supporting);
      portalMaterialization(index);
    });
  });
  const neuralStage = systemPanel.querySelector(".neural-stage");
  if (neuralStage) {
    neuralStage.dataset.fixedPortals = "true";
  }
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
  systemPanel.querySelector("[data-command-ask]")?.addEventListener("click", () => {
    openPanel("home");
    startVoice();
  });
  systemPanel.querySelector("[data-command-widget]")?.addEventListener("click", () => {
    if (!window.AquaBridge?.installOrRepairCommandWidget) {
      notify("Widget installation is available in the Android APK.");
      return;
    }
    window.AquaBridge.installOrRepairCommandWidget();
    notify(commandWidgetState.installedCount
      ? "Aqua refreshed the home-screen widget and all four actions."
      : "Confirm Add Widget on Android to place Aqua on your Home screen.");
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
        saveOwnerPreferences();
        openPanel("settings");
      } else if (setting === "notifications") {
        notifications = !notifications;
        saveOwnerPreferences();
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
        if (window.AquaBridge?.openAppPermissionSettings) {
          window.AquaBridge.openAppPermissionSettings();
        } else {
          notify("Android permission controls are available in the installed APK.");
        }
      } else if (setting === "about") {
        openPanel("about");
      } else {
        notify(
          "Aqua Sentinel OS · server-owned AI · encrypted device sessions · authoritative satellite records",
        );
      }
    });
  });
  systemPanel.querySelectorAll("[data-integration-open]").forEach((button) => {
    button.addEventListener("click", () => launchAppByIndex(Number(button.dataset.integrationOpen)));
  });
  systemPanel.querySelectorAll("[data-integration-refresh]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.integrationRefresh);
      requestSnapshot(apps[index]);
      notify(`Aqua requested a fresh ${apps[index]?.name || "application"} home snapshot.`);
    });
  });
  systemPanel.querySelectorAll("[data-diagnostic-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.diagnosticAction;
      if (action === "refresh") {
        window.refreshDeviceDiagnostics();
      } else if (action === "permissions") {
        if (window.AquaBridge?.openAppPermissionSettings) {
          window.AquaBridge.openAppPermissionSettings();
        } else {
          notify("Android permission controls are available in the installed APK.");
        }
      } else if (action === "copy") {
        const receipt = diagnosticReceiptText();
        if (window.AquaBridge?.copyDiagnosticReceipt) {
          window.AquaBridge.copyDiagnosticReceipt(receipt);
        } else if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(receipt).then(
            () => window.receiveDiagnosticCopy(),
            () => notify("The diagnostic receipt is ready in the installed Android APK."),
          );
        } else {
          notify("The diagnostic receipt is ready in the installed Android APK.");
        }
      }
    });
  });
  systemPanel.querySelectorAll("[data-message-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.messageAction === "voice") {
        openPanel("home");
        startVoice();
        return;
      }
      if (!authenticated) {
        notify("Your commands remain saved. Connect Aqua Brain to retry them.");
        return;
      }
      widgetMessages.forEach((message) => {
        if (message.role === "You" && /attention/i.test(message.state)) {
          message.state = "Saved locally · awaiting Aqua";
        }
      });
      saveWidgetMessages();
      flushNextWidgetCommand();
      openPanel("messages");
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
  systemPanel.querySelector("[data-filing-refresh]")?.addEventListener("click", () => {
    window.refreshFilingInbox();
    notify("Aqua refreshed the protected File Cabinet.");
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
  systemPanel.querySelectorAll("[data-file-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!window.AquaBridge?.fileFilingItem) {
        notify("Local filing is available in the installed Android app.");
        return;
      }
      const filed = window.AquaBridge.fileFilingItem(button.dataset.fileId);
      window.refreshFilingInbox();
      notify(filed ? "Aqua filed the item securely on this phone." : "Aqua needs a destination or owner approval before filing this item.");
    });
  });
  systemPanel.querySelectorAll("[data-discard-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!window.confirm("Discard this captured item and its protected on-device evidence? External records are not changed.")) return;
      if (!window.AquaBridge?.discardFilingItem) {
        notify("Secure discard is available in the installed Android app.");
        return;
      }
      const discarded = window.AquaBridge.discardFilingItem(button.dataset.discardId);
      window.refreshFilingInbox();
      notify(discarded ? "The captured item was discarded." : "Aqua could not safely discard that item.");
    });
  });
  systemPanel.querySelector(".confirm-signout")?.addEventListener("click", () => {
    window.AquaBridge?.signOut();
    receiveAuthState(JSON.stringify({ authenticated: false }));
  });
  if (kind === "neural") {
    // Establish the seven fixed portals before Neural Link can paint or report ready.
    // Deferring this work by one frame briefly exposed every dormant source.
    layoutNeuralStage();
    renderNeuralMaterialization();
  }
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
    if (index >= 0) {
      const intent = pendingNeuralIntent || {
        primary: index,
        supporting: [],
        command: `Open ${apps[index].name}`,
      };
      if (systemPanel.hidden || systemPanel.dataset.panel !== "neural") beginNeuralRequest(intent.command);
      scheduleNeuralDestination(intent);
    }
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

function seekNeuralSequencePreview(elapsedMillis) {
  cancelNeuralMotion();
  clearTimeout(neuralFireTimer);
  clearTimeout(neuralTransitionTimer);
  const elapsed = Math.max(0, Number(elapsedMillis) || 0);
  const sourceIndex = 6;
  const source = neuralSourceAt(sourceIndex);
  neuralFocusIndex = sourceIndex;
  neuralSupportIndexes = [0, 5, 4, 3];
  promoteNeuralSource(sourceIndex);
  neuralMorphProgress = 0;
  neuralMaterialization = null;

  if (elapsed < NEURAL_SELECT_MILLIS) {
    neuralPhase = "selecting";
    neuralThought = "Aqua Receipts is materializing on its Sentinel tether.";
    neuralThoughtDetail = "The seven black portals stay fixed while their application contents swap cleanly.";
    layoutNeuralStage();
    renderNeuralMaterialization();
    return;
  }

  if (elapsed < NEURAL_SEQUENCE_MORPH_AT) {
    neuralPhase = "firing";
    neuralThought = `${source.name} is live on its Sentinel tether.`;
    neuralThoughtDetail = "Aqua is firing one clean cyan-and-gold synapse along the requested path.";
    layoutNeuralStage();
    renderNeuralMaterialization();
    return;
  }

  neuralMaterialization = neuralMaterializationFor({
    primary: sourceIndex,
    supporting: neuralSupportIndexes,
    kind: "receipt",
  });
  neuralThought = `${source.name} returned a view to Aqua.`;
  neuralThoughtDetail = "Connection truth stays visible while Aqua keeps the conversation open.";
  if (elapsed < NEURAL_SEQUENCE_RESULT_AT) {
    neuralPhase = "transitioning";
    neuralMorphProgress = (elapsed - NEURAL_SEQUENCE_MORPH_AT) / NEURAL_MORPH_MILLIS;
    layoutNeuralStage(neuralMorphProgress);
    renderNeuralMaterialization();
    return;
  }

  neuralPhase = "result";
  neuralMorphProgress = 1;
  layoutNeuralStage(1);
  renderNeuralMaterialization();
}

function activateDeterministicPreviewRoute() {
  const previewParameters = new URLSearchParams(window.location.search);
  const previewPanel = previewParameters.get("preview");
  if (!["home", "neural", "command", "settings", "diagnostics", "data", "files", "messages", "about"].includes(previewPanel)) {
    return false;
  }
  authenticated = true;
  authPanel.hidden = true;
  if (previewPanel === "home") {
    render();
  } else {
    if (previewPanel === "neural") {
      const demo = previewParameters.get("neuralDemo") || "rest";
      if (["focus", "select", "rotate", "fire", "transition", "company", "receipt", "result"].includes(demo)) {
        const companyMorph = demo === "company";
        neuralFocusIndex = companyMorph ? 0 : 6;
        neuralSupportIndexes = companyMorph ? [5, 6, 4, 3] : [0, 5, 4, 3];
        promoteNeuralSource(neuralFocusIndex);
        neuralPhase = companyMorph || demo === "result"
          ? "result"
          : demo === "transition"
            ? "transitioning"
            : demo === "fire"
              ? "firing"
              : "selecting";
        neuralThought = companyMorph
          ? "Here’s today’s company picture. Want me to go deeper?"
          : demo === "result"
          ? "Aqua Receipts returned the requested file."
          : demo === "fire"
            ? "Receipts is locked on its Sentinel tether."
            : "Aqua Receipts is materializing on its Sentinel tether.";
        neuralThoughtDetail = companyMorph
          ? "Aqua Voice Active"
          : demo === "fire"
          ? "Aqua is firing a long neural pulse through the selected tether."
          : "CRM, Books, Timesheet, and Knowledge Vault remain active supporting thoughts.";
        if (!companyMorph && ["transition", "result"].includes(demo)) {
          neuralMaterialization = neuralMaterializationFor({
            primary: 6,
            supporting: [0, 5, 4, 3],
            kind: "receipt",
          });
        }
      } else {
        neuralFocusIndex = -1;
        neuralSupportIndexes = [];
        neuralPhase = "rest";
      }
    }
    openPanel(previewPanel);
    if (previewPanel === "neural" && previewParameters.get("neuralDemo") === "result") {
      showMaterialization(neuralMaterializationFor({
        primary: 6,
        supporting: [0, 5, 4, 3],
        kind: "receipt",
      }), false);
    }
    if (previewPanel === "neural" && previewParameters.get("neuralDemo") === "sequence") {
      const requestedPreviewTime = Number(previewParameters.get("neuralAt"));
      if (Number.isFinite(requestedPreviewTime) && requestedPreviewTime >= 0) {
        seekNeuralSequencePreview(requestedPreviewTime);
      } else {
        focusNeuralSource(6, [0, 5, 4, 3], "Find the Home Depot receipt.");
        portalMaterialization(6);
      }
    }
  }
  document.documentElement.dataset.aquaPreviewReady = previewPanel;
  if (previewPanel === "neural") {
    document.documentElement.dataset.aquaNeuralPhase = neuralPhase;
  }
  return true;
}

let realtimePeerConnection = null;
let realtimeDataChannel = null;
let realtimeMicrophoneStream = null;
let realtimeRemoteAudio = null;
const completedRealtimeToolCalls = new Set();

function sendRealtimeEvent(event) {
  if (!realtimeDataChannel || realtimeDataChannel.readyState !== "open") return false;
  realtimeDataChannel.send(JSON.stringify(event));
  return true;
}

function stopAquaRealtime() {
  realtimeDataChannel?.close();
  realtimePeerConnection?.close();
  realtimeMicrophoneStream?.getTracks().forEach((track) => track.stop());
  if (realtimeRemoteAudio) {
    realtimeRemoteAudio.pause();
    realtimeRemoteAudio.srcObject = null;
  }
  realtimeDataChannel = null;
  realtimePeerConnection = null;
  realtimeMicrophoneStream = null;
  realtimeRemoteAudio = null;
  document.documentElement.style.setProperty("--voice-level", "0.08");
}

function realtimeDestination(destination) {
  const labels = {
    home: "Home",
    neural: "Neural Link",
    command: "Command Center",
    files: "File Cabinet",
    settings: "Settings",
    data: "Ecosystem Connections",
    messages: "Conversation Receipts",
    diagnostics: "Diagnostics",
  };
  if (!labels[destination]) return null;
  return { panel: destination, label: labels[destination], refresh: destination === "diagnostics" };
}

function sendRealtimeToolOutput(callId, output) {
  sendRealtimeEvent({
    type: "conversation.item.create",
    item: {
      type: "function_call_output",
      call_id: callId,
      output: JSON.stringify(output),
    },
  });
  sendRealtimeEvent({ type: "response.create" });
}

function completeRealtimeToolCall(item) {
  const callId = String(item?.call_id || "");
  if (!callId || completedRealtimeToolCalls.has(callId)) return;
  completedRealtimeToolCalls.add(callId);
  let args = {};
  try {
    args = JSON.parse(item.arguments || "{}");
  } catch {
    sendRealtimeToolOutput(callId, { status: "failed", error: "Invalid tool arguments" });
    return;
  }

  if (item.name === "navigate_sentinel") {
    const destination = realtimeDestination(String(args.destination || ""));
    if (!destination) {
      sendRealtimeToolOutput(callId, { status: "failed", error: "Unknown Sentinel destination" });
      return;
    }
    if (destination.refresh) window.refreshDeviceDiagnostics?.();
    if (destination.panel === "home") closeOverlays();
    else if (destination.panel === "neural") {
      returnNeuralToRest();
      openPanel("neural");
    } else openPanel(destination.panel);
    sendRealtimeToolOutput(callId, { status: "confirmed", destination: destination.label });
    return;
  }

  if (item.name === "open_aqua_app") {
    const requested = String(args.app || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const index = apps.findIndex((app) => {
      const name = app.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      return name === requested || name.includes(requested) || requested.includes(name);
    });
    if (index < 0) {
      sendRealtimeToolOutput(callId, { status: "failed", error: "That app is not registered in Sentinel" });
      return;
    }
    centerApp(index, true);
    sendRealtimeToolOutput(callId, { status: "confirmed", app: apps[index].name });
    return;
  }

  if (item.name === "ask_aqua_brain") {
    const text = String(args.text || "").trim();
    const selected = apps[active];
    if (!text || !window.AquaBridge?.askAquaRealtime) {
      sendRealtimeToolOutput(callId, { status: "failed", error: "Aqua Brain is unavailable" });
      return;
    }
    const context = {
      surface: systemPanel.hidden ? "Home" : systemPanel.dataset.panel || "Home",
      selectedApp: selected.name,
      connected: selected.connected,
    };
    window.AquaBridge.askAquaRealtime(
      callId,
      text,
      selected.name,
      JSON.stringify(context),
    );
    return;
  }

  sendRealtimeToolOutput(callId, { status: "failed", error: "Unsupported Aqua tool" });
}

function handleAquaRealtimeEvent(event) {
  if (event.type === "input_audio_buffer.speech_started") {
    setAquaState("listening");
    return;
  }
  if (event.type === "input_audio_buffer.speech_stopped") {
    setAquaState("thinking");
    return;
  }
  if (event.type === "conversation.item.input_audio_transcription.delta" && event.delta) {
    window.receiveAquaPartial(event.delta);
    return;
  }
  if (event.type === "conversation.item.input_audio_transcription.completed" && event.transcript) {
    neuralThought = String(event.transcript);
    neuralThoughtDetail = "Aqua heard this. Consequential details will be confirmed before action.";
    layoutNeuralStage();
    return;
  }
  if (event.type === "response.output_audio_transcript.delta") {
    setAquaState("speaking");
    return;
  }
  if (event.type === "response.output_audio.done") {
    setAquaState("listening");
    return;
  }
  if (event.type === "response.output_item.done" && event.item?.type === "function_call") {
    completeRealtimeToolCall(event.item);
    return;
  }
  if (event.type === "response.done") {
    (event.response?.output || [])
      .filter((item) => item.type === "function_call")
      .forEach(completeRealtimeToolCall);
    return;
  }
  if (event.type === "error") {
    window.receiveAquaError(event.error?.message || "Aqua live voice encountered an error.");
  }
}

window.startAquaRealtime = async () => {
  if (realtimePeerConnection) {
    stopAquaRealtime();
    setAquaState("idle");
    return;
  }
  setAquaState("thinking");
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("This Android voice surface does not support secure live audio.");
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    const connection = new RTCPeerConnection();
    const audio = new Audio();
    audio.autoplay = true;
    audio.onplay = () => setAquaState("speaking");
    connection.ontrack = (event) => {
      audio.srcObject = event.streams[0];
    };
    connection.onconnectionstatechange = () => {
      if (["failed", "closed"].includes(connection.connectionState)) {
        stopAquaRealtime();
        setAquaState(connection.connectionState === "failed" ? "error" : "idle");
      }
    };
    connection.addTrack(stream.getAudioTracks()[0], stream);
    const channel = connection.createDataChannel("oai-events");
    channel.addEventListener("message", (message) => {
      try {
        handleAquaRealtimeEvent(JSON.parse(message.data));
      } catch {
        window.receiveAquaError("Aqua received an unreadable live voice event.");
      }
    });
    realtimePeerConnection = connection;
    realtimeDataChannel = channel;
    realtimeMicrophoneStream = stream;
    realtimeRemoteAudio = audio;
    completedRealtimeToolCalls.clear();
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    window.AquaBridge.connectRealtime(offer.sdp || "");
  } catch (error) {
    stopAquaRealtime();
    window.receiveAquaError(error?.message || "Aqua could not start live voice.");
    window.AquaBridge?.startLegacyListening?.();
  }
};

window.receiveRealtimeAnswer = async (raw) => {
  let answer;
  try {
    answer = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!answer?.success || !answer.sdp || !realtimePeerConnection) {
      throw new Error(answer?.error || "Aqua live voice could not connect.");
    }
    await realtimePeerConnection.setRemoteDescription({ type: "answer", sdp: answer.sdp });
    setAquaState("listening");
  } catch (error) {
    stopAquaRealtime();
    window.receiveAquaError(error?.message || "Aqua live voice could not connect.");
    window.AquaBridge?.startLegacyListening?.();
  }
};

window.receiveRealtimeToolResult = (raw) => {
  let payload;
  try {
    payload = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return;
  }
  if (!payload?.callId) return;
  if (payload.result) {
    applyAquaAction(payload.result.action);
    if (payload.result.materialization?.present) showMaterialization(payload.result.materialization, true);
  }
  sendRealtimeToolOutput(
    payload.callId,
    payload.error
      ? { status: "failed", error: payload.error }
      : { status: "confirmed", result: payload.result },
  );
};

function startVoice() {
  if (systemPanel.hidden || systemPanel.dataset.panel !== "neural") {
    returnNeuralToRest();
    openPanel("neural");
  } else if (neuralPhase !== "rest") {
    returnNeuralToRest();
  }
  neuralThought = "Aqua is listening.";
  neuralThoughtDetail = "Tell her what to find, show, search, or open.";
  layoutNeuralStage();
  if (!window.AquaBridge?.startListening) {
    notify("Native voice is available in the installed Android APK.");
    return;
  }
  setAquaState("listening");
  if (!authenticated) {
    notify("Aqua is listening in Standalone mode. Live company answers require a connected Aqua Brain.");
  }
  window.AquaBridge.startListening();
}

window.receiveAquaPartial = (text) => {
  if (text) {
    aquaStateLabel.textContent = "AQUA IS LISTENING";
    neuralThought = String(text);
    neuralThoughtDetail = "Aqua is identifying the correct source before she fires.";
    layoutNeuralStage();
  }
};

window.receiveAquaText = (text) => {
  const command = String(text || "").trim();
  if (!command) {
    setAquaState("idle");
    return;
  }
  setAquaState("thinking");
  if (systemPanel.hidden || systemPanel.dataset.panel !== "neural") openPanel("neural");
  const sentinelDestination = identifySentinelNavigation(command);
  if (sentinelDestination && navigateSentinelByVoice(sentinelDestination)) return;
  const directIntent = identifyNeuralIntent(command) || (
    isExplicitDeepOpen(command) && neuralFocusIndex >= 0
      ? { primary: neuralFocusIndex }
      : null
  );
  if (directIntent && isExplicitDeepOpen(command)) {
    const intent = beginNeuralRequest(command) || { ...directIntent, supporting: [], command };
    scheduleNeuralDestination(intent);
    return;
  }
  const neuralIntent = identifyNeuralIntent(command);
  if (!authenticated) {
    if (neuralIntent) {
      beginNeuralRequest(command);
      completeStandaloneNeuralRequest(neuralIntent);
    } else {
      notify("Aqua heard you. Connect Aqua Brain for general answers; local app navigation remains available.");
      setAquaState("idle");
    }
    return;
  }
  beginLiveAquaRequest(command, neuralIntent);
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
  if (window.AquaBridge?.askAqua) {
    window.AquaBridge.askAqua(command, selected.name, JSON.stringify(context));
  } else {
    window.receiveAquaError("Aqua Brain is not available in this preview.");
  }
};

window.receiveWidgetCommand = (text) => {
  const command = String(text || "").trim();
  if (!command) return;
  recordWidgetMessage("You", command, "Saved locally · awaiting Aqua");
  openPanel("neural");
  notify(authenticated ? "Aqua received the widget command." : "Aqua received the local widget command.");
  if (identifyNeuralIntent(command) || authenticated) {
    const pending = widgetMessages.find((message) => message.role === "You" && message.text === command);
    if (pending && authenticated) {
      pending.state = "Sending to Aqua";
      widgetCommandInFlight = pending.id;
      saveWidgetMessages();
    }
    window.receiveAquaText(command);
  } else {
    authMessage.textContent = "Your widget message is saved locally. Sign in to send it through Aqua Brain.";
  }
};

window.receiveAquaResponse = (raw) => {
  try {
    const response = typeof raw === "string" ? JSON.parse(raw) : raw;
    const confirmedIntent = activateConfirmedNeuralRoute(response);
    applyAquaAction(response.action);
    if (response.materialization?.present) {
      const sourceIndex = apps.findIndex((app) => app.name === response.materialization.sourceApp);
      if (sourceIndex >= 0 && (systemPanel.hidden || systemPanel.dataset.panel !== "neural")) {
        neuralFocusIndex = sourceIndex;
        neuralSupportIndexes = pendingNeuralIntent?.supporting || [];
        neuralPhase = "working";
        openPanel("neural");
      }
      neuralThought = `${response.materialization.sourceApp || "Aqua"} returned the requested information.`;
      neuralThoughtDetail = "Aqua remains visible and ready while the evidence is held in front.";
    }
    if (!confirmedIntent && !response.materialization?.present) {
      neuralFocusIndex = -1;
      neuralSupportIndexes = [];
      neuralPhase = "working";
      neuralThought = "Aqua answered from outside the app network.";
      neuralThoughtDetail = "No application tether fired because the secure gateway did not route this answer to an Aqua app.";
      layoutNeuralStage();
    }
    showMaterialization(response.materialization, true);
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
    pendingNeuralIntent = null;
    flushNextWidgetCommand();
  } catch {
    pendingNeuralIntent = null;
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
  if (!systemPanel.hidden && systemPanel.dataset.panel === "neural") {
    setNeuralPhase(
      "attention",
      "Aqua reached a connection boundary.",
      String(message || "The requested source did not return a confirmed result."),
    );
  }
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
  deviceDiagnostics.authenticated = authenticated;
  authPanel.hidden = true;
  updateOwnerAccessControl();
  if (authenticated) {
    authMessage.textContent = "";
    authPassword.value = "";
    setAquaState("idle");
    window.refreshFilingInbox();
    flushNextWidgetCommand();
  }
};

window.receiveCommandWidgetStatus = (raw) => {
  let state = raw;
  try {
    if (typeof raw === "string") state = JSON.parse(raw);
  } catch {
    state = null;
  }
  if (!state || typeof state !== "object") return;
  commandWidgetState = {
    supported: Boolean(state.supported),
    installedCount: Math.max(0, Number(state.installedCount) || 0),
    state: String(state.state || "Ready"),
  };
  deviceDiagnostics.widgetInstalledCount = commandWidgetState.installedCount;
  if (!systemPanel.hidden && systemPanel.dataset.panel === "command") {
    openPanel("command");
  }
};

window.receiveDeviceDiagnostics = (raw) => {
  let state = raw;
  try {
    if (typeof raw === "string") state = JSON.parse(raw);
  } catch {
    state = null;
  }
  if (!state || typeof state !== "object") return;
  deviceDiagnostics = {
    ...deviceDiagnostics,
    ...state,
    apps: Array.isArray(state.apps) ? state.apps : deviceDiagnostics.apps,
  };
  if (
    !systemPanel.hidden
      && ["command", "settings", "diagnostics", "data", "about"].includes(systemPanel.dataset.panel)
  ) {
    openPanel(systemPanel.dataset.panel);
  }
};

window.refreshDeviceDiagnostics = () => {
  try {
    if (window.AquaBridge?.getDeviceDiagnostics) {
      window.receiveDeviceDiagnostics(window.AquaBridge.getDeviceDiagnostics());
      return;
    }
    if (window.AquaBridge?.refreshDeviceDiagnostics) {
      window.AquaBridge.refreshDeviceDiagnostics();
      return;
    }
  } catch (_) {}
  notify("Live device checks run inside the installed Android APK.");
};

window.receiveDiagnosticCopy = () => {
  notify("Diagnostic repair receipt copied.", true);
};

window.receiveAuthResult = (raw) => {
  let result = raw;
  try {
    if (typeof raw === "string") result = JSON.parse(raw);
  } catch {
    result = { success: false, error: "Aqua sign-in returned an unreadable result." };
  }
  authSubmit.disabled = false;
  authSubmit.disabled = !gatewayConfigured;
  authSubmit.textContent = gatewayConfigured
    ? "Connect Aqua Brain"
    : "Gateway Not Configured";
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
  if (authenticated && notifications && sound && pending > 0 && !filingBriefAnnounced) {
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
  if (!gatewayConfigured) {
    openOwnerAccess();
    return;
  }
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

authContinueStandalone.addEventListener("click", () => {
  authPanel.hidden = true;
  authPassword.value = "";
  notify("Sentinel is open in Standalone mode. Aqua Brain is not connected.");
});

document.getElementById("aquaButton").addEventListener("click", startVoice);
document.getElementById("aquaPresenceButton").addEventListener("click", startVoice);
document.getElementById("previousApp").addEventListener("click", () => rotate(-1));
document.getElementById("nextApp").addEventListener("click", () => rotate(1));
document
  .getElementById("primaryDashboard")
  .addEventListener("click", () => openDetail("primary"));
document
  .getElementById("secondaryDashboard")
  .addEventListener("click", () => openDetail("secondary"));

document.querySelectorAll(".bottom-rail button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.appName) {
      const index = apps.findIndex((app) => app.name === button.dataset.appName);
      if (index >= 0) launchAppByIndex(index);
      return;
    }
    openPanel(button.dataset.panel);
  });
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
  let velocity = Math.max(-2.2, Math.min(2.2, initialVelocity));
  let position = 0;
  let lastTime = performance.now();
  const startedAt = lastTime;
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
    if (Math.abs(velocity) > 0.02 && now - startedAt < 720) {
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
try {
  gatewayConfigured = Boolean(window.AquaBridge?.isGatewayConfigured?.());
} catch (_) {
  gatewayConfigured = false;
}
try {
  if (window.AquaBridge?.getCommandWidgetStatus) {
    window.receiveCommandWidgetStatus(window.AquaBridge.getCommandWidgetStatus());
  }
} catch (_) {}
try {
  if (window.AquaBridge?.getDeviceDiagnostics) {
    window.receiveDeviceDiagnostics(window.AquaBridge.getDeviceDiagnostics());
  }
} catch (_) {}
updateOwnerAccessControl();
const deterministicPreviewActive = activateDeterministicPreviewRoute();
function preloadNeuralSubstrate() {
  if (neuralSubstratePreload) return;
  neuralSubstratePreload = new Image();
  neuralSubstratePreload.decoding = "async";
  neuralSubstratePreload.src = "./assets/neural-link-live-substrate-v080.png";
  neuralSubstratePreload.decode?.().catch(() => {});
}
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(preloadNeuralSubstrate, { timeout: 700 });
} else {
  setTimeout(preloadNeuralSubstrate, 0);
}
if (!deterministicPreviewActive) {
  render();
  requestAnimationFrame(revealSelectedAppLabel);
  requestSnapshot(apps[active]);
}
setInterval(() => {
  if (document.visibilityState === "visible") requestSnapshot(apps[active]);
}, 60_000);
document.addEventListener("visibilitychange", () => {
  const visible = document.visibilityState === "visible";
  document.documentElement.classList.toggle("runtime-paused", !visible);
  if (visible) requestSnapshot(apps[active]);
});
let neuralResizeFrame = null;
window.addEventListener("resize", () => {
  if (neuralResizeFrame !== null) cancelAnimationFrame(neuralResizeFrame);
  neuralResizeFrame = requestAnimationFrame(() => {
    neuralResizeFrame = null;
    const stage = systemPanel.querySelector(".neural-stage");
    if (!stage || stage.dataset.motion) return;
    layoutNeuralStage();
  });
}, { passive: true });

if (deterministicPreviewActive) {
  // CI-only visual proof route. Normal Android and browser startup remain unchanged.
} else if (window.AquaBridge?.bootstrap) {
  window.AquaBridge.bootstrap();
} else {
  authenticated = true;
  authPanel.hidden = true;
}
window.refreshFilingInbox();
