const apps = [
  {
    name: "Aqua Homes OS",
    short: "MAIN BRAIN",
    icon: "A",
    color: "#14dfff",
    status: "Ecosystem ready",
    primaryTitle: "Ecosystem Health",
    primaryValue: "7 registered",
    primaryDetail: "Specialist manifests available in this build",
    secondaryTitle: "Priority Command",
    secondaryValue: "4 actions",
    secondaryDetail: "Two owner approvals represented",
    activity: [
      "Aqua Cam field summary received",
      "Knowledge Vault index represented",
      "Timesheet review ready",
    ],
    widgets: ["Registry 7", "Aqua Brain live", "Owner secured"],
    connected: true,
    art: "card-financial-command-front-v11.png",
  },
  {
    name: "Aqua Cam",
    short: "FIELD VISION",
    icon: "◉",
    color: "#5fd9ff",
    status: "Field workspace ready",
    primaryTitle: "Site Intelligence",
    primaryValue: "14 zones",
    primaryDetail: "92% sample verification · 2 review",
    secondaryTitle: "Latest Capture",
    secondaryValue: "8 min ago",
    secondaryDetail: "Sample: Tower A · Level 34",
    activity: [
      "Walkthrough queued",
      "Two zones need review",
      "Photo comparison prepared",
    ],
    widgets: ["14 zones", "2 flags", "92% sample"],
    connected: false,
    art: "card-operations-front-v11.png",
  },
  {
    name: "Knowledge Vault",
    short: "CODE INTELLIGENCE",
    icon: "⌘",
    color: "#a88cff",
    status: "Vault workspace ready",
    primaryTitle: "Knowledge Status",
    primaryValue: "3 states",
    primaryDetail: "MA · NH · ME represented",
    secondaryTitle: "Code Checks",
    secondaryValue: "6 ready",
    secondaryDetail: "Sample evidence and citations",
    activity: [
      "NH stair query prepared",
      "MA framing source indexed",
      "ME lookup awaiting gateway",
    ],
    widgets: ["3 states", "6 checks", "Evidence mode"],
    connected: false,
    art: "card-risk-monitor-front-v11.png",
  },
  {
    name: "Aqua Draw",
    short: "CLIENT PORTAL",
    icon: "◇",
    color: "#ffb52e",
    status: "Draw workspace ready",
    primaryTitle: "Available Draws",
    primaryValue: "$184K",
    primaryDetail: "Sample across 6 active projects",
    secondaryTitle: "Client Attention",
    secondaryValue: "3 replies",
    secondaryDetail: "One sample approval due today",
    activity: [
      "Draw 4 ready for review",
      "Three client replies represented",
      "Photo proof organized",
    ],
    widgets: ["6 projects", "3 replies", "1 approval"],
    connected: true,
    art: "card-operations-front-v11.png",
  },
  {
    name: "Aqua Timesheet",
    short: "WORKFORCE",
    icon: "◷",
    color: "#41e39a",
    status: "Timesheet workspace ready",
    primaryTitle: "Today’s Labor",
    primaryValue: "47 on site",
    primaryDetail: "96% sample time capture",
    secondaryTitle: "Payroll Review",
    secondaryValue: "2 exceptions",
    secondaryDetail: "Sample owner review required",
    activity: [
      "Crew clock-in represented",
      "Two exceptions flagged",
      "Payroll summary prepared",
    ],
    widgets: ["47 crew", "96% capture", "2 exceptions"],
    connected: false,
    art: "card-risk-monitor-front-v11.png",
  },
  {
    name: "Aqua Estimate",
    short: "PROJECT COST",
    icon: "$",
    color: "#ffca54",
    status: "Estimate workspace ready",
    primaryTitle: "Open Estimates",
    primaryValue: "$2.4M",
    primaryDetail: "Sample: 8 estimates in progress",
    secondaryTitle: "Margin Watch",
    secondaryValue: "24.8%",
    secondaryDetail: "Sample within target range",
    activity: [
      "Estimate revision represented",
      "Vendor cost change flagged",
      "Margin check prepared",
    ],
    widgets: ["8 open", "24.8% margin", "1 cost flag"],
    connected: false,
    art: "card-overview-front-v11.png",
  },
  {
    name: "Aqua Schedule",
    short: "OPERATIONS",
    icon: "▦",
    color: "#32c7ff",
    status: "Schedule workspace ready",
    primaryTitle: "Today’s Execution",
    primaryValue: "18 tasks",
    primaryDetail: "Sample: 15 on track · 3 attention",
    secondaryTitle: "Critical Path",
    secondaryValue: "1 risk",
    secondaryDetail: "Sample delivery · 10:15 AM",
    activity: [
      "Concrete delivery represented",
      "Three tasks need attention",
      "Crew handoff prepared",
    ],
    widgets: ["18 tasks", "15 on track", "1 risk"],
    connected: false,
    art: "card-site-intelligence-front-v11.png",
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
let authenticated = false;
let authenticatedEmail = "";
let sound = true;
let notifications = true;

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

function relative(index) {
  let value = (index - active + apps.length) % apps.length;
  if (value > apps.length / 2) value -= apps.length;
  return value;
}

function setAquaState(state) {
  sentinel.className = `sentinel state-${state}`;
  aquaStateLabel.textContent = stateLabels[state] || stateLabels.idle;
}

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

function renderCards() {
  cardsTrack.innerHTML = "";
  deckDots.innerHTML = "";

  apps.forEach((app, index) => {
    const position = relative(index);
    if (Math.abs(position) > 2) return;

    const card = document.createElement("button");
    card.type = "button";
    card.className = `app-card pos-${position}${position === 0 ? " active" : ""}`;
    card.style.setProperty("--app-color", app.color);
    card.setAttribute(
      "aria-label",
      position === 0 ? `Open ${app.name}` : `Move ${app.name} to center`,
    );
    card.innerHTML = `
      <div class="card-placeholder" aria-hidden="true">
        <span class="card-placeholder-orbit"></span>
        <strong>${escapeHtml(app.icon)}</strong>
        <small>${escapeHtml(app.name)}</small>
        <em>APP INTERFACE RESERVED</em>
      </div>
    `;
    card.addEventListener("click", () => {
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
  const selected = apps[active];
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
  rotationTimer = setTimeout(() => finishRotation(openAfter), 520);
}

function rotate(direction) {
  centerApp(active + direction, false);
}

function openWorkspace() {
  if (rotating) return;
  const selected = apps[active];
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

appDeck.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    startedAt: performance.now(),
    horizontal: false,
  };
  appDeck.setPointerCapture?.(event.pointerId);
});

appDeck.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const deltaX = event.clientX - drag.startX;
  const deltaY = event.clientY - drag.startY;
  if (!drag.horizontal && Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
    drag.horizontal = true;
  }
  if (drag.horizontal) {
    event.preventDefault();
    drag.lastX = event.clientX;
    cardsTrack.style.transform = `translateX(${Math.max(-42, Math.min(42, deltaX * 0.22))}px)`;
  }
});

function finishDeckDrag(event, cancelled = false) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const deltaX = event.clientX - drag.startX;
  const elapsed = Math.max(1, performance.now() - drag.startedAt);
  const velocity = Math.abs(deltaX) / elapsed;
  const shouldRotate = !cancelled && drag.horizontal && (Math.abs(deltaX) >= 34 || velocity >= 0.32);
  cardsTrack.style.transform = "";
  try { appDeck.releasePointerCapture?.(event.pointerId); } catch {}
  drag = null;
  if (shouldRotate) rotate(deltaX < 0 ? 1 : -1);
}

appDeck.addEventListener("pointerup", (event) => finishDeckDrag(event));
appDeck.addEventListener("pointercancel", (event) => finishDeckDrag(event, true));
appDeck.addEventListener("lostpointercapture", () => {
  cardsTrack.style.transform = "";
  drag = null;
});

render();

if (window.AquaBridge?.bootstrap) {
  window.AquaBridge.bootstrap();
} else {
  authenticated = true;
  authPanel.hidden = true;
}
