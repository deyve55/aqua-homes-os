#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
activity="$package/com.aquahomes.sentientos.QuickCaptureActivity"

tap_resource() {
  local resource_name="$1"
  local device_dump="/sdcard/aqua-widget-ui.xml"
  local local_dump="/tmp/aqua-widget-ui.xml"
  local coordinates=""

  for attempt in $(seq 1 8); do
    adb shell uiautomator dump "$device_dump" >/dev/null 2>&1 || true
    adb pull "$device_dump" "$local_dump" >/dev/null 2>&1 || true
    if [[ -s "$local_dump" ]]; then
      coordinates="$(python3 - "$local_dump" "$package:id/$resource_name" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, target = sys.argv[1:]
try:
    root = ET.parse(path).getroot()
except Exception:
    raise SystemExit(0)

for node in root.iter("node"):
    if node.attrib.get("resource-id") != target:
        continue
    match = re.fullmatch(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", node.attrib.get("bounds", ""))
    if match:
        left, top, right, bottom = map(int, match.groups())
        print((left + right) // 2, (top + bottom) // 2)
    break
PY
)"
    fi
    if [[ -n "$coordinates" ]]; then
      read -r tap_x tap_y <<< "$coordinates"
      adb shell input tap "$tap_x" "$tap_y"
      return 0
    fi
    sleep 1
  done

  echo "Android resource was not visible: $resource_name" >&2
  return 1
}

for mode in ask voice photo video; do
  action="com.aquasoftware.sentinel.action.${mode^^}"
  evidence="/tmp/aqua-sentinel-v0.5.4-widget-${mode}.logcat.txt"

  adb logcat -c
  adb shell am start -W \
    -n "$activity" \
    -a "$action" \
    -d "aquasentinel://$mode" \
    --es capture_mode "$mode" || true

  received=false
  routed=false
  for attempt in $(seq 1 12); do
    sleep 1
    adb logcat -d > "$evidence"
    if grep -Fq "AQUA_WIDGET_ACTION_RECEIVED mode=$mode" "$evidence"; then
      received=true
    fi
    if grep -Fq "AQUA_CAPTURE_ROUTE mode=$mode" "$evidence"; then
      routed=true
    fi
    if [[ "$received" == "true" && "$routed" == "true" ]]; then
      break
    fi
  done

  if [[ "$received" != "true" || "$routed" != "true" ]]; then
    echo "Widget action did not reach and resolve its capture route: $mode" >&2
    grep -E "AQUA_WIDGET|AQUA_CAPTURE|QuickCaptureActivity|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
    exit 1
  fi

  if [[ "$mode" == "ask" ]]; then
    tap_resource "widget_command_input"
    adb shell input text "Widget_message_execution_test"
    tap_resource "widget_command_send"
    submitted=false
    delivered=false
    for attempt in $(seq 1 15); do
      sleep 1
      adb logcat -d > "$evidence"
      grep -Fq "AQUA_WIDGET_MESSAGE_SUBMITTED" "$evidence" && submitted=true
      grep -Fq "AQUA_WIDGET_MESSAGE_DELIVERED" "$evidence" && delivered=true
      if [[ "$submitted" == "true" && "$delivered" == "true" ]]; then break; fi
    done
    if [[ "$submitted" != "true" || "$delivered" != "true" ]]; then
      echo "Widget message did not submit and reach Sentinel" >&2
      grep -E "AQUA_WIDGET|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
  fi

  adb shell am force-stop "$package"
done
