import { createHash } from 'node:crypto';
import { verifySession } from './auth.mjs';
import { selectAquaRealtimeModel } from './model-policy.mjs';

export const SENTINEL_TRANSCRIPTION_PROMPT =
  'Aqua Sentinel OS for Aqua Homes & Design Group. Expect construction terminology, ' +
  'application names such as CompanyCam, AquaCam, AquaDraw, AquaPulse, AquaTime, and Aqua Sentinel, ' +
  'plus names, addresses, measurements, invoice numbers, and job-site details. Speech may switch ' +
  'naturally among English, Brazilian Portuguese, Spanish, Spanglish, and Portunol.';

const SENTINEL_TOOLS = Object.freeze([
  {
    type: 'function',
    name: 'navigate_sentinel',
    description: 'Open a registered panel inside Aqua Sentinel without leaving the approved interface.',
    parameters: {
      type: 'object',
      properties: {
        destination: {
          type: 'string',
          enum: ['home', 'neural', 'command', 'files', 'settings', 'data', 'messages', 'diagnostics'],
        },
      },
      required: ['destination'],
    },
  },
  {
    type: 'function',
    name: 'open_aqua_app',
    description: 'Center and open a registered Aqua application from the Sentinel carousel.',
    parameters: {
      type: 'object',
      properties: { app: { type: 'string' } },
      required: ['app'],
    },
  },
  {
    type: 'function',
    name: 'ask_aqua_brain',
    description: 'Use the protected Aqua Brain for app data, multi-step reasoning, or any consequential request.',
    parameters: {
      type: 'object',
      properties: { text: { type: 'string' } },
      required: ['text'],
    },
  },
]);

function sentinelInstructions() {
  return `You are Aqua inside the canonical Aqua Sentinel OS application.
Speak naturally, briefly, and decisively. Let Dave finish; ask one short clarification when audio,
names, money, measurements, dates, addresses, or identifiers are unclear. Use navigate_sentinel for
Sentinel panels and open_aqua_app for registered apps. Use ask_aqua_brain for live app information,
multi-step analysis, tool work, or consequential requests. Never claim an app, record, deployment,
or action is connected or completed unless its tool result confirms that. Before destructive,
external, financial, filing, publishing, employment, legal, or other sensitive action, repeat the
exact understood instruction and obtain explicit confirmation. Never request or expose a secret.`;
}

export function buildRealtimeSession(config, { appId = 'aqua-sentinel-os' } = {}) {
  return {
    type: 'realtime',
    model: selectAquaRealtimeModel({
      appId,
      capability: appId === 'aqua-sentinel-os' ? 'complex' : 'simple',
      standardModel: config.realtimeStandardModel,
      fullModel: config.realtimeFullModel,
    }),
    reasoning: { effort: appId === 'aqua-sentinel-os' ? 'xhigh' : 'medium' },
    instructions: sentinelInstructions(),
    audio: {
      input: {
        noise_reduction: { type: 'near_field' },
        transcription: {
          model: config.transcriptionModel,
          prompt: SENTINEL_TRANSCRIPTION_PROMPT,
        },
        turn_detection: {
          type: 'semantic_vad',
          eagerness: 'low',
          create_response: true,
          interrupt_response: true,
        },
      },
      output: { voice: 'marin', speed: 1.03 },
    },
    tools: SENTINEL_TOOLS,
    tool_choice: 'auto',
    output_modalities: ['audio'],
  };
}

function bearer(headers) {
  const value = headers?.get
    ? headers.get('authorization') ?? ''
    : headers?.authorization ?? headers?.Authorization ?? '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
}

export function authenticateRealtimeRequest(config, headers) {
  return verifySession(config, bearer(headers));
}

export function createRealtimeSessionRuntime({ config, fetchImpl = fetch } = {}) {
  return {
    async connect({ identity, sdp, appId = 'aqua-sentinel-os' }) {
      if (!identity) {
        return { status: 401, body: 'A valid Sentinel session is required.' };
      }
      if (typeof sdp !== 'string' || !sdp.trim() || sdp.length > 100_000) {
        return { status: 400, body: 'Invalid SDP.' };
      }

      const form = new FormData();
      form.set('sdp', sdp);
      form.set('session', JSON.stringify(buildRealtimeSession(config, { appId })));
      const safetyIdentifier = createHash('sha256')
        .update(`${identity.tenantId}:${identity.sub}`)
        .digest('hex');
      const response = await fetchImpl('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${config.openAiApiKey}`,
          'OpenAI-Safety-Identifier': safetyIdentifier,
        },
        body: form,
      });
      return {
        status: response.status,
        body: await response.text(),
        contentType: response.headers.get('content-type') ?? 'application/sdp',
      };
    },
  };
}
