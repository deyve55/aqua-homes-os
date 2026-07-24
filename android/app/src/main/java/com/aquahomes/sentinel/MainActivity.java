package com.aquahomes.sentinel;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.media.AudioFormat;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.ArrayList;
import java.util.Locale;
import org.json.JSONObject;

public final class MainActivity extends Activity implements RecognitionListener {
    private static final int MICROPHONE_PERMISSION_REQUEST = 406;
    private static final String AQUA_UTTERANCE_ID = "aqua-role-proof";

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private WebView webView;
    private SpeechRecognizer speechRecognizer;
    private TextToSpeech textToSpeech;
    private boolean ttsReady;
    private volatile int ttsAudioFormat = AudioFormat.ENCODING_PCM_16BIT;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.rgb(2, 7, 13));
        getWindow().setNavigationBarColor(Color.rgb(2, 7, 13));

        webView = new WebView(this);
        webView.setSoundEffectsEnabled(false);
        setContentView(webView);
        configureWebView();
        configureTextToSpeech();
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setBackgroundColor(Color.rgb(2, 7, 13));
        webView.setWebViewClient(
                new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, String url) {
                        return url == null || !url.startsWith("file:///android_asset/");
                    }
                });
        webView.addJavascriptInterface(new AquaBridge(), "AquaNative");
    }

    private void configureTextToSpeech() {
        textToSpeech =
                new TextToSpeech(
                        this,
                        status -> {
                            if (status != TextToSpeech.SUCCESS) {
                                ttsReady = false;
                                return;
                            }
                            textToSpeech.setLanguage(Locale.US);
                            selectBestLocalVoice();
                            textToSpeech.setSpeechRate(1.03f);
                            textToSpeech.setPitch(0.96f);
                            textToSpeech.setOnUtteranceProgressListener(
                                    new UtteranceProgressListener() {
                                        @Override
                                        public void onStart(String utteranceId) {
                                            if (AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                evaluate("window.Aqua && window.Aqua.onNativeStart()");
                                            }
                                        }

                                        @Override
                                        public void onBeginSynthesis(
                                                String utteranceId,
                                                int sampleRateInHz,
                                                int audioFormat,
                                                int channelCount) {
                                            if (AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                ttsAudioFormat = audioFormat;
                                            }
                                        }

                                        @Override
                                        public void onAudioAvailable(
                                                String utteranceId, byte[] audio) {
                                            if (!AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                return;
                                            }
                                            double energy =
                                                    normalizedAudioEnergy(audio, ttsAudioFormat);
                                            evaluate(
                                                    "window.Aqua && window.Aqua.onNativeEnergy("
                                                            + String.format(
                                                                    Locale.US, "%.3f", energy)
                                                            + ")");
                                        }

                                        @Override
                                        public void onRangeStart(
                                                String utteranceId, int start, int end, int frame) {
                                            if (AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                evaluate(
                                                        "window.Aqua && window.Aqua.onNativeWord("
                                                                + start
                                                                + ","
                                                                + end
                                                                + ")");
                                            }
                                        }

                                        @Override
                                        public void onDone(String utteranceId) {
                                            if (AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                evaluate("window.Aqua && window.Aqua.onNativeDone()");
                                            }
                                        }

                                        @Override
                                        public void onError(String utteranceId) {
                                            if (AQUA_UTTERANCE_ID.equals(utteranceId)) {
                                                evaluate(
                                                        "window.Aqua && window.Aqua.onNativeError('tts')");
                                            }
                                        }
                                    });
                            ttsReady = true;
                        });
    }

    private void selectBestLocalVoice() {
        if (textToSpeech.getVoices() == null) {
            return;
        }

        Voice bestVoice = null;
        for (Voice voice : textToSpeech.getVoices()) {
            if (voice == null
                    || voice.isNetworkConnectionRequired()
                    || voice.getLocale() == null
                    || !Locale.ENGLISH.getLanguage().equals(voice.getLocale().getLanguage())) {
                continue;
            }
            if (bestVoice == null || voice.getQuality() > bestVoice.getQuality()) {
                bestVoice = voice;
            }
        }

        if (bestVoice != null) {
            textToSpeech.setVoice(bestVoice);
        }
    }

    private static double normalizedAudioEnergy(byte[] audio, int audioFormat) {
        if (audio == null || audio.length == 0) {
            return 0.0;
        }

        double sumOfSquares = 0.0;
        int sampleCount = 0;

        if (audioFormat == AudioFormat.ENCODING_PCM_16BIT) {
            for (int index = 0; index + 1 < audio.length; index += 2) {
                short sample =
                        (short) ((audio[index] & 0xff) | ((audio[index + 1] & 0xff) << 8));
                double normalized = sample / 32768.0;
                sumOfSquares += normalized * normalized;
                sampleCount += 1;
            }
        } else if (audioFormat == AudioFormat.ENCODING_PCM_8BIT) {
            for (byte value : audio) {
                double normalized = ((value & 0xff) - 128) / 128.0;
                sumOfSquares += normalized * normalized;
                sampleCount += 1;
            }
        } else {
            for (byte value : audio) {
                double normalized = value / 128.0;
                sumOfSquares += normalized * normalized;
                sampleCount += 1;
            }
        }

        if (sampleCount == 0) {
            return 0.0;
        }

        double rms = Math.sqrt(sumOfSquares / sampleCount);
        return Math.min(1.0, Math.sqrt(rms) * 1.9);
    }

    private void beginListening() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(
                    new String[] {Manifest.permission.RECORD_AUDIO},
                    MICROPHONE_PERMISSION_REQUEST);
            return;
        }

        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            evaluate("window.Aqua && window.Aqua.onNativeError('unavailable')");
            return;
        }

        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(this);

        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.US.toLanguageTag());
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        intent.putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, true);
        intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 700L);
        intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 850L);
        intent.putExtra(
                RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 500L);
        speechRecognizer.startListening(intent);
    }

    private void stopListening() {
        if (speechRecognizer == null) {
            return;
        }
        speechRecognizer.cancel();
        speechRecognizer.destroy();
        speechRecognizer = null;
    }

    private void releaseSpeechRecognizer() {
        if (speechRecognizer == null) {
            return;
        }
        speechRecognizer.destroy();
        speechRecognizer = null;
    }

    private void speak(String text) {
        if (!ttsReady || text == null || text.trim().isEmpty()) {
            evaluate("window.Aqua && window.Aqua.onNativeError('tts-not-ready')");
            return;
        }
        textToSpeech.stop();
        textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, AQUA_UTTERANCE_ID);
    }

    private void evaluate(String script) {
        mainHandler.post(() -> webView.evaluateJavascript(script, null));
    }

    private static String quote(String value) {
        return JSONObject.quote(value == null ? "" : value);
    }

    @Override
    public void onReadyForSpeech(Bundle params) {
        evaluate("window.Aqua && window.Aqua.nativeState('listening')");
    }

    @Override
    public void onBeginningOfSpeech() {
        evaluate("window.Aqua && window.Aqua.nativeState('listening')");
    }

    @Override
    public void onRmsChanged(float rmsdB) {
        // Aqua's outgoing pulse is tied to TTS word timing. Input RMS is not persisted.
    }

    @Override
    public void onBufferReceived(byte[] buffer) {
        // Audio buffers are intentionally ignored and never stored.
    }

    @Override
    public void onEndOfSpeech() {
        evaluate("window.Aqua && window.Aqua.nativeState('thinking')");
    }

    @Override
    public void onError(int error) {
        releaseSpeechRecognizer();
        evaluate("window.Aqua && window.Aqua.onNativeError(" + error + ")");
    }

    @Override
    public void onResults(Bundle results) {
        releaseSpeechRecognizer();
        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        String best = matches == null || matches.isEmpty() ? "" : matches.get(0);
        evaluate("window.Aqua && window.Aqua.onNativeHeard(" + quote(best) + ")");
    }

    @Override
    public void onPartialResults(Bundle partialResults) {
        ArrayList<String> matches =
                partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (matches != null && !matches.isEmpty()) {
            evaluate(
                    "window.Aqua && window.Aqua.onNativePartial(" + quote(matches.get(0)) + ")");
        }
    }

    @Override
    public void onEvent(int eventType, Bundle params) {}

    @Override
    public void onRequestPermissionsResult(
            int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != MICROPHONE_PERMISSION_REQUEST) {
            return;
        }
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            beginListening();
        } else {
            evaluate("window.Aqua && window.Aqua.onNativeError('permission')");
        }
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript(
                "window.Aqua && window.Aqua.handleBack ? window.Aqua.handleBack() : false",
                value -> {
                    if (!"true".equals(value)) {
                        MainActivity.super.onBackPressed();
                    }
                });
    }

    @Override
    protected void onDestroy() {
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        if (webView != null) {
            webView.removeJavascriptInterface("AquaNative");
            webView.destroy();
        }
        super.onDestroy();
    }

    public final class AquaBridge {
        @JavascriptInterface
        public void listen() {
            mainHandler.post(MainActivity.this::beginListening);
        }

        @JavascriptInterface
        public void stopListening() {
            mainHandler.post(MainActivity.this::stopListening);
        }

        @JavascriptInterface
        public void speak(String text) {
            mainHandler.post(() -> MainActivity.this.speak(text));
        }

        @JavascriptInterface
        public void stopSpeaking() {
            mainHandler.post(
                    () -> {
                        if (textToSpeech != null) {
                            textToSpeech.stop();
                        }
                        evaluate("window.Aqua && window.Aqua.nativeState('idle')");
                    });
        }

        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }
    }
}
