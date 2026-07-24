const cards = [
  {
    name: "Overview",
    title: "Aqua Homes Design Group",
    metric: "18 active",
    submetric: "6 approvals · 4 client replies",
    note: "The demonstration portfolio is stable. Four client replies and two payroll approvals are waiting.",
    asset: "./assets/card-overview-front-v11.png",
  },
  {
    name: "Site Intelligence",
    title: "Tower A · Level 34",
    metric: "92% clear",
    submetric: "2 risks · 14 verified zones",
    note: "Fourteen field zones are verified. Two demonstration risks remain and today’s concrete work is on track.",
    asset: "./assets/card-site-intelligence-front-v11.png",
  },
  {
    name: "Financial Command",
    title: "Northshore Mega Project",
    metric: "$14.78M",
    submetric: "$13.21M committed · 89% funded",
    note: "The demonstration project is 89% funded. One procurement variance needs review.",
    asset: "./assets/card-financial-command-front-v11.png",
  },
  {
    name: "Operations",
    title: "Today’s Execution",
    metric: "47 on site",
    submetric: "3 crews · 96% time capture",
    note: "All demonstration foremen checked in. The HVAC crew arrival moved to 10:15 AM.",
    asset: "./assets/card-operations-front-v11.png",
  },
  {
    name: "Risk Monitor",
    title: "Portfolio Watch",
    metric: "2 alerts",
    submetric: "1 critical path",
    note: "The concrete-pour delay is the only demonstration critical-path exposure.",
    asset: "./assets/card-risk-monitor-front-v11.png",
  },
];

const slots = [
  { left: 46, top: 28, width: 126, height: 258, clip: "polygon(3% 0,98% 6%,98% 97%,0 100%)", depth: 2 },
  { left: 182, top: 41, width: 132, height: 245, clip: "polygon(0 0,99% 5%,100% 100%,0 96%)", depth: 4 },
  { left: 325, top: 42, width: 194, height: 282, clip: "polygon(1% 1%,99% 0,99% 99%,1% 100%)", depth: 6 },
  { left: 529, top: 44, width: 135, height: 243, clip: "polygon(0 3%,98% 0,100% 96%,0 100%)", depth: 4 },
  { left: 676, top: 27, width: 135, height: 258, clip: "polygon(3% 6%,98% 0,100% 98%,0 100%)", depth: 2 },
];

let active = 2;
let sheetState = "closed";
let dragX = null;
let transcriptTimer = null;
let localRecognition = null;

const sentinel = document.getElementById("sentinel");
const surface = document.getElementById("osSurface");
const cardLayers = document.getElementById("cardLayers");
const detailSheet = document.getElementById("detailSheet");
const transcript = document.getElementById("transcript");

function slotForCard(cardIndex) {
  return (cardIndex - active + 2 + cards.length) % cards.length;
}

function setState(state) {
  sentinel.className = `sentinel state-${state}`;
}

function showTranscript(text, persistent = false) {
  clearTimeout(transcriptTimer);
  transcript.textContent = text;
  transcript.hidden = false;
  if (!persistent) {
    transcriptTimer = setTimeout(() => {
      transcript.hidden = true;
    }, 3600);
  }
}

function applySlot(element, slot, slotIndex) {
  element.className = `${element.dataset.kind} slot-${slotIndex}`;
  element.style.left = `${(slot.left / 868) * 100}%`;
  element.style.top = `${(slot.top / 430) * 100}%`;
  element.style.width = `${(slot.width / 868) * 100}%`;
  element.style.height = `${(slot.height / 430) * 100}%`;
  element.style.clipPath = slot.clip;
  element.style.zIndex = String(slot.depth + (element.dataset.kind === "deck-card" ? 3 : 0));
}

function buildCards() {
  slots.forEach((slot, index) => {
    const mask = document.createElement("span");
    mask.dataset.kind = "card-mask";
    mask.setAttribute("aria-hidden", "true");
    applySlot(mask, slot, index);
    cardLayers.appendChild(mask);
  });

  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.kind = "deck-card";
    button.dataset.cardIndex = String(index);
    button.innerHTML = `<img src="${card.asset}" alt="" />`;
    button.addEventListener("click", () => {
      const slotIndex = slotForCard(index);
      if (slotIndex === 2) openCard(index, "half");
      else {
        active = index;
        renderCards();
      }
    });
    cardLayers.appendChild(button);
  });
  renderCards();
}

function renderCards() {
  cardLayers.querySelectorAll(".deck-card").forEach((button) => {
    const index = Number(button.dataset.cardIndex);
    const slotIndex = slotForCard(index);
    applySlot(button, slots[slotIndex], slotIndex);
    button.setAttribute(
      "aria-label",
      `${slotIndex === 2 ? "Open" : "Rotate to"} ${cards[index].name}`,
    );
  });
}

function rotate(direction) {
  active = (active + direction + cards.length) % cards.length;
  closeDetails();
  renderCards();
}

function openCard(index, view = "half") {
  active = index;
  renderCards();
  const selected = cards[index];
  sheetState = view;
  detailSheet.className = `detail-sheet ${view}`;
  document.getElementById("sheetEyebrow").textContent = selected.name;
  document.getElementById("sheetTitle").textContent = selected.title;
  document.getElementById("sheetMetric").textContent = selected.metric;
  document.getElementById("sheetSubmetric").textContent = selected.submetric;
  document.getElementById("sheetNote").textContent = selected.note;
  document.getElementById("toggleDepth").textContent =
    view === "full" ? "Half screen" : "Go deeper";
}

function closeDetails() {
  sheetState = "closed";
  detailSheet.className = "detail-sheet closed";
}

window.closeAquaDetails = closeDetails;

function toggleDepth() {
  if (sheetState === "closed") openCard(active, "half");
  else openCard(active, sheetState === "full" ? "half" : "full");
}

function speak(text) {
  if (window.AquaBridge && typeof window.AquaBridge.speak === "function") {
    window.AquaBridge.speak(text);
    return;
  }

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => window.setAquaSpeaking(true);
    utterance.onend = () => window.setAquaSpeaking(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

function commandResponse(text) {
  const command = text.toLowerCase();
  if (command.includes("next") || command.includes("right")) {
    rotate(1);
    return `Showing ${cards[active].name}.`;
  }
  if (command.includes("previous") || command.includes("back") || command.includes("left")) {
    rotate(-1);
    return `Showing ${cards[active].name}.`;
  }
  if (command.includes("overview")) {
    openCard(0, "half");
    return cards[0].note;
  }
  if (command.includes("site")) {
    openCard(1, "half");
    return cards[1].note;
  }
  if (command.includes("financial") || command.includes("budget")) {
    openCard(2, "half");
    return cards[2].note;
  }
  if (command.includes("operation")) {
    openCard(3, "half");
    return cards[3].note;
  }
  if (command.includes("risk") || command.includes("schedule")) {
    openCard(4, "half");
    return cards[4].note;
  }
  if (command.includes("go deeper") || command.includes("full screen")) {
    openCard(active, "full");
    return `${cards[active].name} is open full screen.`;
  }
  if (command.includes("close") || command.includes("home")) {
    closeDetails();
    return "Returning to the command deck.";
  }
  if (command.includes("how") && command.includes("work")) {
    return "Swipe the command cards, tap the center card for a half-screen brief, or say go deeper for the full-screen view.";
  }
  return `I heard ${text}. Try saying next card, open Financial Command, show Risk Monitor, or go deeper.`;
}

window.receiveAquaText = (text) => {
  setState("idle");
  showTranscript(text);
  const response = commandResponse(String(text));
  speak(response);
};

window.receiveAquaPartial = (text) => {
  showTranscript(text, true);
};

window.receiveAquaError = (message) => {
  setState("idle");
  showTranscript(message);
};

window.setAquaSpeaking = (speaking) => {
  if (speaking) {
    setState("speaking");
    surface.style.setProperty("--voice-level", "0.8");
  } else {
    setState("idle");
    surface.style.setProperty("--voice-level", "0");
  }
};

function startVoice() {
  setState("listening");
  showTranscript("Listening…", true);

  if (window.AquaBridge && typeof window.AquaBridge.startListening === "function") {
    window.AquaBridge.startListening();
    return;
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    setState("idle");
    showTranscript("Voice testing is available in the Android APK. Swipe or tap the cards here.");
    return;
  }

  localRecognition?.abort();
  localRecognition = new Recognition();
  localRecognition.lang = "en-US";
  localRecognition.interimResults = true;
  localRecognition.maxAlternatives = 1;
  localRecognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const text = result[0].transcript;
    if (result.isFinal) window.receiveAquaText(text);
    else window.receiveAquaPartial(text);
  };
  localRecognition.onerror = () => window.receiveAquaError("I could not hear that. Tap to try again.");
  localRecognition.onend = () => {
    if (sentinel.classList.contains("state-listening")) setState("idle");
  };
  localRecognition.start();
}

document.getElementById("voiceButton").addEventListener("click", startVoice);
document.getElementById("askAqua").addEventListener("click", startVoice);
document.getElementById("previousCard").addEventListener("click", () => rotate(-1));
document.getElementById("nextCard").addEventListener("click", () => rotate(1));
document.getElementById("budgetPanel").addEventListener("click", () => openCard(2, "half"));
document.getElementById("riskPanel").addEventListener("click", () => openCard(4, "half"));
document.getElementById("closeSheet").addEventListener("click", closeDetails);
document.getElementById("toggleDepth").addEventListener("click", toggleDepth);

document.querySelectorAll(".bottom-rail button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".bottom-rail button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showTranscript(`${button.getAttribute("aria-label")} selected`);
  });
});

const deck = document.getElementById("commandDeck");
deck.addEventListener("pointerdown", (event) => {
  dragX = event.clientX;
});
deck.addEventListener("pointerup", (event) => {
  if (dragX !== null && Math.abs(event.clientX - dragX) > 28) {
    rotate(event.clientX < dragX ? 1 : -1);
  }
  dragX = null;
});

buildCards();

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {});
}
