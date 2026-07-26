# Aqua Sentinel OS — Master Project Handoff

```text
HANDOFF_VERSION: 1.0.1-SENTINEL-OS-AUTHORITY
UPDATED: 2026-07-26
OWNER_AND_FINAL_HUMAN_AUTHORITY: Dave (Deyve)
ACTIVE_OS_LAYER: Aqua Sentinel OS
PRIMARY_REPOSITORY: deyve55/Aqua-sentient-os
PRIMARY_BRANCH: agent/aqua-sentinel-sdk-handoff-20260726
LEGACY_REFERENCE_REPOSITORY: deyve55/aqua-homes-os
LEGACY_REFERENCE_STATUS: NOT THE ACTIVE OS LAYER
GOLDEN_GOOSE_REPOSITORY: deyve55/Golden-goose-engineering-manual-
GOLDEN_GOOSE_BRANCH: agent/aqua-sentinel-sdk-contract-20260726
```

## Authority correction

Dave has explicitly moved the OS layer from Aqua Homes OS to Aqua Sentinel OS.
All new OS-layer development, SDK integration, Sentinel-switch work, command-hub
work, and future Sentinel handoffs must target `deyve55/Aqua-sentient-os`.

The GitHub repository name currently uses `sentient`; the product and OS-layer
name is **Aqua Sentinel OS**. Do not infer that `deyve55/aqua-homes-os` remains
authoritative from older history. It is legacy/reference material only unless
Dave explicitly authorizes a migration of specific verified source.

## Mandatory startup

Say:

> Golden Goose: check the repository and continue from the master handoff.

The receiving chat must verify repository access with harmless reads, then read:

1. Golden Goose `00-START-HERE/GITHUB-ACCESS-AND-NEW-CHAT-PREFLIGHT.md`
2. Golden Goose `contracts/AQUA-SENTINEL-SWITCH-BACKEND-SDK-CONTRACT.md`
3. Sentinel `docs/handoffs/MASTER-PROJECT-HANDOFF.md`
4. The latest successful Sentinel iteration receipt and recorded source commit

Repository evidence is authoritative. Library and conversation history are
redundant copies and must not override a newer repository record.

## Product direction

Aqua Sentinel OS is the OS layer, main command hub, and continuous Aqua
conversation. It does not absorb satellite databases. The carousel mirrors
registered apps, Aqua queries each app through authorized backend capabilities,
and authenticated navigation opens exact satellite screens while preserving the
session and relevant context.

Every satellite remains independently complete. Its Sentinel switch supports:

- standalone
- connected read-only
- connected with approval
- connected operator

The Cloudflare gateway enforces identity, tenant, entitlements, capabilities,
revocation, audit, routing, freshness, and failures. Satellite backends remain
authoritative. Compact Cloudflare projections may accelerate answers, but live
data is retrieved from the source app when required.

## Three distinct integration paths

1. `launch`: carousel or voice opens an approved app destination.
2. `query/command`: Aqua invokes a typed backend capability through the gateway.
3. `navigate`: Aqua opens an exact in-app route through the SDK.

None of these permissions implies either of the others.

## Current truthful implementation state

- Product architecture and SDK contract: specified in Golden Goose v1.0.0.
- Active OS repository: `deyve55/Aqua-sentient-os`.
- Older Aqua Homes OS/Sentinel prototypes may contain useful history, but they
  are not authorized as the active OS source merely because they are newer or
  larger.
- Sentinel command-hub v0.5.1 was reported as built locally in a prior chat;
  its exact source commit and publication into the active Sentinel repository
  remain unverified here.
- Satellite production URLs and backend capabilities remain `gateway-pending`
  until individually verified.
- Gateway target: `https://api.aquahomesos.com/gateway`; deployment and live
  behavior must be verified before being labeled operational.
- Preserve the approved visual baseline; infrastructure work does not authorize
  redesign.

## Legacy-source migration rule

Do not copy the full `aqua-homes-os` tree into Sentinel blindly. Before adopting
any legacy component:

1. identify exact source path and commit;
2. compare it with the approved Sentinel baseline;
3. prove no visual or behavioral regression;
4. migrate only the required reviewed scope;
5. record tests, rollback, and source provenance;
6. commit the successful iteration to `deyve55/Aqua-sentient-os`.

## Exact next engineering action

Inventory the active Sentinel repository against the reported v0.5.1 local
foundation, recover only verified missing source, then create the shared SDK
interface package and conformance fixtures. Implement the Sentinel registry/grant
client and one read-only Timesheet adapter before enabling writes.

## Mandatory checkpoint rule

After every successful approved iteration:

- commit reviewed scope to `deyve55/Aqua-sentient-os`;
- update this handoff and an iteration receipt;
- record branch, SHA, tests, artifact, SHA-256, device status, rollback point,
  unresolved risks, provenance, and exact next action;
- update Golden Goose when a cross-app contract changes;
- never claim a push, build, test, APK, or deployment without direct evidence.
