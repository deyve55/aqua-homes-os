# Golden Goose Notebook

**Purpose:** Gemini–Codex directive negotiation and source notebook  
**Owner and final human authority:** Dave  
**Status:** Working negotiation — not canonical production policy  
**Notebook version:** 1.9.0  
**Established:** July 17, 2026

## Trigger

Accepted trigger phrases:

- `Golden Goose`
- `Golden Goose notebook`

Accepted update command:

- `Ingest this to the Golden Goose notebook`

When Dave uses the update command with new material:

1. Preserve the supplied material and identify its provider/source.
2. Add it as a new numbered negotiation round, directive intake, source intake, or correction.
3. Compare it against the current notebook and identify duplicates, conflicts, missing evidence, architectural risks, and affected directives.
4. Produce required pushback and exact replacement language where necessary.
5. Update the notebook version and round-status table.
6. Do not update canonical Aqua Homes OS files until Gemini, Codex, and Dave complete the approval rule below.

## Mandatory cross-review and notebook synchronization

Every Golden Goose intake must receive an adversarial cross-review. The reviewer must test the proposal for technical correctness, contradictions, missing evidence, performance/budget impact, platform compatibility, tenancy, privacy, security, migrations, rollback, and cross-app consistency.

“Mandatory pushback” means mandatory critical review. It does not authorize invented objections. The allowed review decisions are:

- `CHANGES REQUIRED` — one or more evidence-backed objections require correction.
- `ACCEPTED — NO TECHNICAL OBJECTION` — the review found no material defect.
- `BLOCKED — DAVE DECISION REQUIRED` — the models cannot resolve an intent, risk, or authority question.

For `CHANGES REQUIRED`, the reviewer must provide the exact conflict, why it matters, proposed replacement language, and supporting primary evidence where applicable. The proposal returns to the originating model. The models repeat the loop until both accept the exact same text or escalate an unresolved decision to Dave.

Separate provider notebooks cannot be updated atomically. Golden Goose uses a two-phase synchronization protocol:

### Phase A — Prepare

1. Freeze the exact agreed text.
2. Assign a unique `SYNC_PACKET_ID`.
3. Record the originating model, target notebook versions, affected directive IDs, sources, complete replacement text, and content hash.
4. Gemini and Codex each return `AGREEMENT: 100%` for that exact packet.
5. Dave authorizes the notebook sync when the change is material.

### Phase B — Commit and verify

1. The model that originated the accepted update commits the frozen packet to its own Golden Goose notebook.
2. It sends the other model the complete, non-paraphrased sync-commit prompt below.
3. The receiving model updates its own notebook with the identical packet.
4. Each model returns a sync receipt containing `SYNC_PACKET_ID`, prior notebook version, new notebook version, content hash, and status.
5. The synchronization is complete only when both receipts reference the same packet and hash.

Allowed synchronization states:

- `PREPARED` — agreement reached; neither notebook is considered synchronized yet.
- `COMMITTING` — one notebook has updated and the matching update is pending.
- `SYNC INCOMPLETE` — a provider could not update or returned a mismatch.
- `SYNCED` — both matching receipts are recorded.

Canonical Aqua Homes OS files may be updated only after notebook state is `SYNCED` and the existing approval rule is complete.

## Six-versus-nine perspective principle

Dave requires Gemini and Codex to provide genuinely independent viewpoints. Pushback is not resistance, competition for authority, or disagreement for its own sake. It is an evidence-backed challenge intended to expose assumptions that one model may miss because the models have different knowledge, strengths, tools, and technical perspectives.

Dave's analogy is two observers viewing the same symbol from opposite directions: one sees a six and the other sees a nine. Each description may be internally reasonable from that position. Gemini and Codex must explain their orientation, assumptions, evidence, consequences, and proposed synthesis instead of merely repeating “six” or “nine.”

Dave stands to the side with product context and can determine the intended orientation. When Dave resolves an intent question—such as deciding the symbol is a nine—the models must record that decision, adjust their proposals, and synchronize around the chosen product intent.

The principle does not require either model to accept a false technical claim. If evidence reveals a safety, platform, legal, data-integrity, or feasibility constraint, the model must state it plainly and offer the closest safe route. Dave decides product intent and tradeoffs; inspectable evidence decides claims about what the system actually does.

Each disputed point should record:

- Gemini's viewpoint and assumptions.
- Codex's viewpoint and assumptions.
- Evidence and source versions.
- Risks and consequences of each interpretation.
- Common ground or proposed synthesis.
- Whether Dave must decide the intended orientation.
- The final recorded decision and affected directives.

Once Dave makes the orientation decision, continued repetition of the same disagreement without new evidence is prohibited. The models implement the decision, preserve any residual technical risk, and proceed through the normal agreement and sync protocol.

## Golden Goose sync-commit prompt

After agreement, the originating model must give Dave this exact structure to pass to the other model:

```text
GOLDEN GOOSE — SYNC COMMIT

SYNC_PACKET_ID: [unique ID]
ORIGINATING_MODEL: [Gemini or Codex]
AGREEMENT_STATUS: 100%
SOURCE_NOTEBOOK_VERSION: [version]
TARGET_NOTEBOOK_BASE_VERSION: [version]
CONTENT_HASH: [hash]
AFFECTED_DIRECTIVES: [IDs]

Both Gemini and Codex agreed to the exact frozen update below. Do not paraphrase, shorten, expand, or reinterpret it.

BEGIN FROZEN UPDATE
[complete agreed text]
END FROZEN UPDATE

ACTION REQUIRED:
1. Verify that the packet ID, agreed text, and hash match the negotiated final draft.
2. Update your own Golden Goose notebook.
3. Increment your notebook version.
4. Preserve the prior version and negotiation history.
5. Do not update canonical production directives unless the packet separately authorizes promotion.
6. Return this receipt:

GOLDEN GOOSE SYNC RECEIPT
SYNC_PACKET_ID: [same ID]
MODEL: [Gemini or Codex]
PRIOR_NOTEBOOK_VERSION: [version]
NEW_NOTEBOOK_VERSION: [version]
CONTENT_HASH: [same hash]
STATUS: SYNCED | SYNC INCOMPLETE
DETAILS: [exact error if incomplete]
```

## Origin handling

- If Gemini originates the update, Gemini records the agreed packet in its notebook and sends Codex the sync commit. Codex updates this notebook and returns its receipt.
- If Codex originates the update, Codex records the agreed packet in this notebook and sends Gemini the sync commit. Gemini updates its notebook and returns its receipt.
- If Dave originates the update, Gemini and Codex independently review it first. Neither notebook marks it synchronized until the agreement and receipt protocol is complete.
- Dave remains the bridge between models unless a separately approved integration provides authenticated direct exchange.

When Dave uses either phrase, retrieve this notebook, identify the latest negotiation round, and continue from the recorded state. Do not treat a proposal as an approved system directive.

If the AI cannot actually access this notebook, it must respond:

```text
[STATUS]: GOLDEN GOOSE ACCESS REQUIRED
[CAUSA RAIZ]: This chat cannot retrieve the current Golden Goose Notebook.
[CONTORNO]: Attach or paste the latest notebook version before directive work continues.
```

A trigger phrase cannot create storage permissions by itself. Each participating provider must be configured once with access to this notebook or receive its current exported copy.

## Approval rule

Nothing in the negotiation section is promoted into the Aqua Homes OS canonical manifest, system prompts, building blocks, or production architecture until:

1. Gemini issues its proposed directive.
2. Codex analyzes it and returns mandatory technical pushback where needed.
3. Gemini answers each objection with acceptance, correction, or evidence.
4. The loop repeats until Gemini and Codex agree on the same complete text.
5. Gemini reports `AGREEMENT: 100%` for the exact draft version.
6. Codex independently reports `AGREEMENT: 100%` for the same draft version.
7. Dave approves promotion into the canonical shared files.

Saving a draft in this notebook does not approve it.

## Canonical baseline before this negotiation

The active shared files remain at their pre-intake versions:

- Universal Bootstrap System Prompt: 1.0.0
- Gemini System Directives: 1.3.0
- Shared Common Manifest: 1.3.0
- Directive and Source Registry: 1.1.0
- Shared Building Blocks: 1.7.0
- AI Council Review Protocol: 1.3.0

The prematurely saved Assembly-Line Architecture and Directive Intake 001 were withdrawn. They are not active bootstrap material.

---

# Negotiation Round 1

**Origin:** Dave's message beginning `SYSTEM ROLE & INITIALIZATION: THE AQUA HOMES OS MASTER ARCHITECT`  
**Gemini position:** Initial directive package supplied through Dave  
**Codex decision:** `CONDITIONAL PASS — CHANGES REQUIRED`  
**Gemini response:** Pending

## Accepted direction

Codex accepts these architectural intentions:

1. Dave is the sole human commander and production authority.
2. Codex must provide mandatory technical pushback instead of passive compliance.
3. The ecosystem must support a controlled future transition from hosted inference to an RTX 5090 local cluster.
4. All satellite apps must use one shared AI identity, behavior contract, tool schema, diagnostics model, and reusable implementation.
5. External PWA/native clients must not connect directly to Oracle.
6. A Node.js Traffic Cop may validate and route versioned requests between clients, services, inference providers, and Oracle/APEX.
7. Field actions require immediate local acknowledgment, offline operation, visible sync state, and automatic recovery.
8. Failures must never be silent and must produce `[STATUS]`, `[CAUSA RAIZ]`, and `[CONTORNO]`.
9. Core logic requires both Visionary and Integrator preflight review.

## Mandatory Codex pushback

### PB-001 — Client environment variables cannot perform the promised runtime switch

**Conflict:** In Next.js and React Native clients, values such as `process.env.AQUA_TRAFFIC_COP_URL` are normally embedded during the build. Changing the variable later may still require rebuilding and redistributing the app.

**Required correction:** Apps must call one stable logical gateway address or load a signed runtime bootstrap configuration. The Traffic Cop selects hosted or RTX 5090 inference behind the gateway. Environment variables remain deployment defaults, not the sole no-rebuild switch.

**Proposed directive language:**

> All clients call a stable Aqua Traffic Cop contract. Provider routing is controlled server-side or through signed runtime configuration. Client build-time environment variables may provide defaults but must not be the only migration mechanism.

### PB-002 — Offline clients are not stateless, and IndexedDB is not the React Native store

**Conflict:** A client buffering work offline necessarily holds local state. IndexedDB is a browser/PWA API, not the native React Native persistence contract.

**Required correction:** Define one `AquaOfflineQueue` interface with a PWA adapter using IndexedDB/Web Crypto and a React Native adapter using encrypted SQLite plus protected filesystem storage for media. The gateway remains request-stateless; clients are locally stateful/offline-first.

**Proposed directive language:**

> Aqua clients are offline-first and locally stateful only for authorized pending work. PWAs use the approved IndexedDB encryption adapter; native apps use encrypted SQLite and protected media storage. All adapters implement the same queue, retry, idempotency, and diagnostic contract.

### PB-003 — The RTX 5090 does not make total platform cost $0.00

**Conflict:** Local inference can eliminate hosted token charges for routed workloads, but electricity, hardware depreciation, networking, secure remote access, backups, monitoring, maintenance, and app-store operations remain.

**Required correction:** State the goal as near-zero hosted inference charges while tracking total lifecycle cost under the 51% performance / 49% budget rule.

**Proposed directive language:**

> The RTX 5090 phase targets zero hosted inference charges for compatible routed workloads while continuing to measure power, hardware, networking, operations, fallback, and maintenance costs.

### PB-004 — Copy-and-paste executable AI code causes drift

**Conflict:** Copying the AI into ten apps creates ten versions and defeats zero duplication.

**Required correction:** Use one versioned shared package and/or shared AI service. Apps import pinned releases and supply app-specific tools through typed capability manifests.

**Proposed directive language:**

> Approved AI behavior and executable logic live in one versioned shared package/service. Satellite apps import an exact tested version and register only app-specific capabilities. Human handoffs may be copied; executable implementations must not be copy-and-forget forks.

### PB-005 — Ant Design cannot be assumed to be one identical web/native UI layer

**Conflict:** Next.js renders web/DOM components; React Native renders native components. A web Ant Design dependency cannot simply serve as the same native runtime implementation.

**Required correction:** Share Aqua design tokens, behavior contracts, accessibility rules, and component interfaces. Audit the web and native implementations separately. Ant Design may be used where platform-compatible and where it preserves the approved Aqua premium design.

**Proposed directive language:**

> Next.js and React Native share Aqua design tokens and typed UI contracts. Each platform uses an audited native implementation; no DOM component dependency is assumed to run unchanged in React Native.

### PB-006 — Gateway cryptography alone is not sufficient multi-tenant isolation

**Conflict:** If tenant isolation exists only in Node.js, one gateway defect can expose cross-tenant data.

**Required correction:** Enforce tenant identity and authorization at the gateway and Oracle layers with tenant-scoped queries/policies, constraints, audit records, and isolation tests. Never trust a client-supplied tenant ID without verified identity context.

**Proposed directive language:**

> The Traffic Cop authenticates and authorizes every request, while Oracle independently enforces tenant-scoped access and data-integrity policies. Multi-tenant isolation is defense in depth, not a gateway-only promise.

### PB-007 — “Sub-second” cannot truthfully cover every remote operation

**Conflict:** Uploads, weak 5G, external APIs, and model inference cannot always complete in under one second. Hiding all progress would make the app appear frozen or dishonest.

**Required correction:** Guarantee immediate local acknowledgment and prohibit indefinite spinners. Show explicit states such as `Saved Locally`, `Queued`, `Syncing`, `Confirmed`, and `Needs Attention`. Measure authoritative remote completion separately.

**Proposed directive language:**

> Field interactions acknowledge locally without perceptible blocking. Remote work continues asynchronously with explicit status. Sub-second targets apply to measured local interaction and eligible healthy-path operations, not every network or inference completion.

### PB-008 — A preflight gate cannot be forced to output PASS

**Conflict:** Requiring `STATUS: PASS` regardless of evidence turns QA into ceremony.

**Required correction:** Allow `PASS`, `CONDITIONAL PASS`, or `BLOCKED`. Only evidence can produce PASS.

**Proposed directive language:**

> The Visionary and Integrator preflight outputs `PASS` only when every structural requirement has evidence. It outputs `CONDITIONAL PASS` for named non-blocking evidence gaps and `BLOCKED` for unresolved structural conflicts or failed release floors.

### PB-009 — “Golden Goose” must be registered and access-aware

**Requirement:** Dave wants one short trigger that causes a new AI chat to load the complete shared context without manual copying.

**Trigger:** `Golden Goose`

**Required correction:** Each provider must persistently register the trigger and receive access to the Golden Goose Notebook or its synchronized mirror. The trigger cannot grant permissions by itself. The AI must report missing access instead of pretending it loaded the notebook.

**Proposed directive language:**

> When Dave says “Golden Goose” or “Golden Goose notebook,” retrieve the current Golden Goose Notebook and canonical manifest, verify versions, load the target app record and approval state, and return a bootstrap receipt. If retrieval is unavailable, return `GOLDEN GOOSE ACCESS REQUIRED` and request the current notebook.

## Copy/paste response to Gemini

```text
GOLDEN GOOSE — DIRECTIVE RECONCILIATION ROUND 1

Gemini, Codex completed the mandatory architectural review of the directive package.

DECISION: CONDITIONAL PASS — CHANGES REQUIRED

Codex accepts the overall direction: Dave remains the sole human authority; Codex must push back; the ecosystem must be hardware-agnostic; shared AI must remain consistent across every satellite; PWA/native clients must route through the Node.js Traffic Cop instead of connecting directly to Oracle; offline field operation, zero-silent-failure diagnostics, and Visionary/Integrator preflight are required.

Codex requires agreement on these corrections before either side updates its canonical system files:

1. CLIENT RUNTIME ROUTING
Client-side process.env values are generally build-time values. They cannot be the only mechanism for a no-rebuild 5090 switch. Use one stable gateway address or signed runtime bootstrap configuration. Provider routing changes behind the Traffic Cop.

2. OFFLINE STATE AND STORAGE
An offline client is locally stateful, not 100% stateless. PWAs may use IndexedDB plus approved encryption. React Native must use an encrypted SQLite/protected-filesystem adapter. Both implement one shared AquaOfflineQueue contract.

3. REAL COST LANGUAGE
The RTX 5090 phase may reduce hosted inference/token charges to approximately zero for compatible workloads, but electricity, hardware, networking, backup, monitoring, fallback, and maintenance still exist. Preserve the 51% performance / 49% lifecycle-budget rule.

4. ZERO-DUPLICATION IMPLEMENTATION
Do not copy executable AI code into ten apps. Use one versioned shared package/service. Each satellite imports a pinned version and registers only its typed app-specific capabilities.

5. WEB/NATIVE UI BOUNDARY
Next.js and React Native may share Aqua tokens, behavior, accessibility, and typed component contracts. Do not assume DOM-based Ant Design components run unchanged in React Native. Audit each platform implementation.

6. MULTI-TENANT DEFENSE IN DEPTH
Gateway cryptography is insufficient by itself. Enforce tenant authorization in the Traffic Cop and Oracle with tenant-scoped policies/queries, constraints, audit records, and isolation tests.

7. SUB-SECOND TRUTHFULNESS
Guarantee immediate local acknowledgment and prohibit indefinite spinners. Show Saved Locally, Queued, Syncing, Confirmed, and Needs Attention. Do not promise that every upload, weak-network request, or inference operation completes in under one second.

8. QA GATE INTEGRITY
Preflight must be allowed to return PASS, CONDITIONAL PASS, or BLOCKED. PASS is permitted only when evidence supports it.

9. TWO-WORD BOOTSTRAP
Register “Golden Goose” as Dave’s universal context trigger. It must load the current Golden Goose Notebook, canonical manifest, target app record, and approval state. If the provider cannot access them, it must return GOLDEN GOOSE ACCESS REQUIRED instead of pretending.

RESPONSE REQUIRED FROM GEMINI:
For PB-001 through PB-009, answer ACCEPT, REJECT, or MODIFY. For every REJECT or MODIFY, provide exact replacement directive language, technical reasoning, and supporting primary sources where applicable. Then return one complete revised directive package with a version number and an AGREEMENT STATUS. Do not update canonical system files yet.
```

## Round status

| Round | Gemini draft | Codex decision | Gemini reply | Agreement |
| --- | --- | --- | --- | --- |
| 1 | Initial directive package | Conditional Pass — PB-001 through PB-009 | Received; PB-001/PB-004/PB-005 modified | Partial |
| 2 | `AQUA-GG-1.3.0-REV1` | Changes Required — protocol, package boundary, native UI gate, and Oracle edition | Pending | Not reached |
| 3 | `AQUA-GG-1.4.0-FINAL-DRAFT` | Technical clauses accepted; final packet integrity changes required | Pending | Technical agreement reached; text not frozen |

---

# Negotiation Round 2

**Gemini packet:** `AQUA-GG-1.3.0-REV1`  
**Gemini notebook:** 1.3.0-DRAFT  
**Codex notebook:** 1.4.0  
**Codex decision:** `CHANGES REQUIRED`  
**Synchronization status:** `NOT PREPARED` — the packet has no final content hash and exact text is unresolved

## Codex disposition

| Item | Decision | Result |
| --- | --- | --- |
| PB-001 | Modify | Stable DNS accepted; restore JSON-RPC contract, define secure local-cluster reachability and failover |
| PB-002 | Accept | Offline-first client state and platform-specific storage are aligned |
| PB-003 | Accept | Zero refers only to hosted inference charges for compatible local-routed workloads |
| PB-004 | Modify | Turborepo accepted; `ai-core` must remain platform-neutral and UI packages must be separate |
| PB-005 | Modify | Web/native package fence accepted; exact native dependency requires compatibility validation |
| PB-006 | Modify | Defense in depth accepted; specify Oracle VPD/DBMS_RLS conditionally on deployed edition/licensing |
| PB-007 | Accept | Immediate local acknowledgment and truthful asynchronous states are aligned |
| PB-008 | Accept | PASS, CONDITIONAL PASS, and BLOCKED are aligned |
| PB-009 | Accept | Golden Goose access verification is aligned |

## Round 2 pushback

### PB-001-R2 — Stable endpoint accepted; protocol and local reachability unresolved

Gemini's immutable/stable DNS endpoint is the correct client strategy and avoids a runtime-config fetch. However, the replacement silently changes Dave's original JSON-RPC mandate into a “REST Traffic Cop.” That is a contract change, not a wording improvement. The gateway also cannot route to a private local 5090 cluster merely because public DNS remains stable; it needs an authenticated network path, health evaluation, and controlled fallback.

**Required replacement:**

> All PWA and React Native clients call one stable HTTPS endpoint, such as `https://api.aquahomesos.com/gateway`. The client-facing protocol remains versioned JSON-RPC 2.0 over HTTPS unless Dave separately approves a REST migration. The Node.js Traffic Cop owns provider selection server-side. The local RTX 5090 cluster connects through an authenticated outbound connector or approved private tunnel, with health checks, circuit breaking, and an approved hosted fallback. Clients remain blind to the underlying inference hardware.

Primary evidence: Next.js documents that public browser environment variables are inlined during the build: `https://nextjs.org/docs/pages/guides/environment-variables`.

### PB-004-R2 — Turborepo accepted; `ai-core` cannot contain framework UI

Turborepo internal packages are an appropriate zero-duplication mechanism. Gemini's language still places “AI interface components and core conversational logic” together in `packages/ai-core/`, which conflicts with the accepted DOM/native fence in PB-005.

**Required replacement:**

> The Turborepo contains `packages/ai-core/` for platform-neutral policies, types, conversation orchestration, tool schemas, and capability contracts; `packages/ai-ui-web/` for Next.js/web rendering; and `packages/ai-ui-native/` for React Native rendering. Satellite apps import pinned workspace package versions and inject typed trade capability manifests. Secrets, provider credentials, and authoritative tenant enforcement never ship inside client packages.

Primary evidence: Turborepo defines internal packages as workspace libraries used to share code between applications: `https://turborepo.dev/docs/core-concepts/internal-packages`.

### PB-005-R2 — Framework fence accepted; native package must pass a compatibility gate

Gemini correctly separates `ui-web` and `ui-native`. The term “Ant Design Mobile React Native” must resolve to the actual native package, not the `antd-mobile` web package. Ant Design Mobile describes itself as mobile-web components, while Ant Design Mobile RN documents `@ant-design/react-native` as its React Native package. Before it becomes a locked dependency, it must pass a small compatibility proof on the approved React Native/Expo version, Android, iOS, accessibility, theming, New Architecture, bundle size, and maintenance criteria.

**Required replacement:**

> Shared Aqua tokens live in `packages/ui-tokens/`. Web components live in `packages/ui-web/` and may use audited Ant Design web packages. Native components live in `packages/ui-native/`; `@ant-design/react-native` may be selected only after a compatibility proof against the approved React Native/Expo toolchain and Aqua design requirements. If it fails a release floor, the native package uses another approved implementation behind the same Aqua UI contracts.

Primary evidence: Ant Design Mobile is a mobile-web library: `https://mobile.ant.design/index`. Ant Design Mobile RN separately documents `@ant-design/react-native`: `https://rn.mobile.ant.design/docs/react/introduce/`.

### PB-006-R2 — Database enforcement accepted; Oracle feature and licensing must be exact

Oracle database-enforced isolation is required. Oracle's specific mechanism is Virtual Private Database using `DBMS_RLS`, not an unspecified generic RLS toggle. Oracle documentation also identifies `DBMS_RLS` as an Enterprise Edition capability, so the architecture cannot silently assume availability without verifying the deployed Oracle edition and commercial plan.

**Required replacement:**

> Multi-tenant isolation is enforced at the Traffic Cop and database layers. When supported and licensed by the deployed Oracle edition, Oracle Virtual Private Database policies use trusted application context and `DBMS_RLS` to enforce tenant predicates. Before schema freeze, the infrastructure audit verifies edition, licensing, policy behavior, connection-pool context reset, and isolation tests. If VPD is unavailable, Dave must approve an evidence-backed database enforcement alternative; gateway-only filtering is prohibited.

Primary evidence: Oracle documents VPD and `DBMS_RLS` at `https://docs.oracle.com/en/database/oracle/oracle-database/26/dbseg/using-oracle-vpd-to-control-data-access.html` and `https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_RLS.html`.

## Round 2 conclusion

Gemini and Codex have substantive agreement on the architecture, but the sync packet is not ready. The next Gemini response must accept, reject, or modify PB-001-R2, PB-004-R2, PB-005-R2, and PB-006-R2; return one complete revised directive package; and leave `CONTENT_HASH` unset until the exact text is frozen. Canonical files remain unchanged.

---

# Negotiation Round 3 — Final packet integrity review

**Gemini packet:** `AQUA-GG-1.4.0-FINAL-DRAFT`  
**Gemini decision:** Accepted every Round 2 technical correction  
**Codex technical agreement:** 100% on PB-001 through PB-009  
**Codex packet decision:** `CHANGES REQUIRED`  
**Reason:** The summarized final text is not an exact, complete, hashable replacement package  
**Synchronization status:** `NOT PREPARED`

## Integrity findings

### FI-001 — Final package must be an amendment or a complete replacement

Gemini labeled nine technical clauses a “complete revised directive package,” but the package omits unchanged baseline rules such as Dave's authority, mandatory pushback, the cloud/mobile phase context, zero-omission diagnostics, Visionary/Integrator roles, the 51%/49% decision rule, and Golden Goose synchronization governance.

**Required correction:** Label the packet `Aqua Homes OS Assembly-Line Architecture Amendment 1.0.0`. State that it replaces only the conflicting architecture sentences addressed by PB-001 through PB-009 and that all other approved baseline directives remain active. This is safer than duplicating and accidentally truncating the full system prompt.

### FI-002 — Dave's approval authority was weakened during summarization

Clause 1 changed “unless Dave separately approves a REST migration” to “unless explicitly approved otherwise.” Clause 6 changed “Dave must approve” the fallback to an unnamed approval.

**Required correction:** Restore Dave as the named approval authority in both clauses.

### FI-003 — Package graph remains ambiguous

The draft contains both `ai-ui-web`/`ai-ui-native` and `ui-web`/`ui-native` without defining their relationship.

**Required correction:** Freeze this dependency map:

- `packages/ui-tokens/` — platform-neutral Aqua design tokens.
- `packages/ui-web/` — general Next.js/web primitives.
- `packages/ui-native/` — general React Native primitives.
- `packages/ai-core/` — platform-neutral AI policies, orchestration, schemas, and contracts.
- `packages/ai-ui-web/` — AI web interface; depends on `ai-core` and `ui-web`.
- `packages/ai-ui-native/` — AI native interface; depends on `ai-core` and `ui-native`.

### FI-004 — Latency and preflight clauses were over-compressed

Clause 7 lists states but omits immediate local acknowledgment and the rule that sub-second is a measured local/healthy-path target, not a universal remote-completion promise. Clause 8 lists results but omits the mandatory Visionary and Integrator reviews.

**Required correction:** Restore those requirements explicitly.

### FI-005 — Agreement and synchronization are different states

Gemini correctly reported 100% agreement on the technical corrections, but no content hash exists and the final text is still changing. Therefore neither notebook can claim `SYNCED` yet.

**Required correction:** Gemini returns the exact amendment text with the integrity fixes. Codex verifies byte-for-byte content, generates the hash, and issues the sync-commit packet. Canonical files remain unchanged until matching receipts and Dave's authorization.

## Round 3 agreement status

- Engineering substance: `AGREEMENT 100%`.
- Exact final text: `NOT YET FROZEN`.
- Notebook synchronization: `NOT PREPARED`.
- Canonical promotion: `NOT AUTHORIZED`.

---

# Sync preparation — Assembly-Line Architecture Amendment 1.0.0

**Gemini exact-text receipt:** Accepted  
**Gemini notebook:** 1.5.0-PRE-SYNC  
**Codex exact-text verification:** Accepted  
**Codex agreement:** 100%  
**Frozen artifact:** `AQUA-GG-Assembly-Line-Architecture-Amendment-1.0.0.txt`  
**Sync packet:** `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1`  
**Hash algorithm:** SHA-256  
**Content hash:** `a80d04083c98e6a7ff8ca4aa4bd09585a417168e659cda4231cc712d82feba94`  
**Encoding:** UTF-8 without BOM  
**Line endings:** LF  
**Final newline:** Present  
**Byte length:** 8,082  
**Line count:** 292  
**Notebook sync state:** `SYNCED`  
**Canonical files:** Unchanged

The hash boundary is the exact frozen artifact beginning with `AQUA HOMES OS` and ending with `Dave authorizes canonical promotion when required.`, including the final LF. Sync-message wrapper lines are excluded.

Codex, as the originating model of the final integrity text, recorded the frozen artifact and hash first. Gemini must now record the identical artifact in its Golden Goose Notebook and return the matching sync receipt. State becomes `SYNCED` only after receipt verification. Synchronization alone does not authorize canonical promotion.

## Gemini commit receipt — verification pending

Gemini reported that it committed the exact frozen text to notebook 1.5.0 without paraphrasing and kept canonical files unchanged. The receipt cannot yet complete synchronization because:

1. It used `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0` instead of the exact sync packet ID `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1`.
2. Its hash field remained pending.

Codex issued the explicit SHA-256 injection and byte-boundary metadata. State remains `COMMITTING` until Gemini computes or verifies the same hash and returns a corrected receipt.

## Final Gemini sync receipt — verified

Gemini returned the corrected receipt with:

- Sync packet: `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1`
- Gemini notebook: 1.6.0
- SHA-256: `a80d04083c98e6a7ff8ca4aa4bd09585a417168e659cda4231cc712d82feba94`
- Hash match: Yes
- Byte length: 8,082
- Line count: 292
- Byte format: UTF-8, LF, no BOM, final newline present
- Gemini status: `SYNCED`
- Canonical files updated: No

Codex independently verified that every receipt field matches the frozen artifact and active sync packet. Review result: `ACCEPTED — NO TECHNICAL OBJECTION`.

Golden Goose synchronization is complete. The amendment remains a synchronized notebook artifact, not canonical production policy. Promotion awaits Dave's explicit authorization.

## Golden Goose Update chat handoff

The reusable handoff `Golden-Goose-Update-Master-Handoff.md` was created to move shared infrastructure and directive governance into a dedicated chat named **Golden Goose Update**.

The Golden Goose Update chat owns shared prompts, model negotiation, sources, cross-app architecture, and promotion preparation. AquaCam and other app chats retain app-specific implementation, tests, builds, and surgical fixes. This separation does not change the current canonical baseline or authorize app modifications.

## Next action

Dave copies the Round 1 response to Gemini and brings Gemini's complete reply back to Codex. Codex continues the review from this notebook. Canonical files remain unchanged.

## Notebook change history

### 1.9.0 — July 17, 2026

- Created the Golden Goose Update Master Handoff for a dedicated infrastructure/governance chat.
- Recorded the separation between shared Golden Goose work and app-specific implementation chats.
- Preserved the synchronized amendment as non-canonical pending Dave's promotion authorization.

### 1.8.0 — July 17, 2026

- Ingested and verified Gemini's final sync receipt.
- Confirmed matching packet ID, SHA-256, byte length, line count, encoding, line endings, and final newline.
- Transitioned `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1` from `COMMITTING` to `SYNCED`.
- Kept canonical production files unchanged pending Dave's explicit promotion authorization.

### 1.7.0 — July 17, 2026

- Ingested Gemini's incomplete sync-commit receipt for notebook 1.5.0.
- Preserved `COMMITTING` because the packet ID omitted `-SYNC1` and the hash was pending.
- Issued the exact SHA-256 and byte-boundary metadata for Gemini's final verification.

### 1.6.0 — July 17, 2026

- Ingested Gemini's exact-text acceptance and 100% technical agreement receipt.
- Froze Assembly-Line Architecture Amendment 1.0.0 as an 8,082-byte UTF-8/LF artifact.
- Generated SHA-256 `a80d04083c98e6a7ff8ca4aa4bd09585a417168e659cda4231cc712d82feba94`.
- Opened sync packet `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1` in `COMMITTING` state.
- Kept canonical production files unchanged pending Gemini's matching receipt and Dave's later promotion authorization.

### 1.5.0 — July 17, 2026

- Ingested Gemini's Round 2 acceptance and proposed final directive package.
- Recorded 100% technical agreement on PB-001 through PB-009.
- Added final integrity pushback on amendment scope, Dave's authority, package relationships, latency/preflight completeness, and synchronization state.
- Kept the packet unhashed, notebooks unsynchronized, and canonical files unchanged.

### 1.4.0 — July 17, 2026

- Ingested Gemini's Round 1 adversarial review and draft `AQUA-GG-1.3.0-REV1`.
- Accepted PB-002, PB-003, PB-007, PB-008, and PB-009 and accepted the core direction of PB-001, PB-004, PB-005, and PB-006.
- Added Round 2 pushback on JSON-RPC preservation, local-cluster reachability, framework-neutral `ai-core`, native UI compatibility, and Oracle VPD licensing.
- Kept synchronization unprepared and canonical files unchanged.

### 1.3.0 — July 17, 2026

- Added Dave's six-versus-nine principle for independent model perspectives.
- Defined pushback as evidence-backed challenge rather than automatic disagreement.
- Made Dave the final product-orientation decision-maker while preserving factual and safety constraints.
- Required recorded viewpoints, assumptions, evidence, synthesis, decision, and synchronized follow-through.

### 1.2.0 — July 17, 2026

- Required adversarial review for every intake without inventing objections.
- Added the Gemini–Codex pushback loop and Dave escalation state.
- Added two-phase notebook synchronization with immutable packets, hashes, matching receipts, and explicit incomplete state.
- Added the reusable Golden Goose sync-commit prompt and origin-handling rules.

### 1.1.0 — July 17, 2026

- Registered “Ingest this to the Golden Goose notebook” as Dave's notebook-only update command.
- Defined preservation, classification, conflict review, pushback, versioning, and canonical-file isolation behavior.

### 1.0.0 — July 17, 2026

- Established the Golden Goose trigger and negotiation notebook.
- Recorded the pre-negotiation canonical baseline.
- Added Round 1 acceptance, PB-001 through PB-009, and the Gemini copy/paste response.
