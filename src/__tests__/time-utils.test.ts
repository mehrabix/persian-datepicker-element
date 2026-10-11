/**
 * @jest-environment jsdom
 */
import { TimeUtils } from '../utils/time-utils';

describe('TimeUtils', () => {
  describe('toLatinDigits', () => {
    test('converts Persian digits to Latin digits', () => {
      expect(TimeUtils.toLatinDigits('۱۴:۳۰')).toBe('14:30');
      expect(TimeUtils.toLatinDigits('۰۹:۰۵:۰۷')).toBe('09:05:07');
    });

    test('leaves Latin digits untouched', () => {
      expect(TimeUtils.toLatinDigits('14:30')).toBe('14:30');
    });
  });

  describe('isValidTimeFormat', () => {
    test('accepts supported formats', () => {
      expect(TimeUtils.isValidTimeFormat('HH:mm')).toBe(true);
      expect(TimeUtils.isValidTimeFormat('HH:mm:ss')).toBe(true);
      expect(TimeUtils.isValidTimeFormat('hh:mm A')).toBe(true);
      expect(TimeUtils.isValidTimeFormat('HH')).toBe(true);
    });

    test('rejects formats without an hour token', () => {
      expect(TimeUtils.isValidTimeFormat('mm')).toBe(false);
      expect(TimeUtils.isValidTimeFormat('ss')).toBe(false);
    });

    test('rejects junk and unknown tokens', () => {
      expect(TimeUtils.isValidTimeFormat('XX')).toBe(false);
      expect(TimeUtils.isValidTimeFormat('HH:mm z')).toBe(false);
      expect(TimeUtils.isValidTimeFormat('')).toBe(false);
    });
  });

  describe('parseTimeFormat', () => {
    test('parses a 24-hour format', () => {
      expect(TimeUtils.parseTimeFormat('HH:mm')).toEqual({
        hour12: false,
        showHour: true,
        showMinute: true,
        showSecond: false,
        showAmPm: false
      });
    });

    test('parses a 12-hour format with seconds and AM/PM', () => {
      expect(TimeUtils.parseTimeFormat('hh:mm:ss A')).toEqual({
        hour12: true,
        showHour: true,
        showMinute: true,
        showSecond: true,
        showAmPm: true
      });
    });
  });

  describe('normalizeTime', () => {
    test('returns the default for missing input', () => {
      expect(TimeUtils.normalizeTime()).toEqual({ hour: 0, minute: 0, second: 0 });
      expect(TimeUtils.normalizeTime(null)).toEqual({ hour: 0, minute: 0, second: 0 });
    });

    test('accepts [hour, minute] tuples', () => {
      expect(TimeUtils.normalizeTime([13, 30])).toEqual({ hour: 13, minute: 30, second: 0 });
    });

    test('accepts [hour, minute, second] tuples', () => {
      expect(TimeUtils.normalizeTime([13, 30, 45])).toEqual({ hour: 13, minute: 30, second: 45 });
    });

    test('clamps out-of-range values', () => {
      expect(TimeUtils.normalizeTime([30, 90, 90])).toEqual({ hour: 23, minute: 59, second: 59 });
      expect(TimeUtils.normalizeTime([-5, -5, -5])).toEqual({ hour: 0, minute: 0, second: 0 });
    });
  });

  describe('to12Hour / from12Hour / isPm', () => {
    test('converts 24-hour values to 12-hour', () => {
      expect(TimeUtils.to12Hour(0)).toBe(12);
      expect(TimeUtils.to12Hour(1)).toBe(1);
      expect(TimeUtils.to12Hour(12)).toBe(12);
      expect(TimeUtils.to12Hour(13)).toBe(1);
      expect(TimeUtils.to12Hour(23)).toBe(11);
    });

    test('converts 12-hour values back to 24-hour', () => {
      expect(TimeUtils.from12Hour(12, false)).toBe(0);
      expect(TimeUtils.from12Hour(1, false)).toBe(1);
      expect(TimeUtils.from12Hour(12, true)).toBe(12);
      expect(TimeUtils.from12Hour(1, true)).toBe(13);
    });

    test('detects PM', () => {
      expect(TimeUtils.isPm(11)).toBe(false);
      expect(TimeUtils.isPm(12)).toBe(true);
      expect(TimeUtils.isPm(23)).toBe(true);
    });
  });

  describe('formatTime', () => {
    test('formats a 24-hour time with Persian numerals', () => {
      expect(TimeUtils.formatTime({ hour: 14, minute: 30, second: 0 }, 'HH:mm')).toBe('۱۴:۳۰');
    });

    test('formats a 12-hour time with AM/PM labels', () => {
      expect(TimeUtils.formatTime({ hour: 14, minute: 5, second: 0 }, 'hh:mm A')).toBe('۰۲:۰۵ ب.ظ');
      expect(TimeUtils.formatTime({ hour: 9, minute: 5, second: 0 }, 'hh:mm A')).toBe('۰۹:۰۵ ق.ظ');
      expect(TimeUtils.formatTime({ hour: 0, minute: 0, second: 0 }, 'hh:mm A')).toBe('۱۲:۰۰ ق.ظ');
    });

    test('formats seconds', () => {
      expect(TimeUtils.formatTime({ hour: 9, minute: 5, second: 7 }, 'HH:mm:ss')).toBe('۰۹:۰۵:۰۷');
    });

    test('falls back to the default format when no hour token is present', () => {
      expect(TimeUtils.formatTime({ hour: 8, minute: 15, second: 0 }, 'mm')).toBe('۰۸:۱۵');
    });
  });

  describe('option value providers', () => {
    test('returns 24 hour values for 24-hour mode', () => {
      const hours = TimeUtils.getHourValues(false);
      expect(hours.length).toBe(24);
      expect(hours[0]).toBe(0);
      expect(hours[23]).toBe(23);
    });

    test('returns 1..12 for 12-hour mode', () => {
      const hours = TimeUtils.getHourValues(true);
      expect(hours.length).toBe(12);
      expect(hours[0]).toBe(1);
      expect(hours[11]).toBe(12);
    });

    test('respects the minute step', () => {
      expect(TimeUtils.getMinuteValues(15)).toEqual([0, 15, 30, 45]);
      expect(TimeUtils.getMinuteValues(30)).toEqual([0, 30]);
      expect(TimeUtils.getMinuteValues(1).length).toBe(60);
    });

    test('returns 60 second values', () => {
      expect(TimeUtils.getSecondValues().length).toBe(60);
    });
  });

  describe('parseTime', () => {
    test('parses colon separated times', () => {
      expect(TimeUtils.parseTime('14:30')).toEqual({ hour: 14, minute: 30, second: 0 });
      expect(TimeUtils.parseTime('09:05:07')).toEqual({ hour: 9, minute: 5, second: 7 });
    });

    test('parses Persian digits', () => {
      expect(TimeUtils.parseTime('۱۴:۳۰')).toEqual({ hour: 14, minute: 30, second: 0 });
    });

    test('parses compact forms', () => {
      expect(TimeUtils.parseTime('1430')).toEqual({ hour: 14, minute: 30, second: 0 });
      expect(TimeUtils.parseTime('930')).toEqual({ hour: 9, minute: 30, second: 0 });
    });

    test('parses AM/PM markers', () => {
      expect(TimeUtils.parseTime('2:30 PM')).toEqual({ hour: 14, minute: 30, second: 0 });
      expect(TimeUtils.parseTime('12:00 AM')).toEqual({ hour: 0, minute: 0, second: 0 });
      expect(TimeUtils.parseTime('02:30 ب.ظ')).toEqual({ hour: 14, minute: 30, second: 0 });
      expect(TimeUtils.parseTime('۹:۰۵ ق.ظ')).toEqual({ hour: 9, minute: 5, second: 0 });
    });

    test('rejects invalid input', () => {
      expect(TimeUtils.parseTime('')).toBeNull();
      expect(TimeUtils.parseTime('abc')).toBeNull();
      expect(TimeUtils.parseTime('25:99')).toBeNull();
      expect(TimeUtils.parseTime('1:2:3:4')).toBeNull();
    });
  });
});
