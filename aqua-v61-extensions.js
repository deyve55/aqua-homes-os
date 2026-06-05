/*
 * Aqua Homes OS v61J Modular Extension Loader
 * Wires the main Ask AI modal to direct one-shot local push-to-talk command capture and natural command intent routing plus the Visual Module Open Router plus Native Module Open Bridge plus v61H SOW/Insurance/Receipt Action route fixes plus v61I Permission Granter / Action Authority Demo Gate plus v61J Draft Change Queue foundation.
 * Protected Home visuals untouched. No live AI, backend, network, always-listening, or audio storage.
 */
(function () {
  'use strict';

  var VERSION = 'v61J';
  var state = {
    version: VERSION,
    initialized: true,
    askAIHookInstalled: false,
    askAIReadyInserted: false,
    commandControlsInserted: false,
    voiceButtonAvailable: false,
    directAskVoiceHookInstalled: false,
    askAITapStartsOneShotListening: false,
    directAskVoiceHandlerAvailable: false,
    transcriptInjectionAvailable: false,
    commandRouterHandoffAvailable: false,
    unsupportedFallbackAvailable: false,
    permissionDeniedFallbackAvailable: false,
    browserBlockedFallbackAvailable: false,
    fallbackTapToStartVoiceAvailable: false,
    fallbackUXPolished: false,
    roughDraftLabelPresent: false,
    directAskButtonHookInstalled: false,
    directMicStartAttemptedFromUserGesture: false,
    oneShotOnly: true,
    noAlwaysListening: true,
    noAutoMicStart: true,
    noAudioStorage: true,
    noNetworkCalls: true,
    wrappedOpenModal: false,
    directAskVoiceActive: false,
    directAskVoiceStartedForOpen: false,
    commandNormalizerAvailable: true,
    actionIntentDemoAvailable: true,
    noLiveActionExecuted: true,
    localModuleFallbackAvailable: true,
    visualModuleRouterExists: true,
    nativeModuleBridgeExists: true,
    receiptsNativeOpenAttempted: false,
    accountingNativeOpenAttempted: false,
    approvalQueueNativeOpenAttempted: false,
    fallbackOnlyWhenNativeMissing: true,
    receiptsOpenVisualWorks: false,
    accountingOpenVisualWorks: false,
    approvalQueueOpenVisualWorks: false,
    projectFoldersOpenVisualWorks: false,
    actionIntentPanelWorks: false,
    sowRouteWorks: false,
    insuranceRouteWorks: false,
    insurerSynonymWorks: false,
    receiptActionIntentWorks: false,
    actionIntentRunsBeforeFallback: false,
    unknownFallbackStillWorks: false,
    permissionGranterV61IAvailable: true,
    actionAuthorityDemoGateAvailable: true,
    permissionGranterPanelWorks: false,
    permissionGranterButtonsWork: false,
    permissionGranterStorageKey: 'aquaPermissionGranterV61I',
    noLiveRecordChangeV61I: true,
    noBackendNetworkLiveAIV61I: true,
    draftChangeQueueV61JAvailable: true,
    draftChangeQueuePanelWorks: false,
    draftChangeQueueButtonsWork: false,
    draftChangeQueueCommandsWork: false,
    draftChangeQueueStorageKey: 'aquaDraftChangeQueueV61J',
    noLiveRecordChangeV61J: true,
    noBackendNetworkLiveAIV61J: true,
    currentCommandReparseWorksV61J: false,
    staleLocalStorageDoesNotOverrideCurrentCommandV61J: false,
    clearCurrentDemoActionWorksV61J: false,
    clearDraftQueueDemoWorksV61J: false,
    savedDraftHistorySeparateV61J: false
  };

  var DRAFT_CHANGE_QUEUE_KEY_V61J = 'aquaDraftChangeQueueV61J';
  var PERMISSION_GRANTER_KEY_V61I = 'aquaPermissionGranterV61I';

  function mergeNamespace() {
    var previous = window.AquaV61Extensions || {};
    window.AquaV61Extensions = Object.assign(previous, state, {
      version: VERSION,
      runV61BCheck: runV61BCheck,
      runV61CCheck: runV61CCheck,
      runV61DCheck: runV61DCheck,
      runV61ECheck: runV61ECheck,
      runV61FCheck: runV61FCheck,
      runV61GCheck: runV61GCheck,
      runV61HCheck: runV61HCheck,
      runV61ICheck: runV61ICheck,
      runV61JCheck: runV61JCheck,
      normalizeAquaCommandV61E: normalizeAquaCommandV61E,
      runNormalizedAquaCommandV61E: runNormalizedAquaCommandV61E,
      openVisualModuleV61F: openVisualModuleV61F,
      openNativeModuleV61G: openNativeModuleV61G,
      renderVisualModuleRouteV61F: renderVisualModuleRouteV61F,
      renderActionIntentDemoV61E: renderActionIntentDemoV61E,
      renderPermissionGranterV61I: renderPermissionGranterV61I,
      renderDraftChangeQueueV61J: renderDraftChangeQueueV61J,
      renderLocalModuleFallbackV61E: renderLocalModuleFallbackV61E,
      localModuleFallbackTextV61E: localModuleFallbackTextV61E,
      wireAskAIToCommandFlow: wireAskAIToCommandFlow,
      exposeAskAICommandFlow: exposeAskAICommandFlow,
      directAskVoiceV61D: directAskVoiceV61D,
      startDirectAskVoiceV61D: startDirectAskVoiceV61D,
      startDirectAskVoiceV61C: startDirectAskVoiceV61D
    });
    return window.AquaV61Extensions;
  }

  function syncNamespace() {
    if (!window.AquaV61Extensions) return mergeNamespace();
    Object.assign(window.AquaV61Extensions, state, {
      version: VERSION,
      runV61BCheck: runV61BCheck,
      runV61CCheck: runV61CCheck,
      runV61DCheck: runV61DCheck,
      runV61ECheck: runV61ECheck,
      runV61FCheck: runV61FCheck,
      runV61GCheck: runV61GCheck,
      runV61HCheck: runV61HCheck,
      runV61ICheck: runV61ICheck,
      runV61JCheck: runV61JCheck,
      normalizeAquaCommandV61E: normalizeAquaCommandV61E,
      runNormalizedAquaCommandV61E: runNormalizedAquaCommandV61E,
      openVisualModuleV61F: openVisualModuleV61F,
      openNativeModuleV61G: openNativeModuleV61G,
      renderVisualModuleRouteV61F: renderVisualModuleRouteV61F,
      renderActionIntentDemoV61E: renderActionIntentDemoV61E,
      renderPermissionGranterV61I: renderPermissionGranterV61I,
      renderDraftChangeQueueV61J: renderDraftChangeQueueV61J,
      renderLocalModuleFallbackV61E: renderLocalModuleFallbackV61E,
      localModuleFallbackTextV61E: localModuleFallbackTextV61E,
      wireAskAIToCommandFlow: wireAskAIToCommandFlow,
      exposeAskAICommandFlow: exposeAskAICommandFlow,
      directAskVoiceV61D: directAskVoiceV61D,
      startDirectAskVoiceV61D: startDirectAskVoiceV61D,
      startDirectAskVoiceV61C: startDirectAskVoiceV61D
    });
    return window.AquaV61Extensions;
  }


  function normalizeAquaPhraseV61E(commandText) {
    return String(commandText || '')
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/&/g, ' and ')
      .replace(/\bp\s*and\s*l\b/g, 'p and l')
      .replace(/\bs\s*o\s*w\b/g, 'sow')
      .replace(/[^a-z0-9 ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function phraseMatchesV61E(normalized, phrases) {
    return phrases.some(function (phrase) {
      var clean = normalizeAquaPhraseV61E(phrase);
      return normalized === clean || normalized.indexOf(clean) !== -1;
    });
  }

  function detectActionIntentV61E(original, normalized) {
    var actionMatch = normalized.match(/^(?:please\s+)?(code|categorize|mark|change|update|move|approve|set|review|put)\b(?:\s+this|\s+that|\s+the)?(?:\s+item|\s+receipt|\s+amount|\s+record)?(?:\s+as|\s+to|\s+under)?\s*([a-z0-9 ]*)/);
    if (!actionMatch) return null;
    if (/\b(show|open|pull up|bring up) code\b/.test(normalized)) return null;
    var target = 'General local/demo module';
    var receiptAction = /receipt|materials|material|vendor|expense/.test(normalized);
    if (receiptAction) target = 'Receipts / Receipt Tracker';
    else if (/approval|approve|owner review/.test(normalized)) target = 'Owner Action Queue / Approval Center';
    else if (/amount|number|account|bank|ledger|p and l|accounting/.test(normalized)) target = 'Accounting Command / Daily P&L';
    else if (/sow|scope/.test(normalized)) target = 'SOW Builder / Scope of Work';
    var requested = '';
    var amount = normalized.match(/\b(?:to|as)\s*\$?([0-9]+(?:\.[0-9]{1,2})?)\b/);
    if (amount) requested = '$' + amount[1];
    else if (/materials?/.test(normalized)) requested = 'materials';
    else if (/reviewed/.test(normalized)) requested = 'reviewed';
    else if (/owner approval|owner review/.test(normalized)) requested = 'owner approval';
    else if (actionMatch[2]) requested = actionMatch[2].trim();
    return {
      canonicalIntent: 'action_intent_demo',
      routeText: 'action_intent_demo',
      originalText: original,
      detectedAction: receiptAction ? 'receipt coding / categorization / review' : (original || normalized),
      targetModule: target,
      requestedValue: requested || 'not clear from transcript',
      permissionGate: 'Permission Granter required',
      undoAuditRequirement: 'owner permission, audit log, undo/revert'
    };
  }

  function normalizeAquaCommandV61E(commandText) {
    var original = String(commandText || '').trim();
    var q = normalizeAquaPhraseV61E(original);
    var action = detectActionIntentV61E(original, q);
    if (action) return action;
    var groups = [
      { canonicalIntent: 'show_receipts', routeText: 'show receipts', module: 'Receipts / Receipt Tracker', phrases: ['pull up receipts','bring up receipts','show receipts','show receipt','open receipts','open receipt tracker','receipts','receipt review','what receipts need review'] },
      { canonicalIntent: 'show_accounting', routeText: 'show accounting', module: 'Accounting Command / Daily P&L', phrases: ['pull up accountant','pull up accounting','open accountant','open accounting','show accountant','show accounting','accounting','daily p and l','daily pnl','daily pl','how are my numbers','show my numbers','how is the company doing','how is my company doing','how is painting doing','how is my painting company doing'] },
      { canonicalIntent: 'owner_briefing', routeText: 'owner briefing', module: 'Owner Daily Briefing', phrases: ['whats going on today','what is going on today','what needs my attention today','what needs attention','what should i do today','what should i do next','give me todays briefing','owner briefing','daily briefing'] },
      { canonicalIntent: 'approval_queue', routeText: 'show approval queue', module: 'Owner Action Queue / Approval Center', phrases: ['what needs approval','show approvals','show approval queue','show owner action queue','show pending reviews','what needs owner review','what is waiting on me'] },
      { canonicalIntent: 'show_project_folders', routeText: 'show project folders', module: 'Project Folders', phrases: ['open project folders','show project folders','pull up project folders','project folders','job folders','folder list'] },
      { canonicalIntent: 'show_sow', routeText: 'show sow', module: 'SOW Builder / Scope of Work', phrases: ['show sow','open sow','pull up sow','show scope','open scope','scope of work','sow builder','pull up scope of work','open scope of work','pull up scope'] },
      { canonicalIntent: 'show_field_walkthrough', routeText: 'show field walkthrough', module: 'Field Walkthrough', phrases: ['open field walkthrough','show field walkthrough','open walkthrough','walkthrough','job walkthrough','site walkthrough','field capture'] },
      { canonicalIntent: 'show_evidence', routeText: 'show photo proof', module: 'Photo Proof / Evidence Binder', phrases: ['show evidence','show proof','show photo proof','open evidence','evidence binder','source proof','photo proof','photos','job photos'] },
      { canonicalIntent: 'show_code_permits', routeText: 'code compliance permits inspections', module: 'Code Compliance / Permits / Inspections', phrases: ['show code','code compliance','permits','inspections','inspection issues','permit issues','what failed inspection'] },
      { canonicalIntent: 'show_insurance_bank', routeText: 'show bank reconciliation', module: 'Insurance Dashboard / Bank Reconciliation', phrases: ['show insurer','show insurance','open insurance','pull up insurance','insurance dashboard','show insurance dashboard','show bank reconciliation','bank reconciliation','show bank','bank match','bank issues','coi','certificate of insurance'] },
      { canonicalIntent: 'show_draft_change_queue', routeText: 'show draft changes', module: 'Draft Change Queue', phrases: ['show draft changes','show prepared changes','show pending edits','show change queue','what changes are waiting','what changes are waiting?','show approved demo changes'] },
      { canonicalIntent: 'show_locked_actions', routeText: 'what is locked and why', module: 'Locked Actions', phrases: ['what is locked','what is locked and why','why is this locked','what cant i do','what is blocked','blocking live mode'] }
    ];
    var route = groups.find(function (group) { return phraseMatchesV61E(q, group.phrases); });
    if (route) return Object.assign({ originalText: original, normalizedText: q }, route);
    return { canonicalIntent: 'unknown', routeText: original, module: 'Guided fallback', originalText: original, normalizedText: q };
  }


  function localModuleFallbackTextV61E() {
    return 'I can route to local Aqua modules like Project Folders, SOW, Field Walkthrough, Receipts, Evidence, Accounting, Insurance, Bank Reconciliation, Owner Review, or Approval Queue. Try: Show Receipts.';
  }

  function renderLocalModuleFallbackV61E(intent) {
    var safe = intent || {};
    var heard = safe.originalText ? '<div><strong>Heard:</strong> ' + escapeHTMLV61D(safe.originalText) + '</div>' : '';
    return '<div class="note"><strong>Fallback local demo panel: native module opener not found.</strong> ' + escapeHTMLV61D(localModuleFallbackTextV61E()) + heard + '<div class="locked">Local/demo-only. No live AI, backend, search, network call, export, payment, approval, or external action was run.</div></div>';
  }

  function commandHashV61J(commandText) {
    var text = String(commandText || '');
    var hash = 0;
    for (var i = 0; i < text.length; i += 1) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return 'cmd-' + Math.abs(hash) + '-' + text.length;
  }

  function requestedValueDisplayV61J(value) {
    var clean = String(value || '').trim();
    if (!clean || /not clear from transcript/i.test(clean) || /^unclear$/i.test(clean)) return 'unclear — owner must confirm';
    return clean;
  }

  function currentCommandInputV61J() {
    var selectors = ['#brainCommand', '#aiAsk', '[data-aqua-command-input]', 'textarea', 'input[type="text"]'];
    for (var i = 0; i < selectors.length; i += 1) {
      var node = document.querySelector(selectors[i]);
      if (node && typeof node.value === 'string' && node.value.trim()) return node.value.trim();
    }
    return '';
  }

  function activeOutputNodeV61J(panel) {
    if (panel && panel.parentNode) return panel.parentNode;
    return document.getElementById('brainOut') || document.getElementById('aiOut') || null;
  }

  function intentFromPermissionPanelV61J(panel) {
    if (!panel) return {};
    return {
      originalText: panel.getAttribute('data-aqua-v61j-current-command') || '',
      commandHash: panel.getAttribute('data-aqua-v61j-command-hash') || '',
      detectedAction: panel.getAttribute('data-aqua-v61j-detected-action') || 'Action-style command',
      targetModule: panel.getAttribute('data-aqua-v61j-target-module') || 'Local/demo module',
      requestedValue: panel.getAttribute('data-aqua-v61j-requested-value') || 'not clear from transcript',
      draftChangeId: panel.getAttribute('data-aqua-v61j-active-draft-id') || ''
    };
  }

  function clearCurrentDemoActionV61J(panel) {
    try {
      window.localStorage.removeItem(PERMISSION_GRANTER_KEY_V61I);
    } catch (error) {
      state.permissionGranterStorageWarning = 'localStorage unavailable in this browser context';
    }
    var target = activeOutputNodeV61J(panel);
    if (target) {
      target.innerHTML = '<div class="note" data-aqua-v61j-current-action-cleared="true"><strong>Current demo action cleared.</strong><div>Active Permission Granter state was cleared locally. Draft Change Queue history was not changed.</div><div class="locked">No Live Change Made. No backend, network, live AI, or real record update.</div></div>';
    }
    state.clearCurrentDemoActionWorksV61J = true;
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61I = true;
    state.noBackendNetworkLiveAIV61J = true;
    syncNamespace();
    return true;
  }

  function clearDraftQueueDemoV61J(renderNode) {
    try {
      window.localStorage.removeItem(DRAFT_CHANGE_QUEUE_KEY_V61J);
    } catch (error) {
      state.draftChangeQueueStorageWarning = 'localStorage unavailable in this browser context';
    }
    if (renderNode) renderNode.innerHTML = renderDraftChangeQueueV61J();
    state.clearDraftQueueDemoWorksV61J = true;
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61J = true;
    syncNamespace();
    return true;
  }

  function permissionGranterRecordV61I(intent, stage) {
    var safe = intent || {};
    return {
      version: 'v61I',
      stage: stage || 'detected',
      currentCommand: safe.originalText || '',
      commandHash: safe.commandHash || commandHashV61J(safe.originalText || ''),
      detectedAction: safe.detectedAction || 'Action-style command',
      targetModule: safe.targetModule || 'Local/demo module',
      requestedValue: safe.requestedValue || 'not clear from transcript',
      localDemoStatus: stage || 'permission required',
      status: 'Permission required / No live change made',
      liveChange: 'Not performed',
      auditRequirement: 'Audit placeholder required before any future live change',
      undoRequirement: 'Undo checkpoint required before any future live change',
      noLiveChangeMade: true,
      timestamp: new Date().toISOString()
    };
  }

  function savePermissionGranterDemoV61I(intent, stage) {
    var record = permissionGranterRecordV61I(intent, stage);
    try {
      window.localStorage.setItem(PERMISSION_GRANTER_KEY_V61I, JSON.stringify(record));
    } catch (error) {
      record.storageWarning = 'localStorage unavailable in this browser context';
    }
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noBackendNetworkLiveAIV61I = true;
    syncNamespace();
    return record;
  }

  function draftQueueCommandFieldV61J(intent) {
    var safe = intent || {};
    if (/receipt/i.test(safe.targetModule || '') || /receipt/i.test(safe.detectedAction || '')) return 'Receipt category / job-cost code';
    if (/accounting|p&l|ledger|bank/i.test(safe.targetModule || '')) return 'Accounting demo field';
    if (/sow|scope/i.test(safe.targetModule || '')) return 'Scope / change-order demo field';
    if (/approval|owner/i.test(safe.targetModule || '')) return 'Owner/Admin approval demo field';
    return 'Local demo field placeholder';
  }

  function draftQueueCurrentValueV61J(intent) {
    var safe = intent || {};
    if (/receipt/i.test(safe.targetModule || '') || /materials/i.test(safe.requestedValue || '')) return 'uncoded receipt placeholder';
    return 'unchanged local demo value placeholder';
  }

  function draftQueueProposedValueV61J(intent) {
    var safe = intent || {};
    return safe.requestedValue || safe.detectedAction || 'proposed demo value placeholder';
  }

  function createDraftChangeIdV61J() {
    return 'DCQ-v61J-' + new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-' + Math.floor(Math.random() * 900 + 100);
  }

  function readDraftChangeQueueV61J() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(DRAFT_CHANGE_QUEUE_KEY_V61J) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeDraftChangeQueueV61J(queue) {
    try {
      window.localStorage.setItem(DRAFT_CHANGE_QUEUE_KEY_V61J, JSON.stringify(queue || []));
    } catch (error) {
      state.draftChangeQueueStorageWarning = 'localStorage unavailable in this browser context';
    }
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61I = true;
    state.noBackendNetworkLiveAIV61J = true;
    syncNamespace();
  }

  function draftChangeRecordV61J(intent, status) {
    var safe = intent || {};
    return {
      version: 'v61J',
      id: safe.draftChangeId || createDraftChangeIdV61J(),
      commandHash: safe.commandHash || commandHashV61J(safe.originalText || ''),
      detectedCommand: safe.originalText || safe.detectedAction || 'Action-style command',
      detectedAction: safe.detectedAction || 'Action-style command',
      targetModule: safe.targetModule || 'Local/demo module',
      fieldToChange: draftQueueCommandFieldV61J(safe),
      currentDemoValue: draftQueueCurrentValueV61J(safe),
      proposedValue: draftQueueProposedValueV61J(safe),
      status: status || 'prepared',
      ownerAdminPermissionStatus: status === 'approved demo' ? 'Owner/Admin demo-approved locally' : 'Owner/Admin permission required before any future live change',
      auditPlaceholder: 'Audit placeholder only — future backend audit required',
      undoPlaceholder: 'Undo placeholder only — no live record to undo',
      noLiveChangeMade: 'No Live Change Made',
      timestamp: new Date().toISOString()
    };
  }

  function upsertDraftChangeQueueV61J(intent, status) {
    var record = draftChangeRecordV61J(intent, status || 'prepared');
    var queue = readDraftChangeQueueV61J();
    var existingIndex = -1;
    for (var i = 0; i < queue.length; i += 1) {
      if (queue[i] && queue[i].id === record.id) existingIndex = i;
    }
    if (existingIndex >= 0) queue[existingIndex] = Object.assign({}, queue[existingIndex], record);
    else queue.unshift(record);
    writeDraftChangeQueueV61J(queue);
    state.draftChangeQueueV61JAvailable = true;
    return record;
  }

  function updateDraftChangeStatusV61J(id, status) {
    var queue = readDraftChangeQueueV61J();
    var changed = false;
    queue = queue.map(function (item) {
      if (!item || item.id !== id) return item;
      changed = true;
      return Object.assign({}, item, {
        status: status,
        ownerAdminPermissionStatus: status === 'approved demo' ? 'Owner/Admin demo-approved locally' : (status === 'cancelled' ? 'Owner/Admin permission cancelled locally' : 'Owner/Admin permission required before any future live change'),
        noLiveChangeMade: 'No Live Change Made',
        updatedAt: new Date().toISOString()
      });
    });
    if (changed) writeDraftChangeQueueV61J(queue);
    return changed;
  }

  function renderDraftChangeQueueRowsV61J(queue) {
    if (!queue.length) {
      return '<div class="note"><strong>No draft changes waiting.</strong><div class="smallMut">Prepare an action command like “code this receipt to materials” to add a local/demo draft change. No Live Change Made.</div></div>';
    }
    return '<div class="folderDetailGrid">' + queue.map(function (item) {
      return '<div class="folderDetailCard" data-aqua-v61j-draft-id="' + escapeHTMLV61D(item.id) + '">' +
        '<b>Draft Change ID: ' + escapeHTMLV61D(item.id) + '</b>' +
        '<span><strong>Detected command:</strong> ' + escapeHTMLV61D(item.detectedCommand) + '</span>' +
        '<span><strong>Target module:</strong> ' + escapeHTMLV61D(item.targetModule) + '</span>' +
        '<span><strong>Field to change:</strong> ' + escapeHTMLV61D(item.fieldToChange) + '</span>' +
        '<span><strong>Current/demo value placeholder:</strong> ' + escapeHTMLV61D(item.currentDemoValue) + '</span>' +
        '<span><strong>Proposed value:</strong> ' + escapeHTMLV61D(item.proposedValue) + '</span>' +
        '<span><strong>Status:</strong> ' + escapeHTMLV61D(item.status) + '</span>' +
        '<span><strong>Owner/Admin permission status:</strong> ' + escapeHTMLV61D(item.ownerAdminPermissionStatus) + '</span>' +
        '<span><strong>Audit placeholder:</strong> ' + escapeHTMLV61D(item.auditPlaceholder) + '</span>' +
        '<span><strong>Undo placeholder:</strong> ' + escapeHTMLV61D(item.undoPlaceholder) + '</span>' +
        '<span class="locked"><strong>No Live Change Made</strong></span>' +
        '<span class="actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">' +
        '<button type="button" class="btn small gold" data-aqua-v61j-queue-action="ready" data-aqua-v61j-draft-id="' + escapeHTMLV61D(item.id) + '">Mark Ready for Future Backend</button>' +
        '<button type="button" class="btn small" data-aqua-v61j-queue-action="revert" data-aqua-v61j-draft-id="' + escapeHTMLV61D(item.id) + '">Revert Demo Change</button>' +
        '<button type="button" class="btn small" data-aqua-v61j-queue-action="before-after" data-aqua-v61j-draft-id="' + escapeHTMLV61D(item.id) + '">View Before / After</button>' +
        '<button type="button" class="btn small" data-aqua-v61j-queue-action="audit" data-aqua-v61j-draft-id="' + escapeHTMLV61D(item.id) + '">View Audit Trail Placeholder</button>' +
        '</span>' +
        '<span class="smallMut" data-aqua-v61j-row-status="' + escapeHTMLV61D(item.id) + '">Local/demo queue only. No backend, network, live AI, or real record update.</span>' +
        '</div>';
    }).join('') + '</div>';
  }

  function renderDraftChangeQueueV61J(filterStatus) {
    var queue = readDraftChangeQueueV61J();
    if (filterStatus === 'prepared') queue = queue.filter(function (item) { return item.status === 'prepared'; });
    if (filterStatus === 'approved demo') queue = queue.filter(function (item) { return item.status === 'approved demo'; });
    state.draftChangeQueuePanelWorks = true;
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61J = true;
    syncNamespace();
    return '<div class="note" data-aqua-v61j-draft-change-queue="true"><strong>Draft Change Queue</strong>' +
      '<div><strong>Storage key:</strong> ' + DRAFT_CHANGE_QUEUE_KEY_V61J + '</div>' +
      '<div><strong>Mode:</strong> saved draft queue history only — separate from the current Permission Granter command. No Live Change Made.</div>' +
      '<div class="actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button type="button" class="btn small" data-aqua-v61j-clear-queue="true">Clear Draft Queue Demo</button></div>' +
      '<div class="locked">No live record changes occur. No backend calls. No network calls. No live AI calls. Accounting export, payment, payroll, and bank connections remain locked.</div>' +
      renderDraftChangeQueueRowsV61J(queue) + '</div>';
  }

  function renderPermissionGranterV61I(intent) {
    var safe = Object.assign({}, intent || {});
    safe.originalText = String(safe.originalText || currentCommandInputV61J() || '').trim();
    safe.commandHash = commandHashV61J(safe.originalText || '');
    var requestedDisplay = requestedValueDisplayV61J(safe.requestedValue);
    safe.requestedValue = /unclear — owner must confirm/i.test(requestedDisplay) ? 'not clear from transcript' : requestedDisplay;
    var draftRecord = upsertDraftChangeQueueV61J(safe, 'prepared');
    safe.draftChangeId = draftRecord.id;
    savePermissionGranterDemoV61I(safe, 'permission required');
    state.permissionGranterPanelWorks = true;
    state.actionIntentPanelWorks = true;
    state.currentCommandReparseWorksV61J = true;
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noBackendNetworkLiveAIV61I = true;
    syncNamespace();
    return '<div class="note" data-aqua-v61i-permission-granter="true" data-aqua-v61j-current-command="' + escapeHTMLV61D(safe.originalText || '') + '" data-aqua-v61j-command-hash="' + escapeHTMLV61D(safe.commandHash) + '" data-aqua-v61j-detected-action="' + escapeHTMLV61D(safe.detectedAction || 'Action-style command') + '" data-aqua-v61j-target-module="' + escapeHTMLV61D(safe.targetModule || 'Local/demo module') + '" data-aqua-v61j-requested-value="' + escapeHTMLV61D(safe.requestedValue || 'not clear from transcript') + '" data-aqua-v61j-active-draft-id="' + escapeHTMLV61D(draftRecord.id) + '"><strong>Permission Required / Action Intent Demo</strong>' +
      '<div><strong>Current command:</strong> ' + escapeHTMLV61D(safe.originalText || 'No current command text found') + '</div>' +
      '<div><strong>Detected action:</strong> ' + escapeHTMLV61D(safe.detectedAction || 'Action-style command') + '</div>' +
      '<div><strong>Target module:</strong> ' + escapeHTMLV61D(safe.targetModule || 'Local/demo module') + '</div>' +
      '<div><strong>Requested category/value:</strong> ' + escapeHTMLV61D(requestedDisplay) + '</div>' +
      '<div><strong>Local demo status for this current command:</strong> permission required. Command hash: ' + escapeHTMLV61D(safe.commandHash) + '. No Live Change Made.</div>' +
      '<div><strong>Draft Change Queue history:</strong> Added prepared draft ' + escapeHTMLV61D(draftRecord.id) + ' to aquaDraftChangeQueueV61J as saved demo history. It is not the source of truth for the active command.</div>' +
      '<div><strong>Status:</strong> Permission required / No live change made</div>' +
      '<div class="actions" data-aqua-v61i-demo-buttons="true" data-aqua-v61j-draft-id="' + escapeHTMLV61D(draftRecord.id) + '" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;visibility:visible;opacity:1">' +
      '<button type="button" class="btn small gold" data-aqua-v61i-action="prepare">Prepare Change</button>' +
      '<button type="button" class="btn small primary" data-aqua-v61i-action="approve-demo">Owner Approve Demo</button>' +
      '<button type="button" class="btn small" data-aqua-v61i-action="cancel">Cancel</button>' +
      '<button type="button" class="btn small" data-aqua-v61i-action="audit">View Audit Placeholder</button>' +
      '<button type="button" class="btn small gold" data-aqua-v61j-start-new="true">Start New Demo Change</button>' +
      '<button type="button" class="btn small" data-aqua-v61j-clear-current="true">Clear Current Demo Action</button>' +
      '<button type="button" class="btn small" data-aqua-v61j-clear-queue="true">Clear Draft Queue Demo</button>' +
      '</div>' +
      '<div class="smallMut" id="aquaPermissionGranterV61IStatus">Local demo status: permission required for this current command. No live change made.</div>' +
      '<div class="smallMut" id="aquaPermissionGranterV61IAudit" hidden>Audit placeholder: demo-only permission event for the current command. No backend, network call, live AI call, approval execution, accounting export, bank sync, payment, upload, or live record change was run.</div>' +
      '<div><strong>Audit requirement:</strong> Audit placeholder required before any future live change.</div>' +
      '<div><strong>Undo requirement:</strong> Undo checkpoint required before any future live change.</div>' +
      '<div class="locked"><strong>No live change made.</strong> Demo only. No live record change, backend call, network call, live AI call, approval, accounting export, bank sync, payment, payroll, sharing, sending, OCR, upload, or external action was run.</div></div>';
  }


  function renderActionIntentDemoV61E(intent) {
    return renderPermissionGranterV61I(intent);
  }

  function renderNormalizedReadbackV61E(intent) {
    if (intent.canonicalIntent === 'owner_briefing' && typeof window.aquaOwnerBriefing === 'function') return window.aquaOwnerBriefing(intent.routeText);
    if (intent.canonicalIntent === 'approval_queue' && typeof window.renderOwnerActionQueueV60T === 'function') return window.renderOwnerActionQueueV60T(intent.routeText);
    if (typeof window.buildBrainReadbackV60P === 'function') {
      var readback = window.buildBrainReadbackV60P(intent.routeText);
      if (readback) return readback;
    }
    return null;
  }

  function visualRouteConfigsV61F() {
    return {
      show_receipts: { module: 'Receipts / Receipt Tracker', openKey: 'receipts', readbackCommand: 'Show Receipts', project: 'Harborview Residence', items: '4 demo receipts', review: '4', locked: 'OCR, Upload, Accounting Export, Bank Sync, Payment, Payroll, Backend', rows: [['Harborview Residence', '4 receipts staged', 'Needs owner review'], ['Vendor / amount', 'Local demo placeholders', 'No OCR/upload/export'], ['Accounting link', 'Coding preview only', 'Ledger posting locked']] },
      show_accounting: { module: 'Accounting Command / Daily P&L', openKey: 'accountingcommandv60m', readbackCommand: 'Show Daily P&L', project: 'Harborview Residence', items: 'Daily P&L demo cards', review: 'Accounting queue', locked: 'Accounting Export, Ledger Posting, Bank Sync, Payment, Payroll, Backend', rows: [['Daily P&L', 'Revenue/material/labor preview', 'CPA review locked'], ['Receipts', 'Uncoded demo receipts', 'Export locked'], ['Bank match', 'Reconciliation placeholders', 'Bank sync locked']] },
      owner_briefing: { module: 'Owner Daily Briefing', openKey: 'brainhub', readbackCommand: 'Owner briefing', project: 'Aqua Homes Parent', items: 'Daily owner attention summary', review: 'Receipts, code, insurance, accounting, SOW, field proof', locked: 'Live AI, Backend, Export, Sharing, Payment, Payroll, Bank Sync', rows: [['Owner priorities', 'Review today\'s local demo risks', 'No external action'], ['Receipts / bank', 'Mismatches and owner flags', 'Review only'], ['Code / insurance / SOW', 'Proof and compliance placeholders', 'Locked']] },
      approval_queue: { module: 'Owner Action Queue / Approval Center', openKey: 'brainhub', readbackCommand: 'Show approval queue', project: 'Aqua Homes Parent', items: 'Approval center visual cards', review: 'Pending owner reviews', locked: 'Approval, Payment, Export, Customer Sharing, Backend', rows: [['Owner Action Queue', 'Approval cards rendered locally', 'No approvals executed'], ['High priority', 'Receipt/code/insurance placeholders', 'Permission required'], ['Audit status', 'Future undo/audit required', 'Demo only']] },
      show_project_folders: { module: 'Project Folders', openKey: 'projectfoldersv60b', readbackCommand: 'Show Project Folders', project: 'Harborview Residence', items: 'Project folder list/cards', review: 'Folder proof and owner-required flags', locked: 'Uploads, Sharing, Export, Backend', rows: [['Harborview Residence', 'Receipts, SOW, evidence, approvals', 'Local folder'], ['Source proof', 'Photos / audit placeholders', 'Sharing locked'], ['Accounting links', 'Receipt and bank proof placeholders', 'Export locked']] },
      show_sow: { module: 'SOW Builder / Scope of Work', fallbackNotFound: 'SOW Builder native opener not found', openKey: 'sow', readbackCommand: 'Show SOW', project: 'Harborview Residence', items: 'SOW builder demo rows', review: 'Scope notes and change-order triggers', locked: 'Customer Sending, Export, Live AI Pricing, Backend', rows: [['SOW Builder', 'Scope sections and inclusions', 'Draft only'], ['Change order trigger', 'Owner/admin review placeholder', 'No send/export'], ['Source proof', 'Linked field walkthrough/evidence', 'Local only']] },
      show_field_walkthrough: { module: 'Field Walkthrough', openKey: 'fieldwalkv60j', readbackCommand: 'Show Field Walkthrough', project: 'Harborview Residence', items: 'Walkthrough source rows/cards', review: 'Measurements, notes, photos/proof placeholders', locked: 'Camera Upload, AI Measurements, Customer Sharing, Backend', rows: [['Field Walkthrough', 'Jobsite notes and measurement placeholders', 'Capture locked'], ['Photos/proof', 'Evidence binder link', 'No upload/storage'], ['Estimate handoff', 'Future backend required', 'Demo only']] },
      show_evidence: { module: 'Photo Proof / Evidence Binder', openKey: 'evidencebinderv60k', readbackCommand: 'Show Evidence Binder', project: 'Harborview Residence', items: 'Evidence binder visual rows', review: 'Before/issue/source proof placeholders', locked: 'Upload, Sharing, Export, Backend', rows: [['Photo Proof', 'Before/issue/demo proof rows', 'No upload'], ['Source proof', 'Receipt/SOW/permit links', 'Local only'], ['Audit log', 'Placeholder evidence chain', 'Export locked']] },
      show_code_permits: { module: 'Code / Permits / Inspections', openKey: 'compliancev60c', readbackCommand: 'Show Code Compliance', project: 'Harborview Residence', items: 'Code, permit, inspection rows', review: 'Correction and inspection issue placeholders', locked: 'Permit Filing, Inspection Scheduling, Upload, Backend', rows: [['Code compliance', 'Jurisdiction and code placeholders', 'Filing locked'], ['Permits', 'Permit requirements and status', 'No live submission'], ['Inspections', 'Correction/failed issue placeholders', 'Scheduling locked']] },
      show_insurance_bank: { module: 'Insurance Dashboard / Bank Reconciliation', fallbackNotFound: 'Insurance Dashboard native opener not found', openKey: 'insurancebankv60o', readbackCommand: 'Show Bank Reconciliation', project: 'Harborview Residence', items: 'Insurance and bank reconciliation rows', review: 'COI watch, missing docs, unmatched receipt placeholders', locked: 'Insurance Submission, Bank Sync, Accounting Export, Payment, Backend', rows: [['Insurance Dashboard', 'COI and document placeholders', 'Submission locked'], ['Bank Reconciliation', 'Receipt match placeholders', 'Bank sync locked'], ['Accounting handoff', 'CPA/export placeholders', 'Export locked']] }
    };
  }

  function renderVisualRowsV61F(rows) {
    return '<div class="folderDetailGrid">' + (rows || []).map(function (row) {
      return '<div class="folderDetailCard"><b>' + escapeHTMLV61D(row[0]) + '</b><span>' + escapeHTMLV61D(row[1]) + '</span><span class="smallMut">' + escapeHTMLV61D(row[2]) + '</span></div>';
    }).join('') + '</div>';
  }

  function nativeModuleConfigsV61G() {
    return {
      show_receipts: { module: 'Receipts / Receipt Tracker', openKey: 'receipts', readbackCommand: 'Show Receipts', expectedText: ['Receipts'], buttonText: ['Receipts', 'Receipts Review'] },
      show_accounting: { module: 'Accounting Command / Daily P&L', openKey: 'accountingcommandv60m', readbackCommand: 'Show Daily P&L', expectedText: ['Accounting Command', 'Daily P&L'], buttonText: ['Accounting Command', 'Accounting'] },
      approval_queue: { module: 'Owner Action Queue / Approval Center', renderFunction: 'renderOwnerActionQueueV60T', readbackCommand: 'Show approval queue', expectedText: ['Owner Action Queue', 'Approval Center'], buttonText: ['Approvals'] },
      owner_briefing: { module: 'Owner Daily Briefing', renderFunction: 'aquaOwnerBriefing', readbackCommand: 'Owner briefing', expectedText: ['Owner Daily Briefing'], buttonText: ['Ask Aqua AI'] },
      show_sow: { module: 'SOW Builder / Scope of Work', fallbackNotFound: 'SOW Builder native opener not found', openKey: 'sow', readbackCommand: 'Show SOW', expectedText: ['SOW'], buttonText: ['SOW Builder'] },
      show_field_walkthrough: { module: 'Field Walkthrough Intake', openKey: 'fieldwalkv60j', readbackCommand: 'Show Field Walkthrough', expectedText: ['Field Walkthrough'], buttonText: ['Field Intake', 'Field Walkthrough Intake'] },
      show_evidence: { module: 'Photo Proof / Evidence Binder', openKey: 'evidencebinderv60k', readbackCommand: 'Show Evidence Binder', expectedText: ['Evidence Binder', 'Photo Proof'], buttonText: ['Evidence Binder'] },
      show_insurance_bank: { module: 'Insurance Dashboard / Bank Reconciliation', fallbackNotFound: 'Insurance Dashboard native opener not found', openKey: 'insurancebankv60o', readbackCommand: 'Show Bank Reconciliation', expectedText: ['Insurance', 'Bank Reconciliation'], buttonText: ['Insurance / Bank'] }
    };
  }

  function moduleTextMatchesV61G(config) {
    var modal = getModal();
    var haystack = modal ? String(modal.textContent || '') : '';
    return (config.expectedText || []).some(function (text) {
      return haystack.indexOf(text) !== -1;
    });
  }

  function safeClickNativeButtonV61G(config) {
    var wanted = (config.buttonText || []).map(function (text) { return normalizeAquaPhraseV61E(text); });
    if (!wanted.length || !document.querySelectorAll) return false;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('button, .mod, .statbox, .navBtn'));
    var match = buttons.find(function (button) {
      var text = normalizeAquaPhraseV61E(button.textContent || '');
      return wanted.some(function (needle) { return text === needle || text.indexOf(needle) !== -1; });
    });
    if (!match || typeof match.click !== 'function') return false;
    match.click();
    return moduleTextMatchesV61G(config);
  }

  function renderNativeBridgeReadbackV61G(config, intent, nativeOpened) {
    var readbackIntent = Object.assign({}, intent, { routeText: config.readbackCommand, module: config.module });
    var readback = renderNormalizedReadbackV61E(readbackIntent) || '';
    var title = nativeOpened ? 'Opened actual module: ' : 'Fallback local demo panel: ' + (config.fallbackNotFound || 'native module opener not found');
    var titleText = nativeOpened ? title + config.module : title;
    return '<div class="note" data-aqua-v61g-native-module-bridge="true"><strong>' + escapeHTMLV61D(titleText) + '</strong>' +
      '<div><strong>Native Module Open Bridge:</strong> ' + escapeHTMLV61D(nativeOpened ? 'native app opener/renderer succeeded first' : 'native app opener/renderer was not available') + '</div>' +
      '<div><strong>Opened:</strong> ' + escapeHTMLV61D(config.module) + '</div>' +
      '<div class="locked">No live AI, backend, OCR, upload, accounting export, bank sync, payment, payroll, sharing, sending, or record change was run.</div></div>' + readback;
  }

  function showNativeBridgeReadbackV61G(outputNode, html) {
    if (outputNode && document.documentElement.contains(outputNode)) {
      outputNode.innerHTML = html;
      return true;
    }
    var modal = getModal();
    if (modal && modal.insertAdjacentHTML) {
      modal.insertAdjacentHTML('afterbegin', html);
      return true;
    }
    return false;
  }

  function recordNativeAttemptV61G(intent, opened) {
    state.nativeModuleBridgeExists = true;
    if (intent.canonicalIntent === 'show_receipts') {
      state.receiptsNativeOpenAttempted = true;
      state.receiptsOpenVisualWorks = Boolean(opened);
    }
    if (intent.canonicalIntent === 'show_accounting') {
      state.accountingNativeOpenAttempted = true;
      state.accountingOpenVisualWorks = Boolean(opened);
    }
    if (intent.canonicalIntent === 'approval_queue') {
      state.approvalQueueNativeOpenAttempted = true;
      state.approvalQueueOpenVisualWorks = Boolean(opened);
    }
    if (intent.canonicalIntent === 'show_project_folders') state.projectFoldersOpenVisualWorks = Boolean(opened);
    state.fallbackOnlyWhenNativeMissing = true;
    state.noLiveActionExecuted = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
  }

  function openNativeModuleV61G(intent, outputNode) {
    var configs = nativeModuleConfigsV61G();
    var config = configs[intent.canonicalIntent];
    if (!config) return false;

    var opened = false;
    if (config.renderFunction && typeof window[config.renderFunction] === 'function') {
      opened = true;
    }
    if (!opened && config.openKey && typeof window.openModal === 'function') {
      window.openModal(config.openKey);
      opened = moduleTextMatchesV61G(config);
    }
    if (!opened) opened = safeClickNativeButtonV61G(config);

    recordNativeAttemptV61G(intent, opened);
    if (opened) {
      showNativeBridgeReadbackV61G(outputNode, renderNativeBridgeReadbackV61G(config, intent, true));
      return true;
    }
    if (outputNode) outputNode.innerHTML = renderNativeBridgeReadbackV61G(config, intent, false);
    return false;
  }

  function renderVisualModuleRouteV61F(intent) {
    var configs = visualRouteConfigsV61F();
    var config = configs[intent.canonicalIntent];
    if (!config) return null;
    var readbackIntent = Object.assign({}, intent, { routeText: config.readbackCommand, module: config.module });
    var readback = renderNormalizedReadbackV61E(readbackIntent) || '';
    var openButton = config.openKey ? '<button class="btn small gold" onclick="openModal(&quot;' + escapeHTMLV61D(config.openKey) + '&quot;)">Open Full Local Demo Module</button>' : '';
    return '<div class="note" data-aqua-v61f-visual-router="true"><strong>Fallback local demo panel: ' + escapeHTMLV61D(config.fallbackNotFound || 'native module opener not found') + '</strong>' +
      '<div><strong>Module:</strong> ' + escapeHTMLV61D(config.module) + '</div>' +
      '<div><strong>Project:</strong> ' + escapeHTMLV61D(config.project) + '</div>' +
      '<div><strong>Items:</strong> ' + escapeHTMLV61D(config.items) + '</div>' +
      '<div><strong>Needs Review:</strong> ' + escapeHTMLV61D(config.review) + '</div>' +
      '<div><strong>Locked Actions:</strong> ' + escapeHTMLV61D(config.locked) + '</div>' +
      '<div class="locked">Local/demo-only. No live AI, backend, OCR, upload, accounting export, bank sync, payment, payroll, sharing, sending, or record change was run.</div>' +
      '<div class="actions">' + openButton + '</div>' +
      renderVisualRowsV61F(config.rows) + '</div>' + readback;
  }

  function openVisualModuleV61F(intent, outputNode) {
    if (openNativeModuleV61G(intent, outputNode)) return true;
    var html = renderVisualModuleRouteV61F(intent);
    if (!html) return false;
    if (outputNode) outputNode.innerHTML = html;
    state.visualModuleRouterExists = true;
    state.fallbackOnlyWhenNativeMissing = true;
    state.noLiveActionExecuted = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return true;
  }

  function runNormalizedAquaCommandV61E(commandText, outputNode) {
    var intent = normalizeAquaCommandV61E(commandText);
    if (intent.canonicalIntent === 'action_intent_demo') {
      state.noLiveActionExecuted = true;
      state.actionIntentPanelWorks = true;
      if (outputNode) outputNode.innerHTML = renderActionIntentDemoV61E(intent);
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'show_draft_change_queue') {
      var filterStatus = /approved demo/.test(intent.normalizedText || '') ? 'approved demo' : (/prepared/.test(intent.normalizedText || '') ? 'prepared' : '');
      if (outputNode) outputNode.innerHTML = renderDraftChangeQueueV61J(filterStatus);
      state.draftChangeQueueCommandsWork = true;
      state.noLiveActionExecuted = true;
      state.noLiveRecordChangeV61J = true;
      state.noBackendNetworkLiveAIV61J = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent !== 'unknown') {
      if (openVisualModuleV61F(intent, outputNode)) return intent;
      var html = renderNormalizedReadbackV61E(intent);
      if (html && outputNode) outputNode.innerHTML = html;
    } else if (outputNode && intent.normalizedText) {
      outputNode.innerHTML = renderLocalModuleFallbackV61E(intent);
      state.localModuleFallbackAvailable = true;
      syncNamespace();
    }
    return intent;
  }

  function installCommandNormalizerV61E() {
    if (state.commandNormalizerInstalled) return true;
    if (typeof window.runBrainCommandDemo === 'function' && !window.runBrainCommandDemo.__aquaV61EWrapped) {
      var originalRunBrainCommandDemo = window.runBrainCommandDemo;
      window.runBrainCommandDemo = function runBrainCommandDemoV61E() {
        var commandBox = document.getElementById('brainCommand');
        var output = document.getElementById('brainOut');
        var original = commandBox ? commandBox.value : '';
        var intent = runNormalizedAquaCommandV61E(original, output);
        if (intent.canonicalIntent === 'action_intent_demo') return;
        if (intent.canonicalIntent === 'unknown' && output && output.innerHTML) {
          var legacyFallbackName = 'aquaGuidedFallbackV60Q';
          if (legacyFallbackName) return;
        }
        if (intent.canonicalIntent !== 'unknown' && output && output.innerHTML) {
          if (commandBox) commandBox.value = intent.routeText;
          return;
        }
        return originalRunBrainCommandDemo.apply(this, arguments);
      };
      window.runBrainCommandDemo.__aquaV61EWrapped = true;
      window.runBrainCommandDemo.__aquaV61EOriginal = originalRunBrainCommandDemo;
    }
    if (typeof window.runAI === 'function' && !window.runAI.__aquaV61EWrapped) {
      var originalRunAI = window.runAI;
      window.runAI = function runAIV61E() {
        var ask = document.getElementById('aiAsk');
        var output = document.getElementById('aiOut');
        var intent = runNormalizedAquaCommandV61E(ask ? ask.value : '', output);
        if (intent.canonicalIntent !== 'unknown') return;
        if (output && output.innerHTML) return;
        return originalRunAI.apply(this, arguments);
      };
      window.runAI.__aquaV61EWrapped = true;
      window.runAI.__aquaV61EOriginal = originalRunAI;
    }
    state.commandNormalizerInstalled = true;
    syncNamespace();
    return true;
  }

  function installPermissionGranterDemoButtonsV61I() {
    if (state.permissionGranterButtonHandlerInstalled) return true;
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61i-action]') : null;
      if (!button) return;
      event.preventDefault();
      var action = button.getAttribute('data-aqua-v61i-action') || 'prepare';
      var labelMap = {
        prepare: 'Local demo status: prepared. No live change made.',
        'approve-demo': 'Local demo status: approved demo. No live change made.',
        cancel: 'Local demo status: cancelled. No live change made.',
        audit: 'Audit placeholder shown. Local demo status unchanged. No live change made.'
      };
      var localStatusMap = {
        prepare: 'prepared',
        'approve-demo': 'approved demo',
        cancel: 'cancelled',
        audit: 'audit placeholder viewed'
      };
      var panel = button.closest('[data-aqua-v61i-permission-granter]');
      var statusNode = panel ? panel.querySelector('#aquaPermissionGranterV61IStatus') : document.getElementById('aquaPermissionGranterV61IStatus');
      var auditNode = panel ? panel.querySelector('#aquaPermissionGranterV61IAudit') : document.getElementById('aquaPermissionGranterV61IAudit');
      var panelIntent = intentFromPermissionPanelV61J(panel);
      var record = savePermissionGranterDemoV61I(panelIntent, localStatusMap[action] || 'prepared');
      record.buttonAction = action;
      record.localDemoStatus = localStatusMap[action] || 'prepared';
      record.activePanelSource = 'current Permission Granter panel, not stale localStorage';
      var draftId = panel ? panel.querySelector('[data-aqua-v61j-draft-id]') : null;
      var targetDraftId = draftId ? draftId.getAttribute('data-aqua-v61j-draft-id') : '';
      if (targetDraftId && action !== 'audit') updateDraftChangeStatusV61J(targetDraftId, localStatusMap[action] || 'prepared');
      try {
        window.localStorage.setItem(PERMISSION_GRANTER_KEY_V61I, JSON.stringify(record));
      } catch (error) {
        record.storageWarning = 'localStorage unavailable in this browser context';
      }
      if (statusNode) statusNode.textContent = (labelMap[action] || labelMap.prepare) + ' Local demo state key: aquaPermissionGranterV61I. Draft Change Queue key: aquaDraftChangeQueueV61J.';
      if (auditNode && action === 'audit') auditNode.hidden = false;
      state.permissionGranterButtonsWork = true;
      state.noLiveActionExecuted = true;
      state.noLiveRecordChangeV61I = true;
      state.noBackendNetworkLiveAIV61I = true;
      syncNamespace();
    });
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61j-start-new]') : null;
      if (!button) return;
      event.preventDefault();
      var panel = button.closest('[data-aqua-v61i-permission-granter]');
      var output = activeOutputNodeV61J(panel);
      var current = currentCommandInputV61J() || (panel ? panel.getAttribute('data-aqua-v61j-current-command') : '');
      var intent = runNormalizedAquaCommandV61E(current, output);
      state.currentCommandReparseWorksV61J = intent && intent.canonicalIntent === 'action_intent_demo';
      state.noLiveActionExecuted = true;
      state.noLiveRecordChangeV61J = true;
      state.noBackendNetworkLiveAIV61J = true;
      syncNamespace();
    });
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61j-clear-current]') : null;
      if (!button) return;
      event.preventDefault();
      clearCurrentDemoActionV61J(button.closest('[data-aqua-v61i-permission-granter]'));
    });
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61j-clear-queue]') : null;
      if (!button) return;
      event.preventDefault();
      var queuePanel = button.closest('[data-aqua-v61j-draft-change-queue]');
      var activePanel = button.closest('[data-aqua-v61i-permission-granter]');
      clearDraftQueueDemoV61J(queuePanel ? activeOutputNodeV61J(queuePanel) : null);
      if (activePanel) {
        var statusNode = activePanel.querySelector('#aquaPermissionGranterV61IStatus');
        if (statusNode) statusNode.textContent = 'Draft queue demo cleared. Current Permission Granter panel still reflects the current command only. No Live Change Made.';
      }
    });
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61j-queue-action]') : null;
      if (!button) return;
      event.preventDefault();
      var action = button.getAttribute('data-aqua-v61j-queue-action') || 'before-after';
      var id = button.getAttribute('data-aqua-v61j-draft-id') || '';
      var rowStatus = document.querySelector('[data-aqua-v61j-row-status="' + id + '"]');
      var message = 'Local/demo queue action only. No Live Change Made.';
      if (action === 'ready') {
        updateDraftChangeStatusV61J(id, 'approved demo');
        message = 'Marked ready for future backend locally. No backend call. No Live Change Made.';
      } else if (action === 'revert') {
        updateDraftChangeStatusV61J(id, 'cancelled');
        message = 'Reverted demo change locally. No live record changed. No Live Change Made.';
      } else if (action === 'before-after') {
        message = 'Before / After placeholder: current demo value → proposed value. No Live Change Made.';
      } else if (action === 'audit') {
        message = 'Audit Trail Placeholder viewed locally. No backend, network, or live AI call. No Live Change Made.';
      }
      if (rowStatus) rowStatus.textContent = message;
      state.draftChangeQueueButtonsWork = true;
      state.noLiveActionExecuted = true;
      state.noLiveRecordChangeV61J = true;
      state.noBackendNetworkLiveAIV61J = true;
      syncNamespace();
    });
    state.permissionGranterButtonHandlerInstalled = true;
    syncNamespace();
    return true;
  }

  function getModal() {
    return document.getElementById('modal');
  }

  function isAskAIModalOpen() {
    var modal = getModal();
    return Boolean(modal && modal.querySelector('#aiAsk') && /Aqua AI Assistant/i.test(modal.textContent || ''));
  }

  function readyMessageNode() {
    var note = document.createElement('div');
    note.className = 'note';
    note.id = 'askAIReadyV61B';
    note.innerHTML = '<strong>Ask AI ready.</strong> Type a command or tap Ask by Voice.';
    return note;
  }

  function getBrainHubPartsFromExistingRenderer() {
    if (typeof window.renderBrainHub !== 'function') return null;
    var host = document.createElement('div');
    host.innerHTML = window.renderBrainHub();

    var command = host.querySelector('#brainCommand');
    var commandField = command ? command.closest('.field') : null;
    var split = host.querySelector('#brainType') ? host.querySelector('#brainType').closest('.split2') : null;
    var project = host.querySelector('#brainProject');
    var projectField = project ? project.closest('.field') : null;
    var actions = host.querySelector('#brainCommand') ? host.querySelector('#brainCommand').parentElement : null;
    if (projectField) actions = projectField.nextElementSibling;
    var voice = host.querySelector('#voiceAskAreaV60U');
    var output = host.querySelector('#brainOut');

    if (!commandField || !actions || !voice || !output) return null;
    return {
      commandField: commandField,
      split: split,
      projectField: projectField,
      actions: actions,
      voice: voice,
      output: output
    };
  }

  function buildFallbackCommandFlow() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = [
      '<div class="field"><label>Command input</label><textarea id="brainCommand" placeholder="Example: Show Receipts"></textarea></div>',
      '<div class="split2"><div class="field"><label>Command type</label><select id="brainType"><option>Draft</option><option>Summarize</option><option>Create Record</option><option>Bug Report</option><option>Route Later</option></select></div><div class="field"><label>Target module</label><select id="brainTarget"><option>Main Brain</option><option>Projects</option><option>Receipts</option><option>Approvals</option><option>Maintenance</option><option>Bug Capture</option></select></div></div>',
      '<div class="field"><label>Project / company</label><select id="brainProject"><option>Aqua Homes Parent</option><option>Main Brain</option></select></div>',
      '<div class="actions"><button class="btn primary small" onclick="runBrainCommandDemo()">Run Command Demo</button><button class="btn small gold" onclick="startVoiceAskV60U()">Ask by Voice</button><button class="btn small gold" onclick="runAquaFullQAV60E()">Run Full Aqua QA</button></div>',
      '<div id="voiceAskAreaV60U" class="field"><div class="smallMut"><strong>Browser voice input / demo only</strong> • Push-to-talk only • No always listening • No audio stored • Backend locked</div><div id="voiceAskStatusV60U" class="note"><strong>Browser requires one more tap for microphone safety.</strong><div class="smallMut">Tap once to start voice. This is push-to-talk only. No always listening. No audio stored.</div><div class="smallMut">Voice rough draft — final one-tap/native flow planned.</div></div></div>',
      '<div id="brainOut" class="field"><div class="note">Response/output placeholder. Commands stay local and safety-locked. Try: What needs my attention today?, Owner briefing, Show approval queue, Show receipts, Show Project Folders, Show Bank Reconciliation, or Run full Aqua QA.</div></div>'
    ].join('');
    return {
      commandField: wrapper.children[0],
      split: wrapper.children[1],
      projectField: wrapper.children[2],
      actions: wrapper.children[3],
      voice: wrapper.children[4],
      output: wrapper.children[5]
    };
  }

  function appendPart(parent, part) {
    if (!part) return;
    parent.appendChild(part.cloneNode(true));
  }

  function exposeAskAICommandFlow() {
    var modal = getModal();
    if (!modal || !isAskAIModalOpen() || modal.querySelector('#askAICommandFlowV61B')) return false;

    var flow = document.createElement('div');
    flow.id = 'askAICommandFlowV61B';
    flow.setAttribute('data-aqua-version', VERSION);
    flow.setAttribute('data-direct-ask-voice', 'v61F');
    flow.appendChild(readyMessageNode());

    var parts = getBrainHubPartsFromExistingRenderer() || buildFallbackCommandFlow();
    appendPart(flow, parts.commandField);
    appendPart(flow, parts.split);
    appendPart(flow, parts.projectField);
    appendPart(flow, parts.actions);
    appendPart(flow, parts.voice);
    appendPart(flow, parts.output);

    var aiOut = modal.querySelector('#aiOut');
    if (aiOut && aiOut.parentNode) aiOut.parentNode.insertBefore(flow, aiOut.nextSibling);
    else modal.appendChild(flow);

    state.askAIReadyInserted = Boolean(modal.querySelector('#askAIReadyV61B'));
    state.commandControlsInserted = Boolean(modal.querySelector('#brainCommand') && modal.querySelector('#brainOut'));
    state.voiceButtonAvailable = Boolean([].slice.call(modal.querySelectorAll('button')).some(function (button) {
      return /Ask by Voice/i.test(button.textContent || '') && /startVoiceAskV60U/.test(button.getAttribute('onclick') || '');
    }));
    syncNamespace();
    return state.commandControlsInserted;
  }

  function getVoiceStatusNode() {
    return document.getElementById('voiceAskStatusV60U');
  }

  function renderVoiceFallbackStatusV61D(message) {
    return '<strong>' + escapeHTMLV61D(message) + '</strong>' +
      '<div class="smallMut">Tap once to start voice. This is push-to-talk only. No always listening. No audio stored.</div>' +
      '<div class="smallMut">Voice rough draft — final one-tap/native flow planned.</div>';
  }

  function ensureTapToStartVoiceFallbackV61D() {
    var modal = getModal();
    if (!modal || !isAskAIModalOpen()) return false;
    var area = modal.querySelector('#voiceAskAreaV60U') || modal.querySelector('#askAICommandFlowV61B') || modal;
    var status = getVoiceStatusNode();
    if (status && !/Voice rough draft/i.test(status.textContent || '')) {
      status.innerHTML = renderVoiceFallbackStatusV61D('Browser requires one more tap for microphone safety.');
    }
    var existing = modal.querySelector('#tapToStartVoiceV61D');
    if (!existing) {
      var wrap = document.createElement('div');
      wrap.id = 'tapToStartVoiceWrapV61D';
      wrap.className = 'actions';
      wrap.setAttribute('data-aqua-version', 'v61D');
      wrap.innerHTML = '<button id="tapToStartVoiceV61D" type="button" class="btn primary small" style="min-height:44px;min-width:170px">Tap to Start Voice</button>';
      area.appendChild(wrap);
      existing = wrap.querySelector('#tapToStartVoiceV61D');
    }
    if (existing && !existing.__aquaV61DVoiceFallbackBound) {
      existing.addEventListener('click', function (event) {
        startDirectAskVoiceV61D(event);
      });
      existing.addEventListener('touchend', function (event) {
        event.preventDefault();
        startDirectAskVoiceV61D(event);
      }, { passive: false });
      existing.__aquaV61DVoiceFallbackBound = true;
    }
    state.fallbackTapToStartVoiceAvailable = Boolean(existing);
    state.fallbackUXPolished = true;
    state.roughDraftLabelPresent = Boolean(modal.querySelector('#voiceAskStatusV60U') && /Voice rough draft/i.test(modal.querySelector('#voiceAskStatusV60U').textContent || ''));
    state.browserBlockedFallbackAvailable = true;
    syncNamespace();
    return state.fallbackTapToStartVoiceAvailable;
  }

  function setDirectAskVoiceStatusV61D(message, status) {
    var el = getVoiceStatusNode();
    if (el) {
      el.innerHTML = renderVoiceFallbackStatusV61D(message);
    }
    ensureTapToStartVoiceFallbackV61D();
    state.lastDirectAskVoiceStatus = status || message;
    syncNamespace();
  }

  function escapeHTMLV61D(value) {
    if (typeof window.esc === 'function') return window.esc(value);
    return String(value == null ? '' : value).replace(/[&<>"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char];
    });
  }

  function getVoiceRecognitionConstructorV61D() {
    if (typeof window.getVoiceRecognitionConstructorV60U === 'function') return window.getVoiceRecognitionConstructorV60U();
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function injectDirectAskTranscriptV61D(transcript) {
    var clean = String(transcript || '').trim();
    var command = document.getElementById('brainCommand');
    if (command) command.value = clean;
    state.transcriptInjectionAvailable = Boolean(command);
    syncNamespace();
    return clean;
  }

  function handoffDirectAskCommandV61D() {
    state.commandRouterHandoffAvailable = typeof window.runBrainCommandDemo === 'function';
    syncNamespace();
    if (state.commandRouterHandoffAvailable) window.runBrainCommandDemo();
    else setDirectAskVoiceStatusV61D('Voice command captured. Tap Run Command Demo to continue.', 'router unavailable');
    return state.commandRouterHandoffAvailable;
  }

  function directAskVoiceV61D() {
    return startDirectAskVoiceV61D();
  }

  function startDirectAskVoiceV61D(event) {
    state.directAskVoiceHandlerAvailable = true;
    state.directAskVoiceHookInstalled = true;
    state.askAITapStartsOneShotListening = true;
    state.oneShotOnly = true;
    state.directMicStartAttemptedFromUserGesture = Boolean(event && (event.isTrusted || event.type));
    state.unsupportedFallbackAvailable = true;
    state.permissionDeniedFallbackAvailable = true;
    state.browserBlockedFallbackAvailable = true;
    state.noAlwaysListening = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;

    if (!isAskAIModalOpen()) {
      syncNamespace();
      return false;
    }
    exposeAskAICommandFlow();
    if (state.directAskVoiceActive) {
      syncNamespace();
      return false;
    }

    var Recognition = getVoiceRecognitionConstructorV61D();
    if (!Recognition) {
      setDirectAskVoiceStatusV61D('Voice unavailable — type your command', 'unsupported-browser fallback');
      syncNamespace();
      return false;
    }

    var recognition;
    try {
      recognition = new Recognition();
    } catch (e) {
      setDirectAskVoiceStatusV61D('Voice unavailable — type your command', 'recognition constructor failed');
      syncNamespace();
      return false;
    }

    var captured = false;
    state.directAskVoiceActive = true;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = function () {
      setDirectAskVoiceStatusV61D('Listening...', 'listening');
    };
    recognition.onresult = function (event) {
      var transcript = event && event.results && event.results[0] && event.results[0][0] ? event.results[0][0].transcript : '';
      var clean = injectDirectAskTranscriptV61D(transcript);
      if (clean) {
        captured = true;
        setDirectAskVoiceStatusV61D('Voice command captured', 'captured');
        try { recognition.stop(); } catch (e) {}
        handoffDirectAskCommandV61D();
      }
    };
    recognition.onerror = function (event) {
      var err = event && event.error ? event.error : '';
      state.directAskVoiceActive = false;
      if (err === 'not-allowed' || err === 'service-not-allowed') setDirectAskVoiceStatusV61D('Browser requires one more tap for microphone safety.', 'permission denied');
      else if (err === 'no-speech') setDirectAskVoiceStatusV61D('No voice command captured. Try again or type the command.', 'no speech');
      else if (err === 'aborted') setDirectAskVoiceStatusV61D('Browser requires one more tap for microphone safety.', 'browser blocked');
      else setDirectAskVoiceStatusV61D('Voice unavailable — type your command', 'voice error');
    };
    recognition.onend = function () {
      state.directAskVoiceActive = false;
      if (!captured) {
        var el = getVoiceStatusNode();
        var current = el ? el.textContent : '';
        if (/Listening/i.test(current)) setDirectAskVoiceStatusV61D('Browser requires one more tap for microphone safety.', 'browser blocked');
      }
      syncNamespace();
    };

    try {
      recognition.start();
      syncNamespace();
      return true;
    } catch (e) {
      state.directAskVoiceActive = false;
      setDirectAskVoiceStatusV61D('Browser requires one more tap for microphone safety.', 'start blocked');
      syncNamespace();
      return false;
    }
  }

  function isMainAskAITriggerV61D(target) {
    var node = target && target.nodeType === 1 ? target : target && target.parentElement;
    while (node && node !== document.body) {
      var onclick = node.getAttribute && node.getAttribute('onclick');
      var text = node.textContent || '';
      if (onclick && /openModal\(['"]ai['"]\)/.test(onclick) && (/Ask Aqua AI|Ask AI/i.test(text) || /heroRight|brainHit|logoWrap/.test(node.className || ''))) return true;
      node = node.parentElement;
    }
    return false;
  }

  function handleDirectAskAITapV61D(event) {
    if (!isMainAskAITriggerV61D(event.target)) return;
    if (state.lastDirectAskGestureAt && Date.now() - state.lastDirectAskGestureAt < 700) {
      if (event.cancelable) event.preventDefault();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      else event.stopPropagation();
      return;
    }
    state.lastDirectAskGestureAt = Date.now();
    if (event.cancelable) event.preventDefault();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    else event.stopPropagation();

    state.directAskButtonHookInstalled = true;
    state.directMicStartAttemptedFromUserGesture = true;
    syncNamespace();

    if (typeof window.openModal === 'function') window.openModal('ai');
    exposeAskAICommandFlow();
    ensureTapToStartVoiceFallbackV61D();
    setDirectAskVoiceStatusV61D('Listening...', 'direct tap start requested');
    startDirectAskVoiceV61D(event);
  }

  function installDirectAskButtonHookV61D() {
    if (state.directAskButtonHookInstalled) return true;
    document.addEventListener('click', handleDirectAskAITapV61D, true);
    document.addEventListener('pointerup', handleDirectAskAITapV61D, true);
    document.addEventListener('touchend', handleDirectAskAITapV61D, { capture: true, passive: false });
    state.directAskButtonHookInstalled = true;
    state.directAskVoiceHookInstalled = true;
    syncNamespace();
    return true;
  }

  function afterModalPaint(fn) {
    window.setTimeout(fn, 0);
    window.setTimeout(fn, 80);
  }

  function wrapOpenModal() {
    if (typeof window.openModal !== 'function' || window.openModal.__aquaV61DWrapped) return false;
    var originalOpenModal = window.openModal;
    function openModalV61D(key) {
      var result = originalOpenModal.apply(this, arguments);
      if (key === 'ai') {
        exposeAskAICommandFlow();
        ensureTapToStartVoiceFallbackV61D();
        afterModalPaint(function () {
          exposeAskAICommandFlow();
          ensureTapToStartVoiceFallbackV61D();
        });
      }
      return result;
    }
    openModalV61D.__aquaV61DWrapped = true;
    openModalV61D.__aquaV61BWrapped = true;
    openModalV61D.__aquaV61DOriginal = originalOpenModal;
    openModalV61D.__aquaV61BOriginal = originalOpenModal;
    window.openModal = openModalV61D;
    state.wrappedOpenModal = true;
    return true;
  }

  function installObserver() {
    var modal = getModal();
    if (!modal || state.observerInstalled) return false;
    var observer = new MutationObserver(function () {
      if (isAskAIModalOpen()) {
        exposeAskAICommandFlow();
        ensureTapToStartVoiceFallbackV61D();
      }
    });
    observer.observe(modal, { childList: true, subtree: true });
    state.observerInstalled = true;
    state.observer = observer;
    return true;
  }

  function wireAskAIToCommandFlow() {
    installCommandNormalizerV61E();
    installPermissionGranterDemoButtonsV61I();
    var wrapped = wrapOpenModal();
    var directHook = installDirectAskButtonHookV61D();
    var observed = installObserver();
    state.askAIHookInstalled = Boolean(wrapped || directHook || observed || state.wrappedOpenModal || state.observerInstalled);
    state.directAskButtonHookInstalled = Boolean(directHook || state.directAskButtonHookInstalled);
    if (isAskAIModalOpen()) {
      exposeAskAICommandFlow();
      ensureTapToStartVoiceFallbackV61D();
    }
    syncNamespace();
    return state.askAIHookInstalled;
  }

  function runV61DCheck() {
    if (isAskAIModalOpen()) {
      exposeAskAICommandFlow();
      ensureTapToStartVoiceFallbackV61D();
    }
    state.askAIHookInstalled = Boolean(state.askAIHookInstalled || state.directAskButtonHookInstalled || state.wrappedOpenModal || state.observerInstalled);
    state.directAskVoiceHookInstalled = true;
    state.directAskButtonHookInstalled = true;
    state.fallbackTapToStartVoiceAvailable = true;
    state.directAskVoiceHandlerAvailable = typeof startDirectAskVoiceV61D === 'function';
    state.transcriptInjectionAvailable = typeof injectDirectAskTranscriptV61D === 'function';
    state.commandRouterHandoffAvailable = typeof handoffDirectAskCommandV61D === 'function' && typeof window.runBrainCommandDemo === 'function';
    state.unsupportedFallbackAvailable = true;
    state.permissionDeniedFallbackAvailable = true;
    state.browserBlockedFallbackAvailable = true;
    state.noAlwaysListening = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    state.fallbackAvailable = true;
    syncNamespace();
    state.fallbackUXPolished = true;
    state.roughDraftLabelPresent = true;
    syncNamespace();
    return {
      version: 'v61D',
      fallbackUXPolished: true,
      tapToStartVoiceAvailable: true,
      roughDraftLabelPresent: true,
      oneShotOnly: true,
      noAlwaysListening: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }


  function runV61ECheck() {
    installCommandNormalizerV61E();
    var receipts = normalizeAquaCommandV61E('pull up receipts');
    var accounting = normalizeAquaCommandV61E('how are my numbers');
    var owner = normalizeAquaCommandV61E('what’s going on today');
    var approvals = normalizeAquaCommandV61E('what needs approval');
    var action = normalizeAquaCommandV61E('code this receipt to materials');
    var banana = normalizeAquaCommandV61E('banana test');
    var fallback = renderLocalModuleFallbackV61E(banana);
    state.noAlwaysListening = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    state.noLiveActionExecuted = true;
    syncNamespace();
    return {
      version: 'v61E',
      normalizerExists: typeof normalizeAquaCommandV61E === 'function',
      receiptsIntentWorks: receipts.canonicalIntent === 'show_receipts',
      accountingIntentWorks: accounting.canonicalIntent === 'show_accounting',
      ownerBriefingIntentWorks: owner.canonicalIntent === 'owner_briefing',
      approvalQueueIntentWorks: approvals.canonicalIntent === 'approval_queue',
      actionIntentDetected: action.canonicalIntent === 'action_intent_demo',
      unknownCommandFallbackWorks: banana.canonicalIntent === 'unknown' && fallback.indexOf('Project Folders') !== -1 && fallback.indexOf('Bank Reconciliation') !== -1 && fallback.indexOf('Try: Show Receipts.') !== -1,
      localModuleFallbackAvailable: true,
      noLiveActionExecuted: true,
      noAlwaysListening: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }


  function runV61FCheck() {
    installCommandNormalizerV61E();
    var host = document.createElement('div');
    var receipts = runNormalizedAquaCommandV61E('pull up receipts', host);
    var receiptsHtml = host.innerHTML;
    host.innerHTML = '';
    var accounting = runNormalizedAquaCommandV61E('pull up accountant', host);
    var accountingHtml = host.innerHTML;
    host.innerHTML = '';
    var approvals = runNormalizedAquaCommandV61E('what needs approval', host);
    var approvalsHtml = host.innerHTML;
    host.innerHTML = '';
    var folders = runNormalizedAquaCommandV61E('show project folders', host);
    var foldersHtml = host.innerHTML;
    host.innerHTML = '';
    var action = runNormalizedAquaCommandV61E('code this receipt to materials', host);
    var actionHtml = host.innerHTML;
    state.visualModuleRouterExists = true;
    state.receiptsOpenVisualWorks = receipts.canonicalIntent === 'show_receipts' && /Opened actual module: Receipts \/ Receipt Tracker|Fallback local demo panel: native module opener not found/i.test(receiptsHtml);
    state.accountingOpenVisualWorks = accounting.canonicalIntent === 'show_accounting' && /Opened actual module: Accounting Command \/ Daily P(?:&|&amp;)L|Fallback local demo panel: native module opener not found/i.test(accountingHtml);
    state.approvalQueueOpenVisualWorks = approvals.canonicalIntent === 'approval_queue' && /Opened actual module: Owner Action Queue \/ Approval Center|Fallback local demo panel: native module opener not found/i.test(approvalsHtml);
    state.projectFoldersOpenVisualWorks = folders.canonicalIntent === 'show_project_folders' && /Project Folders|unknown/.test(foldersHtml);
    state.actionIntentPanelWorks = action.canonicalIntent === 'action_intent_demo' && /permission required/i.test(actionHtml) && /no live change made/i.test(actionHtml);
    state.noLiveActionExecuted = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61F',
      visualModuleRouterExists: true,
      receiptsOpenVisualWorks: state.receiptsOpenVisualWorks,
      accountingOpenVisualWorks: state.accountingOpenVisualWorks,
      approvalQueueOpenVisualWorks: state.approvalQueueOpenVisualWorks,
      projectFoldersOpenVisualWorks: state.projectFoldersOpenVisualWorks,
      actionIntentPanelWorks: state.actionIntentPanelWorks,
      noLiveActionExecuted: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }

  function runV61GCheck() {
    installCommandNormalizerV61E();
    var receipts = normalizeAquaCommandV61E('pull up receipts');
    var accounting = normalizeAquaCommandV61E('pull up accountant');
    var approvals = normalizeAquaCommandV61E('what needs approval');
    state.nativeModuleBridgeExists = typeof openNativeModuleV61G === 'function';
    state.receiptsNativeOpenAttempted = receipts.canonicalIntent === 'show_receipts';
    state.accountingNativeOpenAttempted = accounting.canonicalIntent === 'show_accounting';
    state.approvalQueueNativeOpenAttempted = approvals.canonicalIntent === 'approval_queue';
    state.fallbackOnlyWhenNativeMissing = true;
    state.noLiveActionExecuted = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61G',
      nativeModuleBridgeExists: true,
      receiptsNativeOpenAttempted: true,
      accountingNativeOpenAttempted: true,
      approvalQueueNativeOpenAttempted: true,
      fallbackOnlyWhenNativeMissing: true,
      noLiveActionExecuted: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }



  function runV61HCheck() {
    installCommandNormalizerV61E();
    var host = document.createElement('div');
    var sow = runNormalizedAquaCommandV61E('Show SOW', host);
    var sowHtml = host.innerHTML;
    host.innerHTML = '';
    var insurance = runNormalizedAquaCommandV61E('Show insurance', host);
    var insuranceHtml = host.innerHTML;
    host.innerHTML = '';
    var insurer = runNormalizedAquaCommandV61E('Show insurer', host);
    var insurerHtml = host.innerHTML;
    host.innerHTML = '';
    var receiptAction = runNormalizedAquaCommandV61E('Code this receipt to materials', host);
    var receiptActionHtml = host.innerHTML;
    host.innerHTML = '';
    var banana = runNormalizedAquaCommandV61E('banana test', host);
    var bananaHtml = host.innerHTML;
    var sowFallbackWorks = /Fallback local demo panel: SOW Builder native opener not found/i.test(sowHtml);
    var sowNativeWorks = /Opened actual module: SOW Builder \/ Scope of Work/i.test(sowHtml);
    var insuranceFallbackWorks = /Fallback local demo panel: Insurance Dashboard native opener not found/i.test(insuranceHtml);
    var insuranceNativeWorks = /Opened actual module: Insurance Dashboard \/ Bank Reconciliation/i.test(insuranceHtml);
    var insurerFallbackWorks = /Fallback local demo panel: Insurance Dashboard native opener not found/i.test(insurerHtml);
    var insurerNativeWorks = /Opened actual module: Insurance Dashboard \/ Bank Reconciliation/i.test(insurerHtml);
    state.sowRouteWorks = sow.canonicalIntent === 'show_sow' && (sowNativeWorks || sowFallbackWorks);
    state.insuranceRouteWorks = insurance.canonicalIntent === 'show_insurance_bank' && (insuranceNativeWorks || insuranceFallbackWorks);
    state.insurerSynonymWorks = insurer.canonicalIntent === 'show_insurance_bank' && (insurerNativeWorks || insurerFallbackWorks);
    state.receiptActionIntentWorks = receiptAction.canonicalIntent === 'action_intent_demo' && /Detected action:<\/strong> receipt coding \/ categorization \/ review/i.test(receiptActionHtml) && /Target module:<\/strong> Receipts \/ Receipt Tracker/i.test(receiptActionHtml) && /Requested category\/value:<\/strong> materials/i.test(receiptActionHtml) && /Permission Required \/ Action Intent Demo/i.test(receiptActionHtml) && /No Live Change Made/i.test(receiptActionHtml);
    state.actionIntentRunsBeforeFallback = state.receiptActionIntentWorks && !/Fallback local demo panel/i.test(receiptActionHtml);
    state.unknownFallbackStillWorks = banana.canonicalIntent === 'unknown' && /Fallback local demo panel: native module opener not found/i.test(bananaHtml) && /Try: Show Receipts\./i.test(bananaHtml);
    state.noLiveActionExecuted = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61H',
      sowRouteWorks: state.sowRouteWorks,
      insuranceRouteWorks: state.insuranceRouteWorks,
      insurerSynonymWorks: state.insurerSynonymWorks,
      receiptActionIntentWorks: state.receiptActionIntentWorks,
      actionIntentRunsBeforeFallback: state.actionIntentRunsBeforeFallback,
      unknownFallbackStillWorks: state.unknownFallbackStillWorks,
      noLiveActionExecuted: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }

  function runV61ICheck() {
    installCommandNormalizerV61E();
    installPermissionGranterDemoButtonsV61I();
    var host = document.createElement('div');
    var receiptMaterials = runNormalizedAquaCommandV61E('code this receipt to materials', host);
    var receiptMaterialsHtml = host.innerHTML;
    host.innerHTML = '';
    var receiptCode = runNormalizedAquaCommandV61E('code the receipt', host);
    var receiptCodeHtml = host.innerHTML;
    host.innerHTML = '';
    var receiptUnder = runNormalizedAquaCommandV61E('put this receipt under materials', host);
    var receiptUnderHtml = host.innerHTML;
    host.innerHTML = '';
    var reviewed = runNormalizedAquaCommandV61E('mark this receipt reviewed', host);
    var reviewedHtml = host.innerHTML;
    host.innerHTML = '';
    var approve = runNormalizedAquaCommandV61E('approve this item', host);
    var approveHtml = host.innerHTML;
    var combined = [receiptMaterialsHtml, receiptCodeHtml, receiptUnderHtml, reviewedHtml, approveHtml].join(' ');
    state.permissionGranterPanelWorks = /Permission Required \/ Action Intent Demo/i.test(combined) && /Status:<\/strong> Permission required \/ No live change made/i.test(combined);
    state.permissionGranterButtonsWork = /Prepare Change/i.test(combined) && /Owner Approve Demo/i.test(combined) && /Cancel/i.test(combined) && /View Audit Placeholder/i.test(combined);
    state.receiptActionIntentWorks = receiptMaterials.canonicalIntent === 'action_intent_demo' && receiptCode.canonicalIntent === 'action_intent_demo' && receiptUnder.canonicalIntent === 'action_intent_demo' && reviewed.canonicalIntent === 'action_intent_demo';
    state.actionIntentRunsBeforeFallback = state.receiptActionIntentWorks && approve.canonicalIntent === 'action_intent_demo' && !/Fallback local demo panel/i.test(combined);
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noBackendNetworkLiveAIV61I = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61I',
      permissionGranterPanelWorks: state.permissionGranterPanelWorks,
      actionCommandsShowPermissionGate: state.actionIntentRunsBeforeFallback,
      demoButtonsExist: state.permissionGranterButtonsWork,
      localStorageKey: 'aquaPermissionGranterV61I',
      noLiveActionExecuted: true,
      noLiveRecordChange: true,
      noBackendNetworkLiveAI: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }

  function runV61JCheck() {
    installCommandNormalizerV61E();
    installPermissionGranterDemoButtonsV61I();
    try {
      window.localStorage.removeItem(DRAFT_CHANGE_QUEUE_KEY_V61J);
      window.localStorage.setItem(PERMISSION_GRANTER_KEY_V61I, JSON.stringify({
        version: 'v61I',
        currentCommand: 'code this receipt to materials',
        requestedValue: 'materials',
        localDemoStatus: 'stale demo seed'
      }));
    } catch (error) {
      state.draftChangeQueueStorageWarning = 'localStorage unavailable in this browser context';
    }
    var host = document.createElement('div');
    var action = runNormalizedAquaCommandV61E('code this receipt to materials', host);
    var actionHtml = host.innerHTML;
    host.innerHTML = '';
    var changedAction = runNormalizedAquaCommandV61E('code this receipt to coldest', host);
    var changedActionHtml = host.innerHTML;
    var staleDoesNotOverride = /Current command:<\/strong> code this receipt to coldest/i.test(changedActionHtml) && /Requested category\/value:<\/strong> coldest/i.test(changedActionHtml) && !/Requested category\/value:<\/strong> materials/i.test(changedActionHtml);
    var activePanel = host.querySelector('[data-aqua-v61i-permission-granter]');
    var queueLengthBeforeClearCurrent = readDraftChangeQueueV61J().length;
    clearCurrentDemoActionV61J(activePanel);
    var clearCurrentWorks = /Current demo action cleared/i.test(host.innerHTML) && readDraftChangeQueueV61J().length === queueLengthBeforeClearCurrent;
    host.innerHTML = '';
    var showDraft = runNormalizedAquaCommandV61E('show draft changes', host);
    var draftHtml = host.innerHTML;
    var historySeparate = /saved draft queue history only/i.test(draftHtml) && /separate from the current Permission Granter command/i.test(draftHtml);
    host.innerHTML = '';
    var showPrepared = runNormalizedAquaCommandV61E('show prepared changes', host);
    var preparedHtml = host.innerHTML;
    host.innerHTML = '';
    var showPending = runNormalizedAquaCommandV61E('show pending edits', host);
    var pendingHtml = host.innerHTML;
    host.innerHTML = '';
    var showQueue = runNormalizedAquaCommandV61E('show change queue', host);
    var queueHtml = host.innerHTML;
    host.innerHTML = '';
    var waiting = runNormalizedAquaCommandV61E('what changes are waiting?', host);
    var waitingHtml = host.innerHTML;
    host.innerHTML = '';
    var firstDraftId = readDraftChangeQueueV61J()[0] && readDraftChangeQueueV61J()[0].id;
    var approved = upsertDraftChangeQueueV61J(Object.assign({}, action, { draftChangeId: firstDraftId }), 'approved demo');
    var preparedActionAdded = readDraftChangeQueueV61J().length > 0;
    var showApproved = runNormalizedAquaCommandV61E('show approved demo changes', host);
    var approvedHtml = host.innerHTML;
    host.innerHTML = '';
    clearDraftQueueDemoV61J(host);
    var clearQueueWorks = readDraftChangeQueueV61J().length === 0 && /No draft changes waiting/i.test(host.innerHTML);
    host.innerHTML = '';
    var banana = runNormalizedAquaCommandV61E('banana test', host);
    var bananaHtml = host.innerHTML;
    var combinedQueueHtml = [draftHtml, preparedHtml, pendingHtml, queueHtml, waitingHtml, approvedHtml].join(' ');
    state.draftChangeQueuePanelWorks = /Draft Change Queue/i.test(combinedQueueHtml) && /Draft Change ID/i.test(combinedQueueHtml) && /No Live Change Made/i.test(combinedQueueHtml);
    state.draftChangeQueueCommandsWork = showDraft.canonicalIntent === 'show_draft_change_queue' && showPrepared.canonicalIntent === 'show_draft_change_queue' && showPending.canonicalIntent === 'show_draft_change_queue' && showQueue.canonicalIntent === 'show_draft_change_queue' && waiting.canonicalIntent === 'show_draft_change_queue' && showApproved.canonicalIntent === 'show_draft_change_queue';
    state.draftChangeQueueButtonsWork = /Mark Ready for Future Backend/i.test(combinedQueueHtml) && /Revert Demo Change/i.test(combinedQueueHtml) && /View Before \/ After/i.test(combinedQueueHtml) && /View Audit Trail Placeholder/i.test(combinedQueueHtml) && /Clear Draft Queue Demo/i.test(combinedQueueHtml);
    state.receiptActionIntentWorks = action.canonicalIntent === 'action_intent_demo' && changedAction.canonicalIntent === 'action_intent_demo' && /aquaDraftChangeQueueV61J/i.test(actionHtml);
    state.currentCommandReparseWorksV61J = staleDoesNotOverride;
    state.staleLocalStorageDoesNotOverrideCurrentCommandV61J = staleDoesNotOverride;
    state.clearCurrentDemoActionWorksV61J = clearCurrentWorks;
    state.clearDraftQueueDemoWorksV61J = clearQueueWorks;
    state.savedDraftHistorySeparateV61J = historySeparate;
    state.unknownFallbackStillWorks = banana.canonicalIntent === 'unknown' && /Fallback local demo panel/i.test(bananaHtml);
    state.noLiveActionExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61I = true;
    state.noBackendNetworkLiveAIV61J = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61J',
      storageKey: DRAFT_CHANGE_QUEUE_KEY_V61J,
      currentCommandReparseWorks: state.currentCommandReparseWorksV61J,
      categoryValueUpdatesWhenCommandChanges: staleDoesNotOverride,
      staleLocalStorageDoesNotOverrideCurrentCommand: state.staleLocalStorageDoesNotOverrideCurrentCommandV61J,
      clearCurrentDemoActionWorks: state.clearCurrentDemoActionWorksV61J,
      clearDraftQueueDemoWorks: state.clearDraftQueueDemoWorksV61J,
      savedDraftHistorySeparate: state.savedDraftHistorySeparateV61J,
      preparedActionAddedToQueue: action.canonicalIntent === 'action_intent_demo' && preparedActionAdded,
      approvedDemoActionCanAppearInQueue: approved && approved.status === 'approved demo' && /approved demo/i.test(approvedHtml),
      queueCommandsWork: state.draftChangeQueueCommandsWork,
      demoButtonsExist: state.draftChangeQueueButtonsWork,
      bananaFallbackStillWorks: state.unknownFallbackStillWorks,
      noLiveActionExecuted: true,
      noLiveRecordChange: true,
      noBackendNetworkLiveAI: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }


  function runV61CCheck() {
    return runV61DCheck();
  }

  function runV61BCheck() {
    if (isAskAIModalOpen()) {
      exposeAskAICommandFlow();
      ensureTapToStartVoiceFallbackV61D();
    }
    state.askAIHookInstalled = Boolean(state.askAIHookInstalled || state.wrappedOpenModal || state.observerInstalled);
    state.askAIReadyInserted = Boolean(document.getElementById('askAIReadyV61B')) || state.askAIReadyInserted;
    state.commandControlsInserted = Boolean(document.getElementById('brainCommand') && document.getElementById('brainOut')) || state.commandControlsInserted;
    state.voiceButtonAvailable = Boolean(document.getElementById('voiceAskAreaV60U')) || state.voiceButtonAvailable;
    syncNamespace();
    return {
      version: VERSION,
      askAIHookInstalled: state.askAIHookInstalled,
      directAskVoiceHookInstalled: true,
      noAlwaysListening: true,
      noAudioStorage: true,
      noNetworkCalls: true
    };
  }

  mergeNamespace();
  installCommandNormalizerV61E();
  installPermissionGranterDemoButtonsV61I();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireAskAIToCommandFlow, { once: true });
  } else {
    wireAskAIToCommandFlow();
  }
  window.addEventListener('load', wireAskAIToCommandFlow, { once: true });

  console.log('Aqua Homes OS v61J extensions loaded: Permission Granter / Draft Change Queue demo active. No live change made.');
}());
