package com.aquahomes.sentientos;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CalendarContract;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * The calendar executor behind Aqua's universal executive-assistant handoff.
 * Calendar is one supported destination, not the widget's product boundary.
 * A deliberate microphone press authorizes one parsed local calendar action;
 * the result is read back from the authoritative provider before Sentinel may
 * claim confirmation. Every non-calendar handoff stays on the general Aqua desk.
 */
final class CalendarQuickAction {
    private static final long DEFAULT_DURATION_MILLIS = 60L * 60L * 1000L;
    private static final Pattern TIME_PATTERN = Pattern.compile(
        "(?:\\bat\\s+|\\bfor\\s+)(\\d{1,2})(?::(\\d{2}))?\\s*(a\\.?m\\.?|p\\.?m\\.?|o['’]?clock)?",
        Pattern.CASE_INSENSITIVE
    );
    private static final Pattern NAMED_TITLE_PATTERN = Pattern.compile(
        "(?:called|titled|named)\\s+(.+?)(?=\\s+(?:at|for|today|tomorrow|on)\\b|$)",
        Pattern.CASE_INSENSITIVE
    );

    static final class Parsed {
        final String original;
        final String title;
        final long startMillis;
        final long endMillis;
        final String timeZone;

        Parsed(String original, String title, ZonedDateTime start) {
            this.original = original;
            this.title = title;
            this.startMillis = start.toInstant().toEpochMilli();
            this.endMillis = this.startMillis + DEFAULT_DURATION_MILLIS;
            this.timeZone = start.getZone().getId();
        }

        String spokenTime() {
            return ZonedDateTime.ofInstant(
                java.time.Instant.ofEpochMilli(startMillis),
                ZoneId.of(timeZone)
            ).format(DateTimeFormatter.ofPattern("EEE, MMM d 'at' h:mm a", Locale.getDefault()));
        }
    }

    static final class Result {
        final boolean success;
        final boolean duplicate;
        final String eventId;
        final String error;

        private Result(boolean success, boolean duplicate, String eventId, String error) {
            this.success = success;
            this.duplicate = duplicate;
            this.eventId = eventId == null ? "" : eventId;
            this.error = error == null ? "" : error;
        }

        static Result confirmed(String eventId, boolean duplicate) {
            return new Result(true, duplicate, eventId, "");
        }

        static Result failed(String error) {
            return new Result(false, false, "", error);
        }
    }

    private CalendarQuickAction() {}

    static boolean looksLikeCalendarCommand(String raw) {
        String text = normalize(raw);
        return text.contains("schedule")
            || text.contains("meeting")
            || text.contains("appointment")
            || text.contains("calendar")
            || text.contains("remind me")
            || text.contains("reminder");
    }

    static Parsed parse(String raw) {
        String original = raw == null ? "" : raw.trim();
        String text = normalize(original);
        if (!looksLikeCalendarCommand(text)) return null;

        Matcher timeMatcher = TIME_PATTERN.matcher(text);
        if (!timeMatcher.find()) return null;
        int hour = Integer.parseInt(timeMatcher.group(1));
        int minute = timeMatcher.group(2) == null ? 0 : Integer.parseInt(timeMatcher.group(2));
        if (hour > 23 || minute > 59) return null;
        String meridiem = timeMatcher.group(3) == null ? "" : timeMatcher.group(3).replace(".", "");
        if (meridiem.startsWith("p") && hour < 12) hour += 12;
        else if (meridiem.startsWith("a") && hour == 12) hour = 0;
        else if (meridiem.isEmpty() || meridiem.startsWith("o")) {
            // In a business command, an unqualified one-through-seven means PM.
            // This makes “5 o'clock tomorrow” resolve to the owner's expected 5 PM.
            if (hour >= 1 && hour <= 7) hour += 12;
        }
        if (hour > 23) return null;

        ZoneId zone = ZoneId.systemDefault();
        ZonedDateTime now = ZonedDateTime.now(zone);
        LocalDate date = resolveDate(text, now.toLocalDate());
        if (date == null) return null;
        ZonedDateTime start = ZonedDateTime.of(date, LocalTime.of(hour, minute), zone);
        if (!text.contains("tomorrow") && !text.contains("next ") && !start.isAfter(now)) {
            start = start.plusDays(1);
        }
        return new Parsed(original, resolveTitle(original), start);
    }

    private static LocalDate resolveDate(String text, LocalDate today) {
        if (text.contains("day after tomorrow")) return today.plusDays(2);
        if (text.contains("tomorrow")) return today.plusDays(1);
        if (text.contains("today")) return today;
        for (DayOfWeek day : DayOfWeek.values()) {
            String dayName = day.getDisplayName(TextStyle.FULL, Locale.US).toLowerCase(Locale.US);
            if (!text.contains(dayName)) continue;
            LocalDate candidate = today.with(TemporalAdjusters.nextOrSame(day));
            if (text.contains("next " + dayName) && candidate.equals(today)) candidate = candidate.plusWeeks(1);
            return candidate;
        }
        for (Month month : Month.values()) {
            String monthName = month.getDisplayName(TextStyle.FULL, Locale.US).toLowerCase(Locale.US);
            Matcher matcher = Pattern.compile("\\b" + monthName + "\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b").matcher(text);
            if (!matcher.find()) continue;
            int day = Integer.parseInt(matcher.group(1));
            try {
                LocalDate candidate = LocalDate.of(today.getYear(), month, day);
                return candidate.isBefore(today) ? candidate.plusYears(1) : candidate;
            } catch (RuntimeException ignored) {
                return null;
            }
        }
        // A time-bearing scheduling command without a named date is for today,
        // or tomorrow when the time has already passed.
        return today;
    }

    private static String resolveTitle(String original) {
        Matcher named = NAMED_TITLE_PATTERN.matcher(original == null ? "" : original);
        if (named.find()) return sentenceCase(named.group(1).trim());
        String lower = normalize(original);
        if (lower.contains("call ")) {
            String candidate = lower.substring(lower.indexOf("call "))
                .replaceFirst("\\s+(?:at|for)\\s+\\d{1,2}(?::\\d{2})?.*$", "")
                .replaceFirst("\\s+(?:today|tomorrow|on\\s+\\w+).*$", "")
                .trim();
            if (!candidate.isEmpty()) return sentenceCase(candidate);
        }
        if (lower.contains("appointment")) return "Appointment";
        if (lower.contains("remind me") || lower.contains("reminder")) return "Aqua reminder";
        return "Meeting";
    }

    private static String normalize(String raw) {
        return (raw == null ? "" : raw)
            .toLowerCase(Locale.US)
            .replace('’', '\'')
            .replaceFirst("^\\s*(?:hey\\s+)?aqua[,\\s:.-]*", "")
            .trim();
    }

    private static String sentenceCase(String value) {
        if (value == null || value.isEmpty()) return "Meeting";
        return Character.toUpperCase(value.charAt(0)) + value.substring(1);
    }

    static Result execute(Context context, Parsed action) {
        if (action == null) return Result.failed("Aqua needs a date and time before she can schedule that.");
        try {
            long calendarId = writableCalendarId(context);
            if (calendarId < 0) return Result.failed("No writable calendar is available on this device.");
            String duplicateId = duplicateEventId(context, action);
            if (!duplicateId.isEmpty()) return Result.confirmed(duplicateId, true);

            ContentValues event = new ContentValues();
            event.put(CalendarContract.Events.CALENDAR_ID, calendarId);
            event.put(CalendarContract.Events.TITLE, action.title);
            event.put(CalendarContract.Events.DESCRIPTION, "Created by Aqua Action from: “" + action.original + "”");
            event.put(CalendarContract.Events.DTSTART, action.startMillis);
            event.put(CalendarContract.Events.DTEND, action.endMillis);
            event.put(CalendarContract.Events.EVENT_TIMEZONE, action.timeZone);
            event.put(CalendarContract.Events.AVAILABILITY, CalendarContract.Events.AVAILABILITY_BUSY);
            Uri inserted = context.getContentResolver().insert(CalendarContract.Events.CONTENT_URI, event);
            if (inserted == null) return Result.failed("The calendar did not confirm the new event.");
            String eventId = inserted.getLastPathSegment();
            if (eventId == null || eventId.isEmpty()) return Result.failed("The calendar returned an invalid event receipt.");
            if (!eventMatches(context, eventId, action)) {
                return Result.failed("The calendar did not return the appointment Aqua created.");
            }

            ContentValues reminder = new ContentValues();
            reminder.put(CalendarContract.Reminders.EVENT_ID, Long.parseLong(eventId));
            reminder.put(CalendarContract.Reminders.MINUTES, 15);
            reminder.put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT);
            context.getContentResolver().insert(CalendarContract.Reminders.CONTENT_URI, reminder);
            return Result.confirmed(eventId, false);
        } catch (SecurityException error) {
            return Result.failed("Calendar permission is required to complete that action.");
        } catch (RuntimeException error) {
            return Result.failed("The calendar could not confirm that action.");
        }
    }

    private static long writableCalendarId(Context context) {
        String[] projection = {
            CalendarContract.Calendars._ID,
            CalendarContract.Calendars.IS_PRIMARY,
            CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL,
        };
        String selection = CalendarContract.Calendars.VISIBLE + "=1 AND "
            + CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL + ">=?";
        try (Cursor cursor = context.getContentResolver().query(
            CalendarContract.Calendars.CONTENT_URI,
            projection,
            selection,
            new String[] { String.valueOf(CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR) },
            CalendarContract.Calendars.IS_PRIMARY + " DESC"
        )) {
            if (cursor == null || !cursor.moveToFirst()) return -1L;
            return cursor.getLong(0);
        }
    }

    private static boolean eventMatches(Context context, String eventId, Parsed action) {
        String[] projection = {
            CalendarContract.Events.TITLE,
            CalendarContract.Events.DTSTART,
            CalendarContract.Events.DTEND,
        };
        try (Cursor cursor = context.getContentResolver().query(
            Uri.withAppendedPath(CalendarContract.Events.CONTENT_URI, eventId),
            projection,
            null,
            null,
            null
        )) {
            if (cursor == null || !cursor.moveToFirst()) return false;
            return action.title.equals(cursor.getString(0))
                && action.startMillis == cursor.getLong(1)
                && action.endMillis == cursor.getLong(2);
        }
    }

    private static String duplicateEventId(Context context, Parsed action) {
        String[] projection = { CalendarContract.Events._ID };
        String selection = CalendarContract.Events.DELETED + "=0 AND "
            + CalendarContract.Events.TITLE + "=? AND "
            + CalendarContract.Events.DTSTART + " BETWEEN ? AND ?";
        String[] arguments = {
            action.title,
            String.valueOf(action.startMillis - 120_000L),
            String.valueOf(action.startMillis + 120_000L),
        };
        try (Cursor cursor = context.getContentResolver().query(
            CalendarContract.Events.CONTENT_URI,
            projection,
            selection,
            arguments,
            CalendarContract.Events.DTSTART + " ASC"
        )) {
            if (cursor == null || !cursor.moveToFirst()) return "";
            return String.valueOf(cursor.getLong(0));
        }
    }
}
