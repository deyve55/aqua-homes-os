package com.aquahomes.sentientos;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.speech.RecognizerIntent;
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
    private static final int AUDIO_PERMISSION = 204;
    private String mode;
    private File evidenceFile;
    private String itemId;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        mode = getIntent().getStringExtra(EXTRA_MODE);
        itemId = getIntent().getStringExtra(EXTRA_ITEM_ID);
        if ((mode == null || mode.isEmpty()) && getIntent().getData() != null) {
            mode = getIntent().getData().getHost();
        }
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

    private void captureVoice() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[] { Manifest.permission.RECORD_AUDIO }, AUDIO_PERMISSION);
            return;
        }
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

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] results) {
        super.onRequestPermissionsResult(requestCode, permissions, results);
        if (requestCode == AUDIO_PERMISSION && results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            captureVoice();
        } else {
            Toast.makeText(this, "Microphone permission is required for voice filing.", Toast.LENGTH_SHORT).show();
            finish();
        }
    }
}
