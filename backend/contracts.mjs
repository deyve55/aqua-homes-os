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

export const RememberMemoryParamsSchema = z.object({
  content: z.string().min(1).max(4_000),
  kind: z.enum(['fact', 'preference', 'secret', 'commitment', 'project']).default('fact'),
  importance: z.number().int().min(0).max(100).default(70),
});

export const RecallMemoryParamsSchema = z.object({
  query: z.string().min(1).max(1_000),
  limit: z.number().int().min(1).max(10).default(5),
});

const ReceiptEvidenceReferenceSchema = z.object({
  page: z.number().int().min(1).max(50),
  quote: z.string().max(240),
  boundingBox: z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    width: z.number().min(0).max(1),
    height: z.number().min(0).max(1),
  }).nullable(),
});

const ReceiptFieldEvidenceSchema = z.object({
  confidence: z.number().int().min(0).max(100),
  evidence: z.array(ReceiptEvidenceReferenceSchema).max(4),
});

export const ReceiptAnalyzeParamsSchema = z.object({
  evidenceId: z.string().min(8).max(200),
  originalSha256: z.string().regex(/^[a-f0-9]{64}$/),
  analysisImageSha256: z.string().regex(/^[a-f0-9]{64}$/),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  imageDataUrl: z.string().min(100).max(7_000_000),
  capturedAt: z.string().datetime({ offset: true }),
  source: z.enum([
    'CAMERA',
    'FILE_PICKER',
    'ANDROID_SHARE',
    'SENTINEL_WIDGET',
    'EMAIL',
    'MESSAGING',
    'SCAN',
  ]),
  conversationContext: z.string().max(2_000),
  knownJobs: z.array(z.object({
    name: z.string().min(1).max(200),
    address: z.string().max(500),
    aliases: z.array(z.string().min(1).max(100)).max(20),
  })).max(200),
  knownCostCodes: z.array(z.object({
    code: z.string().min(1).max(50),
    name: z.string().min(1).max(200),
    trade: z.string().max(100),
  })).max(500),
}).superRefine((value, context) => {
  const expectedPrefix = `data:${value.mimeType};base64,`;
  if (!value.imageDataUrl.startsWith(expectedPrefix)) {
    context.addIssue({
      code: 'custom',
      message: 'The analysis image MIME type does not match its data URL.',
      path: ['imageDataUrl'],
    });
  }
});

const ReceiptNullableTextFieldSchema = ReceiptFieldEvidenceSchema.extend({
  value: z.string().max(500).nullable(),
});

const ReceiptNullableAmountFieldSchema = ReceiptFieldEvidenceSchema.extend({
  valueMinor: z.number().int().nullable(),
});

export const ReceiptIntelligenceSchema = z.object({
  documentType: z.enum(['receipt', 'invoice', 'return', 'credit', 'unknown']),
  imageQuality: z.object({
    usable: z.boolean(),
    confidence: z.number().int().min(0).max(100),
    issues: z.array(z.enum([
      'blur', 'glare', 'cropped', 'folded', 'low_contrast', 'too_small',
      'occluded', 'multiple_documents', 'none',
    ])).max(9),
    rotationDegrees: z.number().int().min(0).max(359),
  }),
  merchant: z.object({
    displayName: ReceiptNullableTextFieldSchema,
    normalizedName: ReceiptNullableTextFieldSchema,
    address: ReceiptNullableTextFieldSchema,
    phone: ReceiptNullableTextFieldSchema,
    storeNumber: ReceiptNullableTextFieldSchema,
  }),
  purchase: z.object({
    dateIso: ReceiptNullableTextFieldSchema,
    timeLocal: ReceiptNullableTextFieldSchema,
    currencyCode: ReceiptNullableTextFieldSchema,
    transactionNumber: ReceiptNullableTextFieldSchema,
    orderNumber: ReceiptNullableTextFieldSchema,
    paymentMethod: ReceiptNullableTextFieldSchema,
    paymentLast4: ReceiptNullableTextFieldSchema,
  }),
  amounts: z.object({
    subtotal: ReceiptNullableAmountFieldSchema,
    tax: ReceiptNullableAmountFieldSchema,
    total: ReceiptNullableAmountFieldSchema,
  }),
  lineItems: z.array(z.object({
    lineNumber: z.number().int().min(1).max(200),
    rawDescription: z.string().min(1).max(240),
    normalizedDescription: z.string().min(1).max(240),
    sku: z.string().max(100).nullable(),
    quantityMilliUnits: z.number().int().nullable(),
    unitOfMeasure: z.string().max(50).nullable(),
    unitPriceMinor: z.number().int().nullable(),
    lineTotalMinor: z.number().int().nullable(),
    taxable: z.boolean().nullable(),
    category: z.string().max(120),
    trade: z.string().max(120),
    costCode: z.string().max(80),
    budgetBucket: z.string().max(120),
    confidence: z.number().int().min(0).max(100),
    classificationConfidence: z.number().int().min(0).max(100),
    needsReview: z.boolean(),
    evidence: z.array(ReceiptEvidenceReferenceSchema).max(4),
  })).max(200),
  adjustments: z.array(z.object({
    kind: z.enum([
      'discount', 'coupon', 'fee', 'shipping', 'deposit', 'core_charge',
      'store_credit', 'other',
    ]),
    description: z.string().max(200),
    amountMinor: z.number().int(),
    confidence: z.number().int().min(0).max(100),
    evidence: z.array(ReceiptEvidenceReferenceSchema).max(4),
  })).max(50),
  job: z.object({
    state: z.enum(['proven', 'suggested', 'unknown']),
    name: z.string().max(200).nullable(),
    confidence: z.number().int().min(0).max(100),
    rationale: z.string().max(500),
    evidence: z.array(ReceiptEvidenceReferenceSchema).max(4),
  }),
  uncertainties: z.array(z.object({
    field: z.string().min(1).max(120),
    reason: z.string().min(1).max(500),
    severity: z.enum(['review', 'blocking']),
  })).max(50),
  summary: z.string().min(1).max(1_000),
});

export const ReceiptAnalysisEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  analysisId: z.string().uuid(),
  evidenceId: z.string(),
  originalSha256: z.string(),
  analysisImageSha256: z.string(),
  generatedAt: z.string().datetime({ offset: true }),
  model: z.string(),
  status: z.enum(['Confirmed', 'Needs Attention']),
  cacheHit: z.boolean(),
  math: z.object({
    headerReconciled: z.boolean(),
    headerComputedTotalMinor: z.number().int().nullable(),
    headerDifferenceMinor: z.number().int().nullable(),
    lineItemsComplete: z.boolean(),
    lineItemsReconciled: z.boolean(),
    lineComputedTotalMinor: z.number().int().nullable(),
    lineDifferenceMinor: z.number().int().nullable(),
  }),
  nextQuestion: z.object({
    needed: z.boolean(),
    prompt: z.string(),
    reason: z.string(),
  }),
  analysis: ReceiptIntelligenceSchema,
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
