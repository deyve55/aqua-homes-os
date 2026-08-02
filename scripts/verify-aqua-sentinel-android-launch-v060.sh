#!/usr/bin/env bash
set -euo pipefail

APP_ID="com.aquahomes.sentinel"
MAIN_COMPONENT="com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity"
APK_PATH="android-app/app/build/outputs/apk/release/app-release.apk"
DIALOG_PATTERN='text="Camera keeps stopping"|text="Close app"|text="Viewing full screen"|text="GOT IT"|package="com.android.permissioncontroller"'

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

dismiss_permission_controller() {
  local window_path="$1"
  local tap_coordinates=""

  tap_coordinates="$(python3 - "$window_path" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path = sys.argv[1]
for node in ET.parse(path).iter("node"):
    resource_id = node.attrib.get("resource-id", "")
    text = node.attrib.get("text", "").strip().upper()
    if resource_id != "com.android.permissioncontroller:id/permission_deny_button" and text != "DENY":
        continue
    match = re.fullmatch(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", node.attrib.get("bounds", ""))
    if match:
        left, top, right, bottom = map(int, match.groups())
        print(f"{(left + right) // 2} {(top + bottom) // 2}")
    break
PY
)"

  if [[ -n "$tap_coordinates" ]]; then
    read -r tap_x tap_y <<< "$tap_coordinates"
    adb shell input tap "$tap_x" "$tap_y" || true
    sleep 1
    return 0
  fi

  adb shell input keyevent KEYCODE_BACK || true
}

recover_system_dialogs() {
  local phase="$1"
  local window_path=""
  local focus_path="/tmp/aqua-sentinel-v0.7.2-${phase}-focus.txt"
  for dialog_attempt in $(seq 1 6); do
    wait_for_adb || true
    if timeout 10s adb shell dumpsys window > "$focus_path" 2>&1 \
      && grep -Eq "(mCurrentFocus|mFocusedApp).*${APP_ID}.*MainActivity" "$focus_path"; then
      return 0
    fi
    window_path="$(dump_window "aqua-sentinel-v0.7.2-${phase}-${dialog_attempt}")" || {
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
    if grep -Eiq 'package="com.android.permissioncontroller"' "$window_path"; then
      wait_for_adb
      dismiss_permission_controller "$window_path"
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
  window_path="$(dump_window "aqua-sentinel-v0.7.2-${phase}-final")"
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

print_cold_start_diagnostics() {
  local phase="$1"
  local attempt="$2"
  local log_path="$3"
  local activity_path="/tmp/aqua-sentinel-v0.7.2-${phase}-attempt-${attempt}-activities.txt"
  local window_state_path="/tmp/aqua-sentinel-v0.7.2-${phase}-attempt-${attempt}-window-state.txt"
  local hierarchy_path=""

  printf '::group::Aqua Sentinel cold-start diagnostics (%s attempt %s)\n' "$phase" "$attempt"
  wait_for_adb || true
  timeout 15s adb logcat -d > "$log_path" 2>&1 || true
  printf '%s\n' '--- process ---'
  adb shell pidof "$APP_ID" || true
  printf '%s\n' '--- launch markers and fatal signals ---'
  grep -E "AQUA_SENTINEL|FATAL EXCEPTION|AndroidRuntime|chromium|WebViewFactory|ActivityTaskManager" "$log_path" | tail -n 160 || true
  printf '%s\n' '--- resumed activities ---'
  timeout 15s adb shell dumpsys activity activities > "$activity_path" 2>&1 || true
  grep -E "mResumedActivity|topResumedActivity|ResumedActivity|mLastPausedActivity" "$activity_path" | tail -n 80 || true
  printf '%s\n' '--- focused windows ---'
  timeout 15s adb shell dumpsys window windows > "$window_state_path" 2>&1 || true
  grep -E "mCurrentFocus|mFocusedApp|Window #|${APP_ID}" "$window_state_path" | tail -n 120 || true
  printf '%s\n' '--- visible UI hierarchy ---'
  hierarchy_path="$(dump_window "aqua-sentinel-v0.7.2-${phase}-attempt-${attempt}-diagnostic")" || true
  if [[ -n "$hierarchy_path" && -s "$hierarchy_path" ]]; then
    grep -Eo 'package="[^"]+"|resource-id="[^"]+"|text="[^"]+"|content-desc="[^"]+"' "$hierarchy_path" | head -n 160 || true
  else
    printf '%s\n' 'UI hierarchy unavailable'
  fi
  printf '%s\n' '::endgroup::'
}

launch_sentinel_with_recovery() {
  local phase="$1"
  local log_path="$2"
  local attempt=""

  for attempt in 1 2; do
    wait_for_adb
    adb logcat -c || true
    if ! start_sentinel; then
      printf 'Sentinel start command did not complete during %s attempt %s; recovering before the UI-ready wait.\n' "$phase" "$attempt" >&2
    fi
    recover_system_dialogs "${phase}-attempt-${attempt}-pre-ready" || true
    if wait_for_ui_ready "$log_path"; then
      recover_system_dialogs "${phase}-attempt-${attempt}-post-ready"
      return 0
    fi
    print_cold_start_diagnostics "$phase" "$attempt" "$log_path"
    adb shell am force-stop com.android.camera2 || true
    adb shell input keyevent KEYCODE_BACK || true
    adb shell am force-stop "$APP_ID" || true
    sleep 2
  done

  printf 'Aqua Sentinel did not emit AQUA_SENTINEL_UI_READY after two bounded %s attempts.\n' "$phase" >&2
  return 1
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
launch_sentinel_with_recovery initial /tmp/aqua-sentinel-v0.7.2-logcat.txt
APP_PID="$(adb shell pidof "$APP_ID" || true)"
test -n "$APP_PID" || {
  grep -E "FATAL EXCEPTION|AndroidRuntime|chromium|WebViewFactory" /tmp/aqua-sentinel-v0.7.2-logcat.txt || true
  exit 1
}
adb shell dumpsys package "$APP_ID" > /tmp/aqua-sentinel-v0.7.2-package.txt
grep -q "versionCode=2026080201" /tmp/aqua-sentinel-v0.7.2-package.txt
grep -q "AquaCommandWidget" /tmp/aqua-sentinel-v0.7.2-package.txt
grep -q "QuickCaptureActivity" /tmp/aqua-sentinel-v0.7.2-package.txt
grep -q "EvidenceProvider" /tmp/aqua-sentinel-v0.7.2-package.txt
recover_system_dialogs initial
assert_sentinel_resumed /tmp/aqua-sentinel-v0.7.2-initial-activities.txt

bash scripts/verify-aqua-sentinel-widget-actions-v054.sh

adb shell am force-stop com.android.camera2 || true
adb shell input keyevent KEYCODE_BACK || true
adb shell am force-stop "$APP_ID"
launch_sentinel_with_recovery final /tmp/aqua-sentinel-v0.7.2-final-logcat.txt
recover_system_dialogs final
assert_sentinel_resumed /tmp/aqua-sentinel-v0.7.2-activities.txt
