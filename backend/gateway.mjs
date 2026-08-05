import { randomUUID } from 'node:crypto';
import {
  AdapterSyncParamsSchema,
  AquaChatParamsSchema,
  ConfirmActionParamsSchema,
  JsonRpcRequestSchema,
  ReceiptAnalyzeParamsSchema,
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
import { publicAquaModelPolicy } from './model-policy.mjs';

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
            if (!identity) throw new RpcError(-32002, 'The owner credentials were not accepted.');
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
        return fail(request.id, error);
      }
    },
  };
}
