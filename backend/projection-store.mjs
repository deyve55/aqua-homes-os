import { createHash, randomUUID } from 'node:crypto';

function normalize(value) {
  return String(value ?? '').toLocaleLowerCase('en-US');
}

export class ProjectionStore {
  #records = [];
  #intents = new Map();
  #syncReceipts = new Map();

  constructor(seed = []) {
    if (Array.isArray(seed)) {
      this.#records = seed.map((record) => ({ ...record }));
      return;
    }
    this.#records = Array.isArray(seed?.records)
      ? seed.records.map((record) => ({ ...record }))
      : [];
    this.#intents = new Map(
      Array.isArray(seed?.intents)
        ? seed.intents.map((intent) => [intent.intentId, { ...intent }])
        : [],
    );
    this.#syncReceipts = new Map(
      Array.isArray(seed?.syncReceipts)
        ? seed.syncReceipts.map(([key, receipt]) => [key, { ...receipt }])
        : [],
    );
  }

  snapshot() {
    return {
      records: this.#records.map((record) => ({ ...record })),
      intents: Array.from(this.#intents.values(), (intent) => ({ ...intent })),
      syncReceipts: Array.from(
        this.#syncReceipts.entries(),
        ([key, receipt]) => [key, { ...receipt }],
      ),
    };
  }

  search({ query, kinds = [], limit = 5, tenantId }) {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return this.#records
      .filter((record) => record.tenantId === tenantId)
      .filter((record) => !kinds.length || kinds.includes(record.kind))
      .map((record) => {
        const haystack = normalize([
          record.title,
          record.subtitle,
          record.searchText,
          ...(record.fields ?? []).flatMap((field) => [field.label, field.value]),
        ].join(' '));
        const matches = terms.filter((term) => haystack.includes(term)).length;
        return { record, score: terms.length ? matches / terms.length : 0 };
      })
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, Math.max(1, Math.min(limit, 20)))
      .map(({ record, score }) => ({ ...record, confidence: Math.min(1, score) }));
  }

  prepareIntent({ tenantId, userId, capability, operation, payload }) {
    const intentId = randomUUID();
    const confirmationToken = randomUUID();
    const intent = {
      intentId,
      confirmationToken,
      tenantId,
      userId,
      capability,
      operation,
      payload,
      status: 'Queued',
      createdAt: new Date().toISOString(),
    };
    this.#intents.set(intentId, intent);
    return { ...intent };
  }

  syncProjections({
    capabilityId,
    sourceApp,
    tenantId,
    syncId,
    checkpoint,
    records,
    deletedSourceRecordIds = [],
  }) {
    const receiptKey = `${tenantId}:${capabilityId}:${syncId}`;
    const payloadHash = createHash('sha256').update(JSON.stringify({
      checkpoint,
      records,
      deletedSourceRecordIds,
    })).digest('hex');
    const prior = this.#syncReceipts.get(receiptKey);
    if (prior) {
      const { payloadHash: priorHash, ...priorReceipt } = prior;
      return {
        ...priorReceipt,
        duplicate: true,
        conflict: priorHash !== payloadHash,
      };
    }

    for (const record of records) {
      const index = this.#records.findIndex((candidate) =>
        candidate.tenantId === tenantId &&
        candidate.sourceCapability === capabilityId &&
        candidate.sourceRecordId === record.sourceRecordId,
      );
      const projection = {
        ...record,
        tenantId,
        sourceApp,
        sourceCapability: capabilityId,
      };
      if (index >= 0) this.#records[index] = projection;
      else this.#records.push(projection);
    }
    const deleted = new Set(deletedSourceRecordIds);
    this.#records = this.#records.filter((record) => !(
      record.tenantId === tenantId &&
      record.sourceCapability === capabilityId &&
      deleted.has(record.sourceRecordId)
    ));

    const receipt = {
      status: 'Confirmed',
      capabilityId,
      tenantId,
      syncId,
      checkpoint,
      recordCount: records.length,
      deletedCount: deleted.size,
      duplicate: false,
      conflict: false,
      syncedAt: new Date().toISOString(),
    };
    this.#syncReceipts.set(receiptKey, { ...receipt, payloadHash });
    return { ...receipt };
  }

  confirmIntent({ intentId, confirmationToken, tenantId, userId }) {
    const intent = this.#intents.get(intentId);
    if (!intent || intent.tenantId !== tenantId || intent.userId !== userId) return null;
    if (intent.confirmationToken !== confirmationToken) return null;
    intent.status = 'Needs Attention';
    intent.report = 'The authoritative satellite adapter is not connected yet; no record was changed.';
    return { ...intent };
  }
}
