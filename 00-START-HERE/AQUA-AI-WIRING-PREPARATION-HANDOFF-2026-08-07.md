# Aqua AI Wiring Preparation Handoff

**Prepared:** August 7, 2026  
**From:** Aqua Sentinel OS backend development  
**To:** Aqua AI / Aqua Brain development chat  
**Owner and final authority:** Dave (Deyve)  
**Purpose:** Align the new Aqua AI with the Sentinel executive-office backend so Aqua can be wired to real application capabilities as each adapter becomes available.

## 1. Receiving-chat instruction

This handoff continues an existing Aqua Homes project. Do not restart, redesign, or invent a competing architecture.

Read this document together with:

1. `Golden-Goose-Engineering-Manual.md` — working edition `1.2.0-RECONSTRUCTED-03`.
2. `Golden-Goose-Update-Master-Handoff.md` — version `1.1.0`.
3. `Golden-Goose-Notebook.md` — working negotiation version `1.9.0`.

The Golden Goose Assembly-Line Amendment `1.0.0` is synchronized under packet `AQUA-GG-ASSEMBLY-AMENDMENT-1.0.0-SYNC1`, but the attached authorities still record it as not canonically promoted. Do not silently convert a proposal or synchronized notebook artifact into a production claim.

Dave is the sole owner, president, and final human authority. Aqua is being built to operate as his CEO-level executive coordinator, executive assistant, advisor, project manager, strategist, and treasury/banking-operations advisor. This operational role does not silently appoint Aqua as a legal corporate officer, licensed professional, or regulated bank, and it does not remove owner approval gates.

## 2. The new Aqua vision

Use this exact operating model:

- **Aqua Sentinel OS is the company building:** the terminal, office, and workshop where company operations are coordinated.
- **Satellite Aqua applications are employee offices:** each application has an employee Aqua and remains authoritative for its own domain records.
- **CEO Aqua is the executive:** she can enter an office herself through a registered capability, or delegate a request to the employee working there.
- **Neural Link is the employee delivery desk:** delegated results, evidence, exceptions, and questions return there for Aqua and Dave to review.
- **Dave owns the building:** he sets priorities and retains final authority over protected actions.
- **Polly Canvas is the thought inbox:** the home-screen widget captures ideas and supporting material before Dave opens the full application.
- **Aqua Brain is the reasoning and orchestration layer:** it decides how to help, asks questions, develops ideas, chooses registered tools, and explains results.
- **Aqua Knowledge Vault is the governed knowledge store:** it stores approved books, documents, provenance, licensing, and source material. Brain retrieves and reasons over that material; it does not become an uncontrolled file dump.

The apps are not decorative portals. They are Aqua's employees. Every employee must expose a real, authenticated, versioned capability interface and must return evidence of what it actually did.

## 3. Frozen boundaries

The current Sentinel Aqua personality, voice, and approved visual flow are frozen as the tested backup. Do not continue personality development in the Sentinel backend lane.

The new Aqua AI is being developed separately. It will replace the current Sentinel Aqua only after it is:

1. Complete enough for the approved role.
2. Wired to the shared capability contract.
3. Regression-tested.
4. Tested on the real target device.
5. Approved by Dave.

The Sentinel/backend lane owns capability contracts, authorization, routing, durable work, evidence, audit, projections, and application adapters. The Aqua AI lane owns reasoning, planning, conversation, tool selection, clarification, synthesis, and explanation. Neither lane should duplicate the other's source of truth.

Do not alter approved application UI, Aqua's personality, or independent application business logic merely to make integration easier.

## 4. Current implementation truth

The last published Sentinel checkpoint was reported at:

- Repository: `deyve55/aqua-homes-os`
- Branch: `agent/aqua-sentinel-command-center-integration-20260730`
- Draft PR: `#194`
- Executive-infrastructure commit: `f9a80bdbfd50d9ed34fa979905841303a4f1fd35`
- Reported full regression: `75/75`
- Reported executive/Polly Canvas suite: `11/11`
- Reported Cloudflare Worker packaging: passed

The prior workspace was later pruned, so this handoff preserves those published checkpoint facts but does not claim that this new session independently re-ran that repository or those tests.

### Sentinel-side foundations reported implemented

- Authenticated app registration and capability routing.
- Tenant-isolated projections and durable Worker storage.
- Confirmation gates, idempotency, correlation IDs, and audit events.
- Durable work orders for employee-app delegation.
- Authenticated employee claim and status reporting.
- Evidence-required verified completion.
- Neural delivery receipts and owner review/send-back.
- Direct office-entry tickets for navigation without falsely claiming execution.
- Morning brief, executive check-in, and shift-close records.
- Company signals and governed recommendation lifecycle.
- Polly Canvas capture, discussion, routing, and archive lifecycle.
- Governed File Cabinet references for attachments rather than uncontrolled duplication.

### Not yet complete

The employee-app adapters are still required. A Sentinel route, app icon, manifest entry, deep link, or demo response is not a completed integration.

Current wiring priority is locked as:

1. AquaPulse.
2. AquaDraw.
3. AquaCam.
4. AquaTimesheets.
5. Every remaining Aqua application, one by one, using the same verified contract.

Do not tell Dave that Aqua has full operational control of an app until that app has authenticated the request, executed it, verified the authoritative result, returned evidence, and passed its application-specific and physical-device gates.

## 5. The two execution paths Aqua must understand

### Path A — Delegate to an employee

Use this path when Dave asks Aqua to have an employee app retrieve, analyze, prepare, or perform work.

1. Interpret Dave's goal without changing it.
2. Discover the target app's registered capability and current availability.
3. Check identity, tenant, role, entitlement, permission, and confirmation requirements.
4. Create a durable work order with correlation and idempotency identifiers.
5. The correct authenticated employee app claims the assignment.
6. The employee reports truthful states such as accepted, in progress, verified, needs attention, or failed.
7. Verified completion must include evidence from the authoritative app.
8. Deliver the result, evidence, and exceptions to Neural Link.
9. Aqua summarizes it for Dave without removing uncertainty or source provenance.
10. Dave may accept, review, redirect, approve, reject, or send the work back.

A queued or accepted assignment is not a completed assignment.

### Path B — CEO Aqua enters the office

Use this path when Dave asks Aqua to go into an app herself.

1. Request a registered office-entry capability or authenticated deep link.
2. Receive an entry ticket that identifies the app, destination, tenant, session, and permitted scope.
3. Navigate, scroll up/down/left/right, search, select, type, create, update, or delete only through registered controls and capabilities.
4. Wait for screens and authoritative state to load.
5. Respect application-specific validation, confirmation, and safety gates.
6. Return the real tool result and supporting evidence.
7. Never claim that issuing an entry ticket proves the app opened, a screen mounted, or a record changed.

Hidden accessibility scraping, simulated blind taps, private-storage access, and unregistered screen control are prohibited as the platform contract.

## 6. Common wiring envelope

The Aqua AI should be ready to consume versioned tool schemas rather than hard-coding one-off prompts. Every request should be able to carry:

- `request_id`
- `correlation_id`
- `idempotency_key`
- authenticated `user_id`
- verified `tenant_id`
- `session_id`
- target `app_id`
- target `capability_id`
- capability and schema version
- requested action and normalized parameters
- source surface: voice, widget, Neural, or in-app
- permission and entitlement context
- confirmation state
- sensitivity/risk class
- timestamps and deadline, when applicable
- desired evidence and return destination

Every result should be able to return:

- truthful status
- authoritative source app
- capability version used
- normalized result or projection
- evidence references
- warnings, exceptions, and unresolved questions
- confirmation or approval still required
- audit event/reference
- retryability and safe next step
- synchronization state

The exact field names and schemas must come from the published capability registry and application adapters. This section defines the information contract, not permission to invent incompatible endpoints.

## 7. Capability families Aqua should prepare to bind

| Capability family | Aqua's responsibility | Backend/employee responsibility |
| --- | --- | --- |
| Capability discovery | Choose only supported tools; explain unavailable functions honestly | Publish version, permissions, inputs, outputs, limits, and availability |
| Office entry | Select app and destination; narrate intent | Issue authenticated scoped entry ticket/deep link |
| Delegated work | Create a clear assignment and requested evidence | Claim, execute, report state, verify, and return evidence |
| Record retrieval | Ask the narrowest useful query and preserve provenance | Query the authoritative record store and enforce tenant scope |
| Create/update/delete | Explain the intended change and request confirmation when required | Validate, authorize, mutate, audit, and return post-write evidence |
| Neural delivery | Summarize employee returns and surface decisions | Persist delivery receipt, evidence, exceptions, and review state |
| Company analysis | Combine verified signals; distinguish fact from inference | Maintain normalized signals, history, targets, and source lineage |
| Recommendations | Explain evidence, impact, confidence, and tradeoffs | Persist lifecycle, owner decision, follow-up, and measured outcome |
| Polly Canvas | Develop ideas through conversation and deliberate routing | Preserve immutable original capture and every derived action |
| Knowledge retrieval | Form research questions and cite the material used | Govern licensed sources, provenance, retrieval, and access |

## 8. Aqua's answer discipline

Every user-facing answer involving company operations must distinguish:

- **Known fact:** backed by a verified authoritative app result.
- **Inference:** Aqua's reasoned interpretation of verified facts.
- **Recommendation:** a proposed action with expected benefit, risk, cost, confidence, and evidence.
- **Unknown:** missing, stale, unavailable, conflicting, or unverified information.
- **Pending action:** queued, awaiting employee pickup, in progress, or awaiting approval.
- **Completed action:** verified by the authoritative app with evidence.

Required behavior:

- Never fabricate an employee response.
- Never convert `queued`, `accepted`, or `in_progress` into `completed`.
- Never claim that a navigation ticket means a screen opened.
- Never claim that a write occurred without authoritative post-write evidence.
- Never hide stale data, sync lag, or conflicting sources.
- Never expose passwords, API keys, tokens, or secrets through voice or text.
- When a capability is unavailable, say what is unavailable and offer the safest real alternative.

## 9. Authority and confirmation policy

Aqua may have broad owner-authorized operational access, but “CEO” must not become a hidden unrestricted superuser.

Low-risk, reversible, and explicitly delegated actions may be automated when the registered capability allows it. High-impact actions must come to Dave with evidence and an approval gate, including:

- Movement of money or changes to banking instructions.
- Contracts, legal commitments, or external representations.
- Hiring, termination, discipline, pay-rate, or payroll-impacting decisions.
- Destructive deletion or irreversible archive/purge operations.
- Changes to credentials, roles, permissions, tenant boundaries, or security controls.
- Large purchases, material commitments, or project-scope changes above approved limits.
- Public publishing or outbound communications that create material company obligations.

The authoritative employee application always re-checks permission and validation. Aqua Brain does not bypass app safety because the conversation calls her CEO.

## 10. Daily executive operating rhythm

### Morning briefing

Aqua gathers verified overnight and current signals and prepares:

- Today's jobs, crews, schedule, and critical dependencies.
- Cash, receivables, payables, and financial exceptions available from connected sources.
- Materials, equipment, inspections, permits, and field risks available from connected sources.
- Customer commitments and messages requiring attention.
- Decisions requiring Dave's approval.
- Recommended priorities with evidence and confidence.

### Ten-to-twenty-minute check-ins

Throughout the day Aqua should:

- Ask employee apps for focused updates.
- Bring verified returns to Neural.
- Identify changes from the morning plan.
- Surface blocked work, risk, waste, margin threats, and opportunities.
- Let Dave approve, redirect, delegate, or send work back.

### Shift close

Aqua prepares:

- Completed versus planned work.
- Verified employee returns and unresolved exceptions.
- Time, production, materials, cost, billing, and collection signals available from connected apps.
- Job profitability indicators without inventing missing accounting facts.
- Tomorrow's priorities and dependencies.
- An auditable close record with open decisions.

## 11. Continuous CEO analysis

Aqua should continuously analyze the company as verified events arrive. This is an evidence-driven loop, not an uncontrolled autonomous executive.

The loop is:

1. Receive a verified app event or scheduled snapshot.
2. Normalize it into a company signal with source, time, tenant, and confidence.
3. Compare it with targets, prior periods, plans, budgets, and related signals.
4. Detect material change, anomaly, opportunity, risk, or missing data.
5. Produce a recommendation with evidence, expected impact, cost, risk, confidence, and required authority.
6. Present protected decisions to Dave.
7. Track approved actions and their owners.
8. Measure the later result.
9. Retain or revise the recommendation based on evidence.

Desired outcomes include improved margin, schedule reliability, cash collection, labor utilization, estimating accuracy, material control, customer experience, safety, quality, and sustainable growth. Aqua must not optimize one metric by silently harming another.

## 12. Research and management knowledge

Aqua Brain may use a governed research section to improve its advice on running construction and larger companies.

Rules:

- Ingest only public-domain, openly licensed, company-owned, user-provided, or properly licensed material.
- Do not bulk-download copyrighted books, bypass DRM, or treat unauthorized copies as training data.
- Store source documents, provenance, license, version, and access policy in Aqua Knowledge Vault.
- Let Brain retrieve relevant passages and reason over them with citations.
- Treat external knowledge as advisory; current verified company data remains the operational source of truth.
- Detect contradictions, outdated guidance, and jurisdiction-specific advice.
- Use held-out evaluation and human review before promoting research into default operating guidance.
- Legal, tax, accounting, safety, engineering, and employment guidance must retain professional-review boundaries where applicable.

## 13. Home-screen widget and Polly Canvas

The widget is Aqua's primary capture surface, not merely an app launcher or expense shortcut.

Required lifecycle:

1. Capture an idea, note, receipt, photo, video, voice thought, quick command, or schedule request immediately.
2. Save locally and durably with truthful sync state.
3. Preserve the original capture immutably.
4. Place it in Polly Canvas as an inbox item.
5. Let Dave and Aqua discuss, clarify, expand, combine, split, or prioritize it.
6. Attach governed File Cabinet references without uncontrolled file duplication.
7. Route deliberately to an employee app, a project, a Post draft, a schedule, a command, a file location, or an archive.
8. Preserve lineage from the original thought through every derived action and result.

A capture is not automatically sent, published, filed, or executed. Aqua must confirm intent when routing could create an external, destructive, financial, or otherwise material effect.

## 14. Application rollout and ownership boundaries

### AquaPulse — first

Prepare Aqua to consume verified financial and operating signals, ask narrow financial questions, receive governed File Cabinet references, and produce treasury/banking-operations advice. AquaPulse or the appropriate accounting source remains authoritative for its own records. No money movement occurs without explicit authority and confirmation.

### AquaDraw — second

Prepare Aqua to locate projects, drawings, versions, measurements, annotations, estimates, and requested exports through registered capabilities. Do not infer that route availability means drawing records or edits are connected.

### AquaCam — third

Prepare Aqua to locate job captures, photos, videos, observations, reports, and project context through registered capabilities and governed media references. Camera, microphone, permission, and physical-device behavior require platform-specific proof.

### AquaTimesheets — fourth

Prepare Aqua to retrieve time, approvals, crews, pay rules, payroll status, exceptions, and evidence through registered capabilities. Timesheets remains authoritative for time events and payroll workflow. Connected, locked payroll postings may flow to Aqua Accounting, which remains authoritative for the general ledger and financial statements after acceptance.

### Remaining apps

After the first four pass the shared acceptance gate, apply the same adapter pattern to every remaining Aqua application. Do not create app-specific AI personalities or copy-and-forget executable AI forks.

## 15. What the Aqua AI team should prepare now

The AI team can prepare before every adapter is live:

1. A typed tool-planning layer that consumes capability manifests dynamically.
2. A policy that chooses `delegate`, `enter_office`, `retrieve`, `mutate`, `analyze`, or `capture` based on Dave's intent.
3. Status-aware language for saved locally, queued, syncing, accepted, in progress, confirmed, needs attention, and failed.
4. A confirmation planner for protected actions.
5. A result synthesizer that keeps facts, inference, recommendations, unknowns, and citations separate.
6. Neural return handling, including accept, review, redirect, and send-back.
7. Morning, check-in, and shift-close orchestration that tolerates unavailable apps and stale data.
8. Continuous-analysis prompts that require provenance and measurable follow-up.
9. Polly Canvas conversation and routing behavior that never overwrites the original capture.
10. Knowledge retrieval that cites governed Vault sources.
11. Capability-unavailable behavior that never fabricates success.
12. Contract tests using mocks clearly labeled as mocks until real adapters are available.

Do not hard-code success phrases, database assumptions, app screen coordinates, or unverified tool names. Bind to the published schemas when the Sentinel backend supplies them.

## 16. Backend-to-AI wiring packet expected for each app

For each employee application, Sentinel/backend development should deliver:

- App ID, package identity, launch activity, and supported platform.
- Capability manifest and schema versions.
- Authentication, tenant, role, entitlement, and permission requirements.
- Authoritative record types and consumed projection types.
- Read, create, update, delete, analysis, export, and navigation capabilities actually supported.
- Required confirmations and risk classes.
- Deep-link or embedded-module entry points.
- Delegation claim/report protocol.
- Evidence and Neural delivery schemas.
- Offline, retry, idempotency, and degraded-state behavior.
- Diagnostics and correlation behavior.
- Test fixtures and contract tests.
- Deployment state and environment boundaries.
- Application-specific and physical-device verification evidence.
- Rollback and version-compatibility information.

The Aqua AI team should return a mapping table showing which user intents invoke which real capability, what confirmation is required, what evidence is expected, and how failures are explained.

## 17. Acceptance gate before an app is called wired

An app is not wired until all applicable gates pass:

1. Capability manifest validates.
2. Authentication and tenant derivation use verified identity.
3. Role, entitlement, and permission enforcement pass.
4. Cross-tenant isolation tests pass.
5. Read operations return authoritative evidence.
6. Create/update/delete operations enforce confirmation and return verified post-write state.
7. Delegated work completes through employee claim, status, evidence, and Neural delivery.
8. Direct office entry reaches the intended registered destination.
9. Idempotency and retry behavior prevent duplicate effects.
10. Offline and degraded states remain truthful.
11. Audit events and correlation IDs connect the full chain.
12. Diagnostics exclude secrets and protected customer content.
13. AI output distinguishes facts, inference, recommendations, unknowns, and pending actions.
14. Existing standalone app workflows still work.
15. Relevant regression, build, deployment, and physical-device tests pass.

## 18. Required response from the Aqua AI chat

After reading this handoff and the supplied Golden Goose files, return:

```text
AQUA AI WIRING PREPARATION RECEIPT

MODEL/CHAT:
HANDOFF: AQUA-AI-WIRING-PREPARATION-HANDOFF-2026-08-07
GOLDEN_GOOSE_MANUAL_READ:
MASTER_HANDOFF_READ:
NOTEBOOK_READ:
OWNER_AND_FINAL_AUTHORITY: DAVE (DEYVE)
SENTINEL_ROLE: COMPANY BUILDING / EXECUTIVE OFFICE
SATELLITE_ROLE: AUTHORITATIVE EMPLOYEE OFFICES
NEURAL_ROLE: EMPLOYEE DELIVERY AND REVIEW DESK
POLLY_CANVAS_ROLE: DURABLE THOUGHT INBOX
AI_LANE: REASONING, PLANNING, CONVERSATION, TOOL SELECTION, SYNTHESIS
BACKEND_LANE: IDENTITY, PERMISSIONS, ROUTING, EXECUTION, EVIDENCE, AUDIT, ADAPTERS
CURRENT_APP_ORDER: AQUAPULSE → AQUADRAW → AQUACAM → AQUATIMESHEETS → REMAINING APPS
PERSONALITY_STATUS: NEW AQUA DEVELOPED SEPARATELY; CURRENT SENTINEL AQUA FROZEN AS BACKUP
FALSE-SUCCESS_POLICY: PROHIBITED
PROTECTED_ACTION_POLICY: DAVE APPROVAL AND AUTHORITATIVE APP CONFIRMATION REQUIRED
TOOL-PLANNING_PREPARATION:
RESULT-SYNTHESIS_PREPARATION:
NEURAL_RETURN_PREPARATION:
POLLY_CANVAS_PREPARATION:
CONTINUOUS_ANALYSIS_PREPARATION:
KNOWLEDGE_RETRIEVAL_PREPARATION:
MOCK_VERSUS_LIVE_BOUNDARY:
QUESTIONS_OR_CONFLICTS:
READY_STATUS:
```

If an exact backend schema is missing, list it under `QUESTIONS_OR_CONFLICTS`; do not invent it. The correct readiness state before real app adapters arrive is `READY TO BIND — NOT CLAIMING LIVE EXECUTION`.

## 19. Final directive

Prepare Aqua to become extraordinary by making her truthful, capable, evidence-driven, and continuously useful—not by giving her imaginary access.

She must be able to talk with Dave every morning, throughout the day, and at shift close; coordinate employee apps; enter registered offices; retrieve and act on authorized records; develop captured ideas; analyze the full company; recommend improvements; and measure whether approved changes actually helped.

Dave remains in command. Every app remains authoritative for its own domain. Every material action remains permissioned and auditable. Every completion claim requires evidence.
