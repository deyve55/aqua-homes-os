# Aqua Brain Real Backend Boundary / Server-Only Key Vault Plan — v62L

This document is a local/demo architecture note only. It does not connect a backend, call external services, add API keys, activate live AI, upload files, export records, store audio, or enable always-listening behavior.

## Current Status

- Frontend demo only.
- Backend locked.
- No live AI connected.
- No network calls or external AI/API calls.

## Server-Only Secret Boundary

The public frontend must never contain provider keys, platform credentials, bank tokens, accounting secrets, storage secrets, database credentials, email/SMS secrets, or customer export credentials. Future keys must live only in secure backend environment variables, a server-side secret manager, or deployment platform protected secrets.

## Future Backend Boundary

Future endpoint placeholders are defined in `window.AquaBackendBoundaryV62L.backendEndpointMap`. They are placeholders only and must not be called by the frontend until a real backend, auth, permissions, audit, undo, and owner approval gates exist.

## Role / Permission Plan

Roles and permissions are defined in `window.AquaBackendBoundaryV62L.rolePermissionPlan`. Key locks include:

- `field_worker` cannot export accounting.
- `customer_viewer` cannot see payroll/accounting internal data.
- `investor_viewer` cannot see payroll by default.
- `accounting_admin` is required for accountant export.
- `owner_admin` is required for backend enablement and live tool execution activation.

## Voice / Realtime Boundary

Realtime voice remains locked. Future live voice requires a user-approved microphone flow, secure backend session-token minting, backend-approved realtime connection, tool gateway permission checks, audit logging, undo checkpoints, and approval before any live action.

## Deployment Readiness Checklist

- Backend required.
- Auth required.
- Database required.
- File storage required.
- Audit/undo required.
- Owner approval required.
