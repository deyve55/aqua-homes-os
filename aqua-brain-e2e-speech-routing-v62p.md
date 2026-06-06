# Aqua Brain End-to-End Speech Routing Matrix — v62P

v62P adds a local/demo-only regression matrix for Aqua Brain natural speech routing. It proves raw and imperfect construction/app commands can move through fuzzy normalization, entity correction, intent/mode/tool selection, workflow/session continuation, dry-run/permission gates, visual focus, readback draft generation, and safe fallback behavior.

## Scope

- Namespace: `window.AquaBrainE2ERoutingV62P`
- Preferred implementation file: `aqua-v61-extensions.js`
- Regression integration: `aqua-v61-regression-test.js`
- Generated reports: `aqua-regression-report.json`, `aqua-regression-report.md`

## Safety Boundaries

The v62P matrix is demo-only and asserts:

- no backend calls
- no network calls
- no external AI/API calls
- no frontend API keys
- no live record changes
- no export/upload/send/share actions
- no payment/payroll/bank/accounting export actions
- no audio storage
- no always-listening behavior
- no real customer data

## Typed Commands

The following typed commands route to the matrix/report layer:

- `run aqua brain e2e test`
- `run ai routing test`
- `run voice routing test`
- `show ai routing matrix`
- `show e2e routing report`
- `show failed ai routes`
- `explain last ai route`

`show automation report` remains prioritized by the automation route before fuzzy/fallback routing.
