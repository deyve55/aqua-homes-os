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
    private static final String SESSION_STORE = "aqua_sentinel_secure_session";
    private static final String ACCESS_TOKEN = "access_token";
    private static final String KEYSTORE_PROVIDER = "AndroidKeyStore";
    private static final String KEY_ALIAS = "aqua_sentinel_owner_session_v1";

    public WidgetMessageService() {
        super("AquaWidgetMessage");
    }

    static void enqueue(Context context, String text, String messageId) {
        context.startService(
            new Intent(context, WidgetMessageService.class)
                .setAction(ACTION_SEND)
                .putExtra(EXTRA_TEXT, text)
                .putExtra(EXTRA_MESSAGE_ID, messageId)
        );
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (intent == null || !ACTION_SEND.equals(intent.getAction())) return;
        String text = intent.getStringExtra(EXTRA_TEXT);
        String messageId = intent.getStringExtra(EXTRA_MESSAGE_ID);
        if (text == null || text.trim().isEmpty()) return;
        if (messageId == null || messageId.isEmpty()) messageId = UUID.randomUUID().toString();

        try {
            if (BuildConfig.ECOSYSTEM_PRESENTATION_MODE) {
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_MESSAGE_BACKGROUND_SENT id=" + messageId + " mode=presentation"
                );
                showResult("Sent to Aqua.");
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
                .put("uiContext", new JSONObject().put("surface", "launcher-widget"))
                .put("conversationId", installationId() + "-primary")
                .put("safetyIdentifier", safetyIdentifier());
            JSONObject request = new JSONObject()
                .put("jsonrpc", "2.0")
                .put("id", messageId)
                .put("method", "aqua.chat")
                .put("params", params);
            JSONObject envelope = postJson(endpoint, request, accessToken);
            if (envelope.optJSONObject("error") != null || envelope.optJSONObject("result") == null) {
                throw new IllegalStateException("Aqua could not complete that request.");
            }
            Log.i(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_BACKGROUND_SENT id=" + messageId + " mode=secure-gateway"
            );
            showResult("Sent to Aqua.");
        } catch (Exception error) {
            String message = error.getMessage();
            if (message == null || message.isEmpty()) message = "Aqua could not send that message.";
            Log.e(
                "AquaCommandWidget",
                "AQUA_WIDGET_MESSAGE_BACKGROUND_FAILED id=" + messageId,
                error
            );
            showResult(message);
        }
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
