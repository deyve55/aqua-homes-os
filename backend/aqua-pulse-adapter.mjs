import { buildPulseFinancialEnvelope } from './aqua-pulse-client.mjs';

const CAPABILITY_ID = 'pulse';
const OPERATION = 'capture.provisional_financial_event';

function unavailable(status, workId = '') {
  return {
    status,
    correlationId: '',
    acknowledgementId: '',
    acknowledgedAt: '',
    workId,
    neuralDeliveryId: '',
    auditId: '',
  };
}

export function createAquaPulseAdapter({ client, registry, office }) {
  return Object.freeze({
    async captureQuickExpense({ identity, capture, uiContext = {}, now = new Date() }) {
      const manifest = registry.get(CAPABILITY_ID);
      if (!manifest || !client) return unavailable('not_configured');

      const envelope = buildPulseFinancialEnvelope({ identity, capture, uiContext, now });
      const amount = `${envelope.event.amount.value} ${envelope.event.amount.currency}`;
      const work = office.delegate({
        tenantId: identity.tenantId,
        userId: identity.sub,
        manifest,
        operation: OPERATION,
        instruction:
          `Capture ${amount} at ${capture.merchant} as an unreconciled provisional AquaPulse event.`,
        payload: {
          captureId: capture.captureId,
          eventId: envelope.eventId,
          amountMinor: capture.amountMinor,
          currencyCode: capture.currencyCode,
          merchant: capture.merchant,
          customerQuery: capture.customerQuery,
          resolution: capture.resolution,
          reconciliationState: capture.reconciliationState,
        },
        safetyClass: 'financial',
        ownerConfirmed: true,
        correlationId: envelope.correlationId,
        idempotencyKey: envelope.idempotencyKey,
        dueAt: '',
      });

      const delivery = await client.deliverQuickExpense({
        identity,
        capture,
        uiContext,
        now,
      });
      if (!['accepted_and_saved', 'duplicate_ignored'].includes(delivery.status)) {
        return {
          ...unavailable(delivery.status, work.workId),
          correlationId: envelope.correlationId,
        };
      }

      try {
        const receipt = office.reportEmployeeWork({
          tenantId: identity.tenantId,
          capabilityId: CAPABILITY_ID,
          workId: work.workId,
          status: 'verified',
          summary:
            'AquaPulse authenticated, accepted, and durably saved the provisional financial event.',
          evidence: [{
            evidenceId: delivery.acknowledgementId,
            kind: 'receipt',
            sourceRecordId: envelope.eventId,
            summary:
              'AquaPulse returned a strict saved-event acknowledgement for the exact correlated event.',
            referenceUri: '',
            verifiedAt: delivery.acknowledgedAt,
          }],
          correlationId: envelope.correlationId,
          idempotencyKey: `report-${envelope.idempotencyKey}`,
        });
        registry.markAdapterVerified(CAPABILITY_ID, {
          correlationId: envelope.correlationId,
          evidenceId: delivery.acknowledgementId,
          verifiedAt: delivery.acknowledgedAt,
        });
        return {
          status: delivery.status,
          correlationId: envelope.correlationId,
          acknowledgementId: delivery.acknowledgementId,
          acknowledgedAt: delivery.acknowledgedAt,
          workId: work.workId,
          neuralDeliveryId: receipt.neuralDelivery?.deliveryId ?? '',
          auditId: receipt.auditReference.auditId,
        };
      } catch {
        return {
          status: 'evidence_delivery_failed',
          correlationId: envelope.correlationId,
          acknowledgementId: delivery.acknowledgementId,
          acknowledgedAt: delivery.acknowledgedAt,
          workId: work.workId,
          neuralDeliveryId: '',
          auditId: '',
        };
      }
    },
  });
}
