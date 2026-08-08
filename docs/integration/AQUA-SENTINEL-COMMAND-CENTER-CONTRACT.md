# Aqua Sentinel OS ↔ Command Center Contract

## Sentinel target

The widget's large **A** opens this explicit component:

```text
com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity
```

Verified split:

- installed package: `com.aquahomes.sentinel`
- activity class: `com.aquahomes.sentientos.MainActivity`

The current Sentinel manifest declares no custom deep-link intent filter.
Until one is deliberately added and tested, use an explicit component launch
with a package-launch fallback. Do not perform a package-query precheck that
can return a false negative.

## Approved controls

| Position | Control | Intent |
| --- | --- | --- |
| 1 | Ask Aqua | conversational microphone |
| 2 | Video | narrated video evidence |
| 3 | Photo | still evidence capture |
| 4 | File | silent voice filing |

The large A is separate from the four quick actions.

## Visual contract

- translucent obsidian glass;
- thin obsidian-blue edge trace;
- exact Sentinel A and energy treatment;
- no opaque black square behind the A;
- approved control order preserved;
- 4x3 default widget footprint;
- resize range must allow smaller and larger One UI layouts.

## Truthful state

Use the Golden Goose field states where applicable:

- Saved Locally
- Queued
- Syncing
- Confirmed
- Needs Attention
- Failed with Report

The widget must never state that a request reached Sentinel, was archived, or
was filed unless the corresponding local/remote receipt exists.

## Required v0.2.3 evidence

Before integration is complete, inspect the actual APK and source for:

- application ID;
- main activity;
- widget provider class;
- receiver/provider registration;
- `appwidget-provider` XML;
- `resizeMode`;
- `minWidth` and `minHeight`;
- target cells and maximum resize limits;
- version code and version name;
- signing certificate digest;
- the exact Sentinel launch component;
- Ask/Video/Photo/File click mappings;
- requested permissions;
- ZIP integrity and signature verification.
