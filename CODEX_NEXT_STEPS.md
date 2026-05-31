# Codex Next Steps

## Repository Check

- Confirmed the uploaded AquaHomesOS v51 HTML file exists at `AquaHomesOS_v51_SOLID_GOLD_BAR_GRADIENT_EDGES_APP-2.html`.
- `AQUA_HOMES_DESIGN_TRUTH.md` was requested for confirmation but is not currently present in the repository root or within the first three directory levels inspected.

## Safe Build Plan

1. Treat `AquaHomesOS_v51_SOLID_GOLD_BAR_GRADIENT_EDGES_APP-2.html` as a read-only reference artifact.
2. Do not rename, move, reformat, split, or edit the v51 HTML file.
3. Build any structured app in new adjacent files or folders, such as `src/`, `app/`, or `components/`, so the large HTML remains untouched.
4. Use `AQUA_HOMES_DESIGN_TRUTH.md`, once present, as the source of design rules before extracting UI structure or behavior.
5. Make small, reviewable commits that add new structured files without generating large diffs against the preserved HTML artifact.
6. Verify before each commit that `git diff -- AquaHomesOS_v51_SOLID_GOLD_BAR_GRADIENT_EDGES_APP-2.html` is empty.
