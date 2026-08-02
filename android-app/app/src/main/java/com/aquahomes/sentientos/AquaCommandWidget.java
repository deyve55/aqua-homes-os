package com.aquahomes.sentientos;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

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
    private static final String JOLT_UNTIL = "until";
    private static final long JOLT_VISIBLE_MILLIS = 1800L;

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

    private static int layoutFor(AppWidgetManager manager, int id) {
        Bundle options = manager.getAppWidgetOptions(id);
        int minWidth = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 250);
        int minHeight = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 156);
        if (minWidth > 0 && minWidth <= 180 && minHeight > 0 && minHeight <= 180) {
            return R.layout.aqua_command_widget_2x2;
        }
        return minHeight > 0 && minHeight < 138
            ? R.layout.aqua_command_widget_compact
            : R.layout.aqua_command_widget;
    }

    private static String visibleJoltMode(Context context) {
        long until = context
            .getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .getLong(JOLT_UNTIL, 0L);
        if (until <= System.currentTimeMillis()) return "";
        return context
            .getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .getString(JOLT_MODE, "");
    }

    private static int joltDrawable(String mode, boolean compact) {
        if (compact) {
            switch (mode) {
                case "home": return R.drawable.aqua_widget_jolt_compact_home;
                case "ask": return R.drawable.aqua_widget_jolt_compact_ask;
                case "video": return R.drawable.aqua_widget_jolt_compact_video;
                case "photo": return R.drawable.aqua_widget_jolt_compact_photo;
                case "file": return R.drawable.aqua_widget_jolt_compact_file;
                default: return 0;
            }
        }
        switch (mode) {
            case "home": return R.drawable.aqua_widget_jolt_home;
            case "ask": return R.drawable.aqua_widget_jolt_ask;
            case "video": return R.drawable.aqua_widget_jolt_video;
            case "photo": return R.drawable.aqua_widget_jolt_photo;
            case "file": return R.drawable.aqua_widget_jolt_file;
            default: return 0;
        }
    }

    private static void setNodeState(RemoteViews views, int viewId, boolean active) {
        views.setInt(
            viewId,
            "setBackgroundResource",
            active ? R.drawable.aqua_widget_node_active : R.drawable.aqua_widget_action
        );
    }

    private static RemoteViews buildViews(Context context, AppWidgetManager manager, int id) {
        int layout = layoutFor(manager, id);
        boolean compact = layout == R.layout.aqua_command_widget_compact;
        RemoteViews views = new RemoteViews(context.getPackageName(), layout);
        views.setTextViewText(
            R.id.widget_filed_today,
            String.valueOf(FilingStore.filedTodayCount(context))
        );
        String activeMode = visibleJoltMode(context);
        int activePath = joltDrawable(activeMode, compact);
        views.setViewVisibility(
            R.id.widget_active_path,
            activePath == 0 ? View.INVISIBLE : View.VISIBLE
        );
        if (activePath != 0) views.setImageViewResource(R.id.widget_active_path, activePath);
        setNodeState(views, R.id.widget_ask, "ask".equals(activeMode));
        setNodeState(views, R.id.widget_video, "video".equals(activeMode));
        setNodeState(views, R.id.widget_photo, "photo".equals(activeMode));
        setNodeState(views, R.id.widget_file, "file".equals(activeMode));
        views.setOnClickPendingIntent(R.id.widget_logo, openSentinel(context));
        views.setOnClickPendingIntent(R.id.widget_ask, action(context, "ask", 101));
        views.setOnClickPendingIntent(R.id.widget_video, action(context, "video", 102));
        views.setOnClickPendingIntent(R.id.widget_photo, action(context, "photo", 103));
        views.setOnClickPendingIntent(R.id.widget_file, action(context, "file", 104));
        return views;
    }

    private static void update(Context context, AppWidgetManager manager, int id) {
        RemoteViews views = buildViews(context, manager, id);
        int pending = FilingStore.pendingCount(context);
        manager.updateAppWidget(id, views);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_READY id=" + id + " pending=" + pending);
    }

    static void showNeuralJolt(Context context, String mode) {
        Context applicationContext = context.getApplicationContext();
        long until = System.currentTimeMillis() + JOLT_VISIBLE_MILLIS;
        applicationContext
            .getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
            .edit()
            .putString(JOLT_MODE, mode)
            .putLong(JOLT_UNTIL, until)
            .apply();
        updateAll(applicationContext);
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_NEURAL_JOLT_RENDERED mode=" + mode + " phase=outbound"
        );
        new Handler(Looper.getMainLooper()).postDelayed(
            () -> {
                long activeUntil = applicationContext
                    .getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
                    .getLong(JOLT_UNTIL, 0L);
                if (activeUntil <= System.currentTimeMillis()) {
                    applicationContext
                        .getSharedPreferences(JOLT_PREFERENCES, Context.MODE_PRIVATE)
                        .edit()
                        .remove(JOLT_MODE)
                        .remove(JOLT_UNTIL)
                        .apply();
                    updateAll(applicationContext);
                    Log.i("AquaCommandWidget", "AQUA_WIDGET_NEURAL_JOLT_SETTLED");
                }
            },
            JOLT_VISIBLE_MILLIS + 80L
        );
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
        android.os.Bundle newOptions
    ) {
        update(context, manager, appWidgetId);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_RESIZED id=" + appWidgetId);
    }

    @Override
    public void onRestored(Context context, int[] oldWidgetIds, int[] newWidgetIds) {
        updateAll(context);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_RESTORED count=" + newWidgetIds.length);
    }
}
