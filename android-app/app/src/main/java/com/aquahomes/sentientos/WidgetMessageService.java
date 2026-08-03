package com.aquahomes.sentientos;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

/** Sends a widget command without launching the full Sentinel activity. */
public final class WidgetMessageService extends IntentService {
    private static final String ACTION_SEND =
        "com.aquasoftware.sentinel.action.WIDGET_BACKGROUND_SEND";
    private static final String EXTRA_TEXT = "text";
    private static final String EXTRA_MESSAGE_ID = "message_id";
    private static final String EXTRA_FILING_ITEM_ID = "filing_item_id";
    private static final String EXTRA_CAPTURE_TYPE = "capture_type";
    private static final String EXTRA_DESTINATION = "destination";
    private static final String EXTRA_LOCAL_EVIDENCE = "local_evidence";
    private static final String SESSION_STORE = "aqua_sentinel_secure_session";
    private static final String ACCESS_TOKEN = "access_token";
    private static final String KEYSTORE_PROVIDER = "AndroidKeyStore";
    private static final String KEY_ALIAS = "aqua_sentinel_owner_session_v1";

    public WidgetMessageService() {
        super("AquaWidgetMessage");
    }

    static boolean enqueue(
        Context context,
        String text,
        String messageId,
        String filingItemId,
        String captureType,
        String destination,
        boolean hasLocalEvidence
    ) {
        try {
            context.startService(
                new Intent(context, WidgetMessageService.class)
                    .setAction(ACTION_SEND)
                    .putExtra(EXTRA_TEXT, text)
                    .putExtra(EXTRA_MESSAGE_ID, messageId)
                    .putExtra(EXTRA_FILING_ITEM_ID, filingItemId)
                    .putExtra(EXTRA_CAPTURE_TYPE, captureType)
                    .putExtra(EXTRA_DESTINATION, destination)
                    .putExtra(EXTRA_LOCAL_EVIDENCE, hasLocalEvidence)
            );
            return true;
        } catch (RuntimeException error) {
            Log.e(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_BACKGROUND_START_FAILED id=" + messageId,
                error
            );
            return false;
        }
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (intent == null || !ACTION_SEND.equals(intent.getAction())) return;
        String text = intent.getStringExtra(EXTRA_TEXT);
        String messageId = intent.getStringExtra(EXTRA_MESSAGE_ID);
        String filingItemId = safe(intent.getStringExtra(EXTRA_FILING_ITEM_ID));
        String captureType = safe(intent.getStringExtra(EXTRA_CAPTURE_TYPE));
        String destination = safe(intent.getStringExtra(EXTRA_DESTINATION));
        boolean hasLocalEvidence = intent.getBooleanExtra(EXTRA_LOCAL_EVIDENCE, false);
        if (text == null || text.trim().isEmpty()) return;
        if (messageId == null || messageId.isEmpty()) messageId = UUID.randomUUID().toString();
        FilingStore.markHandoffInFlight(this, filingItemId, messageId);

        try {
            if (BuildConfig.ECOSYSTEM_PRESENTATION_MODE) {
                JSONObject presentationResult = new JSONObject()
                    .put("reply", "Aqua received the executive handoff.")
                    .put(
                        "receipt",
                        new JSONObject()
                            .put("status", "Queued")
                            .put("correlationId", "presentation-" + messageId)
                            .put("requiresConfirmation", false)
                            .put("intentId", "")
                            .put("confirmationToken", "")
                    );
                FilingStore.markBrainReceipt(
                    this,
                    filingItemId,
                    presentationResult
                );
                AquaCommandWidget.showAquaHasIt(this, widgetMode(captureType));
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_MESSAGE_BACKGROUND_SENT id=" + messageId + " mode=presentation"
                );
                showResult("Aqua has it.");
                return;
            }
            String endpoint = BuildConfig.AQUA_GATEWAY_URL.trim();
            if (endpoint.isEmpty()) {
                throw new IllegalStateException("Aqua Brain is not configured on this build.");
            }
            String accessToken = readSecureValue(ACCESS_TOKEN);
            if (accessToken.isEmpty()) {
                throw new SecurityException("Open Sentinel once and sign in, then try again.");
            }
            JSONObject params = new JSONObject()
                .put("text", text.trim())
                .put("selectedApp", "Aqua Sentinel OS")
                .put(
                    "uiContext",
                    new JSONObject()
                        .put("surface", "launcher-widget")
                        .put("handoff", "executive-assistant-desk")
                        .put("captureType", captureType)
                        .put("filingItemId", filingItemId)
                        .put("destination", destination)
                        .put("localEvidenceRetained", hasLocalEvidence)
                )
                .put("conversationId", installationId() + "-primary")
                .put("safetyIdentifier", safetyIdentifier());
            JSONObject request = new JSONObject()
                .put("jsonrpc", "2.0")
                .put("id", messageId)
                .put("method", "aqua.chat")
                .put("params", params);
            JSONObject envelope = postJson(endpoint, request, accessToken);
            JSONObject result = envelope.optJSONObject("result");
            if (envelope.optJSONObject("error") != null || result == null) {
                throw new IllegalStateException("Aqua could not complete that request.");
            }
            JSONObject receipt = result.optJSONObject("receipt");
            String correlationId = receipt == null
                ? messageId
                : receipt.optString("correlationId", messageId);
            FilingStore.markBrainReceipt(
                this,
                filingItemId,
                result
            );
            AquaCommandWidget.showAquaHasIt(this, widgetMode(captureType));
            Log.i(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_BACKGROUND_SENT id=" + messageId
                    + " correlation=" + correlationId
                    + " mode=secure-gateway"
            );
            showResult("Aqua has it.");
        } catch (Exception error) {
            String message = error.getMessage();
            if (message == null || message.isEmpty()) message = "Aqua could not send that message.";
            FilingStore.markHandoffResult(
                this,
                filingItemId,
                false,
                "",
                message
            );
            AquaCommandWidget.showSavedLocally(this, widgetMode(captureType));
            Log.e(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_BACKGROUND_FAILED id=" + messageId,
                error
            );
            showResult("Saved securely on this phone. Aqua delivery needs attention.");
        }
    }

    private static String widgetMode(String captureType) {
        if ("photo".equals(captureType)) return "photo";
        if ("video".equals(captureType)) return "video";
        if ("voice".equals(captureType)) return "file";
        return "action";
    }

    private static String safe(String value) {
        return value == null ? "" : value.trim();
    }

    private String readSecureValue(String name) {
        try {
            SharedPreferences preferences = getSharedPreferences(SESSION_STORE, MODE_PRIVATE);
            String encoded = preferences.getString(name, "");
            if (encoded == null || encoded.isEmpty()) return "";
            String[] parts = encoded.split(":", 2);
            if (parts.length != 2) return "";
            KeyStore keyStore = KeyStore.getInstance(KEYSTORE_PROVIDER);
            keyStore.load(null);
            KeyStore.Entry entry = keyStore.getEntry(KEY_ALIAS, null);
            if (!(entry instanceof KeyStore.SecretKeyEntry)) return "";
            SecretKey key = ((KeyStore.SecretKeyEntry) entry).getSecretKey();
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(
                Cipher.DECRYPT_MODE,
                key,
                new GCMParameterSpec(128, Base64.decode(parts[0], Base64.NO_WRAP))
            );
            return new String(
                cipher.doFinal(Base64.decode(parts[1], Base64.NO_WRAP)),
                StandardCharsets.UTF_8
            );
        } catch (Exception ignored) {
            return "";
        }
    }

    private JSONObject postJson(String endpoint, JSONObject body, String accessToken) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
        connection.setRequestMethod("POST");
        connection.setConnectTimeout(20000);
        connection.setReadTimeout(90000);
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);
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
            try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(stream, StandardCharsets.UTF_8)
            )) {
                String line;
                while ((line = reader.readLine()) != null) response.append(line);
            }
        }
        connection.disconnect();
        if (status < 200 || status >= 300) {
            throw new IllegalStateException("Aqua could not complete that secure request.");
        }
        return new JSONObject(response.toString());
    }

    private String installationId() {
        String value = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
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

    private void showResult(String message) {
        new android.os.Handler(getMainLooper()).post(
            () -> Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
        );
    }
}
