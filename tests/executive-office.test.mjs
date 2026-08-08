import test from 'node:test';
import assert from 'node:assert/strict';
import { CapabilityRegistry } from '../backend/capability-registry.mjs';
import { loadConfig } from '../backend/config.mjs';
import { ExecutiveOfficeStore } from '../backend/executive-office.mjs';
import { ExecutiveIntelligenceStore } from '../backend/executive-intelligence.mjs';
import { PollyCanvasStore } from '../backend/polly-canvas.mjs';
import { createGateway } from '../backend/gateway.mjs';
import { ProjectionStore } from '../backend/projection-store.mjs';
import { issueSession } from '../backend/auth.mjs';

const config = loadConfig({
  host: '127.0.0.1',
  developmentAuth: true,
  sessionSecret: 'executive-office-test-secret-with-sufficient-entropy',
  openAiApiKey: 'test-only',
  adapterCredentials: {
    draw: {
      key: 'test-draw-adapter-key-with-sufficient-entropy',
      tenantIds: ['tenant-a'],
    },
  },
});

const owner = {
  sub: 'dave-owner',
  email: 'owner@example.com',
  tenantId: 'tenant-a',
  roles: ['owner'],
  deviceId: 'fold-7',
};

function request(id, method, params = {}) {
  return { jsonrpc: '2.0', id, method, params };
}

function createHarness({
  office = new ExecutiveOfficeStore(),
  intelligence = new ExecutiveIntelligenceStore(),
  canvas = new PollyCanvasStore(),
} = {}) {
  const registry = new CapabilityRegistry();
  const gateway = createGateway({
    config,
    registry,
    store: new ProjectionStore(),
    office,
    intelligence,
    canvas,
    agentRuntime: { chat: async () => ({}) },
  });
  const ownerHeaders = {
    authorization: `Bearer ${issueSession(config, owner)}`,
  };
  const drawHeaders = {
    'x-aqua-adapter-id': 'draw',
    'x-aqua-adapter-key': 'test-draw-adapter-key-with-sufficient-entropy',
  };
  return {
    gateway,
    registry,
    office,
    intelligence,
    canvas,
    ownerHeaders,
    drawHeaders,
  };
}

function delegateParams(overrides = {}) {
  return {
    capabilityId: 'draw',
    operation: 'employee.retrieve',
    instruction: 'Bring the latest approved kitchen drawing to Neural.',
    payload: { projectId: 'project-carly' },
    safetyClass: 'read',
    ownerConfirmed: false,
    correlationId: 'cor-draw-employee-0001',
    idempotencyKey: 'idem-draw-employee-0001',
    dueAt: '',
    ...overrides,
  };
}

test('CEO Aqua can prepare direct office entry without claiming the app launched', async () => {
  const { gateway, ownerHeaders } = createHarness();
  const denied = await gateway.dispatch(request(1, 'aqua.office.enter', {
    capabilityId: 'draw',
    purpose: 'Review the Carly kitchen drawing.',
    correlationId: 'cor-office-enter-0001',
  }));
  assert.equal(denied.error.code, -32001);

  const entered = await gateway.dispatch(request(2, 'aqua.office.enter', {
    capabilityId: 'draw',
    purpose: 'Review the Carly kitchen drawing.',
    correlationId: 'cor-office-enter-0001',
  }), ownerHeaders);
  assert.equal(entered.result.route, 'aqua://draw');
  assert.equal(entered.result.status, 'Confirmed');
  assert.match(entered.result.truthBoundary, /must confirm launch/i);
});

test('delegation is durable, idempotent, operation-scoped, and confirmation protected', async () => {
  const { gateway, ownerHeaders } = createHarness();
  const delegated = await gateway.dispatch(
    request(10, 'aqua.work.delegate', delegateParams()),
    ownerHeaders,
  );
  assert.equal(delegated.result.status, 'queued');
  assert.equal(delegated.result.deliveryState, 'awaiting_adapter');
  assert.equal(delegated.result.duplicate, false);

  const replay = await gateway.dispatch(
    request(11, 'aqua.work.delegate', delegateParams()),
    ownerHeaders,
  );
  assert.equal(replay.result.workId, delegated.result.workId);
  assert.equal(replay.result.duplicate, true);

  const conflict = await gateway.dispatch(request(12, 'aqua.work.delegate', delegateParams({
    instruction: 'Bring a different drawing.',
  })), ownerHeaders);
  assert.equal(conflict.error.code, -32033);

  const unpublished = await gateway.dispatch(request(13, 'aqua.work.delegate', delegateParams({
    operation: 'drawing.delete',
    idempotencyKey: 'idem-draw-unpublished-0001',
  })), ownerHeaders);
  assert.equal(unpublished.error.code, -32032);

  const unconfirmed = await gateway.dispatch(request(14, 'aqua.work.delegate', delegateParams({
    operation: 'employee.progress_report',
    safetyClass: 'financial',
    idempotencyKey: 'idem-draw-protected-0001',
  })), ownerHeaders);
  assert.equal(unconfirmed.error.code, -32035);
});

test('only the correct employee app can retrieve work and verified returns require evidence', async () => {
  const { gateway, ownerHeaders, drawHeaders } = createHarness();
  const delegated = await gateway.dispatch(
    request(20, 'aqua.work.delegate', delegateParams()),
    ownerHeaders,
  );
  const workId = delegated.result.workId;
  const listParams = {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    statuses: ['queued'],
    limit: 10,
  };

  const denied = await gateway.dispatch(
    request(21, 'aqua.employee.work.list', listParams),
    { ...drawHeaders, 'x-aqua-adapter-key': 'wrong-key' },
  );
  assert.equal(denied.error.code, -32011);

  const listed = await gateway.dispatch(
    request(22, 'aqua.employee.work.list', listParams),
    drawHeaders,
  );
  assert.deepEqual(listed.result.work.map((item) => item.workId), [workId]);

  const evidenceMissing = await gateway.dispatch(request(23, 'aqua.employee.work.report', {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    workId,
    status: 'verified',
    summary: 'The drawing was found.',
    evidence: [],
    correlationId: 'cor-draw-report-0001',
    idempotencyKey: 'idem-draw-report-0001',
  }), drawHeaders);
  assert.equal(evidenceMissing.error.code, -32035);

  const verifiedParams = {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    workId,
    status: 'verified',
    summary: 'The latest approved kitchen drawing is ready for Dave.',
    evidence: [{
      evidenceId: 'drawing-version-17',
      kind: 'artifact',
      sourceRecordId: 'drawing-carly-17',
      summary: 'Approved revision 17 from AquaDraw.',
      referenceUri: 'https://files.example.test/drawings/carly-17',
      verifiedAt: '2026-08-07T13:00:00.000Z',
    }],
    correlationId: 'cor-draw-report-0002',
    idempotencyKey: 'idem-draw-report-0002',
  };
  const verified = await gateway.dispatch(
    request(24, 'aqua.employee.work.report', verifiedParams),
    drawHeaders,
  );
  assert.equal(verified.result.report.status, 'verified');
  assert.equal(verified.result.neuralDelivery.reviewState, 'unread');

  const replay = await gateway.dispatch(
    request(25, 'aqua.employee.work.report', verifiedParams),
    drawHeaders,
  );
  assert.equal(replay.result.report.reportId, verified.result.report.reportId);
  assert.equal(replay.result.duplicate, true);
});

test('employee returns appear in Neural and Dave can send work back with an audited note', async () => {
  const { gateway, ownerHeaders, drawHeaders } = createHarness();
  const delegated = await gateway.dispatch(
    request(30, 'aqua.work.delegate', delegateParams()),
    ownerHeaders,
  );
  const reported = await gateway.dispatch(request(31, 'aqua.employee.work.report', {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    workId: delegated.result.workId,
    status: 'needs_attention',
    summary: 'Two approved-looking revisions need owner selection.',
    evidence: [],
    correlationId: 'cor-draw-attention-0001',
    idempotencyKey: 'idem-draw-attention-0001',
  }), drawHeaders);
  const deliveryId = reported.result.neuralDelivery.deliveryId;

  const inbox = await gateway.dispatch(
    request(32, 'aqua.neural.inbox', { reviewState: 'unread', limit: 10 }),
    ownerHeaders,
  );
  assert.deepEqual(inbox.result.deliveries.map((item) => item.deliveryId), [deliveryId]);

  const missingNote = await gateway.dispatch(request(33, 'aqua.neural.acknowledge', {
    deliveryId,
    disposition: 'sent_back',
    ownerNote: '',
    correlationId: 'cor-neural-review-0001',
  }), ownerHeaders);
  assert.equal(missingNote.error.code, -32602);

  const returned = await gateway.dispatch(request(34, 'aqua.neural.acknowledge', {
    deliveryId,
    disposition: 'sent_back',
    ownerNote: 'Use revision 17 and verify the permit stamp.',
    correlationId: 'cor-neural-review-0002',
  }), ownerHeaders);
  assert.equal(returned.result.delivery.reviewState, 'sent_back');
  assert.equal(returned.result.work.status, 'queued');
  assert.equal(returned.result.work.deliveryState, 'returned_to_employee');
});

test('morning, check-in, and shift-close briefs share one durable workday', async () => {
  const first = createHarness();
  await first.gateway.dispatch(
    request(40, 'aqua.work.delegate', delegateParams()),
    first.ownerHeaders,
  );
  const morning = await first.gateway.dispatch(request(41, 'aqua.executive.brief', {
    phase: 'morning',
    workdayId: '',
  }), first.ownerHeaders);
  assert.equal(morning.result.overview.queued, 1);
  assert.equal(morning.result.workdayStatus, 'open');
  assert.match(morning.result.truthBoundary, /registered apps/i);

  const restored = createHarness({
    office: new ExecutiveOfficeStore(first.office.snapshot()),
  });
  const checkIn = await restored.gateway.dispatch(request(42, 'aqua.executive.brief', {
    phase: 'check_in',
    workdayId: morning.result.workdayId,
  }), restored.ownerHeaders);
  assert.equal(checkIn.result.workdayId, morning.result.workdayId);
  assert.equal(checkIn.result.workdayStatus, 'open');

  const close = await restored.gateway.dispatch(request(43, 'aqua.executive.brief', {
    phase: 'shift_close',
    workdayId: morning.result.workdayId,
  }), restored.ownerHeaders);
  assert.equal(close.result.workdayId, morning.result.workdayId);
  assert.equal(close.result.workdayStatus, 'closed');
  assert.equal(close.result.blockers[0].deliveryState, 'awaiting_adapter');
});

function grossMarginSignal(overrides = {}) {
  return {
    signalId: 'signal-project-carly-margin-0001',
    metricId: 'gross_margin_percent',
    metricName: 'Gross margin',
    entityType: 'project',
    entityId: 'project-carly',
    periodStart: '2026-08-01T00:00:00.000Z',
    periodEnd: '2026-08-07T23:59:59.000Z',
    value: 18,
    unit: 'percent',
    direction: 'higher_is_better',
    target: 30,
    varianceTolerance: 2,
    confidence: 0.95,
    evidence: [{
      evidenceId: 'draw-job-health-carly-0001',
      kind: 'metric',
      sourceRecordId: 'project-carly',
      summary: 'AquaDraw verified current contract and budget state.',
      referenceUri: '',
      verifiedAt: '2026-08-07T23:59:59.000Z',
    }],
    context: { jobType: 'kitchen renovation' },
    ...overrides,
  };
}

test('authenticated company signals trigger continuous evidence-backed analysis', async () => {
  const { gateway, ownerHeaders, drawHeaders } = createHarness();
  const params = {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    batchId: 'batch-draw-health-0001',
    checkpoint: 'draw:health:42',
    signals: [grossMarginSignal()],
  };
  const denied = await gateway.dispatch(
    request(50, 'aqua.company.signals.ingest', params),
    { ...drawHeaders, 'x-aqua-adapter-key': 'wrong-key' },
  );
  assert.equal(denied.error.code, -32011);

  const analyzed = await gateway.dispatch(
    request(51, 'aqua.company.signals.ingest', params),
    drawHeaders,
  );
  assert.equal(analyzed.result.recommendationCount, 1);
  assert.equal(analyzed.result.recommendations[0].severity, 'critical');
  assert.equal(analyzed.result.recommendations[0].status, 'detected');
  assert.match(analyzed.result.recommendations[0].recommendedAction, /change orders/i);
  assert.match(analyzed.result.truthBoundary, /not autonomous/i);

  const replay = await gateway.dispatch(
    request(52, 'aqua.company.signals.ingest', params),
    drawHeaders,
  );
  assert.equal(replay.result.duplicate, true);
  assert.equal(
    replay.result.recommendations[0].recommendationId,
    analyzed.result.recommendations[0].recommendationId,
  );

  const health = await gateway.dispatch(
    request(53, 'aqua.company.health'),
    ownerHeaders,
  );
  assert.equal(health.result.summary.critical, 1);
  assert.equal(health.result.signals[0].value, 18);
  assert.match(health.result.truthBoundary, /missing data is not estimated/i);
});

test('Dave controls the recommendation lifecycle and invalid shortcuts fail closed', async () => {
  const { gateway, ownerHeaders, drawHeaders } = createHarness();
  const analyzed = await gateway.dispatch(request(60, 'aqua.company.signals.ingest', {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    batchId: 'batch-draw-health-0002',
    checkpoint: 'draw:health:43',
    signals: [grossMarginSignal({ signalId: 'signal-project-carly-margin-0002' })],
  }), drawHeaders);
  const recommendationId = analyzed.result.recommendations[0].recommendationId;

  const shortcut = await gateway.dispatch(request(61, 'aqua.recommendation.transition', {
    recommendationId,
    nextStatus: 'accepted',
    ownerNote: 'Do it.',
    assignee: '',
    dueAt: '',
    measuredOutcome: '',
    correlationId: 'cor-recommendation-0001',
  }), ownerHeaders);
  assert.equal(shortcut.error.code, -32038);

  for (const [index, nextStatus] of ['proposed', 'reviewed', 'accepted'].entries()) {
    const result = await gateway.dispatch(request(62 + index, 'aqua.recommendation.transition', {
      recommendationId,
      nextStatus,
      ownerNote: `Dave ${nextStatus} the margin review.`,
      assignee: '',
      dueAt: '',
      measuredOutcome: '',
      correlationId: `cor-recommendation-000${index + 2}`,
    }), ownerHeaders);
    assert.equal(result.result.recommendation.status, nextStatus);
  }
});

test('company intelligence survives durable restoration and appears in workday briefs', async () => {
  const first = createHarness();
  await first.gateway.dispatch(request(70, 'aqua.company.signals.ingest', {
    capabilityId: 'draw',
    tenantId: 'tenant-a',
    batchId: 'batch-draw-health-0003',
    checkpoint: 'draw:health:44',
    signals: [grossMarginSignal({ signalId: 'signal-project-carly-margin-0003' })],
  }), first.drawHeaders);

  const restored = createHarness({
    intelligence: new ExecutiveIntelligenceStore(first.intelligence.snapshot()),
  });
  const brief = await restored.gateway.dispatch(request(71, 'aqua.executive.brief', {
    phase: 'check_in',
    workdayId: '',
  }), restored.ownerHeaders);
  assert.equal(brief.result.companyHealth.summary.critical, 1);
  assert.equal(brief.result.companyHealth.recommendations.length, 1);
});

function canvasCaptureParams(overrides = {}) {
  return {
    localCaptureId: 'widget-idea-0001',
    source: 'sentinel_widget',
    kind: 'idea',
    title: 'Roof maintenance subscription',
    text: 'Create a preventative roof maintenance plan for repeat customers.',
    attachmentRefs: [],
    capturedAt: '2026-08-07T14:00:00.000Z',
    correlationId: 'cor-widget-canvas-0001',
    idempotencyKey: 'idem-widget-canvas-0001',
    ...overrides,
  };
}

test('the widget saves an immutable, idempotent thought into Polly Canvas', async () => {
  const { gateway, ownerHeaders } = createHarness();
  const captured = await gateway.dispatch(
    request(80, 'aqua.canvas.capture', canvasCaptureParams()),
    ownerHeaders,
  );
  assert.equal(captured.result.status, 'inbox');
  assert.equal(captured.result.original.source, 'sentinel_widget');
  assert.equal(captured.result.original.kind, 'idea');
  assert.equal(captured.result.duplicate, false);

  const replay = await gateway.dispatch(
    request(81, 'aqua.canvas.capture', canvasCaptureParams()),
    ownerHeaders,
  );
  assert.equal(replay.result.canvasId, captured.result.canvasId);
  assert.equal(replay.result.duplicate, true);

  const conflict = await gateway.dispatch(request(82, 'aqua.canvas.capture', canvasCaptureParams({
    text: 'Different content with the same request identity.',
  })), ownerHeaders);
  assert.equal(conflict.error.code, -32039);

  const discussed = await gateway.dispatch(request(83, 'aqua.canvas.note', {
    canvasId: captured.result.canvasId,
    noteKind: 'aqua_expansion',
    content: 'Test recurring inspections, documentation, pricing, and renewal reminders.',
    correlationId: 'cor-widget-canvas-note-0001',
  }), ownerHeaders);
  assert.equal(discussed.result.item.status, 'developing');
  assert.equal(
    discussed.result.item.original.text,
    'Create a preventative roof maintenance plan for repeat customers.',
  );
  assert.equal(discussed.result.item.notes.length, 1);
});

test('Canvas routing is prepared deliberately and protected destinations require confirmation', async () => {
  const { gateway, ownerHeaders } = createHarness();
  const captured = await gateway.dispatch(
    request(90, 'aqua.canvas.capture', canvasCaptureParams()),
    ownerHeaders,
  );
  const canvasId = captured.result.canvasId;
  const routeParams = {
    canvasId,
    capabilityId: 'draw',
    operation: 'employee.retrieve',
    purpose: 'Ask AquaDraw for a project-plan starting point.',
    safetyClass: 'read',
    ownerConfirmed: false,
    correlationId: 'cor-widget-route-0001',
    idempotencyKey: 'idem-widget-route-0001',
  };
  const prepared = await gateway.dispatch(
    request(91, 'aqua.canvas.route.prepare', routeParams),
    ownerHeaders,
  );
  assert.equal(prepared.result.route.status, 'prepared');
  assert.match(prepared.result.route.truthBoundary, /execute and verify it separately/i);

  const unconfirmed = await gateway.dispatch(request(92, 'aqua.canvas.route.prepare', {
    ...routeParams,
    safetyClass: 'external',
    idempotencyKey: 'idem-widget-route-0002',
  }), ownerHeaders);
  assert.equal(unconfirmed.error.code, -32041);
});

test('Polly Canvas discussion and archive state survive durable restoration', async () => {
  const first = createHarness();
  const captured = await first.gateway.dispatch(
    request(100, 'aqua.canvas.capture', canvasCaptureParams()),
    first.ownerHeaders,
  );
  await first.gateway.dispatch(request(101, 'aqua.canvas.archive', {
    canvasId: captured.result.canvasId,
    reason: 'Keep for next-quarter service planning.',
    correlationId: 'cor-widget-archive-0001',
  }), first.ownerHeaders);

  const restored = createHarness({
    canvas: new PollyCanvasStore(first.canvas.snapshot()),
  });
  const archived = await restored.gateway.dispatch(request(102, 'aqua.canvas.list', {
    statuses: ['archived'],
    limit: 10,
  }), restored.ownerHeaders);
  assert.equal(archived.result.items.length, 1);
  assert.equal(archived.result.items[0].archivedReason, 'Keep for next-quarter service planning.');

  const blocked = await restored.gateway.dispatch(request(103, 'aqua.canvas.note', {
    canvasId: captured.result.canvasId,
    noteKind: 'question',
    content: 'Should this still be active?',
    correlationId: 'cor-widget-archived-note-0001',
  }), restored.ownerHeaders);
  assert.equal(blocked.error.code, -32041);
});
