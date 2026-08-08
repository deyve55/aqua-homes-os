# Aqua Satellite Projection Sync

## Purpose

This is the first production-facing seam between Aqua Sentinel and the satellite applications. A satellite publishes a permission-aware, read-only projection that Sentinel may search and materialize. The satellite remains authoritative; the projection does not transfer record ownership and cannot perform a write.

## Gateway method

`aqua.adapter.sync` uses the single HTTPS JSON-RPC 2.0 gateway.

Required headers:

- `X-Aqua-Adapter-Id`: the registered capability ID, such as `crm`, `timesheet`, or `receipts`.
- `X-Aqua-Adapter-Key`: a server-side credential configured only in `AQUA_ADAPTER_CREDENTIALS_JSON`.

The credential is scoped to one capability and an explicit tenant allowlist. It must never ship in Sentinel, a PWA, or an end-user APK.

Example request shape:

```json
{
  "jsonrpc": "2.0",
  "id": "sync-request-1",
  "method": "aqua.adapter.sync",
  "params": {
    "capabilityId": "crm",
    "tenantId": "aqua-homes",
    "syncId": "crm-2026-08-01-000042",
    "checkpoint": "crm:42",
    "records": [
      {
        "kind": "contract",
        "sourceRecordId": "contract-42",
        "title": "Phillip kitchen contract",
        "subtitle": "68 Lancaster Street",
        "sourceState": "Confirmed",
        "searchText": "warranty cabinets August 2024",
        "previewUri": "https://files.example.test/contracts/contract-42",
        "fields": [{ "label": "Client", "value": "Phillip" }],
        "updatedAt": "2026-08-01T12:00:00.000Z"
      }
    ],
    "deletedSourceRecordIds": []
  }
}
```

## Guarantees

- Capability ID, adapter identity, credential, and tenant allowlist must all match.
- `syncId` is the idempotency boundary. Replaying the same payload returns the original receipt with `duplicate: true`.
- Reusing a `syncId` with different records or checkpoint is rejected.
- Upserts are keyed by tenant, capability, and source record ID.
- Deletions are explicit through `deletedSourceRecordIds`; a missing record is never silently treated as deleted.
- Preview URLs must use HTTPS.
- The registry reports `projection_connected` only after a verified sync receipt.
- The projection enables search and materialization only. Writes still require a prepared intent, explicit human confirmation, and a separate authoritative action adapter.

## Current durability boundary

The contract, validation, tenant isolation, idempotency, deletion behavior, registry status, and automated tests are implemented. The current store is an in-memory seam for integration work and loses projections on restart. It must be replaced with the governed production persistence layer before a deployment can claim durable confirmation.
