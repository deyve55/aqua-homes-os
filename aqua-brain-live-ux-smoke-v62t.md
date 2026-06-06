# Aqua Brain Live UX Smoke Check — v62T

Local/demo phone and Samsung DeX browser smoke check for the Aqua Brain assistant primary surface.

## Purpose

The v62T smoke checker lets a tester press the AI / Ask AI entry and run one compact local check instead of manually typing twenty commands. It verifies the assistant surface, command input targeting, assistant turn behavior, manual fallback, voice safety, automation report handling, regression QA availability, zero-report merge blocking, and safety locks.

## Commands

Typed commands routed locally by `aqua-v61-extensions.js`:

- `run live ux smoke check`
- `run phone smoke check`
- `run dex smoke check`
- `test ai button`
- `test assistant surface`
- `test voice fallback`
- `test manual fallback`
- `test automation report`
- `test regression qa`
- `show live ux smoke report`
- `show phone smoke report`
- `show dex smoke report`

## Safety

This is local/demo-only. It does not activate backend AI, external APIs, uploads, exports, payment/payroll/bank/accounting integrations, live record changes, audio storage, or always-listening behavior.
