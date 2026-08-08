# Aqua Sentinel v0.6.0 APK and SDK v1.10.0 Completion Receipt

Date: 2026-08-01
Owner and final human authority: Dave (Deyve)
APK repository: `deyve55/aqua-homes-os`
APK branch: `agent/aqua-sentinel-command-center-integration-20260730`
Draft APK PR: #194
Validated APK source: `c1545cf3727adeb0815d11c571b72b3f235dc481`

## APK evidence

- Regression run #169 / 30710420420: success
- General Android run #96 / 30710420409: success
- Specialized run #125 / 30710420380: success
- Specialized job 91397613876: success
- Tests: 37 passed, 0 failed
- Deterministic 430x932 Home, Neural Link, and Command Center proofs: passed
- Home proof presentation assertions: `8 open leads` and `PRESENTATION DATA`
- Clean emulator install/launch: passed
- Ask, Voice, Photo, and Video widget routes: passed
- Artifact ID: 8821888791
- Artifact SHA-256: `e382d19ef614b66a529b2d1c4249b9f33c5347cc8ac3ad06e842fb3d01f70b24`
- APK SHA-256: `b6cb5502fb4c7400c24ce5416eeeecc9fed83cd1b7b377682e48f5531605228d`
- Package: `com.aquahomes.sentinel`
- Version: `2026080101 / 0.6.0-neural-link-ai-gateway-test`
- Min/target SDK: 26 / 35
- Signing: temporary CI test certificate

## SDK evidence

- Repository: `deyve55/Aqua-sentient-os`
- Draft PR: #8
- Package: `@deyve55/aqua-integration-sdk@1.10.0`
- Validated source: `08e39b182c7459521f477955125882b692f5ca7b`
- Workflow run #18 / 30709137707: success
- Node 20 and Node 24: 106 passed, 0 failed on each
- Clean tarball installs: passed
- Clean authenticated restricted-registry install: passed
- Projection export: `@deyve55/aqua-integration-sdk/projection-sync`
- JSON-RPC method: `aqua.adapter.sync`
- Local SDK-to-v0.6 gateway contract: 6 passed, 0 failed

## Truth boundary

This receipt proves the APK source/build/emulator/visual/artifact boundary and
the SDK source/test/package-install/contract boundary. It does not claim
physical Fold 7 or DeX acceptance, production signing, durable production
projection storage, live production adapter credentials, satellite-app
adoption, or production deployment.
