package com.aquahomes.sentientos;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.OpenableColumns;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class EvidenceProvider extends ContentProvider {
    static Uri uriFor(Context context, File file) {
        return new Uri.Builder()
            .scheme("content")
            .authority(context.getPackageName() + ".files")
            .appendPath("evidence")
            .appendPath(file.getName())
            .build();
    }

    @Override
    public boolean onCreate() {
        return true;
    }

    private File resolve(Uri uri) throws FileNotFoundException {
        if (getContext() == null || uri.getPathSegments().size() != 2) {
            throw new FileNotFoundException("Invalid evidence URI");
        }
        if (!"evidence".equals(uri.getPathSegments().get(0))) {
            throw new FileNotFoundException("Invalid evidence path");
        }
        String name = uri.getPathSegments().get(1);
        if (!name.matches("[0-9]+\\.(jpg|mp4)")) {
            throw new FileNotFoundException("Invalid evidence name");
        }
        try {
            File root = new File(getContext().getFilesDir(), "filing-evidence").getCanonicalFile();
            File target = new File(root, name).getCanonicalFile();
            if (!target.getParentFile().equals(root)) throw new FileNotFoundException("Invalid evidence target");
            return target;
        } catch (IOException error) {
            throw new FileNotFoundException("Evidence path unavailable");
        }
    }

    @Override
    public String getType(Uri uri) {
        return uri.toString().endsWith(".mp4") ? "video/mp4" : "image/jpeg";
    }

    @Override
    public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException {
        int flags = mode.contains("w")
            ? ParcelFileDescriptor.MODE_CREATE | ParcelFileDescriptor.MODE_TRUNCATE | ParcelFileDescriptor.MODE_WRITE_ONLY
            : ParcelFileDescriptor.MODE_READ_ONLY;
        return ParcelFileDescriptor.open(resolve(uri), flags);
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] args, String order) {
        try {
            File file = resolve(uri);
            MatrixCursor cursor = new MatrixCursor(new String[] { OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE });
            cursor.addRow(new Object[] { file.getName(), file.exists() ? file.length() : 0L });
            return cursor;
        } catch (FileNotFoundException error) {
            return new MatrixCursor(new String[] { OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE });
        }
    }

    @Override public Uri insert(Uri uri, ContentValues values) { throw new UnsupportedOperationException(); }
    @Override public int delete(Uri uri, String selection, String[] args) { return 0; }
    @Override public int update(Uri uri, ContentValues values, String selection, String[] args) { return 0; }
}
