package com.aquahomes.sentientos;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Calendar;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    private static final Pattern MONEY = Pattern.compile(
        "(?i)(?:\\$|usd\\s*)?(\\d{1,6}(?:,\\d{3})*(?:\\.\\d{1,2})?)"
    );

    private FilingStore() {}

    static synchronized JSONObject enqueue(
        Context context,
        String type,
        String note,
        String evidencePath
    ) {
        try {
            JSONArray items = readItems(context);
            JSONObject routing = classify(note, type);
            boolean expense = isExpense(type, note);
            Long amountMinor = expense ? amountMinor(note) : null;
            JSONObject item = new JSONObject()
                .put("id", UUID.randomUUID().toString())
                .put("contractVersion", "1.2")
                .put("type", safe(type, "voice"))
                .put("title", titleFor(type))
                .put("note", safe(note, "Evidence captured and protected."))
                .put("evidencePath", safe(evidencePath, ""))
                .put("destination", routing.optString("destination", ""))
                .put("confidence", routing.optDouble("confidence", 0.0))
                .put("needsClarification", routing.optBoolean("needsClarification", true))
                .put("state", routing.optString("state", "Needs Attention"))
                .put("handoffState", "Captured")
                .put("gatewayCorrelationId", "")
                .put("dispatchError", "")
                .put("ledgerEntry", expense)
                .put("currencyCode", "USD")
                .put("reconciliationState", expense ? "Unreconciled" : "Not Applicable")
                .put("amountSource", amountMinor == null ? "" : "owner-spoken")
                .put("createdAt", System.currentTimeMillis())
                .put(
                    "createdLabel",
                    DateFormat.getDateTimeInstance(
                        DateFormat.MEDIUM,
                        DateFormat.SHORT,
                        Locale.getDefault()
                    ).format(new Date())
                );
            if (amountMinor != null) item.put("amountMinor", amountMinor);
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

    static synchronized JSONObject enqueueCalendarReceipt(
        Context context,
        CalendarQuickAction.Parsed action,
        CalendarQuickAction.Result result
    ) {
        if (action == null || result == null) return new JSONObject();
        try {
            JSONArray items = readItems(context);
            String fingerprint = (action.title + "|" + action.startMillis).toLowerCase(Locale.US);
            for (int index = 0; index < items.length(); index++) {
                JSONObject existing = items.optJSONObject(index);
                if (existing == null) continue;
                boolean sameAction =
                    (!result.eventId.isEmpty() && result.eventId.equals(existing.optString("authoritativeId", "")))
                        || fingerprint.equals(existing.optString("actionFingerprint", ""));
                if (!sameAction) continue;
                if (!result.success || "Confirmed".equals(existing.optString("state", ""))) return existing;
                existing
                    .put("note", action.title + " · " + action.spokenTime() + " · created by Aqua")
                    .put("destination", "Device Calendar")
                    .put("confidence", 1.0)
                    .put("needsClarification", false)
                    .put("state", "Confirmed")
                    .put("authoritativeId", result.eventId);
                writeItems(context, items);
                AquaCommandWidget.updateAll(context);
                context.sendBroadcast(
                    new Intent(ACTION_INBOX_CHANGED)
                        .setPackage(context.getPackageName())
                        .putExtra("filing_item_id", existing.optString("id", ""))
                );
                return existing;
            }
            boolean confirmed = result.success;
            String note = confirmed
                ? action.title + " · " + action.spokenTime()
                    + (result.duplicate ? " · already on calendar" : " · created by Aqua")
                : action.original + " · " + safe(result.error, "Calendar confirmation failed.");
            JSONObject item = new JSONObject()
                .put("id", UUID.randomUUID().toString())
                .put("contractVersion", "1.1")
                .put("type", "action")
                .put("title", "Aqua Action · Calendar")
                .put("note", note)
                .put("evidencePath", "")
                .put("destination", confirmed ? "Device Calendar" : "Calendar · Needs Attention")
                .put("confidence", confirmed ? 1.0 : 0.0)
                .put("needsClarification", !confirmed)
                .put("state", confirmed ? "Confirmed" : "Needs Attention")
                .put("authoritativeId", result.eventId)
                .put("actionFingerprint", fingerprint)
                .put("scheduledStart", action.startMillis)
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

    static synchronized boolean markHandoffInFlight(
        Context context,
        String itemId,
        String messageId
    ) {
        return updateHandoff(
            context,
            itemId,
            "Sending to Aqua",
            messageId,
            "",
            "",
            false
        );
    }

    static synchronized boolean markHandoffResult(
        Context context,
        String itemId,
        boolean receivedByAqua,
        String correlationId,
        String error
    ) {
        return updateHandoff(
            context,
            itemId,
            receivedByAqua ? "Received by Aqua" : "Saved on device",
            "",
            correlationId,
            error,
            receivedByAqua
        );
    }

    static synchronized boolean markBrainReceipt(
        Context context,
        String itemId,
        JSONObject brainResult
    ) {
        if (itemId == null || itemId.isEmpty() || brainResult == null) return false;
        try {
            JSONArray items = readItems(context);
            JSONObject receipt = brainResult.optJSONObject("receipt");
            JSONObject quickExpense = receipt == null
                ? null
                : receipt.optJSONObject("quickExpense");
            JSONObject pulseDelivery = receipt == null
                ? null
                : receipt.optJSONObject("pulseDelivery");
            String pulseStatus = pulseDelivery == null
                ? "not_attempted"
                : pulseDelivery.optString("status", "not_attempted");
            boolean pulseConfirmed = "accepted_and_saved".equals(pulseStatus)
                || "duplicate_ignored".equals(pulseStatus);
            boolean requiresConfirmation = receipt != null
                && receipt.optBoolean("requiresConfirmation", false);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                item.put(
                        "handoffState",
                        requiresConfirmation ? "Awaiting owner confirmation" : "Received by Aqua"
                    )
                    .put("brainReply", safe(brainResult.optString("reply", ""), ""))
                    .put("dispatchError", "")
                    .put("requiresConfirmation", requiresConfirmation)
                    .put("intentId", receipt == null ? "" : receipt.optString("intentId", ""))
                    .put(
                        "confirmationToken",
                        receipt == null ? "" : receipt.optString("confirmationToken", "")
                    )
                    .put(
                        "gatewayCorrelationId",
                        receipt == null ? "" : receipt.optString("correlationId", "")
                    );
                if (quickExpense != null) {
                    JSONObject selected = quickExpense.optJSONObject("selected");
                    String resolution = quickExpense.optString("resolution", "unresolved");
                    item.put("ledgerEntry", true)
                        .put("amountMinor", quickExpense.optLong("amountMinor"))
                        .put("currencyCode", "USD")
                        .put("merchant", quickExpense.optString("merchant", ""))
                        .put("customerQuery", quickExpense.optString("customerQuery", ""))
                        .put("projectResolution", resolution)
                        .put("reconciliationState", "Unreconciled")
                        .put(
                            "destination",
                            pulseConfirmed
                                ? "AquaPulse · Confirmed"
                                : "AquaPulse · Queued"
                        )
                        .put("pulseDeliveryStatus", pulseStatus)
                        .put(
                            "pulseAcknowledgementId",
                            pulseDelivery == null
                                ? ""
                                : pulseDelivery.optString("acknowledgementId", "")
                        )
                        .put(
                            "needsClarification",
                            !("single".equals(resolution) || "provisional".equals(resolution))
                        );
                    if (selected != null) {
                        item.put("project", selected.optString("name", ""))
                            .put("projectAddress", selected.optString("address", ""))
                            .put("projectRecordId", selected.optString("sourceRecordId", ""));
                    }
                    if (!"single".equals(resolution)) item.put("state", "Needs Attention");
                }
                if (requiresConfirmation) {
                    item.put("needsApproval", true).put("state", "Needs Attention");
                } else if (pulseConfirmed) {
                    item.put("state", "Confirmed");
                } else if (
                    !"Confirmed".equals(item.optString("state", ""))
                        && !item.optBoolean("needsClarification", true)
                ) {
                    item.put("state", "Queued");
                }
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

    private static boolean updateHandoff(
        Context context,
        String itemId,
        String handoffState,
        String messageId,
        String correlationId,
        String error,
        boolean receivedByAqua
    ) {
        if (itemId == null || itemId.isEmpty()) return false;
        try {
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                item.put("handoffState", safe(handoffState, "Captured"));
                if (!safe(messageId, "").isEmpty()) item.put("messageId", messageId);
                if (!safe(correlationId, "").isEmpty()) {
                    item.put("gatewayCorrelationId", correlationId);
                }
                item.put("dispatchError", safe(error, ""));
                if (receivedByAqua) {
                    if (
                        !"Confirmed".equals(item.optString("state", ""))
                            && !item.optBoolean("needsClarification", true)
                    ) {
                        item.put("state", "Queued");
                    }
                } else if (!"Sending to Aqua".equals(handoffState)) {
                    item.put("state", "Saved Locally");
                }
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

    static synchronized String dailyLedgerLabel(Context context) {
        try {
            JSONObject ledger = new JSONObject(dailyLedgerJson(context));
            long totalMinor = ledger.optLong("capturedTotalMinor", 0L);
            int needsAmount = ledger.optInt("needsAmountCount", 0);
            String total = NumberFormat.getCurrencyInstance(Locale.US).format(totalMinor / 100.0);
            return needsAmount > 0 ? total + " · " + needsAmount + " REVIEW" : total + " TODAY";
        } catch (Exception ignored) {
            return "$0.00 TODAY";
        }
    }

    static synchronized String dailyLedgerJson(Context context) {
        try {
            Calendar start = Calendar.getInstance();
            start.set(Calendar.HOUR_OF_DAY, 0);
            start.set(Calendar.MINUTE, 0);
            start.set(Calendar.SECOND, 0);
            start.set(Calendar.MILLISECOND, 0);
            long startOfToday = start.getTimeInMillis();
            start.add(Calendar.DAY_OF_YEAR, 1);
            long startOfTomorrow = start.getTimeInMillis();
            long totalMinor = 0L;
            int entryCount = 0;
            int needsAmount = 0;
            JSONArray entries = new JSONArray();
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !item.optBoolean("ledgerEntry", false)) continue;
                long createdAt = item.optLong("createdAt", 0L);
                if (createdAt < startOfToday || createdAt >= startOfTomorrow) continue;
                entryCount++;
                if (item.has("amountMinor")) totalMinor += item.optLong("amountMinor", 0L);
                else needsAmount++;
                entries.put(item);
            }
            return new JSONObject()
                .put("contractVersion", "1.0")
                .put("date", new java.text.SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date()))
                .put("currencyCode", "USD")
                .put("capturedTotalMinor", totalMinor)
                .put("entryCount", entryCount)
                .put("needsAmountCount", needsAmount)
                .put("actualsState", "Pending satellite reconciliation")
                .put("entries", entries)
                .toString();
        } catch (Exception ignored) {
            return "{\"contractVersion\":\"1.0\",\"currencyCode\":\"USD\",\"capturedTotalMinor\":0,\"entryCount\":0,\"needsAmountCount\":0,\"actualsState\":\"Pending satellite reconciliation\",\"entries\":[]}";
        }
    }

    static synchronized boolean markReceiptAnalysis(
        Context context,
        String itemId,
        JSONObject envelope
    ) {
        if (itemId == null || itemId.isEmpty() || envelope == null) return false;
        try {
            JSONObject analysis = envelope.optJSONObject("analysis");
            if (analysis == null) return false;
            JSONObject amounts = analysis.optJSONObject("amounts");
            JSONObject total = amounts == null ? null : amounts.optJSONObject("total");
            JSONObject merchant = analysis.optJSONObject("merchant");
            JSONObject displayName = merchant == null ? null : merchant.optJSONObject("displayName");
            JSONObject purchase = analysis.optJSONObject("purchase");
            JSONObject currency = purchase == null ? null : purchase.optJSONObject("currencyCode");
            JSONObject job = analysis.optJSONObject("job");
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                item.put("ledgerEntry", true)
                    .put("receiptAnalysisId", envelope.optString("analysisId", ""))
                    .put("amountSource", "receipt-analysis")
                    .put("reconciliationState", "Unreconciled")
                    .put("merchant", displayName == null ? "" : displayName.optString("value", ""))
                    .put("currencyCode", currency == null ? "USD" : safe(currency.optString("value", ""), "USD"))
                    .put("project", job == null ? "" : safe(job.optString("name", ""), ""))
                    .put("needsClarification", envelope.optJSONObject("nextQuestion") != null
                        && envelope.optJSONObject("nextQuestion").optBoolean("needed", false))
                    .put("state", envelope.optString("status", "Needs Attention"));
                if (total != null && !total.isNull("valueMinor")) {
                    item.put("amountMinor", total.optLong("valueMinor"));
                }
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

    static synchronized boolean clarify(Context context, String itemId, String ownerDirection) {
        if (itemId == null || itemId.isEmpty() || ownerDirection == null || ownerDirection.trim().isEmpty()) return false;
        try {
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                String direction = ownerDirection.trim();
                JSONObject routing = classify(direction, item.optString("type", "voice"));
                String destination = routing.optString("destination", "");
                if (destination.isEmpty()) destination = "Owner direction · " + direction;
                item.put("destination", destination)
                    .put("confidence", 1.0)
                    .put("needsClarification", false)
                    .put("state", "Filed Locally")
                    .put("handoffState", "Filed by Aqua on this phone")
                    .put("filedAt", System.currentTimeMillis())
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

    static synchronized boolean fileLocally(Context context, String itemId) {
        if (itemId == null || itemId.isEmpty()) return false;
        try {
            JSONArray items = readItems(context);
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) continue;
                if (
                    item.optBoolean("needsClarification", true)
                        || item.optBoolean("needsApproval", false)
                ) {
                    return false;
                }
                item.put("state", "Filed Locally")
                    .put("handoffState", "Filed by Aqua on this phone")
                    .put("filedAt", System.currentTimeMillis());
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

    static synchronized boolean discard(Context context, String itemId) {
        if (itemId == null || itemId.isEmpty()) return false;
        try {
            JSONArray items = readItems(context);
            JSONArray retained = new JSONArray();
            boolean found = false;
            for (int index = 0; index < items.length(); index++) {
                JSONObject item = items.optJSONObject(index);
                if (item == null || !itemId.equals(item.optString("id", ""))) {
                    retained.put(items.get(index));
                    continue;
                }
                found = true;
                String evidencePath = item.optString("evidencePath", "");
                if (!evidencePath.isEmpty()) {
                    File evidenceRoot = new File(
                        context.getFilesDir(),
                        "filing-evidence"
                    ).getCanonicalFile();
                    File evidence = new File(evidencePath).getCanonicalFile();
                    boolean protectedEvidence = evidence.getPath().startsWith(
                        evidenceRoot.getPath() + File.separator
                    );
                    if (protectedEvidence && evidence.exists() && !evidence.delete()) {
                        return false;
                    }
                }
            }
            if (!found) return false;
            writeItems(context, retained);
            AquaCommandWidget.updateAll(context);
            context.sendBroadcast(
                new Intent(ACTION_INBOX_CHANGED)
                    .setPackage(context.getPackageName())
                    .putExtra("filing_item_id", itemId)
            );
            return true;
        } catch (Exception ignored) {}
        return false;
    }

    private static JSONObject classify(String input, String type) throws Exception {
        String note = safe(input, "").toLowerCase(Locale.US);
        String captureType = safe(type, "voice").toLowerCase(Locale.US);
        JSONObject routing = new JSONObject();
        if (isExpense(type, input)) {
            return routing
                .put("destination", "Aqua Receipts · Daily Ledger")
                .put("confidence", 0.95)
                .put("needsClarification", amountMinor(input) == null)
                .put("state", amountMinor(input) == null ? "Needs Attention" : "Queued");
        }
        if (
            note.contains("remind me")
                || note.contains("appointment")
                || note.contains("schedule")
                || note.contains("meeting")
                || note.contains("calendar")
        ) {
            return routing
                .put("destination", "Aqua Actions · Calendar & Reminders")
                .put("confidence", 0.94)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if (
            note.contains("painting company")
                || note.contains("painting business")
                || note.contains("receipt")
                || note.contains("expense")
                || note.contains("invoice")
                || note.contains("bill")
                || note.contains("bookkeeping")
        ) {
            return routing
                .put("destination", "Aqua Books · Executive Intake")
                .put("confidence", 0.93)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if (
            note.contains("aqua crm")
                || note.contains("customer")
                || note.contains("client")
                || note.contains("lead")
                || note.contains("contact")
                || note.contains("follow up")
                || note.contains("follow-up")
        ) {
            return routing
                .put("destination", "Aqua CRM · Executive Intake")
                .put("confidence", 0.88)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if (
            note.contains("document")
                || note.contains("contract")
                || note.contains("permit")
                || note.contains("code question")
                || note.contains("specification")
                || note.contains("research")
                || note.contains("look up")
        ) {
            return routing
                .put("destination", "Aqua Knowledge Vault · Executive Intake")
                .put("confidence", 0.87)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if (
            note.contains("jobsite")
                || note.contains("job site")
                || note.contains("property")
                || note.contains("tenant")
                || note.contains("resident")
                || note.contains("maintenance")
                || note.contains("work order")
        ) {
            return routing
                .put("destination", "Aqua Operations · Executive Intake")
                .put("confidence", 0.84)
                .put("needsClarification", false)
                .put("state", "Queued");
        }
        if ("photo".equals(captureType) || "video".equals(captureType)) {
            return routing
                .put("destination", "Aqua Executive Desk · Protected Evidence")
                .put("confidence", 0.0)
                .put("needsClarification", true)
                .put("state", "Needs Attention");
        }
        return routing
            .put("destination", "Aqua Executive Desk · Intake")
            .put("confidence", 1.0)
            .put("needsClarification", false)
            .put("state", "Queued");
    }

    private static String titleFor(String type) {
        if ("action".equals(type)) return "Aqua Executive Handoff";
        if ("receipt".equals(type)) return "Daily expense receipt";
        if ("photo".equals(type)) return "Photo reference";
        if ("video".equals(type)) return "Video reference";
        return "Quick filing instruction";
    }

    private static boolean isExpense(String type, String note) {
        String value = safe(note, "").toLowerCase(Locale.US);
        return "receipt".equalsIgnoreCase(safe(type, ""))
            || MONEY.matcher(value).find() && (value.contains("$") || value.contains("usd") || value.contains("dollar"))
            || value.contains("receipt")
            || value.contains("expense")
            || value.contains("spent ")
            || value.contains("paid ")
            || value.contains("bought ")
            || value.contains("purchase");
    }

    private static Long amountMinor(String note) {
        if (note == null) return null;
        Matcher matcher = MONEY.matcher(note);
        while (matcher.find()) {
            String before = note.substring(0, matcher.start()).toLowerCase(Locale.US);
            boolean moneyContext = matcher.group().contains("$")
                || before.endsWith("usd ")
                || before.matches("(?s).*(spent|paid|cost|total|expense|receipt|bought)\\s*$");
            if (!moneyContext) continue;
            try {
                return new BigDecimal(matcher.group(1).replace(",", ""))
                    .movePointRight(2)
                    .longValueExact();
            } catch (ArithmeticException ignored) {}
        }
        return null;
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
