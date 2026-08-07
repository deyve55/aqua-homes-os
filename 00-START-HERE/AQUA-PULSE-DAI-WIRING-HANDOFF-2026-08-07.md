# AquaPulse DAI Wiring Handoff

**Prepared:** August 7, 2026
**From:** Aqua Sentinel OS backend / draft PR `deyve55/aqua-homes-os#194`
**To:** AquaPulse application/backend and Aqua AI (DAI) wiring chat
**Owner and final authority:** Dave (Deyve)
**Sequence position:** 1 of the ordered application rollout
**Next app:** Do not start AquaDraw from this handoff. Finish and return the AquaPulse receipt first.

## 1. Receiving-chat instruction

Continue the existing AquaPulse product. Do not restart it, redesign it, change its current Aqua personality, replace its approved UI, or disturb its standalone Android/mobile-voice behavior.

Before editing AquaPulse, completely read its repository `AGENTS.md`, `CURRENT-STATE.json`, and `docs/handoffs/MASTER-PROJECT-HANDOFF.md`. Treat the repository's current active branch and latest verified handoff as authoritative within their recorded scope.

This handoff supplies the Sentinel-side package that AquaPulse must adopt and prove. It does not claim the AquaPulse receiver is deployed, that a live Sentinel crossing passed, or that the whole AquaPulse integration is complete.

## 2. Pinned repository state

### Aqua Sentinel OS

- Repository: `deyve55/aqua-homes-os`
- Branch: `agent/aqua-sentinel-command-center-integration-20260730`
- Draft PR: `#194`
- Package base head before this implementation: `4e62379282fdd48ae9d265dd57fe3e3cb2ac5e81`
- Adapter manifest: `docs/integration/aqua-pulse-adapter-package.json`
- Adapter implementation: `backend/aqua-pulse-adapter.mjs`

### AquaPulse

- Repository: `deyve55/Aqua-pulse`
- Active branch: `agent/aqua-pulse-pwa-foundation-20260804`
- Draft PR: `#1`
- Observed head before this handoff: `407a547e00dfc51a902337cb9fc707a3bcc289ec`
- Android package: `com.aquasoftware.aquapulse`
- Existing receiver source: `worker/sentinel-financial-command.mjs`
- Existing receiver checkpoint: `5745b5dbe99784dfc5894b8af32d07dce9293270`
- Receiver state recorded by AquaPulse: source validated, not deployed

Re-fetch both draft PRs before making changes. Do not overwrite newer AquaPulse work with an older Sites or Android tree.

## 3. Sentinel package now prepared

Sentinel registers AquaPulse as capability `pulse` and publishes only the operation that currently has a real receiver:

```text
capture.provisional_financial_event
```

The implemented chain is:

```text
Authenticated owner command
→ durable Sentinel File Cabinet capture
→ durable executive work order
→ server-authenticated AquaPulse financial receiver
→ exact saved-event acknowledgement verification
→ correlated Sentinel audit receipt
→ verified employee evidence in Neural Link
```

Sentinel may report `Confirmed` only when all of these are present:

1. AquaPulse returns `accepted_and_saved` or `duplicate_ignored`.
2. The response exactly matches the event ID, correlation ID, idempotency key, and acknowledgement token sent by Sentinel.
3. The acknowledgement includes a stable `acknowledgementId` and `acknowledgedAt`.
4. Sentinel records the verified employee report and audit reference.
5. Sentinel creates the Neural Link delivery containing AquaPulse's acknowledgement as evidence.

If network delivery, response validation, audit, or Neural delivery fails, Sentinel does not call the action complete. It keeps the work queued or returns an evidence-delivery failure state.

An identical retry must reuse the same work order, Neural delivery, audit receipt, acknowledgement ID, and acknowledgement time. It must not create a second financial event.

## 4. Exact financial command contract

```text
contract: aqua-sentinel-sdk-v1
version: 1.1.0
command: capture.provisional_financial_event
source appId: aqua-sentinel-os
source package: com.aquahomes.sentinel
target appId: aqua-pulse
target package: com.aquasoftware.aquapulse
endpoint: POST /api/sentinel/v1/financial-events
```

Server-held configuration only:

```text
AQUA_PULSE_FINANCIAL_ENDPOINT
SENTINEL_CLIENT_TOKEN
AQUA_PULSE_SITE_TOKEN
AQUA_SENTINEL_TENANT_IDS_JSON
```

Do not place any token, adapter key, Cloudflare credential, OpenAI key, or customer record in the APK, frontend source, repository, test output, handoff, or logs.

## 5. Authority boundary

- Sentinel owns authenticated orchestration, the local File Cabinet capture, work-order state, Sentinel audit references, and Neural delivery.
- AquaPulse owns the operational/provisional financial event it accepts and must verify its authoritative stored row.
- Aqua Books/Accounting remains authoritative for reconciled ledger actuals and financial statements.
- Aqua CRM will own customer/job identity when it is integrated later; it is intentionally absent from the current critical path.
- This capture does not move money, change banking instructions, reconcile an event, or post to the ledger.

The example `$500 for Carly at Home Depot` remains a `$500.00` money-out event for vendor `Home Depot`, with provisional project label `Carly` and authority state `sentinel-received-provisional`.

## 6. AquaPulse application/backend work required

1. Re-fetch the current AquaPulse PR and preserve every newer verified mobile voice, Android, UI, and personality file.
2. Validate `docs/integration/aqua-pulse-adapter-package.json` from the published Sentinel branch.
3. Confirm migration `.openai/drizzle/0005_sentinel_financial_event.sql` and `worker/sentinel-financial-command.mjs` match the pinned `1.1.0` command.
4. Deploy the Sites/D1 financial receiver only through AquaPulse's protected release workflow.
5. Install or verify all server-held secrets and tenant allowlists without printing their values.
6. Run one real Sentinel event and then the byte-equivalent retry.
7. Require first response `accepted_and_saved` and retry `duplicate_ignored` with the same acknowledgement identity and time.
8. Query the authoritative AquaPulse record and its correlated AquaPulse audit record. A response alone is not enough if the stored row or audit row is missing.
9. Call Sentinel Neural inbox and verify the returned evidence ID equals AquaPulse's acknowledgement ID and its source record equals AquaPulse's event ID.
10. Prove wrong token, wrong tenant, wrong route, expired event, response mismatch, and conflicting idempotency reuse all fail closed.
11. Prove a transient failure stays queued and an exact retry repairs the chain without a duplicate event or duplicate Neural delivery.
12. Update AquaPulse's single `CURRENT-STATE.json` and `docs/handoffs/MASTER-PROJECT-HANDOFF.md` with exact evidence.

## 7. DAI intent binding

| Dave's intent | Current binding | Confirmation | Evidence | Truth state |
| --- | --- | --- | --- | --- |
| “$500 for Carly at Home Depot” | `capture.provisional_financial_event` | The authenticated explicit command authorizes provisional capture only | AquaPulse acknowledgement + stored event + audit reference + Neural delivery | `Confirmed` only after the full chain |
| Find or retrieve an existing provisional event | Standard employee work contract; app-specific operation not published yet | Read-only | Authoritative AquaPulse record evidence | `Needs Attention` until AquaPulse publishes and proves it |
| Show cash position or forecast | Not published yet | Read-only | Source accounts/events, as-of time, calculation provenance | `Needs Attention` until implemented and proved |
| Move money or change banking instructions | Prohibited/not published | Dave approval plus application-specific protected confirmation | Authoritative bank/provider post-action evidence | Never infer completion |
| Post or reconcile an accounting actual | AquaPulse is not ledger authority | Protected; route to Aqua Books/Accounting when available | Authoritative ledger evidence | Never claim an AquaPulse provisional event is an actual |

For future employee work, AquaPulse's server-side adapter must use:

```text
aqua.employee.work.list
aqua.employee.work.report
aqua.company.signals.ingest
```

with `x-aqua-adapter-id: pulse`, a server-held adapter key, verified tenant allowlisting, correlation IDs, idempotency keys, and evidence on every `verified` report. Do not publish read or analysis operation names until the AquaPulse backend actually implements and tests them.

## 8. Acceptance gate

Do not report AquaPulse wired until all applicable items pass:

- capability manifest validation;
- owner-session authentication on Sentinel;
- server-to-server authentication on AquaPulse;
- tenant allowlist and cross-tenant denial;
- authoritative execution and post-write row verification;
- correlated AquaPulse and Sentinel audit evidence;
- evidence delivery through Neural Link;
- exact idempotent replay without duplicate effects;
- truthful offline/degraded behavior;
- registered office-entry destination proof;
- standalone AquaPulse regression;
- AquaPulse CI and protected deployment;
- relevant physical-device acceptance.

Until then, the correct state is:

```text
SENTINEL PACKAGE: IMPLEMENTED AND LOCALLY VERIFIED
AQUAPULSE RECEIVER: SOURCE VALIDATED; DEPLOYMENT PENDING
LIVE CROSSING: NOT RUN
PHYSICAL DEVICE: NOT RUN
INTEGRATION COMPLETE: NO
```

## 9. Receipt required from the AquaPulse wiring chat

Return one evidence-backed receipt in this exact structure:

```text
AQUAPULSE DAI WIRING RECEIPT

MODEL/CHAT:
AQUAPULSE_REPOSITORY:
AQUAPULSE_BRANCH:
AQUAPULSE_PR:
AQUAPULSE_HEAD:
SENTINEL_PACKAGE_HEAD:
MANIFEST_VERSION: aqua-app-wiring-package/1.0.0
CONTRACT: aqua-sentinel-sdk-v1@1.1.0
CAPABILITY_ID: pulse
OPERATION: capture.provisional_financial_event
AUTHENTICATION_TEST:
TENANT_ISOLATION_TEST:
FIRST_DELIVERY_STATUS:
RETRY_STATUS:
EVENT_ID:
CORRELATION_ID:
IDEMPOTENCY_KEY:
ACKNOWLEDGEMENT_ID:
ACKNOWLEDGED_AT:
ACKNOWLEDGEMENT_IDENTITY_STABLE:
AQUAPULSE_RECORD_VERIFIED:
AQUAPULSE_AUDIT_VERIFIED:
SENTINEL_AUDIT_ID:
NEURAL_DELIVERY_ID:
NEURAL_EVIDENCE_VERIFIED:
FAIL_CLOSED_TESTS:
STANDALONE_REGRESSION:
DEPLOYMENT_ID_AND_STATUS:
PHYSICAL_DEVICE_RESULT:
UI_CHANGED: NO
PERSONALITY_CHANGED: NO
SECRETS_EXPOSED: NO
UNVERIFIED_OR_BLOCKED:
INTEGRATION_COMPLETE: YES | NO
READY_STATUS:
```

If any required evidence is missing, set `INTEGRATION_COMPLETE: NO`, identify the exact missing gate, and keep all user-facing state truthful.

## 10. Stop boundary

Return the completed receipt to Dave. Do not start AquaDraw from the AquaPulse chat. The Sentinel sequence advances only after Dave brings the AquaPulse receipt back and authorizes the next app.
