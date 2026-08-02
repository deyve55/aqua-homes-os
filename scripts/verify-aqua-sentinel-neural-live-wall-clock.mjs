#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";

const PHASE_DEADLINES_MILLIS = Object.freeze({
  rotating: 2_000,
  firing: 4_000,
  transitioning: 6_000,
  result: 9_000,
});

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

const browserStateExpression = `(() => {
  const root = document.documentElement;
  const stage = document.querySelector('.neural-stage');
  const materialized = document.querySelector('[data-neural-materialized]');
  return {
    ready: root?.dataset?.aquaPreviewReady || '',
    phase: root?.dataset?.aquaNeuralPhase || '',
    stagePhase: stage?.dataset?.phase || '',
    motion: stage?.dataset?.motion || '',
    morphProgress: stage?.dataset?.morphProgress || '',
    thought: document.querySelector('[data-neural-thought]')?.textContent?.trim() || '',
    detail: document.querySelector('[data-neural-thought-detail]')?.textContent?.trim() || '',
    materialized: materialized?.dataset?.neuralMaterialized || '',
    materializationPhase: materialized?.dataset?.materializationPhase || '',
    materializationKind: materialized?.dataset?.materializationKind || '',
    receiptVisible: Boolean(document.querySelector('.neural-materialization-approved.is-receipt')),
    focusName: document.querySelector('[data-neural-focus-name]')?.textContent?.trim() || '',
  };
})()`;

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
        && restingState.stagePhase === "rest") break;
      await delay(25);
    }
    assert.equal(restingState?.ready, "neural", "Neural preview did not become ready");
    assert.equal(restingState?.phase, "rest", "Live proof must begin from the real resting state");
    const portalTriggered = await evaluate(connection, sessionId, `(() => {
      const portal = document.querySelector('[data-neural-portal="6"]');
      if (!portal) return false;
      portal.click();
      return true;
    })()`);
    assert.equal(portalTriggered, true, "Aqua Receipts portal could not be triggered");
    const sequenceStartedAt = performance.now();
    let lastPhase = "";

    for (const expectedPhase of ["rotating", "firing", "transitioning", "result"]) {
      const deadline = sequenceStartedAt + PHASE_DEADLINES_MILLIS[expectedPhase];
      let state;
      let lastEvaluationError = "";
      while (performance.now() <= deadline) {
        try {
          state = await evaluate(connection, sessionId, browserStateExpression);
          lastEvaluationError = "";
        } catch (error) {
          lastEvaluationError = error instanceof Error ? error.message : String(error);
          await delay(25);
          continue;
        }
        const elapsedMillis = Math.round(performance.now() - sequenceStartedAt);
        if (state.phase !== lastPhase) {
          timeline.push({ elapsedMillis, ...state });
          lastPhase = state.phase;
        }
        if (state.ready === "neural" && state.phase === expectedPhase && state.stagePhase === expectedPhase) {
          const checkpoint = { elapsedMillis, ...state };
          timeline.push({ checkpoint: true, ...checkpoint });
          await saveCheckpoint(options.evidenceDirectory, expectedPhase, checkpoint);
          break;
        }
        await delay(25);
      }
      assert(state, `Could not read Neuralink state before ${expectedPhase}: ${lastEvaluationError}`);
      assert.equal(state?.ready, "neural", `Neural preview was not ready before ${expectedPhase}`);
      assert.equal(state?.phase, expectedPhase, `Live Neuralink did not reach ${expectedPhase} by its wall-clock deadline`);
      assert.equal(state?.stagePhase, expectedPhase, `Stage and root phase diverged at ${expectedPhase}`);
    }

    const rotating = timeline.find((entry) => entry.checkpoint && entry.phase === "rotating");
    const firing = timeline.find((entry) => entry.checkpoint && entry.phase === "firing");
    const transitioning = timeline.find((entry) => entry.checkpoint && entry.phase === "transitioning");
    const result = timeline.find((entry) => entry.checkpoint && entry.phase === "result");
    assert(rotating.elapsedMillis < firing.elapsedMillis, "Firing must follow rotating in real time");
    assert(firing.elapsedMillis < transitioning.elapsedMillis, "Transitioning must follow firing in real time");
    assert(transitioning.elapsedMillis < result.elapsedMillis, "Result must follow transitioning in real time");
    assert.equal(rotating.focusName, "Aqua Receipts");
    assert.match(firing.detail, /large upward neuron burst through the selected path/);
    assert.equal(transitioning.materialized, "pending");
    assert.equal(result.materialized, "true");
    assert.equal(result.materializationKind, "receipt");
    assert.equal(result.receiptVisible, true);

    await writeFile(join(options.evidenceDirectory, "timeline.json"), `${JSON.stringify({
      clock: "host-monotonic-wall-clock",
      url: options.url,
      deadlinesMillis: PHASE_DEADLINES_MILLIS,
      trigger: "bound-aqua-receipts-portal-click",
      totalElapsedMillis: Math.round(performance.now() - sequenceStartedAt),
      timeline,
    }, null, 2)}\n`);
    const finalDom = await evaluate(connection, sessionId, "document.documentElement.outerHTML");
    await writeFile(join(options.evidenceDirectory, "live-result.html"), finalDom);
    process.stdout.write(`AQUA_NEURAL_LIVE_WALL_CLOCK_VERIFIED phases=rotating,firing,transitioning,result total_ms=${result.elapsedMillis}\n`);
  } catch (error) {
    await writeFile(join(options.evidenceDirectory, "failure.json"), `${JSON.stringify({
      clock: "host-monotonic-wall-clock",
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
      if (browser.exitCode === null) browser.kill("SIGKILL");
    }
    await rm(chromeProfile, { recursive: true, force: true });
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
