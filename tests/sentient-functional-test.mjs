import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const readBytes = (path) => readFile(new URL(path, root));

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
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{[\s\S]*rotateY\(0deg\)/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{[\s\S]*transition:left[^}]*opacity \.3s/);
  assert.doesNotMatch(fidelity.match(/\.app-deck \.app-card\.pos-0\{[^}]+\}/)?.[0] || "", /transition:[^}]*transform/);
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
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{[^}]*top:7\.5%;[^}]*rotateY\(0deg\)/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos--1\{[^}]*top:10%;[^}]*rotateY\(33deg\)/);
  assert.match(fidelity, /@keyframes rail-beacon-sweep/);
  assert.match(fidelity, /\.aqua-state-label\{[\s\S]*min-width:max-content/);
});

test("native voice uses authenticated Aqua Brain and not local scripted answers", async () => {
  const [script, activity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
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
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  const source = files.join("\n");
  assert.doesNotMatch(source, /\bsk-(?:proj-)?[A-Za-z0-9_]{20,}/);
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(source, /api\.openai\.com/);
  assert.match(source, /sb_publishable_/);
});

test("Android blocks cleartext traffic and backup extraction", async () => {
  const manifest = await read("android-app/app/src/main/AndroidManifest.xml");
  assert.match(manifest, /android:usesCleartextTraffic="false"/);
  assert.match(manifest, /android:allowBackup="false"/);
  assert.match(manifest, /android\.permission\.RECORD_AUDIO/);
  assert.match(manifest, /android\.permission\.INTERNET/);
});

test("Fold APK has protected top space, kinetic drag, and approved Sentinel OS launcher", async () => {
  const [script, fidelity, manifest, adaptiveIcon, approvedIcon, legacyIcon, adaptiveForeground] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/res/mipmap-anydpi-v26/aqua_sentinel_launcher.xml"),
    readBytes("android-app/icon-source/AquaSentinel-SentinelOS-approved.png"),
    readBytes("android-app/app/src/main/res/mipmap-xxxhdpi/aqua_sentinel_launcher.png"),
    readBytes("android-app/app/src/main/res/mipmap-xxxhdpi/aqua_sentinel_launcher_foreground.png"),
  ]);
  assert.match(fidelity, /padding-top:clamp\(34px,7svh,64px\)/);
  assert.match(fidelity, /card-placeholder-orbit\{[\s\S]*border:0/);
  assert.match(fidelity, /rotateY\(18deg\)/);
  assert.match(fidelity, /v0\.4\.3 carousel scale and kinetic-motion correction/);
  assert.match(script, /setPointerCapture/);
  assert.match(script, /pointermove/);
  assert.match(script, /function coastDeck\(initialVelocity\)/);
  assert.match(script, /requestAnimationFrame\(coast\)/);
  assert.match(script, /while \(Math\.abs\(drag\.residualX\) >= CARD_STEP_PX\)/);
  assert.match(manifest, /android:icon="@mipmap\/aqua_sentinel_launcher"/);
  assert.match(manifest, /android:roundIcon="@mipmap\/aqua_sentinel_launcher"/);
  assert.match(adaptiveIcon, /@color\/aqua_sentinel_launcher_background/);
  assert.match(adaptiveIcon, /@mipmap\/aqua_sentinel_launcher_foreground/);
  assert.equal(
    createHash("sha256").update(approvedIcon).digest("hex"),
    "476a6094bf138893f0a3f2d07a8c0a33db67b45e8a702303ce8ccda9b22c0b96",
  );
  assert.equal(legacyIcon.readUInt32BE(16), 192);
  assert.equal(legacyIcon.readUInt32BE(20), 192);
  assert.equal(adaptiveForeground.readUInt32BE(16), 432);
  assert.equal(adaptiveForeground.readUInt32BE(20), 432);
});

test("Fold hero distinguishes inward listening energy from outward speaking bursts", async () => {
  const [script, fidelity, activity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  assert.match(fidelity, /v0\.4\.4 Fold voice-energy and hero-presence correction/);
  assert.match(fidelity, /background-size:100% 104%/);
  assert.match(fidelity, /\.aqua-state-label\{[\s\S]*bottom:11\.2%/);
  assert.match(fidelity, /@keyframes listen-energy-left-in\{[\s\S]*right:100%[\s\S]*right:-28%/);
  assert.match(fidelity, /@keyframes listen-energy-right-in\{[\s\S]*left:100%[\s\S]*left:-28%/);
  assert.match(fidelity, /@keyframes speak-energy-left-out\{[\s\S]*right:-28%[\s\S]*right:100%/);
  assert.match(fidelity, /@keyframes speak-energy-right-out\{[\s\S]*left:-28%[\s\S]*left:100%/);
  assert.match(fidelity, /@keyframes speak-energy-up/);
  assert.match(script, /window\.pulseAquaSpeech/);
  assert.match(script, /classList\.add\("speech-beat"\)/);
  assert.match(activity, /void onRangeStart\(/);
  assert.match(activity, /window\.pulseAquaSpeech\?\.\(\)/);
});

test("Fold card-presence correction enlarges the complete carousel stack together", async () => {
  const fidelity = await read("sentient-os-web/fidelity.css");
  assert.match(fidelity, /v0\.4\.4 owner-approved Fold card-presence correction/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{left:33\.9%;top:3\.2%;width:32\.2%;height:83%/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos--1\{left:14\.9%;top:5\.5%;width:23\.6%;height:75%/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-1\{left:61\.5%;top:5\.5%;width:23\.6%;height:75%/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos--2\{left:0;top:7\.5%;width:21\.7%;height:69%/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-2\{left:78\.3%;top:7\.5%;width:21\.7%;height:69%/);
});
