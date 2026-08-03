#!/usr/bin/env bash
set -euo pipefail

package="com.aquahomes.sentinel"
main_activity="$package/com.aquahomes.sentientos.MainActivity"
capture_activity="$package/com.aquahomes.sentientos.QuickCaptureActivity"
launcher_package=""
widget_provider="$package/com.aquahomes.sentientos.AquaCommandWidget"

resolve_home_launcher_package() {
  local component=""
  component="$(
    adb shell cmd package resolve-activity --brief \
      -a android.intent.action.MAIN \
      -c android.intent.category.HOME 2>/dev/null \
      | tr -d '\r' \
      | tail -n 1
  )"
  if [[ "$component" != */* ]]; then
    echo "Android did not resolve an active HOME launcher component: $component" >&2
    return 1
  fi
  printf '%s\n' "${component%%/*}"
}

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
  local safe_label=""
  safe_label="$(printf '%s' "$label" | tr -cs '[:alnum:]_.-' '-')"
  local device_path="/sdcard/${safe_label}.xml"
  local host_path="/tmp/${safe_label}.xml"

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

ui_node_bounds() {
  local hierarchy_path="$1"
  local pattern="$2"

  python3 - "$hierarchy_path" "$pattern" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, pattern = sys.argv[1:]
matcher = re.compile(pattern, re.IGNORECASE)
for node in ET.parse(path).iter("node"):
    attributes = node.attrib
    searchable = " ".join(
        attributes.get(key, "")
        for key in ("resource-id", "text", "content-desc", "class")
    )
    if not matcher.search(searchable):
        continue
    bounds = re.fullmatch(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", attributes.get("bounds", ""))
    if bounds:
        print(" ".join(bounds.groups()))
        break
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
  local home_sent="false"

  for attempt in $(seq 1 20); do
    {
      adb shell dumpsys window 2>/dev/null || true
      adb shell dumpsys activity activities 2>/dev/null || true
    } > /tmp/aqua-widget-launcher-window.txt
    if grep -Eq "(mCurrentFocus|mFocusedApp|mResumedActivity|topResumedActivity|ACTIVITY).*${launcher_package}" /tmp/aqua-widget-launcher-window.txt; then
      return 0
    fi
    if [[ "$home_sent" == "false" ]]; then
      adb shell input keyevent KEYCODE_HOME
      home_sent="true"
    fi
    sleep 1
  done
  echo "The resolved Android home launcher did not become focused: $launcher_package" >&2
  tail -n 80 /tmp/aqua-widget-launcher-window.txt >&2 || true
  return 1
}

assert_widget_send_returned_to_launcher() {
  local focus_path="/tmp/aqua-sentinel-v0.7.6-widget-send-focus.txt"
  for attempt in $(seq 1 20); do
    {
      adb shell dumpsys window 2>/dev/null || true
      adb shell dumpsys activity activities 2>/dev/null || true
    } > "$focus_path"
    if grep -Eq "(mCurrentFocus|mFocusedApp|mResumedActivity|topResumedActivity|ACTIVITY).*${launcher_package}" "$focus_path"; then
      if grep -Eq "(mCurrentFocus|mFocusedApp|mResumedActivity|topResumedActivity).*${package}.*MainActivity" "$focus_path"; then
        echo "Widget Send opened Aqua Sentinel instead of returning to Launcher3" >&2
        return 1
      fi
      echo "AQUA_WIDGET_BACKGROUND_SEND_STAYED_ON_LAUNCHER"
      return 0
    fi
    sleep 1
  done
  echo "Widget Send did not return to Launcher3 without opening Sentinel" >&2
  tail -n 80 "$focus_path" >&2 || true
  return 1
}

assert_transient_capture_returned_to_launcher() {
  local mode="$1"
  local focus_path="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-return-focus.txt"
  for attempt in $(seq 1 20); do
    {
      adb shell dumpsys window 2>/dev/null || true
      adb shell dumpsys activity activities 2>/dev/null || true
    } > "$focus_path"
    if grep -Eq "(mCurrentFocus|mFocusedApp|mResumedActivity|topResumedActivity|ACTIVITY).*${launcher_package}" "$focus_path"; then
      if grep -Eq "(mCurrentFocus|mFocusedApp|mResumedActivity|topResumedActivity).*${package}" "$focus_path"; then
        echo "Widget $mode left a Sentinel capture activity resumed over Launcher3" >&2
        return 1
      fi
      echo "AQUA_WIDGET_CAPTURE_CANCEL_STAYED_ON_LAUNCHER mode=$mode"
      return 0
    fi
    sleep 1
  done
  echo "Widget $mode did not return naturally to Launcher3 after cancellation" >&2
  tail -n 80 "$focus_path" >&2 || true
  return 1
}

assert_no_sentinel_crash() {
  local evidence="$1"
  local phase="$2"
  local package_pattern="${package//./\\.}"
  adb logcat -d > "$evidence"
  if grep -Eq "Process: ${package_pattern}([,:]|$)|ANR in ${package_pattern}([[:space:]:]|$)|>>> ${package_pattern}(:[^< ]*)? <<<|Cmdline: ${package_pattern}([[:space:]:]|$)" "$evidence"; then
    echo "Aqua Sentinel crashed or stopped responding during $phase" >&2
    grep -E "FATAL EXCEPTION|Process: ${package_pattern}|ANR in ${package_pattern}|>>> ${package_pattern}|Cmdline: ${package_pattern}|AndroidRuntime" "$evidence" >&2 || true
    return 1
  fi
}

terminate_sentinel_background_process() {
  local phase="$1"
  local process_ids=""
  local task_ids=""

  return_to_launcher
  task_ids="$(adb shell dumpsys activity activities 2>/dev/null | python3 -c '
import re
import sys

package = sys.argv[1]
for line in sys.stdin:
    if ("TaskRecord{" not in line and "Task{" not in line) or f"A={package}" not in line:
        continue
    match = re.search(r"#(\d+)", line)
    if match:
        print(match.group(1))
' "$package")"
  for task_id in $task_ids; do
    adb shell am task remove "$task_id" >/dev/null 2>&1 || true
  done
  adb shell am kill "$package"
  for attempt in $(seq 1 8); do
    process_ids="$(adb shell pidof "$package" 2>/dev/null | tr -d '\r' || true)"
    if [[ -z "$process_ids" ]]; then
      echo "AQUA_WIDGET_BACKGROUND_PROCESS_TERMINATED phase=$phase"
      return 0
    fi
    sleep 1
  done

  adb shell am make-uid-idle "$package"
  adb shell am kill "$package"
  for attempt in $(seq 1 20); do
    process_ids="$(adb shell pidof "$package" 2>/dev/null | tr -d '\r' || true)"
    if [[ -z "$process_ids" ]]; then
      echo "AQUA_WIDGET_IDLE_PROCESS_TERMINATED phase=$phase"
      return 0
    fi
    sleep 1
  done

  echo "Sentinel process remained alive after background termination: phase=$phase pids=$process_ids" >&2
  adb shell ps -A | grep -F "$package" >&2 || true
  return 1
}

pin_widget_on_launcher() {
  local pin_evidence="/tmp/aqua-sentinel-v0.7.6-widget-pin.logcat.txt"
  local appwidget_state="/tmp/aqua-sentinel-v0.7.6-appwidget-host.txt"
  local launcher_hierarchy=""

  clear_logcat
  for animation_scale in window_animation_scale transition_animation_scale animator_duration_scale; do
    adb shell settings put global "$animation_scale" 1
    current_scale="$(adb shell settings get global "$animation_scale" | tr -d '\r')"
    if [[ "$current_scale" != "1" && "$current_scale" != "1.0" ]]; then
      echo "Android did not enable $animation_scale before the launcher widget proof" >&2
      return 1
    fi
  done
  adb shell am force-stop "$launcher_package" || true
  adb shell input keyevent KEYCODE_HOME
  return_to_launcher
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
      && grep -Fq "$package:id/widget_logo" "$launcher_hierarchy" \
      && grep -Fq "$package:id/widget_neural_art" "$launcher_hierarchy" \
      && grep -Fq "$package:id/widget_neural_activity" "$launcher_hierarchy"; then
      echo "AQUA_WIDGET_LAUNCHER_HOST_READY provider=$widget_provider host=$launcher_package"
      echo "AQUA_WIDGET_NEURALINK_SURFACE_READY art=widget_neural_art path=armed_on_tap activity=widget_neural_activity"
      return 0
    fi
    sleep 1
  done

  echo "The Aqua widget was not rendered by Launcher3 after pin confirmation" >&2
  grep -E "AquaCommandWidget|${launcher_package}" "$appwidget_state" >&2 || true
  [[ -n "$launcher_hierarchy" && -s "$launcher_hierarchy" ]] && sed -n '1,12p' "$launcher_hierarchy" >&2
  return 1
}

prove_neuralink_widget_activity() {
  local hierarchy_path=""
  local bounds=""
  local left=""
  local top=""
  local right=""
  local bottom=""
  local width=""
  local height=""
  local changed_pixels=""
  local first="/tmp/aqua-sentinel-v0.7.6-widget-neural-activity-a.png"
  local second="/tmp/aqua-sentinel-v0.7.6-widget-neural-activity-b.png"
  local first_crop="/tmp/aqua-sentinel-v0.7.6-widget-neural-activity-a-crop.png"
  local second_crop="/tmp/aqua-sentinel-v0.7.6-widget-neural-activity-b-crop.png"

  command -v convert >/dev/null
  command -v compare >/dev/null
  return_to_launcher
  hierarchy_path="$(dump_ui "aqua-widget-neural-activity")"
  bounds="$(ui_node_bounds "$hierarchy_path" "$package:id/widget_resize_surface")"
  if [[ -z "$bounds" ]]; then
    echo "Launcher3 did not expose the full Aqua Neuralink widget surface" >&2
    sed -n '1,16p' "$hierarchy_path" >&2 || true
    return 1
  fi

  read -r left top right bottom <<< "$bounds"
  width=$((right - left))
  height=$((bottom - top))
  if ((width <= 0 || height <= 0)); then
    echo "The Aqua Neuralink widget surface reported invalid bounds: $bounds" >&2
    return 1
  fi

  adb wait-for-device >/dev/null 2>&1
  adb exec-out screencap -p > "$first"
  test -s "$first"
  convert "$first" -crop "${width}x${height}+${left}+${top}" +repage "$first_crop"
  changed_pixels="0"
  for frame_attempt in $(seq 1 6); do
    sleep 0.27
    adb wait-for-device >/dev/null 2>&1
    adb exec-out screencap -p > "$second"
    test -s "$second"
    convert "$second" -crop "${width}x${height}+${left}+${top}" +repage "$second_crop"
    changed_pixels="$(compare -metric AE "$first_crop" "$second_crop" null: 2>&1 || true)"
    if [[ "$changed_pixels" =~ ^[0-9]+$ ]] && ((changed_pixels > 0)); then
      break
    fi
  done
  if [[ ! "$changed_pixels" =~ ^[0-9]+$ ]] || ((changed_pixels <= 0)); then
    echo "The launcher-hosted cyan/gold Neuralink activity did not move between frames" >&2
    return 1
  fi

  cp "$second" /tmp/AquaSentinelOS-v0.7.6-Neuralink-Live-Widget-Launcher.png
  echo "AQUA_WIDGET_NEURALINK_ACTIVITY_VERIFIED lanes=cyan_outbound_gold_return changed_pixels=$changed_pixels"
}

assert_widget_control_geometry() {
  local hierarchy_path="$1"
  local label="$2"

  python3 - "$hierarchy_path" "$package" "$label" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, package, label = sys.argv[1:]
nodes = {}
for node in ET.parse(path).iter("node"):
    resource_id = node.attrib.get("resource-id", "")
    if resource_id:
        nodes[resource_id] = node.attrib

def bounds(resource_name):
    resource_id = f"{package}:id/{resource_name}"
    attributes = nodes.get(resource_id)
    if not attributes:
        raise SystemExit(f"{label}: missing {resource_id}")
    match = re.fullmatch(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", attributes.get("bounds", ""))
    if not match:
        raise SystemExit(f"{label}: invalid bounds for {resource_id}")
    value = tuple(map(int, match.groups()))
    if value[2] <= value[0] or value[3] <= value[1]:
        raise SystemExit(f"{label}: empty bounds for {resource_id}: {value}")
    return value

surface = bounds("widget_resize_surface")
art = bounds("widget_neural_art")
activity = bounds("widget_neural_activity")
surface_width = surface[2] - surface[0]
surface_height = surface[3] - surface[1]
if not (surface[0] <= activity[0] <= activity[2] <= surface[2] and surface[1] <= activity[1] <= activity[3] <= surface[3]):
    raise SystemExit(f"{label}: neural activity accessibility bounds left the widget surface: surface={surface} activity={activity}")
activity_metadata_insets = (
    activity[0] - surface[0],
    activity[1] - surface[1],
    surface[2] - activity[2],
    surface[3] - activity[3],
)
max_metadata_inset = max(16, int(min(surface_width, surface_height) * 0.05))
if max(activity_metadata_insets) > max_metadata_inset or max(activity_metadata_insets) - min(activity_metadata_insets) > 2:
    raise SystemExit(
        f"{label}: neural activity accessibility metadata is asymmetrical or collapsed: "
        f"surface={surface} activity={activity} insets={activity_metadata_insets}"
    )
if not (surface[0] <= art[0] <= art[2] <= surface[2] and surface[1] <= art[1] <= art[3] <= surface[3]):
    raise SystemExit(f"{label}: approved art left the widget surface: surface={surface} art={art}")

for resource_name in ("widget_logo", "widget_action", "widget_video", "widget_photo", "widget_file"):
    control = bounds(resource_name)
    center_x = (control[0] + control[2]) / 2
    center_y = (control[1] + control[3]) / 2
    if not (art[0] <= center_x <= art[2] and art[1] <= center_y <= art[3]):
        raise SystemExit(f"{label}: {resource_name} is not aligned to the approved art: art={art} control={control}")

art_width = art[2] - art[0]
art_height = art[3] - art[1]
horizontal_gap = surface_width - art_width
vertical_gap = surface_height - art_height
is_three_by_two = 0.60 <= art_width / surface_width <= 0.72 and vertical_gap <= max(24, int(surface_height * 0.08))
if is_three_by_two:
    left_extension = art[0] - surface[0]
    right_extension = surface[2] - art[2]
    if abs(left_extension - right_extension) > max(8, int(surface_width * 0.025)):
        raise SystemExit(
            f"{label}: three-by-two approved art is not centered: "
            f"surface={surface} art={art} extensions={left_extension},{right_extension}"
        )
else:
    if horizontal_gap > max(24, int(surface_width * 0.08)) or vertical_gap > max(24, int(surface_height * 0.08)):
        raise SystemExit(
            f"{label}: approved art left a visible host surround: "
            f"surface={surface} art={art} gap={horizontal_gap}x{vertical_gap}"
        )
ratio = art_width / art_height
if not 0.45 <= ratio <= 2.25:
    raise SystemExit(f"{label}: launcher returned an unsupported host aspect: ratio={ratio:.4f} art={art}")

print(surface[2] - surface[0], surface[3] - surface[1], art_width, art_height)
PY
}

prove_widget_three_by_two() {
  local evidence="/tmp/aqua-sentinel-v0.7.6-widget-three-by-two.logcat.txt"
  local hierarchy_path=""

  adb logcat -d > "$evidence"
  if ! grep -Eq "AQUA_WIDGET_(READY|RESIZED).*layoutName=three-by-two" "$evidence"; then
    echo "Launcher3 did not select Aqua's dedicated three-by-two layout" >&2
    grep -E "AQUA_WIDGET_(READY|RESIZED)" "$evidence" >&2 || true
    return 1
  fi
  hierarchy_path="$(dump_ui "aqua-widget-three-by-two")"
  assert_widget_control_geometry "$hierarchy_path" "three-by-two" >/dev/null
  adb exec-out screencap -p > "/tmp/AquaSentinelOS-v0.7.6-Neuralink-Widget-3x2.png"
  test -s "/tmp/AquaSentinelOS-v0.7.6-Neuralink-Widget-3x2.png"
  echo "AQUA_WIDGET_3X2_PROPORTIONS_VERIFIED layout=three-by-two"
}

prove_widget_resize() {
  local label="$1"
  local axis="$2"
  local hierarchy_path=""
  local surface_bounds=""
  local before_geometry=""
  local after_geometry=""
  local left=""
  local top=""
  local right=""
  local bottom=""
  local width=""
  local height=""
  local center_x=""
  local center_y=""
  local start_x=""
  local start_y=""
  local end_x=""
  local end_y=""
  local edge_offset=""
  local resized="false"
  local evidence="/tmp/aqua-sentinel-v0.7.6-widget-resize-${label}.logcat.txt"

  return_to_launcher
  hierarchy_path="$(dump_ui "aqua-widget-resize-${label}-before")"
  before_geometry="$(assert_widget_control_geometry "$hierarchy_path" "${label}-before")"
  surface_bounds="$(ui_node_bounds "$hierarchy_path" "^$package:id/widget_resize_surface(?: |$)")"
  if [[ -z "$surface_bounds" ]]; then
    echo "Launcher3 did not expose the full Aqua widget resize surface" >&2
    return 1
  fi
  read -r left top right bottom <<< "$surface_bounds"
  width=$((right - left))
  height=$((bottom - top))
  center_x=$(((left + right) / 2))
  center_y=$(((top + bottom) / 2))
  clear_logcat

  for resize_attempt in $(seq 1 4); do
    return_to_launcher
    adb shell input swipe "$center_x" "$center_y" "$center_x" "$center_y" 1300
    sleep 1
    edge_offset=$((4 + resize_attempt * 4))
    if [[ "$axis" == "vertical" ]]; then
      start_x="$center_x"
      start_y=$((bottom + edge_offset))
      end_x="$center_x"
      end_y=$((bottom + height * (60 + resize_attempt * 10) / 100))
    else
      start_x=$((right + edge_offset))
      start_y="$center_y"
      end_x=$((right + width * (60 + resize_attempt * 10) / 100))
      end_y="$center_y"
    fi
    echo "Resizing Aqua widget $label from $start_x,$start_y to $end_x,$end_y"
    adb shell input swipe "$start_x" "$start_y" "$end_x" "$end_y" 1100
    sleep 2
    adb shell input keyevent KEYCODE_BACK || true
    if wait_for_log "AQUA_WIDGET_RESIZED id=.*size=.*layout=" "$evidence" 4; then
      resized="true"
      break
    fi
  done

  if [[ "$resized" != "true" ]]; then
    echo "Launcher3 did not produce a real widget resize callback for $label" >&2
    grep -E "AQUA_WIDGET_RESIZED|Launcher3|AndroidRuntime|FATAL EXCEPTION" "$evidence" >&2 || true
    return 1
  fi

  return_to_launcher
  hierarchy_path="$(dump_ui "aqua-widget-resize-${label}-after")"
  after_geometry="$(assert_widget_control_geometry "$hierarchy_path" "${label}-after")"
  if [[ "$before_geometry" == "$after_geometry" ]]; then
    echo "Launcher3 emitted a resize callback but Aqua's visible geometry did not change: $label" >&2
    return 1
  fi
  adb exec-out screencap -p > "/tmp/AquaSentinelOS-v0.7.6-Neuralink-Widget-Resize-${label}.png"
  test -s "/tmp/AquaSentinelOS-v0.7.6-Neuralink-Widget-Resize-${label}.png"
  echo "AQUA_WIDGET_REAL_RESIZE_VERIFIED label=$label before=$before_geometry after=$after_geometry"
}

prove_filed_today_count() {
  local hierarchy_path=""
  local filed_today=""

  return_to_launcher
  hierarchy_path="$(dump_ui "aqua-widget-filed-today")"
  filed_today="$(python3 - "$hierarchy_path" "$package:id/widget_filed_today" <<'PY'
import re
import sys
import xml.etree.ElementTree as ET

path, resource_id = sys.argv[1:]
for node in ET.parse(path).iter("node"):
    if node.attrib.get("resource-id") != resource_id:
        continue
    value = node.attrib.get("text", "").strip()
    match = re.fullmatch(r"(\d+)", value)
    if match and int(match.group(1)) > 0:
        print(match.group(1))
    break
PY
)"
  if [[ -z "$filed_today" ]]; then
    echo "The Aqua Neuralink widget did not expose a positive filed-today count" >&2
    sed -n '1,16p' "$hierarchy_path" >&2 || true
    return 1
  fi
  echo "AQUA_WIDGET_FILED_TODAY_VERIFIED count=$filed_today"
}

prove_handoff_confirmation() {
  local hierarchy_path=""
  local action_evidence="/tmp/aqua-sentinel-v0.7.6-widget-action.logcat.txt"
  local handoff_evidence="/tmp/aqua-sentinel-v0.7.6-widget-handoff.logcat.txt"
  if ! grep -Fq "AQUA_WIDGET_HANDOFF_RECEIVED mode=action" "$action_evidence" \
    && ! wait_for_log "AQUA_WIDGET_HANDOFF_RECEIVED mode=action" "$handoff_evidence" 12; then
    echo "Aqua Action never rendered its launcher-hosted RECEIVED acknowledgement" >&2
    return 1
  fi
  return_to_launcher
  for attempt in $(seq 1 8); do
    hierarchy_path="$(dump_ui "aqua-widget-handoff-confirmation-${attempt}")"
    if grep -Fq "$package:id/widget_status" "$hierarchy_path" \
      && grep -Eq 'text="(RECEIVED|AQUA HAS IT)"[^>]*resource-id="[^\"]*:id/widget_status"|resource-id="[^\"]*:id/widget_status"[^>]*text="(RECEIVED|AQUA HAS IT)"' "$hierarchy_path"; then
      echo "AQUA_WIDGET_HANDOFF_CONFIRMATION_VERIFIED"
      return 0
    fi
    sleep 0.10
  done
  echo "The Aqua widget did not expose a truthful RECEIVED state after durable handoff" >&2
  return 1
}

tap_launcher_control() {
  local mode="$1"
  local resource_id="$2"
  local text_fallback="$3"
  local hierarchy_path=""
  local bounds=""
  local left=""
  local top=""
  local right=""
  local bottom=""
  local tap_x=""
  local tap_y=""
  local width=""
  local height=""
  local changed_pixels=""
  local idle="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-idle.png"
  local active="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-jolt.png"
  local idle_crop="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-idle-crop.png"
  local active_crop="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-jolt-crop.png"
  local render_evidence="/tmp/aqua-sentinel-v0.7.6-widget-${mode}-jolt-render.logcat.txt"
  local render_observed="false"

  return_to_launcher
  for attempt in $(seq 1 20); do
    hierarchy_path="$(dump_ui "aqua-widget-${mode}-jolt-${attempt}")" || {
      sleep 1
      continue
    }
    bounds="$(ui_node_bounds "$hierarchy_path" "^$package:id/$resource_id(?: |$)")"
    if [[ -z "$bounds" ]]; then
      sleep 1
      continue
    fi
    read -r left top right bottom <<< "$bounds"
    width=$((right - left))
    height=$((bottom - top))
    tap_x=$(((left + right) / 2))
    tap_y=$(((top + bottom) / 2))
    adb exec-out screencap -p > "$idle"
    echo "Tapping launcher-hosted widget $mode control at $tap_x,$tap_y"
    adb shell input tap "$tap_x" "$tap_y"
    for render_attempt in $(seq 1 20); do
      adb logcat -d > "$render_evidence"
      if grep -Fq "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=$mode phase=outbound" "$render_evidence"; then
        render_observed="true"
        break
      fi
      sleep 0.05
    done
    if [[ "$render_observed" != "true" ]]; then
      echo "The $mode Neuralink endpoint did not render its outbound jolt after the real launcher tap" >&2
      return 1
    fi
    sleep 0.12
    adb exec-out screencap -p > "$active"
    convert "$idle" -crop "${width}x${height}+${left}+${top}" +repage "$idle_crop"
    convert "$active" -crop "${width}x${height}+${left}+${top}" +repage "$active_crop"
    changed_pixels="$(compare -metric AE "$idle_crop" "$active_crop" null: 2>&1 || true)"
    if [[ ! "$changed_pixels" =~ ^[0-9]+$ ]] || ((changed_pixels <= 0)); then
      echo "The $mode Neuralink endpoint did not visibly react to its real launcher tap" >&2
      return 1
    fi
    cp "$active" /tmp/AquaSentinelOS-v0.7.6-Neuralink-Widget-Tap-Jolt.png
    echo "AQUA_WIDGET_LAUNCHER_TAP mode=$mode resource=$resource_id"
    echo "AQUA_WIDGET_NEURAL_JOLT_PIXELS_VERIFIED mode=$mode changed_pixels=$changed_pixels"
    return 0
  done

  echo "Android did not expose the Neuralink endpoint for: $mode" >&2
  return 1
}

launcher_package="$(resolve_home_launcher_package)"
echo "AQUA_WIDGET_HOME_LAUNCHER_RESOLVED package=$launcher_package"

pin_widget_on_launcher
prove_neuralink_widget_activity
prove_widget_three_by_two
prove_widget_resize "compact" "horizontal"
prove_widget_resize "small" "vertical"
terminate_sentinel_background_process "before-five-action-sequence"
adb shell pm grant "$package" android.permission.RECORD_AUDIO

for mode in home action file photo video; do
  evidence="/tmp/aqua-sentinel-v0.7.6-widget-${mode}.logcat.txt"
  expected_route="$mode"
  [[ "$mode" == "file" ]] && expected_route="voice"
  clear_logcat
  case "$mode" in
    home) tap_launcher_control "$mode" "widget_logo" "Open Aqua Sentinel OS" ;;
    action) tap_launcher_control "$mode" "widget_action" "AQUA ACTION" ;;
    file) tap_launcher_control "$mode" "widget_file" "FILE" ;;
    photo) tap_launcher_control "$mode" "widget_photo" "PHOTO" ;;
    video) tap_launcher_control "$mode" "widget_video" "VIDEO" ;;
  esac

  received=false
  routed=false
  jolted=false
  returned=false
  arrived=false
  mic_armed=false
  for attempt in $(seq 1 24); do
    sleep 1
    adb logcat -d > "$evidence"
    if grep -Fq "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=$mode phase=outbound" "$evidence" \
      && grep -Fq "AQUA_WIDGET_NEURAL_JOLT mode=$mode phase=outbound" "$evidence"; then
      jolted=true
    fi
    if grep -Fq "AQUA_WIDGET_NEURAL_JOLT mode=$mode phase=arrived" "$evidence"; then
      arrived=true
    fi
    if grep -Fq "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=$mode phase=return" "$evidence"; then
      returned=true
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
      if [[ "$mode" == "action" ]] && grep -Fq "AQUA_CAPTURE_MIC_ARMED mode=action handler=SpeechRecognizer" "$evidence"; then
        mic_armed=true
        routed=true
      fi
    fi
    if [[ "$jolted" == "true" && "$returned" == "true" && "$arrived" == "true" && "$received" == "true" && "$routed" == "true" && ( "$mode" != "action" || "$mic_armed" == "true" ) ]]; then
      break
    fi
  done

  if [[ "$jolted" != "true" || "$returned" != "true" || "$arrived" != "true" || "$received" != "true" || "$routed" != "true" || ( "$mode" == "action" && "$mic_armed" != "true" ) ]]; then
    echo "Launcher-hosted widget tap did not light and resolve its route: $mode" >&2
    grep -E "AQUA_WIDGET|AQUA_CAPTURE|QuickCaptureActivity|AndroidRuntime|FATAL EXCEPTION" "$evidence" || true
    exit 1
  fi

  if [[ "$mode" == "action" ]]; then
    adb exec-out screencap -p > /tmp/AquaSentinelOS-v0.7.6-Widget-Action-Microphone-Armed.png
    test -s /tmp/AquaSentinelOS-v0.7.6-Widget-Action-Microphone-Armed.png
    adb shell input keyevent KEYCODE_BACK
    assert_transient_capture_returned_to_launcher "$mode"
    echo "AQUA_WIDGET_ACTION_MICROPHONE_VERIFIED handler=SpeechRecognizer"
  fi

  if [[ "$mode" == "file" || "$mode" == "photo" || "$mode" == "video" ]]; then
    adb shell input keyevent KEYCODE_BACK
    assert_transient_capture_returned_to_launcher "$mode"
  fi

  assert_no_sentinel_crash "$evidence" "widget-$mode"

  adb shell am force-stop com.android.camera2 || true
done

# The launcher tap above proves the FILE PendingIntent reaches the real voice-filing route.
# Complete the deterministic downstream filing contract separately because the headless
# emulator has no microphone input; do not mislabel synthetic speech as a launcher tap.
file_evidence="/tmp/aqua-sentinel-v0.7.6-widget-file-completion.logcat.txt"
clear_logcat
adb shell am start -W \
  -n "$capture_activity" \
  --es capture_mode file \
  --es widget_filing_text "File this preview with Aqua CRM" || true
wait_for_log "AQUA_CAPTURE_SAVED type=voice" "$file_evidence" 30
wait_for_log "AQUA_CAPTURE_BACKGROUND_COMPLETE type=voice" "$file_evidence" 30
adb logcat -d > "$file_evidence"
if grep -Fq "AQUA_FILING_CABINET_OPENED" "$file_evidence"; then
  echo "A widget quick-file action opened the File Cabinet instead of returning to Launcher3" >&2
  exit 1
fi
return_to_launcher
echo "AQUA_WIDGET_BACKGROUND_FILE_STAYED_ON_LAUNCHER"
prove_filed_today_count

repeat_evidence="/tmp/aqua-sentinel-v0.7.6-widget-action-repeat.logcat.txt"
for repeat_index in $(seq 1 5); do
  clear_logcat
  tap_ui_node \
    "Aqua Action stability run ${repeat_index}" \
    "^$package:id/widget_action(?: |$)"
  if ! wait_for_log "AQUA_CAPTURE_MIC_ARMED mode=action handler=SpeechRecognizer" "$repeat_evidence" 30; then
    echo "Aqua Action stability run $repeat_index did not arm the microphone" >&2
    exit 1
  fi
  adb shell input keyevent KEYCODE_BACK
  assert_transient_capture_returned_to_launcher "action-repeat-$repeat_index"
  assert_no_sentinel_crash "$repeat_evidence" "Aqua-Action-repeat-$repeat_index"
  sleep 2
done
echo "AQUA_WIDGET_REPEAT_STABILITY_VERIFIED runs=5"

terminate_sentinel_background_process "post-filing-process-recreation"
tap_ui_node \
  "launcher-hosted widget after process recreation" \
  "$package:id/widget_logo|Open Aqua Sentinel OS"
wait_for_log "AQUA_WIDGET_HOME_OPENED" /tmp/aqua-sentinel-v0.7.6-widget-recreated.logcat.txt 30
echo "AQUA_WIDGET_LAUNCHER_PROCESS_RECREATION_VERIFIED"
