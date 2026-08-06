import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { CapabilityRegistry } from '../backend/capability-registry.mjs';
import { loadConfig } from '../backend/config.mjs';
import {
  AQUA_MODEL_DEFAULTS,
  publicAquaModelPolicy,
  selectAquaRealtimeModel,
} from '../backend/model-policy.mjs';
import {
  buildRealtimeSession,
  createRealtimeSessionRuntime,
} from '../backend/realtime-session.mjs';
import { ProjectionStore } from '../backend/projection-store.mjs';
import { issueSession, verifySession } from '../backend/auth.mjs';
import { createGateway } from '../backend/gateway.mjs';
import { createAquaAgentRuntime } from '../backend/aqua-agent.mjs';
import { AquaAgentOutputSchema, emptyMaterialization } from '../backend/contracts.mjs';
import {
  createReceiptIntelligenceRuntime,
  RECEIPT_INTELLIGENCE_INSTRUCTIONS,
} from '../backend/receipt-intelligence.mjs';

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

test('Aqua model policy defaults to Realtime 2.1 mini with explicit full escalation', () => {
  assert.equal(AQUA_MODEL_DEFAULTS.satelliteRealtime, 'gpt-realtime-2.1-mini');
  assert.equal(AQUA_MODEL_DEFAULTS.fullRealtime, 'gpt-realtime-2.1');
  assert.equal(AQUA_MODEL_DEFAULTS.transcription, 'gpt-4o-transcribe');
  assert.equal(
    selectAquaRealtimeModel({ appId: 'aqua-draw', capability: 'simple' }),
    'gpt-realtime-2.1-mini',
  );
  assert.equal(
    selectAquaRealtimeModel({ appId: 'aqua-draw', capability: 'complex' }),
    'gpt-realtime-2.1',
  );
  assert.equal(
    selectAquaRealtimeModel({
      appId: 'aqua-draw',
      capability: 'simple',
      conversationOrigin: 'aqua-sentinel-os',
    }),
    'gpt-realtime-2.1-mini',
  );
  assert.equal(
    selectAquaRealtimeModel({ appId: 'aqua-sentinel-os', capability: 'simple' }),
    'gpt-realtime-2.1-mini',
  );
  assert.deepEqual(publicAquaModelPolicy(config), {
    version: '1.0.0',
    sentinel: {
      default: 'gpt-realtime-2.1-mini',
      escalateTo: 'gpt-realtime-2.1',
    },
    satellites: {
      default: 'gpt-realtime-2.1-mini',
      escalateTo: 'gpt-realtime-2.1',
      sentinelHandoff: 'gpt-realtime-2.1',
    },
    transcription: 'gpt-4o-transcribe',
    confirmationRequiredFor: [
      'destructive',
      'external',
      'financial',
      'filing',
      'publishing',
      'sensitive',
    ],
  });
});

test('Sentinel Realtime SDP uses 2.1 mini, GPT-4o Transcribe, patient VAD, and no client API key', async () => {
  let upstream;
  const runtime = createRealtimeSessionRuntime({
    config,
    fetchImpl: async (url, init) => {
      upstream = { url, init };
      return new Response('v=0\r\no=aqua-answer', {
        status: 201,
        headers: { 'content-type': 'application/sdp' },
      });
    },
  });
  const result = await runtime.connect({
    identity,
    sdp: 'v=0\r\no=aqua-offer',
    appId: 'aqua-sentinel-os',
  });
  assert.equal(result.status, 201);
  assert.equal(upstream.url, 'https://api.openai.com/v1/realtime/calls');
  assert.equal(upstream.init.headers.authorization, 'Bearer test-only');
  const session = JSON.parse(upstream.init.body.get('session'));
  assert.equal(session.model, 'gpt-realtime-2.1-mini');
  assert.equal(session.reasoning.effort, 'xhigh');
  assert.equal(session.audio.input.transcription.model, 'gpt-4o-transcribe');
  assert.equal(session.audio.input.turn_detection.type, 'semantic_vad');
  assert.equal(session.audio.input.turn_detection.eagerness, 'low');
  assert.equal(session.audio.input.turn_detection.interrupt_response, true);
  assert.equal(upstream.init.body.get('sdp'), 'v=0\r\no=aqua-offer');
  assert.doesNotMatch(JSON.stringify(buildRealtimeSession(config)), /test-only/);
});

function receiptAnalysisFixture() {
  const evidence = [{
    page: 1,
    quote: 'TOTAL 428.16',
    boundingBox: { x: 0.1, y: 0.8, width: 0.7, height: 0.05 },
  }];
  const textField = (value, confidence = 98) => ({ value, confidence, evidence });
  const amountField = (valueMinor, confidence = 99) => ({
    valueMinor,
    confidence,
    evidence,
  });
  return {
    documentType: 'receipt',
    imageQuality: {
      usable: true,
      confidence: 98,
      issues: ['none'],
      rotationDegrees: 0,
    },
    merchant: {
      displayName: textField('The Home Depot'),
      normalizedName: textField('Home Depot'),
      address: textField('100 Main Street'),
      phone: textField(null, 0),
      storeNumber: textField('1234'),
    },
    purchase: {
      dateIso: textField('2026-07-31'),
      timeLocal: textField('14:32'),
      currencyCode: textField('USD'),
      transactionNumber: textField('TX-42'),
      orderNumber: textField(null, 0),
      paymentMethod: textField('Visa'),
      paymentLast4: textField('4242'),
    },
    amounts: {
      subtotal: amountField(40000),
      tax: amountField(2816),
      total: amountField(42816),
    },
    lineItems: [{
      lineNumber: 1,
      rawDescription: '2X4X8 SPF STUD',
      normalizedDescription: '2 x 4 x 8 SPF framing stud',
      sku: '100123',
      quantityMilliUnits: 10000,
      unitOfMeasure: 'EA',
      unitPriceMinor: 4000,
      lineTotalMinor: 40000,
      taxable: true,
      category: 'Lumber',
      trade: 'Framing',
      costCode: '06100',
      budgetBucket: 'Materials',
      confidence: 98,
      classificationConfidence: 96,
      needsReview: false,
      evidence,
    }],
    adjustments: [],
    job: {
      state: 'unknown',
      name: null,
      confidence: 0,
      rationale: 'No job is printed on the receipt.',
      evidence: [],
    },
    uncertainties: [],
    summary: 'Home Depot receipt for framing lumber totaling $428.16.',
  };
}

function receiptImageParams() {
  const bytes = Buffer.from('bounded-receipt-image-fixture-'.repeat(8));
  const digest = createHash('sha256').update(bytes).digest('hex');
  return {
    evidenceId: 'receipt-evidence-42',
    originalSha256: 'a'.repeat(64),
    analysisImageSha256: digest,
    mimeType: 'image/jpeg',
    imageDataUrl: `data:image/jpeg;base64,${bytes.toString('base64')}`,
    capturedAt: '2026-08-01T12:00:00.000Z',
    source: 'CAMERA',
    conversationContext: '',
    knownJobs: [{ name: 'Henderson', address: '', aliases: [] }],
    knownCostCodes: [{ code: '06100', name: 'Rough carpentry', trade: 'Framing' }],
  };
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

test('Aqua records an app source only after the server-side capability route executes', async () => {
  const registry = new CapabilityRegistry();
  const runtime = createAquaAgentRuntime({
    config,
    registry,
    store: new ProjectionStore(),
    runner: async (agent, _input, options) => {
      const route = agent.tools.find((candidate) => candidate.name === 'route_aqua_capability');
      assert.ok(route);
      await route.invoke(
        { context: options.context },
        JSON.stringify({ capability: 'receipts', purpose: 'Review receipt intake status' }),
      );
      return {
        finalOutput: {
          reply: 'Aqua Receipts is the authoritative source, but its adapter is not connected.',
          action: { type: 'none', target: '', app: '' },
          materialization: emptyMaterialization,
          receipt: {
            status: 'Needs Attention',
            correlationId: '',
            sources: [],
            requiresConfirmation: false,
            intentId: '',
            confirmationToken: '',
          },
        },
      };
    },
  });
  const result = await runtime.chat({
    identity,
    params: {
      text: 'What receipts still need a project?',
      conversationId: 'route-proof',
      selectedApp: '',
      uiContext: { surface: 'Neural Link' },
      safetyIdentifier: 'route-proof-device',
    },
  });
  assert.deepEqual(result.receipt.sources, ['receipts']);
  assert.equal(result.materialization.present, false);
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

  const deniedPolicy = await gateway.dispatch(request(31, 'aqua.models.policy'));
  assert.equal(deniedPolicy.error.code, -32001);
  const allowedPolicy = await gateway.dispatch(request(32, 'aqua.models.policy'), {
    authorization: `Bearer ${token}`,
  });
  assert.equal(allowedPolicy.result.transcription, 'gpt-4o-transcribe');
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

test('receipt intelligence uses high-detail image input and reconciles cents deterministically', async () => {
  let capturedInput;
  const receiptRuntime = createReceiptIntelligenceRuntime({
    config,
    now: () => new Date('2026-08-01T12:30:00.000Z'),
    runner: {
      run: async (_agent, input) => {
        capturedInput = input;
        return { finalOutput: receiptAnalysisFixture() };
      },
    },
  });
  const result = await receiptRuntime.analyze({
    identity,
    params: receiptImageParams(),
  });
  assert.equal(capturedInput[0].content[1].type, 'input_image');
  assert.equal(capturedInput[0].content[1].detail, 'high');
  assert.equal(result.math.headerReconciled, true);
  assert.equal(result.math.lineItemsReconciled, true);
  assert.equal(result.status, 'Confirmed');
  assert.equal(result.nextQuestion.prompt, 'Which job is this receipt for?');
  assert.equal(result.analysis.lineItems[0].costCode, '06100');
  assert.match(RECEIPT_INTELLIGENCE_INSTRUCTIONS, /untrusted evidence/i);

  const replay = await receiptRuntime.analyze({
    identity,
    params: receiptImageParams(),
  });
  assert.equal(replay.cacheHit, true);
  assert.equal(replay.analysisId, result.analysisId);
});

test('receipt analysis is session protected and binds evidence ID to immutable hash', async () => {
  const receiptRuntime = createReceiptIntelligenceRuntime({
    config,
    runner: {
      run: async () => ({ finalOutput: receiptAnalysisFixture() }),
    },
  });
  const gateway = createGateway({
    config,
    registry: new CapabilityRegistry(),
    store: new ProjectionStore(),
    agentRuntime: { chat: async () => ({}) },
    receiptRuntime,
  });
  const params = receiptImageParams();
  const denied = await gateway.dispatch(request(90, 'aqua.receipt.analyze', params));
  assert.equal(denied.error.code, -32001);

  const headers = { authorization: `Bearer ${issueSession(config, identity)}` };
  const accepted = await gateway.dispatch(
    request(91, 'aqua.receipt.analyze', params),
    headers,
  );
  assert.equal(accepted.result.evidenceId, params.evidenceId);

  const conflict = await gateway.dispatch(
    request(92, 'aqua.receipt.analyze', {
      ...params,
      originalSha256: 'b'.repeat(64),
    }),
    headers,
  );
  assert.equal(conflict.error.code, -32020);

  const corrupt = await gateway.dispatch(
    request(93, 'aqua.receipt.analyze', {
      ...params,
      evidenceId: 'receipt-evidence-99',
      analysisImageSha256: 'c'.repeat(64),
    }),
    headers,
  );
  assert.equal(corrupt.error.code, -32021);
});
