# v60A Allowed Patch Plan — Parent Company / Multi-Company Command Center Foundation

This is a plan only. Do not implement v60A yet.

## Version target

`v60A`

## Module concept

Aqua Homes is the parent company controlling multiple companies and divisions:

- Aqua Homes Parent
- Aqua Homes Carpentry
- Aqua Homes Painting
- Aqua Homes HVAC + Maintenance
- Aqua Homes Plumbing
- Aqua Homes Electrical
- Aqua Homes Woodworking
- Future Company Slot

## Primary goal

Create the foundation for a Parent Company / Multi-Company Command Center without changing the approved Aqua Homes Home layout or replacing the approved visual source.

## Required v60A rules

- Must preserve `AH_v54I-3.html` visual design.
- Must be tiny and controlled.
- Must not change Home layout.
- Must add access through existing approved UI pattern only.
- Must not use structured docs app as visual source.
- Must not add large new Home panels.
- Must define allowed files before implementation.
- Must require user visual approval before merge.

## Proposed access pattern

Use only an existing approved UI pattern already present in the live Aqua Homes experience. Do not create a new Home panel, takeover screen, giant banner, debug badge, or structured-docs-style layout.

Before implementation, identify the exact approved UI pattern to reuse and get user confirmation.

## Allowed files for v60A

Allowed files must be explicitly defined before v60A implementation begins.

Suggested process:

1. Inspect current live routing and approved UI entry points.
2. Propose the smallest allowed file set.
3. Confirm forbidden files.
4. Get user approval for the allowed file list.
5. Implement only after approval.

## Forbidden direction

v60A must not:

- Redesign Home.
- Replace the visual keeper.
- Use the structured docs app as the visual source.
- Add large new Home panels.
- Add giant version/debug/keeper banners.
- Change `AH_v54I-3.html` unless explicitly approved.
- Change live routing unless explicitly approved.

## Visual approval requirement

If v60A touches any visible UI, the user must approve screenshot/video proof before merge.

If v60A can be implemented without visible UI changes, document that explicitly and still verify the Home screen remains unchanged.

## Pre-implementation checklist

- [ ] Confirm `AH_v54I-3.html` is still the protected visual keeper.
- [ ] Confirm live routing remains restored.
- [ ] Define exact allowed files.
- [ ] Define exact forbidden files.
- [ ] Confirm the existing approved UI access pattern to reuse.
- [ ] Confirm no Home layout changes are planned.
- [ ] Confirm no structured docs app takeover is possible.
- [ ] Get user approval before implementation.

## Safe-to-merge requirements for v60A

- [ ] Only approved allowed files changed.
- [ ] Forbidden files untouched.
- [ ] `AH_v54I-3.html` visual design preserved.
- [ ] Home layout unchanged.
- [ ] Existing approved UI pattern used for access.
- [ ] No structured docs app visual source used.
- [ ] No large new Home panels added.
- [ ] User visually approved any visible UI change before merge.
- [ ] Rollback plan documented.

## Rollback plan

If v60A creates any visual, routing, or keeper regression:

1. Revert the v60A commit.
2. Confirm `AH_v54I-3.html` remains present and untouched unless explicitly approved.
3. Confirm live routing remains restored.
4. Remove any unapproved command center access point.
5. Re-run the visual freeze checks.
