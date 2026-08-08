# Aqua Diagnostics Core

`@aqua-homes/diagnostics-core` is the pinned cross-application contract for Aqua's bounded “triage nurse” loop.

Every Aqua app must:

1. Import or validate against the exact released contract version.
2. Register real app, permission, session, storage, gateway, and SDK checks that it can prove locally.
3. Return the common diagnostic receipt from `run_app_diagnostics`.
4. Expose only named repair IDs implemented by that app. Diagnosis never grants shell, accessibility, credential, or unrestricted device access.
5. Rerun the relevant check after an owner-approved repair and keep the correlation ID in the final receipt.
6. Exclude customer content, photos, video, audio, addresses, credentials, tokens, secrets, and private record bodies from diagnostic output.

Sentinel is the installed reference implementation. Installation is mandatory in every Aqua satellite. A satellite installation is not complete until that app pins this version, passes the contract suite, and proves its checks in its own signed build. The app-integration lane owns those repository changes and must return the verified version, commit, build, and diagnostic receipt to Sentinel.
