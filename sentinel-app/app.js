const shell = document.querySelector(".sentinel-shell");
const stateLabel = document.querySelector("[data-state-label]");
const transcript = document.querySelector("[data-transcript]");
const aquaTrigger = document.querySelector("[data-aqua-trigger]");
const deckTrack = document.querySelector("[data-deck-track]");
const deckTitle = document.querySelector("[data-deck-title]");
const deckDots = document.querySelector("[data-deck-dots]");
const deckViewport = document.querySelector("[data-deck-viewport]");
const appButtons = [...document.querySelectorAll("[data-app-index]")];
const toast = document.querySelector("[data-toast]");

const REPLY =
  "Good morning, Davy. I’m online and ready. What would you like to handle first?";

const businessBriefs = [
  {
    app: "Jobs",
    type: "Company overview",
    title: "Active job portfolio",
    summary: "A calm company-wide snapshot with the next decision surfaced first.",
    stats: [
      ["Active jobs", "Demo"],
      ["On schedule", "—"],
      ["Needs attention", "—"],
      ["Next review", "Not connected"],
    ],
    visual: ["Portfolio health", "Demo"],
  },
  {
    app: "Field",
    type: "Field operations",
    title: "Demo field project",
    summary: "Latest walkthrough, open finding, and the next useful field action.",
    stats: [
      ["Last scan", "Not connected"],
      ["Open findings", "—"],
      ["Photo proof", "—"],
      ["Next action", "Demo"],
    ],
    visual: ["Field readiness", "Demo"],
  },
  {
    app: "Financials",
    type: "Financial command",
    title: "Company financial health",
    summary: "Budget, commitments, and draw readiness in one owner-focused brief.",
    stats: [
      ["Job value", "Not connected"],
      ["Committed", "—"],
      ["Available", "—"],
      ["Draw ready", "Demo"],
    ],
    visual: ["Budget position", "Demo"],
  },
  {
    app: "Draw",
    type: "Draw and proof",
    title: "Demo draw ready for review",
    summary: "Financial progress linked directly to current photo and scope proof.",
    stats: [
      ["Requested", "Not connected"],
      ["Photo proof", "—"],
      ["SOW items", "—"],
      ["Exceptions", "Demo"],
    ],
    visual: ["Proof complete", "Demo"],
  },
  {
    app: "Vault",
    type: "Knowledge vault",
    title: "Jurisdiction brief",
    summary: "Construction guidance stays evidence-led and clearly marks locked sources.",
    stats: [
      ["Jurisdiction", "Not connected"],
      ["Indexed sets", "—"],
      ["Pending source", "—"],
      ["Confidence", "Demo"],
    ],
    visual: ["Index health", "Demo"],
  },
];

let activeIndex = 2;
let touchStartX = null;
let toastTimer = null;
let fallbackSpeechTimer = null;
let currentReplyWords = [];
let currentState = "idle";

function setState(nextState, message) {
  currentState = nextState;
  shell.dataset.aquaState = nextState;
  const labels = {
    idle: "Tap to talk",
    listening: "Listening to Davy",
    thinking: "Thinking",
    speaking: "Aqua is speaking",
  };
  stateLabel.textContent = labels[nextState] || labels.idle;
  if (message) transcript.textContent = message;
}

function wrapIndex(index) {
  return (index + businessBriefs.length) % businessBriefs.length;
}

function relativePosition(index) {
  let difference = index - activeIndex;
  if (difference > 2) difference -= businessBriefs.length;
  if (difference < -2) difference += businessBriefs.length;
  if (difference === -1) return "previous";
  if (difference === 0) return "active";
  if (difference === 1) return "next";
  return "hidden";
}

function orbitPosition(index) {
  let difference = index - activeIndex;
  if (difference > 2) difference -= businessBriefs.length;
  if (difference < -2) difference += businessBriefs.length;
  return difference + 2;
}

function renderDeck() {
  deckTrack.innerHTML = businessBriefs
    .map((brief, index) => {
      const stats = brief.stats
        .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
        .join("");
      return `
        <article class="brief-card" data-position="${relativePosition(index)}" data-brief-index="${index}">
          <div class="brief-copy">
            <span class="brief-type">${brief.type}</span>
            <h3>${brief.title}</h3>
            <p>${brief.summary}</p>
            <dl class="brief-stats">${stats}</dl>
          </div>
          <div class="brief-visual" aria-label="${brief.visual[0]} ${brief.visual[1]}">
            <span class="visual-label"><span>${brief.visual[0]}</span><strong>${brief.visual[1]}</strong></span>
          </div>
        </article>`;
    })
    .join("");

  deckDots.innerHTML = businessBriefs
    .map(
      (brief, index) =>
        `<button type="button" class="${index === activeIndex ? "active" : ""}" data-dot-index="${index}" aria-label="Show ${brief.app} brief"></button>`,
    )
    .join("");

  deckTitle.textContent = businessBriefs[activeIndex].type;

  appButtons.forEach((button, index) => {
    button.className = `orbit-app orbit-app-${orbitPosition(index)}${
      index === activeIndex ? " active" : ""
    }`;
    button.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
  });
}

function selectBrief(index) {
  activeIndex = wrapIndex(index);
  renderDeck();
  if (navigator.vibrate) navigator.vibrate(12);
}

function showToast(message = "Development preview — backend connection comes next.") {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function triggerVoicePulse() {
  shell.classList.remove("voice-pulse");
  void shell.offsetWidth;
  shell.classList.add("voice-pulse");
}

function renderSpokenWord(activeWordIndex) {
  if (!currentReplyWords.length) return;
  transcript.innerHTML = currentReplyWords
    .map((word, index) => {
      if (index < activeWordIndex) return `<span class="spoken">${word}</span>`;
      if (index === activeWordIndex) return `<span class="current">${word}</span>`;
      return `<span>${word}</span>`;
    })
    .join(" ");
}

function wordIndexFromCharacter(characterIndex) {
  let cursor = 0;
  for (let index = 0; index < currentReplyWords.length; index += 1) {
    const cleanWord = currentReplyWords[index].replace(/[’]/g, "'");
    const wordStart = REPLY.indexOf(cleanWord, cursor);
    const resolvedStart = wordStart >= 0 ? wordStart : cursor;
    const wordEnd = resolvedStart + cleanWord.length;
    if (characterIndex >= resolvedStart && characterIndex <= wordEnd) return index;
    cursor = wordEnd;
  }
  return Math.min(currentReplyWords.length - 1, Math.max(0, Math.floor(characterIndex / 6)));
}

function beginSpeaking() {
  currentReplyWords = REPLY.split(/\s+/);
  setState("speaking");
  renderSpokenWord(0);
  triggerVoicePulse();
}

function finishSpeaking() {
  clearTimeout(fallbackSpeechTimer);
  shell.classList.remove("voice-pulse");
  transcript.textContent = REPLY;
  setState("idle");
}

function speakWithBrowser() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    beginSpeaking();
    currentReplyWords.forEach((_, index) => {
      setTimeout(() => {
        renderSpokenWord(index);
        triggerVoicePulse();
      }, 210 * index);
    });
    fallbackSpeechTimer = setTimeout(finishSpeaking, 210 * currentReplyWords.length + 500);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(REPLY);
  utterance.rate = 1.04;
  utterance.pitch = 0.92;
  utterance.volume = 1;
  utterance.onstart = beginSpeaking;
  utterance.onboundary = (event) => {
    if (event.name && event.name !== "word") return;
    const index = wordIndexFromCharacter(event.charIndex || 0);
    renderSpokenWord(index);
    triggerVoicePulse();
  };
  utterance.onend = finishSpeaking;
  utterance.onerror = finishSpeaking;
  window.speechSynthesis.speak(utterance);
}

function speakReply() {
  setState("thinking", "Good morning, Aqua.");
  setTimeout(() => {
    if (window.AquaNative && typeof window.AquaNative.speak === "function") {
      window.AquaNative.speak(REPLY);
    } else {
      speakWithBrowser();
    }
  }, 520);
}

function onHeard(text) {
  const heard = String(text || "").trim();
  if (!heard) {
    setState("idle", "I didn’t catch that. Tap to try again.");
    return;
  }
  transcript.textContent = heard;
  speakReply();
}

function beginListening() {
  if (currentState === "speaking") {
    if (window.AquaNative && typeof window.AquaNative.stopSpeaking === "function") {
      window.AquaNative.stopSpeaking();
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  setState("listening", "Say “Good morning, Aqua.”");

  if (window.AquaNative && typeof window.AquaNative.listen === "function") {
    window.AquaNative.listen();
    return;
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      transcript.textContent = result[0].transcript;
      if (result.isFinal) onHeard(result[0].transcript);
    };
    recognition.onerror = () => {
      setState("idle", "I didn’t catch that. Tap to try again.");
    };
    recognition.start();
    return;
  }

  setTimeout(() => onHeard("Good morning, Aqua."), 900);
}

window.Aqua = {
  nativeState(state) {
    if (state === "listening") setState("listening", "I’m listening.");
    if (state === "thinking") setState("thinking", "One moment, Davy.");
    if (state === "speaking") beginSpeaking();
    if (state === "idle" && currentState !== "speaking") setState("idle");
  },
  onNativeHeard(text) {
    onHeard(text);
  },
  onNativeStart() {
    beginSpeaking();
  },
  onNativeWord(start) {
    const index = wordIndexFromCharacter(Number(start) || 0);
    renderSpokenWord(index);
    triggerVoicePulse();
  },
  onNativeDone() {
    finishSpeaking();
  },
  onNativeError() {
    setState("idle", "I didn’t catch that. Tap to try again.");
  },
  handleBack() {
    if (currentState !== "idle") {
      finishSpeaking();
      return true;
    }
    return false;
  },
};

aquaTrigger.addEventListener("click", beginListening);
document.querySelector("[data-deck-prev]").addEventListener("click", () => selectBrief(activeIndex - 1));
document.querySelector("[data-deck-next]").addEventListener("click", () => selectBrief(activeIndex + 1));

appButtons.forEach((button) => {
  button.addEventListener("click", () => selectBrief(Number(button.dataset.appIndex)));
});

deckDots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-dot-index]");
  if (dot) selectBrief(Number(dot.dataset.dotIndex));
});

deckViewport.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

deckViewport.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;
    const difference = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(difference) < 35) return;
    selectBrief(activeIndex + (difference < 0 ? 1 : -1));
  },
  { passive: true },
);

document.querySelectorAll("[data-placeholder-action]").forEach((button) => {
  button.addEventListener("click", () => showToast());
});

function updateClock() {
  const clock = document.querySelector("[data-clock]");
  clock.textContent = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

updateClock();
setInterval(updateClock, 30000);
renderDeck();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
