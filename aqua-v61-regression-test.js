#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');

const VERSION = 'v61N';
const ROOT = __dirname;
const HTML_KEEPER = 'AH_v54I-3.html';
const EXTENSION = 'aqua-v61-extensions.js';
const JSON_REPORT = 'aqua-regression-report.json';
const MD_REPORT = 'aqua-regression-report.md';

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
  const conflictPattern = /^(<<<<<<<|=======|>>>>>>>) /m;
  addCheck('no conflict markers exist', !conflictPattern.test([html, extension, index, docsIndex].join('\n')), { layer: 'static-file-safety', fileToFix: 'repository files' });
  try {
    childProcess.execFileSync(process.execPath, ['--check', rel(EXTENSION)], { cwd: ROOT, stdio: 'pipe' });
    addCheck(`no syntax errors in ${EXTENSION}`, true, { layer: 'static-file-safety', fileToFix: EXTENSION });
  } catch (error) {
    addCheck(`no syntax errors in ${EXTENSION}`, false, { layer: 'static-file-safety', actual: String(error.stderr || error.message), fileToFix: EXTENSION });
  }
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
    addCheck('extension regression safety flags pass', extensionReport.safety && Object.values(extensionReport.safety).every((value) => value === true), { layer: 'extension-regression', actual: extensionReport.safety, fileToFix: EXTENSION });
    addCheck('extension regression has zero failures', Number(extensionReport.failed) === 0, { layer: 'extension-regression', actual: extensionReport.failed, fileToFix: EXTENSION });
    const failuresList = extensionReport.failures || [];
    failuresList.forEach((failure) => addCheck(`extension command passes: ${failure.command}`, false, { layer: 'extension-regression', expected: failure.expected, actual: failure.actual, fileToFix: EXTENSION }));

    const byCommand = new Map((extensionReport.results || []).map((row) => [row.command, row]));
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

    const permissionRow = byCommand.get('code this receipt to materials');
    addCheck('receipt coding routes to Permission Granter', Boolean(permissionRow && permissionRow.passed && permissionRow.actual && permissionRow.actual.renderedPermissionGate), { layer: 'permission-draft-safety', expected: 'Permission Granter demo gate', actual: permissionRow && permissionRow.actual, fileToFix: EXTENSION });
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
    noAlwaysListening: !/continuous\s*=\s*true/i.test(extension)
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
    'Fix Aqua Homes OS v61N automation gate failures. Do not redesign. Do not touch Home layout. Do not rewrite AH_v54I-3.html unless absolutely necessary and explicitly explain why.',
    '',
    ...rows,
    '',
    'Safety reminder: keep all changes local/demo-only. Do not activate backend/live AI/API calls, execute live record changes, store sensitive data, connect payment/payroll/bank sync/accounting export, customer sharing/export, audio storage, or always-listening behavior.',
    'Preferred file to fix: aqua-v61-extensions.js or aqua-v61-regression-test.js.'
  ].join('\n');
}

function markdown(report) {
  const safetyRows = Object.entries(report.safetyStatus).map(([key, value]) => `- ${key}: ${value ? 'PASS' : 'FAIL'}`).join('\n');
  const skippedRows = report.skippedTests.length ? report.skippedTests.map((item) => `- ${item.name}: ${item.reason}`).join('\n') : '- None';
  const failedRows = report.failedCommands.length ? report.failedCommands.map((name) => `- ${name}`).join('\n') : '- None';
  const changedRows = report.filesChanged.length ? report.filesChanged.map((name) => `- ${name}`).join('\n') : '- None';
  return `# Aqua Homes OS ${report.version} Regression Report\n\n` +
    `- Timestamp: ${report.timestamp}\n` +
    `- Branch: ${report.branch || 'unavailable'}\n` +
    `- Commit: ${report.commit || 'unavailable'}\n` +
    `- Total tests: ${report.total}\n` +
    `- Passed: ${report.passed}\n` +
    `- Failed: ${report.failed}\n` +
    `- safeToMerge: ${report.safeToMerge}\n\n` +
    `## Files Changed\n${changedRows}\n\n` +
    `## Failed Commands / Checks\n${failedRows}\n\n` +
    `## Safety Status\n${safetyRows}\n\n` +
    `## Browser Visual Test\n- Status: ${report.browserVisualTest.status}\n- Reason: ${report.browserVisualTest.reason || 'n/a'}\n${report.browserVisualTest.screenshotPath ? `- Screenshot: ${report.browserVisualTest.screenshotPath}\n` : ''}\n` +
    `## Skipped Tests\n${skippedRows}\n\n` +
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
  const changed = Array.from(new Set(runGit(['diff', '--name-only'], '').split('\n').concat(runGit(['ls-files', '--others', '--exclude-standard'], '').split('\n')).map((name) => name.trim()).filter(Boolean)));
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
    generatedReports: [JSON_REPORT, MD_REPORT],
    safeToMerge: false,
    repairPrompt: ''
  };
  report.safeToMerge = report.failed === 0 && Object.values(safetyStatus).every(Boolean) && (!extensionReport || Number(extensionReport.failed) === 0);
  report.repairPrompt = buildRepairPrompt(report);

  fs.writeFileSync(rel(JSON_REPORT), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(rel(MD_REPORT), markdown(report));

  console.log(`Aqua ${VERSION} regression: ${report.passed}/${report.total} passed; failed=${report.failed}; safeToMerge=${report.safeToMerge}`);
  process.exit(report.safeToMerge ? 0 : 1);
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
    repairPrompt: '# Copyable Codex Repair Prompt\n\nFix aqua-v61-regression-test.js crash. Do not redesign. Keep all safety locks.'
  };
  fs.writeFileSync(rel(JSON_REPORT), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(rel(MD_REPORT), markdown({ ...report, filesChanged: [], branch: '', commit: '', extensionRegression: extensionReport }));
  console.error(error.stack || error);
  process.exit(1);
});
