# Aqua Homes OS Phone-to-Codex Workflow

This workflow is documentation and safety only. It does not change app behavior, redesign Aqua Homes OS, activate backend or live AI services, add API keys, store audio, or create always-listening behavior.

## 1. Purpose

This workflow lets the user keep building Aqua Homes OS from the jobsite using the phone, while Surface Pro / Codex handles heavy coding, testing, GitHub, and PR work.

Phone = mobile feedback / screenshots / videos / approvals.

Surface Pro + Codex = coding / repo inspection / tests / PRs.

GitHub repo = source of truth.

Keeper files = project memory and design truth.

## 2. Required Keeper Files

Before any app work, Codex must preserve:

- `AQUA_HOMES_OS_CURRENT_KEEPER.md`
- `AQUA_CODEX_OPERATING_PROTOCOL.md`

Codex must read these before editing app files.

## 3. Mobile Jobsite Workflow

When user is away from office:

1. User records app issue or idea on phone.
2. User sends screenshot/video/voice description to ChatGPT.
3. ChatGPT turns it into a focused Codex task.
4. User sends/pastes task into Codex.
5. Codex works in repo, runs tests, and creates PR.
6. User reviews report from phone.
7. User merges only if:
   - failed: 0
   - safeToMerge: true
   - mergeRecommendation: MERGE_ALLOWED
8. User sends merge confirmation back to ChatGPT.

## 4. Office / Surface Workflow

When user is home/office:

1. Keep Surface Pro plugged in.
2. Keep internet connected.
3. Keep Codex, GitHub, and ChatGPT available.
4. Use Codex for repo/file/test work.
5. Use ChatGPT for product direction, truth checks, and task prompts.
6. Use phone for quick video/screenshot feedback if easier.

## 5. Do Not Lose Project Truth

Every task must preserve:

- no feature removal
- AskAI truth
- Main Brain truth
- protected Home visual keeper
- design language
- safety locks
- automation merge gate
- backend/live AI locked until secure backend exists

## 6. Current Focus

Current focus remains:

Perfect AskAI + Main Brain behavior before moving to another section.

AskAI:

- full-screen voice-first portal
- Aqua Homes logo/mark
- transcript secondary
- typed fallback secondary
- routes to full-screen modules
- no blank modal
- no unknown fallback on open

Main Brain:

- full master hub/account hub
- all features linked
- all modules linked
- all tools linked
- AskAI shortcut included

## 7. What Phone Can Do

Phone can be used for:

- recording app problems
- sending videos
- sending screenshots
- approving merge decisions
- asking for next task
- checking live app links
- confirming design/UX direction

## 8. What Surface/Codex Should Do

Surface/Codex should do:

- inspect repo files
- edit code
- run regression
- resolve conflicts
- create PRs
- confirm merge gates
- preserve keeper files
- avoid stale branches

## 9. Conflict Rule

If a PR has conflicts:

Do not keep repairing the stale branch repeatedly.

Instead:

1. Start fresh from latest current main.
2. Rebuild the change in a smaller focused patch.
3. Preserve keeper rules.
4. Run regression again.

## 10. Merge Gate

Merge only if:

failed: 0
safeToMerge: true
mergeRecommendation: MERGE_ALLOWED
