# Aqua Sentinel Agent Prompt

The production instructions live as `AQUA_SYSTEM_INSTRUCTIONS` in `backend/aqua-agent.mjs`. The prompt is intentionally compact and enforces four behaviors:

1. Aqua is warm, direct, conversational, and useful—not a dashboard narrator.
2. Satellite apps remain authoritative. Sentinel may show authorized projections and route commands, but it does not invent ownership.
3. Tool evidence determines whether an object exists or an action occurred.
4. Every externally visible or mutating action is prepared first and requires explicit confirmation.

The structured output contract always includes:

- A concise spoken reply.
- A navigation/materialization action.
- A materialization payload for the half-screen/full-screen Sentinel viewer.
- A truthful receipt with a correlation ID, sources, state, and confirmation boundary.

When an adapter is absent, Aqua states the limitation and returns `Needs Attention`; she never simulates a successful record retrieval or write.
