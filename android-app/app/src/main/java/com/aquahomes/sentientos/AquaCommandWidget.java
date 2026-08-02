package com.aquahomes.sentientos;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.RemoteViews;

public class AquaCommandWidget extends AppWidgetProvider {
    static final String ACTION_PINNED =
        "com.aquasoftware.sentinel.action.WIDGET_PINNED";
    static final String ACTION_REFRESH =
        "com.aquasoftware.sentinel.action.WIDGET_REFRESH";

    static void updateAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName component = new ComponentName(context, AquaCommandWidget.class);
        int[] ids = manager.getAppWidgetIds(component);
        for (int id : ids) update(context, manager, id);
    }

    private static PendingIntent action(Context context, String mode, int requestCode) {
        Intent intent = new Intent(context, QuickCaptureActivity.class)
            .setAction("com.aquasoftware.sentinel.action." + mode.toUpperCase())
            .setPackage(context.getPackageName())
            .setData(Uri.parse("aquasentinel://" + mode))
            .putExtra(QuickCaptureActivity.EXTRA_MODE, mode)
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
        Intent intent = new Intent(context, MainActivity.class)
            .setAction("com.aquasoftware.sentinel.action.OPEN")
            .setData(Uri.parse("aquasentinel://home"))
            .addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK
                    | Intent.FLAG_ACTIVITY_CLEAR_TOP
                    | Intent.FLAG_ACTIVITY_SINGLE_TOP
            );
        return PendingIntent.getActivity(
            context,
            100,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    static int installedCount(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName component = new ComponentName(context, AquaCommandWidget.class);
        return manager.getAppWidgetIds(component).length;
    }

    private static RemoteViews buildViews(Context context) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.aqua_command_widget);
        int pending = FilingStore.pendingCount(context);
        views.setTextViewText(R.id.widget_pending, pending == 0 ? "READY" : pending + " PENDING");
        views.setOnClickPendingIntent(R.id.widget_logo, openSentinel(context));
        views.setOnClickPendingIntent(R.id.widget_brand, openSentinel(context));
        views.setOnClickPendingIntent(R.id.widget_ask, action(context, "ask", 101));
        views.setOnClickPendingIntent(R.id.widget_video, action(context, "video", 102));
        views.setOnClickPendingIntent(R.id.widget_photo, action(context, "photo", 103));
        views.setOnClickPendingIntent(R.id.widget_file, action(context, "file", 104));
        return views;
    }

    private static void update(Context context, AppWidgetManager manager, int id) {
        RemoteViews views = buildViews(context);
        int pending = FilingStore.pendingCount(context);
        manager.updateAppWidget(id, views);
        Log.i("AquaCommandWidget", "AQUA_WIDGET_READY id=" + id + " pending=" + pending);
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
