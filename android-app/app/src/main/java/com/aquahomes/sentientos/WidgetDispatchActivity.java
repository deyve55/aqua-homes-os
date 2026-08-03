package com.aquahomes.sentientos;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

public final class WidgetDispatchActivity extends Activity {
    private static final long NEURAL_JOLT_TRANSITION_MILLIS = 720L;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dispatchAfterJolt(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        mainHandler.removeCallbacksAndMessages(null);
        dispatchAfterJolt(intent);
    }

    private void dispatchAfterJolt(Intent source) {
        String mode = source == null
            ? ""
            : source.getStringExtra(AquaCommandWidget.EXTRA_DISPATCH_MODE);
        if (!isSupported(mode)) {
            Log.w("AquaCommandWidget", "AQUA_WIDGET_NEURAL_DISPATCH_REJECTED mode=" + mode);
            finish();
            return;
        }
        AquaCommandWidget.showNeuralJolt(this, mode);
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_NEURAL_JOLT mode=" + mode + " phase=outbound"
        );
        mainHandler.postDelayed(
            () -> {
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_WIDGET_NEURAL_JOLT mode=" + mode + " phase=arrived"
                );
                openDestination(mode);
            },
            NEURAL_JOLT_TRANSITION_MILLIS
        );
    }

    private static boolean isSupported(String mode) {
        return "home".equals(mode)
            || "action".equals(mode)
            || "video".equals(mode)
            || "photo".equals(mode)
            || "file".equals(mode);
    }

    private void openDestination(String mode) {
        Intent destination;
        if ("home".equals(mode)) {
            destination = new Intent(this, MainActivity.class)
                .setAction("com.aquasoftware.sentinel.action.OPEN")
                .setData(Uri.parse("aquasentinel://home"))
                .addFlags(
                    Intent.FLAG_ACTIVITY_NEW_TASK
                        | Intent.FLAG_ACTIVITY_CLEAR_TOP
                        | Intent.FLAG_ACTIVITY_SINGLE_TOP
                );
        } else {
            destination = new Intent(this, QuickCaptureActivity.class)
                .setAction("com.aquasoftware.sentinel.action." + mode.toUpperCase())
                .setData(Uri.parse("aquasentinel://" + mode))
                .putExtra(QuickCaptureActivity.EXTRA_MODE, mode)
                .addFlags(
                    Intent.FLAG_ACTIVITY_NEW_TASK
                        | Intent.FLAG_ACTIVITY_CLEAR_TOP
                        | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS
                );
        }
        startActivity(destination);
        overridePendingTransition(0, 0);
        finish();
    }
}
