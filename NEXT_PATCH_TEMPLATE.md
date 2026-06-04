# Next Tiny Patch Template

Use this template for future Aqua Homes OS patches. Keep every patch tiny, controlled, and visually safe.

## 1. Version target

- Target version: `v__`
- Patch name:
- Patch type: documentation / routing / tiny UI-safe module / bug fix

## 2. Current keeper

- Protected visual keeper: `AH_v54I-3.html`
- Keeper status before patch:

## 3. Allowed files

List the exact files that may be changed for this patch before implementation:

- `path/to/allowed-file`

## 4. Forbidden files

Default forbidden files:

- `AH_v54I-3.html` unless explicitly allowed
- `docs/app.js`
- `docs/styles.css`
- `structured-app/app.js`
- `structured-app/styles.css`

Additional forbidden files for this patch:

- `path/to/forbidden-file`

## 5. Exact tiny change requested

Describe the smallest possible change to make:

- 

## 6. Design lock statement

No visual changes unless the user explicitly approves them before implementation and visually approves screenshot/video proof before merge.

This patch must preserve the approved Aqua Homes visual design, including the Home layout, logo/header, AH badge, gold/glow divider, Main Brain hero, Brain graphic, and bottom nav.

## 7. Tests to run

Required checks:

- `test -f AH_v54I-3.html`
- `grep -n "AH_v54I-3.html" index.html docs/index.html`
- `git diff -- AH_v54I-3.html index.html docs/index.html docs/app.js docs/styles.css structured-app/app.js structured-app/styles.css structured-app/index.html`

Patch-specific checks:

- 

## 8. What user must visually approve

The user must visually approve:

- Any Home screen visual change.
- Any new navigation entry, panel, hero content, badge, banner, or layout adjustment.
- Screenshot/video proof before merge if any visible UI is touched.

If this patch has no visual change, state: `No visual approval required because no app UI files or visible UI were changed.`

## 9. Safe-to-merge checklist

- [ ] Allowed files were defined before implementation.
- [ ] Forbidden files were not edited.
- [ ] `AH_v54I-3.html` remains untouched unless explicitly allowed.
- [ ] Live routing remains untouched unless explicitly allowed.
- [ ] No structured docs app takeover.
- [ ] No Home layout change unless user visually approved it.
- [ ] Required checks passed or warnings are documented.
- [ ] Rollback plan is clear.

## 10. Rollback plan

If the patch causes any visual, routing, or keeper regression:

1. Revert the patch commit.
2. Confirm `AH_v54I-3.html` still exists.
3. Confirm live routing still references the protected keeper where expected.
4. Re-run the required checks.
5. Do not reattempt the patch until the allowed files and visual approval requirements are clarified.
