const MONEY = /(?:\$\s*|\bUSD\s*)(\d{1,7}(?:,\d{3})*(?:\.\d{1,2})?)\b|\b(\d{1,7}(?:,\d{3})*(?:\.\d{1,2})?)\s+dollars?\b/i;

function clean(value) {
  return String(value ?? '').trim().replace(/[.,;:!?]+$/, '').trim();
}

function amountMinor(value) {
  const normalized = value.replace(/,/g, '');
  if (!/^\d{1,7}(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ''] = normalized.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) ? cents : null;
}

export function parseQuickExpenseCommand(raw) {
  const command = clean(raw);
  const match = MONEY.exec(command);
  if (!match) return null;
  const parsedAmount = amountMinor(match[1] || match[2]);
  if (parsedAmount === null) return null;

  const remainder = clean(command.slice(match.index + match[0].length));
  let customerQuery = '';
  let merchant = '';
  let context = /^\s*for\s+(.+?)\s+(?:at|from)\s+(.+)$/i.exec(remainder);
  if (context) {
    customerQuery = clean(context[1]);
    merchant = clean(context[2]);
  } else {
    context = /^\s*(?:at|from)\s+(.+?)\s+for\s+(.+)$/i.exec(remainder);
    if (context) {
      merchant = clean(context[1]);
      customerQuery = clean(context[2]);
    }
  }
  if (!merchant || !customerQuery) return null;
  return Object.freeze({
    command,
    amountMinor: parsedAmount,
    currencyCode: 'USD',
    customerQuery,
    merchant,
  });
}

function field(record, label) {
  return String(
    record?.fields?.find((candidate) =>
      String(candidate?.label || '').toLowerCase() === label.toLowerCase(),
    )?.value || '',
  ).trim();
}

function candidate(record) {
  return {
    sourceRecordId: record.sourceRecordId,
    kind: record.kind,
    name: record.title,
    address: field(record, 'address'),
    subtitle: record.subtitle || '',
  };
}

export function resolveQuickExpenseCapture({
  parsed,
  store,
  registry,
  identity,
  captureId,
  useCrm = false,
}) {
  if (!parsed || !captureId) return null;
  if (!useCrm) {
    return {
      captureId,
      amountMinor: parsed.amountMinor,
      currencyCode: parsed.currencyCode,
      merchant: parsed.merchant,
      customerQuery: parsed.customerQuery,
      resolution: 'provisional',
      selected: null,
      candidates: [],
      crmConnected: false,
      reconciliationState: 'Unreconciled',
    };
  }
  const jobs = store.search({
    tenantId: identity.tenantId,
    query: parsed.customerQuery,
    kinds: ['job'],
    limit: 20,
  });
  const records = jobs.length ? jobs : store.search({
    tenantId: identity.tenantId,
    query: parsed.customerQuery,
    kinds: ['client'],
    limit: 20,
  });
  const candidates = records.map(candidate);
  const resolution = candidates.length === 1
    ? 'single'
    : candidates.length > 1
      ? 'multiple'
      : 'unresolved';
  const selected = resolution === 'single' ? candidates[0] : null;
  const crmConnected = registry.get('crm')?.status === 'projection_connected';

  return {
    captureId,
    amountMinor: parsed.amountMinor,
    currencyCode: parsed.currencyCode,
    merchant: parsed.merchant,
    customerQuery: parsed.customerQuery,
    resolution,
    selected,
    candidates,
    crmConnected,
    reconciliationState: 'Unreconciled',
  };
}

export function formatQuickExpenseAmount(capture) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: capture.currencyCode,
  }).format(capture.amountMinor / 100);
}
