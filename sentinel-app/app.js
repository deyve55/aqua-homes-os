const shell = document.querySelector(".sentinel-shell");
const stateLabel = document.querySelector("[data-state-label]");
const sessionHelp = document.querySelector("[data-session-help]");
const sessionChip = document.querySelector("[data-session-chip]");
const conversationSpeaker = document.querySelector("[data-conversation-speaker]");
const transcript = document.querySelector("[data-transcript]");
const aquaTrigger = document.querySelector("[data-aqua-trigger]");
const sessionStart = document.querySelector("[data-session-start]");
const sessionStop = document.querySelector("[data-session-stop]");
const deckTrack = document.querySelector("[data-deck-track]");
const deckTitle = document.querySelector("[data-deck-title]");
const deckDots = document.querySelector("[data-deck-dots]");
const deckViewport = document.querySelector("[data-deck-viewport]");
const spectrumBars = [...document.querySelectorAll(".voice-spectrum i")];
const toast = document.querySelector("[data-toast]");
const demoSheet = document.querySelector("[data-demo-sheet]");
const sheetKicker = document.querySelector("[data-sheet-kicker]");
const sheetTitle = document.querySelector("[data-sheet-title]");
const sheetBody = document.querySelector("[data-sheet-body]");

const businessBriefs = [
  {
    app: "Overview",
    alias: "Jobs",
    icon: "▦",
    visual: "overview",
    title: "Portfolio Overview",
    subtitle: "Demo company snapshot",
    voiceTerms: ["overview", "job", "jobs", "portfolio", "company"],
    primary: {
      label: "DEMO PORTFOLIO CHECK",
      title: "Sample project group is tracking normally",
      metaLabel: "Demo health",
      meta: "Stable",
      status: "Demo confirmed",
    },
    secondary: {
      label: "DEMO OWNER DECISION",
      title: "One sample priority is ready for review",
      metaLabel: "Demo priority",
      meta: "Medium",
      status: "Needs attention",
    },
  },
  {
    app: "Site Intelligence",
    alias: "Field",
    icon: "◇",
    visual: "site",
    title: "Field Intelligence",
    subtitle: "Demo scan and photo proof",
    voiceTerms: ["site", "field", "scan", "camera", "photo", "walkthrough"],
    primary: {
      label: "DEMO FIELD CHECK",
      title: "Sample walkthrough is ready to review",
      metaLabel: "Demo findings",
      meta: "2 items",
      status: "Demo confirmed",
    },
    secondary: {
      label: "DEMO PHOTO PROOF",
      title: "Sample close-up image is still needed",
      metaLabel: "Demo proof",
      meta: "Pending",
      status: "Needs attention",
    },
  },
  {
    app: "Financial Command",
    alias: "Financials",
    icon: "$",
    visual: "financial",
    title: "DEMO $14.8M",
    subtitle: "Budget · 89% demonstration",
    voiceTerms: ["financial", "financials", "finance", "money", "budget", "accounting", "cash"],
    primary: {
      label: "DEMO BUDGET EXCEPTION",
      title: "Sample commitment remains within target",
      metaLabel: "Demo variance",
      meta: "+1.8%",
      status: "Demo confirmed",
    },
    secondary: {
      label: "DEMO SCHEDULE RISK",
      title: "Sample material delivery needs review",
      metaLabel: "Demo delay",
      meta: "2 days",
      status: "Needs attention",
    },
  },
  {
    app: "Operations",
    alias: "Draw",
    icon: "▤",
    visual: "operations",
    title: "Draw Operations",
    subtitle: "Demo proof and release flow",
    voiceTerms: ["operation", "operations", "draw", "sow", "scope", "release"],
    primary: {
      label: "DEMO DRAW CHECK",
      title: "Sample draw package is ready to inspect",
      metaLabel: "Demo proof",
      meta: "Complete",
      status: "Demo confirmed",
    },
    secondary: {
      label: "DEMO SCOPE REVIEW",
      title: "One sample scope line needs confirmation",
      metaLabel: "Demo items",
      meta: "1 item",
      status: "Needs attention",
    },
  },
  {
    app: "Risk Monitor",
    alias: "Vault",
    icon: "△",
    visual: "risk",
    title: "Knowledge & Risk",
    subtitle: "Demo evidence monitor",
    voiceTerms: ["risk", "vault", "knowledge", "code", "codes", "compliance", "evidence"],
    primary: {
      label: "DEMO SOURCE CHECK",
      title: "Sample evidence set is clearly labeled",
      metaLabel: "Demo confidence",
      meta: "Reviewable",
      status: "Demo confirmed",
    },
    secondary: {
      label: "DEMO SOURCE LOCK",
      title: "One licensed source remains disconnected",
      metaLabel: "Demo access",
      meta: "Locked",
      status: "Needs attention",
    },
  },
];

const responseLibrary = {
  greeting:
    "Good morning, Davy. There you are. I was beginning to think the coffee had won. I’m awake, the interface is alive, and Financial Command is centered. What are we tackling first?",
  professional:
    "Professional mode engaged, Davy. Five demo applications are rotating correctly, the architectural A is fixed, and the business backend is intentionally disconnected. Give me an app or a priority.",
  playful:
    "Oh, absolutely. Aqua with a little sparkle, coming right up. The cards spin, the lights answer my voice, and I promise not to turn the dashboard into a disco. What do you want to see?",
  identity:
    "I’m Aqua: one continuous company assistant identity designed to feel present, observant, warm, and capable. I can be witty, but when the work gets serious, I get precise. I will never pretend I’m literally conscious or that disconnected data is live.",
  capability:
    "In this proof I can hold a continuous voice session, move the app stack, explain each demo surface, switch between playful and professional tone, and keep listening after I answer. The real company records and cross-app actions come when the governed backend is connected.",
  truthful:
    "That needs connected company data, and this proof does not have it yet. I won’t invent an answer. I can still bring the matching demo surface forward and show you exactly where that information will live.",
  time: () =>
    `It is ${new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(
      new Date(),
    )}, Davy. And yes, I checked before answering. Tiny victories matter.`,
};

let activeIndex = 2;
let currentState = "idle";
let sessionActive = false;
let stopAfterReply = false;
let pointerStartX = null;
let pointerStartY = null;
let toastTimer = null;
let resumeTimer = null;
let fallbackSpeechTimer = null;
let fallbackRecognition = null;
let voiceEnergyTimer = null;
let deckTurnTimer = null;
let lastNativeEnergyAt = 0;
let ignoreNativeDoneUntil = 0;
let currentReplyText = "";
let currentReplyWords = [];
let currentReplyStarts = [];
let sessionEpoch = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function wrapIndex(index) {
  return (index + businessBriefs.length) % businessBriefs.length;
}

function relativeOffset(index) {
  let difference = index - activeIndex;
  if (difference > 2) difference -= businessBriefs.length;
  if (difference < -2) difference += businessBriefs.length;
  return difference;
}

function positionName(index) {
  const difference = relativeOffset(index);
  if (difference === -2) return "far-previous";
  if (difference === -1) return "previous";
  if (difference === 0) return "active";
  if (difference === 1) return "next";
  return "far-next";
}

function cardMarkup(brief, index) {
  return `
    <button
      class="app-card"
      type="button"
      data-brief-index="${index}"
      data-position="${positionName(index)}"
      aria-label="${brief.app}: ${brief.subtitle}"
      aria-pressed="${index === activeIndex ? "true" : "false"}"
    >
      <span class="app-card-header">
        <span class="card-icon" aria-hidden="true">${brief.icon}</span>
        <span>${brief.app}</span>
      </span>
      <span class="card-graphic" data-visual="${brief.visual}" aria-hidden="true"></span>
      <span class="card-footer">
        <strong>${brief.title}</strong>
        <small>${brief.subtitle}</small>
      </span>
    </button>`;
}

function buildDeck() {
  deckTrack.innerHTML = businessBriefs.map(cardMarkup).join("");
  deckDots.innerHTML = businessBriefs
    .map(
      (brief, index) =>
        `<button type="button" data-dot-index="${index}" aria-label="Show ${brief.app}"></button>`,
    )
    .join("");
}

function updateExceptionCard(prefix, content) {
  document.querySelector(`[data-exception-${prefix}-label]`).textContent = content.label;
  document.querySelector(`[data-exception-${prefix}-title]`).textContent = content.title;
  document.querySelector(`[data-exception-${prefix}-meta-label]`).textContent = content.metaLabel;
  document.querySelector(`[data-exception-${prefix}-meta]`).textContent = content.meta;
  document.querySelector(`[data-exception-${prefix}-status]`).textContent = content.status;
}

function updateDeck() {
  const brief = businessBriefs[activeIndex];
  deckTitle.textContent = brief.app;

  deckTrack.querySelectorAll("[data-brief-index]").forEach((card) => {
    const index = Number(card.dataset.briefIndex);
    card.dataset.position = positionName(index);
    card.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
  });

  deckDots.querySelectorAll("[data-dot-index]").forEach((dot) => {
    const selected = Number(dot.dataset.dotIndex) === activeIndex;
    dot.classList.toggle("active", selected);
    dot.setAttribute("aria-current", selected ? "true" : "false");
  });

  updateExceptionCard("primary", brief.primary);
  updateExceptionCard("secondary", brief.secondary);
}

function selectBrief(index, options = {}) {
  const nextIndex = wrapIndex(index);
  const changed = nextIndex !== activeIndex;
  activeIndex = nextIndex;

  if (changed) {
    shell.classList.remove("deck-turning");
    void shell.offsetWidth;
    shell.classList.add("deck-turning");
    clearTimeout(deckTurnTimer);
    deckTurnTimer = setTimeout(() => shell.classList.remove("deck-turning"), 720);
  }

  updateDeck();
  if (options.vibrate !== false && navigator.vibrate) navigator.vibrate(12);
  if (options.open && !changed) openAppDetail(businessBriefs[activeIndex]);
}

function openSheet(kicker, title, body) {
  sheetKicker.textContent = kicker;
  sheetTitle.textContent = title;
  sheetBody.textContent = body;
  demoSheet.hidden = false;
}

function closeSheet() {
  demoSheet.hidden = true;
}

function openAppDetail(brief) {
  openSheet(
    `${brief.alias.toUpperCase()} · DEMO SURFACE`,
    brief.app,
    `${brief.subtitle}. This control is functioning in the UI proof; live business records and actions will be connected during the backend phase.`,
  );
}

function showToast(message = "Demo surface — backend connection comes next.") {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function setState(nextState, message) {
  currentState = nextState;
  shell.dataset.aquaState = nextState;

  const labels = {
    idle: sessionActive ? "Aqua is awake" : "Tap once to speak with Aqua",
    listening: "Listening to Davy",
    thinking: "Aqua is thinking",
    speaking: "Aqua is speaking",
  };
  const chips = {
    idle: sessionActive ? "Awake" : "Ready",
    listening: "Listening",
    thinking: "Thinking",
    speaking: "Speaking",
  };

  stateLabel.textContent = labels[nextState] || labels.idle;
  sessionChip.textContent = chips[nextState] || chips.idle;
  conversationSpeaker.textContent = nextState === "listening" ? "DAVY" : "AQUA";
  if (message) transcript.textContent = message;
}

function setSessionActive(active) {
  sessionActive = active;
  shell.dataset.sessionState = active ? "on" : "off";
  sessionStop.hidden = !active;
  sessionHelp.textContent = active
    ? "Hands-free session is active. Say “stop listening” when you’re finished."
    : "Hands-free conversation continues until you end it.";
}

function clearConversationTimers() {
  clearTimeout(resumeTimer);
  clearTimeout(fallbackSpeechTimer);
  clearTimeout(voiceEnergyTimer);
}

function stopNativeListening() {
  if (window.AquaNative && typeof window.AquaNative.stopListening === "function") {
    window.AquaNative.stopListening();
  }
  if (fallbackRecognition) {
    try {
      fallbackRecognition.abort();
    } catch {
      // The local browser recognizer may already be closed.
    }
    fallbackRecognition = null;
  }
}

function stopNativeSpeaking() {
  if (window.AquaNative && typeof window.AquaNative.stopSpeaking === "function") {
    window.AquaNative.stopSpeaking();
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function stopConversation(message = "Conversation ended. Tap Aqua when you want me back.") {
  sessionEpoch += 1;
  setSessionActive(false);
  stopAfterReply = false;
  clearConversationTimers();
  stopNativeListening();
  stopNativeSpeaking();
  shell.classList.remove("voice-pulse");
  resetVoiceEnergy();
  setState("idle", message);
}

function startConversation() {
  if (sessionActive) {
    if (currentState === "speaking") {
      ignoreNativeDoneUntil = Date.now() + 1000;
      stopNativeSpeaking();
      requestListening(180, "Interrupted. I’m listening, Davy.");
    } else if (currentState !== "listening") {
      requestListening(120);
    }
    return;
  }

  sessionEpoch += 1;
  setSessionActive(true);
  requestListening(120, "I’m listening, Davy.");
}

function resetVoiceEnergy() {
  shell.style.setProperty("--voice-core-scale", "1");
  shell.style.setProperty("--voice-core-glow", "12px");
  shell.style.setProperty("--voice-core-spread", "3px");
  shell.style.setProperty("--voice-energy", "0");
  spectrumBars.forEach((bar) => bar.style.setProperty("--bar-height", "2px"));
}

function setVoiceEnergy(rawLevel, holdMilliseconds = 95, fromNativeAudio = false) {
  const level = clamp(Number(rawLevel) || 0, 0, 1);
  if (fromNativeAudio) lastNativeEnergyAt = Date.now();

  shell.style.setProperty("--voice-energy", level.toFixed(3));
  shell.style.setProperty("--voice-core-scale", (1 + level * 0.1).toFixed(3));
  shell.style.setProperty("--voice-core-glow", `${Math.round(12 + level * 10)}px`);
  shell.style.setProperty("--voice-core-spread", `${Math.round(3 + level * 3)}px`);

  spectrumBars.forEach((bar, index) => {
    const distance = Math.abs(index - (spectrumBars.length - 1) / 2);
    const centerWeight = 1 - distance / (spectrumBars.length / 2);
    const wave = 0.66 + Math.abs(Math.sin(index * 1.87 + Date.now() / 110)) * 0.34;
    const height = 2 + level * (3 + centerWeight * 11) * wave;
    bar.style.setProperty("--bar-height", `${Math.round(height)}px`);
  });

  clearTimeout(voiceEnergyTimer);
  voiceEnergyTimer = setTimeout(resetVoiceEnergy, holdMilliseconds);
}

function triggerVoicePulse(fallbackEnergy = 0.34) {
  shell.classList.remove("voice-pulse");
  void shell.offsetWidth;
  shell.classList.add("voice-pulse");
  if (Date.now() - lastNativeEnergyAt > 150) setVoiceEnergy(fallbackEnergy, 135);
}

function prepareSpokenWords(text) {
  currentReplyText = text;
  currentReplyWords = text.split(/\s+/);
  currentReplyStarts = [];
  let cursor = 0;

  currentReplyWords.forEach((word) => {
    const cleanWord = word.replace(/[’]/g, "'");
    const found = text.indexOf(cleanWord, cursor);
    const start = found >= 0 ? found : cursor;
    currentReplyStarts.push(start);
    cursor = start + cleanWord.length;
  });
}

function renderSpokenWord(activeWordIndex) {
  if (!currentReplyWords.length) return;
  const fragment = document.createDocumentFragment();

  currentReplyWords.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    if (index < activeWordIndex) span.className = "spoken";
    if (index === activeWordIndex) span.className = "current";
    fragment.append(span);
    if (index < currentReplyWords.length - 1) fragment.append(" ");
  });

  transcript.replaceChildren(fragment);
}

function wordIndexFromCharacter(characterIndex) {
  const target = Math.max(0, Number(characterIndex) || 0);
  for (let index = currentReplyStarts.length - 1; index >= 0; index -= 1) {
    if (target >= currentReplyStarts[index]) return index;
  }
  return 0;
}

function beginSpeaking() {
  setState("speaking");
  renderSpokenWord(0);
  triggerVoicePulse(0.38);
}

function finishSpeaking() {
  clearTimeout(fallbackSpeechTimer);
  clearTimeout(voiceEnergyTimer);
  shell.classList.remove("voice-pulse");
  resetVoiceEnergy();
  transcript.textContent = currentReplyText;

  if (stopAfterReply) {
    stopAfterReply = false;
    stopConversation("Aqua is quiet. Tap once when you want me back.");
    return;
  }

  if (sessionActive) {
    setState("idle", currentReplyText);
    requestListening(460);
  } else {
    setState("idle", currentReplyText);
  }
}

function speakWithBrowser() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    beginSpeaking();
    currentReplyWords.forEach((_, index) => {
      setTimeout(() => {
        renderSpokenWord(index);
        triggerVoicePulse(0.28 + (index % 4) * 0.05);
      }, 205 * index);
    });
    fallbackSpeechTimer = setTimeout(finishSpeaking, 205 * currentReplyWords.length + 480);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(currentReplyText);
  utterance.rate = 1.03;
  utterance.pitch = 0.96;
  utterance.volume = 1;
  utterance.onstart = beginSpeaking;
  utterance.onboundary = (event) => {
    if (event.name && event.name !== "word") return;
    const index = wordIndexFromCharacter(event.charIndex || 0);
    renderSpokenWord(index);
    triggerVoicePulse(0.3 + (index % 4) * 0.04);
  };
  utterance.onend = finishSpeaking;
  utterance.onerror = finishSpeaking;
  window.speechSynthesis.speak(utterance);
}

function speakReply(text) {
  prepareSpokenWords(text);
  setState("thinking", "One second, Davy.");
  const epoch = sessionEpoch;

  resumeTimer = setTimeout(() => {
    if (epoch !== sessionEpoch) return;
    if (window.AquaNative && typeof window.AquaNative.speak === "function") {
      window.AquaNative.speak(currentReplyText);
    } else {
      speakWithBrowser();
    }
  }, 430);
}

function briefFromSpeech(lowerText) {
  return businessBriefs.findIndex((brief) =>
    brief.voiceTerms.some((term) => lowerText.includes(term)),
  );
}

function buildReply(heard) {
  const lower = heard.toLowerCase();

  if (/\b(stop listening|end conversation|go to sleep|go quiet|be quiet|goodbye)\b/.test(lower)) {
    stopAfterReply = true;
    return "Understood, Davy. Going quiet. I’ll be right here when you need me.";
  }

  if (/\b(good morning|morning aqua|hello aqua|hey aqua|hi aqua)\b/.test(lower)) {
    return responseLibrary.greeting;
  }

  if (/\b(professional|business mode|focus mode|serious mode|be concise)\b/.test(lower)) {
    return responseLibrary.professional;
  }

  if (/\b(giddy|playful|witty|funny|energy|personality|make me laugh)\b/.test(lower)) {
    return responseLibrary.playful;
  }

  if (/\b(sentient|conscious|who are you|what are you)\b/.test(lower)) {
    return responseLibrary.identity;
  }

  if (/\b(what can you do|show me what you can do|capabilities|how do you work)\b/.test(lower)) {
    return responseLibrary.capability;
  }

  if (/\b(what time|current time|time is it)\b/.test(lower)) {
    return responseLibrary.time();
  }

  if (/\b(spin|rotate|next card|next app|move the cards)\b/.test(lower)) {
    selectBrief(activeIndex + 1);
    return `Absolutely. Giving the platform a proper spin and bringing ${businessBriefs[activeIndex].app} forward. Smooth, useful, and only a little dramatic.`;
  }

  if (/\b(previous card|previous app|go back one)\b/.test(lower)) {
    selectBrief(activeIndex - 1);
    return `Moving back to ${businessBriefs[activeIndex].app}, Davy. The lower alerts changed with it, exactly as the final platform will.`;
  }

  const briefIndex = briefFromSpeech(lower);
  if (briefIndex >= 0) {
    selectBrief(briefIndex);
    const brief = businessBriefs[briefIndex];
    return `${brief.app} is centered. This is a working demo surface with placeholder information, not connected company data. Swipe the stack or tell me where you want to go next.`;
  }

  if (
    /\b(weather|invoice|customer|client|schedule|actual|real data|email|calendar|bank|balance)\b/.test(
      lower,
    )
  ) {
    return responseLibrary.truthful;
  }

  return `I heard you, Davy. This front-end proof does not have open-ended reasoning connected yet, so I won’t fake it. Ask me to spin the cards, show Jobs, Field, Financials, Draw, or Vault, or tell me to switch between playful and professional mode.`;
}

function onHeard(text) {
  const heard = String(text || "").trim();
  if (!heard) {
    if (sessionActive) requestListening(420, "I’m still with you, Davy.");
    return;
  }

  transcript.textContent = `Davy: ${heard}`;
  conversationSpeaker.textContent = "DAVY";
  speakReply(buildReply(heard));
}

function beginBrowserListening() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    onHeard("Good morning, Aqua.");
    return;
  }

  fallbackRecognition = new Recognition();
  fallbackRecognition.lang = "en-US";
  fallbackRecognition.interimResults = true;
  fallbackRecognition.maxAlternatives = 1;
  fallbackRecognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    transcript.textContent = `Davy: ${result[0].transcript}`;
    if (result.isFinal) {
      fallbackRecognition = null;
      onHeard(result[0].transcript);
    }
  };
  fallbackRecognition.onerror = () => {
    fallbackRecognition = null;
    if (sessionActive) requestListening(640, "I’m still listening.");
  };
  fallbackRecognition.onend = () => {
    fallbackRecognition = null;
  };
  fallbackRecognition.start();
}

function requestListening(delay = 0, message = "I’m listening.") {
  clearTimeout(resumeTimer);
  const epoch = sessionEpoch;
  resumeTimer = setTimeout(() => {
    if (!sessionActive || epoch !== sessionEpoch) return;
    stopNativeListening();
    setState("listening", message);

    if (window.AquaNative && typeof window.AquaNative.listen === "function") {
      window.AquaNative.listen();
    } else {
      beginBrowserListening();
    }
  }, delay);
}

window.Aqua = {
  nativeState(state) {
    if (state === "listening") setState("listening", "I’m listening.");
    if (state === "thinking") setState("thinking", "One second, Davy.");
    if (state === "speaking") beginSpeaking();
    if (state === "idle" && currentState !== "speaking") setState("idle");
  },
  onNativeHeard(text) {
    onHeard(text);
  },
  onNativePartial(text) {
    if (currentState === "listening") transcript.textContent = `Davy: ${String(text || "")}`;
  },
  onNativeStart() {
    beginSpeaking();
  },
  onNativeWord(start) {
    const index = wordIndexFromCharacter(Number(start) || 0);
    renderSpokenWord(index);
    triggerVoicePulse(0.28 + (index % 5) * 0.035);
  },
  onNativeEnergy(level) {
    if (currentState === "speaking") setVoiceEnergy(level, 100, true);
  },
  onNativeDone() {
    if (Date.now() < ignoreNativeDoneUntil) return;
    finishSpeaking();
  },
  onNativeError(error) {
    const code = String(error);
    if (code === "tts-not-ready" || code === "tts") {
      speakWithBrowser();
      return;
    }
    if (code === "permission" || code === "unavailable") {
      stopConversation(
        code === "permission"
          ? "Microphone permission is required for the voice demonstration."
          : "Speech recognition is unavailable on this device.",
      );
      return;
    }
    if (sessionActive) requestListening(code === "8" ? 900 : 520, "Still with you, Davy.");
  },
  handleBack() {
    if (!demoSheet.hidden) {
      closeSheet();
      return true;
    }
    if (sessionActive) {
      stopConversation();
      return true;
    }
    return false;
  },
  debugSetState(state) {
    setState(state);
    if (state === "speaking") {
      setSessionActive(true);
      prepareSpokenWords(responseLibrary.greeting);
      beginSpeaking();
      setVoiceEnergy(0.42, 900);
    }
  },
  demoReply(text = responseLibrary.greeting) {
    if (!sessionActive) setSessionActive(true);
    speakReply(text);
  },
  selectBrief(index) {
    selectBrief(Number(index) || 0);
  },
  snapshot() {
    return {
      activeApp: businessBriefs[activeIndex].app,
      aquaState: currentState,
      sessionActive,
      backendConnected: false,
    };
  },
};

aquaTrigger.addEventListener("click", startConversation);
sessionStart.addEventListener("click", startConversation);
sessionStop.addEventListener("click", () => stopConversation());

document.querySelector("[data-deck-prev]").addEventListener("click", () => {
  selectBrief(activeIndex - 1);
});
document.querySelector("[data-deck-next]").addEventListener("click", () => {
  selectBrief(activeIndex + 1);
});

deckTrack.addEventListener("click", (event) => {
  const card = event.target.closest("[data-brief-index]");
  if (!card) return;
  const index = Number(card.dataset.briefIndex);
  selectBrief(index, { open: index === activeIndex });
});

deckDots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-dot-index]");
  if (dot) selectBrief(Number(dot.dataset.dotIndex));
});

deckViewport.addEventListener("pointerdown", (event) => {
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
  deckViewport.setPointerCapture?.(event.pointerId);
});

deckViewport.addEventListener("pointerup", (event) => {
  if (pointerStartX === null) return;
  const differenceX = event.clientX - pointerStartX;
  const differenceY = event.clientY - pointerStartY;
  pointerStartX = null;
  pointerStartY = null;
  if (Math.abs(differenceX) < 34 || Math.abs(differenceX) < Math.abs(differenceY)) return;
  selectBrief(activeIndex + (differenceX < 0 ? 1 : -1));
});

deckViewport.addEventListener("pointercancel", () => {
  pointerStartX = null;
  pointerStartY = null;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") selectBrief(activeIndex - 1);
  if (event.key === "ArrowRight") selectBrief(activeIndex + 1);
  if (event.key === "Escape") {
    if (!demoSheet.hidden) closeSheet();
    else if (sessionActive) stopConversation();
  }
});

document.querySelectorAll("[data-placeholder-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const brief = businessBriefs[activeIndex];
    openSheet(
      "FUNCTIONING PLACEHOLDER",
      `${brief.app} detail`,
      "The card, navigation, and interaction are active. The business record behind this surface is intentionally deferred to the backend phase.",
    );
  });
});

document.querySelectorAll("[data-sheet-close]").forEach((button) => {
  button.addEventListener("click", closeSheet);
});

document.querySelectorAll("[data-nav]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-nav]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const destination = button.dataset.nav;

    if (destination === "home") {
      selectBrief(2);
      showToast("Home command surface restored.");
      return;
    }
    if (destination === "messages") {
      openSheet(
        "MESSAGES · PLACEHOLDER",
        "Aqua communications",
        "The message surface is active as a UI placeholder. Gmail, SMS, and team channels will connect through permission-scoped services later.",
      );
      return;
    }
    if (destination === "data") {
      selectBrief(4);
      openAppDetail(businessBriefs[4]);
      return;
    }
    if (destination === "settings") {
      openSheet(
        "SETTINGS · LOCAL PROOF",
        "Aqua preferences",
        "Voice personality, language, privacy, and app permissions will live here. No production preference has been changed.",
      );
      return;
    }
    if (destination === "signout") {
      stopConversation("Local demo session ended.");
      openSheet(
        "DEMO SESSION",
        "No account is connected",
        "This APK contains no customer sign-in and no live tenant data. Sign out ends only the local Aqua demonstration session.",
      );
    }
  });
});

function updateClock() {
  document.querySelector("[data-clock]").textContent = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

buildDeck();
updateDeck();
updateClock();
setInterval(updateClock, 30000);
resetVoiceEnergy();

const previewState = new URLSearchParams(window.location.search).get("preview");
if (previewState === "speaking") {
  window.setTimeout(() => window.Aqua.debugSetState("speaking"), 180);
}

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
