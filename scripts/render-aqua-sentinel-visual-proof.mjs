#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { inflateSync } from "node:zlib";

const MORPH_CHECKPOINTS = Object.freeze([
  ["00", 560, "0.048"],
  ["01", 620, "0.190"],
  ["02", 680, "0.333"],
  ["03", 740, "0.476"],
  ["04", 800, "0.619"],
  ["05", 860, "0.762"],
  ["06", 920, "0.905"],
]);

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) continue;
    options[key.slice(2)] = argv[index + 1];
    index += 1;
  }
  assert(options.chrome, "--chrome is required");
  assert(options.page, "--page is required");
  assert(options["output-dir"], "--output-dir is required");
  assert(options["evidence-dir"], "--evidence-dir is required");
  return {
    chrome: resolve(options.chrome),
    page: resolve(options.page),
    outputDirectory: resolve(options["output-dir"]),
    evidenceDirectory: resolve(options["evidence-dir"]),
  };
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function paethPredictor(left, up, upperLeft) {
  const prediction = left + up - upperLeft;
  const leftDistance = Math.abs(prediction - left);
  const upDistance = Math.abs(prediction - up);
  const upperLeftDistance = Math.abs(prediction - upperLeft);
  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  if (upDistance <= upperLeftDistance) return up;
  return upperLeft;
}

function pngRegionMean(png, region) {
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "Screenshot is not a PNG");
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = -1;
  let interlace = -1;
  const imageChunks = [];
  while (offset + 12 <= png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    assert(dataEnd + 4 <= png.length, `Truncated PNG chunk ${type}`);
    if (type === "IHDR") {
      width = png.readUInt32BE(dataStart);
      height = png.readUInt32BE(dataStart + 4);
      bitDepth = png[dataStart + 8];
      colorType = png[dataStart + 9];
      interlace = png[dataStart + 12];
    } else if (type === "IDAT") {
      imageChunks.push(png.subarray(dataStart, dataEnd));
    } else if (type === "IEND") {
      break;
    }
    offset = dataEnd + 4;
  }
  assert.equal(bitDepth, 8, "Pixel gate requires an 8-bit screenshot");
  assert.equal(interlace, 0, "Pixel gate requires a non-interlaced screenshot");
  const channels = ({ 0: 1, 2: 3, 4: 2, 6: 4 })[colorType];
  assert(channels, `Unsupported PNG color type ${colorType}`);
  const rowBytes = width * channels;
  const inflated = inflateSync(Buffer.concat(imageChunks));
  assert(inflated.length >= (rowBytes + 1) * height, "PNG pixel stream is incomplete");
  const pixels = Buffer.alloc(rowBytes * height);
  let inputOffset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[inputOffset];
    inputOffset += 1;
    for (let byteIndex = 0; byteIndex < rowBytes; byteIndex += 1) {
      const raw = inflated[inputOffset];
      inputOffset += 1;
      const outputIndex = y * rowBytes + byteIndex;
      const left = byteIndex >= channels ? pixels[outputIndex - channels] : 0;
      const up = y > 0 ? pixels[outputIndex - rowBytes] : 0;
      const upperLeft = y > 0 && byteIndex >= channels
        ? pixels[outputIndex - rowBytes - channels]
        : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = Math.floor((left + up) / 2);
      else if (filter === 4) predictor = paethPredictor(left, up, upperLeft);
      else assert.equal(filter, 0, `Unsupported PNG filter ${filter}`);
      pixels[outputIndex] = (raw + predictor) & 0xff;
    }
  }
  const left = Math.max(0, Math.floor(region.x));
  const top = Math.max(0, Math.floor(region.y));
  const right = Math.min(width, left + Math.floor(region.width));
  const bottom = Math.min(height, top + Math.floor(region.height));
  assert(right > left && bottom > top, "Pixel gate region is outside the screenshot");
  let total = 0;
  let samples = 0;
  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const pixelOffset = (y * width + x) * channels;
      if (colorType === 0 || colorType === 4) total += pixels[pixelOffset] * 3;
      else total += pixels[pixelOffset] + pixels[pixelOffset + 1] + pixels[pixelOffset + 2];
      samples += 3;
    }
  }
  return total / (samples * 255);
}

class CdpConnection {
  constructor(webSocketUrl) {
    this.webSocket = new WebSocket(webSocketUrl);
    this.nextId = 0;
    this.pending = new Map();
  }

  async open() {
    await new Promise((resolveOpen, rejectOpen) => {
      const timeout = setTimeout(() => rejectOpen(new Error("Timed out opening Chrome DevTools")), 10_000);
      this.webSocket.addEventListener("open", () => {
        clearTimeout(timeout);
        resolveOpen();
      }, { once: true });
      this.webSocket.addEventListener("error", () => {
        clearTimeout(timeout);
        rejectOpen(new Error("Chrome DevTools WebSocket failed to open"));
      }, { once: true });
    });
    this.webSocket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (!message.id || !this.pending.has(message.id)) return;
      const pending = this.pending.get(message.id);
      this.pending.delete(message.id);
      clearTimeout(pending.timeout);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result || {});
    });
  }

  send(method, params = {}, sessionId = undefined) {
    const id = ++this.nextId;
    return new Promise((resolveCommand, rejectCommand) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        rejectCommand(new Error(`${method} timed out`));
      }, 15_000);
      this.pending.set(id, { method, resolve: resolveCommand, reject: rejectCommand, timeout });
      this.webSocket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  close() {
    this.webSocket.close();
  }
}

async function waitForDevTools(browser, stderrLog) {
  return new Promise((resolveDevTools, rejectDevTools) => {
    const timeout = setTimeout(() => {
      rejectDevTools(new Error("Chrome did not expose a DevTools endpoint within 15 seconds"));
    }, 15_000);
    browser.stderr.setEncoding("utf8");
    browser.stderr.on("data", (chunk) => {
      stderrLog.push(chunk);
      const match = stderrLog.join("").match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (!match) return;
      clearTimeout(timeout);
      resolveDevTools(match[1]);
    });
    browser.once("exit", (code, signal) => {
      clearTimeout(timeout);
      rejectDevTools(new Error(`Chrome exited before DevTools was ready (code=${code}, signal=${signal})`));
    });
  });
}

async function evaluate(connection, sessionId, expression) {
  const result = await connection.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
  }
  return result.result?.value;
}

function captureDefinitions() {
  return [
    {
      name: "home",
      query: "preview=home",
      ready: "home",
      output: "AquaSentinelOS-v0.8.0-launch-proof.png",
    },
    {
      name: "direct-aqua-conversation",
      query: "preview=conversation",
      ready: "conversation",
      compactConversation: true,
      output: "AquaSentinelOS-v0.8.3-Direct-Aqua-Conversation.png",
    },
    {
      name: "neural-rest",
      query: "preview=neural&neuralDemo=rest",
      ready: "neural",
      phase: "rest",
      visiblePortals: 7,
      referenceState: "rest",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Rest-closed-phone.png",
    },
    {
      name: "neural-select",
      query: "preview=neural&neuralDemo=sequence&neuralAt=100",
      ready: "neural",
      phase: "selecting",
      visiblePortals: 7,
      referenceState: "rest",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Select-closed-phone.png",
    },
    {
      name: "neural-fire",
      query: "preview=neural&neuralDemo=sequence&neuralAt=300",
      ready: "neural",
      phase: "firing",
      visiblePortals: 7,
      referenceState: "rest",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Fire-closed-phone.png",
    },
    {
      name: "neural-morph",
      query: "preview=neural&neuralDemo=sequence&neuralAt=720",
      ready: "neural",
      phase: "transitioning",
      morphProgress: "0.429",
      materialized: "pending",
      referenceState: "morphed",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Morph-closed-phone.png",
    },
    {
      name: "neural-result",
      query: "preview=neural&neuralDemo=sequence&neuralAt=980",
      ready: "neural",
      phase: "result",
      morphProgress: "1.000",
      materialized: "true",
      fullMaterialization: true,
      referenceState: "morphed",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Result-closed-phone.png",
    },
    {
      name: "neural-company-morph",
      query: "preview=neural&neuralDemo=company",
      ready: "neural",
      phase: "result",
      morphProgress: "1.000",
      referenceState: "morphed",
      selectedApp: "Aqua CRM",
      output: "AquaSentinelOS-v0.8.0-Neural-Link-Company-Morph-closed-phone.png",
    },
    ...MORPH_CHECKPOINTS.map(([name, neuralAt, morphProgress]) => ({
      name: `neural-morph-${name}`,
      query: `preview=neural&neuralDemo=sequence&neuralAt=${neuralAt}`,
      ready: "neural",
      phase: "transitioning",
      morphProgress,
      materialized: "pending",
      referenceState: "morphed",
      output: `AquaSentinelOS-v0.8.0-Neural-Link-Morph-${name}.png`,
    })),
    {
      name: "command",
      query: "preview=command",
      ready: "command",
      output: "AquaSentinelOS-v0.8.0-Command-Center-closed-phone.png",
    },
    {
      name: "settings",
      query: "preview=settings",
      ready: "settings",
      output: "AquaSentinelOS-v0.8.0-Settings-closed-phone.png",
    },
    {
      name: "diagnostics",
      query: "preview=diagnostics",
      ready: "diagnostics",
      output: "AquaSentinelOS-v0.8.0-Diagnostics-closed-phone.png",
    },
    {
      name: "connections",
      query: "preview=data",
      ready: "data",
      output: "AquaSentinelOS-v0.8.0-Connections-closed-phone.png",
    },
    {
      name: "file-cabinet",
      query: "preview=files",
      ready: "files",
      output: "AquaSentinelOS-v0.8.0-File-Cabinet-closed-phone.png",
    },
    {
      name: "messages",
      query: "preview=messages",
      ready: "messages",
      output: "AquaSentinelOS-v0.8.0-Conversation-Receipts-closed-phone.png",
    },
    {
      name: "about",
      query: "preview=about",
      ready: "about",
      output: "AquaSentinelOS-v0.8.0-About-closed-phone.png",
    },
  ];
}

const stateExpression = `(() => {
  const root = document.documentElement;
  const sentinel = document.querySelector('.sentinel');
  const heroArt = document.querySelector('.hero-art');
  const aquaHero = document.querySelector('.aqua-hero');
  const voiceCore = document.querySelector('.voice-core');
  const aquaPresence = document.querySelector('.aqua-presence-button');
  const heroArtStyle = heroArt ? getComputedStyle(heroArt) : null;
  const heroBeforeStyle = aquaHero ? getComputedStyle(aquaHero, '::before') : null;
  const heroAfterStyle = aquaHero ? getComputedStyle(aquaHero, '::after') : null;
  const voiceCoreStyle = voiceCore ? getComputedStyle(voiceCore) : null;
  const voiceBeforeStyle = voiceCore ? getComputedStyle(voiceCore, '::before') : null;
  const voiceAfterStyle = voiceCore ? getComputedStyle(voiceCore, '::after') : null;
  const aquaPresenceStyle = aquaPresence ? getComputedStyle(aquaPresence) : null;
  const stage = document.querySelector('.neural-stage');
  const materialized = document.querySelector('[data-neural-materialized]');
  const morphShell = document.querySelector('.neural-morph-shell');
  const materialization = materialized;
  const materializationStyle = materialization ? getComputedStyle(materialization) : null;
  const materializationBounds = materialization?.getBoundingClientRect();
  const morphShellStyle = morphShell ? getComputedStyle(morphShell) : null;
  const morphShellBounds = morphShell?.getBoundingClientRect();
  const returnedDocument = materialization?.querySelector('.neural-returned-document');
  const returnedDocumentBounds = returnedDocument?.getBoundingClientRect();
  const openFile = materialization?.querySelector('.neural-open-materialized-file');
  const openFileBounds = openFile?.getBoundingClientRect();
  const visiblePortals = Array.from(document.querySelectorAll('[data-portal-index]'))
    .filter((portal) => {
      const style = getComputedStyle(portal);
      const bounds = portal.getBoundingClientRect();
      return Number(style.opacity) > .15 && style.visibility !== 'hidden' && bounds.width > 0 && bounds.height > 0;
    });
  const beforeStyle = stage ? getComputedStyle(stage, '::before') : null;
  const afterStyle = stage ? getComputedStyle(stage, '::after') : null;
  const stageStyle = stage ? getComputedStyle(stage) : null;
  const substrate = stage?.querySelector('.neural-substrate-map');
  const aquaMark = stage?.querySelector('.neural-core .aqua-mark');
  const selectedPortal = stage?.querySelector('.neural-portal.is-primary');
  const selectedPortalIndex = Number(selectedPortal?.dataset?.portalIndex);
  const activeTethers = Array.from(stage?.querySelectorAll('[data-neural-source-group].is-active') || []);
  const activeTetherIndexes = activeTethers
    .map((group) => Number(group.dataset.neuralSourceGroup))
    .filter(Number.isFinite);
  const activeSynapses = Array.from(stage?.querySelectorAll('[data-neural-source-group].is-active .neural-burst.is-active') || []);
  const elongatedActiveSynapseCount = activeSynapses.filter((synapse) => {
    const style = getComputedStyle(synapse);
    return Number(style.opacity) >= .9
      && style.strokeDasharray !== 'none'
      && Number(synapse.getAttribute('pathLength')) === 100
      && synapse.getTotalLength() >= 12;
  }).length;
  return {
    documentReady: document.readyState,
    ready: root?.dataset?.aquaPreviewReady || '',
    compactConversation: Boolean(sentinel?.classList.contains('aqua-conversation-active')),
    heroArtOpacity: heroArtStyle ? Number(heroArtStyle.opacity) : 1,
    heroBeforeDisplay: heroBeforeStyle?.display || '',
    heroAfterDisplay: heroAfterStyle?.display || '',
    voiceCoreAnimation: voiceCoreStyle?.animationName || '',
    voiceHorizontalShotAnimation: voiceBeforeStyle?.animationName || '',
    voiceVerticalShotAnimation: voiceAfterStyle?.animationName || '',
    aquaPresenceVisible: Boolean(aquaPresenceStyle && aquaPresenceStyle.display !== 'none' && Number(aquaPresenceStyle.opacity) > .5),
    phase: root?.dataset?.aquaNeuralPhase || '',
    stagePhase: stage?.dataset?.phase || '',
    morphProgress: stage?.dataset?.morphProgress || '',
    referenceComposition: stage?.dataset?.referenceComposition || '',
    referenceState: stage?.dataset?.referenceState || '',
    selectedApp: stage?.dataset?.selectedApp || '',
    materialized: materialized?.dataset?.neuralMaterialized || '',
    materializationOpacity: materializationStyle ? Number(materializationStyle.opacity) : 0,
    materializationWidth: materializationBounds?.width || 0,
    materializationTransform: materializationStyle?.transform || '',
    morphShellOpacity: morphShellStyle ? Number(morphShellStyle.opacity) : 0,
    morphShellWidth: morphShellBounds?.width || 0,
    returnedDocumentWidth: returnedDocumentBounds?.width || 0,
    openFileWidth: openFileBounds?.width || 0,
    openFileTextFits: openFile ? openFile.scrollWidth <= openFile.clientWidth + 1 : false,
    visiblePortals: visiblePortals.length,
    fixedPortals: stage?.dataset?.fixedPortals || '',
    focusName: stage?.querySelector('[data-neural-focus-name]')?.textContent?.trim() || '',
    selectedPortalIndex: Number.isFinite(selectedPortalIndex) ? selectedPortalIndex : -1,
    activeTetherCount: activeTetherIndexes.length,
    activeTetherIndex: activeTetherIndexes.length === 1 ? activeTetherIndexes[0] : -1,
    elongatedActiveSynapseCount,
    neuralNetworkOpacity: stage?.querySelector('.neural-network') ? Number(getComputedStyle(stage.querySelector('.neural-network')).opacity) : 0,
    continuationVisible: Boolean(stage?.querySelector('.neural-continuation') && Number(getComputedStyle(stage.querySelector('.neural-continuation')).opacity) > .5),
    aquaMarkAnimation: aquaMark ? getComputedStyle(aquaMark).animationName : '',
    portalImagesLoaded: visiblePortals.every((portal) => {
      const image = portal.querySelector('.portal-node > img');
      return image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
    }),
    portalArtworkContained: visiblePortals.every((portal) => {
      const node = portal.querySelector('.portal-node');
      const image = portal.querySelector('.portal-node > img');
      if (!node || !image) return false;
      const nodeBounds = node.getBoundingClientRect();
      const imageBounds = image.getBoundingClientRect();
      return imageBounds.left >= nodeBounds.left - 1
        && imageBounds.top >= nodeBounds.top - 1
        && imageBounds.right <= nodeBounds.right + 1
        && imageBounds.bottom <= nodeBounds.bottom + 1;
    }),
    substrateDisplay: substrate ? getComputedStyle(substrate).display : '',
    beforeUsesRaster: Boolean(beforeStyle?.backgroundImage?.includes('url(')),
    afterUsesRaster: Boolean(afterStyle?.backgroundImage?.includes('url(')),
    beforeUsesLiveSubstrate: Boolean(beforeStyle?.backgroundImage?.includes('neural-link-live-substrate-v080.png')),
    afterUsesLiveSubstrate: Boolean(afterStyle?.backgroundImage?.includes('neural-link-live-substrate-v080.png')),
    beforeOpacity: beforeStyle ? Number(beforeStyle.opacity) : 0,
    afterOpacity: afterStyle ? Number(afterStyle.opacity) : 0,
    stageUsesRaster: Boolean(stageStyle?.backgroundImage?.includes('url(')),
    imageFailures: Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth <= 0)
      .map((image) => image.currentSrc || image.src),
  };
})()`;

async function settlePage(connection, sessionId) {
  await evaluate(connection, sessionId, `(async () => {
    if (document.readyState !== 'complete') {
      await new Promise((resolveLoad) => window.addEventListener('load', resolveLoad, { once: true }));
    }
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all(Array.from(document.images).map(async (image) => {
      if (!image.complete) {
        await new Promise((resolveImage) => {
          image.addEventListener('load', resolveImage, { once: true });
          image.addEventListener('error', resolveImage, { once: true });
        });
      }
      if (typeof image.decode === 'function') await image.decode().catch(() => {});
    }));
    for (const animation of document.getAnimations()) {
      try {
        if (animation.id === 'aqua-neural-materialization-box'
          || animation.id === 'aqua-neural-materialization-content') continue;
        const timing = animation.effect?.getComputedTiming?.();
        if (Number.isFinite(timing?.endTime) && animation.playState !== 'finished') animation.finish();
      } catch (_) {}
    }
    await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
    return true;
  })()`);
}

async function waitForExpectedState(connection, sessionId, definition) {
  const deadline = Date.now() + 8_000;
  let state;
  while (Date.now() <= deadline) {
    await settlePage(connection, sessionId);
    state = await evaluate(connection, sessionId, stateExpression);
    const expected = state.documentReady === "complete"
      && state.ready === definition.ready
      && (!definition.phase || (state.phase === definition.phase && state.stagePhase === definition.phase))
      && (!definition.morphProgress || state.morphProgress === definition.morphProgress)
      && (!definition.referenceState || state.referenceState === definition.referenceState)
      && (!definition.selectedApp || state.selectedApp === definition.selectedApp)
      && (!definition.materialized || state.materialized === definition.materialized)
      && (definition.ready !== "neural" || state.referenceComposition === "live-neural-substrate-v080")
      && (definition.ready !== "neural" || (state.beforeUsesLiveSubstrate && state.afterUsesLiveSubstrate))
      && (definition.ready !== "neural" || state.neuralNetworkOpacity >= .75)
      && (definition.ready !== "neural" || state.continuationVisible)
      && (!definition.visiblePortals || state.visiblePortals === definition.visiblePortals)
      && (!definition.visiblePortals || state.portalImagesLoaded)
      && (!definition.visiblePortals || state.portalArtworkContained)
      && (!definition.visiblePortals || state.fixedPortals === "true")
      && (!definition.visiblePortals || state.substrateDisplay === "none")
      && (!definition.visiblePortals || !state.stageUsesRaster)
      && state.imageFailures.length === 0
      // Retired proof contract marker (non-executable): state.joltOpacity >= .6
      && (definition.phase !== "selecting" || (
        state.focusName === "Aqua Receipts"
        && state.activeTetherCount === 1
        && state.activeTetherIndex === state.selectedPortalIndex
      ))
      && (definition.phase !== "firing" || (
        state.activeTetherCount === 1
        && state.activeTetherIndex === state.selectedPortalIndex
        && state.elongatedActiveSynapseCount >= 1
      ))
      && (!definition.materialized
        || (definition.materialized === "pending"
          ? state.afterOpacity > .1 && state.referenceState === "morphed"
          : state.materializationOpacity >= .98 && state.materializationWidth > 0))
      && (!definition.compactConversation || (
        state.compactConversation
        && state.heroArtOpacity <= .01
        && state.heroBeforeDisplay === "none"
        && state.heroAfterDisplay === "none"
        && state.voiceCoreAnimation.includes("aqua-orb-axis-pulse")
        && state.voiceHorizontalShotAnimation.includes("aqua-orb-shot-x")
        && state.voiceVerticalShotAnimation.includes("aqua-orb-shot-y")
        && state.aquaPresenceVisible
      ));
    const fullMaterializationReady = !definition.fullMaterialization || (
      state.materializationTransform === 'none'
        && state.returnedDocumentWidth >= state.materializationWidth * .7
        && state.openFileWidth >= state.materializationWidth * .7
        && state.openFileTextFits
    );
    if (expected && fullMaterializationReady) return state;
    await delay(40);
  }
  throw new Error(`${definition.name} did not settle into its required visual state: ${JSON.stringify(state)}`);
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  await Promise.all([
    mkdir(options.outputDirectory, { recursive: true }),
    mkdir(options.evidenceDirectory, { recursive: true }),
  ]);
  const temporaryRoot = process.env.RUNNER_TEMP
    ? resolve(process.env.RUNNER_TEMP)
    : options.evidenceDirectory;
  await mkdir(temporaryRoot, { recursive: true });
  const chromeProfile = await mkdtemp(join(temporaryRoot, ".aqua-visual-proof-"));
  const stderrLog = [];
  const evidence = [];
  let browser;
  let connection;

  try {
    browser = spawn(options.chrome, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--remote-debugging-port=0",
      `--user-data-dir=${chromeProfile}`,
      "about:blank",
    ], { stdio: ["ignore", "ignore", "pipe"] });

    const webSocketUrl = await waitForDevTools(browser, stderrLog);
    connection = new CdpConnection(webSocketUrl);
    await connection.open();
    const target = await connection.send("Target.createTarget", { url: "about:blank" });
    const attached = await connection.send("Target.attachToTarget", {
      targetId: target.targetId,
      flatten: true,
    });
    const sessionId = attached.sessionId;
    await Promise.all([
      connection.send("Page.enable", {}, sessionId),
      connection.send("Runtime.enable", {}, sessionId),
      connection.send("Emulation.setDeviceMetricsOverride", {
        width: 430,
        height: 932,
        deviceScaleFactor: 1,
        mobile: true,
      }, sessionId),
    ]);

    const pageUrl = pathToFileURL(options.page);
    for (const definition of captureDefinitions()) {
      pageUrl.search = definition.query;
      await connection.send("Page.navigate", { url: pageUrl.href }, sessionId);
      const state = await waitForExpectedState(connection, sessionId, definition);
      const screenshot = await connection.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false,
      }, sessionId);
      assert(screenshot.data, `${definition.name} did not return screenshot bytes`);
      const outputPath = join(options.outputDirectory, definition.output);
      const screenshotBuffer = Buffer.from(screenshot.data, "base64");
      if (definition.fullMaterialization) {
        const resultDocumentPixelMean = pngRegionMean(screenshotBuffer, {
          x: 145,
          y: 210,
          width: 230,
          height: 500,
        });
        assert.ok(
          resultDocumentPixelMean >= .28,
          `Final Neuralink document pixel mean ${resultDocumentPixelMean.toFixed(6)} indicates a black or missing result`,
        );
        state.resultDocumentPixelMean = resultDocumentPixelMean;
        process.stdout.write(`AQUA_RESULT_DOCUMENT_PIXEL_GATE mean=${resultDocumentPixelMean.toFixed(6)}\n`);
      }
      await writeFile(outputPath, screenshotBuffer);
      evidence.push({ ...definition, state, outputPath });
      process.stdout.write(`AQUA_DETERMINISTIC_VISUAL_CAPTURED name=${definition.name} phase=${state.phase || definition.ready} morph=${state.morphProgress || "n/a"}\n`);
    }

    await writeFile(
      join(options.evidenceDirectory, "deterministic-captures.json"),
      `${JSON.stringify({ clock: "devtools-state-settled", captures: evidence }, null, 2)}\n`,
    );
    process.stdout.write(`AQUA_DETERMINISTIC_VISUAL_PROOF_RENDERED captures=${evidence.length} viewport=430x932\n`);
  } catch (error) {
    await writeFile(join(options.evidenceDirectory, "deterministic-capture-failure.json"), `${JSON.stringify({
      error: error instanceof Error ? error.stack : String(error),
      captures: evidence,
      chromeStderr: stderrLog.join("").slice(-12_000),
    }, null, 2)}\n`);
    throw error;
  } finally {
    if (connection) connection.close();
    if (browser && browser.exitCode === null) {
      browser.kill("SIGTERM");
      await Promise.race([
        new Promise((resolveExit) => browser.once("exit", resolveExit)),
        delay(2_000),
      ]);
      if (browser.exitCode === null) {
        browser.kill("SIGKILL");
        await Promise.race([
          new Promise((resolveExit) => browser.once("exit", resolveExit)),
          delay(2_000),
        ]);
      }
    }
    await rm(chromeProfile, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
