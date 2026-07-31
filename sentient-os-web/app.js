const apps = [
  {
    name: "Aqua CRM",
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
  idle: "TAP THE A TO SPEAK",
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
const CARD_STEP_PX = 72;
let authenticated = false;
let authenticatedEmail = "";
let sound = true;
let notifications = true;
const liveSnapshots = new Map();
const snapshotStates = new Map();

const sentinel = document.getElementById("sentinel");
const appDeck = document.getElementById("appDeck");
const cardsTrack = document.getElementById("cardsTrack");
const deckDots = document.getElementById("deckDots");
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
  const snapshot = liveSnapshots.get(app.name);
  if (!snapshot) return app;
  return {
    ...app,
    preview: { ...app.preview, ...(snapshot.preview || {}) },
    previewImage: snapshot.previewImage || null,
    primaryTitle: snapshot.primary?.title || app.primaryTitle,
    primaryValue: snapshot.primary?.value || app.primaryValue,
    primaryDetail: snapshot.primary?.detail || app.primaryDetail,
    secondaryTitle: snapshot.secondary?.title || app.secondaryTitle,
    secondaryValue: snapshot.secondary?.value || app.secondaryValue,
    secondaryDetail: snapshot.secondary?.detail || app.secondaryDetail,
  };
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
    const position = relative(index);
    if (Math.abs(position) > 2) return;

    const view = selectedView(app);
    const previewImageUrl = safePreviewImage(view.previewImage);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `app-card pos-${position}${position === 0 ? " active" : ""}`;
    card.style.setProperty("--app-color", app.color);
    card.setAttribute(
      "aria-label",
      position === 0 ? `Open ${app.name}` : `Move ${app.name} to center`,
    );
    card.innerHTML = `
      <div class="app-landing-preview${previewImageUrl ? " has-image" : ""}" aria-hidden="true">
        ${previewImageUrl ? `<img src="${previewImageUrl}" alt="">` : `
          <header><b>${escapeHtml(app.icon)}</b><span>${escapeHtml(view.preview.eyebrow)}</span></header>
          <h3>${escapeHtml(view.preview.title)}</h3>
          <section><small>${escapeHtml(view.preview.metric)}</small><strong>${escapeHtml(view.preview.value)}</strong></section>
          <div>${view.preview.tiles.map((tile) => `<i>${escapeHtml(tile)}</i>`).join("")}</div>`}
        <footer>${escapeHtml(app.name)} · ${escapeHtml(snapshotStates.get(app.name) || "awaiting live connection")}</footer>
      </div>`;
    card.addEventListener("click", () => {
      if (performance.now() < suppressCardClickUntil) return;
      if (position !== 0) {
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
}

function renderDashboard() {
  const selected = selectedView(apps[active]);
  appDashboard.style.setProperty("--app-color", selected.color);
  document.getElementById("primaryTitle").textContent = selected.primaryTitle;
  document.getElementById("primaryDetail").textContent = selected.primaryDetail;
  document.getElementById("primaryValue").textContent = selected.primaryValue;
  document.getElementById("primarySource").textContent = selected.name;
  document.getElementById("secondaryTitle").textContent =
    selected.secondaryTitle;
  document.getElementById("secondaryDetail").textContent =
    selected.secondaryDetail;
  document.getElementById("secondaryValue").textContent =
    selected.secondaryValue;
  document.getElementById("secondarySource").textContent = selected.name;
}

function render() {
  renderCards();
  renderDashboard();
}

function finishRotation(openAfter) {
  rotating = false;
  appDeck.classList.remove("is-rotating");
  appDeck.classList.add("is-settled");
  requestSnapshot(apps[active]);
  if (openAfter) openWorkspace();
}

function centerApp(index, openAfter) {
  clearTimeout(rotationTimer);
  rotating = true;
  appDeck.classList.remove("is-settled");
  appDeck.classList.add("is-rotating");
  active = (index + apps.length) % apps.length;
  closeOverlays();
  render();
  requestSnapshot(apps[active]);
  rotationTimer = setTimeout(() => finishRotation(openAfter), 520);
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
  const selected = apps[active];
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

function closeOverlays() {
  workspace.hidden = true;
  detailSheet.hidden = true;
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

function openPanel(kind) {
  document.querySelectorAll(".bottom-rail button").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === kind);
  });
  if (kind === "home") {
    closeOverlays();
    return;
  }

  if (kind === "messages") {
    systemPanel.innerHTML =
      systemHeader("Messages") +
      `<div class="panel-list">${apps
        .slice(1, 5)
        .map(
          (app, index) => `
            <button type="button" data-app="${index + 1}">
              <i style="color:${app.color}">${escapeHtml(app.icon)}</i>
              <span><strong>${escapeHtml(app.name)}</strong><small>${escapeHtml(app.activity[0])}</small></span>
              <b>${index + 1}</b>
            </button>`,
        )
        .join("")}</div>`;
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
    systemPanel.innerHTML =
      systemHeader("Settings") +
      `<div class="settings-list">
        <button type="button" data-setting="sound"><span><strong>Aqua voice feedback</strong><small>Speaking center animation and sound</small></span><b>${sound ? "ON" : "OFF"}</b></button>
        <button type="button" data-setting="notifications"><span><strong>Sentinel notifications</strong><small>Owner approvals and app attention</small></span><b>${notifications ? "ON" : "OFF"}</b></button>
        <button type="button" data-setting="voice-test"><span><strong>Test Aqua speaking state</strong><small>Center voiceprint only</small></span><b>TEST</b></button>
        <button type="button" data-setting="diagnostics"><span><strong>Connection diagnostics</strong><small>Owner auth, Aqua Brain, audio, and registry</small></span><b>CHECK</b></button>
      </div>`;
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
  systemPanel.querySelectorAll(".panel-close").forEach((button) => {
    button.addEventListener("click", () => openPanel("home"));
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
      } else {
        notify(
          authenticated
            ? `Aqua Brain authenticated · ${apps.length} apps registered · voice bridge ready`
            : "Aqua Brain is not authenticated",
        );
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

window.receiveAquaResponse = (raw) => {
  try {
    const response = typeof raw === "string" ? JSON.parse(raw) : raw;
    applyAquaAction(response.action);
    const reply = String(response.reply || "I completed the request.");
    notify(reply);
    if (sound && window.AquaBridge?.speak) {
      window.AquaBridge.speak(reply);
    } else {
      setAquaState("idle");
    }
  } catch {
    window.receiveAquaError("Aqua received an unreadable secure response.");
  }
};

window.receiveAquaError = (message) => {
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
  render();
}

function coastDeck(initialVelocity) {
  stopDeckInertia();
  rotating = true;
  appDeck.classList.remove("is-settled");
  appDeck.classList.add("is-rotating");
  let velocity = Math.max(-2.4, Math.min(2.4, initialVelocity));
  let position = 0;
  let lastTime = performance.now();
  const coast = (now) => {
    const elapsed = Math.min(34, now - lastTime);
    lastTime = now;
    position += velocity * elapsed;
    while (Math.abs(position) >= CARD_STEP_PX) {
      const direction = position < 0 ? 1 : -1;
      stepDeck(direction);
      position += direction * CARD_STEP_PX;
    }
    cardsTrack.style.transform = `translateX(${position}px)`;
    velocity *= Math.pow(0.92, elapsed / 16.67);
    if (Math.abs(velocity) > 0.035) {
      inertiaFrame = requestAnimationFrame(coast);
      return;
    }
    cardsTrack.style.transform = "";
    inertiaFrame = null;
    finishRotation(false);
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
  if (!drag.horizontal && Math.abs(totalX) > 8 && Math.abs(totalX) > Math.abs(totalY) * 1.08) {
    drag.horizontal = true;
    rotating = true;
    appDeck.classList.remove("is-settled");
    appDeck.classList.add("is-rotating");
  }
  if (!drag.horizontal) return;
  event.preventDefault();
  const frameX = event.clientX - drag.lastX;
  const frameTime = Math.max(1, now - drag.lastTime);
  drag.velocityX = drag.velocityX * 0.65 + (frameX / frameTime) * 0.35;
  drag.residualX += frameX;
  while (Math.abs(drag.residualX) >= CARD_STEP_PX) {
    const direction = drag.residualX < 0 ? 1 : -1;
    stepDeck(direction);
    drag.residualX += direction * CARD_STEP_PX;
  }
  cardsTrack.style.transform = `translateX(${drag.residualX}px)`;
  drag.lastX = event.clientX;
  drag.lastTime = now;
});

function finishDeckDrag(event, cancelled = false) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const wasHorizontal = drag.horizontal;
  const velocityX = cancelled ? 0 : drag.velocityX;
  const residualX = drag.residualX;
  try { appDeck.releasePointerCapture?.(event.pointerId); } catch {}
  drag = null;
  if (!wasHorizontal) {
    cardsTrack.style.transform = "";
    return;
  }
  suppressCardClickUntil = performance.now() + 450;
  if (Math.abs(velocityX) >= 0.16) {
    coastDeck(velocityX);
    return;
  }
  if (Math.abs(residualX) >= CARD_STEP_PX * 0.42) {
    stepDeck(residualX < 0 ? 1 : -1);
  }
  cardsTrack.style.transform = "";
  finishRotation(false);
}

appDeck.addEventListener("pointerup", (event) => finishDeckDrag(event));
appDeck.addEventListener("pointercancel", (event) => finishDeckDrag(event, true));
appDeck.addEventListener("lostpointercapture", (event) => {
  if (drag && event.pointerId === drag.pointerId) finishDeckDrag(event, true);
});

render();
requestSnapshot(apps[active]);
setInterval(() => {
  if (document.visibilityState === "visible") requestSnapshot(apps[active]);
}, 60_000);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") requestSnapshot(apps[active]);
});

if (window.AquaBridge?.bootstrap) {
  window.AquaBridge.bootstrap();
} else {
  authenticated = true;
  authPanel.hidden = true;
}
