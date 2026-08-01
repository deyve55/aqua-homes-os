import test from 'node:test';
import assert from 'node:assert/strict';
import { CapabilityRegistry } from '../backend/capability-registry.mjs';
import { loadConfig } from '../backend/config.mjs';
import { ProjectionStore } from '../backend/projection-store.mjs';
import { issueSession, verifySession } from '../backend/auth.mjs';
import { createGateway } from '../backend/gateway.mjs';
import { AquaAgentOutputSchema, emptyMaterialization } from '../backend/contracts.mjs';

const config = loadConfig({
  host: '127.0.0.1',
  developmentAuth: true,
  sessionSecret: 'test-session-secret-with-sufficient-entropy',
  openAiApiKey: 'test-only',
  adapterCredentials: {
    crm: {
      key: 'test-crm-adapter-key-with-sufficient-entropy',
      tenantIds: ['tenant-a'],
    },
  },
});

const identity = {
  sub: 'owner',
  email: 'owner@example.com',
  tenantId: 'tenant-a',
  roles: ['owner'],
  deviceId: 'device-a',
};

function request(id, method, params = {}) {
  return { jsonrpc: '2.0', id, method, params };
}

test('session token is signed, expiring, and rejects tampering', () => {
  const token = issueSession(config, identity);
  assert.equal(verifySession(config, token).tenantId, 'tenant-a');
  const tampered = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`;
  assert.equal(verifySession(config, tampered), null);
});

test('projection search is tenant isolated and returns evidence only', () => {
  const store = new ProjectionStore([
    {
      tenantId: 'tenant-a',
      kind: 'receipt',
      title: 'Home Depot receipt',
      subtitle: 'Phillip kitchen',
      sourceApp: 'Aqua Receipts',
      sourceRecordId: 'receipt-1',
      sourceState: 'Confirmed',
      searchText: '68 Lancaster Street cabinets',
      fields: [],
    },
    {
      tenantId: 'tenant-b',
      kind: 'receipt',
      title: 'Private tenant receipt',
      sourceApp: 'Aqua Receipts',
      sourceRecordId: 'receipt-2',
      sourceState: 'Confirmed',
      searchText: 'Home Depot Phillip kitchen',
      fields: [],
    },
  ]);
  const results = store.search({
    tenantId: 'tenant-a',
    query: 'Phillip kitchen Home Depot',
    kinds: ['receipt'],
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].sourceRecordId, 'receipt-1');
});

test('structured Aqua output requires truthful materialization and receipt shapes', () => {
  const output = AquaAgentOutputSchema.parse({
    reply: 'I do not have a connected receipt source yet.',
    action: { type: 'none', target: '', app: '' },
    materialization: emptyMaterialization,
    receipt: {
      status: 'Needs Attention',
      correlationId: 'test-correlation',
      sources: [],
      requiresConfirmation: false,
      intentId: '',
      confirmationToken: '',
    },
  });
  assert.equal(output.materialization.present, false);
  assert.equal(output.receipt.status, 'Needs Attention');
});

test('gateway exposes health publicly but protects ecosystem capabilities', async () => {
  const registry = new CapabilityRegistry();
  const store = new ProjectionStore();
  const gateway = createGateway({
    config,
    registry,
    store,
    agentRuntime: { chat: async () => ({}) },
  });

  const health = await gateway.dispatch(request(1, 'aqua.health'));
  assert.equal(health.result.status, 'Confirmed');

  const denied = await gateway.dispatch(request(2, 'aqua.capabilities.list'));
  assert.equal(denied.error.code, -32001);

  const token = issueSession(config, identity);
  const allowed = await gateway.dispatch(request(3, 'aqua.capabilities.list'), {
    authorization: `Bearer ${token}`,
  });
  assert.ok(allowed.result.capabilities.length >= 8);
});

test('satellite projection sync is authenticated, tenant scoped, and idempotent', async () => {
  const registry = new CapabilityRegistry();
  const store = new ProjectionStore();
  const gateway = createGateway({
    config,
    registry,
    store,
    agentRuntime: { chat: async () => ({}) },
  });
  const params = {
    capabilityId: 'crm',
    tenantId: 'tenant-a',
    syncId: 'crm-sync-0001',
    checkpoint: 'crm:42',
    deletedSourceRecordIds: [],
    records: [{
      kind: 'contract',
      sourceRecordId: 'contract-42',
      title: 'Phillip kitchen contract',
      subtitle: '68 Lancaster Street',
      sourceState: 'Confirmed',
      searchText: 'warranty claim cabinets August 2024',
      previewUri: 'https://files.example.test/contracts/contract-42',
      fields: [{ label: 'Client', value: 'Phillip' }],
      updatedAt: '2026-08-01T12:00:00.000Z',
    }],
  };

  const denied = await gateway.dispatch(request(5, 'aqua.adapter.sync', params), {
    'x-aqua-adapter-id': 'crm',
    'x-aqua-adapter-key': 'incorrect-key',
  });
  assert.equal(denied.error.code, -32011);

  const headers = {
    'x-aqua-adapter-id': 'crm',
    'x-aqua-adapter-key': 'test-crm-adapter-key-with-sufficient-entropy',
  };
  const accepted = await gateway.dispatch(request(6, 'aqua.adapter.sync', params), headers);
  assert.equal(accepted.result.status, 'Confirmed');
  assert.equal(accepted.result.recordCount, 1);
  assert.equal(accepted.result.duplicate, false);

  const replay = await gateway.dispatch(request(7, 'aqua.adapter.sync', params), headers);
  assert.equal(replay.result.duplicate, true);
  assert.equal(registry.get('crm').status, 'projection_connected');

  const found = store.search({
    tenantId: 'tenant-a',
    query: 'Phillip warranty',
    kinds: ['contract'],
  });
  assert.equal(found.length, 1);
  assert.equal(found[0].sourceApp, 'Aqua CRM');
  assert.equal(found[0].sourceRecordId, 'contract-42');

  const conflicting = await gateway.dispatch(request(71, 'aqua.adapter.sync', {
    ...params,
    checkpoint: 'crm:43',
  }), headers);
  assert.equal(conflicting.error.code, -32013);
});

test('adapter credentials cannot publish into an unapproved tenant', async () => {
  const registry = new CapabilityRegistry();
  const store = new ProjectionStore();
  const gateway = createGateway({
    config,
    registry,
    store,
    agentRuntime: { chat: async () => ({}) },
  });
  const response = await gateway.dispatch(request(8, 'aqua.adapter.sync', {
    capabilityId: 'crm',
    tenantId: 'tenant-b',
    syncId: 'crm-sync-tenant-b',
    checkpoint: '',
    records: [{
      kind: 'client',
      sourceRecordId: 'client-private',
      title: 'Private client',
      subtitle: '',
      sourceState: 'Confirmed',
      searchText: '',
      previewUri: '',
      fields: [],
      updatedAt: '2026-08-01T12:00:00.000Z',
    }],
  }), {
    'x-aqua-adapter-id': 'crm',
    'x-aqua-adapter-key': 'test-crm-adapter-key-with-sufficient-entropy',
  });
  assert.equal(response.error.code, -32011);
  assert.equal(store.search({ tenantId: 'tenant-b', query: 'Private' }).length, 0);
});

test('confirmation never fabricates an unconnected satellite write', async () => {
  const registry = new CapabilityRegistry();
  const store = new ProjectionStore();
  const pending = store.prepareIntent({
    tenantId: identity.tenantId,
    userId: identity.sub,
    capability: 'crm',
    operation: 'client.prepare_create',
    payload: { name: 'Philippe' },
  });
  const gateway = createGateway({
    config,
    registry,
    store,
    agentRuntime: { chat: async () => ({}) },
  });
  const token = issueSession(config, identity);
  const response = await gateway.dispatch(
    request(4, 'aqua.action.confirm', {
      intentId: pending.intentId,
      confirmationToken: pending.confirmationToken,
    }),
    { authorization: `Bearer ${token}` },
  );
  assert.equal(response.result.status, 'Needs Attention');
  assert.match(response.result.report, /not connected yet/i);
});
