# Aqua Brain Backend Schema / Data Index Contract — v62M

This file documents the local/demo backend schema and data index contract added for Aqua Brain. It is architecture planning only.

## Status

- Local/demo schema only.
- Backend database not connected.
- No live data.
- No backend calls, network calls, external AI/API calls, API keys, uploads, exports, approvals, payments, payroll, bank sync, accounting export, audio storage, or always-listening behavior.
- Real/live data must use a secure backend and must not be stored in frontend/local demo storage.

## Browser Contract

The app exposes the contract as:

```js
window.AquaBackendSchemaV62M
```

The contract includes:

- `entityContracts`
- `relationships`
- `indexMaps`
- `hendersonDemoIndex`
- `permissionSensitivityMap`
- `safety`

Every major entity contract is marked:

- `liveStatus: locked/demo`
- `backendRequired: true`
- `frontendStorageAllowed: false`

## Entity Coverage

The v62M contract covers companies, projects/jobs/properties, folders, reports, receipts, vendors, spend categories/cost codes, SOWs, estimates, change orders, payables, employee time, payroll boundaries, budgets, budget risk alerts, cameras, photos/evidence binder, missing documents, approvals, export packets, file uploads, permissions, audit logs, undo checkpoints, notifications/alerts, and AI conversation/session context.

## Index Coverage

The v62M contract defines future backend indexes for project names, aliases, vendors, receipts, reports, spend categories, SOWs, estimates, payables, employee time, budgets, camera allocation, missing documents, approvals, export packets, file uploads, audits, and undo checkpoints.

## Henderson Demo Index

Henderson House is included only as a safe demo placeholder with aliases and placeholder links for reports, receipts, plumbing spend, missing documents, camera allocation, and an accountant export packet. No real customer data is included.

## Next Backend Step

Before live use, create a real database schema, connect authentication, connect file/receipt/report indexes, and keep all provider/database/storage/accounting/payroll/bank keys server-side only.
