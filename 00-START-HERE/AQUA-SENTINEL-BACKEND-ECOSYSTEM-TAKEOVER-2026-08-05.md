# Aqua Sentinel OS — Backend and Priority-App Ecosystem Takeover

**Owner and final authority:** Dave (Deyve)  
**Prepared:** August 5, 2026  
**Primary repository:** `deyve55/aqua-homes-os`  
**Active Sentinel integration branch:** `agent/aqua-sentinel-command-center-integration-20260730`  
**Draft Sentinel PR:** `#194`  
**State:** Backend takeover ready; do not restart, redesign, or claim production-live status

> **Voice/model continuation:** Read
> `00-START-HERE/AQUA-AI-REFERENCE-CANDIDATE-2026-08-05.md` before changing any
> Aqua voice, personality, transcription, model routing, or cross-app handoff.
> Satellite-local Aqua is strict `gpt-realtime-2.1-mini` by default and uses
> full `gpt-realtime-2.1` only for genuinely hard or consequential work. Aqua
> Sentinel voice remains full. A Sentinel-origin conversation retains full
> capability inside a satellite so the user never experiences a model/persona
> downgrade. Exact transcription is `gpt-4o-transcribe`. The reference
> candidate is not canonical until Dave explicitly selects it.

## 0. New-chat directive

You are taking over the shared backend and SDK rollout for Aqua Sentinel OS.
You are the only engineering chat Dave wants changing the central backend,
Traffic Cop, cross-application SDK routing, service credentials, deployment
configuration, and live conformance path. This single-owner rule exists to stop
multiple chats from creating competing backend implementations.

You may make the backend and integration changes required across the priority
application repositories, but you must preserve each application's approved:

- visible design;
- navigation and user flow;
- product purpose and authority boundary;
- Android identity and update continuity;
- standalone operation;
- current active application branch and unmerged work.

Do not redesign an application, replace its user interface, change its product
theory, or merge a large application/UI PR merely to obtain backend code.

Start by reading this file completely, then read the current project-specific
handoff and `CURRENT-STATE.json` in every repository before editing it. Re-fetch
every pull request and branch head because the repositories may advance after
this handoff.

## 1. Dave's exact implementation direction

Sentinel is the connected center and normal owner-facing experience. Dave talks
to Aqua in Sentinel; Sentinel preserves company, tenant, user, client, job,
conversation, correlation, and evidence context while capabilities change.

Specialist applications remain authoritative engines and complete standalone
products. They do not become decorative shells and they do not surrender their
domain records to Sentinel.

The initial priority rollout is:

1. **Aqua CRM** — canonical client/job/contact identity plus communications and
   the morning executive briefing projection.
2. **Aqua Sentinel OS / Traffic Cop** — the central backend, routing, identity,
   durable state, voice/chat, audit, acknowledgements, and truthful status.
3. **Aqua Pulse** — operational/provisional financial projection and File
   Cabinet delivery.
4. **AquaCam** — governed field evidence, capture context, and authorized
   projections without changing its current field workflow.
5. **Aqua Posts** — last, because Dave is still actively building it.

Do not expand this first pass into every Aqua application. Keep Posts last.

## 2. Morning executive briefing product outcome

The first owner-level outcome is a truthful morning briefing inside Sentinel.
Aqua should tell Dave:

- who is waiting for an answer;
- important email, SMS, WhatsApp Business, website-chat, missed-call, voicemail,
  and answering-service activity;
- which company and department need attention;
- urgent client/job issues and promised callbacks;
- approvals and reviews waiting for Dave;
- today's schedule and conflicts when that source is connected;
- the three recommended first actions for the day.

Aqua CRM owns the canonical communication, client, contact, conversation, and
job records. Sentinel receives permission-aware, source-linked projections. It
must not copy the entire CRM database or imply a disconnected channel had zero
activity. The answering service is release-critical and must preserve the
original recording, transcript, human-agent notes, caller request, urgency,
promised callback, client/job match, and governed source reference.

Outbound replies, scheduling, quotes, financial actions, or commitments remain
draft/approval actions until Dave's confirmation policy authorizes them.

## 3. Non-negotiable architecture

### Authority

| Component | Authoritative responsibility |
| --- | --- |
| Aqua Sentinel OS | Conversation, orchestration, entitlement-aware navigation, cross-app workflow state, unified presentation, alerts, and acknowledgements |
| Aqua CRM | Canonical client, contact, job, site, address, alias, merge, communication, and permanent shared identity |
| Aqua Pulse | Operational/provisional financial projection and reconciliation work queue |
| Aqua Books / Accounting | Accepted bank, ledger, reconciliation, bookkeeping, period-close, and accounting truth |
| Sentinel File Cabinet | Governed evidence identity, reference, delivery state, retention status, and chain of custody |
| AquaCam | Original field capture, media evidence, capture context, and its approved time/evidence workflow |
| Each specialist app | Its own domain records and governed projection beneath the shared client/job identity |

### Rules

- No app reads another application's database directly.
- No duplicate permanent client/job identities.
- No uncontrolled copies of evidence between apps; use governed File Cabinet
  references.
- Every delivery uses correlation and idempotency identifiers.
- An identical retry returns a typed duplicate acknowledgement and does not
  create a second record.
- Unknown commands, wrong targets, wrong tenants, expired requests, unsupported
  versions, missing authority, and acknowledgement mismatches fail closed.
- Standalone apps continue working when Sentinel is offline.
- No provider, service, adapter, OpenAI, Cloudflare, signing, or package token
  may be committed, bundled into an APK/PWA, logged, screenshotted, documented,
  or printed in ordinary chat.
- Every result is reported as confirmed, queued, needs attention, failed with
  report, or otherwise truthfully incomplete.

## 4. Two integration layers — do not confuse them

### Layer A — server projection SDK

```text
Package: @deyve55/aqua-integration-sdk
Exact version: 1.10.0
Registry: GitHub Packages (restricted)
Export: @deyve55/aqua-integration-sdk/projection-sync
Factory in the released source: createServerProjectionSyncClient
Method: aqua.adapter.sync
Transport: HTTPS JSON-RPC 2.0
Purpose: server-only, read-only satellite projections into Sentinel
```

The package source and consumer proof are in private draft
`deyve55/Aqua-sentient-os#8`, head
`c63173eb55c61e894f831c2d5658a125fcc7879d`. The SDK proof reports 106/106 on
Node 20 and Node 24 plus a clean authenticated registry install and 6/6 local
gateway crossings.

Each consuming repository still needs explicit GitHub Packages read access,
the exact version pin, server-held `AQUA_GATEWAY_URL`, `AQUA_ADAPTER_ID`, and
`AQUA_ADAPTER_KEY`, plus its own clean-install/import/conformance evidence.

### Layer B — Sentinel command and File Cabinet contract

```text
Contract: aqua-sentinel-sdk-v1
Version: 1.1.0
Transport: external Traffic Cop for private cross-service delivery
Known implemented command: file_cabinet.deliver
Required replay proof: accepted_and_saved, then duplicate_ignored
```

This is not the same version number or package as the projection SDK.

### Critical schema reconciliation gate

Do not copy the `1.1.0` command receiver into more apps until one canonical
machine schema and fixture set is published and pinned.

The August 5 Golden Goose owner directive describes minimum field names such as
`contract`, `version`, `eventId`, and `fileCabinetItemId`. The current working
Traffic Cop/Pulse implementation validates `contractId`, `contractVersion`,
`commandId`, `acknowledgementToken`, and a nested `item.itemId`. That difference
must be reconciled deliberately in the Aqua Brain/shared contract repository.
The working Pulse/Traffic Cop pair must not be silently broken, and a second
incompatible `1.1.0` must not be created.

After reconciliation, publish:

- the canonical JSON schema;
- sanitized valid/invalid fixtures;
- acknowledgement schema;
- compatibility policy;
- checksums/version pin;
- two-delivery conformance runner.

Then adopt the same released schema in CRM, Pulse, AquaCam, Posts, and future
apps. Copy-and-forget forks are prohibited.

## 5. Golden Goose state

Golden Goose PR `#38` was merged into `main` at:

```text
4b6cd899956e876c983275d9b706edf75a5e08ee
```

Controlling update file:

```text
tasks/2026-08-05--OWNER-DIRECTIVE--AQUA-SENTINEL--SENTINEL-FIRST-ECOSYSTEM-SDK-1.1.md
```

It establishes Sentinel-first interaction, shared identity, File Cabinet
delivery, Traffic Cop routing, standalone-app preservation, and the required
per-app adoption surface. The file's internal packet status still says
`SUBMITTED`; the new chat must reconcile/promote the controlling startup and
machine contracts instead of assuming the merge alone published executable
schemas.

The three attached July Golden Goose documents are governance/history, not
application source, an APK, a deployment, or the newest operational handoff.
Use them as architecture rules without allowing stale July status to overwrite
the verified August checkpoints in this file.

## 6. Sentinel and Traffic Cop — exact current state

### Repositories and pull requests

```text
Repository: deyve55/aqua-homes-os
Integration branch: agent/aqua-sentinel-command-center-integration-20260730
Draft PR: #194
Current handoff-time head: 6a9283fea25ca99b5fb0615558352443c74c819d
```

PR `#194` contains 286 files and an older v0.6 Android/UI payload. Keep it draft.
Do not merge it wholesale into `main`; doing so could overwrite or confuse the
newer v0.8.5 visual/voice direction whose exact source was never uploaded.

Traffic Cop PR `#195` is merged into the integration branch:

```text
Merge commit: 6a9283fea25ca99b5fb0615558352443c74c819d
Tests reported: 49/49 passed
Wrangler production dry-run: passed
```

Implemented Traffic Cop behavior includes:

- Cloudflare Worker entry;
- Durable Object state for projections, sync receipts, confirmation intents,
  and capability state;
- owner authentication and rate limiting;
- allowlisted `file_cabinet.deliver` relay to AquaPulse;
- strict bearer, contract/version, source/target, ID, expiry, content-type, and
  acknowledgement validation;
- byte-identical retry forwarding;
- first-save/duplicate-retry tests.

### Live/deployment truth

Traffic Cop code is deployment-ready but is not proven production-live.

The newer Sentinel server-side sender is prepared to use Traffic Cop, but that
saved checkpoint was intentionally not deployed after the direct private
Sites-to-Sites test failed. Aqua's existing live voice/chat remains protected
and should receive a post-deployment smoke test.

Direct Sentinel Sites worker to AquaPulse Sites worker delivery returned HTTP
`522` twice. AquaPulse's receiver worked in direct protected tests. The blocker
is the hosted worker-to-worker boundary; use the external Cloudflare Traffic
Cop, not the direct private Sites subrequest.

### Existing non-secret credential evidence

The matching server-only `SENTINEL_CLIENT_TOKEN` was installed in Sentinel and
AquaPulse Sites environments. Do not reveal or copy the token.

```text
SHA-256 fingerprint prefix: 8ca49f05
Original installation time: 2026-08-05T08:56:41.358329Z
```

The later Sentinel environment revision reflects unrelated protected
site-access changes; it does not authorize exposing or regenerating the
service token. Traffic Cop still needs its own protected secret installation
and Cloudflare deployment configuration.

### Remaining Sentinel deployment gates

1. Re-fetch PR `#194` and verify no newer head supersedes this handoff.
2. Reconcile/publish the canonical SDK `1.1.0` schema and fixtures.
3. Authenticate the intended Cloudflare deployment account/Worker target.
4. Install required Worker secrets server-side, including the matching service
   token and AquaPulse protected-site credential. Do not print them.
5. Deploy Traffic Cop.
6. Set Sentinel's server-only Traffic Cop endpoint to the deployed Worker URL.
7. Deploy only the saved Sentinel sender/backend checkpoint; do not replace the
   v0.8.5 UI with the v0.6 tree.
8. Send one valid packet twice and require:
   - first: `accepted_and_saved`;
   - second: `duplicate_ignored`;
   - identical event/command, correlation, idempotency, and acknowledgement
     identity as required by the reconciled schema.
9. Run Aqua live voice, chat, tool routing, and truthful-failure smoke tests.
10. Record deployment version, UTC time, non-secret fingerprints, correlation
    ID, acknowledgement IDs, and rollback procedure in the handoff/state files.

## 7. Aqua CRM — exact current state

```text
Repository: deyve55/Aqua-crm
Default branch: main
Active branch: agent/communications-morning-briefing-handoff-20260805
Draft PR: #2
Current handoff-time head: 8733ccc1c3ee76da9306a365c387a2955797245c
Android production package: com.aquasoftware.crm
Android test package: com.aquasoftware.crm.test
Current visible product: Android WebView field-test shell for the Aqua CRM Site
```

PR `#2` now contains:

- the complete communications/morning-briefing build handoff;
- exact projection SDK `1.10.0` pin;
- server-only CRM projection client;
- source-linked morning-briefing projection mapping;
- `sentinel-capability-manifest.json`;
- restricted-package conformance workflow;
- `CURRENT-STATE.json`;
- `docs/handoffs/MASTER-PROJECT-HANDOFF.md`.

The existing Android source, design, navigation, package identity, and Site URL
were not changed.

Local proof:

```text
CRM projection tests: 3/3 passed
JSON state/manifest parse: passed
Secret scan: passed
```

GitHub run `31005601640`, job `92304613463`, failed before tests at the package
install step with:

```text
403 Forbidden
permission_denied: read_package
```

The workflow already had `packages: read`; the package itself must grant
`deyve55/Aqua-crm` access, or the repository must receive an approved
least-privilege `read:packages` Actions credential. Do not commit that token.

After package access is corrected, rerun the existing workflow. Do not claim
CRM SDK adoption until clean install/import and repository conformance pass.

Email, SMS, WhatsApp Business, website chat, and answering service are not live.
Provider selection/accounts and their server-only credentials remain future
gates. Build the answering-service connector first after the shared SDK path is
green. Keep the rest of the CRM outside this milestone.

## 8. Aqua Pulse — exact current state

```text
Repository: deyve55/Aqua-pulse
Active branch: agent/aqua-pulse-pwa-foundation-20260804
Draft PR: #1
Current handoff-time head: 2cebbc254dc699efc5beebc7c8a634144dbcd88a
Android package: com.aquasoftware.aquapulse
Version: 0.1.5 / version code 6
Receiver: POST /api/sentinel/v1/commands
Command: file_cabinet.deliver
```

The Pulse PR reports:

- durable D1-backed accounts, jobs, events, File Cabinet items, and Sentinel
  audit records;
- `accepted_and_saved` for first valid delivery;
- `duplicate_ignored` for identical idempotent retry;
- 8/8 local backend/source checks;
- successful Android build/artifact workflow;
- no committed secrets.

Keep PR `#1` draft until its application/physical gates are separately approved.
For the central backend work, reconcile its receiver with the canonical schema,
deploy Traffic Cop, and run the real external two-delivery proof. Do not change
Pulse's visible flow or financial authority. Pulse records remain provisional;
Aqua Books/Accounting remains ledger authority, CRM owns client/job identity,
and Sentinel owns orchestration.

## 9. AquaCam — exact current state and protected boundary

### Application

```text
Repository: deyve55/aqua-homes-cam
Current application PR: #12
Version: 0.23.11 / Android versionCode 23011
Current reported head: 4454612ec92141eecc692a2156e9fcf8ee5099bb
```

PR `#12` is active AquaCam application work for mandatory narrated punch
evidence and owner workday analysis. Its reported Android workflow and backup
artifact passed. It remains draft and needs real device/field gates.

Do not modify or redesign this application PR from the Sentinel backend chat.
Preserve its camera, GPS/geofence, narrated Punch In/Out evidence, local
transcription, immutable receipt, offline, job-documentation, and standalone
workflows.

### Dedicated backend

```text
Repository: deyve55/aqua-homes-cam-backend
Backend PR: #1
Continuity PR: #2
```

Backend PR `#1` reports a dedicated Cloudflare Worker with private R2,
authenticated upload tickets, short-lived Realtime token issuance, workday
comparison, and route tests. Its current head in the PR description is
`553eedd6f399bdef73423594c7ff6fd80db28d3c`. It is not deployed.

Read backend PR `#2` and its current handoff/state before editing. Add Sentinel
SDK adoption only in the dedicated backend seam after the canonical package and
schema gates are resolved. Do not put provider or adapter secrets in AquaCam's
APK. Keep AquaCam standalone punching operational while Sentinel is offline.

## 10. Aqua Posts — unresolved repository and last priority

The exact Aqua Posts repository was not positively identified through the
connected GitHub installation search during this handoff. Searches for
`Aqua Posts` and `Aqua Post` returned no repository.

Do not create a replacement repository, guess a similarly named repository, or
install an SDK into unrelated marketing code. Keep Posts last. Resolve its exact
repository, branch, package identity, current handoff, and current owner-approved
work with Dave or a verified repository record before making changes.

## 11. Required per-app adoption surface

Every priority app repository must eventually carry:

1. A startup pointer to the promoted Golden Goose Sentinel-first rule.
2. Exact SDK package/schema/checksum pins.
3. A typed capability manifest covering authority, reads, commands, events,
   confirmations, receipts, offline behavior, and prohibited capabilities.
4. The matching backend adapter/receiver for each declared capability.
5. Conformance tests for authentication, authorization, wrong target, wrong
   tenant, wrong version, expiry, payload limits, replay, identical duplicate,
   conflicting idempotency reuse, offline recovery, and truthful failures.
6. `CURRENT-STATE.json` with implemented/verified/live distinctions.
7. `docs/handoffs/MASTER-PROJECT-HANDOFF.md` with exact repository, branch,
   commit, PR, tests, deployment, blockers, rollback, and next action.
8. A Golden Goose adoption receipt after real repository, deployment, and
   physical evidence exists.

Backend preparation is not live deployment. Repository presence is not runtime
proof. A mock acknowledgement is not a production acknowledgement.

## 12. Single-backend-owner coordination rule

Only this Sentinel backend takeover chat should:

- change Traffic Cop;
- publish or revise shared SDK schemas/fixtures;
- install or rotate cross-app service credentials;
- configure Cloudflare or protected Site backend environments;
- implement cross-app target routing;
- run ecosystem conformance tests;
- declare connected/live backend status.

Individual application chats may continue owner-approved application work, but
they must consume the released contract and may not fork the backend or declare
the ecosystem live independently. If another chat has overlapping backend work,
stop and reconcile repository/branch ownership before committing.

## 13. Safety and preservation rules

- Never change a visible app design or navigation merely to wire a backend.
- Never merge PR `#194` wholesale into `main`.
- Never overwrite the newer Sentinel v0.8.5 direction with the older v0.6 UI.
- Never merge active AquaCam or Pulse application PRs solely for backend work.
- Never expose secret values. Report only names, installed yes/no, non-secret
  fingerprints, UTC times, and conformance results.
- Never fabricate an executable SDK schema when the canonical artifact is
  unavailable.
- Never silently rename Aqua Books/Accounting or another product authority.
- Never claim a channel is live before its real provider ingestion, signature,
  storage, retry, duplicate, recovery, and source-link test passes.
- Never allow AI to send messages, make commitments, move money, post payroll,
  alter ledger/accounting truth, or approve sensitive actions without the
  required recorded human approval.

## 14. Exact first work sequence for the new chat

1. Return the takeover receipt in Section 15 before editing.
2. Re-fetch Golden Goose `main`, Sentinel PRs `#194/#195`, SDK PR `#8`, CRM PR
   `#2`, Pulse PR `#1`, AquaCam PR `#12`, and AquaCam backend PRs `#1/#2`.
3. Verify each current head and update this handoff if anything advanced.
4. Reconcile and publish the canonical command SDK `1.1.0` machine schema and
   fixtures without breaking the working Pulse/Traffic Cop contract.
5. Resolve restricted GitHub Packages access for CRM and rerun its conformance
   workflow. Record the real result.
6. Deploy the existing Traffic Cop code with protected secrets.
7. Deploy the saved Sentinel sender endpoint without changing the visible UI.
8. Run the real Sentinel-to-Pulse two-delivery proof and Live Aqua voice/chat
   smoke test.
9. Add the released SDK/backend seam to AquaCam's dedicated backend repository;
   leave the application PR untouched.
10. Resolve the exact Posts repository and integrate it last.
11. Update every touched repository's state/handoff in the same commit series so
    no later chat starts from stale information.

## 15. Required takeover receipt

Before changing code, respond with:

```text
AQUA SENTINEL BACKEND ECOSYSTEM — TAKEOVER RECEIPT

OWNER: Dave (Deyve)
CENTRAL BACKEND OWNER: this Sentinel OS chat only
PRIMARY REPOSITORY: deyve55/aqua-homes-os
SENTINEL BRANCH: agent/aqua-sentinel-command-center-integration-20260730
SENTINEL PR: #194 (draft; do not merge wholesale)
TRAFFIC COP PR: #195 merged into integration branch at 6a9283fea25ca99b5fb0615558352443c74c819d
PROJECTION SDK: @deyve55/aqua-integration-sdk@1.10.0
COMMAND CONTRACT: aqua-sentinel-sdk-v1 1.1.0; canonical schema reconciliation required
PRIORITY ORDER: CRM, Sentinel/Traffic Cop, Pulse, AquaCam, Posts last
CRM: PR #2 prepared; package-read CI gate failed with 403
PULSE: PR #1 receiver/durable backend prepared; live external proof pending
AQUACAM: application PR #12 protected; backend PR #1 not deployed
POSTS: exact repository unresolved; do not guess
DIRECT SITES PATH: blocked by HTTP 522
SECRETS: server-only; never print or commit
DESIGN/FLOW/THEORY CHANGES: not authorized
EXACT FIRST ACTION: re-fetch all heads, reconcile the canonical 1.1.0 schema, then clear CRM package access and deploy/test Traffic Cop
```

## 16. Short copy-and-paste startup prompt

```text
Continue the Aqua Sentinel OS backend ecosystem from the repository handoff at 00-START-HERE/AQUA-SENTINEL-BACKEND-ECOSYSTEM-TAKEOVER-2026-08-05.md on deyve55/aqua-homes-os branch agent/aqua-sentinel-command-center-integration-20260730, draft PR #194. Read that file, the current repository handoffs/state files, and the Golden Goose Sentinel-first owner directive before changing anything. You are the only chat authorized to change the shared backend, Traffic Cop, SDK routing, cross-app secrets, deployments, and ecosystem conformance. Preserve every app's approved design, navigation, workflow, product purpose, Android identity, standalone operation, and active application work. Do not merge PR #194 wholesale or replace the newer Sentinel v0.8.5 direction with the older v0.6 UI. Re-fetch all recorded heads, return the required takeover receipt, reconcile the canonical aqua-sentinel-sdk-v1 1.1.0 machine schema, clear CRM's restricted-package access gate, deploy/test Traffic Cop with protected secrets, prove accepted_and_saved then duplicate_ignored against AquaPulse, preserve AquaCam PR #12 while integrating only its dedicated backend, and leave Aqua Posts last until its exact repository is verified. Update CURRENT-STATE.json and MASTER-PROJECT-HANDOFF.md in every touched repository so the work cannot be lost. Never expose or commit a secret and never claim live status without real end-to-end evidence.
```

## 17. Binding field-test recovery — 2026-08-05 15:21 EDT

The current owner priority is Aqua Sentinel as the field-test control surface,
not marketplace release of every satellite. Sentinel must let the owner talk
to Aqua and open/navigate AquaDraw, AquaPulse, AquaCam, and Aqua Timesheet. An
installed satellite package opens natively; a missing package must open its
truthful Sentinel test workspace so the interaction remains testable.

Version `0.8.1-field-test-navigation-recovery` restores the direct side A,
Pulse card/icon/bottom NEW control, Aqua card dock, two reserved app cards, and
the four priority Android routes. It also bounds Android animation/filter load.
Local proof is 55/55 tests plus Worker dry-run success.

This source is not Aqua-ready and must not be handed off as a new APK until the
protected Traffic Cop is deployed and its real `AQUA_GATEWAY_URL` is injected.
Cloudflare OAuth is currently blocked by a repeated dashboard human-verification
loop. Preserve the repair on draft PR #194, connect Cloudflare through an
authenticated integration, then run the exact v0.8.1 Android build and live
Realtime voice/navigation proof. Never repeat the v0.8.0 mistake of calling a
gateway-less APK a working Aqua build.
