package com.aquahomes.sentientos;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.BroadcastReceiver;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.net.ssl.SSLHandshakeException;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private static final int RECORD_AUDIO_REQUEST = 11;
    private static final String LOCAL_APP_URL =
        "file:///android_asset/public/index.html";
    private static final String LOCAL_APP_PREFIX =
        "file:///android_asset/public/";
    private static final String AQUA_GATEWAY_URL = BuildConfig.AQUA_GATEWAY_URL;
    private static final String KEYSTORE_PROVIDER = "AndroidKeyStore";
    private static final String KEY_ALIAS = "aqua_sentinel_owner_session_v1";
    private static final String SESSION_STORE = "aqua_sentinel_secure_session";
    private static final String ACCESS_TOKEN = "access_token";
    private static final String SESSION_EXPIRES_AT = "session_expires_at";
    private static final String USER_EMAIL = "user_email";
    private static final String SNAPSHOT_STORE = "aqua_sentinel_home_snapshots_v1";
    private static final String SNAPSHOT_REQUEST_ACTION =
        "com.aquasoftware.sentinel.REQUEST_HOME_SNAPSHOT";
    private static final String SNAPSHOT_RESPONSE_ACTION =
        "com.aquasoftware.sentinel.HOME_SNAPSHOT_RESPONSE";
    private static final String SNAPSHOT_CONTRACT_VERSION = "1.0";
    private static final int MAX_SNAPSHOT_BYTES = 384 * 1024;
    private static final String[] DIAGNOSTIC_APP_NAMES = {
        "Aqua CRM",
        "AquaDraw",
        "AquaCam",
        "Aqua Knowledge Vault",
        "Aqua Timesheet",
        "Aqua Books",
        "Aqua Receipts"
    };
    private static final String[][] DIAGNOSTIC_APP_PACKAGES = {
        { "com.aquasoftware.crm.fieldtest", "com.aquasoftware.crm.test", "com.aquasoftware.crm" },
        { "com.aquahomesdesigngroup.draw.v0189option1", "com.aquahomesdesigngroup.draw.v0187fresh", "com.aquahomesdesigngroup.draw.beta", "com.aquahomesdesigngroup.draw" },
        { "com.aquahomesdesign.cam.obsidianpreview", "com.aquahomesdesign.cam" },
        { "com.aquahomes.knowledgevault" },
        { "com.aquahomes.timesheet.engineering", "com.aquahomes.timesheet" },
        { "com.aquasoftware.aquabooks" },
        { "com.aquasoftware.receipts.test", "com.aquasoftware.receipts" }
    };

    private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();
    private WebView webView;
    private SpeechRecognizer speechRecognizer;
    private TextToSpeech textToSpeech;
    private boolean listenAfterPermission;
    private final Map<String, SnapshotRequest> pendingSnapshots = new HashMap<>();
    private boolean snapshotReceiverRegistered;
    private boolean filingReceiverRegistered;
    private boolean webAppReady;

    private static class SnapshotRequest {
        final String appName;
        final String packageName;

        SnapshotRequest(String appName, String packageName) {
            this.appName = appName;
            this.packageName = packageName;
        }
    }

    private final BroadcastReceiver snapshotReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (!SNAPSHOT_RESPONSE_ACTION.equals(intent.getAction())) return;
            String requestId = intent.getStringExtra("request_id");
            String snapshotJson = intent.getStringExtra("snapshot_json");
            if (requestId == null || snapshotJson == null) return;
            SnapshotRequest request = pendingSnapshots.remove(requestId);
            if (request == null) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
                String[] senderPackages = getPackageManager().getPackagesForUid(getSentFromUid());
                if (senderPackages == null || !Arrays.asList(senderPackages).contains(request.packageName)) {
                    deliverSnapshot(request.appName, "", "rejected-untrusted-sender");
                    return;
                }
            }
            if (snapshotJson.getBytes(StandardCharsets.UTF_8).length > MAX_SNAPSHOT_BYTES) {
                deliverSnapshot(request.appName, "", "rejected-oversize");
                return;
            }
            try {
                JSONObject snapshot = new JSONObject(snapshotJson);
                snapshot.put("sourcePackage", request.packageName);
                snapshot.put("contractVersion", SNAPSHOT_CONTRACT_VERSION);
                String verifiedJson = snapshot.toString();
                getSharedPreferences(SNAPSHOT_STORE, MODE_PRIVATE)
                    .edit()
                    .putString(request.packageName, verifiedJson)
                    .apply();
                deliverSnapshot(request.appName, verifiedJson, "confirmed-live");
            } catch (JSONException error) {
                deliverSnapshot(request.appName, "", "needs-attention");
            }
        }
    };

    private final BroadcastReceiver filingReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (!FilingStore.ACTION_INBOX_CHANGED.equals(intent.getAction())) return;
            if (webAppReady) deliverFilingInbox();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setDecorFitsSystemWindows(false);
        }

        webView = new WebView(this);
        webView.setBackgroundColor(Color.BLACK);
        webView.setSoundEffectsEnabled(false);
        webView.setHapticFeedbackEnabled(false);
        configureWebView(webView.getSettings());
        webView.setWebViewClient(new LockedWebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new AquaBridge(), "AquaBridge");
        setContentView(webView);
        hideSystemUi();
        webView.loadUrl(LOCAL_APP_URL);

        IntentFilter snapshotFilter = new IntentFilter(SNAPSHOT_RESPONSE_ACTION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(snapshotReceiver, snapshotFilter, Context.RECEIVER_EXPORTED);
        } else {
            registerReceiver(snapshotReceiver, snapshotFilter);
        }
        snapshotReceiverRegistered = true;

        IntentFilter filingFilter = new IntentFilter(FilingStore.ACTION_INBOX_CHANGED);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(filingReceiver, filingFilter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(filingReceiver, filingFilter);
        }
        filingReceiverRegistered = true;

        textToSpeech = new TextToSpeech(this, this);
    }

    private void configureWebView(WebSettings settings) {
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            settings.setAllowFileAccessFromFileURLs(false);
            settings.setAllowUniversalAccessFromFileURLs(false);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }
    }

    private class LockedWebViewClient extends WebViewClient {
        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            if (!url.startsWith(LOCAL_APP_PREFIX)) {
                return;
            }
            view.evaluateJavascript(
                "Boolean(document.getElementById('sentinel')" +
                    " && document.getElementById('appDeck')" +
                    " && document.getElementById('primaryDashboard'))",
                value -> {
                    if ("true".equals(value)) {
                        Log.i("AquaSentinel", "AQUA_SENTINEL_UI_READY");
                        webAppReady = true;
                        deliverFilingInbox();
                        handleStartupIntent(getIntent());
                    } else {
                        Log.e("AquaSentinel", "AQUA_SENTINEL_UI_INCOMPLETE");
                    }
                }
            );
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            String target = uri.toString();
            if (target.startsWith(LOCAL_APP_PREFIX)) {
                return false;
            }
            if ("https".equalsIgnoreCase(uri.getScheme())) {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                } catch (Exception ignored) {
                    sendError("No secure browser is available for that link.");
                }
            }
            return true;
        }
    }

    private void hideSystemUi() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(
                    WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars()
                );
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
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemUi();
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideSystemUi();
        AquaCommandWidget.updateAll(this);
        evaluateJavascript("window.refreshSelectedAppSnapshot?.();");
        if (webAppReady) {
            deliverFilingInbox();
            deliverCommandWidgetStatus("Ready");
            deliverDeviceDiagnostics();
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (webAppReady) handleStartupIntent(intent);
    }

    private void handleStartupIntent(Intent intent) {
        if (intent == null) return;
        if ("com.aquasoftware.sentinel.action.OPEN".equals(intent.getAction())) {
            Log.i("AquaCommandWidget", "AQUA_WIDGET_HOME_OPENED");
            intent.setAction(Intent.ACTION_MAIN);
        }
        if (
            BuildConfig.ECOSYSTEM_PRESENTATION_MODE
                && intent.getBooleanExtra("widget_launcher_pin_probe", false)
        ) {
            intent.removeExtra("widget_launcher_pin_probe");
            installOrRepairCommandWidget();
        }
        String widgetCommand = intent.getStringExtra("widget_command");
        if (widgetCommand != null && !widgetCommand.trim().isEmpty()) {
            String messageId = intent.getStringExtra("widget_command_id");
            intent.removeExtra("widget_command");
            intent.removeExtra("widget_command_id");
            Log.i(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_DELIVERED id=" + (messageId == null ? "unknown" : messageId)
            );
            evaluateJavascript(
                "window.receiveWidgetCommand?.(" + JSONObject.quote(widgetCommand.trim()) + ");"
            );
        }
        if (intent.getBooleanExtra("start_voice", false)) {
            intent.removeExtra("start_voice");
            evaluateJavascript("document.getElementById('aquaButton')?.click();");
        }
        if (intent.getBooleanExtra("open_filing", false)) {
            intent.removeExtra("open_filing");
            deliverFilingInbox();
            evaluateJavascript("window.openFilingCabinet?.();");
            Log.i("AquaCommandWidget", "AQUA_FILING_CABINET_OPENED");
        }
    }

    @Override
    protected void onPause() {
        if (speechRecognizer != null) {
            speechRecognizer.cancel();
        }
        super.onPause();
    }

    private void startListening() {
        if (
            checkSelfPermission(Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED
        ) {
            listenAfterPermission = true;
            requestPermissions(
                new String[] { Manifest.permission.RECORD_AUDIO },
                RECORD_AUDIO_REQUEST
            );
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
            @Override
            public void onReadyForSpeech(Bundle params) {}

            @Override
            public void onBeginningOfSpeech() {}

            @Override
            public void onRmsChanged(float rmsDb) {
                double normalized = Math.max(0.08, Math.min(1.0, (rmsDb + 2.0) / 12.0));
                runOnUiThread(() ->
                    webView.evaluateJavascript(
                        "document.documentElement.style.setProperty('--voice-level','"
                            + normalized
                            + "');",
                        null
                    )
                );
            }

            @Override
            public void onBufferReceived(byte[] buffer) {}

            @Override
            public void onEndOfSpeech() {
                evaluateJavascript("window.setAquaThinking?.();");
            }

            @Override
            public void onEvent(int eventType, Bundle params) {}

            @Override
            public void onError(int error) {
                if (error == SpeechRecognizer.ERROR_NO_MATCH) {
                    sendError("I did not catch that. Tap the A and try again.");
                } else if (error == SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS) {
                    sendError("Microphone permission is required for Aqua voice control.");
                } else {
                    sendError("Voice capture paused. Tap the A to try again.");
                }
            }

            @Override
            public void onResults(Bundle results) {
                ArrayList<String> matches =
                    results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (matches != null && !matches.isEmpty()) {
                    sendText(matches.get(0), false);
                } else {
                    sendError("I did not catch that. Tap the A and try again.");
                }
            }

            @Override
            public void onPartialResults(Bundle partialResults) {
                ArrayList<String> matches =
                    partialResults.getStringArrayList(
                        SpeechRecognizer.RESULTS_RECOGNITION
                    );
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
        intent.putExtra(
            RecognizerIntent.EXTRA_LANGUAGE,
            Locale.US.toLanguageTag()
        );
        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        speechRecognizer.startListening(intent);
    }

    private void sendText(String text, boolean partial) {
        String method = partial ? "receiveAquaPartial" : "receiveAquaText";
        evaluateJavascript(
            "window." + method + "(" + JSONObject.quote(text) + ");"
        );
    }

    private void sendError(String text) {
        evaluateJavascript(
            "window.receiveAquaError(" + JSONObject.quote(text) + ");"
        );
    }

    private void evaluateJavascript(String script) {
        runOnUiThread(() -> webView.evaluateJavascript(script, null));
    }

    private void sendJsonCallback(String functionName, JSONObject payload) {
        evaluateJavascript(
            "window."
                + functionName
                + "("
                + JSONObject.quote(payload.toString())
                + ");"
        );
    }

    private void speakText(String text) {
        runOnUiThread(() -> {
            if (textToSpeech != null) {
                Bundle params = new Bundle();
                textToSpeech.speak(
                    text,
                    TextToSpeech.QUEUE_FLUSH,
                    params,
                    "aqua-response"
                );
            }
        });
    }

    private void launchRegisteredApp(String appName, String packageJson) {
        runOnUiThread(() -> {
            try {
                JSONArray packages = new JSONArray(packageJson);
                for (int index = 0; index < packages.length(); index++) {
                    String packageName = packages.optString(index, "");
                    if (packageName.isEmpty()) continue;
                    Intent launch = getPackageManager().getLaunchIntentForPackage(packageName);
                    if (launch == null) continue;
                    launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
                    startActivity(launch);
                    return;
                }
                sendError(appName + " is not installed on this phone.");
            } catch (Exception error) {
                sendError("Sentinel could not open " + appName + ".");
            }
        });
    }

    private String firstInstalledPackage(String packageJson) throws JSONException {
        JSONArray packages = new JSONArray(packageJson);
        for (int index = 0; index < packages.length(); index++) {
            String packageName = packages.optString(index, "");
            if (packageName.isEmpty()) continue;
            if (getPackageManager().getLaunchIntentForPackage(packageName) != null) {
                return packageName;
            }
        }
        return "";
    }

    private void requestHomeSnapshot(String appName, String packageJson) {
        runOnUiThread(() -> {
            try {
                String packageName = firstInstalledPackage(packageJson);
                if (packageName.isEmpty()) {
                    deliverSnapshot(appName, "", "not-installed");
                    return;
                }
                String cached = getSharedPreferences(SNAPSHOT_STORE, MODE_PRIVATE)
                    .getString(packageName, "");
                if (!cached.isEmpty()) deliverSnapshot(appName, cached, "cached-refreshing");

                String requestId = UUID.randomUUID().toString();
                pendingSnapshots.put(requestId, new SnapshotRequest(appName, packageName));
                Intent request = new Intent(SNAPSHOT_REQUEST_ACTION);
                request.setPackage(packageName);
                request.putExtra("contract_version", SNAPSHOT_CONTRACT_VERSION);
                request.putExtra("request_id", requestId);
                request.putExtra("response_action", SNAPSHOT_RESPONSE_ACTION);
                request.putExtra("response_package", getPackageName());
                sendBroadcast(request);
                if (cached.isEmpty()) deliverSnapshot(appName, "", "awaiting-live-connection");
            } catch (Exception error) {
                deliverSnapshot(appName, "", "needs-attention");
            }
        });
    }

    private void deliverSnapshot(String appName, String snapshotJson, String state) {
        evaluateJavascript(
            "window.receiveAppSnapshot?.("
                + JSONObject.quote(appName)
                + ","
                + JSONObject.quote(snapshotJson)
                + ","
                + JSONObject.quote(state)
                + ");"
        );
    }

    private void deliverFilingInbox() {
        String inboxJson = FilingStore.inboxJson(this);
        int itemCount = 0;
        try {
            itemCount = new JSONObject(inboxJson).optJSONArray("items").length();
        } catch (Exception ignored) {}
        Log.i(
            "AquaCommandWidget",
            "AQUA_FILING_INBOX_DELIVERED items=" + itemCount
        );
        evaluateJavascript(
            "window.receiveFilingInbox?.(" + JSONObject.quote(inboxJson) + ");"
        );
    }

    private JSONObject commandWidgetStatus(String state) {
        JSONObject payload = new JSONObject();
        try {
            AppWidgetManager manager = AppWidgetManager.getInstance(this);
            payload.put("supported", manager.isRequestPinAppWidgetSupported());
            payload.put("installedCount", AquaCommandWidget.installedCount(this));
            payload.put("state", state);
        } catch (Exception error) {
            try {
                payload.put("supported", false);
                payload.put("installedCount", AquaCommandWidget.installedCount(this));
                payload.put("state", "Needs Attention");
            } catch (JSONException ignored) {}
        }
        return payload;
    }

    private void deliverCommandWidgetStatus(String state) {
        sendJsonCallback("receiveCommandWidgetStatus", commandWidgetStatus(state));
    }

    private void installOrRepairCommandWidget() {
        runOnUiThread(() -> {
            int installed = AquaCommandWidget.installedCount(this);
            if (installed > 0) {
                AquaCommandWidget.updateAll(this);
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_REPAIR_COMPLETE installed=" + installed
                );
                deliverCommandWidgetStatus("Refreshed");
                return;
            }
            try {
                AppWidgetManager manager = AppWidgetManager.getInstance(this);
                if (!manager.isRequestPinAppWidgetSupported()) {
                    Log.w("AquaCommandWidget", "AQUA_WIDGET_PIN_UNSUPPORTED");
                    deliverCommandWidgetStatus("Use Android widget picker");
                    return;
                }
                Intent successIntent = new Intent(this, AquaCommandWidget.class)
                    .setAction(AquaCommandWidget.ACTION_PINNED)
                    .setPackage(getPackageName());
                PendingIntent success = PendingIntent.getBroadcast(
                    this,
                    140,
                    successIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                );
                boolean requested = manager.requestPinAppWidget(
                    new ComponentName(this, AquaCommandWidget.class),
                    null,
                    success
                );
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_PIN_REQUESTED accepted=" + requested
                );
                deliverCommandWidgetStatus(requested ? "Confirmation requested" : "Needs Attention");
            } catch (Exception error) {
                Log.e("AquaCommandWidget", "AQUA_WIDGET_PIN_FAILED", error);
                deliverCommandWidgetStatus("Needs Attention");
            }
        });
    }

    private String installedPackage(String[] packageNames) {
        if (packageNames == null) return "";
        for (String packageName : packageNames) {
            if (
                packageName != null
                    && !packageName.isEmpty()
                    && getPackageManager().getLaunchIntentForPackage(packageName) != null
            ) {
                return packageName;
            }
        }
        return "";
    }

    private boolean intentHandlerAvailable(String action) {
        return new Intent(action).resolveActivity(getPackageManager()) != null;
    }

    private JSONObject deviceDiagnostics() {
        JSONObject payload = new JSONObject();
        try {
            JSONArray appStates = new JSONArray();
            int installedApps = 0;
            for (int index = 0; index < DIAGNOSTIC_APP_NAMES.length; index++) {
                String installedPackage = installedPackage(DIAGNOSTIC_APP_PACKAGES[index]);
                if (!installedPackage.isEmpty()) installedApps++;
                appStates.put(
                    new JSONObject()
                        .put("name", DIAGNOSTIC_APP_NAMES[index])
                        .put("installed", !installedPackage.isEmpty())
                        .put("packageName", installedPackage)
                );
            }
            payload
                .put("generatedAt", System.currentTimeMillis())
                .put("platform", "Android " + Build.VERSION.RELEASE)
                .put("versionName", BuildConfig.VERSION_NAME)
                .put("versionCode", BuildConfig.VERSION_CODE)
                .put("gatewayConfigured", !AQUA_GATEWAY_URL.trim().isEmpty())
                .put("authenticated", sessionIsCurrent())
                .put(
                    "microphoneGranted",
                    checkSelfPermission(Manifest.permission.RECORD_AUDIO)
                        == PackageManager.PERMISSION_GRANTED
                )
                .put("speechRecognizerAvailable", SpeechRecognizer.isRecognitionAvailable(this))
                .put(
                    "calendarReadGranted",
                    checkSelfPermission(Manifest.permission.READ_CALENDAR)
                        == PackageManager.PERMISSION_GRANTED
                )
                .put(
                    "calendarWriteGranted",
                    checkSelfPermission(Manifest.permission.WRITE_CALENDAR)
                        == PackageManager.PERMISSION_GRANTED
                )
                .put("photoCaptureAvailable", intentHandlerAvailable("android.media.action.IMAGE_CAPTURE"))
                .put("videoCaptureAvailable", intentHandlerAvailable("android.media.action.VIDEO_CAPTURE"))
                .put("widgetInstalledCount", AquaCommandWidget.installedCount(this))
                .put("filingPendingCount", FilingStore.pendingCount(this))
                .put("filedTodayCount", FilingStore.filedTodayCount(this))
                .put("installedAppCount", installedApps)
                .put("registeredAppCount", DIAGNOSTIC_APP_NAMES.length)
                .put("apps", appStates);
        } catch (Exception error) {
            try {
                payload.put("diagnosticError", "Sentinel could not complete one or more device checks.");
            } catch (JSONException ignored) {}
        }
        return payload;
    }

    private void deliverDeviceDiagnostics() {
        sendJsonCallback("receiveDeviceDiagnostics", deviceDiagnostics());
    }

    private void openAppPermissionSettings() {
        runOnUiThread(() -> {
            try {
                Intent intent = new Intent(
                    Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                    Uri.parse("package:" + getPackageName())
                );
                startActivity(intent);
            } catch (Exception error) {
                try {
                    startActivity(new Intent(Settings.ACTION_SETTINGS));
                } catch (Exception ignored) {
                    sendError("Android settings are not available on this device.");
                }
            }
        });
    }

    private void copyDiagnosticReceipt(String receipt) {
        runOnUiThread(() -> {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
            if (clipboard == null) {
                sendError("The Android clipboard is not available.");
                return;
            }
            clipboard.setPrimaryClip(
                ClipData.newPlainText(
                    "Aqua Sentinel diagnostic receipt",
                    receipt == null ? "" : receipt
                )
            );
            evaluateJavascript("window.receiveDiagnosticCopy?.();");
        });
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            textToSpeech.setLanguage(Locale.US);
            textToSpeech.setPitch(1.0f);
            textToSpeech.setSpeechRate(0.97f);
            textToSpeech.setOnUtteranceProgressListener(
                new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {
                        evaluateJavascript("window.setAquaSpeaking(true);");
                    }

                    @Override
                    public void onRangeStart(
                        String utteranceId,
                        int start,
                        int end,
                        int frame
                    ) {
                        evaluateJavascript("window.pulseAquaSpeech?.();");
                    }

                    @Override
                    public void onDone(String utteranceId) {
                        evaluateJavascript("window.setAquaSpeaking(false);");
                    }

                    @Override
                    public void onError(String utteranceId) {
                        onDone(utteranceId);
                    }
                }
            );
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
            if (
                grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED
            ) {
                startListening();
            } else {
                sendError(
                    "Microphone permission is required. You can enable it in Android settings."
                );
            }
        }
    }

    @Override
    public void onBackPressed() {
        evaluateJavascript("window.closeAquaDetails();");
    }

    @Override
    protected void onDestroy() {
        if (snapshotReceiverRegistered) {
            unregisterReceiver(snapshotReceiver);
            snapshotReceiverRegistered = false;
        }
        if (filingReceiverRegistered) {
            unregisterReceiver(filingReceiver);
            filingReceiverRegistered = false;
        }
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        if (webView != null) {
            webView.removeJavascriptInterface("AquaBridge");
            webView.destroy();
        }
        networkExecutor.shutdownNow();
        super.onDestroy();
    }

    private SecretKey getOrCreateSessionKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KEYSTORE_PROVIDER);
        keyStore.load(null);
        if (keyStore.containsAlias(KEY_ALIAS)) {
            return ((KeyStore.SecretKeyEntry) keyStore.getEntry(KEY_ALIAS, null))
                .getSecretKey();
        }

        KeyGenerator generator = KeyGenerator.getInstance(
            "AES",
            KEYSTORE_PROVIDER
        );
        generator.init(
            new android.security.keystore.KeyGenParameterSpec.Builder(
                KEY_ALIAS,
                android.security.keystore.KeyProperties.PURPOSE_ENCRYPT
                    | android.security.keystore.KeyProperties.PURPOSE_DECRYPT
            )
                .setBlockModes(
                    android.security.keystore.KeyProperties.BLOCK_MODE_GCM
                )
                .setEncryptionPaddings(
                    android.security.keystore.KeyProperties.ENCRYPTION_PADDING_NONE
                )
                .setKeySize(256)
                .build()
        );
        return generator.generateKey();
    }

    private void storeSecureValue(String name, String value) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateSessionKey());
        byte[] encrypted = cipher.doFinal(
            value.getBytes(StandardCharsets.UTF_8)
        );
        String encoded =
            Base64.encodeToString(cipher.getIV(), Base64.NO_WRAP)
                + ":"
                + Base64.encodeToString(encrypted, Base64.NO_WRAP);
        getSharedPreferences(SESSION_STORE, MODE_PRIVATE)
            .edit()
            .putString(name, encoded)
            .apply();
    }

    private String readSecureValue(String name) {
        try {
            SharedPreferences preferences = getSharedPreferences(
                SESSION_STORE,
                MODE_PRIVATE
            );
            String encoded = preferences.getString(name, "");
            if (encoded == null || encoded.isEmpty()) return "";
            String[] parts = encoded.split(":", 2);
            if (parts.length != 2) return "";
            byte[] iv = Base64.decode(parts[0], Base64.NO_WRAP);
            byte[] encrypted = Base64.decode(parts[1], Base64.NO_WRAP);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(
                Cipher.DECRYPT_MODE,
                getOrCreateSessionKey(),
                new GCMParameterSpec(128, iv)
            );
            return new String(
                cipher.doFinal(encrypted),
                StandardCharsets.UTF_8
            );
        } catch (Exception ignored) {
            return "";
        }
    }

    private void clearSession() {
        getSharedPreferences(SESSION_STORE, MODE_PRIVATE).edit().clear().apply();
    }

    private void storeSession(JSONObject payload) throws Exception {
        String accessToken = payload.optString("accessToken", "");
        JSONObject user = payload.optJSONObject("identity");
        String email = user == null
            ? readSecureValue(USER_EMAIL)
            : user.optString("email", readSecureValue(USER_EMAIL));
        long expiresIn = Math.max(60, payload.optLong("expiresIn", 900));
        if (accessToken.isEmpty()) {
            throw new JSONException("The secure session response was incomplete.");
        }
        storeSecureValue(ACCESS_TOKEN, accessToken);
        storeSecureValue(
            SESSION_EXPIRES_AT,
            Long.toString(System.currentTimeMillis() + expiresIn * 1000L)
        );
        storeSecureValue(USER_EMAIL, email);
    }

    private HttpResult postJson(
        String endpoint,
        JSONObject body,
        String accessToken
    ) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint)
            .openConnection();
        connection.setRequestMethod("POST");
        connection.setConnectTimeout(20000);
        connection.setReadTimeout(90000);
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        if (accessToken != null && !accessToken.isEmpty()) {
            connection.setRequestProperty(
                "Authorization",
                "Bearer " + accessToken
            );
        }
        byte[] bytes = body.toString().getBytes(StandardCharsets.UTF_8);
        connection.setFixedLengthStreamingMode(bytes.length);
        try (OutputStream output = connection.getOutputStream()) {
            output.write(bytes);
        }

        int status = connection.getResponseCode();
        InputStream stream = status >= 200 && status < 400
            ? connection.getInputStream()
            : connection.getErrorStream();
        StringBuilder response = new StringBuilder();
        if (stream != null) {
            try (
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(stream, StandardCharsets.UTF_8)
                )
            ) {
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
            }
        }
        connection.disconnect();
        return new HttpResult(status, response.toString());
    }

    private JSONObject rpcRequest(String method, JSONObject params) throws JSONException {
        return new JSONObject()
            .put("jsonrpc", "2.0")
            .put("id", UUID.randomUUID().toString())
            .put("method", method)
            .put("params", params);
    }

    private JSONObject rpcResult(HttpResult result, String fallback) throws Exception {
        JSONObject envelope = new JSONObject(result.body);
        JSONObject error = envelope.optJSONObject("error");
        if (!result.isSuccess() || error != null) {
            if (error != null && error.optInt("code") == -32001) {
                clearSession();
                sendJsonCallback(
                    "receiveAuthState",
                    new JSONObject().put("authenticated", false)
                );
            }
            String message = error == null
                ? fallback
                : error.optString("message", fallback);
            throw new IllegalStateException(message.length() > 220 ? fallback : message);
        }
        JSONObject payload = envelope.optJSONObject("result");
        if (payload == null) throw new JSONException("The gateway response was incomplete.");
        return payload;
    }

    private boolean sessionIsCurrent() {
        String accessToken = readSecureValue(ACCESS_TOKEN);
        String expiresAt = readSecureValue(SESSION_EXPIRES_AT);
        if (accessToken.isEmpty() || expiresAt.isEmpty()) return false;
        try {
            return Long.parseLong(expiresAt) > System.currentTimeMillis() + 30_000L;
        } catch (NumberFormatException ignored) {
            return false;
        }
    }

    private String safeServerError(HttpResult result, String fallback) {
        try {
            JSONObject payload = new JSONObject(result.body);
            JSONObject error = payload.optJSONObject("error");
            String message = error == null
                ? payload.optString("error", fallback)
                : error.optString("message", fallback);
            if (message.length() > 220) return fallback;
            return message;
        } catch (Exception ignored) {
            return fallback;
        }
    }

    private void bootstrapSession() {
        networkExecutor.execute(() -> {
            JSONObject state = new JSONObject();
            try {
                boolean authenticated = sessionIsCurrent();
                state.put("authenticated", authenticated);
                state.put("email", readSecureValue(USER_EMAIL));
                if (!authenticated) clearSession();
            } catch (Exception ignored) {
                clearSession();
                try {
                    state.put("authenticated", false);
                } catch (JSONException ignoredAgain) {}
            }
            sendJsonCallback("receiveAuthState", state);
        });
    }

    private void signInOwner(String email, String password) {
        networkExecutor.execute(() -> {
            JSONObject callback = new JSONObject();
            try {
                if (email.trim().isEmpty() || password.isEmpty()) {
                    throw new IllegalArgumentException(
                        "Enter the owner email and password."
                    );
                }
                if (AQUA_GATEWAY_URL.trim().isEmpty()) {
                    throw new IllegalStateException(
                        "Aqua Brain is not configured in this test build. Sentinel remains available in Standalone mode."
                    );
                }
                JSONObject params = new JSONObject()
                    .put("email", email.trim().toLowerCase(Locale.US))
                    .put("password", password)
                    .put("deviceId", installationId());
                HttpResult result = postJson(
                    AQUA_GATEWAY_URL,
                    rpcRequest("session.create", params),
                    ""
                );
                JSONObject payload = rpcResult(
                    result,
                    "Aqua could not verify that owner sign-in."
                );
                storeSession(payload);
                callback.put("success", true);
                callback.put("email", readSecureValue(USER_EMAIL));
            } catch (Exception error) {
                try {
                    callback.put("success", false);
                    callback.put(
                        "error",
                        ownerSessionError(error)
                    );
                } catch (JSONException ignored) {}
            }
            sendJsonCallback("receiveAuthResult", callback);
        });
    }

    private String ownerSessionError(Exception error) {
        if (error instanceof IllegalArgumentException) return error.getMessage();
        if (error instanceof UnknownHostException) {
            return "Aqua Brain gateway is unavailable. Sentinel remains available in Standalone mode.";
        }
        if (error instanceof SSLHandshakeException) {
            return "Sentinel could not verify the Aqua Brain secure connection. Sentinel remains available in Standalone mode.";
        }
        if (error instanceof SocketTimeoutException) {
            return "Aqua Brain did not answer in time. Sentinel remains available in Standalone mode.";
        }
        if (error instanceof IllegalStateException && error.getMessage() != null) {
            return error.getMessage();
        }
        return "Aqua Brain could not be reached. Sentinel remains available in Standalone mode.";
    }

    private void askAqua(String text, String selectedApp, String uiContext) {
        networkExecutor.execute(() -> {
            try {
                String accessToken = readSecureValue(ACCESS_TOKEN);
                if (accessToken.isEmpty()) {
                    throw new SecurityException(
                        "Owner sign-in is required before Aqua can answer."
                    );
                }
                JSONObject parsedContext;
                try {
                    parsedContext = new JSONObject(uiContext);
                } catch (Exception ignored) {
                    parsedContext = new JSONObject();
                }
                JSONObject params = new JSONObject()
                    .put("text", text)
                    .put("selectedApp", selectedApp)
                    .put("uiContext", parsedContext)
                    .put("conversationId", installationId() + "-primary")
                    .put("safetyIdentifier", safetyIdentifier());

                HttpResult result = postJson(
                    AQUA_GATEWAY_URL,
                    rpcRequest("aqua.chat", params),
                    accessToken
                );
                if (!result.isSuccess()) {
                    if (result.status == 401 || result.status == 403) {
                        clearSession();
                        JSONObject state = new JSONObject().put(
                            "authenticated",
                            false
                        );
                        sendJsonCallback("receiveAuthState", state);
                    }
                    throw new IllegalStateException(
                        safeServerError(
                            result,
                            "Aqua could not complete that secure request."
                        )
                    );
                }
                JSONObject payload = rpcResult(
                    result,
                    "Aqua could not complete that secure request."
                );
                sendJsonCallback("receiveAquaResponse", payload);
            } catch (Exception error) {
                sendError(
                    error.getMessage() == null
                        ? "Aqua could not complete that request."
                        : error.getMessage()
                );
            }
        });
    }

    private String installationId() {
        String value = Settings.Secure.getString(
            getContentResolver(),
            Settings.Secure.ANDROID_ID
        );
        return value == null ? "android-unknown" : value;
    }

    private String safetyIdentifier() {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(
                ("aqua-sentinel:" + installationId()).getBytes(StandardCharsets.UTF_8)
            );
            return "sentinel-" + Base64.encodeToString(
                digest,
                Base64.NO_WRAP | Base64.URL_SAFE
            ).substring(0, 24);
        } catch (Exception ignored) {
            return "sentinel-android-fallback";
        }
    }

    private static class HttpResult {
        final int status;
        final String body;

        HttpResult(int status, String body) {
            this.status = status;
            this.body = body;
        }

        boolean isSuccess() {
            return status >= 200 && status < 300;
        }
    }

    public class AquaBridge {
        @JavascriptInterface
        public void bootstrap() {
            bootstrapSession();
        }

        @JavascriptInterface
        public void startListening() {
            runOnUiThread(MainActivity.this::startListening);
        }

        @JavascriptInterface
        public void speak(String text) {
            speakText(text);
        }

        @JavascriptInterface
        public void signIn(String email, String password) {
            signInOwner(email, password);
        }

        @JavascriptInterface
        public void signOut() {
            clearSession();
        }

        @JavascriptInterface
        public void askAqua(
            String text,
            String selectedApp,
            String uiContext
        ) {
            MainActivity.this.askAqua(text, selectedApp, uiContext);
        }

        @JavascriptInterface
        public void launchApp(String appName, String packageJson) {
            launchRegisteredApp(appName, packageJson);
        }

        @JavascriptInterface
        public void requestAppSnapshot(String appName, String packageJson) {
            requestHomeSnapshot(appName, packageJson);
        }

        @JavascriptInterface
        public boolean isCustomerPreviewBuild() {
            return BuildConfig.CUSTOMER_PREVIEW_SNAPSHOTS;
        }

        @JavascriptInterface
        public boolean isEcosystemPresentationMode() {
            return BuildConfig.ECOSYSTEM_PRESENTATION_MODE;
        }

        @JavascriptInterface
        public boolean isGatewayConfigured() {
            return !AQUA_GATEWAY_URL.trim().isEmpty();
        }

        @JavascriptInterface
        public String getFilingInbox() {
            return FilingStore.inboxJson(MainActivity.this);
        }

        @JavascriptInterface
        public String getCommandWidgetStatus() {
            return commandWidgetStatus("Ready").toString();
        }

        @JavascriptInterface
        public void installOrRepairCommandWidget() {
            MainActivity.this.installOrRepairCommandWidget();
        }

        @JavascriptInterface
        public String getDeviceDiagnostics() {
            return deviceDiagnostics().toString();
        }

        @JavascriptInterface
        public void refreshDeviceDiagnostics() {
            deliverDeviceDiagnostics();
        }

        @JavascriptInterface
        public void openAppPermissionSettings() {
            MainActivity.this.openAppPermissionSettings();
        }

        @JavascriptInterface
        public void copyDiagnosticReceipt(String receipt) {
            MainActivity.this.copyDiagnosticReceipt(receipt);
        }

        @JavascriptInterface
        public void startFilingCapture(String mode) {
            runOnUiThread(() -> {
                Intent intent = new Intent(MainActivity.this, QuickCaptureActivity.class)
                    .putExtra(QuickCaptureActivity.EXTRA_MODE, mode);
                startActivity(intent);
            });
        }

        @JavascriptInterface
        public void startFilingClarification(String itemId) {
            runOnUiThread(() -> {
                Intent intent = new Intent(MainActivity.this, QuickCaptureActivity.class)
                    .putExtra(QuickCaptureActivity.EXTRA_MODE, "clarify")
                    .putExtra(QuickCaptureActivity.EXTRA_ITEM_ID, itemId);
                startActivity(intent);
            });
        }
    }
}
