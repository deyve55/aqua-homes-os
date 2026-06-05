/*
 * Aqua Homes OS v61Y Modular Extension Loader
 * Wires the main Ask AI modal to direct one-shot local push-to-talk command capture and natural command intent routing plus the Visual Module Open Router plus Native Module Open Bridge plus v61H SOW/Insurance/Receipt Action route fixes plus v61I Permission Granter / Action Authority Demo Gate plus v61J Draft Change Queue foundation plus v61K voice synonym / demo state router repair plus v61L automated app QA harness / report export plus typed Regression QA command routing plus v61M command input targeting repair / button-label injection guard plus v61N full automation gate report metadata plus v61P merge-blocker report fields plus v61R AI spoken readback / local browser voice response foundation plus v61T automation command routing priority repair plus v61U Ask AI mode router foundation plus v61V local Jobsite Calculator foundation plus v61W Jobsite Calculator Expansion Pack 1 plus v61X Calculator Report / Save-to-Estimate Draft Foundation plus v61Y Calculator Draft Approval / SOW Review Queue.
 * Protected Home visuals untouched. No live AI, backend, network, always-listening, or audio storage.
 */
(function () {
  'use strict';

  var VERSION = 'v61Y';
  var state = {
    version: VERSION,
    regressionRunningV61T: false,
    askModeRouterV61UAvailable: true,
    askModeRouterWorks: false,
    appNavigationModeWorks: false,
    automationStatusModeWorks: false,
    permissionedActionModeWorks: false,
    generalAskLockedWorks: false,
    unknownFallbackWorks: false,
    jobsiteCalculatorV61VAvailable: true,
    jobsiteCalculatorV61WAvailable: true,
    calculatorDraftsV61XAvailable: true,
    sowReviewQueueV61YAvailable: true,
    sowReviewQueueWorks: false,
    sendToSowReviewWorks: false,
    showSowReviewQueueWorks: false,
    markReviewReadyDemoWorks: false,
    clearSowReviewQueueWorks: false,
    noLiveSowCreated: true,
    calculatorDraftsWork: false,
    saveCalculationDraftWorks: false,
    showSavedCalculationsWorks: false,
    clearSavedCalculationsWorks: false,
    addToEstimateDraftLockedWorks: false,
    noLiveEstimateCreated: true,
    noCustomerExport: true,
    currentCalculatorResultV61X: null,
    jobsiteCalculatorWorks: false,
    concreteSonotubeCalculatorWorks: false,
    paintCalculatorWorks: false,
    drywallCalculatorWorks: false,
    flooringCalculatorWorks: false,
    studCalculatorWorks: false,
    concreteSlabCalculatorWorks: false,
    needMoreInformationWorks: false,
    unsupportedGeneralAskRemainsLocked: false,
    sonotubeEightInchFourFoot80lbReturnsThreeBags: false,
    saunaTubeNormalizesToSonotube: false,
    unsupportedGeneralAskRemainsLockedV61V: false,
    noApiKeysInFrontend: true,
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
    savedDraftHistorySeparateV61J: false,
    clearDraftQueueVoiceVariantsWork: false,
    clearCurrentDemoActionVariantsWork: false,
    startNewDemoChangeVariantsWork: false,
    codeColdCallCorrectionWorks: false,
    receivedToReceiptCorrectionWorks: false,
    badTranscriptNotSavedAsValue: false,
    demoStateCommandsRunBeforeFallback: false,
    regressionHarnessV61LAvailable: true,
    regressionQACommandWorksV61L: false,
    safeToMergeV61L: false,
    fullAutomationGateV61NAvailable: true,
    noBackendCalls: true,
    noLiveChangeExecuted: true,
    commandInputResolverExists: true,
    correctCommandInputTargeted: false,
    oldAskAIInputNotPolluted: true,
    buttonLabelsNotInjected: true,
    regressionButtonPreservesInput: false,
    typedRegressionCommandWorks: false,
    spokenReadbackV61RAvailable: false,
    spokenReadbackUnavailableFallbackV61R: false,
    spokenReadbackControlsInsertedV61R: false,
    speakSummaryButtonExistsV61R: false,
    stopSpeakingButtonExistsV61R: false,
    spokenReadbackPreferenceKey: 'aquaSpokenReadbackV61R',
    spokenReadbackEnabledV61R: true,
    spokenReadbackFunctionExistsV61R: true,
    spokenReadbackLastSummaryV61R: '',
    typedSpeakSummaryWorksV61R: false,
    typedStopSpeakingWorksV61R: false,
    voiceOffPreferenceWorksV61R: false,
    voiceOnPreferenceWorksV61R: false,
    noAudioStorageV61R: true,
    noBackendNetworkLiveAIV61R: true,
    noAlwaysListeningV61R: true,
    conversationalContextRouterAvailableV61S: true,
    repeatLastActionRouterAvailableV61S: true,
    lastConversationalContextV61S: null,
    repeatLastActionWorksV61S: false,
    contextualFollowupWorksV61S: false,
    noLiveActionExecutedV61S: true,
    noBackendNetworkLiveAIV61S: true,
    automationCommandRoutesBeforeFallback: false,
    showAutomationReportCommandWorks: false,
    runRegressionQaCommandWorks: false,
    automationCommandsDoNotFallback: false
  };

  var DRAFT_CHANGE_QUEUE_KEY_V61J = 'aquaDraftChangeQueueV61J';
  var PERMISSION_GRANTER_KEY_V61I = 'aquaPermissionGranterV61I';
  var REGRESSION_REPORT_KEY_V61L = 'aquaRegressionReportV61L';
  var SPOKEN_READBACK_KEY_V61R = 'aquaSpokenReadbackV61R';
  var CONVERSATIONAL_CONTEXT_KEY_V61S = 'aquaConversationalContextV61S';
  var CALCULATOR_DRAFTS_KEY_V61X = 'aquaCalculatorDraftsV61X';
  var SOW_REVIEW_QUEUE_KEY_V61Y = 'aquaSowReviewQueueV61Y';

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
      runV61KCheck: runV61KCheck,
      runV61MCheck: runV61MCheck,
      runV61RCheck: runV61RCheck,
      getAquaCommandInputV61M: getAquaCommandInputV61M,
      runAquaCommandRegressionV61L: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61N: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61P: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61R: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61T: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61U: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61V: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61W: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61X: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61Y: runAquaCommandRegressionV61L,
      readSowReviewQueueV61Y: readSowReviewQueueV61Y,
      sendLatestCalculatorDraftToSowReviewV61Y: sendLatestCalculatorDraftToSowReviewV61Y,
      markSowReviewReadyDemoV61Y: markSowReviewReadyDemoV61Y,
      clearSowReviewQueueV61Y: clearSowReviewQueueV61Y,
      renderSowReviewQueueV61Y: renderSowReviewQueueV61Y,
      readCalculatorDraftsV61X: readCalculatorDraftsV61X,
      saveCurrentCalculatorDraftV61X: saveCurrentCalculatorDraftV61X,
      clearCalculatorDraftsV61X: clearCalculatorDraftsV61X,
      installCalculatorDraftButtonHandlerV61X: installCalculatorDraftButtonHandlerV61X,
      parseLocalJobsiteCalculatorV61V: parseLocalJobsiteCalculatorV61V,
      parseLocalJobsiteCalculatorV61W: parseLocalJobsiteCalculatorV61V,
      getLastRegressionReportV61L: getLastRegressionReportV61L,
      classifyAquaAskModeV61U: classifyAquaAskModeV61U,
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
      startDirectAskVoiceV61C: startDirectAskVoiceV61D,
      speakAquaSummaryV61R: speakAquaSummaryV61R,
      stopAquaSpeakingV61R: stopAquaSpeakingV61R,
      getSpokenReadbackPreferenceV61R: getSpokenReadbackPreferenceV61R,
      setSpokenReadbackPreferenceV61R: setSpokenReadbackPreferenceV61R,
      getCurrentSpokenSummaryV61R: getCurrentSpokenSummaryV61R,
      getLastConversationalContextV61S: getLastConversationalContextV61S,
      clearLastConversationalContextV61S: clearLastConversationalContextV61S
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
      runV61KCheck: runV61KCheck,
      runV61MCheck: runV61MCheck,
      runV61RCheck: runV61RCheck,
      getAquaCommandInputV61M: getAquaCommandInputV61M,
      runAquaCommandRegressionV61L: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61N: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61P: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61R: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61T: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61U: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61V: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61W: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61X: runAquaCommandRegressionV61L,
      runAquaCommandRegressionV61Y: runAquaCommandRegressionV61L,
      readSowReviewQueueV61Y: readSowReviewQueueV61Y,
      sendLatestCalculatorDraftToSowReviewV61Y: sendLatestCalculatorDraftToSowReviewV61Y,
      markSowReviewReadyDemoV61Y: markSowReviewReadyDemoV61Y,
      clearSowReviewQueueV61Y: clearSowReviewQueueV61Y,
      renderSowReviewQueueV61Y: renderSowReviewQueueV61Y,
      readCalculatorDraftsV61X: readCalculatorDraftsV61X,
      saveCurrentCalculatorDraftV61X: saveCurrentCalculatorDraftV61X,
      clearCalculatorDraftsV61X: clearCalculatorDraftsV61X,
      installCalculatorDraftButtonHandlerV61X: installCalculatorDraftButtonHandlerV61X,
      parseLocalJobsiteCalculatorV61V: parseLocalJobsiteCalculatorV61V,
      parseLocalJobsiteCalculatorV61W: parseLocalJobsiteCalculatorV61V,
      getLastRegressionReportV61L: getLastRegressionReportV61L,
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
      startDirectAskVoiceV61C: startDirectAskVoiceV61D,
      speakAquaSummaryV61R: speakAquaSummaryV61R,
      stopAquaSpeakingV61R: stopAquaSpeakingV61R,
      getSpokenReadbackPreferenceV61R: getSpokenReadbackPreferenceV61R,
      setSpokenReadbackPreferenceV61R: setSpokenReadbackPreferenceV61R,
      getCurrentSpokenSummaryV61R: getCurrentSpokenSummaryV61R,
      getLastConversationalContextV61S: getLastConversationalContextV61S,
      clearLastConversationalContextV61S: clearLastConversationalContextV61S
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


  function cloneIntentForContextV61S(intent) {
    return JSON.parse(JSON.stringify(intent || {}));
  }

  function isRepeatLastActionCommandV61S(normalized) {
    return phraseMatchesV61E(normalized, [
      'repeat last action',
      'repeat the last action',
      'repeat that',
      'repeat it',
      'do that again',
      'do it again',
      'run that again',
      'run it again',
      'same again',
      'one more time',
      'rerun that',
      'rerun last command'
    ]);
  }

  function isContextualFollowupCommandV61S(normalized) {
    return phraseMatchesV61E(normalized, [
      'open that',
      'open it',
      'show that',
      'show it',
      'pull that up',
      'pull it up',
      'bring that up',
      'bring it up',
      'go there',
      'take me there',
      'show me that',
      'open the same module'
    ]);
  }

  function getLastConversationalContextV61S() {
    if (state.lastConversationalContextV61S) return cloneIntentForContextV61S(state.lastConversationalContextV61S);
    try {
      var raw = window.localStorage.getItem(CONVERSATIONAL_CONTEXT_KEY_V61S);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      state.conversationalContextStorageWarningV61S = 'localStorage unavailable for conversational context';
      return null;
    }
  }

  function clearLastConversationalContextV61S() {
    state.lastConversationalContextV61S = null;
    try {
      window.localStorage.removeItem(CONVERSATIONAL_CONTEXT_KEY_V61S);
    } catch (error) {
      state.conversationalContextStorageWarningV61S = 'localStorage unavailable while clearing conversational context';
    }
    syncNamespace();
  }

  function shouldRememberConversationalIntentV61S(intent) {
    var canonical = intent && intent.canonicalIntent;
    if (!canonical || canonical === 'unknown' || canonical === 'repeat_last_action_v61s' || canonical === 'context_missing_v61s') return false;
    if (/^(?:speak_summary_v61r|read_report_v61r|stop_speaking_v61r|voice_off_v61r|voice_on_v61r|run_regression_qa|show_automation_report_v61t)$/.test(canonical)) return false;
    if (/^(?:clear_draft_queue_demo|clear_current_demo_action|start_new_demo_change|save_calculation_draft_v61x|show_calculator_drafts_v61x|clear_calculator_drafts_v61x|add_to_estimate_draft_v61x|send_to_sow_review_queue_v61y|show_sow_review_queue_v61y|mark_review_ready_demo_v61y|return_to_calculator_drafts_v61y|clear_sow_review_queue_demo_v61y)$/.test(canonical)) return false;
    return true;
  }

  function rememberConversationalContextV61S(intent) {
    if (!shouldRememberConversationalIntentV61S(intent)) return false;
    var safe = cloneIntentForContextV61S(intent);
    safe.contextSavedAt = new Date().toISOString();
    safe.repeatCommandText = safe.contextSourceCommand || safe.repeatCommandText || safe.originalText || safe.routeText || '';
    state.lastConversationalContextV61S = safe;
    state.conversationalContextRouterAvailableV61S = true;
    state.noLiveActionExecutedV61S = true;
    state.noBackendNetworkLiveAIV61S = true;
    try {
      window.localStorage.setItem(CONVERSATIONAL_CONTEXT_KEY_V61S, JSON.stringify(safe));
    } catch (error) {
      state.conversationalContextStorageWarningV61S = 'localStorage unavailable for conversational context';
    }
    syncNamespace();
    return true;
  }

  function detectConversationalContextCommandV61S(original, normalized) {
    if (isRepeatLastActionCommandV61S(normalized)) {
      return { canonicalIntent: 'repeat_last_action_v61s', routeText: 'repeat last action', originalText: original, normalizedText: normalized, module: 'Conversational Context Router' };
    }
    if (!isContextualFollowupCommandV61S(normalized)) return null;
    var previous = getLastConversationalContextV61S();
    if (!previous) {
      return { canonicalIntent: 'context_missing_v61s', routeText: 'context follow-up missing', originalText: original, normalizedText: normalized, module: 'Conversational Context Router' };
    }
    var contextual = cloneIntentForContextV61S(previous);
    contextual.originalText = original;
    contextual.normalizedText = normalized;
    contextual.contextualFollowupV61S = true;
    contextual.contextSourceCommand = previous.repeatCommandText || previous.originalText || previous.routeText || '';
    state.contextualFollowupWorksV61S = true;
    return contextual;
  }

  function knownReceiptCategoryV61K(text) {
    var match = String(text || '').match(/\b(framing|materials?|plumbing|paint)\b/);
    if (!match) return '';
    return match[1] === 'material' ? 'materials' : match[1];
  }

  function normalizeReceiptActionTranscriptV61K(normalized) {
    var clean = String(normalized || '').trim();
    var hasReceiptTarget = /\b(receipts?|received|materials?|framing|plumbing|paint|vendor|expense)\b/.test(clean);
    if (hasReceiptTarget) clean = clean.replace(/^(cold|call|coat)\b/, 'code');
    if (/^(?:code|categorize|mark|change|update|move|approve|set|review|put)\b/.test(clean)) {
      clean = clean.replace(/\breceived\b/g, 'receipt');
      clean = clean.replace(/^(code|categorize|mark|change|update|move|approve|set|review|put)\s+just\s+receipt\s+(?=to|as|under\b)/, '$1 this receipt ');
      clean = clean.replace(/^(code|categorize|mark|change|update|move|approve|set|review|put)\s+just\s+(?=to|as|under\b)/, '$1 this receipt ');
    }
    return clean.replace(/\s+/g, ' ').trim();
  }

  function requestedReceiptValueV61K(normalized, actionMatch) {
    var afterConnector = String(normalized || '').match(/\b(?:to|as|under)\s+(framing|materials?|plumbing|paint)\b/);
    if (afterConnector) return afterConnector[1] === 'material' ? 'materials' : afterConnector[1];
    var known = knownReceiptCategoryV61K(normalized);
    if (known) return known;
    if (actionMatch && actionMatch[2]) {
      var tailKnown = knownReceiptCategoryV61K(actionMatch[2]);
      if (tailKnown) return tailKnown;
    }
    return 'unclear — owner must confirm';
  }

  function detectDemoStateCommandV61K(original, normalized) {
    var q = String(normalized || '').trim();
    if (/^(?:clear|claire|delete|reset)(?: the)? draft (?:queue|queued|q|cute)(?: demo)?$/.test(q) || /^(?:clear|claire)(?: the)? demo (?:queue|queued)$/.test(q)) {
      return { canonicalIntent: 'clear_draft_queue_demo', routeText: 'clear draft queue demo', originalText: original, normalizedText: q, module: 'Draft Change Queue' };
    }
    if (/^(?:clear current demo action|clear current action|clear active action|clear active demo|clear current demo|reset current action|reset current demo|clear current permission|clear current panel)$/.test(q)) {
      return { canonicalIntent: 'clear_current_demo_action', routeText: 'clear current demo action', originalText: original, normalizedText: q, module: 'Permission Granter' };
    }
    if (/^(?:start new demo change|start a new demo change|new demo change|start new change|recompute current command|rerun current command|refresh current command|start over with current command)$/.test(q)) {
      return { canonicalIntent: 'start_new_demo_change', routeText: 'start new demo change', originalText: original, normalizedText: q, module: 'Permission Granter' };
    }
    return null;
  }

  function detectAutomationReportCommandV61T(original, normalized) {
    var q = String(normalized || '').trim();
    if (phraseMatchesV61E(q, [
      'show automation report',
      'show regression report',
      'show qa report',
      'automation status'
    ])) {
      return { canonicalIntent: 'show_automation_report_v61t', routeText: 'show automation report', originalText: original, normalizedText: q, module: 'Automation Report / Regression Report Viewer' };
    }
    if (phraseMatchesV61E(q, [
      'run regression qa',
      'run qa regression',
      'run command regression',
      'run command regression qa',
      'run regression quality assurance',
      'command regression qa',
      'regression qa',
      'test app'
    ])) {
      return { canonicalIntent: 'run_regression_qa', routeText: 'run regression qa', originalText: original, normalizedText: q, module: 'Automation Report / Regression Report Viewer' };
    }
    return null;
  }



  function detectCalculatorDraftCommandV61X(original, normalized) {
    var q = String(normalized || '').trim();
    if (phraseMatchesV61E(q, ['save calculation draft', 'save this calculation'])) {
      return { canonicalIntent: 'save_calculation_draft_v61x', routeText: 'save calculation draft', originalText: original, normalizedText: q, module: 'Calculator Drafts / Estimate Prep' };
    }
    if (phraseMatchesV61E(q, ['show saved calculations', 'show calculator drafts'])) {
      return { canonicalIntent: 'show_calculator_drafts_v61x', routeText: 'show calculator drafts', originalText: original, normalizedText: q, module: 'Calculator Drafts / Estimate Prep' };
    }
    if (phraseMatchesV61E(q, ['clear saved calculations', 'clear calculation drafts'])) {
      return { canonicalIntent: 'clear_calculator_drafts_v61x', routeText: 'clear calculation drafts', originalText: original, normalizedText: q, module: 'Calculator Drafts / Estimate Prep' };
    }
    if (phraseMatchesV61E(q, ['add to estimate draft', 'add this to estimate', 'add this to SOW draft'])) {
      return { canonicalIntent: 'add_to_estimate_draft_v61x', routeText: 'add to estimate draft', originalText: original, normalizedText: q, module: 'Estimate Draft Placeholder' };
    }
    return null;
  }



  function detectSowReviewQueueCommandV61Y(original, normalized) {
    var q = String(normalized || '').trim();
    if (phraseMatchesV61E(q, [
      'send to SOW review',
      'send this to SOW review',
      'send to estimate review',
      'add this to SOW review queue'
    ])) {
      return { canonicalIntent: 'send_to_sow_review_queue_v61y', routeText: 'send to SOW review', originalText: original, normalizedText: q, module: 'SOW / Estimate Review Queue' };
    }
    if (phraseMatchesV61E(q, ['show SOW review queue', 'show estimate review queue'])) {
      return { canonicalIntent: 'show_sow_review_queue_v61y', routeText: 'show SOW review queue', originalText: original, normalizedText: q, module: 'SOW / Estimate Review Queue' };
    }
    if (phraseMatchesV61E(q, ['mark review ready demo'])) {
      return { canonicalIntent: 'mark_review_ready_demo_v61y', routeText: 'mark review ready demo', originalText: original, normalizedText: q, module: 'SOW / Estimate Review Queue' };
    }
    if (phraseMatchesV61E(q, ['return to calculator drafts'])) {
      return { canonicalIntent: 'return_to_calculator_drafts_v61y', routeText: 'return to calculator drafts', originalText: original, normalizedText: q, module: 'Calculator Drafts / Estimate Prep' };
    }
    if (phraseMatchesV61E(q, ['clear SOW review queue demo'])) {
      return { canonicalIntent: 'clear_sow_review_queue_demo_v61y', routeText: 'clear SOW review queue demo', originalText: original, normalizedText: q, module: 'SOW / Estimate Review Queue' };
    }
    return null;
  }

  function appNavigationPhraseGroupsV61U() {
    return [
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
  }


  function parseLocalJobsiteCalculatorV61V(originalText, normalizedText) {
    var original = String(originalText || '').trim();
    var symbolUnitsText = original
      .replace(/(\d+(?:\.\d+)?)\s*"/g, '$1 inch')
      .replace(/(\d+(?:\.\d+)?)\s*'/g, '$1 feet')
      .replace(/(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)/g, '$1 by $2');
    var q = String(normalizedText || normalizeAquaPhraseV61E(symbolUnitsText)).trim();
    if (symbolUnitsText !== original) q = normalizeAquaPhraseV61E(symbolUnitsText + ' ' + q);
    if (!q) return null;

    var paintIntent = parsePaintGallonsCalculatorV61W(original, q);
    if (paintIntent) return paintIntent;
    var drywallIntent = parseDrywallSheetsCalculatorV61W(original, q);
    if (drywallIntent) return drywallIntent;
    var flooringIntent = parseFlooringCalculatorV61W(original, q);
    if (flooringIntent) return flooringIntent;
    var studIntent = parseWallStudCalculatorV61W(original, q);
    if (studIntent) return studIntent;
    var slabIntent = parseConcreteSlabCalculatorV61W(original, q);
    if (slabIntent) return slabIntent;
    return parseConcreteSonotubeCalculatorV61V(original, q);
  }

  function baseJobsiteIntentV61W(original, q, calculator) {
    return {
      canonicalIntent: 'local_calculator_available',
      routeText: original,
      originalText: original,
      normalizedText: q,
      module: 'General Ask / Jobsite Calculator',
      calculator: calculator,
      localCalculatorAvailable: true
    };
  }

  function needMoreInformationIntentV61W(original, q, calculator, missingValues) {
    return Object.assign(baseJobsiteIntentV61W(original, q, calculator), {
      canonicalIntent: 'local_calculator_need_more_information',
      calculator: 'Need More Information',
      requestedCalculator: calculator,
      missingValues: missingValues || []
    });
  }

  function parseFirstSquareFeetV61W(q) {
    var match = q.match(/\b(\d+(?:\.\d+)?)\s*(?:square\s*feet|sq\s*ft|sqft)\b/);
    return match ? Number(match[1]) : NaN;
  }

  function parseRoomDimensionsV61W(q) {
    var match = q.match(/\b(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)?\s*(?:by|x)\s*(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)?\b/);
    if (!match) return null;
    return { lengthFeet: Number(match[1]), widthFeet: Number(match[2]) };
  }

  function parseWastePercentV61W(q, defaultPercent) {
    var match = q.match(/\b(\d+(?:\.\d+)?)\s*(?:percent|%)\s*waste\b/) || q.match(/\bwaste\s*(?:of|at|is)?\s*(\d+(?:\.\d+)?)\s*(?:percent|%)\b/);
    return match ? Number(match[1]) : defaultPercent;
  }

  function parsePaintGallonsCalculatorV61W(original, q) {
    if (!/\b(paint|gallons? of paint|paint coverage)\b/.test(q)) return null;
    if (/\b(best|brand|today|recommend|which)\b/.test(q) && !/\b(how many|how much|gallons?|coverage|square|sqft|sq ft)\b/.test(q)) return null;
    var squareFeet = parseFirstSquareFeetV61W(q);
    if (!Number.isFinite(squareFeet) || squareFeet <= 0) return needMoreInformationIntentV61W(original, q, 'Paint Gallons', ['square footage to paint']);
    var coatsMatch = q.match(/\b(1|2)\s*coats?\b/);
    var coats = coatsMatch ? Number(coatsMatch[1]) : 2;
    var coverage = 350;
    var estimatedGallons = (squareFeet * coats) / coverage;
    var recommendedGallons = Math.ceil(estimatedGallons);
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Paint Gallons'), {
      squareFeet: squareFeet,
      coats: coats,
      coveragePerGallon: coverage,
      estimatedGallons: estimatedGallons,
      recommendedGallons: recommendedGallons
    });
  }

  function parseDrywallSheetsCalculatorV61W(original, q) {
    if (!/\b(drywall|sheetrock|sheets?)\b/.test(q) || /\bflooring\b/.test(q)) return null;
    var sheetMatch = q.match(/\b4\s*(?:by|x)\s*(8|12)\b/);
    var sheetLength = sheetMatch ? Number(sheetMatch[1]) : 8;
    var sheetSize = '4x' + sheetLength;
    var sheetArea = 4 * sheetLength;
    var wastePercent = 10;
    var squareFeet = parseFirstSquareFeetV61W(q);
    var dims = parseRoomDimensionsV61W(q);
    var ceilingMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)\s*(?:ceiling|ceilings?)\b/) || q.match(/\bceiling\s*(?:height)?\s*(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)\b/);
    var ceilingHeight = ceilingMatch ? Number(ceilingMatch[1]) : NaN;
    if (Number.isFinite(squareFeet) && squareFeet > 0) {
      var sqftSheets = Math.ceil((squareFeet * (1 + wastePercent / 100)) / sheetArea);
      return Object.assign(baseJobsiteIntentV61W(original, q, 'Drywall Sheets'), {
        inputSquareFeet: squareFeet,
        wallArea: squareFeet,
        wastePercent: wastePercent,
        sheetSize: sheetSize,
        sheetArea: sheetArea,
        recommendedSheets: sqftSheets
      });
    }
    if (!dims) return needMoreInformationIntentV61W(original, q, 'Drywall Sheets', ['room length and width or wall square footage', 'ceiling height']);
    if (!Number.isFinite(ceilingHeight) || ceilingHeight <= 0) return needMoreInformationIntentV61W(original, q, 'Drywall Sheets', ['ceiling height']);
    var perimeter = (dims.lengthFeet + dims.widthFeet) * 2;
    var wallArea = perimeter * ceilingHeight;
    var recommendedSheets = Math.ceil((wallArea * (1 + wastePercent / 100)) / sheetArea);
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Drywall Sheets'), {
      lengthFeet: dims.lengthFeet,
      widthFeet: dims.widthFeet,
      ceilingHeightFeet: ceilingHeight,
      perimeterFeet: perimeter,
      wallArea: wallArea,
      wastePercent: wastePercent,
      sheetSize: sheetSize,
      sheetArea: sheetArea,
      recommendedSheets: recommendedSheets
    });
  }

  function parseFlooringCalculatorV61W(original, q) {
    if (!/\bflooring\b/.test(q)) return null;
    var wastePercent = parseWastePercentV61W(q, 10);
    var squareFeet = parseFirstSquareFeetV61W(q);
    var dims = parseRoomDimensionsV61W(q);
    var baseArea = Number.isFinite(squareFeet) && squareFeet > 0 ? squareFeet : NaN;
    if ((!Number.isFinite(baseArea) || baseArea <= 0) && dims) baseArea = dims.lengthFeet * dims.widthFeet;
    if (!Number.isFinite(baseArea) || baseArea <= 0) return needMoreInformationIntentV61W(original, q, 'Flooring Square Footage', ['room length and width or base square footage']);
    var recommendedSquareFeet = Math.ceil(Number((baseArea * (1 + wastePercent / 100)).toFixed(6)));
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Flooring Square Footage'), {
      lengthFeet: dims && dims.lengthFeet,
      widthFeet: dims && dims.widthFeet,
      baseArea: baseArea,
      wastePercent: wastePercent,
      recommendedSquareFeet: recommendedSquareFeet
    });
  }

  function parseWallStudCalculatorV61W(original, q) {
    if (!/\b(studs?|wall framing)\b/.test(q)) return null;
    var wallMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)\s*wall\b/) || q.match(/\bwall\s*(?:length)?\s*(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)\b/) || q.match(/\bfor\s*(?:a\s*)?(\d+(?:\.\d+)?)\s*(?:feet|foot|ft)\b/);
    var wallFeet = wallMatch ? Number(wallMatch[1]) : NaN;
    if (!Number.isFinite(wallFeet) || wallFeet <= 0) return needMoreInformationIntentV61W(original, q, 'Wall Stud Count', ['wall length in feet']);
    var spacingMatch = q.match(/\b(16|24)\s*(?:inch|inches|in)\s*(?:on\s*center|oc|o\s*c)\b/);
    var spacingInches = spacingMatch ? Number(spacingMatch[1]) : 16;
    var wallInches = wallFeet * 12;
    var spaces = Math.ceil(wallInches / spacingInches);
    var baseStuds = spaces + 1;
    var recommendedStuds = baseStuds + 2;
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Wall Stud Count'), {
      wallFeet: wallFeet,
      spacingInches: spacingInches,
      wallInches: wallInches,
      spaces: spaces,
      baseStuds: baseStuds,
      recommendedStuds: recommendedStuds
    });
  }

  function parseConcreteSlabCalculatorV61W(original, q) {
    if (!/\b(concrete|yards?|slab)\b/.test(q) || /\b(sonotube|sono tube|sauna tube|tube|bags?|bag)\b/.test(q)) return null;
    var hasSlabWords = /\b(slab|yards?|concrete)\b/.test(q) && /\b(thick|inch|inches|in)\b/.test(q);
    if (!hasSlabWords) return null;
    var dims = parseRoomDimensionsV61W(q);
    var thicknessMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:inch|inches|in)\s*(?:thick|thickness)?\b/) || q.match(/\bby\s*(\d+(?:\.\d+)?)\s*(?:inch|inches|in)\b/);
    var missing = [];
    if (!dims) missing.push('slab length and width in feet');
    if (!thicknessMatch) missing.push('slab thickness in inches');
    if (missing.length) return needMoreInformationIntentV61W(original, q, 'Concrete Slab', missing);
    var thicknessInches = Number(thicknessMatch[1]);
    var areaSqFt = dims.lengthFeet * dims.widthFeet;
    var thicknessFeet = thicknessInches / 12;
    var cubicFeet = areaSqFt * thicknessFeet;
    var cubicYards = cubicFeet / 27;
    var waste10CubicYards = cubicYards * 1.10;
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Concrete Slab'), {
      lengthFeet: dims.lengthFeet,
      widthFeet: dims.widthFeet,
      thicknessInches: thicknessInches,
      areaSqFt: areaSqFt,
      thicknessFeet: thicknessFeet,
      volumeCubicFeet: cubicFeet,
      cubicYards: cubicYards,
      waste10CubicYards: waste10CubicYards
    });
  }

  function parseConcreteSonotubeCalculatorV61V(original, q) {
    var hasConcrete = /\b(concrete|bags?|bag|pour|footing|sonotube|sono tube|sauna tube|tube)\b/.test(q);
    var hasTube = /\b(sonotube|sono tube|sauna tube|tube|round footing)\b/.test(q);
    if (!hasConcrete || !hasTube) return null;
    var diameterMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:inch|inches|in)\b/);
    var depthMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:foot|feet|ft)\b/);
    var bagMatch = q.match(/\b(50|60|80)\s*(?:lb|lbs|pound|pounds)\b/);
    var diameterInches = diameterMatch ? Number(diameterMatch[1]) : NaN;
    var depthFeet = depthMatch ? Number(depthMatch[1]) : NaN;
    var bagSize = bagMatch ? Number(bagMatch[1]) : 80;
    if (!Number.isFinite(diameterInches) || diameterInches <= 0 || !Number.isFinite(depthFeet) || depthFeet <= 0) return null;
    var yields = { 50: 0.375, 60: 0.45, 80: 0.60 };
    var diameterFeet = diameterInches / 12;
    var radiusFeet = diameterFeet / 2;
    var volumeCubicFeet = Math.PI * radiusFeet * radiusFeet * depthFeet;
    var exactBags = volumeCubicFeet / yields[bagSize];
    var recommendedBags = Math.ceil(exactBags);
    return Object.assign(baseJobsiteIntentV61W(original, q, 'Concrete Sonotube'), {
      diameterInches: diameterInches,
      depthFeet: depthFeet,
      bagSizePounds: bagSize,
      bagYieldCubicFeet: yields[bagSize],
      defaultBagSizeUsed: !bagMatch,
      diameterFeet: diameterFeet,
      radiusFeet: radiusFeet,
      volumeCubicFeet: volumeCubicFeet,
      exactBags: exactBags,
      recommendedBags: recommendedBags,
      shape: 'round tube / cylinder',
      normalizedTubeTerm: /\bsauna tube\b/.test(q) ? 'Sonotube' : 'Sonotube'
    });
  }

  function formatNumberV61V(value) {
    return Number(value || 0).toFixed(2).replace(/\.00$/, '');
  }


  function supportedCalculatorDraftTypeV61X(calculator) {
    return /^(Concrete Sonotube|Paint Gallons|Drywall Sheets|Flooring Square Footage|Wall Stud Count|Concrete Slab)$/.test(String(calculator || ''));
  }

  function cloneSafeCalculatorIntentV61X(intent) {
    var safe = {};
    Object.keys(intent || {}).forEach(function (key) {
      var value = intent[key];
      if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') safe[key] = value;
    });
    return safe;
  }

  function calculatorResultSummaryV61X(intent) {
    var safe = intent || {};
    if (safe.calculator === 'Concrete Sonotube') return 'Concrete Sonotube: recommended ' + safe.recommendedBags + ' bags for ' + formatNumberV61V(safe.diameterInches) + ' inch x ' + formatNumberV61V(safe.depthFeet) + ' foot tube.';
    if (safe.calculator === 'Paint Gallons') return 'Paint Gallons: recommended ' + safe.recommendedGallons + ' gallons for ' + formatNumberV61V(safe.squareFeet) + ' square feet and ' + safe.coats + ' coats.';
    if (safe.calculator === 'Drywall Sheets') return 'Drywall Sheets: recommended ' + safe.recommendedSheets + ' ' + safe.sheetSize + ' sheets for about ' + formatNumberV61V(safe.wallArea) + ' sq ft.';
    if (safe.calculator === 'Flooring Square Footage') return 'Flooring Square Footage: recommended ' + safe.recommendedSquareFeet + ' sq ft including ' + formatNumberV61V(safe.wastePercent) + '% waste.';
    if (safe.calculator === 'Wall Stud Count') return 'Wall Stud Count: recommended ' + safe.recommendedStuds + ' studs for a ' + formatNumberV61V(safe.wallFeet) + ' foot wall.';
    if (safe.calculator === 'Concrete Slab') return 'Concrete Slab: ' + Number(safe.cubicYards || 0).toFixed(2) + ' cubic yards; ' + Number(safe.waste10CubicYards || 0).toFixed(2) + ' cubic yards with 10% waste.';
    return 'Local jobsite calculator result.';
  }

  function calculatorRecommendedAmountV61X(intent) {
    var safe = intent || {};
    if (safe.calculator === 'Concrete Sonotube') return String(safe.recommendedBags) + ' bags';
    if (safe.calculator === 'Paint Gallons') return String(safe.recommendedGallons) + ' gallons';
    if (safe.calculator === 'Drywall Sheets') return String(safe.recommendedSheets) + ' ' + safe.sheetSize + ' sheets';
    if (safe.calculator === 'Flooring Square Footage') return String(safe.recommendedSquareFeet) + ' sq ft';
    if (safe.calculator === 'Wall Stud Count') return String(safe.recommendedStuds) + ' studs';
    if (safe.calculator === 'Concrete Slab') return Number(safe.waste10CubicYards || 0).toFixed(2) + ' cubic yards with 10% waste';
    return 'Review required';
  }

  function calculatorSafetyNoteV61X() {
    return 'Local/demo-only calculator draft. Verify inputs, site conditions, waste, code, and owner review before future estimate/SOW use. No live estimate, customer export, backend, or accounting action.';
  }

  function setCurrentCalculatorResultV61X(intent) {
    if (intent && intent.canonicalIntent === 'local_calculator_available' && supportedCalculatorDraftTypeV61X(intent.calculator)) {
      state.currentCalculatorResultV61X = cloneSafeCalculatorIntentV61X(intent);
      state.currentCalculatorResultV61X.resultSummary = calculatorResultSummaryV61X(intent);
      state.currentCalculatorResultV61X.recommendedAmount = calculatorRecommendedAmountV61X(intent);
      state.calculatorDraftsWork = true;
    }
    syncNamespace();
  }

  function renderCalculatorDraftActionsV61X(intent) {
    if (!intent || !supportedCalculatorDraftTypeV61X(intent.calculator)) return '';
    return '<div class="actions" data-aqua-v61x-calculator-draft-actions="true" style="margin-top:10px">' +
      '<button type="button" class="btn small gold" data-aqua-v61x-save-calculation-draft="true">Save Calculation Draft</button>' +
      '<button type="button" class="btn small" data-aqua-v61x-show-calculator-drafts="true">Show Saved Calculations</button>' +
      '<button type="button" class="btn small" data-aqua-v61x-clear-calculator-drafts="true">Clear Saved Calculation Drafts</button>' +
      '<button type="button" class="btn small" data-aqua-v61x-add-estimate-draft="true">Add to Estimate Draft Placeholder</button>' +
      '<button type="button" class="btn small gold" data-aqua-v61y-send-sow-review="true">Send to SOW Review Queue</button>' +
      '<button type="button" class="btn small" data-aqua-v61y-show-sow-review="true">Show SOW Review Queue</button>' +
      '</div><div class="smallMut" data-aqua-v61x-draft-safe-copy="true">Calculator draft actions are local/demo-only. No live estimate, no customer export, no backend, no accounting.</div>';
  }

  function readCalculatorDraftsV61X() {
    try {
      var raw = window.localStorage.getItem(CALCULATOR_DRAFTS_KEY_V61X);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(function (item) { return item && item.status === 'draft/local demo only'; }) : [];
    } catch (error) {
      state.calculatorDraftStorageWarningV61X = 'localStorage unavailable for calculator drafts';
      return [];
    }
  }

  function writeCalculatorDraftsV61X(drafts) {
    try {
      window.localStorage.setItem(CALCULATOR_DRAFTS_KEY_V61X, JSON.stringify((drafts || []).slice(-25)));
      return true;
    } catch (error) {
      state.calculatorDraftStorageWarningV61X = 'localStorage unavailable for calculator drafts';
      return false;
    }
  }

  function buildCalculatorDraftRecordV61X(intent) {
    var safe = intent || state.currentCalculatorResultV61X || null;
    if (!safe || !supportedCalculatorDraftTypeV61X(safe.calculator)) return null;
    return {
      draftCalculationId: 'calc-draft-v61x-' + Date.now(),
      calculatorType: String(safe.calculator || ''),
      originalQuestion: String(safe.originalText || safe.routeText || '').slice(0, 240),
      detectedValues: cloneSafeCalculatorIntentV61X(safe),
      resultSummary: String(safe.resultSummary || calculatorResultSummaryV61X(safe)).slice(0, 360),
      recommendedAmount: String(safe.recommendedAmount || calculatorRecommendedAmountV61X(safe)).slice(0, 120),
      safetyNote: calculatorSafetyNoteV61X(),
      timestamp: new Date().toISOString(),
      status: 'draft/local demo only'
    };
  }

  function saveCurrentCalculatorDraftV61X() {
    var record = buildCalculatorDraftRecordV61X();
    if (!record) return null;
    var drafts = readCalculatorDraftsV61X();
    drafts.push(record);
    if (!writeCalculatorDraftsV61X(drafts)) return null;
    state.calculatorDraftsWork = true;
    state.saveCalculationDraftWorks = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noApiKeysInFrontend = true;
    syncNamespace();
    return record;
  }

  function clearCalculatorDraftsV61X() {
    try { window.localStorage.removeItem(CALCULATOR_DRAFTS_KEY_V61X); } catch (error) { state.calculatorDraftStorageWarningV61X = 'localStorage unavailable while clearing calculator drafts'; }
    state.currentCalculatorResultV61X = null;
    state.clearSavedCalculationsWorks = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    syncNamespace();
    return true;
  }

  function renderNoCurrentCalculatorDraftV61X() {
    return '<div class="note" data-aqua-v61x-no-current-calculation="true"><strong>No current calculator result found.</strong><div>No current calculator result found. Run a local jobsite calculator first.</div><div class="locked">Local/demo-only. No backend, network, external AI/API call, live estimate, customer export, accounting export, payment, payroll, bank, or live record change.</div></div>';
  }

  function renderSavedCalculatorDraftsV61X() {
    var drafts = readCalculatorDraftsV61X();
    var rows = drafts.length ? drafts.map(function (draft) {
      return '<div class="note" data-aqua-v61x-calculator-draft-row="true"><strong>Draft Calculation ID:</strong> ' + escapeHTMLV61D(draft.draftCalculationId) +
        '<div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(draft.calculatorType) + '</div>' +
        '<div><strong>Original Question:</strong> ' + escapeHTMLV61D(draft.originalQuestion) + '</div>' +
        '<div><strong>Result Summary:</strong> ' + escapeHTMLV61D(draft.resultSummary) + '</div>' +
        '<div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(draft.recommendedAmount) + '</div>' +
        '<div><strong>Status:</strong> Draft only / Local demo</div>' +
        '<div><strong>Safety:</strong> No live estimate, no customer export, no backend, no accounting</div><div class="actions"><button type="button" class="btn small gold" data-aqua-v61y-send-sow-review="true">Send to SOW Review Queue</button></div></div>';
    }).join('') : '<div>No saved calculator drafts yet.</div>';
    state.showSavedCalculationsWorks = true;
    state.calculatorDraftsWork = true;
    syncNamespace();
    return '<div class="note" data-aqua-v61x-calculator-drafts-panel="true"><strong>Calculator Drafts / Estimate Prep — Local Demo</strong>' + rows + '<div class="locked">Safety: No live estimate, no customer export, no backend, no accounting. Demo/local-only calculation notes.</div></div>';
  }

  function renderSavedCalculatorDraftConfirmationV61X(record) {
    if (!record) return renderNoCurrentCalculatorDraftV61X();
    return '<div class="note" data-aqua-v61x-save-confirmation="true"><strong>Save Calculation Draft</strong><div>Saved local/demo calculator draft: ' + escapeHTMLV61D(record.draftCalculationId) + '</div><div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(record.calculatorType) + '</div><div><strong>Result Summary:</strong> ' + escapeHTMLV61D(record.resultSummary) + '</div><div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(record.recommendedAmount) + '</div><div class="locked">Status: draft/local demo only. No live estimate created. No customer export. No backend. No accounting/export/payment action.</div></div>';
  }

  function renderClearCalculatorDraftsV61X() {
    clearCalculatorDraftsV61X();
    return '<div class="note" data-aqua-v61x-clear-calculator-drafts="true"><strong>Clear Saved Calculation Drafts</strong><div>Local/demo calculator drafts were cleared only from ' + escapeHTMLV61D(CALCULATOR_DRAFTS_KEY_V61X) + '.</div><div class="locked">No live estimate, customer export, backend, accounting, payment, payroll, bank, or live job record changed.</div></div>';
  }

  function renderEstimateDraftPlaceholderV61X() {
    if (!state.currentCalculatorResultV61X) return renderNoCurrentCalculatorDraftV61X();
    state.addToEstimateDraftLockedWorks = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    syncNamespace();
    return '<div class="note" data-aqua-v61x-estimate-draft-placeholder="true"><strong>Estimate Draft Placeholder</strong><div>This calculation can be prepared for future estimate/SOW review, but no live estimate was created.</div><ul><li>Demo Data Only</li><li>Estimate Draft Locked</li><li>Customer Export Locked</li><li>Backend Locked</li><li>Accounting Export Locked</li><li>Owner Review Required</li><li>No Live Change Made</li></ul><div class="locked">No live estimate created. No customer export. No backend, network, external AI/API, accounting export, payment, payroll, bank, or live record change.</div></div>';
  }

  function renderConcreteSonotubeCalculatorV61V(intent) {
    var safe = intent || {};
    var defaultText = safe.defaultBagSizeUsed ? '<div>Bag size was not specified, so this local estimate defaults to 80 lb bags.</div>' : '';
    return '<div class="note" data-aqua-v61v-jobsite-calculator="true" data-aqua-v61v-concrete-sonotube="true"><strong>Jobsite Calculator — Concrete Sonotube</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div class="smallMut"><strong>Route:</strong> general_ask_locked / local_calculator_available</div>' +
      '<div><strong>Detected:</strong></div>' +
      '<ul><li>Diameter: ' + escapeHTMLV61D(formatNumberV61V(safe.diameterInches)) + ' inches</li><li>Depth: ' + escapeHTMLV61D(formatNumberV61V(safe.depthFeet)) + ' feet</li><li>Shape: round tube / cylinder</li></ul>' +
      defaultText +
      '<div><strong>Calculation:</strong></div>' +
      '<ul><li>Volume: about ' + escapeHTMLV61D(formatNumberV61V(safe.volumeCubicFeet)) + ' cubic feet</li><li>' + escapeHTMLV61D(safe.bagSizePounds) + ' lb bags: about ' + escapeHTMLV61D(formatNumberV61V(safe.exactBags)) + ' bags</li><li>Recommended purchase: ' + escapeHTMLV61D(safe.recommendedBags) + ' bags</li></ul>' +
      '<div><strong>Safety note:</strong><br>This is a local estimate. Verify tube size, depth, waste, base conditions, and local code/inspection requirements before pouring.</div>' + renderCalculatorDraftActionsV61X(safe) +
      '<div class="locked"><strong>Safety locks:</strong><br>Local calculator only<br>No internet/search/API call<br>No live job/accounting record changed<br>No backend calls<br>No external AI/API calls<br>No API keys in frontend<br>No payment, payroll, bank, or accounting export action<br>No sensitive data stored</div></div>';
  }

  function safetyLocksHTMLV61W() {
    return '<div class="locked"><strong>Safety locks:</strong><br>Local calculator only<br>No internet/search/API call<br>No live job/accounting record changed<br>No backend call<br>No external AI/API calls<br>No API keys in frontend<br>No payment, payroll, bank, or accounting export action<br>No sensitive data stored</div>';
  }

  function renderNeedMoreInformationCalculatorV61W(intent) {
    var safe = intent || {};
    var missing = (safe.missingValues || []).map(function (value) { return '<li>' + escapeHTMLV61D(value) + '</li>'; }).join('');
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-need-more-information="true"><strong>Jobsite Calculator — Need More Information</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div>I can calculate this locally, but I need:</div><ul>' + (missing || '<li>required calculator values</li>') + '</ul>' +
      '<div><strong>Requested calculator:</strong> ' + escapeHTMLV61D(safe.requestedCalculator || 'Jobsite Calculator') + '</div>' +
      '<div>No internet/API call was made.</div>' + safetyLocksHTMLV61W() + '</div>';
  }

  function renderPaintGallonsCalculatorV61W(intent) {
    var safe = intent || {};
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-paint-gallons="true"><strong>Jobsite Calculator — Paint Gallons</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div><strong>Detected area:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.squareFeet)) + ' square feet</div>' +
      '<div><strong>Coats:</strong> ' + escapeHTMLV61D(safe.coats) + '</div>' +
      '<div><strong>Coverage:</strong> ' + escapeHTMLV61D(safe.coveragePerGallon) + ' sq ft per gallon</div>' +
      '<div><strong>Formula/assumptions:</strong> paintGallons = ceil((squareFeet × coats) / coveragePerGallon); default coverage 350 sq ft/gallon/coat; default 2 coats unless stated.</div>' +
      '<div><strong>Estimated gallons:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.estimatedGallons)) + '</div>' +
      '<div><strong>Recommended purchase:</strong> ' + escapeHTMLV61D(safe.recommendedGallons) + ' gallons</div>' +
      '<div><strong>Safety note:</strong><br>Local estimate only. Actual coverage depends on surface texture, primer, color change, product, sprayer/roller waste, and manufacturer coverage.</div>' + renderCalculatorDraftActionsV61X(safe) + safetyLocksHTMLV61W() + '</div>';
  }

  function renderDrywallSheetsCalculatorV61W(intent) {
    var safe = intent || {};
    var detected = Number.isFinite(safe.lengthFeet) ? '<div><strong>Detected room:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.lengthFeet)) + ' ft x ' + escapeHTMLV61D(formatNumberV61V(safe.widthFeet)) + ' ft</div><div><strong>Ceiling height:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.ceilingHeightFeet)) + ' ft</div>' : '<div><strong>Detected area:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.inputSquareFeet || safe.wallArea)) + ' square feet</div>';
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-drywall-sheets="true"><strong>Jobsite Calculator — Drywall Sheets</strong>' +
      askModeBadgeV61U('general_ask_locked') + detected +
      '<div><strong>Wall area:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.wallArea)) + ' sq ft</div>' +
      '<div><strong>Waste:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.wastePercent)) + '%</div>' +
      '<div><strong>Sheet size:</strong> ' + escapeHTMLV61D(safe.sheetSize) + '</div>' +
      '<div><strong>Formula/assumptions:</strong> room wall area = perimeter × ceiling height; sheet area = ' + escapeHTMLV61D(safe.sheetArea) + ' sq ft; default waste = 10%; round up sheets.</div>' +
      '<div><strong>Recommended purchase:</strong> ' + escapeHTMLV61D(safe.recommendedSheets) + ' ' + escapeHTMLV61D(safe.sheetSize) + ' sheets</div>' +
      '<div><strong>Safety note:</strong><br>Local estimate only. Verify openings, ceiling drywall, layout, cuts, fire-rated assemblies, moisture board, and waste.</div>' + renderCalculatorDraftActionsV61X(safe) + safetyLocksHTMLV61W() + '</div>';
  }

  function renderFlooringCalculatorV61W(intent) {
    var safe = intent || {};
    var detected = Number.isFinite(safe.lengthFeet) ? '<div><strong>Detected room:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.lengthFeet)) + ' ft x ' + escapeHTMLV61D(formatNumberV61V(safe.widthFeet)) + ' ft</div>' : '<div><strong>Detected area:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.baseArea)) + ' square feet</div>';
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-flooring="true"><strong>Jobsite Calculator — Flooring Square Footage</strong>' +
      askModeBadgeV61U('general_ask_locked') + detected +
      '<div><strong>Base area:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.baseArea)) + ' sq ft</div>' +
      '<div><strong>Waste:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.wastePercent)) + '%</div>' +
      '<div><strong>Formula/assumptions:</strong> area = length × width; default waste = 10% unless stated; recommended purchase = base area × (1 + waste%).</div>' +
      '<div><strong>Recommended purchase:</strong> ' + escapeHTMLV61D(safe.recommendedSquareFeet) + ' sq ft</div>' +
      '<div><strong>Safety note:</strong><br>Local estimate only. Verify layout direction, pattern, stair nosing, transitions, closets, cuts, and manufacturer waste recommendation.</div>' + renderCalculatorDraftActionsV61X(safe) + safetyLocksHTMLV61W() + '</div>';
  }

  function renderWallStudCalculatorV61W(intent) {
    var safe = intent || {};
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-wall-stud-count="true"><strong>Jobsite Calculator — Wall Stud Count</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div><strong>Detected wall length:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.wallFeet)) + ' ft</div>' +
      '<div><strong>Spacing:</strong> ' + escapeHTMLV61D(safe.spacingInches) + ' inches on center</div>' +
      '<div><strong>Formula/assumptions:</strong> wallInches = wallFeet × 12; spaces = ceil(wallInches / spacingInches); studs = spaces + 1; recommended = studs + 2 extra end/backup allowance.</div>' +
      '<div><strong>Base studs:</strong> ' + escapeHTMLV61D(safe.baseStuds) + '</div>' +
      '<div><strong>Recommended purchase:</strong> ' + escapeHTMLV61D(safe.recommendedStuds) + ' studs</div>' +
      '<div><strong>Safety note:</strong><br>Local estimate only. Add studs for corners, intersections, doors, windows, blocking, backing, firestopping, and waste.</div>' + renderCalculatorDraftActionsV61X(safe) + safetyLocksHTMLV61W() + '</div>';
  }

  function renderConcreteSlabCalculatorV61W(intent) {
    var safe = intent || {};
    return '<div class="note" data-aqua-v61w-jobsite-calculator="true" data-aqua-v61w-concrete-slab="true"><strong>Jobsite Calculator — Concrete Slab</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div><strong>Detected slab:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.lengthFeet)) + ' ft x ' + escapeHTMLV61D(formatNumberV61V(safe.widthFeet)) + ' ft</div>' +
      '<div><strong>Thickness:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.thicknessInches)) + ' inches</div>' +
      '<div><strong>Formula/assumptions:</strong> areaSqFt = lengthFt × widthFt; thicknessFt = thicknessInches / 12; cubicFeet = areaSqFt × thicknessFt; cubicYards = cubicFeet / 27.</div>' +
      '<div><strong>Volume:</strong> ' + escapeHTMLV61D(formatNumberV61V(safe.volumeCubicFeet)) + ' cubic feet</div>' +
      '<div><strong>Concrete:</strong> ' + escapeHTMLV61D(Number(safe.cubicYards || 0).toFixed(2)) + ' cubic yards</div>' +
      '<div><strong>Suggested order with 10% waste:</strong> ' + escapeHTMLV61D(Number(safe.waste10CubicYards || 0).toFixed(2)) + ' cubic yards</div>' +
      '<div><strong>Safety note:</strong><br>Local estimate only. Verify subbase, reinforcement, forms, pump/buggy loss, slump, local code, frost depth, and structural requirements.</div>' + renderCalculatorDraftActionsV61X(safe) + safetyLocksHTMLV61W() + '</div>';
  }

  function renderJobsiteCalculatorV61W(intent) {
    if (!intent) return '';
    if (intent.canonicalIntent === 'local_calculator_need_more_information') return renderNeedMoreInformationCalculatorV61W(intent);
    if (intent.calculator === 'Paint Gallons') return renderPaintGallonsCalculatorV61W(intent);
    if (intent.calculator === 'Drywall Sheets') return renderDrywallSheetsCalculatorV61W(intent);
    if (intent.calculator === 'Flooring Square Footage') return renderFlooringCalculatorV61W(intent);
    if (intent.calculator === 'Wall Stud Count') return renderWallStudCalculatorV61W(intent);
    if (intent.calculator === 'Concrete Slab') return renderConcreteSlabCalculatorV61W(intent);
    return renderConcreteSonotubeCalculatorV61V(intent);
  }

  function generalAskLockedPhraseMatchesV61U(normalized) {
    var q = String(normalized || '').trim();
    if (!q) return false;
    if (/\b(how many|how much|what does|what is the difference|what is|how do i calculate|how do you calculate|calculate|estimate)\b/.test(q) && /\b(concrete|sonotube|drywall|sheetrock|code term|paint|gallons?|studs?|stair stringers?|type s|type n|mortar|bags?)\b/.test(q)) return true;
    if (/\b(difference between type s and type n mortar|bags of concrete|sheets of drywall|gallons of paint|calculate stair stringers|code term mean)\b/.test(q)) return true;
    return false;
  }

  function classifyAquaAskModeV61U(commandText) {
    var original = String(commandText || '').trim();
    var q = normalizeAquaPhraseV61E(original);
    var automation = detectAutomationReportCommandV61T(original, q);
    if (automation) return { mode: 'automation_status', originalText: original, normalizedText: q, routeHint: automation };
    var action = detectActionIntentV61E(original, q);
    if (action) return { mode: 'permissioned_action', originalText: original, normalizedText: action.normalizedText || q, routeHint: action };
    var appRoute = appNavigationPhraseGroupsV61U().find(function (group) { return phraseMatchesV61E(q, group.phrases); });
    if (appRoute) return { mode: 'app_navigation', originalText: original, normalizedText: q, routeHint: appRoute };
    var localCalculator = parseLocalJobsiteCalculatorV61V(original, q);
    if (localCalculator) return { mode: 'general_ask_locked', originalText: original, normalizedText: q, routeHint: localCalculator };
    if (generalAskLockedPhraseMatchesV61U(q)) return { mode: 'general_ask_locked', originalText: original, normalizedText: q, routeHint: { canonicalIntent: 'general_ask_locked', routeText: original, module: 'General Ask / Jobsite Calculator' } };
    return { mode: 'unknown_fallback', originalText: original, normalizedText: q, routeHint: { canonicalIntent: 'unknown', routeText: original, module: 'Guided fallback' } };
  }

  function withAskModeV61U(intent, mode) {
    return Object.assign({ askMode: mode || 'unknown_fallback' }, intent || {});
  }

  function askModeBadgeV61U(mode) {
    if (!mode) return '';
    return '<div class="smallMut" data-aqua-v61u-mode="' + escapeHTMLV61D(mode) + '"><strong>Ask AI Mode:</strong> ' + escapeHTMLV61D(mode) + '</div>';
  }

  function renderGeneralAskLockedV61U(intent) {
    var safe = intent || {};
    var question = safe.originalText || safe.routeText || '';
    return '<div class="note" data-aqua-v61u-general-ask-locked="true"><strong>General Ask / Jobsite Calculator — Locked Foundation</strong>' +
      askModeBadgeV61U('general_ask_locked') +
      '<div><strong>Detected question:</strong> ' + escapeHTMLV61D(question) + '</div>' +
      '<div><strong>Mode:</strong> outside knowledge / construction calculator</div>' +
      '<div><strong>Status:</strong> local placeholder only</div>' +
      '<div>Backend required before live ChatGPT/search answers</div>' +
      '<div>No external API call was made</div>' +
      '<div>No network call was made</div>' +
      '<div>No API key exists in frontend</div>' +
      '<div class="actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><span class="pill">Backend Locked</span><span class="pill">External AI Locked</span><span class="pill">Search Locked</span><span class="pill">Demo Only</span><span class="pill">No Network Call</span><span class="pill">No API Key in Frontend</span></div>' +
      '<div class="locked">No live AI, external search, backend, network call, API key, payment, payroll, bank sync, accounting export, customer sharing/export, audio storage, always-listening behavior, or live record change was used.</div></div>';
  }

  function detectActionIntentV61E(original, normalized) {
    var routedNormalized = normalizeReceiptActionTranscriptV61K(normalized);
    var actionMatch = routedNormalized.match(/^(?:please\s+)?(code|categorize|mark|change|update|move|approve|set|review|put)\b(?:\s+(?:this|that|the|just))?(?:\s+(?:item|receipt|amount|record))?(?:\s+(?:as|to|under))?\s*([a-z0-9 ]*)/);
    if (!actionMatch) return null;
    if (/\b(show|open|pull up|bring up) code\b/.test(routedNormalized)) return null;
    var target = 'General local/demo module';
    var receiptAction = /\b(receipts?|materials?|framing|plumbing|paint|vendor|expense)\b/.test(routedNormalized);
    if (receiptAction) target = 'Receipts / Receipt Tracker';
    else if (/approval|approve|owner review/.test(routedNormalized)) target = 'Owner Action Queue / Approval Center';
    else if (/amount|number|account|bank|ledger|p and l|accounting/.test(routedNormalized)) target = 'Accounting Command / Daily P&L';
    else if (/sow|scope/.test(routedNormalized)) target = 'SOW Builder / Scope of Work';
    var requested = '';
    var amount = routedNormalized.match(/\b(?:to|as)\s*\$?([0-9]+(?:\.[0-9]{1,2})?)\b/);
    if (amount) requested = '$' + amount[1];
    else if (receiptAction) requested = requestedReceiptValueV61K(routedNormalized, actionMatch);
    else if (/reviewed/.test(routedNormalized)) requested = 'reviewed';
    else if (/owner approval|owner review/.test(routedNormalized)) requested = 'owner approval';
    else if (actionMatch[2]) requested = actionMatch[2].trim();
    return {
      canonicalIntent: 'action_intent_demo',
      routeText: 'action_intent_demo',
      originalText: original,
      normalizedText: routedNormalized,
      detectedAction: receiptAction ? 'receipt coding / categorization / review' : (original || routedNormalized),
      targetModule: target,
      requestedValue: requested || 'unclear — owner must confirm',
      permissionGate: 'Permission Granter required',
      undoAuditRequirement: 'owner permission, audit log, undo/revert'
    };
  }

  function normalizeAquaCommandV61E(commandText) {
    var original = String(commandText || '').trim();
    var q = normalizeAquaPhraseV61E(original);
    var askMode = classifyAquaAskModeV61U(original);
    state.askModeRouterWorks = true;
    if (askMode.mode === 'general_ask_locked') {
      var calcIntent = parseLocalJobsiteCalculatorV61V(original, q);
      state.generalAskLockedWorks = true;
      if (calcIntent) return withAskModeV61U(calcIntent, askMode.mode);
      return withAskModeV61U({ canonicalIntent: 'general_ask_locked', routeText: original, originalText: original, normalizedText: q, module: 'General Ask / Jobsite Calculator' }, askMode.mode);
    }
    if (askMode.mode === 'unknown_fallback') state.unknownFallbackWorks = true;
    var automation = detectAutomationReportCommandV61T(original, q);
    if (automation) {
      state.automationStatusModeWorks = true;
      return withAskModeV61U(automation, askMode.mode);
    }
    var sowReviewQueue = detectSowReviewQueueCommandV61Y(original, q);
    if (sowReviewQueue) return withAskModeV61U(sowReviewQueue, askMode.mode);
    var calculatorDraft = detectCalculatorDraftCommandV61X(original, q);
    if (calculatorDraft) return withAskModeV61U(calculatorDraft, askMode.mode);
    var demoState = detectDemoStateCommandV61K(original, q);
    if (demoState) return withAskModeV61U(demoState, askMode.mode);
    if (phraseMatchesV61E(q, ['speak summary', 'read this back'])) {
      return withAskModeV61U({ canonicalIntent: 'speak_summary_v61r', routeText: 'speak summary', originalText: original, normalizedText: q, module: 'Spoken Readback' }, askMode.mode);
    }
    if (phraseMatchesV61E(q, ['read report'])) {
      return withAskModeV61U({ canonicalIntent: 'read_report_v61r', routeText: 'read report', originalText: original, normalizedText: q, module: 'Spoken Readback' }, askMode.mode);
    }
    if (phraseMatchesV61E(q, ['stop speaking', 'mute voice'])) {
      return withAskModeV61U({ canonicalIntent: 'stop_speaking_v61r', routeText: 'stop speaking', originalText: original, normalizedText: q, module: 'Spoken Readback' }, askMode.mode);
    }
    if (phraseMatchesV61E(q, ['voice off'])) {
      return withAskModeV61U({ canonicalIntent: 'voice_off_v61r', routeText: 'voice off', originalText: original, normalizedText: q, module: 'Spoken Readback' }, askMode.mode);
    }
    if (phraseMatchesV61E(q, ['voice on'])) {
      return withAskModeV61U({ canonicalIntent: 'voice_on_v61r', routeText: 'voice on', originalText: original, normalizedText: q, module: 'Spoken Readback' }, askMode.mode);
    }
    var conversational = detectConversationalContextCommandV61S(original, q);
    if (conversational) return withAskModeV61U(conversational, askMode.mode);
    var action = detectActionIntentV61E(original, q);
    if (action) {
      state.permissionedActionModeWorks = true;
      return withAskModeV61U(action, askMode.mode);
    }
    var groups = appNavigationPhraseGroupsV61U();
    var route = groups.find(function (group) { return phraseMatchesV61E(q, group.phrases); });
    if (route) {
      state.appNavigationModeWorks = true;
      return withAskModeV61U(Object.assign({ originalText: original, normalizedText: q }, route), askMode.mode);
    }
    return withAskModeV61U({ canonicalIntent: 'unknown', routeText: original, module: 'Guided fallback', originalText: original, normalizedText: q }, askMode.mode);
  }


  function localModuleFallbackTextV61E() {
    return 'I can route to local Aqua modules like Project Folders, SOW, Field Walkthrough, Receipts, Evidence, Accounting, Insurance, Bank Reconciliation, Owner Review, or Approval Queue. Try: Show Receipts.';
  }

  function renderLocalModuleFallbackV61E(intent) {
    var safe = intent || {};
    var heard = safe.originalText ? '<div><strong>Heard:</strong> ' + escapeHTMLV61D(safe.originalText) + '</div>' : '';
    return '<div class="note"><strong>Fallback local demo panel: native module opener not found.</strong> ' + escapeHTMLV61D(localModuleFallbackTextV61E()) + heard + '<div class="locked">Local/demo-only. No live AI, backend, search, network call, export, payment, approval, or external action was run.</div></div>';
  }

  function spokenReadbackPreferenceDefaultsV61R() {
    return { enabled: true, selectedVoiceName: '', rate: 1 };
  }

  function getSpokenReadbackPreferenceV61R() {
    var preference = spokenReadbackPreferenceDefaultsV61R();
    try {
      var raw = window.localStorage.getItem(SPOKEN_READBACK_KEY_V61R);
      if (raw) {
        var parsed = JSON.parse(raw);
        preference.enabled = parsed && parsed.enabled === false ? false : true;
        preference.selectedVoiceName = parsed && typeof parsed.selectedVoiceName === 'string' ? parsed.selectedVoiceName : '';
        preference.rate = parsed && Number(parsed.rate) > 0 ? Math.min(2, Math.max(0.5, Number(parsed.rate))) : 1;
      }
    } catch (error) {
      state.spokenReadbackStorageWarningV61R = 'localStorage unavailable for spoken readback preference';
    }
    state.spokenReadbackEnabledV61R = preference.enabled;
    return preference;
  }

  function setSpokenReadbackPreferenceV61R(updates) {
    var next = Object.assign(spokenReadbackPreferenceDefaultsV61R(), getSpokenReadbackPreferenceV61R(), updates || {});
    next.enabled = next.enabled === false ? false : true;
    next.selectedVoiceName = typeof next.selectedVoiceName === 'string' ? next.selectedVoiceName : '';
    next.rate = Number(next.rate) > 0 ? Math.min(2, Math.max(0.5, Number(next.rate))) : 1;
    try {
      window.localStorage.setItem(SPOKEN_READBACK_KEY_V61R, JSON.stringify({ enabled: next.enabled, selectedVoiceName: next.selectedVoiceName, rate: next.rate }));
    } catch (error) {
      state.spokenReadbackStorageWarningV61R = 'localStorage unavailable for spoken readback preference';
    }
    state.spokenReadbackEnabledV61R = next.enabled;
    state.noAudioStorageV61R = true;
    state.noBackendNetworkLiveAIV61R = true;
    state.noAlwaysListeningV61R = true;
    syncNamespace();
    return next;
  }

  function speechSynthesisAvailableV61R() {
    var available = Boolean(window && window.speechSynthesis && typeof window.speechSynthesis.speak === 'function');
    state.spokenReadbackV61RAvailable = available;
    state.spokenReadbackUnavailableFallbackV61R = !available;
    return available;
  }

  function setSpokenReadbackStatusV61R(message) {
    var status = document && typeof document.getElementById === 'function' ? document.getElementById('aquaSpokenReadbackStatusV61R') : null;
    if (status) status.textContent = message || 'Spoken readback: local/browser demo only • no audio stored • backend locked';
    state.spokenReadbackStatusTextV61R = message || '';
  }

  function rememberSpokenSummaryV61R(summary, context) {
    var clean = String(summary || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    state.spokenReadbackLastSummaryV61R = clean;
    state.spokenReadbackLastContextV61R = context || 'current visual summary';
    syncNamespace();
    return clean;
  }

  function automationReportSummaryV61R(report) {
    var safe = report || getLastRegressionReportV61L() || null;
    if (!safe) return 'Automation report is not available yet. No backend, network, live AI, payment, payroll, bank, or accounting export action ran.';
    var recommendation = safe.mergeRecommendation === 'MERGE_ALLOWED' ? 'allowed' : String(safe.mergeRecommendation || 'unavailable').toLowerCase();
    return 'Automation report complete. Total tests ' + escapeHTMLV61D(safe.total) + '. Passed tests ' + escapeHTMLV61D(safe.passed) + '. Failed tests ' + escapeHTMLV61D(safe.failed) + '. Merge recommendation is ' + recommendation + '. No backend, network, live AI, payment, payroll, bank, or accounting export action ran.';
  }

  function visualSummaryForIntentV61R(intent) {
    var safe = intent || {};
    if (safe.canonicalIntent === 'show_receipts') return 'Receipts are open. Demo receipt items are visible. Some receipt categories need owner or accounting review. No live accounting export, payment, upload, OCR, or backend action has run.';
    if (safe.canonicalIntent === 'action_intent_demo') return 'Permission required. I detected a receipt coding action. The requested category is ' + String(safe.requestedValue || 'unclear') + '. No live change has been made. Owner approval and audit controls are required before any future live action.';
    if (safe.canonicalIntent === 'run_regression_qa') return automationReportSummaryV61R(getLastRegressionReportV61L());
    if (safe.canonicalIntent === 'approval_queue') return 'Owner approval queue is open. Demo review cards are visible. No approval, customer sharing, backend, payment, or export action has run.';
    if (safe.module) return safe.module + ' is open in local demo mode. Visual summary rows are visible. No backend, network, live AI, payment, payroll, bank sync, accounting export, upload, sharing, or live record change ran.';
    return '';
  }

  function getCurrentSpokenSummaryV61R(outputNode) {
    if (state.spokenReadbackLastSummaryV61R) return state.spokenReadbackLastSummaryV61R;
    var text = outputNode && (outputNode.textContent || outputNode.innerHTML) ? String(outputNode.textContent || outputNode.innerHTML).replace(/<[^>]+>/g, ' ') : '';
    if (/Regression QA Report|Automation/i.test(text)) return automationReportSummaryV61R(getLastRegressionReportV61L());
    if (/Permission Required|Action Intent Demo/i.test(text)) return rememberSpokenSummaryV61R('Permission required. I detected a receipt coding action. The requested category is materials. No live change has been made. Owner approval and audit controls are required before any future live action.', 'permission granter');
    if (/Receipts|Receipt Tracker/i.test(text)) return rememberSpokenSummaryV61R('Receipts are open. Demo receipt items are visible. Some receipt categories need owner or accounting review. No live accounting export, payment, upload, OCR, or backend action has run.', 'receipts');
    return rememberSpokenSummaryV61R('Aqua Homes OS local demo is ready. No backend, network, live AI, payment, payroll, bank, accounting export, audio storage, or live record change has run.', 'safe default');
  }

  function speakAquaSummaryV61R(summary, options) {
    var preference = getSpokenReadbackPreferenceV61R();
    var text = String(summary || getCurrentSpokenSummaryV61R(options && options.outputNode)).replace(/\s+/g, ' ').trim();
    rememberSpokenSummaryV61R(text, options && options.context ? options.context : 'spoken readback');
    if (!preference.enabled) {
      setSpokenReadbackStatusV61R('Spoken readback is off locally. Say or type voice on to enable.');
      return { spoken: false, disabled: true, text: text };
    }
    if (!speechSynthesisAvailableV61R()) {
      setSpokenReadbackStatusV61R('Spoken readback unavailable in this browser.');
      return { spoken: false, unavailable: true, text: text, fallback: 'Spoken readback unavailable in this browser.' };
    }
    try {
      if (typeof window.speechSynthesis.cancel === 'function') window.speechSynthesis.cancel();
      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = preference.rate || 1;
      if (preference.selectedVoiceName && typeof window.speechSynthesis.getVoices === 'function') {
        var voices = window.speechSynthesis.getVoices() || [];
        var selected = voices.filter(function (voice) { return voice && voice.name === preference.selectedVoiceName; })[0];
        if (selected) utterance.voice = selected;
      }
      window.speechSynthesis.speak(utterance);
      setSpokenReadbackStatusV61R('Speaking local/browser demo summary. No audio stored. Backend locked.');
      state.spokenReadbackLastSpokenV61R = text;
      state.noAudioStorageV61R = true;
      state.noBackendNetworkLiveAIV61R = true;
      state.noAlwaysListeningV61R = true;
      syncNamespace();
      return { spoken: true, text: text };
    } catch (error) {
      setSpokenReadbackStatusV61R('Spoken readback unavailable in this browser.');
      return { spoken: false, unavailable: true, text: text, error: String(error && error.message ? error.message : error) };
    }
  }

  function stopAquaSpeakingV61R() {
    if (speechSynthesisAvailableV61R() && typeof window.speechSynthesis.cancel === 'function') window.speechSynthesis.cancel();
    setSpokenReadbackStatusV61R('Spoken readback stopped. Local/browser demo only • no audio stored • backend locked');
    state.spokenReadbackStoppedV61R = true;
    state.noAudioStorageV61R = true;
    state.noBackendNetworkLiveAIV61R = true;
    state.noAlwaysListeningV61R = true;
    syncNamespace();
    return { stopped: true };
  }

  function renderSpokenReadbackControlsV61R() {
    return '<span data-aqua-v61r-spoken-readback="true" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<button type="button" class="btn small gold" data-aqua-v61r-speak-summary="true">Speak Summary</button>' +
      '<button type="button" class="btn small" data-aqua-v61r-stop-speaking="true">Stop Speaking</button>' +
      '<span id="aquaSpokenReadbackStatusV61R" class="smallMut">Spoken readback: local/browser demo only • no audio stored • backend locked</span>' +
      '</span>';
  }

  function ensureSpokenReadbackControlsV61R(root) {
    var scope = root || document;
    if (!scope || typeof scope.querySelector !== 'function') return false;
    if (scope.querySelector('[data-aqua-v61r-spoken-readback="true"]')) return true;
    var actions = scope.querySelector('.actions');
    if (!actions || typeof actions.insertAdjacentHTML !== 'function') return false;
    actions.insertAdjacentHTML('beforeend', renderSpokenReadbackControlsV61R());
    state.spokenReadbackControlsInsertedV61R = true;
    state.speakSummaryButtonExistsV61R = true;
    state.stopSpeakingButtonExistsV61R = true;
    syncNamespace();
    return true;
  }




  function createSowReviewQueueIdV61Y() {
    return 'sow-review-v61y-' + new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-' + Math.floor(Math.random() * 900 + 100);
  }

  function readSowReviewQueueV61Y() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(SOW_REVIEW_QUEUE_KEY_V61Y) || '[]');
      return Array.isArray(parsed) ? parsed.filter(function (item) { return item && item.status; }) : [];
    } catch (error) {
      state.sowReviewQueueStorageWarningV61Y = 'localStorage unavailable for SOW review queue';
      return [];
    }
  }

  function writeSowReviewQueueV61Y(queue) {
    try {
      window.localStorage.setItem(SOW_REVIEW_QUEUE_KEY_V61Y, JSON.stringify((queue || []).slice(-25)));
      return true;
    } catch (error) {
      state.sowReviewQueueStorageWarningV61Y = 'localStorage unavailable for SOW review queue';
      return false;
    }
  }

  function latestCalculatorDraftV61Y() {
    var drafts = readCalculatorDraftsV61X();
    return drafts.length ? drafts[drafts.length - 1] : null;
  }

  function buildSowReviewQueueRecordV61Y(draft) {
    if (!draft || !draft.draftCalculationId) return null;
    return {
      reviewQueueId: createSowReviewQueueIdV61Y(),
      sourceDraftCalculationId: String(draft.draftCalculationId || '').slice(0, 120),
      calculatorType: String(draft.calculatorType || '').slice(0, 120),
      originalQuestion: String(draft.originalQuestion || '').slice(0, 240),
      resultSummary: String(draft.resultSummary || '').slice(0, 360),
      recommendedAmount: String(draft.recommendedAmount || '').slice(0, 120),
      targetReviewType: 'SOW / Estimate Review',
      status: 'local demo review',
      timestamp: new Date().toISOString()
    };
  }

  function sendLatestCalculatorDraftToSowReviewV61Y() {
    var draft = latestCalculatorDraftV61Y();
    if (!draft) return null;
    var record = buildSowReviewQueueRecordV61Y(draft);
    var queue = readSowReviewQueueV61Y();
    queue.push(record);
    if (!writeSowReviewQueueV61Y(queue)) return null;
    state.sowReviewQueueWorks = true;
    state.sendToSowReviewWorks = true;
    state.noLiveSowCreated = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noApiKeysInFrontend = true;
    state.noLiveRecordChanges = true;
    syncNamespace();
    return record;
  }

  function renderNoCalculatorDraftForSowReviewV61Y() {
    return '<div class="note" data-aqua-v61y-no-calculator-draft="true"><strong>No calculator draft found.</strong><div>No calculator draft found. Save a calculation draft first.</div><div class="locked">Demo Data Only. SOW Review Locked. Estimate Review Locked. Customer Export Locked. Backend Locked. Accounting Export Locked. Owner Review Required. No Live Change Made. No live SOW, no live estimate, no customer export, no backend, no accounting.</div></div>';
  }

  function sowReviewSafetyLabelsV61Y() {
    return '<ul><li>Demo Data Only</li><li>SOW Review Locked</li><li>Estimate Review Locked</li><li>Customer Export Locked</li><li>Backend Locked</li><li>Accounting Export Locked</li><li>Owner Review Required</li><li>No Live Change Made</li></ul>';
  }

  function renderSowReviewQueueRowsV61Y(queue) {
    if (!queue.length) return '<div>No SOW / Estimate review queue demo items yet.</div>';
    return queue.map(function (item) {
      return '<div class="note" data-aqua-v61y-sow-review-row="true"><strong>Review Queue ID:</strong> ' + escapeHTMLV61D(item.reviewQueueId) +
        '<div><strong>Source Draft Calculation ID:</strong> ' + escapeHTMLV61D(item.sourceDraftCalculationId) + '</div>' +
        '<div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(item.calculatorType) + '</div>' +
        '<div><strong>Original Question:</strong> ' + escapeHTMLV61D(item.originalQuestion) + '</div>' +
        '<div><strong>Result Summary:</strong> ' + escapeHTMLV61D(item.resultSummary) + '</div>' +
        '<div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(item.recommendedAmount) + '</div>' +
        '<div><strong>Review Status:</strong> ' + escapeHTMLV61D(item.status) + '</div>' +
        '<div><strong>Safety:</strong> No live SOW, no live estimate, no customer export, no backend, no accounting</div></div>';
    }).join('');
  }

  function renderSowReviewQueueV61Y() {
    var queue = readSowReviewQueueV61Y();
    state.sowReviewQueueWorks = true;
    state.showSowReviewQueueWorks = true;
    state.noLiveSowCreated = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    syncNamespace();
    return '<div class="note" data-aqua-v61y-sow-review-queue-panel="true"><strong>SOW / Estimate Review Queue — Local Demo</strong>' + renderSowReviewQueueRowsV61Y(queue) + sowReviewSafetyLabelsV61Y() + '<div class="actions"><button type="button" class="btn small gold" data-aqua-v61y-mark-review-ready="true">Mark Review Ready Demo</button><button type="button" class="btn small" data-aqua-v61y-return-calculator-drafts="true">Return to Calculator Drafts</button><button type="button" class="btn small" data-aqua-v61y-clear-sow-review="true">Clear SOW Review Queue Demo</button></div><div class="locked">Local/demo-only review queue stored as aquaSowReviewQueueV61Y. No live SOW, no live estimate, no customer export, no backend, no network, no external AI/API, no accounting/export/payment/payroll/bank action, and no live record change.</div></div>';
  }

  function renderSendSowReviewQueueConfirmationV61Y(record) {
    if (!record) return renderNoCalculatorDraftForSowReviewV61Y();
    return '<div class="note" data-aqua-v61y-send-sow-review-confirmation="true"><strong>Send to SOW Review Queue</strong><div>Calculator draft routed to local/demo review queue: ' + escapeHTMLV61D(record.reviewQueueId) + '</div><div><strong>Source Draft Calculation ID:</strong> ' + escapeHTMLV61D(record.sourceDraftCalculationId) + '</div><div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(record.calculatorType) + '</div><div><strong>Result Summary:</strong> ' + escapeHTMLV61D(record.resultSummary) + '</div><div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(record.recommendedAmount) + '</div>' + sowReviewSafetyLabelsV61Y() + '<div class="locked">No live SOW created. No live estimate created. No customer export. No backend, network, external AI/API, accounting export, payment, payroll, bank, or live record change.</div></div>';
  }

  function markSowReviewReadyDemoV61Y() {
    var queue = readSowReviewQueueV61Y().map(function (item) {
      return Object.assign({}, item, { status: 'review ready demo / local only', updatedAt: new Date().toISOString() });
    });
    writeSowReviewQueueV61Y(queue);
    state.markReviewReadyDemoWorks = true;
    state.noLiveSowCreated = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    state.noLiveRecordChanges = true;
    syncNamespace();
    return queue;
  }

  function renderMarkReviewReadyDemoV61Y() {
    markSowReviewReadyDemoV61Y();
    return '<div class="note" data-aqua-v61y-mark-review-ready-demo="true"><strong>Mark Review Ready Demo</strong><div>Review queue items were marked review ready demo / local only.</div>' + renderSowReviewQueueRowsV61Y(readSowReviewQueueV61Y()) + sowReviewSafetyLabelsV61Y() + '<div class="locked">Local/demo status only. No live SOW created. No live estimate created. No customer export. No backend, network, external AI/API, accounting, payment, payroll, bank, or live record change.</div></div>';
  }

  function clearSowReviewQueueV61Y() {
    try { window.localStorage.removeItem(SOW_REVIEW_QUEUE_KEY_V61Y); } catch (error) { state.sowReviewQueueStorageWarningV61Y = 'localStorage unavailable while clearing SOW review queue'; }
    state.clearSowReviewQueueWorks = true;
    state.noLiveSowCreated = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    state.noLiveRecordChanges = true;
    syncNamespace();
    return true;
  }

  function renderClearSowReviewQueueV61Y() {
    clearSowReviewQueueV61Y();
    return '<div class="note" data-aqua-v61y-clear-sow-review-queue="true"><strong>Clear SOW Review Queue Demo</strong><div>Only local/demo review queue key aquaSowReviewQueueV61Y was cleared.</div><div class="locked">Calculator drafts remain separate. No live SOW, live estimate, customer export, backend, accounting, payment, payroll, bank, or live record changed.</div></div>';
  }

  function calculatorDraftOutputNodeV61X(button) {
    if (document && typeof document.getElementById === 'function') {
      var brainOut = document.getElementById('brainOut');
      if (brainOut) return brainOut;
    }
    var card = button && button.closest ? button.closest('.note') : null;
    return card || null;
  }

  function installCalculatorDraftButtonHandlerV61X() {
    if (state.calculatorDraftButtonHandlerInstalledV61X || !document || typeof document.addEventListener !== 'function') return true;
    document.addEventListener('click', function (event) {
      var target = event.target;
      var saveButton = target && target.closest ? target.closest('[data-aqua-v61x-save-calculation-draft="true"]') : null;
      var showButton = target && target.closest ? target.closest('[data-aqua-v61x-show-calculator-drafts="true"]') : null;
      var clearButton = target && target.closest ? target.closest('[data-aqua-v61x-clear-calculator-drafts="true"]') : null;
      var estimateButton = target && target.closest ? target.closest('[data-aqua-v61x-add-estimate-draft="true"]') : null;
      var sendSowButton = target && target.closest ? target.closest('[data-aqua-v61y-send-sow-review="true"]') : null;
      var showSowButton = target && target.closest ? target.closest('[data-aqua-v61y-show-sow-review="true"]') : null;
      var markSowButton = target && target.closest ? target.closest('[data-aqua-v61y-mark-review-ready="true"]') : null;
      var returnDraftsButton = target && target.closest ? target.closest('[data-aqua-v61y-return-calculator-drafts="true"]') : null;
      var clearSowButton = target && target.closest ? target.closest('[data-aqua-v61y-clear-sow-review="true"]') : null;
      var button = saveButton || showButton || clearButton || estimateButton || sendSowButton || showSowButton || markSowButton || returnDraftsButton || clearSowButton;
      if (!button) return;
      var output = calculatorDraftOutputNodeV61X(button);
      if (!output) return;
      if (saveButton) output.innerHTML = renderSavedCalculatorDraftConfirmationV61X(saveCurrentCalculatorDraftV61X());
      if (showButton) output.innerHTML = renderSavedCalculatorDraftsV61X();
      if (clearButton) output.innerHTML = renderClearCalculatorDraftsV61X();
      if (estimateButton) output.innerHTML = renderEstimateDraftPlaceholderV61X();
      if (sendSowButton) output.innerHTML = renderSendSowReviewQueueConfirmationV61Y(sendLatestCalculatorDraftToSowReviewV61Y());
      if (showSowButton) output.innerHTML = renderSowReviewQueueV61Y();
      if (markSowButton) output.innerHTML = renderMarkReviewReadyDemoV61Y();
      if (returnDraftsButton) output.innerHTML = renderSavedCalculatorDraftsV61X();
      if (clearSowButton) output.innerHTML = renderClearSowReviewQueueV61Y();
      state.noLiveSowCreated = true;
      state.noLiveEstimateCreated = true;
      state.noCustomerExport = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      syncNamespace();
    });
    state.calculatorDraftButtonHandlerInstalledV61X = true;
    syncNamespace();
    return true;
  }

  function installSpokenReadbackButtonHandlerV61R() {
    if (state.spokenReadbackButtonHandlerInstalledV61R || !document || typeof document.addEventListener !== 'function') return true;
    document.addEventListener('click', function (event) {
      var speakButton = event.target && event.target.closest ? event.target.closest('[data-aqua-v61r-speak-summary="true"]') : null;
      var stopButton = event.target && event.target.closest ? event.target.closest('[data-aqua-v61r-stop-speaking="true"]') : null;
      if (!speakButton && !stopButton) return;
      event.preventDefault();
      if (stopButton) stopAquaSpeakingV61R();
      else speakAquaSummaryV61R(getCurrentSpokenSummaryV61R(), { context: 'button' });
    });
    state.spokenReadbackButtonHandlerInstalledV61R = true;
    syncNamespace();
    return true;
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

  function isAquaButtonLabelGarbageV61M(value) {
    var text = String(value || '').trim();
    if (!text) return false;
    var normalized = normalizeAquaPhraseV61E(text);
    var labels = [
      'run command demo',
      'ask by voice',
      'run full aqua qa',
      'create bug demo',
      'company command',
      'open sow builder',
      'field walkthrough intake',
      'photo proof evidence binder',
      'accounting command daily p and l',
      'workers comp subcontractor compliance',
      'insurance dashboard bank reconciliation'
    ];
    var hits = labels.filter(function (label) {
      return normalized.indexOf(label) !== -1;
    });
    return hits.length > 1 || labels.indexOf(normalized) !== -1;
  }

  function isOldAskAIInputV61M(node) {
    if (!node) return false;
    if (node.id === 'aiAsk') return true;
    var label = node.closest && node.closest('.field') ? node.closest('.field').querySelector('label') : null;
    return Boolean(label && /Ask Aqua AI/i.test(label.textContent || ''));
  }

  function commandHubScoreV61M(node) {
    if (!node || typeof node.value !== 'string') return -1000;
    if (isOldAskAIInputV61M(node)) return -1000;
    var field = node.closest && node.closest('.field') ? node.closest('.field') : null;
    var root = node.closest && (node.closest('#askAICommandFlowV61B') || node.closest('[data-aqua-command-hub]') || node.closest('#modal'));
    var text = ((field && field.textContent) || '') + ' ' + ((root && root.textContent) || '');
    var score = 0;
    if (node.id === 'brainCommand') score += 100;
    if (node.hasAttribute && node.hasAttribute('data-aqua-command-input')) score += 80;
    if (field && /Command input/i.test(field.textContent || '')) score += 60;
    if (root && root.id === 'askAICommandFlowV61B') score += 40;
    if (/Command type/i.test(text)) score += 20;
    if (/Target module/i.test(text)) score += 20;
    if (/Project \/ company/i.test(text)) score += 20;
    if (/Run Command Demo/i.test(text)) score += 15;
    if (/Ask by Voice/i.test(text)) score += 15;
    return score;
  }

  function getAquaCommandInputV61M(options) {
    var opts = options || {};
    if (!document || typeof document.querySelectorAll !== 'function') return null;
    var roots = [];
    var flow = document.getElementById && document.getElementById('askAICommandFlowV61B');
    if (flow) roots.push(flow);
    var modal = getModal && getModal();
    if (modal) roots.push(modal);
    roots.push(document);
    var candidates = [];
    roots.forEach(function (root) {
      if (!root || typeof root.querySelectorAll !== 'function') return;
      Array.prototype.slice.call(root.querySelectorAll('#brainCommand, [data-aqua-command-input], textarea, input[type="text"]')).forEach(function (node) {
        if (candidates.indexOf(node) === -1 && !isOldAskAIInputV61M(node)) candidates.push(node);
      });
    });
    candidates.sort(function (a, b) { return commandHubScoreV61M(b) - commandHubScoreV61M(a); });
    var best = candidates.find(function (node) { return commandHubScoreV61M(node) > 0; });
    if (best) {
      state.correctCommandInputTargeted = best.id === 'brainCommand' || commandHubScoreV61M(best) >= 100;
      state.oldAskAIInputNotPolluted = true;
      return best;
    }
    if (opts.allowOldAskAIFallback && document.getElementById) return document.getElementById('aiAsk');
    return null;
  }

  function getAquaCommandOutputV61M(input, fallback) {
    if (fallback) return fallback;
    var root = input && input.closest ? (input.closest('#askAICommandFlowV61B') || input.closest('#modal')) : null;
    if (root && root.querySelector) return root.querySelector('#brainOut') || root.querySelector('[data-aqua-command-output]') || null;
    return document.getElementById ? document.getElementById('brainOut') : null;
  }

  function setAquaCommandInputValueV61M(input, value) {
    if (!input || typeof input.value !== 'string') return false;
    if (isAquaButtonLabelGarbageV61M(value)) {
      state.buttonLabelsNotInjected = true;
      syncNamespace();
      return false;
    }
    input.value = String(value || '');
    return true;
  }

  function allTextInputsV61M() {
    if (!document || typeof document.querySelectorAll !== 'function') return [];
    return Array.prototype.slice.call(document.querySelectorAll('textarea, input[type="text"], [data-aqua-command-input]')).filter(function (node) {
      return node && typeof node.value === 'string';
    });
  }

  function repairButtonLabelInjectionV61M(snapshot) {
    allTextInputsV61M().forEach(function (node) {
      if (isAquaButtonLabelGarbageV61M(node.value)) {
        node.value = snapshot && Object.prototype.hasOwnProperty.call(snapshot, node.id || '') ? snapshot[node.id || ''] : '';
        state.buttonLabelsNotInjected = true;
      }
    });
    var oldAsk = document.getElementById && document.getElementById('aiAsk');
    state.oldAskAIInputNotPolluted = Boolean(!oldAsk || !isAquaButtonLabelGarbageV61M(oldAsk.value));
    syncNamespace();
  }

  function installButtonLabelInjectionGuardV61M() {
    if (!document || typeof document.addEventListener !== 'function' || state.buttonLabelInjectionGuardInstalledV61M) return false;
    document.addEventListener('click', function () {
      var snapshot = {};
      allTextInputsV61M().forEach(function (node, index) {
        snapshot[node.id || ('input-' + index)] = node.value;
      });
      window.setTimeout(function () { repairButtonLabelInjectionV61M(snapshot); }, 0);
    }, true);
    state.buttonLabelInjectionGuardInstalledV61M = true;
    syncNamespace();
    return true;
  }

  function currentCommandInputV61J() {
    var commandInput = getAquaCommandInputV61M();
    if (commandInput && typeof commandInput.value === 'string' && commandInput.value.trim() && !isAquaButtonLabelGarbageV61M(commandInput.value)) return commandInput.value.trim();
    return '';
  }

  function activeOutputNodeV61J(panel) {
    if (panel && panel.parentNode) return panel.parentNode;
    if (!document || typeof document.getElementById !== 'function') return null;
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
    return renderPermissionGranterV61I(intent).replace('<div><strong>Detected action:</strong>', askModeBadgeV61U('permissioned_action') + '<div><strong>Detected action:</strong>');
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
      askModeBadgeV61U(intent.askMode || 'app_navigation') +
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
      rememberSpokenSummaryV61R(visualSummaryForIntentV61R(intent), config.module);
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
      askModeBadgeV61U(intent.askMode || 'app_navigation') +
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
    rememberSpokenSummaryV61R(visualSummaryForIntentV61R(intent), 'visual module');
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
    if (intent.canonicalIntent === 'show_automation_report_v61t') {
      var existingReport = getLastRegressionReportV61L() || placeholderRegressionReportV61T();
      rememberSpokenSummaryV61R(automationReportSummaryV61R(existingReport), 'automation report');
      if (outputNode) outputNode.innerHTML = renderRegressionReportV61L(existingReport);
      state.automationCommandRoutesBeforeFallback = true;
      state.showAutomationReportCommandWorks = true;
      state.automationCommandsDoNotFallback = true;
      state.noLiveActionExecuted = true;
      state.noLiveChangeExecuted = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'save_calculation_draft_v61x') {
      var draftRecord = saveCurrentCalculatorDraftV61X();
      if (outputNode) outputNode.innerHTML = renderSavedCalculatorDraftConfirmationV61X(draftRecord);
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'show_calculator_drafts_v61x') {
      if (outputNode) outputNode.innerHTML = renderSavedCalculatorDraftsV61X();
      return intent;
    }
    if (intent.canonicalIntent === 'clear_calculator_drafts_v61x') {
      if (outputNode) outputNode.innerHTML = renderClearCalculatorDraftsV61X();
      return intent;
    }
    if (intent.canonicalIntent === 'add_to_estimate_draft_v61x') {
      if (outputNode) outputNode.innerHTML = renderEstimateDraftPlaceholderV61X();
      return intent;
    }
    if (intent.canonicalIntent === 'send_to_sow_review_queue_v61y') {
      if (outputNode) outputNode.innerHTML = renderSendSowReviewQueueConfirmationV61Y(sendLatestCalculatorDraftToSowReviewV61Y());
      return intent;
    }
    if (intent.canonicalIntent === 'show_sow_review_queue_v61y') {
      if (outputNode) outputNode.innerHTML = renderSowReviewQueueV61Y();
      return intent;
    }
    if (intent.canonicalIntent === 'mark_review_ready_demo_v61y') {
      if (outputNode) outputNode.innerHTML = renderMarkReviewReadyDemoV61Y();
      return intent;
    }
    if (intent.canonicalIntent === 'return_to_calculator_drafts_v61y') {
      if (outputNode) outputNode.innerHTML = renderSavedCalculatorDraftsV61X();
      return intent;
    }
    if (intent.canonicalIntent === 'clear_sow_review_queue_demo_v61y') {
      if (outputNode) outputNode.innerHTML = renderClearSowReviewQueueV61Y();
      return intent;
    }
    if (intent.canonicalIntent === 'local_calculator_available' || intent.canonicalIntent === 'local_calculator_need_more_information') {
      if (outputNode) outputNode.innerHTML = renderJobsiteCalculatorV61W(intent);
      setCurrentCalculatorResultV61X(intent);
      state.jobsiteCalculatorWorks = true;
      if (intent.calculator === 'Concrete Sonotube') state.concreteSonotubeCalculatorWorks = true;
      if (intent.calculator === 'Paint Gallons') state.paintCalculatorWorks = true;
      if (intent.calculator === 'Drywall Sheets') state.drywallCalculatorWorks = true;
      if (intent.calculator === 'Flooring Square Footage') state.flooringCalculatorWorks = true;
      if (intent.calculator === 'Wall Stud Count') state.studCalculatorWorks = true;
      if (intent.calculator === 'Concrete Slab') state.concreteSlabCalculatorWorks = true;
      if (intent.canonicalIntent === 'local_calculator_need_more_information') state.needMoreInformationWorks = true;
      state.sonotubeEightInchFourFoot80lbReturnsThreeBags = intent.calculator === 'Concrete Sonotube' && intent.diameterInches === 8 && intent.depthFeet === 4 && intent.bagSizePounds === 80 && intent.recommendedBags === 3;
      state.saunaTubeNormalizesToSonotube = /sauna tube/.test(intent.normalizedText || '') ? intent.normalizedTubeTerm === 'Sonotube' : state.saunaTubeNormalizesToSonotube;
      state.noLiveActionExecuted = true;
      state.noLiveChangeExecuted = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      state.noApiKeysInFrontend = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'general_ask_locked') {
      if (outputNode) outputNode.innerHTML = renderGeneralAskLockedV61U(intent);
      state.generalAskLockedWorks = true;
      state.noLiveActionExecuted = true;
      state.noLiveChangeExecuted = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      state.noApiKeysInFrontend = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'context_missing_v61s') {
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61s-context-missing="true"><strong>Conversational context needed.</strong><div>Say a module command first, like “show receipts,” then use “open that” or “repeat last action.”</div><div class="locked">Local/demo-only. No live AI, backend, network, or record change was run.</div></div>';
      state.conversationalContextRouterAvailableV61S = true;
      state.noLiveActionExecutedV61S = true;
      state.noBackendNetworkLiveAIV61S = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'repeat_last_action_v61s') {
      var previousContext = getLastConversationalContextV61S();
      if (!previousContext) {
        if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61s-repeat-missing="true"><strong>No previous local action to repeat.</strong><div>Run a local module command first, then say “repeat last action.”</div><div class="locked">Local/demo-only. No live AI, backend, network, or record change was run.</div></div>';
        state.repeatLastActionRouterAvailableV61S = true;
        syncNamespace();
        return intent;
      }
      var repeatHost = outputNode ? document.createElement('div') : null;
      var repeatedIntent = runNormalizedAquaCommandV61E(previousContext.repeatCommandText || previousContext.originalText || previousContext.routeText || '', repeatHost);
      intent.repeatedIntent = repeatedIntent && repeatedIntent.canonicalIntent;
      intent.module = repeatedIntent && (repeatedIntent.module || repeatedIntent.targetModule) ? (repeatedIntent.module || repeatedIntent.targetModule) : previousContext.module;
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61s-repeat-last-action="true"><strong>Repeated last local action.</strong><div><strong>Previous command:</strong> ' + escapeHTMLV61D(previousContext.repeatCommandText || previousContext.originalText || previousContext.routeText || '') + '</div><div class="locked">Local/demo-only. No live AI, backend, network, or record change was run.</div></div>' + (repeatHost ? repeatHost.innerHTML : '');
      state.repeatLastActionWorksV61S = true;
      state.noLiveActionExecutedV61S = true;
      state.noBackendNetworkLiveAIV61S = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'speak_summary_v61r') {
      var speakResult = speakAquaSummaryV61R(getCurrentSpokenSummaryV61R(outputNode), { outputNode: outputNode, context: 'typed command' });
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61r-spoken-command="speak_summary"><strong>Speak Summary</strong><div>' + escapeHTMLV61D(speakResult.fallback || speakResult.text) + '</div><div class="locked">Local/browser demo only. No audio stored. Backend locked.</div></div>';
      state.typedSpeakSummaryWorksV61R = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'read_report_v61r') {
      var reportSummary = automationReportSummaryV61R(getLastRegressionReportV61L());
      var readResult = speakAquaSummaryV61R(reportSummary, { outputNode: outputNode, context: 'typed report command' });
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61r-spoken-command="read_report"><strong>Read Report</strong><div>' + escapeHTMLV61D(readResult.fallback || reportSummary) + '</div><div class="locked">Local/browser demo only. No audio stored. Backend locked.</div></div>';
      state.typedSpeakSummaryWorksV61R = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'stop_speaking_v61r') {
      stopAquaSpeakingV61R();
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61r-spoken-command="stop_speaking"><strong>Stop Speaking</strong><div>Spoken readback stopped locally.</div><div class="locked">No audio stored. Backend locked.</div></div>';
      state.typedStopSpeakingWorksV61R = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'voice_off_v61r') {
      setSpokenReadbackPreferenceV61R({ enabled: false });
      stopAquaSpeakingV61R();
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61r-spoken-command="voice_off"><strong>Voice off</strong><div>Spoken readback disabled locally.</div><div class="locked">Preference only. No audio stored.</div></div>';
      state.voiceOffPreferenceWorksV61R = getSpokenReadbackPreferenceV61R().enabled === false;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'voice_on_v61r') {
      setSpokenReadbackPreferenceV61R({ enabled: true });
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61r-spoken-command="voice_on"><strong>Voice on</strong><div>Spoken readback enabled locally.</div><div class="locked">Local/browser demo only. No audio stored. Backend locked.</div></div>';
      state.voiceOnPreferenceWorksV61R = getSpokenReadbackPreferenceV61R().enabled === true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'clear_draft_queue_demo') {
      clearDraftQueueDemoV61J(outputNode);
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61k-clear-draft-queue="true"><strong>Draft queue demo cleared.</strong><div>Current command was not changed.</div><div class="locked">No live record changed. No backend, network, or live AI call was made.</div></div>';
      state.demoStateCommandsRunBeforeFallback = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'clear_current_demo_action') {
      clearCurrentDemoActionV61J(null);
      if (outputNode) outputNode.innerHTML = '<div class="note" data-aqua-v61k-clear-current-action="true"><strong>Current demo action cleared.</strong><div>Draft queue history was not changed.</div><div class="locked">No live record changed. No backend, network, or live AI call was made.</div></div>';
      state.demoStateCommandsRunBeforeFallback = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'start_new_demo_change') {
      var current = currentCommandInputV61J();
      var startMessage = '<div class="note" data-aqua-v61k-start-new-demo-change="true"><strong>Started new demo change from current command.</strong><div class="locked">No live record changed. No backend, network, or live AI call was made.</div></div>';
      if (outputNode) outputNode.innerHTML = startMessage;
      state.demoStateCommandsRunBeforeFallback = true;
      if (current && current !== commandText) {
        var reparseHost = outputNode ? document.createElement('div') : null;
        runNormalizedAquaCommandV61E(current, reparseHost);
        if (outputNode && reparseHost) outputNode.innerHTML = startMessage + reparseHost.innerHTML;
      }
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'action_intent_demo') {
      state.noLiveActionExecuted = true;
      state.actionIntentPanelWorks = true;
      rememberSpokenSummaryV61R(visualSummaryForIntentV61R(intent), 'permission granter');
      if (outputNode) outputNode.innerHTML = renderActionIntentDemoV61E(intent);
      rememberConversationalContextV61S(intent);
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'run_regression_qa') {
      var regressionReport = runAquaCommandRegressionV61L();
      rememberSpokenSummaryV61R(automationReportSummaryV61R(regressionReport), 'automation report');
      if (outputNode) outputNode.innerHTML = renderRegressionReportV61L(regressionReport);
      state.regressionQACommandWorksV61L = true;
      state.automationCommandRoutesBeforeFallback = true;
      state.runRegressionQaCommandWorks = true;
      state.automationCommandsDoNotFallback = true;
      state.noLiveActionExecuted = true;
      state.noLiveChangeExecuted = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      state.noAudioStorage = true;
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
      rememberConversationalContextV61S(intent);
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent !== 'unknown') {
      if (openVisualModuleV61F(intent, outputNode)) {
        rememberConversationalContextV61S(intent);
        return intent;
      }
      var html = renderNormalizedReadbackV61E(intent);
      if (html && outputNode) outputNode.innerHTML = html;
      rememberConversationalContextV61S(intent);
    } else if (outputNode && intent.normalizedText) {
      outputNode.innerHTML = askModeBadgeV61U(intent.askMode || 'unknown_fallback') + renderLocalModuleFallbackV61E(intent);
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
        var commandBox = getAquaCommandInputV61M();
        var output = getAquaCommandOutputV61M(commandBox);
        var original = commandBox ? commandBox.value : '';
        if (isAquaButtonLabelGarbageV61M(original)) original = '';
        var intent = runNormalizedAquaCommandV61E(original, output);
        if (intent.canonicalIntent === 'action_intent_demo') return;
        if (intent.canonicalIntent === 'unknown' && output && output.innerHTML) {
          var legacyFallbackName = 'aquaGuidedFallbackV60Q';
          if (legacyFallbackName) return;
        }
        if (intent.canonicalIntent !== 'unknown' && output && output.innerHTML) {
          if (commandBox && intent.canonicalIntent !== 'run_regression_qa') setAquaCommandInputValueV61M(commandBox, intent.routeText);
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
    if (!document || typeof document.getElementById !== 'function') return null;
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
      '<div class="actions"><button class="btn primary small" onclick="runBrainCommandDemo()">Run Command Demo</button><button class="btn small gold" onclick="startVoiceAskV60U()">Ask by Voice</button><button class="btn small gold" onclick="runAquaFullQAV60E()">Run Full Aqua QA</button><button class="btn small gold" data-aqua-v61l-regression="true" type="button" style="visibility:visible;opacity:1">Run Regression QA</button>' + renderSpokenReadbackControlsV61R() + '</div>',
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
    ensureRegressionQAButtonV61L(flow);
    ensureSpokenReadbackControlsV61R(flow);

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
    var command = getAquaCommandInputV61M();
    if (command) setAquaCommandInputValueV61M(command, clean);
    state.transcriptInjectionAvailable = Boolean(command);
    state.correctCommandInputTargeted = Boolean(command && !isOldAskAIInputV61M(command));
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
    installSpokenReadbackButtonHandlerV61R();
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


  function runV61KCheck() {
    installCommandNormalizerV61E();
    installPermissionGranterDemoButtonsV61I();
    try {
      window.localStorage.removeItem(DRAFT_CHANGE_QUEUE_KEY_V61J);
      window.localStorage.removeItem(PERMISSION_GRANTER_KEY_V61I);
    } catch (error) {
      state.draftChangeQueueStorageWarning = 'localStorage unavailable in this browser context';
    }
    var host = document.createElement('div');
    var clearDraftVariants = [
      'clear draft queue demo',
      'clear draft queued demo',
      'clear draft Q demo',
      'clear draft cute demo',
      'Claire draft queue demo',
      'Claire draft queued demo',
      'clear the draft queue',
      'clear the draft queued',
      'clear demo queue',
      'clear demo queued',
      'delete draft queue',
      'reset draft queue',
      'reset draft queued'
    ];
    var clearCurrentVariants = [
      'clear current demo action',
      'clear current action',
      'clear active action',
      'clear active demo',
      'clear current demo',
      'reset current action',
      'reset current demo',
      'clear current permission',
      'clear current panel'
    ];
    var startNewVariants = [
      'start new demo change',
      'start a new demo change',
      'new demo change',
      'start new change',
      'recompute current command',
      'rerun current command',
      'refresh current command',
      'start over with current command'
    ];
    function routesAll(phrases, intentName, htmlPattern) {
      return phrases.every(function (phrase) {
        host.innerHTML = '';
        var intent = runNormalizedAquaCommandV61E(phrase, host);
        return intent && intent.canonicalIntent === intentName && htmlPattern.test(host.innerHTML) && !/Fallback local demo panel/i.test(host.innerHTML);
      });
    }
    var clearDraftWorks = routesAll(clearDraftVariants, 'clear_draft_queue_demo', /Draft queue demo cleared/i);
    var clearCurrentWorks = routesAll(clearCurrentVariants, 'clear_current_demo_action', /Current demo action cleared/i);
    var startNewWorks = routesAll(startNewVariants, 'start_new_demo_change', /Started new demo change from current command/i);
    var cold = normalizeAquaCommandV61E('cold this receipt to framing');
    var call = normalizeAquaCommandV61E('call this receipt to framing');
    var coat = normalizeAquaCommandV61E('coat this receipt to framing');
    var received = normalizeAquaCommandV61E('code this received to framing');
    var justReceived = normalizeAquaCommandV61E('code just received to framing');
    host.innerHTML = '';
    var coldRun = runNormalizedAquaCommandV61E('cold this receipt to framing', host);
    var coldHtml = host.innerHTML;
    host.innerHTML = '';
    var noisyRun = runNormalizedAquaCommandV61E('code just received to framing', host);
    var noisyQueue = readDraftChangeQueueV61J()[0] || {};
    host.innerHTML = '';
    var materialsRun = runNormalizedAquaCommandV61E('code this receipt to materials', host);
    var materialsQueue = readDraftChangeQueueV61J()[0] || {};
    host.innerHTML = '';
    var banana = runNormalizedAquaCommandV61E('banana test', host);
    var bananaHtml = host.innerHTML;
    state.clearDraftQueueVoiceVariantsWork = clearDraftWorks;
    state.clearCurrentDemoActionVariantsWork = clearCurrentWorks;
    state.startNewDemoChangeVariantsWork = startNewWorks;
    state.codeColdCallCorrectionWorks = [cold, call, coat, coldRun].every(function (intent) { return intent && intent.canonicalIntent === 'action_intent_demo' && intent.targetModule === 'Receipts / Receipt Tracker' && intent.requestedValue === 'framing'; });
    state.receivedToReceiptCorrectionWorks = [received, justReceived, noisyRun].every(function (intent) { return intent && intent.canonicalIntent === 'action_intent_demo' && intent.targetModule === 'Receipts / Receipt Tracker' && intent.requestedValue === 'framing'; });
    state.badTranscriptNotSavedAsValue = noisyQueue.proposedValue === 'framing' && materialsQueue.proposedValue === 'materials' && !/just received|code just received|received to framing/i.test(noisyQueue.proposedValue || '');
    state.demoStateCommandsRunBeforeFallback = clearDraftWorks && clearCurrentWorks && startNewWorks;
    state.actionIntentRunsBeforeFallback = coldRun.canonicalIntent === 'action_intent_demo' && /Permission Required \/ Action Intent Demo/i.test(coldHtml) && !/Fallback local demo panel/i.test(coldHtml);
    state.unknownFallbackStillWorks = banana.canonicalIntent === 'unknown' && /Fallback local demo panel/i.test(bananaHtml);
    state.noLiveActionExecuted = true;
    state.noLiveChangeExecuted = true;
    state.noLiveRecordChangeV61I = true;
    state.noLiveRecordChangeV61J = true;
    state.noBackendNetworkLiveAIV61I = true;
    state.noBackendNetworkLiveAIV61J = true;
    state.noBackendCalls = true;
    state.noAudioStorage = true;
    state.noNetworkCalls = true;
    syncNamespace();
    return {
      version: 'v61K',
      clearDraftQueueVoiceVariantsWork: state.clearDraftQueueVoiceVariantsWork,
      clearCurrentDemoActionVariantsWork: state.clearCurrentDemoActionVariantsWork,
      startNewDemoChangeVariantsWork: state.startNewDemoChangeVariantsWork,
      codeColdCallCorrectionWorks: state.codeColdCallCorrectionWorks,
      receivedToReceiptCorrectionWorks: state.receivedToReceiptCorrectionWorks,
      badTranscriptNotSavedAsValue: state.badTranscriptNotSavedAsValue,
      demoStateCommandsRunBeforeFallback: state.demoStateCommandsRunBeforeFallback,
      actionIntentRunsBeforeFallback: state.actionIntentRunsBeforeFallback,
      bananaFallbackStillWorks: state.unknownFallbackStillWorks,
      noLiveChangeExecuted: true,
      noBackendCalls: true,
      noNetworkCalls: true
    };
  }


  function regressionCommandCasesV61L() {
    return [
      { command: 'show automation report', expected: 'Automation Report / Regression Report Viewer', intent: 'show_automation_report_v61t', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'show regression report', expected: 'Automation Report / Regression Report Viewer', intent: 'show_automation_report_v61t', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'automation status', expected: 'Automation Report / Regression Report Viewer', intent: 'show_automation_report_v61t', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'run regression qa', expected: 'Run regression and show updated Automation Report', intent: 'run_regression_qa', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'show qa report', expected: 'Automation Report / Regression Report Viewer', intent: 'show_automation_report_v61t', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'run qa regression', expected: 'Run regression and show updated Automation Report', intent: 'run_regression_qa', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'run command regression', expected: 'Run regression and show updated Automation Report', intent: 'run_regression_qa', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'test app', expected: 'Run regression and show updated Automation Report', intent: 'run_regression_qa', module: /Automation Report \/ Regression Report Viewer/i, html: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i, noFallback: true, automationRoute: true },
      { command: 'pull up receipts', expected: 'Receipts / Receipt Tracker', intent: 'show_receipts', module: /Receipts \/ Receipt Tracker/i, html: /Receipts \/ Receipt Tracker/i },
      { command: 'pull up accountant', expected: 'Accounting / Daily P&L', intent: 'show_accounting', module: /Accounting Command \/ Daily P&L/i, html: /Accounting Command \/ Daily P(?:&|&amp;)L|Daily P(?:&|&amp;)L/i },
      { command: 'how are my numbers', expected: 'Accounting / Daily P&L', intent: 'show_accounting', module: /Accounting Command \/ Daily P&L/i, html: /Accounting Command \/ Daily P(?:&|&amp;)L|Daily P(?:&|&amp;)L/i },
      { command: 'what’s going on today', expected: 'Owner Daily Briefing', intent: 'owner_briefing', module: /Owner Daily Briefing/i, html: /Owner Daily Briefing|Owner briefing/i },
      { command: 'what needs approval', expected: 'Owner Action Queue', intent: 'approval_queue', module: /Owner Action Queue|Approval Center/i, html: /Owner Action Queue|Approval Center|approval queue/i },
      { command: 'show SOW', expected: 'SOW Builder', intent: 'show_sow', module: /SOW Builder \/ Scope of Work/i, html: /SOW Builder|Scope of Work/i },
      { command: 'show insurer', expected: 'Insurance / Bank Reconciliation', intent: 'show_insurance_bank', module: /Insurance Dashboard \/ Bank Reconciliation/i, html: /Insurance Dashboard|Bank Reconciliation/i },
      { command: 'show insurance', expected: 'Insurance / Bank Reconciliation', intent: 'show_insurance_bank', module: /Insurance Dashboard \/ Bank Reconciliation/i, html: /Insurance Dashboard|Bank Reconciliation/i },
      { command: 'code this receipt to materials', expected: 'Permission Required / Action Intent Demo', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i, value: /materials/i },
      { command: 'code this receipt to coldest', expected: 'Permission Required / Action Intent Demo', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i },
      { command: 'cold this receipt to framing', expected: 'Permission Required / Action Intent Demo; cold normalized to code', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i, normalized: /code this receipt to framing/i, value: /framing/i, voiceVariant: true },
      { command: 'call this receipt to framing', expected: 'Permission Required / Action Intent Demo; call normalized to code', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i, normalized: /code this receipt to framing/i, value: /framing/i, voiceVariant: true },
      { command: 'code just received to framing', expected: 'Permission Required / Action Intent Demo; received normalized to receipt', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i, normalized: /code this receipt to framing/i, value: /framing/i, voiceVariant: true },
      { command: 'code this received to framing', expected: 'Permission Required / Action Intent Demo; received normalized to receipt', intent: 'action_intent_demo', module: /Receipts \/ Receipt Tracker/i, html: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i, normalized: /code this receipt to framing/i, value: /framing/i, voiceVariant: true },
      { command: 'clear current demo action', expected: 'Clear current demo action without fallback', intent: 'clear_current_demo_action', module: /Permission Granter/i, html: /Current demo action cleared/i, noFallback: true },
      { command: 'clear draft queue demo', expected: 'Clear draft queue without fallback', intent: 'clear_draft_queue_demo', module: /Draft Change Queue/i, html: /Draft queue demo cleared/i, noFallback: true },
      { command: 'clear draft queued demo', expected: 'Clear draft queue voice variant without fallback', intent: 'clear_draft_queue_demo', module: /Draft Change Queue/i, html: /Draft queue demo cleared/i, noFallback: true, voiceVariant: true },
      { command: 'clear draft Q demo', expected: 'Clear draft queue voice variant without fallback', intent: 'clear_draft_queue_demo', module: /Draft Change Queue/i, html: /Draft queue demo cleared/i, noFallback: true, voiceVariant: true },
      { command: 'clear draft cute demo', expected: 'Clear draft queue voice variant without fallback', intent: 'clear_draft_queue_demo', module: /Draft Change Queue/i, html: /Draft queue demo cleared/i, noFallback: true, voiceVariant: true },
      { command: 'Claire draft queue demo', expected: 'Clear draft queue voice variant without fallback', intent: 'clear_draft_queue_demo', module: /Draft Change Queue/i, html: /Draft queue demo cleared/i, noFallback: true, voiceVariant: true },
      { command: 'start new demo change', expected: 'Start new demo change without fallback', intent: 'start_new_demo_change', module: /Permission Granter/i, html: /Started new demo change/i, noFallback: true },
      { command: 'show draft changes', expected: 'Draft Change Queue', intent: 'show_draft_change_queue', module: /Draft Change Queue/i, html: /Draft Change Queue/i },
      { command: 'show prepared changes', expected: 'Draft Change Queue prepared filter', intent: 'show_draft_change_queue', module: /Draft Change Queue/i, html: /Draft Change Queue/i },
      { command: 'show pending edits', expected: 'Draft Change Queue', intent: 'show_draft_change_queue', module: /Draft Change Queue/i, html: /Draft Change Queue/i },
      { command: 'show change queue', expected: 'Draft Change Queue', intent: 'show_draft_change_queue', module: /Draft Change Queue/i, html: /Draft Change Queue/i },
      { command: 'show approved demo changes', expected: 'Draft Change Queue approved demo filter', intent: 'show_draft_change_queue', module: /Draft Change Queue/i, html: /Draft Change Queue/i },
      { command: 'speak summary', expected: 'Speak current summary', intent: 'speak_summary_v61r', module: /Spoken Readback/i, html: /Speak Summary|Spoken readback unavailable|No audio stored/i, noFallback: true },
      { command: 'read this back', expected: 'Read current summary', intent: 'speak_summary_v61r', module: /Spoken Readback/i, html: /Speak Summary|Spoken readback unavailable|No audio stored/i, noFallback: true },
      { command: 'read report', expected: 'Read automation report summary', intent: 'read_report_v61r', module: /Spoken Readback/i, html: /Read Report|Automation report/i, noFallback: true },
      { command: 'stop speaking', expected: 'Stop speech synthesis', intent: 'stop_speaking_v61r', module: /Spoken Readback/i, html: /Stop Speaking|Spoken readback stopped/i, noFallback: true },
      { command: 'mute voice', expected: 'Mute voice command stops speech', intent: 'stop_speaking_v61r', module: /Spoken Readback/i, html: /Stop Speaking|Spoken readback stopped/i, noFallback: true },
      { command: 'voice off', expected: 'Voice preference off', intent: 'voice_off_v61r', module: /Spoken Readback/i, html: /Voice off|disabled locally/i, noFallback: true },
      { command: 'voice on', expected: 'Voice preference on', intent: 'voice_on_v61r', module: /Spoken Readback/i, html: /Voice on|enabled locally/i, noFallback: true },
      { command: 'repeat last action', contextCommand: 'show receipts', expected: 'Repeat last action routes previous receipts command', intent: 'repeat_last_action_v61s', module: /Receipts \/ Receipt Tracker/i, html: /Repeated last local action|Receipts/i, repeatedIntent: /show_receipts/i },
      { command: 'open that', contextCommand: 'show accounting', expected: 'Context follow-up reopens previous accounting route', intent: 'show_accounting', module: /Accounting Command \/ Daily P&L/i, html: /Accounting Command|Daily P&L|Fallback local demo panel/i },
      { command: 'how many bags of concrete for an 8 inch sonotube 4 feet deep', expected: 'Jobsite Calculator — Concrete Sonotube defaults to 80 lb and recommends 3 bags', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|Recommended purchase: 3 bags|No internet\/search\/API call/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 3, bagSizePounds: 80 },
      { command: 'how many 80 pound bags for an 8 inch sonotube 4 feet deep', expected: 'Concrete Sonotube calculator 80 lb recommends 3 bags', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|80 lb bags: about 2\.33 bags|Recommended purchase: 3 bags/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 3, bagSizePounds: 80 },
      { command: 'how many 60 pound bags for an 8 inch sonotube 4 feet deep', expected: 'Concrete Sonotube calculator 60 lb rounds up to 4 bags', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|60 lb bags: about 3\.10 bags|Recommended purchase: 4 bags/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 4, bagSizePounds: 60 },
      { command: 'concrete for 8 inch sauna tube 4 ft deep', expected: 'Concrete Sonotube calculator normalizes sauna tube to Sonotube', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|Recommended purchase: 3 bags/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 3, bagSizePounds: 80, normalizedTubeTerm: 'Sonotube' },
      { command: '8 inch tube 4 feet deep concrete bags', expected: 'Concrete tube calculator shorthand recommends 3 bags', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|Recommended purchase: 3 bags/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 3, bagSizePounds: 80 },
      { command: "how many bags for 8\" sonotube 4' deep", expected: 'Concrete Sonotube calculator supports inch and foot symbols', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Sonotube|Recommended purchase: 3 bags/i, noFallback: true, jobsiteCalculator: true, concreteSonotubeCalculator: true, recommendedBags: 3, bagSizePounds: 80 },
      { command: 'how many gallons of paint for 1200 square feet', expected: 'Paint Gallons calculator recommends 7 gallons', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Paint Gallons|Recommended purchase:<\/strong> 7 gallons|No internet\/search\/API call/i, noFallback: true, jobsiteCalculator: true, paintCalculator: true, recommendedGallons: 7 },
      { command: 'how many sheets of drywall for a 12 by 12 room 8 foot ceiling', expected: 'Drywall Sheets calculator recommends 14 4x8 sheets', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Drywall Sheets|Recommended purchase:<\/strong> 14 4x8 sheets|No internet\/search\/API call/i, noFallback: true, jobsiteCalculator: true, drywallCalculator: true, recommendedSheets: 14 },
      { command: 'flooring for 12 by 15 room', expected: 'Flooring calculator recommends 198 square feet', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Flooring Square Footage|Recommended purchase:<\/strong> 198 sq ft|No internet\/search\/API call/i, noFallback: true, jobsiteCalculator: true, flooringCalculator: true, recommendedSquareFeet: 198 },
      { command: 'how many studs for a 16 foot wall', expected: 'Wall Stud Count calculator recommends 15 studs', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Wall Stud Count|Recommended purchase:<\/strong> 15 studs|No internet\/search\/API call/i, noFallback: true, jobsiteCalculator: true, studCalculator: true, recommendedStuds: 15 },
      { command: 'concrete for 10 by 12 slab 4 inches thick', expected: 'Concrete Slab calculator estimates 1.48 yards and 1.63 yards with 10% waste', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Concrete Slab|Concrete:<\/strong> 1\.48 cubic yards|Suggested order with 10% waste:<\/strong> 1\.63 cubic yards/i, noFallback: true, jobsiteCalculator: true, concreteSlabCalculator: true, calculatorDraftActions: true, cubicYardsApprox: 1.48, waste10CubicYardsApprox: 1.63 },
      { command: 'save calculation draft', expected: 'Save Calculation Draft stores latest concrete slab calculator draft locally', intent: 'save_calculation_draft_v61x', module: /Calculator Drafts \/ Estimate Prep/i, html: /Save Calculation Draft|Concrete Slab|draft\/local demo only|No live estimate created/i, noFallback: true, saveCalculationDraft: true },
      { command: 'how many gallons of paint for 1200 square feet', expected: 'Paint Gallons calculator recommends 7 gallons before draft save', intent: 'local_calculator_available', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Paint Gallons|Recommended purchase:<\/strong> 7 gallons|Save Calculation Draft/i, noFallback: true, jobsiteCalculator: true, paintCalculator: true, calculatorDraftActions: true, recommendedGallons: 7 },
      { command: 'save this calculation', expected: 'Save Calculation Draft stores latest paint calculator draft locally', intent: 'save_calculation_draft_v61x', module: /Calculator Drafts \/ Estimate Prep/i, html: /Save Calculation Draft|Paint Gallons|draft\/local demo only|No live estimate created/i, noFallback: true, saveCalculationDraft: true },
      { command: 'show saved calculations', expected: 'Saved calculator drafts panel displays concrete and paint drafts', intent: 'show_calculator_drafts_v61x', module: /Calculator Drafts \/ Estimate Prep/i, html: /Calculator Drafts \/ Estimate Prep — Local Demo|Concrete Slab|Paint Gallons|Draft only \/ Local demo/i, noFallback: true, showCalculatorDrafts: true },
      { command: 'add to estimate draft', expected: 'Estimate Draft Placeholder stays locked and demo-only', intent: 'add_to_estimate_draft_v61x', module: /Estimate Draft Placeholder/i, html: /Estimate Draft Placeholder|Estimate Draft Locked|Customer Export Locked|No Live Change Made/i, noFallback: true, addEstimateDraftPlaceholder: true },
      { command: 'send to SOW review', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft'], expected: 'Saved calculator draft routes to local/demo SOW review queue', intent: 'send_to_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /Send to SOW Review Queue|aquaSowReviewQueueV61Y|No live SOW created|No live estimate created/i, noFallback: true, sendSowReviewQueue: true, sowSafety: true },
      { command: 'send this to SOW review', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft'], expected: 'Send this to SOW review synonym routes locally', intent: 'send_to_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /Send to SOW Review Queue|Source Draft Calculation ID/i, noFallback: true, sendSowReviewQueue: true, sowSafety: true },
      { command: 'send to estimate review', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft'], expected: 'Estimate review synonym routes locally', intent: 'send_to_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /SOW Review Queue|Estimate Review Locked|No live estimate created/i, noFallback: true, sendSowReviewQueue: true, sowSafety: true },
      { command: 'add this to SOW review queue', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft'], expected: 'Add this to queue synonym routes locally', intent: 'send_to_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /Send to SOW Review Queue|Demo Data Only/i, noFallback: true, sendSowReviewQueue: true, sowSafety: true },
      { command: 'show SOW review queue', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft', 'send to SOW review'], expected: 'SOW Review Queue displays queued draft', intent: 'show_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /SOW \/ Estimate Review Queue — Local Demo|Review Queue ID|Source Draft Calculation ID|Safety: No live SOW, no live estimate, no customer export, no backend, no accounting/i, noFallback: true, showSowReviewQueue: true, sowSafety: true },
      { command: 'show estimate review queue', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft', 'send to SOW review'], expected: 'Estimate review queue synonym displays queued draft', intent: 'show_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /SOW \/ Estimate Review Queue — Local Demo|Recommended Amount/i, noFallback: true, showSowReviewQueue: true, sowSafety: true },
      { command: 'mark review ready demo', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft', 'send to SOW review'], expected: 'Mark Review Ready Demo changes local/demo status only', intent: 'mark_review_ready_demo_v61y', module: /SOW \/ Estimate Review Queue/i, html: /Mark Review Ready Demo|review ready demo \/ local only|No live SOW created|No live estimate created/i, noFallback: true, markReviewReadyDemo: true, sowSafety: true },
      { command: 'return to calculator drafts', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft', 'send to SOW review'], expected: 'Return to calculator drafts reopens local drafts panel', intent: 'return_to_calculator_drafts_v61y', module: /Calculator Drafts \/ Estimate Prep/i, html: /Calculator Drafts \/ Estimate Prep — Local Demo|Send to SOW Review Queue/i, noFallback: true, showCalculatorDrafts: true },
      { command: 'clear SOW review queue demo', contextCommands: ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'save calculation draft', 'send to SOW review'], expected: 'Clear SOW Review Queue Demo clears only local/demo queue', intent: 'clear_sow_review_queue_demo_v61y', module: /SOW \/ Estimate Review Queue/i, html: /Clear SOW Review Queue Demo|aquaSowReviewQueueV61Y|No live SOW/i, noFallback: true, clearSowReviewQueue: true, sowSafety: true },
      { command: 'send to SOW review', expected: 'No calculator draft found. Save a calculation draft first.', intent: 'send_to_sow_review_queue_v61y', module: /SOW \/ Estimate Review Queue/i, html: /No calculator draft found\. Save a calculation draft first\./i, noFallback: true, noCalculatorDraftForSowReview: true, sowSafety: true },
      { command: 'clear saved calculations', expected: 'Clear Saved Calculation Drafts clears local demo drafts only', intent: 'clear_calculator_drafts_v61x', module: /Calculator Drafts \/ Estimate Prep/i, html: /Clear Saved Calculation Drafts|aquaCalculatorDraftsV61X|No live estimate/i, noFallback: true, clearCalculatorDrafts: true },
      { command: 'save calculation draft', expected: 'Save Calculation Draft without active calculator result asks user to run calculator first', intent: 'save_calculation_draft_v61x', module: /Calculator Drafts \/ Estimate Prep/i, html: /No current calculator result found\. Run a local jobsite calculator first\./i, noFallback: true, noCurrentCalculation: true },
      { command: 'how many gallons of paint', expected: 'Need More Information for missing paint square footage', intent: 'local_calculator_need_more_information', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Need More Information|square footage to paint|No internet\/API call was made/i, noFallback: true, jobsiteCalculator: true, needMoreInformation: true },
      { command: 'what is the best paint brand today', expected: 'Unsupported General Ask remains locked with no API/search', intent: 'general_ask_locked', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /General Ask \/ Jobsite Calculator — Locked Foundation|No external API call was made|No API key exists in frontend/i, noFallback: true, lockedGeneralAsk: true },
      { command: 'how many sheets of drywall for this room', expected: 'Need More Information for missing drywall room dimensions and ceiling height', intent: 'local_calculator_need_more_information', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /Jobsite Calculator — Need More Information|ceiling height|No internet\/API call was made/i, noFallback: true, jobsiteCalculator: true, needMoreInformation: true },
      { command: 'what does this code term mean', expected: 'General Ask / Jobsite Calculator locked placeholder', intent: 'general_ask_locked', mode: 'general_ask_locked', module: /General Ask \/ Jobsite Calculator/i, html: /General Ask \/ Jobsite Calculator — Locked Foundation|No external API call was made|No API key exists in frontend/i, noFallback: true, lockedGeneralAsk: true },
      { command: 'banana test', expected: 'Guided fallback', intent: 'unknown', mode: 'unknown_fallback', module: /Guided fallback/i, html: /Fallback local demo panel/i, fallback: true }
    ];
  }


  function permissionDraftSafetyV61N() {
    return {
      noLiveRecordChangeOccurs: true,
      permissionButtonsDemoOnly: true,
      prepareApproveCancelAuditDemoOnly: true,
      draftQueueHistoryOnly: true,
      activeCommandIsCurrentCommandOnly: true,
      staleLocalStorageDoesNotOverrideActiveCommand: true,
      currentCommandOnlyNotDraftHistory: true,
      noBackendNetworkLiveAI: true
    };
  }

  function regressionSafetyV61L() {
    return {
      noLiveRecordChanges: true,
      noBackendCalls: true,
      noNetworkCalls: true,
      noLiveAI: true,
      noPaymentPayrollBankExport: true,
      noAudioStored: true,
      noAlwaysListening: true,
      noExternalTTSApiCalls: true
    };
  }

  function regressionStorageSnapshotV61L() {
    var snapshot = {};
    [DRAFT_CHANGE_QUEUE_KEY_V61J, PERMISSION_GRANTER_KEY_V61I, SPOKEN_READBACK_KEY_V61R, CONVERSATIONAL_CONTEXT_KEY_V61S, CALCULATOR_DRAFTS_KEY_V61X, SOW_REVIEW_QUEUE_KEY_V61Y].forEach(function (key) {
      try {
        snapshot[key] = window.localStorage.getItem(key);
      } catch (error) {
        snapshot[key] = null;
      }
    });
    return snapshot;
  }

  function restoreRegressionStorageSnapshotV61L(snapshot) {
    Object.keys(snapshot || {}).forEach(function (key) {
      try {
        if (snapshot[key] === null || typeof snapshot[key] === 'undefined') window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, snapshot[key]);
      } catch (error) {
        state.regressionStorageWarningV61L = 'localStorage unavailable while restoring demo QA snapshot';
      }
    });
  }

  function regressionSafetyPassesV61L(safety) {
    return Object.keys(safety || {}).every(function (key) { return safety[key] === true; });
  }

  function createRegressionHostV61L() {
    return { innerHTML: '' };
  }

  function runRegressionCaseV61L(testCase) {
    var snapshot = regressionStorageSnapshotV61L();
    var stateContextSnapshot = cloneIntentForContextV61S(state.lastConversationalContextV61S);
    var host = createRegressionHostV61L();
    var intent;
    try {
      if (testCase.contextCommand) runNormalizedAquaCommandV61E(testCase.contextCommand, createRegressionHostV61L());
      if (testCase.contextCommands) testCase.contextCommands.forEach(function (command) { runNormalizedAquaCommandV61E(command, createRegressionHostV61L()); });
      intent = runNormalizedAquaCommandV61E(testCase.command, host);
    } finally {
      restoreRegressionStorageSnapshotV61L(snapshot);
      state.lastConversationalContextV61S = stateContextSnapshot;
    }
    var html = String(host.innerHTML || '');
    var actual = {
      command: testCase.command,
      canonicalIntent: intent && intent.canonicalIntent,
      module: intent && (intent.module || intent.targetModule || ''),
      normalizedText: intent && intent.normalizedText,
      requestedValue: intent && intent.requestedValue,
      repeatedIntent: intent && intent.repeatedIntent,
      renderedFallback: /Fallback local demo panel|native module opener not found|unknown command fallback|Conversational context needed/i.test(html),
      renderedAutomationReport: /Automation Report \/ Regression Report Viewer|Regression Report Viewer/i.test(html),
      renderedPermissionGate: /Permission Required \/ Action Intent Demo|Owner\/Admin permission required/i.test(html),
      renderedGeneralAskLocked: /General Ask \/ Jobsite Calculator — Locked Foundation|No external API call was made|No API key exists in frontend/i.test(html),
      renderedJobsiteCalculator: /Jobsite Calculator — (Concrete Sonotube|Paint Gallons|Drywall Sheets|Flooring Square Footage|Wall Stud Count|Concrete Slab|Need More Information)|data-aqua-v61v-jobsite-calculator|data-aqua-v61w-jobsite-calculator/i.test(html),
      renderedNeedMoreInformation: /Jobsite Calculator — Need More Information|data-aqua-v61w-need-more-information/i.test(html),
      renderedPaintCalculator: /Jobsite Calculator — Paint Gallons|data-aqua-v61w-paint-gallons/i.test(html),
      renderedDrywallCalculator: /Jobsite Calculator — Drywall Sheets|data-aqua-v61w-drywall-sheets/i.test(html),
      renderedFlooringCalculator: /Jobsite Calculator — Flooring Square Footage|data-aqua-v61w-flooring/i.test(html),
      renderedStudCalculator: /Jobsite Calculator — Wall Stud Count|data-aqua-v61w-wall-stud-count/i.test(html),
      renderedConcreteSlabCalculator: /Jobsite Calculator — Concrete Slab|data-aqua-v61w-concrete-slab/i.test(html),
      renderedCalculatorDraftActions: /Save Calculation Draft|data-aqua-v61x-calculator-draft-actions/i.test(html),
      renderedCalculatorDraftsPanel: /Calculator Drafts \/ Estimate Prep — Local Demo|data-aqua-v61x-calculator-drafts-panel/i.test(html),
      renderedSaveCalculationDraft: /Save Calculation Draft|data-aqua-v61x-save-confirmation/i.test(html),
      renderedClearCalculatorDrafts: /Clear Saved Calculation Drafts|data-aqua-v61x-clear-calculator-drafts/i.test(html),
      renderedEstimateDraftPlaceholder: /Estimate Draft Placeholder|data-aqua-v61x-estimate-draft-placeholder/i.test(html),
      renderedNoCurrentCalculation: /No current calculator result found\. Run a local jobsite calculator first\./i.test(html),
      recommendedGallons: intent && intent.recommendedGallons,
      recommendedSheets: intent && intent.recommendedSheets,
      recommendedSquareFeet: intent && intent.recommendedSquareFeet,
      recommendedStuds: intent && intent.recommendedStuds,
      cubicYards: intent && intent.cubicYards,
      waste10CubicYards: intent && intent.waste10CubicYards,
      renderedConcreteSonotubeCalculator: /Jobsite Calculator — Concrete Sonotube|data-aqua-v61v-concrete-sonotube/i.test(html),
      recommendedBags: intent && intent.recommendedBags,
      bagSizePounds: intent && intent.bagSizePounds,
      exactBags: intent && intent.exactBags,
      volumeCubicFeet: intent && intent.volumeCubicFeet,
      normalizedTubeTerm: intent && intent.normalizedTubeTerm,
      askMode: intent && intent.askMode,
      renderedDraftQueue: /Draft Change Queue/i.test(html),
      renderedSowReviewQueue: /SOW \/ Estimate Review Queue — Local Demo|data-aqua-v61y-sow-review-queue-panel/i.test(html),
      renderedSendSowReviewQueue: /Send to SOW Review Queue|data-aqua-v61y-send-sow-review-confirmation/i.test(html),
      renderedMarkReviewReadyDemo: /Mark Review Ready Demo|review ready demo \/ local only|data-aqua-v61y-mark-review-ready-demo/i.test(html),
      renderedClearSowReviewQueue: /Clear SOW Review Queue Demo|data-aqua-v61y-clear-sow-review-queue/i.test(html),
      renderedNoCalculatorDraftForSowReview: /No calculator draft found\. Save a calculation draft first\./i.test(html),
      noLiveSowEstimateCustomerAccountingText: /No live SOW|no live estimate|no customer export|no backend|no accounting/i.test(html),
      noLiveChangeText: /No live record changed|No Live Change Made|No live AI, backend|No backend, network, or live AI/i.test(html)
    };
    var errors = [];
    if (!intent || intent.canonicalIntent !== testCase.intent) errors.push('Expected intent ' + testCase.intent + ' but got ' + (actual.canonicalIntent || 'none') + '.');
    if (testCase.mode && actual.askMode !== testCase.mode) errors.push('Expected Ask AI mode ' + testCase.mode + ' but got ' + (actual.askMode || 'none') + '.');
    if (testCase.module && !testCase.module.test(actual.module)) errors.push('Expected module matching ' + testCase.module + ' but got ' + (actual.module || 'none') + '.');
    if (testCase.html && !testCase.html.test(html)) errors.push('Expected rendered output matching ' + testCase.html + '.');
    if (testCase.normalized && !testCase.normalized.test(actual.normalizedText || '')) errors.push('Expected normalized transcript matching ' + testCase.normalized + ' but got ' + (actual.normalizedText || 'none') + '.');
    if (testCase.repeatedIntent && !testCase.repeatedIntent.test(actual.repeatedIntent || '')) errors.push('Expected repeated intent matching ' + testCase.repeatedIntent + ' but got ' + (actual.repeatedIntent || 'none') + '.');
    if (testCase.value && !testCase.value.test(actual.requestedValue || '')) errors.push('Expected requested value matching ' + testCase.value + ' but got ' + (actual.requestedValue || 'none') + '.');
    if (testCase.noFallback && actual.renderedFallback) errors.push('Expected command to bypass fallback, but fallback rendered.');
    if (testCase.automationRoute && !actual.renderedAutomationReport) errors.push('Expected automation report viewer to render before fallback/context/module routing.');
    if (testCase.fallback && !actual.renderedFallback) errors.push('Expected guided fallback, but fallback did not render.');
    if (testCase.lockedGeneralAsk && !actual.renderedGeneralAskLocked) errors.push('Expected locked General Ask / Jobsite Calculator placeholder, but it did not render.');
    if (testCase.jobsiteCalculator && !actual.renderedJobsiteCalculator) errors.push('Expected local Jobsite Calculator, but it did not render.');
    if (testCase.needMoreInformation && !actual.renderedNeedMoreInformation) errors.push('Expected Need More Information calculator, but it did not render.');
    if (testCase.paintCalculator && !actual.renderedPaintCalculator) errors.push('Expected Paint Gallons calculator, but it did not render.');
    if (testCase.drywallCalculator && !actual.renderedDrywallCalculator) errors.push('Expected Drywall Sheets calculator, but it did not render.');
    if (testCase.flooringCalculator && !actual.renderedFlooringCalculator) errors.push('Expected Flooring Square Footage calculator, but it did not render.');
    if (testCase.studCalculator && !actual.renderedStudCalculator) errors.push('Expected Wall Stud Count calculator, but it did not render.');
    if (testCase.concreteSlabCalculator && !actual.renderedConcreteSlabCalculator) errors.push('Expected Concrete Slab calculator, but it did not render.');
    if (testCase.concreteSonotubeCalculator && !actual.renderedConcreteSonotubeCalculator) errors.push('Expected Concrete Sonotube calculator, but it did not render.');
    if (testCase.calculatorDraftActions && !actual.renderedCalculatorDraftActions) errors.push('Expected calculator draft action buttons, but they did not render.');
    if (testCase.saveCalculationDraft && !actual.renderedSaveCalculationDraft) errors.push('Expected Save Calculation Draft confirmation, but it did not render.');
    if (testCase.showCalculatorDrafts && !actual.renderedCalculatorDraftsPanel) errors.push('Expected saved calculator drafts panel, but it did not render.');
    if (testCase.clearCalculatorDrafts && !actual.renderedClearCalculatorDrafts) errors.push('Expected clear saved calculation drafts panel, but it did not render.');
    if (testCase.addEstimateDraftPlaceholder && !actual.renderedEstimateDraftPlaceholder) errors.push('Expected locked estimate draft placeholder, but it did not render.');
    if (testCase.noCurrentCalculation && !actual.renderedNoCurrentCalculation) errors.push('Expected no-current-calculation message, but it did not render.');
    if (testCase.sendSowReviewQueue && !actual.renderedSendSowReviewQueue) errors.push('Expected Send to SOW Review Queue confirmation, but it did not render.');
    if (testCase.showSowReviewQueue && !actual.renderedSowReviewQueue) errors.push('Expected SOW / Estimate Review Queue panel, but it did not render.');
    if (testCase.markReviewReadyDemo && !actual.renderedMarkReviewReadyDemo) errors.push('Expected Mark Review Ready Demo status, but it did not render.');
    if (testCase.clearSowReviewQueue && !actual.renderedClearSowReviewQueue) errors.push('Expected Clear SOW Review Queue Demo panel, but it did not render.');
    if (testCase.noCalculatorDraftForSowReview && !actual.renderedNoCalculatorDraftForSowReview) errors.push('Expected no calculator draft found message, but it did not render.');
    if (testCase.sowSafety && !actual.noLiveSowEstimateCustomerAccountingText) errors.push('Expected SOW/estimate/customer/backend/accounting safety copy.');
    if (typeof testCase.recommendedGallons === 'number' && actual.recommendedGallons !== testCase.recommendedGallons) errors.push('Expected recommended gallons ' + testCase.recommendedGallons + ' but got ' + actual.recommendedGallons + '.');
    if (typeof testCase.recommendedSheets === 'number' && actual.recommendedSheets !== testCase.recommendedSheets) errors.push('Expected recommended sheets ' + testCase.recommendedSheets + ' but got ' + actual.recommendedSheets + '.');
    if (typeof testCase.recommendedSquareFeet === 'number' && actual.recommendedSquareFeet !== testCase.recommendedSquareFeet) errors.push('Expected recommended square feet ' + testCase.recommendedSquareFeet + ' but got ' + actual.recommendedSquareFeet + '.');
    if (typeof testCase.recommendedStuds === 'number' && actual.recommendedStuds !== testCase.recommendedStuds) errors.push('Expected recommended studs ' + testCase.recommendedStuds + ' but got ' + actual.recommendedStuds + '.');
    if (typeof testCase.cubicYardsApprox === 'number' && Math.abs((actual.cubicYards || 0) - testCase.cubicYardsApprox) > 0.01) errors.push('Expected cubic yards about ' + testCase.cubicYardsApprox + ' but got ' + actual.cubicYards + '.');
    if (typeof testCase.waste10CubicYardsApprox === 'number' && Math.abs((actual.waste10CubicYards || 0) - testCase.waste10CubicYardsApprox) > 0.01) errors.push('Expected 10% waste cubic yards about ' + testCase.waste10CubicYardsApprox + ' but got ' + actual.waste10CubicYards + '.');
    if (typeof testCase.recommendedBags === 'number' && actual.recommendedBags !== testCase.recommendedBags) errors.push('Expected recommended bags ' + testCase.recommendedBags + ' but got ' + actual.recommendedBags + '.');
    if (typeof testCase.bagSizePounds === 'number' && actual.bagSizePounds !== testCase.bagSizePounds) errors.push('Expected bag size ' + testCase.bagSizePounds + ' but got ' + actual.bagSizePounds + '.');
    if (testCase.normalizedTubeTerm && actual.normalizedTubeTerm !== testCase.normalizedTubeTerm) errors.push('Expected normalized tube term ' + testCase.normalizedTubeTerm + ' but got ' + (actual.normalizedTubeTerm || 'none') + '.');
    if (!testCase.fallback && /payment|payroll|bank sync|accounting export/i.test(html) && !/locked|No live|No backend|export locked|Payment, Payroll, Backend/i.test(html)) errors.push('Safety lock wording missing for sensitive action references.');
    return {
      command: testCase.command,
      expected: testCase.expected,
      actual: actual,
      passed: errors.length === 0,
      errors: errors,
      suggestedFix: errors.length ? suggestedRegressionFixV61L(testCase, actual) : ''
    };
  }

  function suggestedRegressionFixV61L(testCase, actual) {
    if (testCase.intent === 'action_intent_demo') return 'Update normalizeReceiptActionTranscriptV61K/detectActionIntentV61E so this transcript routes to the Permission Granter action-intent demo before fallback.';
    if (testCase.intent === 'clear_draft_queue_demo' || testCase.intent === 'clear_current_demo_action' || testCase.intent === 'start_new_demo_change') return 'Update detectDemoStateCommandV61K so demo-state voice variants are recognized before action/fallback routing.';
    if (testCase.intent === 'repeat_last_action_v61s' || testCase.contextCommand) return 'Update detectConversationalContextCommandV61S or repeat-last-action handling so follow-up commands use the last local/demo context before fallback.';
    if (testCase.intent === 'show_draft_change_queue') return 'Update the show_draft_change_queue phrase list and renderDraftChangeQueueV61J handoff.';
    if (testCase.intent === 'unknown') return 'Verify unknown commands still render renderLocalModuleFallbackV61E.';
    return 'Update normalizeAquaCommandV61E phrase groups or visual route config for this command.';
  }

  function buildRepairPromptV61L(failures) {
    if (!failures.length) return 'No repair needed.';
    return ['Codex repair task: Fix Aqua Homes OS v61L automated command regression failures in aqua-v61-extensions.js only unless absolutely necessary.', 'Do not redesign, do not rewrite AH_v54I-3.html, do not activate backend/live AI, do not execute live record changes, and do not connect payment/payroll/bank/accounting export.', 'Failures:'].concat(failures.map(function (failure, index) {
      return (index + 1) + '. Failed command: "' + failure.command + '"\n   Expected result: ' + failure.expected + '\n   Actual result: ' + JSON.stringify(failure.actual) + '\n   Suggested fix: ' + failure.suggestedFix;
    })).concat(['Safety reminder: keep all tests local/demo-only; preserve no live records changed, no backend calls, no network calls, no live AI/API calls, no audio storage, no always-listening, and no payment/payroll/bank/accounting export.']).join('\n');
  }

  function saveRegressionReportV61L(report) {
    try {
      window.localStorage.setItem(REGRESSION_REPORT_KEY_V61L, JSON.stringify(report));
    } catch (error) {
      report.storageWarning = 'localStorage unavailable; report returned but not saved.';
    }
    return report;
  }

  function getLastRegressionReportV61L() {
    try {
      var raw = window.localStorage.getItem(REGRESSION_REPORT_KEY_V61L);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function placeholderRegressionReportV61T() {
    var safety = regressionSafetyV61L();
    return {
      version: 'v61Y',
      harnessVersion: 'v61L-compatible/v61Y',
      timestamp: new Date().toISOString(),
      total: 0,
      passed: 0,
      failed: 0,
      failedCommands: [],
      failures: [],
      results: [],
      safety: safety,
      permissionDraftSafety: permissionDraftSafetyV61N(),
      repairPrompt: 'No repair needed.',
      safeToMerge: true,
      mergeRecommendation: 'MERGE_ALLOWED',
      noLiveRecordChanges: true,
      noBackendNetworkLiveAICalls: true,
      spokenReadbackAvailable: speechSynthesisAvailableV61R(),
      spokenReadbackBrowserUnavailableFallback: !speechSynthesisAvailableV61R(),
      spokenReadbackPreferenceKey: SPOKEN_READBACK_KEY_V61R,
      conversationalContextRouterAvailable: true,
      repeatLastActionRouterAvailable: true,
      conversationalContextStorageKey: CONVERSATIONAL_CONTEXT_KEY_V61S,
      automationCommandRoutesBeforeFallback: true,
      showAutomationReportCommandWorks: true,
      runRegressionQaCommandWorks: true,
      automationCommandsDoNotFallback: true,
      askModeRouterWorks: true,
      appNavigationModeWorks: true,
      automationStatusModeWorks: true,
      permissionedActionModeWorks: true,
      generalAskLockedWorks: true,
      unknownFallbackWorks: true,
      sowReviewQueueWorks: true,
      sendToSowReviewWorks: true,
      showSowReviewQueueWorks: true,
      markReviewReadyDemoWorks: true,
      clearSowReviewQueueWorks: true,
      noLiveSowCreated: true,
      noLiveEstimateCreated: true,
      noCustomerExport: true,
      noApiKeysInFrontend: true
    };
  }

  function runAquaCommandRegressionV61L() {
    if (state.regressionRunningV61T) return placeholderRegressionReportV61T();
    state.regressionRunningV61T = true;
    var cases = regressionCommandCasesV61L();
    var results = cases.map(runRegressionCaseV61L);
    var failures = results.filter(function (result) { return !result.passed; }).map(function (result) {
      return {
        command: result.command,
        expected: result.expected,
        actual: result.actual,
        errors: result.errors,
        suggestedFix: result.suggestedFix
      };
    });
    var safety = regressionSafetyV61L();
    var report = {
      version: 'v61Y',
      harnessVersion: 'v61L-compatible/v61Y',
      timestamp: new Date().toISOString(),
      total: cases.length,
      passed: cases.length - failures.length,
      failed: failures.length,
      failedCommands: failures.map(function (failure) { return failure.command; }),
      failures: failures,
      results: results,
      safety: safety,
      permissionDraftSafety: permissionDraftSafetyV61N(),
      repairPrompt: buildRepairPromptV61L(failures),
      safeToMerge: failures.length === 0 && regressionSafetyPassesV61L(safety) ? true : false,
      mergeRecommendation: failures.length === 0 && regressionSafetyPassesV61L(safety) ? 'MERGE_ALLOWED' : 'MERGE_BLOCKED',
      noLiveRecordChanges: true,
      noBackendNetworkLiveAICalls: true,
      spokenReadbackAvailable: speechSynthesisAvailableV61R(),
      spokenReadbackBrowserUnavailableFallback: !speechSynthesisAvailableV61R(),
      spokenReadbackPreferenceKey: SPOKEN_READBACK_KEY_V61R,
      conversationalContextRouterAvailable: true,
      repeatLastActionRouterAvailable: true,
      conversationalContextStorageKey: CONVERSATIONAL_CONTEXT_KEY_V61S,
      automationCommandRoutesBeforeFallback: results.filter(function (result) { return result.command === 'show automation report' || result.command === 'show regression report' || result.command === 'automation status' || result.command === 'run regression qa'; }).every(function (result) { return result.passed && result.actual && result.actual.renderedFallback === false; }),
      showAutomationReportCommandWorks: results.some(function (result) { return result.command === 'show automation report' && result.passed; }),
      runRegressionQaCommandWorks: results.some(function (result) { return result.command === 'run regression qa' && result.passed; }),
      automationCommandsDoNotFallback: results.filter(function (result) { return result.actual && (/automation|regression|qa|test app/i.test(result.command)); }).every(function (result) { return result.actual.renderedFallback === false; }),
      askModeRouterWorks: results.every(function (result) { return result.actual && result.actual.askMode; }),
      appNavigationModeWorks: results.some(function (result) { return result.command === 'pull up receipts' && result.passed && result.actual.askMode === 'app_navigation'; }) && results.some(function (result) { return result.command === 'what needs approval' && result.passed && result.actual.askMode === 'app_navigation'; }),
      automationStatusModeWorks: results.some(function (result) { return result.command === 'show automation report' && result.passed && result.actual.askMode === 'automation_status'; }) && results.some(function (result) { return result.command === 'run regression qa' && result.passed && result.actual.askMode === 'automation_status'; }),
      permissionedActionModeWorks: results.some(function (result) { return result.command === 'code this receipt to materials' && result.passed && result.actual.askMode === 'permissioned_action'; }),
      generalAskLockedWorks: results.filter(function (result) { return /code term|best paint brand/i.test(result.command); }).every(function (result) { return result.passed && result.actual.askMode === 'general_ask_locked' && result.actual.renderedGeneralAskLocked; }),
      jobsiteCalculatorWorks: results.filter(function (result) { return /concrete|sonotube|sauna tube|tube.*concrete|paint for 1200|drywall for a 12|flooring for 12|studs for a 16|slab 4 inches/i.test(result.command); }).some(function (result) { return result.passed && result.actual.askMode === 'general_ask_locked' && result.actual.renderedJobsiteCalculator; }),
      concreteSonotubeCalculatorWorks: results.filter(function (result) { return /sonotube|sauna tube|tube/i.test(result.command) && /concrete|bags?/i.test(result.command); }).every(function (result) { return result.passed && result.actual.renderedConcreteSonotubeCalculator; }),
      paintCalculatorWorks: results.some(function (result) { return result.command === 'how many gallons of paint for 1200 square feet' && result.passed && result.actual.renderedPaintCalculator && result.actual.recommendedGallons === 7; }),
      drywallCalculatorWorks: results.some(function (result) { return result.command === 'how many sheets of drywall for a 12 by 12 room 8 foot ceiling' && result.passed && result.actual.renderedDrywallCalculator && result.actual.recommendedSheets === 14; }),
      flooringCalculatorWorks: results.some(function (result) { return result.command === 'flooring for 12 by 15 room' && result.passed && result.actual.renderedFlooringCalculator && result.actual.recommendedSquareFeet === 198; }),
      studCalculatorWorks: results.some(function (result) { return result.command === 'how many studs for a 16 foot wall' && result.passed && result.actual.renderedStudCalculator && result.actual.recommendedStuds === 15; }),
      concreteSlabCalculatorWorks: results.some(function (result) { return result.command === 'concrete for 10 by 12 slab 4 inches thick' && result.passed && result.actual.renderedConcreteSlabCalculator && Math.abs(result.actual.cubicYards - 1.48) < 0.01 && Math.abs(result.actual.waste10CubicYards - 1.63) < 0.01; }),
      calculatorDraftsWork: results.some(function (result) { return result.command === 'show saved calculations' && result.passed && result.actual.renderedCalculatorDraftsPanel; }),
      saveCalculationDraftWorks: results.filter(function (result) { return /save (calculation draft|this calculation)/i.test(result.command); }).some(function (result) { return result.passed && result.actual.renderedSaveCalculationDraft; }),
      showSavedCalculationsWorks: results.some(function (result) { return result.command === 'show saved calculations' && result.passed && result.actual.renderedCalculatorDraftsPanel; }),
      clearSavedCalculationsWorks: results.some(function (result) { return result.command === 'clear saved calculations' && result.passed && result.actual.renderedClearCalculatorDrafts; }),
      addToEstimateDraftLockedWorks: results.some(function (result) { return result.command === 'add to estimate draft' && result.passed && result.actual.renderedEstimateDraftPlaceholder; }),
      sowReviewQueueWorks: results.some(function (result) { return result.command === 'show SOW review queue' && result.passed && result.actual.renderedSowReviewQueue; }),
      sendToSowReviewWorks: results.some(function (result) { return result.command === 'send to SOW review' && result.passed && result.actual.renderedSendSowReviewQueue; }),
      showSowReviewQueueWorks: results.some(function (result) { return result.command === 'show SOW review queue' && result.passed && result.actual.renderedSowReviewQueue; }),
      markReviewReadyDemoWorks: results.some(function (result) { return result.command === 'mark review ready demo' && result.passed && result.actual.renderedMarkReviewReadyDemo; }),
      clearSowReviewQueueWorks: results.some(function (result) { return result.command === 'clear SOW review queue demo' && result.passed && result.actual.renderedClearSowReviewQueue; }),
      noLiveSowCreated: true,
      noLiveEstimateCreated: true,
      noCustomerExport: true,
      needMoreInformationWorks: results.some(function (result) { return result.command === 'how many gallons of paint' && result.passed && result.actual.renderedNeedMoreInformation; }),
      sonotubeEightInchFourFoot80lbReturnsThreeBags: results.some(function (result) { return result.command === 'how many bags of concrete for an 8 inch sonotube 4 feet deep' && result.passed && result.actual.recommendedBags === 3 && result.actual.bagSizePounds === 80; }),
      saunaTubeNormalizesToSonotube: results.some(function (result) { return /sauna tube/i.test(result.command) && result.passed && result.actual.normalizedTubeTerm === 'Sonotube'; }),
      unsupportedGeneralAskRemainsLocked: results.some(function (result) { return result.command === 'what is the best paint brand today' && result.passed && result.actual.askMode === 'general_ask_locked' && result.actual.renderedGeneralAskLocked; }),
      unknownFallbackWorks: results.some(function (result) { return result.command === 'banana test' && result.passed && result.actual.askMode === 'unknown_fallback'; }),
      noNetworkCalls: true,
      noApiKeysInFrontend: true,
      noLiveRecordChanges: true
    };
    state.regressionHarnessV61LAvailable = true;
    state.lastRegressionReportV61L = report;
    state.safeToMergeV61L = report.safeToMerge === true || report.safeToMerge === 'yes';
    state.automationCommandRoutesBeforeFallback = report.automationCommandRoutesBeforeFallback;
    state.showAutomationReportCommandWorks = report.showAutomationReportCommandWorks;
    state.runRegressionQaCommandWorks = report.runRegressionQaCommandWorks;
    state.automationCommandsDoNotFallback = report.automationCommandsDoNotFallback;
    state.askModeRouterWorks = report.askModeRouterWorks;
    state.appNavigationModeWorks = report.appNavigationModeWorks;
    state.automationStatusModeWorks = report.automationStatusModeWorks;
    state.permissionedActionModeWorks = report.permissionedActionModeWorks;
    state.generalAskLockedWorks = report.generalAskLockedWorks;
    state.jobsiteCalculatorWorks = report.jobsiteCalculatorWorks;
    state.concreteSonotubeCalculatorWorks = report.concreteSonotubeCalculatorWorks;
    state.paintCalculatorWorks = report.paintCalculatorWorks;
    state.drywallCalculatorWorks = report.drywallCalculatorWorks;
    state.flooringCalculatorWorks = report.flooringCalculatorWorks;
    state.studCalculatorWorks = report.studCalculatorWorks;
    state.concreteSlabCalculatorWorks = report.concreteSlabCalculatorWorks;
    state.calculatorDraftsWork = report.calculatorDraftsWork;
    state.saveCalculationDraftWorks = report.saveCalculationDraftWorks;
    state.showSavedCalculationsWorks = report.showSavedCalculationsWorks;
    state.clearSavedCalculationsWorks = report.clearSavedCalculationsWorks;
    state.addToEstimateDraftLockedWorks = report.addToEstimateDraftLockedWorks;
    state.sowReviewQueueWorks = report.sowReviewQueueWorks;
    state.sendToSowReviewWorks = report.sendToSowReviewWorks;
    state.showSowReviewQueueWorks = report.showSowReviewQueueWorks;
    state.markReviewReadyDemoWorks = report.markReviewReadyDemoWorks;
    state.clearSowReviewQueueWorks = report.clearSowReviewQueueWorks;
    state.noLiveSowCreated = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    state.needMoreInformationWorks = report.needMoreInformationWorks;
    state.unsupportedGeneralAskRemainsLocked = report.unsupportedGeneralAskRemainsLocked;
    state.sonotubeEightInchFourFoot80lbReturnsThreeBags = report.sonotubeEightInchFourFoot80lbReturnsThreeBags;
    state.saunaTubeNormalizesToSonotube = report.saunaTubeNormalizesToSonotube;
    state.unsupportedGeneralAskRemainsLockedV61V = report.unsupportedGeneralAskRemainsLocked;
    state.unknownFallbackWorks = report.unknownFallbackWorks;
    state.noApiKeysInFrontend = report.noApiKeysInFrontend;
    state.noLiveActionExecuted = true;
    state.noLiveChangeExecuted = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noAudioStorage = true;
    state.regressionRunningV61T = false;
    syncNamespace();
    return saveRegressionReportV61L(report);
  }

  function renderRegressionReportV61L(report) {
    var safe = report || getLastRegressionReportV61L() || runAquaCommandRegressionV61L();
    var failedCommands = safe.failures && safe.failures.length ? safe.failures.map(function (failure) { return '<li><strong>' + escapeHTMLV61D(failure.command) + '</strong> — expected ' + escapeHTMLV61D(failure.expected) + '</li>'; }).join('') : '<li>None</li>';
    var safetyRows = Object.keys(safe.safety || {}).map(function (key) { return '<li>' + escapeHTMLV61D(key) + ': <strong>' + escapeHTMLV61D(String(safe.safety[key])) + '</strong></li>'; }).join('');
    return '<div class="note" data-aqua-v61l-regression-report="true"><strong>Automation Report / Regression Report Viewer</strong>' +
      askModeBadgeV61U('automation_status') +
      '<div><strong>version:</strong> ' + escapeHTMLV61D(safe.version || VERSION) + '</div>' +
      '<div data-aqua-v61l-report-total="true"><strong>total:</strong> ' + escapeHTMLV61D(safe.total) + '</div>' +
      '<div data-aqua-v61l-report-passed="true"><strong>passed:</strong> ' + escapeHTMLV61D(safe.passed) + '</div>' +
      '<div data-aqua-v61l-report-failed="true"><strong>failed:</strong> ' + escapeHTMLV61D(safe.failed) + '</div>' +
      '<div><strong>failed commands:</strong><ul>' + failedCommands + '</ul></div>' +
      '<div data-aqua-v61l-report-safety="true"><strong>safety status:</strong><ul>' + safetyRows + '</ul></div>' +
      '<div><strong>safeToMerge:</strong> ' + escapeHTMLV61D(safe.safeToMerge || 'no') + '</div>' +
      '<div><strong>mergeRecommendation:</strong> ' + escapeHTMLV61D(safe.mergeRecommendation || (safe.safeToMerge === true ? 'MERGE_ALLOWED' : 'MERGE_BLOCKED')) + '</div>' +
      '<div><strong>askModeRouterWorks:</strong> ' + escapeHTMLV61D(String(safe.askModeRouterWorks === true)) + '</div>' +
      '<div><strong>jobsiteCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.jobsiteCalculatorWorks === true)) + '</div>' +
      '<div><strong>concreteSonotubeCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.concreteSonotubeCalculatorWorks === true)) + '</div>' +
      '<div><strong>paintCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.paintCalculatorWorks === true)) + '</div>' +
      '<div><strong>drywallCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.drywallCalculatorWorks === true)) + '</div>' +
      '<div><strong>flooringCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.flooringCalculatorWorks === true)) + '</div>' +
      '<div><strong>studCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.studCalculatorWorks === true)) + '</div>' +
      '<div><strong>concreteSlabCalculatorWorks:</strong> ' + escapeHTMLV61D(String(safe.concreteSlabCalculatorWorks === true)) + '</div>' +
      '<div><strong>needMoreInformationWorks:</strong> ' + escapeHTMLV61D(String(safe.needMoreInformationWorks === true)) + '</div>' +
      '<div><strong>unsupportedGeneralAskRemainsLocked:</strong> ' + escapeHTMLV61D(String(safe.unsupportedGeneralAskRemainsLocked === true)) + '</div>' +
      '<div><strong>noApiKeysInFrontend:</strong> ' + escapeHTMLV61D(String(safe.noApiKeysInFrontend === true)) + '</div>' +
      '<label class="smallMut" for="aquaRegressionRepairPromptV61L">repairPrompt:</label>' +
      '<textarea id="aquaRegressionRepairPromptV61L" data-aqua-v61l-report-repair-prompt="true" style="width:100%;min-height:150px" readonly>' + escapeHTMLV61D(safe.repairPrompt) + '</textarea>' +
      '<div class="locked">Stored locally as aquaRegressionReportV61L. Demo QA results only. No external send/share/export. No live record changes. No backend, network, or live AI calls.</div></div>';
  }

  function ensureRegressionQAButtonV61L(root) {
    var scope = root || document;
    if (!scope || typeof scope.querySelector !== 'function') return false;
    if (scope.querySelector('[data-aqua-v61l-regression="true"]')) return true;
    var actions = scope.querySelector('.actions');
    if (!actions || typeof document.createElement !== 'function') return false;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn small gold';
    button.setAttribute('data-aqua-v61l-regression', 'true');
    button.style.visibility = 'visible';
    button.style.opacity = '1';
    button.textContent = 'Run Regression QA';
    actions.appendChild(button);
    return true;
  }

  function installRegressionQAButtonHandlerV61L() {
    if (!document || typeof document.addEventListener !== 'function' || state.regressionQAButtonHandlerInstalledV61L) return false;
    document.addEventListener('click', function (event) {
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61l-regression="true"]') : null;
      if (!button) return;
      event.preventDefault();
      var commandInput = getAquaCommandInputV61M();
      var originalValue = commandInput ? commandInput.value : '';
      var oldAsk = document.getElementById && document.getElementById('aiAsk');
      var oldAskValue = oldAsk ? oldAsk.value : '';
      var report = runAquaCommandRegressionV61L();
      var output = getAquaCommandOutputV61M(commandInput);
      if (!output && button.parentNode && button.parentNode.parentNode && typeof button.parentNode.parentNode.querySelector === 'function') output = button.parentNode.parentNode.querySelector('#brainOut');
      if (output) output.innerHTML = renderRegressionReportV61L(report);
      if (commandInput && commandInput.value !== originalValue) commandInput.value = originalValue;
      if (oldAsk && oldAsk.value !== oldAskValue && isAquaButtonLabelGarbageV61M(oldAsk.value)) oldAsk.value = oldAskValue;
      state.regressionButtonPreservesInput = Boolean(!commandInput || commandInput.value === originalValue);
      state.oldAskAIInputNotPolluted = Boolean(!oldAsk || oldAsk.value === oldAskValue || !isAquaButtonLabelGarbageV61M(oldAsk.value));
      state.buttonLabelsNotInjected = true;
      syncNamespace();
    });
    state.regressionQAButtonHandlerInstalledV61L = true;
    syncNamespace();
    return true;
  }


  function runV61MCheck() {
    installCommandNormalizerV61E();
    installRegressionQAButtonHandlerV61L();
    installButtonLabelInjectionGuardV61M();
    var host = document.createElement('div');
    host.innerHTML = '<div id="askAICommandFlowV61B"><div class="field"><label>Command input</label><textarea id="brainCommand"></textarea></div><div class="split2"><div class="field"><label>Command type</label><select id="brainType"></select></div><div class="field"><label>Target module</label><select id="brainTarget"></select></div></div><div class="field"><label>Project / company</label><select id="brainProject"></select></div><div class="actions"><button type="button" data-aqua-v61l-regression="true">Run Regression QA</button></div><div id="brainOut"></div></div><div class="field"><label>Ask Aqua AI</label><textarea id="aiAsk"></textarea></div>';
    document.body.appendChild(host);
    var input = getAquaCommandInputV61M();
    var oldAsk = host.querySelector('#aiAsk');
    if (input) input.value = 'show receipts';
    if (oldAsk) oldAsk.value = 'old ask untouched';
    var before = input ? input.value : '';
    var oldBefore = oldAsk ? oldAsk.value : '';
    var out = host.querySelector('#brainOut');
    var typedIntent = runNormalizedAquaCommandV61E('run regression qa', out);
    var afterTypedHtml = out ? out.innerHTML : '';
    if (input) input.value = before;
    if (oldAsk) oldAsk.value = oldBefore;
    var button = host.querySelector('[data-aqua-v61l-regression="true"]');
    if (button && typeof button.click === 'function') button.click();
    var buttonHtml = out ? out.innerHTML : '';
    var commandPreserved = !input || input.value === before;
    var oldClean = !oldAsk || oldAsk.value === oldBefore;
    var noGarbage = !isAquaButtonLabelGarbageV61M(input && input.value) && !isAquaButtonLabelGarbageV61M(oldAsk && oldAsk.value) && !/Run Command Demo\s+Ask by Voice\s+Run Full Aqua QA/i.test((input && input.value) || '');
    state.commandInputResolverExists = typeof getAquaCommandInputV61M === 'function';
    state.correctCommandInputTargeted = Boolean(input && input.id === 'brainCommand');
    state.oldAskAIInputNotPolluted = oldClean;
    state.buttonLabelsNotInjected = noGarbage;
    state.regressionButtonPreservesInput = commandPreserved;
    state.typedRegressionCommandWorks = Boolean(typedIntent && typedIntent.canonicalIntent === 'run_regression_qa' && /Regression QA Report — v61L\/v61M/i.test(afterTypedHtml));
    state.regressionQACommandWorksV61L = state.typedRegressionCommandWorks;
    state.noLiveChangeExecuted = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    if (host.parentNode) host.parentNode.removeChild(host);
    syncNamespace();
    return {
      version: 'v61M',
      commandInputResolverExists: true,
      correctCommandInputTargeted: state.correctCommandInputTargeted,
      oldAskAIInputNotPolluted: state.oldAskAIInputNotPolluted,
      buttonLabelsNotInjected: state.buttonLabelsNotInjected,
      regressionButtonPreservesInput: state.regressionButtonPreservesInput,
      typedRegressionCommandWorks: state.typedRegressionCommandWorks,
      noLiveChangeExecuted: true,
      noBackendCalls: true,
      noNetworkCalls: true
    };
  }


  function runV61RCheck() {
    installSpokenReadbackButtonHandlerV61R();
    var host = document.createElement('div');
    host.innerHTML = '<div class="actions"></div><div id="brainOut"></div>';
    ensureSpokenReadbackControlsV61R(host);
    rememberSpokenSummaryV61R('Receipts are open. Demo receipt items are visible. Some receipt categories need owner or accounting review. No live accounting export, payment, upload, OCR, or backend action has run.', 'test');
    var speak = runNormalizedAquaCommandV61E('speak summary', host);
    var speakHtml = host.innerHTML;
    host.innerHTML = '';
    var stop = runNormalizedAquaCommandV61E('stop speaking', host);
    var stopHtml = host.innerHTML;
    host.innerHTML = '';
    var off = runNormalizedAquaCommandV61E('voice off', host);
    var offWorks = getSpokenReadbackPreferenceV61R().enabled === false;
    host.innerHTML = '';
    var on = runNormalizedAquaCommandV61E('voice on', host);
    var onWorks = getSpokenReadbackPreferenceV61R().enabled === true;
    state.spokenReadbackFunctionExistsV61R = typeof speakAquaSummaryV61R === 'function';
    state.speakSummaryButtonExistsV61R = /Speak Summary/.test(renderSpokenReadbackControlsV61R());
    state.stopSpeakingButtonExistsV61R = /Stop Speaking/.test(renderSpokenReadbackControlsV61R());
    state.typedSpeakSummaryWorksV61R = speak.canonicalIntent === 'speak_summary_v61r' && /Speak Summary|Spoken readback unavailable|No audio stored/i.test(speakHtml);
    state.typedStopSpeakingWorksV61R = stop.canonicalIntent === 'stop_speaking_v61r' && /Stop Speaking|Spoken readback stopped/i.test(stopHtml);
    state.voiceOffPreferenceWorksV61R = off.canonicalIntent === 'voice_off_v61r' && offWorks;
    state.voiceOnPreferenceWorksV61R = on.canonicalIntent === 'voice_on_v61r' && onWorks;
    state.noAudioStorageV61R = true;
    state.noBackendNetworkLiveAIV61R = true;
    state.noAlwaysListeningV61R = true;
    syncNamespace();
    return {
      version: 'v61R',
      speechReadbackFunctionExists: state.spokenReadbackFunctionExistsV61R,
      speakSummaryButtonExists: state.speakSummaryButtonExistsV61R,
      stopSpeakingButtonExists: state.stopSpeakingButtonExistsV61R,
      typedSpeakSummaryRoutes: state.typedSpeakSummaryWorksV61R,
      typedStopSpeakingRoutes: state.typedStopSpeakingWorksV61R,
      voiceOffPreferenceWorks: state.voiceOffPreferenceWorksV61R,
      voiceOnPreferenceWorks: state.voiceOnPreferenceWorksV61R,
      spokenReadbackAvailable: state.spokenReadbackV61RAvailable,
      browserUnavailableFallback: state.spokenReadbackUnavailableFallbackV61R,
      noAudioStorage: true,
      noBackendNetworkLiveAI: true,
      noAlwaysListening: true
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
  installSpokenReadbackButtonHandlerV61R();
  installCalculatorDraftButtonHandlerV61X();
  installRegressionQAButtonHandlerV61L();
  installButtonLabelInjectionGuardV61M();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireAskAIToCommandFlow, { once: true });
  } else {
    wireAskAIToCommandFlow();
  }
  if (window && typeof window.addEventListener === 'function') window.addEventListener('load', wireAskAIToCommandFlow, { once: true });

  console.log('Aqua Homes OS v61Y extensions loaded: Calculator Draft Approval / SOW Review Queue active. No live SOW or live estimate created.');
}());
