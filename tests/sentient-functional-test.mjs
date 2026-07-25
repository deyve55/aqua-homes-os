import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("APK bundles the approved Aqua hero, carousel, and two-card dashboard", async () => {
  const [html, css, fidelity] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/styles.css"),
    read("sentient-os-web/fidelity.css"),
  ]);
  assert.match(html, /class="aqua-hero"/);
  assert.match(html, /id="appDeck"/);
  assert.match(html, /id="cardsTrack"/);
  assert.match(html, /id="primaryDashboard"/);
  assert.match(html, /id="secondaryDashboard"/);
  assert.match(css, /ui-hero-front-v11\.png/);
  assert.match(fidelity, /\.app-deck\{[\s\S]*background:#000/);
});

test("the centered carousel card snaps face-on before it can open", async () => {
  const [script, fidelity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
  ]);
  assert.match(
    fidelity,
    /\.app-deck \.app-card\.pos-0\{[\s\S]*rotateY\(0deg\)/,
  );
  assert.match(
    fidelity,
    /\.app-deck \.app-card\.pos-0\{[\s\S]*transition:left[^}]*opacity \.3s/,
  );
  assert.doesNotMatch(
    fidelity.match(/\.app-deck \.app-card\.pos-0\{[^}]+\}/)?.[0] || "",
    /transition:[^}]*transform/,
  );
  assert.match(script, /if \(!rotating\) openWorkspace\(\)/);
  assert.match(script, /rotationTimer = setTimeout\(\(\) => finishRotation/);
});

test("APK mirrors the approved native placeholder carousel", async () => {
  const [script, fidelity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
  ]);

  assert.match(script, /class="card-placeholder"/);
  assert.match(script, /APP INTERFACE RESERVED/);
  assert.doesNotMatch(script, /image\.src = `\.\/assets\/\$\{app\.art\}`/);
  assert.match(fidelity, /\.card-placeholder-orbit\{/);
  assert.match(fidelity, /left:34%;[\s\S]*width:32%;[\s\S]*height:2px/);
  assert.match(
    fidelity,
    /\.app-deck \.app-card\.pos-0\{[^}]*top:7\.5%;[^}]*rotateY\(0deg\)/,
  );
  assert.match(
    fidelity,
    /\.app-deck \.app-card\.pos--1\{[^}]*top:10%;[^}]*rotateY\(33deg\)/,
  );
  assert.match(fidelity, /@keyframes rail-beacon-sweep/);
  assert.match(fidelity, /\.aqua-state-label\{[\s\S]*min-width:max-content/);
});

test("native voice uses authenticated Aqua Brain and not local scripted answers", async () => {
  const [script, activity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read(
      "android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java",
    ),
  ]);
  assert.match(script, /AquaBridge\.askAqua/);
  assert.match(script, /receiveAquaResponse/);
  assert.match(script, /applyAquaAction/);
  assert.doesNotMatch(script, /function commandResponse/);
  assert.match(activity, /aqua-sentinel-executive/);
  assert.match(activity, /AndroidKeyStore/);
  assert.match(activity, /grant_type=password/);
  assert.match(activity, /grant_type=refresh_token/);
  assert.match(activity, /SpeechRecognizer/);
  assert.match(activity, /TextToSpeech/);
});

test("server secrets are absent from the APK source", async () => {
  const files = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read(
      "android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java",
    ),
  ]);
  const source = files.join("\n");
  assert.doesNotMatch(source, /\bsk-(?:proj-)?[A-Za-z0-9_]{20,}/);
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.match(source, /sb_publishable_/);
});

test("Android blocks cleartext traffic and backup extraction", async () => {
  const manifest = await read(
    "android-app/app/src/main/AndroidManifest.xml",
  );
  assert.match(manifest, /android:usesCleartextTraffic="false"/);
  assert.match(manifest, /android:allowBackup="false"/);
  assert.match(manifest, /android\.permission\.RECORD_AUDIO/);
  assert.match(manifest, /android\.permission\.INTERNET/);
});
