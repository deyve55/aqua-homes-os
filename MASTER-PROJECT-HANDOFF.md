# Aqua Sentinel OS + Command Center Integration Handoff

Owner and final authority: Dave (Deyve)

Repository: `deyve55/aqua-homes-os`

Integration branch: `agent/aqua-sentinel-command-center-integration-20260730`

Base branch: `agent/aqua-sentinel-production-apk-v0.4.1-20260725`

Prepared: 2026-07-30 (`America/New_York`)

## Truth boundary

This branch is an integration and continuity branch. It does not merge into
`main`, and it does not contain private signing keys.

GitHub reported `deyve55/aqua-homes-os` as **public** during preparation.
Dave was informed and then explicitly authorized this upload.

The complete Sentinel source, approved UI recovery package, Android wrappers,
web/PWA source, carousel assets, tests, and workflows are inherited from the
base branch.

The Aqua Command Center v0.2.3 APK and source ZIP are not part of this commit.
Dave stated that another chat has them and will upload them separately. The
reserved destination and verification requirements are documented under:

`downloads/aqua-command-center-widget/v0.2.3/UPLOAD-REQUIRED.md`

Do not claim the Command Center integration is complete until those files are
present and verified from the actual APK and source.

## Aqua Sentinel source of truth

Use:

- `sentient-os-web/` for the approved Sentinel interface.
- `android-app/` for the current Android wrapper.
- `.github/workflows/aqua-sentient-os-release.yml` for the fidelity-preserving
  release path.
- `tests/sentient-functional-test.mjs` for the Sentinel production contract.
- `00-START-HERE/AQUA-SENTINEL-A-TO-Z-MASTER-HANDOFF-2026-07-25.md` for the
  detailed historical continuity record.

Do not package `sentinel-app/` as the current approved Sentinel interface. It
is retained only as legacy repository history.

The release workflow's critical fidelity boundary is:

```sh
mkdir -p android-app/app/src/main/assets/public
cp -R sentient-os-web/. android-app/app/src/main/assets/public/
```

## Current Sentinel source versus latest verified APK

The branch source has advanced to the v0.4.7 test-candidate configuration:

- source branch head before this integration commit:
  `dab19a9d406686aea3e667441efd3e00eee3440e`
- `applicationId`: `com.aquahomes.sentinel`
- namespace: `com.aquahomes.sentientos`
- source `versionCode`: `2026072508`
- source `versionName`: `0.4.7-test-candidate`

No correct `sentient-os-web` v0.4.7 release artifact was proven during this
handoff. The newer `Aqua Sentinel Android APK` artifact at the branch head was
inspected and rejected because it packages the obsolete `sentinel-app` tree.

The latest recovered and correctly packaged Sentinel artifact is therefore the
CI-verified v0.4.3 production candidate:

- APK:
  `downloads/aqua-sentinel-os/v0.4.3/AquaSentinelOS-v0.4.3-PRODUCTION-CANDIDATE.apk`
- APK SHA-256:
  `114c8689ffeeb7d3ca85c547277be44fae92aef7a6d7b33e6228347ac161dfb4`
- complete artifact ZIP:
  `downloads/aqua-sentinel-os/v0.4.3/AquaSentinelOS-v0.4.3-PRODUCTION-CANDIDATE.zip`
- ZIP SHA-256:
  `1c3d20c9d45594d6b98df78f4d493611841a878b11d2423bee28adebd41847d6`
- workflow run: `30171083473`
- workflow artifact ID: `8622998931`
- artifact source commit recorded by the package:
  `fb97e77b04a7df7b8016c47dc62d6797e68d1279`

The APK archive was rechecked and contains:

- `assets/public/index.html`
- `assets/public/app.js`
- `assets/public/fidelity.css`
- the approved `assets/public/assets/` tree
- a valid ZIP structure

Its preserved package report records:

- package: `com.aquahomes.sentinel`
- launch activity: `com.aquahomes.sentientos.MainActivity`
- version code: `2026072504`
- version name: `0.4.3-production-candidate`
- minimum SDK: 26
- target SDK: 35
- Android permissions: Internet and microphone
- APK Signature Scheme v2: verified
- APK Signature Scheme v3: verified

This is a production candidate, not a Google Play signing baseline. A prior
candidate signed with a different temporary certificate may need to be
uninstalled before installation.

## Android launch contract

### Aqua Sentinel OS

| Field | Verified value |
| --- | --- |
| Application ID / installed package | `com.aquahomes.sentinel` |
| Java namespace | `com.aquahomes.sentientos` |
| Launch activity | `com.aquahomes.sentientos.MainActivity` |
| Explicit Android component | `com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity` |
| Label | `Aqua Sentinel` |
| Deep-link intent filters | None declared in the current authoritative manifest |

The Command Center's large **A** must use the verified package/activity split
above. Do not use `com.aquahomes.sentientos` as the installed package name.

### Aqua Command Center

The package, provider, activities, intent filters, widget metadata, resize
limits, and certificate must be copied from the actual v0.2.3 manifest/APK by
the chat that owns that build. Do not infer them from v0.2.1 or v0.2.2.

## Approved Command Center control map

- Large **A**: open Aqua Sentinel OS.
- Ask Aqua: conversational microphone.
- Video: narrated video capture.
- Photo: still evidence capture.
- File: silent voice filing.
- Visible control order: **Ask Aqua · Video · Photo · File**.
- Approved visual: translucent obsidian glass, blue edge trace, and the Aqua
  Sentinel A/energy artwork blended into the tile without a black square.
- Required widget behavior: true Samsung/One UI resizing with 4x3 default and
  a smaller/larger supported range.

Live AI answers, background Sentinel routing, and filing receipts must remain
truthfully marked pending until their backend path is implemented and tested.

## Carousel and approved visual assets

The inherited branch contains the current landing-card and interface assets,
including:

- `sentient-os-web/assets/card-financial-command-front-v11.png`
- `sentient-os-web/assets/card-operations-front-v11.png`
- `sentient-os-web/assets/card-overview-front-v11.png`
- `sentient-os-web/assets/card-risk-monitor-front-v11.png`
- `sentient-os-web/assets/card-site-intelligence-front-v11.png`
- `sentient-os-web/assets/ui-hero-front-v11.png`
- `sentient-os-web/assets/ui-deck.png`
- `android-app/icon-source/AquaSentinel-BrainCircuit-approved-v045.png`
- `00-START-HERE/AQUA-SENTINEL-EXACT-UI-RECOVERY/`

Preserve these assets and their aspect ratios. Do not redesign or replace them
from memory.

## Build and verification

See `docs/integration/BUILD-AND-SIGNING.md`.

Validation performed while preparing this branch:

- `npm run test:sentient-functional`: 10/10 passed after the approved master
  launcher was restored and checksum-verified.
- `npm run test:sentinel`: 11/11 passed.
- Sentinel v0.4.3 APK and artifact ZIP SHA-256 values matched their preserved
  receipts.
- Sentinel v0.4.3 APK ZIP integrity passed.
- `assets/public/index.html`, `assets/public/app.js`, and
  `assets/public/fidelity.css` were confirmed inside the APK.
- `CURRENT-STATE.json` parsed successfully.
- `git diff --check` passed.

The complete launcher restoration script could not finish its generated
foreground images in this local sandbox because it writes an intermediate file
to `/tmp`, which is not writable here. Its master source restoration and
checksum verification succeeded, and the repository's generated launcher
outputs were not changed or committed. The GitHub workflow remains the
authoritative full build environment.

No new Android APK was built locally during this handoff. The preserved
Sentinel v0.4.3 APK came from successful workflow run `30171083473`.

Minimum Sentinel checks:

```sh
npm run test:sentient-functional
bash scripts/restore-aqua-sentinel-launcher-v045.sh
mkdir -p android-app/app/src/main/assets/public
cp -R sentient-os-web/. android-app/app/src/main/assets/public/
cd android-app
gradle --no-daemon --stacktrace :app:assembleRelease
```

Release signing requires the environment-variable names declared in
`android-app/app/build.gradle.kts`. Never commit their values, a keystore, or a
private key.

## Golden Goose pin

The supplied working governance is pinned in
`docs/governance/GOLDEN-GOOSE-PIN.md`. Application implementation remains
separate from canonical Golden Goose promotion.

## Required continuation sequence

1. The other chat uploads the actual v0.2.3 APK, complete source ZIP, checksum,
   verification receipt, and manifest identity report to the reserved folder.
2. Verify the Command Center APK ZIP integrity, package/version, provider
   registration, resize metadata, certificate, and Sentinel launch component.
3. Update `CURRENT-STATE.json` with those exact values.
4. Re-run a branch comparison against `main`.
5. Install on Dave's Samsung Fold and test:
   - widget add/remove;
   - resize smaller and larger;
   - large A opens Sentinel;
   - Ask/Video/Photo/File routes;
   - transparent artwork;
   - update/install signing behavior.
6. Record physical-device results. Do not call the integration complete before
   that test.

## Known remaining issues

- Command Center v0.2.3 files are pending from the other chat.
- Current Sentinel source is ahead of the latest correctly recovered APK.
- Sentinel v0.4.3 still requires final recorded Samsung Fold acceptance.
- No Sentinel deep-link intent filter currently exists.
- Command Center live AI and background filing are not proven end to end.
- Final Google Play signing and update continuity are not established.
- Repository visibility is public despite the earlier instruction calling it
  private.
