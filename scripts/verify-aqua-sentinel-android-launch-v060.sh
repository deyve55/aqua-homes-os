#!/usr/bin/env bash
set -euo pipefail

APP_ID="com.aquahomes.sentinel"
MAIN_COMPONENT="com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity"
APK_PATH="android-app/app/build/outputs/apk/release/app-release.apk"
DIALOG_PATTERN='text="Camera keeps stopping"|text="Close app"|text="Viewing full screen"|text="GOT IT"'

wait_for_adb() {
  for adb_attempt in $(seq 1 12); do
    if [[ "$(adb get-state 2>/dev/null || true)" == "device" ]]; then
      return 0
    fi
    timeout 5s adb wait-for-device >/dev/null 2>&1 || true
    sleep 2
  done
  adb devices -l >&2
  return 1
}

dump_window() {
  local label="$1"
  local device_path="/sdcard/${label}.xml"
  local host_path="/tmp/${label}.xml"
  for dump_attempt in $(seq 1 6); do
    wait_for_adb || true
    adb shell rm -f "$device_path" >/dev/null 2>&1 || true
    if timeout 20s adb shell uiautomator dump "$device_path" >/dev/null 2>&1 \
      && timeout 10s adb pull "$device_path" "$host_path" >/dev/null 2>&1 \
      && test -s "$host_path"; then
      printf '%s\n' "$host_path"
      return 0
    fi
    sleep 2
  done
  return 1
}

recover_system_dialogs() {
  local phase="$1"
  local window_path=""
  for dialog_attempt in $(seq 1 6); do
    window_path="$(dump_window "aqua-sentinel-v0.6.1-${phase}-${dialog_attempt}")" || {
      sleep 2
      continue
    }
    if grep -Eiq 'text="Camera keeps stopping"|text="Close app"' "$window_path"; then
      wait_for_adb
      adb shell am force-stop com.android.camera2 || true
      adb shell input keyevent KEYCODE_BACK || true
      timeout 30s adb shell am start -W -n "$MAIN_COMPONENT" >/dev/null || true
      sleep 2
      continue
    fi
    if grep -Eiq "Viewing full screen|GOT IT" "$window_path"; then
      wait_for_adb
      adb shell input tap 855 525 || true
      adb shell input keyevent KEYCODE_ENTER || true
      sleep 2
      continue
    fi
    return 0
  done
  window_path="$(dump_window "aqua-sentinel-v0.6.1-${phase}-final")"
  ! grep -Eiq "$DIALOG_PATTERN" "$window_path"
}

wait_for_ui_ready() {
  local log_path="$1"
  for ui_attempt in $(seq 1 20); do
    sleep 2
    wait_for_adb || continue
    if timeout 10s adb logcat -d > "$log_path" \
      && grep -q "AQUA_SENTINEL_UI_READY" "$log_path"; then
      return 0
    fi
  done
  return 1
}

start_sentinel() {
  wait_for_adb
  adb shell input keyevent KEYCODE_WAKEUP
  adb shell wm dismiss-keyguard
  timeout 30s adb shell am start -W -n "$MAIN_COMPONENT"
}

assert_sentinel_resumed() {
  local activity_path="$1"
  adb shell dumpsys activity activities > "$activity_path"
  grep -Eq "(mResumedActivity|topResumedActivity|ResumedActivity).*${APP_ID}/com\.aquahomes\.sentientos\.MainActivity" "$activity_path"
}

wait_for_adb
adb uninstall "$APP_ID" || true
adb install --no-incremental "$APK_PATH"
adb shell svc power stayon true
adb shell settings put system screen_off_timeout 2147483647
adb shell settings put secure immersive_mode_confirmations confirmed
adb logcat -c
start_sentinel
wait_for_ui_ready /tmp/aqua-sentinel-v0.6.1-logcat.txt
APP_PID="$(adb shell pidof "$APP_ID" || true)"
test -n "$APP_PID" || {
  grep -E "FATAL EXCEPTION|AndroidRuntime|chromium|WebViewFactory" /tmp/aqua-sentinel-v0.6.1-logcat.txt || true
  exit 1
}
adb shell dumpsys package "$APP_ID" > /tmp/aqua-sentinel-v0.6.1-package.txt
grep -q "versionCode=2026080102" /tmp/aqua-sentinel-v0.6.1-package.txt
grep -q "AquaCommandWidget" /tmp/aqua-sentinel-v0.6.1-package.txt
grep -q "QuickCaptureActivity" /tmp/aqua-sentinel-v0.6.1-package.txt
grep -q "EvidenceProvider" /tmp/aqua-sentinel-v0.6.1-package.txt
recover_system_dialogs initial
assert_sentinel_resumed /tmp/aqua-sentinel-v0.6.1-initial-activities.txt

bash scripts/verify-aqua-sentinel-widget-actions-v054.sh

adb shell am force-stop com.android.camera2 || true
adb shell input keyevent KEYCODE_BACK || true
adb logcat -c
adb shell am force-stop "$APP_ID"
start_sentinel
wait_for_ui_ready /tmp/aqua-sentinel-v0.6.1-final-logcat.txt
recover_system_dialogs final
assert_sentinel_resumed /tmp/aqua-sentinel-v0.6.1-activities.txt
