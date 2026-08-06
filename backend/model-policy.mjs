export const AQUA_MODEL_POLICY_VERSION = '1.0.0';

export const AQUA_MODEL_DEFAULTS = Object.freeze({
  satelliteRealtime: 'gpt-realtime-2.1-mini',
  fullRealtime: 'gpt-realtime-2.1',
  transcription: 'gpt-4o-transcribe',
});

const fullCapabilitySignals = new Set([
  'complex',
  'consequential',
  'financial',
  'legal',
  'multi_step',
  'sensitive',
  'tool_use',
]);

export function selectAquaRealtimeModel({
  capability = 'simple',
  standardModel = AQUA_MODEL_DEFAULTS.satelliteRealtime,
  fullModel = AQUA_MODEL_DEFAULTS.fullRealtime,
} = {}) {
  if (fullCapabilitySignals.has(capability)) {
    return fullModel;
  }
  return standardModel;
}

export function publicAquaModelPolicy(config) {
  return Object.freeze({
    version: AQUA_MODEL_POLICY_VERSION,
    sentinel: Object.freeze({
      default: config.realtimeStandardModel,
      escalateTo: config.realtimeFullModel,
    }),
    satellites: Object.freeze({
      default: config.realtimeStandardModel,
      escalateTo: config.realtimeFullModel,
      sentinelHandoff: config.realtimeFullModel,
    }),
    transcription: config.transcriptionModel,
    confirmationRequiredFor: Object.freeze([
      'destructive',
      'external',
      'financial',
      'filing',
      'publishing',
      'sensitive',
    ]),
  });
}
