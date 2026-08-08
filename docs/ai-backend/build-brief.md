# Aqua Sentinel AI Backend — Build Brief

## Product objective

Aqua Sentinel is the conversational operating system for the Aqua ecosystem. A person asks Aqua for an object or outcome; Sentinel retrieves the exact authorized projection and materializes it in the current surface. A satellite application opens only when deeper editing is required.

Examples include a receipt, Ricardo's timecard, a warranty contract, or a job record. The authoritative source remains Aqua Receipts, Aqua Timesheet, Aqua CRM, or another registered satellite.

## Fixed experience

1. **Home** remains the approved default surface and fastest launcher.
2. **Aqua Sentinel Neural Link** is the living conversational and spatial surface.
3. **Command Center** owns File Cabinet, inbound captures, queues, sync, and diagnostics.

Objects may materialize in a half-screen viewer, expand inside Sentinel, or deep-link to their authoritative app. Motion communicates retrieval, focus, state, and direction; it must not block a one-tap action.

## Architecture contract

- Android and web clients call one HTTPS JSON-RPC 2.0 gateway.
- The gateway owns authentication, authorization, entitlements, tenant context, AI credentials, capability routing, action confirmation, and receipts.
- No OpenAI, storage-provider, database, or tenant-authority secrets ship in the APK or frontend.
- Each satellite publishes a capability manifest and permission-aware projection adapter.
- Read-only retrieval can materialize immediately. Writes, sends, calls, approvals, filings, shares, financial actions, and destructive actions require an explicit confirmation boundary.
- Every operation uses the shared states: Saved Locally, Queued, Syncing, Confirmed, Needs Attention, or Failed with Report.

## Current implementation boundary

The gateway, Aqua agent, capability registry, authenticated and idempotent satellite projection-sync contract, tenant-isolated in-memory projection seam, guarded intent seam, structured materialization response, and tests are implemented in this repository. Satellite action adapters and durable production persistence are not fabricated: until a projection adapter connects it reports `adapter_required`, and until a write adapter connects a confirmed action returns `Needs Attention` without changing an authoritative record.

## Production completion gates

- Deploy gateway behind TLS with a stable Aqua-owned hostname.
- Replace owner bootstrap authentication with the ecosystem identity provider and short-lived device sessions.
- Store conversation state, projections, intents, receipts, audit events, and idempotency keys durably.
- Enforce tenant isolation at the database layer as well as the gateway.
- Connect and contract-test each authoritative satellite adapter.
- Issue short-lived Realtime client credentials from the server for voice; never expose the standard OpenAI API key.
- Add rate limiting, abuse telemetry, audit retention, backups, restore drills, and incident reports.
- Complete Fold 7 physical interaction, speech, network-loss, and deep-link tests.
