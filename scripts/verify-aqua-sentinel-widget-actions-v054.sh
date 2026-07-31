#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
activity="$package/com.aquahomes.sentientos.QuickCaptureActivity"

tap_resource() {
  local resource_name="$1"
  local visible_text="$2"
  local class_name="$3"
  local fallback_x_ratio="$4"
  local fallback_y_ratio="$5"
  local device_dump="/sdcard/aqua-widget-ui.xml"
  local local_dump="/tmp/aqua-widget-ui.xml"
  local coordinates=""

  for attempt in $(seq 1 3); do
    adb shell uiautomator dump "$device_dump" >/dev/null 2>&1 || true
    adb pull "$device_dump" "$local_dump" >/dev/null 2>&1 || true
    if [[ -s "$local_dump" ]]; then
      coordinates="$(python3 - "$local_dump" "$package:id/$resource_name" "$visible_text" "$class_name" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, target, visible_text, class_name = sys.argv[1:]
try:
    root = ET.parse(path).getroot()
except Exception:
    raise SystemExit(0)

for node in root.iter("node"):
    resource_matches = node.attrib.get("resource-id") == target
    text_matches = visible_text and node.attrib.get("text") == visible_text
    class_matches = class_name and node.attrib.get("class") == class_name
    if not (resource_matches or text_matches or class_matches):
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

  if ! adb shell dumpsys activity activities | grep -Fq "com.aquahomes.sentientos.QuickCaptureActivity"; then
    echo "Widget command surface was not the active Android activity: $resource_name" >&2
    return 1
  fi

  local screen_size=""
  screen_size="$(adb shell wm size | sed -n 's/.*: \([0-9][0-9]*\)x\([0-9][0-9]*\).*/\1 \2/p' | tail -n 1)"
  if [[ -z "$screen_size" ]]; then
    echo "Android control and screen size were not available: $resource_name" >&2
    return 1
  fi

  local screen_width screen_height fallback_x fallback_y
  read -r screen_width screen_height <<< "$screen_size"
  fallback_x="$(awk -v size="$screen_width" -v ratio="$fallback_x_ratio" 'BEGIN { printf "%d", size * ratio }')"
  fallback_y="$(awk -v size="$screen_height" -v ratio="$fallback_y_ratio" 'BEGIN { printf "%d", size * ratio }')"
  echo "Android omitted the accessibility selector; tapping the rendered $resource_name control at $fallback_x,$fallback_y"
  adb shell input tap "$fallback_x" "$fallback_y"
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
    tap_resource "widget_command_input" \
      "What do you need Aqua to do?" \
      "android.widget.EditText" \
      "0.50" \
      "0.28"
    adb shell input text "Widget_message_execution_test"
    tap_resource "widget_command_send" \
      "Send to Aqua" \
      "" \
      "0.73" \
      "0.41"
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
