import { randomBytes } from 'node:crypto';

const loopbackHosts = new Set(['127.0.0.1', '::1', 'localhost']);

function integer(name, fallback) {
  const value = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(value) ? value : fallback;
}

function adapterCredentials(overrides) {
  if (overrides !== undefined) return overrides;
  const raw = process.env.AQUA_ADAPTER_CREDENTIALS_JSON ?? '';
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    throw new Error('AQUA_ADAPTER_CREDENTIALS_JSON must be valid JSON.');
  }
}

export function loadConfig(overrides = {}) {
  const host = overrides.host ?? process.env.AQUA_GATEWAY_HOST ?? '127.0.0.1';
  const developmentAuth =
    overrides.developmentAuth ?? process.env.AQUA_DEVELOPMENT_AUTH === '1';
  const sessionSecret =
    overrides.sessionSecret ??
    process.env.AQUA_SESSION_SECRET ??
    (developmentAuth && loopbackHosts.has(host) ? randomBytes(32).toString('hex') : '');

  if (developmentAuth && !loopbackHosts.has(host)) {
    throw new Error('AQUA_DEVELOPMENT_AUTH may only bind to a loopback host.');
  }

  return Object.freeze({
    host,
    port: overrides.port ?? integer('AQUA_GATEWAY_PORT', 8787),
    model: overrides.model ?? process.env.OPENAI_MODEL ?? 'gpt-5.6',
    realtimeModel:
      overrides.realtimeModel ?? process.env.OPENAI_REALTIME_MODEL ?? 'gpt-realtime-2.1',
    openAiApiKey: overrides.openAiApiKey ?? process.env.OPENAI_API_KEY ?? '',
    sessionSecret,
    sessionTtlSeconds:
      overrides.sessionTtlSeconds ?? integer('AQUA_SESSION_TTL_SECONDS', 900),
    ownerEmail: overrides.ownerEmail ?? process.env.AQUA_OWNER_EMAIL ?? '',
    ownerPasswordHash:
      overrides.ownerPasswordHash ?? process.env.AQUA_OWNER_PASSWORD_HASH ?? '',
    developmentAuth,
    adapterCredentials: Object.freeze({
      ...adapterCredentials(overrides.adapterCredentials),
    }),
    maxBodyBytes: overrides.maxBodyBytes ?? integer('AQUA_MAX_BODY_BYTES', 262_144),
  });
}

export function validateRuntimeConfig(config) {
  const missing = [];
  if (!config.openAiApiKey) missing.push('OPENAI_API_KEY');
  if (!config.sessionSecret) missing.push('AQUA_SESSION_SECRET');
  if (!config.developmentAuth && !config.ownerEmail) missing.push('AQUA_OWNER_EMAIL');
  if (!config.developmentAuth && !config.ownerPasswordHash) {
    missing.push('AQUA_OWNER_PASSWORD_HASH');
  }
  return missing;
}
