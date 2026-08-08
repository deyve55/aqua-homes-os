import { randomUUID } from 'node:crypto';
import {
  AdapterSyncParamsSchema,
  AquaChatParamsSchema,
  CanvasArchiveParamsSchema,
  CanvasCaptureParamsSchema,
  CanvasListParamsSchema,
  CanvasNoteParamsSchema,
  CanvasRouteParamsSchema,
  CompanySignalBatchParamsSchema,
  ConfirmActionParamsSchema,
  DelegateWorkParamsSchema,
  EmployeeWorkListParamsSchema,
  EmployeeWorkReportParamsSchema,
  ExecutiveBriefParamsSchema,
  JsonRpcRequestSchema,
  NeuralAcknowledgeParamsSchema,
  NeuralInboxParamsSchema,
  OfficeEnterParamsSchema,
  ReceiptAnalyzeParamsSchema,
  RecallMemoryParamsSchema,
  RecommendationTransitionParamsSchema,
  RememberMemoryParamsSchema,
  SessionCreateParamsSchema,
} from './contracts.mjs';
import {
  authenticateOwner,
  issueSession,
  verifyAdapterCredential,
  verifySession,
} from './auth.mjs';
import {
  ReceiptEvidenceConflictError,
  ReceiptImageValidationError,
} from './receipt-intelligence.mjs';
import {
  ExecutiveOfficeConflictError,
  ExecutiveOfficeNotFoundError,
  ExecutiveOfficePermissionError,
} from './executive-office.mjs';
import {
  IntelligenceConflictError,
  IntelligenceNotFoundError,
  IntelligenceTransitionError,
} from './executive-intelligence.mjs';
import {
  PollyCanvasConflictError,
  PollyCanvasNotFoundError,
  PollyCanvasPermissionError,
} from './polly-canvas.mjs';
import { publicAquaModelPolicy } from './model-policy.mjs';
import { STANDARD_EMPLOYEE_OPERATIONS } from './capability-registry.mjs';

const standardEmployeeOperations = new Set(STANDARD_EMPLOYEE_OPERATIONS);

export class RpcError extends Error {
  constructor(code, message, data = undefined) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

function ok(id, result) {
  return { jsonrpc: '2.0', id, result };
}

function fail(id, error) {
  return {
    jsonrpc: '2.0',
    id: id ?? null,
    error: {
      code: error.code ?? -32603,
      message: error.message ?? 'Internal error',
      ...(error.data === undefined ? {} : { data: error.data }),
    },
  };
}

function bearer(headers) {
  const value = headers.authorization ?? headers.Authorization ?? '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
}

function requireIdentity(config, headers) {
  const identity = verifySession(config, bearer(headers));
  if (!identity) throw new RpcError(-32001, 'A valid Sentinel session is required.');
  return identity;
}

function requireOwnerIdentity(config, headers) {
  const identity = requireIdentity(config, headers);
  if (!identity.roles?.includes('owner')) {
    throw new RpcError(-32030, 'Owner authority is required for this executive operation.');
  }
  return identity;
}

function requireAdapter(config, headers, params) {
  const adapterId = String(headers['x-aqua-adapter-id'] ?? '');
  const key = String(headers['x-aqua-adapter-key'] ?? '');
  if (adapterId !== params.capabilityId) {
    throw new RpcError(-32010, 'The adapter identity does not match the requested capability.');
  }
  if (!verifyAdapterCredential(config, { adapterId, key, tenantId: params.tenantId })) {
    throw new RpcError(-32011, 'The satellite adapter credential was not accepted.');
  }
  return adapterId;
}

export function createGateway({
  config,
  registry,
  store,
  office,
  intelligence,
  canvas,
  agentRuntime,
  receiptRuntime = {
    analyze: async () => {
      throw new Error('Receipt intelligence unavailable.');
    },
  },
}) {
  return {
    async dispatch(rawRequest, headers = {}) {
      let request;
      try {
        request = JsonRpcRequestSchema.parse(rawRequest);
      } catch (error) {
        return fail(rawRequest?.id, new RpcError(-32600, 'Invalid JSON-RPC request.', error.issues));
      }

      try {
        switch (request.method) {
          case 'aqua.health':
            return ok(request.id, {
              service: 'Aqua Sentinel Gateway',
              status: 'Confirmed',
              model: config.model,
              correlationId: randomUUID(),
            });
          case 'session.create': {
            const params = SessionCreateParamsSchema.parse(request.params);
            const identity = authenticateOwner(config, params);
            if (!identity) throw new RpcError(-32002, 'The activation code was not accepted.');
            return ok(request.id, {
              accessToken: issueSession(config, identity),
              expiresIn: config.sessionTtlSeconds,
              identity: {
                email: identity.email,
                tenantId: identity.tenantId,
                roles: identity.roles,
              },
            });
          }
          case 'aqua.capabilities.list': {
            requireIdentity(config, headers);
            return ok(request.id, { capabilities: registry.list() });
          }
          case 'aqua.models.policy': {
            requireIdentity(config, headers);
            return ok(request.id, publicAquaModelPolicy(config));
          }
          case 'aqua.office.enter': {
            const identity = requireOwnerIdentity(config, headers);
            const params = OfficeEnterParamsSchema.parse(request.params);
            const manifest = registry.get(params.capabilityId);
            if (!manifest) {
              throw new RpcError(-32031, 'The requested employee office is not registered.');
            }
            return ok(request.id, office.createNavigationTicket({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
              manifest,
            }));
          }
          case 'aqua.canvas.capture': {
            const identity = requireOwnerIdentity(config, headers);
            const params = CanvasCaptureParamsSchema.parse(request.params);
            return ok(request.id, canvas.capture({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.canvas.list': {
            const identity = requireOwnerIdentity(config, headers);
            const params = CanvasListParamsSchema.parse(request.params);
            return ok(request.id, {
              status: 'Confirmed',
              items: canvas.list({
                ...params,
                tenantId: identity.tenantId,
                userId: identity.sub,
              }),
            });
          }
          case 'aqua.canvas.note': {
            const identity = requireOwnerIdentity(config, headers);
            const params = CanvasNoteParamsSchema.parse(request.params);
            return ok(request.id, canvas.addNote({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.canvas.route.prepare': {
            const identity = requireOwnerIdentity(config, headers);
            const params = CanvasRouteParamsSchema.parse(request.params);
            const manifest = registry.get(params.capabilityId);
            if (!manifest) {
              throw new RpcError(-32031, 'The requested employee office is not registered.');
            }
            if (
              !standardEmployeeOperations.has(params.operation) &&
              !manifest.actions.includes(params.operation)
            ) {
              throw new RpcError(
                -32032,
                'The employee application has not published this operation.',
              );
            }
            return ok(request.id, canvas.prepareRoute({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
              manifest,
            }));
          }
          case 'aqua.canvas.archive': {
            const identity = requireOwnerIdentity(config, headers);
            const params = CanvasArchiveParamsSchema.parse(request.params);
            return ok(request.id, canvas.archive({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.work.delegate': {
            const identity = requireOwnerIdentity(config, headers);
            const params = DelegateWorkParamsSchema.parse(request.params);
            const manifest = registry.get(params.capabilityId);
            if (!manifest) {
              throw new RpcError(-32031, 'The requested employee office is not registered.');
            }
            if (
              !standardEmployeeOperations.has(params.operation) &&
              !manifest.actions.includes(params.operation)
            ) {
              throw new RpcError(
                -32032,
                'The employee application has not published this operation.',
              );
            }
            return ok(request.id, office.delegate({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
              manifest,
            }));
          }
          case 'aqua.employee.work.list': {
            const params = EmployeeWorkListParamsSchema.parse(request.params);
            requireAdapter(config, headers, params);
            return ok(request.id, {
              status: 'Confirmed',
              work: office.listEmployeeWork(params),
            });
          }
          case 'aqua.employee.work.report': {
            const params = EmployeeWorkReportParamsSchema.parse(request.params);
            requireAdapter(config, headers, params);
            return ok(request.id, office.reportEmployeeWork(params));
          }
          case 'aqua.neural.inbox': {
            const identity = requireOwnerIdentity(config, headers);
            const params = NeuralInboxParamsSchema.parse(request.params);
            return ok(request.id, {
              status: 'Confirmed',
              deliveries: office.listNeuralDeliveries({
                ...params,
                tenantId: identity.tenantId,
              }),
            });
          }
          case 'aqua.neural.acknowledge': {
            const identity = requireOwnerIdentity(config, headers);
            const params = NeuralAcknowledgeParamsSchema.parse(request.params);
            return ok(request.id, office.acknowledgeNeuralDelivery({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.executive.brief': {
            const identity = requireOwnerIdentity(config, headers);
            const params = ExecutiveBriefParamsSchema.parse(request.params);
            const brief = office.buildExecutiveBrief({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
              registry: registry.list(),
            });
            return ok(request.id, {
              ...brief,
              companyHealth: intelligence.getCompanyHealth({
                tenantId: identity.tenantId,
              }),
            });
          }
          case 'aqua.company.signals.ingest': {
            const params = CompanySignalBatchParamsSchema.parse(request.params);
            requireAdapter(config, headers, params);
            return ok(request.id, intelligence.ingestSignals(params));
          }
          case 'aqua.company.health': {
            const identity = requireOwnerIdentity(config, headers);
            return ok(request.id, intelligence.getCompanyHealth({
              tenantId: identity.tenantId,
            }));
          }
          case 'aqua.recommendation.transition': {
            const identity = requireOwnerIdentity(config, headers);
            const params = RecommendationTransitionParamsSchema.parse(request.params);
            return ok(request.id, intelligence.transitionRecommendation({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.adapter.sync': {
            const params = AdapterSyncParamsSchema.parse(request.params);
            requireAdapter(config, headers, params);
            const manifest = registry.get(params.capabilityId);
            if (!manifest || manifest.status === 'local_ready') {
              throw new RpcError(-32012, 'The requested satellite capability is not registered for projection sync.');
            }
            const receipt = store.syncProjections({
              ...params,
              sourceApp: manifest.name,
            });
            if (receipt.conflict) {
              throw new RpcError(
                -32013,
                'This sync ID was already used with a different projection payload.',
              );
            }
            registry.markSynced(params.capabilityId, receipt);
            return ok(request.id, receipt);
          }
          case 'aqua.chat': {
            const identity = requireIdentity(config, headers);
            const params = AquaChatParamsSchema.parse(request.params);
            return ok(request.id, await agentRuntime.chat({ identity, params }));
          }
          case 'aqua.receipt.analyze': {
            const identity = requireIdentity(config, headers);
            const params = ReceiptAnalyzeParamsSchema.parse(request.params);
            return ok(request.id, await receiptRuntime.analyze({ identity, params }));
          }
          case 'aqua.memory.remember': {
            const identity = requireIdentity(config, headers);
            const params = RememberMemoryParamsSchema.parse(request.params);
            return ok(request.id, store.remember({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.memory.recall': {
            const identity = requireIdentity(config, headers);
            const params = RecallMemoryParamsSchema.parse(request.params);
            return ok(request.id, store.recall({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            }));
          }
          case 'aqua.action.confirm': {
            const identity = requireIdentity(config, headers);
            const params = ConfirmActionParamsSchema.parse(request.params);
            const receipt = store.confirmIntent({
              ...params,
              tenantId: identity.tenantId,
              userId: identity.sub,
            });
            if (!receipt) throw new RpcError(-32004, 'The pending action could not be verified.');
            return ok(request.id, receipt);
          }
          default:
            throw new RpcError(-32601, `Method not found: ${request.method}`);
        }
      } catch (error) {
        if (error?.issues) {
          return fail(request.id, new RpcError(-32602, 'Invalid method parameters.', error.issues));
        }
        if (error instanceof ReceiptEvidenceConflictError) {
          return fail(request.id, new RpcError(-32020, error.message));
        }
        if (error instanceof ReceiptImageValidationError) {
          return fail(request.id, new RpcError(-32021, error.message));
        }
        if (error instanceof ExecutiveOfficeConflictError) {
          return fail(request.id, new RpcError(-32033, error.message));
        }
        if (error instanceof ExecutiveOfficeNotFoundError) {
          return fail(request.id, new RpcError(-32034, error.message));
        }
        if (error instanceof ExecutiveOfficePermissionError) {
          return fail(request.id, new RpcError(-32035, error.message));
        }
        if (error instanceof IntelligenceConflictError) {
          return fail(request.id, new RpcError(-32036, error.message));
        }
        if (error instanceof IntelligenceNotFoundError) {
          return fail(request.id, new RpcError(-32037, error.message));
        }
        if (error instanceof IntelligenceTransitionError) {
          return fail(request.id, new RpcError(-32038, error.message));
        }
        if (error instanceof PollyCanvasConflictError) {
          return fail(request.id, new RpcError(-32039, error.message));
        }
        if (error instanceof PollyCanvasNotFoundError) {
          return fail(request.id, new RpcError(-32040, error.message));
        }
        if (error instanceof PollyCanvasPermissionError) {
          return fail(request.id, new RpcError(-32041, error.message));
        }
        return fail(request.id, error);
      }
    },
  };
}
