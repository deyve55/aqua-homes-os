# Aqua Sentinel OS Home Snapshot Contract v1.0

Governance authority: Aqua Software Inc. product owner

Company: Aqua Software Inc.

Orchestrator: Aqua Sentinel OS

## Purpose

Every Aqua satellite publishes a compact, current summary of its own landing
page. Aqua Sentinel OS uses that summary for the centered carousel card and the
two intelligence cards below it. The satellite remains the system of record.
Sentinel never invents operational numbers and never reads a satellite's local
database directly.

## Android request

Sentinel sends an explicit broadcast to the first installed package registered
for the selected app.

```text
action: com.aquasoftware.sentinel.REQUEST_HOME_SNAPSHOT
contract_version: 1.0
request_id: unique UUID
response_action: com.aquasoftware.sentinel.HOME_SNAPSHOT_RESPONSE
response_package: com.aquahomes.sentinel
```

The satellite must register a receiver for that request action. It should build
the snapshot from its current confirmed home-screen state, then send an explicit
response broadcast to `com.aquahomes.sentinel`.

```text
action: com.aquasoftware.sentinel.HOME_SNAPSHOT_RESPONSE
package: com.aquahomes.sentinel
request_id: exact request UUID
snapshot_json: UTF-8 JSON, maximum 384 KiB
```

Sentinel accepts a response only when Android reports that the sender UID owns
the exact installed package to which Sentinel sent the request. Unknown,
unsolicited, malformed, or oversized responses are rejected.

## Snapshot JSON

```json
{
  "capturedAt": "2026-07-31T12:00:00Z",
  "previewImage": {
    "mimeType": "image/webp",
    "base64": "COMPRESSED_CURRENT_HOME_SCREEN_THUMBNAIL"
  },
  "preview": {
    "eyebrow": "AQUA CRM",
    "title": "Good morning, <display_name>",
    "metric": "Active Jobs",
    "value": "<confirmed_count>",
    "tiles": ["Pipeline", "Clients", "Schedule"]
  },
  "primary": {
    "title": "Customer Operations",
    "value": "<confirmed_summary>",
    "detail": "<confirmed_attention_summary>"
  },
  "secondary": {
    "title": "Today",
    "value": "<confirmed_schedule_summary>",
    "detail": "<confirmed_next_item>"
  }
}
```

`previewImage` is the app's compressed current home-screen thumbnail, not its
launcher icon. Use WebP when possible and PNG only when necessary. Refresh the
thumbnail whenever the landing page materially changes. Sentinel accepts only
WebP or PNG image data from the verified responding app.

All fields are display summaries, not commands. Values must come from confirmed
or truthfully labeled local state. Do not publish placeholder customer names,
amounts, counts, or completion claims as live data.

## Refresh behavior

Sentinel requests a snapshot:

- when Sentinel opens or returns to the foreground;
- whenever a different carousel card becomes centered;
- once per minute while Sentinel remains visible.

The latest verified snapshot is cached privately by Sentinel for offline
display. While refreshing, Sentinel may show the verified cached snapshot with
`cached-refreshing`. Without a verified snapshot it displays
`awaiting-live-connection`; it does not fabricate a live value.

## Required adoption by current satellites

- Aqua CRM
- AquaDraw
- AquaCam
- Aqua Knowledge Vault
- Aqua Timesheet
- Aqua Books
- Aqua Receipts

Each satellite must add the request receiver, generate its own home snapshot,
and pass a conformance test proving that the two lower Sentinel cards use the
same snapshot as its carousel preview.
