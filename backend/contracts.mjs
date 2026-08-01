import { z } from 'zod';

export const TruthStateSchema = z.enum([
  'Saved Locally',
  'Queued',
  'Syncing',
  'Confirmed',
  'Needs Attention',
  'Failed with Report',
]);

export const ProjectionKindSchema = z.enum([
  'receipt',
  'timecard',
  'contract',
  'job',
  'client',
  'file',
  'collection',
]);

export const JsonRpcRequestSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string().max(100), z.number()]),
  method: z.string().min(1).max(100),
  params: z.record(z.string(), z.unknown()).default({}),
});

export const SessionCreateParamsSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(1024),
  deviceId: z.string().min(1).max(200),
});

export const AquaChatParamsSchema = z.object({
  text: z.string().min(1).max(8_000),
  conversationId: z.string().min(1).max(200),
  selectedApp: z.string().max(100).default(''),
  uiContext: z.record(z.string(), z.unknown()).default({}),
  safetyIdentifier: z.string().min(8).max(200),
});

export const ConfirmActionParamsSchema = z.object({
  intentId: z.string().min(1).max(200),
  confirmationToken: z.string().min(1).max(500),
});

export const AdapterProjectionSchema = z.object({
  kind: ProjectionKindSchema,
  sourceRecordId: z.string().min(1).max(300),
  title: z.string().min(1).max(500),
  subtitle: z.string().max(1_000).default(''),
  sourceState: TruthStateSchema,
  searchText: z.string().max(12_000).default(''),
  previewUri: z.union([
    z.literal(''),
    z.string().url().max(4_000).refine((value) => value.startsWith('https://'), {
      message: 'Projection previews must use HTTPS.',
    }),
  ]).default(''),
  fields: z.array(z.object({
    label: z.string().min(1).max(200),
    value: z.string().max(2_000),
  })).max(40).default([]),
  updatedAt: z.string().datetime({ offset: true }),
});

export const AdapterSyncParamsSchema = z.object({
  capabilityId: z.string().min(1).max(100),
  tenantId: z.string().min(1).max(200),
  syncId: z.string().min(8).max(200),
  checkpoint: z.string().max(500).default(''),
  records: z.array(AdapterProjectionSchema).max(100).default([]),
  deletedSourceRecordIds: z.array(z.string().min(1).max(300)).max(100).default([]),
}).superRefine((value, context) => {
  if (!value.records.length && !value.deletedSourceRecordIds.length) {
    context.addIssue({
      code: 'custom',
      message: 'A projection sync must upsert or delete at least one record.',
      path: ['records'],
    });
  }
});

export const MaterializationFieldSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const MaterializationActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: z.enum(['preview', 'open_source', 'prepare_action', 'dismiss']),
  requiresConfirmation: z.boolean(),
});

export const MaterializationSchema = z.object({
  present: z.boolean(),
  kind: z.union([z.literal('none'), ProjectionKindSchema]),
  title: z.string(),
  subtitle: z.string(),
  sourceApp: z.string(),
  sourceRecordId: z.string(),
  sourceState: TruthStateSchema,
  confidence: z.number().min(0).max(1),
  previewUri: z.string(),
  fields: z.array(MaterializationFieldSchema),
  actions: z.array(MaterializationActionSchema),
});

export const AquaAgentOutputSchema = z.object({
  reply: z.string(),
  action: z.object({
    type: z.enum(['none', 'materialize', 'open_neural_link', 'open_command_center', 'open_source_app']),
    target: z.string(),
    app: z.string(),
  }),
  materialization: MaterializationSchema,
  receipt: z.object({
    status: TruthStateSchema,
    correlationId: z.string(),
    sources: z.array(z.string()),
    requiresConfirmation: z.boolean(),
    intentId: z.string(),
    confirmationToken: z.string(),
  }),
});

export const emptyMaterialization = Object.freeze({
  present: false,
  kind: 'none',
  title: '',
  subtitle: '',
  sourceApp: '',
  sourceRecordId: '',
  sourceState: 'Needs Attention',
  confidence: 0,
  previewUri: '',
  fields: [],
  actions: [],
});
