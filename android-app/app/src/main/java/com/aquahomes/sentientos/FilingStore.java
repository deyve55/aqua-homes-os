package com.aquahomes.sentientos;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import org.json.JSONArray;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.text.DateFormat;
import java.util.Date;
import java.util.Calendar;
import java.util.Locale;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

final class FilingStore {
    static final String ACTION_INBOX_CHANGED =
        "com.aquasoftware.sentinel.FILING_INBOX_CHANGED";
    private static final String STORE = "aqua_sentinel_filing_inbox_v1";
    private static final String STORE_KEY = "encrypted_items";
    private static final String KEY_ALIAS = "aqua_sentinel_filing_queue_key_v1";
    private static final int MAX_ITEMS = 250;

    private FilingStore() {}

    static synchronized JSONObject enqueue(
        Context context,
        String type,
        String note,
        String evidencePath
    ) {
        try {
            JSONArray items = readItems(context);
            JSONObject routing = classify(note);
            JSONObject item = new JSONObject()
                .put("id", UUID.randomUUID().toString())
                .put("contractVersion", "1.0")
                .put("type", safe(type, "voice"))
                .put("title", titleFor(type))
                .put("note", safe(note, "Evidence captured and protected."))
                .put("evidencePath", safe(evidencePath, ""))
                .put("destination", routing.optString("destination", ""))
                .put("confidence", routing.optDouble("confidence", 0.0))
                .put("needsClarification", routing.optBoolean("needsClarification", true))
                .put("state", routing.optString("state", "Needs Attention"))
                .put("createdAt", System.currentTimeMillis())
                .put(
                    "createdLabel",
                    DateFormat.getDateTimeInstance(
                        DateFormat.MEDIUM,
                        DateFormat.SHORT,
                        Locale.getDefault()
                    ).format(new Date())
                );
            JSONArray next = new JSONArray().put(item);
            for (int index = 0; index < items.length() && next.length() < MAX_ITEMS; index++) {
                next.put(items.get(index));
            }
            writeItems(context, next);
            AquaCommandWidget.updateAll(context);
            context.sendBroadcast(
                new Intent(ACTION_INBOX_CHANGED)
                    .setPackage(context.getPackageName())
                    .putExtra("filing_item_id", item.optString("id", ""))
            );
            return item;
        } catch (Exception error) {
            return new JSONObject();
        }
    }

    static synchronized String inboxJson(Context context) {
        try {
            JSONArray items = readItems(context);
            int pending = 0;
            int routed = 0;
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null) continue;
                if (item.optBoolean("needsClarification", true)) pending++;
                if (!item.optString("destination", "").isEmpty()) routed++;
            }
            return new JSONObject()
                .put("contractVersion", "1.0")
                .put("pendingCount", pending)
                .put("autoRoutedCount", routed)
                .put("items", items)
                .toString();
        } catch (Exception error) {
            return "{\"contractVersion\":\"1.0\",\"pendingCount\":0,\"autoRoutedCount\":0,\"items\":[]}";
        }
    }

    static synchronized int pendingCount(Context context) {
        try {
            JSONArray items = readItems(context);
            int pending = 0;
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item != null && item.optBoolean("needsClarification", true)) pending++;
            }
            return pending;
        } catch (Exception ignored) {
            return 0;
        }
    }

    static synchronized int filedTodayCount(Context context) {
        try {
            Calendar start = Calendar.getInstance();
            start.set(Calendar.HOUR_OF_DAY, 0);
            start.set(Calendar.MINUTE, 0);
            start.set(Calendar.SECOND, 0);
            start.set(Calendar.MILLISECOND, 0);
            long startOfToday = start.getTimeInMillis();
            start.add(Calendar.DAY_OF_YEAR, 1);
            long startOfTomorrow = start.getTimeInMillis();
            JSONArray items = readItems(context);
            int filedToday = 0;
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null) continue;
                long createdAt = item.optLong("createdAt", 0L);
                if (createdAt >= startOfToday && createdAt < startOfTomorrow) filedToday++;
            }
            return filedToday;
        } catch (Exception ignored) {
            return 0;
        }
    }

    static synchronized boolean clarify(Context context, String itemId, String ownerDirection) {
        if (itemId == null || itemId.isEmpty() || ownerDirection == null || ownerDirection.trim().isEmpty()) return false;
        try {
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                String direction = ownerDirection.trim();
                JSONObject routing = classify(direction);
                String destination = routing.optString("destination", "");
                if (destination.isEmpty()) destination = "Owner direction · " + direction;
                item.put("destination", destination)
                    .put("confidence", 1.0)
                    .put("needsClarification", false)
                    .put("state", "Queued")
                    .put("clarification", direction);
                writeItems(context, items);
                AquaCommandWidget.updateAll(context);
                context.sendBroadcast(
                    new Intent(ACTION_INBOX_CHANGED)
                        .setPackage(context.getPackageName())
                        .putExtra("filing_item_id", itemId)
                );
                return true;
            }
        } catch (Exception ignored) {}
        return false;
    }

    private static JSONObject classify(String input) throws Exception {
        String note = safe(input, "").toLowerCase(Locale.US);
        JSONObject routing = new JSONObject();
        if (note.contains("painting company") || note.contains("painting business")) {
            return routing
                .put("destination", "Aqua Books · Painting Company")
                .put("confidence", 0.97)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if (note.contains("aqua crm") || note.contains("customer") || note.contains("client")) {
            return routing
                .put("destination", "Aqua CRM · Filing Inbox")
                .put("confidence", 0.88)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        return routing
            .put("destination", "")
            .put("confidence", 0.0)
            .put("needsClarification", true)
            .put("state", "Needs Attention");
    }

    private static String titleFor(String type) {
        if ("photo".equals(type)) return "Photo reference";
        if ("video".equals(type)) return "Video reference";
        return "Quick filing instruction";
    }

    private static String safe(String value, String fallback) {
        if (value == null || value.trim().isEmpty()) return fallback;
        return value.trim();
    }

    private static JSONArray readItems(Context context) throws Exception {
        SharedPreferences preferences = context.getSharedPreferences(STORE, Context.MODE_PRIVATE);
        String encoded = preferences.getString(STORE_KEY, "");
        if (encoded == null || encoded.isEmpty()) return new JSONArray();
        String[] parts = encoded.split(":", 2);
        if (parts.length != 2) return new JSONArray();
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(
            Cipher.DECRYPT_MODE,
            getOrCreateKey(),
            new GCMParameterSpec(128, Base64.decode(parts[0], Base64.NO_WRAP))
        );
        byte[] clear = cipher.doFinal(Base64.decode(parts[1], Base64.NO_WRAP));
        return new JSONArray(new String(clear, StandardCharsets.UTF_8));
    }

    private static void writeItems(Context context, JSONArray items) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateKey());
        byte[] encrypted = cipher.doFinal(items.toString().getBytes(StandardCharsets.UTF_8));
        String encoded = Base64.encodeToString(cipher.getIV(), Base64.NO_WRAP)
            + ":"
            + Base64.encodeToString(encrypted, Base64.NO_WRAP);
        context.getSharedPreferences(STORE, Context.MODE_PRIVATE)
            .edit()
            .putString(STORE_KEY, encoded)
            .apply();
    }

    private static SecretKey getOrCreateKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        KeyStore.Entry entry = keyStore.getEntry(KEY_ALIAS, null);
        if (entry instanceof KeyStore.SecretKeyEntry) {
            return ((KeyStore.SecretKeyEntry) entry).getSecretKey();
        }
        KeyGenerator generator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES,
            "AndroidKeyStore"
        );
        generator.init(
            new KeyGenParameterSpec.Builder(
                KEY_ALIAS,
                KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT
            )
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setRandomizedEncryptionRequired(true)
                .build()
        );
        return generator.generateKey();
    }
}
