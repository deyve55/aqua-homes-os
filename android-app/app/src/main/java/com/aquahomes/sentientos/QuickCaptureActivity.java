package com.aquahomes.sentientos;

import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.speech.RecognizerIntent;
import android.util.Log;
import android.view.Gravity;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;
import java.util.Locale;

public class QuickCaptureActivity extends Activity {
    public static final String EXTRA_MODE = "capture_mode";
    public static final String EXTRA_ITEM_ID = "filing_item_id";
    private static final int VOICE_REQUEST = 201;
    private static final int PHOTO_REQUEST = 202;
    private static final int VIDEO_REQUEST = 203;
    private static final String STATE_CAPTURE_LAUNCHED = "capture_launched";
    private String mode;
    private File evidenceFile;
    private String itemId;
    private boolean captureLaunched;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        mode = getIntent().getStringExtra(EXTRA_MODE);
        itemId = getIntent().getStringExtra(EXTRA_ITEM_ID);
        if ((mode == null || mode.isEmpty()) && getIntent().getData() != null) {
            mode = getIntent().getData().getHost();
        }
        captureLaunched = state != null && state.getBoolean(STATE_CAPTURE_LAUNCHED, false);
        showOpeningSurface();
        Log.i("AquaCommandWidget", "AQUA_WIDGET_ACTION_RECEIVED mode=" + mode);
        if (captureLaunched) return;
        captureLaunched = true;
        getWindow().getDecorView().post(this::routeCapture);
    }

    private void showOpeningSurface() {
        TextView status = new TextView(this);
        status.setGravity(Gravity.CENTER);
        status.setPadding(28, 28, 28, 28);
        status.setTextColor(Color.WHITE);
        status.setTextSize(17);
        status.setBackgroundColor(Color.rgb(1, 10, 15));
        if ("photo".equals(mode)) status.setText("Aqua is opening the camera…");
        else if ("video".equals(mode)) status.setText("Aqua is opening video capture…");
        else if ("ask".equals(mode)) status.setText("Aqua is opening Sentinel…");
        else status.setText("Aqua is ready to file your instruction…");
        setContentView(status);
    }

    private void routeCapture() {
        if ("ask".equals(mode)) {
            startActivity(
                new Intent(this, MainActivity.class)
                    .putExtra("start_voice", true)
                    .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP)
            );
            finish();
        } else if ("photo".equals(mode)) {
            captureMedia(false);
        } else if ("video".equals(mode)) {
            captureMedia(true);
        } else {
            captureVoice();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle state) {
        state.putBoolean(STATE_CAPTURE_LAUNCHED, captureLaunched);
        super.onSaveInstanceState(state);
    }

    private void captureVoice() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag())
            .putExtra(
                RecognizerIntent.EXTRA_PROMPT,
                "clarify".equals(mode) ? "Tell Aqua where this item belongs" : "Tell Aqua what to file"
            )
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        try {
            startActivityForResult(intent, VOICE_REQUEST);
        } catch (Exception error) {
            Toast.makeText(this, "Voice capture is not available.", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    private void captureMedia(boolean video) {
        try {
            File folder = new File(getFilesDir(), "filing-evidence");
            if (!folder.exists() && !folder.mkdirs()) throw new IllegalStateException("Evidence folder unavailable");
            evidenceFile = new File(folder, System.currentTimeMillis() + (video ? ".mp4" : ".jpg"));
            Uri uri = EvidenceProvider.uriFor(this, evidenceFile);
            Intent intent = new Intent(video ? MediaStore.ACTION_VIDEO_CAPTURE : MediaStore.ACTION_IMAGE_CAPTURE)
                .putExtra(MediaStore.EXTRA_OUTPUT, uri)
                .setClipData(ClipData.newRawUri("Aqua filing evidence", uri))
                .addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(intent, video ? VIDEO_REQUEST : PHOTO_REQUEST);
        } catch (Exception error) {
            Toast.makeText(this, "Camera capture is not available.", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != RESULT_OK) {
            if (evidenceFile != null && evidenceFile.exists()) evidenceFile.delete();
            finish();
            return;
        }
        if (requestCode == VOICE_REQUEST) {
            ArrayList<String> results = data == null
                ? null
                : data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (results == null || results.isEmpty()) {
                finish();
                return;
            }
            if ("clarify".equals(mode) && FilingStore.clarify(this, itemId, results.get(0))) {
                Toast.makeText(this, "Got it. Aqua updated that filing item.", Toast.LENGTH_SHORT).show();
            } else {
                FilingStore.enqueue(this, "voice", results.get(0), "");
                Toast.makeText(this, "Saved. Aqua added it to the filing cabinet.", Toast.LENGTH_SHORT).show();
            }
        } else {
            String type = requestCode == VIDEO_REQUEST ? "video" : "photo";
            FilingStore.enqueue(
                this,
                type,
                type.equals("video") ? "Quick video reference" : "Quick photo reference",
                evidenceFile == null ? "" : evidenceFile.getAbsolutePath()
            );
            Toast.makeText(this, "Saved. Aqua will ask only if a destination is unclear.", Toast.LENGTH_SHORT).show();
        }
        finish();
    }

}
