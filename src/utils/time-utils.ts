import { TimeTuple, TimeValue } from '../types';

/**
 * Parsed representation of a time format string
 */
export interface TimeFormatConfig {
  /** Whether the hour is displayed in 12-hour format */
  hour12: boolean;
  /** Whether the format contains an hour token */
  showHour: boolean;
  /** Whether the format contains a minute token */
  showMinute: boolean;
  /** Whether the format contains a second token */
  showSecond: boolean;
  /** Whether the format contains an AM/PM token */
  showAmPm: boolean;
}

/**
 * Full configuration used to build the time picker dropdowns
 */
export interface TimePickerConfig extends TimeFormatConfig {
  /** Interval in minutes between options in the minutes dropdown */
  minuteStep: number;
  /** Raw time format string */
  format: string;
}

/**
 * Time utilities for the Persian Datepicker
 *
 * Handles parsing/validating time format strings, normalizing time values and
 * producing the option lists used by the time picker dropdowns.
 */
export class TimeUtils {
  /** Persian AM/PM labels */
  static readonly AMPM_LABELS = { am: 'ق.ظ', pm: 'ب.ظ' };

  /** Default time value used when none is provided */
  static readonly DEFAULT_TIME: TimeValue = { hour: 0, minute: 0, second: 0 };

  /** Default time format string */
  static readonly DEFAULT_TIME_FORMAT = 'HH:mm';

  private static readonly persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  /**
   * Convert numbers to Persian numerals
   */
  static toPersianNum(num: number | string): string {
    return num.toString().replace(/\d/g, x => this.persianDigits[parseInt(x)]);
  }

  /**
   * Convert Persian numerals to standard Latin digits
   */
  static toLatinDigits(value: string): string {
    return value.replace(/[۰-۹]/g, d => this.persianDigits.indexOf(d).toString());
  }

  /**
   * Parse a user-typed time string into a TimeValue.
   * Accepts Latin or Persian digits, ":"/"."/"-" separators, compact forms
   * like "1430"/"930", and optional AM/PM markers (Latin or Persian).
   * Returns null when the input cannot be interpreted as a valid time.
   */
  static parseTime(input: string): TimeValue | null {
    if (typeof input !== 'string') return null;

    let normalized = this.toLatinDigits(input).trim();
    if (!normalized) return null;

    let isPm: boolean | null = null;
    const lower = normalized.toLowerCase();
    if (lower.includes('pm') || normalized.includes(this.AMPM_LABELS.pm)) {
      isPm = true;
    } else if (lower.includes('am') || normalized.includes(this.AMPM_LABELS.am)) {
      isPm = false;
    }

    normalized = normalized
      .replace(/pm|am/gi, '')
      .split(this.AMPM_LABELS.pm).join('')
      .split(this.AMPM_LABELS.am).join('');

    const groups = normalized.match(/\d+/g);
    if (!groups || groups.length === 0) return null;

    let hour = 0;
    let minute = 0;
    let second = 0;

    if (groups.length === 1) {
      const digits = groups[0];
      if (digits.length <= 2) {
        hour = parseInt(digits, 10);
      } else if (digits.length === 3) {
        hour = parseInt(digits.slice(0, 1), 10);
        minute = parseInt(digits.slice(1), 10);
      } else if (digits.length === 4) {
        hour = parseInt(digits.slice(0, 2), 10);
        minute = parseInt(digits.slice(2), 10);
      } else {
        return null;
      }
    } else if (groups.length === 2) {
      hour = parseInt(groups[0], 10);
      minute = parseInt(groups[1], 10);
    } else if (groups.length === 3) {
      hour = parseInt(groups[0], 10);
      minute = parseInt(groups[1], 10);
      second = parseInt(groups[2], 10);
    } else {
      return null;
    }

    if (isPm !== null) {
      if (hour < 1 || hour > 12) return null;
      hour = this.from12Hour(hour, isPm);
    }

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
      return null;
    }

    return { hour, minute, second };
  }

  /**
   * Validate a time format string. Requires an hour token (HH or hh) and only
   * allows the supported tokens and separators.
   */
  static isValidTimeFormat(format: string): boolean {
    if (typeof format !== 'string' || format.length === 0) return false;
    if (!/(HH|hh)/.test(format)) return false;

    // Strip all valid tokens; whatever remains must be a separator/space
    const remainder = format.replace(/HH|hh|mm|ss|A|a/g, '');
    return /^[:\s\-.]*$/.test(remainder);
  }

  /**
   * Parse a time format string into a configuration object
   */
  static parseTimeFormat(format: string): TimeFormatConfig {
    const safe = typeof format === 'string' && format.length ? format : this.DEFAULT_TIME_FORMAT;
    const showHour = /HH|hh/.test(safe);
    const hour12 = /hh/.test(safe) && !/HH/.test(safe);

    return {
      hour12,
      showHour,
      showMinute: /mm/.test(safe),
      showSecond: /ss/.test(safe),
      showAmPm: /A|a/.test(safe),
    };
  }

  /**
   * Normalize a time tuple or value into a clamped TimeValue
   */
  static normalizeTime(input?: TimeTuple | TimeValue | null): TimeValue {
    if (!input) return { ...this.DEFAULT_TIME };

    let hour = 0;
    let minute = 0;
    let second = 0;

    if (Array.isArray(input)) {
      hour = Number(input[0]) || 0;
      minute = Number(input[1]) || 0;
      second = Number(input[2]) || 0;
    } else {
      hour = Number((input as TimeValue).hour) || 0;
      minute = Number((input as TimeValue).minute) || 0;
      second = Number((input as TimeValue).second) || 0;
    }

    return this.clampTime({ hour, minute, second });
  }

  /**
   * Clamp a time value into valid hour/minute/second bounds
   */
  static clampTime(time: TimeValue): TimeValue {
    return {
      hour: Math.min(23, Math.max(0, Math.trunc(time.hour))),
      minute: Math.min(59, Math.max(0, Math.trunc(time.minute))),
      second: Math.min(59, Math.max(0, Math.trunc(time.second))),
    };
  }

  /**
   * Convert a 24-hour value to its 12-hour representation (1-12)
   */
  static to12Hour(hour24: number): number {
    const hour = ((Math.trunc(hour24) % 12) + 12) % 12;
    return hour === 0 ? 12 : hour;
  }

  /**
   * Convert a 12-hour representation and AM/PM flag back to a 24-hour value
   */
  static from12Hour(hour12: number, isPm: boolean): number {
    const base = Math.trunc(hour12) % 12;
    return isPm ? base + 12 : base;
  }

  /**
   * Whether a 24-hour value falls in the afternoon (PM)
   */
  static isPm(hour24: number): boolean {
    return hour24 >= 12;
  }

  /**
   * Format a time value according to a time format string
   */
  static formatTime(time: TimeValue, format: string): string {
    const config = this.parseTimeFormat(format);

    if (!config.showHour) {
      return this.formatTime(this.normalizeTime(time), this.DEFAULT_TIME_FORMAT);
    }

    const value = this.normalizeTime(time);
    let hour = value.hour;
    let ampm = '';

    if (config.hour12) {
      ampm = this.isPm(value.hour) ? this.AMPM_LABELS.pm : this.AMPM_LABELS.am;
      hour = this.to12Hour(value.hour);
    }

    let result = format;
    result = result.replace(config.hour12 ? 'hh' : 'HH', this.toPersianNum(hour.toString().padStart(2, '0')));

    if (config.showMinute) {
      result = result.replace('mm', this.toPersianNum(value.minute.toString().padStart(2, '0')));
    }

    if (config.showSecond) {
      result = result.replace('ss', this.toPersianNum(value.second.toString().padStart(2, '0')));
    }

    if (config.showAmPm) {
      result = result.replace(/A|a/, ampm);
    }

    return result;
  }

  /**
   * Get the hour option values for the hour dropdown
   */
  static getHourValues(hour12: boolean): number[] {
    const values: number[] = [];
    const start = hour12 ? 1 : 0;
    const end = hour12 ? 12 : 23;
    for (let hour = start; hour <= end; hour++) {
      values.push(hour);
    }
    return values;
  }

  /**
   * Get the minute option values for the minute dropdown
   */
  static getMinuteValues(step: number = 1): number[] {
    const safeStep = Math.max(1, Math.floor(step) || 1);
    const values: number[] = [];
    for (let minute = 0; minute < 60; minute += safeStep) {
      values.push(minute);
    }
    return values;
  }

  /**
   * Get the second option values for the second dropdown
   */
  static getSecondValues(): number[] {
    const values: number[] = [];
    for (let second = 0; second < 60; second++) {
      values.push(second);
    }
    return values;
  }
}
