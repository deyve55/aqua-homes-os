import { createHash } from 'node:crypto';
import { z } from 'zod';

const COMMAND = 'capture.provisional_financial_event';
const CONTRACT = 'aqua-sentinel-sdk-v1';
const VERSION = '1.1.0';
const SOURCE = Object.freeze({
  appId: 'aqua-sentinel-os',
  package: 'com.aquahomes.sentinel',
});
const TARGET = Object.freeze({
  appId: 'aqua-pulse',
  package: 'com.aquasoftware.aquapulse',
});
const RESPONSE_LIMIT = 64_000;
const TIMEOUT_MS = 20_000;
const DEFAULT_ENDPOINT =
  'https://aqua-pulse.deyve-docarm-5626.chatgpt.site/api/sentinel/v1/financial-events';

const identifier = z.string().min(8).max(200);

const PulseFinancialAcknowledgementSchema = z.object({
  ok: z.literal(true),
  contract: z.literal(CONTRACT),
  version: z.literal(VERSION),
  command: z.literal(COMMAND),
  eventId: identifier,
  correlationId: identifier,
  idempotencyKey: identifier,
  acknowledgementToken: identifier,
  acknowledgementId: identifier,
  status: z.enum(['accepted_and_saved', 'duplicate_ignored']),
  acknowledgedAt: z.string().datetime({ offset: true }),
}).strict();

function stableIdentifier(prefix, tenantId, captureId) {
  const digest = createHash('sha256')
    .update(`${tenantId}\n${captureId}`)
    .digest('hex');
  return `${prefix}-${digest.slice(0, 40)}`;
}

function endpoint(env) {
  const url = new URL(env.AQUA_PULSE_FINANCIAL_ENDPOINT || DEFAULT_ENDPOINT);
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'aqua-pulse.deyve-docarm-5626.chatgpt.site' ||
    url.pathname !== '/api/sentinel/v1/financial-events' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) throw new Error('AquaPulse command endpoint is not allowlisted.');
  return url.toString();
}

function exactAcknowledgement(envelope, acknowledgement) {
  return acknowledgement.eventId === envelope.eventId
    && acknowledgement.correlationId === envelope.correlationId
    && acknowledgement.idempotencyKey === envelope.idempotencyKey
    && acknowledgement.acknowledgementToken === envelope.acknowledgementToken;
}

function capturedAt(uiContext, fallback) {
  const value = Number(uiContext?.localExpenseCapturedAt);
  if (!Number.isFinite(value) || value <= 0) return fallback.toISOString();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : fallback.toISOString();
}

export function buildPulseFinancialEnvelope({ identity, capture, uiContext = {}, now = new Date() }) {
  if (
    !identity?.tenantId ||
    !capture?.captureId ||
    !['provisional', 'single'].includes(capture.resolution)
  ) {
    throw new Error('AquaPulse delivery requires one valid File Cabinet expense capture.');
  }
  const eventId = stableIdentifier('evt', identity.tenantId, capture.captureId);
  const correlationId = stableIdentifier('cor', identity.tenantId, capture.captureId);
  const idempotencyKey = stableIdentifier('idem', identity.tenantId, capture.captureId);
  const acknowledgementToken = stableIdentifier('ack-token', identity.tenantId, capture.captureId);
  const occurredAt = capturedAt(uiContext, now);
  const selected = capture.selected;
  const entityRef = {
    tenantId: identity.tenantId,
    ...(selected?.kind === 'client' ? { customerId: selected.sourceRecordId } : {}),
    ...(selected?.kind === 'job' ? { jobId: selected.sourceRecordId } : {}),
    displayName: selected?.name || capture.customerQuery,
    resolution: selected ? 'shared' : 'sentinel-provisional',
  };
  return {
    contract: CONTRACT,
    version: VERSION,
    command: COMMAND,
    eventId,
    correlationId,
    idempotencyKey,
    acknowledgementToken,
    tenantId: identity.tenantId,
    source: SOURCE,
    target: TARGET,
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 5 * 60_000).toISOString(),
    event: {
      schemaVersion: '1.0',
      eventId,
      correlationId,
      idempotencyKey,
      occurredAt,
      amount: {
        value: (capture.amountMinor / 100).toFixed(2),
        currency: capture.currencyCode,
      },
      direction: 'money_out',
      counterparty: {
        displayName: capture.merchant,
        type: 'vendor',
      },
      entityRef,
      fileCabinetRef: {
        objectId: capture.captureId,
        uri: `aqua-file://sentinel/${capture.captureId}`,
      },
      category: 'uncategorized',
      note: `${capture.merchant} for ${selected?.name || capture.customerQuery}`,
      scope: 'business',
      source: {
        app: SOURCE.package,
        commandId: capture.captureId,
      },
    },
  };
}

export function createAquaPulseClient(env, { fetchImpl = fetch } = {}) {
  return Object.freeze({
    async deliverQuickExpense({ identity, capture, uiContext, now = new Date() }) {
      if (
        typeof env.SENTINEL_CLIENT_TOKEN !== 'string' ||
        env.SENTINEL_CLIENT_TOKEN.length < 32 ||
        typeof env.AQUA_PULSE_SITE_TOKEN !== 'string' ||
        env.AQUA_PULSE_SITE_TOKEN.length < 32
      ) {
        return { status: 'not_configured', acknowledgementId: '', acknowledgedAt: '' };
      }
      let target;
      try { target = endpoint(env); }
      catch { return { status: 'not_configured', acknowledgementId: '', acknowledgedAt: '' }; }

      const envelope = buildPulseFinancialEnvelope({ identity, capture, uiContext, now });
      let response;
      try {
        response = await fetchImpl(target, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${env.SENTINEL_CLIENT_TOKEN}`,
            'oai-sites-authorization': `Bearer ${env.AQUA_PULSE_SITE_TOKEN}`,
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(envelope),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
      } catch {
        return {
          status: 'queued',
          correlationId: envelope.correlationId,
          acknowledgementId: '',
          acknowledgedAt: '',
        };
      }

      const raw = await response.text();
      if (
        !response.headers.get('content-type')?.toLowerCase().includes('application/json') ||
        new TextEncoder().encode(raw).byteLength > RESPONSE_LIMIT
      ) {
        return {
          status: 'queued',
          correlationId: envelope.correlationId,
          acknowledgementId: '',
          acknowledgedAt: '',
        };
      }
      let decoded;
      try { decoded = JSON.parse(raw); }
      catch { decoded = null; }
      const acknowledgement = PulseFinancialAcknowledgementSchema.safeParse(decoded);
      if (!response.ok || !acknowledgement.success || !exactAcknowledgement(envelope, acknowledgement.data)) {
        return {
          status: 'queued',
          correlationId: envelope.correlationId,
          acknowledgementId: '',
          acknowledgedAt: '',
        };
      }
      return {
        status: acknowledgement.data.status,
        correlationId: acknowledgement.data.correlationId,
        acknowledgementId: acknowledgement.data.acknowledgementId,
        acknowledgedAt: acknowledgement.data.acknowledgedAt,
      };
    },
  });
}
