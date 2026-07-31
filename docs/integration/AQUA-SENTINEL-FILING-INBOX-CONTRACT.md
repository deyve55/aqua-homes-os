# Aqua Sentinel Filing Inbox Contract

Contract version: `1.0`

Final authority: authenticated Aqua owner  
Company: Aqua Software Inc.  
Orchestrator: Aqua Sentinel OS

## Purpose

The Command Center widget is a rapid capture surface. Voice, photo, and video
evidence is accepted immediately and placed in one Sentinel filing inbox. The
widget closes when capture finishes. Sentinel later presents only items that
genuinely require the owner's filing judgment.

## Truthful states

- `Saved Locally`: protected on the device; no remote receipt exists yet.
- `Queued`: a high-confidence destination was selected and remote filing is
  waiting for the owning app/gateway.
- `Syncing`: a request is in flight.
- `Confirmed`: the owning app/backend returned a filing receipt.
- `Needs Attention`: the destination is unclear and Aqua must ask the owner.
- `Failed with Report`: filing failed with a retained diagnostic record.

Capture acknowledgement must never be represented as remote confirmation.

## Capture actions

| Action | Android action | Deep link |
|---|---|---|
| Ask Aqua | `com.aquasoftware.sentinel.action.ASK` | `aquasentinel://ask` |
| Quick file | `com.aquasoftware.sentinel.action.VOICE` | `aquasentinel://voice` |
| Photo | `com.aquasoftware.sentinel.action.PHOTO` | `aquasentinel://photo` |
| Video | `com.aquasoftware.sentinel.action.VIDEO` | `aquasentinel://video` |

The integrated widget uses explicit component intents. The action/deep-link
surface is retained so the separately packaged Command Center widget can call
the same Sentinel capture path when its missing source is restored.
For compatibility with the external widget, Sentinel also accepts
`com.aquasoftware.sentinel.action.FILE` and `aquasentinel://file` as aliases
for the same quick voice-filing path.

## Item fields

- `id`
- `contractVersion`
- `type`: `voice`, `photo`, or `video`
- `title`
- `note`
- `evidencePath`
- `destination`
- `confidence`
- `needsClarification`
- `state`
- `createdAt`
- `createdLabel`

Queue metadata is AES-GCM encrypted with a non-exportable Android Keystore
key. Photo and video evidence is stored in Sentinel's private application
directory and shared with the selected camera only through a single granted
content URI.

## Routing behavior

Explicit owner language may route without a follow-up question. For example, a
request to file an expense for the painting company becomes a queued Aqua Books
item for that entity. It is not labeled `Confirmed` until Aqua Books or the
Brain gateway returns a receipt.

Ambiguous captures retain their original evidence and use `Needs Attention`.
The Sentinel file-cabinet screen displays the pending count and the question
context Aqua needs to resolve later. Sentinel gives one spoken pending brief
when the authenticated owner opens the app. Choosing `Tell Aqua where this
goes` records the owner's answer against that exact item, changes it to
`Queued`, and does not create a duplicate capture.

Location, OCR, vendor matching, job proximity, historical owner choices, and
cross-app records may raise routing confidence only after the applicable app
publishes verified evidence. Sentinel must not invent a job association.
