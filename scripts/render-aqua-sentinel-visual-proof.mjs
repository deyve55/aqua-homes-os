#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const MORPH_CHECKPOINTS = Object.freeze([
  ["00", 2600, "0.054"],
  ["01", 3000, "0.208"],
  ["02", 3400, "0.362"],
  ["03", 3800, "0.515"],
  ["04", 4200, "0.669"],
  ["05", 4600, "0.823"],
  ["06", 5000, "0.977"],
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
      output: "AquaSentinelOS-v0.7.4-launch-proof.png",
    },
    {
      name: "neural-rest",
      query: "preview=neural&neuralDemo=rest",
      ready: "neural",
      phase: "rest",
      visiblePortals: 5,
      output: "AquaSentinelOS-v0.7.4-Neural-Link-Rest-closed-phone.png",
    },
    {
      name: "neural-rotate",
      query: "preview=neural&neuralDemo=sequence&neuralAt=750",
      ready: "neural",
      phase: "rotating",
      visiblePortals: 5,
      output: "AquaSentinelOS-v0.7.4-Neural-Link-Rotate-closed-phone.png",
    },
    {
      name: "neural-fire",
      query: "preview=neural&neuralDemo=sequence&neuralAt=1750",
      ready: "neural",
      phase: "firing",
      visiblePortals: 5,
      output: "AquaSentinelOS-v0.7.4-Neural-Link-Fire-closed-phone.png",
    },
    {
      name: "neural-morph",
      query: "preview=neural&neuralDemo=sequence&neuralAt=3500",
      ready: "neural",
      phase: "transitioning",
      morphProgress: "0.400",
      materialized: "pending",
      visiblePortals: 5,
      output: "AquaSentinelOS-v0.7.4-Neural-Link-Morph-closed-phone.png",
    },
    {
      name: "neural-result",
      query: "preview=neural&neuralDemo=sequence&neuralAt=5600",
      ready: "neural",
      phase: "result",
      morphProgress: "1.000",
      materialized: "true",
      visiblePortals: 5,
      output: "AquaSentinelOS-v0.7.4-Neural-Link-Result-closed-phone.png",
    },
    ...MORPH_CHECKPOINTS.map(([name, neuralAt, morphProgress]) => ({
      name: `neural-morph-${name}`,
      query: `preview=neural&neuralDemo=sequence&neuralAt=${neuralAt}`,
      ready: "neural",
      phase: "transitioning",
      morphProgress,
      materialized: "pending",
      visiblePortals: 5,
      output: `AquaSentinelOS-v0.7.4-Neural-Link-Morph-${name}.png`,
    })),
    {
      name: "command",
      query: "preview=command",
      ready: "command",
      output: "AquaSentinelOS-v0.7.4-Command-Center-closed-phone.png",
    },
    {
      name: "settings",
      query: "preview=settings",
      ready: "settings",
      output: "AquaSentinelOS-v0.7.4-Settings-closed-phone.png",
    },
  ];
}

const stateExpression = `(() => {
  const root = document.documentElement;
  const stage = document.querySelector('.neural-stage');
  const materialized = document.querySelector('[data-neural-materialized]');
  const materialization = materialized;
  const materializationStyle = materialization ? getComputedStyle(materialization) : null;
  const materializationBounds = materialization?.getBoundingClientRect();
  const visiblePortals = Array.from(document.querySelectorAll('[data-portal-index]'))
    .filter((portal) => {
      const style = getComputedStyle(portal);
      const bounds = portal.getBoundingClientRect();
      return Number(style.opacity) > .15 && style.visibility !== 'hidden' && bounds.width > 0 && bounds.height > 0;
    });
  const beforeStyle = stage ? getComputedStyle(stage, '::before') : null;
  const afterStyle = stage ? getComputedStyle(stage, '::after') : null;
  const substrate = stage?.querySelector('.neural-substrate-map');
  return {
    documentReady: document.readyState,
    ready: root?.dataset?.aquaPreviewReady || '',
    phase: root?.dataset?.aquaNeuralPhase || '',
    stagePhase: stage?.dataset?.phase || '',
    morphProgress: stage?.dataset?.morphProgress || '',
    materialized: materialized?.dataset?.neuralMaterialized || '',
    materializationOpacity: materializationStyle ? Number(materializationStyle.opacity) : 0,
    materializationWidth: materializationBounds?.width || 0,
    visiblePortals: visiblePortals.length,
    portalImagesContained: visiblePortals.every((portal) => {
      const image = portal.querySelector('.portal-node > img');
      return image && getComputedStyle(image).objectFit === 'contain';
    }),
    substrateDisplay: substrate ? getComputedStyle(substrate).display : '',
    beforeUsesRaster: Boolean(beforeStyle?.backgroundImage?.includes('url(')),
    afterUsesRaster: Boolean(afterStyle?.backgroundImage?.includes('url(')),
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
      && (!definition.materialized || state.materialized === definition.materialized)
      && (!definition.visiblePortals || state.visiblePortals === definition.visiblePortals)
      && (!definition.visiblePortals || state.portalImagesContained)
      && (!definition.visiblePortals || state.substrateDisplay === "none")
      && (!definition.visiblePortals || (!state.beforeUsesRaster && !state.afterUsesRaster))
      && state.imageFailures.length === 0
      && (!definition.materialized
        || (state.materializationOpacity >= 0.98 && state.materializationWidth > 0));
    if (expected) return state;
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
      await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
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
      if (browser.exitCode === null) browser.kill("SIGKILL");
    }
    await rm(chromeProfile, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
