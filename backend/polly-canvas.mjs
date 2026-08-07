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

function hash(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

export class PollyCanvasConflictError extends Error {}
export class PollyCanvasNotFoundError extends Error {}
export class PollyCanvasPermissionError extends Error {}

export class PollyCanvasStore {
  #items = new Map();
  #captureReceipts = new Map();
  #routeReceipts = new Map();
  #auditEvents = [];

  constructor(seed = {}) {
    this.#items = new Map(
      Array.isArray(seed.items)
        ? seed.items.map((item) => [item.canvasId, clone(item)])
        : [],
    );
    this.#captureReceipts = new Map(
      Array.isArray(seed.captureReceipts)
        ? seed.captureReceipts.map(([key, value]) => [key, clone(value)])
        : [],
    );
    this.#routeReceipts = new Map(
      Array.isArray(seed.routeReceipts)
        ? seed.routeReceipts.map(([key, value]) => [key, clone(value)])
        : [],
    );
    this.#auditEvents = Array.isArray(seed.auditEvents)
      ? seed.auditEvents.map((event) => clone(event))
      : [];
  }

  snapshot() {
    return {
      items: Array.from(this.#items.values(), clone),
      captureReceipts: Array.from(
        this.#captureReceipts.entries(),
        ([key, value]) => [key, clone(value)],
      ),
      routeReceipts: Array.from(
        this.#routeReceipts.entries(),
        ([key, value]) => [key, clone(value)],
      ),
      auditEvents: this.#auditEvents.map((event) => clone(event)),
    };
  }

  #audit({ tenantId, userId, eventType, canvasId, correlationId, details }) {
    this.#auditEvents.push({
      auditId: randomUUID(),
      tenantId,
      userId,
      eventType,
      canvasId,
      correlationId,
      details: clone(details),
      occurredAt: new Date().toISOString(),
    });
  }

  capture({
    tenantId,
    userId,
    localCaptureId,
    source,
    kind,
    title,
    text,
    attachmentRefs,
    capturedAt,
    correlationId,
    idempotencyKey,
  }) {
    const receiptKey = `${tenantId}:${idempotencyKey}`;
    const captureHash = hash({
      localCaptureId,
      source,
      kind,
      title,
      text,
      attachmentRefs,
      capturedAt,
    });
    const prior = this.#captureReceipts.get(receiptKey);
    if (prior) {
      if (prior.captureHash !== captureHash) {
        throw new PollyCanvasConflictError(
          'This Canvas capture idempotency key was already used for different content.',
        );
      }
      return { ...clone(this.#items.get(prior.canvasId)), duplicate: true };
    }

    const now = new Date().toISOString();
    const item = {
      contractVersion: 'aqua-polly-canvas/1.0.0',
      canvasId: randomUUID(),
      tenantId,
      userId,
      status: 'inbox',
      original: {
        localCaptureId,
        source,
        kind,
        title,
        text,
        attachmentRefs: clone(attachmentRefs),
        capturedAt,
        contentHash: captureHash,
      },
      workingTitle: title,
      notes: [],
      routeIntents: [],
      archivedReason: '',
      correlationId,
      idempotencyKey,
      createdAt: now,
      updatedAt: now,
      duplicate: false,
    };
    this.#items.set(item.canvasId, item);
    this.#captureReceipts.set(receiptKey, {
      canvasId: item.canvasId,
      captureHash,
    });
    this.#audit({
      tenantId,
      userId,
      eventType: 'canvas.capture.saved',
      canvasId: item.canvasId,
      correlationId,
      details: { source, kind, attachmentCount: attachmentRefs.length },
    });
    return clone(item);
  }

  list({ tenantId, userId, statuses, limit }) {
    const allowed = new Set(statuses);
    return Array.from(this.#items.values())
      .filter((item) => item.tenantId === tenantId && item.userId === userId)
      .filter((item) => !allowed.size || allowed.has(item.status))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .slice(0, limit)
      .map((item) => clone(item));
  }

  addNote({ tenantId, userId, canvasId, noteKind, content, correlationId }) {
    const item = this.#items.get(canvasId);
    if (!item || item.tenantId !== tenantId || item.userId !== userId) {
      throw new PollyCanvasNotFoundError('The Polly Canvas item was not found.');
    }
    if (item.status === 'archived') {
      throw new PollyCanvasPermissionError(
        'Archived Canvas items must be restored before discussion continues.',
      );
    }
    const now = new Date().toISOString();
    const note = {
      noteId: randomUUID(),
      noteKind,
      content,
      createdBy: userId,
      correlationId,
      createdAt: now,
    };
    item.notes.push(note);
    item.status = 'developing';
    item.updatedAt = now;
    this.#audit({
      tenantId,
      userId,
      eventType: `canvas.note.${noteKind}`,
      canvasId,
      correlationId,
      details: { noteId: note.noteId },
    });
    return { status: 'Confirmed', item: clone(item), note: clone(note) };
  }

  prepareRoute({
    tenantId,
    userId,
    canvasId,
    manifest,
    operation,
    purpose,
    safetyClass,
    ownerConfirmed,
    correlationId,
    idempotencyKey,
  }) {
    const item = this.#items.get(canvasId);
    if (!item || item.tenantId !== tenantId || item.userId !== userId) {
      throw new PollyCanvasNotFoundError('The Polly Canvas item was not found.');
    }
    if (item.status === 'archived') {
      throw new PollyCanvasPermissionError('Archived Canvas items cannot be routed.');
    }
    if (protectedSafetyClasses.has(safetyClass) && !ownerConfirmed) {
      throw new PollyCanvasPermissionError(
        `Owner confirmation is required for ${safetyClass} routing.`,
      );
    }

    const receiptKey = `${tenantId}:${idempotencyKey}`;
    const routeHash = hash({ canvasId, capabilityId: manifest.id, operation, purpose, safetyClass });
    const prior = this.#routeReceipts.get(receiptKey);
    if (prior) {
      if (prior.routeHash !== routeHash) {
        throw new PollyCanvasConflictError(
          'This Canvas route idempotency key was already used for a different destination.',
        );
      }
      const route = item.routeIntents.find((candidate) => candidate.routeIntentId === prior.routeIntentId);
      return { status: 'Confirmed', route: clone(route), duplicate: true };
    }

    const now = new Date().toISOString();
    const route = {
      routeIntentId: randomUUID(),
      capabilityId: manifest.id,
      appName: manifest.name,
      route: manifest.route,
      operation,
      purpose,
      safetyClass,
      ownerConfirmed: protectedSafetyClasses.has(safetyClass),
      status: 'prepared',
      correlationId,
      idempotencyKey,
      preparedAt: now,
      truthBoundary:
        'This route is prepared only. The destination app or employee work contract must execute and verify it separately.',
    };
    item.routeIntents.push(route);
    item.status = 'routing_prepared';
    item.updatedAt = now;
    this.#routeReceipts.set(receiptKey, {
      routeIntentId: route.routeIntentId,
      routeHash,
    });
    this.#audit({
      tenantId,
      userId,
      eventType: 'canvas.route.prepared',
      canvasId,
      correlationId,
      details: { capabilityId: manifest.id, operation, safetyClass },
    });
    return { status: 'Confirmed', route: clone(route), duplicate: false };
  }

  archive({ tenantId, userId, canvasId, reason, correlationId }) {
    const item = this.#items.get(canvasId);
    if (!item || item.tenantId !== tenantId || item.userId !== userId) {
      throw new PollyCanvasNotFoundError('The Polly Canvas item was not found.');
    }
    item.status = 'archived';
    item.archivedReason = reason;
    item.updatedAt = new Date().toISOString();
    this.#audit({
      tenantId,
      userId,
      eventType: 'canvas.item.archived',
      canvasId,
      correlationId,
      details: { reason },
    });
    return { status: 'Confirmed', item: clone(item) };
  }
}
