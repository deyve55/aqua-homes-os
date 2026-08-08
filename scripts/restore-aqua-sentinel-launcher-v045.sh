#!/usr/bin/env bash
set -euo pipefail

readonly SOURCE_DIR="encoded-assets/aqua-sentinel-launcher-v045"
readonly MASTER="android-app/icon-source/AquaSentinel-BrainCircuit-approved-v045.png"
readonly EXPECTED_SHA256="bc1e014886d19f10ee1b8afdca2f5bc99d6d9c9ff103c2b359cc9457da80f6c5"
readonly BACKGROUND="#010508"
readonly FOREGROUND_TMP="android-app/build/tmp/aqua-sentinel-launcher-v045/foreground-432.png"

command -v convert >/dev/null
mkdir -p "$(dirname "$MASTER")"
mkdir -p "$(dirname "$FOREGROUND_TMP")"

LC_ALL=C cat "$SOURCE_DIR"/AquaSentinel-BrainCircuit-approved-v045.b64.part-* \
  | base64 --decode > "$MASTER"

printf '%s  %s\n' "$EXPECTED_SHA256" "$MASTER" | sha256sum --check

for spec in mdpi:48 hdpi:72 xhdpi:96 xxhdpi:144 xxxhdpi:192; do
  density="${spec%%:*}"
  size="${spec##*:}"
  convert "$MASTER" -filter Lanczos -resize "${size}x${size}" \
    "android-app/app/src/main/res/mipmap-${density}/aqua_sentinel_launcher.png"
done

convert "$MASTER" -filter Lanczos -resize 398x398 -gravity center \
  -background "$BACKGROUND" -extent 432x432 \
  "$FOREGROUND_TMP"

for spec in mdpi:108 hdpi:162 xhdpi:216 xxhdpi:324 xxxhdpi:432; do
  density="${spec%%:*}"
  size="${spec##*:}"
  convert "$FOREGROUND_TMP" -filter Lanczos \
    -resize "${size}x${size}" \
    "android-app/app/src/main/res/mipmap-${density}/aqua_sentinel_launcher_foreground.png"
done

echo "Aqua Sentinel OS v0.4.5 launcher restored and verified."
