# Deployment Notes

## Active trial prototype

- The active trial prototype lives in `structured-app/`.
- `structured-app/index.html` is the app entry point for previewing the structured app.
- The large `AquaHomesOS_v51_SOLID_GOLD_BAR_GRADIENT_EDGES_APP-2.html` file is only a locked visual reference and must remain read-only.
- Do not copy the large v51 HTML file into the structured app or deployment folders.
- Do not add large images or base64 assets for this lightweight preview path.

## GitHub Pages direction

GitHub Pages can later be configured to serve either:

- the `structured-app/` folder directly, if the repository/pages setup supports that source path; or
- a future `docs/` folder that contains only the lightweight structured-app deployment bundle.

Until that deployment path is chosen, preview the app from `structured-app/index.html`.

## Locked production capabilities

The following capabilities remain locked and must not be enabled in this trial preview documentation path:

- backend services
- authentication
- payments
- payroll
- GPS
- accounting sync
- customer-sensitive storage
- ledger posting
