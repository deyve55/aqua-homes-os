package com.aquahomes.sentientos;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
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
    private static final String EXTRA_EVIDENCE_PATH = "evidence_path";
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
        String evidencePath
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
                    .putExtra(EXTRA_EVIDENCE_PATH, safe(evidencePath))
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
        String evidencePath = safe(intent.getStringExtra(EXTRA_EVIDENCE_PATH));
        boolean hasLocalEvidence = !evidencePath.isEmpty();
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
            JSONObject receiptAnalysis = null;
            if ("receipt".equals(captureType) && hasLocalEvidence) {
                receiptAnalysis = analyzeReceipt(
                    filingItemId,
                    evidencePath,
                    text.trim(),
                    accessToken
                );
                FilingStore.markReceiptAnalysis(this, filingItemId, receiptAnalysis);
            }
            JSONObject params = new JSONObject()
                .put(
                    "text",
                    receiptAnalysis == null
                        ? text.trim()
                        : text.trim() + " Receipt analysis: " + receiptAnalysis.toString()
                )
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

    private JSONObject analyzeReceipt(
        String evidenceId,
        String evidencePath,
        String context,
        String accessToken
    ) throws Exception {
        File evidence = new File(evidencePath).getCanonicalFile();
        File evidenceRoot = new File(getFilesDir(), "filing-evidence").getCanonicalFile();
        if (!evidence.getPath().startsWith(evidenceRoot.getPath() + File.separator)) {
            throw new SecurityException("Receipt evidence path was rejected.");
        }
        if (!evidence.isFile() || evidence.length() == 0 || evidence.length() > 25_000_000L) {
            throw new IllegalStateException("Receipt image is missing or too large.");
        }
        byte[] original = readBounded(evidence, 25_000_000);
        BitmapFactory.Options bounds = new BitmapFactory.Options();
        bounds.inJustDecodeBounds = true;
        BitmapFactory.decodeByteArray(original, 0, original.length, bounds);
        int sample = 1;
        while (Math.max(bounds.outWidth / sample, bounds.outHeight / sample) > 2048) sample *= 2;
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inSampleSize = sample;
        Bitmap bitmap = BitmapFactory.decodeByteArray(original, 0, original.length, options);
        if (bitmap == null) throw new IllegalStateException("Receipt image could not be decoded.");
        ByteArrayOutputStream compressed = new ByteArrayOutputStream();
        int quality = 88;
        bitmap.compress(Bitmap.CompressFormat.JPEG, quality, compressed);
        while (compressed.size() > 4_500_000 && quality > 58) {
            compressed.reset();
            quality -= 10;
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, compressed);
        }
        bitmap.recycle();
        byte[] analysis = compressed.toByteArray();
        if (analysis.length > 5_000_000) {
            throw new IllegalStateException("Receipt image could not be reduced for secure analysis.");
        }
        JSONObject params = new JSONObject()
            .put("evidenceId", evidenceId)
            .put("originalSha256", sha256(original))
            .put("analysisImageSha256", sha256(analysis))
            .put("mimeType", "image/jpeg")
            .put("imageDataUrl", "data:image/jpeg;base64," + Base64.encodeToString(analysis, Base64.NO_WRAP))
            .put(
                "capturedAt",
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", Locale.US).format(new Date())
            )
            .put("source", "SENTINEL_WIDGET")
            .put("conversationContext", context)
            .put("knownJobs", new org.json.JSONArray())
            .put("knownCostCodes", new org.json.JSONArray());
        JSONObject envelope = postJson(
            BuildConfig.AQUA_GATEWAY_URL.trim(),
            new JSONObject()
                .put("jsonrpc", "2.0")
                .put("id", UUID.randomUUID().toString())
                .put("method", "aqua.receipt.analyze")
                .put("params", params),
            accessToken
        );
        JSONObject error = envelope.optJSONObject("error");
        JSONObject result = envelope.optJSONObject("result");
        if (error != null || result == null) {
            throw new IllegalStateException("Aqua could not analyze that receipt.");
        }
        return result;
    }

    private static byte[] readBounded(File file, int limit) throws Exception {
        try (InputStream input = new FileInputStream(file); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[16 * 1024];
            int read;
            while ((read = input.read(buffer)) != -1) {
                if (output.size() + read > limit) throw new IllegalStateException("Receipt image is too large.");
                output.write(buffer, 0, read);
            }
            return output.toByteArray();
        }
    }

    private static String sha256(byte[] bytes) throws Exception {
        byte[] digest = MessageDigest.getInstance("SHA-256").digest(bytes);
        StringBuilder value = new StringBuilder(digest.length * 2);
        for (byte next : digest) value.append(String.format(Locale.US, "%02x", next & 0xff));
        return value.toString();
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
