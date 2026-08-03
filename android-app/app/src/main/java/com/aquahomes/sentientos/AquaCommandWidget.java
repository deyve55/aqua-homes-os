package com.aquahomes.sentientos;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.SizeF;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

import java.util.LinkedHashMap;
import java.util.Map;

public class AquaCommandWidget extends AppWidgetProvider {
    static final String ACTION_PINNED =
        "com.aquasoftware.sentinel.action.WIDGET_PINNED";
    static final String ACTION_REFRESH =
        "com.aquasoftware.sentinel.action.WIDGET_REFRESH";
    static final String ACTION_DISPATCH =
        "com.aquasoftware.sentinel.action.WIDGET_NEURAL_DISPATCH";
    static final String EXTRA_DISPATCH_MODE = "widget_neural_dispatch_mode";
    private static final String JOLT_PREFERENCES = "aqua_widget_neural_jolt";
    private static final String JOLT_MODE = "mode";
    private static final String JOLT_PHASE = "phase";
    private static final String JOLT_UNTIL = "until";
    private static final String JOLT_SEQUENCE = "sequence";
    private static final long OUTBOUND_MILLIS = 700L;
    private static final long RETURN_MILLIS = 800L;
    private static final long FILED_MILLIS = 10000L;
    private static final int[] SELECTED_NEURAL_ACTIVITY_IDS = {
        R.id.widget_selected_outbound_action,
        R.id.widget_selected_outbound_video,
        R.id.widget_selected_outbound_photo,
        R.id.widget_selected_outbound_file,
        R.id.widget_selected_return_action,
        R.id.widget_selected_return_video,
        R.id.widget_selected_return_photo,
        R.id.widget_selected_return_file
    };

    static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName component = new ComponentName(context, AquaCommandWidget.class);
        int[] ids = manager.getAppWidgetIds(component);
        for (int id : ids) update(context, manager, id);
    }

    private static PendingIntent action(Context context, String mode, int requestCode) {
        Intent intent = new Intent(context, WidgetDispatchActivity.class)
            .setAction(ACTION_DISPATCH + "." + mode.toUpperCase())
            .setPackage(context.getPackageName())
            .setData(Uri.parse("aquasentinel://widget-neural-jolt/" + mode))
            .putExtra(EXTRA_DISPATCH_MODE, mode)
            .addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK
                    | Intent.FLAG_ACTIVITY_CLEAR_TOP
                    | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS
            );
        return PendingIntent.getActivity(
            context,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    private static PendingIntent openSentinel(Context context) {
        return action(context, "home", 100);
    }

    static int installedCount(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName component = new ComponentName(context, AquaCommandWidget.class);
        return manager.getAppWidgetIds(component).length;
    }

    static int layoutForSize(int minWidth, int minHeight) {
        if (minWidth <= 0 || minHeight <= 0) return R.layout.aqua_command_widget;
        float ratio = (float) minWidth / (float) minHeight;
        if (ratio >= 1.28f && ratio <= 1.82f) return R.layout.aqua_command_widget_3x2;
        if (ratio >= 1.18f) return R.layout.aqua_command_widget_wide;
        if (minWidth <= 180 && minHeight <= 180) return R.layout.aqua_command_widget_2x2;
        if (ratio >= 0.82f && minHeight <= 260) return R.layout.aqua_command_widget_2x2;
        return R.layout.aqua_command_widget;
    }

    static String layoutName(int layout) {
        if (layout == R.layout.aqua_command_widget_3x2) return "three-by-two";
        if (layout == R.layout.aqua_command_widget_wide) return "wide";
        if (layout == R.layout.aqua_command_widget_2x2) return "two-by-two";
        if (layout == R.layout.aqua_command_widget_compact_large) return "compact-large";
        return "portrait";
    }

    private static int layoutFor(AppWidgetManager manager, int id) {
        Bundle options = manager.getAppWidgetOptions(id);
        int minWidth = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 250);
        int minHeight = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 390);
        return layoutForSize(minWidth, minHeight);
    }

    private static final class NeuralState {
        final String mode;
        final String phase;

        NeuralState(String mode, String phase) {
            this.mode = mode;
            this.phase = phase;
        }
    }

    private static NeuralState visibleNeuralState(Context context) {
        android.content.SharedPreferences state = context.getSharedPreferences(
            JOLT_PREFERENCES,
            Context.MODE_PRIVATE
        );
        if (state.getLong(JOLT_UNTIL, 0L) <= System.currentTimeMillis()) {
            return new NeuralState("", "rest");
        }
        return new NeuralState(
            state.getString(JOLT_MODE, ""),
            state.getString(JOLT_PHASE, "rest")
        );
    }

    private static int selectedNeuralActivityId(String mode, String phase) {
        if (!"outbound".equals(phase) && !"return".equals(phase)) return 0;
        boolean returning = "return".equals(phase);
        switch (mode) {
            case "action":
                return returning
                    ? R.id.widget_selected_return_action
                    : R.id.widget_selected_outbound_action;
            case "video":
                return returning
                    ? R.id.widget_selected_return_video
                    : R.id.widget_selected_outbound_video;
            case "photo":
                return returning
                    ? R.id.widget_selected_return_photo
                    : R.id.widget_selected_outbound_photo;
            case "file":
                return returning
                    ? R.id.widget_selected_return_file
                    : R.id.widget_selected_outbound_file;
            default:
                return 0;
        }
    }

    private static RemoteViews buildLayoutViews(Context context, int layout) {
        RemoteViews views = new RemoteViews(context.getPackageName(), layout);
        views.setTextViewText(
            R.id.widget_filed_today,
            String.valueOf(FilingStore.filedTodayCount(context))
        );
        NeuralState neuralState = visibleNeuralState(context);
        int selectedActivity = selectedNeuralActivityId(
            neuralState.mode,
            neuralState.phase
        );
        for (int activityId : SELECTED_NEURAL_ACTIVITY_IDS) {
            views.setViewVisibility(
                activityId,
                activityId == selectedActivity ? View.VISIBLE : View.INVISIBLE
            );
        }
        String statusText = statusText(neuralState.phase);
        views.setViewVisibility(
            R.id.widget_status,
            statusText.isEmpty() ? View.INVISIBLE : View.VISIBLE
        );
        views.setTextViewText(R.id.widget_status, statusText);
        views.setOnClickPendingIntent(R.id.widget_logo, openSentinel(context));
        views.setOnClickPendingIntent(R.id.widget_action, action(context, "action", 101));
        views.setOnClickPendingIntent(R.id.widget_video, action(context, "video", 102));
        views.setOnClickPendingIntent(R.id.widget_photo, action(context, "photo", 103));
        views.setOnClickPendingIntent(R.id.widget_file, action(context, "file", 104));
        return views;
    }

    private static RemoteViews buildViews(Context context, AppWidgetManager manager, int id) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            Map<SizeF, RemoteViews> responsive = new LinkedHashMap<>();
            responsive.put(new SizeF(110f, 110f), buildLayoutViews(context, R.layout.aqua_command_widget_2x2));
            responsive.put(new SizeF(180f, 180f), buildLayoutViews(context, R.layout.aqua_command_widget_compact_large));
            responsive.put(new SizeF(180f, 110f), buildLayoutViews(context, R.layout.aqua_command_widget_3x2));
            responsive.put(new SizeF(250f, 140f), buildLayoutViews(context, R.layout.aqua_command_widget_3x2));
            responsive.put(new SizeF(250f, 180f), buildLayoutViews(context, R.layout.aqua_command_widget_3x2));
            responsive.put(new SizeF(300f, 200f), buildLayoutViews(context, R.layout.aqua_command_widget_3x2));
            responsive.put(new SizeF(320f, 180f), buildLayoutViews(context, R.layout.aqua_command_widget_3x2));
            responsive.put(new SizeF(360f, 180f), buildLayoutViews(context, R.layout.aqua_command_widget_wide));
            responsive.put(new SizeF(180f, 260f), buildLayoutViews(context, R.layout.aqua_command_widget));
            responsive.put(new SizeF(250f, 390f), buildLayoutViews(context, R.layout.aqua_command_widget));
            return new RemoteViews(responsive);
        }
        return buildLayoutViews(context, layoutFor(manager, id));
    }

    private static void update(Context context, AppWidgetManager manager, int id) {
        RemoteViews views = buildViews(context, manager, id);
        int pending = FilingStore.pendingCount(context);
        manager.updateAppWidget(id, views);
        Bundle options = manager.getAppWidgetOptions(id);
        int width = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 0);
        int height = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0);
        int layout = layoutForSize(width, height);
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_READY id="
                + id
                + " pending="
                + pending
                + " size="
                + width
                + "x"
                + height
                + " layout="
                + layout
                + " layoutName="
                + layoutName(layout)
        );
    }

    static void showNeuralJolt(Context context, String mode) {
        Context applicationContext = context.getApplicationContext();
        long sequence = System.nanoTime();
        setNeuralState(applicationContext, mode, "outbound", OUTBOUND_MILLIS + RETURN_MILLIS, sequence);
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=" + mode + " phase=outbound"
        );
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> {
                if (!isCurrentSequence(applicationContext, sequence)) return;
                setNeuralState(applicationContext, mode, "return", RETURN_MILLIS, sequence);
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=" + mode + " phase=return"
                );
            },
            OUTBOUND_MILLIS
        );
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> clearNeuralState(applicationContext, sequence),
            OUTBOUND_MILLIS + RETURN_MILLIS + 60L
        );
    }

    static void showReceived(Context context, String mode) {
        Context applicationContext = context.getApplicationContext();
        long sequence = System.nanoTime();
        setNeuralState(applicationContext, mode, "received", FILED_MILLIS, sequence);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_HANDOFF_RECEIVED mode=" + mode);
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> clearNeuralState(applicationContext, sequence),
            FILED_MILLIS + 60L
        );
    }

    static void showAquaHasIt(Context context, String mode) {
        Context applicationContext = context.getApplicationContext();
        long sequence = System.nanoTime();
        setNeuralState(applicationContext, mode, "queued", FILED_MILLIS, sequence);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_HANDOFF_CONFIRMED mode=" + mode);
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> clearNeuralState(applicationContext, sequence),
            FILED_MILLIS + 60L
        );
    }

    static void showSavedLocally(Context context, String mode) {
        Context applicationContext = context.getApplicationContext();
        long sequence = System.nanoTime();
        setNeuralState(applicationContext, mode, "saved", FILED_MILLIS, sequence);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_HANDOFF_SAVED_LOCALLY mode=" + mode);
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> clearNeuralState(applicationContext, sequence),
            FILED_MILLIS + 60L
        );
    }

    static void showFiled(Context context) {
        Context applicationContext = context.getApplicationContext();
        long sequence = System.nanoTime();
        setNeuralState(applicationContext, "action", "confirmed", FILED_MILLIS, sequence);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_FILED_CONFIRMATION_RENDERED");
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> clearNeuralState(applicationContext, sequence),
            FILED_MILLIS + 60L
        );
    }

    private static String statusText(String phase) {
        if ("received".equals(phase)) return "RECEIVED";
        if ("queued".equals(phase)) return "AQUA HAS IT";
        if ("saved".equals(phase)) return "SAVED";
        if ("confirmed".equals(phase)) return "CONFIRMED";
        return "";
    }

    private static void setNeuralState(
        Context context,
        String mode,
        String phase,
        long duration,
        long sequence
    ) {
        context.getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .edit()
            .putString(JOLT_MODE, mode)
            .putString(JOLT_PHASE, phase)
            .putLong(JOLT_UNTIL, System.currentTimeMillis() + duration)
            .putLong(JOLT_SEQUENCE, sequence)
            .apply();
        updateAll(context);
    }

    private static boolean isCurrentSequence(Context context, long sequence) {
        return context.getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .getLong(JOLT_SEQUENCE, -1L) == sequence;
    }

    private static void clearNeuralState(Context context, long sequence) {
        if (!isCurrentSequence(context, sequence)) return;
        context.getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .edit()
            .remove(JOLT_MODE)
            .remove(JOLT_PHASE)
            .remove(JOLT_UNTIL)
            .remove(JOLT_SEQUENCE)
            .apply();
        updateAll(context);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_NEURAL_JOLT_SETTLED");
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        String receivedAction = intent == null ? "" : intent.getAction();
        if (
            Intent.ACTION_MY_PACKAGE_REPLACED.equals(receivedAction)
                || ACTION_PINNED.equals(receivedAction)
                || ACTION_REFRESH.equals(receivedAction)
        ) {
            updateAll(context);
            Log.i(
                "AquaCommandWidget",
                "AQUA_WIDGET_LIFECYCLE_REFRESH action=" + receivedAction
            );
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_ENABLED");
        updateAll(context);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) update(context, manager, id);
    }

    @Override
    public void onAppWidgetOptionsChanged(
        Context context,
        AppWidgetManager manager,
        int appWidgetId,
        Bundle newOptions
    ) {
        super.onAppWidgetOptionsChanged(context, manager, appWidgetId, newOptions);
        update(context, manager, appWidgetId);
        int minWidth = newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 0);
        int minHeight = newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0);
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_RESIZED id="
                + appWidgetId
                + " size="
                + minWidth
                + "x"
                + minHeight
                + " layout="
                + layoutForSize(minWidth, minHeight)
                + " layoutName="
                + layoutName(layoutForSize(minWidth, minHeight))
        );
    }

    @Override
    public void onRestored(Context context, int[] oldWidgetIds, int[] newWidgetIds) {
        updateAll(context);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_RESTORED count=" + newWidgetIds.length);
    }
}
