#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
activity="$package/com.aquahomes.sentientos.QuickCaptureActivity"

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
    adb shell input text "Widget_message_execution_test"
    adb shell input keyevent 66
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
