import { randomUUID } from 'node:crypto';
import { Agent, run, tool, webSearchTool } from '@openai/agents';
import { z } from 'zod';
import { AquaAgentOutputSchema, emptyMaterialization } from './contracts.mjs';
import {
  formatQuickExpenseAmount,
  parseQuickExpenseCommand,
  resolveQuickExpenseCapture,
} from './quick-expense.mjs';

export const AQUA_SYSTEM_INSTRUCTIONS = `
You are Aqua inside Aqua Sentinel OS, the conversational operating system for the Aqua ecosystem.

IDENTITY
- Be warm, poised, clear, energetic, and professional. Address the person naturally; never perform luxury with empty adjectives.
- Conversation is the primary interface. The user should not need to open a satellite app unless deeper editing is necessary.

TRUTH AND AUTHORITY
- Satellite apps remain authoritative for their records. Sentinel presents permission-aware projections and routes confirmed commands.
- Never claim you found, saved, filed, sent, approved, called, created, or changed anything unless a tool result proves it.
- Preserve the exact state language: Saved Locally, Queued, Syncing, Confirmed, Needs Attention, or Failed with Report.
- When a requested object is found, materialize it. If several plausible objects exist, materialize a collection and ask one concise disambiguation question.
- When no authoritative object is available, say so plainly and offer the smallest useful next step.

ACTIONS AND SAFETY
- Search and read-only preview may happen without confirmation.
- Use live web search when the user explicitly asks to search the web, requests current information, or the answer depends on facts that may have changed. State that web results are external and name the sources briefly.
- When a request needs information or an operation from an Aqua application, call route_aqua_capability before searching or preparing an action. This server-confirmed route is what activates that application's neural tether. Do not call it for a general web or conversational answer.
- Any creation, edit, filing, approval, send, call, share, financial, destructive, or externally visible action must first be prepared as an intent.
- A prepared intent is not completed work. It remains Queued and requires explicit confirmation.
- Never invent a deep link, record identifier, source, confidence, or receipt.

OUTPUT
- Keep the spoken reply concise and conversational.
- Return the required structured output. Use empty strings and arrays when a field does not apply.
- Set materialization.present false and copy the canonical empty materialization shape when no object should rise into view.
`;

function recordToMaterialization(record) {
  return {
    present: true,
    kind: record.kind,
    title: record.title ?? '',
    subtitle: record.subtitle ?? '',
    sourceApp: record.sourceApp ?? '',
    sourceRecordId: record.sourceRecordId ?? '',
    sourceState: record.sourceState ?? 'Confirmed',
    confidence: record.confidence ?? 0,
    previewUri: record.previewUri ?? '',
    fields: record.fields ?? [],
    actions: record.actions ?? [
      {
        id: 'open-source',
        label: `Open in ${record.sourceApp ?? 'source app'}`,
        kind: 'open_source',
        requiresConfirmation: false,
      },
      {
        id: 'dismiss',
        label: 'Dismiss',
        kind: 'dismiss',
        requiresConfirmation: false,
      },
    ],
  };
}

export function createAquaAgentRuntime({ config, registry, store, runner = run }) {
  const routeCapability = tool({
    name: 'route_aqua_capability',
    description:
      'Select the one authoritative Aqua application needed for this request. This records a real server-side route so Sentinel may activate only that application tether.',
    parameters: z.object({
      capability: z.string().min(1).max(100),
      purpose: z.string().min(1).max(1_000),
    }),
    execute: async ({ capability, purpose }, runContext) => {
      const context = runContext.context;
      const manifest = registry.get(capability);
      if (!manifest) {
        return JSON.stringify({
          routed: false,
          status: 'Needs Attention',
          report: 'No registered Aqua capability matches that route.',
        });
      }
      context.routedCapability = manifest;
      return JSON.stringify({
        routed: true,
        capability: manifest.id,
        application: manifest.name,
        authority: manifest.authority,
        adapterStatus: manifest.status,
        purpose,
      });
    },
  });

  const searchObjects = tool({
    name: 'search_authoritative_objects',
    description:
      'Search permission-aware projections for receipts, timecards, contracts, jobs, clients, or files. Returns only records actually present in the projection store.',
    parameters: z.object({
      query: z.string().min(1).max(2_000),
      kinds: z.array(
        z.enum(['receipt', 'timecard', 'contract', 'job', 'client', 'file', 'collection']),
      ),
      limit: z.number().int().min(1).max(10),
    }),
    execute: async ({ query, kinds, limit }, runContext) => {
      const context = runContext.context;
      const results = store.search({
        query,
        kinds,
        limit,
        tenantId: context.identity.tenantId,
      });
      context.lastSearch = results;
      return JSON.stringify({
        count: results.length,
        results: results.map((record) => ({
          kind: record.kind,
          title: record.title,
          subtitle: record.subtitle ?? '',
          sourceApp: record.sourceApp,
          sourceRecordId: record.sourceRecordId,
          sourceState: record.sourceState,
          confidence: record.confidence,
          previewUri: record.previewUri ?? '',
          fields: record.fields ?? [],
        })),
      });
    },
  });

  const listCapabilities = tool({
    name: 'list_aqua_capabilities',
    description:
      'List the authoritative Aqua applications and whether their live adapter is connected. Use this before proposing a cross-application action.',
    parameters: z.object({ purpose: z.string().min(1).max(500) }),
    execute: async () => JSON.stringify({ capabilities: registry.list() }),
  });

  const prepareAction = tool({
    name: 'prepare_guarded_action',
    description:
      'Prepare—but do not execute—an action in an authoritative Aqua app. All writes, sends, calls, approvals, filings, shares, and financial operations require this confirmation gate.',
    parameters: z.object({
      capability: z.string().min(1).max(100),
      operation: z.string().min(1).max(200),
      summary: z.string().min(1).max(2_000),
      payloadJson: z.string().min(2).max(20_000),
    }),
    execute: async ({ capability, operation, summary, payloadJson }, runContext) => {
      const context = runContext.context;
      const manifest = registry.get(capability);
      if (!manifest) {
        return JSON.stringify({
          prepared: false,
          status: 'Needs Attention',
          report: 'No registered authoritative capability matches this action.',
        });
      }
      let payload;
      try {
        payload = JSON.parse(payloadJson);
      } catch {
        return JSON.stringify({
          prepared: false,
          status: 'Needs Attention',
          report: 'The action payload was not valid JSON.',
        });
      }
      const intent = store.prepareIntent({
        tenantId: context.identity.tenantId,
        userId: context.identity.sub,
        capability,
        operation,
        payload,
      });
      context.preparedIntent = intent;
      return JSON.stringify({
        prepared: true,
        summary,
        status: intent.status,
        requiresConfirmation: true,
        intentId: intent.intentId,
        confirmationToken: intent.confirmationToken,
        authority: manifest.name,
        adapterStatus: manifest.status,
      });
    },
  });

  const agent = new Agent({
    name: 'Aqua Sentinel',
    instructions: AQUA_SYSTEM_INSTRUCTIONS,
    model: config.model,
    modelSettings: {
      reasoning: { effort: 'medium', context: 'all_turns' },
      text: { verbosity: 'low' },
      parallelToolCalls: false,
      store: false,
    },
    tools: [
      routeCapability,
      searchObjects,
      listCapabilities,
      webSearchTool({ searchContextSize: 'medium', externalWebAccess: true }),
      prepareAction,
    ],
    outputType: AquaAgentOutputSchema,
  });

  return {
    agent,
    async chat({ identity, params }) {
      const correlationId = randomUUID();
      const parsedExpense = parseQuickExpenseCommand(params.text);
      const quickExpense = resolveQuickExpenseCapture({
        parsed: parsedExpense,
        store,
        registry,
        identity,
        captureId: String(
          params.uiContext.localExpenseCaptureId || params.uiContext.filingItemId || '',
        ),
      });
      if (quickExpense) {
        const amount = formatQuickExpenseAmount(quickExpense);
        const selected = quickExpense.selected;
        const reply = quickExpense.resolution === 'single'
          ? `${amount} at ${quickExpense.merchant} is captured for ${selected.name}${selected.address ? ` at ${selected.address}` : ''}. It is unreconciled, not a Books actual yet.`
          : quickExpense.resolution === 'multiple'
            ? `I captured ${amount} at ${quickExpense.merchant}. I found more than one ${quickExpense.customerQuery}; which address: ${quickExpense.candidates.map((item) => item.address || item.subtitle || item.name).join(' or ')}?`
            : quickExpense.crmConnected
              ? `I captured ${amount} at ${quickExpense.merchant}, but CRM has no verified ${quickExpense.customerQuery} match. The project needs attention.`
              : `I captured ${amount} at ${quickExpense.merchant}, but CRM is disconnected. The project remains unresolved.`;
        return AquaAgentOutputSchema.parse({
          reply,
          action: { type: 'none', target: '', app: '' },
          materialization: { ...emptyMaterialization, fields: [], actions: [] },
          receipt: {
            status: quickExpense.resolution === 'single' ? 'Queued' : 'Needs Attention',
            correlationId,
            sources: ['crm', 'receipts'],
            requiresConfirmation: false,
            intentId: '',
            confirmationToken: '',
            quickExpense,
          },
        });
      }
      const context = {
        identity,
        correlationId,
        preparedIntent: null,
        routedCapability: null,
        lastSearch: [],
      };
      const result = await runner(
        agent,
        [
          `User request: ${params.text}`,
          `Selected app: ${params.selectedApp || 'none'}`,
          `Current Sentinel UI context: ${JSON.stringify(params.uiContext)}`,
          `Conversation ID: ${params.conversationId}`,
          `Correlation ID: ${correlationId}`,
        ].join('\n'),
        { context, maxTurns: 8 },
      );
      const parsed = AquaAgentOutputSchema.parse(result.finalOutput);
      const prepared = context.preparedIntent;
      const routed = context.routedCapability;
      const searched = context.lastSearch;

      if (prepared) {
        parsed.receipt = {
          status: prepared.status,
          correlationId,
          sources: [prepared.capability],
          requiresConfirmation: true,
          intentId: prepared.intentId,
          confirmationToken: prepared.confirmationToken,
        };
      } else {
        parsed.receipt.correlationId = correlationId;
        parsed.receipt.intentId = '';
        parsed.receipt.confirmationToken = '';
      }

      if (routed) {
        parsed.receipt.sources = Array.from(new Set([
          routed.id,
          ...parsed.receipt.sources,
        ]));
      }

      if (searched.length === 1 && !parsed.materialization.present) {
        parsed.materialization = recordToMaterialization(searched[0]);
        parsed.action = {
          type: 'materialize',
          target: searched[0].sourceRecordId,
          app: searched[0].sourceApp,
        };
      }
      if (!searched.length && !prepared && !parsed.materialization.present) {
        parsed.materialization = { ...emptyMaterialization, fields: [], actions: [] };
      }
      return AquaAgentOutputSchema.parse(parsed);
    },
  };
}
