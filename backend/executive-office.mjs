import { createHash, randomUUID } from 'node:crypto';

const protectedSafetyClasses = new Set([
  'write',
  'destructive',
  'external',
  'financial',
  'sensitive',
]);

function clone(value) {
  return structuredClone(value);
}

function payloadHash(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function sortNewest(left, right) {
  return String(right.updatedAt ?? right.createdAt).localeCompare(
    String(left.updatedAt ?? left.createdAt),
  );
}

function meaningfulEmployeeUpdate(status) {
  return ['verified', 'needs_attention', 'failed'].includes(status);
}

export class ExecutiveOfficeConflictError extends Error {}
export class ExecutiveOfficeNotFoundError extends Error {}
export class ExecutiveOfficePermissionError extends Error {}

export class ExecutiveOfficeStore {
  #workOrders = new Map();
  #delegateReceipts = new Map();
  #reportReceipts = new Map();
  #neuralDeliveries = new Map();
  #workdays = new Map();
  #auditEvents = [];

  constructor(seed = {}) {
    this.#workOrders = new Map(
      Array.isArray(seed.workOrders)
        ? seed.workOrders.map((order) => [order.workId, clone(order)])
        : [],
    );
    this.#delegateReceipts = new Map(
      Array.isArray(seed.delegateReceipts)
        ? seed.delegateReceipts.map(([key, receipt]) => [key, clone(receipt)])
        : [],
    );
    this.#reportReceipts = new Map(
      Array.isArray(seed.reportReceipts)
        ? seed.reportReceipts.map(([key, receipt]) => [key, clone(receipt)])
        : [],
    );
    this.#neuralDeliveries = new Map(
      Array.isArray(seed.neuralDeliveries)
        ? seed.neuralDeliveries.map((delivery) => [delivery.deliveryId, clone(delivery)])
        : [],
    );
    this.#workdays = new Map(
      Array.isArray(seed.workdays)
        ? seed.workdays.map((workday) => [workday.workdayId, clone(workday)])
        : [],
    );
    this.#auditEvents = Array.isArray(seed.auditEvents)
      ? seed.auditEvents.map((event) => clone(event))
      : [];
  }

  snapshot() {
    return {
      workOrders: Array.from(this.#workOrders.values(), clone),
      delegateReceipts: Array.from(
        this.#delegateReceipts.entries(),
        ([key, receipt]) => [key, clone(receipt)],
      ),
      reportReceipts: Array.from(
        this.#reportReceipts.entries(),
        ([key, receipt]) => [key, clone(receipt)],
      ),
      neuralDeliveries: Array.from(this.#neuralDeliveries.values(), clone),
      workdays: Array.from(this.#workdays.values(), clone),
      auditEvents: this.#auditEvents.map((event) => clone(event)),
    };
  }

  #audit({ tenantId, actorId, actorType, eventType, correlationId, subjectId, details }) {
    const event = {
      auditId: randomUUID(),
      tenantId,
      actorId,
      actorType,
      eventType,
      correlationId,
      subjectId,
      details: clone(details),
      occurredAt: new Date().toISOString(),
    };
    this.#auditEvents.push(event);
    return event;
  }

  createNavigationTicket({ tenantId, userId, manifest, purpose, correlationId }) {
    const ticket = {
      navigationTicketId: randomUUID(),
      tenantId,
      userId,
      capabilityId: manifest.id,
      appName: manifest.name,
      route: manifest.route,
      purpose,
      correlationId,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      truthBoundary:
        'The authenticated navigation route is prepared; the destination app must confirm launch and every resulting action separately.',
    };
    const auditEvent = this.#audit({
      tenantId,
      actorId: userId,
      actorType: 'owner',
      eventType: 'office.navigation.prepared',
      correlationId,
      subjectId: ticket.navigationTicketId,
      details: { capabilityId: manifest.id, purpose },
    });
    ticket.auditReference = {
      auditId: auditEvent.auditId,
      eventType: auditEvent.eventType,
      occurredAt: auditEvent.occurredAt,
    };
    return clone(ticket);
  }

  delegate({
    tenantId,
    userId,
    manifest,
    operation,
    instruction,
    payload,
    safetyClass,
    ownerConfirmed,
    correlationId,
    idempotencyKey,
    dueAt,
  }) {
    if (protectedSafetyClasses.has(safetyClass) && !ownerConfirmed) {
      throw new ExecutiveOfficePermissionError(
        `Owner confirmation is required for ${safetyClass} work.`,
      );
    }

    const key = `${tenantId}:${idempotencyKey}`;
    const hash = payloadHash({
      capabilityId: manifest.id,
      operation,
      instruction,
      payload,
      safetyClass,
      dueAt,
    });
    const prior = this.#delegateReceipts.get(key);
    if (prior) {
      if (prior.payloadHash !== hash) {
        throw new ExecutiveOfficeConflictError(
          'This delegation idempotency key was already used for different work.',
        );
      }
      return { ...clone(this.#workOrders.get(prior.workId)), duplicate: true };
    }

    const now = new Date().toISOString();
    const workOrder = {
      contractVersion: 'aqua-executive-office/1.0.0',
      workId: randomUUID(),
      tenantId,
      requestedBy: userId,
      capabilityId: manifest.id,
      appName: manifest.name,
      operation,
      instruction,
      payload: clone(payload),
      safetyClass,
      ownerConfirmed: protectedSafetyClasses.has(safetyClass),
      correlationId,
      idempotencyKey,
      status: 'queued',
      deliveryState: ['adapter_required', 'adapter_prepared'].includes(manifest.status)
        ? 'awaiting_adapter'
        : 'available_to_employee',
      dueAt,
      createdAt: now,
      updatedAt: now,
      latestReport: null,
      duplicate: false,
    };
    this.#workOrders.set(workOrder.workId, workOrder);
    this.#delegateReceipts.set(key, { workId: workOrder.workId, payloadHash: hash });
    const auditEvent = this.#audit({
      tenantId,
      actorId: userId,
      actorType: 'owner',
      eventType: 'employee.work.delegated',
      correlationId,
      subjectId: workOrder.workId,
      details: {
        capabilityId: manifest.id,
        operation,
        safetyClass,
        deliveryState: workOrder.deliveryState,
      },
    });
    workOrder.auditReference = {
      auditId: auditEvent.auditId,
      eventType: auditEvent.eventType,
      occurredAt: auditEvent.occurredAt,
    };
    return clone(workOrder);
  }

  listEmployeeWork({ tenantId, capabilityId, statuses, limit }) {
    const allowed = new Set(statuses);
    return Array.from(this.#workOrders.values())
      .filter((order) => order.tenantId === tenantId)
      .filter((order) => order.capabilityId === capabilityId)
      .filter((order) => !allowed.size || allowed.has(order.status))
      .sort(sortNewest)
      .slice(0, limit)
      .map((order) => clone(order));
  }

  reportEmployeeWork({
    tenantId,
    capabilityId,
    workId,
    status,
    summary,
    evidence,
    correlationId,
    idempotencyKey,
  }) {
    const workOrder = this.#workOrders.get(workId);
    if (
      !workOrder ||
      workOrder.tenantId !== tenantId ||
      workOrder.capabilityId !== capabilityId
    ) {
      throw new ExecutiveOfficeNotFoundError('The delegated work was not found.');
    }
    if (status === 'verified' && evidence.length === 0) {
      throw new ExecutiveOfficePermissionError(
        'Verified employee work requires at least one evidence reference.',
      );
    }

    const key = `${tenantId}:${capabilityId}:${idempotencyKey}`;
    const hash = payloadHash({ workId, status, summary, evidence, correlationId });
    const prior = this.#reportReceipts.get(key);
    if (prior) {
      if (prior.payloadHash !== hash) {
        throw new ExecutiveOfficeConflictError(
          'This employee report idempotency key was already used for a different report.',
        );
      }
      return { ...clone(prior.receipt), duplicate: true };
    }

    const now = new Date().toISOString();
    const report = {
      reportId: randomUUID(),
      workId,
      capabilityId,
      status,
      summary,
      evidence: clone(evidence),
      correlationId,
      idempotencyKey,
      reportedAt: now,
    };
    workOrder.status = status;
    workOrder.deliveryState = 'reported_by_employee';
    workOrder.updatedAt = now;
    workOrder.latestReport = report;

    let delivery = null;
    if (meaningfulEmployeeUpdate(status)) {
      delivery = {
        deliveryId: randomUUID(),
        tenantId,
        workId,
        capabilityId,
        appName: workOrder.appName,
        status,
        summary,
        evidence: clone(evidence),
        correlationId,
        reviewState: 'unread',
        ownerNote: '',
        createdAt: now,
        updatedAt: now,
      };
      this.#neuralDeliveries.set(delivery.deliveryId, delivery);
      workOrder.deliveryState = 'delivered_to_neural';
    }

    const auditEvent = this.#audit({
      tenantId,
      actorId: capabilityId,
      actorType: 'employee_app',
      eventType: `employee.work.${status}`,
      correlationId,
      subjectId: workId,
      details: {
        reportId: report.reportId,
        evidenceCount: evidence.length,
        evidenceIds: evidence.map((item) => item.evidenceId),
      },
    });
    const auditReference = {
      auditId: auditEvent.auditId,
      eventType: auditEvent.eventType,
      occurredAt: auditEvent.occurredAt,
    };
    report.auditReference = auditReference;
    if (delivery) delivery.auditReference = auditReference;

    const receipt = {
      status: 'Confirmed',
      workId,
      report: clone(report),
      neuralDelivery: delivery ? clone(delivery) : null,
      auditReference: clone(auditReference),
      duplicate: false,
      truthBoundary:
        status === 'verified'
          ? 'The owning application reported verified work with evidence; Sentinel preserved the report for owner review.'
          : 'Sentinel preserved the employee status report without representing it as verified completion.',
    };
    this.#reportReceipts.set(key, { payloadHash: hash, receipt: clone(receipt) });
    return receipt;
  }

  listNeuralDeliveries({ tenantId, reviewState, limit }) {
    return Array.from(this.#neuralDeliveries.values())
      .filter((delivery) => delivery.tenantId === tenantId)
      .filter((delivery) => reviewState === 'all' || delivery.reviewState === reviewState)
      .sort(sortNewest)
      .slice(0, limit)
      .map((delivery) => clone(delivery));
  }

  acknowledgeNeuralDelivery({
    tenantId,
    userId,
    deliveryId,
    disposition,
    ownerNote,
    correlationId,
  }) {
    const delivery = this.#neuralDeliveries.get(deliveryId);
    if (!delivery || delivery.tenantId !== tenantId) {
      throw new ExecutiveOfficeNotFoundError('The Neural delivery was not found.');
    }
    const now = new Date().toISOString();
    delivery.reviewState = disposition;
    delivery.ownerNote = ownerNote;
    delivery.updatedAt = now;
    delivery.reviewedAt = now;
    delivery.reviewedBy = userId;

    const workOrder = this.#workOrders.get(delivery.workId);
    if (workOrder && disposition === 'sent_back') {
      workOrder.status = 'queued';
      workOrder.deliveryState = 'returned_to_employee';
      workOrder.updatedAt = now;
    }
    this.#audit({
      tenantId,
      actorId: userId,
      actorType: 'owner',
      eventType: `neural.delivery.${disposition}`,
      correlationId,
      subjectId: deliveryId,
      details: { workId: delivery.workId, ownerNote },
    });
    return {
      status: 'Confirmed',
      delivery: clone(delivery),
      work: workOrder ? clone(workOrder) : null,
    };
  }

  buildExecutiveBrief({ tenantId, userId, phase, workdayId, registry }) {
    let workday = workdayId ? this.#workdays.get(workdayId) : null;
    if (workday && (workday.tenantId !== tenantId || workday.userId !== userId)) {
      throw new ExecutiveOfficeNotFoundError('The executive workday was not found.');
    }
    if (!workday) {
      workday = Array.from(this.#workdays.values())
        .filter((candidate) =>
          candidate.tenantId === tenantId &&
          candidate.userId === userId &&
          candidate.status === 'open',
        )
        .sort(sortNewest)[0];
    }
    if (!workday) {
      const now = new Date().toISOString();
      workday = {
        workdayId: randomUUID(),
        tenantId,
        userId,
        status: 'open',
        openedAt: now,
        updatedAt: now,
        closedAt: '',
      };
      this.#workdays.set(workday.workdayId, workday);
    }

    const work = Array.from(this.#workOrders.values())
      .filter((order) => order.tenantId === tenantId);
    const unread = this.listNeuralDeliveries({
      tenantId,
      reviewState: 'unread',
      limit: 100,
    });
    const employees = registry.map((manifest) => {
      const assigned = work.filter((order) => order.capabilityId === manifest.id);
      return {
        capabilityId: manifest.id,
        appName: manifest.name,
        connectionStatus: manifest.status,
        queued: assigned.filter((order) => order.status === 'queued').length,
        inProgress: assigned.filter((order) => order.status === 'in_progress').length,
        verified: assigned.filter((order) => order.status === 'verified').length,
        needsAttention: assigned.filter((order) =>
          ['needs_attention', 'failed'].includes(order.status),
        ).length,
        lastSyncedAt: manifest.lastSyncedAt ?? '',
      };
    });
    const generatedAt = new Date().toISOString();
    if (phase === 'shift_close') {
      workday.status = 'closed';
      workday.closedAt = generatedAt;
    }
    workday.updatedAt = generatedAt;

    const report = {
      contractVersion: 'aqua-executive-office/1.0.0',
      briefId: randomUUID(),
      workdayId: workday.workdayId,
      phase,
      status: 'Confirmed',
      generatedAt,
      workdayStatus: workday.status,
      overview: {
        queued: work.filter((order) => order.status === 'queued').length,
        inProgress: work.filter((order) => order.status === 'in_progress').length,
        verified: work.filter((order) => order.status === 'verified').length,
        needsAttention: work.filter((order) =>
          ['needs_attention', 'failed'].includes(order.status),
        ).length,
        unreadNeuralDeliveries: unread.length,
      },
      employees,
      decisions: unread.slice(0, 20),
      recentVerifiedWork: work
        .filter((order) => order.status === 'verified')
        .sort(sortNewest)
        .slice(0, 20)
        .map((order) => clone(order)),
      blockers: work
        .filter((order) =>
          order.deliveryState === 'awaiting_adapter' ||
          ['needs_attention', 'failed'].includes(order.status),
        )
        .sort(sortNewest)
        .slice(0, 20)
        .map((order) => clone(order)),
      truthBoundary:
        'This brief summarizes only registered apps, preserved work orders, authenticated employee reports, and verified evidence already held by Sentinel. Missing app adapters remain visible as blockers.',
    };
    this.#audit({
      tenantId,
      actorId: userId,
      actorType: 'owner',
      eventType: `executive.brief.${phase}`,
      correlationId: report.briefId,
      subjectId: workday.workdayId,
      details: report.overview,
    });
    return report;
  }
}
