package com.aquahomes.sentientos;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private static final int RECORD_AUDIO_REQUEST = 11;
    private WebView webView;
    private SpeechRecognizer speechRecognizer;
    private TextToSpeech textToSpeech;
    private boolean listenAfterPermission;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideSystemUi();

        webView = new WebView(this);
        webView.setBackgroundColor(Color.BLACK);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new AquaBridge(), "AquaBridge");
        setContentView(webView);
        webView.loadUrl("file:///android_asset/public/index.html");

        textToSpeech = new TextToSpeech(this, this);
    }

    private void hideSystemUi() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(
                    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideSystemUi();
    }

    private void startListening() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            listenAfterPermission = true;
            requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, RECORD_AUDIO_REQUEST);
            return;
        }

        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            sendError("Speech recognition is not available on this device.");
            return;
        }

        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(new RecognitionListener() {
            @Override public void onReadyForSpeech(Bundle params) { }
            @Override public void onBeginningOfSpeech() { }
            @Override public void onRmsChanged(float rmsdB) { }
            @Override public void onBufferReceived(byte[] buffer) { }
            @Override public void onEndOfSpeech() { }
            @Override public void onEvent(int eventType, Bundle params) { }

            @Override
            public void onError(int error) {
                sendError("I could not hear that. Tap to try again.");
            }

            @Override
            public void onResults(Bundle results) {
                ArrayList<String> matches =
                    results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (matches != null && !matches.isEmpty()) {
                    sendText(matches.get(0), false);
                } else {
                    sendError("I could not hear that. Tap to try again.");
                }
            }

            @Override
            public void onPartialResults(Bundle partialResults) {
                ArrayList<String> matches =
                    partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (matches != null && !matches.isEmpty()) {
                    sendText(matches.get(0), true);
                }
            }
        });

        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(
            RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
        );
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.US.toLanguageTag());
        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        speechRecognizer.startListening(intent);
    }

    private void sendText(String text, boolean partial) {
        String method = partial ? "receiveAquaPartial" : "receiveAquaText";
        runOnUiThread(() ->
            webView.evaluateJavascript(
                "window." + method + "(" + JSONObject.quote(text) + ");",
                null
            )
        );
    }

    private void sendError(String text) {
        runOnUiThread(() ->
            webView.evaluateJavascript(
                "window.receiveAquaError(" + JSONObject.quote(text) + ");",
                null
            )
        );
    }

    private void speakText(String text) {
        runOnUiThread(() -> {
            if (textToSpeech != null) {
                Bundle params = new Bundle();
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, params, "aqua-response");
            }
        });
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            textToSpeech.setLanguage(Locale.US);
            textToSpeech.setPitch(1.0f);
            textToSpeech.setSpeechRate(1.0f);
            textToSpeech.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override
                public void onStart(String utteranceId) {
                    runOnUiThread(() ->
                        webView.evaluateJavascript("window.setAquaSpeaking(true);", null)
                    );
                }

                @Override
                public void onDone(String utteranceId) {
                    runOnUiThread(() ->
                        webView.evaluateJavascript("window.setAquaSpeaking(false);", null)
                    );
                }

                @Override
                public void onError(String utteranceId) {
                    onDone(utteranceId);
                }
            });
        }
    }

    @Override
    public void onRequestPermissionsResult(
        int requestCode,
        String[] permissions,
        int[] grantResults
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == RECORD_AUDIO_REQUEST && listenAfterPermission) {
            listenAfterPermission = false;
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startListening();
            } else {
                sendError("Microphone permission is required for Aqua voice control.");
            }
        }
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript("window.closeAquaDetails();", null);
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
            webView.destroy();
        }
        super.onDestroy();
    }

    public class AquaBridge {
        @JavascriptInterface
        public void startListening() {
            runOnUiThread(MainActivity.this::startListening);
        }

        @JavascriptInterface
        public void speak(String text) {
            speakText(text);
        }
    }
}
