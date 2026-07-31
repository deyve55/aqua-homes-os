# Aqua Sentinel OS Build and Signing

## Supported source path

Build the approved Sentinel interface from:

- web UI: `sentient-os-web/`
- Android wrapper: `android-app/`

Do not build the current Sentinel release from `sentinel-app/`.

## Toolchain recorded by the workflow

- Node.js 22
- Java 17 (Temurin in CI)
- Android platform 35
- Android build-tools 35.0.0
- Gradle 8.10.2
- Android Gradle Plugin 8.6.1
- minimum Android SDK 26
- target Android SDK 35

## Tests

From the repository root:

```sh
npm run test:sentient-functional
```

The workflow also restores and verifies the approved launcher:

```sh
bash scripts/restore-aqua-sentinel-launcher-v045.sh
```

## Fidelity-preserving Android assembly

From the repository root:

```sh
mkdir -p android-app/app/src/main/assets/public
cp -R sentient-os-web/. android-app/app/src/main/assets/public/
cd android-app
gradle --no-daemon --stacktrace :app:assembleRelease
```

The release APK is produced at:

`android-app/app/build/outputs/apk/release/app-release.apk`

Do not rewrite the interface into the legacy Android tree. The direct
`sentient-os-web` copy is the approved packaging boundary.

## Signing variables

`android-app/app/build.gradle.kts` expects:

```text
AQUA_RELEASE_KEYSTORE_PATH
AQUA_RELEASE_KEYSTORE_PASSWORD
AQUA_RELEASE_KEY_ALIAS
AQUA_RELEASE_KEY_PASSWORD
```

Provide values only through the local/CI secret environment. Never commit:

- a `.jks` or `.keystore` file;
- a private signing key;
- passwords;
- secret environment files;
- GitHub tokens or other credentials.

The existing workflow generates a temporary candidate certificate. That is
suitable for test candidates, not final Google Play update continuity.

## Package verification

The authoritative Sentinel identity is:

```text
applicationId: com.aquahomes.sentinel
namespace: com.aquahomes.sentientos
launch activity: com.aquahomes.sentientos.MainActivity
explicit component:
com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity
```

Verify a built APK with Android build-tools:

```sh
zipalign -c -P 16 -v 4 app-release.apk
apksigner verify --verbose --print-certs app-release.apk
aapt dump badging app-release.apk
unzip -l app-release.apk
unzip -t app-release.apk
```

The archive must contain:

```text
assets/public/index.html
assets/public/app.js
assets/public/fidelity.css
```

## Command Center intake

The other chat must provide its own exact build commands and package report
with v0.2.3. Do not copy signing material into this repository.
