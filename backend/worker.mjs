import { createHmac } from 'node:crypto';
import { loadConfig, validateRuntimeConfig } from './config.mjs';
import { CapabilityRegistry } from './capability-registry.mjs';
import { ProjectionStore } from './projection-store.mjs';
import { ExecutiveOfficeStore } from './executive-office.mjs';
import { ExecutiveIntelligenceStore } from './executive-intelligence.mjs';
import { PollyCanvasStore } from './polly-canvas.mjs';
import { createAquaAgentRuntime } from './aqua-agent.mjs';
import { createReceiptIntelligenceRuntime } from './receipt-intelligence.mjs';
import { createGateway } from './gateway.mjs';
import {
  authenticateRealtimeRequest,
  createRealtimeSessionRuntime,
} from './realtime-session.mjs';
import {
  relayFileCabinetDelivery,
  SENTINEL_FILE_CABINET_PATH,
} from './file-cabinet-relay.mjs';
import { createAquaPulseClient } from './aqua-pulse-client.mjs';
import { createAquaPulseAdapter } from './aqua-pulse-adapter.mjs';

const STATE_KEY = 'aqua-gateway-state-v1';
const AUTH_WINDOW_MS = 15 * 60 * 1_000;
const AUTH_ATTEMPT_LIMIT = 8;

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
      'referrer-policy': 'no-referrer',
      'x-content-type-options': 'nosniff',
    },
  });
}

function rpcError(id, code, message) {
  return { jsonrpc: '2.0', id: id ?? null, error: { code, message } };
}

function parseAdapterCredentials(value) {
  if (!value) return {};
  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('AQUA_ADAPTER_CREDENTIALS_JSON must be a JSON object.');
  }
  return parsed;
}

export function loadWorkerConfig(env) {
  return loadConfig({
    host: 'cloudflare-worker',
    developmentAuth: false,
    openAiApiKey: env.OPENAI_API_KEY ?? '',
    model: env.OPENAI_MODEL ?? 'gpt-5.6',
    receiptVisionModel: env.OPENAI_RECEIPT_VISION_MODEL ?? 'gpt-5.6',
    realtimeStandardModel:
      env.OPENAI_REALTIME_STANDARD_MODEL ?? 'gpt-realtime-2.1-mini',
    realtimeFullModel:
      env.OPENAI_REALTIME_FULL_MODEL ?? env.OPENAI_REALTIME_MODEL ?? 'gpt-realtime-2.1',
    transcriptionModel:
      env.OPENAI_TRANSCRIPTION_MODEL ?? 'gpt-4o-transcribe',
    sessionSecret: env.AQUA_SESSION_SECRET ?? '',
    sessionTtlSeconds: Number.parseInt(env.AQUA_SESSION_TTL_SECONDS ?? '900', 10),
    ownerEmail: env.AQUA_OWNER_EMAIL ?? '',
    ownerActivationCodeHash:
      env.AQUA_OWNER_ACTIVATION_CODE_HASH ?? env.AQUA_OWNER_PASSWORD_HASH ?? '',
    adapterCredentials: parseAdapterCredentials(env.AQUA_ADAPTER_CREDENTIALS_JSON),
    maxBodyBytes: Number.parseInt(env.AQUA_MAX_BODY_BYTES ?? '7500000', 10),
    receiptMaxImageBytes: Number.parseInt(
      env.AQUA_RECEIPT_MAX_IMAGE_BYTES ?? '5000000',
      10,
    ),
  });
}

async function readJsonBounded(request, maximumBytes) {
  const declared = Number.parseInt(request.headers.get('content-length') ?? '', 10);
  if (Number.isFinite(declared) && declared > maximumBytes) {
    const error = new Error('Request body is too large.');
    error.status = 413;
    throw error;
  }
  if (!request.body) return {};
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let body = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel();
      const error = new Error('Request body is too large.');
      error.status = 413;
      throw error;
    }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  try {
    return JSON.parse(body);
  } catch {
    const error = new Error('Parse error.');
    error.status = 400;
    throw error;
  }
}

function requestHeaders(request) {
  return Object.fromEntries(request.headers.entries());
}

function authRateKey(config, request, rpcRequest) {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const email = String(rpcRequest?.params?.email ?? '').toLocaleLowerCase('en-US');
  return `auth-rate:${createHmac('sha256', config.sessionSecret)
    .update(`${ip}\n${email}`)
    .digest('hex')}`;
}

function createRuntime(env, snapshot = {}) {
  const config = loadWorkerConfig(env);
  const missing = validateRuntimeConfig(config);
  if (missing.length) throw new Error('Aqua Sentinel Worker configuration is incomplete.');
  const registry = new CapabilityRegistry(
    Array.isArray(snapshot.registry) && snapshot.registry.length
      ? snapshot.registry
      : undefined,
  );
  const store = new ProjectionStore(snapshot.store ?? []);
  const office = new ExecutiveOfficeStore(snapshot.office ?? {});
  const intelligence = new ExecutiveIntelligenceStore(snapshot.intelligence ?? {});
  const canvas = new PollyCanvasStore(snapshot.canvas ?? {});
  const pulseAdapter = createAquaPulseAdapter({
    client: createAquaPulseClient(env),
    registry,
    office,
  });
  const agentRuntime = createAquaAgentRuntime({
    config,
    registry,
    store,
    pulseAdapter,
  });
  const receiptRuntime = createReceiptIntelligenceRuntime({ config });
  const realtimeRuntime = createRealtimeSessionRuntime({ config });
  return {
    config,
    registry,
    store,
    office,
    intelligence,
    canvas,
    realtimeRuntime,
    gateway: createGateway({
      config,
      registry,
      store,
      office,
      intelligence,
      canvas,
      agentRuntime,
      receiptRuntime,
    }),
  };
}

export class AquaGatewayDurableObject {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.runtime = null;
    this.ready = state.blockConcurrencyWhile(async () => {
      const snapshot = (await state.storage.get(STATE_KEY)) ?? {};
      this.runtime = createRuntime(env, snapshot);
    });
  }

  async #checkAuthRate(request, rpcRequest) {
    if (rpcRequest?.method !== 'session.create') return null;
    const key = authRateKey(this.runtime.config, request, rpcRequest);
    const now = Date.now();
    const prior = (await this.state.storage.get(key)) ?? { startedAt: now, attempts: 0 };
    const current = now - prior.startedAt >= AUTH_WINDOW_MS
      ? { startedAt: now, attempts: 0 }
      : prior;
    if (current.attempts >= AUTH_ATTEMPT_LIMIT) {
      return { key, limited: true, current };
    }
    return { key, limited: false, current };
  }

  async #recordAuthResult(rate, result) {
    if (!rate) return;
    if (result?.result?.accessToken) {
      await this.state.storage.delete(rate.key);
      return;
    }
    await this.state.storage.put(rate.key, {
      startedAt: rate.current.startedAt,
      attempts: rate.current.attempts + 1,
    });
  }

  async fetch(request) {
    await this.ready;
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ service: 'Aqua Sentinel Gateway', status: 'Confirmed' });
    }
    if (request.method === 'POST' && url.pathname === '/realtime') {
      const identity = authenticateRealtimeRequest(this.runtime.config, request.headers);
      if (!identity) return new Response('A valid Sentinel session is required.', {
        status: 401,
        headers: { 'cache-control': 'no-store', 'content-type': 'text/plain; charset=utf-8' },
      });
      const declared = Number.parseInt(request.headers.get('content-length') ?? '', 10);
      if (Number.isFinite(declared) && declared > 100_000) {
        return new Response('Invalid SDP.', { status: 413 });
      }
      const result = await this.runtime.realtimeRuntime.connect({
        identity,
        sdp: await request.text(),
        appId: 'aqua-sentinel-os',
      });
      return new Response(result.body, {
        status: result.status,
        headers: {
          'cache-control': 'no-store',
          'content-type': result.contentType ?? 'text/plain; charset=utf-8',
          'x-content-type-options': 'nosniff',
        },
      });
    }
    if (request.method !== 'POST' || url.pathname !== '/gateway') {
      return json({ error: 'Not found.' }, 404);
    }

    let rpcRequest;
    try {
      rpcRequest = await readJsonBounded(request, this.runtime.config.maxBodyBytes);
    } catch (error) {
      if (error.status === 413) return json({ error: error.message }, 413);
      return json(rpcError(null, -32700, 'Parse error.'), 400);
    }

    const rate = await this.#checkAuthRate(request, rpcRequest);
    if (rate?.limited) {
      return json(rpcError(
        rpcRequest?.id,
        -32003,
        'Too many sign-in attempts. Try again later.',
      ), 429);
    }

    const result = await this.runtime.gateway.dispatch(rpcRequest, requestHeaders(request));
    await this.#recordAuthResult(rate, result);
    await this.state.storage.put(STATE_KEY, {
      registry: this.runtime.registry.snapshot(),
      store: this.runtime.store.snapshot(),
      office: this.runtime.office.snapshot(),
      intelligence: this.runtime.intelligence.snapshot(),
      canvas: this.runtime.canvas.snapshot(),
    });
    return json(result);
  }
}

export function createWorkerHandler({ fetchImpl = fetch } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (request.method === 'POST' && url.pathname === SENTINEL_FILE_CABINET_PATH) {
        return relayFileCabinetDelivery(request, env, { fetchImpl });
      }
      if (!['/health', '/gateway', '/realtime'].includes(url.pathname)) {
        return json({ error: 'Not found.' }, 404);
      }
      if (!env.AQUA_GATEWAY) {
        return json({ error: 'Aqua Sentinel Gateway is unavailable.' }, 503);
      }
      const id = env.AQUA_GATEWAY.idFromName('primary');
      return env.AQUA_GATEWAY.get(id).fetch(request);
    },
  };
}

export default createWorkerHandler();
