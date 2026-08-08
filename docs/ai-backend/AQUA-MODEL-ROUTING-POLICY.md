# Aqua model routing policy

Policy version: `1.0.0`

This is the ecosystem-wide voice and model-routing contract. Runtime constants live in
`backend/model-policy.mjs`; application adapters must consume the policy without copying API keys
or inventing alternate model aliases.

| Surface | Routine navigation and simple questions | Complex, consequential, or tool-backed work | Transcription |
| --- | --- | --- | --- |
| Aqua Sentinel OS | Full `gpt-realtime-2.1` voice session by default; Mini is permitted only for an explicitly isolated simple text operation | Full `gpt-realtime-2.1` | `gpt-4o-transcribe` |
| Satellite Aqua apps | `gpt-realtime-2.1-mini` | Escalate to `gpt-realtime-2.1` | `gpt-4o-transcribe` |

## Sentinel continuity rule

When an active Sentinel conversation opens, navigates, or queries a satellite app, the satellite is
a tool/data source inside that Sentinel conversation. It must carry
`conversationOrigin: "aqua-sentinel-os"` and retain full `gpt-realtime-2.1`. It must not create a
new Mini persona or switch the user's active voice, memory, instructions, transcript model, or
conversation context. Mini is only the default for a satellite-local conversation that did not
originate in Sentinel.

All model selection and OpenAI API access remain server-side. The client may receive only a
short-lived Realtime session or a protected SDP answer. Before destructive, external, financial,
filing, publishing, employment, legal, or otherwise sensitive action, Aqua must repeat the exact
understood instruction and receive explicit confirmation. A transcript is evidence of what the
speech recognizer returned; it is not proof that an external action succeeded.
