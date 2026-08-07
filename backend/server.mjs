import http from 'node:http';
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

export function createServer(config = loadConfig()) {
  const registry = new CapabilityRegistry();
  const store = new ProjectionStore();
  const office = new ExecutiveOfficeStore();
  const intelligence = new ExecutiveIntelligenceStore();
  const canvas = new PollyCanvasStore();
  const agentRuntime = createAquaAgentRuntime({ config, registry, store });
  const receiptRuntime = createReceiptIntelligenceRuntime({ config });
  const realtimeRuntime = createRealtimeSessionRuntime({ config });
  const gateway = createGateway({
    config,
    registry,
    store,
    office,
    intelligence,
    canvas,
    agentRuntime,
    receiptRuntime,
  });

  return http.createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('X-Content-Type-Options', 'nosniff');

    if (request.method === 'GET' && request.url === '/health') {
      response.statusCode = 200;
      response.end(JSON.stringify({ service: 'Aqua Sentinel Gateway', status: 'Confirmed' }));
      return;
    }
    if (request.method === 'POST' && request.url === '/realtime') {
      const identity = authenticateRealtimeRequest(config, request.headers);
      if (!identity) {
        response.statusCode = 401;
        response.end('A valid Sentinel session is required.');
        return;
      }
      let sdp = '';
      let tooLarge = false;
      request.setEncoding('utf8');
      request.on('data', (chunk) => {
        if (tooLarge) return;
        sdp += chunk;
        if (Buffer.byteLength(sdp) > 100_000) {
          tooLarge = true;
          response.statusCode = 413;
          response.end('Invalid SDP.');
          request.destroy();
        }
      });
      request.on('end', async () => {
        if (tooLarge) return;
        const result = await realtimeRuntime.connect({
          identity,
          sdp,
          appId: 'aqua-sentinel-os',
        });
        response.statusCode = result.status;
        response.setHeader('Content-Type', result.contentType ?? 'text/plain; charset=utf-8');
        response.end(result.body);
      });
      return;
    }
    if (request.method !== 'POST' || request.url !== '/gateway') {
      response.statusCode = 404;
      response.end(JSON.stringify({ error: 'Not found.' }));
      return;
    }

    let body = '';
    let tooLarge = false;
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (Buffer.byteLength(body) > config.maxBodyBytes) {
        tooLarge = true;
        response.statusCode = 413;
        response.end(JSON.stringify({ error: 'Request body is too large.' }));
        request.destroy();
      }
    });
    request.on('end', async () => {
      if (tooLarge) return;
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        response.statusCode = 400;
        response.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error.' } }));
        return;
      }
      const result = await gateway.dispatch(parsed, request.headers);
      response.statusCode = 200;
      response.end(JSON.stringify(result));
    });
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const config = loadConfig();
  const missing = validateRuntimeConfig(config);
  if (missing.length) {
    process.stderr.write(`Aqua Sentinel Gateway cannot start; missing: ${missing.join(', ')}\n`);
    process.exitCode = 1;
  } else {
    createServer(config).listen(config.port, config.host, () => {
      process.stdout.write(`Aqua Sentinel Gateway listening on http://${config.host}:${config.port}\n`);
    });
  }
}
