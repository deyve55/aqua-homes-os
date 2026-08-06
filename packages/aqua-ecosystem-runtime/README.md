# Aqua Ecosystem Runtime Contract

This package is the mandatory cross-app acceptance contract for one continuous Aqua session. Sentinel owns one Realtime conversation and microphone. A destination app renders Aqua locally, registers only its approved semantic capabilities, and returns evidence-bound results through the session channel.

Opening an APK is not integration. An app is connected only after all of these are true:

1. The signed app pins this contract version and the diagnostics contract.
2. Sentinel prepares a one-time handoff with session, correlation, target package, expiry, and registered route.
3. The launched app validates the handoff and acknowledges its app/version/capability manifest.
4. Aqua continues through the single Sentinel-owned session; the satellite never opens a second microphone or Realtime connection.
5. Every navigation, query, or action returns a correlated result with a truthful state.
6. `return_to_sentinel` and `exit_app` are registered and device-tested.

The first-wave APKs are AquaDraw, AquaPulse, AquaCam, and Aqua Timesheet, with Sentinel as the session owner. The immediate financial path is Widget → Sentinel File Cabinet → AquaPulse. CRM enrichment, Receipts proof intake, and Books reconciliation are later integrations and do not block the first-wave quick capture. A Sentinel capture is always `Unreconciled` until Books returns a verified downstream record.

Installation states in the manifest are evidence states, not rollout choices. `pending_app_build` means mandatory work remains in that app repository.
