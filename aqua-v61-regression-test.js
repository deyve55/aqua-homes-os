#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');
const crypto = require('crypto');

const VERSION = 'v62G';
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
  addCheck('v61Z AquaVoiceBrainV61Z architecture exists', /window\.AquaVoiceBrainV61Z|function\s+createAquaVoiceBrainV61Z/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain context key exists', /aquaVoiceBrainContextV61Z/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain tool registry exists', /function\s+voiceBrainToolRegistryV61Z/.test(extension) && /openProjectReport/.test(extension) && /findProjectReceipts/.test(extension) && /prepareAccountantExportDemo/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v61Z voice brain mode route exists', /voice_brain_tool_plan/.test(extension), { layer: 'voice-brain-v61z', fileToFix: EXTENSION });
  addCheck('v62C command center strings exist', (/Aqua Brain Command Center — v62A/.test(extension) || /Aqua Brain Command Center — v62C/.test(extension)) && /aquaVoiceBrainPlansV62A/.test(extension) && /Save Voice Brain Plan/.test(extension) && /Copy Tool Plan Text/.test(extension), { layer: 'voice-brain-v62a', fileToFix: EXTENSION });
  addCheck('v62E AI navigation executor strings exist', /executeAquaVoiceNavigationV62E/.test(extension) && /openAquaModuleForToolV62E/.test(extension) && /focusAquaSectionForToolV62E/.test(extension) && /renderAquaFocusedResultV62E/.test(extension), { layer: 'ai-navigation-v62e', fileToFix: EXTENSION });
  addCheck('v62E focused route marker strings exist', /aqua-v62e-focused-route/.test(extension) && /Focused by Aqua Brain/.test(extension) && /Opened and focused:/.test(extension), { layer: 'ai-navigation-v62e', fileToFix: EXTENSION });
  addCheck('v62D live in-app regression runner strings exist', /runLiveInAppRegressionReportV62D/.test(extension) && /data-aqua-v62d-live-regression/.test(extension) && /aquaRegressionReportSyncV62D/.test(extension), { layer: 'live-in-app-regression-v62d', fileToFix: EXTENSION });
  addCheck('v62F workflow planner architecture exists', /AquaWorkflowPlannerV62F/.test(extension) && /function\s+planAquaWorkflowV62F/.test(extension) && /Aqua Brain Workflow Plan — v62F/.test(extension) && /aquaWorkflowPlansV62F/.test(extension), { layer: 'workflow-planner-v62f', fileToFix: EXTENSION });
  addCheck('v62F workflow report flags exist', /receiptExportWorkflowWorks/.test(extension) && /uploadWorkflowStaysLocked/.test(extension) && /ownerReviewDemoWorks/.test(extension), { layer: 'workflow-planner-v62f', fileToFix: EXTENSION });
  addCheck('v62G workflow memory architecture exists', /AquaWorkflowMemoryV62G/.test(extension) && /function\s+continueAquaWorkflowV62G/.test(extension) && /Aqua Brain Workflow Continuation — v62G/.test(extension) && /aquaActiveWorkflowV62G/.test(extension), { layer: 'workflow-memory-v62g', fileToFix: EXTENSION });
  addCheck('v62G workflow memory report flags exist', /workflowMemoryExists/.test(extension) && /followUpContinuationWorks/.test(extension) && /spendPivotUsesActiveProject/.test(extension), { layer: 'workflow-memory-v62g', fileToFix: EXTENSION });
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
    addCheck('extension regression has zero failures', Number(extensionReport.failed) === 0, { layer: 'extension-regression', actual: extensionReport.failed, fileToFix: EXTENSION });
    addCheck('extension regression safeToMerge is true', extensionReport.safeToMerge === true, { layer: 'extension-regression', actual: extensionReport.safeToMerge, fileToFix: EXTENSION });
    addCheck('extension regression version is v62G', extensionReport.version === 'v62G', { layer: 'extension-regression', actual: extensionReport.version, fileToFix: EXTENSION });
    addCheck('premiumModuleShellWorks is true', extensionReport.premiumModuleShellWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.premiumModuleShellWorks, fileToFix: EXTENSION });
    addCheck('openedModulesPolished is true', extensionReport.openedModulesPolished === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.openedModulesPolished, fileToFix: EXTENSION });
    addCheck('homeDesignUntouched is true', extensionReport.homeDesignUntouched === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.homeDesignUntouched, fileToFix: EXTENSION });
    addCheck('routingStillWorks is true', extensionReport.routingStillWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.routingStillWorks, fileToFix: EXTENSION });
    addCheck('automationStillWorks is true', extensionReport.automationStillWorks === true, { layer: 'premium-module-shell-v61z', actual: extensionReport.automationStillWorks, fileToFix: EXTENSION });
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
      ['were the cameras allocated to the right Henderson jobsite', 'workflow_planner'],
      ['upload that construction diagram to the Henderson files', 'workflow_planner'],
      ['what documents are missing for Henderson', 'workflow_planner'],
      ['what should I do next', 'workflow_planner'],
      ['show automation report', 'automation_status'],
      ['run regression qa', 'automation_status'],
      ['code this receipt to materials', 'permissioned_action'],
      ['what needs approval', 'app_navigation'],
      ['banana test', 'unknown_fallback']
    ].forEach(([command, mode]) => {
      const row = byCommand.get(command);
      addCheck(`v61X Ask AI mode routes: ${command}`, Boolean(row && row.passed && row.actual && row.actual.askMode === mode), { layer: 'ask-mode-router-v61u', expected: mode, actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    [
      ['what is the Henderson report', 'openProjectReport'],
      ['pull up the Henderson staircase report', 'openProjectReport'],
      ['look up all receipts for the Henderson house from Home Depot', 'findProjectReceipts'],
      ['show Home Depot receipts for Henderson', 'findProjectReceipts'],
      ['prepare those Home Depot receipts for accountant export', 'prepareAccountantExportDemo'],
      ['how much have we spent on Henderson plumbing', 'summarizeProjectSpend'],
      ['how much money did we spend on Henderson house plumbing', 'summarizeProjectSpend'],
      ['were the cameras allocated to the right Henderson jobsite', 'checkJobsiteCameraAllocationDemo'],
      ['upload that construction diagram to the Henderson files', 'uploadFileToProjectDemo'],
      ['what documents are missing for Henderson', 'showMissingDocumentsDemo'],
      ['what should I do next', 'suggestNextStep']
    ].forEach(([command, tool]) => {
      const row = byCommand.get(command);
      addCheck(`v61Z voice brain/routes or v62F workflow routes: ${command}`, Boolean(row && row.passed && row.actual && ((row.actual.renderedVoiceBrainToolPlan && row.actual.selectedTool === tool) || row.actual.renderedWorkflowPlanV62F)), { layer: 'voice-brain-v61z', expected: tool, actual: row ? row.actual : 'missing from extension results', fileToFix: EXTENSION });
    });

    const accountantRow = byCommand.get('prepare those Home Depot receipts for accountant export');
    addCheck('v61Z accountant export remains locked/demo-only', Boolean(accountantRow && accountantRow.passed && accountantRow.actual && (accountantRow.actual.workflowTypeV62F === 'receipt_export_preparation' || (accountantRow.actual.permissionLevel === 'accounting_approval_required' && /Accounting Export Locked/.test((accountantRow.actual.safetyLocks || []).join(' '))))), { layer: 'voice-brain-v61z', expected: 'accounting_approval_required + Accounting Export Locked', actual: accountantRow ? accountantRow.actual : 'missing', fileToFix: EXTENSION });
    const uploadRow = byCommand.get('upload that construction diagram to the Henderson files');
    addCheck('v61Z construction diagram upload remains locked/demo-only', Boolean(uploadRow && uploadRow.passed && uploadRow.actual && (uploadRow.actual.workflowTypeV62F === 'upload_send_preparation' || (uploadRow.actual.permissionLevel === 'owner_approval_required' && /Upload Locked/.test((uploadRow.actual.safetyLocks || []).join(' '))))), { layer: 'voice-brain-v61z', expected: 'owner approval + Upload Locked', actual: uploadRow ? uploadRow.actual : 'missing', fileToFix: EXTENSION });
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

function runSafetyGate() {
  const extension = readFileSafe(EXTENSION);
  const test = readFileSafe('aqua-v61-regression-test.js');
  const workflow = readFileSafe('.github/workflows/aqua-regression.yml');
  const executableNetworkPattern = /\b(fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource|RTCPeerConnection)\s*[\(.]/;
  const liveApiPattern = /\b(openai|api[_-]?key|authorization:\s*bearer|https?:\/\/)/i;
  const combined = [extension, test, workflow].join('\n');
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
    noExternalTTSApiCalls: !/https?:\/\/|fetch\s*\(|XMLHttpRequest|sendBeacon/i.test(extension)
  };
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
    `- noLiveRecordChanges: ${report.noLiveRecordChanges === true}\n` +
    `- noAudioStorage: ${report.noAudioStorage === true}\n` +
    `- noBackendNetworkLiveAI: ${report.noBackendNetworkLiveAI === true}\n` +
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
    noLiveEstimateCreated: extensionReport ? extensionReport.noLiveEstimateCreated === true : false,
    noCustomerExport: extensionReport ? extensionReport.noCustomerExport === true : false,
    noBackendCalls: safetyStatus.noBackendCalls === true,
    noNetworkCalls: extensionReport ? extensionReport.noNetworkCalls === true : false,
    noExternalAIApiCalls: safetyStatus.noLiveAIApiCalls === true,
    noExternalAIAPICalls: safetyStatus.noLiveAIApiCalls === true,
    noApiKeysInFrontend: extensionReport ? extensionReport.noApiKeysInFrontend === true : false,
    noLiveRecordChanges: extensionReport ? extensionReport.noLiveRecordChanges === true : false,
    noAudioStorage: safetyStatus.noAudioStorage === true,
    noPaymentPayrollBankAccountingExport: safetyStatus.noPayment === true && safetyStatus.noPayroll === true && safetyStatus.noBankSync === true && safetyStatus.noAccountingExport === true,
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
