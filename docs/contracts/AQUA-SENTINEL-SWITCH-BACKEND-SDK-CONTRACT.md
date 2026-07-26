# Aqua Sentinel Switch, Backend, and Integration SDK Contract

```text
CONTRACT_ID: AQUA-SENTINEL-INTEGRATION-1.0.0
STATUS: DAVE-APPROVED PRODUCT DIRECTION; IMPLEMENTATION CONTRACT
OWNER_AND_FINAL_HUMAN_AUTHORITY: Dave (Deyve)
EFFECTIVE_DATE: 2026-07-26
GATEWAY: https://api.aquahomesos.com/gateway
CLIENT_PROTOCOL: Versioned JSON-RPC 2.0 over HTTPS
```

## Purpose

This contract defines how Aqua Sentinel OS, Aqua, and every Aqua satellite
application interact. It is mandatory startup material for any chat that
creates, rebuilds, or integrates an Aqua application.

The intended experience is one continuous Aqua session across Sentinel and all
authorized satellite apps. Sentinel stays light. Each satellite stays complete
and independently sellable. Each satellite remains authoritative for its own
domain data.

## Non-negotiable architecture

1. Aqua Sentinel OS is the command hub, conversation owner, app registry,
   permission controller, and cross-app context coordinator.
2. A satellite app owns its domain UI, domain logic, backend, and authoritative
   records.
3. Cloudflare is the secure control and transport layer. It is not an
   uncontrolled duplicate of every satellite database.
4. Sentinel and satellites communicate only through the shared Aqua gateway
   and versioned Aqua Integration SDK contracts.
5. Sentinel must never connect directly to a satellite database.
6. Screen scraping, unrestricted Accessibility control, and simulated taps are
   not the primary integration mechanism.
7. A carousel launch, a backend query, and in-app navigation are separate
   capabilities and must be implemented and authorized separately.
8. No client contains provider keys, database credentials, signing secrets, or
   authoritative tenant-enforcement logic.

## User experience

When Dave opens Sentinel, the carousel mirrors all registered Aqua apps.

- Tapping an app card launches that app.
- Asking Aqua a question invokes the app's registered backend capability
  without requiring the app UI to open.
- Asking Aqua to open a precise screen invokes an authenticated deep link or
  SDK navigation command.
- The same Aqua session, verified identity, tenant, active job, correlation ID,
  and allowed context follow across apps.
- Changing apps changes the active domain without restarting Aqua's
  conversation.

Example:

1. “Aqua, what is happening across the company today?”
2. Sentinel queries authorized summaries and live capabilities from Timesheet,
   Payroll, Draw, Cam, Schedule, and Knowledge Vault.
3. Aqua returns a sourced, freshness-labeled answer.
4. “Open Payroll and show John's Lancaster hours.”
5. Aqua launches Payroll directly to the authorized employee/job view.
6. “Now open Aqua Draw for Lancaster.”
7. Aqua transfers only the relevant job context and opens the matching Draw
   record.

## Sentinel Switch

Every satellite must expose an owner-controlled Sentinel connection mode.
The switch is a server-enforced authorization state, not merely a visual toggle.

### Required modes

| Mode | Aqua access | Satellite behavior |
| --- | --- | --- |
| `standalone` | None | Complete independent app; no Sentinel query, analysis, navigation, command, or background context publication |
| `connected_read_only` | Query, analyze, open approved screens | No writes |
| `connected_with_approval` | Read plus prepare drafts/actions | Important actions require explicit human confirmation |
| `connected_operator` | Explicitly authorized reads and writes | Actions remain permission-scoped, audited, and reversible where practical |

The app must remain fully functional in every mode. Disabling Sentinel access
must revoke gateway authorization immediately without deleting data or
damaging standalone operation.

### Capability-level permissions

The connection mode is the outer boundary. Every capability also declares:

- `read`
- `analyze`
- `navigate`
- `draft`
- `execute`
- `background_sync`
- `confirmation_policy`
- roles and tenant scope
- sensitivity classification

The gateway must deny any undeclared capability. Client-provided tenant IDs,
roles, connection modes, and permissions are untrusted claims until verified
server-side.

## Satellite backend contract

Each satellite backend must provide a versioned adapter behind the Aqua gateway.
The backend remains the source of truth and must continue operating if Sentinel
or the gateway is unavailable.

Each request must include or receive from verified gateway context:

- contract and schema version
- immutable app ID
- capability ID
- verified tenant and user
- role and entitlement scope
- correlation ID
- idempotency ID for mutations
- session/context reference
- request time and deadline

Each response must include:

- source app
- source record identifiers when applicable
- result or typed error
- freshness: `live`, `cached`, `stale`, or `offline`
- source event/update time
- authorization decision
- correlation ID
- safe audit metadata

Mutations must be idempotent. Cross-app records must identify their
authoritative source. Receiving systems may create governed projections or
postings but must not silently become co-owners of the original record.

## Aqua Integration SDK

Every Aqua app must embed or import a pinned, tested SDK version. Executable SDK
code must come from one maintained package/service; copy-and-forget forks are
prohibited.

### Required SDK modules

1. **Registration**
   - stable app ID, display name, contract version, health route
   - supported platforms and minimum compatible SDK
2. **Connection**
   - Sentinel mode, granted scopes, revocation, entitlement state
3. **Capabilities**
   - typed query, analysis, draft, and execution commands
4. **Navigation**
   - verified Android App Links/universal links and internal route handlers
5. **Context handoff**
   - signed, short-lived references for tenant, job, customer, employee, or
     other authorized context; no sensitive data in plain URL parameters
6. **Events and projections**
   - versioned events, queue receipts, replay protection, idempotency
7. **Audit and diagnostics**
   - correlation, decision, source, freshness, failure category, sanitized
     export
8. **Offline behavior**
   - encrypted local queue, truthful states, retry and conflict handling

### Capability naming

Use stable domain-qualified identifiers:

```text
timesheet.hours.query
timesheet.punch.review
payroll.employee.open
payroll.period.review
draw.project.open
draw.photos.show
cam.job.progress
vault.code.lookup
```

Capabilities are allowlisted and versioned. Unknown, deprecated, insecure, or
schema-incompatible capabilities fail closed.

## Navigation contract

Each satellite must support:

- an HTTPS verified app-link origin controlled by Aqua;
- a stable route catalog;
- authentication before protected content is displayed;
- signed or server-resolved short-lived context references;
- graceful fallback to the installed app, approved web surface, or a truthful
  unavailable state;
- a return-to-Sentinel route that preserves the conversation correlation ID.

Opening a screen never grants backend permission by itself. Backend permission
never grants navigation or write permission by itself.

## Cloudflare responsibilities

| Service | Responsibility |
| --- | --- |
| Workers gateway | Authentication, tenant derivation, authorization, entitlement checks, routing, validation, response assembly, rate limits, audit |
| D1 | App registry, capability registry, grants, connection mode, sync receipts, compact searchable projections |
| KV/Cache | Short-lived configuration, health, and permission-scoped summaries |
| R2 | Photos, video, recordings, PDFs, diagnostics, exports, build artifacts, and backups where approved |
| Queues | Reliable background events, retries, and projection updates |
| Satellite backend | Authoritative domain records and business rules |

Cloudflare may store compact permission-scoped projections for speed. Exact,
sensitive, or rapidly changing questions must query the authoritative satellite
live. R2 is not the relational system of record.

Every Aqua answer must expose source and freshness, for example:

```text
Source: Aqua Timesheet · Live · 6:47 PM
```

If live retrieval fails, Aqua must say so and must not present stale data as
current.

## Carousel registry entry

Each Sentinel carousel card must resolve from a signed registry entry containing:

- immutable app ID and name
- installed/web availability
- standalone or connected state
- authentication and entitlement state
- backend health
- last successful synchronization
- allowed capabilities
- approved deep-link destinations
- pending alerts
- offline state
- minimum SDK and contract version

Registered, installed, launch-ready, backend-connected, and healthy are distinct
states. The UI must not collapse them into one green status.

## Security and audit floor

- TLS for all transport.
- Short-lived tokens and server-side authorization.
- Tenant context derived from verified identity.
- No direct database credentials in clients.
- Explicit confirmation for important or irreversible actions.
- Immutable audit record for every Aqua query, navigation handoff, and command.
- Rate limits, replay protection, idempotency, schema validation, and timeout.
- Sanitized diagnostics; no secrets or private records in exported reports.
- Immediate revocation when Sentinel mode is disabled.
- Independent cross-tenant isolation tests.

## Required adoption work for every app

Before an app is labeled Sentinel-connected, its engineering chat must:

1. Read this contract and the current Golden Goose startup records.
2. Identify its authoritative backend and data ownership boundary.
3. Add the Sentinel switch and server-enforced modes.
4. Publish a typed capability manifest.
5. Implement the SDK adapter, verified navigation routes, context handoff, and
   return-to-Sentinel behavior.
6. Add gateway authentication, authorization, tenant isolation, idempotency,
   audit, freshness, and failure handling.
7. Prove standalone operation with Sentinel disabled.
8. Prove connected read-only behavior before enabling writes.
9. Test denied, revoked, offline, stale, cross-tenant, replay, and incompatible
   SDK scenarios.
10. Update the app's `docs/handoffs/MASTER-PROJECT-HANDOFF.md` and successful
    iteration receipt with exact branch, SHA, tests, artifact checksum,
    unresolved risks, rollback point, and next action.

## Implementation sequence

1. Freeze this v1 contract and registry schema.
2. Implement the gateway registry, grants, health, and audit foundation.
3. Publish the shared SDK interfaces and conformance tests.
4. Make Sentinel the reference client.
5. Make Timesheet/Payroll the first reference satellite integration.
6. Add read-only queries and exact navigation.
7. Add drafts and confirmed writes only after read-only conformance passes.
8. Adopt Draw, Cam, Knowledge Vault, Schedule, Estimate, and future apps.
9. Physically verify continuous handoff on Samsung Fold 7 and DeX.

## Mandatory new-chat instruction

Every Aqua Sentinel or satellite-app engineering chat must begin with:

> Golden Goose: check the repository and continue from the master handoff.

The chat must then read this contract from Golden Goose and the target app's
implementation handoff before touching code. Repository evidence is primary.
Library and conversation memory are redundant aids only.

