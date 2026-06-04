# Codex Patch Rules

Future Codex patches must be tiny and controlled.

## Required Patch Declaration

Every future patch must state:

1. Version target
2. Exact files allowed to change
3. Exact files forbidden
4. Whether visual changes are allowed
5. What tests to run
6. What the user must visually approve
7. Rollback plan

## Default Visual File Rule

Visual files are forbidden unless the task explicitly says they are allowed.

## Controlled Patch Expectations

- Keep patches small and scoped to the stated version target.
- Do not touch forbidden files.
- Do not make visual changes unless explicitly authorized by the user.
- Do not redesign the approved Aqua Homes experience.
- Do not replace the live app with the structured `/docs` app.
- If a patch could affect visuals, capture the required screenshot/video review path before merge.
- Include a rollback plan before changing any app behavior.
