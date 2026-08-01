#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
main_activity="$package/com.aquahomes.sentientos.MainActivity"
capture_activity="$package/com.aquahomes.sentientos.QuickCaptureActivity"
launcher_package="com.android.launcher3"
widget_provider="$package/com.aquahomes.sentientos.AquaCommandWidget"

clear_logcat() {
  for attempt in $(seq 1 8); do
    adb wait-for-device >/dev/null 2>&1 || true
    if adb logcat -c >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  echo "Android log buffer could not be cleared after bounded retries" >&2
  return 1
}

dump_ui() {
  local label="$1"
  local device_path="/sdcard/${label}.xml"
  local host_path="/tmp/${label}.xml"

  for attempt in $(seq 1 8); do
    adb wait-for-device >/dev/null 2>&1 || true
    adb shell rm -f "$device_path" >/dev/null 2>&1 || true
    if timeout 20s adb shell uiautomator dump "$device_path" >/dev/null 2>&1 \
      && timeout 10s adb pull "$device_path" "$host_path" >/dev/null 2>&1 \
      && [[ -s "$host_path" ]]; then
      printf '%s\n' "$host_path"
      return 0
    fi
    sleep 2
  done

  return 1
}

ui_node_center() {
  local hierarchy_path="$1"
  local pattern="$2"

  python3 - "$hierarchy_path" "$pattern" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, pattern = sys.argv[1:]
matcher = re.compile(pattern, re.IGNORECASE)
nodes = []
for node in ET.parse(path).iter("node"):
    attributes = node.attrib
    searchable = " ".join(
        attributes.get(key, "")
        for key in ("resource-id", "text", "content-desc", "class")
    )
    if not matcher.search(searchable):
        continue
    bounds = re.fullmatch(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", attributes.get("bounds", ""))
    if not bounds:
        continue
    left, top, right, bottom = map(int, bounds.groups())
    if right <= left or bottom <= top:
        continue
    score = int(attributes.get("clickable") == "true") * 4
    score += int(bool(attributes.get("resource-id"))) * 2
    score += int(bool(attributes.get("content-desc")))
    nodes.append((score, (right - left) * (bottom - top), left, top, right, bottom))

if nodes:
    _, _, left, top, right, bottom = sorted(nodes, reverse=True)[0]
    print((left + right) // 2, (top + bottom) // 2)
PY
}

tap_ui_node() {
  local label="$1"
  local pattern="$2"
  local hierarchy_path=""
  local coordinates=""

  for attempt in $(seq 1 20); do
    hierarchy_path="$(dump_ui "aqua-widget-${label}-${attempt}")" || {
      sleep 1
      continue
    }
    coordinates="$(ui_node_center "$hierarchy_path" "$pattern")"
    if [[ -n "$coordinates" ]]; then
      read -r tap_x tap_y <<< "$coordinates"
      echo "Tapping $label at $tap_x,$tap_y"
      adb shell input tap "$tap_x" "$tap_y"
      return 0
    fi
    sleep 1
  done

  echo "Android did not expose a tappable UI node for: $label" >&2
  [[ -n "$hierarchy_path" && -s "$hierarchy_path" ]] && sed -n '1,12p' "$hierarchy_path" >&2
  return 1
}

wait_for_log() {
  local pattern="$1"
  local evidence="$2"
  local attempts="${3:-30}"

  for attempt in $(seq 1 "$attempts"); do
    sleep 1
    adb logcat -d > "$evidence"
    if grep -Eq "$pattern" "$evidence"; then
      return 0
    fi
  done

  return 1
}

return_to_launcher() {
  adb shell input keyevent KEYCODE_HOME
  for attempt in $(seq 1 20); do
    adb shell dumpsys window windows > /tmp/aqua-widget-launcher-window.txt 2>&1 || true
    if grep -Eq "mCurrentFocus.*${launcher_package}|mFocusedApp.*${launcher_package}" /tmp/aqua-widget-launcher-window.txt; then
      return 0
    fi
    sleep 1
  done
  echo "Launcher3 did not become the focused home activity" >&2
  tail -n 80 /tmp/aqua-widget-launcher-window.txt >&2 || true
  return 1
}

pin_widget_on_launcher() {
  local pin_evidence="/tmp/aqua-sentinel-v0.7.0-widget-pin.logcat.txt"
  local appwidget_state="/tmp/aqua-sentinel-v0.7.0-appwidget-host.txt"
  local launcher_hierarchy=""

  clear_logcat
  adb shell am force-stop "$package"
  adb shell am start -W \
    -n "$main_activity" \
    --ez widget_launcher_pin_probe true || true

  if ! wait_for_log "AQUA_WIDGET_PIN_REQUESTED accepted=true" "$pin_evidence" 60; then
    echo "Sentinel did not request Android's widget pin flow" >&2
    grep -E "AQUA_WIDGET|AndroidRuntime|FATAL EXCEPTION" "$pin_evidence" >&2 || true
    return 1
  fi

  tap_ui_node \
    "Launcher3 Add widget confirmation" \
    "place_automatically_button|add automatically|add to home screen"

  if ! wait_for_log "AQUA_WIDGET_LIFECYCLE_REFRESH action=.*WIDGET_PINNED" "$pin_evidence" 40; then
    echo "Launcher3 did not confirm the widget pin request" >&2
    grep -E "AQUA_WIDGET|Launcher3|AndroidRuntime|FATAL EXCEPTION" "$pin_evidence" >&2 || true
    return 1
  fi

  return_to_launcher
  for attempt in $(seq 1 30); do
    adb shell dumpsys appwidget > "$appwidget_state" 2>&1 || true
    launcher_hierarchy="$(dump_ui "aqua-widget-launcher-host-${attempt}")" || true
    if grep -Fq "$widget_provider" "$appwidget_state" \
      && grep -Fq "$launcher_package" "$appwidget_state" \
      && [[ -n "$launcher_hierarchy" ]] \
      && grep -Fq "$package:id/widget_logo" "$launcher_hierarchy"; then
      echo "AQUA_WIDGET_LAUNCHER_HOST_READY provider=$widget_provider host=$launcher_package"
      return 0
    fi
    sleep 1
  done

  echo "The Aqua widget was not rendered by Launcher3 after pin confirmation" >&2
  grep -E "AquaCommandWidget|${launcher_package}" "$appwidget_state" >&2 || true
  [[ -n "$launcher_hierarchy" && -s "$launcher_hierarchy" ]] && sed -n '1,12p' "$launcher_hierarchy" >&2
  return 1
}

tap_launcher_control() {
  local mode="$1"
  local resource_id="$2"
  local text_fallback="$3"

  return_to_launcher
  tap_ui_node \
    "launcher-hosted widget $mode control" \
    "$package:id/$resource_id|$text_fallback"
  echo "AQUA_WIDGET_LAUNCHER_TAP mode=$mode resource=$resource_id"
}

tap_resource() {
  local resource_name="$1"
  local bounds_name="$2"
  local coordinates=""

  for attempt in $(seq 1 16); do
    coordinates="$(adb logcat -d | python3 -c '
import re
import sys

name = sys.argv[1]
lines = [line for line in sys.stdin if "AQUA_WIDGET_COMPOSER_READY" in line]
if lines:
    match = re.search(rf"{name}=(\d+),(\d+),(\d+),(\d+)", lines[-1])
    if match:
        left, top, right, bottom = map(int, match.groups())
        print((left + right) // 2, (top + bottom) // 2)
' "$bounds_name")"
    if [[ -n "$coordinates" ]]; then
      read -r tap_x tap_y <<< "$coordinates"
      echo "Tapping rendered $resource_name control at $tap_x,$tap_y"
      adb shell input tap "$tap_x" "$tap_y"
      return 0
    fi
    sleep 1
  done

  echo "Android did not report rendered bounds for: $resource_name" >&2
  adb logcat -d | grep -E "AQUA_WIDGET_COMPOSER|AQUA_CAPTURE|AndroidRuntime|FATAL EXCEPTION" || true
  return 1
}

pin_widget_on_launcher

for mode in home ask file photo video; do
  evidence="/tmp/aqua-sentinel-v0.7.0-widget-${mode}.logcat.txt"
  expected_route="$mode"
  [[ "$mode" == "file" ]] && expected_route="voice"
  clear_logcat
  adb shell am force-stop "$package"
  case "$mode" in
    home) tap_launcher_control "$mode" "widget_logo" "Open Aqua Sentinel OS" ;;
    ask) tap_launcher_control "$mode" "widget_ask" "ASK AQUA" ;;
    file) tap_launcher_control "$mode" "widget_file" "FILE" ;;
    photo) tap_launcher_control "$mode" "widget_photo" "PHOTO" ;;
    video) tap_launcher_control "$mode" "widget_video" "VIDEO" ;;
  esac

  received=false
  routed=false
  for attempt in $(seq 1 24); do
    sleep 1
    adb logcat -d > "$evidence"
    if [[ "$mode" == "home" ]]; then
      if grep -Fq "AQUA_WIDGET_HOME_OPENED" "$evidence"; then
        received=true
        routed=true
      fi
    else
      if grep -Fq "AQUA_WIDGET_ACTION_RECEIVED mode=$mode" "$evidence"; then
        received=true
      fi
      if grep -Fq "AQUA_CAPTURE_ROUTE mode=$expected_route" "$evidence"; then
        routed=true
      fi
    fi
    if [[ "$received" == "true" && "$routed" == "true" ]]; then
      break
    fi
  done

  if [[ "$received" != "true" || "$routed" != "true" ]]; then
    echo "Launcher-hosted widget tap did not resolve its route: $mode" >&2
    grep -E "AQUA_WIDGET|AQUA_CAPTURE|QuickCaptureActivity|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
    exit 1
  fi

  if [[ "$mode" == "ask" ]]; then
    for attempt in $(seq 1 12); do
      adb logcat -d > "$evidence"
      if grep -Fq "AQUA_WIDGET_COMPOSER_READY" "$evidence"; then
        break
      fi
      sleep 1
    done
    if ! grep -Fq "AQUA_WIDGET_COMPOSER_READY" "$evidence"; then
      echo "Widget command composer did not become ready" >&2
      grep -E "AQUA_WIDGET_COMPOSER|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
    adb shell input text 'Widget%smessage%sexecution%stest'
    touched=false
    submitted=false
    delivered=false
    for tap_attempt in $(seq 1 3); do
      tap_resource "widget_command_send" "send"
      for receipt_attempt in $(seq 1 8); do
        sleep 1
        adb logcat -d > "$evidence"
        grep -Fq "AQUA_WIDGET_SEND_TOUCH action=up" "$evidence" && touched=true
        grep -Fq "AQUA_WIDGET_MESSAGE_SUBMITTED" "$evidence" \
          && grep -Fq "characters=29" "$evidence" \
          && submitted=true
        grep -Fq "AQUA_WIDGET_MESSAGE_DELIVERED" "$evidence" && delivered=true
        if [[ "$touched" == "true" && "$submitted" == "true" && "$delivered" == "true" ]]; then break 2; fi
      done
    done
    if [[ "$touched" != "true" || "$submitted" != "true" || "$delivered" != "true" ]]; then
      echo "Widget Send touch did not submit and reach Sentinel after bounded retries" >&2
      grep -E "AQUA_WIDGET|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
  fi

  adb shell am force-stop com.android.camera2 || true
  adb shell am force-stop "$package"
done

# The launcher tap above proves the FILE PendingIntent reaches the real voice-filing route.
# Complete the deterministic downstream filing contract separately because the headless
# emulator has no microphone input; do not mislabel synthetic speech as a launcher tap.
file_evidence="/tmp/aqua-sentinel-v0.7.0-widget-file-completion.logcat.txt"
clear_logcat
adb shell am start -W \
  -n "$capture_activity" \
  --es capture_mode file \
  --es widget_filing_text "File this preview with Aqua CRM" || true
wait_for_log "AQUA_CAPTURE_SAVED type=voice" "$file_evidence" 30
wait_for_log "AQUA_FILING_INBOX_DELIVERED items=[1-9]" "$file_evidence" 30
wait_for_log "AQUA_FILING_CABINET_OPENED" "$file_evidence" 30

adb shell am force-stop "$package"
return_to_launcher
tap_ui_node \
  "launcher-hosted widget after process recreation" \
  "$package:id/widget_logo|Open Aqua Sentinel OS"
wait_for_log "AQUA_WIDGET_HOME_OPENED" /tmp/aqua-sentinel-v0.7.0-widget-recreated.logcat.txt 30
echo "AQUA_WIDGET_LAUNCHER_PROCESS_RECREATION_VERIFIED"
