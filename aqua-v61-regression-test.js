#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');
const crypto = require('crypto');

const VERSION = 'v63E';
const ROOT = __dirname;
const HTML_KEEPER = 'AH_v54I-3.html';
const EXTENSION = 'aqua-v61-extensions.js';
const JSON_REPORT = 'aqua-regression-report.json';
const MD_REPORT = 'aqua-regression-report.md';
const MERGE_ALLOWED = 'MERGE_ALLOWED';
const MERGE_BLOCKED = 'MERGE_BLOCKED';
const REQUIRED_SAFETY_FLAGS = [
  'noBackendCalls',
  'noNetworkCalls',
  'noLiveAIApiCalls',
  'noPayment',
  'noPayroll',
  'noBankSync',
  'noAccountingExport',
  'noCustomerSharingExport',
  'noAudioStorage',
  'noAlwaysListening'
];

const checks = [];
const skipped = [];
const failures = [];
let extensionReport = null;
let browserVisualTest = { status: 'skipped', reason: 'Playwright/browser not available' };

function rel(file) {
  return path.join(ROOT, file);
}

function nowIso() {
  return new Date().toISOString();
}

function runGit(args, fallback = '') {
  try {
    return childProcess.execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (error) {
    return fallback;
  }
}

function addCheck(name, passed, details = {}) {
  const row = { name, passed: Boolean(passed), ...details };
  checks.push(row);
  if (!row.passed) failures.push(row);
  return row.passed;
}

function readFileSafe(file) {
  try {
    return fs.readFileSync(rel(file), 'utf8');
  } catch (error) {
    return '';
  }
}

function fileExists(file) {
  return fs.existsSync(rel(file));
}

function trackedTextFiles() {
  return runGit(['ls-files'], '').split('\n').map((name) => name.trim()).filter(Boolean).filter((name) => {
    const filePath = rel(name);
    try {
      const stat = fs.statSync(filePath);
      if (!stat.isFile() || stat.size > 1024 * 1024) return false;
      const buffer = fs.readFileSync(filePath);
      return !buffer.includes(0);
    } catch (error) {
      return false;
    }
  });
}

function filesWithConflictMarkers() {
  const conflictPattern = /^(<<<<<<<|=======|>>>>>>>) /m;
  return trackedTextFiles().filter((file) => conflictPattern.test(readFileSafe(file)));
}

function hashFileSafe(file) {
  const content = readFileSafe(file);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function requiredSafetyFlagsPass(report) {
  const safetyStatus = report && report.safetyStatus ? report.safetyStatus : {};
  return REQUIRED_SAFETY_FLAGS.every((flag) => safetyStatus[flag] === true);
}

function optionalSafetyGroupsPass(report) {
  const groups = [
    report && report.safety,
    report && report.extensionRegression && report.extensionRegression.safety,
    report && report.extensionRegression && report.extensionRegression.permissionDraftSafety
  ].filter(Boolean);
  return groups.every((group) => Object.values(group).every((value) => value === true));
}

function reportHasConflictMarkers(report) {
  const conflictFiles = report && Array.isArray(report.conflictMarkerFiles) ? report.conflictMarkerFiles : [];
  return report && (report.hasConflictMarkers === true || report.noConflictMarkers === false || conflictFiles.length > 0);
}

function reportHasProtectedVisualRewrite(report) {
  return report && (
    report.protectedVisualFileRewritten === true ||
    report.unexpectedProtectedFileRewrite === true ||
    report.protectedVisualFileUnchanged === false
  );
}

function evaluateAquaMergeGate(report) {
  if (!report || typeof report !== 'object') return MERGE_BLOCKED;

  const failed = Number(report.failed);
  if (!Number.isFinite(failed) || failed > 0) return MERGE_BLOCKED;
  const total = Number(report.total);
  if (!Number.isFinite(total) || total <= 0) return MERGE_BLOCKED;
  if (report.safeToMerge !== true) return MERGE_BLOCKED;
  if (!requiredSafetyFlagsPass(report)) return MERGE_BLOCKED;
  if (!optionalSafetyGroupsPass(report)) return MERGE_BLOCKED;
  if (reportHasConflictMarkers(report)) return MERGE_BLOCKED;
  if (reportHasProtectedVisualRewrite(report)) return MERGE_BLOCKED;

  return MERGE_ALLOWED;
}

function collectGateViolations(report) {
  const gateViolations = [];
  const failed = Number(report && report.failed);
  if (!Number.isFinite(failed)) gateViolations.push('failed count is missing');
  const total = Number(report && report.total);
  if (!Number.isFinite(total) || total <= 0) gateViolations.push('zero tests are invalid');
  if (Number.isFinite(failed) && failed > 0) gateViolations.push('failed > 0');
  if (!report || report.safeToMerge !== true) gateViolations.push('safeToMerge !== true');
  if (!requiredSafetyFlagsPass(report)) gateViolations.push('required safety flags are false');
  if (!optionalSafetyGroupsPass(report)) gateViolations.push('extension safety flags are false');
  if (reportHasConflictMarkers(report)) gateViolations.push('conflict markers exist');
  if (reportHasProtectedVisualRewrite(report)) gateViolations.push('protected visual file appears unexpectedly rewritten');
  if (Number.isFinite(failed) && failed > 0 && (!report || typeof report.repairPrompt !== 'string' || report.repairPrompt.trim().length === 0 || report.repairPrompt === 'No repair needed.')) {
    gateViolations.push('repairPrompt is missing on failure');
  }
  return Array.from(new Set(gateViolations));
}

function makeElement(tagName = 'div') {
  const element = {
    tagName: String(tagName).toUpperCase(),
    id: '',
    className: '',
    value: '',
    textContent: '',
    innerHTML: '',
    children: [],
    parentNode: null,
    style: {},
    attributes: {},
    hidden: false,
    setAttribute(name, value) {
      this.attributes[name] = String(value);
      if (name === 'id') this.id = String(value);
      if (name === 'class') this.className = String(value);
    },
    getAttribute(name) {
      if (name === 'id') return this.id || null;
      if (name === 'class') return this.className || null;
      return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null;
    },
    hasAttribute(name) {
      return Object.prototype.hasOwnProperty.call(this.attributes, name) || (name === 'id' && Boolean(this.id));
    },
    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
      return child;
    },
    removeChild(child) {
      this.children = this.children.filter((item) => item !== child);
      child.parentNode = null;
      return child;
    },
    insertAdjacentHTML(position, html) {
      this.innerHTML = position === 'afterbegin' ? String(html) + this.innerHTML : this.innerHTML + String(html);
    },
    addEventListener() {},
    removeEventListener() {},
    click() {},
    closest() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
  return element;
}

function createSandbox() {
  const storage = new Map();
  const documentElement = makeElement('html');
  const body = makeElement('body');
  documentElement.appendChild(body);
  documentElement.contains = function contains(node) {
    if (!node) return false;
    if (node === documentElement || node === body) return true;
    return body.children.includes(node) || documentElement.children.includes(node);
  };
  const document = {
    readyState: 'complete',
    documentElement,
    body,
    createElement: makeElement,
    addEventListener() {},
    removeEventListener() {},
    getElementById() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
  const localStorage = {
    getItem(key) { return storage.has(String(key)) ? storage.get(String(key)) : null; },
    setItem(key, value) { storage.set(String(key), String(value)); },
    removeItem(key) { storage.delete(String(key)); },
    clear() { storage.clear(); }
  };
  const window = {
    document,
    localStorage,
    console,
    setTimeout: (fn) => { if (typeof fn === 'function') fn(); return 0; },
    clearTimeout() {},
    addEventListener() {},
    removeEventListener() {},
    navigator: {},
    location: { href: `file://${rel(HTML_KEEPER)}` }
  };
  window.window = window;
  window.self = window;
  document.defaultView = window;
  return { window, document, localStorage, console, setTimeout: window.setTimeout, clearTimeout: window.clearTimeout };
}

function checkStaticFiles() {
  const html = readFileSafe(HTML_KEEPER);
  const extension = readFileSafe(EXTENSION);
  const index = readFileSafe('index.html');
  const docsIndex = readFileSafe('docs/index.html');
  addCheck(`${HTML_KEEPER} exists`, fileExists(HTML_KEEPER), { layer: 'static-file-safety', fileToFix: HTML_KEEPER });
  addCheck(`${EXTENSION} exists`, fileExists(EXTENSION), { layer: 'static-file-safety', fileToFix: EXTENSION });
  addCheck(`${HTML_KEEPER} references ${EXTENSION}`, html.includes(EXTENSION), { layer: 'static-file-safety', fileToFix: HTML_KEEPER });
  addCheck('index.html routes to AH_v54I-3.html', /AH_v54I-3\.html/.test(index), { layer: 'static-file-safety', fileToFix: 'index.html' });
  addCheck('docs/index.html routes to AH_v54I-3.html', /AH_v54I-3\.html/.test(docsIndex), { layer: 'static-file-safety', fileToFix: 'docs/index.html' });
  const htmlGitStatus = runGit(['status', '--short', '--', HTML_KEEPER]);
  addCheck(`${HTML_KEEPER} was not rewritten in working tree`, htmlGitStatus === '', { layer: 'static-file-safety', actual: htmlGitStatus || 'unchanged', fileToFix: HTML_KEEPER });
  const conflictFiles = filesWithConflictMarkers();
  addCheck('no conflict markers exist', conflictFiles.length === 0, { layer: 'static-file-safety', actual: conflictFiles, fileToFix: conflictFiles[0] || 'repository files' });
  try {
    childProcess.execFileSync(process.execPath, ['--check', rel(EXTENSION)], { cwd: ROOT, stdio: 'pipe' });
    addCheck(`no syntax errors in ${EXTENSION}`, true, { layer: 'static-file-safety', fileToFix: EXTENSION });
  } catch (error) {
    addCheck(`no syntax errors in ${EXTENSION}`, false, { layer: 'static-file-safety', actual: String(error.stderr || error.message), fileToFix: EXTENSION });
  }
  addCheck('v61R speech readback function exists', /function\s+speakAquaSummaryV61R/.test(extension) && /speechSynthesis/.test(extension), { layer: 'spoken-readback-v61r', fileToFix: EXTENSION });
  addCheck('v61R Speak Summary button exists', /Speak Summary/.test(extension) && /data-aqua-v61r-speak-summary/.test(extension), { layer: 'spoken-readback-v61r', fileToFix: EXTENSION });
  addCheck('v61R Stop Speaking button exists', /Stop Speaking/.test(extension) && /data-aqua-v61r-stop-speaking/.test(extension), { layer: 'spoken-readback-v61r', fileToFix: EXTENSION });
  addCheck('v61R spoken readback uses safe local preference key only', /aquaSpokenReadbackV61R/.test(extension), { layer: 'spoken-readback-v61r', fileToFix: EXTENSION });
  addCheck('v61R spoken readback browser fallback copy exists', /Spoken readback unavailable in this browser\./.test(extension), { layer: 'spoken-readback-v61r', fileToFix: EXTENSION });
  addCheck('v61U automation report command phrase exists', /show automation report/.test(extension), { layer: 'automation-routing-v61t', fileToFix: EXTENSION });
  addCheck('v61U automation routing priority flag exists', /automationCommandRoutesBeforeFallback/.test(extension), { layer: 'automation-routing-v61t', fileToFix: EXTENSION });
  addCheck('v61U show automation report flag exists', /showAutomationReportCommandWorks/.test(extension), { layer: 'automation-routing-v61u', fileToFix: EXTENSION });
  addCheck('v61U Ask AI mode classifier exists', /function\s+classifyAquaAskModeV61U/.test(extension), { layer: 'ask-mode-router-v61u', fileToFix: EXTENSION });
  addCheck('v61U General Ask locked placeholder exists', /General Ask \/ Jobsite Calculator — Locked Foundation/.test(extension), { layer: 'ask-mode-router-v61u', fileToFix: EXTENSION });
  addCheck('v61U noApiKeysInFrontend report flag exists', /noApiKeysInFrontend/.test(extension), { layer: 'ask-mode-router-v61u', fileToFix: EXTENSION });
  addCheck('v62O fuzzy language resolver architecture exists', /window\.AquaFuzzyLanguageV62O/.test(extension) && /function\s+buildAquaFuzzyResolutionV62O/.test(extension) && /Aqua Brain Language Resolver — v62O/.test(extension), { layer: 'fuzzy-language-v62o', fileToFix: EXTENSION });
  addCheck('v62O correction and confidence flags exist', /fuzzyLanguageResolverExists/.test(extension) && /correctionMapWorks/.test(extension) && /confidenceScoringWorks/.test(extension), { layer: 'fuzzy-language-v62o', fileToFix: EXTENSION });
  addCheck('v62P e2e routing matrix architecture exists', /window\.AquaBrainE2ERoutingV62P/.test(extension) && /function\s+getAquaBrainE2ETestMatrixV62P/.test(extension) && /Aqua Brain End-to-End Routing Matrix/.test(extension), { layer: 'e2e-routing-matrix-v62p', fileToFix: EXTENSION });
  addCheck('v62P e2e routing matrix report flags exist', /e2eRoutingMatrixExists/.test(extension) && /allE2ERoutesPass/.test(extension) && /fuzzyToIntentToRouteChainWorks/.test(extension), { layer: 'e2e-routing-matrix-v62p', fileToFix: EXTENSION });
  addCheck('v62Q assistant interface architecture exists', /window\.AquaBrainAssistantInterfaceV62Q/.test(extension) && /function\s+renderAquaBrainAssistantInterfaceV62Q/.test(extension) && /Aqua Brain Assistant — v62Q/.test(extension), { layer: 'assistant-interface-v62q', fileToFix: EXTENSION });
  addCheck('v62Q assistant report flags exist', /assistantInterfaceExists/.test(extension) && /unifiedConversationSurfaceWorks/.test(extension) && /commandUnderstandingPanelWorks/.test(extension), { layer: 'assistant-interface-v62q', fileToFix: EXTENSION });
  addCheck('v62R assistant runtime architecture exists', /window\.AquaBrainAssistantRuntimeV62R/.test(extension) && /function\s+runAquaAssistantTurnV62R/.test(extension) && /Aqua Brain Assistant Runtime QA/.test(extension), { layer: 'assistant-runtime-v62r', fileToFix: EXTENSION });
  addCheck('v62R assistant runtime report flags exist', /assistantRuntimeExists/.test(extension) && /assistantTurnChainWorks/.test(extension) && /workflowFollowUpRuntimeWorks/.test(extension), { layer: 'assistant-runtime-v62r', fileToFix: EXTENSION });
  addCheck('v62S primary assistant interface architecture exists', /Aqua Brain Assistant — v62S/.test(extension) && /data-aqua-v62s-primary-assistant-interface/.test(extension) && /primaryAssistantInterfaceExists/.test(extension) && /aiButtonOpensPrimaryAssistant/.test(extension) && /quickControlsSecondary/.test(extension), { layer: 'primary-assistant-interface-v62s', fileToFix: EXTENSION });
  addCheck('v62T live UX smoke checker architecture exists', /window\.AquaBrainLiveUXSmokeV62T/.test(extension) && /function\s+runAquaBrainLiveUXSmokeV62T/.test(extension) && /Aqua Brain Live UX Smoke Check — v62T/.test(extension), { layer: 'live-ux-smoke-v62t', fileToFix: EXTENSION });
  addCheck('v62T live UX smoke report flags exist', /liveUXSmokeCheckerExists/.test(extension) && /aiEntryOpensAssistant/.test(extension) && /mainInputTargetWorks/.test(extension) && /zeroReportGuardWorks/.test(extension) && /safetyLocksWork/.test(extension), { layer: 'live-ux-smoke-v62t', fileToFix: EXTENSION });
  addCheck('v62U conversation scenario architecture exists', /window\.AquaBrainConversationScenariosV62U/.test(extension) && /function\s+getAquaConversationScenariosV62U/.test(extension) && /Aqua Brain Conversation Scenario Report — v62U/.test(extension), { layer: 'conversation-scenarios-v62u', fileToFix: EXTENSION });
  addCheck('v62U conversation scenario report flags exist', /conversationScenariosExist/.test(extension) && /allConversationScenariosPass/.test(extension) && /hendersonReceiptExportScenarioWorks/.test(extension) && /manualFallbackConversationWorks/.test(extension), { layer: 'conversation-scenarios-v62u', fileToFix: EXTENSION });
  addCheck('v61Z AquaVoiceBrainV61Z architecture exists', /window\.AquaVoiceBrainV61Z|function\s+createAquaVoiceBrainV61Z/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain context key exists', /aquaVoiceBrainContextV61Z/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain tool registry exists', /function\s+voiceBrainToolRegistryV61Z/.test(extension) && /openProjectReport/.test(extension) && /findProjectReceipts/.test(extension) && /prepareAccountantExportDemo/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain mode route exists', /voice_brain_tool_plan/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v62C command center strings exist', (/Aqua Brain Command Center — v62A/.test(extension) || /Aqua Brain Command Center — v62C/.test(extension)) && /aquaVoiceBrainPlansV62A/.test(extension) && /Save Voice Brain Plan/.test(extension) && /Copy Tool Plan Text/.test(extension), { layer: 'voice-brain-v62a', fileToFix: EXTENSION });
  addCheck('v62E AI navigation executor strings exist', /executeAquaVoiceNavigationV62E/.test(extension) && /openAquaModuleForToolV62E/.test(extension) && /focusAquaSectionForToolV62E/.test(extension) && /renderAquaFocusedResultV62E/.test(extension), { layer: 'ai-navigation-v62e', fileToFix: EXTENSION });
  addCheck('v62E focused route marker strings exist', /aqua-v62e-focused-route/.test(extension) && /Focused by Aqua Brain/.test(extension) && /Opened and focused:/.test(extension), { layer: 'ai-navigation-v62e', fileToFix: EXTENSION });
  addCheck('v62D live in-app regression runner strings exist', /runLiveInAppRegressionReportV62D/.test(extension) && /data-aqua-v62d-live-regression/.test(extension) && /aquaRegressionReportSyncV62D/.test(extension), { layer: 'live-in-app-regression-v62d', fileToFix: EXTENSION });
  addCheck('v62L backend boundary architecture exists', /window\.AquaBackendBoundaryV62L|function\s+createAquaBackendBoundaryV62L/.test(extension) && /Aqua Brain Backend Boundary — v62L/.test(extension), { layer: 'backend-boundary-v62l', fileToFix: EXTENSION });
  addCheck('v62L server-only key policy strings exist', /serverOnlyKeyPolicyWorks/.test(extension) && /Frontend must never contain/.test(extension) && /secure backend environment variables/.test(extension), { layer: 'backend-boundary-v62l', fileToFix: EXTENSION });
  addCheck('v62L backend endpoint map strings exist', /backendEndpointMapWorks/.test(extension) && /path: '\/api\/aqua\/voice\/session'|\/api\/aqua\/voice\/session/.test(extension) && /path: '\/api\/aqua\/tools\/execute'|\/api\/aqua\/tools\/execute/.test(extension), { layer: 'backend-boundary-v62l', fileToFix: EXTENSION });

  addCheck('v62M backend schema contract exists', /window\.AquaBackendSchemaV62M|function\s+createAquaBackendSchemaV62M/.test(extension) && /Aqua Brain Data Index Contract — v62M/.test(extension), { layer: 'backend-schema-v62m', fileToFix: EXTENSION });
  addCheck('v62M entity contracts exist', /entityContracts/.test(extension) && /Project \/ Job \/ Property/.test(extension) && /AI Conversation \/ Session Context/.test(extension), { layer: 'backend-schema-v62m', fileToFix: EXTENSION });
  addCheck('v62M relationship and index maps exist', /relationships/.test(extension) && /projectNameIndex/.test(extension) && /receiptIndex/.test(extension) && /undoIndex/.test(extension), { layer: 'backend-schema-v62m', fileToFix: EXTENSION });
  addCheck('v62M Henderson demo index exists', /hendersonDemoIndex/.test(extension) && /Henderson staircase report placeholder/.test(extension) && /accountant export packet placeholder/.test(extension), { layer: 'backend-schema-v62m', fileToFix: EXTENSION });
  addCheck('v62M report flags exist', /backendSchemaExists/.test(extension) && /hendersonDemoIndexWorks/.test(extension) && /exportPacketIndexWorks/.test(extension), { layer: 'backend-schema-v62m', fileToFix: EXTENSION });
  addCheck('v62N data query runtime exists', /window\.AquaDataQueryRuntimeV62N|function\s+createAquaDataQueryRuntimeV62N/.test(extension) && /Aqua Brain Data Query — v62N/.test(extension), { layer: 'data-query-runtime-v62n', fileToFix: EXTENSION });
  addCheck('v62N query runtime flags exist', /dataQueryRuntimeExists/.test(extension) && /projectAliasResolverWorks/.test(extension) && /hendersonExportPacketQueryWorks/.test(extension), { layer: 'data-query-runtime-v62n', fileToFix: EXTENSION });
  addCheck('v62N Aqua Brain control matrix exists', /window\.AquaBrainControlMatrixV62N|function\s+getAquaBrainControlMatrixV62N/.test(extension) && /Aqua Brain Full Interface Map — v62N/.test(extension), { layer: 'brain-control-matrix-v62n', fileToFix: EXTENSION });
  addCheck('v62N Aqua Brain coverage validation flags exist', /brainControlMatrixExists/.test(extension) && /aiInterfaceMapWorks/.test(extension) && /coverageValidationWorks/.test(extension), { layer: 'brain-control-matrix-v62n', fileToFix: EXTENSION });
  addCheck('v62L role permission plan strings exist', /rolePermissionPlanWorks/.test(extension) && /owner_admin/.test(extension) && /field_worker cannot export accounting/.test(extension), { layer: 'backend-boundary-v62l', fileToFix: EXTENSION });
  addCheck('v62F workflow planner architecture exists', /AquaWorkflowPlannerV62F/.test(extension) && /function\s+planAquaWorkflowV62F/.test(extension) && /Aqua Brain Workflow Plan — v62F/.test(extension) && /aquaWorkflowPlansV62F/.test(extension), { layer: 'workflow-planner-v62f', fileToFix: EXTENSION });
  addCheck('v62F workflow report flags exist', /receiptExportWorkflowWorks/.test(extension) && /uploadWorkflowStaysLocked/.test(extension) && /ownerReviewDemoWorks/.test(extension), { layer: 'workflow-planner-v62f', fileToFix: EXTENSION });
  addCheck('v62G workflow memory architecture exists', /AquaWorkflowMemoryV62G/.test(extension) && /function\s+continueAquaWorkflowV62G/.test(extension) && /Aqua Brain Workflow Continuation — v62G/.test(extension) && /aquaActiveWorkflowV62G/.test(extension), { layer: 'workflow-memory-v62g', fileToFix: EXTENSION });
  addCheck('v62G workflow memory report flags exist', /workflowMemoryExists/.test(extension) && /followUpContinuationWorks/.test(extension) && /spendPivotUsesActiveProject/.test(extension), { layer: 'workflow-memory-v62g', fileToFix: EXTENSION });
  addCheck('v62H voice interaction controller exists', /AquaVoiceInteractionV62H/.test(extension) && /function\s+handleAquaVoiceCommandV62H/.test(extension) && /aquaVoiceInteractionV62H/.test(extension), { layer: 'voice-interaction-v62h', fileToFix: EXTENSION });
  addCheck('v62H voice control panel strings exist', /Aqua Brain Voice Control — v62H/.test(extension) && /Current state/.test(extension) && /Manual fallback reason/.test(extension), { layer: 'voice-interaction-v62h', fileToFix: EXTENSION });
  addCheck('v62H voice interaction report flags exist', /voiceInteractionControllerExists/.test(extension) && /voiceStatePanelWorks/.test(extension) && /continueUsesWorkflowMemory/.test(extension), { layer: 'voice-interaction-v62h', fileToFix: EXTENSION });
  addCheck('v61V local Jobsite Calculator parser exists', /function\s+parseLocalJobsiteCalculatorV61V/.test(extension), { layer: 'jobsite-calculator-v61v', fileToFix: EXTENSION });
  addCheck('v61V Concrete Sonotube calculator copy exists', /Jobsite Calculator — Concrete Sonotube/.test(extension), { layer: 'jobsite-calculator-v61v', fileToFix: EXTENSION });
  addCheck('v61V sauna tube normalization support exists', /sauna tube/.test(extension), { layer: 'jobsite-calculator-v61v', fileToFix: EXTENSION });
  addCheck('v61V concreteSonotubeCalculatorWorks report flag exists', /concreteSonotubeCalculatorWorks/.test(extension), { layer: 'jobsite-calculator-v61v', fileToFix: EXTENSION });
  addCheck('v61W Paint Gallons calculator copy exists', /Jobsite Calculator — Paint Gallons/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61W Drywall Sheets calculator copy exists', /Jobsite Calculator — Drywall Sheets/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61W Flooring Square Footage calculator copy exists', /Jobsite Calculator — Flooring Square Footage/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61W Wall Stud Count calculator copy exists', /Jobsite Calculator — Wall Stud Count/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61W Concrete Slab calculator copy exists', /Jobsite Calculator — Concrete Slab/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61W needMoreInformationWorks report flag exists', /needMoreInformationWorks/.test(extension), { layer: 'jobsite-calculator-v61w', fileToFix: EXTENSION });
  addCheck('v61X calculator draft storage key exists', /aquaCalculatorDraftsV61X/.test(extension), { layer: 'calculator-drafts-v61x', fileToFix: EXTENSION });
  addCheck('v61X Save Calculation Draft action exists', /Save Calculation Draft/.test(extension) && /save_calculation_draft_v61x/.test(extension), { layer: 'calculator-drafts-v61x', fileToFix: EXTENSION });
  addCheck('v61X Calculator Drafts panel exists', /Calculator Drafts \/ Estimate Prep — Local Demo/.test(extension), { layer: 'calculator-drafts-v61x', fileToFix: EXTENSION });
  addCheck('v61X Estimate Draft Placeholder lock exists', /Estimate Draft Placeholder/.test(extension) && /Estimate Draft Locked/.test(extension), { layer: 'calculator-drafts-v61x', fileToFix: EXTENSION });
  addCheck('v61Y SOW review queue storage key exists', /aquaSowReviewQueueV61Y/.test(extension), { layer: 'sow-review-queue-v61y', fileToFix: EXTENSION });
  addCheck('v61Y SOW / Estimate Review Queue panel exists', /SOW \/ Estimate Review Queue — Local Demo/.test(extension), { layer: 'sow-review-queue-v61y', fileToFix: EXTENSION });
  addCheck('v61Y Send to SOW Review Queue action exists', /Send to SOW Review Queue/.test(extension) && /send_to_sow_review_queue_v61y/.test(extension), { layer: 'sow-review-queue-v61y', fileToFix: EXTENSION });
  addCheck('v61Y Mark Review Ready Demo action exists', /Mark Review Ready Demo/.test(extension) && /mark_review_ready_demo_v61y/.test(extension), { layer: 'sow-review-queue-v61y', fileToFix: EXTENSION });
  addCheck('v61Y Clear SOW Review Queue Demo action exists', /Clear SOW Review Queue Demo/.test(extension) && /clear_sow_review_queue_demo_v61y/.test(extension), { layer: 'sow-review-queue-v61y', fileToFix: EXTENSION });
  addCheck('v61Z premium module shell helper exists', /function\s+renderPremiumModuleShellV61Z/.test(extension) && /Premium Module Shell/.test(extension), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
  addCheck('v61Z premium module shell report flags exist', /premiumModuleShellWorks/.test(extension) && /openedModulesPolished/.test(extension), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
  addCheck('v61Z premium shell marker class exists', /aqua-v61z-module-shell/.test(extension) && /data-aqua-v61z-premium-module-shell/.test(extension), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
  addCheck('v63A premium module shell namespace exists', /window\.AquaPremiumModuleShellV63A/.test(extension) && /function\s+renderAquaPremiumModuleShellV63A/.test(extension) && /function\s+wrapAquaModulePanelV63A/.test(extension), { layer: 'premium-module-shell-v63a', fileToFix: EXTENSION });
  addCheck('v63A premium module shell markers exist', /aqua-premium-module-shell-v63a/.test(extension) && /data-aqua-module-polished/.test(extension), { layer: 'premium-module-shell-v63a', fileToFix: EXTENSION });
  addCheck('v63A premium module shell report flags exist', /premiumModuleShellExists/.test(extension) && /automationReportPolished/.test(extension) && /receiptsPanelPolished/.test(extension) && /homeDesignUntouched/.test(extension), { layer: 'premium-module-shell-v63a', fileToFix: EXTENSION });
  addCheck('v63B receipt/accounting detail polish commands exist', /show receipt detail polish/.test(extension) && /show accounting detail polish/.test(extension) && /show spend detail polish/.test(extension) && /show polished owner review/.test(extension) && /show accountant export placeholder/.test(extension), { layer: 'premium-module-detail-polish-v63b', fileToFix: EXTENSION });
  addCheck('v63B premium detail card markers exist', /data-aqua-v63b-premium-receipt-card/.test(extension) && /data-aqua-v63b-premium-accounting-card/.test(extension) && /data-aqua-v63b-premium-approval-card/.test(extension) && /data-aqua-v63b-premium-export-card/.test(extension), { layer: 'premium-module-detail-polish-v63b', fileToFix: EXTENSION });
  addCheck('v63B detail polish report flags exist', /receiptDetailPolishWorks/.test(extension) && /accountingDetailPolishWorks/.test(extension) && /premiumReceiptCardsRender/.test(extension) && /accountantExportPlaceholderPolished/.test(extension), { layer: 'premium-module-detail-polish-v63b', fileToFix: EXTENSION });
  addCheck('v63C operational polish commands exist', /show polished SOW/.test(extension) && /show polished field walkthrough/.test(extension) && /show polished evidence binder/.test(extension) && /show polished workers comp/.test(extension) && /show polished project reports/.test(extension), { layer: 'premium-operational-polish-v63c', fileToFix: EXTENSION });
  addCheck('v63C premium operational card markers exist', /data-aqua-v63c-premium-sow-card/.test(extension) && /data-aqua-v63c-premium-field-walkthrough-card/.test(extension) && /data-aqua-v63c-premium-evidence-binder-card/.test(extension) && /data-aqua-v63c-premium-compliance-card/.test(extension), { layer: 'premium-operational-polish-v63c', fileToFix: EXTENSION });
  addCheck('v63C operational polish report flags exist', /sowPolishWorks/.test(extension) && /fieldWalkthroughPolishWorks/.test(extension) && /evidenceBinderPolishWorks/.test(extension) && /workersCompPolishWorks/.test(extension) && /premiumOperationalCardsRender/.test(extension), { layer: 'premium-operational-polish-v63c', fileToFix: EXTENSION });
  addCheck('v63D project portal polish commands exist', /show polished project folders/.test(extension) && /show polished company command/.test(extension) && /show polished customer portal/.test(extension) && /show polished satellite hub/.test(extension) && /show polished data index/.test(extension), { layer: 'premium-project-portal-polish-v63d', fileToFix: EXTENSION });
  addCheck('v63D premium project portal card markers exist', /data-aqua-v63d-premium-project-folder-card/.test(extension) && /data-aqua-v63d-premium-company-command-card/.test(extension) && /data-aqua-v63d-premium-customer-portal-card/.test(extension) && /data-aqua-v63d-premium-satellite-hub-card/.test(extension) && /data-aqua-v63d-premium-data-index-card/.test(extension), { layer: 'premium-project-portal-polish-v63d', fileToFix: EXTENSION });
  addCheck('v63D project portal report flags exist', /projectFoldersPolishWorks/.test(extension) && /companyCommandPolishWorks/.test(extension) && /maintenancePolishWorks/.test(extension) && /satelliteHubPolishWorks/.test(extension) && /dataIndexPanelsCompatible/.test(extension), { layer: 'premium-project-portal-polish-v63d', fileToFix: EXTENSION });
  addCheck('v63E premium module keeper namespace exists', /window\.AquaPremiumModuleKeeperV63E/.test(extension) && /function\s+runAquaPremiumModuleVisualCheckV63E/.test(extension) && /function\s+renderAquaPremiumModuleKeeperPanelV63E/.test(extension), { layer: 'premium-module-keeper-v63e', fileToFix: EXTENSION });
  addCheck('v63E premium module keeper commands exist', /show premium module keeper/.test(extension) && /show module visual keeper/.test(extension) && /run module visual check/.test(extension) && /copy module keeper handoff/.test(extension) && /mark module keeper ready demo/.test(extension), { layer: 'premium-module-keeper-v63e', fileToFix: EXTENSION });
  addCheck('v63E premium module keeper report flags exist', /premiumModuleKeeperExists/.test(extension) && /moduleVisualKeeperPanelWorks/.test(extension) && /premiumShellCoverageWorks/.test(extension) && /moduleKeeperHandoffWorks/.test(extension), { layer: 'premium-module-keeper-v63e', fileToFix: EXTENSION });
  addCheck('v63E premium module keeper storage key exists', /aquaPremiumModuleKeeperV63E/.test(extension), { layer: 'premium-module-keeper-v63e', fileToFix: EXTENSION });
  addCheck('v62V-A natural response namespace exists', /window\.AquaNaturalResponsesV62VA/.test(extension), { layer: 'natural-responses-v62va', fileToFix: EXTENSION });
  addCheck('v62V-A natural response helpers exist', /function\s+buildAquaGreetingV62VA/.test(extension) && /function\s+buildAquaReadyPromptV62VA/.test(extension) && /function\s+buildAquaCorrectionPhraseV62VA/.test(extension) && /function\s+buildAquaManualFallbackPhraseV62VA/.test(extension), { layer: 'natural-responses-v62va', fileToFix: EXTENSION });
  addCheck('v62V-A natural response report flags exist', /naturalResponseTemplatesExist/.test(extension) && /responseTemplateSmokeWorks/.test(extension), { layer: 'natural-responses-v62va', fileToFix: EXTENSION });
  addCheck('v62V-C phone copy helper namespace exists', /window\.AquaAssistantPhoneCopyV62VC/.test(extension) && /window\.AquaNaturalResponseIntegrationV62VB/.test(extension), { layer: 'natural-response-integration-v62vb', fileToFix: EXTENSION });
  addCheck('v62V-C phone copy and natural response helpers exist', /function\s+applyAquaPhoneCopyV62VC/.test(extension) && /function\s+buildAquaPhoneReadyCopyV62VC/.test(extension) && /function\s+buildAquaPhoneManualFallbackCopyV62VC/.test(extension) && /function\s+applyAquaNaturalResponseToAssistantV62VB/.test(extension), { layer: 'natural-response-integration-v62vb', fileToFix: EXTENSION });
  addCheck('v62V-C phone copy report flags exist', /phoneCopyHelperExists/.test(extension) && /liveAssistantCopySmokeWorks/.test(extension) && /naturalResponseIntegrationExists/.test(extension), { layer: 'natural-response-integration-v62vb', fileToFix: EXTENSION });
  addCheck('v62V-D assistant surface polish namespace exists', /window\.AquaAssistantSurfacePolishV62VD/.test(extension) && /function\s+applyAquaAssistantSurfacePolishV62VD/.test(extension), { layer: 'assistant-surface-polish-v62vd', fileToFix: EXTENSION });
  addCheck('v62V-D compact assistant shell helpers exist', /function\s+renderAquaCompactAssistantShellV62VD/.test(extension) && /function\s+renderAquaCompactStatusStripV62VD/.test(extension) && /function\s+renderAquaCompactCommandAreaV62VD/.test(extension) && /function\s+renderAquaCompactResponseAreaV62VD/.test(extension) && /function\s+renderAquaCompactSuggestionsV62VD/.test(extension) && /function\s+renderAquaSecondaryControlsV62VD/.test(extension) && /function\s+renderAquaSafetyStripV62VD/.test(extension), { layer: 'assistant-surface-polish-v62vd', fileToFix: EXTENSION });
  addCheck('v62V-D compact control group labels exist', /Manual Controls/.test(extension) && /Quick App Routes/.test(extension) && /Automation \/ QA/.test(extension) && /Run Regression QA/.test(extension), { layer: 'assistant-surface-polish-v62vd', fileToFix: EXTENSION });
  addCheck('v62W assistant acceptance namespace exists', /window\.AquaAssistantAcceptanceV62W/.test(extension) && /function\s+runAquaAssistantAcceptanceChecklistV62W/.test(extension), { layer: 'assistant-acceptance-v62w', fileToFix: EXTENSION });
  addCheck('v62W acceptance checklist render exists', /Aqua Brain Assistant Acceptance Checklist — v62W/.test(extension) && /function\s+renderAquaAssistantAcceptanceChecklistV62W/.test(extension), { layer: 'assistant-acceptance-v62w', fileToFix: EXTENSION });
  addCheck('v62W acceptance report flags exist', /assistantAcceptanceChecklistExists/.test(extension) && /keeperRecommendationWorks/.test(extension) && /aquaAssistantAcceptanceV62W/.test(extension), { layer: 'assistant-acceptance-v62w', fileToFix: EXTENSION });
  addCheck('v62X keeper recovery namespace exists', /window\.AquaBrainKeeperV62X/.test(extension) && /function\s+getAquaBrainKeeperStatusV62X/.test(extension) && /function\s+renderAquaBrainRecoveryHandoffV62X/.test(extension), { layer: 'keeper-recovery-v62x', fileToFix: EXTENSION });
  addCheck('v62X keeper panel copy exists', /Aqua Brain Keeper \/ Recovery Handoff — v62X/.test(extension) && /Aqua Homes OS v62X Keeper Handoff/.test(extension), { layer: 'keeper-recovery-v62x', fileToFix: EXTENSION });
  addCheck('v62X keeper report flags exist', /keeperStatusExists/.test(extension) && /recoveryHandoffWorks/.test(extension) && /keeperManifestWorks/.test(extension), { layer: 'keeper-recovery-v62x', fileToFix: EXTENSION });
  addCheck('v62Y backend readiness namespace exists', /window\.AquaBackendReadinessV62Y/.test(extension) && /function\s+getAquaBackendReadinessPlanV62Y/.test(extension) && /function\s+renderAquaBackendReadinessPanelV62Y/.test(extension), { layer: 'backend-readiness-v62y', fileToFix: EXTENSION });
  addCheck('v62Y backend readiness panel copy exists', /Aqua Brain Backend Readiness — v62Y/.test(extension) && /local\/demo only/.test(extension) && /backend not connected/.test(extension), { layer: 'backend-readiness-v62y', fileToFix: EXTENSION });
  addCheck('v62Y connector map fields exist', /connectorName/.test(extension) && /futureBackendEndpointPlaceholder/.test(extension) && /frontendExecutionAllowed/.test(extension) && /currentStatus: 'planning_only'/.test(extension), { layer: 'backend-readiness-v62y', fileToFix: EXTENSION });
  addCheck('v62Y backend readiness report flags exist', /backendReadinessExists/.test(extension) && /connectorMapWorks/.test(extension) && /backendGapReportWorks/.test(extension) && /backendConnectionOrderWorks/.test(extension), { layer: 'backend-readiness-v62y', fileToFix: EXTENSION });
  addCheck('v62Z phase keeper namespace exists', /window\.AquaBrainPhaseKeeperV62Z/.test(extension) && /function\s+getAquaBrainPhaseKeeperV62Z/.test(extension) && /function\s+renderAquaBrainPhaseKeeperV62Z/.test(extension), { layer: 'phase-keeper-v62z', fileToFix: EXTENSION });
  addCheck('v62Z phase keeper panel copy exists', /Aqua Brain AI\/Backend Keeper Lock — v62Z/.test(extension) && /Aqua Homes OS v62Z Keeper Handoff/.test(extension) && /Option B — Premium Module Visual Polish/.test(extension), { layer: 'phase-keeper-v62z', fileToFix: EXTENSION });
  addCheck('v62Z phase keeper report flags exist', /phaseKeeperExists/.test(extension) && /keeperLockPanelWorks/.test(extension) && /keeperManifestWorks/.test(extension) && /recommendedNextPhaseWorks/.test(extension), { layer: 'phase-keeper-v62z', fileToFix: EXTENSION });
}

function runExtensionRegression() {
  try {
    const code = readFileSafe(EXTENSION);
    const sandbox = createSandbox();
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: EXTENSION });
    const api = sandbox.window.AquaV61Extensions;
    addCheck('AquaV61Extensions exists', Boolean(api), { layer: 'extension-regression', fileToFix: EXTENSION });
    addCheck('runAquaCommandRegressionV61L exists', Boolean(api && typeof api.runAquaCommandRegressionV61L === 'function'), { layer: 'extension-regression', fileToFix: EXTENSION });
    if (!api || typeof api.runAquaCommandRegressionV61L !== 'function') return;
    extensionReport = api.runAquaCommandRegressionV61L();
    addCheck('extension regression produced total tests', Number(extensionReport.total) > 0, { layer: 'extension-regression', actual: extensionReport.total, fileToFix: EXTENSION });
    addCheck('extension regression passed count present', Number.isFinite(Number(extensionReport.passed)), { layer: 'extension-regression', actual: extensionReport.passed, fileToFix: EXTENSION });
    addCheck('extension regression failed count present', Number.isFinite(Number(extensionReport.failed)), { layer: 'extension-regression', actual: extensionReport.failed, fileToFix: EXTENSION });
    addCheck('extension regression has failed command names', Array.isArray(extensionReport.failedCommands) || Array.isArray(extensionReport.failures), { layer: 'extension-regression', fileToFix: EXTENSION });
    addCheck('extension regression has repairPrompt', typeof extensionReport.repairPrompt === 'string' && extensionReport.repairPrompt.length > 0, { layer: 'extension-regression', fileToFix: EXTENSION });
    addCheck('extension regression has repairPrompt when failures exist', Number(extensionReport.failed) === 0 || (typeof extensionReport.repairPrompt === 'string' && extensionReport.repairPrompt.trim().length > 0 && extensionReport.repairPrompt !== 'No repair needed.'), { layer: 'extension-regression', actual: extensionReport.repairPrompt, fileToFix: EXTENSION });
    addCheck('extension regression safety flags pass', extensionReport.safety && Object.values(extensionReport.safety).every((value) => value === true), { layer: 'extension-regression', actual: extensionReport.safety, fileToFix: EXTENSION });

    addCheck('v62V-A naturalResponseTemplatesExist is true', extensionReport.naturalResponseTemplatesExist === true, { layer: 'natural-responses-v62va', actual: extensionReport.naturalResponseTemplatesExist, fileToFix: EXTENSION });
    addCheck('v62V-A greetingResponseWorks is true', extensionReport.greetingResponseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.greetingResponseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A readyPromptWorks is true', extensionReport.readyPromptWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.readyPromptWorks, fileToFix: EXTENSION });
    addCheck('v62V-A correctionPhraseWorks is true', extensionReport.correctionPhraseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.correctionPhraseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A openingPhraseWorks is true', extensionReport.openingPhraseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.openingPhraseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A lockedActionPhraseWorks is true', extensionReport.lockedActionPhraseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.lockedActionPhraseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A missingInfoPhraseWorks is true', extensionReport.missingInfoPhraseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.missingInfoPhraseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A manualFallbackPhraseWorks is true', extensionReport.manualFallbackPhraseWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.manualFallbackPhraseWorks, fileToFix: EXTENSION });
    addCheck('v62V-A automationReportStillWorks is true', extensionReport.automationReportStillWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.automationReportStillWorks, fileToFix: EXTENSION });
    addCheck('v62V-A unknownFallbackStillWorks is true', extensionReport.unknownFallbackStillWorks === true, { layer: 'natural-responses-v62va', actual: extensionReport.unknownFallbackStillWorks, fileToFix: EXTENSION });

    addCheck('v62M extension backend schema exists', extensionReport.backendSchemaExists === true, { layer: 'backend-schema-v62m', actual: extensionReport.backendSchemaExists, fileToFix: EXTENSION });
    addCheck('v62M entity contracts exist in extension report', extensionReport.entityContractsExist === true, { layer: 'backend-schema-v62m', actual: extensionReport.entityContractsExist, fileToFix: EXTENSION });
    addCheck('v62M relationship map works', extensionReport.relationshipMapWorks === true, { layer: 'backend-schema-v62m', actual: extensionReport.relationshipMapWorks, fileToFix: EXTENSION });
    addCheck('v62M index maps work', extensionReport.indexMapsWork === true, { layer: 'backend-schema-v62m', actual: extensionReport.indexMapsWork, fileToFix: EXTENSION });
    addCheck('v62M Henderson demo index works', extensionReport.hendersonDemoIndexWorks === true, { layer: 'backend-schema-v62m', actual: extensionReport.hendersonDemoIndexWorks, fileToFix: EXTENSION });
    ['receiptIndexWorks','reportIndexWorks','spendIndexWorks','missingDocumentIndexWorks','cameraAllocationIndexWorks','approvalIndexWorks','exportPacketIndexWorks'].forEach((flag) => addCheck(`v62M ${flag}`, extensionReport[flag] === true, { layer: 'backend-schema-v62m', actual: extensionReport[flag], fileToFix: EXTENSION }));
    addCheck('extension regression has zero failures', Number(extensionReport.failed) === 0, { layer: 'extension-regression', actual: extensionReport.failed, fileToFix: EXTENSION });
    addCheck('extension regression safeToMerge is true', extensionReport.safeToMerge === true, { layer: 'extension-regression', actual: extensionReport.safeToMerge, fileToFix: EXTENSION });
    addCheck('extension regression version is v63E', extensionReport.version === 'v63E', { layer: 'extension-regression', actual: extensionReport.version, fileToFix: EXTENSION });
    ['brainControlMatrixExists','aiInterfaceMapWorks','moduleCoverageWorks','workflowCoverageWorks','voiceCoverageWorks','visualRouteCoverageWorks','readbackCoverageWorks','permissionGateCoverageWorks','manualFallbackCoverageWorks','backendReadinessCoverageWorks','coverageValidationWorks'].forEach((flag) => addCheck(`v62N control matrix ${flag}`, extensionReport[flag] === true, { layer: 'brain-control-matrix-v62n', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['dataQueryRuntimeExists','queryNormalizerWorks','projectAliasResolverWorks','hendersonReportQueryWorks','hendersonStaircaseQueryWorks','hendersonHomeDepotReceiptQueryWorks','hendersonPlumbingSpendQueryWorks','hendersonMissingDocumentsQueryWorks','hendersonCameraQueryWorks','hendersonApprovalQueryWorks','hendersonExportPacketQueryWorks','visualRoutesGeneratedForQueries','spokenSummariesGeneratedForQueries'].forEach((flag) => addCheck(`v62N ${flag}`, extensionReport[flag] === true, { layer: 'data-query-runtime-v62n', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['fuzzyLanguageResolverExists','correctionMapWorks','confidenceScoringWorks','receiptMishearCorrectionWorks','draftQueueMishearCorrectionWorks','sonotubeMishearCorrectionWorks','hendersonProjectMishearCorrectionWorks','homeDepotMishearCorrectionWorks','plumbingMishearCorrectionWorks','accountantExportMishearCorrectionWorks','sowScopeMishearCorrectionWorks','payablesAliasWorks','approvalAliasWorks','clarificationForAmbiguousCommandWorks','automationCommandsStillRouteFirst'].forEach((flag) => addCheck(`v62O ${flag}`, extensionReport[flag] === true, { layer: 'fuzzy-language-v62o', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['e2eRoutingMatrixExists','e2eRoutingMatrixRuns','allE2ERoutesPass','fuzzyToIntentToRouteChainWorks','workflowChainWorks','sessionChainWorks','visualFocusChainWorks','readbackChainWorks','permissionGateChainWorks','automationRoutePriorityWorks','unknownFallbackStillWorks','clarificationPathWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62P ${flag}`, extensionReport[flag] === true, { layer: 'e2e-routing-matrix-v62p', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['assistantRuntimeExists','assistantTurnChainWorks','assistantSurfaceUpdatesWork','commandUnderstandingUpdatesWork','currentFocusUpdatesWork','responseDraftUpdatesWork','permissionSummaryUpdatesWork','nextSuggestionsUpdateWork','workflowFollowUpRuntimeWorks','sessionFollowUpRuntimeWorks','manualFallbackRuntimeWorks','automationPriorityStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62R ${flag}`, extensionReport[flag] === true, { layer: 'assistant-runtime-v62r', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['liveUXSmokeCheckerExists','aiEntryOpensAssistant','primaryAssistantSurfaceWorks','mainInputTargetWorks','assistantTurnSmokeWorks','manualFallbackWorks','voiceSafetyWorks','automationReportSmokeWorks','regressionQaSmokeWorks','zeroReportGuardWorks','safetyLocksWork','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62T ${flag}`, extensionReport[flag] === true, { layer: 'live-ux-smoke-v62t', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['conversationScenariosExist','conversationScenarioRunnerWorks','allConversationScenariosPass','hendersonReceiptExportScenarioWorks','hendersonReportReviewScenarioWorks','spendBudgetScenarioWorks','cameraPhotoScenarioWorks','uploadDiagramScenarioStaysLocked','voiceMishearConversationWorks','missingInputClarificationScenarioWorks','manualFallbackConversationWorks','responseQualityTemplatesWork','contextContinuityWorks','visualRoutesOpenDuringScenarios','permissionGatesShowDuringScenarios','fuzzyCorrectionsWorkInsideConversations','readbackRepeatWorks','followUpQuestionsWork','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62U ${flag}`, extensionReport[flag] === true, { layer: 'conversation-scenarios-v62u', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['phoneCopyHelperExists','readyPhoneCopyWorks','listeningPhoneCopyWorks','thinkingPhoneCopyWorks','openingPhoneCopyWorks','focusedPhoneCopyWorks','permissionPhoneCopyWorks','manualFallbackPhoneCopyWorks','missingInfoPhoneCopyWorks','liveAssistantCopySmokeWorks','automationReportStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v62V-C ${flag}`, extensionReport[flag] === true, { layer: 'phone-copy-v62vc', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['assistantSurfacePolishExists','compactAssistantShellWorks','compactStatusStripWorks','compactCommandAreaWorks','compactResponseAreaWorks','compactSuggestionsWork','secondaryControlsGrouped','automationControlsGrouped','manualControlsGrouped','safetyStripWorks','inputTargetingStillCorrect','assistantTurnStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v62V-D ${flag}`, extensionReport[flag] === true, { layer: 'assistant-surface-polish-v62vd', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['assistantAcceptanceChecklistExists','aiEntryAcceptanceWorks','primaryAssistantSurfaceAcceptanceWorks','commandInputAcceptanceWorks','fuzzyUnderstandingAcceptanceWorks','visualRouteAcceptanceWorks','readbackAcceptanceWorks','workflowContinuationAcceptanceWorks','permissionGateAcceptanceWorks','manualVoiceFallbackAcceptanceWorks','automationAcceptanceWorks','keeperRecommendationWorks','zeroReportGuardStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v62W ${flag}`, extensionReport[flag] === true, { layer: 'assistant-acceptance-v62w', actual: extensionReport[flag], fileToFix: EXTENSION }));
    addCheck('v62W keeper ready demo flag is true', extensionReport.aquaBrainKeeperReadyDemo === true, { layer: 'assistant-acceptance-v62w', actual: extensionReport.aquaBrainKeeperReadyDemo, fileToFix: EXTENSION });
    ['noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v62W safety ${flag}`, extensionReport[flag] === true, { layer: 'assistant-acceptance-v62w', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['keeperStatusExists','recoveryHandoffWorks','keeperManifestWorks','keeperCheckWorks','copyKeeperHandoffWorks','nextPhasePlanWorks','protectedVisualKeeperStillAHv54I3','aquaBrainPrimaryInterfaceLocked','liveActionsStillLocked','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v62X ${flag}`, extensionReport[flag] === true, { layer: 'keeper-recovery-v62x', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v62X safety ${flag}`, extensionReport[flag] === true, { layer: 'keeper-recovery-v62x', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['backendReadinessExists','connectorMapWorks','backendGapReportWorks','backendConnectionOrderWorks','backendNextStepPlanWorks','liveDataQuestionStaysLocked','exportConnectionQuestionStaysLocked','connectorPermissionsMapped','connectorRiskLevelsMapped','frontendExecutionBlockedForConnectors','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v62Y ${flag}`, extensionReport[flag] === true, { layer: 'backend-readiness-v62y', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62Y safety ${flag}`, extensionReport[flag] === true, { layer: 'backend-readiness-v62y', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['naturalResponseIntegrationExists','assistantSurfaceNaturalCopyWorks','correctionNaturalCopyWorks','openingFocusNaturalCopyWorks','lockedActionNaturalCopyWorks','missingInfoNaturalCopyWorks','manualFallbackNaturalCopyWorks'].forEach((flag) => addCheck(`v62V-B ${flag}`, extensionReport[flag] === true, { layer: 'natural-response-integration-v62vb', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['primaryAssistantInterfaceExists','aiButtonOpensPrimaryAssistant','mainCommandInputWorks','inputTargetingStillCorrect','quickControlsSecondary','manualControlsWork','commandUnderstandingStillWorks','currentFocusStillWorks','responseDraftStillWorks','nextSuggestionsStillWork','permissionSummaryStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening','noRealCustomerData'].forEach((flag) => addCheck(`v62S ${flag}`, extensionReport[flag] === true, { layer: 'primary-assistant-interface-v62s', actual: extensionReport[flag], fileToFix: EXTENSION }));
    addCheck('v62L backendBoundaryExists is true', extensionReport.backendBoundaryExists === true, { layer: 'backend-boundary-v62l', actual: extensionReport.backendBoundaryExists, fileToFix: EXTENSION });
    addCheck('v62L serverOnlyKeyPolicyWorks is true', extensionReport.serverOnlyKeyPolicyWorks === true, { layer: 'backend-boundary-v62l', actual: extensionReport.serverOnlyKeyPolicyWorks, fileToFix: EXTENSION });
    addCheck('v62L backendEndpointMapWorks is true', extensionReport.backendEndpointMapWorks === true, { layer: 'backend-boundary-v62l', actual: extensionReport.backendEndpointMapWorks, fileToFix: EXTENSION });
    addCheck('v62L rolePermissionPlanWorks is true', extensionReport.rolePermissionPlanWorks === true, { layer: 'backend-boundary-v62l', actual: extensionReport.rolePermissionPlanWorks, fileToFix: EXTENSION });
    addCheck('v62L voiceRealtimeBoundaryWorks is true', extensionReport.voiceRealtimeBoundaryWorks === true, { layer: 'backend-boundary-v62l', actual: extensionReport.voiceRealtimeBoundaryWorks, fileToFix: EXTENSION });
    addCheck('v62L deploymentChecklistWorks is true', extensionReport.deploymentChecklistWorks === true, { layer: 'backend-boundary-v62l', actual: extensionReport.deploymentChecklistWorks, fileToFix: EXTENSION });
    addCheck('v62L OpenAI key question stays locked', extensionReport.openAiKeyQuestionStaysLocked === true, { layer: 'backend-boundary-v62l', actual: extensionReport.openAiKeyQuestionStaysLocked, fileToFix: EXTENSION });
    addCheck('v62L ChatGPT connection question stays locked', extensionReport.chatgptConnectionQuestionStaysLocked === true, { layer: 'backend-boundary-v62l', actual: extensionReport.chatgptConnectionQuestionStaysLocked, fileToFix: EXTENSION });
    addCheck('v62L live voice question stays locked', extensionReport.liveVoiceQuestionStaysLocked === true, { layer: 'backend-boundary-v62l', actual: extensionReport.liveVoiceQuestionStaysLocked, fileToFix: EXTENSION });
    addCheck('premiumModuleShellWorks is true', extensionReport.premiumModuleShellWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.premiumModuleShellWorks, fileToFix: EXTENSION });
    addCheck('openedModulesPolished is true', extensionReport.openedModulesPolished === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.openedModulesPolished, fileToFix: EXTENSION });
    addCheck('homeDesignUntouched is true', extensionReport.homeDesignUntouched === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.homeDesignUntouched, fileToFix: EXTENSION });
    addCheck('routingStillWorks is true', extensionReport.routingStillWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.routingStillWorks, fileToFix: EXTENSION });
    addCheck('automationStillWorks is true', extensionReport.automationStillWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.automationStillWorks, fileToFix: EXTENSION });
    ['premiumModuleShellExists','premiumModuleShellRenders','automationReportPolished','receiptsPanelPolished','accountingPanelPolished','missingDocumentsPanelPolished','permissionGatePolished','aquaBrainPanelsCompatible','modulePolishMarkersExist','homeDesignUntouched','aiRoutingStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v63A ${flag}`, extensionReport[flag] === true, { layer: 'premium-module-shell-v63a', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['sowPolishWorks','sowReviewQueuePolishWorks','fieldWalkthroughPolishWorks','evidenceBinderPolishWorks','insurancePanelPolishWorks','bankReconciliationPolishWorks','workersCompPolishWorks','subcontractorCompliancePolishWorks','projectReportsPolishWorks','missingDocumentsPolishWorks','premiumOperationalCardsRender','v63AShellStillWorks','v63BDetailPolishStillWorks','homeDesignUntouched','aiRoutingStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v63C ${flag}`, extensionReport[flag] === true, { layer: 'premium-operational-polish-v63c', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['premiumModuleKeeperExists','moduleVisualKeeperPanelWorks','premiumShellCoverageWorks','businessModuleCoverageWorks','operationalModuleCoverageWorks','portalFileCabinetCoverageWorks','aquaBrainCompatibilityWorks','visualConsistencyChecklistWorks','missingPolishReportWorks','keeperRecommendationWorks','moduleKeeperHandoffWorks','homeDesignUntouched','aiRoutingStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v63E ${flag}`, extensionReport[flag] === true, { layer: 'premium-module-keeper-v63e', actual: extensionReport[flag], fileToFix: EXTENSION }));
    ['projectFoldersPolishWorks','fileCabinetPolishWorks','companyCommandPolishWorks','customerPortalPolishWorks','investorPortalPolishWorks','maintenancePolishWorks','hvacPolishWorks','technicianServicePolishWorks','satelliteHubPolishWorks','notificationsPolishWorks','dataIndexPanelsCompatible','premiumPortalCardsRender','v63AShellStillWorks','v63BDetailPolishStillWorks','v63COperationalPolishStillWorks','homeDesignUntouched','aiRoutingStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks','noBackendCalls','noNetworkCalls','noExternalAIAPICalls','noApiKeysInFrontend','noLiveRecordChanges','noAudioStorage','noAlwaysListening'].forEach((flag) => addCheck(`v63D ${flag}`, extensionReport[flag] === true, { layer: 'premium-project-portal-polish-v63d', actual: extensionReport[flag], fileToFix: EXTENSION }));
    addCheck('extension regression includes spoken readback availability or fallback flag', extensionReport.spokenReadbackAvailable === true || extensionReport.spokenReadbackBrowserUnavailableFallback === true, { layer: 'spoken-readback-v61r', actual: { available: extensionReport.spokenReadbackAvailable, fallback: extensionReport.spokenReadbackBrowserUnavailableFallback }, fileToFix: EXTENSION });
    addCheck('extension regression spoken preference key is aquaSpokenReadbackV61R', extensionReport.spokenReadbackPreferenceKey === 'aquaSpokenReadbackV61R', { layer: 'spoken-readback-v61r', actual: extensionReport.spokenReadbackPreferenceKey, fileToFix: EXTENSION });
    addCheck('automationCommandRoutesBeforeFallback is true', extensionReport.automationCommandRoutesBeforeFallback === true, { layer: 'automation-routing-v61t', actual: extensionReport.automationCommandRoutesBeforeFallback, fileToFix: EXTENSION });
    addCheck('showAutomationReportCommandWorks is true', extensionReport.showAutomationReportCommandWorks === true, { layer: 'automation-routing-v61t', actual: extensionReport.showAutomationReportCommandWorks, fileToFix: EXTENSION });
    addCheck('runRegressionQaCommandWorks is true', extensionReport.runRegressionQaCommandWorks === true, { layer: 'automation-routing-v61t', actual: extensionReport.runRegressionQaCommandWorks, fileToFix: EXTENSION });
    addCheck('automationCommandsDoNotFallback is true', extensionReport.automationCommandsDoNotFallback === true, { layer: 'automation-routing-v61u', actual: extensionReport.automationCommandsDoNotFallback, fileToFix: EXTENSION });
    addCheck('askModeRouterWorks is true', extensionReport.askModeRouterWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.askModeRouterWorks, fileToFix: EXTENSION });
    addCheck('appNavigationModeWorks is true', extensionReport.appNavigationModeWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.appNavigationModeWorks, fileToFix: EXTENSION });
    addCheck('automationStatusModeWorks is true', extensionReport.automationStatusModeWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.automationStatusModeWorks, fileToFix: EXTENSION });
    addCheck('permissionedActionModeWorks is true', extensionReport.permissionedActionModeWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.permissionedActionModeWorks, fileToFix: EXTENSION });
    addCheck('generalAskLockedWorks is true', extensionReport.generalAskLockedWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.generalAskLockedWorks, fileToFix: EXTENSION });
    addCheck('jobsiteCalculatorWorks is true', extensionReport.jobsiteCalculatorWorks === true, { layer: 'jobsite-calculator-v61v', actual: extensionReport.jobsiteCalculatorWorks, fileToFix: EXTENSION });
    addCheck('concreteSonotubeCalculatorWorks is true', extensionReport.concreteSonotubeCalculatorWorks === true, { layer: 'jobsite-calculator-v61v', actual: extensionReport.concreteSonotubeCalculatorWorks, fileToFix: EXTENSION });
    addCheck('paintCalculatorWorks is true', extensionReport.paintCalculatorWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.paintCalculatorWorks, fileToFix: EXTENSION });
    addCheck('drywallCalculatorWorks is true', extensionReport.drywallCalculatorWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.drywallCalculatorWorks, fileToFix: EXTENSION });
    addCheck('flooringCalculatorWorks is true', extensionReport.flooringCalculatorWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.flooringCalculatorWorks, fileToFix: EXTENSION });
    addCheck('studCalculatorWorks is true', extensionReport.studCalculatorWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.studCalculatorWorks, fileToFix: EXTENSION });
    addCheck('concreteSlabCalculatorWorks is true', extensionReport.concreteSlabCalculatorWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.concreteSlabCalculatorWorks, fileToFix: EXTENSION });
    addCheck('needMoreInformationWorks is true', extensionReport.needMoreInformationWorks === true, { layer: 'jobsite-calculator-v61w', actual: extensionReport.needMoreInformationWorks, fileToFix: EXTENSION });
    addCheck('calculatorDraftsWork is true', extensionReport.calculatorDraftsWork === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.calculatorDraftsWork, fileToFix: EXTENSION });
    addCheck('saveCalculationDraftWorks is true', extensionReport.saveCalculationDraftWorks === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.saveCalculationDraftWorks, fileToFix: EXTENSION });
    addCheck('showSavedCalculationsWorks is true', extensionReport.showSavedCalculationsWorks === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.showSavedCalculationsWorks, fileToFix: EXTENSION });
    addCheck('clearSavedCalculationsWorks is true', extensionReport.clearSavedCalculationsWorks === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.clearSavedCalculationsWorks, fileToFix: EXTENSION });
    addCheck('addToEstimateDraftLockedWorks is true', extensionReport.addToEstimateDraftLockedWorks === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.addToEstimateDraftLockedWorks, fileToFix: EXTENSION });
    addCheck('noLiveEstimateCreated is true', extensionReport.noLiveEstimateCreated === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.noLiveEstimateCreated, fileToFix: EXTENSION });
    addCheck('noCustomerExport is true', extensionReport.noCustomerExport === true, { layer: 'calculator-drafts-v61x', actual: extensionReport.noCustomerExport, fileToFix: EXTENSION });
    addCheck('8 inch / 4 foot / 80 lb returns 3 recommended bags', extensionReport.sonotubeEightInchFourFoot80lbReturnsThreeBags === true, { layer: 'jobsite-calculator-v61v', actual: extensionReport.sonotubeEightInchFourFoot80lbReturnsThreeBags, fileToFix: EXTENSION });
    addCheck('sauna tube normalizes to Sonotube', extensionReport.saunaTubeNormalizesToSonotube === true, { layer: 'jobsite-calculator-v61v', actual: extensionReport.saunaTubeNormalizesToSonotube, fileToFix: EXTENSION });
    addCheck('unsupported General Ask remains locked', extensionReport.unsupportedGeneralAskRemainsLocked === true, { layer: 'jobsite-calculator-v61v', actual: extensionReport.unsupportedGeneralAskRemainsLocked, fileToFix: EXTENSION });
    addCheck('unknownFallbackWorks is true', extensionReport.unknownFallbackWorks === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.unknownFallbackWorks, fileToFix: EXTENSION });
    addCheck('phaseKeeperExists is true', extensionReport.phaseKeeperExists === true, { layer: 'phase-keeper-v62z', actual: extensionReport.phaseKeeperExists, fileToFix: EXTENSION });
    addCheck('keeperLockPanelWorks is true', extensionReport.keeperLockPanelWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.keeperLockPanelWorks, fileToFix: EXTENSION });
    addCheck('keeperManifestWorks is true', extensionReport.keeperManifestWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.keeperManifestWorks, fileToFix: EXTENSION });
    addCheck('phaseHandoffWorks is true', extensionReport.phaseHandoffWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.phaseHandoffWorks, fileToFix: EXTENSION });
    addCheck('copyPhaseHandoffWorks is true', extensionReport.copyPhaseHandoffWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.copyPhaseHandoffWorks, fileToFix: EXTENSION });
    addCheck('nextPhaseOptionsWork is true', extensionReport.nextPhaseOptionsWork === true, { layer: 'phase-keeper-v62z', actual: extensionReport.nextPhaseOptionsWork, fileToFix: EXTENSION });
    addCheck('recommendedNextPhaseWorks is true', extensionReport.recommendedNextPhaseWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.recommendedNextPhaseWorks, fileToFix: EXTENSION });
    addCheck('whatIsReadyWorks is true', extensionReport.whatIsReadyWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.whatIsReadyWorks, fileToFix: EXTENSION });
    addCheck('whatIsLockedWorks is true', extensionReport.whatIsLockedWorks === true, { layer: 'phase-keeper-v62z', actual: extensionReport.whatIsLockedWorks, fileToFix: EXTENSION });
    addCheck('protectedVisualKeeperStillAHv54I3 is true', extensionReport.protectedVisualKeeperStillAHv54I3 === true, { layer: 'phase-keeper-v62z', actual: extensionReport.protectedVisualKeeperStillAHv54I3, fileToFix: EXTENSION });
    addCheck('aquaBrainPrimaryInterfaceLocked is true', extensionReport.aquaBrainPrimaryInterfaceLocked === true, { layer: 'phase-keeper-v62z', actual: extensionReport.aquaBrainPrimaryInterfaceLocked, fileToFix: EXTENSION });
    addCheck('backendReadinessLocked is true', extensionReport.backendReadinessLocked === true, { layer: 'phase-keeper-v62z', actual: extensionReport.backendReadinessLocked, fileToFix: EXTENSION });
    addCheck('noApiKeysInFrontend is true', extensionReport.noApiKeysInFrontend === true, { layer: 'ask-mode-router-v61u', actual: extensionReport.noApiKeysInFrontend, fileToFix: EXTENSION });
    addCheck('voiceBrainToolRegistryExists is true', extensionReport.voiceBrainToolRegistryExists === true, { layer: 'voice-brain-v61z', actual: extensionReport.voiceBrainToolRegistryExists, fileToFix: EXTENSION });
    addCheck('voiceBrainIntentClassifierWorks is true', extensionReport.voiceBrainIntentClassifierWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.voiceBrainIntentClassifierWorks, fileToFix: EXTENSION });
    addCheck('hendersonReportIntentWorks is true', extensionReport.hendersonReportIntentWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.hendersonReportIntentWorks, fileToFix: EXTENSION });
    addCheck('hendersonReceiptsIntentWorks is true', extensionReport.hendersonReceiptsIntentWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.hendersonReceiptsIntentWorks, fileToFix: EXTENSION });
    addCheck('accountantExportStaysLocked is true', extensionReport.accountantExportStaysLocked === true, { layer: 'voice-brain-v61z', actual: extensionReport.accountantExportStaysLocked, fileToFix: EXTENSION });
    addCheck('plumbingSpendIntentWorks is true', extensionReport.plumbingSpendIntentWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.plumbingSpendIntentWorks, fileToFix: EXTENSION });
    addCheck('cameraAllocationIntentWorks is true', extensionReport.cameraAllocationIntentWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.cameraAllocationIntentWorks, fileToFix: EXTENSION });
    addCheck('constructionDiagramUploadStaysLocked is true', extensionReport.constructionDiagramUploadStaysLocked === true, { layer: 'voice-brain-v61z', actual: extensionReport.constructionDiagramUploadStaysLocked, fileToFix: EXTENSION });
    addCheck('suggestNextStepWorks is true', extensionReport.suggestNextStepWorks === true, { layer: 'voice-brain-v61z', actual: extensionReport.suggestNextStepWorks, fileToFix: EXTENSION });
    const failuresList = extensionReport.failures || [];
    failuresList.forEach((failure) => addCheck(`extension command passes: ${failure.command}`, false, { layer: 'extension-regression', expected: failure.expected, actual: failure.actual, fileToFix: EXTENSION }));

    const byCommand = new Map((extensionReport.results || []).map((row) => [row.command, row]));
    [
      'show premium module keeper',
      'show module visual keeper',
      'run module visual check',
      'show module polish coverage',
      'show missing module polish',
      'copy module keeper handoff',
      'mark module keeper ready demo',
      'show opened module keeper'
    ].forEach((command) => {
      const row = byCommand.get(command);
      addCheck(`v63E module keeper command routes: ${command}`, Boolean(row && row.passed && row.actual && row.actual.renderedFallback === false && row.actual.moduleVisualKeeperPanelWorks === true), { layer: 'premium-module-keeper-v63e', expected: 'Premium Module Visual Keeper panel without fallback', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    [
      'show automation report',
      'show regression report',
      'automation status',
      'run regression qa'
    ].forEach((command) => {
      const row = byCommand.get(command);
      addCheck(`automation command routes before fallback: ${command}`, Boolean(row && row.passed && row.actual && row.actual.renderedFallback === false && row.actual.renderedAutomationReport === true), { layer: 'automation-routing-v61t', expected: 'Automation Report / Regression Report Viewer without fallback', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    [
      'speak summary',
      'read this back',
      'read report',
      'stop speaking',
      'mute voice',
      'voice off',
      'voice on'
    ].forEach((command) => {
      const row = byCommand.get(command);
      addCheck(`spoken readback typed command routes: ${command}`, Boolean(row && row.passed), { layer: 'spoken-readback-v61r', expected: 'recognized local spoken readback route', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    [
      'cold this receipt to framing',
      'call this receipt to framing',
      'code just received to framing',
      'clear draft Q demo',
      'clear draft cute demo',
      'Claire draft queue demo',
      'pull up accountant',
      'what’s going on today'
    ].forEach((command) => {
      const row = byCommand.get(command);
      addCheck(`voice transcript simulation routes: ${command}`, Boolean(row && row.passed), { layer: 'voice-transcript-simulation', expected: 'recognized local/demo route', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    [
      ['how many bags of concrete for an 8 inch sonotube 4 feet deep', 'general_ask_locked'],
      ['how many 80 pound bags for an 8 inch sonotube 4 feet deep', 'general_ask_locked'],
      ['how many 60 pound bags for an 8 inch sonotube 4 feet deep', 'general_ask_locked'],
      ['concrete for 8 inch sauna tube 4 ft deep', 'general_ask_locked'],
      ['8 inch tube 4 feet deep concrete bags', 'general_ask_locked'],
      ['how many gallons of paint for 1200 square feet', 'general_ask_locked'],
      ['how many sheets of drywall for a 12 by 12 room 8 foot ceiling', 'general_ask_locked'],
      ['flooring for 12 by 15 room', 'general_ask_locked'],
      ['how many studs for a 16 foot wall', 'general_ask_locked'],
      ['concrete for 10 by 12 slab 4 inches thick', 'general_ask_locked'],
      ['how many gallons of paint', 'general_ask_locked'],
      ['what is the best paint brand today', 'general_ask_locked'],
      ['how many sheets of drywall for this room', 'general_ask_locked'],
      ['what does this code term mean', 'general_ask_locked'],
      ['pull up receipts', 'app_navigation'],
      ['what is the Henderson report', 'voice_brain_tool_plan'],
      ['pull up the Henderson staircase report', 'workflow_planner'],
      ['look up all receipts for the Henderson house from Home Depot', 'voice_brain_tool_plan'],
      ['show Home Depot receipts for Henderson', 'voice_brain_tool_plan'],
      ['prepare those Home Depot receipts for accountant export', 'workflow_planner'],
      ['how much have we spent on Henderson plumbing', 'workflow_planner'],
      ['how much money did we spend on Henderson house plumbing', 'workflow_planner'],
      ['were cameras allocated to Henderson jobsite', 'workflow_planner'],
      ['upload that construction diagram to Henderson files', 'workflow_planner'],
      ['what documents are missing for Henderson', 'workflow_planner'],
      ['what should I do next', 'workflow_planner'],
      ['show automation report', 'automation_status'],
      ['run regression qa', 'automation_status'],
      ['code this receipt to materials', 'permissioned_action'],
      ['what needs approval', 'app_navigation'],
      ['banana test', 'unknown_fallback']
    ].forEach(([command, mode]) => {
      const row = byCommand.get(command);
      addCheck(`v61X Ask AI mode routes: ${command}`, Boolean(row && row.passed && row.actual && (row.actual.askMode === mode || row.actual.renderedToolGatewayDryRunV62K === true || row.actual.renderedDataQueryRuntimeV62N === true)), { layer: 'ask-mode-router-v61u', expected: mode, actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    [
      ['what is the Henderson report', 'openProjectReport'],
      ['pull up the Henderson staircase report', 'openProjectReport'],
      ['look up all receipts for the Henderson house from Home Depot', 'findProjectReceipts'],
      ['show Home Depot receipts for Henderson', 'findProjectReceipts'],
      ['prepare those Home Depot receipts for accountant export', 'prepareAccountantExportDemo'],
      ['how much have we spent on Henderson plumbing', 'summarizeProjectSpend'],
      ['how much money did we spend on Henderson house plumbing', 'summarizeProjectSpend'],
      ['were cameras allocated to Henderson jobsite', 'checkJobsiteCameraAllocationDemo'],
      ['upload that construction diagram to Henderson files', 'uploadFileToProjectDemo'],
      ['what documents are missing for Henderson', 'showMissingDocumentsDemo'],
      ['what should I do next', 'suggestNextStep']
    ].forEach(([command, tool]) => {
      const row = byCommand.get(command);
      addCheck(`v61Z voice brain/routes or v62F workflow routes: ${command}`, Boolean(row && row.passed && row.actual && ((row.actual.renderedVoiceBrainToolPlan && row.actual.selectedTool === tool) || row.actual.renderedWorkflowPlanV62F || row.actual.renderedToolGatewayDryRunV62K || row.actual.renderedDataQueryRuntimeV62N)), { layer: 'voice-brain-v61z', expected: tool, actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    const accountantRow = byCommand.get('prepare those Home Depot receipts for accountant export');
    addCheck('v61Z accountant export remains locked/demo-only', Boolean(accountantRow && accountantRow.passed && accountantRow.actual && (accountantRow.actual.workflowTypeV62F === 'receipt_export_preparation' || accountantRow.actual.lockedExportV62K === true || (accountantRow.actual.permissionLevel === 'accounting_approval_required' && /Accounting Export Locked/.test((accountantRow.actual.safetyLocks || []).join(' '))))), { layer: 'voice-brain-v61z', expected: 'accounting_approval_required + Accounting Export Locked', actual: accountantRow ? accountantRow.actual : 'missing', fileToFix: EXTENSION });
    const uploadRow = byCommand.get('upload that construction diagram to Henderson files');
    addCheck('v61Z construction diagram upload remains locked/demo-only', Boolean(uploadRow && uploadRow.passed && uploadRow.actual && (uploadRow.actual.workflowTypeV62F === 'upload_send_preparation' || uploadRow.actual.lockedUploadV62K === true || (uploadRow.actual.permissionLevel === 'owner_approval_required' && /Upload Locked/.test((uploadRow.actual.safetyLocks || []).join(' '))))), { layer: 'voice-brain-v61z', expected: 'owner approval + Upload Locked', actual: uploadRow ? uploadRow.actual : 'missing', fileToFix: EXTENSION });
    addCheck('v62A Aqua Brain Command Center works', extensionReport.aquaBrainCommandCenterWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.aquaBrainCommandCenterWorks, fileToFix: EXTENSION });
    addCheck('v62A Voice Brain plan viewer works', extensionReport.voiceBrainPlanViewerWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.voiceBrainPlanViewerWorks, fileToFix: EXTENSION });
    addCheck('v62A Save Voice Brain Plan works', extensionReport.saveVoiceBrainPlanWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.saveVoiceBrainPlanWorks, fileToFix: EXTENSION });
    addCheck('v62A Show Last Voice Brain Plan works', extensionReport.showLastVoiceBrainPlanWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.showLastVoiceBrainPlanWorks, fileToFix: EXTENSION });
    addCheck('v62A Clear Voice Brain Plan works', extensionReport.clearVoiceBrainPlanWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.clearVoiceBrainPlanWorks, fileToFix: EXTENSION });
    addCheck('v62A Copy Tool Plan works', extensionReport.copyToolPlanWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.copyToolPlanWorks, fileToFix: EXTENSION });
    addCheck('v62A permission explanation works', extensionReport.permissionExplanationWorks === true, { layer: 'voice-brain-v62a', actual: extensionReport.permissionExplanationWorks, fileToFix: EXTENSION });
    ['visualRouteBridgeV62CWorks','visualRouteFocusMarkerV62CWorks','visualRouteReadbackBoundV62CWorks','allVoiceBrainPlansHaveVisualRouteV62C'].forEach((flag) => {
      addCheck(`v62C compatibility ${flag} is true`, extensionReport[flag] === true, { layer: 'visual-route-v62c', actual: extensionReport[flag], fileToFix: EXTENSION });
    });
    ['aiNavigationExecutorWorks','visualFocusExecutorWorks','focusedRouteMarkerWorks','hendersonReportNavigationWorks','hendersonStaircaseNavigationWorks','hendersonReceiptsNavigationWorks','hendersonPlumbingSpendNavigationWorks','missingDocumentsNavigationWorks','cameraAllocationNavigationWorks','accountantExportNavigationLocked','uploadNavigationLocked'].forEach((flag) => {
      addCheck(`v62E ${flag} is true`, extensionReport[flag] === true, { layer: 'ai-navigation-v62e', actual: extensionReport[flag], fileToFix: EXTENSION });
    });
    addCheck('v62D live in-app runner function exists', typeof api.runLiveInAppRegressionReportV62D === 'function', { layer: 'live-in-app-regression-v62d', fileToFix: EXTENSION });
    const liveReport = typeof api.runLiveInAppRegressionReportV62D === 'function' ? api.runLiveInAppRegressionReportV62D() : null;
    addCheck('v62D live in-app runner returns synced report', Boolean(liveReport && liveReport.liveInAppRegressionRunnerV62DWorks === true && liveReport.reportSyncV62DWorks === true), { layer: 'live-in-app-regression-v62d', actual: liveReport ? { live: liveReport.liveInAppRegressionRunnerV62DWorks, sync: liveReport.reportSyncV62DWorks } : 'missing', fileToFix: EXTENSION });
    addCheck('v62D report sync uses local storage key only', Boolean(liveReport && liveReport.inAppReportSyncV62D && liveReport.inAppReportSyncV62D.storageKey === 'aquaRegressionReportSyncV62D' && liveReport.inAppReportSyncV62D.noNetworkCalls === true), { layer: 'live-in-app-regression-v62d', actual: liveReport && liveReport.inAppReportSyncV62D, fileToFix: EXTENSION });

    ['workflowPlannerExists','receiptExportWorkflowWorks','reportReviewWorkflowWorks','missingDocumentsWorkflowWorks','spendBudgetWorkflowWorks','uploadWorkflowStaysLocked','cameraWorkflowWorks','dailyAttentionWorkflowWorks','saveWorkflowPlanWorks','showLastWorkflowPlanWorks','copyWorkflowPlanWorks','clearWorkflowPlanWorks','ownerReviewDemoWorks','workflowMemoryExists','activeWorkflowSaved','followUpContinuationWorks','exportPacketFollowUpWorks','approvalFollowUpWorks','ownerReviewDemoFollowUpWorks','readbackFollowUpWorks','spendPivotUsesActiveProject','clearActiveWorkflowWorks','noContextFollowUpHandled'].forEach((flag) => {
      addCheck(`v62F ${flag} is true`, extensionReport[flag] === true, { layer: 'workflow-planner-v62f', actual: extensionReport[flag], fileToFix: EXTENSION });
    });

    ['voiceInteractionControllerExists','voiceStatePanelWorks','voiceOnOffWorks','repeatLastResponseWorks','stopSpeakingWorks','manualFallbackWorks','continueUsesWorkflowMemory','permissionQuestionVoiceStateWorks'].forEach((flag) => {
      addCheck(`v62H ${flag} is true`, extensionReport[flag] === true, { layer: 'voice-interaction-v62h', actual: extensionReport[flag], fileToFix: EXTENSION });
    });
    ['voiceSessionControllerExists','aquaSessionPanelWorks','startSessionWorks','activeProjectContextWorks','missingInputFollowUpWorks','accountantExportContextWorks','continueSessionWorks','cancelSessionWorks','manualModeWorks'].forEach((flag) => {
      addCheck(`v62I ${flag} is true`, extensionReport[flag] === true, { layer: 'voice-session-v62i', actual: extensionReport[flag], fileToFix: EXTENSION });
    });
    ['v62I sequence 1 session project receipts','v62I sequence 2 missing input follow-up','v62I sequence 3 accountant export locked','v62I sequence 4 continue cancel','v62I sequence 5 manual fallback'].forEach((command) => {
      const row = (extensionReport.results || []).find((result) => result.command === command);
      addCheck(`v62I session regression: ${command}`, Boolean(row && row.passed), { layer: 'voice-session-v62i', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    ['voice on','voice off','repeat last response','stop speaking','continue','cancel / clear context','manual controls','read it back after active workflow','what needs approval after active workflow','look up all receipts for Henderson from Home Depot and prepare them for accountant export','show automation report','banana test'].forEach((command) => {
      const row = (extensionReport.results || []).find((result) => result.command === command);
      addCheck(`v62H voice command/state test: ${command}`, Boolean(row && row.passed), { layer: 'voice-interaction-v62h', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    ['show aqua brain assistant','open aqua brain assistant','show assistant interface','show primary ai interface','show assistant surface polish','show compact assistant','show assistant layout','show manual controls','hide manual controls','show Home Depot receipts for Henderson','prepare those for accountant export','what needs approval','read it back','continue','manual controls','show quick routes','show automation tools','show safety tools','clear assistant context','show automation report','run regression qa','banana test'].forEach((command) => {
      const row = (extensionReport.results || []).find((result) => result.command === command);
      addCheck(`v62S primary assistant command: ${command}`, Boolean(row && row.passed), { layer: 'primary-assistant-interface-v62s', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    ['run assistant acceptance checklist','show assistant acceptance checklist','show aqua brain keeper status','mark aqua brain keeper ready demo','clear assistant acceptance demo','show phone readiness','show dex readiness','show ai button acceptance','show assistant surface acceptance','show automation report','run regression qa','banana test'].forEach((command) => {
      const row = (extensionReport.results || []).find((result) => result.command === command);
      addCheck(`v62W assistant acceptance command: ${command}`, Boolean(row && row.passed), { layer: 'assistant-acceptance-v62w', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    ['show phone copy','show assistant phone copy','show live assistant copy','show manual fallback','hey aqua','ready to work','manual mode','show Home Depot receipts for Henderson','prepare those for accountant export','pull up the report','read it back','show automation report','banana test'].forEach((command) => {
      const row = (extensionReport.results || []).find((result) => result.command === command);
      addCheck(`v62V-C phone assistant command: ${command}`, Boolean(row && row.passed), { layer: 'phone-copy-v62vc', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    const concreteDefaultRow = byCommand.get('how many bags of concrete for an 8 inch sonotube 4 feet deep');
    addCheck('Concrete Sonotube calculator recommends 3 bags for 8 inch / 4 foot default 80 lb', Boolean(concreteDefaultRow && concreteDefaultRow.passed && concreteDefaultRow.actual && concreteDefaultRow.actual.recommendedBags === 3 && concreteDefaultRow.actual.bagSizePounds === 80), { layer: 'jobsite-calculator-v61v', expected: '3 recommended 80 lb bags', actual: concreteDefaultRow ? concreteDefaultRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const concrete60Row = byCommand.get('how many 60 pound bags for an 8 inch sonotube 4 feet deep');
    addCheck('Concrete Sonotube calculator rounds 60 lb version to 4 bags', Boolean(concrete60Row && concrete60Row.passed && concrete60Row.actual && concrete60Row.actual.recommendedBags === 4 && concrete60Row.actual.bagSizePounds === 60), { layer: 'jobsite-calculator-v61v', expected: '4 recommended 60 lb bags', actual: concrete60Row ? concrete60Row.actual : 'missing from extension results', fileToFix: EXTENSION });
    const saunaRow = byCommand.get('concrete for 8 inch sauna tube 4 ft deep');
    addCheck('sauna tube calculator row normalizes to Sonotube', Boolean(saunaRow && saunaRow.passed && saunaRow.actual && saunaRow.actual.normalizedTubeTerm === 'Sonotube'), { layer: 'jobsite-calculator-v61v', expected: 'Sonotube', actual: saunaRow ? saunaRow.actual : 'missing from extension results', fileToFix: EXTENSION });

    const paintRow = byCommand.get('how many gallons of paint for 1200 square feet');
    addCheck('Paint Gallons calculator recommends 7 gallons', Boolean(paintRow && paintRow.passed && paintRow.actual && paintRow.actual.recommendedGallons === 7), { layer: 'jobsite-calculator-v61w', expected: '7 gallons', actual: paintRow ? paintRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const drywallRow = byCommand.get('how many sheets of drywall for a 12 by 12 room 8 foot ceiling');
    addCheck('Drywall Sheets calculator recommends 14 4x8 sheets', Boolean(drywallRow && drywallRow.passed && drywallRow.actual && drywallRow.actual.recommendedSheets === 14), { layer: 'jobsite-calculator-v61w', expected: '14 4x8 sheets', actual: drywallRow ? drywallRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const flooringRow = byCommand.get('flooring for 12 by 15 room');
    addCheck('Flooring calculator recommends 198 square feet', Boolean(flooringRow && flooringRow.passed && flooringRow.actual && flooringRow.actual.recommendedSquareFeet === 198), { layer: 'jobsite-calculator-v61w', expected: '198 square feet', actual: flooringRow ? flooringRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const studsRow = byCommand.get('how many studs for a 16 foot wall');
    addCheck('Wall Stud Count calculator recommends 15 studs', Boolean(studsRow && studsRow.passed && studsRow.actual && studsRow.actual.recommendedStuds === 15), { layer: 'jobsite-calculator-v61w', expected: '15 studs', actual: studsRow ? studsRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const slabRow = byCommand.get('concrete for 10 by 12 slab 4 inches thick');
    addCheck('Concrete Slab calculator estimates about 1.48 yd and 1.63 yd with 10% waste', Boolean(slabRow && slabRow.passed && slabRow.actual && Math.abs(slabRow.actual.cubicYards - 1.48) < 0.01 && Math.abs(slabRow.actual.waste10CubicYards - 1.63) < 0.01), { layer: 'jobsite-calculator-v61w', expected: '1.48 yd / 1.63 yd with waste', actual: slabRow ? slabRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const saveDraftRows = (extensionReport.results || []).filter((row) => row.command === 'save calculation draft');
    const saveDraftRow = saveDraftRows.find((row) => row.actual && row.actual.renderedSaveCalculationDraft);
    const noCurrentDraftRow = saveDraftRows.find((row) => row.actual && row.actual.renderedNoCurrentCalculation);
    addCheck('v61X save calculation draft stores local demo draft', Boolean(saveDraftRow && saveDraftRow.passed), { layer: 'calculator-drafts-v61x', expected: 'saved local draft', actual: saveDraftRow ? saveDraftRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const saveThisRow = byCommand.get('save this calculation');
    addCheck('v61X save this calculation stores Paint Gallons draft', Boolean(saveThisRow && saveThisRow.passed && saveThisRow.actual && saveThisRow.actual.renderedSaveCalculationDraft), { layer: 'calculator-drafts-v61x', expected: 'saved paint draft', actual: saveThisRow ? saveThisRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const showDraftsRow = byCommand.get('show saved calculations');
    addCheck('v61X show saved calculations displays drafts', Boolean(showDraftsRow && showDraftsRow.passed && showDraftsRow.actual && showDraftsRow.actual.renderedCalculatorDraftsPanel), { layer: 'calculator-drafts-v61x', expected: 'calculator drafts panel', actual: showDraftsRow ? showDraftsRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const addEstimateDraftRow = byCommand.get('add to estimate draft');
    addCheck('v61X add to estimate draft is locked placeholder only', Boolean(addEstimateDraftRow && addEstimateDraftRow.passed && addEstimateDraftRow.actual && addEstimateDraftRow.actual.renderedEstimateDraftPlaceholder), { layer: 'calculator-drafts-v61x', expected: 'locked estimate draft placeholder', actual: addEstimateDraftRow ? addEstimateDraftRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const clearDraftsRow = byCommand.get('clear saved calculations');
    addCheck('v61X clear saved calculations clears local demo drafts only', Boolean(clearDraftsRow && clearDraftsRow.passed && clearDraftsRow.actual && clearDraftsRow.actual.renderedClearCalculatorDrafts), { layer: 'calculator-drafts-v61x', expected: 'clear calculator drafts panel', actual: clearDraftsRow ? clearDraftsRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    addCheck('v61X save without active calculator asks to run calculator first', Boolean(noCurrentDraftRow && noCurrentDraftRow.passed), { layer: 'calculator-drafts-v61x', expected: 'No current calculator result found', actual: noCurrentDraftRow ? noCurrentDraftRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const missingPaintRow = byCommand.get('how many gallons of paint');
    addCheck('Missing paint values show Need More Information instead of fallback', Boolean(missingPaintRow && missingPaintRow.passed && missingPaintRow.actual && missingPaintRow.actual.renderedNeedMoreInformation), { layer: 'jobsite-calculator-v61w', expected: 'Need More Information', actual: missingPaintRow ? missingPaintRow.actual : 'missing from extension results', fileToFix: EXTENSION });
    const bestPaintRow = byCommand.get('what is the best paint brand today');
    addCheck('Unsupported general ask remains locked with no external API/search', Boolean(bestPaintRow && bestPaintRow.passed && bestPaintRow.actual && bestPaintRow.actual.renderedGeneralAskLocked), { layer: 'jobsite-calculator-v61w', expected: 'locked placeholder', actual: bestPaintRow ? bestPaintRow.actual : 'missing from extension results', fileToFix: EXTENSION });


    [
      ['send to SOW review', 'send_to_sow_review_queue_v61y'],
      ['send this to SOW review', 'send_to_sow_review_queue_v61y'],
      ['send to estimate review', 'send_to_sow_review_queue_v61y'],
      ['add this to SOW review queue', 'send_to_sow_review_queue_v61y'],
      ['show SOW review queue', 'show_sow_review_queue_v61y'],
      ['show estimate review queue', 'show_sow_review_queue_v61y'],
      ['mark review ready demo', 'mark_review_ready_demo_v61y'],
      ['return to calculator drafts', 'return_to_calculator_drafts_v61y'],
      ['clear SOW review queue demo', 'clear_sow_review_queue_demo_v61y']
    ].forEach(([command, intent]) => {
      const row = byCommand.get(command);
      addCheck(`v61Y SOW review command routes: ${command}`, Boolean(row && row.passed && row.actual && row.actual.canonicalIntent === intent), { layer: 'sow-review-queue-v61y', expected: intent, actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    const sowSendRow = extensionReport.results.find((row) => row.command === 'send to SOW review' && row.actual && row.actual.renderedSendSowReviewQueue) || byCommand.get('send to SOW review');
    addCheck('v61Y Send to SOW review displays local/demo confirmation', Boolean(sowSendRow && sowSendRow.passed && sowSendRow.actual && sowSendRow.actual.renderedSendSowReviewQueue), { layer: 'sow-review-queue-v61y', expected: 'send confirmation', actual: sowSendRow ? sowSendRow.actual : 'missing', fileToFix: EXTENSION });
    const sowShowRow = byCommand.get('show SOW review queue');
    addCheck('v61Y SOW review queue displays queued calculator draft', Boolean(sowShowRow && sowShowRow.passed && sowShowRow.actual && sowShowRow.actual.renderedSowReviewQueue), { layer: 'sow-review-queue-v61y', expected: 'queue panel', actual: sowShowRow ? sowShowRow.actual : 'missing', fileToFix: EXTENSION });
    const markReadyRow = byCommand.get('mark review ready demo');
    addCheck('v61Y Mark Review Ready Demo is local/demo-only', Boolean(markReadyRow && markReadyRow.passed && markReadyRow.actual && markReadyRow.actual.renderedMarkReviewReadyDemo), { layer: 'sow-review-queue-v61y', expected: 'local demo ready status', actual: markReadyRow ? markReadyRow.actual : 'missing', fileToFix: EXTENSION });
    const clearSowRow = byCommand.get('clear SOW review queue demo');
    addCheck('v61Y Clear SOW Review Queue Demo clears local demo queue', Boolean(clearSowRow && clearSowRow.passed && clearSowRow.actual && clearSowRow.actual.renderedClearSowReviewQueue), { layer: 'sow-review-queue-v61y', expected: 'local demo clear panel', actual: clearSowRow ? clearSowRow.actual : 'missing', fileToFix: EXTENSION });
    addCheck('v61Y no live SOW created', extensionReport.noLiveSowCreated === true, { layer: 'sow-review-queue-v61y', actual: extensionReport.noLiveSowCreated, fileToFix: EXTENSION });

    const permissionRow = byCommand.get('code this receipt to materials');
    addCheck('receipt coding routes to Permission Granter', Boolean(permissionRow && permissionRow.passed && permissionRow.actual && permissionRow.actual.renderedPermissionGate), { layer: 'permission-draft-safety', expected: 'Permission Granter demo gate', actual: permissionRow && permissionRow.actual, fileToFix: EXTENSION });
    addCheck('v61Z Receipt module renders with premium shell marker/class', Boolean(byCommand.get('pull up receipts') && byCommand.get('pull up receipts').actual && byCommand.get('pull up receipts').actual.renderedPremiumModuleShell), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
    addCheck('v61Z Automation Report renders with premium shell marker/class', Boolean(byCommand.get('show automation report') && byCommand.get('show automation report').actual && byCommand.get('show automation report').actual.renderedPremiumModuleShell), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
    addCheck('v61Z Permission Granter renders with premium shell marker/class', Boolean(permissionRow && permissionRow.actual && permissionRow.actual.renderedPremiumModuleShell), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
    addCheck('v61Z Calculator panel renders with premium shell marker/class', Boolean(byCommand.get('how many gallons of paint for 1200 square feet') && byCommand.get('how many gallons of paint for 1200 square feet').actual && byCommand.get('how many gallons of paint for 1200 square feet').actual.renderedPremiumModuleShell), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
    addCheck('v61Z SOW Review Queue renders with premium shell marker/class', Boolean(sowShowRow && sowShowRow.actual && sowShowRow.actual.renderedPremiumModuleShell), { layer: 'premium-module-shell-v61z', fileToFix: EXTENSION });
    ['show polished receipts','show receipt detail polish','show polished accounting','show accounting detail polish','show spend detail polish','show polished owner review','show accountant export placeholder'].forEach((command) => {
      const row = byCommand.get(command);
      addCheck(`v63B required command renders: ${command}`, Boolean(row && row.passed && row.actual && row.actual.renderedPremiumModuleShellV63A), { layer: 'premium-module-detail-polish-v63b', actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });
    ['receiptDetailPolishWorks','accountingDetailPolishWorks','spendDetailPolishWorks','ownerReviewDetailPolishWorks','accountantExportPlaceholderPolished','premiumReceiptCardsRender','premiumAccountingCardsRender','premiumApprovalCardsRender','premiumExportCardsRender','v63AShellStillWorks','homeDesignUntouched','aiRoutingStillWorks','automationReportStillWorks','regressionQaStillWorks','unknownFallbackStillWorks'].forEach((flag) => addCheck(`v63B ${flag}`, extensionReport[flag] === true, { layer: 'premium-module-detail-polish-v63b', actual: extensionReport[flag], fileToFix: EXTENSION }));
    const safety = extensionReport.permissionDraftSafety || {};
    [
      ['no live record change occurs', safety.noLiveRecordChangeOccurs],
      ['Prepare/Approve/Cancel/Audit remain demo-only', safety.permissionButtonsDemoOnly],
      ['draft queue is history only', safety.draftQueueHistoryOnly],
      ['active command is current command only', safety.activeCommandIsCurrentCommandOnly],
      ['stale localStorage does not override active command', safety.staleLocalStorageDoesNotOverrideActiveCommand]
    ].forEach(([name, value]) => addCheck(name, value === true, { layer: 'permission-draft-safety', actual: value, fileToFix: EXTENSION }));
  } catch (error) {
    addCheck('extension regression completed without exception', false, { layer: 'extension-regression', actual: error && error.stack ? error.stack : String(error), fileToFix: EXTENSION });
  }
}

async function runBrowserVisualTestIfAvailable() {
  let playwright;
  try {
    playwright = require('playwright');
  } catch (error) {
    skipped.push({ name: 'browserVisualTest', reason: 'Playwright/browser not available' });
    browserVisualTest = { status: 'skipped', reason: 'Playwright/browser not available' };
    return;
  }
  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const networkCalls = [];
    page.on('request', (request) => {
      const url = request.url();
      if (!url.startsWith('file:') && !url.startsWith('data:') && !url.startsWith('about:')) networkCalls.push(url);
    });
    await page.goto(`file://${rel(HTML_KEEPER)}`, { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText({ timeout: 5000 });
    const blank = bodyText.trim().length === 0;
    const structuredDocs = /structured docs app/i.test(bodyText);
    const appLoads = /Aqua Homes/i.test(bodyText);
    const askOpenable = await page.locator('text=/Ask Aqua AI|Ask AI|Command Hub/i').first().isVisible().catch(() => false);
    const regressionVisible = await page.locator('text=Run Regression QA').first().isVisible().catch(() => false);
    const screenshotPath = 'aqua-regression-visual-smoke.png';
    await page.screenshot({ path: rel(screenshotPath), fullPage: true });
    browserVisualTest = { status: 'ran', appLoads, askAICommandHubOpens: askOpenable, runRegressionQAButtonVisible: regressionVisible, noStructuredDocsApp: !structuredDocs, noBlankScreen: !blank, screenshotPath, networkCalls };
    addCheck('browser visual smoke: app loads', appLoads, { layer: 'visual-dom-smoke', actual: bodyText.slice(0, 160), fileToFix: HTML_KEEPER });
    addCheck('browser visual smoke: Ask AI / Command Hub opens or is present', askOpenable, { layer: 'visual-dom-smoke', fileToFix: EXTENSION });
    addCheck('browser visual smoke: Run Regression QA button visible', regressionVisible, { layer: 'visual-dom-smoke', fileToFix: EXTENSION });
    addCheck('browser visual smoke: no structured docs app appears', !structuredDocs, { layer: 'visual-dom-smoke', fileToFix: HTML_KEEPER });
    addCheck('browser visual smoke: no blank screen', !blank, { layer: 'visual-dom-smoke', fileToFix: HTML_KEEPER });
    addCheck('browser visual smoke: no network calls', networkCalls.length === 0, { layer: 'visual-dom-smoke', actual: networkCalls, fileToFix: HTML_KEEPER });
  } catch (error) {
    skipped.push({ name: 'browserVisualTest', reason: `Playwright/browser unavailable or failed to launch: ${error.message}` });
    browserVisualTest = { status: 'skipped', reason: `Playwright/browser unavailable or failed to launch: ${error.message}` };
  } finally {
    if (browser) await browser.close();
  }
}


function scanFrontendForSecretsV62L() {
  const frontendFiles = [HTML_KEEPER, EXTENSION, 'index.html', 'docs/index.html'].filter(fileExists);
  const risky = [
    { label: 'sk-', pattern: /sk-[A-Za-z0-9_-]{8,}/g },
    { label: 'OPENAI_API_KEY', pattern: /OPENAI_API_KEY/g },
    { label: 'GOOGLE_API_KEY', pattern: /GOOGLE_API_KEY/g },
    { label: 'GEMINI_API_KEY', pattern: /GEMINI_API_KEY/g },
    { label: 'SECRET_KEY', pattern: /SECRET_KEY/g },
    { label: 'PRIVATE_KEY', pattern: /PRIVATE_KEY/g },
    { label: 'access_token', pattern: /access_token/g },
    { label: 'refresh_token', pattern: /refresh_token/g },
    { label: 'client_secret', pattern: /client_secret/g }
  ];
  const findings = [];
  frontendFiles.forEach((file) => {
    const text = readFileSafe(file);
    risky.forEach((rule) => {
      let match;
      rule.pattern.lastIndex = 0;
      while ((match = rule.pattern.exec(text))) {
        const start = Math.max(0, match.index - 900);
        const end = Math.min(text.length, match.index + 900);
        const context = text.slice(start, end);
        const line = text.slice(0, match.index).split('\n').length;
        const safeExplanatory = /forbiddenFrontendSecrets|noFrontendKeyPolicy|environmentVariablePlan|Frontend must never contain|server-side only|stored server-side only|API key safety|server-only key/i.test(context);
        if (!safeExplanatory) findings.push({ file, line, label: rule.label, excerpt: text.slice(Math.max(0, match.index - 80), Math.min(text.length, match.index + 80)) });
      }
    });
  });
  return { passed: findings.length === 0, findings };
}

function runSafetyGate() {
  const extension = readFileSafe(EXTENSION);
  const test = readFileSafe('aqua-v61-regression-test.js');
  const workflow = readFileSafe('.github/workflows/aqua-regression.yml');
  const executableNetworkPattern = /\b(fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource|RTCPeerConnection)\s*[\(.]/;
  const liveApiPattern = /(authorization:\s*bearer|sk-[A-Za-z0-9_-]{20,}|api[_-]?key\s*[:=]\s*['"][^'"]+['"]|https?:\/\/api\.)/i;
  const combined = [extension, test, workflow].join('\n');
  const secretScanV62L = scanFrontendForSecretsV62L();
  const safetyChecks = {
    noBackendCalls: !/backend\s*\(/i.test(combined),
    noNetworkCalls: !executableNetworkPattern.test(extension) && !executableNetworkPattern.test(workflow),
    noLiveAIApiCalls: !liveApiPattern.test(extension),
    noPayment: !/payment\s*\(/i.test(extension),
    noPayroll: !/payroll\s*\(/i.test(extension),
    noBankSync: !/bank\s*sync\s*\(/i.test(extension),
    noAccountingExport: !/accounting\s*export\s*\(/i.test(extension),
    noCustomerSharingExport: !/customer\s*(sharing|export)\s*\(/i.test(extension),
    noAudioStorage: !/MediaRecorder|new\s+Blob\s*\([^)]*audio|audio\/webm|audio\/mpeg|audio\/wav/i.test(extension),
    noAlwaysListening: !/continuous\s*=\s*true/i.test(extension),
    noExternalTTSApiCalls: !/https?:\/\/|fetch\s*\(|XMLHttpRequest|sendBeacon/i.test(extension),
    noApiKeysInFrontend: secretScanV62L.passed === true
  };
  addCheck('v62L frontend secret scan allows only explanatory server-only policy strings', secretScanV62L.passed === true, { layer: 'backend-boundary-v62l', actual: secretScanV62L.findings, fileToFix: EXTENSION });
  Object.entries(safetyChecks).forEach(([name, value]) => addCheck(`safety gate: ${name}`, value === true, { layer: 'safety-gate', fileToFix: EXTENSION }));
  return safetyChecks;
}

function failedCommands() {
  const commandFailures = [];
  if (extensionReport && Array.isArray(extensionReport.failures)) {
    extensionReport.failures.forEach((failure) => commandFailures.push(failure.command));
  }
  failures.forEach((failure) => {
    if (failure.name && failure.layer && !commandFailures.includes(failure.name)) commandFailures.push(failure.name);
  });
  return commandFailures;
}

function buildRepairPrompt(report) {
  if (report.failed === 0) return 'No repair needed.';
  const rows = failures.map((failure, index) => {
    return `${index + 1}. Failed command/check: "${failure.name}"\n   Expected result: ${failure.expected || 'Automated gate passes'}\n   Actual result: ${JSON.stringify(failure.actual || failure.details || failure.passed)}\n   File to fix: ${failure.fileToFix || EXTENSION}`;
  });
  return [
    '# Copyable Codex Repair Prompt',
    '',
    `Fix Aqua Homes OS ${VERSION} automation gate failures. Do not redesign. Do not touch Home layout. Do not rewrite AH_v54I-3.html unless absolutely necessary and explicitly explain why.`,
    '',
    ...rows,
    '',
    'Safety reminder: keep all changes local/demo-only. Do not activate backend/live AI/API calls, execute live record changes, store sensitive data, connect payment/payroll/bank sync/accounting export, customer sharing/export, audio storage, or always-listening behavior.',
    'Preferred file to fix: aqua-v61-extensions.js or aqua-v61-regression-test.js.'
  ].join('\n');
}

function createGateSelfTestReport(overrides = {}) {
  const baseReport = {
    version: 'v61Z-gate-self-test',
    total: 1,
    passed: 1,
    failed: 0,
    failures: [],
    safeToMerge: true,
    repairPrompt: 'No repair needed.',
    safetyStatus: Object.fromEntries(REQUIRED_SAFETY_FLAGS.map((flag) => [flag, true])),
    noConflictMarkers: true,
    conflictMarkerFiles: [],
    protectedVisualFileUnchanged: true,
    protectedVisualFileRewritten: false,
    unexpectedProtectedFileRewrite: false
  };
  return { ...baseReport, ...overrides };
}

function runMergeGateSelfTest() {
  const beforeHtmlHash = hashFileSafe(HTML_KEEPER);
  const fakePassingReport = createGateSelfTestReport({
    version: 'v61Z-simulated-passing'
  });
  const fakeFailingReport = createGateSelfTestReport({
    version: 'v61Z-simulated-failure',
    total: 1,
    passed: 0,
    failed: 1,
    failures: [{ command: 'simulated failure', expected: 'pass', actual: 'fail' }],
    failedCommands: ['simulated failure'],
    safeToMerge: false,
    repairPrompt: 'Simulated repair prompt'
  });
  const passingRecommendation = evaluateAquaMergeGate(fakePassingReport);
  const failingRecommendation = evaluateAquaMergeGate(fakeFailingReport);
  const afterHtmlHash = hashFileSafe(HTML_KEEPER);

  const gateSelfTest = {
    passingReportAllowsMerge: passingRecommendation === MERGE_ALLOWED,
    failingReportBlocksMerge: failingRecommendation === MERGE_BLOCKED,
    simulatedFailureDoesNotModifyApp: beforeHtmlHash === afterHtmlHash,
    fakePassingRecommendation: passingRecommendation,
    fakeFailingRecommendation: failingRecommendation
  };

  addCheck('merge gate self-test: fake passing report allows merge', gateSelfTest.passingReportAllowsMerge, { layer: 'merge-gate-self-test', expected: MERGE_ALLOWED, actual: passingRecommendation, fileToFix: 'aqua-v61-regression-test.js' });
  addCheck('merge gate self-test: fake failing report blocks merge', gateSelfTest.failingReportBlocksMerge, { layer: 'merge-gate-self-test', expected: MERGE_BLOCKED, actual: failingRecommendation, fileToFix: 'aqua-v61-regression-test.js' });
  addCheck('merge gate self-test: simulated failure does not modify app', gateSelfTest.simulatedFailureDoesNotModifyApp, { layer: 'merge-gate-self-test', expected: beforeHtmlHash, actual: afterHtmlHash, fileToFix: HTML_KEEPER });

  return gateSelfTest;
}

function markdown(report) {
  const safetyRows = Object.entries(report.safetyStatus).length ? Object.entries(report.safetyStatus).map(([key, value]) => `- ${key}: ${value ? 'PASS' : 'FAIL'}`).join('\n') : '- None';
  const skippedRows = report.skippedTests.length ? report.skippedTests.map((item) => `- ${item.name}: ${item.reason}`).join('\n') : '- None';
  const failedRows = report.failedCommands.length ? report.failedCommands.map((name) => `- ${name}`).join('\n') : '- None';
  const changedRows = report.filesChanged.length ? report.filesChanged.map((name) => `- ${name}`).join('\n') : '- None';
  const gateRows = report.gateViolations && report.gateViolations.length ? report.gateViolations.map((name) => `- ${name}`).join('\n') : '- None';
  const gateSelfTest = report.gateSelfTest || {};
  return `# Aqua Homes OS ${report.version} Regression Report\n\n` +
    `- Timestamp: ${report.timestamp}\n` +
    `- Branch: ${report.branch || 'unavailable'}\n` +
    `- Commit: ${report.commit || 'unavailable'}\n` +
    `- Total tests: ${report.total}\n` +
    `- Passed: ${report.passed}\n` +
    `- Failed: ${report.failed}\n` +
    `- safeToMerge: ${report.safeToMerge}\n` +
    `- Merge recommendation: ${report.mergeRecommendation}\n` +
    `- premiumModuleShellWorks: ${report.premiumModuleShellWorks === true}\n` +
    `- openedModulesPolished: ${report.openedModulesPolished === true}\n` +
    `- homeDesignUntouched: ${report.homeDesignUntouched === true}\n` +
    `- routingStillWorks: ${report.routingStillWorks === true}\n` +
    `- automationStillWorks: ${report.automationStillWorks === true}\n` +
    `- receiptDetailPolishWorks: ${report.receiptDetailPolishWorks === true}\n` +
    `- accountingDetailPolishWorks: ${report.accountingDetailPolishWorks === true}\n` +
    `- spendDetailPolishWorks: ${report.spendDetailPolishWorks === true}\n` +
    `- ownerReviewDetailPolishWorks: ${report.ownerReviewDetailPolishWorks === true}\n` +
    `- accountantExportPlaceholderPolished: ${report.accountantExportPlaceholderPolished === true}\n` +
    `- premiumReceiptCardsRender: ${report.premiumReceiptCardsRender === true}\n` +
    `- premiumAccountingCardsRender: ${report.premiumAccountingCardsRender === true}\n` +
    `- premiumApprovalCardsRender: ${report.premiumApprovalCardsRender === true}\n` +
    `- premiumExportCardsRender: ${report.premiumExportCardsRender === true}\n` +
    `- v63AShellStillWorks: ${report.v63AShellStillWorks === true}\n` +
    `- noLiveRecordChanges: ${report.noLiveRecordChanges === true}\n` +
    `- noAudioStorage: ${report.noAudioStorage === true}\n` +
    `- noBackendNetworkLiveAI: ${report.noBackendNetworkLiveAI === true}\n` +
    `- naturalResponseTemplatesExist: ${report.naturalResponseTemplatesExist === true}\n` +
    `- responseTemplateSmokeWorks: ${report.responseTemplateSmokeWorks === true}\n` +
    `- conversationScenariosExist: ${report.conversationScenariosExist === true}\n` +
    `- conversationScenarioRunnerWorks: ${report.conversationScenarioRunnerWorks === true}\n` +
    `- allConversationScenariosPass: ${report.allConversationScenariosPass === true}\n` +
    `- hendersonReceiptExportScenarioWorks: ${report.hendersonReceiptExportScenarioWorks === true}\n` +
    `- hendersonReportReviewScenarioWorks: ${report.hendersonReportReviewScenarioWorks === true}\n` +
    `- spendBudgetScenarioWorks: ${report.spendBudgetScenarioWorks === true}\n` +
    `- cameraPhotoScenarioWorks: ${report.cameraPhotoScenarioWorks === true}\n` +
    `- uploadDiagramScenarioStaysLocked: ${report.uploadDiagramScenarioStaysLocked === true}\n` +
    `- voiceMishearConversationWorks: ${report.voiceMishearConversationWorks === true}\n` +
    `- missingInputClarificationScenarioWorks: ${report.missingInputClarificationScenarioWorks === true}\n` +
    `- manualFallbackConversationWorks: ${report.manualFallbackConversationWorks === true}\n` +
    `- responseQualityTemplatesWork: ${report.responseQualityTemplatesWork === true}\n` +
    `- contextContinuityWorks: ${report.contextContinuityWorks === true}\n` +
    `- visualRoutesOpenDuringScenarios: ${report.visualRoutesOpenDuringScenarios === true}\n` +
    `- permissionGatesShowDuringScenarios: ${report.permissionGatesShowDuringScenarios === true}\n` +
    `- toolGatewayContractExists: ${report.toolGatewayContractExists === true}\n` +
    `- toolRequestEnvelopeWorks: ${report.toolRequestEnvelopeWorks === true}\n` +
    `- toolResponseEnvelopeWorks: ${report.toolResponseEnvelopeWorks === true}\n` +
    `- toolContractMapWorks: ${report.toolContractMapWorks === true}\n` +
    `- permissionMapWorks: ${report.permissionMapWorks === true}\n` +
    `- riskMapWorks: ${report.riskMapWorks === true}\n` +
    `- approvalRoutesWork: ${report.approvalRoutesWork === true}\n` +
    `- frontendBlockRulesWork: ${report.frontendBlockRulesWork === true}\n` +
    `- brainControlMatrixExists: ${report.brainControlMatrixExists === true}\n` +
    `- aiInterfaceMapWorks: ${report.aiInterfaceMapWorks === true}\n` +
    `- moduleCoverageWorks: ${report.moduleCoverageWorks === true}\n` +
    `- workflowCoverageWorks: ${report.workflowCoverageWorks === true}\n` +
    `- voiceCoverageWorks: ${report.voiceCoverageWorks === true}\n` +
    `- visualRouteCoverageWorks: ${report.visualRouteCoverageWorks === true}\n` +
    `- readbackCoverageWorks: ${report.readbackCoverageWorks === true}\n` +
    `- permissionGateCoverageWorks: ${report.permissionGateCoverageWorks === true}\n` +
    `- manualFallbackCoverageWorks: ${report.manualFallbackCoverageWorks === true}\n` +
    `- backendReadinessCoverageWorks: ${report.backendReadinessCoverageWorks === true}\n` +
    `- coverageValidationWorks: ${report.coverageValidationWorks === true}\n` +
    `- dataQueryRuntimeExists: ${report.dataQueryRuntimeExists === true}\n` +
    `- queryNormalizerWorks: ${report.queryNormalizerWorks === true}\n` +
    `- projectAliasResolverWorks: ${report.projectAliasResolverWorks === true}\n` +
    `- hendersonReportQueryWorks: ${report.hendersonReportQueryWorks === true}\n` +
    `- hendersonStaircaseQueryWorks: ${report.hendersonStaircaseQueryWorks === true}\n` +
    `- hendersonHomeDepotReceiptQueryWorks: ${report.hendersonHomeDepotReceiptQueryWorks === true}\n` +
    `- hendersonPlumbingSpendQueryWorks: ${report.hendersonPlumbingSpendQueryWorks === true}\n` +
    `- hendersonMissingDocumentsQueryWorks: ${report.hendersonMissingDocumentsQueryWorks === true}\n` +
    `- hendersonCameraQueryWorks: ${report.hendersonCameraQueryWorks === true}\n` +
    `- hendersonApprovalQueryWorks: ${report.hendersonApprovalQueryWorks === true}\n` +
    `- hendersonExportPacketQueryWorks: ${report.hendersonExportPacketQueryWorks === true}\n` +
    `- visualRoutesGeneratedForQueries: ${report.visualRoutesGeneratedForQueries === true}\n` +
    `- spokenSummariesGeneratedForQueries: ${report.spokenSummariesGeneratedForQueries === true}\n` +
    `- fuzzyLanguageResolverExists: ${report.fuzzyLanguageResolverExists === true}\n` +
    `- correctionMapWorks: ${report.correctionMapWorks === true}\n` +
    `- confidenceScoringWorks: ${report.confidenceScoringWorks === true}\n` +
    `- receiptMishearCorrectionWorks: ${report.receiptMishearCorrectionWorks === true}\n` +
    `- draftQueueMishearCorrectionWorks: ${report.draftQueueMishearCorrectionWorks === true}\n` +
    `- sonotubeMishearCorrectionWorks: ${report.sonotubeMishearCorrectionWorks === true}\n` +
    `- hendersonProjectMishearCorrectionWorks: ${report.hendersonProjectMishearCorrectionWorks === true}\n` +
    `- homeDepotMishearCorrectionWorks: ${report.homeDepotMishearCorrectionWorks === true}\n` +
    `- plumbingMishearCorrectionWorks: ${report.plumbingMishearCorrectionWorks === true}\n` +
    `- accountantExportMishearCorrectionWorks: ${report.accountantExportMishearCorrectionWorks === true}\n` +
    `- sowScopeMishearCorrectionWorks: ${report.sowScopeMishearCorrectionWorks === true}\n` +
    `- payablesAliasWorks: ${report.payablesAliasWorks === true}\n` +
    `- approvalAliasWorks: ${report.approvalAliasWorks === true}\n` +
    `- clarificationForAmbiguousCommandWorks: ${report.clarificationForAmbiguousCommandWorks === true}\n` +
    `- automationCommandsStillRouteFirst: ${report.automationCommandsStillRouteFirst === true}\n` +
    `- e2eRoutingMatrixExists: ${report.e2eRoutingMatrixExists === true}\n` +
    `- e2eRoutingMatrixRuns: ${report.e2eRoutingMatrixRuns === true}\n` +
    `- allE2ERoutesPass: ${report.allE2ERoutesPass === true}\n` +
    `- fuzzyToIntentToRouteChainWorks: ${report.fuzzyToIntentToRouteChainWorks === true}\n` +
    `- workflowChainWorks: ${report.workflowChainWorks === true}\n` +
    `- sessionChainWorks: ${report.sessionChainWorks === true}\n` +
    `- visualFocusChainWorks: ${report.visualFocusChainWorks === true}\n` +
    `- readbackChainWorks: ${report.readbackChainWorks === true}\n` +
    `- permissionGateChainWorks: ${report.permissionGateChainWorks === true}\n` +
    `- automationRoutePriorityWorks: ${report.automationRoutePriorityWorks === true}\n` +
    `- unknownFallbackStillWorks: ${report.unknownFallbackStillWorks === true}\n` +
    `- clarificationPathWorks: ${report.clarificationPathWorks === true}\n` +
    `- backendSchemaExists: ${report.backendSchemaExists === true}
` +
    `- entityContractsExist: ${report.entityContractsExist === true}
` +
    `- relationshipMapWorks: ${report.relationshipMapWorks === true}
` +
    `- indexMapsWork: ${report.indexMapsWork === true}
` +
    `- hendersonDemoIndexWorks: ${report.hendersonDemoIndexWorks === true}
` +
    `- receiptIndexWorks: ${report.receiptIndexWorks === true}
` +
    `- reportIndexWorks: ${report.reportIndexWorks === true}
` +
    `- spendIndexWorks: ${report.spendIndexWorks === true}
` +
    `- missingDocumentIndexWorks: ${report.missingDocumentIndexWorks === true}
` +
    `- cameraAllocationIndexWorks: ${report.cameraAllocationIndexWorks === true}
` +
    `- approvalIndexWorks: ${report.approvalIndexWorks === true}
` +
    `- exportPacketIndexWorks: ${report.exportPacketIndexWorks === true}
` +
    `- noRealCustomerData: ${report.noRealCustomerData === true}
` +
    `- backendBoundaryExists: ${report.backendBoundaryExists === true}
` +
    `- serverOnlyKeyPolicyWorks: ${report.serverOnlyKeyPolicyWorks === true}
` +
    `- backendEndpointMapWorks: ${report.backendEndpointMapWorks === true}
` +
    `- rolePermissionPlanWorks: ${report.rolePermissionPlanWorks === true}
` +
    `- voiceRealtimeBoundaryWorks: ${report.voiceRealtimeBoundaryWorks === true}
` +
    `- deploymentChecklistWorks: ${report.deploymentChecklistWorks === true}
` +
    `- openAiKeyQuestionStaysLocked: ${report.openAiKeyQuestionStaysLocked === true}
` +
    `- chatgptConnectionQuestionStaysLocked: ${report.chatgptConnectionQuestionStaysLocked === true}
` +
    `- liveVoiceQuestionStaysLocked: ${report.liveVoiceQuestionStaysLocked === true}
` +
    `- exportQuestionStaysLocked: ${report.exportQuestionStaysLocked === true}\n` +
    `- uploadQuestionStaysLocked: ${report.uploadQuestionStaysLocked === true}\n` +
    `- chatgptConnectionQuestionStaysLocked: ${report.chatgptConnectionQuestionStaysLocked === true}\n` +
    `- toolGatewayRuntimeExists: ${report.toolGatewayRuntimeExists === true}\n` +
    `- toolRequestEnvelopeDryRunWorks: ${report.toolRequestEnvelopeDryRunWorks === true}\n` +
    `- toolResponseEnvelopeDryRunWorks: ${report.toolResponseEnvelopeDryRunWorks === true}\n` +
    `- contractValidationWorks: ${report.contractValidationWorks === true}\n` +
    `- permissionGateDryRunWorks: ${report.permissionGateDryRunWorks === true}\n` +
    `- auditPlaceholderWorks: ${report.auditPlaceholderWorks === true}\n` +
    `- undoPlaceholderWorks: ${report.undoPlaceholderWorks === true}\n` +
    `- exportDryRunStaysLocked: ${report.exportDryRunStaysLocked === true}\n` +
    `- uploadDryRunStaysLocked: ${report.uploadDryRunStaysLocked === true}\n` +
    `- visualRouteStillWorks: ${report.visualRouteStillWorks === true}\n` +
    `- spokenReadbackAvailable: ${report.spokenReadbackAvailable}\n` +
    `- spokenReadbackBrowserUnavailableFallback: ${report.spokenReadbackBrowserUnavailableFallback}\n` +
    `- automationCommandRoutesBeforeFallback: ${report.extensionRegression && report.extensionRegression.automationCommandRoutesBeforeFallback === true}\n` +
    `- showAutomationReportCommandWorks: ${report.extensionRegression && report.extensionRegression.showAutomationReportCommandWorks === true}\n` +
    `- runRegressionQaCommandWorks: ${report.extensionRegression && report.extensionRegression.runRegressionQaCommandWorks === true}\n` +
    `- automationCommandsDoNotFallback: ${report.extensionRegression && report.extensionRegression.automationCommandsDoNotFallback === true}\n` +
    `- askModeRouterWorks: ${report.extensionRegression && report.extensionRegression.askModeRouterWorks === true}\n` +
    `- voiceBrainToolRegistryExists: ${report.voiceBrainToolRegistryExists === true}\n` +
    `- voiceBrainIntentClassifierWorks: ${report.voiceBrainIntentClassifierWorks === true}\n` +
    `- hendersonReportIntentWorks: ${report.hendersonReportIntentWorks === true}\n` +
    `- hendersonReceiptsIntentWorks: ${report.hendersonReceiptsIntentWorks === true}\n` +
    `- accountantExportStaysLocked: ${report.accountantExportStaysLocked === true}\n` +
    `- plumbingSpendIntentWorks: ${report.plumbingSpendIntentWorks === true}\n` +
    `- cameraAllocationIntentWorks: ${report.cameraAllocationIntentWorks === true}\n` +
    `- constructionDiagramUploadStaysLocked: ${report.constructionDiagramUploadStaysLocked === true}\n` +
    `- suggestNextStepWorks: ${report.suggestNextStepWorks === true}\n` +
    `- workflowPlannerExists: ${report.workflowPlannerExists === true}\n` +
    `- receiptExportWorkflowWorks: ${report.receiptExportWorkflowWorks === true}\n` +
    `- reportReviewWorkflowWorks: ${report.reportReviewWorkflowWorks === true}\n` +
    `- missingDocumentsWorkflowWorks: ${report.missingDocumentsWorkflowWorks === true}\n` +
    `- spendBudgetWorkflowWorks: ${report.spendBudgetWorkflowWorks === true}\n` +
    `- uploadWorkflowStaysLocked: ${report.uploadWorkflowStaysLocked === true}\n` +
    `- cameraWorkflowWorks: ${report.cameraWorkflowWorks === true}\n` +
    `- dailyAttentionWorkflowWorks: ${report.dailyAttentionWorkflowWorks === true}\n` +
    `- saveWorkflowPlanWorks: ${report.saveWorkflowPlanWorks === true}\n` +
    `- showLastWorkflowPlanWorks: ${report.showLastWorkflowPlanWorks === true}\n` +
    `- copyWorkflowPlanWorks: ${report.copyWorkflowPlanWorks === true}\n` +
    `- clearWorkflowPlanWorks: ${report.clearWorkflowPlanWorks === true}\n` +
    `- ownerReviewDemoWorks: ${report.ownerReviewDemoWorks === true}\n` +
    `- workflowMemoryExists: ${report.workflowMemoryExists === true}\n` +
    `- activeWorkflowSaved: ${report.activeWorkflowSaved === true}\n` +
    `- followUpContinuationWorks: ${report.followUpContinuationWorks === true}\n` +
    `- exportPacketFollowUpWorks: ${report.exportPacketFollowUpWorks === true}\n` +
    `- approvalFollowUpWorks: ${report.approvalFollowUpWorks === true}\n` +
    `- ownerReviewDemoFollowUpWorks: ${report.ownerReviewDemoFollowUpWorks === true}\n` +
    `- readbackFollowUpWorks: ${report.readbackFollowUpWorks === true}\n` +
    `- spendPivotUsesActiveProject: ${report.spendPivotUsesActiveProject === true}\n` +
    `- clearActiveWorkflowWorks: ${report.clearActiveWorkflowWorks === true}\n` +
    `- noContextFollowUpHandled: ${report.noContextFollowUpHandled === true}\n` +
    `- voiceInteractionControllerExists: ${report.voiceInteractionControllerExists === true}
` +
    `- voiceStatePanelWorks: ${report.voiceStatePanelWorks === true}
` +
    `- voiceOnOffWorks: ${report.voiceOnOffWorks === true}
` +
    `- repeatLastResponseWorks: ${report.repeatLastResponseWorks === true}
` +
    `- stopSpeakingWorks: ${report.stopSpeakingWorks === true}
` +
    `- manualFallbackWorks: ${report.manualFallbackWorks === true}
` +
    `- assistantInterfaceExists: ${report.assistantInterfaceExists === true}
` +
    `- unifiedConversationSurfaceWorks: ${report.unifiedConversationSurfaceWorks === true}
` +
    `- commandUnderstandingPanelWorks: ${report.commandUnderstandingPanelWorks === true}
` +
    `- currentFocusPanelWorks: ${report.currentFocusPanelWorks === true}
` +
    `- responseDraftPanelWorks: ${report.responseDraftPanelWorks === true}
` +
    `- nextSuggestionsWork: ${report.nextSuggestionsWork === true}
` +
    `- permissionSummaryWorks: ${report.permissionSummaryWorks === true}
` +
    `- assistantContextWorks: ${report.assistantContextWorks === true}
` +
    `- clearAssistantContextWorks: ${report.clearAssistantContextWorks === true}
` +
    `- inputTargetingStillCorrect: ${report.inputTargetingStillCorrect === true}
` +
    `- primaryAssistantInterfaceExists: ${report.primaryAssistantInterfaceExists === true}
` +
    `- aiButtonOpensPrimaryAssistant: ${report.aiButtonOpensPrimaryAssistant === true}
` +
    `- mainCommandInputWorks: ${report.mainCommandInputWorks === true}
` +
    `- quickControlsSecondary: ${report.quickControlsSecondary === true}
` +
    `- manualControlsWork: ${report.manualControlsWork === true}
` +
    `- commandUnderstandingStillWorks: ${report.commandUnderstandingStillWorks === true}
` +
    `- currentFocusStillWorks: ${report.currentFocusStillWorks === true}
` +
    `- responseDraftStillWorks: ${report.responseDraftStillWorks === true}
` +
    `- nextSuggestionsStillWork: ${report.nextSuggestionsStillWork === true}
` +
    `- permissionSummaryStillWorks: ${report.permissionSummaryStillWorks === true}
` +
    `- automationReportStillWorks: ${report.automationReportStillWorks === true}
` +
    `- regressionQaStillWorks: ${report.regressionQaStillWorks === true}
` +
    `- assistantRuntimeExists: ${report.assistantRuntimeExists === true}
` +
    `- assistantTurnChainWorks: ${report.assistantTurnChainWorks === true}
` +
    `- assistantSurfaceUpdatesWork: ${report.assistantSurfaceUpdatesWork === true}
` +
    `- commandUnderstandingUpdatesWork: ${report.commandUnderstandingUpdatesWork === true}
` +
    `- currentFocusUpdatesWork: ${report.currentFocusUpdatesWork === true}
` +
    `- responseDraftUpdatesWork: ${report.responseDraftUpdatesWork === true}
` +
    `- permissionSummaryUpdatesWork: ${report.permissionSummaryUpdatesWork === true}
` +
    `- nextSuggestionsUpdateWork: ${report.nextSuggestionsUpdateWork === true}
` +
    `- workflowFollowUpRuntimeWorks: ${report.workflowFollowUpRuntimeWorks === true}
` +
    `- sessionFollowUpRuntimeWorks: ${report.sessionFollowUpRuntimeWorks === true}
` +
    `- manualFallbackRuntimeWorks: ${report.manualFallbackRuntimeWorks === true}
` +
    `- automationPriorityStillWorks: ${report.automationPriorityStillWorks === true}
` +
    `- automationReportStillWorks: ${report.automationReportStillWorks === true}
` +
    `- continueUsesWorkflowMemory: ${report.continueUsesWorkflowMemory === true}
` +
    `- permissionQuestionVoiceStateWorks: ${report.permissionQuestionVoiceStateWorks === true}
` +
    `- voiceSessionControllerExists: ${report.voiceSessionControllerExists === true}\n` +
    `- aquaSessionPanelWorks: ${report.aquaSessionPanelWorks === true}\n` +
    `- startSessionWorks: ${report.startSessionWorks === true}\n` +
    `- activeProjectContextWorks: ${report.activeProjectContextWorks === true}\n` +
    `- missingInputFollowUpWorks: ${report.missingInputFollowUpWorks === true}\n` +
    `- accountantExportContextWorks: ${report.accountantExportContextWorks === true}\n` +
    `- continueSessionWorks: ${report.continueSessionWorks === true}\n` +
    `- cancelSessionWorks: ${report.cancelSessionWorks === true}\n` +
    `- manualModeWorks: ${report.manualModeWorks === true}\n` +
    `- aquaBrainCommandCenterWorks: ${report.aquaBrainCommandCenterWorks === true}\n` +
    `- voiceBrainPlanViewerWorks: ${report.voiceBrainPlanViewerWorks === true}\n` +
    `- saveVoiceBrainPlanWorks: ${report.saveVoiceBrainPlanWorks === true}\n` +
    `- showLastVoiceBrainPlanWorks: ${report.showLastVoiceBrainPlanWorks === true}\n` +
    `- clearVoiceBrainPlanWorks: ${report.clearVoiceBrainPlanWorks === true}\n` +
    `- copyToolPlanWorks: ${report.copyToolPlanWorks === true}\n` +
    `- permissionExplanationWorks: ${report.permissionExplanationWorks === true}\n` +
    `- visualRouteBridgeV62CWorks: ${report.visualRouteBridgeV62CWorks === true}\n` +
    `- visualRouteFocusMarkerV62CWorks: ${report.visualRouteFocusMarkerV62CWorks === true}\n` +
    `- visualRouteReadbackBoundV62CWorks: ${report.visualRouteReadbackBoundV62CWorks === true}\n` +
    `- liveInAppRegressionRunnerV62DWorks: ${report.liveInAppRegressionRunnerV62DWorks === true}\n` +
    `- reportSyncV62DWorks: ${report.reportSyncV62DWorks === true}\n` +
    `- reportSyncNoNetworkV62D: ${report.reportSyncNoNetworkV62D === true}\n` +
    `- aiNavigationExecutorWorks: ${report.aiNavigationExecutorWorks === true}\n` +
    `- visualFocusExecutorWorks: ${report.visualFocusExecutorWorks === true}\n` +
    `- focusedRouteMarkerWorks: ${report.focusedRouteMarkerWorks === true}\n` +
    `- hendersonReportNavigationWorks: ${report.hendersonReportNavigationWorks === true}\n` +
    `- hendersonStaircaseNavigationWorks: ${report.hendersonStaircaseNavigationWorks === true}\n` +
    `- hendersonReceiptsNavigationWorks: ${report.hendersonReceiptsNavigationWorks === true}\n` +
    `- hendersonPlumbingSpendNavigationWorks: ${report.hendersonPlumbingSpendNavigationWorks === true}\n` +
    `- missingDocumentsNavigationWorks: ${report.missingDocumentsNavigationWorks === true}\n` +
    `- cameraAllocationNavigationWorks: ${report.cameraAllocationNavigationWorks === true}\n` +
    `- accountantExportNavigationLocked: ${report.accountantExportNavigationLocked === true}\n` +
    `- uploadNavigationLocked: ${report.uploadNavigationLocked === true}\n` +
    `- allVoiceBrainPlansHaveVisualRouteV62C: ${report.allVoiceBrainPlansHaveVisualRouteV62C === true}\n` +
    `- hendersonReportVisualFocusWorks: ${report.hendersonReportVisualFocusWorks === true}\n` +
    `- hendersonReceiptsVisualFocusWorks: ${report.hendersonReceiptsVisualFocusWorks === true}\n` +
    `- accountantExportVisualFocusWorks: ${report.accountantExportVisualFocusWorks === true}\n` +
    `- plumbingSpendVisualFocusWorks: ${report.plumbingSpendVisualFocusWorks === true}\n` +
    `- cameraAllocationVisualFocusWorks: ${report.cameraAllocationVisualFocusWorks === true}\n` +
    `- missingDocumentsVisualFocusWorks: ${report.missingDocumentsVisualFocusWorks === true}\n` +
    `- uploadRequestVisualFocusWorks: ${report.uploadRequestVisualFocusWorks === true}\n` +
    `- nextActionVisualFocusWorks: ${report.nextActionVisualFocusWorks === true}\n` +
    `- appNavigationModeWorks: ${report.extensionRegression && report.extensionRegression.appNavigationModeWorks === true}\n` +
    `- automationStatusModeWorks: ${report.extensionRegression && report.extensionRegression.automationStatusModeWorks === true}\n` +
    `- permissionedActionModeWorks: ${report.extensionRegression && report.extensionRegression.permissionedActionModeWorks === true}\n` +
    `- generalAskLockedWorks: ${report.extensionRegression && report.extensionRegression.generalAskLockedWorks === true}\n` +
    `- jobsiteCalculatorWorks: ${report.extensionRegression && report.extensionRegression.jobsiteCalculatorWorks === true}\n` +
    `- concreteSonotubeCalculatorWorks: ${report.extensionRegression && report.extensionRegression.concreteSonotubeCalculatorWorks === true}\n` +
    `- paintCalculatorWorks: ${report.extensionRegression && report.extensionRegression.paintCalculatorWorks === true}\n` +
    `- drywallCalculatorWorks: ${report.extensionRegression && report.extensionRegression.drywallCalculatorWorks === true}\n` +
    `- flooringCalculatorWorks: ${report.extensionRegression && report.extensionRegression.flooringCalculatorWorks === true}\n` +
    `- studCalculatorWorks: ${report.extensionRegression && report.extensionRegression.studCalculatorWorks === true}\n` +
    `- concreteSlabCalculatorWorks: ${report.extensionRegression && report.extensionRegression.concreteSlabCalculatorWorks === true}\n` +
    `- needMoreInformationWorks: ${report.extensionRegression && report.extensionRegression.needMoreInformationWorks === true}\n` +
    `- calculatorDraftsWork: ${report.calculatorDraftsWork === true}\n` +
    `- saveCalculationDraftWorks: ${report.saveCalculationDraftWorks === true}\n` +
    `- showSavedCalculationsWorks: ${report.showSavedCalculationsWorks === true}\n` +
    `- clearSavedCalculationsWorks: ${report.clearSavedCalculationsWorks === true}\n` +
    `- addToEstimateDraftLockedWorks: ${report.addToEstimateDraftLockedWorks === true}\n` +
    `- sowReviewQueueWorks: ${report.sowReviewQueueWorks === true}\n` +
    `- sendToSowReviewWorks: ${report.sendToSowReviewWorks === true}\n` +
    `- showSowReviewQueueWorks: ${report.showSowReviewQueueWorks === true}\n` +
    `- markReviewReadyDemoWorks: ${report.markReviewReadyDemoWorks === true}\n` +
    `- clearSowReviewQueueWorks: ${report.clearSowReviewQueueWorks === true}\n` +
    `- noLiveSowCreated: ${report.noLiveSowCreated === true}\n` +
    `- noLiveEstimateCreated: ${report.noLiveEstimateCreated === true}\n` +
    `- noCustomerExport: ${report.noCustomerExport === true}\n` +
    `- unsupportedGeneralAskRemainsLocked: ${report.extensionRegression && report.extensionRegression.unsupportedGeneralAskRemainsLocked === true}\n` +
    `- sonotubeEightInchFourFoot80lbReturnsThreeBags: ${report.extensionRegression && report.extensionRegression.sonotubeEightInchFourFoot80lbReturnsThreeBags === true}\n` +
    `- saunaTubeNormalizesToSonotube: ${report.extensionRegression && report.extensionRegression.saunaTubeNormalizesToSonotube === true}\n` +
    `- unknownFallbackWorks: ${report.extensionRegression && report.extensionRegression.unknownFallbackWorks === true}\n` +
    `- noBackendCalls: ${report.noBackendCalls === true}\n` +
    `- noNetworkCalls: ${report.noNetworkCalls === true}\n` +
    `- noExternalAIApiCalls: ${report.noExternalAIApiCalls === true}\n` +
    `- noExternalAIAPICalls: ${report.noExternalAIAPICalls === true}\n` +
    `- noApiKeysInFrontend: ${report.extensionRegression && report.extensionRegression.noApiKeysInFrontend === true}\n` +
    `- noLiveRecordChanges: ${report.noLiveRecordChanges === true}\n` +
    `- noAudioStorage: ${report.noAudioStorage === true}\n` +
    `- noPaymentPayrollBankAccountingExport: ${report.noPaymentPayrollBankAccountingExport === true}\n\n` +
    `## Files Changed\n${changedRows}\n\n` +
    `## Failed Commands / Checks\n${failedRows}\n\n` +
    `## Safety Status\n${safetyRows}\n\n` +
    `## Browser Visual Test\n- Status: ${report.browserVisualTest.status}\n- Reason: ${report.browserVisualTest.reason || 'n/a'}\n${report.browserVisualTest.screenshotPath ? `- Screenshot: ${report.browserVisualTest.screenshotPath}\n` : ''}\n` +
    `## Skipped Tests\n${skippedRows}\n\n` +
    `## Merge Recommendation\n${report.mergeRecommendation}\n\n` +
    `## Gate Self-Test\n` +
    `- passingReportAllowsMerge: ${gateSelfTest.passingReportAllowsMerge === true ? 'PASS' : 'FAIL'}\n` +
    `- failingReportBlocksMerge: ${gateSelfTest.failingReportBlocksMerge === true ? 'PASS' : 'FAIL'}\n` +
    `- simulatedFailureDoesNotModifyApp: ${gateSelfTest.simulatedFailureDoesNotModifyApp === true ? 'PASS' : 'FAIL'}\n` +
    `- fakePassingRecommendation: ${gateSelfTest.fakePassingRecommendation || 'unavailable'}\n` +
    `- fakeFailingRecommendation: ${gateSelfTest.fakeFailingRecommendation || 'unavailable'}\n\n` +
    `## Gate Violations\n${gateRows}\n\n` +
    `## Extension Regression Summary\n` +
    `- Version: ${report.extensionRegression && report.extensionRegression.version ? report.extensionRegression.version : 'unavailable'}\n` +
    `- Total: ${report.extensionRegression && report.extensionRegression.total ? report.extensionRegression.total : 0}\n` +
    `- Passed: ${report.extensionRegression && Number.isFinite(Number(report.extensionRegression.passed)) ? report.extensionRegression.passed : 0}\n` +
    `- Failed: ${report.extensionRegression && Number.isFinite(Number(report.extensionRegression.failed)) ? report.extensionRegression.failed : 0}\n\n` +
    `## Copyable Codex Repair Prompt\n\n` +
    '```text\n' + report.repairPrompt + '\n```\n';
}

async function main() {
  checkStaticFiles();
  runExtensionRegression();
  await runBrowserVisualTestIfAvailable();
  const safetyStatus = runSafetyGate();
  const gateSelfTest = runMergeGateSelfTest();
  const conflictMarkerFiles = filesWithConflictMarkers();
  const htmlGitStatus = runGit(['status', '--short', '--', HTML_KEEPER]);
  const changed = Array.from(new Set(runGit(['diff', '--name-only'], '').split('\n').concat(runGit(['ls-files', '--others', '--exclude-standard'], '').split('\n'), [JSON_REPORT, MD_REPORT]).map((name) => name.trim()).filter(Boolean)));
  const workflowExists = fileExists('.github/workflows/aqua-regression.yml');
  addCheck('GitHub Action exists', workflowExists, { layer: 'github-action', fileToFix: '.github/workflows/aqua-regression.yml' });

  const report = {
    version: VERSION,
    timestamp: nowIso(),
    branch: runGit(['rev-parse', '--abbrev-ref', 'HEAD'], ''),
    commit: runGit(['rev-parse', 'HEAD'], ''),
    filesChanged: changed,
    total: checks.length,
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => !check.passed).length,
    failedCommands: failedCommands(),
    checks,
    skippedTests: skipped,
    safetyStatus,
    browserVisualTest,
    extensionRegression: extensionReport,
    askModeRouterWorks: extensionReport ? extensionReport.askModeRouterWorks === true : false,
    appNavigationModeWorks: extensionReport ? extensionReport.appNavigationModeWorks === true : false,
    automationStatusModeWorks: extensionReport ? extensionReport.automationStatusModeWorks === true : false,
    permissionedActionModeWorks: extensionReport ? extensionReport.permissionedActionModeWorks === true : false,
    generalAskLockedWorks: extensionReport ? extensionReport.generalAskLockedWorks === true : false,
    jobsiteCalculatorWorks: extensionReport ? extensionReport.jobsiteCalculatorWorks === true : false,
    concreteSonotubeCalculatorWorks: extensionReport ? extensionReport.concreteSonotubeCalculatorWorks === true : false,
    paintCalculatorWorks: extensionReport ? extensionReport.paintCalculatorWorks === true : false,
    drywallCalculatorWorks: extensionReport ? extensionReport.drywallCalculatorWorks === true : false,
    flooringCalculatorWorks: extensionReport ? extensionReport.flooringCalculatorWorks === true : false,
    studCalculatorWorks: extensionReport ? extensionReport.studCalculatorWorks === true : false,
    concreteSlabCalculatorWorks: extensionReport ? extensionReport.concreteSlabCalculatorWorks === true : false,
    needMoreInformationWorks: extensionReport ? extensionReport.needMoreInformationWorks === true : false,
    unsupportedGeneralAskRemainsLocked: extensionReport ? extensionReport.unsupportedGeneralAskRemainsLocked === true : false,
    sonotubeEightInchFourFoot80lbReturnsThreeBags: extensionReport ? extensionReport.sonotubeEightInchFourFoot80lbReturnsThreeBags === true : false,
    unknownFallbackWorks: extensionReport ? extensionReport.unknownFallbackWorks === true : false,
    voiceBrainToolRegistryExists: extensionReport ? extensionReport.voiceBrainToolRegistryExists === true : false,
    voiceBrainIntentClassifierWorks: extensionReport ? extensionReport.voiceBrainIntentClassifierWorks === true : false,
    hendersonReportIntentWorks: extensionReport ? extensionReport.hendersonReportIntentWorks === true : false,
    hendersonReceiptsIntentWorks: extensionReport ? extensionReport.hendersonReceiptsIntentWorks === true : false,
    accountantExportStaysLocked: extensionReport ? extensionReport.accountantExportStaysLocked === true : false,
    plumbingSpendIntentWorks: extensionReport ? extensionReport.plumbingSpendIntentWorks === true : false,
    cameraAllocationIntentWorks: extensionReport ? extensionReport.cameraAllocationIntentWorks === true : false,
    constructionDiagramUploadStaysLocked: extensionReport ? extensionReport.constructionDiagramUploadStaysLocked === true : false,
    suggestNextStepWorks: extensionReport ? extensionReport.suggestNextStepWorks === true : false,
    workflowPlannerExists: extensionReport ? extensionReport.workflowPlannerExists === true : false,
    receiptExportWorkflowWorks: extensionReport ? extensionReport.receiptExportWorkflowWorks === true : false,
    reportReviewWorkflowWorks: extensionReport ? extensionReport.reportReviewWorkflowWorks === true : false,
    missingDocumentsWorkflowWorks: extensionReport ? extensionReport.missingDocumentsWorkflowWorks === true : false,
    spendBudgetWorkflowWorks: extensionReport ? extensionReport.spendBudgetWorkflowWorks === true : false,
    uploadWorkflowStaysLocked: extensionReport ? extensionReport.uploadWorkflowStaysLocked === true : false,
    cameraWorkflowWorks: extensionReport ? extensionReport.cameraWorkflowWorks === true : false,
    dailyAttentionWorkflowWorks: extensionReport ? extensionReport.dailyAttentionWorkflowWorks === true : false,
    saveWorkflowPlanWorks: extensionReport ? extensionReport.saveWorkflowPlanWorks === true : false,
    showLastWorkflowPlanWorks: extensionReport ? extensionReport.showLastWorkflowPlanWorks === true : false,
    copyWorkflowPlanWorks: extensionReport ? extensionReport.copyWorkflowPlanWorks === true : false,
    clearWorkflowPlanWorks: extensionReport ? extensionReport.clearWorkflowPlanWorks === true : false,
    ownerReviewDemoWorks: extensionReport ? extensionReport.ownerReviewDemoWorks === true : false,
    workflowMemoryExists: extensionReport ? extensionReport.workflowMemoryExists === true : false,
    activeWorkflowSaved: extensionReport ? extensionReport.activeWorkflowSaved === true : false,
    followUpContinuationWorks: extensionReport ? extensionReport.followUpContinuationWorks === true : false,
    exportPacketFollowUpWorks: extensionReport ? extensionReport.exportPacketFollowUpWorks === true : false,
    approvalFollowUpWorks: extensionReport ? extensionReport.approvalFollowUpWorks === true : false,
    ownerReviewDemoFollowUpWorks: extensionReport ? extensionReport.ownerReviewDemoFollowUpWorks === true : false,
    readbackFollowUpWorks: extensionReport ? extensionReport.readbackFollowUpWorks === true : false,
    spendPivotUsesActiveProject: extensionReport ? extensionReport.spendPivotUsesActiveProject === true : false,
    clearActiveWorkflowWorks: extensionReport ? extensionReport.clearActiveWorkflowWorks === true : false,
    noContextFollowUpHandled: extensionReport ? extensionReport.noContextFollowUpHandled === true : false,
    voiceInteractionControllerExists: extensionReport ? extensionReport.voiceInteractionControllerExists === true : false,
    voiceStatePanelWorks: extensionReport ? extensionReport.voiceStatePanelWorks === true : false,
    voiceOnOffWorks: extensionReport ? extensionReport.voiceOnOffWorks === true : false,
    repeatLastResponseWorks: extensionReport ? extensionReport.repeatLastResponseWorks === true : false,
    stopSpeakingWorks: extensionReport ? extensionReport.stopSpeakingWorks === true : false,
    manualFallbackWorks: extensionReport ? extensionReport.manualFallbackWorks === true : false,
    assistantInterfaceExists: extensionReport ? extensionReport.assistantInterfaceExists === true : false,
    unifiedConversationSurfaceWorks: extensionReport ? extensionReport.unifiedConversationSurfaceWorks === true : false,
    commandUnderstandingPanelWorks: extensionReport ? extensionReport.commandUnderstandingPanelWorks === true : false,
    currentFocusPanelWorks: extensionReport ? extensionReport.currentFocusPanelWorks === true : false,
    responseDraftPanelWorks: extensionReport ? extensionReport.responseDraftPanelWorks === true : false,
    nextSuggestionsWork: extensionReport ? extensionReport.nextSuggestionsWork === true : false,
    permissionSummaryWorks: extensionReport ? extensionReport.permissionSummaryWorks === true : false,
    assistantContextWorks: extensionReport ? extensionReport.assistantContextWorks === true : false,
    clearAssistantContextWorks: extensionReport ? extensionReport.clearAssistantContextWorks === true : false,
    inputTargetingStillCorrect: extensionReport ? extensionReport.inputTargetingStillCorrect === true : false,
    primaryAssistantInterfaceExists: extensionReport ? extensionReport.primaryAssistantInterfaceExists === true : false,
    aiButtonOpensPrimaryAssistant: extensionReport ? extensionReport.aiButtonOpensPrimaryAssistant === true : false,
    mainCommandInputWorks: extensionReport ? extensionReport.mainCommandInputWorks === true : false,
    quickControlsSecondary: extensionReport ? extensionReport.quickControlsSecondary === true : false,
    manualControlsWork: extensionReport ? extensionReport.manualControlsWork === true : false,
    commandUnderstandingStillWorks: extensionReport ? extensionReport.commandUnderstandingStillWorks === true : false,
    currentFocusStillWorks: extensionReport ? extensionReport.currentFocusStillWorks === true : false,
    responseDraftStillWorks: extensionReport ? extensionReport.responseDraftStillWorks === true : false,
    nextSuggestionsStillWork: extensionReport ? extensionReport.nextSuggestionsStillWork === true : false,
    permissionSummaryStillWorks: extensionReport ? extensionReport.permissionSummaryStillWorks === true : false,
    automationReportStillWorks: extensionReport ? extensionReport.automationReportStillWorks === true : false,
    regressionQaStillWorks: extensionReport ? extensionReport.regressionQaStillWorks === true : false,
    assistantRuntimeExists: extensionReport ? extensionReport.assistantRuntimeExists === true : false,
    assistantTurnChainWorks: extensionReport ? extensionReport.assistantTurnChainWorks === true : false,
    assistantSurfaceUpdatesWork: extensionReport ? extensionReport.assistantSurfaceUpdatesWork === true : false,
    commandUnderstandingUpdatesWork: extensionReport ? extensionReport.commandUnderstandingUpdatesWork === true : false,
    currentFocusUpdatesWork: extensionReport ? extensionReport.currentFocusUpdatesWork === true : false,
    responseDraftUpdatesWork: extensionReport ? extensionReport.responseDraftUpdatesWork === true : false,
    permissionSummaryUpdatesWork: extensionReport ? extensionReport.permissionSummaryUpdatesWork === true : false,
    nextSuggestionsUpdateWork: extensionReport ? extensionReport.nextSuggestionsUpdateWork === true : false,
    workflowFollowUpRuntimeWorks: extensionReport ? extensionReport.workflowFollowUpRuntimeWorks === true : false,
    sessionFollowUpRuntimeWorks: extensionReport ? extensionReport.sessionFollowUpRuntimeWorks === true : false,
    manualFallbackRuntimeWorks: extensionReport ? extensionReport.manualFallbackRuntimeWorks === true : false,
    automationPriorityStillWorks: extensionReport ? extensionReport.automationPriorityStillWorks === true : false,
    automationReportStillWorks: extensionReport ? extensionReport.showAutomationReportCommandWorks === true : false,
    continueUsesWorkflowMemory: extensionReport ? extensionReport.continueUsesWorkflowMemory === true : false,
    permissionQuestionVoiceStateWorks: extensionReport ? extensionReport.permissionQuestionVoiceStateWorks === true : false,
    voiceSessionControllerExists: extensionReport ? extensionReport.voiceSessionControllerExists === true : false,
    aquaSessionPanelWorks: extensionReport ? extensionReport.aquaSessionPanelWorks === true : false,
    startSessionWorks: extensionReport ? extensionReport.startSessionWorks === true : false,
    activeProjectContextWorks: extensionReport ? extensionReport.activeProjectContextWorks === true : false,
    missingInputFollowUpWorks: extensionReport ? extensionReport.missingInputFollowUpWorks === true : false,
    accountantExportContextWorks: extensionReport ? extensionReport.accountantExportContextWorks === true : false,
    continueSessionWorks: extensionReport ? extensionReport.continueSessionWorks === true : false,
    cancelSessionWorks: extensionReport ? extensionReport.cancelSessionWorks === true : false,
    manualModeWorks: extensionReport ? extensionReport.manualModeWorks === true : false,
    toolGatewayContractExists: extensionReport ? extensionReport.toolGatewayContractExists === true : false,
    toolRequestEnvelopeWorks: extensionReport ? extensionReport.toolRequestEnvelopeWorks === true : false,
    toolResponseEnvelopeWorks: extensionReport ? extensionReport.toolResponseEnvelopeWorks === true : false,
    toolContractMapWorks: extensionReport ? extensionReport.toolContractMapWorks === true : false,
    permissionMapWorks: extensionReport ? extensionReport.permissionMapWorks === true : false,
    riskMapWorks: extensionReport ? extensionReport.riskMapWorks === true : false,
    approvalRoutesWork: extensionReport ? extensionReport.approvalRoutesWork === true : false,
    frontendBlockRulesWork: extensionReport ? extensionReport.frontendBlockRulesWork === true : false,
    exportQuestionStaysLocked: extensionReport ? extensionReport.exportQuestionStaysLocked === true : false,
    uploadQuestionStaysLocked: extensionReport ? extensionReport.uploadQuestionStaysLocked === true : false,
    chatgptConnectionQuestionStaysLocked: extensionReport ? extensionReport.chatgptConnectionQuestionStaysLocked === true : false,
    toolGatewayRuntimeExists: extensionReport ? extensionReport.toolGatewayRuntimeExists === true : false,
    toolRequestEnvelopeDryRunWorks: extensionReport ? extensionReport.toolRequestEnvelopeDryRunWorks === true : false,
    toolResponseEnvelopeDryRunWorks: extensionReport ? extensionReport.toolResponseEnvelopeDryRunWorks === true : false,
    contractValidationWorks: extensionReport ? extensionReport.contractValidationWorks === true : false,
    permissionGateDryRunWorks: extensionReport ? extensionReport.permissionGateDryRunWorks === true : false,
    auditPlaceholderWorks: extensionReport ? extensionReport.auditPlaceholderWorks === true : false,
    undoPlaceholderWorks: extensionReport ? extensionReport.undoPlaceholderWorks === true : false,
    exportDryRunStaysLocked: extensionReport ? extensionReport.exportDryRunStaysLocked === true : false,
    uploadDryRunStaysLocked: extensionReport ? extensionReport.uploadDryRunStaysLocked === true : false,
    visualRouteStillWorks: extensionReport ? extensionReport.visualRouteStillWorks === true : false,
    aquaBrainCommandCenterWorks: extensionReport ? extensionReport.aquaBrainCommandCenterWorks === true : false,
    voiceBrainPlanViewerWorks: extensionReport ? extensionReport.voiceBrainPlanViewerWorks === true : false,
    saveVoiceBrainPlanWorks: extensionReport ? extensionReport.saveVoiceBrainPlanWorks === true : false,
    showLastVoiceBrainPlanWorks: extensionReport ? extensionReport.showLastVoiceBrainPlanWorks === true : false,
    clearVoiceBrainPlanWorks: extensionReport ? extensionReport.clearVoiceBrainPlanWorks === true : false,
    copyToolPlanWorks: extensionReport ? extensionReport.copyToolPlanWorks === true : false,
    permissionExplanationWorks: extensionReport ? extensionReport.permissionExplanationWorks === true : false,
    visualRouteBridgeV62CWorks: extensionReport ? extensionReport.visualRouteBridgeV62CWorks === true : false,
    visualRouteFocusMarkerV62CWorks: extensionReport ? extensionReport.visualRouteFocusMarkerV62CWorks === true : false,
    visualRouteReadbackBoundV62CWorks: extensionReport ? extensionReport.visualRouteReadbackBoundV62CWorks === true : false,
    liveInAppRegressionRunnerV62DWorks: extensionReport ? extensionReport.liveInAppRegressionRunnerV62DWorks === true : false,
    reportSyncV62DWorks: extensionReport ? extensionReport.reportSyncV62DWorks === true : false,
    reportSyncNoNetworkV62D: extensionReport ? extensionReport.reportSyncNoNetworkV62D === true : false,
    aiNavigationExecutorWorks: extensionReport ? extensionReport.aiNavigationExecutorWorks === true : false,
    visualFocusExecutorWorks: extensionReport ? extensionReport.visualFocusExecutorWorks === true : false,
    focusedRouteMarkerWorks: extensionReport ? extensionReport.focusedRouteMarkerWorks === true : false,
    hendersonReportNavigationWorks: extensionReport ? extensionReport.hendersonReportNavigationWorks === true : false,
    hendersonStaircaseNavigationWorks: extensionReport ? extensionReport.hendersonStaircaseNavigationWorks === true : false,
    hendersonReceiptsNavigationWorks: extensionReport ? extensionReport.hendersonReceiptsNavigationWorks === true : false,
    hendersonPlumbingSpendNavigationWorks: extensionReport ? extensionReport.hendersonPlumbingSpendNavigationWorks === true : false,
    missingDocumentsNavigationWorks: extensionReport ? extensionReport.missingDocumentsNavigationWorks === true : false,
    cameraAllocationNavigationWorks: extensionReport ? extensionReport.cameraAllocationNavigationWorks === true : false,
    accountantExportNavigationLocked: extensionReport ? extensionReport.accountantExportNavigationLocked === true : false,
    uploadNavigationLocked: extensionReport ? extensionReport.uploadNavigationLocked === true : false,
    reportSyncStorageKeyV62D: extensionReport ? extensionReport.reportSyncStorageKeyV62D || 'aquaRegressionReportSyncV62D' : 'aquaRegressionReportSyncV62D',
    allVoiceBrainPlansHaveVisualRouteV62C: extensionReport ? extensionReport.allVoiceBrainPlansHaveVisualRouteV62C === true : false,
    hendersonReportVisualFocusWorks: extensionReport ? extensionReport.hendersonReportVisualFocusWorks === true : false,
    hendersonReceiptsVisualFocusWorks: extensionReport ? extensionReport.hendersonReceiptsVisualFocusWorks === true : false,
    accountantExportVisualFocusWorks: extensionReport ? extensionReport.accountantExportVisualFocusWorks === true : false,
    plumbingSpendVisualFocusWorks: extensionReport ? extensionReport.plumbingSpendVisualFocusWorks === true : false,
    cameraAllocationVisualFocusWorks: extensionReport ? extensionReport.cameraAllocationVisualFocusWorks === true : false,
    missingDocumentsVisualFocusWorks: extensionReport ? extensionReport.missingDocumentsVisualFocusWorks === true : false,
    uploadRequestVisualFocusWorks: extensionReport ? extensionReport.uploadRequestVisualFocusWorks === true : false,
    nextActionVisualFocusWorks: extensionReport ? extensionReport.nextActionVisualFocusWorks === true : false,
    calculatorDraftsWork: extensionReport ? extensionReport.calculatorDraftsWork === true : false,
    saveCalculationDraftWorks: extensionReport ? extensionReport.saveCalculationDraftWorks === true : false,
    showSavedCalculationsWorks: extensionReport ? extensionReport.showSavedCalculationsWorks === true : false,
    clearSavedCalculationsWorks: extensionReport ? extensionReport.clearSavedCalculationsWorks === true : false,
    addToEstimateDraftLockedWorks: extensionReport ? extensionReport.addToEstimateDraftLockedWorks === true : false,
    sowReviewQueueWorks: extensionReport ? extensionReport.sowReviewQueueWorks === true : false,
    sendToSowReviewWorks: extensionReport ? extensionReport.sendToSowReviewWorks === true : false,
    showSowReviewQueueWorks: extensionReport ? extensionReport.showSowReviewQueueWorks === true : false,
    markReviewReadyDemoWorks: extensionReport ? extensionReport.markReviewReadyDemoWorks === true : false,
    clearSowReviewQueueWorks: extensionReport ? extensionReport.clearSowReviewQueueWorks === true : false,
    noLiveSowCreated: extensionReport ? extensionReport.noLiveSowCreated === true : false,
    brainControlMatrixExists: extensionReport ? extensionReport.brainControlMatrixExists === true : false,
    aiInterfaceMapWorks: extensionReport ? extensionReport.aiInterfaceMapWorks === true : false,
    moduleCoverageWorks: extensionReport ? extensionReport.moduleCoverageWorks === true : false,
    workflowCoverageWorks: extensionReport ? extensionReport.workflowCoverageWorks === true : false,
    voiceCoverageWorks: extensionReport ? extensionReport.voiceCoverageWorks === true : false,
    visualRouteCoverageWorks: extensionReport ? extensionReport.visualRouteCoverageWorks === true : false,
    readbackCoverageWorks: extensionReport ? extensionReport.readbackCoverageWorks === true : false,
    permissionGateCoverageWorks: extensionReport ? extensionReport.permissionGateCoverageWorks === true : false,
    manualFallbackCoverageWorks: extensionReport ? extensionReport.manualFallbackCoverageWorks === true : false,
    backendReadinessCoverageWorks: extensionReport ? extensionReport.backendReadinessCoverageWorks === true : false,
    coverageValidationWorks: extensionReport ? extensionReport.coverageValidationWorks === true : false,
    dataQueryRuntimeExists: extensionReport ? extensionReport.dataQueryRuntimeExists === true : false,
    queryNormalizerWorks: extensionReport ? extensionReport.queryNormalizerWorks === true : false,
    projectAliasResolverWorks: extensionReport ? extensionReport.projectAliasResolverWorks === true : false,
    hendersonReportQueryWorks: extensionReport ? extensionReport.hendersonReportQueryWorks === true : false,
    hendersonStaircaseQueryWorks: extensionReport ? extensionReport.hendersonStaircaseQueryWorks === true : false,
    hendersonHomeDepotReceiptQueryWorks: extensionReport ? extensionReport.hendersonHomeDepotReceiptQueryWorks === true : false,
    hendersonPlumbingSpendQueryWorks: extensionReport ? extensionReport.hendersonPlumbingSpendQueryWorks === true : false,
    hendersonMissingDocumentsQueryWorks: extensionReport ? extensionReport.hendersonMissingDocumentsQueryWorks === true : false,
    hendersonCameraQueryWorks: extensionReport ? extensionReport.hendersonCameraQueryWorks === true : false,
    hendersonApprovalQueryWorks: extensionReport ? extensionReport.hendersonApprovalQueryWorks === true : false,
    hendersonExportPacketQueryWorks: extensionReport ? extensionReport.hendersonExportPacketQueryWorks === true : false,
    visualRoutesGeneratedForQueries: extensionReport ? extensionReport.visualRoutesGeneratedForQueries === true : false,
    spokenSummariesGeneratedForQueries: extensionReport ? extensionReport.spokenSummariesGeneratedForQueries === true : false,
    fuzzyLanguageResolverExists: extensionReport ? extensionReport.fuzzyLanguageResolverExists === true : false,
    correctionMapWorks: extensionReport ? extensionReport.correctionMapWorks === true : false,
    confidenceScoringWorks: extensionReport ? extensionReport.confidenceScoringWorks === true : false,
    receiptMishearCorrectionWorks: extensionReport ? extensionReport.receiptMishearCorrectionWorks === true : false,
    draftQueueMishearCorrectionWorks: extensionReport ? extensionReport.draftQueueMishearCorrectionWorks === true : false,
    sonotubeMishearCorrectionWorks: extensionReport ? extensionReport.sonotubeMishearCorrectionWorks === true : false,
    hendersonProjectMishearCorrectionWorks: extensionReport ? extensionReport.hendersonProjectMishearCorrectionWorks === true : false,
    homeDepotMishearCorrectionWorks: extensionReport ? extensionReport.homeDepotMishearCorrectionWorks === true : false,
    plumbingMishearCorrectionWorks: extensionReport ? extensionReport.plumbingMishearCorrectionWorks === true : false,
    accountantExportMishearCorrectionWorks: extensionReport ? extensionReport.accountantExportMishearCorrectionWorks === true : false,
    sowScopeMishearCorrectionWorks: extensionReport ? extensionReport.sowScopeMishearCorrectionWorks === true : false,
    payablesAliasWorks: extensionReport ? extensionReport.payablesAliasWorks === true : false,
    approvalAliasWorks: extensionReport ? extensionReport.approvalAliasWorks === true : false,
    clarificationForAmbiguousCommandWorks: extensionReport ? extensionReport.clarificationForAmbiguousCommandWorks === true : false,
    automationCommandsStillRouteFirst: extensionReport ? extensionReport.automationCommandsStillRouteFirst === true : false,
    backendSchemaExists: extensionReport ? extensionReport.backendSchemaExists === true : false,
    entityContractsExist: extensionReport ? extensionReport.entityContractsExist === true : false,
    relationshipMapWorks: extensionReport ? extensionReport.relationshipMapWorks === true : false,
    indexMapsWork: extensionReport ? extensionReport.indexMapsWork === true : false,
    hendersonDemoIndexWorks: extensionReport ? extensionReport.hendersonDemoIndexWorks === true : false,
    receiptIndexWorks: extensionReport ? extensionReport.receiptIndexWorks === true : false,
    reportIndexWorks: extensionReport ? extensionReport.reportIndexWorks === true : false,
    spendIndexWorks: extensionReport ? extensionReport.spendIndexWorks === true : false,
    missingDocumentIndexWorks: extensionReport ? extensionReport.missingDocumentIndexWorks === true : false,
    cameraAllocationIndexWorks: extensionReport ? extensionReport.cameraAllocationIndexWorks === true : false,
    approvalIndexWorks: extensionReport ? extensionReport.approvalIndexWorks === true : false,
    exportPacketIndexWorks: extensionReport ? extensionReport.exportPacketIndexWorks === true : false,
    noRealCustomerData: extensionReport ? extensionReport.noRealCustomerData === true : false,
    e2eRoutingMatrixExists: extensionReport ? extensionReport.e2eRoutingMatrixExists === true : false,
    e2eRoutingMatrixRuns: extensionReport ? extensionReport.e2eRoutingMatrixRuns === true : false,
    allE2ERoutesPass: extensionReport ? extensionReport.allE2ERoutesPass === true : false,
    fuzzyToIntentToRouteChainWorks: extensionReport ? extensionReport.fuzzyToIntentToRouteChainWorks === true : false,
    workflowChainWorks: extensionReport ? extensionReport.workflowChainWorks === true : false,
    sessionChainWorks: extensionReport ? extensionReport.sessionChainWorks === true : false,
    visualFocusChainWorks: extensionReport ? extensionReport.visualFocusChainWorks === true : false,
    readbackChainWorks: extensionReport ? extensionReport.readbackChainWorks === true : false,
    permissionGateChainWorks: extensionReport ? extensionReport.permissionGateChainWorks === true : false,
    automationRoutePriorityWorks: extensionReport ? extensionReport.automationRoutePriorityWorks === true : false,
    unknownFallbackStillWorks: extensionReport ? extensionReport.unknownFallbackStillWorks === true : false,
    clarificationPathWorks: extensionReport ? extensionReport.clarificationPathWorks === true : false,
    backendBoundaryExists: extensionReport ? extensionReport.backendBoundaryExists === true : false,
    serverOnlyKeyPolicyWorks: extensionReport ? extensionReport.serverOnlyKeyPolicyWorks === true : false,
    backendEndpointMapWorks: extensionReport ? extensionReport.backendEndpointMapWorks === true : false,
    rolePermissionPlanWorks: extensionReport ? extensionReport.rolePermissionPlanWorks === true : false,
    voiceRealtimeBoundaryWorks: extensionReport ? extensionReport.voiceRealtimeBoundaryWorks === true : false,
    deploymentChecklistWorks: extensionReport ? extensionReport.deploymentChecklistWorks === true : false,
    openAiKeyQuestionStaysLocked: extensionReport ? extensionReport.openAiKeyQuestionStaysLocked === true : false,
    chatgptConnectionQuestionStaysLocked: extensionReport ? extensionReport.chatgptConnectionQuestionStaysLocked === true : false,
    liveVoiceQuestionStaysLocked: extensionReport ? extensionReport.liveVoiceQuestionStaysLocked === true : false,
    noLiveEstimateCreated: extensionReport ? extensionReport.noLiveEstimateCreated === true : false,
    noCustomerExport: extensionReport ? extensionReport.noCustomerExport === true : false,
    liveUXSmokeCheckerExists: extensionReport ? extensionReport.liveUXSmokeCheckerExists === true : false,
    aiEntryOpensAssistant: extensionReport ? extensionReport.aiEntryOpensAssistant === true : false,
    primaryAssistantSurfaceWorks: extensionReport ? extensionReport.primaryAssistantSurfaceWorks === true : false,
    mainInputTargetWorks: extensionReport ? extensionReport.mainInputTargetWorks === true : false,
    assistantTurnSmokeWorks: extensionReport ? extensionReport.assistantTurnSmokeWorks === true : false,
    manualFallbackWorks: extensionReport ? extensionReport.manualFallbackWorks === true : false,
    voiceSafetyWorks: extensionReport ? extensionReport.voiceSafetyWorks === true : false,
    automationReportSmokeWorks: extensionReport ? extensionReport.automationReportSmokeWorks === true : false,
    regressionQaSmokeWorks: extensionReport ? extensionReport.regressionQaSmokeWorks === true : false,
    zeroReportGuardWorks: extensionReport ? extensionReport.zeroReportGuardWorks === true : false,
    safetyLocksWork: extensionReport ? extensionReport.safetyLocksWork === true : false,
    naturalResponseTemplatesExist: extensionReport ? extensionReport.naturalResponseTemplatesExist === true : false,
    responseTemplateSmokeWorks: extensionReport ? extensionReport.responseTemplateSmokeWorks === true : false,
    greetingResponseWorks: extensionReport ? extensionReport.greetingResponseWorks === true : false,
    readyPromptWorks: extensionReport ? extensionReport.readyPromptWorks === true : false,
    correctionPhraseWorks: extensionReport ? extensionReport.correctionPhraseWorks === true : false,
    openingPhraseWorks: extensionReport ? extensionReport.openingPhraseWorks === true : false,
    lockedActionPhraseWorks: extensionReport ? extensionReport.lockedActionPhraseWorks === true : false,
    missingInfoPhraseWorks: extensionReport ? extensionReport.missingInfoPhraseWorks === true : false,
    manualFallbackPhraseWorks: extensionReport ? extensionReport.manualFallbackPhraseWorks === true : false,
    naturalResponseIntegrationExists: extensionReport ? extensionReport.naturalResponseIntegrationExists === true : false,
    assistantSurfaceNaturalCopyWorks: extensionReport ? extensionReport.assistantSurfaceNaturalCopyWorks === true : false,
    correctionNaturalCopyWorks: extensionReport ? extensionReport.correctionNaturalCopyWorks === true : false,
    openingFocusNaturalCopyWorks: extensionReport ? extensionReport.openingFocusNaturalCopyWorks === true : false,
    lockedActionNaturalCopyWorks: extensionReport ? extensionReport.lockedActionNaturalCopyWorks === true : false,
    missingInfoNaturalCopyWorks: extensionReport ? extensionReport.missingInfoNaturalCopyWorks === true : false,
    manualFallbackNaturalCopyWorks: extensionReport ? extensionReport.manualFallbackNaturalCopyWorks === true : false,
    automationReportStillWorks: extensionReport ? extensionReport.automationReportStillWorks === true : false,
    unknownFallbackStillWorks: extensionReport ? extensionReport.unknownFallbackStillWorks === true : false,
    keeperStatusExists: extensionReport ? extensionReport.keeperStatusExists === true : false,
    recoveryHandoffWorks: extensionReport ? extensionReport.recoveryHandoffWorks === true : false,
    keeperManifestWorks: extensionReport ? extensionReport.keeperManifestWorks === true : false,
    keeperCheckWorks: extensionReport ? extensionReport.keeperCheckWorks === true : false,
    copyKeeperHandoffWorks: extensionReport ? extensionReport.copyKeeperHandoffWorks === true : false,
    nextPhasePlanWorks: extensionReport ? extensionReport.nextPhasePlanWorks === true : false,
    protectedVisualKeeperStillAHv54I3: extensionReport ? extensionReport.protectedVisualKeeperStillAHv54I3 === true : false,
    aquaBrainPrimaryInterfaceLocked: extensionReport ? extensionReport.aquaBrainPrimaryInterfaceLocked === true : false,
    liveActionsStillLocked: extensionReport ? extensionReport.liveActionsStillLocked === true : false,
    conversationScenariosExist: extensionReport ? extensionReport.conversationScenariosExist === true : false,
    conversationScenarioRunnerWorks: extensionReport ? extensionReport.conversationScenarioRunnerWorks === true : false,
    allConversationScenariosPass: extensionReport ? extensionReport.allConversationScenariosPass === true : false,
    hendersonReceiptExportScenarioWorks: extensionReport ? extensionReport.hendersonReceiptExportScenarioWorks === true : false,
    hendersonReportReviewScenarioWorks: extensionReport ? extensionReport.hendersonReportReviewScenarioWorks === true : false,
    spendBudgetScenarioWorks: extensionReport ? extensionReport.spendBudgetScenarioWorks === true : false,
    cameraPhotoScenarioWorks: extensionReport ? extensionReport.cameraPhotoScenarioWorks === true : false,
    uploadDiagramScenarioStaysLocked: extensionReport ? extensionReport.uploadDiagramScenarioStaysLocked === true : false,
    voiceMishearConversationWorks: extensionReport ? extensionReport.voiceMishearConversationWorks === true : false,
    missingInputClarificationScenarioWorks: extensionReport ? extensionReport.missingInputClarificationScenarioWorks === true : false,
    manualFallbackConversationWorks: extensionReport ? extensionReport.manualFallbackConversationWorks === true : false,
    responseQualityTemplatesWork: extensionReport ? extensionReport.responseQualityTemplatesWork === true : false,
    contextContinuityWorks: extensionReport ? extensionReport.contextContinuityWorks === true : false,
    visualRoutesOpenDuringScenarios: extensionReport ? extensionReport.visualRoutesOpenDuringScenarios === true : false,
    permissionGatesShowDuringScenarios: extensionReport ? extensionReport.permissionGatesShowDuringScenarios === true : false,
    phaseKeeperExists: extensionReport ? extensionReport.phaseKeeperExists === true : false,
    keeperLockPanelWorks: extensionReport ? extensionReport.keeperLockPanelWorks === true : false,
    keeperManifestWorks: extensionReport ? extensionReport.keeperManifestWorks === true : false,
    phaseHandoffWorks: extensionReport ? extensionReport.phaseHandoffWorks === true : false,
    copyPhaseHandoffWorks: extensionReport ? extensionReport.copyPhaseHandoffWorks === true : false,
    nextPhaseOptionsWork: extensionReport ? extensionReport.nextPhaseOptionsWork === true : false,
    recommendedNextPhaseWorks: extensionReport ? extensionReport.recommendedNextPhaseWorks === true : false,
    whatIsReadyWorks: extensionReport ? extensionReport.whatIsReadyWorks === true : false,
    whatIsLockedWorks: extensionReport ? extensionReport.whatIsLockedWorks === true : false,
    protectedVisualKeeperStillAHv54I3: extensionReport ? extensionReport.protectedVisualKeeperStillAHv54I3 === true : false,
    aquaBrainPrimaryInterfaceLocked: extensionReport ? extensionReport.aquaBrainPrimaryInterfaceLocked === true : false,
    backendReadinessLocked: extensionReport ? extensionReport.backendReadinessLocked === true : false,
    automationReportStillWorks: extensionReport ? extensionReport.automationReportStillWorks === true : false,
    regressionQaStillWorks: extensionReport ? extensionReport.regressionQaStillWorks === true : false,
    noBackendCalls: safetyStatus.noBackendCalls === true,
    noNetworkCalls: extensionReport ? extensionReport.noNetworkCalls === true : false,
    noExternalAIApiCalls: safetyStatus.noLiveAIApiCalls === true,
    noExternalAIAPICalls: safetyStatus.noLiveAIApiCalls === true,
    noApiKeysInFrontend: (extensionReport ? extensionReport.noApiKeysInFrontend === true : false) && safetyStatus.noApiKeysInFrontend === true,
    noLiveRecordChanges: extensionReport ? extensionReport.noLiveRecordChanges === true : false,
    noAudioStorage: safetyStatus.noAudioStorage === true,
    noAlwaysListening: safetyStatus.noAlwaysListening === true,
    noPaymentPayrollBankAccountingExport: safetyStatus.noPayment === true && safetyStatus.noPayroll === true && safetyStatus.noBankSync === true && safetyStatus.noAccountingExport === true,
    premiumModuleShellExists: extensionReport ? extensionReport.premiumModuleShellExists === true : false,
    premiumModuleShellRenders: extensionReport ? extensionReport.premiumModuleShellRenders === true : false,
    automationReportPolished: extensionReport ? extensionReport.automationReportPolished === true : false,
    receiptsPanelPolished: extensionReport ? extensionReport.receiptsPanelPolished === true : false,
    accountingPanelPolished: extensionReport ? extensionReport.accountingPanelPolished === true : false,
    receiptDetailPolishWorks: extensionReport ? extensionReport.receiptDetailPolishWorks === true : false,
    accountingDetailPolishWorks: extensionReport ? extensionReport.accountingDetailPolishWorks === true : false,
    spendDetailPolishWorks: extensionReport ? extensionReport.spendDetailPolishWorks === true : false,
    ownerReviewDetailPolishWorks: extensionReport ? extensionReport.ownerReviewDetailPolishWorks === true : false,
    accountantExportPlaceholderPolished: extensionReport ? extensionReport.accountantExportPlaceholderPolished === true : false,
    premiumReceiptCardsRender: extensionReport ? extensionReport.premiumReceiptCardsRender === true : false,
    premiumAccountingCardsRender: extensionReport ? extensionReport.premiumAccountingCardsRender === true : false,
    premiumApprovalCardsRender: extensionReport ? extensionReport.premiumApprovalCardsRender === true : false,
    premiumExportCardsRender: extensionReport ? extensionReport.premiumExportCardsRender === true : false,
    v63AShellStillWorks: extensionReport ? extensionReport.v63AShellStillWorks === true : false,
    missingDocumentsPanelPolished: extensionReport ? extensionReport.missingDocumentsPanelPolished === true : false,
    permissionGatePolished: extensionReport ? extensionReport.permissionGatePolished === true : false,
    aquaBrainPanelsCompatible: extensionReport ? extensionReport.aquaBrainPanelsCompatible === true : false,
    modulePolishMarkersExist: extensionReport ? extensionReport.modulePolishMarkersExist === true : false,
    aiRoutingStillWorks: extensionReport ? extensionReport.aiRoutingStillWorks === true : false,
    premiumModuleShellWorks: extensionReport ? extensionReport.premiumModuleShellWorks === true : false,
    openedModulesPolished: extensionReport ? extensionReport.openedModulesPolished === true : false,
    homeDesignUntouched: extensionReport ? extensionReport.homeDesignUntouched === true : false,
    routingStillWorks: extensionReport ? extensionReport.routingStillWorks === true : false,
    automationStillWorks: extensionReport ? extensionReport.automationStillWorks === true : false,
    noBackendNetworkLiveAI: extensionReport ? extensionReport.noBackendNetworkLiveAI === true : false,
    spokenReadbackAvailable: extensionReport ? extensionReport.spokenReadbackAvailable === true : false,
    spokenReadbackBrowserUnavailableFallback: extensionReport ? extensionReport.spokenReadbackBrowserUnavailableFallback === true : true,
    gateSelfTest,
    noConflictMarkers: conflictMarkerFiles.length === 0,
    hasConflictMarkers: conflictMarkerFiles.length > 0,
    conflictMarkerFiles,
    protectedVisualFileUnchanged: htmlGitStatus === '',
    protectedVisualFileRewritten: htmlGitStatus !== '',
    unexpectedProtectedFileRewrite: htmlGitStatus !== '',
    protectedVisualFileStatus: htmlGitStatus || 'unchanged',
    generatedReports: [JSON_REPORT, MD_REPORT],
    safeToMerge: false,
    mergeRecommendation: 'MERGE_BLOCKED',
    repairPrompt: ''
  };
  report.safeToMerge = report.failed === 0 && requiredSafetyFlagsPass(report) && optionalSafetyGroupsPass(report) && !reportHasConflictMarkers(report) && !reportHasProtectedVisualRewrite(report) && (!extensionReport || (Number(extensionReport.failed) === 0 && extensionReport.safeToMerge === true));
  report.repairPrompt = buildRepairPrompt(report);
  report.gateViolations = collectGateViolations(report);
  report.mergeRecommendation = evaluateAquaMergeGate(report);

  fs.writeFileSync(rel(JSON_REPORT), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(rel(MD_REPORT), markdown(report));

  console.log(`Aqua ${VERSION} regression: ${report.passed}/${report.total} passed; failed=${report.failed}; safeToMerge=${report.safeToMerge}; mergeRecommendation=${report.mergeRecommendation}`);
  process.exit(report.mergeRecommendation === 'MERGE_ALLOWED' ? 0 : 1);
}

main().catch((error) => {
  const report = {
    version: VERSION,
    timestamp: nowIso(),
    total: checks.length + 1,
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => !check.passed).length + 1,
    failedCommands: ['aqua-v61-regression-test.js crashed'],
    checks: checks.concat([{ name: 'aqua-v61-regression-test.js crashed', passed: false, actual: error.stack || String(error), fileToFix: 'aqua-v61-regression-test.js' }]),
    skippedTests: skipped,
    safetyStatus: {},
    browserVisualTest,
    safeToMerge: false,
    mergeRecommendation: 'MERGE_BLOCKED',
    gateViolations: ['aqua-v61-regression-test.js crashed'],
    repairPrompt: '# Copyable Codex Repair Prompt\n\nFix aqua-v61-regression-test.js crash. Do not redesign. Keep all safety locks.'
  };
  fs.writeFileSync(rel(JSON_REPORT), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(rel(MD_REPORT), markdown({ ...report, filesChanged: [], branch: '', commit: '', extensionRegression: extensionReport }));
  console.error(error.stack || error);
  process.exit(1);
});
