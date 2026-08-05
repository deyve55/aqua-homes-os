import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

export const AQUA_PULSE_COMMAND_ENDPOINT =
  'https://aqua-pulse.deyve-docarm-5626.chatgpt.site/api/sentinel/v1/commands';
export const SENTINEL_FILE_CABINET_PATH = '/api/sentinel/v1/commands';

const MAX_BODY_BYTES = 250_000;
const MAX_RESPONSE_BYTES = 64_000;
const RELAY_TIMEOUT_MS = 20_000;
const AUTH_DIGEST_KEY = 'aqua-sentinel-traffic-cop-auth-v1';

const identifier = z.string().min(8).max(200);
const appIdentifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100);
const packageIdentifier = z.string()
  .regex(/^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/)
  .max(200);

const FileCabinetEnvelopeSchema = z.object({
  contract: z.literal('aqua-sentinel-sdk-v1'),
  version: z.literal('1.1.0'),
  command: z.literal('file_cabinet.deliver'),
  eventId: identifier,
  correlationId: identifier,
  idempotencyKey: identifier,
  fileCabinetItemId: identifier,
  acknowledgementToken: identifier,
  tenantId: z.string().min(3).max(160),
  legalEntityId: z.string().min(3).max(160).optional(),
  source: z.object({
    appId: appIdentifier,
    package: packageIdentifier,
  }).strict(),
  target: z.object({
    appId: appIdentifier,
    package: packageIdentifier,
  }).strict(),
  issuedAt: z.string().datetime({ offset: true }),
  expiresAt: z.string().datetime({ offset: true }),
  item: z.object({
    scope: z.enum(['business', 'personal']),
    title: z.string().min(1).max(240),
    details: z.string().max(4_000),
    itemType: z.string().min(1).max(80),
    fileCabinetRef: z.string().min(1).max(1_000).startsWith(
      'content://com.aquahomes.sentinel.filecabinet/one-time/',
    ),
    entityReference: z.object({
      authority: z.literal('aqua-crm'),
      customerId: z.string().min(1).max(200),
      jobId: z.string().min(1).max(200),
    }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    evidence: z.object({
      authorityAppId: appIdentifier,
      sourceRecordId: z.string().min(1).max(200),
      contentType: z.string().min(3).max(160),
      sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    }).strict(),
  }).strict(),
}).strict();

const PulseAcknowledgementSchema = z.object({
  ok: z.literal(true),
  contract: z.literal('aqua-sentinel-sdk-v1'),
  version: z.literal('1.1.0'),
  command: z.literal('file_cabinet.deliver'),
  eventId: identifier,
  correlationId: identifier,
  idempotencyKey: identifier,
  fileCabinetItemId: identifier,
  acknowledgementToken: identifier,
  acknowledgementId: identifier,
  status: z.enum(['accepted_and_saved', 'duplicate_ignored']),
  acknowledgedAt: z.string().datetime({ offset: true }),
  fileCabinetRef: z.string().min(1).max(1_000),
  message: z.string().max(1_000).optional(),
}).strict();

function json(value, status) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
      'referrer-policy': 'no-referrer',
      'x-content-type-options': 'nosniff',
    },
  });
}

function digest(value) {
  return createHmac('sha256', AUTH_DIGEST_KEY).update(value).digest();
}

export function bearerTokenMatches(header, expectedToken) {
  if (typeof expectedToken !== 'string' || expectedToken.length < 32) return false;
  const match = /^Bearer ([^\s]+)$/.exec(header ?? '');
  if (!match) return false;
  return timingSafeEqual(digest(match[1]), digest(expectedToken));
}

function pulseEndpoint(env) {
  const value = env.AQUA_PULSE_COMMAND_ENDPOINT || AQUA_PULSE_COMMAND_ENDPOINT;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'aqua-pulse.deyve-docarm-5626.chatgpt.site' ||
    url.pathname !== '/api/sentinel/v1/commands' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error('AquaPulse command endpoint is not allowlisted.');
  }
  return url.toString();
}

async function readEnvelope(request) {
  const declared = Number.parseInt(request.headers.get('content-length') ?? '', 10);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return { error: json({ ok: false, status: 'payload_too_large' }, 413) };
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return { error: json({ ok: false, status: 'payload_too_large' }, 413) };
  }
  try {
    return { raw, value: JSON.parse(raw) };
  } catch {
    return { error: json({ ok: false, status: 'invalid_json' }, 400) };
  }
}

function validTimeWindow(envelope, now) {
  const issuedAt = Date.parse(envelope.issuedAt);
  const expiresAt = Date.parse(envelope.expiresAt);
  return (
    issuedAt <= now.getTime() + 60_000 &&
    expiresAt > now.getTime() &&
    expiresAt > issuedAt &&
    expiresAt - issuedAt <= 10 * 60_000
  );
}

function tenantAllowed(value, configuredTenants) {
  let tenantIds;
  try {
    tenantIds = JSON.parse(configuredTenants ?? '');
  } catch {
    return null;
  }
  if (
    !Array.isArray(tenantIds) ||
    tenantIds.length === 0 ||
    tenantIds.some((tenantId) => typeof tenantId !== 'string' || tenantId.length < 3)
  ) {
    return null;
  }
  return tenantIds.includes(value);
}

function acknowledgementMatches(envelope, acknowledgement) {
  return (
    acknowledgement.eventId === envelope.eventId &&
    acknowledgement.correlationId === envelope.correlationId &&
    acknowledgement.idempotencyKey === envelope.idempotencyKey &&
    acknowledgement.fileCabinetItemId === envelope.fileCabinetItemId &&
    acknowledgement.acknowledgementToken === envelope.acknowledgementToken &&
    acknowledgement.fileCabinetRef === envelope.item.fileCabinetRef
  );
}

export async function relayFileCabinetDelivery(
  request,
  env,
  { fetchImpl = fetch, now = new Date() } = {},
) {
  const serviceToken = env.SENTINEL_CLIENT_TOKEN ?? '';
  const siteToken = env.AQUA_PULSE_SITE_TOKEN ?? '';
  if (!serviceToken || !siteToken) {
    return json({ ok: false, status: 'relay_not_configured' }, 503);
  }
  if (!bearerTokenMatches(request.headers.get('authorization'), serviceToken)) {
    return json({ ok: false, status: 'unauthorized' }, 401);
  }

  const parsedBody = await readEnvelope(request);
  if (parsedBody.error) return parsedBody.error;
  const parsedEnvelope = FileCabinetEnvelopeSchema.safeParse(parsedBody.value);
  if (!parsedEnvelope.success || !validTimeWindow(parsedEnvelope.data, now)) {
    return json({ ok: false, status: 'invalid_envelope' }, 400);
  }
  if (
    parsedEnvelope.data.source.appId !== 'aqua-sentinel-os' ||
    parsedEnvelope.data.source.package !== 'com.aquahomes.sentinel' ||
    parsedEnvelope.data.target.appId !== 'aqua-pulse' ||
    parsedEnvelope.data.target.package !== 'com.aquasoftware.aquapulse'
  ) {
    return json({ ok: false, status: 'invalid_route' }, 400);
  }
  const allowedTenant = tenantAllowed(
    parsedEnvelope.data.tenantId,
    env.AQUA_SENTINEL_TENANT_IDS_JSON,
  );
  if (allowedTenant === null) {
    return json({ ok: false, status: 'relay_not_configured' }, 503);
  }
  if (!allowedTenant) {
    return json({ ok: false, status: 'tenant_denied' }, 403);
  }

  let endpoint;
  try {
    endpoint = pulseEndpoint(env);
  } catch {
    return json({ ok: false, status: 'relay_not_configured' }, 503);
  }

  let upstream;
  try {
    upstream = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${serviceToken}`,
        'oai-sites-authorization': `Bearer ${siteToken}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: parsedBody.raw,
      signal: AbortSignal.timeout(RELAY_TIMEOUT_MS),
    });
  } catch {
    return json({ ok: false, status: 'upstream_unavailable' }, 504);
  }

  const contentType = upstream.headers.get('content-type') ?? '';
  const responseText = await upstream.text();
  if (
    !contentType.toLowerCase().includes('application/json') ||
    new TextEncoder().encode(responseText).byteLength > MAX_RESPONSE_BYTES
  ) {
    return json({ ok: false, status: 'invalid_upstream_response', upstreamStatus: upstream.status }, 502);
  }

  let acknowledgement;
  try {
    acknowledgement = JSON.parse(responseText);
  } catch {
    return json({ ok: false, status: 'invalid_upstream_response', upstreamStatus: upstream.status }, 502);
  }
  if (!upstream.ok) {
    return json({ ok: false, status: 'upstream_rejected', upstreamStatus: upstream.status }, 502);
  }
  const parsedAcknowledgement = PulseAcknowledgementSchema.safeParse(acknowledgement);
  if (
    !parsedAcknowledgement.success ||
    !acknowledgementMatches(parsedEnvelope.data, parsedAcknowledgement.data)
  ) {
    return json({ ok: false, status: 'acknowledgement_mismatch', upstreamStatus: upstream.status }, 502);
  }

  return json(parsedAcknowledgement.data, upstream.status);
}
