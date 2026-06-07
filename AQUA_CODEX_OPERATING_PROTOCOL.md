# Aqua Homes OS Codex Operating Protocol

## 1. Mandatory First Step

Before editing any app file, Codex must read:

AQUA_HOMES_OS_CURRENT_KEEPER.md

Codex must preserve:
- AskAI rules
- Main Brain rules
- protected Home visual keeper
- no feature removal rule
- safety locks
- design language
- automation merge gate

## 2. Current Protected Files

Protected visual keeper:

AH_v54I-3.html

Do not redesign Home.
Do not rewrite AH_v54I-3.html unless the user specifically approves a minimal event-binding repair.

## 3. Current Focus

Current work focus:

Perfect AskAI + Main Brain before moving to other sections.

AskAI:
- full-screen voice-first AI portal
- Aqua Homes logo/mark
- transcript secondary
- typed fallback secondary
- routes to full-screen modules

Main Brain:
- full master hub/account hub
- every feature and module linked
- AskAI shortcut included

## 4. No Feature Removal

Do not remove previous features.
Do not delete modules.
Do not remove automation.
Do not remove AI systems.
Do not remove backend readiness.
Do not remove keeper/recovery tools.

## 5. Safety Locks

Preserve:
- no backend calls
- no network calls
- no external AI/API calls
- no API keys in frontend
- no live record changes
- no live exports
- no live uploads
- no customer/accountant sends
- no accounting export
- no payroll/payment/bank action
- no audio storage
- no always-listening
- no real customer data

## 6. Required Merge Gate

Every task must return:

- version
- total
- passed
- failed
- safeToMerge
- mergeRecommendation

Merge only if:

failed: 0
safeToMerge: true
mergeRecommendation: MERGE_ALLOWED

## 7. Patch Size Rule

Prefer small, focused patches.

If a PR causes conflicts or huge diffs:
- stop
- create a clean branch from current main
- rebuild the change in smaller pieces
- do not keep repairing stale conflicted branches

## 8. Required Return

Every Codex task must clearly state:

1. Files changed
2. Whether AH_v54I-3.html was untouched
3. Whether any features were removed
4. Automation summary
5. Safety summary
6. Whether safe to merge
