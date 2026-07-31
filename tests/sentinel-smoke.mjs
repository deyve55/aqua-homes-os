import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("Sentinel role proof contains the approved Aqua structure", async () => {
  const html = await read("sentinel-app/index.html");

  assert.match(html, /architectural-a/);
  assert.match(html, /voice-plane-left/);
  assert.match(html, /voice-plane-right/);
  assert.match(html, /voice-plane-up/);
  assert.match(html, /data-app-orbit/);
  assert.match(html, /data-deck-track/);
  assert.match(html, /Sample data · Development/);
  assert.match(html, /Microphone activates only when requested/);
});

test("Aqua role states and Davy greeting are present", async () => {
  const script = await read("sentinel-app/app.js");

  for (const state of ["idle", "listening", "thinking", "speaking"]) {
    assert.match(script, new RegExp(`${state}:`));
  }

  assert.match(script, /Good morning, Davy/);
  assert.match(script, /window\.AquaNative\.listen/);
  assert.match(script, /window\.AquaNative\.speak/);
  assert.match(script, /onNativeWord/);
});

test("Frontend does not contain provider secrets or direct API calls", async () => {
  const files = await Promise.all(
    ["sentinel-app/index.html", "sentinel-app/app.js", "sentinel-app/styles.css"].map(read),
  );
  const source = files.join("\n");

  assert.doesNotMatch(source, /sk-(?:proj-)?[A-Za-z0-9_-]{16,}/);
  assert.doesNotMatch(source, /OPENAI_API_KEY/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
});

test("Public role proof contains no customer-like demo records", async () => {
  const source = `${await read("sentinel-app/index.html")}\n${await read("sentinel-app/app.js")}`;

  assert.match(source, /Not connected/);
  assert.doesNotMatch(source, /Riverside Addition/i);
  assert.doesNotMatch(source, /\$[\d,.]+[KMB]?/);
  assert.doesNotMatch(source, /\bTomorrow\b/);
});

test("Android bridge is on-demand and offline-first", async () => {
  const [manifest, activity, appBuild] = await Promise.all([
    read("android/app/src/main/AndroidManifest.xml"),
    read("android/app/src/main/java/com/aquahomes/sentinel/MainActivity.java"),
    read("android/app/build.gradle"),
  ]);

  assert.match(manifest, /android\.permission\.RECORD_AUDIO/);
  assert.doesNotMatch(manifest, /android\.permission\.INTERNET/);
  assert.match(activity, /EXTRA_PREFER_OFFLINE/);
  assert.match(activity, /UtteranceProgressListener/);
  assert.match(activity, /onRangeStart/);
  assert.doesNotMatch(activity, /setAllowUniversalAccessFromFileURLs\(true\)/);
  assert.match(appBuild, /assets\.srcDirs = \["\.\.\/\.\.\/sentinel-app"\]/);
});

test("Every outgoing word can restart the directional voice pulse", async () => {
  const [script, styles] = await Promise.all([
    read("sentinel-app/app.js"),
    read("sentinel-app/styles.css"),
  ]);

  assert.match(script, /onNativeWord\(start\)/);
  assert.match(script, /triggerVoicePulse\(\)/);
  assert.match(styles, /\.sentinel-shell\.voice-pulse \.voice-plane/);
  assert.doesNotMatch(
    styles,
    /\[data-aqua-state="speaking"\] \.voice-plane,\s*\.sentinel-shell\.voice-pulse/,
  );
});

test("Protected keeper files remain available", async () => {
  const keeper = await read("AQUA_HOMES_OS_CURRENT_KEEPER.md");
  const protectedHome = await read("AH_v54I-3.html");

  assert.match(keeper, /Protected Visual Keeper/);
  assert.ok(protectedHome.length > 1000);
});
