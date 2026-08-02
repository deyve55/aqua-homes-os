# Aqua Sentinel OS — New-Chat Takeover Handoff

Date: 2026-08-02

Owner and final authority: Dave / Deyve Docarmo

Company: Aqua Software Company

Repository: `deyve55/aqua-homes-os`

Branch: `agent/aqua-sentinel-command-center-integration-20260730`

Draft pull request: `#194`

Branch head before this handoff-only commit: `34722392305ee1352a54fd0d66eba99a8accd777`

`main` at handoff: `9764dfacfd14c43496fcccb65c2e64c444a7eec3`

## Read this first

This is the immediate takeover document for the next engineering chat. It records the exact point where the prior chat stopped, the owner's visual intent, what the v0.7.4 release candidate proved, what the owner's real Samsung recordings disproved, the root causes already isolated in source, and the next safe repair order.

Do not restart the product, redesign it, merge the draft pull request, or treat the green v0.7.4 workflow as owner acceptance. The owner tested the signed APK on his real device and rejected its visual fidelity.

The prior chat performed diagnosis only after the owner supplied the recordings. No application repair was made after the frame-by-frame audit. This handoff file is the only intended repository change after `3472239`.

## Copy/paste takeover instruction

Use this in the next chat:

> Read `00-START-HERE/AQUA-SENTINEL-NEW-CHAT-TAKEOVER-2026-08-02.md` in private repository `deyve55/aqua-homes-os`, branch `agent/aqua-sentinel-command-center-integration-20260730`, draft PR #194. Then read the Golden Goose pin, `MASTER-PROJECT-HANDOFF.md`, `CURRENT-STATE.json`, and the Exact Approved UI Recovery handoff referenced below. Continue from the real-device v0.7.4 visual rejection. Do not redesign, merge, force-push, touch `main`, or release another APK until the corrected Neuralink firing, portals, motion, image identity, WebView compositing, and widget resizing have passed the owner-aligned device gates in this handoff. Ask me to attach the two August 2 screen recordings if they are not available in the new chat.

## Repository checkout

```bash
git fetch origin
git checkout agent/aqua-sentinel-command-center-integration-20260730
git pull --ff-only origin agent/aqua-sentinel-command-center-integration-20260730
git status -sb
```

The branch must remain attached to draft PR #194. Before changing anything, verify:

- PR #194 is open and draft.
- The checked-out branch is `agent/aqua-sentinel-command-center-integration-20260730`.
- `main` remains at `9764dfacfd14c43496fcccb65c2e64c444a7eec3`, unless a later owner-authorized handoff explicitly says otherwise.
- The only commit after parent `3472239` is expected to be this handoff-only commit.
- The worktree has no unrelated user changes.

## Required reading order

1. This file.
2. `docs/governance/GOLDEN-GOOSE-PIN.md`.
3. `MASTER-PROJECT-HANDOFF.md`.
4. `CURRENT-STATE.json`.
5. `00-START-HERE/AQUA-SENTINEL-A-TO-Z-MASTER-HANDOFF-2026-07-25.md`.
6. `00-START-HERE/AQUA-SENTINEL-EXACT-UI-RECOVERY/Aqua-Sentinel-OS-Exact-Approved-UI-Handoff.md`.
7. The source and tests listed under **Files that matter now**.

Golden Goose governance remains binding:

- Dave is the final human authority.
- Gemini is an independent reviewer.
- Codex is the implementer.
- Do not flatter, hide defects, manufacture success, or silently reinterpret the design.
- Do not redesign screens unless Dave asks for a redesign.
- A green automated check is not owner acceptance when real-device evidence contradicts it.

## Stop reason and current owner decision

Dave stopped the prior chat because it had become long, slow, expensive, and was not converging on the visual result. He requested a detailed repository handoff and a clean new chat.

Current release decision:

**Reject v0.7.4 as a visually approved release candidate.**

The signed APK remains useful as a diagnostic baseline, but it is not the approved final experience and must not be relabeled as accepted.

## Current published state

The last application/proof commit before this handoff is:

- Commit: `34722392305ee1352a54fd0d66eba99a8accd777`
- Subject: `Make widget neural jolt observable`
- PR: `https://github.com/deyve55/aqua-homes-os/pull/194`
- PR state at handoff: open, draft, unmerged
- Base branch: `main`
- Base SHA: `9764dfacfd14c43496fcccb65c2e64c444a7eec3`

The authoritative v0.7.4 workflow was green at `3472239`. It built and verified:

- Package: `com.aquahomes.sentinel`
- Version: `0.7.4-living-neural-fidelity-widget`
- Android target: 35
- Minimum Android: 26
- APK SHA-256: `81db92cfefdd427236b01d02626668ae27873f4f1b80a9d882c52463c7e9d5b8`
- Signed APK artifact name: `AquaSentinelOS-v0.7.4-Exact-Fidelity-Materialization-Widget-Test.apk`

The workflow proved build/install/signature basics, a deterministic Chrome rendering sequence, a real wall-clock DOM phase sequence, selected Launcher3 widget resizing, action routes, FILED confirmation, five repeated Aqua Action runs, and process recreation.

It did **not** prove the owner-required visuals on Dave's Samsung device.

## Real-device evidence that invalidated visual acceptance

Dave supplied two Samsung screen recordings on 2026-08-02:

1. `Screen_Recording_20260802_161437.mp4`
   - Duration: approximately 3:03
   - Resolution: 720 x 1680
   - Main evidence: repeated widget resizing, app launch, Neuralink portal rotation, Receipt materialization, Books materialization, black redraw gaps.
2. `Screen_Recording_20260802_162259.mp4`
   - Duration: approximately 2:36
   - Resolution: 720 x 1680
   - Main evidence: widget neural/action states, voice filing behavior, Settings, Diagnostics, Command Center, File Cabinet duplication, Neuralink activation, another materialization, repeated black gaps.

These videos were not added to the repository under the handoff authorization. If the next chat cannot access them, ask Dave to attach both recordings again before claiming visual repair.

## Dave's direct rejection

Dave reported:

- The neurons are not firing on the screen.
- The widget is not resizing correctly.
- The screen is chaotic.
- The motion is not smoothly fluid.
- The central image is still wrong.
- The apps are not visibly inside the portals.

The frame-by-frame audit accepted every one of those complaints as technically valid.

## Recording 1 timeline

### 00:00–00:10 — widget idle

- The widget is a fixed portrait composition surrounded by unused black space.
- The central artwork and controls do not use the available host area.
- The displayed A is a thin cyan network mark, not the single approved metallic faceted A.

### 00:11–00:13 — camera route

- The camera route opens and returns.
- This proves an action can route, but does not validate the widget's responsive design.

### 00:13–00:29 — first resize cycle

- The widget changes between tall, narrow, tiny-square, wider-square, and tall states.
- Artwork miniaturizes inside a larger black frame.
- Layouts snap abruptly at size thresholds.
- Wide and tall bounds retain large unused areas.
- Controls do not recompose for the new aspect ratio.

### 00:29–00:36 — app opens

- Home shows a large neon triangular A with electric waves.
- This A does not match the widget A or the Neuralink A.
- Three separate A identities are now visible in one product.

### 00:37–01:26 — repeated widget movement and resizing

- The same fixed-square-inside-black-host behavior repeats.
- The selection frame grows while the useful visual remains a centered square or portrait.
- The widget does not occupy or intelligently reflow within the selected bounds.
- Layout transitions are discrete jumps, not a coherent responsive system.

### 01:26–01:29 — reopen Aqua Sentinel

- Home appears, then the user enters Neuralink.

### 01:29–01:55 — Neuralink idle and portal movement

- Eight portals, black sockets, dense wiring, multiple rings, and continuous micro-animations compete for attention.
- The screen has no quiet/rest hierarchy.
- The portal ring moves automatically and also jumps after swipes.
- Several portal faces read as icons or empty dark circles rather than recognizable app screens.
- App labels are extremely small.
- The central A is small and baked into the ornate visual field instead of standing as a crisp independent hero.

### 01:55–02:00 — Receipt selection and materialization

- The selected top portal enlarges and glows white/red.
- No clear upward neuron burst fires from Aqua's center to the top portal.
- The center A remains essentially static during the supposed firing phase.
- Large areas of the raster substrate disappear to black.
- A few cyan branches appear abruptly.
- The Receipt result then pops into a separate large rectangular surface.
- This is a glow -> blackout -> swap, not fire -> travel -> materialize.

### 02:00–02:37 — Receipt result

- The returned receipt is visible.
- Large black rectangular redraw gaps repeatedly cover portions of the result and background.
- The app view is outside the original portal, not living inside the portal.

### 02:37–02:50 — return and Books selection

- The Neuralink network returns.
- Books repeats the same top-portal halo without a visible center-origin neuron burst.
- The same blackout and abrupt materialization pattern occurs.

### 02:50–03:03 — Books result

- Books appears as a separate large panel.
- Intermittent black compositor gaps continue.

## Recording 2 timeline and additional defects

### 00:08–00:31 — widget action and voice filing

- The widget displays action states such as handling, sent, listening, heard, and saved.
- Neural paths visibly change, but they resemble slow path overlays rather than the approved center-origin neuron-firing choreography.
- The filing capture absorbs surrounding narration and saves a malformed instruction.

### 00:33–00:59 — Settings, Diagnostics, Home, Command Center

- Settings and Command Center are substantially calmer and more readable than Neuralink.
- Diagnostics truthfully shows unconnected application boundaries.
- Home again shows the incompatible giant neon A identity.

### 01:01–01:32 — File Cabinet

- File Cabinet shows two pending clarifications and ten auto-routed items.
- Multiple identical `Remind me to call John today at 5 PM` Aqua Action records are present.
- A `Quick filing instruction` contains badly transcribed surrounding narration.
- Deduplication, utterance boundaries, and filing-intent confirmation require a separate functional correction after the critical visual repair.

### 01:37–02:01 — Neuralink revisit and materialization

- The same crowded portal system returns.
- The selected top portal glows.
- The lower half of the raster substrate turns black for multiple consecutive frames.
- No visible upward jolt connects the central A to the selected portal.
- The result appears outside the portal.

### 02:01–02:15 — returned view

- The result is readable when present.
- Large black rectangular gaps continue to appear over the returned surface.

## Root causes already isolated in source

### 1. Firing phase and jolt CSS use different state names

Runtime source uses:

- `neuralPhase = "firing"`
- `.neural-stage[data-phase="firing"]` for selected portal brightness and selected paths.

The upward jolt animation is still wired to:

- `.neural-stage[data-phase="working"] .neural-jolt`
- `.neural-stage[data-phase="working"] .neural-jolt > b`
- `.neural-stage[data-phase="working"] .neural-jolt i...`
- `.neural-stage[data-phase="working"] .neural-jolt span`

The Neuralink flow does not enter `working`. Therefore the actual upward-jolt element remains invisible during `firing`.

This is the most direct reason Dave sees no neurons firing upward.

Important: several other stale `working` selectors also remain for brightness, microburst speed, core field, thought trail, and related state styling. Do not fix only one selector and assume the firing choreography is complete. Audit every `data-phase="working"` rule against the actual phase state machine.

### 2. The current tests prove element existence, not state-to-animation coupling

The contract tests assert that:

- a `neural-jolt` element exists;
- `@keyframes neural-jolt-up` exists;
- the DOM reaches `data-aqua-neural-phase="firing"`.

They do not assert that `data-phase="firing"` selects and animates `.neural-jolt`.

The workflow greps the firing DOM for `class="neural-jolt"`, but that only proves the inert element is present. This allowed CI to pass while the owner-required firing was invisible.

### 3. Portal gesture has no pointer tracking or inertia

The Neuralink pointer implementation records only:

- pointer-down coordinates;
- pointer-up coordinates.

There is no `pointermove` handler, no live drag position, no velocity calculation, no follow-the-finger transform, and no momentum decay.

After release, a swipe simply chooses one direction and animates exactly one slot for 720 ms. That is why the ring feels detached and jerky rather than fluid.

The idle timer also advances the entire ring every 4.6 seconds. Combined with constantly animated paths, rings, portal orbits, masks, and microbursts, the surface never visually rests.

### 4. Portal app images are present in code but visually destroyed

Each app defines a static `neuralAsset` such as:

- `./assets/carousel-v2/crm.webp`
- `./assets/carousel-v2/draw.webp`
- `./assets/carousel-v2/cam.webp`
- `./assets/carousel-v2/vault.webp`
- `./assets/carousel-v2/timesheet.webp`
- `./assets/carousel-v2/books.webp`
- `./assets/carousel-v2/receipts.webp`

These are tall phone-screen images. Portal CSS then:

- crops them into tiny circles using `object-fit: cover`;
- zooms them;
- darkens them;
- overlays a centered icon;
- overlays app name and connection status;
- overlays rings and shading.

The code can claim an image is inside the portal, but the user cannot recognize the app. Dave's complaint is correct.

The portal should use a recognizable verified app snapshot or owner-approved demonstration snapshot, preserve its aspect ratio, keep its central UI unobstructed, and enlarge the selected/top portal sufficiently to read what app it contains.

### 5. The central A and background are baked into raster plates

Neuralink uses full-screen raster substrates:

- `sentient-os-web/assets/neuralink-rest-v071.png`
- `sentient-os-web/assets/neuralink-materialized-v071.png`

The small central A and many decorative circuits/sockets are already baked into those images. Dynamic portals and SVG paths are then placed over them.

Consequences:

- Moving a portal can expose an empty baked socket.
- The central A cannot remain an independent static hero while the network changes.
- The raster plate crossfade can move or fade the A with the background.
- Dynamic overlays compete with baked decorative wiring.
- The screen becomes visually chaotic even when the state logic is correct.

### 6. The WebView transition overloads compositing

During materialization, the app simultaneously animates:

- two full-screen 852 x 1846 raster pseudo-elements;
- opacity;
- transforms;
- `clip-path`;
- brightness/contrast/saturation filters;
- full-screen path masks;
- SVG neural signals and bursts;
- multiple portal Web Animations;
- materialization opacity and transform;
- additional glow, blend, and shadow layers.

The real Samsung recordings show large black rectangles and missing substrate tiles. This is a real Android WebView compositor failure, not a cosmetic preference.

The next implementation must use one stable obsidian substrate and independent lightweight transform/opacity layers. Avoid animating two filtered full-screen rasters with `clip-path` while the portal network is also moving.

### 7. Widget responsive map centers fixed squares in arbitrary hosts

The provider currently allows:

- minimum: 110 x 110 dp;
- maximum: 520 x 760 dp;
- target: 4 x 6 cells;
- horizontal and vertical resizing.

The responsive map includes fixed layouts at keys such as:

- 110 x 110;
- 180 x 180;
- 180 x 110;
- 250 x 140;
- 250 x 180;
- 320 x 180;
- 180 x 260;
- 250 x 390.

The compact layouts themselves contain fixed 110 x 110 or 180 x 180 inner frames centered inside a match-parent black surface. Wide and tall launcher bounds therefore expose unused black areas instead of receiving a layout designed for that aspect ratio.

This is not an unavoidable Android limitation. Android widgets use discrete responsive or exact-size RemoteViews, but each supported state still needs an appropriate layout. Either:

- provide correct micro-square, wide, portrait, and large compositions that fill their intended bounds; or
- restrict the supported resize range to shapes that have an approved composition.

Do not stretch the central neural artwork. Preserve its aspect ratio and recompose the controls around it.

### 8. Three incompatible A identities exist

The recordings show:

1. Widget: thin cyan circuit/network A.
2. Home: large neon triangular A with an electric horizontal wave.
3. Neuralink: smaller pale A baked into the ornate network plate.

Dave's approved direction requires one coherent metallic faceted A identity. The A frame must remain crisp and visually authoritative, with motion coming from the center orb/neural energy rather than deforming or replacing the A.

## Dave's binding visual vision

### Product identity

- Name: `Aqua Sentinel OS`.
- Company: `Aqua Software Company`.
- Do not restore the retired `Aqua Homes OS` name.
- Header greeting: `Good morning, Dave.`
- Premium, dark, mobile-first operating-system feel.
- Obsidian black base.
- Cyan/obsidian-blue highlights.
- White readable typography.
- Restrained gold accents.
- Glass only where it improves hierarchy.
- No generic dashboard, carnival neon, or decorative overload.

### Central Aqua A

- One consistent metallic faceted A.
- Taller and sharper than the current Neuralink A.
- Static, crisp frame.
- Center orb is the living voice/brain source.
- Speaking: energy emits from the center orb in the approved T-shaped direction—up, left, and right.
- Listening: inward edge waves move toward Aqua.
- Do not make the whole screen glow.
- Do not bury the A inside a baked screenshot.

### Apps, carousel, and portals

- The approved Home concept is a smooth curved rotating stack with five visible cards.
- The center card is slightly taller and face-on.
- Touch follows the finger and settles with believable inertia.
- App name appears above the card, readable and not crammed, then fades after roughly two seconds.
- Each app surface shows its actual home screen or an owner-approved animated representation.
- In Neuralink, apps must be visibly and recognizably inside their portals—not reduced to generic icons or unreadable crops.
- Selecting a portal must clearly connect Aqua's center to that portal, fire upward, and bring the requested view forward without a blackout.
- Tapping the centered selected app opens that app.

Known app set:

- Aqua CRM
- AquaDraw
- AquaCam
- Aqua Knowledge Vault
- Aqua Timesheet
- Aqua Books
- Aqua Receipts
- File Cabinet / Sentinel evidence surface

### Lower Home dashboards

- Two live glass dashboard cards below the selected app.
- They mirror the selected app's live/presentation state.
- They should split the useful information cleanly rather than display waiting placeholders forever.

### Bottom interaction

- Minimal bottom area.
- `Tap here to speak to Aqua.`
- Avoid an oversized navigation bar.

### Standalone / Sentinel

- Satellite apps remain standalone-capable.
- A small Standalone/Sentinel switch controls cross-app authority.
- Do not cram it into the header.

### Home-screen Command Center widget

- The widget is critical, not decorative.
- It must resize into intentionally designed layouts.
- The microphone/central action identity must be the metallic Aqua A.
- Required quick actions include Aqua Action/voice, photo, video, and file.
- `Aqua, file $X for [company]` must file immediately when the instruction is sufficient, close the interaction, and show a truthful confirmation.
- Captured photo/video can be filed with delayed clarification when needed.
- The widget must connect to the same protected File Cabinet used by Aqua Receipts/Sentinel evidence.
- No giant dead-black margins.
- No stretched art.
- No invisible or misaligned hit regions.
- Status text must be brief, readable, and truthful.

## Files that matter now

### Neuralink implementation

- `sentient-os-web/app.js`
  - app definitions and `neuralAsset` paths;
  - ring and materialized slot geometry;
  - phase state machine;
  - portal gesture handlers;
  - materialization scheduling;
  - portal markup.
- `sentient-os-web/fidelity.css`
  - raster substrates;
  - portal cropping/overlays;
  - path animations;
  - stale `working` selectors;
  - firing state styling;
  - full-screen compositing layers.
- `sentient-os-web/index.html`
  - shell and preview hooks.

### Neuralink assets

- `sentient-os-web/assets/neuralink-rest-v071.png`
- `sentient-os-web/assets/neuralink-materialized-v071.png`
- `sentient-os-web/assets/neuralink-materialization-five-portal-approved-v073.png`
- `sentient-os-web/assets/neuralink-rest-cyan-path-mask-v074.png`
- `sentient-os-web/assets/neuralink-rest-gold-path-mask-v074.png`
- `sentient-os-web/assets/neuralink-materialized-cyan-path-mask-v074.png`
- `sentient-os-web/assets/neuralink-materialized-gold-path-mask-v074.png`
- `sentient-os-web/assets/carousel-v2/*.webp`
- `sentient-os-web/assets/ui-hero-front-v11.png`

The word `approved` in an old filename does not override Dave's current real-device rejection.

### Widget implementation

- `android-app/app/src/main/java/com/aquahomes/sentientos/AquaCommandWidget.java`
- `android-app/app/src/main/res/xml/aqua_command_widget_info.xml`
- `android-app/app/src/main/res/layout/aqua_command_widget.xml`
- `android-app/app/src/main/res/layout/aqua_command_widget_2x2.xml`
- `android-app/app/src/main/res/layout/aqua_command_widget_compact.xml`
- `android-app/app/src/main/res/layout/aqua_command_widget_compact_large.xml`
- `android-app/app/src/main/res/drawable-nodpi/aqua_widget_2x2_approved_v073.png`
- `android-app/app/src/main/res/drawable-nodpi/aqua_widget_4x6_approved_v073.png`
- `android-app/app/src/main/res/drawable/aqua_widget_neural_activity_2x2.xml`
- `android-app/app/src/main/res/drawable/aqua_widget_neural_activity_4x6.xml`
- `android-app/app/src/main/res/animator/aqua_widget_neural_outbound.xml`
- `android-app/app/src/main/res/animator/aqua_widget_neural_return.xml`

### Current tests and release gate

- `tests/sentient-functional-test.mjs`
- `.github/workflows/aqua-sentient-os-release.yml`
- `scripts/verify-aqua-sentinel-neural-live-wall-clock.mjs`
- `scripts/render-aqua-sentinel-visual-proof.mjs`
- the Launcher3/device proof invoked by the release workflow.

## Required repair order

Do not attempt all visual problems in one uncontrolled redesign. Repair in this order while preserving the approved composition.

### Step 1 — lock the correct A and visual identity

- Identify the exact approved metallic faceted A from the recovery sources and owner reference.
- Use one A identity on Home, Neuralink, and widget.
- Keep the A as an independent layer.
- Do not bake it into a full-screen background.
- Show Dave a still proof before rebuilding motion around the wrong image again.

### Step 2 — make firing real and visible

- Audit every stale `data-phase="working"` selector.
- Bind the actual `firing` phase to the upward jolt.
- Fire from the central orb/A to the selected top portal.
- Make the burst unmistakable on Dave's screen without flooding the entire display.
- Keep cyan outbound and restrained gold return semantics.
- Prove the correct screen region changes during the firing interval.

### Step 3 — stabilize the substrate and eliminate black gaps

- Replace the dual full-screen filtered raster crossfade with one stable obsidian substrate.
- Move circuitry, paths, A, portals, and returned object into independent lightweight layers.
- Prefer transform and opacity animation.
- Remove or tightly limit full-screen `clip-path`, filters, blend modes, and oversized `will-change` surfaces.
- Verify on Android WebView, not only desktop/headless Chrome.

### Step 4 — put recognizable apps inside portals

- Use verified live snapshots when available.
- Use explicitly labeled presentation snapshots when live data is unavailable.
- Preserve the phone/screen aspect ratio.
- Do not crop the meaningful UI out of the portal.
- Remove the centered generic icon when it obstructs the app.
- Enlarge the selected/top portal enough to recognize the app.
- Keep the app name above/near the selected portal, readable and temporary.

### Step 5 — rebuild portal interaction as true fluid motion

- Track pointer movement continuously.
- Move portals with the finger.
- Measure release velocity.
- Add bounded inertia and deterministic snapping.
- Stop or greatly reduce automatic whole-ring rotation while the user is observing/interacting.
- Reduce simultaneous idle animation so the composition can rest.
- Preserve click/tap accuracy and accessibility.

### Step 6 — rebuild widget responsive states

- Define the exact supported size/orientation matrix.
- Design a real micro-square layout.
- Design a real compact-wide layout.
- Design a real portrait layout.
- Design a real large layout only if it adds useful information.
- Fill the host bounds intentionally without stretching the A/neural art.
- Keep all control hit regions aligned with the visible controls.
- If an extreme shape has no approved composition, restrict it instead of showing dead black space.
- Test on Dave's Fold 7 closed-phone launcher profile and DeX-relevant sizes where possible.

### Step 7 — correct voice filing duplication after the visual blockers

- Define explicit utterance start/end boundaries.
- Prevent surrounding commentary from being saved as a filing instruction.
- Add idempotency/deduplication for repeated Aqua Action reminders.
- Preserve truthful pending/auto-routed states.
- Do not lose the original evidence or command receipt.

## New release gates required before another APK

The old green gate is insufficient. Add these owner-aligned proofs.

### Neural firing proof

- Enter the real `firing` phase through a real portal interaction.
- Require a visible vertical/upward neuron column in the expected center-to-top region.
- Require meaningful pixel change in that region, not merely a DOM class.
- Require the central A to remain present and correctly positioned.

### Portal-content proof

- Assert that each portal contains the correct app snapshot.
- Assert that the selected portal has enough visible app content to identify it.
- Assert that the central meaningful portion is not covered by a generic icon.

### Motion proof

- Record actual Android WebView frames through drag, release, firing, transition, and result.
- Check that drag follows pointer movement.
- Check bounded velocity/inertia and final snap.
- Check for frame stalls and abrupt one-slot jumps.

### Black-gap/compositor proof

- Analyze every transition frame for large new near-black rectangles or missing raster tiles.
- Run on an Android WebView/emulator configuration representative of the owner device.
- Do not rely only on deterministic Chrome stills.

### Widget proof

- Place and resize the widget through every supported size bucket.
- Require useful visible content to occupy the intended percentage of the host.
- Require no stretched A/neural artwork.
- Require controls to remain visible and their hit regions aligned.
- Test small-square, wide, portrait, and maximum supported states.

### Owner-reference proof

- Compare the A, portal arrangement, brightness, colors, and hierarchy to the exact approved reference—not only an old generated asset.
- Do not publish an APK as visually verified until Dave reviews a new recording or still sequence from the corrected build.

### Functional regression

- Run the full existing test suite.
- Preserve package name, deep links, filing behavior, action routing, and standalone/Sentinel boundaries.
- Keep the draft PR unmerged.

## Publication and safety rules

- Work only on `agent/aqua-sentinel-command-center-integration-20260730` unless Dave explicitly authorizes another branch.
- Keep PR #194 draft and unmerged.
- Do not modify `main`.
- Do not force-push.
- Do not upload API keys, `.env` files, signing private keys, tokens, local authentication files, build caches, temporary captures, or unrelated artifacts.
- Do not upload the owner recordings without explicit authorization.
- Do not publish a new APK merely because a generic Android build passes.
- Do not call old v0.7.4 screenshots owner-approved after the real-device rejection.
- Preserve existing backend, SDK bridge, package identity, and working Command Center/File Cabinet behavior while repairing visuals.

## What the next chat should do first

1. Check out and verify the exact branch/PR state.
2. Read the required handoffs and source files.
3. Ask Dave to attach the two August 2 recordings if they are unavailable.
4. Extract or locate the exact approved metallic faceted A/reference before changing layout.
5. Produce a concise still comparison showing:
   - the correct A;
   - one recognizable selected app inside its portal;
   - the intended neuron firing path;
   - the supported widget size compositions.
6. Get Dave's visual confirmation on the reference correction.
7. Implement the firing selector/state repair and stable substrate without broad product changes.
8. Validate on Android WebView frame-by-frame.
9. Continue through portal motion and widget responsiveness.
10. Only then prepare a new private test APK and keep PR #194 draft.

## Do not repeat these mistakes

- Do not equate a green DOM check with a visible animation.
- Do not claim apps are visible because an image tag exists under multiple overlays.
- Do not use fixed square layouts inside arbitrary widget bounds and call them responsive.
- Do not add more glows, rings, circuitry, or simultaneous motion to solve a hierarchy problem.
- Do not bake the A, portals, and circuitry into one screenshot if they need independent motion.
- Do not test only Chrome when the owner is reporting Android WebView defects.
- Do not release before checking the exact artifact the owner will install.

## Handoff completion state

At the end of the prior chat:

- Diagnosis: complete.
- Real-device visual rejection: documented.
- Exact source causes: isolated.
- Application repair after diagnosis: not started.
- Worktree before this file: clean at `3472239`.
- Intended repository mutation: this handoff file only.
- Next engineering responsibility: begin with **Step 1 — lock the correct A and visual identity**.

This file is the authoritative immediate continuation point for the next chat. It supplements, but does not silently replace, Golden Goose governance or the earlier master handoffs.
