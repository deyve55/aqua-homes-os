import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword } from '../backend/auth.mjs';
import { AquaGatewayDurableObject, createWorkerHandler } from '../backend/worker.mjs';
import { createAquaPulseClient } from '../backend/aqua-pulse-client.mjs';

class MemoryStorage {
  constructor(seed = new Map()) {
    this.values = seed;
  }
  async get(key) { return structuredClone(this.values.get(key)); }
  async put(key, value) { this.values.set(key, structuredClone(value)); }
  async delete(key) { this.values.delete(key); }
}

class FakeState {
  constructor(seed) { this.storage = new MemoryStorage(seed); }
  blockConcurrencyWhile(callback) { return callback(); }
}

const ownerActivationCode = 'temporary-test-activation-code';
const sentinelClientToken = 'test-sentinel-client-token-with-sufficient-entropy';
const pulseSiteToken = 'test-private-site-token-with-sufficient-entropy';
const env = Object.freeze({
  OPENAI_API_KEY: 'test-openai-key',
  OPENAI_MODEL: 'gpt-5.6',
  AQUA_SESSION_SECRET: 'worker-session-secret-with-sufficient-entropy',
  AQUA_OWNER_EMAIL: 'owner@example.com',
  AQUA_OWNER_PASSWORD_HASH: hashPassword(ownerActivationCode, 'worker-test-salt'),
  SENTINEL_CLIENT_TOKEN: sentinelClientToken,
  AQUA_PULSE_SITE_TOKEN: pulseSiteToken,
  AQUA_SENTINEL_TENANT_IDS_JSON: JSON.stringify(['tenant-aqua-homes']),
  AQUA_PULSE_COMMAND_ENDPOINT:
    'https://aqua-pulse.deyve-docarm-5626.chatgpt.site/api/sentinel/v1/commands',
  AQUA_PULSE_FINANCIAL_ENDPOINT:
    'https://aqua-pulse.deyve-docarm-5626.chatgpt.site/api/sentinel/v1/financial-events',
  AQUA_ADAPTER_CREDENTIALS_JSON: JSON.stringify({
    receipts: {
      key: 'receipts-adapter-key-with-sufficient-entropy',
      tenantIds: ['aqua-homes'],
    },
  }),
});

function rpc(id, method, params = {}) {
  return { jsonrpc: '2.0', id, method, params };
}

function post(body, headers = {}) {
  return new Request('https://gateway.example/gateway', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

function fileCabinetEnvelope(now = new Date()) {
  const eventId = 'evt-11111111-1111-4111-8111-111111111111';
  const correlationId = 'cor-22222222-2222-4222-8222-222222222222';
  const idempotencyKey = 'idem-33333333-3333-4333-8333-333333333333';
  return {
    contract: 'aqua-sentinel-sdk-v1',
    version: '1.1.0',
    command: 'file_cabinet.deliver',
    eventId,
    correlationId,
    idempotencyKey,
    fileCabinetItemId: 'item-55555555-5555-4555-8555-555555555555',
    acknowledgementToken: 'ack-token-44444444-4444-4444-8444-444444444444',
    tenantId: 'tenant-aqua-homes',
    legalEntityId: 'entity-aqua-software-inc',
    source: {
      appId: 'aqua-sentinel-os',
      package: 'com.aquahomes.sentinel',
    },
    target: {
      appId: 'aqua-pulse',
      package: 'com.aquasoftware.aquapulse',
    },
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 5 * 60_000).toISOString(),
    item: {
      scope: 'business',
      title: 'AquaPulse File Cabinet conformance',
      details: 'A non-bookkeeping conformance record.',
      itemType: 'conformance_test',
      fileCabinetRef:
        'content://com.aquahomes.sentinel.filecabinet/one-time/item-55555555-5555-4555-8555-555555555555',
      createdAt: now.toISOString(),
      evidence: {
        authorityAppId: 'aqua-sentinel-os',
        sourceRecordId: 'source-conformance-001',
        contentType: 'application/json',
        sha256: 'b50f108ae9bf5ce3fa893131f0701fe9431ed50a5f1db0ebd639c18b446aeeae',
      },
    },
  };
}

function fileCabinetRequest(envelope, authorization = `Bearer ${sentinelClientToken}`) {
  return new Request('https://gateway.example/api/sentinel/v1/commands', {
    method: 'POST',
    headers: { authorization, 'content-type': 'application/json' },
    body: JSON.stringify(envelope),
  });
}

function resolvedQuickExpense() {
  return {
    captureId: 'capture-11111111-1111-4111-8111-111111111111',
    amountMinor: 50_000,
    currencyCode: 'USD',
    merchant: 'Home Depot',
    customerQuery: 'Carly',
    resolution: 'provisional',
    selected: null,
    candidates: [],
    crmConnected: true,
    reconciliationState: 'Unreconciled',
  };
}

test('AquaPulse client sends the stable financial event twice and accepts exact acknowledgements', async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    const envelope = JSON.parse(init.body);
    return Response.json({
      ok: true,
      contract: envelope.contract,
      version: envelope.version,
      command: envelope.command,
      eventId: envelope.eventId,
      correlationId: envelope.correlationId,
      idempotencyKey: envelope.idempotencyKey,
      acknowledgementToken: envelope.acknowledgementToken,
      acknowledgementId: 'ack-id-77777777-7777-4777-8777-777777777777',
      status: calls.length === 1 ? 'accepted_and_saved' : 'duplicate_ignored',
      acknowledgedAt: '2026-08-06T16:00:01.000Z',
    }, { status: calls.length === 1 ? 201 : 200 });
  };
  const client = createAquaPulseClient(env, { fetchImpl });
  const delivery = {
    identity: { tenantId: 'tenant-aqua-homes' },
    capture: resolvedQuickExpense(),
    uiContext: { localExpenseCapturedAt: Date.parse('2026-08-06T15:59:58.000Z') },
    now: new Date('2026-08-06T16:00:00.000Z'),
  };
  const first = await client.deliverQuickExpense(delivery);
  const duplicate = await client.deliverQuickExpense(delivery);
  assert.equal(first.status, 'accepted_and_saved');
  assert.equal(duplicate.status, 'duplicate_ignored');
  assert.equal(duplicate.acknowledgementId, first.acknowledgementId);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].init.body, calls[1].init.body);
  const packet = JSON.parse(calls[0].init.body);
  assert.equal(packet.command, 'capture.provisional_financial_event');
  assert.equal(packet.event.amount.value, '500.00');
  assert.equal(packet.event.counterparty.displayName, 'Home Depot');
  assert.equal(packet.event.entityRef.displayName, 'Carly');
  assert.equal(packet.event.entityRef.resolution, 'sentinel-provisional');
  assert.equal(packet.event.fileCabinetRef.objectId, resolvedQuickExpense().captureId);
  assert.match(packet.event.fileCabinetRef.uri, /^aqua-file:\/\/sentinel\//);
  assert.equal(packet.event.scope, 'business');
});

test('Worker entry exposes only health, gateway, Realtime, and the protected File Cabinet relay', async () => {
  const durable = { fetch: async () => new Response('ok') };
  const handler = createWorkerHandler();
  const binding = { idFromName: (name) => name, get: () => durable };
  assert.equal((await handler.fetch(
    new Request('https://gateway.example/health'),
    { AQUA_GATEWAY: binding },
  )).status, 200);
  assert.equal((await handler.fetch(
    new Request('https://gateway.example/realtime', { method: 'POST', body: 'v=0' }),
    { AQUA_GATEWAY: binding },
  )).status, 200);
  assert.equal((await handler.fetch(
    new Request('https://gateway.example/private'),
    { AQUA_GATEWAY: binding },
  )).status, 404);
});

test('File Cabinet relay rejects missing credentials and invalid bearer tokens', async () => {
  const handler = createWorkerHandler({ fetchImpl: async () => {
    throw new Error('The upstream must not be called.');
  } });
  const envelope = fileCabinetEnvelope();

  const unconfigured = await handler.fetch(fileCabinetRequest(envelope), {
    AQUA_PULSE_SITE_TOKEN: pulseSiteToken,
  });
  assert.equal(unconfigured.status, 503);
  assert.equal((await unconfigured.json()).status, 'relay_not_configured');

  const denied = await handler.fetch(fileCabinetRequest(envelope, 'Bearer wrong-token'), env);
  assert.equal(denied.status, 401);
  assert.equal((await denied.json()).status, 'unauthorized');
});

test('File Cabinet relay sends the identical SDK 1.1 packet twice and preserves typed acknowledgements', async () => {
  const envelope = fileCabinetEnvelope();
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    return Response.json({
      ok: true,
      contract: envelope.contract,
      version: envelope.version,
      command: envelope.command,
      eventId: envelope.eventId,
      correlationId: envelope.correlationId,
      idempotencyKey: envelope.idempotencyKey,
      fileCabinetItemId: envelope.fileCabinetItemId,
      acknowledgementToken: envelope.acknowledgementToken,
      acknowledgementId: 'ack-id-66666666-6666-4666-8666-666666666666',
      status: calls.length === 1 ? 'accepted_and_saved' : 'duplicate_ignored',
      acknowledgedAt: '2026-08-05T12:00:01.000Z',
      fileCabinetRef: envelope.item.fileCabinetRef,
    }, { status: calls.length === 1 ? 201 : 200 });
  };
  const handler = createWorkerHandler({ fetchImpl });

  const first = await handler.fetch(fileCabinetRequest(envelope), env);
  const second = await handler.fetch(fileCabinetRequest(envelope), env);
  assert.equal(first.status, 201);
  const firstAcknowledgement = await first.json();
  assert.equal(firstAcknowledgement.status, 'accepted_and_saved');
  assert.equal(second.status, 200);
  const duplicateAcknowledgement = await second.json();
  assert.equal(duplicateAcknowledgement.status, 'duplicate_ignored');
  assert.equal(duplicateAcknowledgement.acknowledgementId, firstAcknowledgement.acknowledgementId);
  assert.equal(duplicateAcknowledgement.acknowledgedAt, firstAcknowledgement.acknowledgedAt);
  assert.equal(calls.length, 2);
  assert.equal(
    calls[0].url,
    'https://aqua-pulse.deyve-docarm-5626.chatgpt.site/api/sentinel/v1/commands',
  );
  assert.equal(calls[0].init.headers.authorization, `Bearer ${sentinelClientToken}`);
  assert.equal(calls[0].init.headers['oai-sites-authorization'], `Bearer ${pulseSiteToken}`);
  assert.equal(calls[0].init.body, calls[1].init.body);
  assert.deepEqual(JSON.parse(calls[0].init.body), envelope);
});

test('File Cabinet relay fails closed on expired packets and mismatched acknowledgements', async () => {
  const envelope = fileCabinetEnvelope();
  const handler = createWorkerHandler({
    fetchImpl: async () => Response.json({
      ok: true,
      contract: envelope.contract,
      version: envelope.version,
      command: envelope.command,
      eventId: envelope.eventId,
      correlationId: 'cor-wrong-acknowledgement',
      idempotencyKey: envelope.idempotencyKey,
      fileCabinetItemId: envelope.fileCabinetItemId,
      acknowledgementToken: envelope.acknowledgementToken,
      acknowledgementId: 'ack-id-66666666-6666-4666-8666-666666666666',
      status: 'accepted_and_saved',
      acknowledgedAt: '2026-08-05T12:00:01.000Z',
      fileCabinetRef: envelope.item.fileCabinetRef,
    }, { status: 201 }),
  });

  const expiredEnvelope = fileCabinetEnvelope(new Date('2020-01-01T00:00:00.000Z'));
  const expired = await handler.fetch(fileCabinetRequest(expiredEnvelope), env);
  assert.equal(expired.status, 400);
  assert.equal((await expired.json()).status, 'invalid_envelope');

  const current = fileCabinetEnvelope(new Date());
  const mismatch = await handler.fetch(fileCabinetRequest(current), env);
  assert.equal(mismatch.status, 502);
  assert.equal((await mismatch.json()).status, 'acknowledgement_mismatch');
});

test('File Cabinet relay rejects legacy aliases, wrong routes, and unapproved tenants', async () => {
  const handler = createWorkerHandler({ fetchImpl: async () => {
    throw new Error('The upstream must not be called for a rejected packet.');
  } });

  const legacy = fileCabinetEnvelope();
  legacy.contractId = legacy.contract;
  delete legacy.contract;
  const legacyResponse = await handler.fetch(fileCabinetRequest(legacy), env);
  assert.equal(legacyResponse.status, 400);
  assert.equal((await legacyResponse.json()).status, 'invalid_envelope');

  const wrongRoute = fileCabinetEnvelope();
  wrongRoute.target.appId = 'aqua-crm';
  const routeResponse = await handler.fetch(fileCabinetRequest(wrongRoute), env);
  assert.equal(routeResponse.status, 400);
  assert.equal((await routeResponse.json()).status, 'invalid_route');

  const wrongTenant = fileCabinetEnvelope();
  wrongTenant.tenantId = 'tenant-not-authorized';
  const tenantResponse = await handler.fetch(fileCabinetRequest(wrongTenant), env);
  assert.equal(tenantResponse.status, 403);
  assert.equal((await tenantResponse.json()).status, 'tenant_denied');

  const missingTenantConfiguration = await handler.fetch(
    fileCabinetRequest(fileCabinetEnvelope()),
    { ...env, AQUA_SENTINEL_TENANT_IDS_JSON: '' },
  );
  assert.equal(missingTenantConfiguration.status, 503);
  assert.equal((await missingTenantConfiguration.json()).status, 'relay_not_configured');
});

test('Durable Worker authenticates the owner and protects capabilities', async () => {
  const state = new FakeState();
  const worker = new AquaGatewayDurableObject(state, env);
  const denied = await worker.fetch(post(rpc(1, 'aqua.capabilities.list')));
  assert.equal((await denied.json()).error.code, -32001);

  const signedIn = await worker.fetch(post(rpc(2, 'session.create', {
    email: 'owner@example.com',
    activationCode: ownerActivationCode,
    deviceId: 'worker-test-device',
  })));
  const session = (await signedIn.json()).result.accessToken;
  assert.ok(session);

  const allowed = await worker.fetch(post(
    rpc(3, 'aqua.capabilities.list'),
    { authorization: `Bearer ${session}` },
  ));
  assert.ok((await allowed.json()).result.capabilities.length >= 8);
});

test('SDK-shaped projection sync remains durable across Worker recreation', async () => {
  const persisted = new Map();
  let worker = new AquaGatewayDurableObject(new FakeState(persisted), env);
  const params = {
    capabilityId: 'receipts',
    tenantId: 'aqua-homes',
    syncId: 'receipts-sync-0001',
    checkpoint: 'receipts:1',
    records: [{
      kind: 'receipt',
      sourceRecordId: 'receipt-1',
      title: 'Home Depot receipt',
      subtitle: 'Henderson kitchen',
      sourceState: 'Confirmed',
      searchText: 'framing lumber Henderson kitchen',
      previewUri: '',
      fields: [{ label: 'Total', value: '$428.16' }],
      updatedAt: '2026-08-04T12:00:00.000Z',
    }],
    deletedSourceRecordIds: [],
  };
  const headers = {
    'x-aqua-adapter-id': 'receipts',
    'x-aqua-adapter-key': 'receipts-adapter-key-with-sufficient-entropy',
  };
  const accepted = await worker.fetch(post(rpc(4, 'aqua.adapter.sync', params), headers));
  assert.equal((await accepted.json()).result.duplicate, false);

  worker = new AquaGatewayDurableObject(new FakeState(persisted), env);
  const replay = await worker.fetch(post(rpc(5, 'aqua.adapter.sync', params), headers));
  const receipt = (await replay.json()).result;
  assert.equal(receipt.status, 'Confirmed');
  assert.equal(receipt.duplicate, true);
});

test('Worker rate limits repeated owner sign-in failures without exposing secrets', async () => {
  const worker = new AquaGatewayDurableObject(new FakeState(), env);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const response = await worker.fetch(post(rpc(attempt, 'session.create', {
      email: 'owner@example.com',
      activationCode: 'wrong-activation-code',
      deviceId: 'worker-test-device',
    }), { 'cf-connecting-ip': '192.0.2.10' }));
    assert.equal((await response.json()).error.code, -32002);
  }
  const limited = await worker.fetch(post(rpc(99, 'session.create', {
    email: 'owner@example.com',
    activationCode: 'wrong-activation-code',
    deviceId: 'worker-test-device',
  }), { 'cf-connecting-ip': '192.0.2.10' }));
  const payload = await limited.json();
  assert.equal(limited.status, 429);
  assert.equal(payload.error.code, -32003);
  assert.doesNotMatch(JSON.stringify(payload), /wrong-activation-code|session-secret|openai/i);
});
