package com.aquahomes.sentientos;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;
import android.view.Gravity;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class QuickCaptureActivity extends Activity {
    public static final String EXTRA_MODE = "capture_mode";
    public static final String EXTRA_ITEM_ID = "filing_item_id";
    private static final int VOICE_REQUEST = 201;
    private static final int PHOTO_REQUEST = 202;
    private static final int VIDEO_REQUEST = 203;
    private static final int VOICE_PERMISSION_REQUEST = 204;
    private static final String STATE_CAPTURE_LAUNCHED = "capture_launched";
    private static final String STATE_EVIDENCE_PATH = "evidence_path";
    private String mode;
    private File evidenceFile;
    private String itemId;
    private boolean captureLaunched;
    private TextView status;
    private SpeechRecognizer speechRecognizer;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        readIntent(getIntent());
        captureLaunched = state != null && state.getBoolean(STATE_CAPTURE_LAUNCHED, false);
        String restoredPath = state == null ? "" : state.getString(STATE_EVIDENCE_PATH, "");
        if (!restoredPath.isEmpty()) evidenceFile = new File(restoredPath);
        showOpeningSurface();
        logActionReceived();
        if (captureLaunched) return;
        captureLaunched = true;
        getWindow().getDecorView().post(this::routeCapture);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        stopSpeechRecognition();
        evidenceFile = null;
        captureLaunched = true;
        readIntent(intent);
        showOpeningSurface();
        logActionReceived();
        getWindow().getDecorView().post(this::routeCapture);
    }

    private void readIntent(Intent intent) {
        mode = intent == null ? "" : intent.getStringExtra(EXTRA_MODE);
        itemId = intent == null ? "" : intent.getStringExtra(EXTRA_ITEM_ID);
        if ((mode == null || mode.isEmpty()) && intent != null && intent.getData() != null) {
            mode = intent.getData().getHost();
        }
        if (mode == null || mode.isEmpty()) mode = "voice";
    }

    private void logActionReceived() {
        Log.i("AquaCommandWidget", "AQUA_WIDGET_ACTION_RECEIVED mode=" + mode);
    }

    private void showOpeningSurface() {
        status = new TextView(this);
        status.setGravity(Gravity.CENTER);
        status.setPadding(28, 28, 28, 28);
        status.setTextColor(Color.WHITE);
        status.setTextSize(17);
        status.setBackgroundColor(Color.rgb(1, 10, 15));
        if ("photo".equals(mode)) status.setText("Aqua is opening the camera…");
        else if ("video".equals(mode)) status.setText("Aqua is opening video capture…");
        else if ("ask".equals(mode)) status.setText("Aqua is opening Sentinel…");
        else status.setText("Aqua is ready to capture your voice filing…");
        setContentView(status);
    }

    private void routeCapture() {
        if ("ask".equals(mode)) {
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=ask handler=MainActivity");
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
        if (evidenceFile != null) state.putString(STATE_EVIDENCE_PATH, evidenceFile.getAbsolutePath());
        super.onSaveInstanceState(state);
    }

    private void captureVoice() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            status.setText("Allow microphone access to capture your filing instruction.");
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=voice permission=requested");
            requestPermissions(
                new String[] { Manifest.permission.RECORD_AUDIO },
                VOICE_PERMISSION_REQUEST
            );
            return;
        }
        startSpeechRecognition();
    }

    private void startSpeechRecognition() {
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            captureVoiceWithSystemIntent();
            return;
        }
        stopSpeechRecognition();
        status.setText("Listening…\nTell Aqua what to file.");
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(new RecognitionListener() {
            @Override public void onReadyForSpeech(Bundle params) {
                Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=voice handler=SpeechRecognizer");
            }
            @Override public void onBeginningOfSpeech() { status.setText("Listening…"); }
            @Override public void onRmsChanged(float rmsdB) {}
            @Override public void onBufferReceived(byte[] buffer) {}
            @Override public void onEndOfSpeech() { status.setText("Aqua is saving your instruction…"); }
            @Override public void onError(int error) {
                Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=voice error=" + error);
                Toast.makeText(QuickCaptureActivity.this, "Aqua could not hear that. Please try again.", Toast.LENGTH_SHORT).show();
                finish();
            }
            @Override public void onResults(Bundle results) {
                completeVoice(results == null
                    ? null
                    : results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION));
            }
            @Override public void onPartialResults(Bundle partialResults) {
                ArrayList<String> partial = partialResults == null
                    ? null
                    : partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (partial != null && !partial.isEmpty()) status.setText("Heard: “" + partial.get(0) + "”");
            }
            @Override public void onEvent(int eventType, Bundle params) {}
        });
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag())
            .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        speechRecognizer.startListening(intent);
    }

    private void captureVoiceWithSystemIntent() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag())
            .putExtra(
                RecognizerIntent.EXTRA_PROMPT,
                "clarify".equals(mode) ? "Tell Aqua where this item belongs" : "Tell Aqua what to file"
            )
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        ResolveInfo handler = getPackageManager().resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);
        if (handler == null) {
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=voice reason=no-handler");
            Toast.makeText(this, "Voice-to-text is not available on this device.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=voice handler=" + handler.activityInfo.packageName);
        startActivityForResult(intent, VOICE_REQUEST);
    }

    private void captureMedia(boolean video) {
        String captureMode = video ? "video" : "photo";
        try {
            File folder = new File(getFilesDir(), "filing-evidence");
            if (!folder.exists() && !folder.mkdirs()) throw new IllegalStateException("Evidence folder unavailable");
            evidenceFile = new File(folder, System.currentTimeMillis() + (video ? ".mp4" : ".jpg"));
            Uri uri = EvidenceProvider.uriFor(this, evidenceFile);
            Intent intent = new Intent(video ? MediaStore.ACTION_VIDEO_CAPTURE : MediaStore.ACTION_IMAGE_CAPTURE)
                .putExtra(MediaStore.EXTRA_OUTPUT, uri);
            if (video) intent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY, 1);
            intent.setClipData(ClipData.newRawUri("Aqua filing evidence", uri));
            int grants = Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION;
            intent.addFlags(grants);

            List<ResolveInfo> handlers = getPackageManager().queryIntentActivities(
                intent,
                PackageManager.MATCH_DEFAULT_ONLY
            );
            if (handlers.isEmpty()) throw new IllegalStateException("No camera handler");
            for (ResolveInfo handler : handlers) {
                grantUriPermission(handler.activityInfo.packageName, uri, grants);
            }
            ResolveInfo preferred = getPackageManager().resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);
            String handlerName = preferred == null ? "chooser" : preferred.activityInfo.packageName;
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=" + captureMode + " handler=" + handlerName);
            startActivityForResult(intent, video ? VIDEO_REQUEST : PHOTO_REQUEST);
        } catch (Exception error) {
            Log.e("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=" + captureMode, error);
            if (evidenceFile != null && evidenceFile.exists()) evidenceFile.delete();
            Toast.makeText(this, video ? "Video capture is not available." : "Photo capture is not available.", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] results) {
        super.onRequestPermissionsResult(requestCode, permissions, results);
        if (requestCode != VOICE_PERMISSION_REQUEST) return;
        if (results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            startSpeechRecognition();
        } else {
            captureVoiceWithSystemIntent();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == VOICE_REQUEST) {
            if (resultCode != RESULT_OK) {
                finish();
                return;
            }
            completeVoice(data == null
                ? null
                : data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS));
            return;
        }

        boolean mediaRequest = requestCode == PHOTO_REQUEST || requestCode == VIDEO_REQUEST;
        if (mediaRequest && !hasEvidenceBytes()) {
            recoverReturnedMedia(requestCode, data);
        }
        boolean cameraWroteEvidence = mediaRequest
            && hasEvidenceBytes();
        if (!mediaRequest || (resultCode != RESULT_OK && !cameraWroteEvidence)) {
            deleteEmptyEvidence();
            finish();
            return;
        }
        saveMediaCapture(requestCode == VIDEO_REQUEST ? "video" : "photo");
    }

    private boolean hasEvidenceBytes() {
        return evidenceFile != null && evidenceFile.isFile() && evidenceFile.length() > 0;
    }

    private void recoverReturnedMedia(int requestCode, Intent data) {
        if (evidenceFile == null || data == null) return;
        try {
            Uri returnedUri = data.getData();
            if (returnedUri != null) {
                try (
                    InputStream input = getContentResolver().openInputStream(returnedUri);
                    OutputStream output = new FileOutputStream(evidenceFile)
                ) {
                    if (input == null) return;
                    byte[] buffer = new byte[16 * 1024];
                    int read;
                    while ((read = input.read(buffer)) != -1) output.write(buffer, 0, read);
                }
                Log.i("AquaCommandWidget", "AQUA_CAPTURE_RECOVERED source=returned-uri");
                return;
            }
            if (requestCode != PHOTO_REQUEST || data.getExtras() == null) return;
            Object thumbnail = data.getExtras().get("data");
            if (!(thumbnail instanceof Bitmap)) return;
            try (OutputStream output = new FileOutputStream(evidenceFile)) {
                if (!((Bitmap) thumbnail).compress(Bitmap.CompressFormat.JPEG, 95, output)) {
                    throw new IllegalStateException("Photo thumbnail compression failed");
                }
            }
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_RECOVERED source=returned-thumbnail");
        } catch (Exception error) {
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_RECOVERY_FAILED", error);
            deleteEmptyEvidence();
        }
    }

    private void completeVoice(ArrayList<String> results) {
        String text = results == null || results.isEmpty() ? "" : results.get(0).trim();
        if (text.isEmpty()) {
            Toast.makeText(this, "No voice text was captured.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        boolean saved;
        if ("clarify".equals(mode)) {
            saved = FilingStore.clarify(this, itemId, text);
        } else {
            JSONObject item = FilingStore.enqueue(this, "voice", text, "");
            saved = item.length() > 0;
        }
        if (saved) {
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_SAVED type=voice");
            Toast.makeText(this, "Saved. Aqua added the voice text to the filing cabinet.", Toast.LENGTH_SHORT).show();
            openFilingCabinet();
        } else {
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=voice reason=store");
            Toast.makeText(this, "Aqua could not save that voice text.", Toast.LENGTH_SHORT).show();
        }
        if (!saved) finish();
    }

    private void saveMediaCapture(String type) {
        if (evidenceFile == null || !evidenceFile.isFile() || evidenceFile.length() == 0) {
            deleteEmptyEvidence();
            Toast.makeText(this, "No " + type + " was captured.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        JSONObject item = FilingStore.enqueue(
            this,
            type,
            type.equals("video") ? "Quick video reference" : "Quick photo reference",
            evidenceFile.getAbsolutePath()
        );
        revokeEvidenceAccess();
        if (item.length() > 0) {
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_SAVED type=" + type + " bytes=" + evidenceFile.length());
            Toast.makeText(this, "Saved. Aqua protected the " + type + " in the filing inbox.", Toast.LENGTH_SHORT).show();
            openFilingCabinet();
        } else {
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=" + type + " reason=store");
            evidenceFile.delete();
            Toast.makeText(this, "Aqua could not save that " + type + ".", Toast.LENGTH_SHORT).show();
        }
        if (item.length() == 0) finish();
    }

    private void openFilingCabinet() {
        startActivity(
            new Intent(this, MainActivity.class)
                .putExtra("open_filing", true)
                .addFlags(
                    Intent.FLAG_ACTIVITY_NEW_TASK
                        | Intent.FLAG_ACTIVITY_CLEAR_TOP
                        | Intent.FLAG_ACTIVITY_SINGLE_TOP
                )
        );
        finish();
    }

    private void revokeEvidenceAccess() {
        if (evidenceFile == null) return;
        revokeUriPermission(
            EvidenceProvider.uriFor(this, evidenceFile),
            Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION
        );
    }

    private void deleteEmptyEvidence() {
        revokeEvidenceAccess();
        if (evidenceFile != null && evidenceFile.exists() && evidenceFile.length() == 0) {
            evidenceFile.delete();
        }
    }

    private void stopSpeechRecognition() {
        if (speechRecognizer == null) return;
        speechRecognizer.cancel();
        speechRecognizer.destroy();
        speechRecognizer = null;
    }

    @Override
    protected void onDestroy() {
        stopSpeechRecognition();
        super.onDestroy();
    }
}
