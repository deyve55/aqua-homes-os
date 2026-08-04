import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword } from '../backend/auth.mjs';
import { AquaGatewayDurableObject, createWorkerHandler } from '../backend/worker.mjs';

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

const ownerPassword = 'temporary-test-password';
const env = Object.freeze({
  OPENAI_API_KEY: 'test-openai-key',
  OPENAI_MODEL: 'gpt-5.6',
  AQUA_SESSION_SECRET: 'worker-session-secret-with-sufficient-entropy',
  AQUA_OWNER_EMAIL: 'owner@example.com',
  AQUA_OWNER_PASSWORD_HASH: hashPassword(ownerPassword, 'worker-test-salt'),
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

test('Worker entry exposes only health and gateway through the Durable Object binding', async () => {
  const durable = { fetch: async () => new Response('ok') };
  const handler = createWorkerHandler();
  const binding = { idFromName: (name) => name, get: () => durable };
  assert.equal((await handler.fetch(
    new Request('https://gateway.example/health'),
    { AQUA_GATEWAY: binding },
  )).status, 200);
  assert.equal((await handler.fetch(
    new Request('https://gateway.example/private'),
    { AQUA_GATEWAY: binding },
  )).status, 404);
});

test('Durable Worker authenticates the owner and protects capabilities', async () => {
  const state = new FakeState();
  const worker = new AquaGatewayDurableObject(state, env);
  const denied = await worker.fetch(post(rpc(1, 'aqua.capabilities.list')));
  assert.equal((await denied.json()).error.code, -32001);

  const signedIn = await worker.fetch(post(rpc(2, 'session.create', {
    email: 'owner@example.com',
    password: ownerPassword,
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
      password: 'wrong-password',
      deviceId: 'worker-test-device',
    }), { 'cf-connecting-ip': '192.0.2.10' }));
    assert.equal((await response.json()).error.code, -32002);
  }
  const limited = await worker.fetch(post(rpc(99, 'session.create', {
    email: 'owner@example.com',
    password: 'wrong-password',
    deviceId: 'worker-test-device',
  }), { 'cf-connecting-ip': '192.0.2.10' }));
  const payload = await limited.json();
  assert.equal(limited.status, 429);
  assert.equal(payload.error.code, -32003);
  assert.doesNotMatch(JSON.stringify(payload), /wrong-password|session-secret|openai/i);
});
