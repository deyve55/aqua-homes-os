# Aqua Sentinel OS v0.8.4 release receipt

**Archived:** 2026-08-08
**Status:** verified test APK; physical Samsung Fold acceptance remains pending

## Installer

- File: `AquaSentinelOS-v0.8.4-Live-Aqua-Daily-Ledger.apk`
- Package: `com.aquahomes.sentinel`
- Version code: `2026080504`
- Version name: `0.8.4-live-aqua-daily-ledger`
- Size: `22,585,507 bytes`
- APK SHA-256: `a8a0ad42799c558e4a2f20f97330372fe07b7f9fafe6c7b8b92e1438fcbdeffb`
- Git blob SHA-1: `467ffe9c41b01806495e13b2df8bd4acaa357e09`

## Build provenance

- Workflow run: `31177798288`
- Workflow artifact ID: `8993875587`
- Artifact name: `AquaSentinelOS-v0.8.4-Live-Aqua-Daily-Ledger`
- Artifact ZIP SHA-256: `307b85317073dd3d65e74dbe458aa861e6b5a11a1afa8c4cb432084c41c30fc4`
- Triggering branch head: `1e74afe4ff058141be75e13b1c2c3578345877e8`
- Embedded build provenance commit: `12c28f1c2bb9ab9eca373b6d9ae03418c06d4735`
- Android target SDK: `35`
- Android minimum SDK: `26`
- Launch activity: `com.aquahomes.sentientos.MainActivity`
- APK Signature Scheme v2: verified
- APK Signature Scheme v3: verified

## Verification recorded by the workflow

- Sentinel regression suite passed.
- Worker packaging passed.
- Deterministic visual-proof suite passed.
- Package, signature, and embedded-interface inspection passed.
- Clean hosted-emulator install and launch passed.
- Launcher widget pinning, resize, tap, filing, and relaunch checks passed.
- Checksums and release artifact upload passed.

## Truth boundary

This is the latest verified Sentinel APK available from the recorded release lineage at the time of archival. It is a test-signed build, not a claim of production activation. Physical Samsung Fold testing, live microphone/WebRTC behavior, and any production backend crossing remain separate gates. This archival commit does not change Sentinel source, UI, personality, routes, credentials, deployment, or PR merge state.
