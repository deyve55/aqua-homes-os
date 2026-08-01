const capabilities = [
  {
    id: 'crm',
    name: 'Aqua CRM',
    authority: 'clients, contacts, jobs, contracts, communications',
    recordKinds: ['client', 'job', 'contract'],
    actions: ['client.prepare_create', 'job.prepare_create', 'communication.prepare_draft'],
    route: 'aqua://crm',
    status: 'adapter_required',
  },
  {
    id: 'timesheet',
    name: 'Aqua Timesheet',
    authority: 'timecards, shifts, travel, approvals',
    recordKinds: ['timecard'],
    actions: ['timecard.prepare_approval'],
    route: 'aqua://timesheet',
    status: 'adapter_required',
  },
  {
    id: 'receipts',
    name: 'Aqua Receipts',
    authority: 'receipts, OCR, cost coding, filing status',
    recordKinds: ['receipt'],
    actions: ['receipt.prepare_file', 'receipt.prepare_correct'],
    route: 'aqua://receipts',
    status: 'adapter_required',
  },
  {
    id: 'knowledge-vault',
    name: 'Aqua Knowledge Vault',
    authority: 'documents, policies, evidence, semantic index',
    recordKinds: ['contract', 'file'],
    actions: ['file.prepare_share'],
    route: 'aqua://knowledge-vault',
    status: 'adapter_required',
  },
  {
    id: 'books',
    name: 'Aqua Books',
    authority: 'ledger, invoices, job costs, financial reports',
    recordKinds: [],
    actions: [],
    route: 'aqua://books',
    status: 'adapter_required',
  },
  {
    id: 'cam',
    name: 'Aqua Cam',
    authority: 'site photographs, video, visual evidence',
    recordKinds: ['file'],
    actions: ['capture.prepare_file'],
    route: 'aqua://cam',
    status: 'adapter_required',
  },
  {
    id: 'draw',
    name: 'Aqua Draw',
    authority: 'drawings, markups, field plans',
    recordKinds: ['file'],
    actions: [],
    route: 'aqua://draw',
    status: 'adapter_required',
  },
  {
    id: 'sentinel-files',
    name: 'Sentinel File Cabinet',
    authority: 'local captures, inbound filing queue, materialized projections',
    recordKinds: ['file', 'collection'],
    actions: ['file.prepare_route'],
    route: 'sentinel://command/files',
    status: 'local_ready',
  },
];

export class CapabilityRegistry {
  #capabilities;

  constructor(entries = capabilities) {
    this.#capabilities = entries.map((entry) => ({ ...entry }));
  }

  list() {
    return this.#capabilities.map((entry) => ({ ...entry }));
  }

  get(id) {
    const entry = this.#capabilities.find((candidate) => candidate.id === id);
    return entry ? { ...entry } : null;
  }

  findByRecordKind(kind) {
    return this.#capabilities
      .filter((entry) => entry.recordKinds.includes(kind))
      .map((entry) => ({ ...entry }));
  }

  markSynced(id, { syncId, checkpoint, recordCount, syncedAt }) {
    const entry = this.#capabilities.find((candidate) => candidate.id === id);
    if (!entry) return null;
    entry.status = 'projection_connected';
    entry.lastSyncId = syncId;
    entry.lastCheckpoint = checkpoint;
    entry.lastRecordCount = recordCount;
    entry.lastSyncedAt = syncedAt;
    return { ...entry };
  }
}
