# Aqua Homes OS Surface Build Station Checklist

## Purpose

The Surface Pro can be used as the office build station for Aqua Homes OS.

Phone = mobile feedback, screenshots, videos, approvals.

Surface Pro = Codex, GitHub, repo inspection, testing, PR review, and heavy app work.

GitHub repo = source of truth.

Keeper files = permanent project memory.

## Files To Preserve

Before future work, Codex must preserve:

- AQUA_HOMES_OS_CURRENT_KEEPER.md
- AQUA_CODEX_OPERATING_PROTOCOL.md
- AQUA_PHONE_TO_CODEX_WORKFLOW.md
- AH_v54I-3.html

## Surface Setup

When using the Surface:

- keep Surface plugged in
- keep internet connected
- keep Codex available
- keep GitHub available
- keep ChatGPT available for planning and truth checks
- avoid random manual edits outside Codex unless intentional
- do not leave unresolved PR conflicts sitting unnoticed
- use fresh branches from current main when conflicts happen

## Phone Setup

When using the phone:

- record short videos of app behavior
- send screenshots of failures
- approve merge only after MERGE_ALLOWED
- do not randomly test every command
- follow guided acceptance flows when available
- use phone for fast communication and live-app review

## Best Daily Workflow

1. User captures issue or idea on phone.
2. ChatGPT converts it to a focused Codex task.
3. Codex performs code, test, and PR work.
4. User sends automation report to ChatGPT.
5. ChatGPT says merge or repair.
6. User merges only if safe.
7. Keeper files preserve the vision.

## Sleep / Power Warning

Surface can be used as a build station, but it can stop work if:

- Windows sleeps
- internet disconnects
- app closes
- update restarts machine
- battery dies
- browser/app session expires

For best reliability, use Codex Cloud or GitHub-connected Codex tasks when possible.

## Merge Gate

Merge only if:

```text
failed: 0
safeToMerge: true
mergeRecommendation: MERGE_ALLOWED
```

## Required Tests

Run only:

```sh
test -f AQUA_HOMES_OS_CURRENT_KEEPER.md
test -f AQUA_CODEX_OPERATING_PROTOCOL.md
test -f AQUA_PHONE_TO_CODEX_WORKFLOW.md
test -f AQUA_SURFACE_BUILD_STATION_CHECKLIST.md
test -f AH_v54I-3.html
git diff --check
git status --short
```

Do not run or edit regression files for this docs-only patch.
