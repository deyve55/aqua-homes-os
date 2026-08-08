# AQUA SENTINEL — A-TO-Z MASTER CONTINUITY HANDOFF

**Handoff version:** 1.0.0  
**Prepared:** July 25, 2026  
**Owner and final human authority:** Dave (Deyve)  
**Official product name:** Aqua Sentinel  
**Conversational/wake name:** Aqua  
**Repository:** `deyve55/aqua-homes-os`  
**Repository URL:** https://github.com/deyve55/aqua-homes-os  
**Active continuity branch:** `agent/aqua-sentinel-production-apk-v0.4.1-20260725`  
**Active PR:** #192 — https://github.com/deyve55/aqua-homes-os/pull/192  
**Latest verified Android release:** v0.4.3 production candidate  
**Release URL:** https://github.com/deyve55/aqua-homes-os/releases/tag/aqua-sentinel-os-v0.4.3-production-candidate  
**Direct APK:** https://github.com/deyve55/aqua-homes-os/releases/download/aqua-sentinel-os-v0.4.3-production-candidate/AquaSentinelOS-v0.4.3-PRODUCTION-CANDIDATE.apk  
**Checksum:** https://github.com/deyve55/aqua-homes-os/releases/download/aqua-sentinel-os-v0.4.3-production-candidate/AquaSentinelOS-v0.4.3-PRODUCTION-CANDIDATE.apk.sha256  
**Verified build run:** https://github.com/deyve55/aqua-homes-os/actions/runs/30171083473  
**Handoff status:** CURRENT WORKING TRUTH — PHYSICAL FOLD v0.4.3 ACCEPTANCE STILL REQUIRED

---

## 0. NEW-CHAT STARTUP DIRECTIVE

This is an existing Aqua Sentinel implementation. Do not restart it, redesign it, replace it with a generic dashboard, or package the obsolete `sentinel-app` tree.

Before changing anything:

1. Read this file completely.
2. Read the Golden Goose Engineering Manual, Golden Goose Update Master Handoff, and Golden Goose Notebook available to the chat or repository.
3. Inspect PR #192 and the active branch named above.
4. Verify the current branch head and file SHAs; do not assume the SHAs in this handoff remain current after later commits.
5. Treat Dave’s physical Samsung Fold 7 screenshot and installed-device behavior as final visual truth.
6. Package Android only from `sentient-os-web` through `.github/workflows/aqua-sentient-os-release.yml`.
7. Never use `.github/workflows/android-apk.yml` or the obsolete `sentinel-app` output as the Aqua Sentinel fidelity build.
8. Never claim visual fidelity from compilation, hashes, or emulator launch alone. Physical-device comparison is required.
9. Make surgical changes only. Preserve approved layout, lighting, color, and identity unless Dave explicitly requests a redesign.
10. Report approved, implemented, CI-verified, and physically verified states separately.

Dave is the sole final product, design, tradeoff, and production authority.

---

## 1. PRODUCT IDENTITY AND ROLE

Aqua Sentinel is the mother intelligence and main command brain of the Aqua ecosystem. It is not merely another satellite app.

Locked naming:

- Official name: **Aqua Sentinel**
- Conversational name: **Aqua**
- Master launcher/card symbol: the approved illuminated cyan **A**
- Visual identity: deep black obsidian, premium blue glass, crisp cyan energy, restrained gold accents, sharp professional depth
- Aqua Sentinel must be visually and verbally distinguishable from Aqua Cam, Aqua Timesheets, Aqua Accounting, Aqua Draw, Knowledge Vault, and future Aqua satellites.

Architecture intent:

- Sentinel discovers, reads, compares, opens, and—when authorized—commands specialist Aqua applications.
- Satellite apps remain independently functional and independently sellable.
- Cross-app behavior must use the shared gateway, authenticated capability contracts, deep links, or approved shared modules.
- Do not secretly finger-control unrelated apps.
- Do not give Sentinel direct cross-app database access.
- The initial linkage target is approximately five existing Aqua applications, expanding later.

Every linked app must eventually register:

- app identity and version;
- readable information;
- available commands;
- authorized write actions;
- health and connection status;
- authentication and tenant scope;
- offline/queued behavior;
- evidence and audit receipts.

---

## 2. GOLDEN GOOSE GOVERNANCE APPLIED HERE

The governing rules used in this project are:

- Think before coding.
- Simplicity first.
- Surgical changes only.
- Goal-driven proof.
- Preserve approved UI before redesign.
- Samsung Fold 7 physical behavior is final truth.
- DeX support is required.
- A green compile is not visual-fidelity proof.
- Never pretend inaccessible files were read.
- Never relabel proposed, synchronized, implemented, or tested work as canonical/verified without evidence.
- Shared AI behavior belongs in one governed/versioned implementation; satellites register app-specific capabilities.
- Client-facing integrations route through the shared HTTPS gateway contract; no hard-coded direct database coupling.
- Secrets remain server-side.
- Dave is final authority.

A separate Golden Goose identity mandate was committed at:

- Repository: `deyve55/Golden-goose-engineering-manual-`
- Branch: `agent/aqua-app-identity-logo-approval-mandate-20260725`
- Commit: `0218f45bb0ada1b1a953342d82c18ad1abcc6b44`
- Draft PR: https://github.com/deyve55/Golden-goose-engineering-manual-/pull/3

That mandate requires each Aqua app to have a distinctive function-specific, AI-styled symbol and full name in the approved obsidian family. Dave must approve an identity before it becomes a Sentinel thumbnail, launcher icon, splash identity, PWA icon, or installed-app listing. Default Android/Capacitor/framework icons are release-blocking defects.

---

## 3. APPROVED VISUAL DIRECTION

Dave rejected redesigns and approximations. The approved direction is the supplied/rendered Aqua Sentinel interface with:

- premium black obsidian background/platform;
- illuminated Aqua **A** centered as the master intelligence;
- intentional breathing room above Aqua on Fold-sized screens;
- the complete interface lowered without arbitrary distortion;
- rotating 3D card/carousel stage below Aqua;
- modestly raised/enlarged card stack;
- functional app symbol plus wording on every card;
- clean reserved/placeholder surfaces until real app data is linked;
- no fake screenshots or demo imagery substituted for real app information;
- two lower dashboard/card footprints retained as approved;
- bottom navigation retained;
- cyan/blue illumination with restrained gold;
- launcher icon matching the in-app Sentinel identity.

Specific app identity direction recorded:

- Aqua Sentinel: illuminated master **A**
- Aqua Cam: camera-eye/binocular/aperture symbol
- Aqua Timesheets: dimensional clock/time symbol
- Aqua Accounting: intelligent ledger/calculator symbol
- Other satellites: instantly recognizable function-specific mark plus full wording
- Every icon must feel like the same Aqua family, never cartoonish or generic.

The Sentinel master card is an all-black obsidian reserved surface with the approved illuminated cyan **A**. The installed launcher identity must match it.

---

## 4. REJECTED BUILDS — DO NOT REUSE

### Rejected obsolete proof APK

Workflow run `30165112509` packaged the obsolete `sentinel-app` tree. Dave’s screenshot proved it was visually wrong.

It contained/resembled:

- “DEMO DATA · NOT CONNECTED”;
- Risk Monitor screenshot cards;
- demo source panels;
- Messages/Data Hub/Settings demo presentation;
- washed-out carousel;
- generic/incorrect scale and layout;
- none of the exact approved clean reserved surfaces.

Root cause: the old workflow compiled `sentinel-app/**`, while the approved two-day design lived in `sentient-os-web/**`.

This build and tree are rejected as the visual baseline. Do not send its APK again.

### v0.4.1

v0.4.1 correctly packaged `sentient-os-web`, but physical Fold testing found:

- unused black space below the bottom navigation instead of above Aqua;
- carousel touch handling felt dead/fragile;
- excessive perspective warping;
- large orbit rings read as defects;
- default Android/Capacitor-style launcher identity;
- Aqua secure provider route returned an error.

### v0.4.2

v0.4.2 corrected the launcher, top spacing, reduced warping, removed visible orbit rings through overrides, and improved dragging. Physical testing then found:

- cards/stack still too small and needed a modest lift/enlargement;
- release behavior still felt like a one-card snap;
- Dave required a true momentum carousel that follows the finger, visibly spins through multiple positions after a hard flick, decelerates, and settles.

### v0.4.3

v0.4.3 implements the latest requested kinetic motion, modest card/stack enlargement, and obsidian Aqua Sentinel card/launcher identity. CI, signed packaging, clean emulator install, cold launch, process health, checksum, and release publication passed.

**Important:** v0.4.3 has not yet received Dave’s final physical Samsung Fold 7 acceptance in the recorded conversation. Do not call it visually final until Dave installs it and confirms the launcher, scale, layout, carousel feel, and Aqua response.

---

## 5. CURRENT REPOSITORY SOURCE OF TRUTH

### Correct web/client tree

`sentient-os-web/`

Key files:

- `sentient-os-web/index.html` — approved application shell and DOM
- `sentient-os-web/styles.css` — base presentation
- `sentient-os-web/fidelity.css` — approved fidelity overrides, Fold corrections, final v0.4.3 card geometry
- `sentient-os-web/app.js` — app registry, render behavior, overlays, Aqua bridge calls, carousel gesture and inertia
- `sentient-os-web/assets/` — approved image assets verified by SHA-256 in release workflow
- `sentient-os-web/package.json` — Vite metadata; currently stale at version `0.4.0`

### Correct Android wrapper

`android-app/`

Key files:

- `android-app/app/src/main/AndroidManifest.xml`
- `android-app/app/build.gradle.kts`
- `android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java`
- `android-app/app/src/main/res/drawable/aqua_sentinel_launcher.xml`

Android identity:

- application ID: `com.aquahomes.sentinel`
- namespace: `com.aquahomes.sentientos`
- version code: `2026072504`
- version name: `0.4.3-production-candidate`
- min SDK: 26
- target SDK: 35
- label: `Aqua Sentinel`
- launcher and round icon: `@drawable/aqua_sentinel_launcher`
- cleartext traffic: disabled
- backup extraction: disabled
- microphone and Internet permissions declared.

### Correct release workflow

`.github/workflows/aqua-sentient-os-release.yml`

Workflow name: `Build Aqua Sentinel OS v0.4.3 Production Candidate`

Critical packaging step:

```sh
mkdir -p android-app/app/src/main/assets/public
cp -R sentient-os-web/. android-app/app/src/main/assets/public/
```

This direct copy is the fidelity boundary. Do not reconstruct the approved web UI inside a different Android tree.

The workflow verifies:

- Sentinel contract tests;
- approved visual asset hashes;
- Android SDK/Gradle build;
- APK alignment/signature/package metadata;
- embedded `assets/public/index.html`;
- clean emulator uninstall/install;
- cold launch;
- `AQUA_SENTINEL_UI_READY`;
- live process;
- launch screenshot;
- checksum/provenance;
- artifact and standalone GitHub release publication.

Current workflow file SHA observed during this handoff: `6f3eddbe662cd979bba7678e6f46ff51b0451234`. Re-fetch before editing.

### Regression tests

`tests/sentient-functional-test.mjs`

Current file SHA observed: `8731f426cc78dce938bcdc1907dd13f17a41f057`. Re-fetch before editing.

The seventh test covers:

- Fold protected top spacing;
- launcher **A**;
- pointer capture/move;
- `coastDeck(initialVelocity)`;
- animation frames;
- multi-card residual stepping;
- v0.4.3 geometry marker.

---

## 6. EXACT LAST CODE WORK AREA

This is the exact continuation boundary requested by Dave.

### Kinetic carousel logic

File: `sentient-os-web/app.js`  
Current observed blob SHA: `1ee902fc88d0e68060afa6f762edf29cd45d42c7`

The latest work is in these exact symbols near the bottom of the file:

- `stopDeckInertia()`
- `stepDeck(direction)`
- `coastDeck(initialVelocity)`
- `appDeck.addEventListener("pointerdown", ...)`
- `appDeck.addEventListener("pointermove", ...)`
- the following pointer release/cancel completion handlers
- constants/state: `CARD_STEP_PX`, `drag`, `inertiaFrame`, `suppressCardClickUntil`

Core current mechanics:

- pointer capture begins on `pointerdown`;
- horizontal intent is distinguished from vertical page movement;
- `pointermove` tracks frame velocity and residual horizontal movement;
- each `CARD_STEP_PX` crossing advances one app;
- `coastDeck` clamps release velocity, runs `requestAnimationFrame`, advances multiple cards, applies friction, and settles.

**Next physical-test-driven code decision:** install v0.4.3 on the Samsung Fold 7 and decide whether `CARD_STEP_PX = 72`, the velocity clamp (`-2.4` to `2.4`), friction factor (`0.92` per 16.67 ms), horizontal-intent threshold, and final settling feel match Dave’s requested “hold it, flick it hard, and watch the apps go around.” Do not tune these blindly before receiving physical feedback.

### Card scale and geometry

File: `sentient-os-web/fidelity.css`  
Current observed blob SHA: `85438babe0fcdf74d8a817149ca45c86f28b2525`

The exact latest block is labeled:

```css
/* Aqua Sentinel v0.4.3 carousel scale and kinetic-motion correction. */
```

Current center-card geometry:

- left: 34.8%
- top: 4.5%
- width: 30.4%
- height: 80%

The side cards and outer cards are defined immediately below that block, including the mobile override. Tune the entire stack together if Dave asks; do not stretch only the centered card.

### Launcher identity

File: `android-app/app/src/main/res/drawable/aqua_sentinel_launcher.xml`  
Current observed blob SHA: `1a7f8adc6f8e213739bd8fdb792659d79e5df660`

It is a vector with:

- obsidian background;
- cyan-outlined inner field;
- cyan/white illuminated **A**;
- restrained gold base accent.

Manifest references this drawable for both `android:icon` and `android:roundIcon`.

### Aqua network/voice bridge

File: `android-app/app/src/main/java/com/aquahomes/sentientos/MainActivity.java`  
Current observed blob SHA: `2a904cbbdf078dedd605886ad13aad8e8e278141`

Important symbols:

- `bootstrapSession()`
- `signInOwner(...)`
- `refreshSession()`
- `askAqua(...)`
- `postJson(...)`
- `SpeechRecognizer`
- `TextToSpeech`
- `AquaBridge`

The client authenticates through Supabase, stores tokens using Android Keystore/AES-GCM, and invokes the `aqua-sentinel-executive` Edge Function. OpenAI credentials are not embedded in the APK.

---

## 7. AQUA AI / PROVIDER STATE

Physical v0.4.1 testing proved:

- owner authentication reached the backend;
- the deployed `aqua-sentinel-executive` function returned HTTP 503;
- the failure was inside the Edge Function/provider path rather than Android authentication.

A bounded single retry for transient provider-network failure was deployed as Edge Function v2 while preserving owner-only authentication and the server-side credential boundary.

Do not overstate the result:

- Edge Function retry deployment: implemented.
- APK caller and authenticated route: implemented.
- Successful end-to-end Aqua answer on Dave’s physical Fold after that deployment: **not yet recorded as verified**.
- Reliable wake word, low-latency streaming speech, barge-in, construction-noise suppression, talker lock, and full specialist-app tools: **not complete/verified in this Sentinel build**.

The current Android implementation uses platform `SpeechRecognizer` and `TextToSpeech`; it is not yet the final approved realtime Aqua voice experience.

---

## 8. RELEASE AND SIGNING FACTS

Latest release tag:

`aqua-sentinel-os-v0.4.3-production-candidate`

APK:

`AquaSentinelOS-v0.4.3-PRODUCTION-CANDIDATE.apk`

Build run:

`30171083473`

CI-verified:

- contract tests passed;
- approved web source copied directly;
- signed APK compiled;
- package/signature/archive inspection passed;
- clean emulator install passed;
- cold launch passed;
- ready marker and process-health proof passed;
- checksum and release assets published.

Signing limitation:

- Production candidates use a generated, dedicated release certificate in the workflow.
- The workflow release notes state this is not yet Google Play App Signing ready.
- Prior candidates may require uninstall before installing a newly signed candidate.
- Do not present this candidate signing process as the final store-update signing strategy.

Temporary PR release triggers used for one-time publication were removed after releases. Do not add a persistent broad release trigger without Dave’s explicit approval.

---

## 9. KNOWN DISCREPANCIES / TECHNICAL DEBT

These items must be preserved as honest warnings:

1. **Version drift:** `sentient-os-web/package.json` still says `0.4.0`, while Android and the release are v0.4.3.
2. **Branch-name drift:** the active branch name contains `v0.4.1`, but it now carries the v0.4.3 candidate. Do not rename/delete it casually while PR #192 is the continuity record.
3. **Stale test wording:** earlier tests still describe the old “centered card snaps face-on” and “native placeholder carousel,” including legacy orbit/geometry assertions. The final seventh test validates v0.4.3 kinetic behavior and overrides. Reconcile tests surgically before the next behavior change.
4. **Legacy CSS retained under overrides:** `fidelity.css` still contains original 33°/53° side-card geometry and orbit styling, later overridden by v0.4.2/v0.4.3 blocks. The visible result depends on CSS order. Do not delete or consolidate until physical fidelity is re-proven.
5. **App registry contains sample/demo values:** `sentient-os-web/app.js` still contains sample values and activity strings for app workspaces/dashboards. Carousel cards render reserved placeholders, but opening workspaces can expose represented/sample content. Dave’s rule is truthful empty/reserved surfaces until real connected data arrives. This requires deliberate cleanup or live data integration; do not pretend it is already complete.
6. **Connected flags are illustrative:** some app entries use `connected: true` without a fully proven five-app live capability registry.
7. **Backend retry is not physical end-to-end proof.**
8. **Release build proof is not Samsung Fold 7 fidelity proof.**
9. **DeX acceptance for v0.4.3 is not recorded.**
10. **Cross-app linkage is architecture intent, not completed integration.**

---

## 10. REQUIRED NEXT TEST — DO THIS BEFORE MORE UI CODING

Install the v0.4.3 APK on Dave’s Samsung Fold 7.

Because signing certificates may differ, uninstall the prior candidate if Android refuses the update.

Test and record separately:

1. Installed-app launcher shows the obsidian illuminated **A**, not Android/Capacitor placeholder.
2. Cold launch opens Aqua Sentinel and remains alive.
3. Unused vertical space is above Aqua; bottom dead space is not below navigation.
4. Aqua feels centered and the interface is not smooshed upward.
5. Card stack is raised/enlarged enough, but not oversized.
6. Finger drag causes continuous visible movement while held.
7. A hard flick coasts through multiple apps.
8. Carousel decelerates naturally and settles on the nearest face-on card.
9. Vertical page gestures do not accidentally rotate the carousel.
10. Side perspective feels dimensional without looking warped.
11. Internal orbit circles are not visible as defects.
12. Sentinel master card is black obsidian with illuminated **A**.
13. Tap Aqua, authenticate if required, and obtain a real response.
14. Confirm error text/status if the provider still fails.
15. Repeat in Fold open/closed posture and DeX if available.
16. Capture screenshots/video and diagnostics.

Only after Dave reports the physical result should the next chat tune carousel constants or geometry.

---

## 11. CROSS-APP LINKAGE NEXT PHASE

Once the v0.4.3 visual/motion shell is physically accepted, the next engineering phase is the first genuine cross-app testing build.

Required deliverable:

- capability registry schema;
- five initial app manifests;
- authenticated discovery;
- per-app health status;
- read/query tool calls;
- authorized action calls;
- deep-link/open behavior;
- failure reporting;
- queued/offline behavior;
- evidence/audit receipts;
- tenant and owner scope;
- Sentinel UI binding to real data.

Acceptance must prove Sentinel can:

- discover all initial apps;
- retrieve real information;
- compare information across apps;
- open the correct app/card;
- perform a permitted action;
- request approval for sensitive actions;
- fail honestly when an app is unavailable;
- never display fabricated/sample operational data as live truth.

Do not hard-code five app-specific mini-brains into the Sentinel UI. Use the governed shared capability contract.

---

## 12. CHANGE / RELEASE PROCEDURE

For any next change:

1. Fetch the active branch and verify file SHAs.
2. Inspect PR #192 and working diffs.
3. Change only approved files.
4. Update/reconcile `tests/sentient-functional-test.mjs`.
5. Keep `sentient-os-web` as visual source of truth.
6. Run contract tests.
7. Run the correct `aqua-sentient-os-release.yml` workflow.
8. Verify the workflow copied `sentient-os-web`.
9. Verify package identity, signature, embedded UI, clean install, cold launch, and ready marker.
10. Publish a permanent release and checksum.
11. Remove any temporary one-time trigger afterward.
12. Have Dave physically test the Fold.
13. Record exact accepted/rejected status in this handoff or a successor handoff.
14. Never send the obsolete `sentinel-app` APK.

---

## 13. IMPORTANT COMMITS AND EVENTS

Known continuity anchors:

- `50c9527` — approved v0.4.1 placeholder-card source existed, but its first expected build did not automatically start.
- PR #192 — opened to build the approved source.
- `199ce340` — release workflow branch trigger adjustment.
- `86c0d2d` — temporary branch-restricted PR trigger for correct v0.4.1 production workflow.
- Workflow run `30167274958` — correct v0.4.1 `sentient-os-web` production build.
- `0052bc8` — temporary trigger removal after v0.4.1 publication.
- Workflow run `30169866598` — v0.4.2 production build.
- `86dd0d6` — latest v0.4.3 release-candidate source state identified before release triggering, containing raised/enlarged stack, kinetic multi-card motion, and the Aqua Sentinel obsidian master card.
- Workflow run `30171083473` — verified v0.4.3 production candidate publication.

Re-verify current head after this handoff commit. Do not assume a historic SHA is the current branch tip.

---

## 14. WHAT IS APPROVED VS. WHAT IS NOT

### Approved direction

- Aqua Sentinel official naming and mother-brain role.
- Obsidian/cyan/gold family.
- Illuminated **A** identity.
- Layout with breathing space above Aqua.
- Raised/enlarged 3D card stack.
- True finger-following, momentum carousel intent.
- Functional app identity symbols plus wording.
- Clean reserved cards until real information is connected.
- Shared gateway/capability architecture.
- Physical Fold truth.
- Surgical changes.

### Implemented and CI-verified in v0.4.3

- Direct packaging of `sentient-os-web`.
- Android launcher drawable and manifest references.
- Protected Fold top spacing.
- reduced extreme perspective through later overrides;
- v0.4.3 scale geometry;
- pointer capture, continuous residual stepping, inertial coast;
- signed APK build and emulator launch;
- permanent release and checksum.

### Not yet physically accepted

- v0.4.3 final card scale;
- v0.4.3 kinetic feel;
- launcher appearance on Dave’s Fold;
- full vertical placement;
- DeX presentation;
- successful real Aqua answer after retry.

### Not complete

- final production/store signing;
- reliable realtime Aqua voice;
- full wake/sleep/barge-in/noise/talker-lock behavior;
- five-app live capability registry;
- real data replacing sample registry/workspace values;
- final offline queue and audit receipts for every linked app;
- end-to-end cross-app command execution.

---

## 15. REQUIRED NEW-CHAT RECEIPT

After reading this handoff, the next chat should respond with a receipt equivalent to:

```text
AQUA SENTINEL CONTINUITY RECEIPT

OWNER: Dave (Deyve)
OFFICIAL PRODUCT: Aqua Sentinel
CONVERSATIONAL NAME: Aqua
REPOSITORY: deyve55/aqua-homes-os
ACTIVE BRANCH: agent/aqua-sentinel-production-apk-v0.4.1-20260725
ACTIVE PR: #192
LATEST RELEASE: v0.4.3 production candidate
CORRECT SOURCE: sentient-os-web
REJECTED SOURCE: sentinel-app
LAST CODE AREA: app.js kinetic carousel handlers + fidelity.css v0.4.3 geometry block
NEXT GATE: Samsung Fold 7 physical v0.4.3 acceptance
CROSS-APP STATUS: architecture defined; five-app live registry not implemented
AQUA PROVIDER STATUS: authenticated route and retry implemented; physical end-to-end answer unverified
DESIGN AUTHORITY: Dave
REDESIGN AUTHORIZATION: NONE
```

Then inspect current repository evidence before proposing any code.

---

## 16. FINAL CONTINUITY STATEMENT

The two days of approved Aqua Sentinel work were not erased. The major failure was packaging the obsolete `sentinel-app` tree and mislabeling its green build as the approved interface. That failure was identified and corrected by making `sentient-os-web` the direct Android asset source.

v0.4.3 is the current verified repository release and includes the latest kinetic-carousel and identity work. Its next honest state is **awaiting Dave’s Samsung Fold 7 physical acceptance**, not “final.”

Continue from the exact symbols and files listed in Section 6. Do not reconstruct the design from memory, do not reopen rejected UI, and do not move into cross-app integration until the current shell has been physically accepted or Dave explicitly reprioritizes the work.
