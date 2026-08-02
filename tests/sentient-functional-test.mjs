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

test("APK renders all seven satellite previews and launches installed apps", async () => {
  const [script, fidelity, manifest] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/AndroidManifest.xml"),
  ]);
  assert.match(script, /function dashboardPanelMarkup/);
  assert.match(script, /class="dashboard-panel-preview"/);
  assert.match(script, /PRESENTATION DATA/);
  for (const layout of ["mini-kpis", "mini-finance", "mini-viewfinder", "mini-search", "mini-clock", "mini-ledger", "mini-inbox"]) {
    assert.match(script, new RegExp(layout));
  }
  assert.doesNotMatch(script, /APP INTERFACE RESERVED/);
  for (const app of ["Aqua CRM", "AquaDraw", "AquaCam", "Aqua Knowledge Vault", "Aqua Timesheet", "Aqua Books", "Aqua Receipts"]) assert.match(script, new RegExp(app));
  assert.match(script, /AquaBridge\.launchApp/);
  for (const packageName of [
    "com.aquasoftware.crm.fieldtest",
    "com.aquahomesdesigngroup.draw.beta",
    "com.aquahomesdesign.cam.obsidianpreview",
    "com.aquahomes.knowledgevault",
    "com.aquahomes.timesheet.engineering",
    "com.aquasoftware.aquabooks",
    "com.aquasoftware.receipts.test",
  ]) {
    assert.match(script, new RegExp(packageName.replaceAll(".", "\\.")));
    assert.match(manifest, new RegExp(packageName.replaceAll(".", "\\.")));
  }
  assert.match(fidelity, /\.app-landing-preview\{/);
  assert.match(fidelity, /left:34%;[\s\S]*width:32%;[\s\S]*height:2px/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{[^}]*top:7\.5%;[^}]*rotateY\(0deg\)/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos--1\{[^}]*top:10%;[^}]*rotateY\(33deg\)/);
  assert.match(fidelity, /@keyframes rail-beacon-sweep/);
  assert.match(fidelity, /\.aqua-state-label\{[\s\S]*min-width:max-content/);
});

test("carousel previews use reversible presentation data and verified refreshable snapshots", async () => {
  const [script, native, contract] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("docs/integration/AQUA-SENTINEL-HOME-SNAPSHOT-CONTRACT.md"),
  ]);
  assert.match(script, /const liveSnapshots = new Map\(\)/);
  assert.match(script, /window\.receiveAppSnapshot/);
  assert.match(script, /window\.refreshSelectedAppSnapshot/);
  assert.match(script, /selectedView\(apps\[active\]\)/);
  assert.match(script, /safePreviewImage/);
  assert.match(script, /image\\\/webp\|image\\\/png/);
  assert.match(script, /const ecosystemPresentationSnapshots = new Map\(\)/);
  assert.match(script, /isEcosystemPresentationMode/);
  assert.match(script, /ecosystemPresentationSnapshots\.get\(app\.name\)/);
  assert.match(script, /function dashboardPanelMarkup/);
  assert.match(script, /Presentation mode · synthetic preview/);
  assert.match(script, /snapshotPresentation/);
  assert.match(script, /formatSnapshotTime/);
  assert.match(script, /primaryStatus/);
  assert.match(script, /secondaryStatus/);
  assert.match(script, /60_000/);
  for (const expected of ["8 open leads", "$186K active", "18 captures", "7 on clock", "$84.2K available", "14 received"]) {
    assert.match(script, new RegExp(expected.replaceAll("$", "\\$")));
  }
  assert.match(native, /REQUEST_HOME_SNAPSHOT/);
  assert.match(native, /HOME_SNAPSHOT_RESPONSE/);
  assert.match(native, /Build\.VERSION\.SDK_INT >= Build\.VERSION_CODES\.UPSIDE_DOWN_CAKE/);
  assert.match(native, /getPackagesForUid\(getSentFromUid\(\)\)/);
  assert.match(native, /pendingSnapshots\.remove\(requestId\)/);
  assert.match(native, /MAX_SNAPSHOT_BYTES/);
  assert.match(contract, /Aqua CRM[\s\S]*Aqua Receipts/);
  assert.match(contract, /awaiting-live-connection/);
  assert.match(contract, /compressed current home-screen thumbnail/);
});

test("native voice uses authenticated Aqua Brain and not local scripted answers", async () => {
  const [script, activity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  assert.match(script, /AquaBridge\.askAqua/);
  assert.match(script, /receiveAquaResponse/);
  assert.match(script, /applyAquaAction/);
  assert.match(script, /showMaterialization/);
  assert.doesNotMatch(script, /function commandResponse/);
  assert.match(activity, /BuildConfig\.AQUA_GATEWAY_URL/);
  assert.match(activity, /"jsonrpc", "2\.0"/);
  assert.match(activity, /"session\.create"/);
  assert.match(activity, /"aqua\.chat"/);
  assert.match(activity, /AndroidKeyStore/);
  assert.doesNotMatch(activity, /grant_type=password/);
  assert.doesNotMatch(activity, /grant_type=refresh_token/);
  assert.doesNotMatch(activity, /supabase/i);
  assert.match(activity, /SpeechRecognizer/);
  assert.match(activity, /TextToSpeech/);
});

test("an unavailable gateway cannot block truthful Standalone startup", async () => {
  const [gradle, html, script, activity] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  assert.match(gradle, /versionCode = 2026080203/);
  assert.match(gradle, /versionName = "0\.7\.4-living-neural-fidelity-widget"/);
  assert.match(gradle, /\.orElse\(providers\.environmentVariable\("AQUA_GATEWAY_URL"\)\)\s*\.orElse\(""\)/);
  assert.doesNotMatch(gradle, /\.orElse\("https:\/\/api\.aquahomesos\.com\/gateway"\)/);
  assert.match(html, /id="ownerAccessButton"[^>]*data-panel="connect"/);
  assert.match(html, /id="authContinueStandalone"[\s\S]*Continue in Standalone/);
  assert.match(script, /function openOwnerAccess\(\)/);
  assert.match(script, /authPanel\.hidden = true;\s*updateOwnerAccessControl\(\);/);
  assert.doesNotMatch(script, /authPanel\.hidden = authenticated/);
  assert.match(script, /isGatewayConfigured/);
  assert.match(script, /Gateway Not Configured/);
  assert.match(script, /Sentinel is open in Standalone mode\. Aqua Brain is not connected\./);
  assert.match(activity, /public boolean isGatewayConfigured\(\)/);
  assert.match(activity, /Aqua Brain gateway is unavailable\. Sentinel remains available in Standalone mode\./);
  assert.match(activity, /Sentinel could not verify the Aqua Brain secure connection/);
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
  assert.doesNotMatch(source, /sb_publishable_/);
  assert.doesNotMatch(source, /OPENAI_API_KEY/);
});

test("the living Neural Link focuses one thought without isolating Aqua's other systems", async () => {
  const [html, script, fidelity] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
  ]);
  assert.match(html, /data-panel="neural"[\s\S]*Neural Link/);
  assert.match(html, /data-panel="command"[\s\S]*Command/);
  assert.match(script, /AQUA SENTINEL NEURAL LINK/);
  assert.match(script, />AQUA NEURALINK</);
  assert.doesNotMatch(script, /systemHeader\("Neural Workspace"\)/);
  assert.match(script, /class="neural-network"/);
  assert.match(script, /class="neural-microbursts"/);
  assert.match(script, /class="neural-burst burst-\$\{laneIndex\}"/);
  assert.match(script, /class="portal-node">\$\{environment\}/);
  assert.match(script, /neuralAsset: "\.\/assets\/carousel-v2\/crm\.webp"/);
  assert.doesNotMatch(script, /class="neural-particles"/);
  assert.match(script, /class="neural-jolt"/);
  assert.match(script, /neural-substrate-map neural-substrate-rest/);
  assert.match(script, /neural-substrate-map neural-substrate-result/);
  assert.match(script, /neural-substrate-fire neural-substrate-cyan/);
  assert.match(script, /const neuralRingSlots =/);
  assert.match(script, /function identifyNeuralIntent\(rawText\)/);
  assert.match(script, /function beginNeuralRequest\(command\)/);
  assert.match(script, /function isExplicitDeepOpen\(rawText\)/);
  assert.match(script, /directIntent && isExplicitDeepOpen\(command\)/);
  assert.match(script, /pendingNeuralIntent && !isExplicitDeepOpen\(pendingNeuralIntent\.command\)/);
  assert.match(script, /data-neural-path="\$\{index\}"/);
  assert.match(script, /label: `Go deeper into \$\{app\.name\}`/);
  assert.match(script, /Presentation · Not Live/);
  assert.match(script, /const neuralMaterializedSlots =/);
  assert.match(script, /\{ x: 86, y: 27, scale: 0\.98/);
  assert.match(script, /\{ x: 11\.3, y: 92\.2, scale: 0\.88/);
  assert.match(script, /const NEURAL_ROTATE_MILLIS = 1380/);
  assert.match(script, /const NEURAL_FIRE_MILLIS = 920/);
  assert.match(script, /const NEURAL_MORPH_MILLIS = 2600/);
  assert.match(script, /function neuralCatmullRom\(before, from, to, after, progress\)/);
  assert.match(script, /x: neuralCatmullRom\(before\.x, from\.x, to\.x, after\.x, mix\)/);
  assert.match(script, /y: neuralCatmullRom\(before\.y, from\.y, to\.y, after\.y, mix\)/);
  assert.match(script, /function neuralMorphSlot\(from, to, progress\)/);
  assert.match(script, /return neuralMorphSlot\(ringSlot, materializedSlot, neuralEase\(progress\)\)/);
  assert.match(script, /portal\.animate\(keyframes/);
  assert.match(script, /Promise\.allSettled\(animations\.map/);
  assert.match(script, /const NEURAL_MOTION_SETTLE_GRACE_MILLIS = 160/);
  assert.match(script, /function waitForNeuralMotion\(animations, duration\)/);
  assert.match(script, /setTimeout\(finish, duration \+ NEURAL_MOTION_SETTLE_GRACE_MILLIS\)/);
  assert.equal((script.match(/await waitForNeuralMotion\(animations, duration\)/g) || []).length, 2);
  assert.doesNotMatch(script, /neuralMotionFrame|requestAnimationFrame\(tick\)/);
  assert.doesNotMatch(script, /setAttribute\("d"/);
  assert.match(script, /neuralPhase = "rotating"/);
  assert.match(script, /neuralPhase = "firing"/);
  assert.match(script, /class="command-vault"/);
  assert.match(script, /data-filing-action="voice"/);
  assert.match(script, /File Cabinet/);
  assert.match(script, /portalMaterialization/);
  assert.match(script, /data-materialized-expand/);
  assert.match(script, /data-neural-materialized="\$\{neuralPhase === "transitioning" \? "pending" : "true"\}"/);
  assert.match(script, /diagnosticsMarkup/);
  assert.match(script, /settingsMarkup/);
  assert.match(fidelity, /\.neural-stage/);
  assert.match(fidelity, /height:clamp\(610px,73svh,780px\)/);
  assert.match(fidelity, /\.neural-signal\.is-active/);
  assert.match(fidelity, /\.neural-stage\[data-phase="rotating"\]/);
  assert.match(fidelity, /\.neural-stage\[data-phase="firing"\]/);
  assert.match(fidelity, /color:rgba\(156,226,238,\.68\)/);
  assert.match(fidelity, /letter-spacing:\.34em/);
  assert.match(fidelity, /\.neural-thought\{/);
  assert.match(fidelity, /\.portal-node>img\{position:absolute/);
  assert.match(fidelity, /\.portal-pull\{aspect-ratio:1;padding:6%;overflow:hidden;border-radius:50%/);
  assert.match(fidelity, /@keyframes neural-signal-return/);
  assert.match(fidelity, /neuralink-rest-v071\.png/);
  assert.match(fidelity, /neuralink-materialized-v071\.png/);
  assert.match(fidelity, /neuralink-rest-cyan-path-mask-v074\.png/);
  assert.match(fidelity, /neuralink-rest-gold-path-mask-v074\.png/);
  assert.match(fidelity, /neuralink-materialized-cyan-path-mask-v074\.png/);
  assert.match(fidelity, /neuralink-materialized-gold-path-mask-v074\.png/);
  assert.match(fidelity, /@keyframes neural-substrate-cyan-out/);
  assert.match(fidelity, /@keyframes neural-substrate-gold-return/);
  assert.match(fidelity, /@keyframes neural-path-fire/);
  assert.match(fidelity, /@keyframes neural-jolt-up/);
  assert.ok(
    fidelity.lastIndexOf("neural-jolt-up") > fidelity.lastIndexOf("neural-jolt-return"),
    "the final working-state override must fire both request pulses upward",
  );
  assert.match(fidelity, /data-phase="transitioning"/);
  assert.match(fidelity, /@keyframes approved-neuron-perimeter/);
  assert.match(fidelity, /\.materialization-circuit-fire\{/);
  assert.match(fidelity, /\.neural-open-materialized-file/);
  assert.match(script, /class="neural-materialization-approved /);
  assert.match(script, /class="neural-live-object"/);
  assert.match(script, /class="neural-receipt-crop"/);
  assert.match(script, /home-depot-receipt-owner-approved-v074\.png/);
  assert.doesNotMatch(script, /previewUri \|\| "\.\/assets\/neuralink-materialization-five-portal-approved-v073\.png"/);
  assert.match(script, /slot\.querySelectorAll\("\[data-materialized-action/);
  const exactMaterialization = script.match(/function neuralMaterializationMarkup\(materialization\) \{([\s\S]*?)\n\}/)?.[1] || "";
  assert.match(exactMaterialization, /neural-returned-document/);
  assert.doesNotMatch(exactMaterialization, /neural-metric-list|neural-kpi/);
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
    readBytes("android-app/icon-source/AquaSentinel-BrainCircuit-approved-v045.png"),
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
  assert.match(script, /while \(Math\.abs\(drag\.residualX\) >= stepPx\)/);
  assert.match(manifest, /android:icon="@mipmap\/aqua_sentinel_launcher"/);
  assert.match(manifest, /android:roundIcon="@mipmap\/aqua_sentinel_launcher"/);
  assert.match(adaptiveIcon, /@color\/aqua_sentinel_launcher_background/);
  assert.match(adaptiveIcon, /@mipmap\/aqua_sentinel_launcher_foreground/);
  assert.equal(
    createHash("sha256").update(approvedIcon).digest("hex"),
    "bc1e014886d19f10ee1b8afdca2f5bc99d6d9c9ff103c2b359cc9457da80f6c5",
  );
  assert.equal(approvedIcon.readUInt32BE(16), 512);
  assert.equal(approvedIcon.readUInt32BE(20), 512);
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

test("v0.4.9 preserves the v0.4.7 carousel geometry and silent Aqua activation", async () => {
  const [fidelity, activity] = await Promise.all([
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  assert.match(fidelity, /v0\.4\.7 Fold physical-device repair/);
  assert.match(fidelity, /\.aqua-hero\{[\s\S]*aspect-ratio:868\/840/);
  assert.match(fidelity, /\.hero-art\{[\s\S]*inset:0;[\s\S]*background-size:100% 100%/);
  assert.match(fidelity, /\.app-deck \.app-card\.pos-0\{[\s\S]*top:7\.5%;[\s\S]*width:28\.6%;[\s\S]*height:76%/);
  assert.match(fidelity, /\.bottom-rail\{[\s\S]*height:clamp\(46px,6\.4cqw,54px\)/);
  assert.match(fidelity, /@keyframes aqua-core-rise-out/);
  assert.match(activity, /webView\.setSoundEffectsEnabled\(false\)/);
  assert.match(activity, /webView\.setHapticFeedbackEnabled\(false\)/);
});

test("v0.7.4 preserves Home and proves the full Neuralink morph sequence", async () => {
  const [gradle, workflow, script, html, fidelity, androidLaunch, neuralLiveProof] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/index.html"),
    read("sentient-os-web/fidelity.css"),
    read("scripts/verify-aqua-sentinel-android-launch-v060.sh"),
    read("scripts/verify-aqua-sentinel-neural-live-wall-clock.mjs"),
  ]);
  assert.match(gradle, /versionCode = 2026080203/);
  assert.match(gradle, /versionName = "0\.7\.4-living-neural-fidelity-widget"/);
  assert.match(gradle, /providers\.gradleProperty\("aqua\.customerPreview"\)\.orElse\("false"\)/);
  assert.match(gradle, /providers\.gradleProperty\("aqua\.ecosystemPreview"\)\.orElse\("false"\)/);
  assert.match(workflow, /AquaSentinelOS-v0\.7\.4-Exact-Fidelity-Materialization-Widget-Test\.apk/);
  assert.match(workflow, /-Paqua\.ecosystemPreview=true/);
  assert.match(workflow, /preview=neural/);
  assert.match(workflow, /neuralDemo=sequence/);
  assert.match(workflow, /neuralDemo=sequence&neuralAt=750/);
  assert.match(workflow, /neuralDemo=sequence&neuralAt=1750/);
  assert.match(workflow, /neuralDemo=sequence&neuralAt=3500/);
  assert.match(workflow, /neuralDemo=sequence&neuralAt=5600/);
  assert.match(workflow, /for checkpoint in "00:2600" "01:3000" "02:3400" "03:3800" "04:4200" "05:4600" "06:5000"/);
  assert.match(workflow, /Neural-Link-Morph-closed-phone\.png/);
  assert.match(workflow, /data-aqua-neural-phase="transitioning"/);
  assert.match(workflow, /preview=command/);
  assert.match(script, /enableEcosystemPresentationMode/);
  assert.match(
    script,
    /window\.location\.protocol === "file:" && \["home", "neural"\]\.includes\(previewPanel\)/,
  );
  assert.match(script, /function activateDeterministicPreviewRoute\(\)/);
  assert.match(script, /\["home", "neural", "command", "settings", "diagnostics"\]\.includes\(previewPanel\)/);
  assert.match(script, /previewPanel === "home"/);
  assert.match(script, /const demo = previewParameters\.get\("neuralDemo"\) \|\| "rest"/);
  assert.match(script, /if \(\["focus", "rotate", "fire", "transition", "company", "receipt", "result"\]\.includes\(demo\)\)/);
  assert.match(script, /previewParameters\.get\("neuralDemo"\) === "sequence"/);
  assert.match(script, /function seekNeuralSequencePreview\(elapsedMillis\)/);
  assert.match(script, /previewParameters\.get\("neuralAt"\)/);
  assert.match(script, /neuralMorphProgress = \(elapsed - NEURAL_SEQUENCE_MORPH_AT\) \/ NEURAL_MORPH_MILLIS/);
  assert.match(script, /openPanel\(previewPanel\)/);
  assert.match(script, /document\.documentElement\.dataset\.aquaPreviewReady = previewPanel/);
  assert.match(script, /const deterministicPreviewActive = activateDeterministicPreviewRoute\(\)/);
  assert.match(script, /if \(!deterministicPreviewActive\) \{\s*render\(\);/);
  assert.ok(
    script.indexOf("activateDeterministicPreviewRoute();") < script.lastIndexOf("render();"),
    "the proof route must activate before Home rendering can fail",
  );
  assert.doesNotMatch(script, /requestAnimationFrame\(\(\) => openPanel\(previewPanel\)\)/);
  assert.match(workflow, /data-aqua-preview-ready="home"/);
  assert.match(workflow, /grep -q '8 open leads'/);
  assert.match(workflow, /grep -q 'PRESENTATION DATA'/);
  assert.match(workflow, /data-aqua-preview-ready="neural"/);
  assert.match(workflow, /data-aqua-neural-phase="rest"/);
  assert.match(workflow, /data-aqua-neural-phase="rotating"/);
  assert.match(workflow, /data-aqua-neural-phase="firing"/);
  assert.match(workflow, /data-aqua-neural-phase="result"/);
  assert.match(workflow, /data-morph-progress="0\.400"/);
  assert.match(workflow, /data-morph-progress="1\.000"/);
  assert.match(workflow, /node scripts\/verify-aqua-sentinel-neural-live-wall-clock\.mjs/);
  assert.match(workflow, /neural-live-wall-clock/);
  assert.match(workflow, /--url ".*neuralDemo=rest"/);
  assert.doesNotMatch(workflow, /aqua-sentinel-neural-live-(fire|morph|result)-proof\.html/);
  assert.match(neuralLiveProof, /host-monotonic-wall-clock/);
  assert.match(neuralLiveProof, /performance\.now\(\)/);
  assert.match(neuralLiveProof, /PHASE_DEADLINES_MILLIS/);
  assert.match(neuralLiveProof, /\["rotating", "firing", "transitioning", "result"\]/);
  assert.match(neuralLiveProof, /--remote-debugging-port=0/);
  assert.match(neuralLiveProof, /AQUA_NEURAL_LIVE_WALL_CLOCK_VERIFIED/);
  assert.match(neuralLiveProof, /data-neural-portal="6"/);
  assert.match(neuralLiveProof, /bound-aqua-receipts-portal-click/);
  assert.doesNotMatch(neuralLiveProof, /virtual-time-budget|neuralAt=/);
  const liveCheckpointWriter = neuralLiveProof.match(/async function saveCheckpoint[\s\S]*?\n\}/)?.[0] || "";
  assert.match(liveCheckpointWriter, /live-\$\{phase\}\.json/);
  assert.doesNotMatch(liveCheckpointWriter, /outerHTML|captureScreenshot/);
  assert.doesNotMatch(neuralLiveProof, /Page\.captureScreenshot/);
  assert.match(workflow, /data-aqua-preview-ready="command"/);
  assert.match(workflow, /identify -format '%wx%h'/);
  assert.match(workflow, /! cmp -s/);
  assert.match(workflow, /script: bash scripts\/verify-aqua-sentinel-android-launch-v060\.sh/);
  assert.match(androidLaunch, /am force-stop com\.android\.camera2/);
  assert.match(androidLaunch, /mResumedActivity\|topResumedActivity\|ResumedActivity/);
  assert.match(androidLaunch, /dumpsys activity activities/);
  assert.match(androidLaunch, /immersive_mode_confirmations confirmed/);
  assert.match(androidLaunch, /svc power stayon true/);
  assert.match(androidLaunch, /screen_off_timeout 2147483647/);
  assert.match(androidLaunch, /KEYCODE_WAKEUP/);
  assert.match(androidLaunch, /wm dismiss-keyguard/);
  assert.match(workflow, /-gpu software/);
  assert.match(workflow, /group: \$\{\{ github\.workflow \}\}-\$\{\{ github\.event\.pull_request\.head\.ref \|\| github\.ref_name \}\}/);
  assert.match(workflow, /cancel-in-progress: true/);
  assert.match(androidLaunch, /wait_for_adb\(\)/);
  assert.match(androidLaunch, /timeout 5s adb wait-for-device/);
  assert.match(androidLaunch, /timeout 20s adb shell uiautomator dump/);
  assert.match(androidLaunch, /timeout 30s adb shell am start/);
  assert.match(androidLaunch, /dump_window\(\)/);
  assert.match(androidLaunch, /recover_system_dialogs\(\)/);
  assert.match(androidLaunch, /for dialog_attempt in \$\(seq 1 6\); do/);
  assert.match(androidLaunch, /if grep -Eiq "Viewing full screen\|GOT IT"[\s\S]*input tap 855 525[\s\S]*KEYCODE_ENTER[\s\S]*continue/);
  assert.match(androidLaunch, /if grep -Eiq 'text="Camera keeps stopping"\|text="Close app"'[\s\S]*am force-stop com\.android\.camera2/);
  assert.match(androidLaunch, /package="com\.android\.permissioncontroller"[\s\S]*KEYCODE_BACK[\s\S]*MAIN_COMPONENT/);
  assert.match(androidLaunch, /text="Camera keeps stopping"\|text="Close app"\|text="Viewing full screen"\|text="GOT IT"\|package="com\.android\.permissioncontroller"/);
  assert.match(androidLaunch, /recover_system_dialogs initial[\s\S]*verify-aqua-sentinel-widget-actions-v054\.sh[\s\S]*recover_system_dialogs final/);
  assert.match(workflow, /launch_visual=deterministic_bundled_home_430x932/);
  assert.match(workflow, /android_launch=activity_and_ui_hierarchy_verified/);
  assert.doesNotMatch(workflow, /adb exec-out screencap.*launch\.png/);
  assert.doesNotMatch(androidLaunch, /adb exec-out screencap.*launch\.png/);
  assert.ok(
    workflow.indexOf("--screenshot=release/AquaSentinelOS-v0.7.4-launch-proof.png")
      < workflow.indexOf("bash scripts/verify-aqua-sentinel-android-launch-v060.sh"),
    "the deterministic Home proof must be rendered before Android interaction checks",
  );
  assert.match(script, /ecosystemPresentationSnapshots\.set/);
  assert.match(script, /primaryRows/);
  assert.match(script, /secondaryRows/);
  assert.match(script, /dashboardPanelMarkup/);
  assert.match(script, /const rows = Array\.isArray\(rawRows\) \? rawRows : \[\]/);
  assert.match(script, /Live · confirmed/);
  assert.match(script, /label: "Presentation", className: "preview"/);
  assert.match(html, /id="primaryStatus"/);
  assert.match(html, /id="secondaryStatus"/);
  assert.match(html, /App intelligence preview/);
  assert.match(html, /Operational preview/);
  assert.match(fidelity, /v0\.5\.5 reversible ecosystem presentation cards/);
  assert.match(fidelity, /\.dashboard-panel-preview\{/);
  assert.match(
    fidelity,
    /\.app-dashboard \.dashboard-card\{[\s\S]*?display:flex;[\s\S]*?flex-direction:column;/,
    "dashboard cards must stack their header, visible preview, and footer vertically",
  );
  assert.match(
    fidelity,
    /\.dashboard-panel-preview>footer b\{[^}]*font-size:inherit;[^}]*line-height:inherit/,
    "the internal preview label must not inherit the outer card footer's oversized type",
  );
});

test("v0.5.0 compact rail and filing cabinet share one protected widget inbox", async () => {
  const [html, fidelity, script, manifest, activity, store, widget, capture, contract] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/fidelity.css"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/FilingStore.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("docs/integration/AQUA-SENTINEL-FILING-INBOX-CONTRACT.md"),
  ]);
  assert.match(html, /id="filingCabinetButton"/);
  assert.match(html, /class="file-cabinet-icon"/);
  assert.match(html, /id="filingPendingBadge"/);
  assert.match(fidelity, /v0\.5\.0 owner-approved compact rail and filing cabinet/);
  assert.match(fidelity, /height:clamp\(34px,4\.7cqw,40px\)/);
  assert.match(fidelity, /min-height:clamp\(194px,35\.5cqw,308px\)/);
  assert.match(script, /Aqua File Cabinet/);
  assert.match(script, /window\.receiveFilingInbox/);
  assert.match(script, /needsClarification/);
  assert.match(script, /Tell Aqua where this goes/);
  assert.match(script, /Hey, you have \$\{pending\} pending/);
  assert.match(activity, /getFilingInbox/);
  assert.match(activity, /startFilingCapture/);
  assert.match(activity, /startFilingClarification/);
  assert.match(store, /AES\/GCM\/NoPadding/);
  assert.match(store, /AndroidKeyStore/);
  assert.match(store, /Aqua Books · Painting Company/);
  assert.match(store, /"Queued"/);
  assert.match(store, /static synchronized boolean clarify/);
  assert.match(widget, /widget_action/);
  assert.match(widget, /widget_video/);
  assert.match(widget, /widget_photo/);
  assert.match(widget, /widget_file/);
  assert.match(capture, /ACTION_IMAGE_CAPTURE/);
  assert.match(capture, /ACTION_VIDEO_CAPTURE/);
  assert.match(capture, /FilingStore\.enqueue/);
  assert.match(manifest, /\.AquaCommandWidget/);
  assert.match(manifest, /\.QuickCaptureActivity/);
  assert.match(manifest, /com\.aquasoftware\.sentinel\.action\.FILE/);
  assert.match(manifest, /\.EvidenceProvider/);
  assert.match(contract, /Capture acknowledgement must never be represented as remote confirmation/);
});

test("v0.5.4 preserves app covers and gives the two hero labels separate lanes", async () => {
  const [html, script, fidelity, ...carouselAssets] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    ...["crm", "draw", "cam", "vault", "timesheet", "books", "receipts"].map((name) =>
      readBytes(`sentient-os-web/assets/carousel-v2/${name}.webp`),
    ),
  ]);
  for (const name of ["CRM", "Draw", "Cam", "Knowledge Vault", "Timesheet", "Books", "Receipts"]) {
    assert.match(script, new RegExp(`cardName: "${name}"`));
  }
  assert.match(script, /function renderCarouselCover/);
  assert.match(html, /id="selectedAppLabel" class="selected-app-label"/);
  assert.match(script, /selectedAppLabel\.textContent = selected\.name/);
  assert.match(script, /class="carousel-art"/);
  assert.match(script, /assets\/carousel-v2\/\$\{escapeHtml\(app\.motion\)\}\.webp/);
  assert.doesNotMatch(script, /class="carousel-state/);
  assert.doesNotMatch(script, /class="carousel-brand"/);
  for (const motionClass of ["fund-stream", "focus-ring", "vault-door", "signal-path", "balance-beam", "scan-line"]) {
    assert.match(script, new RegExp(motionClass));
  }
  for (const asset of carouselAssets) {
    assert.ok(asset.length > 10_000);
    assert.equal(asset.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(asset.subarray(8, 12).toString("ascii"), "WEBP");
  }
  assert.match(script, /function dashboardPanelMarkup/);
  assert.doesNotMatch(script, /cardsTrack\.style\.transform/);
  assert.match(script, /function applyDeckPosition/);
  assert.match(script, /\{ offset: 0, width: 28\.6, height: 76, top: 7\.5, depth: 92, angle: 0/);
  assert.match(script, /\{ offset: 22\.7, width: 21, height: 68, top: 10, depth: -30, angle: 33/);
  assert.match(script, /\{ offset: 39\.6, width: 19\.4, height: 62, top: 12, depth: -132, angle: 53/);
  assert.match(script, /function deckStepPx\(\)/);
  assert.match(script, /Math\.pow\(0\.972, elapsed \/ 16\.67\)/);
  assert.match(script, /Math\.abs\(velocityX\) >= 0\.035/);
  assert.match(script, /appDeck\.setPointerCapture\?\.\(event\.pointerId\)/);
  assert.match(script, /Math\.abs\(totalX\) > 1\.5/);
  assert.match(script, /snapDeck\(false\)/);
  assert.match(html, /id="primaryScreen" class="dashboard-screen-crop screen-upper"/);
  assert.match(html, /id="secondaryScreen" class="dashboard-screen-crop screen-lower"/);
  assert.match(fidelity, /v0\.5\.1 fluid carousel, app covers, and split home-screen tiles/);
  assert.match(fidelity, /grid-template-rows:auto auto minmax\(0,1fr\) auto/);
  assert.match(fidelity, /v0\.5\.2 owner field-test correction: free touch, visible app UI, balanced rail/);
  assert.match(fidelity, /touch-action:none!important/);
  assert.match(fidelity, /height:clamp\(50px,7cqw,58px\)/);
  assert.match(fidelity, /v0\.5\.4 label placement/);
  assert.match(fidelity, /\.aqua-hero \.selected-app-label\{[\s\S]*left:20%;[\s\S]*right:20%;[\s\S]*bottom:4\.15%;[\s\S]*font-size:clamp\(12px,2\.5cqw,21px\)/);
  assert.match(fidelity, /\.selected-app-label\.is-visible\{[\s\S]*animation:selected-app-reveal 2s/);
  assert.match(fidelity, /\.aqua-state-label\{[\s\S]*display:block;[\s\S]*bottom:\.65%/);
  assert.match(script, /idle: "Tap here to speak to Aqua"/);
  assert.match(fidelity, /@keyframes selected-app-reveal\{[\s\S]*100%\{opacity:0/);
  assert.match(fidelity, /\.dashboard-card header b\.preview/);
  assert.match(fidelity, /\.carousel-art\{[\s\S]*object-fit:cover/);
  assert.match(fidelity, /animation-play-state:paused!important/);
  assert.match(fidelity, /\.app-deck\.is-settled \.app-card\.active \.carousel-motion[\s\S]*animation-play-state:running!important/);
  assert.match(script, /function revealSelectedAppLabel/);
  assert.match(fidelity, /@keyframes receipt-scan[^}]*[\s\S]*top:82%/);
  assert.match(fidelity, /@keyframes vault-door-open/);
  assert.match(fidelity, /@keyframes crm-token-flow/);
  assert.match(fidelity, /\.screen-lower \.dashboard-screen-sheet\{top:-100%\}/);
});

test("v0.7.4 pins the exact-fidelity widget and proves rapid Aqua Action without opening Sentinel", async () => {
  const [widget, dispatch, capture, messageService, activity, manifest, layout, script, styles, workflow, widgetVerifier, androidLaunch] = await Promise.all([
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/WidgetDispatchActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/WidgetMessageService.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/res/layout/aqua_quick_command.xml"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/res/values/styles.xml"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("scripts/verify-aqua-sentinel-widget-actions-v054.sh"),
    read("scripts/verify-aqua-sentinel-android-launch-v060.sh"),
  ]);
  assert.match(widget, /PendingIntent\.FLAG_UPDATE_CURRENT \| PendingIntent\.FLAG_IMMUTABLE/);
  assert.match(widget, /setPackage\(context\.getPackageName\(\)\)/);
  assert.match(widget, /RemoteViews buildViews\(Context context, AppWidgetManager manager, int id\)/);
  assert.match(widget, /new Intent\(context, WidgetDispatchActivity\.class\)/);
  assert.match(widget, /AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=/);
  assert.match(widget, /setImageViewResource\(R\.id\.widget_active_path, activePath\)/);
  assert.match(widget, /R\.drawable\.aqua_widget_jolt_action/);
  assert.match(widget, /R\.drawable\.aqua_widget_jolt_compact_action/);
  assert.match(dispatch, /NEURAL_JOLT_TRANSITION_MILLIS = 520L/);
  assert.match(dispatch, /AQUA_WIDGET_NEURAL_JOLT mode=/);
  assert.match(dispatch, /phase=outbound/);
  assert.match(dispatch, /phase=arrived/);
  assert.doesNotMatch(dispatch, /phase=return/);
  assert.match(dispatch, /new Intent\(this, MainActivity\.class\)/);
  assert.match(dispatch, /new Intent\(this, QuickCaptureActivity\.class\)/);
  assert.match(manifest, /\.WidgetDispatchActivity/);
  assert.match(manifest, /\.WidgetMessageService/);
  assert.match(manifest, /android:theme="@style\/AquaWidgetDispatchTheme"/);
  assert.match(capture, /AQUA_WIDGET_ACTION_RECEIVED mode=/);
  assert.match(capture, /AQUA_CAPTURE_ROUTE mode=/);
  assert.match(capture, /AQUA_CAPTURE_SAVED type=/);
  assert.match(capture, /captureRapidAction\(\)/);
  assert.match(capture, /AQUA_CAPTURE_ROUTE mode=action handler=PresentationContract/);
  assert.match(capture, /AQUA_WIDGET_MESSAGE_SUBMITTED id=/);
  assert.match(capture, /FilingStore\.enqueue\(this, "action", text, ""\)/);
  assert.match(capture, /WidgetMessageService\.enqueue\(this, text, messageId\)/);
  assert.match(capture, /AQUA_WIDGET_MESSAGE_BACKGROUND_DISPATCHED/);
  assert.doesNotMatch(capture, /putExtra\("widget_command", text\)/);
  const submitCommandBody = capture.match(/private void submitCommand\(String rawText\) \{([\s\S]*?)\n    \}/)?.[1] || "";
  assert.doesNotMatch(submitCommandBody, /MainActivity\.class/);
  assert.match(submitCommandBody, /finishAndRemoveTask\(\)/);
  assert.match(messageService, /extends IntentService/);
  assert.match(messageService, /\.put\("method", "aqua\.chat"\)/);
  assert.match(messageService, /"surface", "launcher-widget"/);
  assert.match(messageService, /AQUA_WIDGET_MESSAGE_BACKGROUND_SENT/);
  assert.doesNotMatch(messageService, /MainActivity\.class/);
  assert.match(capture, /EXTRA_COMMAND_TEXT = "widget_command_text"/);
  assert.match(dispatch, /Remind me to call John today at 5 PM/);
  assert.match(activity, /AQUA_WIDGET_MESSAGE_DELIVERED id=/);
  assert.match(activity, /AQUA_WIDGET_HOME_OPENED/);
  assert.match(activity, /window\.receiveWidgetCommand/);
  assert.match(layout, /id="@\+id\/widget_command_input"/);
  assert.match(layout, /id="@\+id\/widget_command_speak"/);
  assert.match(layout, /id="@\+id\/widget_command_send"/);
  assert.doesNotMatch(layout, /widget_command_open|Open Sentinel without sending/);
  assert.doesNotMatch(capture, /openSentinelWithoutCommand/);
  assert.match(script, /window\.receiveWidgetCommand = \(text\) =>/);
  assert.match(script, /Saved locally · awaiting Aqua/);
  assert.match(script, /function flushNextWidgetCommand/);
  assert.match(script, /Delivered to Aqua/);
  assert.match(capture, /showOpeningSurface\(\)/);
  assert.match(capture, /ClipData\.newRawUri/);
  assert.match(capture, /requestPermissions\(/);
  assert.match(capture, /SpeechRecognizer\.createSpeechRecognizer/);
  assert.match(capture, /grantUriPermission\(/);
  assert.match(capture, /STATE_EVIDENCE_PATH/);
  assert.match(capture, /protected void onNewIntent/);
  assert.match(capture, /evidenceFile\.length\(\) > 0/);
  assert.match(capture, /recoverReturnedMedia\(requestCode, data\)/);
  assert.match(capture, /source=returned-uri/);
  assert.match(capture, /source=returned-thumbnail/);
  assert.match(capture, /AQUA_CAPTURE_BACKGROUND_COMPLETE type=/);
  assert.match(capture, /finishAfterBackgroundSave\("voice"\)/);
  assert.match(capture, /finishAfterBackgroundSave\(type\)/);
  assert.doesNotMatch(capture, /openFilingCabinet|putExtra\("open_filing", true\)/);
  assert.match(styles, /<item name="android:clickable">true<\/item>/);
  assert.match(workflow, /bash scripts\/verify-aqua-sentinel-android-launch-v060\.sh/);
  assert.match(workflow, /widget_dispatch=launcher_hosted_remote_views_taps_verified/);
  assert.match(workflow, /::add-mask::\$KEY_PASSWORD/);
  assert.match(androidLaunch, /bash scripts\/verify-aqua-sentinel-widget-actions-v054\.sh/);
  assert.match(androidLaunch, /package="com\.android\.permissioncontroller"[\s\S]*am force-stop com\.android\.camera2[\s\S]*KEYCODE_BACK/);
  assert.match(androidLaunch, /permission_deny_button[\s\S]*dismiss_permission_controller "\$window_path"/);
  assert.match(androidLaunch, /dumpsys window > "\$focus_path"[\s\S]*mCurrentFocus\|mFocusedApp[\s\S]*MainActivity[\s\S]*return 0/);
  assert.match(activity, /widget_launcher_pin_probe/);
  assert.match(activity, /installOrRepairCommandWidget\(\)/);
  assert.doesNotMatch(activity, /widget_contract_probe/);
  assert.match(widgetVerifier, /for mode in home action file photo video/);
  assert.match(widgetVerifier, /--ez widget_launcher_pin_probe true/);
  assert.match(widgetVerifier, /window_animation_scale transition_animation_scale animator_duration_scale/);
  assert.match(widgetVerifier, /am force-stop "\$launcher_package"/);
  assert.match(widgetVerifier, /place_automatically_button\|add automatically\|add to home screen/);
  assert.match(widgetVerifier, /dumpsys appwidget/);
  assert.match(widgetVerifier, /dumpsys window/);
  assert.match(widgetVerifier, /dumpsys activity activities/);
  assert.match(widgetVerifier, /launcher_package="com\.android\.launcher3"/);
  assert.match(widgetVerifier, /AQUA_WIDGET_LAUNCHER_HOST_READY/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURALINK_SURFACE_READY/);
  assert.match(widgetVerifier, /path=armed_on_tap/);
  assert.doesNotMatch(widgetVerifier, /grep -Fq "\$package:id\/widget_active_path" "\$launcher_hierarchy"/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURALINK_ACTIVITY_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_REAL_RESIZE_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_REPEAT_STABILITY_VERIFIED runs=5/);
  assert.match(widgetVerifier, /assert_no_sentinel_crash/);
  assert.match(widgetVerifier, /AQUA_WIDGET_CAPTURE_CANCEL_STAYED_ON_LAUNCHER/);
  assert.match(widgetVerifier, /assert_widget_control_geometry/);
  assert.match(widgetVerifier, /widget_resize_surface/);
  assert.match(widgetVerifier, /prove_widget_resize "compact" "vertical"/);
  assert.match(widgetVerifier, /prove_widget_resize "small" "horizontal"/);
  assert.match(widgetVerifier, /lanes=cyan_outbound_gold_return/);
  assert.match(widgetVerifier, /for frame_attempt in \$\(seq 1 6\)/);
  assert.match(widgetVerifier, /sleep 0\.27/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_PIXELS_VERIFIED mode=\$mode/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=\$mode phase=outbound/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT mode=\$mode phase=arrived/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=\$mode phase=return/);
  assert.match(widgetVerifier, /compare -metric AE "\$idle_crop" "\$active_crop"/);
  assert.match(widgetVerifier, /compare -metric AE/);
  assert.doesNotMatch(widgetVerifier, /wait_for_adb/);
  assert.match(widgetVerifier, /AQUA_WIDGET_FILED_TODAY_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_FILED_CONFIRMATION_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_BACKGROUND_FILE_STAYED_ON_LAUNCHER/);
  assert.match(widgetVerifier, /if grep -Fq "AQUA_FILING_CABINET_OPENED"/);
  assert.match(widgetVerifier, /AQUA_WIDGET_LAUNCHER_TAP mode=\$mode resource=\$resource_id/);
  assert.match(widgetVerifier, /ui_node_bounds "\$hierarchy_path" "\^\$package:id\/\$resource_id/);
  assert.doesNotMatch(widgetVerifier, /\$package:id\/\$resource_id\|\$text_fallback/);
  assert.match(widgetVerifier, /widget_logo/);
  assert.match(widgetVerifier, /widget_action/);
  assert.match(widgetVerifier, /widget_file/);
  assert.match(widgetVerifier, /widget_photo/);
  assert.match(widgetVerifier, /widget_video/);
  assert.match(widgetVerifier, /AQUA_WIDGET_ACTION_RECEIVED mode=\$mode/);
  assert.match(widgetVerifier, /AQUA_WIDGET_HOME_OPENED/);
  assert.match(widgetVerifier, /AQUA_CAPTURE_ROUTE mode=\$expected_route/);
  assert.match(widgetVerifier, /AQUA_WIDGET_MESSAGE_SUBMITTED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_MESSAGE_BACKGROUND_SENT/);
  assert.match(widgetVerifier, /AQUA_WIDGET_BACKGROUND_SEND_STAYED_ON_LAUNCHER/);
  assert.match(widgetVerifier, /Aqua Action did not complete its silent background dispatch/);
  assert.doesNotMatch(widgetVerifier, /tap_resource|widget_command_send|widget_command_input/);
  assert.match(widgetVerifier, /AQUA_WIDGET_LAUNCHER_PROCESS_RECREATION_VERIFIED/);
  assert.doesNotMatch(widgetVerifier, /AQUA_WIDGET_REMOTE_VIEWS_TAP/);
});

test("v0.7.4 responsive widget preserves approved art, aligned actions, and truthful filing", async () => {
  const [gradle, manifest, widget, widgetLayout, compactLayout, compactLargeLayout, microLayout, widgetInfo, capture, activity, store, verifier, script, styles, neural4x6, neural2x2, activity4x6, widget4x6, widget2x2] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/res/layout/aqua_command_widget.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_compact.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_compact_large.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_2x2.xml"),
    read("android-app/app/src/main/res/xml/aqua_command_widget_info.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/FilingStore.java"),
    read("scripts/verify-aqua-sentinel-widget-actions-v054.sh"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/res/values/styles.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_paths_4x6.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_paths_2x2.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_activity_4x6.xml"),
    readBytes("android-app/app/src/main/res/drawable-nodpi/aqua_widget_4x6_approved_v073.png"),
    readBytes("android-app/app/src/main/res/drawable-nodpi/aqua_widget_2x2_approved_v073.png"),
  ]);
  assert.match(gradle, /ECOSYSTEM_PRESENTATION_MODE/);
  assert.match(widgetLayout, /id="@\+id\/widget_logo"/);
  assert.doesNotMatch(widgetLayout, /AQUA\\nNEURALINK|AQUA NEURALINK/);
  assert.match(widgetLayout, /@drawable\/aqua_widget_4x6_approved_v073/);
  assert.match(widgetLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(widgetLayout, /@drawable\/aqua_widget_neural_activity_4x6/);
  assert.doesNotMatch(widgetLayout, /widget_shimmer/);
  assert.match(widgetLayout, /id="@\+id\/widget_neural_art"/);
  assert.match(widgetLayout, /id="@\+id\/widget_active_path"/);
  assert.match(widgetLayout, /Selected Aqua Neuralink circuit/);
  assert.match(widgetLayout, /android:scaleType="fitCenter"/);
  assert.doesNotMatch(widgetLayout, /android:scaleType="fitXY"|centerCrop/);
  assert.match(widgetLayout, /id="@\+id\/widget_filed_today"/);
  assert.match(widgetLayout, /android:text="0"/);
  assert.match(widgetLayout, /Items filed today/);
  assert.match(widgetLayout, /id="@\+id\/widget_status"/);
  assert.doesNotMatch(widgetLayout, /LIVING COMMAND CENTER|NEURAL LINK ALIVE|One mind across|READY|PENDING|FILED TODAY/);
  assert.doesNotMatch(widgetLayout, /android:text="(?:ASK AQUA|VIDEO|PHOTO|FILE)"/);
  assert.match(widgetLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.doesNotMatch(widgetLayout, /<View(?:\s|>)/);
  assert.match(compactLayout, /@drawable\/aqua_widget_2x2_approved_v073/);
  assert.match(compactLayout, /id="@\+id\/widget_active_path"/);
  assert.match(compactLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(compactLayout, /@drawable\/aqua_widget_neural_activity_2x2/);
  assert.doesNotMatch(compactLayout, /widget_shimmer|centerCrop|fitXY/);
  assert.match(compactLayout, /android:layout_width="110dp"[\s\S]*android:layout_height="110dp"/);
  assert.match(compactLayout, /id="@\+id\/widget_status"/);
  assert.match(compactLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(compactLargeLayout, /android:layout_width="180dp"[\s\S]*android:layout_height="180dp"/);
  assert.match(compactLargeLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(compactLargeLayout, /id="@\+id\/widget_neural_activity"/);
  assert.doesNotMatch(compactLargeLayout, /widget_shimmer|centerCrop|fitXY/);
  assert.match(microLayout, /two by two living surface/);
  assert.match(microLayout, /@drawable\/aqua_widget_2x2_approved_v073/);
  assert.match(microLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(microLayout, /id="@\+id\/widget_status"/);
  assert.match(microLayout, /id="@\+id\/widget_neural_activity"/);
  assert.doesNotMatch(microLayout, /widget_shimmer|fitXY|centerCrop/);
  assert.doesNotMatch(microLayout, /android:text="(?:ASK|VIDEO|PHOTO|FILE|AQUA)"/);
  assert.match(widgetInfo, /android:targetCellWidth="4"/);
  assert.match(widgetInfo, /android:targetCellHeight="6"/);
  assert.match(widgetInfo, /android:minWidth="110dp"/);
  assert.match(widgetInfo, /android:minHeight="110dp"/);
  assert.match(widgetInfo, /android:minResizeWidth="110dp"/);
  assert.match(widgetInfo, /android:minResizeHeight="110dp"/);
  assert.match(widgetInfo, /android:maxResizeWidth="520dp"/);
  assert.match(widgetInfo, /android:maxResizeHeight="760dp"/);
  assert.match(widgetInfo, /android:resizeMode="horizontal\|vertical"/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_logo, openSentinel\(context\)\)/);
  assert.doesNotMatch(widget, /setOnClickPendingIntent\(R\.id\.widget_brand/);
  assert.match(widget, /String\.valueOf\(FilingStore\.filedTodayCount\(context\)\)/);
  assert.doesNotMatch(widget, /widget_cabinet/);
  assert.match(widget, /R\.layout\.aqua_command_widget_compact/);
  assert.match(widget, /R\.layout\.aqua_command_widget_compact_large/);
  assert.match(widget, /R\.layout\.aqua_command_widget_2x2/);
  assert.match(widget, /OPTION_APPWIDGET_MIN_WIDTH/);
  assert.match(widget, /static int layoutForSize\(int minWidth, int minHeight\)/);
  assert.match(widget, /new RemoteViews\(responsive\)/);
  assert.match(widget, /new SizeF\(110f, 110f\)/);
  assert.match(widget, /new SizeF\(320f, 180f\)/);
  assert.match(widget, /new SizeF\(250f, 390f\)/);
  assert.match(widget, /R\.drawable\.aqua_widget_jolt_compact_file/);
  assert.match(widget, /"outbound"/);
  assert.match(widget, /"return"/);
  assert.match(widget, /"filed"/);
  assert.match(widget, /AQUA_WIDGET_FILED_CONFIRMATION_RENDERED/);
  assert.match(widget, /setViewVisibility\(R\.id\.widget_status/);
  assert.match(capture, /AquaCommandWidget\.showFiled\(this\)/);
  assert.match(styles, /AquaQuickCaptureTheme[\s\S]*android:backgroundDimEnabled">false/);
  assert.match(neural4x6, /M330,430 C292,342 230,224 150,138/);
  assert.match(neural4x6, /M150,138 C230,224 292,342 330,430/);
  assert.match(neural2x2, /M235,235 C204,194 165,151 124,112/);
  assert.match(neural2x2, /M124,112 C165,151 204,194 235,235/);
  assert.match(activity4x6, /outbound_action/);
  assert.match(activity4x6, /return_file/);
  assert.match(store, /static synchronized int filedTodayCount\(Context context\)/);
  assert.match(store, /createdAt >= startOfToday && createdAt < startOfTomorrow/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_action, action\(context, "action", 101\)\)/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_video, action\(context, "video", 102\)\)/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_photo, action\(context, "photo", 103\)\)/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_file, action\(context, "file", 104\)\)/);
  assert.doesNotMatch(widget, /action\(context, "(?:action|video|photo|file)"[^\n]*openFilingCabinet/);
  assert.equal(createHash("sha256").update(widget4x6).digest("hex"), "5c4f5b4f6af264e8ccc9378885a4821c4ff5b9895dac5e984d76dffbfef8b4ca");
  assert.equal(createHash("sha256").update(widget2x2).digest("hex"), "78fd39ad0fd80cfff1707fb49e2cec0d6b3937a913823f79cc1b86951452dbd6");
  assert.deepEqual([widget4x6.readUInt32BE(16), widget4x6.readUInt32BE(20)], [660, 930]);
  assert.deepEqual([widget2x2.readUInt32BE(16), widget2x2.readUInt32BE(20)], [470, 470]);
  assert.match(widget, /static void updateAll\(Context context\)/);
  assert.match(widget, /Intent\.ACTION_MY_PACKAGE_REPLACED/);
  assert.match(widget, /onAppWidgetOptionsChanged/);
  assert.match(widget, /onRestored/);
  assert.match(manifest, /android\.intent\.action\.MY_PACKAGE_REPLACED/);
  assert.match(manifest, /com\.aquasoftware\.sentinel\.action\.WIDGET_PINNED/);
  assert.match(activity, /AquaCommandWidget\.updateAll\(this\)/);
  assert.match(activity, /requestPinAppWidget/);
  assert.match(activity, /installOrRepairCommandWidget/);
  assert.match(activity, /getCommandWidgetStatus/);
  assert.match(script, /window\.receiveCommandWidgetStatus/);
  assert.match(script, /data-command-widget/);
  assert.match(capture, /EXTRA_FILING_TEXT = "widget_filing_text"/);
  assert.match(capture, /handler=PresentationContract/);
  assert.match(capture, /mode = "file"\.equals\(requestedMode\) \? "voice" : requestedMode/);
  assert.match(store, /ACTION_INBOX_CHANGED/);
  assert.match(store, /setPackage\(context\.getPackageName\(\)\)/);
  assert.match(activity, /private void deliverFilingInbox\(\)/);
  assert.match(activity, /AQUA_FILING_INBOX_DELIVERED items=/);
  assert.match(activity, /AQUA_FILING_CABINET_OPENED/);
  assert.match(activity, /BuildConfig\.ECOSYSTEM_PRESENTATION_MODE/);
  assert.match(verifier, /AQUA_WIDGET_LAUNCHER_TAP mode=\$mode resource=\$resource_id/);
  assert.match(verifier, /AQUA_CAPTURE_SAVED type=voice/);
  assert.match(verifier, /AQUA_CAPTURE_BACKGROUND_COMPLETE type=voice/);
  assert.match(verifier, /AQUA_WIDGET_FILED_TODAY_VERIFIED count=\$filed_today/);
  assert.match(verifier, /AQUA_WIDGET_BACKGROUND_FILE_STAYED_ON_LAUNCHER/);
  assert.doesNotMatch(verifier, /wait_for_log "AQUA_FILING_CABINET_OPENED"/);
  assert.doesNotMatch(verifier, /wait_for_log "AQUA_FILING_INBOX_DELIVERED/);
});
