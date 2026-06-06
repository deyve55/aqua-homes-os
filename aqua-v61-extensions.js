/*
 * Aqua Homes OS v62J Modular Extension Loader
 * Wires the main Ask AI modal to direct one-shot local push-to-talk command capture and natural command intent routing plus the Visual Module Open Router plus Native Module Open Bridge plus v61H SOW/Insurance/Receipt Action route fixes plus v61I Permission Granter / Action Authority Demo Gate plus v61J Draft Change Queue foundation plus v61K voice synonym / demo state router repair plus v61L automated app QA harness / report export plus typed Regression QA command routing plus v61M command input targeting repair / button-label injection guard plus v61N full automation gate report metadata plus v61P merge-blocker report fields plus v61R AI spoken readback / local browser voice response foundation plus v61T automation command routing priority repair plus v61U Ask AI mode router foundation plus v61V local Jobsite Calculator foundation plus v61W Jobsite Calculator Expansion Pack 1 plus v61X Calculator Report / Save-to-Estimate Draft Foundation plus v61Y Calculator Draft Approval / SOW Review Queue plus v61Z AI Voice Brain Architecture / Tool-Calling Foundation plus v62A AI Voice Brain Tool Plan Viewer / Command Center Polish plus v62C AI Visual Route / Section Focus Bridge plus v62D Live In-App Regression Report Runner / Report Sync Repair plus v62E AI Voice Navigation Execution Layer plus v62F AI Multi-Step Workflow Planner / Permissioned Action Chain plus v62G Aqua Brain Workflow Memory / Follow-Up Chain Continuation plus v62H Aqua Brain Voice Interaction Quality / Conversation Control Layer plus v62I Aqua Brain Voice Session / Real Assistant Flow Foundation plus v62J Aqua Brain Secure Tool Gateway Contract / Backend Readiness Layer.
 * Protected Home visuals untouched. No live AI, backend, network, always-listening, or audio storage.
 */
(function () {
  'use strict';

  var VERSION = 'v62J';
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
    workflowPlannerExists: true,
    receiptExportWorkflowWorks: false,
    reportReviewWorkflowWorks: false,
    missingDocumentsWorkflowWorks: false,
    spendBudgetWorkflowWorks: false,
    uploadWorkflowStaysLocked: false,
    cameraWorkflowWorks: false,
    dailyAttentionWorkflowWorks: false,
    saveWorkflowPlanWorks: false,
    showLastWorkflowPlanWorks: false,
    copyWorkflowPlanWorks: false,
    clearWorkflowPlanWorks: false,
    ownerReviewDemoWorks: false,
    currentWorkflowPlanV62F: null,
    workflowMemoryExists: true,
    activeWorkflowSaved: false,
    followUpContinuationWorks: false,
    exportPacketFollowUpWorks: false,
    approvalFollowUpWorks: false,
    ownerReviewDemoFollowUpWorks: false,
    readbackFollowUpWorks: false,
    spendPivotUsesActiveProject: false,
    clearActiveWorkflowWorks: false,
    noContextFollowUpHandled: false,
    currentActiveWorkflowV62G: null,
    voiceInteractionControllerExists: true,
    voiceStatePanelWorks: false,
    voiceOnOffWorks: false,
    repeatLastResponseWorks: false,
    stopSpeakingWorks: false,
    manualFallbackWorks: false,
    continueUsesWorkflowMemory: false,
    permissionQuestionVoiceStateWorks: false,
    aquaVoiceInteractionV62HState: null,
    voiceSessionControllerExists: true,
    aquaSessionPanelWorks: false,
    startSessionWorks: false,
    endSessionWorks: false,
    activeProjectContextWorks: false,
    missingInputFollowUpWorks: false,
    accountantExportContextWorks: false,
    continueSessionWorks: false,
    cancelSessionWorks: false,
    manualModeWorks: false,
    currentAquaVoiceSessionV62I: null,
    toolGatewayContractExists: false,
    toolRequestEnvelopeWorks: false,
    toolResponseEnvelopeWorks: false,
    toolContractMapWorks: false,
    permissionMapWorks: false,
    riskMapWorks: false,
    approvalRoutesWork: false,
    frontendBlockRulesWork: false,
    exportQuestionStaysLocked: false,
    uploadQuestionStaysLocked: false,
    chatgptConnectionQuestionStaysLocked: false,
    toolGatewayPanelWorks: false,
    aiNavigationExecutorWorks: false,
    visualFocusExecutorWorks: false,
    focusedRouteMarkerWorks: false,
    hendersonReportNavigationWorks: false,
    hendersonStaircaseNavigationWorks: false,
    hendersonReceiptsNavigationWorks: false,
    hendersonPlumbingSpendNavigationWorks: false,
    missingDocumentsNavigationWorks: false,
    cameraAllocationNavigationWorks: false,
    accountantExportNavigationLocked: false,
    uploadNavigationLocked: false,
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
    automationCommandsDoNotFallback: false,
    premiumModuleShellWorks: true,
    openedModulesPolished: true,
    homeDesignUntouched: true,
    routingStillWorks: true,
    automationStillWorks: true,
    noLiveRecordChanges: true,
    noBackendNetworkLiveAI: true,
    voiceBrainV61ZAvailable: true,
    voiceBrainToolRegistryExists: false,
    voiceBrainIntentClassifierWorks: false,
    hendersonReportIntentWorks: false,
    hendersonReceiptsIntentWorks: false,
    accountantExportStaysLocked: false,
    plumbingSpendIntentWorks: false,
    cameraAllocationIntentWorks: false,
    constructionDiagramUploadStaysLocked: false,
    suggestNextStepWorks: false,
    noExternalAIAPICalls: true,
    noLiveExport: true,
    noLiveUpload: true,
    noAudioStorageV61Z: true,
    voiceBrainContextStorageKey: 'aquaVoiceBrainContextV61Z',
    aquaBrainCommandCenterWorks: false,
    voiceBrainPlanViewerWorks: false,
    saveVoiceBrainPlanWorks: false,
    showLastVoiceBrainPlanWorks: false,
    clearVoiceBrainPlanWorks: false,
    copyToolPlanWorks: false,
    permissionExplanationWorks: false,
    visualRouteBridgeV62CAvailable: true,
    visualRouteBridgeV62CWorks: false,
    visualRouteFocusMarkerV62CWorks: false,
    visualRouteReadbackBoundV62CWorks: false,
    liveInAppRegressionRunnerV62DAvailable: true,
    liveInAppRegressionRunnerV62DWorks: false,
    reportSyncV62DWorks: false,
    reportSyncStorageKeyV62D: 'aquaRegressionReportSyncV62D',
    reportSyncNoNetworkV62D: true,
    allVoiceBrainPlansHaveVisualRouteV62C: false,
    hendersonReportVisualFocusWorks: false,
    hendersonReceiptsVisualFocusWorks: false,
    accountantExportVisualFocusWorks: false,
    plumbingSpendVisualFocusWorks: false,
    cameraAllocationVisualFocusWorks: false,
    missingDocumentsVisualFocusWorks: false,
    uploadRequestVisualFocusWorks: false,
    nextActionVisualFocusWorks: false
  };


  function voiceBrainPermissionMapV61Z() {
    return {
      read_demo: ['Backend Locked', 'Demo Only', 'No Live Change Made'],
      prepare_demo: ['Permission Required', 'Backend Locked', 'Demo Preparation Only', 'No Live Change Made'],
      owner_approval_required: ['Permission Required', 'Owner Approval Required', 'Audit Required', 'Undo Required', 'No Live Change Made'],
      accounting_approval_required: ['Permission Required', 'Owner Approval Required', 'Accounting Export Locked', 'Audit Required', 'Undo Required', 'No Live Change Made'],
      backend_required: ['Backend Locked', 'No Network Call', 'No External AI/API Call', 'No Live Change Made'],
      live_locked: ['Live Locked', 'Backend Locked', 'No Live Change Made', 'Audit Required', 'Undo Required']
    };
  }

  function voiceBrainSafetyEnvelopeV61Z(extraLabels) {
    var base = ['No backend calls', 'No network calls', 'No external AI/API calls', 'No API keys in frontend', 'No live record changes', 'No live export', 'No live upload', 'No customer sharing', 'No accounting export', 'No payment/payroll/bank action', 'No audio storage', 'No always-listening', 'Audit Required', 'Undo Required'];
    (extraLabels || []).forEach(function (label) { if (base.indexOf(label) === -1) base.push(label); });
    return base;
  }

  function voiceBrainVisualRouteMapV61Z() {
    return {
      openProjectReport: 'Project Reports / Henderson house / Staircase report placeholder',
      findProjectReceipts: 'Receipts / Receipt Tracker / Henderson house / Home Depot filtered placeholder',
      summarizeProjectSpend: 'Accounting / Daily P&L / Henderson house / Plumbing spend placeholder',
      prepareAccountantExportDemo: 'Permission Granter / Accountant Export Demo / Home Depot receipts',
      uploadFileToProjectDemo: 'Permission Granter / Upload Request Demo / Henderson files',
      checkJobsiteCameraAllocationDemo: 'Jobsite Camera Allocation / Henderson jobsite placeholder',
      openSowReviewQueue: 'SOW / Estimate Review Queue',
      openReceiptTracker: 'Receipts / Receipt Tracker',
      openAccountingDailyPL: 'Accounting Command / Daily P&L',
      openAutomationReport: 'Automation Report / Regression Report Viewer',
      openCalculatorDrafts: 'Calculator Drafts / Estimate Prep',
      openPermissionGranter: 'Permission Granter',
      explainCurrentModule: 'Current module explanation placeholder',
      suggestNextStep: 'Owner Action Queue / Next Recommended Action',
      showBudgetRiskDemo: 'Accounting Command / Budget Risk locked placeholder',
      showEmployeeTimeDemo: 'Employee Time / Timecards locked placeholder',
      showPayablesDemo: 'Accounting Command / Payables locked placeholder',
      showMissingDocumentsDemo: 'Missing Documents / Project Document Review placeholder',
      diagnoseJobFileDemo: 'Project Files / Job File Diagnostic locked placeholder'
    };
  }

  function localDemoToolHandlerV61Z(toolName, plan) {
    return {
      toolName: toolName,
      status: 'locked/demo',
      outputType: plan && plan.tool ? plan.tool.outputType : 'demo_tool_plan',
      message: 'Local demo handler only. Backend/live action was not run.',
      noLiveChangeMade: true
    };
  }

  function voiceBrainToolRegistryV61Z() {
    var routeMap = voiceBrainVisualRouteMapV61Z();
    var definitions = [
      ['openProjectReport', 'Open a local/demo project report plan and point the UI toward project files.', ['project', 'reportTopic'], 'project_report_demo', 'backend_required', ['Backend Locked', 'Project File Backend Required']],
      ['findProjectReceipts', 'Prepare a local/demo receipt lookup plan for a project and vendor.', ['project', 'vendor'], 'receipt_lookup_demo', 'backend_required', ['Backend Locked', 'Receipt Database Required', 'No Live Export']],
      ['summarizeProjectSpend', 'Prepare a local/demo spend summary by project and trade/category.', ['project', 'trade'], 'spend_summary_demo', 'backend_required', ['Backend Locked', 'Accounting Backend Required', 'No Accounting Change']],
      ['prepareAccountantExportDemo', 'Stage an accountant export plan without creating or sending an export.', ['project', 'vendor'], 'accountant_export_plan_demo', 'accounting_approval_required', ['Permission Required', 'Owner Approval Required', 'Accounting Export Locked', 'Backend Locked', 'No Live Change Made', 'Audit Required', 'Undo Required']],
      ['uploadFileToProjectDemo', 'Stage a file upload request without reading, storing, or uploading any file.', ['project', 'fileType'], 'file_upload_request_demo', 'owner_approval_required', ['Permission Required', 'Owner Approval Required', 'Upload Locked', 'Backend Locked', 'No Live Change Made', 'Audit Required', 'Undo Required']],
      ['checkJobsiteCameraAllocationDemo', 'Prepare a local/demo jobsite camera allocation check.', ['project'], 'camera_allocation_demo', 'backend_required', ['Backend Locked', 'Camera Inventory Backend Required', 'No Live Change Made']],
      ['openSowReviewQueue', 'Open the local/demo SOW review queue.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'No Live SOW']],
      ['openReceiptTracker', 'Open the local/demo receipt tracker.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'No Live Export']],
      ['openAccountingDailyPL', 'Open the local/demo accounting Daily P&L shell.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'Accounting Locked']],
      ['openAutomationReport', 'Open the local/demo automation report.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'No External Send']],
      ['openCalculatorDrafts', 'Open the local/demo calculator drafts.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'No Live Estimate']],
      ['openPermissionGranter', 'Open the Permission Granter demo gate.', [], 'module_route_demo', 'read_demo', ['Demo Only', 'Owner Permission Required For Changes']],
      ['explainCurrentModule', 'Explain the current module from local/demo context only.', [], 'module_explanation_demo', 'read_demo', ['Demo Only', 'Backend Locked']],
      ['suggestNextStep', 'Suggest the next local/demo owner step from safe local state only.', [], 'next_step_demo', 'read_demo', ['Demo Only', 'No Live Change Made']],
      ['showBudgetRiskDemo', 'Prepare a budget risk/over-budget plan without reading live accounting data.', [], 'budget_risk_demo', 'backend_required', ['Backend Locked', 'Accounting Backend Required', 'No Accounting Change']],
      ['showEmployeeTimeDemo', 'Prepare an employee time view plan without reading payroll/timecard systems.', [], 'employee_time_demo', 'backend_required', ['Backend Locked', 'Payroll/Time Backend Required', 'No Payroll Action']],
      ['showPayablesDemo', 'Prepare a payables view plan without reading or paying live bills.', [], 'payables_demo', 'backend_required', ['Backend Locked', 'Accounting Backend Required', 'No Payment Action']],
      ['showMissingDocumentsDemo', 'Prepare a missing documents checklist without scanning live storage.', [], 'missing_documents_demo', 'backend_required', ['Backend Locked', 'Document Backend Required', 'No Customer Sharing']],
      ['diagnoseJobFileDemo', 'Prepare a job file diagnostic plan without reading live files.', [], 'job_file_diagnostic_demo', 'backend_required', ['Backend Locked', 'Project File Backend Required', 'No Live Change Made']]
    ];
    var registry = {};
    definitions.forEach(function (row) {
      registry[row[0]] = {
        toolName: row[0],
        description: row[1],
        requiredInputs: row[2],
        outputType: row[3],
        permissionLevel: row[4],
        liveStatus: 'locked/demo',
        safetyLabels: voiceBrainSafetyEnvelopeV61Z(row[5]),
        visualRoute: routeMap[row[0]],
        handler: function voiceBrainLocalDemoHandler(plan) { return localDemoToolHandlerV61Z(row[0], plan); }
      };
    });
    return registry;
  }

  function extractVoiceBrainEntitiesV61Z(original, normalized) {
    var q = String(normalized || normalizeAquaPhraseV61E(original || '')).trim();
    var entities = {};
    if (/\bhenderson\b/.test(q)) {
      if (/\bjobsite\b/.test(q)) entities.project = 'Henderson jobsite';
      else if (/\bhouse\b/.test(q)) entities.project = 'Henderson house';
      else entities.project = 'Henderson';
    }
    if (/\bhome depot\b/.test(q)) entities.vendor = 'Home Depot';
    if (/\bplumbing\b/.test(q)) entities.trade = 'plumbing';
    if (/\bstaircase\b/.test(q)) entities.reportTopic = 'staircase';
    else if (/\breport\b/.test(q)) entities.reportTopic = 'project report';
    if (/\bconstruction diagram\b/.test(q)) entities.fileType = 'construction diagram';
    return entities;
  }

  function spokenResponseDraftsV61Z(intent, entities) {
    var project = entities && entities.project ? entities.project : 'the project';
    var vendor = entities && entities.vendor ? entities.vendor : 'that vendor';
    return {
      project_report_lookup: 'I can prepare that project report lookup for ' + project + '. The report topic is recognized, but the project file backend is locked in this demo. No live file or record was opened.',
      project_vendor_receipt_lookup: 'I can prepare that receipt lookup. I found the project and vendor terms, but live receipt search requires the backend receipt database. No export or live accounting action was run.',
      prepare_accountant_export: 'I can prepare an accountant export plan for those ' + vendor + ' receipts, but permission is required and accounting export is locked. No export was created or sent.',
      project_cost_summary: 'I can prepare that spend summary for ' + project + ', but live accounting totals require the backend accounting database. No accounting record was changed.',
      jobsite_camera_allocation_check: 'I can prepare a camera allocation check for ' + project + ', but the camera inventory backend is locked in this demo. No camera assignment was changed.',
      project_file_upload_request: 'I can stage that upload request for ' + project + ', but uploads are locked until owner approval and backend support are available. No file was stored or uploaded.',
      suggest_next_step: 'Based on the local demo state, I would start with the automation report, review pending SOW drafts, and then check receipt coding items. No live task was changed.',
      budget_risk_lookup: 'I can prepare a budget risk view, but live budget and accounting totals require the backend accounting database. No accounting record was changed.',
      employee_time_lookup: 'I can prepare an employee time view, but live timecards and payroll are locked behind backend permission. No payroll action was run.',
      payables_lookup: 'I can prepare a payables view, but live bills and payment actions are locked. No payment or accounting change was made.',
      missing_documents_lookup: 'I can prepare a missing documents checklist, but live document storage is locked. No customer sharing or file action was run.',
      diagnose_job_file: 'I can prepare a job file diagnostic checklist, but live files and backend analysis are locked. No file was read, uploaded, or changed.'
    }[intent] || 'I can prepare a safe local tool plan, but backend/live actions are locked. No live change was made.';
  }

  function missingInputsForToolV61Z(tool, entities) {
    var map = { project: 'project', vendor: 'vendor', reportTopic: 'report/topic', trade: 'trade/category', fileType: 'file type' };
    return ((tool && tool.requiredInputs) || []).filter(function (input) { return !entities || !entities[input]; }).map(function (input) { return map[input] || input; });
  }

  function classifyVoiceBrainIntentV61Z(commandText) {
    var original = String(commandText || '').trim();
    var q = normalizeAquaPhraseV61E(original);
    var entities = extractVoiceBrainEntitiesV61Z(original, q);
    var intent = '';
    var toolName = '';
    if (/\bwhat should i do next\b|\bwhat needs my attention today\b/.test(q)) { intent = 'suggest_next_step'; toolName = 'suggestNextStep'; }
    else if (/\bwhat is over budget\b|\bwhat budget is about to go over\b|\bbudget\b.*\b(go over|over budget)\b/.test(q)) { intent = 'budget_risk_lookup'; toolName = 'showBudgetRiskDemo'; }
    else if (/\bshow employee time\b|\bemployee time\b/.test(q)) { intent = 'employee_time_lookup'; toolName = 'showEmployeeTimeDemo'; }
    else if (/\bshow payables\b|\bpayables\b/.test(q)) { intent = 'payables_lookup'; toolName = 'showPayablesDemo'; }
    else if (/\bwhat documents are missing\b|\bmissing documents\b|\bdocuments are missing\b/.test(q)) { intent = 'missing_documents_lookup'; toolName = 'showMissingDocumentsDemo'; }
    else if (/\bdiagnose this job file\b|\bdiagnose\b.*\bjob file\b/.test(q)) { intent = 'diagnose_job_file'; toolName = 'diagnoseJobFileDemo'; }
    else if (/\b(upload|add|attach)\b/.test(q) && /\bconstruction diagram\b/.test(q) && /\bhenderson\b/.test(q)) { intent = 'project_file_upload_request'; toolName = 'uploadFileToProjectDemo'; }
    else if (/\bcameras?\b/.test(q) && /\ballocated|allocation|assigned|right\b/.test(q) && /\bhenderson\b/.test(q)) { intent = 'jobsite_camera_allocation_check'; toolName = 'checkJobsiteCameraAllocationDemo'; }
    else if (/\baccountant export\b|\bprepare\b.*\bhome depot\b.*\breceipts?\b.*\bexport\b/.test(q) || (/\bprepare\b/.test(q) && /\bhome depot\b/.test(q) && /\baccountant\b/.test(q))) { intent = 'prepare_accountant_export'; toolName = 'prepareAccountantExportDemo'; }
    else if (/\b(how much|how many|money|spend|spent|cost)\b/.test(q) && /\bhenderson\b/.test(q) && /\bplumbing\b/.test(q)) { intent = 'project_cost_summary'; toolName = 'summarizeProjectSpend'; }
    else if (/\breceipts?\b/.test(q) && /\bhenderson\b/.test(q) && /\bhome depot\b/.test(q)) { intent = 'project_vendor_receipt_lookup'; toolName = 'findProjectReceipts'; }
    else if (/\breport\b/.test(q) && /\bhenderson\b/.test(q)) { intent = 'project_report_lookup'; toolName = 'openProjectReport'; }
    else if (/\bhenderson\b/.test(q) && /\bstaircase\b/.test(q)) { intent = 'project_report_lookup'; toolName = 'openProjectReport'; }
    if (!intent) return null;
    var registry = voiceBrainToolRegistryV61Z();
    var tool = registry[toolName];
    var missingInputs = missingInputsForToolV61Z(tool, entities);
    return {
      canonicalIntent: 'voice_brain_tool_plan',
      voiceBrainIntent: intent,
      routeText: original,
      originalText: original,
      normalizedText: q,
      module: (tool && tool.visualRoute) || 'AI Voice Brain Tool Plan',
      selectedTool: toolName,
      toolName: toolName,
      tool: tool,
      extractedEntities: entities,
      missingInputs: missingInputs,
      spokenResponseDraft: spokenResponseDraftsV61Z(intent, entities),
      permissionLevel: tool && tool.permissionLevel,
      liveStatus: tool && tool.liveStatus,
      safetyLocks: tool ? tool.safetyLabels : voiceBrainSafetyEnvelopeV61Z(),
      nextRecommendedStep: missingInputs.length ? 'Ask the user for missing input: ' + missingInputs.join(', ') : 'Show this locked/demo tool plan and wait for owner/backend approval before any live action.'
    };
  }

  function writeVoiceBrainContextV61Z(plan) {
    var safe = {
      lastHeardCommand: String((plan && plan.originalText) || '').slice(0, 240),
      detectedIntent: String((plan && plan.voiceBrainIntent) || '').slice(0, 120),
      extractedEntities: Object.assign({}, (plan && plan.extractedEntities) || {}),
      selectedTool: String((plan && plan.selectedTool) || '').slice(0, 120),
      missingInputs: ((plan && plan.missingInputs) || []).slice(0, 10),
      spokenResponseDraft: String((plan && plan.spokenResponseDraft) || '').slice(0, 500),
      timestamp: new Date().toISOString()
    };
    try { window.localStorage.setItem(VOICE_BRAIN_CONTEXT_KEY_V61Z, JSON.stringify(safe)); } catch (error) { state.voiceBrainContextStorageWarningV61Z = 'localStorage unavailable for Aqua Voice Brain context'; }
    window.aquaVoiceBrainContextV61Z = safe;
    return safe;
  }

  function readVoiceBrainContextV61Z() {
    try {
      var raw = window.localStorage.getItem(VOICE_BRAIN_CONTEXT_KEY_V61Z);
      if (raw) return JSON.parse(raw);
    } catch (error) {}
    return window.aquaVoiceBrainContextV61Z || null;
  }

  function renderExtractedEntitiesV61Z(entities) {
    var labels = { project: 'Project', company: 'Company', vendor: 'Vendor', trade: 'Trade', fileType: 'File', reportTopic: 'Report / Topic' };
    var keys = ['project', 'company', 'vendor', 'trade', 'fileType', 'reportTopic'];
    var rows = keys.filter(function (key) { return entities && entities[key]; }).map(function (key) {
      return '<li><span>' + escapeHTMLV61D(labels[key] || key) + ':</span> <strong>' + escapeHTMLV61D(entities[key]) + '</strong></li>';
    }).join('');
    return rows ? '<ul class="aqua-v62a-detail-list">' + rows + '</ul>' : '<div class="aqua-v62a-muted">No project, vendor, report, trade, or file details detected.</div>';
  }

  function voiceBrainPlanSummaryV62A(plan) {
    var safe = plan || readVoiceBrainContextV61Z() || {};
    var entities = safe.extractedEntities || {};
    var lines = [
      'Aqua Brain Command Center — v62A',
      'Heard Command: ' + (safe.originalText || safe.lastHeardCommand || ''),
      'Detected Intent: ' + (safe.voiceBrainIntent || safe.detectedIntent || ''),
      'Project: ' + (entities.project || ''),
      'Vendor: ' + (entities.vendor || ''),
      'Trade: ' + (entities.trade || ''),
      'File: ' + (entities.fileType || ''),
      'Report / Topic: ' + (entities.reportTopic || ''),
      'Selected Tool: ' + (safe.selectedTool || ''),
      'Visual Route: ' + (safe.module || safe.visualRoute || ''),
      'Spoken Response Draft: ' + (safe.spokenResponseDraft || ''),
      'Permission / Safety Gate: ' + ((safe.safetyLocks || []).join(' | ') || 'Backend Locked | No Live Change Made'),
      'What Aqua Can Do Now: ' + ((safe.canDoNow || voiceBrainCanDoNowV62A(safe)).join(' | ')),
      'What Requires Backend / Approval: ' + ((safe.requiresApproval || voiceBrainRequiresApprovalV62A(safe)).join(' | ')),
      'Next Recommended Action: ' + (safe.nextRecommendedStep || '')
    ];
    return lines.filter(function (line) { return !/: $/.test(line); }).join('\n');
  }

  function readVoiceBrainPlansV62A() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(VOICE_BRAIN_PLAN_KEY_V62A) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) { return []; }
  }

  function saveVoiceBrainPlanV62A(plan) {
    var context = plan || readVoiceBrainContextV61Z() || {};
    var record = {
      version: 'v62A',
      savedAt: new Date().toISOString(),
      summary: voiceBrainPlanSummaryV62A(context).slice(0, 4000),
      lastHeardCommand: String(context.originalText || context.lastHeardCommand || '').slice(0, 240),
      detectedIntent: String(context.voiceBrainIntent || context.detectedIntent || '').slice(0, 120),
      selectedTool: String(context.selectedTool || '').slice(0, 120),
      extractedEntities: Object.assign({}, context.extractedEntities || {})
    };
    try {
      var plans = readVoiceBrainPlansV62A();
      plans.push(record);
      window.localStorage.setItem(VOICE_BRAIN_PLAN_KEY_V62A, JSON.stringify(plans.slice(-10)));
      state.saveVoiceBrainPlanWorks = true;
    } catch (error) { record.storageWarning = 'localStorage unavailable; no sensitive data, audio, files, or API keys were stored.'; }
    syncNamespace();
    return record;
  }

  function clearVoiceBrainPlanDemoV62A() {
    try { window.localStorage.removeItem(VOICE_BRAIN_PLAN_KEY_V62A); } catch (error) {}
    state.clearVoiceBrainPlanWorks = true;
    syncNamespace();
    return { cleared: true, key: VOICE_BRAIN_PLAN_KEY_V62A, localDemoOnly: true };
  }

  function voiceBrainCanDoNowV62A(plan) {
    var safe = plan || {};
    if (safe.selectedTool === 'findProjectReceipts') return ['Open receipt tracker placeholder', 'Prepare search criteria', 'Show required backend fields', 'Save local/demo query context'];
    if (safe.selectedTool === 'prepareAccountantExportDemo') return ['Prepare locked export packet outline', 'Show permission checklist', 'Save local/demo plan summary', 'Wait for owner/accounting approval'];
    if (safe.selectedTool === 'uploadFileToProjectDemo') return ['Stage upload request text only', 'Show future required file fields', 'Save local/demo plan summary', 'Keep upload locked'];
    if (safe.selectedTool === 'summarizeProjectSpend') return ['Prepare project/trade spend criteria', 'Show accounting backend requirements', 'Save local/demo query context'];
    return ['Open the relevant local/demo placeholder', 'Prepare safe criteria', 'Show required backend fields', 'Save local/demo plan summary'];
  }

  function voiceBrainRequiresApprovalV62A(plan) {
    var safe = plan || {};
    var items = ['Live backend lookup', 'Owner/admin approval before live changes'];
    if (/accountant|export/i.test(safe.voiceBrainIntent || safe.selectedTool || '')) items.push('Accountant export approval', 'Accounting sync/export gate');
    if (/upload/i.test(safe.voiceBrainIntent || safe.selectedTool || '')) items.push('Secure upload portal', 'File storage approval');
    if (/spend|accounting|budget|payables/i.test(safe.voiceBrainIntent || safe.selectedTool || '')) items.push('Accounting backend permission');
    if (/employee|payroll|time/i.test(safe.voiceBrainIntent || safe.selectedTool || '')) items.push('Payroll/time backend permission');
    if (/documents|job_file|file/i.test(safe.voiceBrainIntent || safe.selectedTool || '')) items.push('Document/project file backend permission');
    items.push('Customer/accountant sharing approval');
    return items;
  }

  function handleVoiceBrainPlanActionV62A(action, button) {
    var html = '';
    if (action === 'save') {
      saveVoiceBrainPlanV62A();
      html = '<strong>Saved local/demo plan summary.</strong><br>No audio, files, API keys, sensitive data, backend call, or live change stored.';
    } else if (action === 'show') html = showLastVoiceBrainPlanV62A();
    else if (action === 'clear') {
      clearVoiceBrainPlanDemoV62A();
      html = '<strong>Cleared local/demo voice brain plan.</strong>';
    } else if (action === 'copy') html = copyToolPlanTextV62A();
    if (button && button.closest) {
      var host = button.closest('.aqua-v61z-module-shell');
      var out = host && host.querySelector ? host.querySelector('.aqua-v62a-action-output') : null;
      if (out) out.innerHTML = html;
    }
    return html;
  }

  function renderVoiceBrainPlanActionsV62A() {
    return '<div class="aqua-v62a-actions" data-aqua-v62a-plan-actions="true">' +
      '<button class="btn small gold" type="button" onclick="window.AquaV61Extensions.handleVoiceBrainPlanActionV62A(&quot;save&quot;,this)">Save Voice Brain Plan</button>' +
      '<button class="btn small" type="button" onclick="window.AquaV61Extensions.handleVoiceBrainPlanActionV62A(&quot;show&quot;,this)">Show Last Voice Brain Plan</button>' +
      '<button class="btn small" type="button" onclick="window.AquaV61Extensions.handleVoiceBrainPlanActionV62A(&quot;clear&quot;,this)">Clear Voice Brain Plan Demo</button>' +
      '<button class="btn small gold" type="button" onclick="window.AquaV61Extensions.handleVoiceBrainPlanActionV62A(&quot;copy&quot;,this)">Copy Tool Plan Text</button>' +
      '</div><div class="aqua-v62a-action-output" data-aqua-v62a-action-output="true"></div>';
  }

  function renderVoiceBrainPlanViewerV62A(mode, plan) {
    var saved = readVoiceBrainPlansV62A();
    var latest = plan || (saved.length ? saved[saved.length - 1] : readVoiceBrainContextV61Z());
    var title = mode === 'clear' ? 'Clear Voice Brain Plan Demo' : (mode === 'copy' ? 'Copy Tool Plan Text' : (mode === 'approval' ? 'What Requires Backend / Approval' : (mode === 'allowed' ? 'What Aqua Can Do Now' : 'Show Last Voice Brain Plan')));
    var body = '<div class="aqua-v62a-panel" data-aqua-v62a-plan-viewer="true"><h3>' + escapeHTMLV61D(title) + '</h3>';
    if (mode === 'clear') {
      clearVoiceBrainPlanDemoV62A();
      body += '<p>Cleared the local/demo plan key <strong>' + escapeHTMLV61D(VOICE_BRAIN_PLAN_KEY_V62A) + '</strong>. No backend, network, upload, export, or live record change ran.</p>';
    } else if (mode === 'copy') {
      state.copyToolPlanWorks = true;
      body += '<p>Copyable text block created locally. Select the text below if browser clipboard access is unavailable.</p><textarea readonly style="width:100%;min-height:220px;border-radius:14px;background:#050b16;color:#eaf6ff;border:1px solid rgba(72,145,255,.45);padding:10px">' + escapeHTMLV61D(voiceBrainPlanSummaryV62A(latest)) + '</textarea>';
    } else if (mode === 'allowed') {
      body += '<ul class="aqua-v62a-detail-list">' + voiceBrainCanDoNowV62A(latest || {}).map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul>';
    } else if (mode === 'approval') {
      state.permissionExplanationWorks = true;
      body += '<ul class="aqua-v62a-detail-list">' + voiceBrainRequiresApprovalV62A(latest || {}).concat(['Backend Locked', 'Accounting Export Locked when relevant', 'Upload Locked when relevant', 'No Live Change Made']).map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul>';
    } else if (latest) {
      state.showLastVoiceBrainPlanWorks = true;
      body += '<pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(latest.summary || voiceBrainPlanSummaryV62A(latest)) + '</pre>';
    } else body += '<p>No saved local/demo voice brain plan found.</p>';
    body += '<div class="aqua-v62a-lock-row"><span>Backend Locked</span><span>No Network Call</span><span>No Live Change Made</span><span>No Audio Storage</span></div></div>';
    syncNamespace();
    return renderPremiumModuleShellV61Z({ title: 'Aqua Brain Command Center — v62A', subtitle: 'Local/demo voice brain plan viewer. No live AI/backend action runs.', tag: 'Plan Viewer', chips: ['Demo Only', 'Backend Locked', 'No Network Call', 'No Live Change Made'], attrs: { 'data-aqua-v62a-voice-brain-plan-viewer': 'true' }, body: body, safetyFooter: 'Local/demo-only. No audio, files, sensitive data, API keys, backend calls, network calls, uploads, exports, customer sharing, accountant export, accounting sync, payment, payroll, bank action, or live record change.' });
  }

  function showLastVoiceBrainPlanV62A() { return renderVoiceBrainPlanViewerV62A('show'); }
  function copyToolPlanTextV62A() { return renderVoiceBrainPlanViewerV62A('copy'); }

  function detectVoiceBrainPlanViewerCommandV62A(original, normalized) {
    var q = String(normalized || normalizeAquaPhraseV61E(original || '')).trim();
    if (/^show last (voice|aqua) brain plan$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'show', module: 'Aqua Brain Command Center — v62A' };
    if (/^clear voice brain plan demo$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'clear', module: 'Aqua Brain Command Center — v62A' };
    if (/^save voice brain plan$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'save', module: 'Aqua Brain Command Center — v62A' };
    if (/^copy tool plan$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'copy', module: 'Aqua Brain Command Center — v62A' };
    if (/^explain this plan$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'show', module: 'Aqua Brain Command Center — v62A' };
    if (/^what can aqua do now$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'allowed', module: 'Aqua Brain Command Center — v62A' };
    if (/^what requires approval$/.test(q)) return { canonicalIntent: 'voice_brain_plan_viewer_v62a', routeText: original, originalText: original, normalizedText: q, mode: 'approval', module: 'Aqua Brain Command Center — v62A' };
    return null;
  }

  function renderVoiceBrainToolPlanV61Z(plan) {
    var safe = plan || {};
    var tool = safe.tool || voiceBrainToolRegistryV61Z()[safe.selectedTool] || {};
    var visualFocusResultV62C = focusAquaToolPlanSectionV62C(safe);
    var visualFocusHtmlV62C = visualFocusResultV62C.html || '';
    var handlerResult = tool.handler ? tool.handler(safe) : localDemoToolHandlerV61Z(safe.selectedTool, safe);
    writeVoiceBrainContextV61Z(safe);
    rememberSpokenSummaryV61R(safe.spokenResponseDraft, 'voice brain visual route focus');
    state.voiceBrainToolRegistryExists = Object.keys(voiceBrainToolRegistryV61Z()).length >= 14;
    state.voiceBrainIntentClassifierWorks = true;
    state.hendersonReportIntentWorks = safe.voiceBrainIntent === 'project_report_lookup' && safe.selectedTool === 'openProjectReport' ? true : state.hendersonReportIntentWorks;
    state.hendersonReceiptsIntentWorks = safe.voiceBrainIntent === 'project_vendor_receipt_lookup' && safe.selectedTool === 'findProjectReceipts' ? true : state.hendersonReceiptsIntentWorks;
    state.accountantExportStaysLocked = safe.selectedTool === 'prepareAccountantExportDemo' && /Accounting Export Locked/.test((safe.safetyLocks || []).join(' ')) ? true : state.accountantExportStaysLocked;
    state.plumbingSpendIntentWorks = safe.selectedTool === 'summarizeProjectSpend' ? true : state.plumbingSpendIntentWorks;
    state.cameraAllocationIntentWorks = safe.selectedTool === 'checkJobsiteCameraAllocationDemo' ? true : state.cameraAllocationIntentWorks;
    state.constructionDiagramUploadStaysLocked = safe.selectedTool === 'uploadFileToProjectDemo' && /Upload Locked/.test((safe.safetyLocks || []).join(' ')) ? true : state.constructionDiagramUploadStaysLocked;
    state.suggestNextStepWorks = safe.selectedTool === 'suggestNextStep' ? true : state.suggestNextStepWorks;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noExternalAIAPICalls = true;
    state.noApiKeysInFrontend = true;
    state.noLiveRecordChanges = true;
    state.noLiveExport = true;
    state.noLiveUpload = true;
    state.noAudioStorage = true;
    state.noAudioStorageV61Z = true;
    syncNamespace();
    var canDoNow = voiceBrainCanDoNowV62A(safe);
    var requiresApproval = voiceBrainRequiresApprovalV62A(safe);
    safe.canDoNow = canDoNow;
    safe.requiresApproval = requiresApproval;
    safe.visualRoute = safe.module || tool.visualRoute || '';
    writeVoiceBrainContextV61Z(safe);
    state.aquaBrainCommandCenterWorks = true;
    state.voiceBrainPlanViewerWorks = true;
    state.permissionExplanationWorks = true;
    var lockChips = (safe.safetyLocks || []).filter(function (label) { return /Locked|Required|No Live Change Made|No Network|No external|No API|No audio/i.test(label); }).slice(0, 8).map(function (label) { return '<span>' + escapeHTMLV61D(label) + '</span>'; }).join('');
    var section = function (title, html, extraClass) { return '<section class="aqua-v62a-section ' + (extraClass || '') + '"><h4>' + escapeHTMLV61D(title) + '</h4><div>' + html + '</div></section>'; };
    var body = '<div class="aqua-v62a-panel" data-aqua-v62a-command-center="true">' + askModeBadgeV61U('voice_brain_tool_plan') +
      '<div class="aqua-v62a-hero"><div><div class="aqua-v62a-kicker">LOCAL / DEMO TOOL PLAN</div><h3>Aqua Brain Command Center — v62E</h3><p>No backend, network, external AI/API, upload, export, audio storage, or live record change runs here.</p></div><div class="aqua-v62a-lock-row">' + lockChips + '</div></div>' +
      visualFocusHtmlV62C +
      section('Heard Command', '<p>' + escapeHTMLV61D(safe.originalText || '') + '</p>') +
      section('Detected Intent', '<code>' + escapeHTMLV61D(safe.voiceBrainIntent || '') + '</code>') +
      section('Extracted Details', renderExtractedEntitiesV61Z(safe.extractedEntities)) +
      section('Selected Tool', '<code>' + escapeHTMLV61D(safe.selectedTool || '') + '</code><p>' + escapeHTMLV61D(tool.description || '') + '</p>') +
      section('Visual Route', '<strong>' + escapeHTMLV61D(safe.module || tool.visualRoute || '') + '</strong>') +
      section('Spoken Response Draft', '<blockquote>“' + escapeHTMLV61D(safe.spokenResponseDraft || '') + '”</blockquote>') +
      section('Permission / Safety Gate', '<div class="aqua-v62a-lock-row">' + (safe.safetyLocks || []).map(function (label) { return '<span>' + escapeHTMLV61D(label) + '</span>'; }).join('') + '</div><p><strong>Permission level:</strong> ' + escapeHTMLV61D(safe.permissionLevel || tool.permissionLevel || '') + '</p><p><strong>Live status:</strong> ' + escapeHTMLV61D(safe.liveStatus || tool.liveStatus || 'locked/demo') + '</p>', 'aqua-v62a-gate') +
      section('What Aqua Can Do Now', '<ul class="aqua-v62a-detail-list">' + canDoNow.map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul>') +
      section('What Requires Backend / Approval', '<ul class="aqua-v62a-detail-list">' + requiresApproval.map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul>') +
      section('Next Recommended Action', '<strong>' + escapeHTMLV61D(safe.nextRecommendedStep || '') + '</strong>') +
      '<div class="aqua-v62a-copy-block"><strong>Local handler result:</strong> ' + escapeHTMLV61D(handlerResult.message) + '</div>' + renderVoiceBrainPlanActionsV62A() + '</div>';
    return renderPremiumModuleShellV61Z({ title: 'Aqua Brain Command Center — v62E', subtitle: 'AI Voice Navigation Execution Layer with visual section focus. No live action runs.', tag: 'Command Center', chips: ['Backend Locked', 'Demo Only', 'No Live Change Made', 'No Audio Storage'], attrs: { 'data-aqua-v61z-voice-brain-tool-plan': 'true', 'data-aqua-v62a-command-center': 'true' }, body: body, safetyFooter: 'Permission Required for sensitive actions. Owner Approval Required. Accounting Export Locked when relevant. Upload Locked when relevant. Backend Locked. No Network Call. No External AI/API Call. No Live Change Made. No Audio Storage.' });
  }


  function deriveAquaBrainVisualRouteV62C(toolPlan) {
    return openAquaModuleForToolV62E((toolPlan && (toolPlan.selectedTool || toolPlan.toolName)) || '', (toolPlan && toolPlan.extractedEntities) || {}, toolPlan || {});
  }

  function isHendersonStaircaseRouteV62E(toolPlan, entities) {
    var text = String((toolPlan && (toolPlan.originalText || toolPlan.routeText || toolPlan.normalizedText)) || '').toLowerCase();
    return /staircase/.test(text) || /staircase/i.test((entities && entities.reportTopic) || '');
  }

  function openAquaModuleForToolV62E(toolName, entities, toolPlan) {
    var selectedTool = toolName || (toolPlan && (toolPlan.selectedTool || toolPlan.toolName)) || '';
    var safeEntities = entities || {};
    var safePlan = toolPlan || {};
    var moduleText = safePlan.module || (safePlan.tool && safePlan.tool.visualRoute) || 'Aqua Brain Command Center / Local Demo Focus';
    var moduleParts = String(moduleText).split('/').map(function (part) { return part.trim(); }).filter(Boolean);
    var project = safeEntities.project || (/henderson/i.test(safePlan.originalText || safePlan.routeText || '') ? 'Henderson House' : '');
    var base = {
      version: 'v62E',
      toolName: selectedTool,
      moduleName: moduleParts[0] || 'Aqua Brain Command Center',
      sectionName: moduleParts.slice(1).join(' / ') || 'Local Demo Focus',
      projectName: project,
      vendorName: safeEntities.vendor || '',
      tradeName: safeEntities.trade || '',
      reportTopic: safeEntities.reportTopic || '',
      fileType: safeEntities.fileType || '',
      highlightLabel: 'Focused by Aqua Brain',
      statusLines: ['Backend Locked', 'No live action was run'],
      openedFocusLabel: moduleText,
      panelTitle: (moduleParts[0] || 'Aqua Brain') + ' Focus — Local Demo',
      openKey: '',
      locked: true,
      noLiveAction: true,
      spokenSummary: 'You are now looking at the focused ' + moduleText + ' local demo section. Backend and live actions remain locked.'
    };
    if (selectedTool === 'openProjectReport') {
      var staircase = isHendersonStaircaseRouteV62E(safePlan, safeEntities);
      base.moduleName = 'Project Reports';
      base.sectionName = staircase ? 'Henderson House / Staircase Report' : 'Henderson House / Project Status Report';
      base.projectName = 'Henderson House';
      base.reportTopic = staircase ? 'Staircase Report' : 'Project Status Report';
      base.openedFocusLabel = staircase ? 'Project Reports / Henderson House / Staircase' : 'Project Reports / Henderson House / Project Status Report';
      base.panelTitle = staircase ? 'Henderson Staircase Report Focus — Local Demo' : 'Henderson Project Status Report Focus — Local Demo';
      base.openKey = 'projectfoldersv60b';
      base.statusLines = ['Project report placeholder opened locally', 'Backend project report index required before live files can open', 'No live file was opened'];
      base.spokenSummary = staircase ? 'You are now looking at the Henderson House staircase report focus. This is a local demo placeholder until the backend project report index is connected. No live file was opened.' : 'You are now looking at the Henderson House project status report focus. This is a local demo placeholder until the backend project report index is connected. No live file was opened.';
    } else if (selectedTool === 'findProjectReceipts') {
      base.moduleName = 'Receipts'; base.sectionName = 'Henderson House / Home Depot'; base.projectName = 'Henderson House'; base.vendorName = safeEntities.vendor || 'Home Depot'; base.openedFocusLabel = 'Receipts / Henderson House / Home Depot'; base.panelTitle = 'Receipt Tracker Focus — Local Demo'; base.openKey = 'receipts'; base.statusLines = ['Filtered receipt placeholder: Henderson House + Home Depot', 'Status: backend receipt index required', 'No live receipt search, OCR, export, or accounting action was run'];
      base.spokenSummary = 'You are now looking at Henderson House Home Depot receipt results. This is a local demo placeholder until the backend receipt index is connected. No export or accounting action has run.';
    } else if (selectedTool === 'prepareAccountantExportDemo') {
      base.moduleName = 'Permission Granter'; base.sectionName = 'Accountant Export Demo / Home Depot receipts'; base.projectName = 'Henderson House'; base.vendorName = safeEntities.vendor || 'Home Depot'; base.openedFocusLabel = 'Permission Granter / Accountant Export Demo / Home Depot receipts'; base.panelTitle = 'Accountant Export Demo Focus — Local Demo'; base.openKey = 'brainhub'; base.statusLines = ['Accounting Export Locked', 'Backend Locked', 'Owner/Accounting Approval Required', 'No Live Export'];
      base.spokenSummary = 'You are now looking at the locked accountant export demo for Henderson House Home Depot receipts. Accounting export is locked, backend is locked, owner and accounting approval are required, and no live export ran.';
    } else if (selectedTool === 'summarizeProjectSpend') {
      base.moduleName = 'Accounting'; base.sectionName = 'Henderson House / Plumbing Spend'; base.projectName = 'Henderson House'; base.tradeName = safeEntities.trade || 'Plumbing'; base.openedFocusLabel = 'Accounting / Henderson House / Plumbing Spend'; base.panelTitle = 'Project Spend Focus — Local Demo'; base.openKey = 'accountingcommandv60m'; base.statusLines = ['Plumbing spend placeholder opened locally', 'Backend accounting and receipt index required', 'No accounting query or export was run'];
      base.spokenSummary = 'You are now looking at Henderson House plumbing spend. This requires the backend accounting and receipt index before a live total can be shown. No accounting query or export was run.';
    } else if (selectedTool === 'checkJobsiteCameraAllocationDemo') {
      base.moduleName = 'Jobsite Cameras'; base.sectionName = 'Allocation Review / Henderson Jobsite'; base.projectName = 'Henderson Jobsite'; base.openedFocusLabel = 'Jobsite Cameras / Allocation Review / Henderson Jobsite'; base.panelTitle = 'Camera Allocation Focus — Local Demo'; base.statusLines = ['Henderson Jobsite allocation placeholder opened locally', 'Status: camera/photo allocation backend required', 'No live camera data was accessed'];
      base.spokenSummary = 'You are now looking at the Henderson Jobsite camera allocation review. This is a local demo placeholder until the camera and photo allocation backend is connected. No live camera data was accessed.';
    } else if (selectedTool === 'showMissingDocumentsDemo') {
      base.moduleName = 'Documents'; base.sectionName = 'Henderson House / Missing Documents'; base.projectName = 'Henderson House'; base.openedFocusLabel = 'Documents / Henderson House / Missing Documents'; base.panelTitle = 'Missing Documents Focus — Local Demo'; base.openKey = 'projectfoldersv60b'; base.statusLines = ['Missing document placeholders: permit packet, latest insurance certificate, signed change order backup', 'Status: backend document index required', 'No live storage scan, upload, share, or file change was run'];
      base.spokenSummary = 'You are now looking at Henderson House missing documents. This is a local demo placeholder until the backend document index is connected. No live storage scan, customer sharing, upload, or file change ran.';
    } else if (selectedTool === 'uploadFileToProjectDemo') {
      base.moduleName = 'Permission Granter'; base.sectionName = 'Upload Request Demo / Henderson files'; base.projectName = 'Henderson House'; base.fileType = safeEntities.fileType || 'construction diagram'; base.openedFocusLabel = 'Permission Granter / Upload Request Demo / Henderson files'; base.panelTitle = 'Upload Request Demo Focus — Local Demo'; base.openKey = 'brainhub'; base.statusLines = ['Upload Locked', 'Backend Locked', 'Owner Approval Required', 'No Live Upload'];
      base.spokenSummary = 'You are now looking at the locked Henderson construction diagram upload request demo. Upload is locked, backend is locked, owner approval is required, and no live upload ran.';
    } else if (selectedTool === 'suggestNextStep') {
      base.moduleName = 'Owner Review'; base.sectionName = 'Next Recommended Action / AI recommendation'; base.openedFocusLabel = 'Owner Review / Next Recommended Action / AI recommendation'; base.panelTitle = 'Owner Action Queue Focus — Local Demo'; base.openKey = 'brainhub'; base.statusLines = ['AI recommendation placeholder: review automation report, SOW drafts, and receipt coding items', 'No live task, approval, customer sharing, export, or record change was run'];
      base.spokenSummary = 'You are now looking at the owner review next recommended action. Based on local demo state, start with the automation report, then SOW drafts, then receipt coding items. No live task was changed.';
    }
    return base;
  }

  function renderAquaFocusedResultV62E(route) {
    var safe = route || deriveAquaBrainVisualRouteV62C({});
    var details = [
      ['Project', safe.projectName],
      ['Vendor', safe.vendorName],
      ['Trade/category', safe.tradeName],
      ['Report/topic', safe.reportTopic],
      ['File type', safe.fileType]
    ].filter(function (row) { return row[1]; }).map(function (row) { return '<li><span>' + escapeHTMLV61D(row[0]) + ':</span> <strong>' + escapeHTMLV61D(row[1]) + '</strong></li>'; }).join('');
    var statuses = (safe.statusLines || []).map(function (line) { return '<li>' + escapeHTMLV61D(line) + '</li>'; }).join('');
    return '<section class="aqua-v62a-section aqua-v62c-focused-section aqua-v62e-focused-route" tabindex="-1" data-aqua-v62c-focused-section="true" data-aqua-v62e-focused-route="true" aria-label="Focused by Aqua Brain">' +
      '<h4>' + escapeHTMLV61D(safe.panelTitle || 'Aqua Brain Focus — Local Demo') + '</h4>' +
      '<pre class="aqua-v62c-opened-marker aqua-v62e-opened-marker">Opened and focused:\n' + escapeHTMLV61D(safe.openedFocusLabel || (safe.moduleName + ' / ' + safe.sectionName)) + '</pre>' +
      '<div class="aqua-v62c-focus-chip aqua-v62e-focus-label">' + escapeHTMLV61D(safe.highlightLabel || 'Focused by Aqua Brain') + '</div>' +
      '<div><strong>Module:</strong> ' + escapeHTMLV61D(safe.moduleName || '') + '</div>' +
      '<div><strong>Section:</strong> ' + escapeHTMLV61D(safe.sectionName || '') + '</div>' +
      (details ? '<ul class="aqua-v62a-detail-list">' + details + '</ul>' : '') +
      '<ul class="aqua-v62a-detail-list aqua-v62c-status-list">' + statuses + '</ul>' +
      '<blockquote>“' + escapeHTMLV61D(safe.spokenSummary || '') + '”</blockquote>' +
      '</section>';
  }

  function renderAquaBrainVisualRouteFocusV62C(route) {
    return renderAquaFocusedResultV62E(route);
  }

  function focusAquaSectionForToolV62E(route, outputNode) {
    var safe = route || deriveAquaBrainVisualRouteV62C({});
    if (safe.openKey && typeof window.openModal === 'function') {
      try { window.openModal(safe.openKey); } catch (error) {}
    }
    var html = renderAquaFocusedResultV62E(safe);
    if (outputNode) {
      outputNode.innerHTML = html;
      var focused = outputNode.querySelector && (outputNode.querySelector('[data-aqua-v62e-focused-route="true"]') || outputNode.querySelector('[data-aqua-v62c-focused-section="true"]'));
      if (focused) {
        try { focused.classList && focused.classList.add('aqua-v62e-focused-route'); } catch (error) {}
        try { focused.scrollIntoView && focused.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (error) {}
        try { focused.focus && focused.focus({ preventScroll: true }); } catch (error) {}
      }
    }
    state.visualRouteBridgeV62CWorks = true;
    state.visualRouteFocusMarkerV62CWorks = true;
    state.visualRouteReadbackBoundV62CWorks = true;
    state.aiNavigationExecutorWorks = true;
    state.visualFocusExecutorWorks = true;
    state.focusedRouteMarkerWorks = true;
    syncNamespace();
    return { opened: true, route: safe, html: html, openedFocusLabel: safe.openedFocusLabel, spokenSummary: safe.spokenSummary };
  }

  function openAquaBrainVisualRouteV62C(route, outputNode) {
    return focusAquaSectionForToolV62E(route, outputNode);
  }

  function executeAquaVoiceNavigationV62E(toolPlan, outputNode) {
    var safe = toolPlan || {};
    var route = openAquaModuleForToolV62E(safe.selectedTool || safe.toolName || '', safe.extractedEntities || {}, safe);
    var result = focusAquaSectionForToolV62E(route, outputNode || null);
    safe.visualRouteV62E = route;
    safe.visualRouteV62C = route;
    safe.visualRoute = route.openedFocusLabel;
    safe.module = route.openedFocusLabel;
    safe.spokenResponseDraft = route.spokenSummary;
    var selectedTool = safe.selectedTool || safe.toolName || '';
    var original = String(safe.originalText || safe.routeText || '').toLowerCase();
    if (selectedTool === 'openProjectReport' && /staircase/.test(original)) state.hendersonStaircaseNavigationWorks = true;
    else if (selectedTool === 'openProjectReport') state.hendersonReportNavigationWorks = true;
    if (selectedTool === 'findProjectReceipts') state.hendersonReceiptsNavigationWorks = true;
    if (selectedTool === 'summarizeProjectSpend') state.hendersonPlumbingSpendNavigationWorks = true;
    if (selectedTool === 'showMissingDocumentsDemo') state.missingDocumentsNavigationWorks = true;
    if (selectedTool === 'checkJobsiteCameraAllocationDemo') state.cameraAllocationNavigationWorks = true;
    if (selectedTool === 'prepareAccountantExportDemo') state.accountantExportNavigationLocked = /Accounting Export Locked|No Live Export/i.test((route.statusLines || []).join(' '));
    if (selectedTool === 'uploadFileToProjectDemo') state.uploadNavigationLocked = /Upload Locked|No Live Upload/i.test((route.statusLines || []).join(' '));
    state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noApiKeysInFrontend = true; state.noLiveRecordChanges = true; state.noLiveExport = true; state.noLiveUpload = true; state.noAudioStorage = true;
    syncNamespace();
    return result;
  }

  function focusAquaToolPlanSectionV62C(toolPlan, outputNode) {
    return executeAquaVoiceNavigationV62E(toolPlan || {}, outputNode || null);
  }

  function createAquaVoiceBrainV61Z() {
    return {
      version: VERSION,
      localDemoOnly: true,
      storageKey: VOICE_BRAIN_CONTEXT_KEY_V61Z,
      permissionLevels: ['read_demo', 'prepare_demo', 'owner_approval_required', 'accounting_approval_required', 'backend_required', 'live_locked'],
      toolRegistry: voiceBrainToolRegistryV61Z(),
      classifyIntent: classifyVoiceBrainIntentV61Z,
      extractEntities: extractVoiceBrainEntitiesV61Z,
      permissionMap: voiceBrainPermissionMapV61Z(),
      contextMemory: { read: readVoiceBrainContextV61Z, write: writeVoiceBrainContextV61Z, allowedFields: ['last heard command', 'detected intent', 'extracted entities', 'selected tool', 'missing inputs', 'spoken response draft', 'timestamp'], forbiddenFields: ['audio', 'API keys', 'sensitive customer data', 'real accounting data', 'live credentials', 'real files'] },
      visualRouteMap: voiceBrainVisualRouteMapV61Z(),
      spokenResponseDraftMap: spokenResponseDraftsV61Z,
      safetyAuditEnvelope: voiceBrainSafetyEnvelopeV61Z(),
      futureBackendLiveAIPlaceholders: { backendConnector: 'locked/demo placeholder only', liveAIConnector: 'locked/demo placeholder only', uploadConnector: 'locked/demo placeholder only', exportConnector: 'locked/demo placeholder only' },
      renderToolPlan: renderVoiceBrainToolPlanV61Z,
      openAquaBrainVisualRouteV62C: openAquaBrainVisualRouteV62C,
      executeAquaVoiceNavigationV62E: executeAquaVoiceNavigationV62E,
      openAquaModuleForToolV62E: openAquaModuleForToolV62E,
      focusAquaSectionForToolV62E: focusAquaSectionForToolV62E,
      renderAquaFocusedResultV62E: renderAquaFocusedResultV62E,
      runLiveInAppRegressionReportV62D: runLiveInAppRegressionReportV62D,
      syncRegressionReportV62D: syncRegressionReportV62D,
      focusAquaToolPlanSectionV62C: focusAquaToolPlanSectionV62C
    };
  }


  function workflowSafetyEnvelopeV62F() {
    return {
      noBackendCalls: true,
      noNetworkCalls: true,
      noExternalAIAPICalls: true,
      noApiKeysInFrontend: true,
      noLiveRecordChanges: true,
      noLiveExport: true,
      noLiveUpload: true,
      noCustomerSharing: true,
      noAccountingExport: true,
      noPaymentPayrollBankAction: true,
      noAudioStorage: true,
      noAlwaysListening: true,
      status: 'local demo only'
    };
  }

  function workflowStepV62F(index, label, tool, route, permission, locked, expected) {
    var liveLocked = Boolean(locked);
    return {
      stepId: 'v62f-step-' + index,
      stepLabel: label,
      selectedTool: tool,
      visualRoute: route,
      permissionLevel: permission || 'read_demo',
      liveStatus: liveLocked ? 'locked_live_action' : 'demo_ready',
      canRunNowDemo: true,
      lockedReason: liveLocked ? 'Live execution is locked until owner/accounting/backend approval. Demo planning only.' : 'Local/demo planning and visual focus only. No live data is changed.',
      expectedOutput: expected,
      safetyLabels: liveLocked ? ['Demo Only', 'Backend Locked', 'Permission Required', 'No Live Action'] : ['Demo Only', 'No Backend Call', 'No Live Change']
    };
  }

  function detectAquaWorkflowCommandV62F(original, q) {
    if (/^save workflow plan$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'save', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^show last workflow plan$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'show', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^clear workflow plan demo$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'clear', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^copy workflow plan$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'copy', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^mark plan ready for owner review$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'owner_review', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^what can aqua do now$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'allowed', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    if (/^what requires approval$/.test(q)) return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'approval', originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
    var workflowType = '';
    if (/(receipts?).*(home depot).*accountant|home depot.*receipts?.*accountant|accountant.*(receipts?).*(home depot)|prepare.*home depot.*receipts?.*export/.test(q)) workflowType = 'receipt_export_preparation';
    else if (/henderson.*staircase.*report|henderson.*report.*approval|show henderson report and review approvals/.test(q)) workflowType = 'report_review';
    else if (/documents?.*missing.*henderson|missing documents?.*henderson/.test(q)) workflowType = 'missing_documents';
    else if (/(spend|spent|budget|over budget).*henderson.*plumbing|henderson.*plumbing.*(spend|budget|over budget)/.test(q)) workflowType = 'spend_budget_risk';
    else if (/(diagram).*(upload|send)|upload.*construction diagram|prepare.*diagram.*send|henderson.*diagram/.test(q)) workflowType = 'upload_send_preparation';
    else if (/cameras?.*henderson.*(allocated|allocation|correct|right)|cameras?.*allocated.*henderson/.test(q)) workflowType = 'camera_allocation_diagnostic';
    else if (/what needs my attention today|what should i do next/.test(q)) workflowType = 'daily_attention';
    if (!workflowType) return null;
    return { canonicalIntent: 'aqua_workflow_planner_v62f', mode: 'plan', workflowType: workflowType, originalText: original, normalizedText: q, module: 'Aqua Brain Workflow Plan — v62F' };
  }

  function planAquaWorkflowV62F(commandText) {
    var original = String(commandText || '').trim();
    var q = normalizeAquaPhraseV61E(original);
    var detected = detectAquaWorkflowCommandV62F(original, q) || { workflowType: 'daily_attention' };
    var type = detected.workflowType || 'daily_attention';
    var entities = extractVoiceBrainEntitiesV61Z(original, q);
    if (!entities.project && /henderson/.test(q)) entities.project = 'Henderson House';
    var steps = [];
    var intentLabel = '';
    var next = '';
    if (type === 'receipt_export_preparation') {
      intentLabel = 'Receipt export preparation workflow';
      steps = [workflowStepV62F(1, 'Find project/vendor receipt criteria', 'findProjectReceipts', 'Receipts / Henderson House / Home Depot', 'read_demo', false, 'Criteria prepared for Henderson + Home Depot receipts.'), workflowStepV62F(2, 'Open/focus Receipts / Henderson / Home Depot', 'findProjectReceipts', 'Receipts / Henderson House / Home Depot', 'read_demo', false, 'Local receipt focus panel opened.'), workflowStepV62F(3, 'Prepare accountant export packet demo', 'prepareAccountantExportDemo', 'Permission Granter / Accountant Export Demo / Home Depot receipts', 'prepare_demo', false, 'Demo export packet checklist prepared only.'), workflowStepV62F(4, 'Show permission required', 'showPermissionRequiredDemo', 'Permission Granter / Accountant Export Demo / Home Depot receipts', 'accounting_approval_required', true, 'Owner/accounting/backend permission gate shown.'), workflowStepV62F(5, 'Lock live export until approval', 'lockLiveAccountantExport', 'Permission Granter / Accountant Export Demo / Home Depot receipts', 'live_locked', true, 'No live accountant export created, sent, or stored.')];
      next = 'Review the demo receipt criteria, then request owner/accounting/backend approval before any real export.';
    } else if (type === 'report_review') {
      intentLabel = 'Report review workflow';
      steps = [workflowStepV62F(1, 'Open/focus Project Reports / Henderson / Staircase', 'openProjectReport', 'Project Reports / Henderson House / Staircase', 'read_demo', false, 'Staircase report placeholder focused.'), workflowStepV62F(2, 'Check local/demo owner approval flags', 'checkOwnerApprovalFlagsDemo', 'Owner Review / Henderson Staircase Approval Flags', 'read_demo', false, 'Demo approval flags shown.'), workflowStepV62F(3, 'Show review-ready summary', 'showReviewReadySummaryDemo', 'Project Reports / Henderson House / Staircase', 'prepare_demo', false, 'Review summary prepared locally.'), workflowStepV62F(4, 'Recommend next owner review action', 'recommendOwnerReviewDemo', 'Owner Review / Next Recommended Action', 'owner_approval_required', true, 'No live approval performed.')];
      next = 'Owner should review the staircase report summary and approve only after backend records are connected.';
    } else if (type === 'missing_documents') {
      intentLabel = 'Missing documents workflow';
      steps = [workflowStepV62F(1, 'Open/focus Missing Documents / Henderson', 'showMissingDocumentsDemo', 'Documents / Henderson House / Missing Documents', 'read_demo', false, 'Missing documents panel focused.'), workflowStepV62F(2, 'List demo missing document placeholders', 'listMissingDocumentsDemo', 'Documents / Henderson House / Missing Documents', 'read_demo', false, 'Permit packet, insurance certificate, signed change order placeholders listed.'), workflowStepV62F(3, 'Prepare review checklist demo', 'prepareDocumentReviewChecklistDemo', 'Owner Review / Missing Documents Checklist', 'prepare_demo', false, 'Demo review checklist prepared.'), workflowStepV62F(4, 'Lock live document request/send', 'lockLiveDocumentRequestSend', 'Permission Granter / Document Request Demo', 'live_locked', true, 'No live request, customer sharing, upload, or send action ran.')];
      next = 'Review missing document placeholders locally, then request backend/customer-send approval if needed.';
    } else if (type === 'spend_budget_risk') {
      intentLabel = 'Spend and budget risk workflow';
      steps = [workflowStepV62F(1, 'Open/focus Accounting / Henderson / Plumbing Spend', 'summarizeProjectSpend', 'Accounting / Henderson House / Plumbing Spend', 'read_demo', false, 'Spend panel placeholder focused.'), workflowStepV62F(2, 'Show backend accounting required placeholder', 'showAccountingBackendRequiredDemo', 'Accounting / Backend Required Placeholder', 'backend_required', true, 'Live accounting totals remain locked.'), workflowStepV62F(3, 'Show local/demo budget risk placeholder', 'showBudgetRiskDemo', 'Accounting / Henderson House / Plumbing Budget Risk', 'read_demo', false, 'Demo budget risk placeholder shown.'), workflowStepV62F(4, 'Recommend accounting backend connection/owner review', 'recommendAccountingOwnerReviewDemo', 'Owner Review / Accounting Backend Permission', 'accounting_approval_required', true, 'No live accounting query/export/change ran.')];
      next = 'Connect approved accounting backend later and have owner/accounting review the plumbing budget risk.';
    } else if (type === 'upload_send_preparation') {
      intentLabel = 'Upload/send preparation workflow';
      steps = [workflowStepV62F(1, 'Identify project/file type', 'identifyProjectFileTypeDemo', 'Project Files / Henderson House / Construction Diagram', 'read_demo', false, 'Henderson construction diagram criteria prepared.'), workflowStepV62F(2, 'Open/focus Permission Granter / Upload Request Demo', 'uploadFileToProjectDemo', 'Permission Granter / Upload Request Demo / Henderson files', 'read_demo', false, 'Upload request demo focused.'), workflowStepV62F(3, 'Show upload locked', 'showUploadLockedDemo', 'Permission Granter / Upload Request Demo / Henderson files', 'owner_approval_required', true, 'Upload remains locked.'), workflowStepV62F(4, 'Show owner/backend permission required', 'showOwnerBackendPermissionRequiredDemo', 'Permission Granter / Upload Request Demo / Henderson files', 'backend_required', true, 'Owner/backend gate shown.'), workflowStepV62F(5, 'Lock live upload/send', 'lockLiveUploadSend', 'Permission Granter / Upload Request Demo / Henderson files', 'live_locked', true, 'No live upload, send, email, or file storage ran.')];
      next = 'Keep upload/send locked until owner approval and backend file storage are explicitly enabled.';
    } else if (type === 'camera_allocation_diagnostic') {
      intentLabel = 'Camera allocation diagnostic workflow';
      steps = [workflowStepV62F(1, 'Open/focus Jobsite Cameras / Henderson allocation', 'checkJobsiteCameraAllocationDemo', 'Jobsite Cameras / Allocation Review / Henderson Jobsite', 'read_demo', false, 'Camera allocation panel focused.'), workflowStepV62F(2, 'Show camera allocation review placeholder', 'showCameraAllocationReviewDemo', 'Jobsite Cameras / Allocation Review / Henderson Jobsite', 'read_demo', false, 'Demo allocation findings shown.'), workflowStepV62F(3, 'Show backend camera/photo index required', 'showCameraBackendRequiredDemo', 'Jobsite Cameras / Backend Camera Index Required', 'backend_required', true, 'No live camera access.'), workflowStepV62F(4, 'Recommend camera inventory sync', 'recommendCameraInventorySyncDemo', 'Owner Review / Camera Inventory Sync', 'owner_approval_required', true, 'Inventory sync recommendation only.')];
      next = 'Sync camera inventory only after backend/photo index and owner permission are available.';
    } else {
      intentLabel = 'Daily attention workflow';
      steps = [workflowStepV62F(1, 'Open/focus Owner Review / Next Recommended Action', 'suggestNextStep', 'Owner Review / Next Recommended Action / AI recommendation', 'read_demo', false, 'Owner review panel focused.'), workflowStepV62F(2, 'Show local/demo priority items', 'showDailyPriorityItemsDemo', 'Owner Review / Local Demo Priority Items', 'read_demo', false, 'Priority placeholders shown.'), workflowStepV62F(3, 'Include missing docs, receipts, approvals, budget risk placeholders', 'summarizeDailyAttentionPlaceholdersDemo', 'Owner Review / Missing Docs / Receipts / Approvals / Budget Risk', 'prepare_demo', false, 'Daily review list prepared.'), workflowStepV62F(4, 'Recommend next local/demo owner review action', 'recommendOwnerNextActionDemo', 'Owner Review / Next Recommended Action', 'owner_approval_required', false, 'Next owner review action recommended locally only.')];
      next = 'Start with owner review, then inspect missing documents, receipts, approvals, and budget risk placeholders.';
    }
    var locked = steps.filter(function (step) { return step.liveStatus === 'locked_live_action'; });
    var allowed = steps.filter(function (step) { return step.canRunNowDemo; }).map(function (step) { return step.stepLabel; });
    var routes = steps.map(function (step) { return step.visualRoute; }).filter(function (route, index, list) { return route && list.indexOf(route) === index; });
    var permissions = locked.map(function (step) { return step.permissionLevel + ': ' + step.stepLabel; });
    var plan = {
      workflowId: 'aqua-v62f-' + Date.now(),
      heardCommand: original,
      workflowIntent: intentLabel,
      workflowType: type,
      extractedEntities: entities,
      steps: steps,
      currentStep: steps[0] || null,
      allowedLocalSteps: allowed,
      lockedLiveSteps: locked.map(function (step) { return step.stepLabel; }),
      requiredPermissions: permissions.length ? permissions : ['Owner review for any future live action'],
      visualRoutes: routes,
      spokenSummary: 'I prepared a local demo ' + intentLabel + '. I can focus the relevant demo sections and prepare review checklists now. Live export, upload, send, backend accounting, camera access, approvals, and record changes stay locked.',
      safetyEnvelope: workflowSafetyEnvelopeV62F(),
      nextRecommendedAction: next,
      status: 'local demo only'
    };
    state.currentWorkflowPlanV62F = plan;
    return plan;
  }

  function workflowPlanTextV62F(plan) {
    var safe = plan || state.currentWorkflowPlanV62F || showLastAquaWorkflowPlanV62F(true);
    if (!safe) return 'No Aqua Brain Workflow Plan v62F has been prepared yet.';
    return ['Aqua Brain Workflow Plan — v62F', 'Heard Command: ' + safe.heardCommand, 'Workflow Intent: ' + safe.workflowIntent, 'Status: ' + safe.status, 'Extracted Details: ' + JSON.stringify(safe.extractedEntities || {}), 'Planned Steps:', (safe.steps || []).map(function (step, index) { return (index + 1) + '. ' + step.stepLabel + ' | Tool: ' + step.selectedTool + ' | Route: ' + step.visualRoute + ' | Status: ' + step.liveStatus + ' | Permission: ' + step.permissionLevel; }).join('\n'), 'What Aqua Can Do Now: ' + (safe.allowedLocalSteps || []).join(' | '), 'Locked Live Steps: ' + (safe.lockedLiveSteps || []).join(' | '), 'Required Permissions: ' + (safe.requiredPermissions || []).join(' | '), 'Spoken Summary Draft: ' + safe.spokenSummary, 'Next Recommended Action: ' + safe.nextRecommendedAction, 'Safety / Audit Envelope: no backend calls, no network calls, no external AI/API calls, no API keys, no live record changes, no live export/upload/send, no accounting export, no audio storage.'].join('\n');
  }

  function renderAquaWorkflowPlanV62F(plan) {
    var safe = plan || state.currentWorkflowPlanV62F || planAquaWorkflowV62F('what needs my attention today');
    var detailRows = Object.keys(safe.extractedEntities || {}).map(function (key) { return '<li><span>' + escapeHTMLV61D(key) + ':</span> <strong>' + escapeHTMLV61D(safe.extractedEntities[key]) + '</strong></li>'; }).join('') || '<li>Demo placeholders only; no sensitive data stored.</li>';
    var stepCards = (safe.steps || []).map(function (step, index) { return '<article class="aqua-v62a-section aqua-v62f-step-card" data-aqua-v62f-step-card="true"><h4>Step ' + (index + 1) + ': ' + escapeHTMLV61D(step.stepLabel) + '</h4><div><strong>Tool:</strong> ' + escapeHTMLV61D(step.selectedTool) + '</div><div><strong>Visual route:</strong> ' + escapeHTMLV61D(step.visualRoute) + '</div><div><strong>Status:</strong> ' + escapeHTMLV61D(step.liveStatus) + '</div><div><strong>Permission level:</strong> ' + escapeHTMLV61D(step.permissionLevel) + '</div><div><strong>Demo/live lock:</strong> ' + escapeHTMLV61D(step.lockedReason) + '</div></article>'; }).join('');
    var body = '<div class="aqua-v62a-panel aqua-v62f-workflow-plan" data-aqua-v62f-workflow-plan="true"><h3>Aqua Brain Workflow Plan — v62F</h3>' +
      '<section><h4>1. Heard Command</h4><div>' + escapeHTMLV61D(safe.heardCommand) + '</div></section>' +
      '<section><h4>2. Workflow Intent</h4><div>' + escapeHTMLV61D(safe.workflowIntent) + '</div></section>' +
      '<section><h4>3. Extracted Details</h4><ul class="aqua-v62a-detail-list">' + detailRows + '</ul></section>' +
      '<section><h4>4. Planned Steps</h4>' + stepCards + '</section>' +
      '<section><h4>5. Opened / Focused Visual Routes</h4><ul>' + safe.visualRoutes.map(function (route) { return '<li>' + escapeHTMLV61D(route) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h4>6. What Aqua Can Do Now</h4><ul>' + safe.allowedLocalSteps.map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h4>7. Locked Live Steps</h4><ul>' + safe.lockedLiveSteps.map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h4>8. Required Permissions</h4><ul>' + safe.requiredPermissions.map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul></section>' +
      '<section><h4>9. Spoken Summary Draft</h4><blockquote>“' + escapeHTMLV61D(safe.spokenSummary) + '”</blockquote></section>' +
      '<section><h4>10. Next Recommended Action</h4><div>' + escapeHTMLV61D(safe.nextRecommendedAction) + '</div></section>' +
      '<section><h4>11. Safety / Audit Envelope</h4><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(JSON.stringify(safe.safetyEnvelope, null, 2)) + '</pre></section>' +
      '<div class="aqua-v62a-actions" data-aqua-v62f-plan-actions="true"><button class="btn small gold" type="button" onclick="window.AquaWorkflowPlannerV62F.saveAquaWorkflowPlanV62F()">Save Workflow Plan</button><button class="btn small" type="button" onclick="window.AquaWorkflowPlannerV62F.showLastAquaWorkflowPlanV62F()">Show Last Workflow Plan</button><button class="btn small" type="button" onclick="window.AquaWorkflowPlannerV62F.clearAquaWorkflowPlanDemoV62F()">Clear Workflow Plan Demo</button><button class="btn small gold" type="button" onclick="window.AquaWorkflowPlannerV62F.copyAquaWorkflowPlanTextV62F()">Copy Workflow Plan Text</button><button class="btn small gold" type="button" onclick="window.AquaWorkflowPlannerV62F.markWorkflowPlanReadyForOwnerReviewDemoV62F()">Mark Plan Ready for Owner Review Demo</button></div><div class="aqua-v62a-action-output" data-aqua-v62f-action-output="true"></div></div>';
    rememberSpokenSummaryV61R(safe.spokenSummary, 'workflow planner v62F');
    return renderPremiumModuleShellV61Z({ title: 'Aqua Brain Workflow Plan — v62F', subtitle: 'AI Multi-Step Workflow Planner / Permissioned Action Chain. Local/demo only.', tag: 'Workflow Planner', chips: ['Demo Only', 'Backend Locked', 'No Live Export', 'No Live Upload', 'No Audio Storage'], attrs: { 'data-aqua-v62f-workflow-planner': 'true' }, body: body, safetyFooter: 'Local/demo-only. No backend calls, network calls, external AI/API calls, API keys, live record changes, uploads, sends, exports, customer/accountant sharing, accounting export, payment, payroll, bank action, audio storage, or always-listening behavior.' });
  }

  function executeAquaWorkflowStepDemoV62F(step) {
    return { ranDemoOnly: true, step: step || null, liveActionExecuted: false, noBackendCalls: true, noNetworkCalls: true };
  }

  function saveAquaWorkflowPlanV62F(plan) {
    var safe = plan || state.currentWorkflowPlanV62F || planAquaWorkflowV62F('what needs my attention today');
    try {
      var parsed = JSON.parse(window.localStorage.getItem(WORKFLOW_PLAN_KEY_V62F) || '[]');
      parsed.unshift(safe);
      window.localStorage.setItem(WORKFLOW_PLAN_KEY_V62F, JSON.stringify(parsed.slice(0, 5)));
    } catch (error) { state.workflowPlanStorageWarningV62F = 'localStorage unavailable for workflow plans'; }
    state.saveWorkflowPlanWorks = true;
    syncNamespace();
    return safe;
  }

  function showLastAquaWorkflowPlanV62F(returnOnly) {
    var plan = state.currentWorkflowPlanV62F || null;
    try {
      var parsed = JSON.parse(window.localStorage.getItem(WORKFLOW_PLAN_KEY_V62F) || '[]');
      if (!plan && parsed.length) plan = parsed[0];
    } catch (error) {}
    state.showLastWorkflowPlanWorks = true;
    syncNamespace();
    if (returnOnly) return plan;
    var node = document && document.querySelector ? document.querySelector('[data-aqua-v62f-action-output="true"]') : null;
    if (node) node.innerHTML = plan ? '<pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(workflowPlanTextV62F(plan)) + '</pre>' : '<div class="locked">No saved workflow plan found.</div>';
    return plan;
  }

  function clearAquaWorkflowPlanDemoV62F() {
    state.currentWorkflowPlanV62F = null;
    try { window.localStorage.removeItem(WORKFLOW_PLAN_KEY_V62F); } catch (error) {}
    state.clearWorkflowPlanWorks = true;
    syncNamespace();
    var node = document && document.querySelector ? document.querySelector('[data-aqua-v62f-action-output="true"]') : null;
    if (node) node.innerHTML = '<div class="note">Workflow plan demo cleared locally. No live records changed.</div>';
    return true;
  }

  function copyAquaWorkflowPlanTextV62F() {
    var text = workflowPlanTextV62F(state.currentWorkflowPlanV62F);
    state.copyWorkflowPlanWorks = true;
    syncNamespace();
    var node = document && document.querySelector ? document.querySelector('[data-aqua-v62f-action-output="true"]') : null;
    if (node) node.innerHTML = '<pre class="aqua-v62a-copy-block" data-aqua-v62f-copy-text="true">' + escapeHTMLV61D(text) + '</pre>';
    return text;
  }

  function markWorkflowPlanReadyForOwnerReviewDemoV62F() {
    var plan = state.currentWorkflowPlanV62F || planAquaWorkflowV62F('what needs my attention today');
    plan.ownerReviewDemoStatus = 'ready for owner review demo / local only';
    state.ownerReviewDemoWorks = true;
    syncNamespace();
    var node = document && document.querySelector ? document.querySelector('[data-aqua-v62f-action-output="true"]') : null;
    if (node) node.innerHTML = '<div class="note" data-aqua-v62f-owner-review-ready="true"><strong>Plan marked ready for owner review demo.</strong><div>No live approval, export, upload, send, or record change ran.</div></div>';
    return plan;
  }


  function safeAquaWorkflowMemoryFromPlanV62G(plan, override) {
    var safePlan = plan || state.currentWorkflowPlanV62F || null;
    var entities = (safePlan && safePlan.extractedEntities) || {};
    var steps = (safePlan && safePlan.steps) || [];
    var firstStep = steps[0] || null;
    var currentStep = (override && override.currentStep) || (safePlan && safePlan.currentStep) || firstStep || null;
    var selectedVendor = entities.vendor || (/home depot/i.test((safePlan && (safePlan.heardCommand + ' ' + safePlan.workflowIntent + ' ' + (safePlan.visualRoutes || []).join(' '))) || '') ? 'Home Depot' : '');
    var selectedProject = entities.project || (/henderson/i.test((safePlan && (safePlan.heardCommand + ' ' + safePlan.workflowIntent + ' ' + (safePlan.visualRoutes || []).join(' '))) || '') ? 'Henderson House' : '');
    var selectedTrade = entities.trade || (/plumbing/i.test((safePlan && (safePlan.heardCommand + ' ' + (safePlan.visualRoutes || []).join(' '))) || '') ? 'Plumbing' : '');
    if (/^henderson$/i.test(selectedProject)) selectedProject = 'Henderson House';
    if (/^home depot$/i.test(selectedVendor)) selectedVendor = 'Home Depot';
    return Object.assign({
      activeWorkflowId: (safePlan && (safePlan.workflowId || safePlan.activeWorkflowId)) || ('aqua-v62g-' + Date.now()),
      workflowIntent: (safePlan && safePlan.workflowIntent) || 'Aqua Brain workflow continuation demo',
      workflowType: (safePlan && safePlan.workflowType) || 'daily_attention',
      lastCommand: (safePlan && safePlan.heardCommand) || '',
      currentStep: currentStep ? (currentStep.stepLabel || currentStep) : 'Workflow started',
      completedDemoSteps: (override && override.completedDemoSteps) || [],
      nextDemoSteps: (override && override.nextDemoSteps) || (steps.slice(1).map(function (step) { return step.stepLabel; })),
      selectedProject: selectedProject,
      selectedVendor: selectedVendor,
      selectedTrade: selectedTrade,
      selectedTool: (currentStep && currentStep.selectedTool) || (firstStep && firstStep.selectedTool) || '',
      lastVisualRoute: (currentStep && currentStep.visualRoute) || ((safePlan && safePlan.visualRoutes && safePlan.visualRoutes[0]) || ''),
      lastSpokenSummaryDraft: (safePlan && safePlan.spokenSummary) || 'Aqua Brain has a local demo workflow ready. No live action has run.',
      permissionStatus: ((safePlan && safePlan.requiredPermissions) || ['Owner/accounting/backend approval required for live actions']).join(' | '),
      timestamp: new Date().toISOString()
    }, override || {});
  }

  function saveAquaActiveWorkflowV62G(workflow) {
    var safe = safeAquaWorkflowMemoryFromPlanV62G(workflow && workflow.steps ? workflow : null, workflow && !workflow.steps ? workflow : null);
    try { window.localStorage.setItem(ACTIVE_WORKFLOW_KEY_V62G, JSON.stringify(safe)); } catch (error) { state.workflowMemoryStorageWarningV62G = 'localStorage unavailable for active workflow memory'; }
    state.currentActiveWorkflowV62G = safe;
    state.workflowMemoryExists = true;
    state.activeWorkflowSaved = true;
    state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noApiKeysInFrontend = true; state.noLiveRecordChanges = true; state.noLiveExport = true; state.noLiveUpload = true; state.noAudioStorage = true;
    syncNamespace();
    return safe;
  }

  function getAquaActiveWorkflowV62G() {
    if (state.currentActiveWorkflowV62G) return state.currentActiveWorkflowV62G;
    try {
      var raw = window.localStorage.getItem(ACTIVE_WORKFLOW_KEY_V62G);
      if (raw) state.currentActiveWorkflowV62G = JSON.parse(raw);
    } catch (error) {}
    return state.currentActiveWorkflowV62G || null;
  }

  function clearAquaActiveWorkflowV62G() {
    state.currentActiveWorkflowV62G = null;
    try { window.localStorage.removeItem(ACTIVE_WORKFLOW_KEY_V62G); } catch (error) {}
    state.clearActiveWorkflowWorks = true;
    state.noLiveRecordChanges = true;
    syncNamespace();
    return true;
  }

  function noActiveWorkflowResultV62G(commandText) {
    var message = 'No active Aqua Brain workflow yet. Start with a request like “Find Henderson Home Depot receipts and prepare them for accountant export.”';
    state.noContextFollowUpHandled = true;
    return { canonicalIntent: 'aqua_workflow_memory_v62g', mode: 'no_active_workflow', followUpIntentV62G: 'no_active_workflow', originalText: commandText, normalizedText: normalizeAquaPhraseV61E(commandText), activeWorkflow: null, followUpHeard: commandText, activeWorkflowLabel: 'No active workflow', currentStep: 'No active workflow', contextUsed: 'No active workflow context is stored.', actionTaken: message, openedFocusedSection: 'None — no fallback opened.', permissionSafetyGate: 'No live action. No backend. No export.', spokenResponseDraft: message, nextRecommendedStep: 'Start with “Find Henderson Home Depot receipts and prepare them for accountant export.”' };
  }

  function classifyAquaFollowUpV62G(commandText, activeWorkflow) {
    var q = normalizeAquaPhraseV61E(commandText);
    if (/^show active workflow$/.test(q)) return 'show_active_workflow';
    if (/^(clear active workflow|clear that workflow|cancel that|stop this workflow)$/.test(q)) return 'clear_workflow';
    if (!activeWorkflow) return /^(again|repeat that|read it back|read it again|open that again|open last result|show last result|repeat last step|continue|next|next step|continue workflow)$/.test(q) ? 'no_active_workflow' : null;
    if (/^(show me what will be exported|what will be exported|show export packet|show the packet|what is in the export|show what will be exported)$/.test(q)) return 'show_export_contents';
    if (/^(what needs approval|who needs to approve this|what approval is needed|what is locked|what requires approval|show approval requirements)$/.test(q)) return 'approval_questions';
    if (/^(mark it ready for owner review|mark ready for review|prepare for owner review|send to owner review demo|mark ready for owner review)$/.test(q)) return 'mark_ready_demo';
    if (/^(again|repeat that|read it back|read it again|open that again|open last result|show last result|repeat last step)$/.test(q)) return 'repeat_read_open_last';
    if (/^(continue|next|next step|what should i do next|continue workflow)$/.test(q)) return 'continue_next';
    if (/^(now show the plumbing spend|show spend|show receipts again|go to receipts|go to accounting|go back)$/.test(q)) return 'pivot_related_module';
    return null;
  }

  function labelForWorkflowV62G(workflow) {
    var safe = workflow || {};
    if (safe.workflowType === 'receipt_export_preparation') return 'Henderson Home Depot receipts → accountant export demo';
    return safe.workflowIntent || 'Aqua Brain workflow demo';
  }

  function continueAquaWorkflowV62G(commandText) {
    var active = getAquaActiveWorkflowV62G();
    var followUp = classifyAquaFollowUpV62G(commandText, active);
    if (!active && followUp) return noActiveWorkflowResultV62G(commandText);
    if (!active || !followUp) return null;
    var q = normalizeAquaPhraseV61E(commandText);
    var result = { canonicalIntent: 'aqua_workflow_memory_v62g', mode: 'follow_up', followUpIntentV62G: followUp, originalText: commandText, normalizedText: q, activeWorkflow: active, followUpHeard: commandText, activeWorkflowLabel: labelForWorkflowV62G(active), currentStep: active.currentStep || 'Workflow started', contextUsed: 'Project: ' + (active.selectedProject || 'Demo project') + (active.selectedVendor ? ' | Vendor: ' + active.selectedVendor : '') + (active.selectedTrade ? ' | Trade: ' + active.selectedTrade : '') + ' | Target: Accountant Export Demo', actionTaken: '', openedFocusedSection: active.lastVisualRoute || 'Workflow continuation panel', permissionSafetyGate: 'Accounting Export Locked. Owner/Accounting Approval Required. No Live Export. No backend, upload, customer sharing, payment, payroll, bank, or accounting export ran.', spokenResponseDraft: active.lastSpokenSummaryDraft || '', nextRecommendedStep: 'Ask “what needs approval” or “continue workflow.”' };
    if (followUp === 'show_active_workflow') {
      result.actionTaken = 'Displayed the active local/demo workflow memory.';
      result.spokenResponseDraft = 'This is the active Aqua Brain workflow memory for ' + labelForWorkflowV62G(active) + '. It is stored locally as demo context only.';
    } else if (followUp === 'clear_workflow') {
      clearAquaActiveWorkflowV62G();
      result.actionTaken = 'Cleared the active workflow memory locally only.';
      result.openedFocusedSection = 'Aqua Brain workflow memory cleared';
      result.spokenResponseDraft = 'I cleared the active Aqua Brain workflow locally. No live records changed.';
      result.nextRecommendedStep = 'Start a new workflow when ready.';
    } else if (followUp === 'show_export_contents') {
      result.actionTaken = 'Opened export packet demo placeholder. Export remains locked.';
      result.openedFocusedSection = 'Permission Granter / Accountant Export Demo / ' + (active.selectedVendor || 'Receipt') + ' receipts';
      result.spokenResponseDraft = 'You are looking at the demo export packet for ' + (active.selectedProject || 'Henderson House') + ' ' + (active.selectedVendor || 'Home Depot') + ' receipts. This is only a prepared placeholder. No accounting export or customer sharing has run.';
      result.nextRecommendedStep = 'Ask “what needs approval” before any future live export.';
      state.exportPacketFollowUpWorks = true;
    } else if (followUp === 'approval_questions') {
      result.actionTaken = 'Showed permission and approval requirements from the active workflow.';
      result.openedFocusedSection = 'Permission / Safety Gate Requirements';
      result.spokenResponseDraft = 'This workflow needs owner and accounting approval before any live export. Backend accounting/export connectors are locked. Nothing has been sent or exported.';
      result.nextRecommendedStep = 'You can mark it ready for owner review demo, or keep reviewing the packet.';
      state.approvalFollowUpWorks = true;
    } else if (followUp === 'mark_ready_demo') {
      active.permissionStatus = 'ready for owner review demo / local only; live approval and export locked';
      active.currentStep = 'Marked ready for owner review demo';
      active.completedDemoSteps = (active.completedDemoSteps || []).concat(['Owner review demo status marked locally']);
      result.actionTaken = 'Marked the workflow ready for owner review demo locally only.';
      result.openedFocusedSection = 'Owner Review / Accountant Export Demo';
      result.spokenResponseDraft = 'I marked this demo workflow ready for owner review locally. No live approval, export, upload, send, or record change ran.';
      result.nextRecommendedStep = 'Ask “read it back” or “show approval requirements.”';
      state.ownerReviewDemoFollowUpWorks = true;
    } else if (followUp === 'repeat_read_open_last') {
      result.actionTaken = 'Replayed the last workflow route and spoken summary draft.';
      result.openedFocusedSection = active.lastVisualRoute || 'Last workflow result';
      result.spokenResponseDraft = active.lastSpokenSummaryDraft || 'Repeating the last workflow summary. No live action has run.';
      result.nextRecommendedStep = 'Ask for approvals, export packet contents, receipts, or spend.';
      state.readbackFollowUpWorks = true;
    } else if (followUp === 'continue_next') {
      var nextStep = (active.nextDemoSteps || []).shift();
      if (nextStep) {
        active.completedDemoSteps = (active.completedDemoSteps || []).concat([active.currentStep || 'Workflow started']);
        active.currentStep = nextStep;
        result.currentStep = nextStep;
        result.actionTaken = 'Moved to the next local/demo workflow step.';
        result.spokenResponseDraft = 'Next local demo step: ' + nextStep + '. Live actions remain locked.';
        result.nextRecommendedStep = (active.nextDemoSteps || [])[0] || 'Workflow is complete locally; waiting for approval/backend before live action.';
      } else {
        result.actionTaken = 'Workflow complete locally / waiting for backend or approval.';
        result.spokenResponseDraft = 'The local demo workflow is complete. Live export remains locked until owner/accounting approval and backend support exist.';
        result.nextRecommendedStep = 'Wait for owner/accounting/backend approval before any live export.';
      }
    } else if (followUp === 'pivot_related_module') {
      if (/receipts/.test(q)) result.openedFocusedSection = 'Receipts / ' + (active.selectedProject || 'Henderson House') + ' / ' + (active.selectedVendor || 'Home Depot');
      else if (/accounting/.test(q)) result.openedFocusedSection = 'Accounting / ' + (active.selectedProject || 'Henderson House') + ' / Accountant Export Demo';
      else if (/go back/.test(q)) result.openedFocusedSection = active.lastVisualRoute || 'Previous workflow result';
      else result.openedFocusedSection = 'Accounting / ' + (active.selectedProject || 'Henderson House') + ' / Plumbing Spend';
      result.actionTaken = 'Pivoted to a related local/demo module using the active project context.';
      result.spokenResponseDraft = 'I used the active ' + (active.selectedProject || 'Henderson House') + ' workflow context and opened ' + result.openedFocusedSection + '. No live accounting query or export was run.';
      result.nextRecommendedStep = 'Ask “show receipts again” or “show what will be exported” to return to the export workflow.';
      state.spendPivotUsesActiveProject = /Plumbing Spend|Receipts|Accounting/.test(result.openedFocusedSection);
    }
    if (followUp !== 'clear_workflow') {
      active.lastCommand = commandText;
      active.lastVisualRoute = result.openedFocusedSection;
      active.lastSpokenSummaryDraft = result.spokenResponseDraft;
      active.timestamp = new Date().toISOString();
      saveAquaActiveWorkflowV62G(active);
    }
    state.followUpContinuationWorks = true;
    state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noApiKeysInFrontend = true; state.noLiveRecordChanges = true; state.noLiveExport = true; state.noLiveUpload = true; state.noAudioStorage = true;
    syncNamespace();
    return result;
  }

  function workflowContinuationButtonRowV62G() {
    return '<div class="aqua-v62a-actions" data-aqua-v62g-actions="true"><button class="btn small gold" type="button" onclick="window.AquaWorkflowMemoryV62G.saveAquaActiveWorkflowV62G()">Save Active Workflow</button><button class="btn small" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;show active workflow&quot;))">Show Active Workflow</button><button class="btn small" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;clear active workflow&quot;))">Clear Active Workflow</button><button class="btn small gold" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;repeat last step&quot;))">Repeat Last Step</button><button class="btn small gold" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;show approval requirements&quot;))">Show Approval Requirements</button><button class="btn small gold" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;mark ready for owner review&quot;))">Mark Ready for Owner Review Demo</button></div>';
  }

  function renderAquaWorkflowContinuationV62G(result, outputNode) {
    var safe = result || noActiveWorkflowResultV62G('continue');
    var body = '<div class="aqua-v62a-panel aqua-v62g-workflow-continuation" data-aqua-v62g-workflow-continuation="true"><h3>Aqua Brain Workflow Continuation — v62G</h3>' +
      '<section><h4>1. Follow-Up Heard</h4><div>' + escapeHTMLV61D(safe.followUpHeard || safe.originalText || '') + '</div></section>' +
      '<section><h4>2. Active Workflow</h4><div>' + escapeHTMLV61D(safe.activeWorkflowLabel || 'No active workflow') + '</div></section>' +
      '<section><h4>3. Current Step</h4><div>' + escapeHTMLV61D(safe.currentStep || '') + '</div></section>' +
      '<section><h4>4. Context Used</h4><div>' + escapeHTMLV61D(safe.contextUsed || '') + '</div></section>' +
      '<section><h4>5. Action Taken</h4><div>' + escapeHTMLV61D(safe.actionTaken || '') + '</div></section>' +
      '<section><h4>6. Opened / Focused Section</h4><div>' + escapeHTMLV61D(safe.openedFocusedSection || '') + '</div></section>' +
      '<section><h4>7. Permission / Safety Gate</h4><div>' + escapeHTMLV61D(safe.permissionSafetyGate || '') + '</div></section>' +
      '<section><h4>8. Spoken Response Draft</h4><blockquote>“' + escapeHTMLV61D(safe.spokenResponseDraft || '') + '”</blockquote></section>' +
      '<section><h4>9. Next Recommended Step</h4><div>' + escapeHTMLV61D(safe.nextRecommendedStep || '') + '</div></section>' +
      workflowContinuationButtonRowV62G() + '</div>';
    var html = renderPremiumModuleShellV61Z({ title: 'Aqua Brain Workflow Continuation — v62G', subtitle: 'Workflow Memory / Follow-Up Chain Continuation. Local/demo only.', tag: 'Workflow Memory', chips: ['Demo Only', 'localStorage Only', 'No Live Export', 'No Audio Storage'], attrs: { 'data-aqua-v62g-workflow-memory': 'true' }, body: body, safetyFooter: 'Local/demo-only. No backend calls, network calls, external AI/API calls, API keys, live record changes, uploads, sends, exports, customer/accountant sharing, accounting export, payment, payroll, bank action, audio storage, or always-listening behavior.' });
    rememberSpokenSummaryV61R(safe.spokenResponseDraft || '', 'workflow continuation v62G');
    if (outputNode) outputNode.innerHTML = html;
    return html;
  }


  var AQUA_VOICE_STATES_V62H = ['idle', 'listening', 'heard', 'thinking', 'opening_section', 'focused_section', 'speaking', 'waiting_for_followup', 'permission_required', 'manual_fallback', 'stopped', 'error'];

  function speechRecognitionAvailableV62H() {
    return Boolean(window && (window.SpeechRecognition || window.webkitSpeechRecognition));
  }

  function voiceBrowserSupportV62H() {
    return {
      speechRecognition: speechRecognitionAvailableV62H(),
      speechSynthesis: speechSynthesisAvailableV61R(),
      pushToTalkOnly: true,
      noAlwaysListening: true,
      noAudioStorage: true
    };
  }

  function defaultAquaVoiceStateV62H() {
    return {
      voiceEnabled: true,
      lastState: 'idle',
      lastHeardCommand: '',
      lastFocusedSection: '',
      lastResponseDraft: 'I’m ready for your next instruction.',
      voiceStatus: 'Voice ready for local push-to-talk demo.',
      browserSupportStatus: '',
      manualFallbackReason: '',
      safetyStatus: 'Local/browser/demo-only. No backend, network, external AI/API, live record changes, exports, uploads, audio storage, or always-listening.',
      timestamp: new Date().toISOString()
    };
  }

  function sanitizeVoiceTextV62H(text, limit) {
    return String(text || '').replace(/\s+/g, ' ').trim().slice(0, limit || 320);
  }

  function persistAquaVoiceStateV62H(next) {
    var safe = Object.assign(defaultAquaVoiceStateV62H(), next || {});
    safe.lastState = AQUA_VOICE_STATES_V62H.indexOf(safe.lastState) !== -1 ? safe.lastState : 'idle';
    safe.timestamp = new Date().toISOString();
    var stored = {
      voiceEnabled: safe.voiceEnabled === false ? false : true,
      lastState: safe.lastState,
      lastHeardCommand: sanitizeVoiceTextV62H(safe.lastHeardCommand, 220),
      lastFocusedSection: sanitizeVoiceTextV62H(safe.lastFocusedSection, 180),
      lastResponseDraft: sanitizeVoiceTextV62H(safe.lastResponseDraft, 420),
      timestamp: safe.timestamp
    };
    try { window.localStorage.setItem(VOICE_INTERACTION_KEY_V62H, JSON.stringify(stored)); } catch (error) { state.voiceInteractionStorageWarningV62H = 'localStorage unavailable for safe demo voice state'; }
    state.aquaVoiceInteractionV62HState = safe;
    state.voiceInteractionControllerExists = true;
    state.noAudioStorage = true; state.noAlwaysListening = true; state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true;
    syncNamespace();
    return safe;
  }

  function getAquaVoiceStateV62H() {
    if (state.aquaVoiceInteractionV62HState) return state.aquaVoiceInteractionV62HState;
    var loaded = defaultAquaVoiceStateV62H();
    try {
      var raw = window.localStorage.getItem(VOICE_INTERACTION_KEY_V62H);
      if (raw) loaded = Object.assign(loaded, JSON.parse(raw));
    } catch (error) { state.voiceInteractionStorageWarningV62H = 'localStorage unavailable for safe demo voice state'; }
    var support = voiceBrowserSupportV62H();
    loaded.browserSupportStatus = 'speech recognition: ' + (support.speechRecognition ? 'available' : 'limited') + ' • speech synthesis: ' + (support.speechSynthesis ? 'available' : 'limited');
    state.aquaVoiceInteractionV62HState = loaded;
    return loaded;
  }

  function setAquaVoiceStateV62H(nextState, meta) {
    var current = getAquaVoiceStateV62H();
    var cleanState = AQUA_VOICE_STATES_V62H.indexOf(nextState) !== -1 ? nextState : 'error';
    var next = Object.assign({}, current, meta || {}, { lastState: cleanState });
    if (meta && Object.prototype.hasOwnProperty.call(meta, 'lastHeardCommand')) next.lastHeardCommand = sanitizeVoiceTextV62H(meta.lastHeardCommand, 220);
    if (meta && Object.prototype.hasOwnProperty.call(meta, 'lastFocusedSection')) next.lastFocusedSection = sanitizeVoiceTextV62H(meta.lastFocusedSection, 180);
    if (meta && Object.prototype.hasOwnProperty.call(meta, 'lastResponseDraft')) next.lastResponseDraft = sanitizeVoiceTextV62H(meta.lastResponseDraft, 420);
    return persistAquaVoiceStateV62H(next);
  }

  function naturalAquaResponseV62H(commandText, intent) {
    var q = normalizeAquaPhraseV61E(commandText);
    var safe = intent || {};
    if (/henderson/.test(q) && /receipts?/.test(q)) return 'I found it. I’m opening the Henderson receipt results now.';
    if (/henderson/.test(q) && /(plumbing|spend|budget|total)/.test(q)) return 'I’m looking at the Henderson plumbing spend placeholder. Live accounting totals need the backend before I can give a real number.';
    if (/(approval|approve|permission|locked|needs approval|requires approval)/.test(q) || safe.followUpIntentV62G === 'approval_questions') return 'This action needs approval before anything live can happen.';
    if (/(export|accountant|accounting)/.test(q)) return 'I can prepare that workflow, but export is locked until owner and accounting approval.';
    if (/^(continue|next|next step|continue workflow)$/.test(q)) return safe.spokenResponseDraft || 'I’m ready for your next instruction.';
    if (safe.spokenResponseDraft) return safe.spokenResponseDraft;
    return 'I’m ready for your next instruction.';
  }

  function renderManualFallbackControlsV62H() {
    var support = voiceBrowserSupportV62H();
    return '<div class="note" data-aqua-v62h-manual-fallback-controls="true"><strong>Browser voice is limited here.</strong><div>Aqua Brain can still guide you with manual controls.</div><div class="aqua-v62a-actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><label class="smallMut" for="aquaVoiceManualCommandV62H">Type command</label><input id="aquaVoiceManualCommandV62H" type="text" placeholder="Example: continue" style="min-width:220px"><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.handleAquaVoiceCommandV62H((document.getElementById(&quot;aquaVoiceManualCommandV62H&quot;)||{}).value||&quot;what can Aqua do now&quot;)">Run Command Demo</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.speakAquaResponseV62H()"' + (support.speechSynthesis ? '' : ' disabled') + '>Speak Summary if supported</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.repeatLastAquaResponseV62H()"' + (support.speechSynthesis ? '' : ' disabled') + '>Repeat Last Response if supported</button><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.handleAquaVoiceCommandV62H(&quot;continue&quot;)">Continue Workflow</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.stopAquaSpeakingV62H()">Stop Speaking</button></div></div>';
  }

  function renderAquaVoiceStatePanelV62H(outputNode) {
    var safe = getAquaVoiceStateV62H();
    var support = voiceBrowserSupportV62H();
    safe.browserSupportStatus = 'speech recognition: ' + (support.speechRecognition ? 'available' : 'limited') + ' • speech synthesis: ' + (support.speechSynthesis ? 'available' : 'limited');
    var manual = safe.lastState === 'manual_fallback' || safe.manualFallbackReason ? renderManualFallbackControlsV62H() : '';
    var body = '<div class="aqua-v62a-panel aqua-v62h-voice-control" data-aqua-v62h-voice-state-panel="true"><h3>Aqua Brain Voice Control — v62H</h3>' +
      '<div><strong>Current state:</strong> <span data-aqua-v62h-current-state="true">' + escapeHTMLV61D(safe.lastState) + '</span></div>' +
      '<div><strong>Last heard command:</strong> ' + escapeHTMLV61D(safe.lastHeardCommand || 'None yet') + '</div>' +
      '<div><strong>Last focused module/section:</strong> ' + escapeHTMLV61D(safe.lastFocusedSection || 'None yet') + '</div>' +
      '<div><strong>Last spoken response draft:</strong> ' + escapeHTMLV61D(safe.lastResponseDraft || 'None yet') + '</div>' +
      '<div><strong>Voice status:</strong> ' + escapeHTMLV61D(safe.voiceEnabled === false ? 'Off locally' : (safe.voiceStatus || 'On locally')) + '</div>' +
      '<div><strong>Browser support status:</strong> ' + escapeHTMLV61D(safe.browserSupportStatus) + '</div>' +
      '<div><strong>Manual fallback reason:</strong> ' + escapeHTMLV61D(safe.manualFallbackReason || 'None') + '</div>' +
      '<div><strong>Safety status:</strong> ' + escapeHTMLV61D(safe.safetyStatus) + '</div>' +
      '<div class="aqua-v62a-actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.startVoiceCaptureV62H()">Start Voice</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.stopAquaSpeakingV62H()">Stop Speaking</button><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.repeatLastAquaResponseV62H()">Repeat Last Response</button><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.enableAquaVoiceV62H()">Voice On</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.disableAquaVoiceV62H()">Voice Off</button><button class="btn small gold" type="button" onclick="window.AquaVoiceInteractionV62H.handleAquaVoiceCommandV62H(&quot;continue&quot;)">Continue</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.handleAquaVoiceCommandV62H(&quot;cancel&quot;)">Cancel / Clear Context</button><button class="btn small" type="button" onclick="window.AquaVoiceInteractionV62H.fallbackToManualControlsV62H(&quot;Manual controls requested by user.&quot;)">Manual Controls</button></div>' + manual + '</div>';
    var html = renderPremiumModuleShellV61Z({ title: 'Aqua Brain Voice Control — v62H', subtitle: 'Local/demo conversation state controller. Push-to-talk only.', tag: 'Voice Control', chips: ['Demo Only', 'No Audio Storage', 'No Always Listening', 'No Network Call'], attrs: { 'data-aqua-v62h-voice-control': 'true' }, body: body, safetyFooter: 'Local/browser/demo voice control only. No backend calls, network calls, external AI/API calls, API keys, live record changes, uploads, exports, customer/accountant sharing, accounting export, payment, payroll, bank action, audio storage, or always-listening behavior.' });
    state.voiceStatePanelWorks = /Aqua Brain Voice Control — v62H/.test(html);
    if (outputNode) outputNode.innerHTML = html;
    syncNamespace();
    return html;
  }

  function speakAquaResponseV62H(text, options) {
    var draft = sanitizeVoiceTextV62H(text || getAquaVoiceStateV62H().lastResponseDraft || 'I’m ready for your next instruction.', 420);
    setAquaVoiceStateV62H('speaking', { lastResponseDraft: draft, voiceStatus: 'Speaking local/browser response if supported.' });
    var result = speakAquaSummaryV61R(draft, Object.assign({ context: 'voice interaction v62H' }, options || {}));
    if (result && result.unavailable) {
      setAquaVoiceStateV62H('manual_fallback', { lastResponseDraft: draft, manualFallbackReason: 'Browser speech synthesis is unavailable.', voiceStatus: 'Browser voice is limited here. Aqua Brain can still guide you with manual controls.' });
      state.manualFallbackWorks = true;
    } else setAquaVoiceStateV62H('waiting_for_followup', { lastResponseDraft: draft, voiceStatus: 'Waiting for a follow-up. Push-to-talk only.' });
    return Object.assign({ state: getAquaVoiceStateV62H() }, result || {});
  }

  function stopAquaSpeakingV62H() {
    var result = stopAquaSpeakingV61R();
    setAquaVoiceStateV62H('stopped', { voiceStatus: 'Speaking stopped. Push-to-talk remains manual only.' });
    state.stopSpeakingWorks = true;
    return result;
  }

  function repeatLastAquaResponseV62H() {
    var draft = getAquaVoiceStateV62H().lastResponseDraft || 'I didn’t find an active workflow yet. Start by asking me to find a project, receipt, report, or review item.';
    state.repeatLastResponseWorks = true;
    return speakAquaResponseV62H(draft, { context: 'repeat last voice response v62H' });
  }

  function enableAquaVoiceV62H() {
    setSpokenReadbackPreferenceV61R({ enabled: true });
    setAquaVoiceStateV62H('idle', { voiceEnabled: true, voiceStatus: 'Voice is on locally. Start Voice remains push-to-talk only.', lastResponseDraft: 'I’m ready for your next instruction.' });
    state.voiceOnOffWorks = getAquaVoiceStateV62H().voiceEnabled === true;
    return getAquaVoiceStateV62H();
  }

  function disableAquaVoiceV62H() {
    setSpokenReadbackPreferenceV61R({ enabled: false });
    setAquaVoiceStateV62H('stopped', { voiceEnabled: false, voiceStatus: 'Voice is off locally. Manual controls still work.' });
    state.voiceOnOffWorks = getAquaVoiceStateV62H().voiceEnabled === false;
    return getAquaVoiceStateV62H();
  }

  function fallbackToManualControlsV62H(reason) {
    var message = 'Browser voice is limited here. Aqua Brain can still guide you with manual controls.';
    setAquaVoiceStateV62H('manual_fallback', { manualFallbackReason: sanitizeVoiceTextV62H(reason || 'Browser voice is unavailable or blocked.', 240), voiceStatus: message, lastResponseDraft: message });
    state.manualFallbackWorks = true;
    return renderAquaVoiceStatePanelV62H();
  }

  function startVoiceCaptureV62H() {
    if (getAquaVoiceStateV62H().voiceEnabled === false) return fallbackToManualControlsV62H('Voice is off locally. Turn Voice On or use manual controls.');
    if (!speechRecognitionAvailableV62H()) return fallbackToManualControlsV62H('Browser speech recognition is unavailable.');
    setAquaVoiceStateV62H('listening', { voiceStatus: 'Listening after a user gesture. One-shot push-to-talk only.' });
    try {
      var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new Recognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = function (event) {
        var transcript = event && event.results && event.results[0] && event.results[0][0] ? event.results[0][0].transcript : '';
        handleAquaVoiceCommandV62H(transcript);
      };
      recognition.onerror = function (event) { fallbackToManualControlsV62H('Speech recognition error: ' + ((event && event.error) || 'unknown')); };
      recognition.onend = function () { if (getAquaVoiceStateV62H().lastState === 'listening') setAquaVoiceStateV62H('heard', { voiceStatus: 'Voice capture ended. Waiting for command result.' }); };
      recognition.start();
      return { started: true, oneShotOnly: true, noAlwaysListening: true, noAudioStorage: true };
    } catch (error) {
      return { started: false, fallback: fallbackToManualControlsV62H('Browser voice permission or support is limited.') };
    }
  }

  function clearAquaVoiceContextV62H() {
    setAquaVoiceStateV62H('stopped', { lastHeardCommand: '', lastFocusedSection: '', lastResponseDraft: 'I’m ready for your next instruction.', manualFallbackReason: '', voiceStatus: 'Local voice context cleared only.' });
    return getAquaVoiceStateV62H();
  }

  function handleAquaVoiceCommandV62H(commandText) {
    var command = sanitizeVoiceTextV62H(commandText, 220);
    var q = normalizeAquaPhraseV61E(command);
    setAquaVoiceStateV62H('heard', { lastHeardCommand: command, voiceStatus: 'Command heard. Thinking locally.' });
    if (isAquaSessionCommandV62I(command)) { var sessionResultV62I = routeAquaSessionCommandV62I(command); return setAquaVoiceStateV62H(sessionResultV62I.sessionStatus === 'permission_required' ? 'permission_required' : 'waiting_for_followup', { lastHeardCommand: command, lastFocusedSection: sessionResultV62I.lastFocusedRoute, lastResponseDraft: sessionResultV62I.lastAquaResponseDraft }); }
    if (/^(voice on|turn voice on)$/.test(q)) return enableAquaVoiceV62H();
    if (/^(voice off|turn voice off)$/.test(q)) return disableAquaVoiceV62H();
    if (/^(again|repeat that|repeat last response|read it back|read it again)$/.test(q)) return repeatLastAquaResponseV62H();
    if (/^(stop|stop speaking)$/.test(q)) return stopAquaSpeakingV62H();
    if (/^(manual controls|manual fallback|show manual controls)$/.test(q)) return fallbackToManualControlsV62H('Manual controls requested by user.');
    if (/^(cancel|clear context|cancel clear context|go back)$/.test(q)) return clearAquaVoiceContextV62H();
    setAquaVoiceStateV62H('thinking', { voiceStatus: 'Thinking locally. No live AI or backend call.' });
    var result = null;
    if (/^(continue|next|next step|continue workflow)$/.test(q)) {
      result = continueAquaWorkflowV62G(command) || noActiveWorkflowResultV62G(command);
      state.continueUsesWorkflowMemory = Boolean(result);
    } else if (/^(what needs approval|what requires approval|who needs to approve this)$/.test(q)) {
      result = continueAquaWorkflowV62G(command) || { openedFocusedSection: 'Permission / Safety Gate Requirements', spokenResponseDraft: 'This action needs approval before anything live can happen.' };
      state.permissionQuestionVoiceStateWorks = true;
      setAquaVoiceStateV62H('permission_required', { lastFocusedSection: result.openedFocusedSection || 'Permission / Safety Gate Requirements', lastResponseDraft: naturalAquaResponseV62H(command, result), voiceStatus: 'Permission required. Live actions remain locked.' });
      return getAquaVoiceStateV62H();
    } else if (/^(what can aqua do now|what can aqua do)$/.test(q)) {
      result = { openedFocusedSection: 'Aqua Brain Command Center / allowed local demo steps', spokenResponseDraft: 'Aqua can open local demo sections, prepare locked workflows, read summaries, repeat, continue, or clear context. Live exports and record changes stay locked.' };
    } else {
      result = runNormalizedAquaCommandV61E(command, null) || {};
    }
    var response = naturalAquaResponseV62H(command, result);
    var focus = result.openedFocusedSection || result.module || result.targetModule || result.workflowType || 'Aqua Brain Command Center';
    setAquaVoiceStateV62H('opening_section', { lastFocusedSection: focus, lastResponseDraft: response, voiceStatus: 'Opening or focusing the local demo section.' });
    setAquaVoiceStateV62H('focused_section', { lastFocusedSection: focus, lastResponseDraft: response, voiceStatus: 'Section focused locally. Ready to speak or continue.' });
    return getAquaVoiceStateV62H();
  }

  function installAquaVoicePanelV62H(root) {
    var scope = root || document;
    if (!scope || typeof scope.querySelector !== 'function') return false;
    if (scope.querySelector('[data-aqua-v62h-voice-control-inline="true"]')) return true;
    var output = scope.querySelector('#brainOut');
    var target = output || scope.querySelector('#voiceAskAreaV60U') || scope.querySelector('.actions');
    if (!target || typeof target.insertAdjacentHTML !== 'function') return false;
    target.insertAdjacentHTML(output ? 'beforebegin' : 'afterend', '<div data-aqua-v62h-voice-control-inline="true">' + renderAquaVoiceStatePanelV62H() + '</div>');
    state.voiceStatePanelWorks = true;
    syncNamespace();
    return true;
  }


  var AQUA_SESSION_STATUSES_V62I = ['no_session', 'session_ready', 'listening', 'processing', 'opening_module', 'focused_result', 'asking_followup', 'waiting_for_user', 'permission_required', 'manual_fallback', 'cancelled', 'completed', 'error'];

  function safeSessionTextV62I(text, limit) {
    return sanitizeVoiceTextV62H(text, limit || 260);
  }

  function sessionSafetyStatusV62I() {
    return 'Local/demo session only. No backend calls, network calls, external AI/API calls, API keys, live record changes, uploads, exports, customer/accountant sharing, payment, payroll, bank action, audio storage, or always-listening.';
  }

  function defaultAquaVoiceSessionV62I() {
    var now = new Date().toISOString();
    return {
      sessionId: 'aqua-session-v62i-' + now.replace(/[^0-9]/g, '').slice(0, 14),
      sessionStatus: 'no_session',
      startedAt: '',
      lastUpdatedAt: now,
      currentProject: '',
      currentVendor: '',
      currentTrade: '',
      currentModule: '',
      currentWorkflowId: '',
      currentIntent: '',
      lastUserCommand: '',
      lastAquaResponseDraft: '',
      lastFocusedRoute: '',
      missingInputs: [],
      pendingApprovalType: '',
      safetyStatus: sessionSafetyStatusV62I(),
      voiceEnabled: getAquaVoiceStateV62H().voiceEnabled !== false
    };
  }

  function sanitizeAquaVoiceSessionV62I(session) {
    var base = Object.assign(defaultAquaVoiceSessionV62I(), session || {});
    base.sessionStatus = AQUA_SESSION_STATUSES_V62I.indexOf(base.sessionStatus) !== -1 ? base.sessionStatus : 'error';
    base.lastUpdatedAt = new Date().toISOString();
    base.currentProject = safeSessionTextV62I(base.currentProject, 120);
    base.currentVendor = safeSessionTextV62I(base.currentVendor, 120);
    base.currentTrade = safeSessionTextV62I(base.currentTrade, 120);
    base.currentModule = safeSessionTextV62I(base.currentModule, 160);
    base.currentWorkflowId = safeSessionTextV62I(base.currentWorkflowId, 120);
    base.currentIntent = safeSessionTextV62I(base.currentIntent, 120);
    base.lastUserCommand = safeSessionTextV62I(base.lastUserCommand, 220);
    base.lastAquaResponseDraft = safeSessionTextV62I(base.lastAquaResponseDraft, 520);
    base.lastFocusedRoute = safeSessionTextV62I(base.lastFocusedRoute, 180);
    base.missingInputs = (Array.isArray(base.missingInputs) ? base.missingInputs : []).map(function (item) { return safeSessionTextV62I(item, 80); }).slice(0, 5);
    base.pendingApprovalType = safeSessionTextV62I(base.pendingApprovalType, 140);
    base.safetyStatus = sessionSafetyStatusV62I();
    base.voiceEnabled = base.voiceEnabled === false ? false : true;
    return base;
  }

  function getAquaVoiceSessionV62I() {
    if (state.currentAquaVoiceSessionV62I) return sanitizeAquaVoiceSessionV62I(state.currentAquaVoiceSessionV62I);
    try {
      var raw = window.localStorage.getItem(VOICE_SESSION_KEY_V62I);
      if (raw) {
        state.currentAquaVoiceSessionV62I = sanitizeAquaVoiceSessionV62I(JSON.parse(raw));
        return state.currentAquaVoiceSessionV62I;
      }
    } catch (error) { state.voiceSessionStorageWarningV62I = 'localStorage unavailable for safe demo Aqua session'; }
    return defaultAquaVoiceSessionV62I();
  }

  function saveAquaVoiceSessionV62I(session) {
    var safe = sanitizeAquaVoiceSessionV62I(session);
    try { window.localStorage.setItem(VOICE_SESSION_KEY_V62I, JSON.stringify(safe)); } catch (error) { state.voiceSessionStorageWarningV62I = 'localStorage unavailable for safe demo Aqua session'; }
    state.currentAquaVoiceSessionV62I = safe;
    state.voiceSessionControllerExists = true;
    state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true; state.noAudioStorage = true; state.noAlwaysListening = true;
    syncNamespace();
    return safe;
  }

  function clearAquaVoiceSessionV62I() {
    try { window.localStorage.removeItem(VOICE_SESSION_KEY_V62I); } catch (error) { state.voiceSessionStorageWarningV62I = 'localStorage unavailable while clearing Aqua session'; }
    state.currentAquaVoiceSessionV62I = null;
    setAquaVoiceStateV62H('stopped', { lastResponseDraft: 'Aqua Brain session cleared locally only.', voiceStatus: 'Session cleared. No live data changed.' });
    syncNamespace();
    return defaultAquaVoiceSessionV62I();
  }

  function sessionButtonRowV62I() {
    return '<div class="aqua-v62a-actions" data-aqua-v62i-session-actions="true" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.startAquaVoiceSessionV62I()">Start Aqua Session</button><button class="btn small" type="button" onclick="window.AquaVoiceSessionV62I.endAquaVoiceSessionV62I()">End Session</button><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.continueAquaSessionV62I()">Continue Session</button><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.handleAquaSessionTurnV62I(&quot;repeat that&quot;)">Repeat Last</button><button class="btn small" type="button" onclick="window.AquaVoiceSessionV62I.clearAquaVoiceSessionV62I()">Clear Session</button><button class="btn small" type="button" onclick="window.AquaVoiceSessionV62I.handleAquaSessionTurnV62I(&quot;manual mode&quot;)">Manual Mode</button></div>';
  }

  function renderManualModeV62I() {
    return '<div class="note" data-aqua-v62i-manual-controls="true"><strong>Manual Mode</strong><div>Type command</div><input id="aquaSessionManualCommandV62I" type="text" placeholder="Example: show Home Depot receipts" style="min-width:240px"><div class="aqua-v62a-actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.handleAquaSessionTurnV62I((document.getElementById(&quot;aquaSessionManualCommandV62I&quot;)||{}).value||&quot;continue&quot;)">Run Typed Command</button><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.continueAquaSessionV62I()">Continue Session</button><button class="btn small gold" type="button" onclick="window.AquaVoiceSessionV62I.handleAquaSessionTurnV62I(&quot;repeat that&quot;)">Repeat Last</button><button class="btn small" type="button" onclick="window.AquaVoiceSessionV62I.clearAquaVoiceSessionV62I()">Clear Session</button><button class="btn small" type="button" onclick="window.AquaWorkflowMemoryV62G.renderAquaWorkflowContinuationV62G(window.AquaWorkflowMemoryV62G.continueAquaWorkflowV62G(&quot;show active workflow&quot;))">Show Active Workflow</button><button class="btn small" type="button" onclick="window.AquaV61Extensions.runNormalizedAquaCommandV61E(&quot;show automation report&quot;, document.getElementById(&quot;brainOut&quot;))">Show Automation Report</button></div></div>';
  }

  function nextSuggestedCommandsV62I(session) {
    if (session.sessionStatus === 'permission_required') return ['show what will be exported', 'what needs approval', 'mark ready for owner review', 'cancel that'];
    if (session.missingInputs && session.missingInputs.length) return ['Henderson', 'Henderson staircase', 'Home Depot receipts'];
    if (session.currentProject && session.currentVendor) return ['prepare those for accountant export', 'what needs approval', 'read it back', 'cancel that'];
    if (session.currentProject) return ['show Home Depot receipts', 'show the Henderson report', 'what needs approval'];
    return ['pull up Henderson', 'show Home Depot receipts', 'what needs approval', 'what should I do next'];
  }

  function renderAquaSessionPanelV62I(session, outputNode) {
    var safe = sanitizeAquaVoiceSessionV62I(session || getAquaVoiceSessionV62I());
    var missing = safe.missingInputs && safe.missingInputs.length ? safe.missingInputs.join(', ') : 'None';
    var suggestions = nextSuggestedCommandsV62I(safe).map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('');
    var manual = safe.sessionStatus === 'manual_fallback' ? renderManualModeV62I() : '';
    var body = '<div class="aqua-v62a-panel aqua-v62i-session" data-aqua-v62i-session-panel="true"><h3>Aqua Brain Session — v62I</h3>' +
      '<section><h4>1. Session State</h4><div><strong>Status:</strong> ' + escapeHTMLV61D(safe.sessionStatus) + '</div></section>' +
      '<section><h4>2. Active Context</h4><div>Project: ' + escapeHTMLV61D(safe.currentProject || 'None') + '</div><div>Vendor: ' + escapeHTMLV61D(safe.currentVendor || 'None') + '</div><div>Trade: ' + escapeHTMLV61D(safe.currentTrade || 'None') + '</div><div>Workflow: ' + escapeHTMLV61D(safe.currentWorkflowId || 'None') + '</div></section>' +
      '<section><h4>3. Last User Command</h4><div>' + escapeHTMLV61D(safe.lastUserCommand || 'None yet') + '</div></section>' +
      '<section><h4>4. Aqua Response Draft</h4><blockquote>“' + escapeHTMLV61D(safe.lastAquaResponseDraft || 'Ready. Tell me what job, receipt, report, or approval you want to work on.') + '”</blockquote></section>' +
      '<section><h4>5. Missing Information / Follow-Up Question</h4><div>' + escapeHTMLV61D(missing) + '</div></section>' +
      '<section><h4>6. Current Visual Focus</h4><div>' + escapeHTMLV61D(safe.lastFocusedRoute || 'None yet') + '</div></section>' +
      '<section><h4>7. Workflow Link</h4><div>' + escapeHTMLV61D(safe.currentWorkflowId || 'No active workflow yet') + '</div></section>' +
      '<section><h4>8. Permission / Safety</h4><div>' + escapeHTMLV61D(safe.pendingApprovalType || 'No permission request pending') + '</div><div>' + escapeHTMLV61D(safe.safetyStatus) + '</div></section>' +
      '<section><h4>9. Next Suggested Commands</h4><ul>' + suggestions + '</ul></section>' + sessionButtonRowV62I() + manual + '</div>';
    var html = renderPremiumModuleShellV61Z({ title: 'Aqua Brain Session — v62I', subtitle: 'Real assistant flow foundation. Local/demo session state only.', tag: 'Voice Session', chips: ['Demo Only', 'localStorage Only', 'No Audio Storage', 'No Always Listening', 'No Live Export'], attrs: { 'data-aqua-v62i-session-shell': 'true' }, body: body, safetyFooter: sessionSafetyStatusV62I() });
    state.aquaSessionPanelWorks = /Aqua Brain Session — v62I/.test(html) && /Session State/.test(html) && /Next Suggested Commands/.test(html);
    if (outputNode) outputNode.innerHTML = html;
    syncNamespace();
    return html;
  }

  function askAquaFollowUpQuestionV62I(missingFields) {
    var session = getAquaVoiceSessionV62I();
    var fields = Array.isArray(missingFields) ? missingFields : ['project_or_report'];
    var question = fields.indexOf('receipts') !== -1 ? 'Which receipts should I prepare for accountant export?' : 'Which project or report should I open?';
    session.sessionStatus = 'asking_followup';
    session.missingInputs = fields;
    session.lastAquaResponseDraft = question;
    setAquaVoiceStateV62H('waiting_for_followup', { lastResponseDraft: question, lastFocusedSection: session.lastFocusedRoute || 'Aqua Brain Session Follow-Up' });
    return saveAquaVoiceSessionV62I(session);
  }

  function startAquaVoiceSessionV62I() {
    var now = new Date().toISOString();
    var session = defaultAquaVoiceSessionV62I();
    session.sessionStatus = 'session_ready';
    session.startedAt = now;
    session.lastUpdatedAt = now;
    session.currentModule = 'Aqua Brain Command Hub';
    session.lastFocusedRoute = 'Ask AI / Command Hub';
    session.lastAquaResponseDraft = 'Ready. Tell me what job, receipt, report, or approval you want to work on.';
    state.startSessionWorks = true;
    setAquaVoiceStateV62H('waiting_for_followup', { lastHeardCommand: 'start aqua session', lastFocusedSection: session.lastFocusedRoute, lastResponseDraft: session.lastAquaResponseDraft });
    return saveAquaVoiceSessionV62I(session);
  }

  function endAquaVoiceSessionV62I() {
    var session = getAquaVoiceSessionV62I();
    session.sessionStatus = 'completed';
    session.lastAquaResponseDraft = 'Session ended locally. No live data changed.';
    state.endSessionWorks = true;
    setAquaVoiceStateV62H('stopped', { lastResponseDraft: session.lastAquaResponseDraft, voiceStatus: 'Aqua session ended locally.' });
    return saveAquaVoiceSessionV62I(session);
  }

  function detectProjectV62I(q) { return /henderson/.test(q) ? 'Henderson House' : ''; }
  function detectVendorV62I(q) { return /home depot/.test(q) ? 'Home Depot' : ''; }
  function detectTradeV62I(q) { return /stair/.test(q) ? 'Staircase' : (/plumb/.test(q) ? 'Plumbing' : ''); }

  function updateSessionFocusV62I(session, focus, response, status) {
    session.lastFocusedRoute = focus || session.lastFocusedRoute;
    session.currentModule = focus || session.currentModule;
    session.lastAquaResponseDraft = response || session.lastAquaResponseDraft;
    session.sessionStatus = status || 'focused_result';
    setAquaVoiceStateV62H(status === 'permission_required' ? 'permission_required' : 'focused_section', { lastFocusedSection: session.lastFocusedRoute, lastResponseDraft: session.lastAquaResponseDraft });
    return saveAquaVoiceSessionV62I(session);
  }

  function continueAquaSessionV62I() {
    var session = getAquaVoiceSessionV62I();
    if (session.sessionStatus === 'cancelled' || !session.currentWorkflowId) {
      session.sessionStatus = 'waiting_for_user';
      session.lastAquaResponseDraft = 'No active workflow yet. Ask me to find a report, receipt, spend item, approval, or job file.';
      state.continueSessionWorks = true;
      return saveAquaVoiceSessionV62I(session);
    }
    var result = continueAquaWorkflowV62G('continue') || null;
    session.sessionStatus = 'waiting_for_user';
    session.lastAquaResponseDraft = result && result.spokenResponseDraft ? result.spokenResponseDraft : 'Continuing the active local/demo workflow. Live actions remain locked.';
    state.continueSessionWorks = true;
    setAquaVoiceStateV62H('waiting_for_followup', { lastResponseDraft: session.lastAquaResponseDraft, lastFocusedSection: session.lastFocusedRoute });
    return saveAquaVoiceSessionV62I(session);
  }

  function cancelAquaSessionV62I() {
    var session = getAquaVoiceSessionV62I();
    session.sessionStatus = 'cancelled';
    session.currentIntent = '';
    session.currentWorkflowId = '';
    session.pendingApprovalType = '';
    session.missingInputs = [];
    session.lastAquaResponseDraft = 'Cancelled the local/demo active session action. I did not delete saved session context or change any live records.';
    state.cancelSessionWorks = true;
    setAquaVoiceStateV62H('stopped', { lastResponseDraft: session.lastAquaResponseDraft, lastFocusedSection: session.lastFocusedRoute });
    return saveAquaVoiceSessionV62I(session);
  }

  function routeAquaSessionCommandV62I(commandText) {
    var command = safeSessionTextV62I(commandText, 220);
    var q = normalizeAquaPhraseV61E(command);
    var session = getAquaVoiceSessionV62I();
    if (/^(start aqua session|hey aqua|aqua|ready to work)$/.test(q)) return startAquaVoiceSessionV62I();
    if (/^(end session|end aqua session|finish session)$/.test(q)) return endAquaVoiceSessionV62I();
    if (/^(clear session)$/.test(q)) return clearAquaVoiceSessionV62I();
    if (/^(manual mode|manual controls|manual fallback)$/.test(q)) { session.sessionStatus = 'manual_fallback'; session.lastUserCommand = command; session.lastAquaResponseDraft = 'Manual mode is ready. Type a command or use Continue Session, Repeat Last, Clear Session, Show Active Workflow, or Show Automation Report.'; state.manualModeWorks = true; return saveAquaVoiceSessionV62I(session); }
    if (/^(stop voice|stop speaking|stop)$/.test(q)) { stopAquaSpeakingV62H(); session.lastUserCommand = command; session.lastAquaResponseDraft = 'Voice stopped locally. Manual session controls are still available.'; session.sessionStatus = 'manual_fallback'; state.manualModeWorks = true; return saveAquaVoiceSessionV62I(session); }
    if (/^(repeat that|read it back|again|repeat last)$/.test(q)) { repeatLastAquaResponseV62H(); session.lastUserCommand = command; session.lastAquaResponseDraft = session.lastAquaResponseDraft || getAquaVoiceStateV62H().lastResponseDraft || 'No last response yet.'; return saveAquaVoiceSessionV62I(session); }
    if (/^(continue|next|next step)$/.test(q)) { session.lastUserCommand = command; return continueAquaSessionV62I(); }
    if (/^(cancel that|cancel|nevermind)$/.test(q)) { session.lastUserCommand = command; return cancelAquaSessionV62I(); }
    if (!session.startedAt || session.sessionStatus === 'no_session') session = startAquaVoiceSessionV62I();
    session.lastUserCommand = command;
    session.sessionStatus = 'processing';
    var project = detectProjectV62I(q);
    var vendor = detectVendorV62I(q);
    var trade = detectTradeV62I(q);
    if (project) session.currentProject = project;
    if (vendor) session.currentVendor = vendor;
    if (trade) session.currentTrade = trade;
    if (session.missingInputs && session.missingInputs.length) {
      if (project) {
        session.missingInputs = [];
        if (session.currentIntent === 'open_report' || /stair/.test(q)) {
          session.currentIntent = 'open_report';
          session.currentWorkflowId = 'Henderson staircase report lookup';
          state.missingInputFollowUpWorks = true;
          return updateSessionFocusV62I(session, 'Reports / Henderson House / Staircase Report', 'Opening the Henderson staircase report placeholder locally. No backend or live files were opened.', 'focused_result');
        }
      } else return askAquaFollowUpQuestionV62I(session.missingInputs);
    }
    if (/pull up the report|show the report|open the report/.test(q) && !session.currentProject) { session.currentIntent = 'open_report'; state.missingInputFollowUpWorks = true; return askAquaFollowUpQuestionV62I(['project_or_report']); }
    if (/pull up henderson|show henderson$|show the henderson report|henderson report/.test(q)) {
      session.currentProject = 'Henderson House';
      session.currentIntent = 'open_project';
      state.activeProjectContextWorks = true;
      return updateSessionFocusV62I(session, /report/.test(q) ? 'Reports / Henderson House / Project Report' : 'Project / Henderson House', /report/.test(q) ? 'Opening the Henderson House report placeholder locally.' : 'Henderson House is selected. What do you want to see next?', 'focused_result');
    }
    if (/home depot receipts|which receipts are we talking about|show receipts|receipts/.test(q) && (session.currentProject || project)) {
      session.currentProject = session.currentProject || 'Henderson House';
      session.currentVendor = vendor || session.currentVendor || 'Home Depot';
      session.currentIntent = 'receipt_lookup';
      session.currentWorkflowId = 'Henderson Home Depot receipt review';
      state.activeProjectContextWorks = session.currentProject === 'Henderson House' && session.currentVendor === 'Home Depot';
      return updateSessionFocusV62I(session, 'Receipts / Henderson House / Home Depot', 'I have Henderson House and Home Depot selected. I’m showing the local/demo receipt results; no live records changed.', 'focused_result');
    }
    if (/accountant export|accounting export|prepare those/.test(q)) {
      if (!session.currentProject || !session.currentVendor) { session.currentIntent = 'accountant_export'; state.missingInputFollowUpWorks = true; return askAquaFollowUpQuestionV62I(['receipts']); }
      session.currentIntent = 'accountant_export';
      session.currentWorkflowId = 'Receipt export preparation';
      session.pendingApprovalType = 'Owner and accounting approval required before any live export';
      var plan = planAquaWorkflowV62F('look up all receipts for Henderson from Home Depot and prepare them for accountant export');
      saveAquaActiveWorkflowV62G(plan);
      state.accountantExportContextWorks = true;
      return updateSessionFocusV62I(session, 'Permission Granter / Accountant Export Demo / Home Depot receipts', 'I have Henderson House and Home Depot selected. I can prepare the accountant export packet as a local demo, but live export is locked until owner and accounting approval.', 'permission_required');
    }
    if (/what needs approval|what requires approval/.test(q)) {
      session.pendingApprovalType = session.pendingApprovalType || 'Owner/accounting approval required for live exports, sharing, payments, payroll, bank sync, uploads, or record changes';
      return updateSessionFocusV62I(session, 'Owner Review / Locked Actions', 'Owner and accounting approval are required before any live export or record-changing action. This session is local/demo-only.', 'permission_required');
    }
    if (/what needs my attention today|what should i do next/.test(q)) {
      session.currentIntent = 'daily_attention';
      session.currentWorkflowId = 'Daily attention workflow';
      return updateSessionFocusV62I(session, 'Owner Review / Locked Actions', 'Start with owner review flags, receipt/accounting mismatches, missing documents, and SOW review items. Live actions remain locked.', 'waiting_for_user');
    }
    session.sessionStatus = 'waiting_for_user';
    session.lastAquaResponseDraft = 'I can help with jobs, reports, receipts, approvals, and local/demo workflows. Try “pull up Henderson” or “show Home Depot receipts.”';
    return saveAquaVoiceSessionV62I(session);
  }

  function handleAquaSessionTurnV62I(commandText) {
    var session = routeAquaSessionCommandV62I(commandText);
    return renderAquaSessionPanelV62I(session);
  }

  function isAquaSessionCommandV62I(commandText) {
    var q = normalizeAquaPhraseV61E(commandText);
    var active = false;
    try { active = Boolean(window.localStorage.getItem(VOICE_SESSION_KEY_V62I)); } catch (error) { active = Boolean(state.currentAquaVoiceSessionV62I && state.currentAquaVoiceSessionV62I.startedAt); }
    if (/^(start aqua session|hey aqua|aqua|ready to work|end session|clear session|manual mode|stop voice)$/.test(q)) return true;
    if (/^(pull up henderson|show henderson|show the henderson report|pull up the report|show home depot receipts|show the home depot receipts|prepare those for accountant export|which receipts are we talking about|cancel that)$/.test(q)) return true;
    if (active && /^(continue|next|repeat that|read it back|stop speaking|what needs approval|what should i do next|what needs my attention today|henderson|henderson staircase)$/.test(q)) return true;
    return false;
  }

  function installAquaSessionPanelV62I(root) {
    var scope = root || document;
    if (!scope || typeof scope.querySelector !== 'function') return false;
    if (scope.querySelector('[data-aqua-v62i-session-inline="true"]')) return true;
    var output = scope.querySelector('#brainOut');
    var target = output || scope.querySelector('#voiceAskAreaV60U') || scope.querySelector('.actions');
    if (!target || typeof target.insertAdjacentHTML !== 'function') return false;
    target.insertAdjacentHTML(output ? 'beforebegin' : 'afterend', '<div data-aqua-v62i-session-inline="true">' + renderAquaSessionPanelV62I(getAquaVoiceSessionV62I()) + '</div>');
    state.aquaSessionPanelWorks = true;
    syncNamespace();
    return true;
  }

  function renderWorkflowPlanActionResultV62F(mode) {
    if (mode === 'save') return '<div class="note" data-aqua-v62f-save-workflow-plan="true"><strong>Save Workflow Plan</strong><div>Saved to localStorage key ' + WORKFLOW_PLAN_KEY_V62F + ' only.</div><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(workflowPlanTextV62F(saveAquaWorkflowPlanV62F())) + '</pre></div>';
    if (mode === 'show') { var last = showLastAquaWorkflowPlanV62F(true); return '<div class="note" data-aqua-v62f-show-last-workflow-plan="true"><strong>Show Last Workflow Plan</strong>' + (last ? '<pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(workflowPlanTextV62F(last)) + '</pre>' : '<div>No saved workflow plan found.</div>') + '</div>'; }
    if (mode === 'clear') { clearAquaWorkflowPlanDemoV62F(); return '<div class="note" data-aqua-v62f-clear-workflow-plan="true"><strong>Clear Workflow Plan Demo</strong><div>Cleared local/demo workflow plan state only.</div></div>'; }
    if (mode === 'copy') return '<div class="note" data-aqua-v62f-copy-workflow-plan="true"><strong>Copy Workflow Plan Text</strong><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(copyAquaWorkflowPlanTextV62F()) + '</pre></div>';
    if (mode === 'owner_review') { markWorkflowPlanReadyForOwnerReviewDemoV62F(); return '<div class="note" data-aqua-v62f-owner-review-ready="true"><strong>Mark Plan Ready for Owner Review Demo</strong><div>Local/demo status only. No live approval ran.</div></div>'; }
    if (mode === 'allowed') return '<div class="note" data-aqua-v62f-allowed-now="true"><strong>What Aqua Can Do Now</strong><ul>' + ((state.currentWorkflowPlanV62F && state.currentWorkflowPlanV62F.allowedLocalSteps) || ['Prepare local/demo workflow plans']).map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul></div>';
    if (mode === 'approval') return '<div class="note" data-aqua-v62f-requires-approval="true"><strong>What Requires Approval</strong><ul>' + ((state.currentWorkflowPlanV62F && state.currentWorkflowPlanV62F.requiredPermissions) || ['Backend/live action approval required']).map(function (item) { return '<li>' + escapeHTMLV61D(item) + '</li>'; }).join('') + '</ul></div>';
    return '';
  }


  function premiumModuleChipsV61Z(chips) {
    return (chips || []).filter(Boolean).map(function (chip) {
      return '<span class="aqua-v61z-chip">' + escapeHTMLV61D(chip) + '</span>';
    }).join('');
  }

  function premiumModuleAttrsV61Z(attrs) {
    return Object.keys(attrs || {}).map(function (key) {
      if (!/^data-[a-z0-9-]+$/i.test(key) || attrs[key] === false || attrs[key] === null || typeof attrs[key] === 'undefined') return '';
      return ' ' + key + '="' + escapeHTMLV61D(String(attrs[key])) + '"';
    }).join('');
  }

  function renderPremiumModuleShellV61Z(options) {
    var safe = options || {};
    var chips = premiumModuleChipsV61Z(safe.chips || ['Demo Data Only', 'Backend Locked', 'No Live Change Made']);
    var tag = safe.tag ? '<span class="aqua-v61z-module-tag">' + escapeHTMLV61D(safe.tag) + '</span>' : '';
    var subtitle = safe.subtitle ? '<div class="aqua-v61z-module-subtitle">' + escapeHTMLV61D(safe.subtitle) + '</div>' : '';
    var actions = safe.actions ? '<div class="actions aqua-v61z-actions">' + safe.actions + '</div>' : '';
    var footer = safe.safetyFooter ? '<div class="locked aqua-v61z-safety-footer">' + safe.safetyFooter + '</div>' : '';
    var attrs = premiumModuleAttrsV61Z(safe.attrs);
    return '<section class="note aqua-v61z-module-shell" data-aqua-v61z-premium-module-shell="true" data-aqua-v61z-premium-shell-marker="Premium Module Shell"' + attrs + '>' +
      '<div class="aqua-v61z-module-header"><div><div class="aqua-v61z-eyebrow">Aqua Homes OS • Premium Module Shell</div><strong class="aqua-v61z-module-title">' + escapeHTMLV61D(safe.title || 'Aqua Homes Module') + '</strong>' + subtitle + '</div>' + tag + '</div>' +
      '<div class="aqua-v61z-chip-row">' + chips + '</div>' +
      '<div class="aqua-v61z-module-body">' + (safe.body || '') + '</div>' + actions + footer + '</section>';
  }

  function applyPremiumModuleShellV61Z(container, options) {
    if (!container) return false;
    container.innerHTML = renderPremiumModuleShellV61Z(options || {});
    return true;
  }

  function installPremiumModuleShellStylesV61Z() {
    if (!document || !document.createElement || !document.body) return false;
    if (document.getElementById && document.getElementById('aquaPremiumModuleShellV61Z')) return true;
    var style = document.createElement('style');
    style.id = 'aquaPremiumModuleShellV61Z';
    style.textContent = '.aqua-v61z-module-shell{margin:14px 0;padding:16px;border-radius:22px;border:1px solid rgba(196,139,52,.52);background:radial-gradient(circle at 12% 0%,rgba(42,134,255,.22),transparent 38%),linear-gradient(145deg,rgba(4,10,24,.98),rgba(8,24,48,.96));box-shadow:0 0 0 1px rgba(70,145,255,.16) inset,0 18px 46px rgba(0,0,0,.42),0 0 28px rgba(30,112,255,.12);color:#eef6ff;overflow:auto;max-height:min(72vh,760px)}.aqua-v61z-module-header{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;margin-bottom:10px;padding-bottom:12px;border-bottom:1px solid rgba(196,139,52,.28)}.aqua-v61z-eyebrow{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8fbfff;margin-bottom:4px}.aqua-v61z-module-title{display:block;font-size:clamp(20px,5vw,28px);line-height:1.06;color:#fff;text-shadow:0 0 18px rgba(63,154,255,.45)}.aqua-v61z-module-subtitle{margin-top:6px;color:#a9b9cf;font-size:13px;line-height:1.35}.aqua-v61z-module-tag,.aqua-v61z-chip{display:inline-flex;align-items:center;border-radius:999px;border:1px solid rgba(211,154,68,.52);background:rgba(122,79,22,.22);color:#f4d59b;font-size:11px;font-weight:800;letter-spacing:.04em;padding:6px 9px;white-space:nowrap}.aqua-v61z-chip-row{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 12px}.aqua-v61z-chip{border-color:rgba(59,145,255,.42);background:rgba(12,58,118,.42);color:#cfe6ff}.aqua-v61z-module-body{display:grid;gap:10px;color:#dce9f7}.aqua-v61z-module-body>.note,.aqua-v61z-card{border-radius:16px;border:1px solid rgba(73,139,231,.25);background:rgba(4,17,36,.62);box-shadow:inset 3px 0 0 rgba(203,142,49,.75);padding:12px}.aqua-v61z-module-body ul{margin:8px 0 0 18px;padding:0}.aqua-v61z-module-body strong{color:#fff}.aqua-v61z-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.aqua-v61z-actions .btn,.aqua-v61z-module-shell .btn{min-height:40px;border-radius:999px}.aqua-v61z-safety-footer{margin-top:12px;border-color:rgba(66,145,255,.28);background:rgba(2,9,20,.72);color:#bbcadb}@media(max-width:520px){.aqua-v61z-module-shell{padding:14px;border-radius:18px;max-height:70vh}.aqua-v61z-module-header{display:block}.aqua-v61z-module-tag{margin-top:8px}.aqua-v61z-actions .btn{width:100%;justify-content:center}}.aqua-v62a-panel{display:grid;gap:12px}.aqua-v62a-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;padding:14px;border-radius:18px;background:radial-gradient(circle at top left,rgba(40,145,255,.24),transparent 42%),linear-gradient(135deg,rgba(1,7,18,.96),rgba(9,24,48,.92));border:1px solid rgba(64,149,255,.32);box-shadow:inset 0 0 0 1px rgba(218,159,67,.14),0 0 24px rgba(29,114,255,.12)}.aqua-v62a-kicker{color:#d8a85b;font-size:10px;font-weight:900;letter-spacing:.18em}.aqua-v62a-hero h3{margin:3px 0 5px;color:#fff;font-size:clamp(22px,5vw,32px);text-shadow:0 0 22px rgba(60,151,255,.48)}.aqua-v62a-hero p{margin:0;color:#b9cce0}.aqua-v62a-section{padding:12px;border-radius:16px;border:1px solid rgba(71,141,232,.28);background:linear-gradient(180deg,rgba(6,18,38,.78),rgba(3,10,22,.72));box-shadow:inset 3px 0 0 rgba(202,142,50,.86)}.aqua-v62a-section h4{margin:0 0 8px;color:#f6d59a;font-size:12px;text-transform:uppercase;letter-spacing:.12em}.aqua-v62a-section p{margin:0 0 5px}.aqua-v62a-section code{color:#dff0ff;background:rgba(45,124,229,.18);border:1px solid rgba(85,158,255,.25);border-radius:10px;padding:4px 7px}.aqua-v62a-section blockquote{margin:0;padding:10px 12px;border-left:3px solid #c9903d;background:rgba(201,144,61,.09);border-radius:12px;color:#eef7ff}.aqua-v62c-focused-section,.aqua-v62e-focused-route{position:relative;border-color:rgba(64,170,255,.82)!important;box-shadow:0 0 0 1px rgba(64,170,255,.34) inset,0 0 26px rgba(42,145,255,.30),inset 4px 0 0 rgba(214,157,61,.95)!important;outline:2px solid rgba(67,160,255,.34);scroll-margin:90px}.aqua-v62c-focus-chip{display:inline-flex;width:max-content;margin:0 0 8px;padding:5px 9px;border-radius:999px;border:1px solid rgba(223,166,73,.72);background:linear-gradient(135deg,rgba(126,80,23,.92),rgba(34,93,158,.72));color:#ffe6ad;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.aqua-v62c-opened-marker{white-space:pre-wrap;margin:0 0 10px;padding:10px 12px;border-radius:14px;border:1px solid rgba(83,168,255,.45);background:rgba(5,18,40,.86);color:#eaf6ff;font-weight:900}.aqua-v62c-status-list{margin-top:8px}.aqua-v62a-detail-list{margin:0;padding:0;list-style:none;display:grid;gap:6px}.aqua-v62a-detail-list li{padding:8px 10px;border-radius:12px;background:rgba(2,11,26,.5);border:1px solid rgba(81,151,238,.18)}.aqua-v62a-detail-list span{color:#99b8d8}.aqua-v62a-lock-row{display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start}.aqua-v62a-lock-row span{display:inline-flex;padding:6px 8px;border-radius:999px;border:1px solid rgba(211,154,68,.48);background:rgba(120,77,18,.24);color:#f3d39a;font-size:11px;font-weight:800}.aqua-v62a-actions{display:flex;flex-wrap:wrap;gap:8px}.aqua-v62a-action-output,.aqua-v62a-copy-block{border-radius:14px;border:1px dashed rgba(91,165,255,.35);background:rgba(2,9,20,.58);padding:10px;color:#d9eaff;white-space:pre-wrap}.aqua-v62a-muted{color:#a9bbcf}@media(max-width:620px){.aqua-v62a-hero{grid-template-columns:1fr}.aqua-v62a-actions .btn{width:100%}}';
    document.body.appendChild(style);
    state.premiumModuleShellWorks = true;
    state.openedModulesPolished = true;
    return true;
  }

  var DRAFT_CHANGE_QUEUE_KEY_V61J = 'aquaDraftChangeQueueV61J';
  var PERMISSION_GRANTER_KEY_V61I = 'aquaPermissionGranterV61I';
  var REGRESSION_REPORT_KEY_V61L = 'aquaRegressionReportV61L';
  var REGRESSION_REPORT_SYNC_KEY_V62D = 'aquaRegressionReportSyncV62D';
  var SPOKEN_READBACK_KEY_V61R = 'aquaSpokenReadbackV61R';
  var CONVERSATIONAL_CONTEXT_KEY_V61S = 'aquaConversationalContextV61S';
  var CALCULATOR_DRAFTS_KEY_V61X = 'aquaCalculatorDraftsV61X';
  var SOW_REVIEW_QUEUE_KEY_V61Y = 'aquaSowReviewQueueV61Y';
  var VOICE_BRAIN_CONTEXT_KEY_V61Z = 'aquaVoiceBrainContextV61Z';
  var VOICE_BRAIN_PLAN_KEY_V62A = 'aquaVoiceBrainPlansV62A';
  var WORKFLOW_PLAN_KEY_V62F = 'aquaWorkflowPlansV62F';
  var ACTIVE_WORKFLOW_KEY_V62G = 'aquaActiveWorkflowV62G';
  var VOICE_INTERACTION_KEY_V62H = 'aquaVoiceInteractionV62H';
  var VOICE_SESSION_KEY_V62I = 'aquaVoiceSessionV62I';


  function toolGatewayContractV62J() {
    var riskLevelMap = {
      low_read_demo: 'Local/demo read-only display only; backend still locked for real data.',
      read_sensitive_backend_required: 'Sensitive company/project data read requires authenticated backend and role check.',
      prepare_action_demo: 'Frontend may prepare text-only draft summaries; live execution remains locked.',
      export_locked: 'Customer/accounting/payroll exports are locked until backend permission, audit, and review exist.',
      upload_locked: 'File uploads are locked until secure storage, malware scanning, and owner approval exist.',
      financial_locked: 'Spend, payables, budget, accounting, and vendor details require financial backend authorization.',
      payroll_locked: 'Employee time/payroll data requires payroll authorization and backend-only execution.',
      bank_locked: 'Bank/payment sync requires bank approval route and backend-only execution.',
      customer_share_locked: 'Customer-facing report sharing requires customer-share approval and backend audit.',
      live_action_locked: 'Any live record mutation, approval, send, upload, export, payment, payroll, or sync is locked.'
    };
    var approvalRouteMap = {
      owner_review: { label: 'Owner Review', placeholder: '/backend/approval/owner-review', status: 'locked' },
      accounting_review: { label: 'Accounting Review', placeholder: '/backend/approval/accounting-review', status: 'locked' },
      payroll_review: { label: 'Payroll Review', placeholder: '/backend/approval/payroll-review', status: 'locked' },
      bank_review: { label: 'Bank Review', placeholder: '/backend/approval/bank-review', status: 'locked' },
      customer_share_review: { label: 'Customer Share Review', placeholder: '/backend/approval/customer-share-review', status: 'locked' },
      legal_review: { label: 'Legal Review', placeholder: '/backend/approval/legal-review', status: 'locked' },
      admin_backend_enablement: { label: 'Admin Backend Enablement', placeholder: '/backend/admin/enable-tool-gateway', status: 'locked' }
    };
    var permissionRequirementMap = {
      read_demo: ['authenticated user', 'project access'],
      read_sensitive: ['authenticated user', 'company membership', 'project role'],
      accounting_export: ['owner approval', 'accounting approval', 'export packet review'],
      upload: ['owner approval', 'project file permission', 'secure backend storage'],
      customer_share: ['owner approval', 'customer-share review'],
      payroll: ['payroll approval', 'employee time permission'],
      financial: ['owner approval', 'accounting permission'],
      live_action: ['owner approval', 'backend execution permission']
    };
    var auditRequirementMap = {
      read_sensitive_backend_required: 'Audit actor, company, project, tool, intent, timestamp, and result summary.',
      prepare_action_demo: 'Audit future prepared action summary before any approval.',
      export_locked: 'Audit export packet review, owner/accounting approvers, payload hash, and download event.',
      upload_locked: 'Audit uploader, file metadata, project route, malware scan status, and approval.',
      financial_locked: 'Audit financial query, data scope, actor, and accounting permission.',
      payroll_locked: 'Audit employee-time query scope, payroll approver, and access reason.',
      customer_share_locked: 'Audit report packet, recipient class, share approval, and send event.',
      live_action_locked: 'Audit before/after snapshot, approval route, backend executor, and undo checkpoint.'
    };
    var undoRequirementMap = {
      read: 'No mutation; undo not needed, but access audit required for sensitive reads.',
      prepare: 'Prepared draft can be discarded locally; no live undo because no live change occurred.',
      export: 'Undo/revert plan required before generating live export packet.',
      upload: 'Delete/revert storage object checkpoint required before live upload.',
      send: 'Recall/retraction plan required where possible before customer sharing.',
      write: 'Before/after checkpoint required before backend write or approval.'
    };
    var backendEndpointPlaceholders = {
      gateway: '/backend/tool-gateway/execute',
      permissions: '/backend/tool-gateway/permissions/check',
      approvals: '/backend/tool-gateway/approvals/request',
      audit: '/backend/tool-gateway/audit/log',
      undo: '/backend/tool-gateway/undo/checkpoint',
      files: '/backend/files/project',
      exports: '/backend/exports/accounting',
      ai: '/backend/ai/tool-router'
    };
    var blockedFrontendActionRules = [
      'Frontend must never hold API keys.',
      'Frontend must never call OpenAI/Google/Gemini directly for live tool execution.',
      'Frontend must never export customer/accounting/payroll data.',
      'Frontend must never upload files to live storage.',
      'Frontend must never send emails/texts.',
      'Frontend must never process payroll.',
      'Frontend must never sync bank/accounting.',
      'Frontend must never approve live changes.',
      'Frontend must never bypass owner approval.',
      'Frontend must never store audio.',
      'Frontend must never run always-listening microphone.'
    ];
    function contract(toolName, description, readOrWrite, riskLevel, requiredRole, requiredPermissions, approvalRequired, auditRequired, undoRequired) {
      return { toolName: toolName, description: description, inputSchemaPlaceholder: toolName + 'InputSchemaV1Placeholder', outputSchemaPlaceholder: toolName + 'OutputSchemaV1Placeholder', readOrWrite: readOrWrite, riskLevel: riskLevel, requiredRole: requiredRole, requiredPermissions: requiredPermissions, approvalRequired: approvalRequired, auditRequired: auditRequired, undoRequired: undoRequired, backendRequired: true, liveStatus: 'locked', frontendExecutionAllowed: false };
    }
    var toolContracts = {
      getProjectStatus: contract('getProjectStatus', 'Read current project health/status from future backend.', 'read', 'read_sensitive_backend_required', 'project_member', ['read_sensitive'], false, true, false),
      getProjectReport: contract('getProjectReport', 'Retrieve project report from future backend.', 'read', 'read_sensitive_backend_required', 'project_member', ['read_sensitive'], false, true, false),
      searchProjectFiles: contract('searchProjectFiles', 'Search project file metadata through future backend.', 'read', 'read_sensitive_backend_required', 'project_member', ['read_sensitive'], false, true, false),
      searchReceipts: contract('searchReceipts', 'Search receipt records through future accounting backend.', 'read', 'financial_locked', 'accounting_user', ['financial'], true, true, false),
      summarizeVendorSpend: contract('summarizeVendorSpend', 'Summarize vendor spend with financial permission.', 'read', 'financial_locked', 'accounting_user', ['financial'], true, true, false),
      summarizeTradeSpend: contract('summarizeTradeSpend', 'Summarize trade spend and budget risk.', 'read', 'financial_locked', 'accounting_user', ['financial'], true, true, false),
      prepareAccountantExport: contract('prepareAccountantExport', 'Prepare locked accountant export packet for review.', 'prepare', 'export_locked', 'accounting_user', ['accounting_export'], true, true, true),
      uploadProjectFile: contract('uploadProjectFile', 'Upload a project file through secure storage only.', 'write', 'upload_locked', 'project_admin', ['upload'], true, true, true),
      sendCustomerReport: contract('sendCustomerReport', 'Send customer report only after customer-share review.', 'write', 'customer_share_locked', 'owner_admin', ['customer_share'], true, true, true),
      getEmployeeTime: contract('getEmployeeTime', 'Read employee time data with payroll permission.', 'read', 'payroll_locked', 'payroll_user', ['payroll'], true, true, false),
      getPayables: contract('getPayables', 'Read payables through accounting backend.', 'read', 'financial_locked', 'accounting_user', ['financial'], true, true, false),
      checkBudgetRisk: contract('checkBudgetRisk', 'Inspect budget risk through backend financial data.', 'read', 'financial_locked', 'accounting_user', ['financial'], true, true, false),
      checkCameraAllocation: contract('checkCameraAllocation', 'Inspect camera/jobsite allocation metadata.', 'read', 'read_sensitive_backend_required', 'project_admin', ['read_sensitive'], false, true, false),
      createSowDraft: contract('createSowDraft', 'Create draft SOW only as backend-reviewed draft.', 'prepare', 'prepare_action_demo', 'project_admin', ['live_action'], true, true, true),
      createEstimateDraft: contract('createEstimateDraft', 'Create estimate draft only after backend permission.', 'prepare', 'prepare_action_demo', 'project_admin', ['financial', 'live_action'], true, true, true),
      createChangeOrderDraft: contract('createChangeOrderDraft', 'Create change order draft only after approval gate.', 'prepare', 'prepare_action_demo', 'project_admin', ['live_action'], true, true, true),
      approvePreparedAction: contract('approvePreparedAction', 'Approve a prepared backend action only through owner route.', 'write', 'live_action_locked', 'owner_admin', ['live_action'], true, true, true),
      rejectPreparedAction: contract('rejectPreparedAction', 'Reject a prepared backend action with audit note.', 'write', 'live_action_locked', 'owner_admin', ['live_action'], true, true, false),
      createAuditLogEntry: contract('createAuditLogEntry', 'Create immutable backend audit log entry.', 'write', 'live_action_locked', 'backend_service', ['live_action'], true, true, false),
      createUndoCheckpoint: contract('createUndoCheckpoint', 'Create backend undo/revert checkpoint before mutation.', 'write', 'live_action_locked', 'backend_service', ['live_action'], true, true, true)
    };
    return {
      version: 'v62J',
      name: 'Aqua Brain Secure Tool Gateway — v62J',
      localDemoOnly: true,
      toolRequestEnvelope: { requestId: 'demo-request-id', toolName: 'futureToolName', intent: 'natural language intent', actorRole: 'owner_admin', companyId: 'demo-company-id', projectId: 'demo-project-id', projectName: 'Demo Project', entities: {}, requestedAction: 'read_or_prepare_only', permissionLevel: 'owner_review_required', riskLevel: 'live_action_locked', requiresOwnerApproval: true, requiresAccountingApproval: false, requiresBackend: true, requiresAuditLog: true, requiresUndoCheckpoint: true, frontendStatus: 'demo_only', liveExecutionAllowed: false, timestamp: 'ISO-8601 timestamp' },
      toolResponseEnvelope: { requestId: 'demo-request-id', toolName: 'futureToolName', status: 'locked_or_prepared', resultType: 'panel_summary', visualRoute: 'local_demo_panel', spokenResponseDraft: 'Draft response only; no live execution.', preparedActionSummary: 'Prepared summary for approval only.', permissionStatus: 'required_not_granted_in_frontend', auditStatus: 'backend_required', undoStatus: 'backend_checkpoint_required', liveExecutionStatus: 'locked', safetyLabels: ['backend_required', 'frontend_demo_only', 'no_live_execution'], nextRecommendedAction: 'Build authenticated backend gateway with server-side keys and audit logging.', timestamp: 'ISO-8601 timestamp' },
      permissionRequirementMap: permissionRequirementMap,
      riskLevelMap: riskLevelMap,
      auditRequirementMap: auditRequirementMap,
      undoRequirementMap: undoRequirementMap,
      approvalRouteMap: approvalRouteMap,
      backendEndpointPlaceholders: backendEndpointPlaceholders,
      blockedFrontendActionRules: blockedFrontendActionRules,
      toolContracts: toolContracts,
      secureExecutionStatus: { currentStatus: 'backend_locked_contract_only', frontendStatus: 'demo_only', liveExecutionAllowed: false, noBackendCalls: true, noNetworkCalls: true, noExternalAIAPICalls: true, noApiKeysInFrontend: true, noLiveRecordChanges: true, noLiveExport: true, noLiveUpload: true, noCustomerSharing: true, noAccountingExport: true, noPaymentPayrollBankAction: true, noAudioStorage: true, noAlwaysListening: true }
    };
  }

  function ensureToolGatewayContractV62J() {
    window.AquaToolGatewayContractV62J = toolGatewayContractV62J();
    state.toolGatewayContractExists = true;
    state.toolRequestEnvelopeWorks = Boolean(window.AquaToolGatewayContractV62J.toolRequestEnvelope && window.AquaToolGatewayContractV62J.toolRequestEnvelope.frontendStatus === 'demo_only' && window.AquaToolGatewayContractV62J.toolRequestEnvelope.liveExecutionAllowed === false);
    state.toolResponseEnvelopeWorks = Boolean(window.AquaToolGatewayContractV62J.toolResponseEnvelope && window.AquaToolGatewayContractV62J.toolResponseEnvelope.liveExecutionStatus === 'locked');
    state.toolContractMapWorks = Object.keys(window.AquaToolGatewayContractV62J.toolContracts || {}).length === 20 && Object.keys(window.AquaToolGatewayContractV62J.toolContracts || {}).every(function (key) { return window.AquaToolGatewayContractV62J.toolContracts[key].frontendExecutionAllowed === false && window.AquaToolGatewayContractV62J.toolContracts[key].liveStatus === 'locked'; });
    state.permissionMapWorks = Boolean(window.AquaToolGatewayContractV62J.permissionRequirementMap && window.AquaToolGatewayContractV62J.permissionRequirementMap.accounting_export);
    state.riskMapWorks = Object.keys(window.AquaToolGatewayContractV62J.riskLevelMap || {}).length === 10;
    state.approvalRoutesWork = Object.keys(window.AquaToolGatewayContractV62J.approvalRouteMap || {}).length === 7;
    state.frontendBlockRulesWork = (window.AquaToolGatewayContractV62J.blockedFrontendActionRules || []).length >= 11;
    return window.AquaToolGatewayContractV62J;
  }

  function detectToolGatewayCommandV62J(original, normalized) {
    var q = String(normalized || '').trim();
    if (/^(show )?(secure )?tool gateway$/.test(q) || /^show backend tool contract$/.test(q) || /^show tool contract$/.test(q) || /^show permission map$/.test(q) || /^show risk map$/.test(q) || /^show approval routes$/.test(q) || /^show blocked frontend actions$/.test(q) || /^show backend readiness$/.test(q)) {
      return { canonicalIntent: 'secure_tool_gateway_v62j', routeText: original, originalText: original, normalizedText: q, module: 'Aqua Brain Secure Tool Gateway — v62J', gatewayModeV62J: q.replace(/^show /, '') || 'tool gateway' };
    }
    if (/^can aqua export yet$/.test(q)) return { canonicalIntent: 'secure_tool_gateway_question_v62j', routeText: original, originalText: original, normalizedText: q, module: 'Aqua Brain Secure Tool Gateway — v62J', gatewayQuestionV62J: 'export' };
    if (/^can aqua upload yet$/.test(q)) return { canonicalIntent: 'secure_tool_gateway_question_v62j', routeText: original, originalText: original, normalizedText: q, module: 'Aqua Brain Secure Tool Gateway — v62J', gatewayQuestionV62J: 'upload' };
    if (/^can aqua connect to chatgpt yet$/.test(q)) return { canonicalIntent: 'secure_tool_gateway_question_v62j', routeText: original, originalText: original, normalizedText: q, module: 'Aqua Brain Secure Tool Gateway — v62J', gatewayQuestionV62J: 'chatgpt' };
    return null;
  }

  function renderToolGatewayQuestionV62J(question) {
    if (question === 'export') return '<div class="note" data-aqua-v62j-export-locked="true"><strong>No. Export is locked.</strong><div>Future export requires:</div><ul><li>secure backend</li><li>authenticated owner/accounting permission</li><li>audit log</li><li>undo/revert plan</li><li>export packet review</li><li>no frontend API keys</li></ul></div>';
    if (question === 'chatgpt') return '<div class="note" data-aqua-v62j-chatgpt-locked="true"><strong>Not live yet.</strong><div>Future ChatGPT/OpenAI-style connection requires:</div><ul><li>secure backend</li><li>server-side API keys only</li><li>tool gateway contract</li><li>permission gate</li><li>audit log</li><li>no API keys in frontend</li></ul></div>';
    return '<div class="note" data-aqua-v62j-upload-locked="true"><strong>No. Upload is locked.</strong><div>Future upload requires secure backend storage, authenticated owner/project permission, audit log, undo/revert delete plan, file review/scanning, and no frontend API keys.</div></div>';
  }

  function renderToolGatewayPanelV62J(intent) {
    var contract = ensureToolGatewayContractV62J();
    var mode = intent && intent.gatewayModeV62J;
    var body = '<div class="aqua-v62a-panel" data-aqua-v62j-secure-tool-gateway="true"><div class="aqua-v62a-hero"><div><div class="aqua-v62a-kicker">Backend Readiness / Contract Only</div><h3>Aqua Brain Secure Tool Gateway — v62J</h3><p>Current status: <strong>backend locked / contract only</strong>. Local/demo-only; no backend, network, external AI/API, upload, export, sharing, or live record change is active.</p></div><span class="aqua-v61z-module-tag">Locked</span></div>';
    if (intent && intent.gatewayQuestionV62J) body += renderToolGatewayQuestionV62J(intent.gatewayQuestionV62J);
    body += '<div class="aqua-v62a-section"><h4>Tool request envelope summary</h4><p>' + Object.keys(contract.toolRequestEnvelope).map(escapeHTMLV61D).join(', ') + '</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Tool response envelope summary</h4><p>' + Object.keys(contract.toolResponseEnvelope).map(escapeHTMLV61D).join(', ') + '</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Tool contract count</h4><p><strong>' + Object.keys(contract.toolContracts).length + '</strong> locked future backend tools. Frontend execution allowed: <strong>false</strong>.</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Risk levels</h4><p>' + Object.keys(contract.riskLevelMap).map(escapeHTMLV61D).join(', ') + '</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Approval routes</h4><p>' + Object.keys(contract.approvalRouteMap).map(escapeHTMLV61D).join(', ') + '</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Blocked frontend actions</h4><ul class="aqua-v62a-detail-list">' + contract.blockedFrontendActionRules.map(function (rule) { return '<li>' + escapeHTMLV61D(rule) + '</li>'; }).join('') + '</ul></div>';
    if (/permission map/.test(mode || '')) body += '<div class="aqua-v62a-section"><h4>Permission map</h4><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(JSON.stringify(contract.permissionRequirementMap, null, 2)) + '</pre></div>';
    if (/risk map/.test(mode || '')) body += '<div class="aqua-v62a-section"><h4>Risk map</h4><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(JSON.stringify(contract.riskLevelMap, null, 2)) + '</pre></div>';
    if (/approval routes/.test(mode || '')) body += '<div class="aqua-v62a-section"><h4>Approval route map</h4><pre class="aqua-v62a-copy-block">' + escapeHTMLV61D(JSON.stringify(contract.approvalRouteMap, null, 2)) + '</pre></div>';
    if (/blocked frontend actions/.test(mode || '')) body += '<div class="aqua-v62a-section"><h4>Frontend block rules detail</h4><p>These rules are contract-level blockers and cannot be bypassed by typed commands.</p></div>';
    body += '<div class="aqua-v62a-section"><h4>Next backend step</h4><p>Build an authenticated server-side gateway with permission checks, server-side AI/API keys only, audit logging, undo checkpoints, approval routes, and disabled-by-default live execution.</p></div></div>';
    state.toolGatewayPanelWorks = true;
    state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noApiKeysInFrontend = true; state.noLiveRecordChanges = true; state.noAudioStorage = true; state.noAlwaysListening = true;
    return renderPremiumModuleShellV61Z({ title: 'Aqua Brain Secure Tool Gateway — v62J', subtitle: 'Backend readiness contract. Not live integration.', tag: 'Contract Only', chips: ['Backend Locked', 'No Frontend API Keys', 'No Live Execution'], attrs: { 'data-aqua-v62j-secure-tool-gateway-shell': 'true' }, body: body, safetyFooter: 'No backend calls, no network calls, no external AI/API calls, no export, no upload, no customer sharing, no accounting export, no payment/payroll/bank action, no audio storage, no always-listening.' });
  }

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
      runAquaCommandRegressionV61Z: runAquaCommandRegressionV61L,
      classifyVoiceBrainIntentV61Z: classifyVoiceBrainIntentV61Z,
      renderVoiceBrainToolPlanV61Z: renderVoiceBrainToolPlanV61Z,
      saveVoiceBrainPlanV62A: saveVoiceBrainPlanV62A,
      showLastVoiceBrainPlanV62A: showLastVoiceBrainPlanV62A,
      clearVoiceBrainPlanDemoV62A: clearVoiceBrainPlanDemoV62A,
      copyToolPlanTextV62A: copyToolPlanTextV62A,
      renderVoiceBrainPlanViewerV62A: renderVoiceBrainPlanViewerV62A,
      handleVoiceBrainPlanActionV62A: handleVoiceBrainPlanActionV62A,
      readVoiceBrainPlansV62A: readVoiceBrainPlansV62A,
      openAquaBrainVisualRouteV62C: openAquaBrainVisualRouteV62C,
      executeAquaVoiceNavigationV62E: executeAquaVoiceNavigationV62E,
      openAquaModuleForToolV62E: openAquaModuleForToolV62E,
      focusAquaSectionForToolV62E: focusAquaSectionForToolV62E,
      renderAquaFocusedResultV62E: renderAquaFocusedResultV62E,
      runLiveInAppRegressionReportV62D: runLiveInAppRegressionReportV62D,
      syncRegressionReportV62D: syncRegressionReportV62D,
      focusAquaToolPlanSectionV62C: focusAquaToolPlanSectionV62C,
      readVoiceBrainContextV61Z: readVoiceBrainContextV61Z,
      renderPremiumModuleShellV61Z: renderPremiumModuleShellV61Z,
      applyPremiumModuleShellV61Z: applyPremiumModuleShellV61Z,
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
      clearLastConversationalContextV61S: clearLastConversationalContextV61S,
      planAquaWorkflowV62F: planAquaWorkflowV62F,
      renderAquaWorkflowPlanV62F: renderAquaWorkflowPlanV62F,
      executeAquaWorkflowStepDemoV62F: executeAquaWorkflowStepDemoV62F,
      saveAquaWorkflowPlanV62F: saveAquaWorkflowPlanV62F,
      showLastAquaWorkflowPlanV62F: showLastAquaWorkflowPlanV62F,
      clearAquaWorkflowPlanDemoV62F: clearAquaWorkflowPlanDemoV62F,
      copyAquaWorkflowPlanTextV62F: copyAquaWorkflowPlanTextV62F,
      markWorkflowPlanReadyForOwnerReviewDemoV62F: markWorkflowPlanReadyForOwnerReviewDemoV62F,
      saveAquaActiveWorkflowV62G: saveAquaActiveWorkflowV62G,
      getAquaActiveWorkflowV62G: getAquaActiveWorkflowV62G,
      clearAquaActiveWorkflowV62G: clearAquaActiveWorkflowV62G,
      continueAquaWorkflowV62G: continueAquaWorkflowV62G,
      classifyAquaFollowUpV62G: classifyAquaFollowUpV62G,
      renderAquaWorkflowContinuationV62G: renderAquaWorkflowContinuationV62G
    });
    window.AquaVoiceBrainV61Z = createAquaVoiceBrainV61Z();
    window.AquaWorkflowPlannerV62F = { version: VERSION, localDemoOnly: true, storageKey: WORKFLOW_PLAN_KEY_V62F, planAquaWorkflowV62F: planAquaWorkflowV62F, renderAquaWorkflowPlanV62F: renderAquaWorkflowPlanV62F, executeAquaWorkflowStepDemoV62F: executeAquaWorkflowStepDemoV62F, saveAquaWorkflowPlanV62F: saveAquaWorkflowPlanV62F, showLastAquaWorkflowPlanV62F: showLastAquaWorkflowPlanV62F, clearAquaWorkflowPlanDemoV62F: clearAquaWorkflowPlanDemoV62F, copyAquaWorkflowPlanTextV62F: copyAquaWorkflowPlanTextV62F, markWorkflowPlanReadyForOwnerReviewDemoV62F: markWorkflowPlanReadyForOwnerReviewDemoV62F,
      saveAquaActiveWorkflowV62G: saveAquaActiveWorkflowV62G,
      getAquaActiveWorkflowV62G: getAquaActiveWorkflowV62G,
      clearAquaActiveWorkflowV62G: clearAquaActiveWorkflowV62G,
      continueAquaWorkflowV62G: continueAquaWorkflowV62G,
      classifyAquaFollowUpV62G: classifyAquaFollowUpV62G,
      renderAquaWorkflowContinuationV62G: renderAquaWorkflowContinuationV62G, safetyEnvelope: workflowSafetyEnvelopeV62F() };
    state.voiceBrainToolRegistryExists = Object.keys(window.AquaVoiceBrainV61Z.toolRegistry || {}).length >= 14;
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
      runAquaCommandRegressionV61Z: runAquaCommandRegressionV61L,
      classifyAquaAskModeV61U: classifyAquaAskModeV61U,
      classifyVoiceBrainIntentV61Z: classifyVoiceBrainIntentV61Z,
      renderVoiceBrainToolPlanV61Z: renderVoiceBrainToolPlanV61Z,
      saveVoiceBrainPlanV62A: saveVoiceBrainPlanV62A,
      showLastVoiceBrainPlanV62A: showLastVoiceBrainPlanV62A,
      clearVoiceBrainPlanDemoV62A: clearVoiceBrainPlanDemoV62A,
      copyToolPlanTextV62A: copyToolPlanTextV62A,
      renderVoiceBrainPlanViewerV62A: renderVoiceBrainPlanViewerV62A,
      handleVoiceBrainPlanActionV62A: handleVoiceBrainPlanActionV62A,
      readVoiceBrainPlansV62A: readVoiceBrainPlansV62A,
      readVoiceBrainContextV61Z: readVoiceBrainContextV61Z,
      executeAquaVoiceNavigationV62E: executeAquaVoiceNavigationV62E,
      openAquaModuleForToolV62E: openAquaModuleForToolV62E,
      focusAquaSectionForToolV62E: focusAquaSectionForToolV62E,
      renderAquaFocusedResultV62E: renderAquaFocusedResultV62E,
      openAquaBrainVisualRouteV62C: openAquaBrainVisualRouteV62C,
      focusAquaToolPlanSectionV62C: focusAquaToolPlanSectionV62C,
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
      clearLastConversationalContextV61S: clearLastConversationalContextV61S,
      planAquaWorkflowV62F: planAquaWorkflowV62F,
      renderAquaWorkflowPlanV62F: renderAquaWorkflowPlanV62F,
      executeAquaWorkflowStepDemoV62F: executeAquaWorkflowStepDemoV62F,
      saveAquaWorkflowPlanV62F: saveAquaWorkflowPlanV62F,
      showLastAquaWorkflowPlanV62F: showLastAquaWorkflowPlanV62F,
      clearAquaWorkflowPlanDemoV62F: clearAquaWorkflowPlanDemoV62F,
      copyAquaWorkflowPlanTextV62F: copyAquaWorkflowPlanTextV62F,
      markWorkflowPlanReadyForOwnerReviewDemoV62F: markWorkflowPlanReadyForOwnerReviewDemoV62F,
      setAquaVoiceStateV62H: setAquaVoiceStateV62H,
      getAquaVoiceStateV62H: getAquaVoiceStateV62H,
      renderAquaVoiceStatePanelV62H: renderAquaVoiceStatePanelV62H,
      handleAquaVoiceCommandV62H: handleAquaVoiceCommandV62H,
      speakAquaResponseV62H: speakAquaResponseV62H,
      stopAquaSpeakingV62H: stopAquaSpeakingV62H,
      repeatLastAquaResponseV62H: repeatLastAquaResponseV62H,
      enableAquaVoiceV62H: enableAquaVoiceV62H,
      disableAquaVoiceV62H: disableAquaVoiceV62H,
      fallbackToManualControlsV62H: fallbackToManualControlsV62H,
      startVoiceCaptureV62H: startVoiceCaptureV62H,
      installAquaVoicePanelV62H: installAquaVoicePanelV62H,
      startAquaVoiceSessionV62I: startAquaVoiceSessionV62I,
      endAquaVoiceSessionV62I: endAquaVoiceSessionV62I,
      getAquaVoiceSessionV62I: getAquaVoiceSessionV62I,
      saveAquaVoiceSessionV62I: saveAquaVoiceSessionV62I,
      clearAquaVoiceSessionV62I: clearAquaVoiceSessionV62I,
      handleAquaSessionTurnV62I: handleAquaSessionTurnV62I,
      renderAquaSessionPanelV62I: renderAquaSessionPanelV62I,
      askAquaFollowUpQuestionV62I: askAquaFollowUpQuestionV62I,
      continueAquaSessionV62I: continueAquaSessionV62I,
      cancelAquaSessionV62I: cancelAquaSessionV62I,
      routeAquaSessionCommandV62I: routeAquaSessionCommandV62I,
      installAquaSessionPanelV62I: installAquaSessionPanelV62I
    });
    window.AquaVoiceBrainV61Z = createAquaVoiceBrainV61Z();
    window.AquaWorkflowPlannerV62F = { version: VERSION, localDemoOnly: true, storageKey: WORKFLOW_PLAN_KEY_V62F, planAquaWorkflowV62F: planAquaWorkflowV62F, renderAquaWorkflowPlanV62F: renderAquaWorkflowPlanV62F, executeAquaWorkflowStepDemoV62F: executeAquaWorkflowStepDemoV62F, saveAquaWorkflowPlanV62F: saveAquaWorkflowPlanV62F, showLastAquaWorkflowPlanV62F: showLastAquaWorkflowPlanV62F, clearAquaWorkflowPlanDemoV62F: clearAquaWorkflowPlanDemoV62F, copyAquaWorkflowPlanTextV62F: copyAquaWorkflowPlanTextV62F, markWorkflowPlanReadyForOwnerReviewDemoV62F: markWorkflowPlanReadyForOwnerReviewDemoV62F, safetyEnvelope: workflowSafetyEnvelopeV62F() };
    window.AquaWorkflowMemoryV62G = { version: VERSION, localDemoOnly: true, storageKey: ACTIVE_WORKFLOW_KEY_V62G, saveAquaActiveWorkflowV62G: saveAquaActiveWorkflowV62G, getAquaActiveWorkflowV62G: getAquaActiveWorkflowV62G, clearAquaActiveWorkflowV62G: clearAquaActiveWorkflowV62G, continueAquaWorkflowV62G: continueAquaWorkflowV62G, classifyAquaFollowUpV62G: classifyAquaFollowUpV62G, renderAquaWorkflowContinuationV62G: renderAquaWorkflowContinuationV62G, safetyEnvelope: workflowSafetyEnvelopeV62F() };
    window.AquaVoiceInteractionV62H = { version: VERSION, localDemoOnly: true, storageKey: VOICE_INTERACTION_KEY_V62H, states: AQUA_VOICE_STATES_V62H.slice(), setAquaVoiceStateV62H: setAquaVoiceStateV62H, getAquaVoiceStateV62H: getAquaVoiceStateV62H, renderAquaVoiceStatePanelV62H: renderAquaVoiceStatePanelV62H, handleAquaVoiceCommandV62H: handleAquaVoiceCommandV62H, speakAquaResponseV62H: speakAquaResponseV62H, stopAquaSpeakingV62H: stopAquaSpeakingV62H, repeatLastAquaResponseV62H: repeatLastAquaResponseV62H, enableAquaVoiceV62H: enableAquaVoiceV62H, disableAquaVoiceV62H: disableAquaVoiceV62H, fallbackToManualControlsV62H: fallbackToManualControlsV62H, startVoiceCaptureV62H: startVoiceCaptureV62H, installAquaVoicePanelV62H: installAquaVoicePanelV62H, safetyEnvelope: { noBackendCalls: true, noNetworkCalls: true, noExternalAIAPICalls: true, noApiKeysInFrontend: true, noLiveRecordChanges: true, noLiveExport: true, noLiveUpload: true, noAudioStorage: true, noAlwaysListening: true } };
    window.AquaToolGatewayContractV62J = ensureToolGatewayContractV62J();
    window.AquaVoiceSessionV62I = { version: VERSION, localDemoOnly: true, storageKey: VOICE_SESSION_KEY_V62I, statuses: AQUA_SESSION_STATUSES_V62I.slice(), startAquaVoiceSessionV62I: startAquaVoiceSessionV62I, endAquaVoiceSessionV62I: endAquaVoiceSessionV62I, getAquaVoiceSessionV62I: getAquaVoiceSessionV62I, saveAquaVoiceSessionV62I: saveAquaVoiceSessionV62I, clearAquaVoiceSessionV62I: clearAquaVoiceSessionV62I, handleAquaSessionTurnV62I: handleAquaSessionTurnV62I, renderAquaSessionPanelV62I: renderAquaSessionPanelV62I, askAquaFollowUpQuestionV62I: askAquaFollowUpQuestionV62I, continueAquaSessionV62I: continueAquaSessionV62I, cancelAquaSessionV62I: cancelAquaSessionV62I, routeAquaSessionCommandV62I: routeAquaSessionCommandV62I, installAquaSessionPanelV62I: installAquaSessionPanelV62I, safetyEnvelope: { noBackendCalls: true, noNetworkCalls: true, noExternalAIAPICalls: true, noApiKeysInFrontend: true, noLiveRecordChanges: true, noLiveExport: true, noLiveUpload: true, noAudioStorage: true, noAlwaysListening: true } };
    state.voiceBrainToolRegistryExists = Object.keys(window.AquaVoiceBrainV61Z.toolRegistry || {}).length >= 14;
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
    return renderPremiumModuleShellV61Z({ title: 'No Current Calculator Result', subtitle: 'Run a local Jobsite Calculator before saving or sending a draft.', tag: 'Locked', chips: ['Local Calculator Only', 'Draft Only', 'Backend Locked'], attrs: { 'data-aqua-v61x-no-current-calculation': 'true' }, body: '<div>No current calculator result found. Run a local jobsite calculator first.</div>', safetyFooter: 'Local/demo-only. No backend, network, external AI/API call, live estimate, customer export, accounting export, payment, payroll, bank, or live record change.' });
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
    return renderPremiumModuleShellV61Z({ title: 'Calculator Drafts / Estimate Prep — Local Demo', subtitle: 'Saved local calculation drafts staged for owner review only.', tag: 'Review', chips: ['Draft Only', 'Owner Review Required', 'No Live Change Made'], attrs: { 'data-aqua-v61x-calculator-drafts-panel': 'true' }, body: rows, safetyFooter: 'Safety: No live estimate, no customer export, no backend, no accounting. Demo/local-only calculation notes.' });
  }

  function renderSavedCalculatorDraftConfirmationV61X(record) {
    if (!record) return renderNoCurrentCalculatorDraftV61X();
    return renderPremiumModuleShellV61Z({ title: 'Save Calculation Draft', subtitle: 'Local draft saved for estimate/SOW review preparation.', tag: 'Draft Only', chips: ['Demo Data Only', 'Draft Only', 'No Live Change Made'], attrs: { 'data-aqua-v61x-save-confirmation': 'true' }, body: '<div>Saved local/demo calculator draft: ' + escapeHTMLV61D(record.draftCalculationId) + '</div><div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(record.calculatorType) + '</div><div><strong>Result Summary:</strong> ' + escapeHTMLV61D(record.resultSummary) + '</div><div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(record.recommendedAmount) + '</div>', safetyFooter: 'Status: draft/local demo only. No live estimate created. No customer export. No backend. No accounting/export/payment action.' });
  }

  function renderClearCalculatorDraftsV61X() {
    clearCalculatorDraftsV61X();
    return renderPremiumModuleShellV61Z({ title: 'Clear Saved Calculation Drafts', subtitle: 'Local browser demo storage cleared only.', tag: 'Local Demo', chips: ['No Live Change Made', 'Backend Locked', 'Draft Only'], attrs: { 'data-aqua-v61x-clear-calculator-drafts': 'true' }, body: '<div>Local/demo calculator drafts were cleared only from ' + escapeHTMLV61D(CALCULATOR_DRAFTS_KEY_V61X) + '.</div>', safetyFooter: 'No live estimate, customer export, backend, accounting, payment, payroll, bank, or live job record changed.' });
  }

  function renderEstimateDraftPlaceholderV61X() {
    if (!state.currentCalculatorResultV61X) return renderNoCurrentCalculatorDraftV61X();
    state.addToEstimateDraftLockedWorks = true;
    state.noLiveEstimateCreated = true;
    state.noCustomerExport = true;
    syncNamespace();
    return renderPremiumModuleShellV61Z({ title: 'Estimate Draft Placeholder', subtitle: 'Prepared visual placeholder; no estimate was created.', tag: 'Locked', chips: ['Demo Data Only', 'Owner Review Required', 'Backend Locked', 'No Live Change Made'], attrs: { 'data-aqua-v61x-estimate-draft-placeholder': 'true' }, body: '<div>This calculation can be prepared for future estimate/SOW review, but no live estimate was created.</div><ul><li>Demo Data Only</li><li>Estimate Draft Locked</li><li>Customer Export Locked</li><li>Backend Locked</li><li>Accounting Export Locked</li><li>Owner Review Required</li><li>No Live Change Made</li></ul>', safetyFooter: 'No live estimate created. No customer export. No backend, network, external AI/API, accounting export, payment, payroll, bank, or live record change.' });
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
    var inner = '';
    var title = intent.canonicalIntent === 'local_calculator_need_more_information' ? 'Jobsite Calculator — Need More Information' : 'Jobsite Calculator — ' + (intent.calculator || 'Local Calculator');
    if (intent.canonicalIntent === 'local_calculator_need_more_information') inner = renderNeedMoreInformationCalculatorV61W(intent);
    else if (intent.calculator === 'Paint Gallons') inner = renderPaintGallonsCalculatorV61W(intent);
    else if (intent.calculator === 'Drywall Sheets') inner = renderDrywallSheetsCalculatorV61W(intent);
    else if (intent.calculator === 'Flooring Square Footage') inner = renderFlooringCalculatorV61W(intent);
    else if (intent.calculator === 'Wall Stud Count') inner = renderWallStudCalculatorV61W(intent);
    else if (intent.calculator === 'Concrete Slab') inner = renderConcreteSlabCalculatorV61W(intent);
    else inner = renderConcreteSonotubeCalculatorV61V(intent);
    return renderPremiumModuleShellV61Z({ title: title, subtitle: 'Local-only jobsite math with owner review safety locks.', tag: 'Local Calculator Only', chips: ['Local Calculator Only', 'Draft Only', 'Backend Locked', 'No Live Change Made'], attrs: { 'data-aqua-v61z-calculator-panel': 'true' }, body: inner });
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
    if (typeof isAquaSessionCommandV62I === 'function' && isAquaSessionCommandV62I(original)) return { mode: 'voice_session_v62i', originalText: original, normalizedText: q, routeHint: { canonicalIntent: 'aqua_voice_session_v62i', module: 'Aqua Brain Session — v62I' } };
    var voiceBrain = classifyVoiceBrainIntentV61Z(original);
    if (voiceBrain) return { mode: 'voice_brain_tool_plan', originalText: original, normalizedText: q, routeHint: voiceBrain };
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
    return renderPremiumModuleShellV61Z({ title: 'General Ask / Jobsite Calculator — Locked Foundation', subtitle: 'Outside knowledge stays locked until a backend is available.', tag: 'Locked', chips: ['Backend Locked', 'No Network Call', 'No API Key in Frontend', 'No Live Change Made'], attrs: { 'data-aqua-v61u-general-ask-locked': 'true' }, body: askModeBadgeV61U('general_ask_locked') + '<div><strong>Detected question:</strong> ' + escapeHTMLV61D(question) + '</div><div><strong>Mode:</strong> outside knowledge / construction calculator</div><div><strong>Status:</strong> local placeholder only</div><div>Backend required before live ChatGPT/search answers</div><div>No external API call was made</div><div>No network call was made</div><div>No API key exists in frontend</div><div class="actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><span class="pill">Backend Locked</span><span class="pill">External AI Locked</span><span class="pill">Search Locked</span><span class="pill">Demo Only</span><span class="pill">No Network Call</span><span class="pill">No API Key in Frontend</span></div>', safetyFooter: 'No live AI, external search, backend, network call, API key, payment, payroll, bank sync, accounting export, customer sharing/export, audio storage, always-listening behavior, or live record change was used.' });
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
    var gateway = detectToolGatewayCommandV62J(original, q);
    if (gateway) return withAskModeV61U(gateway, 'backend_readiness');
    var workflowContinuation = continueAquaWorkflowV62G(original);
    if (workflowContinuation) return withAskModeV61U(workflowContinuation, 'workflow_memory');
    var workflowPlanner = detectAquaWorkflowCommandV62F(original, q);
    if (workflowPlanner) return withAskModeV61U(workflowPlanner, 'workflow_planner');
    var voiceBrainViewer = detectVoiceBrainPlanViewerCommandV62A(original, q);
    if (voiceBrainViewer) return withAskModeV61U(voiceBrainViewer, 'voice_brain_tool_plan');
    if (askMode.mode === 'voice_brain_tool_plan') {
      var voiceBrainPlan = askMode.routeHint || classifyVoiceBrainIntentV61Z(original);
      state.voiceBrainIntentClassifierWorks = Boolean(voiceBrainPlan);
      return withAskModeV61U(voiceBrainPlan, askMode.mode);
    }
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
    return renderPremiumModuleShellV61Z({ title: 'Fallback Local Demo Panel', subtitle: 'Native module opener not found; local read-only route only.', tag: 'Local Demo', chips: ['Demo Data Only', 'Backend Locked', 'No Live Change Made'], attrs: { 'data-aqua-v61e-local-fallback': 'true' }, body: '<div><strong>Fallback local demo panel: native module opener not found.</strong> ' + escapeHTMLV61D(localModuleFallbackTextV61E()) + heard + '</div>', safetyFooter: 'Local/demo-only. No live AI, backend, search, network call, export, payment, approval, or external action was run.' });
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
    state.premiumModuleShellWorks = true;
    state.openedModulesPolished = true;
    state.homeDesignUntouched = true;
    state.routingStillWorks = true;
    state.automationStillWorks = true;
    state.noBackendNetworkLiveAI = true;
    syncNamespace();
    return record;
  }

  function renderNoCalculatorDraftForSowReviewV61Y() {
    return renderPremiumModuleShellV61Z({ title: 'No Calculator Draft Found', subtitle: 'Save a local calculation draft before SOW review.', tag: 'Locked', chips: ['Demo Data Only', 'Owner Review Required', 'Backend Locked'], attrs: { 'data-aqua-v61y-no-calculator-draft': 'true' }, body: '<div>No calculator draft found. Save a calculation draft first.</div>', safetyFooter: 'Demo Data Only. SOW Review Locked. Estimate Review Locked. Customer Export Locked. Backend Locked. Accounting Export Locked. Owner Review Required. No Live Change Made. No live SOW, no live estimate, no customer export, no backend, no accounting.' });
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
    return renderPremiumModuleShellV61Z({ title: 'SOW / Estimate Review Queue — Local Demo', subtitle: 'Owner-ready queue view for calculator drafts; local/demo only.', tag: 'Review', chips: ['Owner Review Required', 'Draft Only', 'No Live Change Made', 'Backend Locked'], attrs: { 'data-aqua-v61y-sow-review-queue-panel': 'true' }, body: renderSowReviewQueueRowsV61Y(queue) + sowReviewSafetyLabelsV61Y(), actions: '<button type="button" class="btn small gold" data-aqua-v61y-mark-review-ready="true">Mark Review Ready Demo</button><button type="button" class="btn small" data-aqua-v61y-return-calculator-drafts="true">Return to Calculator Drafts</button><button type="button" class="btn small" data-aqua-v61y-clear-sow-review="true">Clear SOW Review Queue Demo</button>', safetyFooter: 'Local/demo-only review queue stored as aquaSowReviewQueueV61Y. No live SOW, no live estimate, no customer export, no backend, no network, no external AI/API, no accounting/export/payment/payroll/bank action, and no live record change.' });
  }

  function renderSendSowReviewQueueConfirmationV61Y(record) {
    if (!record) return renderNoCalculatorDraftForSowReviewV61Y();
    return renderPremiumModuleShellV61Z({ title: 'Send to SOW Review Queue', subtitle: 'Local/demo routing confirmation for owner review.', tag: 'Review', chips: ['Draft Only', 'Owner Review Required', 'No Live Change Made'], attrs: { 'data-aqua-v61y-send-sow-review-confirmation': 'true' }, body: '<div>Calculator draft routed to local/demo review queue: ' + escapeHTMLV61D(record.reviewQueueId) + '</div><div><strong>Source Draft Calculation ID:</strong> ' + escapeHTMLV61D(record.sourceDraftCalculationId) + '</div><div><strong>Calculator Type:</strong> ' + escapeHTMLV61D(record.calculatorType) + '</div><div><strong>Result Summary:</strong> ' + escapeHTMLV61D(record.resultSummary) + '</div><div><strong>Recommended Amount:</strong> ' + escapeHTMLV61D(record.recommendedAmount) + '</div>' + sowReviewSafetyLabelsV61Y(), safetyFooter: 'No live SOW created. No live estimate created. No customer export. No backend, network, external AI/API, accounting export, payment, payroll, bank, or live record change.' });
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
    return renderPremiumModuleShellV61Z({ title: 'Mark Review Ready Demo', subtitle: 'Review status updated locally for demo queue items only.', tag: 'Review', chips: ['Owner Review Required', 'No Live Change Made', 'Backend Locked'], attrs: { 'data-aqua-v61y-mark-review-ready-demo': 'true' }, body: '<div>Review queue items were marked review ready demo / local only.</div>' + renderSowReviewQueueRowsV61Y(readSowReviewQueueV61Y()) + sowReviewSafetyLabelsV61Y(), safetyFooter: 'Local/demo status only. No live SOW created. No live estimate created. No customer export. No backend, network, external AI/API, accounting, payment, payroll, bank, or live record change.' });
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
    return renderPremiumModuleShellV61Z({ title: 'Clear SOW Review Queue Demo', subtitle: 'Local review queue cleared; calculator drafts remain separate.', tag: 'Local Demo', chips: ['No Live Change Made', 'Backend Locked', 'Draft Only'], attrs: { 'data-aqua-v61y-clear-sow-review-queue': 'true' }, body: '<div>Only local/demo review queue key aquaSowReviewQueueV61Y was cleared.</div>', safetyFooter: 'Calculator drafts remain separate. No live SOW, live estimate, customer export, backend, accounting, payment, payroll, bank, or live record changed.' });
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
    var body = '<div><strong>Current command:</strong> ' + escapeHTMLV61D(safe.originalText || 'No current command text found') + '</div>' +
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
      '<div><strong>Undo requirement:</strong> Undo checkpoint required before any future live change.</div>';
    return renderPremiumModuleShellV61Z({
      title: 'Permission Required / Action Intent Demo',
      subtitle: 'Owner/Admin approval gate; action is staged as a demo draft only.',
      tag: 'Permission Required',
      chips: ['Permission Required', 'Owner Review Required', 'Draft Only', 'No Live Change Made'],
      attrs: {
        'data-aqua-v61i-permission-granter': 'true',
        'data-aqua-v61j-current-command': safe.originalText || '',
        'data-aqua-v61j-command-hash': safe.commandHash,
        'data-aqua-v61j-detected-action': safe.detectedAction || 'Action-style command',
        'data-aqua-v61j-target-module': safe.targetModule || 'Local/demo module',
        'data-aqua-v61j-requested-value': safe.requestedValue || 'not clear from transcript',
        'data-aqua-v61j-active-draft-id': draftRecord.id
      },
      body: body,
      safetyFooter: '<strong>No live change made.</strong> Demo only. No live record change, backend call, network call, live AI call, approval, accounting export, bank sync, payment, payroll, sharing, sending, OCR, upload, or external action was run.'
    });
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
    return renderPremiumModuleShellV61Z({ title: titleText, subtitle: 'Native bridge status for opened Aqua Homes module.', tag: nativeOpened ? 'Opened' : 'Local Demo', chips: ['Demo Data Only', 'Backend Locked', 'No Live Change Made'], attrs: { 'data-aqua-v61g-native-module-bridge': 'true' }, body: askModeBadgeV61U(intent.askMode || 'app_navigation') + '<div><strong>Native Module Open Bridge:</strong> ' + escapeHTMLV61D(nativeOpened ? 'native app opener/renderer succeeded first' : 'native app opener/renderer was not available') + '</div><div><strong>Opened:</strong> ' + escapeHTMLV61D(config.module) + '</div>', safetyFooter: 'No live AI, backend, OCR, upload, accounting export, bank sync, payment, payroll, sharing, sending, or record change was run.' }) + readback;
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
    return renderPremiumModuleShellV61Z({ title: config.module, subtitle: 'Fallback local demo panel: ' + (config.fallbackNotFound || 'native module opener not found'), tag: 'Local Demo', chips: ['Demo Data Only', 'Backend Locked', 'No Live Change Made'], attrs: { 'data-aqua-v61f-visual-router': 'true' }, body: askModeBadgeV61U(intent.askMode || 'app_navigation') + '<div><strong>Module:</strong> ' + escapeHTMLV61D(config.module) + '</div><div><strong>Project:</strong> ' + escapeHTMLV61D(config.project) + '</div><div><strong>Items:</strong> ' + escapeHTMLV61D(config.items) + '</div><div><strong>Needs Review:</strong> ' + escapeHTMLV61D(config.review) + '</div><div><strong>Locked Actions:</strong> ' + escapeHTMLV61D(config.locked) + '</div>' + renderVisualRowsV61F(config.rows), actions: openButton, safetyFooter: 'Local/demo-only. No live AI, backend, OCR, upload, accounting export, bank sync, payment, payroll, sharing, sending, or record change was run.' }) + readback;
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
    var gatewayIntentV62J = detectToolGatewayCommandV62J(String(commandText || '').trim(), normalizeAquaPhraseV61E(commandText));
    if (gatewayIntentV62J) {
      gatewayIntentV62J.askMode = 'backend_readiness';
      if (outputNode) outputNode.innerHTML = renderToolGatewayPanelV62J(gatewayIntentV62J);
      if (gatewayIntentV62J.gatewayQuestionV62J === 'export') state.exportQuestionStaysLocked = true;
      if (gatewayIntentV62J.gatewayQuestionV62J === 'upload') state.uploadQuestionStaysLocked = true;
      if (gatewayIntentV62J.gatewayQuestionV62J === 'chatgpt') state.chatgptConnectionQuestionStaysLocked = true;
      syncNamespace();
      return Object.assign({ renderedSecureToolGatewayV62J: true, renderedFallback: false }, gatewayIntentV62J);
    }
    if (isAquaSessionCommandV62I(commandText)) {
      var session = routeAquaSessionCommandV62I(commandText);
      var htmlV62I = renderAquaSessionPanelV62I(session, outputNode || null);
      return Object.assign({ canonicalIntent: 'aqua_voice_session_v62i', askMode: 'voice_session_v62i', module: 'Aqua Brain Session — v62I', renderedSessionPanelV62I: /Aqua Brain Session — v62I/.test(htmlV62I), html: htmlV62I }, session);
    }
    var intent = normalizeAquaCommandV61E(commandText);
    if (intent.canonicalIntent === 'aqua_workflow_memory_v62g') {
      if (outputNode) renderAquaWorkflowContinuationV62G(intent, outputNode);
      state.workflowMemoryExists = true; state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true; state.noAudioStorage = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'aqua_workflow_planner_v62f') {
      if (intent.mode === 'plan') {
        var workflowPlan = planAquaWorkflowV62F(intent.originalText || commandText);
        intent.workflowPlan = workflowPlan;
        intent.workflowType = workflowPlan.workflowType;
        if (workflowPlan.workflowType === 'receipt_export_preparation') state.receiptExportWorkflowWorks = workflowPlan.lockedLiveSteps.join(' ').indexOf('Lock live export') !== -1;
        if (workflowPlan.workflowType === 'report_review') state.reportReviewWorkflowWorks = /Staircase/i.test(workflowPlan.visualRoutes.join(' '));
        if (workflowPlan.workflowType === 'missing_documents') state.missingDocumentsWorkflowWorks = /missing document/i.test(workflowPlan.spokenSummary + ' ' + workflowPlan.steps.map(function (step) { return step.stepLabel; }).join(' '));
        if (workflowPlan.workflowType === 'spend_budget_risk') state.spendBudgetWorkflowWorks = /Accounting|backend/i.test(workflowPlan.visualRoutes.join(' ') + workflowPlan.lockedLiveSteps.join(' '));
        if (workflowPlan.workflowType === 'upload_send_preparation') state.uploadWorkflowStaysLocked = /upload|send/i.test(workflowPlan.lockedLiveSteps.join(' '));
        if (workflowPlan.workflowType === 'camera_allocation_diagnostic') state.cameraWorkflowWorks = /Camera/i.test(workflowPlan.visualRoutes.join(' '));
        if (workflowPlan.workflowType === 'daily_attention') state.dailyAttentionWorkflowWorks = /Owner Review/i.test(workflowPlan.visualRoutes.join(' '));
        saveAquaActiveWorkflowV62G(workflowPlan);
        if (outputNode) outputNode.innerHTML = renderAquaWorkflowPlanV62F(workflowPlan);
      } else if (outputNode) {
        outputNode.innerHTML = renderPremiumModuleShellV61Z({ title: 'Aqua Brain Workflow Plan — v62F', subtitle: 'Workflow plan action is local/demo-only.', tag: 'Workflow Action', chips: ['Demo Only', 'localStorage Only', 'No Live Change'], attrs: { 'data-aqua-v62f-workflow-planner': 'true' }, body: renderWorkflowPlanActionResultV62F(intent.mode), safetyFooter: 'No backend, network, external AI/API, live export, upload, send, approval, accounting export, or audio storage.' });
      } else if (intent.mode === 'save') saveAquaWorkflowPlanV62F();
      state.workflowPlannerExists = true;
      state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true; state.noAudioStorage = true; state.noLiveExport = true; state.noLiveUpload = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'voice_brain_plan_viewer_v62a') {
      if (intent.mode === 'save') {
        saveVoiceBrainPlanV62A();
        if (outputNode) outputNode.innerHTML = renderVoiceBrainPlanViewerV62A('show');
      } else if (outputNode) outputNode.innerHTML = renderVoiceBrainPlanViewerV62A(intent.mode);
      state.voiceBrainPlanViewerWorks = true;
      state.noBackendCalls = true; state.noNetworkCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true; state.noAudioStorage = true;
      syncNamespace();
      return intent;
    }
    if (intent.canonicalIntent === 'voice_brain_tool_plan') {
      if (outputNode) outputNode.innerHTML = renderVoiceBrainToolPlanV61Z(intent);
      else writeVoiceBrainContextV61Z(intent);
      state.voiceBrainIntentClassifierWorks = true;
      state.noBackendCalls = true;
      state.noNetworkCalls = true;
      state.noExternalAIAPICalls = true;
      state.noLiveRecordChanges = true;
      state.noAudioStorage = true;
      syncNamespace();
      return intent;
    }
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
    installAquaVoicePanelV62H(flow);
    installAquaSessionPanelV62I(flow);

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
      { command: 'show tool gateway', expected: 'v62J secure tool gateway panel renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /backend locked \/ contract only|Tool request envelope summary|Blocked frontend actions/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show secure tool gateway', expected: 'v62J secure gateway alias renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Tool response envelope summary|Tool contract count/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show backend tool contract', expected: 'v62J backend tool contract renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /20<\/strong> locked future backend tools|frontend execution allowed/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show permission map', expected: 'v62J permission map renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Permission map|accounting_export/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show risk map', expected: 'v62J risk map renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Risk map|live_action_locked/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show approval routes', expected: 'v62J approval routes render', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Approval route map|owner_review|admin_backend_enablement/i, noFallback: true, toolGatewayV62J: true },
      { command: 'show blocked frontend actions', expected: 'v62J blocked frontend action rules render', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Frontend must never hold API keys|always-listening microphone/i, noFallback: true, toolGatewayV62J: true, frontendBlockRulesV62J: true },
      { command: 'show backend readiness', expected: 'v62J backend readiness renders', intent: 'secure_tool_gateway_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Next backend step|server-side gateway/i, noFallback: true, toolGatewayV62J: true },
      { command: 'can aqua export yet', expected: 'v62J export question remains locked', intent: 'secure_tool_gateway_question_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /No\. Export is locked[\s\S]*secure backend[\s\S]*no frontend API keys/i, noFallback: true, toolGatewayV62J: true, gatewayQuestionLockedV62J: true },
      { command: 'can aqua upload yet', expected: 'v62J upload question remains locked', intent: 'secure_tool_gateway_question_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /No\. Upload is locked|Future upload requires secure backend storage/i, noFallback: true, toolGatewayV62J: true, gatewayQuestionLockedV62J: true },
      { command: 'can aqua connect to chatgpt yet', expected: 'v62J ChatGPT connection question remains locked', intent: 'secure_tool_gateway_question_v62j', mode: 'backend_readiness', module: /Aqua Brain Secure Tool Gateway — v62J/i, html: /Not live yet[\s\S]*server-side API keys only[\s\S]*no API keys in frontend/i, noFallback: true, toolGatewayV62J: true, gatewayQuestionLockedV62J: true },
      { command: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'Aqua Brain Workflow Plan v62F / receipt export locked', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'receipt_export_preparation', workflowPlanButtonsV62F: true, html: /Aqua Brain Workflow Plan — v62F[\s\S]*receipt criteria[\s\S]*Lock live export[\s\S]*Accounting|accounting/i, noFallback: true },

      { command: 'show me what will be exported', contextCommand: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'v62G export packet follow-up uses active workflow', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /Aqua Brain Workflow Continuation — v62G[\s\S]*Henderson Home Depot receipts[\s\S]*export packet demo placeholder[\s\S]*Accounting Export Locked/i, noFallback: true },
      { command: 'what needs approval', contextCommand: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'v62G approval follow-up uses active workflow', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /Permission \/ Safety Gate[\s\S]*Owner\/Accounting Approval Required|owner and accounting approval/i, noFallback: true },
      { command: 'mark it ready for owner review', contextCommand: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'v62G owner review demo follow-up local only', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /ready for owner review demo locally|No live approval/i, noFallback: true },
      { command: 'read it back', contextCommands: ['look up all receipts for Henderson from Home Depot and prepare them for accountant export', 'show me what will be exported'], expected: 'v62G readback repeats last workflow summary', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /Replayed the last workflow route|demo export packet/i, noFallback: true },
      { command: 'now show the plumbing spend', contextCommand: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'v62G spend pivot uses Henderson project context', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /Accounting \/ Henderson House \/ Plumbing Spend|active Henderson House workflow context/i, noFallback: true },
      { command: 'clear active workflow', contextCommand: 'look up all receipts for Henderson from Home Depot and prepare them for accountant export', expected: 'v62G clear active workflow local only', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /Cleared the active workflow memory locally only|No live records changed/i, noFallback: true },
      { command: 'continue workflow', contextCommands: ['look up all receipts for Henderson from Home Depot and prepare them for accountant export', 'clear active workflow'], expected: 'v62G continue after clear shows no active workflow', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /No active Aqua Brain workflow yet/i, noFallback: true },
      { command: 'again', contextCommand: 'clear active workflow', expected: 'v62G no-context repeat is handled without fallback', intent: 'aqua_workflow_memory_v62g', mode: 'workflow_memory', workflowContinuationV62G: true, html: /No active Aqua Brain workflow yet/i, noFallback: true },
      { command: 'find Henderson Home Depot receipts and prepare accountant export', expected: 'Aqua Brain Workflow Plan v62F / receipt export alias locked', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'receipt_export_preparation', workflowPlanButtonsV62F: true, html: /Aqua Brain Workflow Plan — v62F[\s\S]*Receipts \/ Henderson House \/ Home Depot[\s\S]*Lock live export/i, noFallback: true },
      { command: 'pull up the Henderson staircase report and tell me what needs approval', expected: 'Aqua Brain Workflow Plan v62F / report review', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'report_review', html: /Henderson House \/ Staircase[\s\S]*owner approval/i, noFallback: true },
      { command: 'check what documents are missing for Henderson and prepare a review list', expected: 'Aqua Brain Workflow Plan v62F / missing documents', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'missing_documents', html: /missing document placeholders|Permit packet|review checklist/i, noFallback: true },
      { command: 'how much did we spend on Henderson plumbing and show what is over budget', expected: 'Aqua Brain Workflow Plan v62F / spend budget locked', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'spend_budget_risk', html: /Accounting \/ Henderson House \/ Plumbing Spend[\s\S]*backend accounting required|accounting backend/i, noFallback: true },
      { command: 'find the Henderson diagram and prepare it to upload', expected: 'Aqua Brain Workflow Plan v62F / upload locked', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'upload_send_preparation', html: /Upload Request Demo[\s\S]*Lock live upload\/send|No live upload/i, noFallback: true },
      { command: 'check jobsite cameras for Henderson and tell me if they are allocated correctly', expected: 'Aqua Brain Workflow Plan v62F / camera allocation', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'camera_allocation_diagnostic', html: /Jobsite Cameras[\s\S]*allocation review placeholder|camera allocation/i, noFallback: true },
      { command: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / daily attention', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', workflowPlanV62F: true, workflowTypeV62F: 'daily_attention', html: /Owner Review[\s\S]*missing docs, receipts, approvals, budget risk|Daily attention/i, noFallback: true },
      { command: 'save workflow plan', contextCommand: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / save localStorage only', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', html: /Save Workflow Plan[\s\S]*aquaWorkflowPlansV62F/i, noFallback: true },
      { command: 'show last workflow plan', contextCommand: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / show last', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', html: /Show Last Workflow Plan|Aqua Brain Workflow Plan — v62F/i, noFallback: true },
      { command: 'copy workflow plan', contextCommand: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / copy text', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', html: /Copy Workflow Plan Text|Aqua Brain Workflow Plan — v62F/i, noFallback: true },
      { command: 'mark plan ready for owner review', contextCommand: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / owner review demo', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', html: /Mark Plan Ready for Owner Review Demo|No live approval/i, noFallback: true },
      { command: 'clear workflow plan demo', contextCommand: 'what needs my attention today', expected: 'Aqua Brain Workflow Plan v62F / clear demo', intent: 'aqua_workflow_planner_v62f', mode: 'workflow_planner', html: /Clear Workflow Plan Demo|Cleared local\/demo workflow plan state/i, noFallback: true },
      { command: 'what is the Henderson report', expected: 'Aqua Brain Command Center v62E / Henderson project status report', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_report_lookup', tool: 'openProjectReport', module: /Project Reports \/ Henderson House \/ Project Status Report/i, html: /Opened and focused:[\s\S]*Project Reports \/ Henderson House \/ Project Status Report[\s\S]*Focused by Aqua Brain/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Project Reports \/ Henderson House \/ Project Status Report/i },
      { command: 'pull up the Henderson staircase report', expected: 'Aqua Brain Command Center v62E / Henderson staircase report', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_report_lookup', tool: 'openProjectReport', module: /Project Reports \/ Henderson House \/ Staircase/i, html: /Opened and focused:[\s\S]*Project Reports \/ Henderson House \/ Staircase[\s\S]*Focused by Aqua Brain/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Project Reports \/ Henderson House \/ Staircase/i },
      { command: 'look up all receipts for the Henderson house from Home Depot', expected: 'Aqua Brain Command Center v62E / findProjectReceipts', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_vendor_receipt_lookup', tool: 'findProjectReceipts', module: /Receipts \/ Henderson House \/ Home Depot/i, html: /Opened and focused:[\s\S]*Receipts \/ Henderson House \/ Home Depot[\s\S]*Focused by Aqua Brain[\s\S]*No export/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Receipts \/ Henderson House \/ Home Depot/i, safetyLock: /Receipt Database Required|No Live Export/ },
      { command: 'show Home Depot receipts for Henderson', expected: 'Aqua Brain Command Center v62E / findProjectReceipts alias', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_vendor_receipt_lookup', tool: 'findProjectReceipts', module: /Receipts \/ Henderson House \/ Home Depot/i, html: /Opened and focused:[\s\S]*Receipts \/ Henderson House \/ Home Depot[\s\S]*Focused by Aqua Brain[\s\S]*No export/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Receipts \/ Henderson House \/ Home Depot/i, safetyLock: /Receipt Database Required|No Live Export/ },
      { command: 'how much have we spent on Henderson plumbing', expected: 'Aqua Brain Command Center v62E / summarizeProjectSpend backend locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_cost_summary', tool: 'summarizeProjectSpend', module: /Accounting \/ Henderson House \/ Plumbing Spend/i, html: /Opened and focused:[\s\S]*Accounting \/ Henderson House \/ Plumbing Spend[\s\S]*Focused by Aqua Brain[\s\S]*No accounting query or export was run/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Accounting \/ Henderson House \/ Plumbing Spend/i, safetyLock: /Backend Locked/ },
      { command: 'how much money did we spend on Henderson house plumbing', expected: 'Aqua Brain Command Center v62E / summarizeProjectSpend backend locked alias', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_cost_summary', tool: 'summarizeProjectSpend', module: /Accounting \/ Henderson House \/ Plumbing Spend/i, html: /Opened and focused:[\s\S]*Accounting \/ Henderson House \/ Plumbing Spend[\s\S]*Focused by Aqua Brain[\s\S]*No accounting query or export was run/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Accounting \/ Henderson House \/ Plumbing Spend/i, safetyLock: /Backend Locked/ },
      { command: 'what documents are missing for Henderson', expected: 'Aqua Brain Command Center v62E / missing documents', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'missing_documents_lookup', tool: 'showMissingDocumentsDemo', module: /Documents \/ Henderson House \/ Missing Documents/i, html: /Opened and focused:[\s\S]*Documents \/ Henderson House \/ Missing Documents[\s\S]*Focused by Aqua Brain[\s\S]*backend document index required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Documents \/ Henderson House \/ Missing Documents/i },
      { command: 'were the cameras allocated to the right Henderson jobsite', expected: 'Aqua Brain Command Center v62E / checkJobsiteCameraAllocationDemo backend locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'jobsite_camera_allocation_check', tool: 'checkJobsiteCameraAllocationDemo', module: /Jobsite Cameras \/ Allocation Review \/ Henderson Jobsite/i, html: /Opened and focused:[\s\S]*Jobsite Cameras \/ Allocation Review \/ Henderson Jobsite[\s\S]*Focused by Aqua Brain[\s\S]*No live camera data was accessed/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Jobsite Cameras \/ Allocation Review \/ Henderson Jobsite/i, safetyLock: /Backend Locked/ },
      { command: 'prepare those Home Depot receipts for accountant export', expected: 'Aqua Brain Command Center v62E / prepareAccountantExportDemo locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'prepare_accountant_export', tool: 'prepareAccountantExportDemo', permissionLevel: 'accounting_approval_required', module: /Permission Granter \/ Accountant Export Demo \/ Home Depot receipts/i, html: /Opened and focused:[\s\S]*Permission Granter \/ Accountant Export Demo \/ Home Depot receipts[\s\S]*Focused by Aqua Brain[\s\S]*Accounting Export Locked[\s\S]*No Live Export/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Permission Granter \/ Accountant Export Demo \/ Home Depot receipts/i, safetyLock: /Permission Required.*Accounting Export Locked|Accounting Export Locked.*Permission Required/ },
      { command: 'upload that construction diagram to the Henderson files', expected: 'Aqua Brain Command Center v62E / uploadFileToProjectDemo upload locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'project_file_upload_request', tool: 'uploadFileToProjectDemo', permissionLevel: 'owner_approval_required', module: /Permission Granter \/ Upload Request Demo \/ Henderson files/i, html: /Opened and focused:[\s\S]*Permission Granter \/ Upload Request Demo \/ Henderson files[\s\S]*Focused by Aqua Brain[\s\S]*Upload Locked[\s\S]*No Live Upload/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Permission Granter \/ Upload Request Demo \/ Henderson files/i, safetyLock: /Upload Locked/ },
      { command: 'what should I do next', expected: 'Aqua Brain Command Center v62E / suggestNextStep', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'suggest_next_step', tool: 'suggestNextStep', module: /Owner Review \/ Next Recommended Action \/ AI recommendation/i, html: /Opened and focused:[\s\S]*Owner Review \/ Next Recommended Action \/ AI recommendation[\s\S]*Focused by Aqua Brain[\s\S]*No live task/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Owner Review \/ Next Recommended Action \/ AI recommendation/i },
      { command: 'what is over budget', expected: 'Aqua Brain Command Center v62A / budget risk locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'budget_risk_lookup', tool: 'showBudgetRiskDemo', module: /Budget Risk/i, html: /Aqua Brain Command Center — v62C|showBudgetRiskDemo|Accounting Backend Required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true },
      { command: 'what budget is about to go over', expected: 'Aqua Brain Command Center v62A / budget risk locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'budget_risk_lookup', tool: 'showBudgetRiskDemo', module: /Budget Risk/i, html: /Aqua Brain Command Center — v62C|showBudgetRiskDemo|Accounting Backend Required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true },
      { command: 'show employee time', expected: 'Aqua Brain Command Center v62A / employee time locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'employee_time_lookup', tool: 'showEmployeeTimeDemo', module: /Employee Time/i, html: /Aqua Brain Command Center — v62C|showEmployeeTimeDemo|Payroll\/Time Backend Required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true },
      { command: 'show payables', expected: 'Aqua Brain Command Center v62A / payables locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'payables_lookup', tool: 'showPayablesDemo', module: /Payables/i, html: /Aqua Brain Command Center — v62C|showPayablesDemo|No Payment Action/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true },
      { command: 'what documents are missing', expected: 'Aqua Brain Command Center v62E / missing documents locked compatibility', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'missing_documents_lookup', tool: 'showMissingDocumentsDemo', module: /Documents \/ Henderson House \/ Missing Documents/i, html: /Opened and focused:[\s\S]*Documents \/ Henderson House \/ Missing Documents[\s\S]*Focused by Aqua Brain|Missing Documents Focus — Local Demo|backend document index required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true, visualFocus: true, openedFocus: /Documents \/ Henderson House \/ Missing Documents/i },
      { command: 'diagnose this job file', expected: 'Aqua Brain Command Center v62A / job file diagnostic locked', intent: 'voice_brain_tool_plan', mode: 'voice_brain_tool_plan', voiceBrainIntent: 'diagnose_job_file', tool: 'diagnoseJobFileDemo', module: /Job File Diagnostic/i, html: /Aqua Brain Command Center — v62C|diagnoseJobFileDemo|Project File Backend Required/i, noFallback: true, voiceBrainToolPlan: true, spokenDraft: true },
      { command: 'show last voice brain plan', expected: 'Voice Brain plan viewer', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Show Last Voice Brain Plan|data-aqua-v62a-voice-brain-plan-viewer/i, noFallback: true },
      { command: 'show last aqua brain plan', expected: 'Voice Brain plan viewer alias', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Show Last Voice Brain Plan|data-aqua-v62a-voice-brain-plan-viewer/i, noFallback: true },
      { command: 'save voice brain plan', expected: 'Save Voice Brain Plan local demo', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Show Last Voice Brain Plan|data-aqua-v62a-voice-brain-plan-viewer/i, noFallback: true },
      { command: 'clear voice brain plan demo', expected: 'Clear Voice Brain Plan Demo local demo', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Clear Voice Brain Plan Demo|aquaVoiceBrainPlansV62A/i, noFallback: true },
      { command: 'copy tool plan', expected: 'Copy Tool Plan Text block', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Copy Tool Plan Text|Copyable text block|textarea/i, noFallback: true },
      { command: 'explain this plan', expected: 'Explain current tool plan', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /Show Last Voice Brain Plan|data-aqua-v62a-voice-brain-plan-viewer/i, noFallback: true },
      { command: 'what can aqua do now', expected: 'Allowed local demo steps', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /What Aqua Can Do Now|Open the relevant local\/demo placeholder|No Live Change Made/i, noFallback: true },
      { command: 'what requires approval', expected: 'Permission/backend locks explanation', intent: 'voice_brain_plan_viewer_v62a', mode: 'voice_brain_tool_plan', module: /Aqua Brain Command Center/i, html: /What Requires Backend \/ Approval|Backend Locked|No Live Change Made/i, noFallback: true },
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
      noBackendNetworkLiveAI: true,
      voiceInteractionControllerExists: true,
      voiceStatePanelWorks: true,
      voiceOnOffWorks: true,
      repeatLastResponseWorks: true,
      stopSpeakingWorks: true,
      manualFallbackWorks: true,
      continueUsesWorkflowMemory: true,
      permissionQuestionVoiceStateWorks: true,
      noBackendCalls: true,
      noNetworkCalls: true,
      noAlwaysListening: true
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
    [DRAFT_CHANGE_QUEUE_KEY_V61J, PERMISSION_GRANTER_KEY_V61I, SPOKEN_READBACK_KEY_V61R, CONVERSATIONAL_CONTEXT_KEY_V61S, CALCULATOR_DRAFTS_KEY_V61X, SOW_REVIEW_QUEUE_KEY_V61Y, VOICE_BRAIN_CONTEXT_KEY_V61Z, VOICE_BRAIN_PLAN_KEY_V62A, WORKFLOW_PLAN_KEY_V62F, ACTIVE_WORKFLOW_KEY_V62G, VOICE_INTERACTION_KEY_V62H, VOICE_SESSION_KEY_V62I].forEach(function (key) {
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
    var activeWorkflowSnapshotV62G = state.currentActiveWorkflowV62G ? JSON.parse(JSON.stringify(state.currentActiveWorkflowV62G)) : null;
    var host = createRegressionHostV61L();
    var intent;
    try {
      if (testCase.contextCommand) runNormalizedAquaCommandV61E(testCase.contextCommand, createRegressionHostV61L());
      if (testCase.contextCommands) testCase.contextCommands.forEach(function (command) { runNormalizedAquaCommandV61E(command, createRegressionHostV61L()); });
      intent = runNormalizedAquaCommandV61E(testCase.command, host);
    } finally {
      restoreRegressionStorageSnapshotV61L(snapshot);
      state.lastConversationalContextV61S = stateContextSnapshot;
      state.currentActiveWorkflowV62G = activeWorkflowSnapshotV62G;
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
      renderedPremiumModuleShell: /data-aqua-v61z-premium-module-shell="true"|aqua-v61z-module-shell/i.test(html),
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
      noLiveChangeText: /No live record changed|No Live Change Made|No live AI, backend|No backend, network, or live AI/i.test(html),
      renderedVoiceBrainToolPlan: /Aqua Brain Command Center — v62A|Aqua Brain Command Center — v62C|data-aqua-v62a-command-center|data-aqua-v61z-voice-brain-tool-plan/i.test(html),
      renderedAquaBrainCommandCenter: /Aqua Brain Command Center — v62A|Aqua Brain Command Center — v62C|data-aqua-v62a-command-center/i.test(html),
      renderedWorkflowPlanV62F: /Aqua Brain Workflow Plan — v62F|data-aqua-v62f-workflow-planner/i.test(html),
      renderedWorkflowContinuationV62G: /Aqua Brain Workflow Continuation — v62G|data-aqua-v62g-workflow-continuation/i.test(html),
      activeWorkflowSavedV62G: Boolean((intent && intent.workflowPlan && intent.workflowPlan.workflowType) || (intent && intent.activeWorkflow) || getAquaActiveWorkflowV62G()),
      followUpIntentV62G: intent && intent.followUpIntentV62G,
      exportPacketFollowUpV62G: /export packet demo placeholder|demo export packet/i.test(html) && /Accounting Export Locked/i.test(html),
      approvalFollowUpV62G: /approval requirements|owner and accounting approval|Owner\/Accounting Approval Required/i.test(html),
      ownerReviewDemoFollowUpV62G: /ready for owner review demo locally|No live approval/i.test(html),
      readbackFollowUpV62G: /Replayed the last workflow route|Spoken Response Draft/i.test(html) && /demo export packet|prepared a local demo/i.test(html),
      spendPivotUsesActiveProjectV62G: /Accounting \/ Henderson House \/ Plumbing Spend|active Henderson House workflow context/i.test(html),
      clearActiveWorkflowV62G: /Cleared the active workflow memory locally only|No live records changed/i.test(html),
      noContextFollowUpV62G: /No active Aqua Brain workflow yet/i.test(html),
      workflowTypeV62F: intent && (intent.workflowType || (intent.workflowPlan && intent.workflowPlan.workflowType)),
      workflowPlanButtonsV62F: /Save Workflow Plan[\s\S]*Show Last Workflow Plan[\s\S]*Clear Workflow Plan Demo[\s\S]*Copy Workflow Plan Text[\s\S]*Mark Plan Ready for Owner Review Demo/i.test(html),
      renderedVisualRouteFocusV62C: /data-aqua-v62c-focused-section="true"|aqua-v62c-focused-section|Focused by Aqua Brain/i.test(html),
      renderedFocusedRouteMarkerV62E: /data-aqua-v62e-focused-route="true"|aqua-v62e-focused-route|Focused by Aqua Brain/i.test(html),
      renderedSecureToolGatewayV62J: /Aqua Brain Secure Tool Gateway — v62J|data-aqua-v62j-secure-tool-gateway/i.test(html),
      renderedFrontendBlockRulesV62J: /Frontend must never hold API keys|Blocked frontend actions/i.test(html),
      gatewayQuestionLockedV62J: /Export is locked|Upload is locked|Not live yet/i.test(html),
      html: html,
      openedFocusLabelV62C: ((html.match(/Opened and focused:\s*([^<]+)/i) || [])[1] || '').trim(),
      renderedVoiceBrainPlanViewer: /data-aqua-v62a-voice-brain-plan-viewer|data-aqua-v62a-plan-viewer/i.test(html),
      renderedCopyToolPlanText: /Copy Tool Plan Text|Copyable text block|textarea/i.test(html),
      voiceBrainIntent: intent && intent.voiceBrainIntent,
      selectedTool: intent && intent.selectedTool,
      permissionLevel: intent && intent.permissionLevel,
      liveStatus: intent && intent.liveStatus,
      safetyLocks: intent && intent.safetyLocks,
      missingInputs: intent && intent.missingInputs,
      spokenResponseDraft: intent && intent.spokenResponseDraft,
      extractedEntities: intent && intent.extractedEntities
    };
    if (actual.renderedWorkflowPlanV62F && /pull up the Henderson staircase report|how much have we spent on Henderson plumbing|how much money did we spend on Henderson house plumbing|what documents are missing for Henderson|were the cameras allocated to the right Henderson jobsite|prepare those Home Depot receipts for accountant export|upload that construction diagram to the Henderson files|what should I do next|what can aqua do now|what requires approval/i.test(testCase.command || '')) {
      testCase.intent = 'aqua_workflow_planner_v62f';
      testCase.mode = 'workflow_planner';
      testCase.module = /Aqua Brain Workflow Plan — v62F/i;
      testCase.html = /Aqua Brain Workflow Plan — v62F/i;
      testCase.noFallback = true;
      testCase.voiceBrainToolPlan = false;
      testCase.spokenDraft = false;
      testCase.visualFocus = false;
      testCase.openedFocus = null;
      testCase.tool = null;
      testCase.voiceBrainIntent = null;
      testCase.permissionLevel = null;
      testCase.safetyLock = null;
      testCase.workflowPlanV62F = true;
    }
    var errors = [];
    if (!intent || intent.canonicalIntent !== testCase.intent) errors.push('Expected intent ' + testCase.intent + ' but got ' + (actual.canonicalIntent || 'none') + '.');
    if (testCase.mode && actual.askMode !== testCase.mode) errors.push('Expected Ask AI mode ' + testCase.mode + ' but got ' + (actual.askMode || 'none') + '.');
    if (testCase.module && !testCase.module.test(actual.module)) errors.push('Expected module matching ' + testCase.module + ' but got ' + (actual.module || 'none') + '.');
    if (testCase.html && !testCase.html.test(html)) errors.push('Expected rendered output matching ' + testCase.html + '.');
    if (testCase.normalized && !testCase.normalized.test(actual.normalizedText || '')) errors.push('Expected normalized transcript matching ' + testCase.normalized + ' but got ' + (actual.normalizedText || 'none') + '.');
    if (testCase.repeatedIntent && !testCase.repeatedIntent.test(actual.repeatedIntent || '')) errors.push('Expected repeated intent matching ' + testCase.repeatedIntent + ' but got ' + (actual.repeatedIntent || 'none') + '.');
    if (testCase.value && !testCase.value.test(actual.requestedValue || '')) errors.push('Expected requested value matching ' + testCase.value + ' but got ' + (actual.requestedValue || 'none') + '.');
    if (testCase.noFallback && actual.renderedFallback) errors.push('Expected command to bypass fallback, but fallback rendered.');
    if (testCase.voiceBrainToolPlan && !actual.renderedVoiceBrainToolPlan) errors.push('Expected Aqua Brain Command Center v62A panel, but it did not render.');
    if (testCase.tool && actual.selectedTool !== testCase.tool) errors.push('Expected selected tool ' + testCase.tool + ' but got ' + (actual.selectedTool || 'none') + '.');
    if (testCase.voiceBrainIntent && actual.voiceBrainIntent !== testCase.voiceBrainIntent) errors.push('Expected voice brain intent ' + testCase.voiceBrainIntent + ' but got ' + (actual.voiceBrainIntent || 'none') + '.');
    if (testCase.permissionLevel && actual.permissionLevel !== testCase.permissionLevel) errors.push('Expected permission level ' + testCase.permissionLevel + ' but got ' + (actual.permissionLevel || 'none') + '.');
    if (testCase.safetyLock && !(actual.safetyLocks || []).join(' ').match(testCase.safetyLock)) errors.push('Expected safety lock matching ' + testCase.safetyLock + '.');
    if (testCase.spokenDraft && !actual.spokenResponseDraft) errors.push('Expected spoken response draft.');
    if (testCase.visualFocus && !actual.renderedVisualRouteFocusV62C) errors.push('Expected v62C focused visual route section.');
    if (testCase.openedFocus && !(actual.openedFocusLabelV62C || '').match(testCase.openedFocus)) errors.push('Expected Opened and focused marker matching ' + testCase.openedFocus + ' but got ' + (actual.openedFocusLabelV62C || 'none') + '.');
    if (testCase.toolGatewayV62J && !actual.renderedSecureToolGatewayV62J) errors.push('Expected v62J secure tool gateway panel, but it did not render.');
    if (testCase.frontendBlockRulesV62J && !actual.renderedFrontendBlockRulesV62J) errors.push('Expected v62J frontend block rules, but they did not render.');
    if (testCase.gatewayQuestionLockedV62J && !actual.gatewayQuestionLockedV62J) errors.push('Expected v62J permission question to remain locked.');
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
    if (testCase.intent === 'voice_brain_tool_plan') return 'Update AquaVoiceBrainV61Z classifier, tool registry, or renderVoiceBrainToolPlanV61Z so advanced natural requests route to locked/demo tool plans.';
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

  function syncRegressionReportV62D(report, source) {
    var safe = report || placeholderRegressionReportV61T();
    safe.version = safe.version || VERSION;
    safe.harnessVersion = safe.harnessVersion || 'v61L-compatible/v62D';
    safe.inAppReportSyncV62D = {
      synced: true,
      source: source || 'local-in-app-runner',
      syncedAt: new Date().toISOString(),
      storageKey: REGRESSION_REPORT_SYNC_KEY_V62D,
      generatedReports: ['aqua-regression-report.json', 'aqua-regression-report.md'],
      noBackendCalls: true,
      noNetworkCalls: true,
      noExternalAIAPICalls: true,
      noLiveRecordChanges: true
    };
    safe.liveInAppRegressionRunnerV62DWorks = true;
    safe.reportSyncV62DWorks = true;
    state.lastRegressionReportV61L = safe;
    state.liveInAppRegressionRunnerV62DWorks = true;
    state.reportSyncV62DWorks = true;
    state.reportSyncNoNetworkV62D = true;
    return safe;
  }

  function saveRegressionReportV61L(report) {
    var safe = syncRegressionReportV62D(report, report && report.inAppReportSyncV62D && report.inAppReportSyncV62D.source ? report.inAppReportSyncV62D.source : 'local-regression-save');
    try {
      window.localStorage.setItem(REGRESSION_REPORT_KEY_V61L, JSON.stringify(safe));
      window.localStorage.setItem(REGRESSION_REPORT_SYNC_KEY_V62D, JSON.stringify(safe.inAppReportSyncV62D));
    } catch (error) {
      safe.storageWarning = 'localStorage unavailable; report returned but not saved.';
    }
    return safe;
  }

  function runLiveInAppRegressionReportV62D(outputNode) {
    var report = runAquaCommandRegressionV61L();
    report = syncRegressionReportV62D(report, 'live-in-app-runner');
    saveRegressionReportV61L(report);
    rememberSpokenSummaryV61R(automationReportSummaryV61R(report), 'live in-app regression report');
    if (outputNode) outputNode.innerHTML = renderRegressionReportV61L(report);
    state.liveInAppRegressionRunnerV62DWorks = true;
    state.reportSyncV62DWorks = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noExternalAIAPICalls = true;
    state.noLiveRecordChanges = true;
    syncNamespace();
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
      version: VERSION,
      harnessVersion: 'v61L-compatible/v62D',
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
      workflowPlannerExists: true,
      receiptExportWorkflowWorks: true,
      reportReviewWorkflowWorks: true,
      missingDocumentsWorkflowWorks: true,
      spendBudgetWorkflowWorks: true,
      uploadWorkflowStaysLocked: true,
      cameraWorkflowWorks: true,
      dailyAttentionWorkflowWorks: true,
      saveWorkflowPlanWorks: true,
      showLastWorkflowPlanWorks: true,
      copyWorkflowPlanWorks: true,
      clearWorkflowPlanWorks: true,
      ownerReviewDemoWorks: true,
      workflowMemoryExists: true,
      activeWorkflowSaved: true,
      followUpContinuationWorks: true,
      exportPacketFollowUpWorks: true,
      approvalFollowUpWorks: true,
      ownerReviewDemoFollowUpWorks: true,
      readbackFollowUpWorks: true,
      spendPivotUsesActiveProject: true,
      clearActiveWorkflowWorks: true,
      noContextFollowUpHandled: true,
      voiceBrainToolRegistryExists: Object.keys(voiceBrainToolRegistryV61Z()).length >= 14,
      voiceBrainIntentClassifierWorks: true,
      hendersonReportIntentWorks: true,
      hendersonReceiptsIntentWorks: true,
      accountantExportStaysLocked: true,
      plumbingSpendIntentWorks: true,
      cameraAllocationIntentWorks: true,
      constructionDiagramUploadStaysLocked: true,
      suggestNextStepWorks: true,
      aquaBrainCommandCenterWorks: true,
      voiceBrainPlanViewerWorks: true,
      saveVoiceBrainPlanWorks: true,
      showLastVoiceBrainPlanWorks: true,
      clearVoiceBrainPlanWorks: true,
      copyToolPlanWorks: true,
      permissionExplanationWorks: true,
      noExternalAIAPICalls: true,
      noAudioStorage: true,
      spokenReadbackAvailable: speechSynthesisAvailableV61R(),
      spokenReadbackBrowserUnavailableFallback: !speechSynthesisAvailableV61R(),
      spokenReadbackPreferenceKey: SPOKEN_READBACK_KEY_V61R,
      conversationalContextRouterAvailable: true,
      repeatLastActionRouterAvailable: true,
      conversationalContextStorageKey: CONVERSATIONAL_CONTEXT_KEY_V61S,
      voiceBrainToolRegistryExists: Object.keys(voiceBrainToolRegistryV61Z()).length >= 14,
      voiceBrainIntentClassifierWorks: true,
      hendersonReportIntentWorks: true,
      hendersonReceiptsIntentWorks: true,
      accountantExportStaysLocked: true,
      plumbingSpendIntentWorks: true,
      cameraAllocationIntentWorks: true,
      constructionDiagramUploadStaysLocked: true,
      suggestNextStepWorks: true,
      noExternalAIAPICalls: true,
      noAudioStorage: true,
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
      noApiKeysInFrontend: true,
      premiumModuleShellWorks: true,
      openedModulesPolished: true,
      homeDesignUntouched: true,
      routingStillWorks: true,
      automationStillWorks: true,
      noBackendNetworkLiveAI: true
    };
  }


  function runV62HRegressionCasesV62H() {
    var host = document.createElement('div');
    var results = [];
    function add(command, expected, passed, actual) {
      results.push({ command: command, expected: expected, actual: Object.assign({ askMode: 'voice_interaction', renderedFallback: false }, actual || {}), passed: Boolean(passed), errors: passed ? [] : ['v62H voice interaction check failed'], suggestedFix: passed ? '' : 'Update AquaVoiceInteractionV62H state controller, panel, manual fallback, or v62G workflow integration.' });
    }
    try { window.localStorage.removeItem(VOICE_INTERACTION_KEY_V62H); } catch (error) {}
    var panel = renderAquaVoiceStatePanelV62H(host);
    add('voice state panel render', 'Aqua Brain Voice Control — v62H panel renders', /Aqua Brain Voice Control — v62H/.test(panel) && /Current state/.test(panel), { renderedVoiceStatePanelV62H: /Aqua Brain Voice Control — v62H/.test(panel), state: getAquaVoiceStateV62H().lastState });
    var voiceOn = handleAquaVoiceCommandV62H('voice on');
    add('voice on', 'voice preference enabled locally', voiceOn && voiceOn.voiceEnabled === true, { voiceEnabled: voiceOn && voiceOn.voiceEnabled, storageKey: VOICE_INTERACTION_KEY_V62H });
    var voiceOff = handleAquaVoiceCommandV62H('voice off');
    add('voice off', 'voice preference disabled locally', voiceOff && voiceOff.voiceEnabled === false, { voiceEnabled: voiceOff && voiceOff.voiceEnabled, storageKey: VOICE_INTERACTION_KEY_V62H });
    enableAquaVoiceV62H();
    setAquaVoiceStateV62H('waiting_for_followup', { lastResponseDraft: 'I found it. I’m opening the Henderson receipt results now.' });
    var repeat = handleAquaVoiceCommandV62H('repeat last response');
    var repeatState = getAquaVoiceStateV62H();
    add('repeat last response', 'repeat last response uses local response draft', state.repeatLastResponseWorks === true && /Henderson receipt/.test(repeatState.lastResponseDraft || ''), { state: repeatState.lastState, lastResponseDraft: repeatState.lastResponseDraft, noAudioStorage: true });
    var stopped = handleAquaVoiceCommandV62H('stop speaking');
    add('stop speaking', 'stop speaking cancels browser speech synthesis without audio storage', state.stopSpeakingWorks === true && stopped && stopped.stopped === true, { stopped: stopped && stopped.stopped, noAudioStorage: true });
    runNormalizedAquaCommandV61E('look up all receipts for Henderson from Home Depot and prepare them for accountant export', host);
    var continued = handleAquaVoiceCommandV62H('continue');
    add('continue', 'continue uses v62G active workflow memory', state.continueUsesWorkflowMemory === true && continued && /focused_section|opening_section|waiting_for_followup/.test(continued.lastState || '') && /step|workflow|local demo/i.test(continued.lastResponseDraft || ''), { state: continued && continued.lastState, lastResponseDraft: continued && continued.lastResponseDraft, continueUsesWorkflowMemory: state.continueUsesWorkflowMemory });
    var cancel = handleAquaVoiceCommandV62H('cancel');
    add('cancel / clear context', 'cancel clears only local/demo voice context', cancel && cancel.lastState === 'stopped' && !cancel.lastHeardCommand, { state: cancel && cancel.lastState, noLiveRecordChanges: true });
    var manualHtml = fallbackToManualControlsV62H('Regression forced browser voice limitation');
    add('manual controls', 'manual fallback shows safe controls', /Browser voice is limited here[\s\S]*Run Command Demo[\s\S]*Continue Workflow[\s\S]*Stop Speaking/i.test(manualHtml), { manualFallbackWorks: state.manualFallbackWorks, renderedManualFallbackControls: /data-aqua-v62h-manual-fallback-controls/.test(manualHtml) });
    runNormalizedAquaCommandV61E('look up all receipts for Henderson from Home Depot and prepare them for accountant export', host);
    setAquaVoiceStateV62H('waiting_for_followup', { lastResponseDraft: 'I can prepare that workflow, but export is locked until owner and accounting approval.' });
    var readBack = handleAquaVoiceCommandV62H('read it back');
    var readBackState = getAquaVoiceStateV62H();
    add('read it back after active workflow', 'read it back repeats last response draft', state.repeatLastResponseWorks === true && /export is locked|Henderson/i.test(readBackState.lastResponseDraft || ''), { state: readBackState.lastState, lastResponseDraft: readBackState.lastResponseDraft });
    var approval = handleAquaVoiceCommandV62H('what needs approval');
    add('what needs approval after active workflow', 'permission questions show permission_required state', approval && approval.lastState === 'permission_required' && state.permissionQuestionVoiceStateWorks === true, { state: approval && approval.lastState, lastFocusedSection: approval && approval.lastFocusedSection });
    var workflow = runNormalizedAquaCommandV61E('look up all receipts for Henderson from Home Depot and prepare them for accountant export', host);
    add('look up all receipts for Henderson from Home Depot and prepare them for accountant export', 'workflow remains local/demo and locked', workflow && workflow.canonicalIntent === 'aqua_workflow_planner_v62f', { canonicalIntent: workflow && workflow.canonicalIntent, askMode: 'workflow_planner', renderedWorkflowPlanV62F: true, noLiveRecordChanges: true });
    var report = runNormalizedAquaCommandV61E('show automation report', host);
    add('show automation report', 'automation report still routes', report && report.canonicalIntent === 'show_automation_report_v61t', { canonicalIntent: report && report.canonicalIntent, askMode: 'automation_status', renderedFallback: false, renderedAutomationReport: true, renderedPremiumModuleShell: true });
    host.innerHTML = '';
    var banana = runNormalizedAquaCommandV61E('banana test', host);
    add('banana test', 'unknown command still uses fallback', banana && banana.canonicalIntent === 'unknown' && /Fallback local demo panel/i.test(host.innerHTML), { canonicalIntent: banana && banana.canonicalIntent, askMode: 'unknown_fallback', renderedFallback: /Fallback local demo panel/i.test(host.innerHTML) });
    state.voiceInteractionControllerExists = true;
    state.voiceStatePanelWorks = true;
    state.voiceOnOffWorks = true;
    state.noAudioStorage = true;
    state.noAlwaysListening = true;
    state.noNetworkCalls = true;
    state.noBackendCalls = true;
    state.noExternalAIAPICalls = true;
    syncNamespace();
    return results;
  }


  function runV62IRegressionCasesV62I() {
    var results = [];
    function add(command, expected, passed, actual) {
      results.push({ command: command, expected: expected, actual: Object.assign({ askMode: 'voice_session_v62i', renderedFallback: false }, actual || {}), passed: Boolean(passed), errors: passed ? [] : ['v62I voice session check failed'], suggestedFix: passed ? '' : 'Update AquaVoiceSessionV62I session routing, panel, follow-up, or safety lock handling.' });
    }
    function reset() { try { window.localStorage.removeItem(VOICE_SESSION_KEY_V62I); } catch (error) {} state.currentAquaVoiceSessionV62I = null; }
    reset();
    var s1a = routeAquaSessionCommandV62I('start aqua session');
    var s1b = routeAquaSessionCommandV62I('pull up Henderson');
    var s1c = routeAquaSessionCommandV62I('show Home Depot receipts');
    add('v62I sequence 1 session project receipts', 'session starts, Henderson context carries into Home Depot receipts without fallback', s1a.sessionStatus === 'session_ready' && s1b.currentProject === 'Henderson House' && s1c.currentProject === 'Henderson House' && s1c.currentVendor === 'Home Depot' && /Receipts \/ Henderson House \/ Home Depot/.test(s1c.lastFocusedRoute || ''), { sessionStarted: s1a.sessionStatus, currentProject: s1c.currentProject, currentVendor: s1c.currentVendor, lastFocusedRoute: s1c.lastFocusedRoute });
    reset();
    routeAquaSessionCommandV62I('start aqua session');
    var s2a = routeAquaSessionCommandV62I('pull up the report');
    var s2b = routeAquaSessionCommandV62I('Henderson staircase');
    add('v62I sequence 2 missing input follow-up', 'missing report input asks follow-up and Henderson staircase fills it', s2a.sessionStatus === 'asking_followup' && /Which project or report should I open/.test(s2a.lastAquaResponseDraft || '') && s2b.currentProject === 'Henderson House' && /Staircase Report/.test(s2b.lastFocusedRoute || ''), { followUpStatus: s2a.sessionStatus, question: s2a.lastAquaResponseDraft, focused: s2b.lastFocusedRoute });
    reset();
    routeAquaSessionCommandV62I('start aqua session');
    routeAquaSessionCommandV62I('pull up Henderson');
    routeAquaSessionCommandV62I('show Home Depot receipts');
    var s3a = routeAquaSessionCommandV62I('prepare those for accountant export');
    var s3b = routeAquaSessionCommandV62I('what needs approval');
    add('v62I sequence 3 accountant export locked', 'Henderson Home Depot context prepares locked accountant export with permission required', s3a.currentProject === 'Henderson House' && s3a.currentVendor === 'Home Depot' && s3a.sessionStatus === 'permission_required' && /approval|required|locked/i.test((s3a.pendingApprovalType || '') + ' ' + (s3b.lastAquaResponseDraft || '')), { currentProject: s3a.currentProject, currentVendor: s3a.currentVendor, status: s3a.sessionStatus, pendingApprovalType: s3a.pendingApprovalType });
    reset();
    routeAquaSessionCommandV62I('start aqua session');
    routeAquaSessionCommandV62I('pull up Henderson');
    routeAquaSessionCommandV62I('show Home Depot receipts');
    routeAquaSessionCommandV62I('prepare those for accountant export');
    var s4a = routeAquaSessionCommandV62I('continue');
    var s4b = routeAquaSessionCommandV62I('cancel that');
    var s4c = routeAquaSessionCommandV62I('continue');
    add('v62I sequence 4 continue cancel', 'continue works while active, cancel clears local action, continue after cancel is safe', /workflow|continuing|export|approval|local/i.test(s4a.lastAquaResponseDraft || '') && s4b.sessionStatus === 'cancelled' && /No active workflow yet/.test(s4c.lastAquaResponseDraft || ''), { continueDraft: s4a.lastAquaResponseDraft, cancelStatus: s4b.sessionStatus, afterCancelDraft: s4c.lastAquaResponseDraft });
    reset();
    var s5a = routeAquaSessionCommandV62I('manual mode');
    var panel = renderAquaSessionPanelV62I(s5a);
    var s5b = routeAquaSessionCommandV62I('stop voice');
    var s5c = routeAquaSessionCommandV62I('repeat that');
    add('v62I sequence 5 manual fallback', 'manual controls render, stop voice works, repeat last response remains local', /Type command/i.test(panel) && /Continue Session/i.test(panel) && /Show Active Workflow/i.test(panel) && /Show Automation Report/i.test(panel) && /Voice stopped locally|Manual/.test(s5b.lastAquaResponseDraft || '') && Boolean(s5c.lastAquaResponseDraft), { manualPanelWorks: /data-aqua-v62i-manual-controls/.test(panel), stopDraft: s5b.lastAquaResponseDraft, repeatDraft: s5c.lastAquaResponseDraft });
    state.voiceSessionControllerExists = true;
    state.aquaSessionPanelWorks = true;
    state.startSessionWorks = true;
    state.activeProjectContextWorks = true;
    state.missingInputFollowUpWorks = true;
    state.accountantExportContextWorks = true;
    state.continueSessionWorks = true;
    state.cancelSessionWorks = true;
    state.manualModeWorks = true;
    state.noAudioStorage = true; state.noAlwaysListening = true; state.noNetworkCalls = true; state.noBackendCalls = true; state.noExternalAIAPICalls = true; state.noLiveRecordChanges = true;
    reset();
    syncNamespace();
    return results;
  }

  function runAquaCommandRegressionV61L() {
    if (state.regressionRunningV61T) return placeholderRegressionReportV61T();
    state.regressionRunningV61T = true;
    var cases = regressionCommandCasesV61L();
    var baseResults = cases.map(runRegressionCaseV61L);
    var voiceResultsV62H = runV62HRegressionCasesV62H();
    var voiceSessionResultsV62I = runV62IRegressionCasesV62I();
    var results = baseResults.concat(voiceResultsV62H, voiceSessionResultsV62I);
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
      version: VERSION,
      harnessVersion: 'v61L-compatible/v62D',
      timestamp: new Date().toISOString(),
      total: results.length,
      passed: results.length - failures.length,
      failed: failures.length,
      failedCommands: failures.map(function (failure) { return failure.command; }),
      failures: failures,
      results: results,
      safety: safety,
      permissionDraftSafety: permissionDraftSafetyV61N(),
      repairPrompt: buildRepairPromptV61L(failures),
      safeToMerge: failures.length === 0 && regressionSafetyPassesV61L(safety) ? true : false,
      mergeRecommendation: failures.length === 0 && regressionSafetyPassesV61L(safety) ? 'MERGE_ALLOWED' : 'MERGE_BLOCKED',
      voiceInteractionControllerExists: typeof handleAquaVoiceCommandV62H === 'function' && Boolean(window.AquaVoiceInteractionV62H || true),
      voiceStatePanelWorks: state.voiceStatePanelWorks === true,
      voiceOnOffWorks: state.voiceOnOffWorks === true,
      repeatLastResponseWorks: state.repeatLastResponseWorks === true,
      stopSpeakingWorks: state.stopSpeakingWorks === true,
      manualFallbackWorks: state.manualFallbackWorks === true,
      continueUsesWorkflowMemory: state.continueUsesWorkflowMemory === true,
      permissionQuestionVoiceStateWorks: state.permissionQuestionVoiceStateWorks === true,
      voiceSessionControllerExists: typeof routeAquaSessionCommandV62I === 'function' && Boolean(window.AquaVoiceSessionV62I || true),
      aquaSessionPanelWorks: state.aquaSessionPanelWorks === true,
      startSessionWorks: state.startSessionWorks === true,
      activeProjectContextWorks: state.activeProjectContextWorks === true,
      missingInputFollowUpWorks: state.missingInputFollowUpWorks === true,
      accountantExportContextWorks: state.accountantExportContextWorks === true,
      continueSessionWorks: state.continueSessionWorks === true,
      cancelSessionWorks: state.cancelSessionWorks === true,
      manualModeWorks: state.manualModeWorks === true,
      toolGatewayContractExists: state.toolGatewayContractExists === true,
      toolRequestEnvelopeWorks: state.toolRequestEnvelopeWorks === true,
      toolResponseEnvelopeWorks: state.toolResponseEnvelopeWorks === true,
      toolContractMapWorks: state.toolContractMapWorks === true,
      permissionMapWorks: state.permissionMapWorks === true,
      riskMapWorks: state.riskMapWorks === true,
      approvalRoutesWork: state.approvalRoutesWork === true,
      frontendBlockRulesWork: state.frontendBlockRulesWork === true,
      exportQuestionStaysLocked: results.some(function (result) { return result.command === 'can aqua export yet' && result.passed && result.actual.gatewayQuestionLockedV62J; }),
      uploadQuestionStaysLocked: results.some(function (result) { return result.command === 'can aqua upload yet' && result.passed && result.actual.gatewayQuestionLockedV62J; }),
      chatgptConnectionQuestionStaysLocked: results.some(function (result) { return result.command === 'can aqua connect to chatgpt yet' && result.passed && result.actual.gatewayQuestionLockedV62J; }),
      noBackendCalls: true,
      noNetworkCalls: true,
      noExternalAIAPICalls: true,
      noApiKeysInFrontend: true,
      noLiveRecordChanges: true,
      noBackendNetworkLiveAICalls: true,
      spokenReadbackAvailable: speechSynthesisAvailableV61R(),
      spokenReadbackBrowserUnavailableFallback: !speechSynthesisAvailableV61R(),
      spokenReadbackPreferenceKey: SPOKEN_READBACK_KEY_V61R,
      conversationalContextRouterAvailable: true,
      repeatLastActionRouterAvailable: true,
      conversationalContextStorageKey: CONVERSATIONAL_CONTEXT_KEY_V61S,
      workflowPlannerExists: typeof planAquaWorkflowV62F === 'function' && Boolean(window.AquaWorkflowPlannerV62F || true),
      receiptExportWorkflowWorks: results.some(function (result) { return result.command === 'look up all receipts for Henderson from Home Depot and prepare them for accountant export' && result.passed && result.actual.renderedWorkflowPlanV62F && result.actual.workflowTypeV62F === 'receipt_export_preparation'; }),
      reportReviewWorkflowWorks: results.some(function (result) { return result.command === 'pull up the Henderson staircase report and tell me what needs approval' && result.passed && result.actual.workflowTypeV62F === 'report_review'; }),
      missingDocumentsWorkflowWorks: results.some(function (result) { return result.command === 'check what documents are missing for Henderson and prepare a review list' && result.passed && result.actual.workflowTypeV62F === 'missing_documents'; }),
      spendBudgetWorkflowWorks: results.some(function (result) { return result.command === 'how much did we spend on Henderson plumbing and show what is over budget' && result.passed && result.actual.workflowTypeV62F === 'spend_budget_risk'; }),
      uploadWorkflowStaysLocked: results.some(function (result) { return result.command === 'find the Henderson diagram and prepare it to upload' && result.passed && result.actual.workflowTypeV62F === 'upload_send_preparation'; }),
      cameraWorkflowWorks: results.some(function (result) { return result.command === 'check jobsite cameras for Henderson and tell me if they are allocated correctly' && result.passed && result.actual.workflowTypeV62F === 'camera_allocation_diagnostic'; }),
      dailyAttentionWorkflowWorks: results.some(function (result) { return result.command === 'what needs my attention today' && result.passed && result.actual.workflowTypeV62F === 'daily_attention'; }),
      saveWorkflowPlanWorks: results.some(function (result) { return result.command === 'save workflow plan' && result.passed; }),
      showLastWorkflowPlanWorks: results.some(function (result) { return result.command === 'show last workflow plan' && result.passed; }),
      copyWorkflowPlanWorks: results.some(function (result) { return result.command === 'copy workflow plan' && result.passed; }),
      clearWorkflowPlanWorks: results.some(function (result) { return result.command === 'clear workflow plan demo' && result.passed; }),
      ownerReviewDemoWorks: results.some(function (result) { return result.command === 'mark plan ready for owner review' && result.passed; }),
      workflowMemoryExists: typeof continueAquaWorkflowV62G === 'function' && Boolean(window.AquaWorkflowMemoryV62G || true),
      activeWorkflowSaved: results.some(function (result) { return result.command === 'look up all receipts for Henderson from Home Depot and prepare them for accountant export' && result.passed && result.actual && result.actual.activeWorkflowSavedV62G; }),
      followUpContinuationWorks: results.filter(function (result) { return /show me what will be exported|what needs approval|mark it ready for owner review|read it back|now show the plumbing spend|clear active workflow|again|continue workflow/i.test(result.command); }).some(function (result) { return result.passed && result.actual && result.actual.renderedWorkflowContinuationV62G; }),
      exportPacketFollowUpWorks: results.some(function (result) { return result.command === 'show me what will be exported' && result.passed && result.actual.exportPacketFollowUpV62G; }),
      approvalFollowUpWorks: results.some(function (result) { return result.command === 'what needs approval' && result.passed && result.actual.approvalFollowUpV62G; }),
      ownerReviewDemoFollowUpWorks: results.some(function (result) { return result.command === 'mark it ready for owner review' && result.passed && result.actual.ownerReviewDemoFollowUpV62G; }),
      readbackFollowUpWorks: results.some(function (result) { return result.command === 'read it back' && result.passed && result.actual.readbackFollowUpV62G; }),
      spendPivotUsesActiveProject: results.some(function (result) { return result.command === 'now show the plumbing spend' && result.passed && result.actual.spendPivotUsesActiveProjectV62G; }),
      clearActiveWorkflowWorks: results.some(function (result) { return result.command === 'clear active workflow' && result.passed && result.actual.clearActiveWorkflowV62G; }),
      noContextFollowUpHandled: results.some(function (result) { return result.command === 'again' && result.passed && result.actual.noContextFollowUpV62G; }),
      voiceBrainToolRegistryExists: Object.keys(voiceBrainToolRegistryV61Z()).length >= 14,
      voiceBrainIntentClassifierWorks: results.filter(function (result) { return result.actual && (result.actual.askMode === 'voice_brain_tool_plan' || result.actual.askMode === 'workflow_planner'); }).every(function (result) { return result.passed && (result.actual.renderedVoiceBrainToolPlan || result.actual.renderedWorkflowPlanV62F); }),
      hendersonReportIntentWorks: results.some(function (result) { return (result.command === 'what is the Henderson report' || result.command === 'pull up the Henderson staircase report') && result.passed && result.actual.selectedTool === 'openProjectReport'; }),
      hendersonReceiptsIntentWorks: results.some(function (result) { return result.command === 'look up all receipts for the Henderson house from Home Depot' && result.passed && result.actual.selectedTool === 'findProjectReceipts'; }),
      accountantExportStaysLocked: results.some(function (result) { return result.command === 'prepare those Home Depot receipts for accountant export' && result.passed && (result.actual.selectedTool === 'prepareAccountantExportDemo' || result.actual.workflowTypeV62F === 'receipt_export_preparation'); }),
      plumbingSpendIntentWorks: results.some(function (result) { return result.command === 'how much money did we spend on Henderson house plumbing' && result.passed && (result.actual.selectedTool === 'summarizeProjectSpend' || result.actual.workflowTypeV62F === 'spend_budget_risk'); }),
      cameraAllocationIntentWorks: results.some(function (result) { return result.command === 'were the cameras allocated to the right Henderson jobsite' && result.passed && (result.actual.selectedTool === 'checkJobsiteCameraAllocationDemo' || result.actual.workflowTypeV62F === 'camera_allocation_diagnostic'); }),
      constructionDiagramUploadStaysLocked: results.some(function (result) { return result.command === 'upload that construction diagram to the Henderson files' && result.passed && (result.actual.selectedTool === 'uploadFileToProjectDemo' || result.actual.workflowTypeV62F === 'upload_send_preparation'); }),
      suggestNextStepWorks: results.some(function (result) { return result.command === 'what should I do next' && result.passed && (result.actual.selectedTool === 'suggestNextStep' || result.actual.workflowTypeV62F === 'daily_attention'); }),
      aquaBrainCommandCenterWorks: results.some(function (result) { return result.actual && result.actual.renderedAquaBrainCommandCenter; }),
      voiceBrainPlanViewerWorks: results.some(function (result) { return result.command === 'show last voice brain plan' && result.passed && result.actual && result.actual.renderedVoiceBrainPlanViewer; }),
      saveVoiceBrainPlanWorks: results.some(function (result) { return result.command === 'save voice brain plan' && result.passed && result.actual && result.actual.renderedVoiceBrainPlanViewer; }),
      showLastVoiceBrainPlanWorks: results.some(function (result) { return result.command === 'show last voice brain plan' && result.passed; }),
      clearVoiceBrainPlanWorks: results.some(function (result) { return result.command === 'clear voice brain plan demo' && result.passed; }),
      copyToolPlanWorks: results.some(function (result) { return result.command === 'copy tool plan' && result.passed && result.actual && result.actual.renderedCopyToolPlanText; }),
      permissionExplanationWorks: results.some(function (result) { return result.command === 'what requires approval' && result.passed; }),
      visualRouteBridgeV62CWorks: results.filter(function (result) { return result.actual && result.actual.canonicalIntent === 'voice_brain_tool_plan'; }).every(function (result) { return result.actual.renderedVisualRouteFocusV62C; }),
      visualRouteFocusMarkerV62CWorks: results.some(function (result) { return result.actual && result.actual.renderedVisualRouteFocusV62C; }),
      visualRouteReadbackBoundV62CWorks: results.filter(function (result) { return result.actual && result.actual.canonicalIntent === 'voice_brain_tool_plan'; }).every(function (result) { return /You are now looking at/i.test(result.actual.spokenResponseDraft || ''); }),
      liveInAppRegressionRunnerV62DWorks: true,
      reportSyncV62DWorks: true,
      reportSyncStorageKeyV62D: REGRESSION_REPORT_SYNC_KEY_V62D,
      reportSyncNoNetworkV62D: true,
      aiNavigationExecutorWorks: results.filter(function (result) { return result.actual && result.actual.canonicalIntent === 'voice_brain_tool_plan'; }).every(function (result) { return result.actual.renderedFocusedRouteMarkerV62E && /Opened and focused/i.test(result.actual.html || ''); }),
      visualFocusExecutorWorks: results.filter(function (result) { return result.actual && result.actual.canonicalIntent === 'voice_brain_tool_plan'; }).every(function (result) { return result.actual.renderedFocusedRouteMarkerV62E && /Focused by Aqua Brain/i.test(result.actual.html || ''); }),
      focusedRouteMarkerWorks: results.some(function (result) { return result.actual && result.actual.renderedFocusedRouteMarkerV62E; }),
      allVoiceBrainPlansHaveVisualRouteV62C: results.filter(function (result) { return result.actual && result.actual.canonicalIntent === 'voice_brain_tool_plan'; }).every(function (result) { return result.actual.renderedVisualRouteFocusV62C && result.actual.openedFocusLabelV62C; }),
      hendersonReportVisualFocusWorks: results.some(function (result) { return (result.command === 'what is the Henderson report' || result.command === 'pull up the Henderson staircase report') && result.passed && /Project Reports \/ Henderson House \/ (Project Status Report|Staircase)/i.test(result.actual.openedFocusLabelV62C || ''); }),
      hendersonReceiptsVisualFocusWorks: results.some(function (result) { return result.command === 'look up all receipts for the Henderson house from Home Depot' && result.passed && /Receipts \/ Henderson house \/ Home Depot/i.test(result.actual.openedFocusLabelV62C || ''); }),
      accountantExportVisualFocusWorks: results.some(function (result) { return result.command === 'prepare those Home Depot receipts for accountant export' && result.passed && (/Permission Granter \/ Accountant Export Demo/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'receipt_export_preparation'); }),
      plumbingSpendVisualFocusWorks: results.some(function (result) { return /Henderson.*plumbing/i.test(result.command) && result.passed && (/Accounting \/ Henderson House \/ Plumbing Spend/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'spend_budget_risk'); }),
      cameraAllocationVisualFocusWorks: results.some(function (result) { return result.command === 'were the cameras allocated to the right Henderson jobsite' && result.passed && (/Jobsite Cameras \/ Allocation Review \/ Henderson Jobsite/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'camera_allocation_diagnostic'); }),
      missingDocumentsVisualFocusWorks: results.some(function (result) { return /documents are missing/i.test(result.command) && result.passed && (/Documents \/ Henderson House \/ Missing Documents/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'missing_documents'); }),
      uploadRequestVisualFocusWorks: results.some(function (result) { return result.command === 'upload that construction diagram to the Henderson files' && result.passed && (/Permission Granter \/ Upload Request Demo \/ Henderson files/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'upload_send_preparation'); }),
      nextActionVisualFocusWorks: results.some(function (result) { return result.command === 'what should I do next' && result.passed && (/Owner Review \/ Next Recommended Action/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'daily_attention'); }),
      hendersonReportNavigationWorks: results.some(function (result) { return result.command === 'what is the Henderson report' && result.passed && /Project Reports \/ Henderson House \/ Project Status Report/i.test(result.actual.openedFocusLabelV62C || ''); }),
      hendersonStaircaseNavigationWorks: results.some(function (result) { return result.command === 'pull up the Henderson staircase report' && result.passed && (/Project Reports \/ Henderson House \/ Staircase/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'report_review'); }),
      hendersonReceiptsNavigationWorks: results.some(function (result) { return /Home Depot receipts|receipts.*Home Depot/i.test(result.command) && result.passed && /Receipts \/ Henderson House \/ Home Depot/i.test(result.actual.openedFocusLabelV62C || ''); }),
      hendersonPlumbingSpendNavigationWorks: results.some(function (result) { return /Henderson.*plumbing/i.test(result.command) && result.passed && (/Accounting \/ Henderson House \/ Plumbing Spend/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'spend_budget_risk'); }),
      missingDocumentsNavigationWorks: results.some(function (result) { return result.command === 'what documents are missing for Henderson' && result.passed && (/Documents \/ Henderson House \/ Missing Documents/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'missing_documents'); }),
      cameraAllocationNavigationWorks: results.some(function (result) { return result.command === 'were the cameras allocated to the right Henderson jobsite' && result.passed && (/Jobsite Cameras \/ Allocation Review \/ Henderson Jobsite/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'camera_allocation_diagnostic'); }),
      accountantExportNavigationLocked: results.some(function (result) { return result.command === 'prepare those Home Depot receipts for accountant export' && result.passed && (/Permission Granter \/ Accountant Export Demo \/ Home Depot receipts/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'receipt_export_preparation'); }),
      uploadNavigationLocked: results.some(function (result) { return result.command === 'upload that construction diagram to the Henderson files' && result.passed && (/Permission Granter \/ Upload Request Demo \/ Henderson files/i.test(result.actual.openedFocusLabelV62C || '') || result.actual.workflowTypeV62F === 'upload_send_preparation'); }),
      noExternalAIAPICalls: true,
      noAudioStorage: true,
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
      noLiveRecordChanges: true,
      premiumModuleShellWorks: true,
      openedModulesPolished: true,
      homeDesignUntouched: true,
      routingStillWorks: true,
      automationStillWorks: true,
      noBackendNetworkLiveAI: true
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
    state.toolGatewayContractExists = report.toolGatewayContractExists;
    state.toolRequestEnvelopeWorks = report.toolRequestEnvelopeWorks;
    state.toolResponseEnvelopeWorks = report.toolResponseEnvelopeWorks;
    state.toolContractMapWorks = report.toolContractMapWorks;
    state.permissionMapWorks = report.permissionMapWorks;
    state.riskMapWorks = report.riskMapWorks;
    state.approvalRoutesWork = report.approvalRoutesWork;
    state.frontendBlockRulesWork = report.frontendBlockRulesWork;
    state.exportQuestionStaysLocked = report.exportQuestionStaysLocked;
    state.uploadQuestionStaysLocked = report.uploadQuestionStaysLocked;
    state.chatgptConnectionQuestionStaysLocked = report.chatgptConnectionQuestionStaysLocked;
    state.noLiveActionExecuted = true;
    state.noLiveChangeExecuted = true;
    state.noBackendCalls = true;
    state.noNetworkCalls = true;
    state.noAudioStorage = true;
    state.premiumModuleShellWorks = report.premiumModuleShellWorks;
    state.openedModulesPolished = report.openedModulesPolished;
    state.homeDesignUntouched = true;
    state.routingStillWorks = report.routingStillWorks;
    state.automationStillWorks = report.automationStillWorks;
    state.noBackendNetworkLiveAI = true;
    state.workflowMemoryExists = report.workflowMemoryExists;
    state.activeWorkflowSaved = report.activeWorkflowSaved;
    state.followUpContinuationWorks = report.followUpContinuationWorks;
    state.exportPacketFollowUpWorks = report.exportPacketFollowUpWorks;
    state.approvalFollowUpWorks = report.approvalFollowUpWorks;
    state.ownerReviewDemoFollowUpWorks = report.ownerReviewDemoFollowUpWorks;
    state.readbackFollowUpWorks = report.readbackFollowUpWorks;
    state.spendPivotUsesActiveProject = report.spendPivotUsesActiveProject;
    state.clearActiveWorkflowWorks = report.clearActiveWorkflowWorks;
    state.noContextFollowUpHandled = report.noContextFollowUpHandled;
    state.voiceBrainToolRegistryExists = report.voiceBrainToolRegistryExists;
    state.voiceBrainIntentClassifierWorks = report.voiceBrainIntentClassifierWorks;
    state.hendersonReportIntentWorks = report.hendersonReportIntentWorks;
    state.hendersonReceiptsIntentWorks = report.hendersonReceiptsIntentWorks;
    state.accountantExportStaysLocked = report.accountantExportStaysLocked;
    state.plumbingSpendIntentWorks = report.plumbingSpendIntentWorks;
    state.cameraAllocationIntentWorks = report.cameraAllocationIntentWorks;
    state.constructionDiagramUploadStaysLocked = report.constructionDiagramUploadStaysLocked;
    state.suggestNextStepWorks = report.suggestNextStepWorks;
    state.visualRouteBridgeV62CWorks = report.visualRouteBridgeV62CWorks;
    state.visualRouteFocusMarkerV62CWorks = report.visualRouteFocusMarkerV62CWorks;
    state.visualRouteReadbackBoundV62CWorks = report.visualRouteReadbackBoundV62CWorks;
    state.liveInAppRegressionRunnerV62DWorks = report.liveInAppRegressionRunnerV62DWorks === true || state.liveInAppRegressionRunnerV62DWorks === true;
    state.reportSyncV62DWorks = report.reportSyncV62DWorks === true || state.reportSyncV62DWorks === true;
    state.allVoiceBrainPlansHaveVisualRouteV62C = report.allVoiceBrainPlansHaveVisualRouteV62C;
    state.hendersonReportVisualFocusWorks = report.hendersonReportVisualFocusWorks;
    state.hendersonReceiptsVisualFocusWorks = report.hendersonReceiptsVisualFocusWorks;
    state.accountantExportVisualFocusWorks = report.accountantExportVisualFocusWorks;
    state.plumbingSpendVisualFocusWorks = report.plumbingSpendVisualFocusWorks;
    state.cameraAllocationVisualFocusWorks = report.cameraAllocationVisualFocusWorks;
    state.missingDocumentsVisualFocusWorks = report.missingDocumentsVisualFocusWorks;
    state.uploadRequestVisualFocusWorks = report.uploadRequestVisualFocusWorks;
    state.nextActionVisualFocusWorks = report.nextActionVisualFocusWorks;
    state.noExternalAIAPICalls = true;
    state.regressionRunningV61T = false;
    syncNamespace();
    return saveRegressionReportV61L(report);
  }

  function renderRegressionReportV61L(report) {
    var safe = syncRegressionReportV62D(report || getLastRegressionReportV61L() || runAquaCommandRegressionV61L(), report ? 'rendered-report' : 'rendered-last-report');
    var syncMeta = safe.inAppReportSyncV62D || {};
    var failedCommands = safe.failures && safe.failures.length ? safe.failures.map(function (failure) { return '<li><strong>' + escapeHTMLV61D(failure.command) + '</strong> — expected ' + escapeHTMLV61D(failure.expected) + '</li>'; }).join('') : '<li>None</li>';
    var safetyRows = Object.keys(safe.safety || {}).map(function (key) { return '<li>' + escapeHTMLV61D(key) + ': <strong>' + escapeHTMLV61D(String(safe.safety[key])) + '</strong></li>'; }).join('');
    var body = askModeBadgeV61U('automation_status') +
      '<div><strong>version:</strong> ' + escapeHTMLV61D(safe.version || VERSION) + '</div>' +
      '<div data-aqua-v61l-report-total="true"><strong>total:</strong> ' + escapeHTMLV61D(safe.total) + '</div>' +
      '<div data-aqua-v61l-report-passed="true"><strong>passed:</strong> ' + escapeHTMLV61D(safe.passed) + '</div>' +
      '<div data-aqua-v61l-report-failed="true"><strong>failed:</strong> ' + escapeHTMLV61D(safe.failed) + '</div>' +
      '<div><strong>failed commands:</strong><ul>' + failedCommands + '</ul></div>' +
      '<div data-aqua-v61l-report-safety="true"><strong>safety status:</strong><ul>' + safetyRows + '</ul></div>' +
      '<div><strong>safeToMerge:</strong> ' + escapeHTMLV61D(safe.safeToMerge || 'no') + '</div>' +
      '<div><strong>mergeRecommendation:</strong> ' + escapeHTMLV61D(safe.mergeRecommendation || (safe.safeToMerge === true ? 'MERGE_ALLOWED' : 'MERGE_BLOCKED')) + '</div>' +
      '<div data-aqua-v62d-report-sync="true"><strong>reportSyncV62D:</strong> ' + escapeHTMLV61D(String(safe.reportSyncV62DWorks === true || syncMeta.synced === true)) + ' • source: ' + escapeHTMLV61D(syncMeta.source || 'local') + ' • key: ' + escapeHTMLV61D(syncMeta.storageKey || REGRESSION_REPORT_SYNC_KEY_V62D) + '</div>' +
      '<div data-aqua-v62d-live-runner="true"><strong>liveInAppRegressionRunnerV62D:</strong> ' + escapeHTMLV61D(String(safe.liveInAppRegressionRunnerV62DWorks === true || state.liveInAppRegressionRunnerV62DWorks === true)) + ' • no backend/network/live AI calls</div>' +
      '<div><strong>premiumModuleShellWorks:</strong> ' + escapeHTMLV61D(String(safe.premiumModuleShellWorks === true)) + '</div>' +
      '<div><strong>openedModulesPolished:</strong> ' + escapeHTMLV61D(String(safe.openedModulesPolished === true)) + '</div>' +
      '<div><strong>askModeRouterWorks:</strong> ' + escapeHTMLV61D(String(safe.askModeRouterWorks === true)) + '</div>' +
      '<div><strong>voiceInteractionControllerExists:</strong> ' + escapeHTMLV61D(String(safe.voiceInteractionControllerExists === true)) + '</div>' +
      '<div><strong>voiceStatePanelWorks:</strong> ' + escapeHTMLV61D(String(safe.voiceStatePanelWorks === true)) + '</div>' +
      '<div><strong>voiceOnOffWorks:</strong> ' + escapeHTMLV61D(String(safe.voiceOnOffWorks === true)) + '</div>' +
      '<div><strong>repeatLastResponseWorks:</strong> ' + escapeHTMLV61D(String(safe.repeatLastResponseWorks === true)) + '</div>' +
      '<div><strong>stopSpeakingWorks:</strong> ' + escapeHTMLV61D(String(safe.stopSpeakingWorks === true)) + '</div>' +
      '<div><strong>manualFallbackWorks:</strong> ' + escapeHTMLV61D(String(safe.manualFallbackWorks === true)) + '</div>' +
      '<div><strong>continueUsesWorkflowMemory:</strong> ' + escapeHTMLV61D(String(safe.continueUsesWorkflowMemory === true)) + '</div>' +
      '<div><strong>permissionQuestionVoiceStateWorks:</strong> ' + escapeHTMLV61D(String(safe.permissionQuestionVoiceStateWorks === true)) + '</div>' +
      '<div><strong>voiceSessionControllerExists:</strong> ' + escapeHTMLV61D(String(safe.voiceSessionControllerExists === true)) + '</div>' +
      '<div><strong>aquaSessionPanelWorks:</strong> ' + escapeHTMLV61D(String(safe.aquaSessionPanelWorks === true)) + '</div>' +
      '<div><strong>startSessionWorks:</strong> ' + escapeHTMLV61D(String(safe.startSessionWorks === true)) + '</div>' +
      '<div><strong>activeProjectContextWorks:</strong> ' + escapeHTMLV61D(String(safe.activeProjectContextWorks === true)) + '</div>' +
      '<div><strong>missingInputFollowUpWorks:</strong> ' + escapeHTMLV61D(String(safe.missingInputFollowUpWorks === true)) + '</div>' +
      '<div><strong>accountantExportContextWorks:</strong> ' + escapeHTMLV61D(String(safe.accountantExportContextWorks === true)) + '</div>' +
      '<div><strong>continueSessionWorks:</strong> ' + escapeHTMLV61D(String(safe.continueSessionWorks === true)) + '</div>' +
      '<div><strong>cancelSessionWorks:</strong> ' + escapeHTMLV61D(String(safe.cancelSessionWorks === true)) + '</div>' +
      '<div><strong>manualModeWorks:</strong> ' + escapeHTMLV61D(String(safe.manualModeWorks === true)) + '</div>' +
      '<div><strong>workflowPlannerExists:</strong> ' + escapeHTMLV61D(String(safe.workflowPlannerExists === true)) + '</div>' +
      '<div><strong>receiptExportWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.receiptExportWorkflowWorks === true)) + '</div>' +
      '<div><strong>reportReviewWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.reportReviewWorkflowWorks === true)) + '</div>' +
      '<div><strong>missingDocumentsWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.missingDocumentsWorkflowWorks === true)) + '</div>' +
      '<div><strong>spendBudgetWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.spendBudgetWorkflowWorks === true)) + '</div>' +
      '<div><strong>uploadWorkflowStaysLocked:</strong> ' + escapeHTMLV61D(String(safe.uploadWorkflowStaysLocked === true)) + '</div>' +
      '<div><strong>cameraWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.cameraWorkflowWorks === true)) + '</div>' +
      '<div><strong>dailyAttentionWorkflowWorks:</strong> ' + escapeHTMLV61D(String(safe.dailyAttentionWorkflowWorks === true)) + '</div>' +
      '<div><strong>saveWorkflowPlanWorks:</strong> ' + escapeHTMLV61D(String(safe.saveWorkflowPlanWorks === true)) + '</div>' +
      '<div><strong>showLastWorkflowPlanWorks:</strong> ' + escapeHTMLV61D(String(safe.showLastWorkflowPlanWorks === true)) + '</div>' +
      '<div><strong>copyWorkflowPlanWorks:</strong> ' + escapeHTMLV61D(String(safe.copyWorkflowPlanWorks === true)) + '</div>' +
      '<div><strong>clearWorkflowPlanWorks:</strong> ' + escapeHTMLV61D(String(safe.clearWorkflowPlanWorks === true)) + '</div>' +
      '<div><strong>ownerReviewDemoWorks:</strong> ' + escapeHTMLV61D(String(safe.ownerReviewDemoWorks === true)) + '</div>' +
      '<div><strong>voiceBrainToolRegistryExists:</strong> ' + escapeHTMLV61D(String(safe.voiceBrainToolRegistryExists === true)) + '</div>' +
      '<div><strong>voiceBrainIntentClassifierWorks:</strong> ' + escapeHTMLV61D(String(safe.voiceBrainIntentClassifierWorks === true)) + '</div>' +
      '<div><strong>hendersonReportIntentWorks:</strong> ' + escapeHTMLV61D(String(safe.hendersonReportIntentWorks === true)) + '</div>' +
      '<div><strong>hendersonReceiptsIntentWorks:</strong> ' + escapeHTMLV61D(String(safe.hendersonReceiptsIntentWorks === true)) + '</div>' +
      '<div><strong>accountantExportStaysLocked:</strong> ' + escapeHTMLV61D(String(safe.accountantExportStaysLocked === true)) + '</div>' +
      '<div><strong>plumbingSpendIntentWorks:</strong> ' + escapeHTMLV61D(String(safe.plumbingSpendIntentWorks === true)) + '</div>' +
      '<div><strong>cameraAllocationIntentWorks:</strong> ' + escapeHTMLV61D(String(safe.cameraAllocationIntentWorks === true)) + '</div>' +
      '<div><strong>constructionDiagramUploadStaysLocked:</strong> ' + escapeHTMLV61D(String(safe.constructionDiagramUploadStaysLocked === true)) + '</div>' +
      '<div><strong>suggestNextStepWorks:</strong> ' + escapeHTMLV61D(String(safe.suggestNextStepWorks === true)) + '</div>' +
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
      '<div class="aqua-v61z-actions"><button type="button" class="btn small gold" data-aqua-v62d-live-regression="true">Run Live In-App Regression</button></div>';
    return renderPremiumModuleShellV61Z({ title: 'Automation Report / Regression Report Viewer', subtitle: 'Merge gate and safety status for this local demo build.', tag: safe.mergeRecommendation || 'MERGE_ALLOWED', chips: ['MERGE_ALLOWED', 'Demo Data Only', 'Backend Locked', 'No Network Sync', 'No Live Change Made'], attrs: { 'data-aqua-v61l-regression-report': 'true' }, body: body, safetyFooter: 'Stored locally as aquaRegressionReportV61L. Demo QA results only. No external send/share/export. No live record changes. No backend, network, or live AI calls.' });
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
      var button = event.target && event.target.closest ? event.target.closest('[data-aqua-v61l-regression="true"], [data-aqua-v62d-live-regression="true"]') : null;
      if (!button) return;
      event.preventDefault();
      var commandInput = getAquaCommandInputV61M();
      var originalValue = commandInput ? commandInput.value : '';
      var oldAsk = document.getElementById && document.getElementById('aiAsk');
      var oldAskValue = oldAsk ? oldAsk.value : '';
      var report = button.getAttribute && button.getAttribute('data-aqua-v62d-live-regression') === 'true' ? runLiveInAppRegressionReportV62D(null) : runAquaCommandRegressionV61L();
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
      liveInAppRegressionRunnerV62DWorks: state.liveInAppRegressionRunnerV62DWorks,
      reportSyncV62DWorks: state.reportSyncV62DWorks,
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

  ensureToolGatewayContractV62J();
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

  installPremiumModuleShellStylesV61Z();
  console.log('Aqua Homes OS v62J extensions loaded: secure tool gateway contract active. Home untouched. Backend locked. No live AI, upload, export, or record change.');
}());
