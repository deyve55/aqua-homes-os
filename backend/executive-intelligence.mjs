import { createHash, randomUUID } from 'node:crypto';

const lifecycle = Object.freeze({
  detected: ['proposed', 'rejected'],
  proposed: ['reviewed', 'rejected'],
  reviewed: ['accepted', 'rejected'],
  accepted: ['assigned'],
  assigned: ['in_progress'],
  in_progress: ['verified'],
  verified: ['measured'],
  measured: ['closed'],
  rejected: [],
  closed: [],
});

const actionGuidance = Object.freeze({
  gross_margin_percent:
    'Review contract value, approved change orders, labor, material, subcontractor, and rework evidence; then decide whether to correct scope, price, execution, or stop-loss exposure.',
  contribution_margin_percent:
    'Review incremental revenue and variable job costs before accepting more work of the same type.',
  labor_cost_variance_percent:
    'Review accepted time allocation, crew composition, production quantities, access conditions, and rework evidence.',
  material_waste_percent:
    'Review takeoff quantities, purchases, returns, damaged material, storage, and field usage before changing buying levels.',
  schedule_variance_days:
    'Review critical dependencies, crew capacity, material lead times, access constraints, and customer commitments.',
  receivables_days:
    'Review verified invoice status, disputes, promised payment dates, and collection ownership.',
  cash_flow_exposure_minor:
    'Review committed cash outflow, verified receivables, payroll timing, and near-term funding requirements.',
});

function clone(value) {
  return structuredClone(value);
}

function hash(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function breachFor(signal) {
  if (signal.target === null) return null;
  const unfavorableGap = signal.direction === 'higher_is_better'
    ? signal.target - signal.value
    : signal.value - signal.target;
  if (unfavorableGap <= signal.varianceTolerance) return null;
  const denominator = Math.max(Math.abs(signal.target), 1);
  const relativeGap = unfavorableGap / denominator;
  return {
    unfavorableGap,
    relativeGap,
    severity: relativeGap >= 0.2 ? 'critical' : relativeGap >= 0.1 ? 'warning' : 'watch',
  };
}

function recommendationKey(tenantId, signal) {
  return `${tenantId}:${signal.metricId}:${signal.entityType}:${signal.entityId}`;
}

function signalKey(tenantId, capabilityId, signalId) {
  return `${tenantId}:${capabilityId}:${signalId}`;
}

export class IntelligenceConflictError extends Error {}
export class IntelligenceNotFoundError extends Error {}
export class IntelligenceTransitionError extends Error {}

export class ExecutiveIntelligenceStore {
  #signals = new Map();
  #batchReceipts = new Map();
  #recommendations = new Map();
  #recommendationIndex = new Map();
  #auditEvents = [];

  constructor(seed = {}) {
    this.#signals = new Map(
      Array.isArray(seed.signals)
        ? seed.signals.map(([key, value]) => [key, clone(value)])
        : [],
    );
    this.#batchReceipts = new Map(
      Array.isArray(seed.batchReceipts)
        ? seed.batchReceipts.map(([key, value]) => [key, clone(value)])
        : [],
    );
    this.#recommendations = new Map(
      Array.isArray(seed.recommendations)
        ? seed.recommendations.map((value) => [value.recommendationId, clone(value)])
        : [],
    );
    this.#recommendationIndex = new Map(
      Array.isArray(seed.recommendationIndex) ? seed.recommendationIndex : [],
    );
    this.#auditEvents = Array.isArray(seed.auditEvents)
      ? seed.auditEvents.map((value) => clone(value))
      : [];
  }

  snapshot() {
    return {
      signals: Array.from(this.#signals.entries(), ([key, value]) => [key, clone(value)]),
      batchReceipts: Array.from(
        this.#batchReceipts.entries(),
        ([key, value]) => [key, clone(value)],
      ),
      recommendations: Array.from(this.#recommendations.values(), clone),
      recommendationIndex: Array.from(this.#recommendationIndex.entries()),
      auditEvents: this.#auditEvents.map((value) => clone(value)),
    };
  }

  #audit({ tenantId, actorId, eventType, subjectId, correlationId, details }) {
    this.#auditEvents.push({
      auditId: randomUUID(),
      tenantId,
      actorId,
      eventType,
      subjectId,
      correlationId,
      details: clone(details),
      occurredAt: new Date().toISOString(),
    });
  }

  #analyzeSignal({ tenantId, capabilityId, signal, receivedAt }) {
    const breach = breachFor(signal);
    if (!breach) return null;
    const key = recommendationKey(tenantId, signal);
    const existingId = this.#recommendationIndex.get(key);
    const existing = existingId ? this.#recommendations.get(existingId) : null;
    const base = {
      tenantId,
      capabilityId,
      metricId: signal.metricId,
      metricName: signal.metricName,
      entityType: signal.entityType,
      entityId: signal.entityId,
      severity: breach.severity,
      title: `${signal.metricName} is outside its verified target`,
      finding: {
        value: signal.value,
        target: signal.target,
        unit: signal.unit,
        varianceTolerance: signal.varianceTolerance,
        unfavorableGap: breach.unfavorableGap,
        formula:
          signal.direction === 'higher_is_better'
            ? 'target - actual - tolerance'
            : 'actual - target - tolerance',
      },
      recommendedAction: actionGuidance[signal.metricId]
        ?? 'Review the authoritative source records, confirm the cause, assign a corrective action, and measure the result.',
      assumptions: [
        'The owning app supplied the metric, target, direction, tolerance, and evidence.',
        'No causal claim is made until the supporting records are reviewed.',
      ],
      confidence: signal.confidence,
      evidence: clone(signal.evidence),
      sourceSignalId: signal.signalId,
      detectedAt: existing?.detectedAt ?? receivedAt,
      updatedAt: receivedAt,
    };
    if (existing && !['rejected', 'closed'].includes(existing.status)) {
      Object.assign(existing, base);
      return clone(existing);
    }
    const recommendation = {
      recommendationId: randomUUID(),
      status: 'detected',
      ownerNote: '',
      assignee: '',
      dueAt: '',
      measuredOutcome: '',
      history: [{ status: 'detected', at: receivedAt, actorId: capabilityId, note: '' }],
      ...base,
    };
    this.#recommendations.set(recommendation.recommendationId, recommendation);
    this.#recommendationIndex.set(key, recommendation.recommendationId);
    return clone(recommendation);
  }

  ingestSignals({ tenantId, capabilityId, batchId, checkpoint, signals }) {
    const receiptKey = `${tenantId}:${capabilityId}:${batchId}`;
    const batchHash = hash({ checkpoint, signals });
    const prior = this.#batchReceipts.get(receiptKey);
    if (prior) {
      if (prior.batchHash !== batchHash) {
        throw new IntelligenceConflictError(
          'This company-signal batch ID was already used for different data.',
        );
      }
      return { ...clone(prior.receipt), duplicate: true };
    }

    const receivedAt = new Date().toISOString();
    const detected = [];
    for (const signal of signals) {
      this.#signals.set(signalKey(tenantId, capabilityId, signal.signalId), {
        ...clone(signal),
        tenantId,
        capabilityId,
        receivedAt,
      });
      const recommendation = this.#analyzeSignal({
        tenantId,
        capabilityId,
        signal,
        receivedAt,
      });
      if (recommendation) detected.push(recommendation);
    }
    const receipt = {
      status: 'Confirmed',
      tenantId,
      capabilityId,
      batchId,
      checkpoint,
      signalCount: signals.length,
      recommendationCount: detected.length,
      recommendations: detected,
      analyzedAt: receivedAt,
      duplicate: false,
      truthBoundary:
        'Signals were analyzed against app-supplied targets and tolerances. Recommendations are evidence-backed proposals, not autonomous company decisions.',
    };
    this.#batchReceipts.set(receiptKey, { batchHash, receipt: clone(receipt) });
    this.#audit({
      tenantId,
      actorId: capabilityId,
      eventType: 'company.signals.analyzed',
      subjectId: batchId,
      correlationId: batchId,
      details: {
        signalCount: signals.length,
        recommendationCount: detected.length,
      },
    });
    return receipt;
  }

  getCompanyHealth({ tenantId }) {
    const latestByMetric = new Map();
    for (const signal of this.#signals.values()) {
      if (signal.tenantId !== tenantId) continue;
      const key = `${signal.metricId}:${signal.entityType}:${signal.entityId}`;
      const prior = latestByMetric.get(key);
      if (!prior || signal.periodEnd > prior.periodEnd) latestByMetric.set(key, signal);
    }
    const recommendations = Array.from(this.#recommendations.values())
      .filter((item) => item.tenantId === tenantId)
      .filter((item) => !['rejected', 'closed'].includes(item.status))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .map((item) => clone(item));
    return {
      contractVersion: 'aqua-executive-intelligence/1.0.0',
      status: 'Confirmed',
      generatedAt: new Date().toISOString(),
      signals: Array.from(latestByMetric.values(), clone),
      recommendations,
      summary: {
        signals: latestByMetric.size,
        critical: recommendations.filter((item) => item.severity === 'critical').length,
        warning: recommendations.filter((item) => item.severity === 'warning').length,
        watch: recommendations.filter((item) => item.severity === 'watch').length,
      },
      truthBoundary:
        'Company health includes only authenticated, evidence-bearing signals supplied by authoritative applications. Missing data is not estimated silently.',
    };
  }

  transitionRecommendation({
    tenantId,
    userId,
    recommendationId,
    nextStatus,
    ownerNote,
    assignee,
    dueAt,
    measuredOutcome,
    correlationId,
  }) {
    const recommendation = this.#recommendations.get(recommendationId);
    if (!recommendation || recommendation.tenantId !== tenantId) {
      throw new IntelligenceNotFoundError('The executive recommendation was not found.');
    }
    if (!lifecycle[recommendation.status].includes(nextStatus)) {
      throw new IntelligenceTransitionError(
        `Recommendation cannot move from ${recommendation.status} to ${nextStatus}.`,
      );
    }
    const now = new Date().toISOString();
    recommendation.status = nextStatus;
    recommendation.ownerNote = ownerNote;
    recommendation.assignee = assignee;
    recommendation.dueAt = dueAt;
    recommendation.measuredOutcome = measuredOutcome;
    recommendation.updatedAt = now;
    recommendation.history.push({
      status: nextStatus,
      at: now,
      actorId: userId,
      note: ownerNote,
    });
    this.#audit({
      tenantId,
      actorId: userId,
      eventType: `recommendation.${nextStatus}`,
      subjectId: recommendationId,
      correlationId,
      details: { assignee, dueAt, measuredOutcome },
    });
    return { status: 'Confirmed', recommendation: clone(recommendation) };
  }
}
