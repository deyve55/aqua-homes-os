# Aqua Homes OS Legacy Reference — Repository Operating Instructions

These instructions apply to the entire repository.

```text
OWNER_AND_FINAL_HUMAN_AUTHORITY: Dave (Deyve)
REPOSITORY: deyve55/aqua-homes-os
OFFICIAL_PRODUCT_NAME: Aqua Homes OS Legacy Reference
REPOSITORY_CLASSIFICATION: REFERENCE_ONLY
CONTINUITY_CONTRACT_VERSION: 1.0.0
```

## Required startup order

Before proposing, changing, building, publishing, or claiming anything:

1. Read `README.md`.
2. Read `docs/handoffs/MASTER-PROJECT-HANDOFF.md`.
3. Parse `CURRENT-STATE.json`.
4. Read the Golden Goose Manual and operational manifest at the exact repository, branch/tag, and version pinned by `CURRENT-STATE.json`.
5. Inspect the real repository, active branch, current commit, open pull request, workflows, artifacts, and relevant tests.
6. Keep this product separate from every other Aqua repository unless Dave explicitly authorizes a cross-app task.
7. Report any mismatch before changing code. Never silently resolve a continuity-integrity failure.

## Mandatory living-continuity rule

The following two files are the only current project-continuity records:

- `docs/handoffs/MASTER-PROJECT-HANDOFF.md`
- `CURRENT-STATE.json`

Update both in the same delivery checkpoint whenever any of these changes materially:

- approved scope, architecture, product role, cross-app contract, or locked UI;
- source branch, source commit, pull request, app version, build number, or package identity;
- tests, workflow run, artifact, checksum, release, deployment, or rollback target;
- physical-device result, field result, known defect, blocker, or exact next action;
- Golden Goose version/commit or Aqua SDK contract/package adopted by this repository.

A code or build checkpoint is incomplete until both continuity files describe it truthfully.

## No competing current handoffs

- Do not create another file that claims to be current, master, latest, final, active, or read-first.
- Preserve older handoffs as historical evidence.
- When an older handoff conflicts with the two current files, the current files control project continuity within their recorded scope, while repository/test evidence controls claims about implementation.
- Move or relabel historical handoffs only in a separately reviewed cleanup; do not delete evidence during normal development.

## Commit and truth semantics

- `source_snapshot.commit_sha` in `CURRENT-STATE.json` is the exact product/source commit being described.
- A later continuity-only commit does not make the recorded product commit false.
- Record the continuity commit or merge receipt separately after it exists.
- Never put a guessed future commit SHA into a file.
- Use `UNKNOWN — NOT VERIFIED` when evidence is unavailable.
- Keep `IMPLEMENTED`, `CI_VERIFIED`, `ARTIFACT_PRODUCED`, `PHYSICALLY_VERIFIED`, `ACCEPTED_RELEASABLE`, `LIVE_DEPLOYED`, and `CANONICAL` as separate states.
- A successful build is not physical-device proof. An installed test is not production approval.

## Required delivery receipt

Every meaningful engineering delivery must report:

- repository and product;
- source branch and full source commit SHA;
- changed files;
- app version and build/version code;
- tests and exact results;
- workflow name and run ID;
- artifact name, ID, expiration, and checksum when available;
- signing classification;
- physical Fold/DeX/device result;
- known defects and blockers;
- rollback source;
- exact next authorized action;
- whether both continuity files were updated.

## Safety boundaries

- Never commit secrets, credentials, API keys, private recordings, payroll/customer data, or unredacted diagnostics.
- Do not force-push, rebase shared branches, delete branches, close PRs, merge, deploy, publish, or promote a release unless Dave authorized that exact action.
- Do not modify `recovery/phase-1-freeze-20260726`; it is an immutable preservation anchor.
- Do not place application code or APKs in Golden Goose.
- Do not claim another Aqua product owns this product's authoritative domain data.
- Preserve standalone operation and fail safely when Sentinel or another app is unavailable, except where a Dave-approved role rule explicitly routes an operation to another authoritative app.

## Phase Four status

This instruction was introduced on a Phase Four continuity branch. Until its pull request is merged into the applicable engineering line, it is a verified continuity candidate, not proof that the repository already enforces the rule through CI.
