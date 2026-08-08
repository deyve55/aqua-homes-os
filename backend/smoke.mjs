import { CapabilityRegistry } from './capability-registry.mjs';
import { loadConfig } from './config.mjs';
import { ProjectionStore } from './projection-store.mjs';
import { createAquaAgentRuntime } from './aqua-agent.mjs';

const config = loadConfig({
  host: '127.0.0.1',
  developmentAuth: true,
  sessionSecret: 'smoke-only-session-secret-not-for-deployment',
});

if (!config.openAiApiKey) {
  throw new Error('OPENAI_API_KEY is required for the live Aqua smoke test.');
}

const runtime = createAquaAgentRuntime({
  config,
  registry: new CapabilityRegistry(),
  store: new ProjectionStore(),
});

const result = await runtime.chat({
  identity: {
    sub: 'smoke-owner',
    tenantId: 'aqua-homes-development',
    roles: ['owner'],
  },
  params: {
    text: 'Aqua, find a receipt that is not connected yet. Do not pretend it exists.',
    conversationId: 'live-smoke',
    selectedApp: '',
    uiContext: { surface: 'Home' },
    safetyIdentifier: 'sentinel-live-smoke',
  },
});

if (result.materialization.present || result.receipt.status === 'Confirmed') {
  throw new Error('Live smoke test failed: Aqua claimed unverified data.');
}

process.stdout.write('AQUA_LIVE_SMOKE_OK\n');
