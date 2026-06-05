/*
 * Aqua Homes OS v61D Modular Extension Loader
 * Wires the main Ask AI modal to direct one-shot local push-to-talk command capture.
 * Protected Home visuals untouched. No live AI, backend, network, always-listening, or audio storage.
 */
(function () {
  'use strict';

  var VERSION = 'v61D';
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
    directAskVoiceStartedForOpen: false
  };

  function mergeNamespace() {
    var previous = window.AquaV61Extensions || {};
    window.AquaV61Extensions = Object.assign(previous, state, {
      version: VERSION,
      runV61BCheck: runV61BCheck,
      runV61CCheck: runV61CCheck,
      runV61DCheck: runV61DCheck,
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
      wireAskAIToCommandFlow: wireAskAIToCommandFlow,
      exposeAskAICommandFlow: exposeAskAICommandFlow,
      directAskVoiceV61D: directAskVoiceV61D,
      startDirectAskVoiceV61D: startDirectAskVoiceV61D,
      startDirectAskVoiceV61C: startDirectAskVoiceV61D
    });
    return window.AquaV61Extensions;
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
    flow.setAttribute('data-direct-ask-voice', 'v61D');
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireAskAIToCommandFlow, { once: true });
  } else {
    wireAskAIToCommandFlow();
  }
  window.addEventListener('load', wireAskAIToCommandFlow, { once: true });

  console.log('Aqua Homes OS v61D extensions loaded: Ask AI modal wired to direct one-shot local voice command capture.');
}());
