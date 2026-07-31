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

test("APK renders all seven satellite landing pages and launches installed apps", async () => {
  const [script, fidelity, manifest] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/AndroidManifest.xml"),
  ]);
  assert.match(script, /class="app-landing-preview layout-\$\{app\.name/);
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

test("carousel previews and lower intelligence cards use verified refreshable snapshots", async () => {
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
  assert.match(script, /class=\"app-landing-preview layout-\$\{app\.name/);
  assert.match(script, /snapshotPresentation/);
  assert.match(script, /formatSnapshotTime/);
  assert.match(script, /primaryStatus/);
  assert.match(script, /secondaryStatus/);
  assert.match(script, /60_000/);
  assert.doesNotMatch(script, /value: "24"/);
  assert.doesNotMatch(script, /value: "47"/);
  assert.doesNotMatch(script, /value: "\$184K"/);
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

test("v0.5.4 preserves the isolated customer preview and synchronized lower cards", async () => {
  const [gradle, workflow, script, html, fidelity] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/index.html"),
    read("sentient-os-web/fidelity.css"),
  ]);
  assert.match(gradle, /versionCode = 2026073107/);
  assert.match(gradle, /versionName = "0\.5\.4-command-center-message-test"/);
  assert.match(gradle, /providers\.gradleProperty\("aqua\.customerPreview"\)\.orElse\("false"\)/);
  assert.match(workflow, /AquaSentinelOS-v0\.5\.4-COMMAND-CENTER-MESSAGE-TEST\.apk/);
  assert.match(workflow, /-Paqua\.customerPreview=true/);
  assert.match(script, /renderFallbackPreview/);
  assert.match(script, /Live · confirmed/);
  assert.match(script, /label: "Local preview", className: "preview"/);
  assert.match(html, /id="primaryStatus"/);
  assert.match(html, /id="secondaryStatus"/);
  assert.match(fidelity, /v0\.4\.9 app-screen clarity and synchronized command cards/);
  assert.match(fidelity, /color:#fff/);
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
  assert.match(widget, /widget_ask/);
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
  assert.match(script, /function dashboardScreenMarkup/);
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

test("v0.5.4 submits widget messages and still returns filing captures to the cabinet", async () => {
  const [widget, capture, activity, layout, script, styles, workflow, widgetVerifier] = await Promise.all([
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/app/src/main/res/layout/aqua_quick_command.xml"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/res/values/styles.xml"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("scripts/verify-aqua-sentinel-widget-actions-v054.sh"),
  ]);
  assert.match(widget, /PendingIntent\.FLAG_UPDATE_CURRENT \| PendingIntent\.FLAG_IMMUTABLE/);
  assert.match(widget, /setPackage\(context\.getPackageName\(\)\)/);
  assert.match(capture, /AQUA_WIDGET_ACTION_RECEIVED mode=/);
  assert.match(capture, /AQUA_CAPTURE_ROUTE mode=/);
  assert.match(capture, /AQUA_CAPTURE_SAVED type=/);
  assert.match(capture, /showCommandSurface\(\)/);
  assert.match(capture, /STATE_COMMAND_TEXT/);
  assert.match(capture, /AQUA_WIDGET_MESSAGE_SUBMITTED id=/);
  assert.match(capture, /putExtra\("widget_command", text\)/);
  assert.match(activity, /AQUA_WIDGET_MESSAGE_DELIVERED id=/);
  assert.match(activity, /window\.receiveWidgetCommand/);
  assert.match(layout, /id="@\+id\/widget_command_input"/);
  assert.match(layout, /id="@\+id\/widget_command_speak"/);
  assert.match(layout, /id="@\+id\/widget_command_send"/);
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
  assert.match(capture, /private void openFilingCabinet\(\)/);
  assert.match(capture, /putExtra\("open_filing", true\)/);
  assert.match(styles, /<item name="android:clickable">true<\/item>/);
  assert.match(workflow, /bash scripts\/verify-aqua-sentinel-widget-actions-v054\.sh/);
  assert.match(widgetVerifier, /for mode in ask voice photo video/);
  assert.match(widgetVerifier, /AQUA_WIDGET_ACTION_RECEIVED mode=\$mode/);
  assert.match(widgetVerifier, /AQUA_CAPTURE_ROUTE mode=\$mode/);
  assert.match(widgetVerifier, /AQUA_WIDGET_MESSAGE_SUBMITTED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_MESSAGE_DELIVERED/);
});
