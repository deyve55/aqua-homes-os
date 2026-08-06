import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const readBytes = (path) => readFile(new URL(path, root));

test("every Aqua app has one pinned mandatory diagnostics installation target", async () => {
  const [packageJson, schema, installation] = await Promise.all([
    read("packages/aqua-diagnostics-core/package.json").then(JSON.parse),
    read("packages/aqua-diagnostics-core/diagnostic-receipt.schema.json").then(JSON.parse),
    read("packages/aqua-diagnostics-core/installation-manifest.json").then(JSON.parse),
  ]);
  assert.equal(packageJson.version, "1.0.0");
  assert.equal(schema.properties.contractVersion.const, "1.0.0");
  assert.equal(installation.contractVersion, "1.0.0");
  assert.equal(installation.apps.length, 9);
  assert.deepEqual(
    installation.apps.slice(1, 5).map((app) => app.id),
    ["cam", "draw", "timesheet", "pulse"],
  );
  assert.equal(installation.apps[0].status, "installed_reference");
  assert.equal(installation.apps[0].verification, "source_verified");
  assert.ok(installation.apps.slice(1).every((app) => app.status === "mandatory_installation"));
  assert.ok(installation.apps.slice(1).every((app) => app.verification === "pending_app_build"));
});

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

test("APK renders eight operational portals, two reserved cards, and launches installed apps", async () => {
  const [html, script, fidelity, manifest, activity, pulseAsset] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("sentient-os-web/assets/carousel-v2/pulse.svg"),
  ]);
  assert.match(script, /function dashboardPanelMarkup/);
  assert.match(script, /class="dashboard-panel-preview"/);
  assert.match(script, /PRESENTATION DATA/);
  for (const layout of ["mini-kpis", "mini-finance", "mini-viewfinder", "mini-search", "mini-clock", "mini-ledger", "mini-inbox"]) {
    assert.match(script, new RegExp(layout));
  }
  assert.doesNotMatch(script, /APP INTERFACE RESERVED/);
  for (const app of ["Aqua CRM", "AquaDraw", "AquaCam", "Aqua Knowledge Vault", "Aqua Timesheet", "Aqua Books", "Aqua Receipts", "AquaPulse"]) assert.match(script, new RegExp(app));
  assert.match(script, /name: "Future Aqua App One"[\s\S]*placeholder: true/);
  assert.match(script, /name: "Future Aqua App Two"[\s\S]*placeholder: true/);
  assert.match(script, /function isInstalledAquaApp\(app\)/);
  assert.match(script, /AquaBridge\.isAppInstalled/);
  assert.match(script, /Opened inside Aqua Sentinel OS for field testing/);
  assert.match(script, /AquaBridge\.launchApp/);
  for (const packageName of [
    "com.aquasoftware.crm.fieldtest",
    "com.aquahomesdesigngroup.draw.beta",
    "com.aquahomesdesign.cam.obsidianpreview",
    "com.aquahomes.knowledgevault",
    "com.aquahomes.timesheet.engineering",
    "com.aquasoftware.aquabooks",
    "com.aquasoftware.receipts.test",
    "com.aquasoftware.aquapulse",
  ]) {
    assert.match(script, new RegExp(packageName.replaceAll(".", "\\.")));
    assert.match(manifest, new RegExp(packageName.replaceAll(".", "\\.")));
  }
  assert.match(activity, /public boolean isAppInstalled\(String packageJson\)/);
  assert.match(html, /id="aquaPresenceButton"/);
  assert.match(html, /class="aqua-card-holder"/);
  assert.match(html, /id="aquaPulseNavButton"[\s\S]*data-app-name="AquaPulse"/);
  assert.match(html, /id="aquaPulseNavBadge"/);
  assert.match(pulseAsset, /<svg/);
  assert.match(pulseAsset, /aria-label="AquaPulse financial heart"/);
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

test("native voice uses protected Realtime without an Android voice impersonation fallback", async () => {
  const [script, activity, gradleProperties] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/gradle.properties"),
  ]);
  assert.match(script, /AquaBridge\.askAqua/);
  assert.match(script, /window\.startAquaRealtime/);
  assert.match(script, /RTCPeerConnection/);
  assert.match(script, /receiveRealtimeToolResult/);
  assert.match(script, /receiveAquaResponse/);
  assert.match(script, /applyAquaAction/);
  assert.match(script, /showMaterialization/);
  assert.doesNotMatch(script, /function commandResponse/);
  assert.match(activity, /BuildConfig\.AQUA_GATEWAY_URL/);
  assert.match(activity, /"jsonrpc", "2\.0"/);
  assert.match(activity, /"session\.create"/);
  assert.match(activity, /"aqua\.chat"/);
  assert.match(activity, /postRealtimeSdp/);
  assert.match(activity, /"\/realtime"/);
  assert.match(activity, /PermissionRequest\.RESOURCE_AUDIO_CAPTURE/);
  assert.match(activity, /WebViewAssetLoader/);
  assert.match(gradleProperties, /^android\.useAndroidX=true$/m);
  assert.match(activity, /https:\/\/appassets\.androidplatform\.net\/assets\/public\/index\.html/);
  assert.match(activity, /"https:\/\/appassets\.androidplatform\.net\/"\.equals\(origin\)/);
  assert.match(activity, /AndroidKeyStore/);
  assert.doesNotMatch(activity, /grant_type=password/);
  assert.doesNotMatch(activity, /grant_type=refresh_token/);
  assert.doesNotMatch(activity, /supabase/i);
  assert.doesNotMatch(activity, /SpeechRecognizer/);
  assert.doesNotMatch(activity, /TextToSpeech/);
  assert.doesNotMatch(activity, /startLegacyListening/);
  assert.doesNotMatch(script, /startLegacyListening/);
  assert.match(script, /rememberAquaRealtime/);
  assert.match(script, /recallAquaRealtime/);
  assert.match(activity, /aqua\.memory\.remember/);
  assert.match(activity, /aqua\.memory\.recall/);
  assert.match(script, /createReminderRealtime/);
  assert.match(script, /run_app_diagnostics/);
  assert.match(script, /lastAquaDiagnosticError/);
  assert.match(script, /truthBoundary: "Read-only diagnostics; no repair was executed\."/);
  assert.match(script, /AQUA_DIAGNOSTICS_CONTRACT_VERSION = "1\.0\.0"/);
  assert.match(script, /function buildUniversalDiagnosticReceipt\(symptom, state = deviceDiagnostics\)/);
  assert.match(activity, /DIAGNOSTICS_CONTRACT_VERSION = "1\.0\.0"/);
  assert.match(activity, /\.put\("correlationId", UUID\.randomUUID\(\)\.toString\(\)\)/);
  assert.match(activity, /REALTIME_CALENDAR_REQUEST/);
  assert.match(activity, /CalendarQuickAction\.execute\(this, action\)/);
  assert.match(activity, /FilingStore\.enqueueCalendarReceipt\(this, action, result\)/);
});

test("owner access uses a one-time activation page and keeps the session in Android Keystore", async () => {
  const [page, script, activity, workflow] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
  ]);
  assert.match(page, /Get One-Time Activation Code/);
  assert.match(page, /autocomplete="one-time-code"/);
  assert.match(script, /openActivationPage/);
  assert.match(activity, /public void openActivationPage\(\)/);
  assert.match(activity, /\/activate/);
  assert.match(activity, /"activationCode", activationCode/);
  assert.match(activity, /AndroidKeyStore/);
  assert.match(workflow, /AQUA_GATEWAY_URL: https:\/\/aqua-sentinel-os\.deyve-docarm-5626\.chatgpt\.site\/api\/gateway/);
});

test("voice models are server-selected and the ecosystem routing contract is exact", async () => {
  const [policy, realtime, environment] = await Promise.all([
    read("backend/model-policy.mjs"),
    read("backend/realtime-session.mjs"),
    read(".env.example"),
  ]);
  const routingSources = `${policy}\n${realtime}\n${environment}`;
  assert.match(routingSources, /gpt-realtime-2\.1/);
  assert.match(routingSources, /gpt-4o-transcribe/);
  assert.match(policy, /gpt-realtime-2\.1-mini/);
  assert.match(realtime, /semantic_vad/);
  assert.match(realtime, /eagerness: 'low'/);
  assert.doesNotMatch(realtime, /gpt-4o-mini-transcribe/);
  assert.match(realtime, /AQUA-REFERENCE-CANDIDATE-01/);
  assert.match(realtime, /warm, alive, observant, quick, energetic/);
  assert.match(realtime, /name: 'remember_detail'/);
  assert.match(realtime, /name: 'recall_memory'/);
  assert.match(realtime, /name: 'create_reminder'/);
  assert.match(realtime, /RUN_APP_DIAGNOSTICS_TOOL/);
});

test("startup continuity records the owner-trial Aqua reference without promoting it", async () => {
  const [candidate, takeover] = await Promise.all([
    read("00-START-HERE/AQUA-AI-REFERENCE-CANDIDATE-2026-08-05.md"),
    read("00-START-HERE/AQUA-SENTINEL-BACKEND-ECOSYSTEM-TAKEOVER-2026-08-05.md"),
  ]);
  assert.match(candidate, /OWNER TRIAL — NOT CANONICAL/);
  assert.match(candidate, /resolve what Dave meant/);
  assert.match(candidate, /gpt-realtime-2\.1-mini/);
  assert.match(candidate, /gpt-4o-transcribe/);
  assert.match(candidate, /Aqua AI \/ Aqua Brain/);
  assert.match(takeover, /AQUA-AI-REFERENCE-CANDIDATE-2026-08-05\.md/);
  assert.match(takeover, /not canonical/i);
});

test("an unavailable gateway cannot block truthful Standalone startup", async () => {
  const [gradle, html, script, activity] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
  ]);
  assert.match(gradle, /versionCode = 2026080504/);
  assert.match(gradle, /versionName = "0\.8\.4-live-aqua-daily-ledger"/);
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

test("Aqua Brain can use live web search without moving the API key into the APK", async () => {
  const agent = await read("backend/aqua-agent.mjs");
  assert.match(agent, /Agent, run, tool, webSearchTool/);
  assert.match(agent, /webSearchTool\(\{ searchContextSize: 'medium', externalWebAccess: true \}\)/);
  assert.match(agent, /Use live web search when the user explicitly asks/);
  assert.doesNotMatch(agent, /OPENAI_API_KEY\s*=/);
});

test("authenticated neural firing waits for a server-confirmed Aqua application route", async () => {
  const [agent, script] = await Promise.all([
    read("backend/aqua-agent.mjs"),
    read("sentient-os-web/app.js"),
  ]);
  assert.match(agent, /name: 'route_aqua_capability'/);
  assert.match(agent, /context\.routedCapability = manifest/);
  assert.match(agent, /parsed\.receipt\.sources = Array\.from\(new Set/);
  assert.match(script, /function beginLiveAquaRequest\(command, intent = null\)/);
  assert.match(script, /neuralFocusIndex = -1;[\s\S]*Aqua stays centered until the secure gateway confirms/);
  assert.match(script, /function confirmedNeuralIntent\(response\)/);
  assert.match(script, /function activateConfirmedNeuralRoute\(response\)/);
  assert.match(script, /const confirmedIntent = activateConfirmedNeuralRoute\(response\);/);
  assert.match(script, /No application tether fired because the secure gateway did not route this answer/);
});

test("the premium Neural Link keeps seven operational portals alive while Aqua morphs into the operating surface", async () => {
  const [html, script, fidelity, serviceWorker] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("sentient-os-web/sw.js"),
  ]);
  assert.match(html, /data-panel="neural"[\s\S]*Neural Link/);
  assert.match(html, /data-panel="command"[\s\S]*Command/);
  assert.match(script, /AQUA SENTINEL NEURAL LINK/);
  assert.match(script, />AQUA SENTINEL</);
  assert.doesNotMatch(script, /systemHeader\("Neural Workspace"\)/);
  assert.match(script, /class="neural-network"/);
  assert.match(script, /class="neural-microbursts"/);
  assert.match(script, /class="neural-burst burst-\$\{laneIndex\}"/);
  assert.match(script, /class="portal-node\$\{app\.neuralAsset \? " has-environment" : ""\}">\$\{environment\}/);
  assert.match(script, /neuralAsset: "\.\/assets\/carousel-v2\/crm\.webp"/);
  assert.doesNotMatch(script, /class="neural-particles"/);
  assert.match(script, /class="neural-jolt"/);
  assert.match(script, /neural-substrate-map neural-substrate-rest/);
  assert.match(script, /neural-substrate-map neural-substrate-result/);
  assert.match(script, /neural-substrate-fire neural-substrate-cyan/);
  assert.match(script, /const neuralRingSlots =/);
  assert.match(script, /Sentinel sits above the ecosystem/);
  assert.match(script, /data-neural-visible-portals="7"/);
  assert.match(script, /let neuralVisibleIndexes = \[0, 1, 7, 2, 4, 5, 6\]/);
  assert.match(script, /filter\(\(\{ app \}\) => !app\.placeholder\)/);
  assert.match(script, /function neuralFixedSlotForSource\(sourceIndex\)/);
  assert.match(script, /function promoteNeuralSource\(sourceIndex\)/);
  assert.match(script, /neuralVisibleIndexes\[destinationSlot\] = previousTop/);
  assert.match(script, /neuralVisibleIndexes\[0\] = sourceIndex/);
  assert.match(script, /const NEURAL_ORIGIN = \{ x: 50, y: 30 \}/);
  assert.match(script, /\{ x: 50, y: 47, scale: 1\.18/);
  assert.match(script, /\{ x: 22, y: 49, scale: \.94/);
  assert.match(script, /\{ x: 87, y: 65, scale: \.84/);
  assert.match(script, /function identifyNeuralIntent\(rawText\)/);
  assert.match(script, /function beginNeuralRequest\(command\)/);
  assert.match(script, /function identifySentinelNavigation\(rawText\)/);
  assert.match(script, /function navigateSentinelByVoice\(destination\)/);
  for (const panel of ["diagnostics", "command", "files", "settings", "data", "messages", "home", "neural"]) {
    assert.match(script, new RegExp(`panel: "${panel}"`));
  }
  assert.match(script, /const sentinelDestination = identifySentinelNavigation\(command\)/);
  assert.match(script, /sentinelDestination && navigateSentinelByVoice\(sentinelDestination\)/);
  assert.match(script, /Applications: \$\{appStates\}/);
  assert.match(script, /function isExplicitDeepOpen\(rawText\)/);
  assert.match(script, /directIntent && isExplicitDeepOpen\(command\)/);
  assert.match(script, /function scheduleNeuralDestination\(intent\)/);
  assert.match(script, /NEURAL_DESTINATION_OPEN_MILLIS = NEURAL_AMBIENT_FIRE_MILLIS \+ 180/);
  assert.equal(script.includes("let'?s\\s+go"), true);
  assert.match(script, /const intent = beginNeuralRequest\(command\)[\s\S]*scheduleNeuralDestination\(intent\)/);
  assert.doesNotMatch(
    script.match(/if \(directIntent && isExplicitDeepOpen\(command\)\) \{([\s\S]*?)\n  \}/)?.[1] || "",
    /launchAppByIndex|openPanel\("files"\)/,
  );
  assert.match(script, /function startVoice\(\) \{[\s\S]*openPanel\("neural"\)/);
  assert.match(script, /window\.receiveWidgetCommand = \(text\) => \{[\s\S]*openPanel\("neural"\)/);
  assert.match(script, /function returnNeuralToRest\(\)/);
  assert.match(script, /data-neural-path="\$\{index\}"/);
  assert.doesNotMatch(script, /class="neural-traveler/);
  assert.match(script, /const bursts = \[0, 1, 2, 3\]/);
  assert.doesNotMatch(script, /const bursts = \[0, 1, 2, 3, 4, 5\]/);
  assert.match(script, /function paintNeuralMorphProgress\(stage, progress\)/);
  const morphPainter = script.match(/const paintMorph = \(now\) => \{([\s\S]*?)\n    \};/)?.[1] || "";
  assert.match(morphPainter, /paintNeuralMorphProgress\(stage, progress\)/);
  assert.doesNotMatch(morphPainter, /layoutNeuralStage/);
  assert.match(script, /label: `Go deeper into \$\{app\.name\}`/);
  assert.match(script, /Presentation · Not Live/);
  assert.match(script, /const NEURAL_SELECT_MILLIS = 220/);
  assert.match(script, /const NEURAL_FIRE_MILLIS = 320/);
  assert.match(script, /const NEURAL_MORPH_MILLIS = 420/);
  assert.match(script, /const NEURAL_ACK_BUDGET_MILLIS = 100/);
  assert.match(script, /const NEURAL_ADDED_UI_DELAY_MILLIS = 0/);
  assert.doesNotMatch(script, /neuralStage\.addEventListener\("pointermove"/);
  assert.doesNotMatch(script, /neuralStage\.setPointerCapture/);
  assert.doesNotMatch(script, /neuralIdleTimer|startNeuralIdleRotation|ringOffset/);
  assert.match(script, /function neuralRouteTransform\(slot\)/);
  assert.match(script, /data-neural-source-group="\$\{index\}"/);
  assert.match(script, /group\.setAttribute\("transform", neuralRouteTransform\(slot\)\)/);
  assert.match(script, /group\.style\.visibility = Number\(slot\.opacity \?\? 1\) > \.15 \? "visible" : "hidden"/);
  assert.match(script, /portal\.style\.opacity = String\(slot\.opacity \?\? 1\)/);
  assert.match(script, /if \(kind === "neural"\) \{\s*\/\/[^\n]*\n\s*\/\/[^\n]*\n\s*layoutNeuralStage\(\);\s*renderNeuralMaterialization\(\);\s*\}/);
  assert.doesNotMatch(script, /if \(kind === "neural"\) \{\s*requestAnimationFrame/);
  assert.match(script, /materializationAnimation\.id = "aqua-neural-materialization-box"/);
  assert.match(script, /left: `\$\{sourceBox\.left\}px`/);
  assert.doesNotMatch(script, /content\.animate\(\[/);
  assert.match(script, /sourceIndex === neuralFocusIndex/);
  assert.match(script, /neuralSupportIndexes\.includes\(sourceIndex\)/);
  assert.doesNotMatch(script, /neuralPortalAnimationsBetween|animateNeuralRingTo|coastNeuralRing/);
  assert.doesNotMatch(script, /setAttribute\("d"/);
  assert.match(script, /neuralPhase = "selecting"/);
  assert.match(script, /neuralPhase = "firing"/);
  assert.match(script, /promoteNeuralSource\(index\)/);
  assert.match(script, /neuralAcknowledgedAt = performance\.now\(\)/);
  assert.match(script, /focusNeuralSource\(index, supporting\);\s*portalMaterialization\(index\);/);
  assert.match(script, /class="command-vault"/);
  assert.match(script, /data-filing-action="voice"/);
  assert.match(script, /File Cabinet/);
  assert.match(script, /portalMaterialization/);
  assert.match(script, /data-materialized-expand/);
  assert.match(script, /data-neural-materialized="\$\{neuralPhase === "transitioning" \? "pending" : "true"\}"/);
  assert.match(script, /diagnosticsMarkup/);
  assert.match(script, /settingsMarkup/);
  for (const setting of ["sound", "notifications", "voice-test", "permissions", "integrations", "storage", "diagnostics", "about"]) {
    assert.match(script, new RegExp(`data-setting="${setting}"`));
  }
  assert.match(script, /function animateMaterializationFromPortal\(\)/);
  assert.match(script, /source\.getBoundingClientRect\(\)/);
  assert.match(script, /targetBounds = surface\.getBoundingClientRect\(\)/);
  assert.match(script, /shell\.animate\(\[/);
  assert.match(script, /surface\.animate\(\[/);
  assert.match(script, /class="neural-morph-shell"/);
  assert.match(script, /class="neural-selected-chip"/);
  assert.match(script, /class="neural-continuation"/);
  assert.match(script, /data-reference-composition="live-neural-substrate-v080"/);
  assert.match(script, /borderRadius: targetRadius/);
  assert.doesNotMatch(
    script.match(/function animateMaterializationFromPortal\(\) \{([\s\S]*?)\n\}/)?.[1] || "",
    /clipPath|clip-path/,
  );
  assert.match(fidelity, /\.neural-stage/);
  assert.match(fidelity, /height:clamp\(610px,73svh,780px\)/);
  assert.match(fidelity, /\.neural-signal\.is-active/);
  assert.match(fidelity, /\.neural-stage\[data-phase="selecting"\]/);
  assert.match(fidelity, /\.neural-stage\[data-phase="firing"\]/);
  assert.match(fidelity, /color:rgba\(156,226,238,\.68\)/);
  assert.match(fidelity, /letter-spacing:\.34em/);
  assert.match(fidelity, /\.neural-thought\{/);
  assert.match(fidelity, /\.portal-node>img\{position:absolute/);
  assert.match(fidelity, /\.portal-pull\{aspect-ratio:1;padding:6%;overflow:hidden;border-radius:50%/);
  assert.match(fidelity, /@keyframes neural-signal-return/);
  const appFirstNeuralink = fidelity.slice(fidelity.lastIndexOf("App-first Neuralink correction"));
  assert.match(appFirstNeuralink, /five clear app portals, one static Aqua mark, restrained neural traffic/);
  assert.doesNotMatch(appFirstNeuralink, /neuralink-(?:rest|materialized)-v071\.png/);
  assert.match(appFirstNeuralink, /linear-gradient\(180deg,#01080c 0,#000508 52%,#000 100%\)!important/);
  assert.match(appFirstNeuralink, /\.aqua-mark-orb\{opacity:\.72;animation:none!important\}/);
  assert.match(appFirstNeuralink, /\.neural-portal \.portal-pull\{[\s\S]*background:rgba\(0,4,7,\.96\)[\s\S]*overflow:hidden/);
  assert.match(appFirstNeuralink, /\.neural-portal \.portal-node>img\{[^}]*width:92%;height:76%;object-fit:cover/);
  assert.match(appFirstNeuralink, /data-phase="selecting"[\s\S]*neural-top-portal-materialize/);
  assert.match(appFirstNeuralink, /linear-gradient\(180deg,transparent 0,#fff 9%,#65efff 32%,#f2ba63 55%/);
  assert.match(appFirstNeuralink, /\.neural-network\{[\s\S]*opacity:\.6!important/);
  assert.match(appFirstNeuralink, /\.neural-signal\{[\s\S]*opacity:\.68/);
  assert.match(fidelity, /neural-link-live-substrate-v080\.png/);
  assert.match(serviceWorker, /aqua-sentinel-os-v0\.8\.0-physical-device-review/);
  assert.match(fidelity, /\.aqua-mark-orb,[\s\S]*\.aqua-mark-orb-core\{display:none!important\}/);
  assert.match(fidelity, /\.neural-jolt\{display:none!important\}/);
  assert.match(fidelity, /stroke-dasharray:14 86/);
  assert.match(fidelity, /@keyframes aqua-neural-edge-listen/);
  assert.match(fidelity, /data-aqua-state="listening"[\s\S]*\.aqua-mark-outer/);
  assert.match(appFirstNeuralink, /data-phase="firing"[\s\S]*neural-jolt-column/);
  assert.match(appFirstNeuralink, /data-phase="result"[\s\S]*\.neural-portal,[\s\S]*opacity:0!important/);
  assert.match(appFirstNeuralink, /data-phase="result"[^}]*\.neural-portal\{transition:none!important\}/);
  assert.match(appFirstNeuralink, /data-phase="transitioning"[\s\S]*\.neural-portal\.is-dormant\{opacity:0!important;pointer-events:none\}/);
  assert.match(appFirstNeuralink, /\.neural-morph-shell\{[\s\S]*linear-gradient\(180deg,#031017,#00070a 46%,#000305\)/);
  assert.match(fidelity, /@keyframes neural-substrate-cyan-out/);
  assert.match(fidelity, /@keyframes neural-substrate-gold-return/);
  assert.match(fidelity, /@keyframes neural-path-fire/);
  assert.match(fidelity, /@keyframes neural-jolt-up/);
  const ownerReferenceNeuralink = fidelity.slice(fidelity.lastIndexOf("v0.7.7 owner-reference Neural Link"));
  assert.match(ownerReferenceNeuralink, /neural-link-reference-rest-owner-v077\.png/);
  assert.match(ownerReferenceNeuralink, /neural-link-reference-morph-owner-v077\.png/);
  assert.match(ownerReferenceNeuralink, /animation:neural-path-fire 2\.25s linear infinite/);
  assert.match(ownerReferenceNeuralink, /data-phase="selecting"[\s\S]*neural-owner-engorge/);
  assert.match(ownerReferenceNeuralink, /data-phase="firing"[\s\S]*neural-owner-shot/);
  assert.match(ownerReferenceNeuralink, /data-phase="result"[\s\S]*clip-path:inset\(0 66% 0 0\)/);
  assert.match(ownerReferenceNeuralink, /\.neural-selected-chip/);
  assert.match(ownerReferenceNeuralink, /\.neural-continuation/);
  assert.ok(
    fidelity.lastIndexOf(".neural-jolt{display:none!important}")
      > fidelity.lastIndexOf("neural-jolt-up"),
    "the final physical-device override must suppress legacy circular travelers",
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
  assert.match(manifest, /android\.speech\.RecognitionService/);
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

test("Fold hero distinguishes live Realtime listening from speaking energy", async () => {
  const [script, fidelity] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
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
  assert.match(script, /response\.output_audio_transcript\.delta/);
  assert.match(script, /audio\.onplay = \(\) => setAquaState\("speaking"\)/);
  assert.match(fidelity, /@keyframes aqua-orb-shot-x/);
  assert.match(fidelity, /@keyframes aqua-orb-shot-y/);
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

test("v0.8.4 preserves Home while direct Aqua talk and Neural materialization stay distinct", async () => {
  const [gradle, workflow, script, html, fidelity, androidLaunch, neuralLiveProof, visualRenderer] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/index.html"),
    read("sentient-os-web/fidelity.css"),
    read("scripts/verify-aqua-sentinel-android-launch-v060.sh"),
    read("scripts/verify-aqua-sentinel-neural-live-wall-clock.mjs"),
    read("scripts/render-aqua-sentinel-visual-proof.mjs"),
  ]);
  assert.match(gradle, /versionCode = 2026080504/);
  assert.match(androidLaunch, /versionCode=2026080504/);
  assert.match(script, /versionName: "0\.8\.4-live-aqua-daily-ledger"/);
  assert.match(script, /versionCode: 2026080504/);
  assert.match(script, /<b>0\.8\.4<\/b>/);
  assert.match(gradle, /versionName = "0\.8\.4-live-aqua-daily-ledger"/);
  assert.match(gradle, /providers\.gradleProperty\("aqua\.customerPreview"\)\.orElse\("false"\)/);
  assert.match(gradle, /providers\.gradleProperty\("aqua\.ecosystemPreview"\)\.orElse\("false"\)/);
  assert.doesNotMatch(gradle, /storeFile = file\(System\.getenv\("AQUA_RELEASE_KEYSTORE_PATH"\)\)/);
  assert.match(gradle, /\?\.let \{ storeFile = file\(it\) \}/);
  assert.match(workflow, /AquaSentinelOS-v0\.8\.4-Live-Aqua-Daily-Ledger\.apk/);
  assert.match(workflow, /owner_visual_approval/);
  assert.match(workflow, /github\.event_name == 'workflow_dispatch' && inputs\.owner_visual_approval/);
  assert.match(workflow, /preflight-no-apk:/);
  assert.match(workflow, /compileDebugJavaWithJavac :app:mergeDebugResources/);
  assert.match(workflow, /AquaSentinelOS-v0\.8\.0-preflight-no-apk/);
  assert.match(workflow, /Retain preflight visual evidence[\s\S]*if: \$\{\{ always\(\) \}\}/);
  assert.match(visualRenderer, /AQUA_RESULT_DOCUMENT_PIXEL_GATE/);
  assert.match(visualRenderer, /resultDocumentPixelMean >= \.28/);
  assert.match(visualRenderer, /inflateSync/);
  assert.match(visualRenderer, /maxRetries: 5/);
  const noApkPreflight = workflow.match(/preflight-no-apk:[\s\S]*?\n  build-apk:/)?.[0] || "";
  assert.doesNotMatch(noApkPreflight, /assemble|\.apk/);
  assert.match(workflow, /-Paqua\.ecosystemPreview=true/);
  assert.match(workflow, /preview=neural/);
  assert.match(workflow, /neuralDemo=sequence/);
  assert.match(visualRenderer, /neuralDemo=sequence&neuralAt=100/);
  assert.match(visualRenderer, /neuralDemo=sequence&neuralAt=300/);
  assert.match(visualRenderer, /neuralDemo=sequence&neuralAt=720/);
  assert.match(visualRenderer, /neuralDemo=sequence&neuralAt=980/);
  assert.match(visualRenderer, /\["00", 560, "0\.048"\][\s\S]*\["06", 920, "0\.905"\]/);
  assert.match(visualRenderer, /animation\.id === 'aqua-neural-materialization-box'/);
  assert.match(visualRenderer, /returnedDocumentWidth >= state\.materializationWidth \* \.7/);
  assert.match(visualRenderer, /openFileTextFits/);
  assert.match(visualRenderer, /preview=conversation/);
  assert.match(visualRenderer, /AquaSentinelOS-v0\.8\.4-Direct-Aqua-Conversation\.png/);
  assert.match(visualRenderer, /state\.heroArtOpacity <= \.01/);
  assert.match(visualRenderer, /state\.voiceCoreAnimation\.includes\("aqua-orb-axis-pulse"\)/);
  const startVoice = script.match(/function startVoice\(\) \{[\s\S]*?\n\}/)?.[0] || "";
  assert.match(startVoice, /setCompactAquaConversation\(!alreadyInNeural\)/);
  assert.doesNotMatch(startVoice, /openPanel\("neural"\)/);
  assert.match(script, /payload\.result\.materialization\?\.present[\s\S]*activateConfirmedNeuralRoute/);
  assert.match(fidelity, /v0\.8\.4 owner-approved direct Aqua conversation/);
  assert.match(fidelity, /\.sentinel\.aqua-conversation-active \.hero-art\{opacity:0/);
  assert.match(fidelity, /@keyframes aqua-orb-axis-pulse/);
  assert.match(fidelity, /@keyframes aqua-side-shot-left/);
  assert.match(workflow, /Neural-Link-Morph-closed-phone\.png/);
  assert.match(workflow, /data-aqua-neural-phase="transitioning"/);
  assert.match(workflow, /preview=command/);
  assert.match(script, /enableEcosystemPresentationMode/);
  assert.match(
    script,
    /window\.location\.protocol === "file:" && \["home", "conversation", "neural"\]\.includes\(previewPanel\)/,
  );
  assert.match(script, /function activateDeterministicPreviewRoute\(\)/);
  assert.match(script, /\["home", "conversation", "neural", "command", "settings", "diagnostics", "data", "files", "messages", "about"\]\.includes\(previewPanel\)/);
  assert.match(script, /\["home", "conversation"\]\.includes\(previewPanel\)/);
  assert.match(script, /previewPanel === "conversation"[\s\S]*setCompactAquaConversation\(true\)[\s\S]*setAquaState\("listening"\)/);
  assert.match(script, /const demo = previewParameters\.get\("neuralDemo"\) \|\| "rest"/);
  assert.match(script, /if \(\["focus", "select", "rotate", "fire", "transition", "company", "receipt", "result"\]\.includes\(demo\)\)/);
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
  assert.match(workflow, /AquaSentinelOS-v0\.8\.4-Direct-Aqua-Conversation\.png/);
  assert.match(workflow, /grep -q '\\\$186K active'/);
  assert.match(workflow, /grep -q 'PRESENTATION DATA'/);
  assert.match(workflow, /data-portal-index="\[0-9\]\*"[^\n]*wc -l\)" = "9"/);
  assert.match(workflow, /data-neural-source-group="\[0-9\]\*"[^\n]*wc -l\)" = "9"/);
  assert.match(workflow, /data-neural-burst="\[0-9\]\*"[^\n]*wc -l\)" = "36"/);
  assert.equal((workflow.match(/for neural_attempt in 1 2 3; do/g) || []).length, 2);
  assert.equal((workflow.match(/test "\$neural_timing_verified" = "true"/g) || []).length, 2);
  assert.match(workflow, /Strict wall-clock attempt \$\{neural_attempt\} missed on the hosted runner/);
  assert.match(workflow, /data-aqua-preview-ready="neural"/);
  assert.match(workflow, /data-aqua-neural-phase="rest"/);
  assert.match(workflow, /data-aqua-neural-phase="selecting"/);
  assert.match(workflow, /data-aqua-neural-phase="firing"/);
  assert.match(workflow, /data-aqua-neural-phase="result"/);
  assert.match(workflow, /data-morph-progress="0\.429"/);
  assert.match(workflow, /data-morph-progress="1\.000"/);
  assert.match(workflow, /node scripts\/verify-aqua-sentinel-neural-live-wall-clock\.mjs/);
  assert.match(workflow, /node scripts\/render-aqua-sentinel-visual-proof\.mjs/);
  assert.match(visualRenderer, /document\.fonts\?\.ready/);
  assert.match(visualRenderer, /document\.getAnimations\(\)/);
  assert.match(visualRenderer, /Page\.captureScreenshot/);
  assert.match(visualRenderer, /materializationOpacity >= \.98/);
  assert.match(visualRenderer, /visiblePortals: 7/);
  assert.match(visualRenderer, /portalImagesLoaded/);
  assert.match(visualRenderer, /portalArtworkContained/);
  assert.match(visualRenderer, /state\.fixedPortals === "true"/);
  assert.match(visualRenderer, /state\.focusName === "Aqua Receipts"/);
  assert.match(visualRenderer, /state\.joltOpacity >= \.6/);
  assert.match(visualRenderer, /substrateDisplay === "none"/);
  assert.match(visualRenderer, /state\.beforeUsesLiveSubstrate && state\.afterUsesLiveSubstrate/);
  assert.match(visualRenderer, /!state\.stageUsesRaster/);
  assert.match(visualRenderer, /state\.referenceComposition === "live-neural-substrate-v080"/);
  assert.match(visualRenderer, /state\.neuralNetworkOpacity >= \.75/);
  assert.match(visualRenderer, /state\.continuationVisible/);
  assert.match(visualRenderer, /preview=settings/);
  assert.match(visualRenderer, /Settings-closed-phone\.png/);
  assert.match(workflow, /AquaSentinelOS-v0\.8\.0-Settings-closed-phone\.png/);
  assert.match(workflow, /AquaSentinelOS-v0\.8\.0-Neuralink-Widget-3x2\.png/);
  assert.match(workflow, /AquaSentinelOS-v0\.8\.0-Widget-Action-Microphone-Armed\.png/);
  assert.match(visualRenderer, /AQUA_DETERMINISTIC_VISUAL_PROOF_RENDERED/);
  assert.match(workflow, /neural-live-wall-clock/);
  assert.match(workflow, /--url ".*neuralDemo=rest"/);
  assert.doesNotMatch(workflow, /aqua-sentinel-neural-live-(fire|morph|result)-proof\.html/);
  assert.match(neuralLiveProof, /renderer-monotonic-wall-clock/);
  assert.match(neuralLiveProof, /performance\.now\(\)/);
  assert.match(neuralLiveProof, /const ACK_BUDGET_MILLIS = 100/);
  assert.match(neuralLiveProof, /const RESULT_DEADLINE_MILLIS = 1_400/);
  assert.match(neuralLiveProof, /const RESULT_RUNNER_JITTER_MILLIS = 250/);
  assert.match(neuralLiveProof, /const RESULT_COLLECTION_GRACE_MILLIS = 100/);
  assert.match(neuralLiveProof, /const browserTimelineStateFunctionExpression/);
  assert.match(neuralLiveProof, /new MutationObserver\(\(\) => this\.capture\(\)\)/);
  assert.match(neuralLiveProof, /window\.__aquaNeuralWallClockRecorder = recorder/);
  assert.match(neuralLiveProof, /window\.__aquaNeuralWallClockRecorder\.start\(\);\s*const startedAt = performance\.now\(\);\s*portal\.click\(\)/);
  assert.match(neuralLiveProof, /waitForRendererTimelineExpression/);
  assert.match(neuralLiveProof, /RESULT_DEADLINE_MILLIS \+ RESULT_RUNNER_JITTER_MILLIS \+ RESULT_COLLECTION_GRACE_MILLIS/);
  assert.match(neuralLiveProof, /result\.elapsedMillis <= RESULT_DEADLINE_MILLIS \+ RESULT_RUNNER_JITTER_MILLIS/);
  assert.doesNotMatch(neuralLiveProof, /requestAnimationFrame\(inspect\)/);
  assert.doesNotMatch(neuralLiveProof, /while \(performance\.now\(\) - sequenceStartedAt <= RESULT_DEADLINE_MILLIS\)/);
  assert.doesNotMatch(neuralLiveProof, /await delay\(20\)/);
  assert.match(neuralLiveProof, /selecting,firing,transitioning,result/);
  assert.match(neuralLiveProof, /--remote-debugging-port=0/);
  assert.match(neuralLiveProof, /AQUA_NEURAL_OWNER_REFERENCE_VERIFIED/);
  assert.match(neuralLiveProof, /data-neural-portal="6"/);
  assert.match(neuralLiveProof, /bound-aqua-receipts-portal-click/);
  assert.match(neuralLiveProof, /materializationKind, "receipts"/);
  assert.match(neuralLiveProof, /visiblePortals, 7/);
  assert.match(neuralLiveProof, /restingState\.visiblePortals === 7[\s\S]*restingState\.portalsLoaded === true[\s\S]*restingState\.portalArtworkContained === true/);
  assert.match(neuralLiveProof, /checkpoint\.phase === "result" && checkpoint\.materialized === "true"/);
  assert.match(neuralLiveProof, /const resultVisualState = await evaluate\(connection, sessionId, browserStateExpression\)/);
  assert.match(neuralLiveProof, /Elongated cyan and gold synapse pulses must remain visibly alive/);
  assert.match(neuralLiveProof, /portalsLoaded, true/);
  assert.match(neuralLiveProof, /substrateDisplay, "none"/);
  assert.match(neuralLiveProof, /usesLiveNeuralSubstrate, true/);
  assert.match(neuralLiveProof, /usesLiveNeuralResultSubstrate, true/);
  assert.match(neuralLiveProof, /referenceComposition, "live-neural-substrate-v080"/);
  assert.match(neuralLiveProof, /continuationVisible, true/);
  assert.match(neuralLiveProof, /portalArtworkContained, true/);
  assert.match(neuralLiveProof, /addedUiDelayMillis, 0/);
  assert.match(neuralLiveProof, /presentationBudgetMillis, 960/);
  assert.match(neuralLiveProof, /handlerMillis <= ACK_BUDGET_MILLIS/);
  assert.match(script, /\{ opacity: 0, offset: \.04 \}/);
  assert.match(script, /const contentAnimation = surface\.animate\([\s\S]*?easing: "linear"/);
  assert.doesNotMatch(script, /\{ opacity: 0, offset: \.58 \}/);
  assert.match(neuralLiveProof, /firing\.joltPresent, true/);
  const rendererTimelineReader = neuralLiveProof.match(/const browserTimelineStateFunctionExpression[\s\S]*?\n\}`;/)?.[0] || "";
  assert.doesNotMatch(rendererTimelineReader, /getComputedStyle|getBoundingClientRect/);
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
  assert.match(workflow, /group: \$\{\{ github\.workflow \}\}-\$\{\{ github\.event_name \}\}-\$\{\{ github\.event\.pull_request\.head\.ref \|\| github\.ref_name \}\}/);
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
    workflow.indexOf("node scripts/render-aqua-sentinel-visual-proof.mjs")
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
  assert.match(script, /Ask Aqua what this is for/);
  assert.match(script, /data-file-id/);
  assert.match(script, /data-discard-id/);
  assert.match(script, /Hey, you have \$\{pending\} pending/);
  assert.match(activity, /getFilingInbox/);
  assert.match(activity, /startFilingCapture/);
  assert.match(activity, /startFilingClarification/);
  assert.match(activity, /fileFilingItem/);
  assert.match(activity, /discardFilingItem/);
  assert.match(store, /AES\/GCM\/NoPadding/);
  assert.match(store, /AndroidKeyStore/);
  assert.match(store, /Aqua Books · Executive Intake/);
  assert.match(store, /Aqua Executive Desk · Intake/);
  assert.match(store, /handoffState/);
  assert.match(store, /markBrainReceipt/);
  assert.match(store, /needsApproval/);
  assert.match(store, /"Queued"/);
  assert.match(store, /static synchronized boolean clarify/);
  assert.match(store, /static synchronized boolean fileLocally/);
  assert.match(store, /static synchronized boolean discard/);
  assert.match(widget, /widget_action/);
  assert.match(widget, /widget_video/);
  assert.match(widget, /widget_photo/);
  assert.match(widget, /widget_file/);
  assert.match(capture, /ACTION_IMAGE_CAPTURE/);
  assert.match(capture, /ACTION_VIDEO_CAPTURE/);
  assert.match(capture, /FilingStore\.enqueue/);
  assert.match(capture, /Aqua filed it securely on this phone/);
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
  assert.match(script, /const asset = app\.cardAsset \|\| `\.\/assets\/carousel-v2\/\$\{app\.motion\}\.webp`/);
  assert.match(script, /cardAsset: "\.\/assets\/carousel-v2\/pulse\.svg"/);
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

test("Aqua's widget is a universal executive handoff and confirms direct calendar writes", async () => {
  const [widget, dispatch, capture, calendar, store, messageService, activity, manifest, layout, script, styles, workflow, widgetVerifier, androidLaunch] = await Promise.all([
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/WidgetDispatchActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/CalendarQuickAction.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/FilingStore.java"),
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
  assert.match(widget, /selectedNeuralActivityId\(/);
  assert.match(widget, /R\.id\.widget_selected_outbound_action/);
  assert.match(widget, /R\.id\.widget_selected_return_action/);
  assert.doesNotMatch(widget, /setImageViewResource\(R\.id\.widget_active_path/);
  assert.match(dispatch, /NEURAL_JOLT_TRANSITION_MILLIS = 720L/);
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
  assert.match(capture, /AQUA_CAPTURE_MIC_ARMED mode=/);
  const actionRouteBody = capture.match(/private void routeCapture\(\) \{([\s\S]*?)\n    \}/)?.[1] || "";
  assert.match(actionRouteBody, /"action"\.equals\(mode\)[\s\S]*captureRapidAction\(\)/);
  assert.doesNotMatch(actionRouteBody, /commandSeed|submitCommand/);
  assert.match(capture, /AQUA_WIDGET_HANDOFF_RECEIVED id=/);
  assert.match(capture, /submitAssistantHandoff\("action", text, "", true\)/);
  assert.match(capture, /WidgetMessageService\.enqueue\(/);
  assert.match(capture, /AQUA_WIDGET_HANDOFF_BACKGROUND_DISPATCHED/);
  assert.match(capture, /CalendarQuickAction\.parse\(text\) != null/);
  assert.match(capture, /submitCalendarCommand\(text\)/);
  assert.match(capture, /Manifest\.permission\.READ_CALENDAR/);
  assert.match(capture, /Manifest\.permission\.WRITE_CALENDAR/);
  assert.match(capture, /AQUA_CALENDAR_ACTION_CONFIRMED/);
  const calendarBody = capture.match(/private void submitCalendarCommand\(String text\) \{([\s\S]*?)\n    \}/)?.[1] || "";
  assert.match(calendarBody, /CalendarQuickAction\.execute\(this, action\)/);
  assert.match(calendarBody, /FilingStore\.enqueueCalendarReceipt\(this, action, result\)/);
  assert.doesNotMatch(calendarBody, /WidgetMessageService|MainActivity\.class/);
  assert.match(calendar, /if \(hour >= 1 && hour <= 7\) hour \+= 12/);
  assert.match(calendar, /CalendarContract\.Events\.CONTENT_URI/);
  assert.match(calendar, /CalendarContract\.Reminders\.CONTENT_URI/);
  assert.match(calendar, /duplicateEventId\(context, action\)/);
  assert.match(calendar, /eventMatches\(context, eventId, action\)/);
  assert.match(calendar, /The calendar did not return the appointment Aqua created/);
  assert.match(calendar, /DEFAULT_DURATION_MILLIS = 60L \* 60L \* 1000L/);
  assert.match(capture, /EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 1_200L/);
  assert.match(capture, /EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 2_200L/);
  assert.match(capture, /EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 3_200L/);
  assert.match(capture, /SPEECH_ACTIVE_TIMEOUT_MILLIS = 120_000L/);
  assert.match(capture, /if \(speechStarted\) playCaptureCompleteTone\(\)/);
  assert.match(capture, /TONE_PROP_BEEP2/);
  assert.match(store, /enqueueCalendarReceipt/);
  assert.match(store, /"state", confirmed \? "Confirmed" : "Needs Attention"/);
  assert.match(store, /"destination", confirmed \? "Device Calendar"/);
  assert.match(manifest, /android\.permission\.READ_CALENDAR/);
  assert.match(manifest, /android\.permission\.WRITE_CALENDAR/);
  assert.doesNotMatch(capture, /putExtra\("widget_command", text\)/);
  const submitCommandBody = capture.match(/private void submitCommand\(String rawText\) \{([\s\S]*?)\n    \}/)?.[1] || "";
  assert.doesNotMatch(submitCommandBody, /MainActivity\.class/);
  assert.match(submitCommandBody, /submitAssistantHandoff\("action", text, "", true\)/);
  assert.match(messageService, /extends IntentService/);
  assert.match(messageService, /\.put\("method", "aqua\.chat"\)/);
  assert.match(messageService, /"surface", "launcher-widget"/);
  assert.match(messageService, /"handoff", "executive-assistant-desk"/);
  assert.match(messageService, /localEvidenceRetained/);
  assert.match(messageService, /"aqua\.receipt\.analyze"/);
  assert.match(messageService, /FilingStore\.markReceiptAnalysis/);
  assert.match(messageService, /FilingStore\.markHandoffResult/);
  assert.match(messageService, /FilingStore\.markBrainReceipt/);
  assert.match(messageService, /AQUA_WIDGET_MESSAGE_BACKGROUND_SENT/);
  assert.doesNotMatch(messageService, /MainActivity\.class/);
  assert.match(capture, /EXTRA_COMMAND_TEXT = "widget_command_text"/);
  assert.doesNotMatch(dispatch, /Aqua, prepare my executive morning brief|EXTRA_COMMAND_TEXT/);
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
  assert.match(capture, /submitAssistantHandoff\("voice", text, "", true\)/);
  assert.match(capture, /dispatchAssistantHandoff\([\s\S]*item,[\s\S]*type,[\s\S]*handoff/);
  assert.doesNotMatch(capture, /openFilingCabinet|putExtra\("open_filing", true\)/);
  assert.match(styles, /<item name="android:clickable">true<\/item>/);
  assert.match(workflow, /bash scripts\/verify-aqua-sentinel-android-launch-v060\.sh/);
  assert.match(workflow, /target: google_apis/);
  assert.match(workflow, /Retain failed Android launcher evidence/);
  assert.match(workflow, /Neuralink-Widget-Resize-Handle-compact\.png/);
  assert.match(workflow, /aqua-widget-resize-compact-selected\.xml/);
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
  assert.match(widgetVerifier, /resolve_home_launcher_package\(\)/);
  assert.match(widgetVerifier, /input keyevent KEYCODE_HOME/);
  assert.match(widgetVerifier, /focused_package="\$\(/);
  assert.match(widgetVerifier, /mCurrentFocus\|mFocusedApp\|mResumedActivity\|topResumedActivity\|ResumedActivity/);
  assert.match(widgetVerifier, /"\$focused_package" != "\$package"/);
  assert.match(widgetVerifier, /cmd package resolve-activity --brief/);
  assert.match(widgetVerifier, /AQUA_WIDGET_HOME_LAUNCHER_RESOLVED package=\$launcher_package/);
  assert.doesNotMatch(widgetVerifier, /launcher_package="com\.android\.launcher3"/);
  assert.match(widgetVerifier, /AQUA_WIDGET_LAUNCHER_HOST_READY/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURALINK_SURFACE_READY/);
  assert.match(widgetVerifier, /path=armed_on_tap/);
  assert.doesNotMatch(widgetVerifier, /grep -Fq "\$package:id\/widget_active_path" "\$launcher_hierarchy"/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURALINK_ACTIVITY_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_REAL_RESIZE_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_3X2_PROPORTIONS_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_ACTION_MICROPHONE_VERIFIED/);
  assert.match(widgetVerifier, /AQUA_CAPTURE_MIC_ARMED mode=action handler=SpeechRecognizer/);
  assert.match(widgetVerifier, /pm grant "\$package" android\.permission\.RECORD_AUDIO/);
  assert.match(widgetVerifier, /AQUA_WIDGET_REPEAT_STABILITY_VERIFIED runs=5/);
  assert.match(widgetVerifier, /assert_no_sentinel_crash/);
  assert.match(widgetVerifier, /local package_pattern=/);
  assert.match(widgetVerifier, /Process: \$\{package_pattern\}/);
  assert.doesNotMatch(widgetVerifier, /if grep -Eq "FATAL EXCEPTION\|/);
  assert.match(widgetVerifier, /AQUA_WIDGET_CAPTURE_CANCEL_STAYED_ON_LAUNCHER/);
  assert.match(widgetVerifier, /local stable_launcher_samples=0/);
  assert.match(widgetVerifier, /stable_launcher_samples=\$\(\(stable_launcher_samples \+ 1\)\)/);
  assert.match(widgetVerifier, /if \[\[ "\$stable_launcher_samples" -ge 2 \]\]/);
  assert.match(widgetVerifier, /left QuickCaptureActivity resumed after the bounded launcher transition/);
  assert.doesNotMatch(widgetVerifier, /left a Sentinel capture activity resumed over Launcher3/);
  assert.match(widgetVerifier, /assert_widget_control_geometry/);
  assert.match(widgetVerifier, /widget_resize_surface/);
  assert.match(widgetVerifier, /adb shell wm size/);
  assert.match(widgetVerifier, /detect_widget_resize_handle\(\)/);
  assert.match(widgetVerifier, /widget_resize_right_handle/);
  assert.match(widgetVerifier, /widget_resize_left_handle/);
  assert.match(widgetVerifier, /widget_resize_bottom_handle/);
  assert.match(widgetVerifier, /widget_resize_top_handle/);
  assert.match(widgetVerifier, /widget_resize_frame/);
  assert.match(widgetVerifier, /aqua-widget-resize-\$\{label\}-selected/);
  assert.match(widgetVerifier, /Neuralink-Widget-Resize-Handle-\$\{label\}\.png/);
  assert.match(widgetVerifier, /AQUA_WIDGET_RESIZE_HANDLE_DETECTED/);
  assert.match(widgetVerifier, /for resize_attempt in \$\(seq 1 3\); do/);
  assert.match(widgetVerifier, /aqua-widget-resize-\$\{label\}-attempt-\$\{resize_attempt\}-before/);
  assert.match(widgetVerifier, /attempt=\$resize_attempt outcome=missing_resize_handle/);
  assert.match(widgetVerifier, /attempt=\$resize_attempt side=\$handle_side/);
  assert.match(widgetVerifier, /pre_resize_frame_bounds=/);
  assert.match(widgetVerifier, /post_resize_frame_bounds=/);
  assert.match(widgetVerifier, /frame_delta >= 48/);
  assert.match(widgetVerifier, /AQUA_WIDGET_RESIZE_GEOMETRY_CHANGED/);
  assert.match(widgetVerifier, /outcome=responsive_geometry_committed callback=\$callback_observed/);
  assert.match(widgetVerifier, /AQUA_WIDGET_RESIZE_COMMITTED/);
  assert.match(widgetVerifier, /AQUA_WIDGET_RESPONSIVE_RESIZE_VERIFIED/);
  assert.match(widgetVerifier, /responsive RemoteViews let the launcher select a cached layout without/);
  assert.match(
    widgetVerifier,
    /if \[\[ "\$geometry_changed" == "true" \]\]; then[\s\S]*?input keyevent KEYCODE_BACK[\s\S]*?wait_for_log "AQUA_WIDGET_RESIZED[\s\S]*?resized="true"[\s\S]*?AQUA_WIDGET_RESIZE_COMMITTED[\s\S]*?break/,
  );
  assert.match(widgetVerifier, /outcome=no_callback/);
  assert.match(widgetVerifier, /AQUA_WIDGET_RESIZE_RETRY label=\$label axis=\$axis attempt=\$resize_attempt reason=no_geometry_or_callback/);
  assert.match(widgetVerifier, /changed neither responsive geometry nor callback state for \$label after 3 attempts/);
  assert.match(widgetVerifier, /left its resize frame open after committing Aqua's \$label geometry/);
  assert.match(widgetVerifier, /accepted a resize proof but Aqua's committed visible geometry did not change/);
  assert.match(widgetVerifier, /source=\$handle_source/);
  assert.match(widgetVerifier, /drag=\$start_x,\$start_y->\$end_x,\$end_y/);
  assert.doesNotMatch(widgetVerifier, /for resize_attempt in \$\(seq 1 7\)/);
  assert.doesNotMatch(widgetVerifier, /edge_offset=/);
  assert.doesNotMatch(widgetVerifier, /right \+ edge_offset/);
  assert.doesNotMatch(widgetVerifier, /bottom \+ edge_offset/);
  assert.match(widgetVerifier, /prove_widget_resize "compact" "horizontal"/);
  assert.match(widgetVerifier, /prove_widget_resize "small" "vertical"/);
  assert.match(widgetVerifier, /lanes=cyan_outbound_gold_return/);
  assert.match(widgetVerifier, /for frame_attempt in \$\(seq 1 6\)/);
  assert.match(widgetVerifier, /sleep 0\.27/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_PIXELS_VERIFIED mode=\$mode/);
  assert.match(widgetVerifier, /source=device_tap_video/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=\$mode phase=outbound/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT mode=\$mode phase=arrived/);
  assert.match(widgetVerifier, /AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=\$mode phase=return/);
  assert.match(widgetVerifier, /screenrecord --bit-rate 4000000 --time-limit 4/);
  assert.match(widgetVerifier, /\(sleep 1\.5; input tap \$tap_x \$tap_y\)/);
  assert.match(widgetVerifier, /command -v ffprobe >\/dev\/null/);
  assert.match(widgetVerifier, /-count_frames/);
  assert.match(widgetVerifier, /stream=nb_read_frames/);
  assert.match(widgetVerifier, /frame_count < 2/);
  assert.match(widgetVerifier, /select='eq\(n,0\)'/);
  assert.match(widgetVerifier, /for frame_index in[\s\S]*frame_count \* 7 \/ 16[\s\S]*frame_count \* 8 \/ 16[\s\S]*frame_count \* 9 \/ 16/);
  assert.match(widgetVerifier, /select='eq\(n,\$frame_index\)'/);
  assert.match(widgetVerifier, /frame_count=\$frame_count frame_index=\$frame_index/);
  assert.doesNotMatch(widgetVerifier, /-ss 0\.60/);
  assert.doesNotMatch(widgetVerifier, /for frame_offset in 1\.75 1\.95 2\.15/);
  assert.match(widgetVerifier, /compare -metric AE -fuzz 4% "\$idle_crop" "\$active_crop"/);
  assert.match(widgetVerifier, /changed_pixels >= 40/);
  assert.doesNotMatch(widgetVerifier, /sleep 0\.12\s*\n\s*adb exec-out screencap -p > "\$active"/);
  assert.match(widgetVerifier, /compare -metric AE/);
  assert.match(workflow, /command -v ffmpeg >\/dev\/null \|\| missing_packages\+=\(ffmpeg\)/);
  assert.match(workflow, /aqua-sentinel-v0\.8\.0-widget-\*-jolt\.mp4/);
  assert.doesNotMatch(widgetVerifier, /wait_for_adb/);
  assert.match(widgetVerifier, /AQUA_WIDGET_FILED_TODAY_VERIFIED/);
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
  assert.doesNotMatch(widgetVerifier, /Aqua Action did not complete its silent background dispatch/);
  assert.doesNotMatch(widgetVerifier, /tap_resource|widget_command_send|widget_command_input/);
  assert.match(widgetVerifier, /AQUA_WIDGET_LAUNCHER_PROCESS_RECREATION_VERIFIED/);
  assert.doesNotMatch(widgetVerifier, /AQUA_WIDGET_REMOTE_VIEWS_TAP/);
});

test("responsive widget fills every supported host while preserving approved art and action zones", async () => {
  const [gradle, manifest, widget, widgetLayout, compactLayout, compactLargeLayout, microLayout, threeByTwoLayout, threeByTwoBackground, wideLayout, widgetInfo, capture, activity, store, verifier, script, styles, neural4x6, neural2x2, neuralWide, activity4x6, activityWide, widget4x6, widget2x2] = await Promise.all([
    read("android-app/app/build.gradle.kts"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java"),
    read("android-app/app/src/main/res/layout/aqua_command_widget.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_compact.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_compact_large.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_2x2.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_3x2.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_background_3x2.xml"),
    read("android-app/app/src/main/res/layout/aqua_command_widget_wide.xml"),
    read("android-app/app/src/main/res/xml/aqua_command_widget_info.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/QuickCaptureActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/FilingStore.java"),
    read("scripts/verify-aqua-sentinel-widget-actions-v054.sh"),
    read("sentient-os-web/app.js"),
    read("android-app/app/src/main/res/values/styles.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_paths_4x6.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_paths_2x2.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_paths_wide.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_activity_4x6.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_neural_activity_wide.xml"),
    readBytes("android-app/app/src/main/res/drawable-nodpi/aqua_widget_4x6_approved_v073.png"),
    readBytes("android-app/app/src/main/res/drawable-nodpi/aqua_widget_2x2_approved_v073.png"),
  ]);
  const [selectedActivity4x6, selectedOutboundPath, selectedReturnPath, selectedOutboundAnimator, selectedReturnAnimator] = await Promise.all([
    read("android-app/app/src/main/res/layout/aqua_widget_selected_neural_activity_4x6.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_selected_path_4x6_outbound_action.xml"),
    read("android-app/app/src/main/res/drawable/aqua_widget_selected_path_4x6_return_action.xml"),
    read("android-app/app/src/main/res/animator/aqua_widget_neural_outbound_active.xml"),
    read("android-app/app/src/main/res/animator/aqua_widget_neural_return_active.xml"),
  ]);
  assert.match(gradle, /ECOSYSTEM_PRESENTATION_MODE/);
  assert.match(widgetLayout, /id="@\+id\/widget_logo"/);
  assert.doesNotMatch(widgetLayout, /AQUA\\nNEURALINK|AQUA NEURALINK/);
  assert.match(widgetLayout, /@drawable\/aqua_widget_4x6_approved_v073/);
  assert.match(widgetLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(widgetLayout, /@drawable\/aqua_widget_neural_activity_4x6/);
  assert.match(widgetLayout, /@layout\/aqua_widget_selected_neural_activity_4x6/);
  assert.match(threeByTwoLayout, /android:background="@drawable\/aqua_widget_background_3x2"/);
  assert.match(threeByTwoLayout, /id="@\+id\/widget_resize_surface"[\s\S]*?android:padding="0dp"/);
  assert.doesNotMatch(threeByTwoLayout, /id="@\+id\/widget_resize_surface"[\s\S]*?android:padding="1dp"/);
  assert.doesNotMatch(threeByTwoLayout, /id="@\+id\/widget_neural_activity"[\s\S]*?android:layout_margin="-1dp"/);
  assert.match(threeByTwoBackground, /<gradient[\s\S]*?android:startColor="#0B2731"[\s\S]*?android:endColor="#000203"/);
  assert.match(threeByTwoBackground, /<stroke android:width="1dp" android:color="#61E9FF"/);
  assert.match(threeByTwoBackground, /<corners android:radius="20dp"/);
  assert.doesNotMatch(threeByTwoBackground, /<padding\b/);
  assert.doesNotMatch(widgetLayout, /widget_shimmer/);
  assert.match(widgetLayout, /id="@\+id\/widget_neural_art"/);
  assert.doesNotMatch(widgetLayout, /widget_active_path|aqua_widget_jolt/);
  assert.match(widgetLayout, /android:scaleType="centerCrop"/);
  assert.doesNotMatch(widgetLayout, /android:scaleType="fitXY"/);
  assert.match(widgetLayout, /id="@\+id\/widget_filed_today"/);
  assert.match(widgetLayout, /android:text="0"/);
  assert.match(widgetLayout, /Items filed today/);
  assert.match(widgetLayout, /id="@\+id\/widget_status"/);
  assert.doesNotMatch(widgetLayout, /LIVING COMMAND CENTER|NEURAL LINK ALIVE|One mind across|READY|PENDING|FILED TODAY/);
  assert.doesNotMatch(widgetLayout, /android:text="(?:ASK AQUA|VIDEO|PHOTO|FILE)"/);
  assert.match(widgetLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.doesNotMatch(widgetLayout, /<View(?:\s|>)/);
  assert.match(compactLayout, /@drawable\/aqua_widget_2x2_approved_v073/);
  assert.doesNotMatch(compactLayout, /widget_active_path|aqua_widget_jolt/);
  assert.match(compactLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(compactLayout, /@drawable\/aqua_widget_neural_activity_2x2/);
  assert.match(compactLayout, /android:scaleType="centerCrop"/);
  assert.doesNotMatch(compactLayout, /widget_shimmer|fitXY/);
  assert.match(compactLayout, /android:layout_width="match_parent"[\s\S]*android:layout_height="match_parent"/);
  assert.doesNotMatch(compactLayout, /android:layout_width="110dp"[\s\S]*android:layout_height="110dp"/);
  assert.match(compactLayout, /id="@\+id\/widget_status"/);
  assert.match(compactLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(compactLargeLayout, /android:layout_width="match_parent"[\s\S]*android:layout_height="match_parent"/);
  assert.doesNotMatch(compactLargeLayout, /android:layout_width="180dp"[\s\S]*android:layout_height="180dp"/);
  assert.match(compactLargeLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(compactLargeLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(compactLargeLayout, /android:scaleType="centerCrop"/);
  assert.doesNotMatch(compactLargeLayout, /widget_shimmer|fitXY/);
  assert.match(microLayout, /two by two living surface/);
  assert.match(microLayout, /@drawable\/aqua_widget_2x2_approved_v073/);
  assert.match(microLayout, /android:layout_width="match_parent"[\s\S]*android:layout_height="match_parent"[\s\S]*android:layout_gravity="center"/);
  assert.doesNotMatch(microLayout, /android:layout_width="110dp"[\s\S]*android:layout_height="110dp"/);
  assert.match(microLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(microLayout, /id="@\+id\/widget_status"/);
  assert.match(microLayout, /id="@\+id\/widget_neural_activity"/);
  assert.match(microLayout, /android:scaleType="centerCrop"/);
  assert.doesNotMatch(microLayout, /widget_shimmer|fitXY/);
  assert.doesNotMatch(microLayout, /android:text="(?:ASK|VIDEO|PHOTO|FILE|AQUA)"/);
  assert.match(threeByTwoLayout, /three by two proportional surface/);
  assert.match(threeByTwoLayout, /@drawable\/aqua_widget_2x2_approved_v073/);
  assert.doesNotMatch(threeByTwoLayout, /android:weightSum="6"|android:layout_weight="4"/);
  assert.match(threeByTwoLayout, /id="@\+id\/widget_neural_art"[\s\S]*android:layout_width="match_parent"[\s\S]*android:layout_height="match_parent"/);
  assert.match(threeByTwoLayout, /android:scaleType="centerInside"/);
  assert.match(threeByTwoLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(threeByTwoLayout, /@drawable\/aqua_widget_neural_activity_wide/);
  assert.match(threeByTwoLayout, /@layout\/aqua_widget_selected_neural_activity_wide/);
  assert.match(wideLayout, /Aqua Neuralink wide responsive surface/);
  assert.match(wideLayout, /@drawable\/aqua_widget_neural_paths_wide/);
  assert.match(neuralWide, /<vector/);
  assert.match(wideLayout, /@drawable\/aqua_widget_neural_activity_wide/);
  assert.match(wideLayout, /@drawable\/aqua_widget_icon_action/);
  assert.match(wideLayout, /widget_action[\s\S]*widget_video[\s\S]*widget_logo[\s\S]*widget_photo[\s\S]*widget_file/);
  assert.match(wideLayout, /android:layout_width="match_parent"[\s\S]*android:layout_height="match_parent"/);
  assert.match(widgetInfo, /android:targetCellWidth="3"/);
  assert.match(widgetInfo, /android:targetCellHeight="2"/);
  assert.match(widgetInfo, /android:initialLayout="@layout\/aqua_command_widget_3x2"/);
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
  assert.match(widget, /R\.layout\.aqua_command_widget_wide/);
  assert.match(widget, /R\.layout\.aqua_command_widget_3x2/);
  assert.match(widget, /OPTION_APPWIDGET_MIN_WIDTH/);
  assert.match(widget, /static int layoutForSize\(int minWidth, int minHeight\)/);
  assert.match(widget, /OPTION_APPWIDGET_SIZES/);
  assert.match(widget, /private static ArrayList<SizeF> exactHostSizes\(Bundle options\)/);
  assert.match(widget, /for \(SizeF hostSize : hostSizes\)/);
  assert.match(widget, /layoutForSize\(width, height\)/);
  assert.match(widget, /new RemoteViews\(exact\)/);
  assert.doesNotMatch(widget, /new SizeF\(110f, 110f\)/);
  assert.match(widget, /layoutName\(int layout\)/);
  assert.match(widget, /return "three-by-two"/);
  assert.match(widget, /ratio >= 1\.10f && ratio <= 2\.20f/);
  assert.match(widget, /ratio > 2\.20f/);
  const layoutSelector = widget.match(
    /static int layoutForSize\(int minWidth, int minHeight\) \{[\s\S]*?\n    \}/,
  )?.[0] || "";
  const threeByTwoRule = layoutSelector.indexOf(
    "if (ratio >= 1.10f && ratio <= 2.20f)",
  );
  const compactSquareRule = layoutSelector.indexOf(
    "if (minWidth <= 180 && minHeight <= 180)",
  );
  const compactRatioRule = layoutSelector.indexOf(
    "if (ratio >= 0.82f && minHeight <= 260)",
  );
  assert.ok(
    threeByTwoRule >= 0
      && threeByTwoRule < compactSquareRule
      && threeByTwoRule < compactRatioRule,
    "wide 3x2 hosts must resolve before compact fallbacks",
  );
  assert.ok(214 / 133 >= 1.10 && 214 / 133 <= 2.20);
  assert.match(widget, /return buildLayoutViews\(context, layoutFor\(manager, id\)\)/);
  assert.match(widget, /SELECTED_NEURAL_ACTIVITY_IDS/);
  assert.match(widget, /activityId == selectedActivity \? View\.VISIBLE : View\.INVISIBLE/);
  assert.match(selectedActivity4x6, /widget_selected_outbound_action/);
  assert.match(selectedActivity4x6, /widget_selected_return_action/);
  assert.match(selectedOutboundPath, /android:name="pulse_glow"/);
  assert.match(selectedOutboundPath, /android:name="pulse_core"/);
  assert.match(selectedOutboundPath, /M330,430 C292,342 230,224 150,138/);
  assert.match(selectedReturnPath, /M150,138 C230,224 292,342 330,430/);
  assert.match(selectedOutboundAnimator, /trimPathStart/);
  assert.match(selectedOutboundAnimator, /android:duration="660"/);
  assert.match(selectedReturnAnimator, /trimPathEnd/);
  assert.match(selectedReturnAnimator, /android:duration="760"/);
  assert.match(widget, /"outbound"/);
  assert.match(widget, /"return"/);
  assert.match(widget, /"received"/);
  assert.match(widget, /"queued"/);
  assert.match(widget, /"confirmed"/);
  assert.match(widget, /OUTBOUND_MILLIS = 700L/);
  assert.match(widget, /RETURN_MILLIS = 800L/);
  assert.match(widget, /FILED_MILLIS = 10000L/);
  assert.match(widget, /AQUA_WIDGET_FILED_CONFIRMATION_RENDERED/);
  assert.match(widget, /setViewVisibility\(\s*R\.id\.widget_status/);
  assert.match(widget, /return "RECEIVED"/);
  assert.match(widget, /return "AQUA HAS IT"/);
  assert.match(capture, /AquaCommandWidget\.showReceived\(this, widgetMode\(captureType\)\)/);
  assert.match(capture, /AquaCommandWidget\.showFiled\(this\)/);
  assert.match(styles, /AquaQuickCaptureTheme[\s\S]*android:backgroundDimEnabled">false/);
  assert.match(neural4x6, /M330,430 C292,342 230,224 150,138/);
  assert.match(neural4x6, /M150,138 C230,224 292,342 330,430/);
  assert.match(neural2x2, /M235,235 C204,194 165,151 124,112/);
  assert.match(neural2x2, /M124,112 C165,151 204,194 235,235/);
  assert.match(neuralWide, /M250,90 C195,64 112,68 50,90/);
  assert.match(neuralWide, /M450,90 C388,68 305,64 250,90/);
  assert.match(activity4x6, /outbound_action/);
  assert.match(activity4x6, /return_file/);
  assert.match(activityWide, /@drawable\/aqua_widget_neural_paths_wide/);
  assert.match(store, /static synchronized int filedTodayCount\(Context context\)/);
  assert.match(store, /createdAt >= startOfToday && createdAt < startOfTomorrow/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_action, action\(context, "action", 101\)\)/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_video, action\(context, "video", 102\)\)/);
  assert.match(widget, /setOnClickPendingIntent\(R\.id\.widget_photo, action\(context, "receipt", 103\)\)/);
  assert.match(widget, /FilingStore\.dailyLedgerLabel\(context\)/);
  assert.match(store, /static synchronized String dailyLedgerJson\(Context context\)/);
  assert.match(store, /"capturedTotalMinor"/);
  assert.match(store, /"actualsState", "Pending satellite reconciliation"/);
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
  assert.match(store, /static synchronized boolean fileLocally\(Context context, String itemId\)/);
  assert.match(store, /static synchronized boolean discard\(Context context, String itemId\)/);
  assert.match(store, /Filed by Aqua on this phone/);
  assert.match(store, /context\.getFilesDir\(\),\s*"filing-evidence"/);
  assert.match(activity, /public boolean fileFilingItem\(String itemId\)/);
  assert.match(activity, /public boolean discardFilingItem\(String itemId\)/);
  assert.match(script, /data-file-id="\$\{escapeHtml\(item\.id\)\}"/);
  assert.match(script, /data-discard-id="\$\{escapeHtml\(item\.id\)\}"/);
  assert.match(script, /Ask Aqua what this is for/);
  assert.match(store, /setPackage\(context\.getPackageName\(\)\)/);
  assert.match(activity, /private void deliverFilingInbox\(\)/);
  assert.match(activity, /AQUA_FILING_INBOX_DELIVERED items=/);
  assert.match(activity, /AQUA_FILING_CABINET_OPENED/);
  assert.match(activity, /BuildConfig\.ECOSYSTEM_PRESENTATION_MODE/);
  assert.match(verifier, /AQUA_WIDGET_LAUNCHER_TAP mode=\$mode resource=\$resource_id/);
  assert.match(verifier, /bounds="\$\(ui_node_bounds "\$hierarchy_path" "\$package:id\/widget_resize_surface"\)"/);
  assert.match(verifier, /activity_metadata_insets =/);
  assert.match(verifier, /neural activity accessibility metadata is asymmetrical or collapsed/);
  assert.doesNotMatch(verifier, /neural activity does not cover the full host/);
  assert.match(verifier, /approved art left a visible host surround/);
  assert.match(verifier, /horizontal_gap > max\(24, int\(surface_width \* 0\.08\)\)/);
  assert.match(verifier, /AQUA_CAPTURE_SAVED type=voice/);
  assert.match(verifier, /AQUA_CAPTURE_BACKGROUND_COMPLETE type=voice/);
  assert.match(verifier, /AQUA_WIDGET_FILED_TODAY_VERIFIED count=\$filed_today/);
  assert.match(verifier, /AQUA_WIDGET_BACKGROUND_FILE_STAYED_ON_LAUNCHER/);
  assert.doesNotMatch(verifier, /wait_for_log "AQUA_FILING_CABINET_OPENED"/);
  assert.doesNotMatch(verifier, /wait_for_log "AQUA_FILING_INBOX_DELIVERED/);
});

test("v0.8.4 secondary operating surfaces execute real Android boundaries", async () => {
  const [script, fidelity, activity, renderer, workflow, gradle, html] = await Promise.all([
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("scripts/render-aqua-sentinel-visual-proof.mjs"),
    read(".github/workflows/aqua-sentient-os-release.yml"),
    read("android-app/app/build.gradle.kts"),
    read("sentient-os-web/index.html"),
  ]);

  assert.match(gradle, /versionCode = 2026080504/);
  assert.match(gradle, /versionName = "0\.8\.4-live-aqua-daily-ledger"/);
  assert.match(script, /preferenceStorageKey = "aqua-sentinel-owner-preferences-v1"/);
  assert.match(script, /function saveOwnerPreferences\(\)/);
  assert.match(script, /In-app owner alerts/);
  assert.match(script, /data-command-ask/);
  assert.match(script, /function diagnosticsMarkup\(\)/);
  assert.match(script, /function diagnosticReceiptText\(\)/);
  assert.match(script, /function connectionsMarkup\(\)/);
  assert.match(script, /function aboutMarkup\(\)/);
  assert.match(script, /window\.receiveDeviceDiagnostics/);
  assert.match(script, /window\.refreshDeviceDiagnostics/);
  assert.match(script, /AquaBridge\.openAppPermissionSettings/);
  assert.match(script, /AquaBridge\.copyDiagnosticReceipt/);
  assert.match(script, /data-integration-open/);
  assert.match(script, /data-integration-refresh/);
  assert.match(script, /data-message-action="retry"/);
  assert.match(script, /data-filing-refresh/);
  const clarificationBinding = script.match(/systemPanel\.querySelectorAll\("\[data-clarify-id\]"\)[\s\S]*?\n  \}\);/)?.[0] || "";
  assert.equal(
    clarificationBinding.match(/startFilingClarification/g)?.length,
    2,
    "one capability check and one invocation are allowed; duplicate launches are forbidden",
  );

  assert.match(activity, /private JSONObject deviceDiagnostics\(\)/);
  assert.match(activity, /microphoneGranted/);
  assert.match(activity, /calendarReadGranted/);
  assert.match(activity, /calendarWriteGranted/);
  assert.match(activity, /photoCaptureAvailable/);
  assert.match(activity, /videoCaptureAvailable/);
  assert.match(activity, /widgetInstalledCount/);
  assert.match(activity, /installedAppCount/);
  assert.match(activity, /public String getDeviceDiagnostics\(\)/);
  assert.match(activity, /public void openAppPermissionSettings\(\)/);
  assert.match(activity, /Settings\.ACTION_APPLICATION_DETAILS_SETTINGS/);
  assert.match(activity, /ClipData\.newPlainText/);

  for (const panel of ["diagnostics", "data", "files", "messages", "about"]) {
    assert.match(script, new RegExp(`previewPanel[\\s\\S]*${panel}`));
    assert.match(renderer, new RegExp(`preview=${panel}`));
  }
  for (const proof of ["Diagnostics", "Connections", "File-Cabinet", "Conversation-Receipts", "About"]) {
    assert.match(renderer, new RegExp(`${proof}-closed-phone\\.png`));
    assert.match(workflow, new RegExp(`${proof}-closed-phone\\.png`));
  }
  assert.match(workflow, /\[build-test-apk\]/);
  assert.match(workflow, /build_test_apk: \$\{\{ steps\.build_intent\.outputs\.requested \}\}/);
  assert.equal((workflow.match(/ref: \$\{\{ github\.event\.pull_request\.head\.sha \|\| github\.sha \}\}/g) || []).length, 2);
  assert.match(workflow, /git log -1 --pretty=%B/);
  assert.match(workflow, /github\.event_name == 'pull_request'/);
  assert.match(workflow, /needs\.preflight-no-apk\.outputs\.build_test_apk == 'true'/);
  assert.match(workflow, /value < 0\.32/);
  assert.match(workflow, /AQUA_OWNER_REFERENCE_VISUAL_VERIFIED fixed_portals=7 owner_rest=exact owner_morph=exact neural_motion=continuous request_dispatch_delay_ms=0/);
  assert.match(fidelity, /v0\.7\.5 operating-surface completion/);
  assert.match(fidelity, /\.connections-shell,\.about-shell/);
  assert.match(fidelity, /\.diagnostic-actions/);

  const protectedHome = createHash("sha256").update(html).digest("hex");
  assert.equal(protectedHome.length, 64);
  assert.match(html, /id="aquaButton"[\s\S]*id="appDeck"[\s\S]*id="appDashboard"[\s\S]*class="bottom-rail"/);
});

test("v0.8.4 repairs physical voice capture and restores the approved visual identities", async () => {
  const [html, script, fidelity, manifest, activity, pulse] = await Promise.all([
    read("sentient-os-web/index.html"),
    read("sentient-os-web/app.js"),
    read("sentient-os-web/fidelity.css"),
    read("android-app/app/src/main/AndroidManifest.xml"),
    read("android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java"),
    read("sentient-os-web/assets/carousel-v2/pulse.svg"),
  ]);

  for (const required of ["aquaPresenceButton", "aquaPulseNavButton", "aquaPulseNavBadge", "cardsTrack"]) {
    assert.match(html, new RegExp(`id="${required}"`));
  }
  assert.match(html, /class="aqua-card-holder"/);
  assert.match(manifest, /android\.permission\.MODIFY_AUDIO_SETTINGS/);
  assert.match(script, /async function openAquaMicrophone\(\)/);
  assert.match(script, /NotReadableError", "AbortError", "OverconstrainedError/);
  assert.match(script, /navigator\.mediaDevices\.getUserMedia\(\{ audio: attempts\[index\] \}\)/);
  assert.match(script, /const stream = await openAquaMicrophone\(\)/);
  assert.match(activity, /ByteArrayOutputStream response/);
  assert.match(activity, /SDP is a CRLF-delimited wire format/);
  assert.doesNotMatch(activity, /response\.toString\(\)\.trim\(\)/);
  assert.match(script, /classList\.add\("aqua-follow-active"\)/);
  assert.match(script, /classList\.remove\("aqua-follow-active"\)/);
  assert.match(fidelity, /\.sentinel\.aqua-follow-active \.aqua-presence-button\{display:grid\}/);
  assert.match(fidelity, /state-idle:not\(\.aqua-conversation-active\)/);
  assert.match(script, /cardAsset: "\.\/assets\/card-overview-front-v11\.png"/);
  assert.match(script, /cardAsset: "\.\/assets\/card-site-intelligence-front-v11\.png"/);
  assert.match(script, /class="future-card-art"/);
  assert.match(script, /<strong>COMING SOON<\/strong>/);
  assert.match(script, /class="neural-home-a"/);
  assert.doesNotMatch(script, /\$\{aquaMarkMarkup\("neural"\)\}/);
  assert.match(fidelity, /\.neural-home-a\{[^}]*ui-hero-front-v11\.png/);
  assert.match(pulse, /aria-label="AquaPulse financial heart"/);
  assert.match(pulse, /M256 407C228 383/);
  assert.match(pulse, /M75 265h78l25-56/);
  assert.match(script, /Math\.max\(-2\.2, Math\.min\(2\.2, initialVelocity\)\)/);
  assert.match(script, /now - startedAt < 720/);
  assert.match(script, /classList\.toggle\("runtime-paused", !visible\)/);
  assert.match(fidelity, /html\.runtime-paused \*,html\.runtime-paused \*:before,html\.runtime-paused \*:after\{animation-play-state:paused!important\}/);
  assert.match(fidelity, /html\.aqua-native-runtime \.carousel-cover\{-webkit-box-reflect:none;contain:layout paint style\}/);
  assert.match(fidelity, /html\.aqua-native-runtime \.app-card:not\(\.pos-0\) \*[^}]*animation-play-state:paused!important/);
  assert.match(fidelity, /\.neural-portal\.is-dormant\{display:none!important\}/);
  assert.match(script, /aqua\\s\*pulse\|aquapulse\|cash flow\|cash position\|cash forecast\|pulse/);
  assert.match(script, /return \{ primary: 7, supporting: \[5, 1, 0\], kind: "pulse" \}/);
  for (const packageName of [
    "com.aquahomesdesigngroup.draw.v0189option1",
    "com.aquasoftware.aquapulse",
    "com.aquahomesdesign.cam.obsidianpreview",
    "com.aquahomes.timesheet.engineering",
  ]) {
    const matcher = new RegExp(packageName.replaceAll(".", "\\."));
    assert.match(script, matcher);
    assert.match(manifest, matcher);
    assert.match(activity, matcher);
  }
});
