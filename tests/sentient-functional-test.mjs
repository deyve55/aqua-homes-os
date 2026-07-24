import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("functional surface removes simulated phone status and screenshot deck", async () => {
  const html = await read("sentient-os-web/index.html");
  assert.doesNotMatch(html, /5G|98%|9:41|ui-header|ui-deck|ui-alerts|ui-nav/);
  assert.match(html, /Dave · Owner/);
  assert.match(html, /id="cardLayers"/);
  assert.match(html, /id="checkInformation"/);
});

test("all command and intelligence controls are real buttons", async () => {
  const [html, script] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
  ]);
  assert.match(html, /id="voiceButton"/);
  assert.match(html, /id="budgetPanel"/);
  assert.match(html, /id="riskPanel"/);
  assert.match(script, /document\.createElement\("button"\)/);
  assert.match(script, /button\.onclick=/);
  assert.match(script, /onpointerup/);
});

test("Aqua supports speech, card control, summaries, and visible checks", async () => {
  const script = await read("sentient-os-web/app.js");
  assert.match(script, /AquaBridge\?\.startListening/);
  assert.match(script, /AquaBridge\?\.speak/);
  assert.match(script, /function commandResponse/);
  assert.match(script, /function checkCurrent/);
  assert.match(script, /Demo check complete/);
  assert.match(script, /openCard/);
  assert.match(script, /rotate/);
});

test("test build does not expose a provider key or pretend live data is connected", async () => {
  const files = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
  ]);
  const source = files.join("\n");
  assert.doesNotMatch(source, /sk-(?:proj-)?[A-Za-z0-9_-]{16,}/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.match(source, /Demonstration data/);
  assert.match(source, /local demonstration register/);
});
