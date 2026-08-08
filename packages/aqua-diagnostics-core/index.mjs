export const AQUA_DIAGNOSTICS_CONTRACT = 'com.aquahomes.diagnostics';
export const AQUA_DIAGNOSTICS_CONTRACT_VERSION = '1.0.0';

export const AQUA_DIAGNOSTIC_STATES = Object.freeze([
  'Confirmed',
  'Needs Attention',
  'Failed with Report',
]);

export const AQUA_DIAGNOSTIC_LAYERS = Object.freeze([
  'application',
  'permission',
  'audio',
  'realtime',
  'gateway',
  'session',
  'storage',
  'widget',
  'satellite-sdk',
  'operating-system',
]);

export const RUN_APP_DIAGNOSTICS_TOOL = Object.freeze({
  type: 'function',
  name: 'run_app_diagnostics',
  description: 'Run the current Aqua app\'s registered read-only checks and return the shared Aqua diagnostic receipt before diagnosing or repairing an app problem.',
  parameters: {
    type: 'object',
    properties: {
      symptom: { type: 'string' },
    },
    required: ['symptom'],
  },
});

function requiredText(value, field) {
  const text = String(value ?? '').trim();
  if (!text) throw new TypeError(`${field} is required.`);
  return text;
}

function normalizeCheck(check) {
  const layer = requiredText(check?.layer, 'check.layer');
  const status = requiredText(check?.status, 'check.status');
  if (!AQUA_DIAGNOSTIC_LAYERS.includes(layer)) {
    throw new TypeError(`Unsupported diagnostic layer: ${layer}`);
  }
  if (!AQUA_DIAGNOSTIC_STATES.includes(status)) {
    throw new TypeError(`Unsupported diagnostic state: ${status}`);
  }
  return {
    id: requiredText(check?.id, 'check.id'),
    layer,
    label: requiredText(check?.label, 'check.label'),
    status,
    summary: requiredText(check?.summary, 'check.summary'),
    ...(check?.repairId ? { repairId: requiredText(check.repairId, 'check.repairId') } : {}),
  };
}

export function createDiagnosticReceipt({
  appId,
  appName,
  appVersion,
  platform,
  symptom,
  correlationId,
  checks,
  generatedAt = new Date().toISOString(),
  lastError = '',
} = {}) {
  if (!Array.isArray(checks) || checks.length === 0) {
    throw new TypeError('At least one registered diagnostic check is required.');
  }
  const normalizedChecks = checks.map(normalizeCheck);
  const status = normalizedChecks.some((check) => check.status === 'Failed with Report')
    ? 'Failed with Report'
    : normalizedChecks.some((check) => check.status === 'Needs Attention')
      ? 'Needs Attention'
      : 'Confirmed';

  return {
    contract: AQUA_DIAGNOSTICS_CONTRACT,
    contractVersion: AQUA_DIAGNOSTICS_CONTRACT_VERSION,
    app: {
      id: requiredText(appId, 'appId'),
      name: requiredText(appName, 'appName'),
      version: requiredText(appVersion, 'appVersion'),
      platform: requiredText(platform, 'platform'),
    },
    correlationId: requiredText(correlationId, 'correlationId'),
    generatedAt: new Date(generatedAt).toISOString(),
    symptom: requiredText(symptom, 'symptom'),
    status,
    checks: normalizedChecks,
    registeredRepairs: [...new Set(
      normalizedChecks.map((check) => check.repairId).filter(Boolean),
    )],
    ...(lastError ? { lastError: String(lastError).slice(0, 500) } : {}),
    truthBoundary: 'Read-only diagnostics; no repair was executed.',
  };
}
