# Aqua Sentinel OS — Master Project Handoff

```text
HANDOFF_VERSION: 1.0.0-INFRASTRUCTURE-CONTRACT
UPDATED: 2026-07-26
OWNER_AND_FINAL_HUMAN_AUTHORITY: Dave (Deyve)
PRIMARY_SOURCE_REPOSITORY: deyve55/aqua-homes-os
PRIMARY_SOURCE_BRANCH: agent/aqua-sentinel-sdk-handoff-20260726
ANDROID_WRAPPER_MIRROR: deyve55/Aqua-sentient-os
WRAPPER_BRANCH: agent/aqua-sentinel-sdk-handoff-20260726
GOLDEN_GOOSE_REPOSITORY: deyve55/Golden-goose-engineering-manual-
GOLDEN_GOOSE_BRANCH: agent/aqua-sentinel-sdk-contract-20260726
```

## Mandatory startup

Say:

> Golden Goose: check the repository and continue from the master handoff.

The receiving chat must verify repository access with harmless reads, then read:

1. Golden Goose `00-START-HERE/GITHUB-ACCESS-AND-NEW-CHAT-PREFLIGHT.md`
2. Golden Goose `contracts/AQUA-SENTINEL-SWITCH-BACKEND-SDK-CONTRACT.md`
3. This file at `docs/handoffs/MASTER-PROJECT-HANDOFF.md`
4. The latest successful iteration receipt and recorded source commit

Repository evidence is authoritative. Library and conversation history are
redundant copies and must not override a newer repository record.

## Product direction

Aqua Sentinel OS is the main command hub and continuous Aqua conversation. It
does not absorb satellite databases. The carousel mirrors registered apps,
Aqua queries each app through its authorized backend capabilities, and
authenticated navigation opens exact satellite screens while preserving the
session and relevant context.

Every satellite is independently complete. Its Sentinel switch supports:

- standalone
- connected read-only
- connected with approval
- connected operator

The shared Cloudflare gateway enforces identity, tenant, entitlements,
capabilities, revocation, audit, routing, freshness, and failure behavior.
Satellite backends remain authoritative. Compact Cloudflare projections may
accelerate answers, but live data is retrieved from the source app when required.

## Three distinct integration paths

1. `launch`: carousel or voice opens an approved app destination.
2. `query/command`: Aqua invokes a typed backend capability through the gateway.
3. `navigate`: Aqua opens an exact in-app route through the SDK.

None of these permissions implies either of the others.

## Current truthful implementation state

- Product architecture and SDK contract: specified in Golden Goose v1.0.0.
- Sentinel command-hub registry foundation: previously built locally as v0.5.1
  according to the prior chat receipt; repository publication of that source
  and its exact commit remains unverified in this handoff.
- Seven intended registry identities: Sentinel, Cam, Knowledge Vault, Draw,
  Timesheet, Estimate, Schedule.
- Satellite production URLs and backend capabilities: must remain
  `gateway-pending` until individually verified.
- Cloudflare gateway: architectural target is
  `https://api.aquahomesos.com/gateway`; deployment and live behavior must be
  verified before being labeled operational.
- Approved interface: preserve the frozen visual baseline; infrastructure work
  does not authorize a redesign.

## Repository split warning

Sentinel material currently exists across:

- `deyve55/aqua-homes-os` — current application/source authority used for
  Sentinel development history.
- `deyve55/Aqua-sentient-os` — Android test-wrapper history.

Do not silently combine, delete, or declare either repository obsolete.
Consolidation requires an inventory, commit comparison, migration plan,
rollback point, and Dave's approval. Until then, this handoff is mirrored in
both repositories so new chats can recover the same infrastructure direction.

## Exact next engineering action

Create the shared SDK interface package and conformance fixtures, then implement
the Sentinel-side registry/grant client and one read-only reference adapter for
Timesheet. Do not enable writes until standalone, revocation, tenant isolation,
freshness, offline, and audit tests pass.

## Mandatory checkpoint rule

After every successful approved iteration:

- commit only reviewed scope to the correct app repository;
- update this handoff;
- add an iteration receipt containing branch, SHA, tests, build artifact,
  SHA-256, device status, rollback point, unresolved risks, and exact next action;
- keep Golden Goose pointers current when a cross-app contract changes;
- never claim a push, build, test, APK, or deployment without direct evidence.

