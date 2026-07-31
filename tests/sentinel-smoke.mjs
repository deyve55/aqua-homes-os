import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("v0.64 recreates the approved angular Aqua structure as working UI layers", async () => {
  const [html, styles] = await Promise.all([
    read("sentinel-app/index.html"),
    read("sentinel-app/v64.css"),
  ]);

  assert.match(html, /architectural-a/);
  assert.match(html, /voice-spectrum/);
  assert.match(html, /voice-beam-left/);
  assert.match(html, /voice-beam-right/);
  assert.match(html, /voice-beam-up/);
  assert.match(html, /deck-ring-back/);
  assert.match(html, /data-deck-track/);
  assert.match(html, /DEMO DATA · NOT CONNECTED/);
  assert.match(styles, /\.app-card\[data-position="far-previous"\]/);
  assert.match(styles, /\.app-card\[data-position="previous"\]/);
  assert.match(styles, /\.app-card\[data-position="active"\]/);
  assert.match(styles, /\.app-card\[data-position="next"\]/);
  assert.match(styles, /\.app-card\[data-position="far-next"\]/);
});

test("all five carousel surfaces use unmistakable demo data", async () => {
  const script = `${await read("sentinel-app/app.js")}\n${await read("sentinel-app/index.html")}`;

  for (const label of [
    "Overview",
    "Site Intelligence",
    "Financial Command",
    "Operations",
    "Risk Monitor",
  ]) {
    assert.match(script, new RegExp(label));
  }

  assert.match(script, /DEMO \$14\.8M/);
  assert.match(script, /Placeholder/);
  assert.match(script, /backendConnected: false/);
  assert.doesNotMatch(script, /Northshore|Riverside|NS-8847/i);
});

test("card selection rotates five retained cards and synchronizes lower alerts", async () => {
  const script = await read("sentinel-app/app.js");

  assert.match(script, /function positionName/);
  assert.match(script, /far-previous/);
  assert.match(script, /far-next/);
  assert.match(script, /shell\.classList\.add\("deck-turning"\)/);
  assert.match(script, /updateExceptionCard\("primary"/);
  assert.match(script, /updateExceptionCard\("secondary"/);
  assert.match(script, /pointerdown/);
  assert.match(script, /pointerup/);
});

test("Aqua has continuous local personality modes without pretending a backend is connected", async () => {
  const script = await read("sentinel-app/app.js");

  assert.match(script, /Good morning, Davy/);
  assert.match(script, /Professional mode engaged/);
  assert.match(script, /Aqua with a little sparkle/);
  assert.match(script, /never pretend I’m literally conscious/);
  assert.match(script, /requestListening\(460\)/);
  assert.match(script, /stop listening\|end conversation/);
  assert.match(script, /window\.AquaNative\.listen/);
  assert.match(script, /window\.AquaNative\.speak/);
  assert.match(script, /window\.AquaNative\.stopListening/);
});

test("frontend contains no provider secret, direct provider call, or customer record", async () => {
  const files = await Promise.all(
    [
      "sentinel-app/index.html",
      "sentinel-app/app.js",
      "sentinel-app/styles.css",
      "sentinel-app/v64.css",
    ].map(read),
  );
  const source = files.join("\n");

  assert.doesNotMatch(source, /sk-(?:proj-)?[A-Za-z0-9_-]{16,}/);
  assert.doesNotMatch(source, /OPENAI_API_KEY/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /Northshore|Riverside|NS-8847/i);
});

test("architectural A remains fixed while center light, spectrum, and beams react", async () => {
  const [script, styles] = await Promise.all([
    read("sentinel-app/app.js"),
    read("sentinel-app/v64.css"),
  ]);

  assert.match(
    styles,
    /\.sentinel-shell\[data-aqua-state\] \.architectural-a,\s*\.sentinel-shell\.voice-pulse \.architectural-a\s*{[\s\S]*animation: none !important;[\s\S]*transform: none !important;/,
  );
  assert.doesNotMatch(styles, /@keyframes voiceLift/);
  assert.match(styles, /\.sentinel-shell\.voice-pulse \.voice-beam-left/);
  assert.match(styles, /\.sentinel-shell\.voice-pulse \.voice-beam-right/);
  assert.match(styles, /\.sentinel-shell\.voice-pulse \.voice-beam-up/);
  assert.match(script, /setVoiceEnergy\(level, 100, true\)/);
  assert.match(script, /spectrumBars\.forEach/);
});

test("speech light stays refined and contained inside the approved Aqua frame", async () => {
  const [script, styles] = await Promise.all([
    read("sentinel-app/app.js"),
    read("sentinel-app/v64.css"),
  ]);

  assert.match(styles, /\.core-light\s*{[\s\S]*width: 16%;[\s\S]*height: 5px;/);
  assert.match(styles, /\.voice-spectrum\s*{[\s\S]*width: min\(42vw, 270px\);[\s\S]*height: 38px;/);
  assert.match(styles, /\.voice-beam-left,\s*\.voice-beam-right\s*{[\s\S]*width: 24%;/);
  assert.match(styles, /\.sentinel-shell\[data-aqua-state="speaking"\] \.voice-spectrum i\s*{[\s\S]*opacity: 0\.36;/);
  assert.match(script, /--voice-core-scale", \(1 \+ level \* 0\.1\)/);
  assert.match(script, /const height = 2 \+ level \* \(3 \+ centerWeight \* 11\) \* wave;/);
  assert.doesNotMatch(styles, /width: min\(82vw, 600px\)/);
  assert.doesNotMatch(script, /level \* 0\.46/);
});

test("native bridge is offline-first, silent, continuous-session capable, and prefers a local voice", async () => {
  const [manifest, activity, appBuild] = await Promise.all([
    read("android/app/src/main/AndroidManifest.xml"),
    read("android/app/src/main/java/com/aquahomes/sentinel/MainActivity.java"),
    read("android/app/build.gradle"),
  ]);

  assert.match(manifest, /android\.permission\.RECORD_AUDIO/);
  assert.doesNotMatch(manifest, /android\.permission\.INTERNET/);
  assert.match(activity, /EXTRA_PREFER_OFFLINE/);
  assert.match(activity, /onAudioAvailable/);
  assert.match(activity, /onRangeStart/);
  assert.match(activity, /selectBestLocalVoice/);
  assert.match(activity, /isNetworkConnectionRequired/);
  assert.match(activity, /public void stopListening\(\)/);
  assert.match(activity, /setSoundEffectsEnabled\(false\)/);
  assert.doesNotMatch(activity, /setAllowUniversalAccessFromFileURLs\(true\)/);
  assert.match(appBuild, /assets\.srcDirs = \["\.\.\/\.\.\/sentinel-app"\]/);
});

test("outgoing audio cadence drives word highlighting and directional light", async () => {
  const [script, activity] = await Promise.all([
    read("sentinel-app/app.js"),
    read("android/app/src/main/java/com/aquahomes/sentinel/MainActivity.java"),
  ]);

  assert.match(script, /onNativeWord\(start\)/);
  assert.match(script, /renderSpokenWord\(index\)/);
  assert.match(script, /triggerVoicePulse/);
  assert.match(script, /onNativeEnergy\(level\)/);
  assert.match(activity, /normalizedAudioEnergy/);
  assert.match(activity, /window\.Aqua && window\.Aqua\.onNativeEnergy/);
});

test("v0.64 has a distinct APK identity and committed visual proof workflow", async () => {
  const [appBuild, workflow, serviceWorker] = await Promise.all([
    read("android/app/build.gradle"),
    read(".github/workflows/android-sentinel-apk.yml"),
    read("sentinel-app/service-worker.js"),
  ]);

  assert.match(appBuild, /versionCode 2026072403/);
  assert.match(appBuild, /versionName "0\.64\.0-ui-personality"/);
  assert.match(workflow, /Aqua-Sentinel-OS-v0\.64\.0-ui-personality\.apk/);
  assert.match(workflow, /Fold-portrait-idle\.png/);
  assert.match(workflow, /Fold-portrait-speaking\.png/);
  assert.match(workflow, /DeX-landscape\.png/);
  assert.match(serviceWorker, /v64/);
  assert.match(serviceWorker, /\.\/v64\.css/);
});

test("protected keeper files remain available and unchanged in scope", async () => {
  const keeper = await read("AQUA_HOMES_OS_CURRENT_KEEPER.md");
  const protectedHome = await read("AH_v54I-3.html");

  assert.match(keeper, /Protected Visual Keeper/);
  assert.ok(protectedHome.length > 1000);
});
