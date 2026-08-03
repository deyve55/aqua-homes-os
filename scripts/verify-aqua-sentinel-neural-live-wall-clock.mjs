#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";

const ACK_BUDGET_MILLIS = 100;
const FIRING_DEADLINE_MILLIS = 700;
const RESULT_DEADLINE_MILLIS = 1_400;

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) continue;
    options[key.slice(2)] = argv[index + 1];
    index += 1;
  }
  assert(options.chrome, "--chrome is required");
  assert(options.url, "--url is required");
  assert(options["evidence-dir"], "--evidence-dir is required");
  return {
    chrome: resolve(options.chrome),
    url: options.url,
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
      }, 10_000);
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

const browserStateFunctionExpression = `() => {
  const root = document.documentElement;
  const stage = document.querySelector('.neural-stage');
  const materialized = document.querySelector('[data-neural-materialized]');
  const visiblePortals = Array.from(document.querySelectorAll('[data-portal-index]'))
    .filter((portal) => Number(getComputedStyle(portal).opacity) > .15);
  const jolt = document.querySelector('.neural-jolt');
  const joltBeam = document.querySelector('.neural-jolt > b');
  const substrate = document.querySelector('.neural-substrate-map');
  const beforeStyle = stage ? getComputedStyle(stage, '::before') : null;
  const afterStyle = stage ? getComputedStyle(stage, '::after') : null;
  const stageStyle = stage ? getComputedStyle(stage) : null;
  const aquaMark = document.querySelector('.neural-core .aqua-mark');
  const selectedPortal = document.querySelector('.neural-portal.is-primary');
  const selectedBounds = selectedPortal?.getBoundingClientRect();
  return {
    ready: root?.dataset?.aquaPreviewReady || '',
    phase: root?.dataset?.aquaNeuralPhase || '',
    stagePhase: stage?.dataset?.phase || '',
    motion: stage?.dataset?.motion || '',
    morphProgress: stage?.dataset?.morphProgress || '',
    referenceComposition: stage?.dataset?.referenceComposition || '',
    referenceState: stage?.dataset?.referenceState || '',
    selectedApp: stage?.dataset?.selectedApp || '',
    fixedPortals: stage?.dataset?.fixedPortals || '',
    acknowledged: stage?.dataset?.acknowledged || '',
    ackLatencyMillis: Number(stage?.dataset?.ackLatencyMillis || NaN),
    ackBudgetMillis: Number(stage?.dataset?.ackBudgetMillis || NaN),
    addedUiDelayMillis: Number(stage?.dataset?.addedUiDelayMillis || NaN),
    presentationBudgetMillis: Number(stage?.dataset?.presentationBudgetMillis || NaN),
    thought: document.querySelector('[data-neural-thought]')?.textContent?.trim() || '',
    detail: document.querySelector('[data-neural-thought-detail]')?.textContent?.trim() || '',
    materialized: materialized?.dataset?.neuralMaterialized || '',
    materializationPhase: materialized?.dataset?.materializationPhase || '',
    materializationKind: materialized?.dataset?.materializationKind || '',
    receiptVisible: Boolean(document.querySelector('.neural-materialization-approved.is-receipt')),
    focusName: document.querySelector('[data-neural-focus-name]')?.textContent?.trim() || '',
    selectedPortalTop: selectedBounds?.top || 0,
    visiblePortals: visiblePortals.length,
    visibleTravelers: Array.from(document.querySelectorAll('.neural-traveler')).filter((traveler) => {
      const style = getComputedStyle(traveler);
      const group = traveler.closest('.neural-route-group');
      return Number(style.opacity) > .15 && group && getComputedStyle(group).visibility !== 'hidden';
    }).length,
    portalsLoaded: visiblePortals.every((portal) => {
      const image = portal.querySelector('.portal-node > img');
      return image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
    }),
    joltOpacity: jolt ? Number(getComputedStyle(jolt).opacity) : 0,
    joltAnimation: joltBeam ? getComputedStyle(joltBeam).animationName : '',
    neuralNetworkOpacity: stage?.querySelector('.neural-network') ? Number(getComputedStyle(stage.querySelector('.neural-network')).opacity) : 0,
    continuationVisible: Boolean(stage?.querySelector('.neural-continuation') && Number(getComputedStyle(stage.querySelector('.neural-continuation')).opacity) > .5),
    aquaMarkOpacity: aquaMark ? Number(getComputedStyle(aquaMark).opacity) : 0,
    aquaMarkAnimation: aquaMark ? getComputedStyle(aquaMark).animationName : '',
    substrateDisplay: substrate ? getComputedStyle(substrate).display : '',
    usesRasterUnderlay: Boolean(stageStyle?.backgroundImage?.includes('url(')),
    usesPseudoRasterUnderlay: Boolean(beforeStyle?.backgroundImage?.includes('url(')),
    usesRasterCompositor: Boolean(afterStyle?.backgroundImage?.includes('url(')),
    usesOwnerRestReference: Boolean(beforeStyle?.backgroundImage?.includes('neural-link-reference-rest-owner-v077.png')),
    usesOwnerMorphReference: Boolean(afterStyle?.backgroundImage?.includes('neural-link-reference-morph-owner-v077.png')),
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
  };
}`;

const browserStateExpression = `(${browserStateFunctionExpression})()`;

const browserTimelineStateFunctionExpression = `() => {
  const root = document.documentElement;
  const stage = document.querySelector('.neural-stage');
  const materialized = document.querySelector('[data-neural-materialized]');
  const selectedPortal = document.querySelector('.neural-portal.is-primary');
  return {
    ready: root?.dataset?.aquaPreviewReady || '',
    phase: root?.dataset?.aquaNeuralPhase || '',
    stagePhase: stage?.dataset?.phase || '',
    motion: stage?.dataset?.motion || '',
    morphProgress: stage?.dataset?.morphProgress || '',
    referenceComposition: stage?.dataset?.referenceComposition || '',
    referenceState: stage?.dataset?.referenceState || '',
    selectedApp: stage?.dataset?.selectedApp || '',
    fixedPortals: stage?.dataset?.fixedPortals || '',
    declaredVisiblePortals: Number(stage?.dataset?.neuralVisiblePortals || NaN),
    acknowledged: stage?.dataset?.acknowledged || '',
    ackLatencyMillis: Number(stage?.dataset?.ackLatencyMillis || NaN),
    ackBudgetMillis: Number(stage?.dataset?.ackBudgetMillis || NaN),
    addedUiDelayMillis: Number(stage?.dataset?.addedUiDelayMillis || NaN),
    presentationBudgetMillis: Number(stage?.dataset?.presentationBudgetMillis || NaN),
    detail: document.querySelector('[data-neural-thought-detail]')?.textContent?.trim() || '',
    materialized: materialized?.dataset?.neuralMaterialized || '',
    materializationPhase: materialized?.dataset?.materializationPhase || '',
    materializationKind: materialized?.dataset?.materializationKind || '',
    receiptVisible: Boolean(document.querySelector('.neural-materialization-approved.is-receipt')),
    focusName: document.querySelector('[data-neural-focus-name]')?.textContent?.trim() || '',
    selectedPortalIsPrimary: Boolean(selectedPortal),
    joltPresent: Boolean(document.querySelector('.neural-jolt > b')),
  };
}`;

const installRendererTimelineExpression = `(() => {
  const readState = (${browserTimelineStateFunctionExpression});
  const root = document.documentElement;
  const recorder = {
    startedAt: 0,
    lastPhase: '',
    checkpoints: [],
    observer: null,
    capture() {
      if (!this.startedAt) return;
      const state = readState();
      if (!state.phase || state.phase === 'rest') return;
      const completeResult = state.phase === 'result' && state.materialized === 'true';
      if (state.phase === this.lastPhase && !completeResult) return;
      const prior = this.checkpoints.find((entry) => entry.phase === state.phase);
      if (prior && (state.phase !== 'result' || prior.materialized === 'true')) return;
      const checkpoint = {
        checkpoint: true,
        elapsedMillis: Math.round(performance.now() - this.startedAt),
        ...state,
      };
      if (prior) this.checkpoints.splice(this.checkpoints.indexOf(prior), 1, checkpoint);
      else this.checkpoints.push(checkpoint);
      this.lastPhase = state.phase;
    },
    start() {
      this.startedAt = performance.now();
      this.observer = new MutationObserver(() => this.capture());
      this.observer.observe(root, {
        attributes: true,
        subtree: true,
        attributeFilter: [
          'data-aqua-neural-phase',
          'data-phase',
          'data-neural-materialized',
          'data-materialization-phase',
        ],
      });
    },
    snapshot() {
      return {
        elapsedMillis: Math.round(performance.now() - this.startedAt),
        checkpoints: this.checkpoints,
      };
    },
  };
  window.__aquaNeuralWallClockRecorder = recorder;
  return true;
})()`;

const waitForRendererTimelineExpression = `new Promise((resolveTimeline) => {
  const recorder = window.__aquaNeuralWallClockRecorder;
  const inspect = () => {
    const snapshot = recorder.snapshot();
    const result = snapshot.checkpoints.find((entry) => entry.phase === 'result'
      && entry.materialized === 'true');
    if (result || snapshot.elapsedMillis >= ${RESULT_DEADLINE_MILLIS}) {
      recorder.observer?.disconnect();
      resolveTimeline(snapshot);
      return;
    }
    requestAnimationFrame(inspect);
  };
  inspect();
})`;

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

async function saveCheckpoint(evidenceDirectory, phase, state) {
  await writeFile(
    join(evidenceDirectory, `live-${phase}.json`),
    `${JSON.stringify(state, null, 2)}\n`,
  );
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  await mkdir(options.evidenceDirectory, { recursive: true });
  const temporaryRoot = process.env.RUNNER_TEMP
    ? resolve(process.env.RUNNER_TEMP)
    : options.evidenceDirectory;
  await mkdir(temporaryRoot, { recursive: true });
  const chromeProfile = await mkdtemp(join(temporaryRoot, ".aqua-neural-wall-clock-"));
  const stderrLog = [];
  const timeline = [];
  let browser;
  let connection;
  let sessionId;
  const wallClockStartedAt = performance.now();

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
    sessionId = attached.sessionId;
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

    await connection.send("Page.navigate", { url: options.url }, sessionId);
    const readyDeadline = performance.now() + 3_000;
    let restingState;
    while (performance.now() <= readyDeadline) {
      try {
        restingState = await evaluate(connection, sessionId, browserStateExpression);
      } catch {
        await delay(25);
        continue;
      }
      if (restingState.ready === "neural"
        && restingState.phase === "rest"
        && restingState.stagePhase === "rest"
        && restingState.fixedPortals === "true"
        && restingState.visiblePortals === 7
        && restingState.portalsLoaded === true
        && restingState.portalArtworkContained === true) break;
      await delay(25);
    }
    assert.equal(restingState?.ready, "neural", "Neural preview did not become ready");
    assert.equal(restingState?.phase, "rest", "Live proof must begin from the real resting state");
    assert.equal(restingState?.visiblePortals, 7, "The owner-reference screen must expose seven fixed portals");
    assert.equal(restingState?.fixedPortals, "true", "The app portals must not use carousel motion");
    assert.equal(restingState?.portalsLoaded, true, "Every visible portal must contain loaded application artwork");
    assert.equal(restingState?.portalArtworkContained, true, "Application artwork escaped a black portal");
    assert.equal(restingState?.usesRasterUnderlay, false, "The live stage itself must remain a composited operating surface");
    assert.equal(restingState?.usesOwnerRestReference, true, "Dave's exact rest composition is not installed");
    assert.equal(restingState?.usesOwnerMorphReference, true, "Dave's exact morph composition is not installed");
    assert.equal(restingState?.referenceComposition, "owner-rest-and-morph-v077");
    assert.equal(restingState?.referenceState, "rest");
    assert.equal(restingState?.substrateDisplay, "none", "The legacy mechanical substrate must stay hidden");
    assert.ok(restingState?.neuralNetworkOpacity >= .75, "The always-on cyan/gold mind is too faint");
    assert.equal(restingState?.continuationVisible, true, "The live Ask Aqua continuation control is missing");
    const travelerBefore = await evaluate(connection, sessionId, `Array.from(document.querySelectorAll('.neural-traveler')).filter((traveler) => getComputedStyle(traveler.closest('.neural-route-group')).visibility !== 'hidden').map((traveler) => { const bounds = traveler.getBoundingClientRect(); return [bounds.left, bounds.top]; })`);
    await delay(160);
    const travelerAfter = await evaluate(connection, sessionId, `Array.from(document.querySelectorAll('.neural-traveler')).filter((traveler) => getComputedStyle(traveler.closest('.neural-route-group')).visibility !== 'hidden').map((traveler) => { const bounds = traveler.getBoundingClientRect(); return [bounds.left, bounds.top]; })`);
    assert.ok(
      travelerBefore.some((position, index) => Math.hypot(position[0] - travelerAfter[index][0], position[1] - travelerAfter[index][1]) > .5),
      "Cyan and gold synapses must remain visibly alive while the portals stay fixed",
    );

    const recorderInstalled = await evaluate(
      connection,
      sessionId,
      installRendererTimelineExpression,
    );
    assert.equal(recorderInstalled, true, "The renderer wall-clock recorder could not be installed");
    const portalTriggered = await evaluate(connection, sessionId, `(() => {
      const portal = document.querySelector('[data-neural-portal="6"]');
      if (!portal) return { triggered: false };
      window.__aquaNeuralWallClockRecorder.start();
      const startedAt = performance.now();
      portal.click();
      const stage = document.querySelector('.neural-stage');
      return {
        triggered: true,
        handlerMillis: performance.now() - startedAt,
        phase: stage?.dataset?.phase || '',
        acknowledged: stage?.dataset?.acknowledged || '',
        ackLatencyMillis: Number(stage?.dataset?.ackLatencyMillis || NaN),
        addedUiDelayMillis: Number(stage?.dataset?.addedUiDelayMillis || NaN),
        presentationBudgetMillis: Number(stage?.dataset?.presentationBudgetMillis || NaN),
      };
    })()`);
    assert.equal(portalTriggered?.triggered, true, "Aqua Receipts portal could not be triggered");
    assert.equal(portalTriggered?.phase, "selecting", "The selected app was not acknowledged immediately");
    assert.equal(portalTriggered?.acknowledged, "true", "The app request was not acknowledged in the same handler");
    assert.equal(portalTriggered?.addedUiDelayMillis, 0, "The request path still contains an artificial dispatch delay");
    assert.equal(portalTriggered?.presentationBudgetMillis, 960, "The visible select, fire, and morph sequence exceeded one second by design");
    assert.ok(portalTriggered?.ackLatencyMillis <= ACK_BUDGET_MILLIS, `Acknowledgment exceeded ${ACK_BUDGET_MILLIS}ms`);
    assert.ok(portalTriggered?.handlerMillis <= ACK_BUDGET_MILLIS, `Portal handler exceeded ${ACK_BUDGET_MILLIS}ms`);
    const rendererTimeline = await evaluate(
      connection,
      sessionId,
      waitForRendererTimelineExpression,
    );
    const rendererResultIndex = rendererTimeline.checkpoints.findIndex(
      (checkpoint) => checkpoint.phase === "result" && checkpoint.materialized === "true",
    );
    if (rendererResultIndex >= 0) {
      const resultVisualState = await evaluate(connection, sessionId, browserStateExpression);
      const rendererResult = rendererTimeline.checkpoints[rendererResultIndex];
      rendererTimeline.checkpoints[rendererResultIndex] = {
        ...rendererResult,
        ...resultVisualState,
        checkpoint: true,
        elapsedMillis: rendererResult.elapsedMillis,
      };
    }
    const phaseCheckpoints = new Map(
      rendererTimeline.checkpoints.map((checkpoint) => [checkpoint.phase, checkpoint]),
    );
    timeline.push(...rendererTimeline.checkpoints);
    for (const checkpoint of rendererTimeline.checkpoints) {
      await saveCheckpoint(options.evidenceDirectory, checkpoint.phase, checkpoint);
    }

    const selecting = phaseCheckpoints.get("selecting");
    const firing = phaseCheckpoints.get("firing");
    const transitioning = phaseCheckpoints.get("transitioning");
    const result = phaseCheckpoints.get("result");
    assert(selecting, "The selected app did not materialize into the fixed top portal");
    assert(firing, "The clean firing phase was not visible");
    assert(transitioning, "The portal-to-result morph was not visible");
    assert(result, `The result did not appear within ${RESULT_DEADLINE_MILLIS}ms`);
    assert.ok(firing.elapsedMillis <= FIRING_DEADLINE_MILLIS, "The upward firing pulse started too late");
    assert.ok(result.elapsedMillis <= RESULT_DEADLINE_MILLIS, "The complete visual response exceeded its bound");
    assert.ok(selecting.elapsedMillis < firing.elapsedMillis, "Firing must follow the fixed-portal materialization");
    assert.ok(firing.elapsedMillis < transitioning.elapsedMillis, "The result morph must follow the upward firing pulse");
    assert.ok(transitioning.elapsedMillis < result.elapsedMillis, "The morph must finish before the result state");
    assert.equal(selecting.focusName, "Aqua Receipts");
    assert.equal(selecting.selectedPortalIsPrimary, true, "Aqua Receipts was not promoted to the primary portal");
    assert.equal(selecting.declaredVisiblePortals, 7, "The live owner-reference portal contract changed during selection");
    assert.match(firing.detail, /cyan-and-gold signal upward with a visible tail/);
    assert.equal(firing.joltPresent, true, "The firing phase removed Aqua's upward shot element");
    assert.equal(transitioning.materialized, "pending");
    assert.equal(result.materialized, "true");
    assert.equal(result.materializationKind, "receipts");
    assert.equal(result.receiptVisible, true);
    assert.equal(result.visiblePortals, 0, "The clean result surface must not sit over portal clutter");
    assert.equal(result.referenceState, "morphed");
    assert.ok(result.neuralNetworkOpacity >= .75, "Neural traffic disappeared after the operating-surface morph");
    assert.equal(result.continuationVisible, true, "Keep talking to Aqua disappeared after morph");

    await writeFile(join(options.evidenceDirectory, "timeline.json"), `${JSON.stringify({
      clock: "renderer-monotonic-wall-clock",
      url: options.url,
      ackBudgetMillis: ACK_BUDGET_MILLIS,
      firingDeadlineMillis: FIRING_DEADLINE_MILLIS,
      resultDeadlineMillis: RESULT_DEADLINE_MILLIS,
      trigger: "bound-aqua-receipts-portal-click",
      totalElapsedMillis: result.elapsedMillis,
      timeline,
    }, null, 2)}\n`);
    const finalDom = await evaluate(connection, sessionId, "document.documentElement.outerHTML");
    await writeFile(join(options.evidenceDirectory, "live-result.html"), finalDom);
    process.stdout.write(`AQUA_NEURAL_OWNER_REFERENCE_VERIFIED portals=7 neural_motion=continuous dispatch_delay_ms=0 phases=selecting,firing,transitioning,result total_ms=${result.elapsedMillis}\n`);
  } catch (error) {
    await writeFile(join(options.evidenceDirectory, "failure.json"), `${JSON.stringify({
      clock: "renderer-monotonic-wall-clock",
      error: error instanceof Error ? error.stack : String(error),
      elapsedMillis: Math.round(performance.now() - wallClockStartedAt),
      timeline,
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
    await delay(250);
    try {
      await rm(chromeProfile, {
        recursive: true,
        force: true,
        maxRetries: 12,
        retryDelay: 120,
      });
    } catch (error) {
      process.stderr.write(`AQUA_NEURAL_CLEANUP_WARNING ${error instanceof Error ? error.message : String(error)}\n`);
    }
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
