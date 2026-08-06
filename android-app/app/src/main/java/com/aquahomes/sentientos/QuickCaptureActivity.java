package com.aquahomes.sentientos;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Rect;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
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
import java.util.UUID;

public class QuickCaptureActivity extends Activity {
    public static final String EXTRA_MODE = "capture_mode";
    public static final String EXTRA_ITEM_ID = "filing_item_id";
    public static final String EXTRA_COMMAND_TEXT = "widget_command_text";
    public static final String EXTRA_FILING_TEXT = "widget_filing_text";
    private static final int VOICE_REQUEST = 201;
    private static final int PHOTO_REQUEST = 202;
    private static final int VIDEO_REQUEST = 203;
    private static final int VOICE_PERMISSION_REQUEST = 204;
    private static final int ASK_VOICE_REQUEST = 205;
    private static final int CALENDAR_PERMISSION_REQUEST = 206;
    private static final String STATE_CAPTURE_LAUNCHED = "capture_launched";
    private static final String STATE_EVIDENCE_PATH = "evidence_path";
    private static final String STATE_COMMAND_TEXT = "command_text";
    private static final String STATE_PENDING_CALENDAR_COMMAND = "pending_calendar_command";
    private String mode;
    private String requestedMode;
    private File evidenceFile;
    private String itemId;
    private String filingText;
    private String commandSeed;
    private boolean captureLaunched;
    private TextView status;
    private EditText commandInput;
    private boolean recognizingCommand;
    private SpeechRecognizer speechRecognizer;
    private String pendingCalendarCommand = "";
    private final Handler captureHandler = new Handler(Looper.getMainLooper());
    private boolean recognitionCompleted;
    private boolean speechStarted;
    private static final long SPEECH_START_TIMEOUT_MILLIS = 45_000L;
    private static final long SPEECH_ACTIVE_TIMEOUT_MILLIS = 120_000L;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        readIntent(getIntent());
        captureLaunched = state != null && state.getBoolean(STATE_CAPTURE_LAUNCHED, false);
        String restoredPath = state == null ? "" : state.getString(STATE_EVIDENCE_PATH, "");
        if (!restoredPath.isEmpty()) evidenceFile = new File(restoredPath);
        pendingCalendarCommand = state == null
            ? ""
            : state.getString(STATE_PENDING_CALENDAR_COMMAND, "");
        showOpeningSurface();
        logActionReceived();
        if (captureLaunched) {
            if ("ask".equals(mode)) {
                showCommandSurface();
                String restoredCommand = state.getString(STATE_COMMAND_TEXT, "");
                if (commandInput != null) commandInput.setText(restoredCommand);
            }
            return;
        }
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
        requestedMode = intent == null ? "" : intent.getStringExtra(EXTRA_MODE);
        itemId = intent == null ? "" : intent.getStringExtra(EXTRA_ITEM_ID);
        filingText = intent == null ? "" : intent.getStringExtra(EXTRA_FILING_TEXT);
        if ((requestedMode == null || requestedMode.isEmpty()) && intent != null && intent.getData() != null) {
            requestedMode = intent.getData().getHost();
        }
        if (requestedMode == null || requestedMode.isEmpty()) requestedMode = "file";
        mode = "file".equals(requestedMode) ? "voice" : requestedMode;
        if (filingText == null) filingText = "";
        commandSeed = intent == null ? "" : intent.getStringExtra(EXTRA_COMMAND_TEXT);
        if (commandSeed == null) commandSeed = "";
        if (BuildConfig.ECOSYSTEM_PRESENTATION_MODE) {
            android.content.SharedPreferences probe = getSharedPreferences(
                "aqua_widget_contract_probe",
                MODE_PRIVATE
            );
            if (requestedMode.equals(probe.getString("mode", ""))) {
                commandSeed = probe.getString("command", "");
                if ("file".equals(requestedMode) && filingText.isEmpty()) {
                    filingText = probe.getString("filing", "");
                }
                probe.edit().clear().apply();
            }
        }
    }

    private void logActionReceived() {
        Log.i("AquaCommandWidget", "AQUA_WIDGET_ACTION_RECEIVED mode=" + requestedMode);
    }

    private void showOpeningSurface() {
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
        getWindow().setDimAmount(0f);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        FrameLayout surface = new FrameLayout(this);
        surface.setBackgroundColor(Color.TRANSPARENT);
        status = new TextView(this);
        status.setGravity(Gravity.CENTER);
        status.setPadding(30, 18, 30, 18);
        status.setTextColor(Color.WHITE);
        status.setTextSize(14);
        status.setElevation(12f);
        GradientDrawable statusBackground = new GradientDrawable();
        statusBackground.setColor(Color.argb(236, 1, 13, 18));
        statusBackground.setStroke(2, Color.rgb(65, 224, 247));
        statusBackground.setCornerRadius(48f);
        status.setBackground(statusBackground);
        if ("receipt".equals(mode)) status.setText("Aqua is opening the receipt camera…");
        else if ("photo".equals(mode)) status.setText("Aqua is opening the camera…");
        else if ("video".equals(mode)) status.setText("Aqua is opening video capture…");
        else if ("action".equals(mode)) status.setText("Aqua Action is listening…");
        else if ("ask".equals(mode)) status.setText("Aqua is ready for your message…");
        else status.setText("Aqua is ready to capture your voice filing…");
        FrameLayout.LayoutParams statusLayout = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT,
            Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
        );
        statusLayout.setMargins(24, 24, 24, 86);
        surface.addView(status, statusLayout);
        setContentView(surface);
    }

    private void routeCapture() {
        if ("ask".equals(mode)) {
            showCommandSurface();
        } else if ("action".equals(mode)) {
            // A real launcher Action tap must always arm voice capture. Earlier
            // test builds injected a presentation sentence here, which made the
            // widget claim RECEIVED without ever opening the microphone.
            captureRapidAction();
        } else if ("receipt".equals(mode) || "photo".equals(mode)) {
            captureMedia(false);
        } else if ("video".equals(mode)) {
            captureMedia(true);
        } else if (
            BuildConfig.ECOSYSTEM_PRESENTATION_MODE
                && !filingText.trim().isEmpty()
        ) {
            Log.i(
                "AquaCommandWidget",
                "AQUA_CAPTURE_ROUTE mode=voice handler=PresentationContract"
            );
            ArrayList<String> seeded = new ArrayList<>();
            seeded.add(filingText.trim());
            completeVoice(seeded);
        } else {
            captureVoice();
        }
    }

    private void showCommandSurface() {
        setContentView(R.layout.aqua_quick_command);
        status = findViewById(R.id.widget_command_status);
        commandInput = findViewById(R.id.widget_command_input);
        Button speak = findViewById(R.id.widget_command_speak);
        Button send = findViewById(R.id.widget_command_send);
        String initialCommand = getIntent() == null
            ? ""
            : getIntent().getStringExtra(EXTRA_COMMAND_TEXT);
        if ((initialCommand == null || initialCommand.trim().isEmpty()) && !commandSeed.isEmpty()) {
            initialCommand = commandSeed;
        }
        if (initialCommand != null && !initialCommand.trim().isEmpty()) {
            commandInput.setText(initialCommand);
            commandInput.setSelection(commandInput.getText().length());
        }

        Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=ask handler=QuickCommandComposer");
        speak.setOnClickListener(view -> captureCommandVoice());
        send.setOnTouchListener((view, event) -> {
            if (event.getAction() == MotionEvent.ACTION_UP) {
                Log.i("AquaCommandWidget", "AQUA_WIDGET_SEND_TOUCH action=up");
            }
            return false;
        });
        send.setOnClickListener(view -> submitCommand(commandInput.getText().toString()));
        commandInput.setOnEditorActionListener((view, actionId, event) -> {
            submitCommand(commandInput.getText().toString());
            return true;
        });
        commandInput.setOnKeyListener((view, keyCode, event) -> {
            if (
                keyCode == KeyEvent.KEYCODE_ENTER
                    && event.getAction() == KeyEvent.ACTION_UP
                    && !event.isShiftPressed()
            ) {
                submitCommand(commandInput.getText().toString());
                return true;
            }
            return false;
        });
        commandInput.requestFocus();
        commandInput.postDelayed(() -> {
            InputMethodManager keyboard = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
            if (keyboard != null) keyboard.showSoftInput(commandInput, InputMethodManager.SHOW_IMPLICIT);
        }, 180);
        send.postDelayed(() -> logCommandComposerBounds(send), 900);
    }

    private void logCommandComposerBounds(Button send) {
        Rect inputBounds = new Rect();
        Rect sendBounds = new Rect();
        if (
            commandInput == null
                || !commandInput.getGlobalVisibleRect(inputBounds)
                || !send.getGlobalVisibleRect(sendBounds)
        ) {
            Log.w("AquaCommandWidget", "AQUA_WIDGET_COMPOSER_BOUNDS_UNAVAILABLE");
            return;
        }
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_COMPOSER_READY input="
                + inputBounds.left
                + ","
                + inputBounds.top
                + ","
                + inputBounds.right
                + ","
                + inputBounds.bottom
                + " send="
                + sendBounds.left
                + ","
                + sendBounds.top
                + ","
                + sendBounds.right
                + ","
                + sendBounds.bottom
                + " characters="
                + commandInput.getText().length()
        );
    }

    private void captureCommandVoice() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            status.setText("Allow microphone access, or type your message below.");
            requestPermissions(
                new String[] { Manifest.permission.RECORD_AUDIO },
                VOICE_PERMISSION_REQUEST
            );
            return;
        }
        startSpeechRecognition(true);
    }

    private void captureRapidAction() {
        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            status.setText("Allow microphone access for Aqua Action.");
            requestPermissions(
                new String[] { Manifest.permission.RECORD_AUDIO },
                VOICE_PERMISSION_REQUEST
            );
            return;
        }
        startSpeechRecognition(true);
    }

    private void submitCommand(String rawText) {
        String text = rawText == null ? "" : rawText.trim();
        if (text.isEmpty()) {
            status.setText("Type a message or tap Speak first.");
            return;
        }
        if (CalendarQuickAction.parse(text) != null) {
            submitCalendarCommand(text);
            return;
        }
        submitAssistantHandoff("action", text, "", true);
    }

    private boolean submitAssistantHandoff(
        String captureType,
        String text,
        String evidencePath,
        boolean removeTask
    ) {
        JSONObject receipt;
        try {
            receipt = FilingStore.enqueue(this, captureType, text, evidencePath);
        } catch (RuntimeException error) {
            Log.e("AquaCommandWidget", "AQUA_WIDGET_HANDOFF_SAVE_FAILED", error);
            Toast.makeText(this, "Aqua could not preserve that handoff. Please try again.", Toast.LENGTH_SHORT).show();
            if (removeTask) finishAndRemoveTask();
            else finish();
            return false;
        }
        if (receipt.length() == 0) {
            status.setText("Aqua could not preserve that handoff.");
            return false;
        }
        return dispatchAssistantHandoff(receipt, captureType, text, evidencePath, removeTask);
    }

    private boolean dispatchAssistantHandoff(
        JSONObject receipt,
        String captureType,
        String text,
        String evidencePath,
        boolean removeTask
    ) {
        String messageId = UUID.randomUUID().toString();
        String itemId = receipt.optString("id", "");
        String destination = receipt.optString("destination", "Aqua Executive Desk · Intake");
        Log.i(
            "AquaCommandWidget",
            "AQUA_WIDGET_HANDOFF_RECEIVED id=" + itemId
                + " message=" + messageId
                + " type=" + captureType
                + " characters=" + text.length()
        );
        AquaCommandWidget.showReceived(this, widgetMode(captureType));
        boolean dispatchStarted = WidgetMessageService.enqueue(
            this,
            text,
            messageId,
            itemId,
            captureType,
            destination,
            evidencePath
        );
        if (!dispatchStarted) {
            Log.w(
                "AquaCommandWidget",
                "AQUA_WIDGET_HANDOFF_SAVED_LOCALLY id=" + itemId + " reason=service-start"
            );
            FilingStore.markHandoffResult(
                this,
                itemId,
                false,
                "",
                "Aqua's background handoff could not start."
            );
            AquaCommandWidget.showSavedLocally(this, widgetMode(captureType));
            Toast.makeText(this, "Received securely on this phone.", Toast.LENGTH_SHORT).show();
        } else {
            Log.i(
                "AquaCommandWidget",
                "AQUA_WIDGET_HANDOFF_BACKGROUND_DISPATCHED id=" + itemId
            );
            Toast.makeText(this, "Received. Aqua is handling it.", Toast.LENGTH_SHORT).show();
        }
        if (removeTask) finishAndRemoveTask();
        else finish();
        return true;
    }

    private static String widgetMode(String captureType) {
        if ("photo".equals(captureType) || "receipt".equals(captureType)) return "photo";
        if ("video".equals(captureType)) return "video";
        if ("voice".equals(captureType)) return "file";
        return "action";
    }

    private void submitCalendarCommand(String text) {
        CalendarQuickAction.Parsed action = CalendarQuickAction.parse(text);
        if (action == null) {
            status.setText("Aqua needs a clear date and time, such as ‘5 o’clock tomorrow.’");
            Toast.makeText(this, "Add a date and time so Aqua can schedule it.", Toast.LENGTH_SHORT).show();
            return;
        }
        boolean canRead = checkSelfPermission(Manifest.permission.READ_CALENDAR)
            == PackageManager.PERMISSION_GRANTED;
        boolean canWrite = checkSelfPermission(Manifest.permission.WRITE_CALENDAR)
            == PackageManager.PERMISSION_GRANTED;
        if (!canRead || !canWrite) {
            pendingCalendarCommand = text;
            status.setText("Allow calendar access once. Aqua will create and file this meeting.");
            requestPermissions(
                new String[] {
                    Manifest.permission.READ_CALENDAR,
                    Manifest.permission.WRITE_CALENDAR,
                },
                CALENDAR_PERMISSION_REQUEST
            );
            return;
        }
        CalendarQuickAction.Result result = CalendarQuickAction.execute(this, action);
        JSONObject receipt = FilingStore.enqueueCalendarReceipt(this, action, result);
        if (receipt.length() == 0) {
            status.setText("Aqua could not file the calendar receipt.");
            return;
        }
        if (!result.success) {
            Log.w("AquaCommandWidget", "AQUA_CALENDAR_ACTION_NEEDS_ATTENTION reason=" + result.error);
            Toast.makeText(this, result.error, Toast.LENGTH_SHORT).show();
            finishAndRemoveTask();
            return;
        }
        Log.i(
            "AquaCommandWidget",
            "AQUA_CALENDAR_ACTION_CONFIRMED event=" + result.eventId + " duplicate=" + result.duplicate
        );
        AquaCommandWidget.showFiled(this);
        finishAndRemoveTask();
    }

    @Override
    protected void onSaveInstanceState(Bundle state) {
        state.putBoolean(STATE_CAPTURE_LAUNCHED, captureLaunched);
        if (evidenceFile != null) state.putString(STATE_EVIDENCE_PATH, evidenceFile.getAbsolutePath());
        if (commandInput != null) state.putString(STATE_COMMAND_TEXT, commandInput.getText().toString());
        state.putString(STATE_PENDING_CALENDAR_COMMAND, pendingCalendarCommand);
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
        startSpeechRecognition(false);
    }

    private void startSpeechRecognition(boolean commandMode) {
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            if (commandMode) captureCommandVoiceWithSystemIntent();
            else captureVoiceWithSystemIntent();
            return;
        }
        stopSpeechRecognition();
        recognitionCompleted = false;
        speechStarted = false;
        recognizingCommand = commandMode;
        status.setText(commandMode ? "Listening… Tell Aqua your message." : "Listening…\nTell Aqua what to file.");
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(new RecognitionListener() {
            @Override public void onReadyForSpeech(Bundle params) {
                Log.i(
                    "AquaCommandWidget",
                    "AQUA_CAPTURE_ROUTE mode=" + recognitionRoute() + " handler=SpeechRecognizer"
                );
            }
            @Override public void onBeginningOfSpeech() {
                speechStarted = true;
                setStatusSafely("Listening… Take your time.");
                scheduleSpeechTimeout(SPEECH_ACTIVE_TIMEOUT_MILLIS);
            }
            @Override public void onRmsChanged(float rmsdB) {}
            @Override public void onBufferReceived(byte[] buffer) {}
            @Override public void onEndOfSpeech() {
                if (speechStarted) playCaptureCompleteTone();
                setStatusSafely("Aqua is saving your instruction…");
            }
            @Override public void onError(int error) {
                if (!completeRecognitionOnce()) return;
                String failedMode = recognitionRoute();
                Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=" + failedMode + " error=" + error);
                if ("action".equals(requestedMode)) {
                    recognizingCommand = false;
                    Toast.makeText(QuickCaptureActivity.this, "Aqua could not hear that action. Please try again.", Toast.LENGTH_SHORT).show();
                    finishAndRemoveTask();
                } else if (recognizingCommand) {
                    status.setText("Aqua could not hear that. Type your message or try Speak again.");
                    recognizingCommand = false;
                } else {
                    Toast.makeText(QuickCaptureActivity.this, "Aqua could not hear that. Please try again.", Toast.LENGTH_SHORT).show();
                    finish();
                }
            }
            @Override public void onResults(Bundle results) {
                if (!completeRecognitionOnce()) return;
                ArrayList<String> matches = results == null
                    ? null
                    : results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (recognizingCommand) completeCommandVoice(matches);
                else completeVoice(matches);
            }
            @Override public void onPartialResults(Bundle partialResults) {
                ArrayList<String> partial = partialResults == null
                    ? null
                    : partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                if (!recognitionCompleted && partial != null && !partial.isEmpty()) {
                    setStatusSafely("Heard: “" + partial.get(0) + "”");
                    if (recognizingCommand && commandInput != null) commandInput.setText(partial.get(0));
                }
            }
            @Override public void onEvent(int eventType, Bundle params) {}
        });
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag())
            .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
            .putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 1_200L)
            .putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 2_200L)
            .putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 3_200L);
        speechRecognizer.startListening(intent);
        Log.i(
            "AquaCommandWidget",
            "AQUA_CAPTURE_MIC_ARMED mode=" + recognitionRoute() + " handler=SpeechRecognizer"
        );
        scheduleSpeechTimeout(SPEECH_START_TIMEOUT_MILLIS);
    }

    private void scheduleSpeechTimeout(long delayMillis) {
        captureHandler.removeCallbacksAndMessages(null);
        captureHandler.postDelayed(() -> {
            if (!completeRecognitionOnce()) return;
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=" + recognitionRoute() + " reason=timeout");
            stopSpeechRecognition();
            if ("action".equals(requestedMode)) {
                Toast.makeText(this, "Aqua Action timed out. Tap once to try again.", Toast.LENGTH_SHORT).show();
                finishAndRemoveTask();
            } else {
                Toast.makeText(this, "Voice capture timed out. Please try again.", Toast.LENGTH_SHORT).show();
                finish();
            }
        }, delayMillis);
    }

    private void playCaptureCompleteTone() {
        try {
            ToneGenerator tone = new ToneGenerator(AudioManager.STREAM_NOTIFICATION, 38);
            tone.startTone(ToneGenerator.TONE_PROP_BEEP2, 110);
            new Handler(Looper.getMainLooper()).postDelayed(tone::release, 180L);
        } catch (RuntimeException ignored) {}
    }

    private boolean completeRecognitionOnce() {
        if (recognitionCompleted || isFinishing() || isDestroyed()) return false;
        recognitionCompleted = true;
        captureHandler.removeCallbacksAndMessages(null);
        return true;
    }

    private void setStatusSafely(String text) {
        if (status == null || isFinishing() || isDestroyed()) return;
        status.setText(text);
    }

    private String recognitionRoute() {
        if ("action".equals(requestedMode)) return "action";
        return recognizingCommand ? "ask-voice" : "voice";
    }

    private void completeCommandVoice(ArrayList<String> results) {
        recognizingCommand = false;
        String text = results == null || results.isEmpty() ? "" : results.get(0).trim();
        if (text.isEmpty()) {
            if ("action".equals(requestedMode)) {
                Toast.makeText(this, "No Aqua Action was captured.", Toast.LENGTH_SHORT).show();
                finishAndRemoveTask();
            } else {
                status.setText("No message was captured. Type it or try Speak again.");
            }
            return;
        }
        if (commandInput != null) commandInput.setText(text);
        submitCommand(text);
    }

    private void captureCommandVoiceWithSystemIntent() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault().toLanguageTag())
            .putExtra(
                RecognizerIntent.EXTRA_PROMPT,
                "action".equals(requestedMode) ? "Tell Aqua your quick action" : "Tell Aqua your message"
            )
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
        ResolveInfo handler = getPackageManager().resolveActivity(intent, PackageManager.MATCH_DEFAULT_ONLY);
        if (handler == null) {
            if ("action".equals(requestedMode)) {
                Toast.makeText(this, "Voice-to-text is unavailable for Aqua Action.", Toast.LENGTH_SHORT).show();
                finishAndRemoveTask();
            } else {
                status.setText("Voice-to-text is unavailable. Type your message below.");
            }
            return;
        }
        Log.i("AquaCommandWidget", "AQUA_CAPTURE_ROUTE mode=" + recognitionRoute() + " handler=" + handler.activityInfo.packageName);
        startActivityForResult(intent, ASK_VOICE_REQUEST);
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
        String captureMode = video ? "video" : ("receipt".equals(mode) ? "receipt" : "photo");
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
        if (requestCode == CALENDAR_PERMISSION_REQUEST) {
            boolean granted = results.length >= 2;
            for (int result : results) granted = granted && result == PackageManager.PERMISSION_GRANTED;
            String command = pendingCalendarCommand;
            pendingCalendarCommand = "";
            if (granted && !command.isEmpty()) {
                submitCalendarCommand(command);
            } else {
                CalendarQuickAction.Parsed action = CalendarQuickAction.parse(command);
                CalendarQuickAction.Result failure = CalendarQuickAction.Result.failed(
                    "Calendar permission was not granted."
                );
                if (action != null) FilingStore.enqueueCalendarReceipt(this, action, failure);
                Toast.makeText(this, "Calendar access is required to schedule and confirm that meeting.", Toast.LENGTH_SHORT).show();
                finishAndRemoveTask();
            }
            return;
        }
        if (requestCode != VOICE_PERMISSION_REQUEST) return;
        if (results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) {
            if ("ask".equals(mode) || "action".equals(mode)) startSpeechRecognition(true);
            else startSpeechRecognition(false);
        } else {
            if ("ask".equals(mode)) {
                status.setText("Microphone access is off. Type your message below.");
            } else if ("action".equals(mode)) {
                captureCommandVoiceWithSystemIntent();
            } else {
                captureVoiceWithSystemIntent();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == ASK_VOICE_REQUEST) {
            if (resultCode != RESULT_OK) {
                if ("action".equals(requestedMode)) {
                    finishAndRemoveTask();
                } else {
                    status.setText("Voice capture was canceled. Type your message or try again.");
                }
                return;
            }
            completeCommandVoice(data == null
                ? null
                : data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS));
            return;
        }
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
        saveMediaCapture(
            requestCode == VIDEO_REQUEST ? "video" : ("receipt".equals(mode) ? "receipt" : "photo")
        );
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
        if ("clarify".equals(mode)) {
            boolean clarified = FilingStore.clarify(this, itemId, text);
            if (clarified) {
                Log.i("AquaCommandWidget", "AQUA_CAPTURE_SAVED type=clarification");
                Toast.makeText(this, "Received. Aqua filed it securely on this phone.", Toast.LENGTH_SHORT).show();
                finishAndRemoveTask();
                return;
            }
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=voice reason=store");
            Toast.makeText(this, "Aqua could not save that direction.", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        if (CalendarQuickAction.parse(text) != null) {
            submitCalendarCommand(text);
            return;
        }
        if (submitAssistantHandoff("voice", text, "", true)) {
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_SAVED type=voice");
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_BACKGROUND_COMPLETE type=voice");
        }
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
            type.equals("video")
                ? "Quick video reference"
                : type.equals("receipt")
                    ? "Receipt captured from the Aqua widget"
                    : "Quick photo reference",
            evidenceFile.getAbsolutePath()
        );
        revokeEvidenceAccess();
        if (item.length() > 0) {
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_SAVED type=" + type + " bytes=" + evidenceFile.length());
            String handoff = "A " + type + " was dropped on Aqua's executive desk from the Command Center. "
                + "The protected evidence is retained on this phone under filing item "
                + item.optString("id", "unknown") + ".";
            dispatchAssistantHandoff(
                item,
                type,
                handoff,
                evidenceFile.getAbsolutePath(),
                true
            );
            Log.i("AquaCommandWidget", "AQUA_CAPTURE_BACKGROUND_COMPLETE type=" + type);
        } else {
            Log.w("AquaCommandWidget", "AQUA_CAPTURE_FAILED mode=" + type + " reason=store");
            evidenceFile.delete();
            Toast.makeText(this, "Aqua could not save that " + type + ".", Toast.LENGTH_SHORT).show();
        }
        if (item.length() == 0) finish();
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
        captureHandler.removeCallbacksAndMessages(null);
        if (speechRecognizer == null) return;
        recognitionCompleted = true;
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
