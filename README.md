# Aqua Homes OS Legacy Reference

```text
OWNER_AND_FINAL_HUMAN_AUTHORITY: Dave (Deyve)
REPOSITORY: deyve55/aqua-homes-os
STATUS: REFERENCE ONLY
PHASE_4_CONTINUITY_BRANCH: recovery/phase-4-continuity-contract-20260726
```

Preserves recoverable legacy OS, UI, prototype, and approved migration-source evidence.

## Start every engineering session here

1. Read [AGENTS.md](AGENTS.md).
2. Read [Master Project Handoff](docs/handoffs/MASTER-PROJECT-HANDOFF.md).
3. Parse [CURRENT-STATE.json](CURRENT-STATE.json).
4. Read the exact Golden Goose Manual and operational manifest pinned by the state file.
5. Verify the live source branch, source commit, PR, workflow, artifact, and device evidence before changing code.

The handoff and state file are living records. Every meaningful source, build, artifact, deployment, physical-test, defect, or next-action change must update both in the same delivery checkpoint. Do not create another competing current handoff.

## Product authority boundary

Do not continue OS-layer development here. Aqua Sentinel OS lives in deyve55/Aqua-sentient-os.

Phase Four adds continuity documentation only. It does not merge, deploy, promote, rewrite application code, or prove physical-device success.

---

## Preserved engineering notes from the verified source branch

**Status:** This repository is not the active OS layer.

Dave has moved the OS layer to **Aqua Sentinel OS**, whose active repository is
`deyve55/Aqua-sentient-os`.

This repository preserves historical Aqua Homes OS and Sentinel prototype
material. Do not continue new OS-layer development here. Do not copy its entire
tree into Sentinel. Any useful component must be migrated surgically with exact
source commit, compatibility proof, tests, provenance, and rollback.

See the [transition handoff](docs/handoffs/MASTER-PROJECT-HANDOFF.md) and the
[Sentinel integration contract](docs/contracts/AQUA-SENTINEL-SWITCH-BACKEND-SDK-CONTRACT.md).
