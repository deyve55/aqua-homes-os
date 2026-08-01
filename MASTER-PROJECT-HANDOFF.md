# Aqua Sentinel OS — Current Takeover Handoff

Owner and final authority: Dave (Deyve)

Company: Aqua Software Inc.

Repository: `deyve55/aqua-homes-os`

Active branch: `agent/aqua-sentinel-command-center-integration-20260730`

Draft pull request: [#194](https://github.com/deyve55/aqua-homes-os/pull/194)

Prepared: 2026-08-01 12:25 EDT (`America/New_York`)

Handoff base head observed before this handoff commit: `eca487bd66a4ea0bb603808988cd1011b9f75cf5`

State: TAKEOVER READY; DO NOT RESTART OR REDESIGN

## 0. New-chat startup directive

This is an active Aqua Sentinel OS implementation. The receiving chat must:

1. Read this file and `CURRENT-STATE.json` completely.
2. Read `docs/governance/GOLDEN-GOOSE-PIN.md` and use the attached or otherwise accessible Golden Goose files whose exact hashes are recorded below.
3. Fetch PR #194 and verify its current head before changing anything. The branch was advancing during handoff preparation, so the head in this file is an observed base, not permission to overwrite later commits.
4. Preserve the approved Home screen, protected Aqua A art, carousel, lower presentation panels, colors, assets, Android identity, backend boundary, and widget behavior.
5. Use `sentient-os-web/` as the authoritative Sentinel web UI and `android-app/` as its Android wrapper.
6. Do not package the legacy `sentinel-app/` tree as the current Aqua Sentinel OS.
7. Keep PR #194 draft and unmerged unless Dave separately authorizes a merge. Repository metadata currently reports `public`; do not describe it as private without re-verification.
8. Never upload API keys, `.env.local`, keystores, signing keys, temporary screenshots, `build/`, `dist/`, or old APK artifacts.
9. Separate implemented, CI-verified, visually inspected, and physically verified claims.
10. Continue from the exact failing proof gate in Section 8. Do not restart the project from the July v0.4.x state.

Dave is the sole final product, design, tradeoff, and production authority.

## 1. Golden Goose governance pin

The three supplied files were hash-verified again during this handoff:

| File | Version | SHA-256 |
| --- | --- | --- |
| `Golden-Goose-Engineering-Manual.md` | `1.2.0-RECONSTRUCTED-03` | `97e9dae4c90649af891bdfc9911e3bedfbc691ca1361f404b106ba0ed86ebc0a` |
| `Golden-Goose-Update-Master-Handoff.md` | `1.1.0` | `8f18d1cb7fef905fc0b41804029ca5cba80bcf3efa47ae1fd422f0a7a270c9cc` |
| `Golden-Goose-Notebook.md` | `1.9.0` | `76c39b20153606b9fd9edc87e2fa1783b33262261c2795e21c87e37e2bc2930c` |

The Assembly-Line Architecture Amendment is recorded as synchronized but not canonically promoted. This application handoff does not promote it and does not modify Golden Goose canonical files.

## 2. Current product identity and Android contract

| Field | Current value |
| --- | --- |
| Product | Aqua Sentinel OS |
| Company | Aqua Software Inc. |
| Android application ID | `com.aquahomes.sentinel` |
| Java namespace | `com.aquahomes.sentientos` |
| Launch activity | `com.aquahomes.sentientos.MainActivity` |
| Explicit component | `com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity` |
| Version code | `2026080101` |
| Version name | `0.6.0-neural-link-ai-gateway-test` |
| Minimum SDK | 26 |
| Target SDK | 35 |
| Authoritative web UI | `sentient-os-web/` |
| Authoritative Android wrapper | `android-app/` |
| Legacy/non-authoritative tree | `sentinel-app/` |

The correct packaging boundary remains:

```sh
mkdir -p android-app/app/src/main/assets/public
cp -R sentient-os-web/. android-app/app/src/main/assets/public/
```

## 3. Approved Home screen — preserve it

The v0.6.0 work added secondary surfaces behind the existing Home. It did not authorize a Home redesign.

Locked visual and interaction direction:

- black obsidian base;
- protected metallic/cyan Aqua A hero and approved launcher artwork;
- restrained gold, white type, blue glass, and no generic neon dashboard treatment;
- curved seven-app carousel with touch/inertia behavior;
- app name above the selected card;
- two lower presentation/live-data panels tied to the selected app;
- bottom order `Ask Aqua · Video · Photo · File`;
- Samsung Fold closed posture is the primary physical target, with Fold open and DeX also required;
- physical Dave approval remains the final visual truth.

Checksum-locked visual anchors in the workflow:

- Home hero: `d78335f4ccf77cebad9dba7d985bce979aff3e31272c4c6a85bc3f211f482df7`
- launcher source: `bc1e014886d19f10ee1b8afdca2f5bc99d6d9c9ff103c2b359cc9457da80f6c5`

Do not replace those assets from memory or generated approximations.

## 4. What v0.6.0 now implements

### Sentinel Home and secondary surfaces

- Existing approved Home remains the startup surface.
- Neural Link is a spatial, direct-open surface for the satellite applications.
- Command Center contains File Cabinet, capture intake, queue, and practical control surfaces.
- Deterministic CI-only preview routes exist for `home`, `neural`, `command`, `settings`, and `diagnostics`.
- Normal startup is not supposed to use those preview routes.

### Integrated Android Command Center

The current Sentinel Android wrapper contains:

- `AquaCommandWidget.java`;
- `QuickCaptureActivity.java`;
- `FilingStore.java`;
- `EvidenceProvider.java`;
- widget layouts, drawables, metadata, and action verification script;
- Ask/Voice, Photo, Video, Files, widget delivery, and local-first filing seams.

The separately packaged external Command Center v0.2.3 APK/source is still not present. Do not confuse that missing external package with the integrated Sentinel widget source now in `android-app/`.

### AI gateway and Android boundary

The Android app no longer contains or calls the old Supabase endpoint/key path. Android calls the stable server boundary through:

- build field: `AQUA_GATEWAY_URL`;
- default URL: `https://api.aquahomesos.com/gateway`;
- encrypted short-lived device session storage;
- JSON-RPC 2.0 requests;
- server-side OpenAI use only.

OpenAI keys, storage credentials, adapter credentials, tenant rules, entitlements, and authoritative writes must remain behind the gateway. Never place them in the APK or PWA.

Backend source of truth:

- `backend/server.mjs`
- `backend/gateway.mjs`
- `backend/auth.mjs`
- `backend/contracts.mjs`
- `backend/aqua-agent.mjs`
- `backend/projection-store.mjs`
- `backend/capability-registry.mjs`
- `backend/receipt-intelligence.mjs`

The current root package is private and uses `@openai/agents` `0.14.1` plus `zod` `4.4.3`.

### Truth and confirmation behavior

The executable backend tests establish:

- signed, expiring Sentinel sessions;
- tenant-isolated searchable projections;
- strict materialization receipts;
- capability protection;
- no fake satellite write when an authoritative action adapter is absent;
- explicit confirmation before protected actions;
- live truth behavior that does not fabricate a receipt when no receipt adapter is connected.

### Satellite projection sync

`aqua.adapter.sync` is implemented as an authenticated, tenant-scoped, idempotent JSON-RPC method. It prevents:

- one satellite impersonating another;
- an adapter crossing an unapproved tenant boundary;
- reuse of a sync ID with different content;
- duplicate ingestion from an identical replay.

Read:

- `docs/ai-backend/satellite-projection-sync.md`
- `backend/contracts.mjs`
- `backend/capability-registry.mjs`

The current projection store is in memory and loses projections on restart. It is an integration seam, not production durability.

## 5. Sentinel SDK truth — critical for other app chats

An installable Sentinel SDK has **not** been packaged or published yet.

Current truth:

- there is no `packages/aqua-sentinel-sdk/` directory;
- the root `package.json` is private;
- it has no package exports for satellites;
- there is no truthful `npm install @aqua/sentinel-sdk` or Gradle dependency yet.

Until an SDK exists, other app chats may read and implement the documented `aqua.adapter.sync` contract manually, but they must not invent a dependency.

Planned permanent location and package name:

```text
packages/aqua-sentinel-sdk/
@aqua/sentinel-sdk
```

Before satellite installation is claimed, the next implementation must create, version, test, and publish that private shared package, then pin the exact released version in each app. Never distribute adapter credentials inside it.

## 6. Satellite authority and current connection status

Registered capabilities:

| ID | App | Current registry state |
| --- | --- | --- |
| `crm` | Aqua CRM | `adapter_required` |
| `timesheet` | Aqua Timesheet | `adapter_required` |
| `receipts` | Aqua Receipts | `adapter_required` |
| `knowledge-vault` | Aqua Knowledge Vault | `adapter_required` |
| `books` | Aqua Books | `adapter_required` |
| `cam` | Aqua Cam | `adapter_required` |
| `draw` | Aqua Draw | `adapter_required` |
| `sentinel-files` | Sentinel File Cabinet | `local_ready` |

Satellites remain authoritative for their own records. Projection sync is read-only. Writes require a prepared intent, explicit human confirmation, and a separately configured authoritative action adapter.

## 7. Validation history that can be trusted

### v0.6.0 implementation checkpoint

- Initial approved 24-file backend/Neural Link payload was published as commit `f404225`.
- 36/36 tests passed at that checkpoint.
- Regression workflow #148 passed.
- General Android workflow #75 passed.
- Specialized v0.6.0 workflow #84 passed on retry; the original failure was an emulator input flake.
- Artifact `8817120195` was produced by the general Android workflow for `f404225`.

### Visual-evidence correction checkpoint

- Focused preview/evidence work stayed confined to the approved evidence scope.
- Commit `f6ae9395` produced green regression #152, general Android #79, and specialized run #92.
- Run #92 proved distinct Neural Link and Command Center 430×932 images, APK build/signing, widget routes, Sentinel foreground activity, and no camera crash dialog.
- Its launch image still contained a fullscreen onboarding overlay, so that image was not accepted as final Home visual evidence.

### Current observed head before this handoff commit

Head: `eca487bd66a4ea0bb603808988cd1011b9f75cf5` (`Render Home evidence without native preview rows`)

Workflows on that head:

| Workflow | GitHub run | Result |
| --- | --- | --- |
| Aqua Regression Gate | #165 / `30708160814` | Passed |
| Aqua Sentinel Android APK | #92 / `30708160813` | Passed |
| v0.6.0 Neural Link AI Gateway Test | #118 / `30708160827` | Pending when handoff was frozen |

The immediately preceding specialized run #116 failed before Java/Android setup. The current head contains a focused Home-rendering correction; its specialized proof had not reached a terminal result when this handoff was frozen.

Handoff checkout validation on the same base plus these two documentation updates:

- backend tests: 9/9 passed;
- Sentinel smoke tests: 11/11 passed;
- Sentinel functional tests: 17/17 passed;
- total: 37/37 passed;
- `CURRENT-STATE.json` parsing passed;
- `git diff --check` passed.

## 8. Exact last work position — take over here

File under active repair:

`/.github/workflows/aqua-sentient-os-release.yml`

Related contract files:

- `sentient-os-web/app.js`
- `tests/sentient-functional-test.mjs`

Tracing commit `b0da68a` added `set -x` to the deterministic screenshot step. Run #116 proved:

1. Home screenshot was written: 341,370 bytes.
2. Neural Link screenshot was written: 277,872 bytes.
3. Command Center screenshot was written: 207,809 bytes.
4. All three non-empty-file checks passed.
5. The very first Home DOM assertion failed:

```sh
grep -q 'data-aqua-preview-ready="home"' /tmp/aqua-sentinel-home-proof.html
```

That failure showed Home rendering stopped before the readiness marker was set. Current head `eca487b` applies the focused correction: `dashboardPanelMarkup()` now treats absent preview-row arrays as empty arrays and then uses the existing widget fallback. It also removes the temporary `set -x` tracing and adds a matching regression assertion. Regression #165 and general Android #92 are green; specialized #118 is the decisive pending proof.

Required next action:

1. Re-fetch PR #194 and ensure no newer commit supersedes `eca487b`.
2. Monitor specialized run #118 (`30708160827`) through a terminal result.
3. If it passes, download and visually inspect Home, Neural Link, and Command Center proof images; do not accept filenames alone.
4. If it fails, inspect the exact failed command before changing source or retrying.
5. Keep PR draft and do not merge.

## 9. Current local/source checks

Run from repository root:

```sh
npm ci
npm test
node --check sentient-os-web/app.js
node --check backend/server.mjs
node --check backend/gateway.mjs
node --check backend/aqua-agent.mjs
node --check backend/receipt-intelligence.mjs
```

The authoritative Android build remains the GitHub workflow because signing values must not be committed.

## 10. Remaining gates after the CI evidence fix

- Build and publish a real private `@aqua/sentinel-sdk` package.
- Replace the in-memory projection store with governed durable persistence.
- Configure real, server-side adapter credentials and tenant allowlists.
- Connect each satellite and prove read projections without transferring record ownership.
- Add authoritative action adapters only with confirmation, receipts, and audit behavior.
- Complete real voice, wake/sleep, barge-in, construction-noise rejection, and primary-talker behavior.
- Physically test the exact current APK on Dave's Samsung Fold 7 closed/open and in DeX.
- Verify widget resize, Ask, Voice, Photo, Video, File Cabinet, app opening, carousel inertia, labels, lower panels, and return routing.
- Establish final store/update signing continuity. CI test certificates are not a production signing baseline.
- Update PR #194's title/body after the final v0.6.0 checkpoint; its current description still foregrounds v0.5.5.

## 11. Security and truth boundaries

- No API keys, `.env.local`, adapter secrets, keystores, or signing keys belong in Git.
- The phone receives only a short-lived Sentinel session.
- Client-provided tenant claims are not authoritative.
- Satellite projections are not authoritative writes.
- `Confirmed` must not be emitted without an authoritative receipt.
- A green general APK workflow does not erase a failed specialized evidence gate.
- A green emulator is not Samsung Fold visual acceptance.
- A historical artifact is not necessarily built from the current branch head.

## 12. Required takeover receipt

After reading this file and re-fetching PR #194, the receiving chat should answer with a receipt equivalent to:

```text
AQUA SENTINEL V0.6.0 TAKEOVER RECEIPT

OWNER: Dave (Deyve)
COMPANY: Aqua Software Inc.
REPOSITORY: deyve55/aqua-homes-os
BRANCH: agent/aqua-sentinel-command-center-integration-20260730
DRAFT PR: #194
AUTHORITATIVE UI: sentient-os-web
AUTHORITATIVE ANDROID: android-app
LEGACY TREE: sentinel-app
VERSION: 0.6.0-neural-link-ai-gateway-test
LAST OBSERVED BASE HEAD: eca487bd66a4ea0bb603808988cd1011b9f75cf5
CURRENT GATE: specialized run #118 pending after focused Home preview-row correction
REGRESSION: green on observed head
GENERAL ANDROID: green on observed head
SDK: contract exists; installable @aqua/sentinel-sdk does not yet exist
SATELLITES: adapter_required; Sentinel File Cabinet local_ready
MAIN MERGE: not authorized
REDESIGN: not authorized
NEXT ACTION: re-fetch head, monitor run #118, inspect artifacts if green or the exact failed command if red
```

Then continue from the repository evidence. Do not reconstruct the project from chat memory.

## 13. Completed v0.6.0 APK and SDK v1.10.0 checkpoint — 2026-08-01

The takeover is complete at the source, package, emulator, deterministic visual
proof, and shared-SDK consumer-install boundary.

### Authoritative APK checkpoint

- source branch: `agent/aqua-sentinel-command-center-integration-20260730`
- validated source commit: `c1545cf3727adeb0815d11c571b72b3f235dc481`
- draft PR: #194, still open and unmerged
- regression run #169 / 30710420420: success
- general Android run #96 / 30710420409: success
- specialized v0.6.0 run #125 / 30710420380: success
- specialized job 91397613876: success
- repository tests: 37 passed, 0 failed
- visual proofs: Home, Neural Link, and Command Center passed at 430x932
- Home proof asserts ecosystem presentation data (`8 open leads`) and the
  `PRESENTATION DATA` truth marker
- clean emulator install/launch and Ask, Voice, Photo, and Video widget routes:
  passed
- artifact ID: 8821888791
- artifact SHA-256:
  `e382d19ef614b66a529b2d1c4249b9f33c5347cc8ac3ad06e842fb3d01f70b24`
- APK SHA-256:
  `b6cb5502fb4c7400c24ce5416eeeecc9fed83cd1b7b377682e48f5531605228d`
- package: `com.aquahomes.sentinel`
- version: `2026080101 / 0.6.0-neural-link-ai-gateway-test`
- min/target SDK: 26 / 35
- signing: temporary CI test certificate only; no production signing claim

The Home defect found during takeover is closed: dashboard cards now stack
vertically, both embedded app previews are visible, the internal Preview label
does not inherit oversized outer-footer type, and the deterministic proof
executes the same ecosystem presentation state enabled in the APK build.

### Authoritative SDK checkpoint

The installable shared package is
`@deyve55/aqua-integration-sdk@1.10.0` in the private
`deyve55/Aqua-sentient-os` repository, draft PR #8.

- validated SDK source: `08e39b182c7459521f477955125882b692f5ca7b`
- workflow run #18 / 30709137707: success
- Node 20: 106 passed, 0 failed
- Node 24: 106 passed, 0 failed
- clean tarball installs: passed
- clean authenticated restricted-registry install: passed
- server-only export:
  `@deyve55/aqua-integration-sdk/projection-sync`
- method: `aqua.adapter.sync`
- local SDK-to-v0.6-gateway contract: 6 passed, 0 failed
- idempotent replay and tenant projection/search: verified

Consumer apps have not automatically adopted the SDK. Each authorized backend
must be granted restricted package read access, pin version 1.10.0 exactly,
configure its own backend-held adapter ID/key and HTTPS gateway URL, and return
repository-local conformance evidence before adoption is recorded.

### Remaining truth boundary

No physical Samsung Fold 7 closed/open/DeX acceptance, durable production
projection store, live production gateway deployment, production adapter
credential, satellite-app adoption, authoritative confirmed-action adapter, or
production signing result is claimed.

Exact next action: install the exact artifact on Dave's Fold 7 for physical
acceptance, then onboard each approved satellite backend to SDK v1.10.0 with an
exact version pin and conformance proof.

