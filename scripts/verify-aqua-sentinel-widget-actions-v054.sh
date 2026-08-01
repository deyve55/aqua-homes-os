#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
main_activity="$package/com.aquahomes.sentientos.MainActivity"

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

for mode in home ask file photo video; do
  evidence="/tmp/aqua-sentinel-v0.7.0-widget-${mode}.logcat.txt"
  expected_route="$mode"
  [[ "$mode" == "file" ]] && expected_route="voice"
  clear_logcat
  adb shell am force-stop "$package"
  adb shell am start -W \
    -n "$main_activity" \
    --es widget_contract_probe "$mode" || true

  dispatched=false
  received=false
  routed=false
  for attempt in $(seq 1 24); do
    sleep 1
    adb logcat -d > "$evidence"
    if grep -Fq "AQUA_WIDGET_REMOTE_VIEWS_TAP mode=$mode dispatched=true" "$evidence"; then
      dispatched=true
    fi
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
    if [[ "$dispatched" == "true" && "$received" == "true" && "$routed" == "true" ]]; then
      break
    fi
  done

  if [[ "$dispatched" != "true" || "$received" != "true" || "$routed" != "true" ]]; then
    echo "Rendered widget tap did not dispatch and resolve its route: $mode" >&2
    grep -E "AQUA_WIDGET|AQUA_CAPTURE|QuickCaptureActivity|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
    exit 1
  fi

  if [[ "$mode" == "ask" ]]; then
    for attempt in $(seq 1 12); do
      adb logcat -d > "$evidence"
      if grep -Fq "AQUA_WIDGET_COMPOSER_READY" "$evidence" \
        && grep -Fq "characters=29" "$evidence"; then
        break
      fi
      sleep 1
    done
    if ! grep -Fq "AQUA_WIDGET_COMPOSER_READY" "$evidence" \
      || ! grep -Fq "characters=29" "$evidence"; then
      echo "Widget command composer did not contain the seeded verification message" >&2
      grep -E "AQUA_WIDGET_COMPOSER|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
    touched=false
    submitted=false
    delivered=false
    for tap_attempt in $(seq 1 3); do
      tap_resource "widget_command_send" "send"
      for receipt_attempt in $(seq 1 8); do
        sleep 1
        adb logcat -d > "$evidence"
        grep -Fq "AQUA_WIDGET_SEND_TOUCH action=up" "$evidence" && touched=true
        grep -Fq "AQUA_WIDGET_MESSAGE_SUBMITTED" "$evidence" && submitted=true
        grep -Fq "AQUA_WIDGET_MESSAGE_DELIVERED" "$evidence" && delivered=true
        if [[ "$touched" == "true" && "$submitted" == "true" && "$delivered" == "true" ]]; then break 2; fi
      done
    done
    if [[ "$touched" != "true" || "$submitted" != "true" || "$delivered" != "true" ]]; then
      echo "Widget Send touch did not submit and reach Sentinel after bounded retries" >&2
      grep -E "AQUA_WIDGET|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
  elif [[ "$mode" == "file" ]]; then
    saved=false
    delivered=false
    opened=false
    for attempt in $(seq 1 20); do
      sleep 1
      adb logcat -d > "$evidence"
      grep -Fq "AQUA_CAPTURE_SAVED type=voice" "$evidence" && saved=true
      grep -Eq "AQUA_FILING_INBOX_DELIVERED items=[1-9]" "$evidence" && delivered=true
      grep -Fq "AQUA_FILING_CABINET_OPENED" "$evidence" && opened=true
      if [[ "$saved" == "true" && "$delivered" == "true" && "$opened" == "true" ]]; then break; fi
    done
    if [[ "$saved" != "true" || "$delivered" != "true" || "$opened" != "true" ]]; then
      echo "Widget filing did not save, reach Sentinel, and open the File Cabinet" >&2
      grep -E "AQUA_WIDGET|AQUA_CAPTURE|AQUA_FILING|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
      exit 1
    fi
  fi

  adb shell am force-stop "$package"
done
