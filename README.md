# aqua-homes-os
Aqua Homes AI Construction OS prototype

## Structured App Preview

The active lightweight trial prototype lives in `structured-app/` and can be previewed directly from `structured-app/index.html`.

### Local phone-trial preview

1. Open `structured-app/index.html` in a browser for a local desktop preview.
2. For a phone-sized trial preview, use the browser's responsive/device toolbar and select a mobile viewport.
3. Keep this structured preview lightweight: do not copy the locked v51 HTML reference, add large images, or embed base64 assets.

The large `AquaHomesOS_v51_SOLID_GOLD_BAR_GRADIENT_EDGES_APP-2.html` file is a locked visual reference only and must remain read-only.

## Aqua Sentinel Traffic Cop

`backend/worker.mjs` is the Cloudflare Worker entry for Live Aqua and the
Sentinel SDK 1.1 File Cabinet relay. It exposes:

- `GET /health`
- `POST /gateway` for authenticated Live Aqua JSON-RPC
- `POST /api/sentinel/v1/commands` for the allowlisted
  `file_cabinet.deliver` relay to AquaPulse

The relay accepts only `aqua-sentinel-sdk-v1` version `1.1.0`, the
`com.aquahomes.sentinel` source package, and the
`com.aquasoftware.aquapulse` target package. It validates expiry and linked
identities, forwards the original request body, and returns success only when
AquaPulse supplies a matching typed acknowledgement.

Before production deployment, install these server-only Worker secrets:

- `OPENAI_API_KEY`
- `AQUA_SESSION_SECRET`
- `AQUA_OWNER_EMAIL`
- `AQUA_OWNER_PASSWORD_HASH`
- `AQUA_ADAPTER_CREDENTIALS_JSON`
- `SENTINEL_CLIENT_TOKEN`
- `AQUA_PULSE_SITE_TOKEN`

Do not place secret values in the repository, Android APK, client web bundle,
documentation, screenshots, or ordinary logs. Validate with `npm test` and
`npm run check:worker`; deploy with `npm run deploy:worker` only after the
secrets are installed.
