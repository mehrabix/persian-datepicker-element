import { DateTuple } from '../types';

/**
 * Date utility functions for Persian Datepicker
 */
export class DateUtils {
  /**
   * Convert numbers to Persian numerals
   */
  static toPersianNum(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => persianDigits[parseInt(x)]);
  }

  /**
   * Convert Persian numerals to standard numbers
   */
  static fromPersianNum(persianNum: string): number {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return parseInt(persianNum.replace(/[۰-۹]/g, d => persianDigits.indexOf(d).toString()));
  }

  /**
   * Compare two dates in [year, month, day] format
   * Returns -1 if date1 < date2, 0 if date1 = date2, 1 if date1 > date2
   */
  static compareDates(date1: DateTuple, date2: DateTuple): number {
    // First compare years
    if (date1[0] !== date2[0]) {
      return date1[0] - date2[0];
    }
    
    // Then compare months
    if (date1[1] !== date2[1]) {
      return date1[1] - date2[1];
    }
    
    // Finally compare days
    return date1[2] - date2[2];
  }

  /**
   * Check if a date is within the allowed range
   */
  static isDateInRange(
    year: number, 
    month: number, 
    day: number, 
    minDate: DateTuple | null, 
    maxDate: DateTuple | null
  ): boolean {
    if (!minDate && !maxDate) return true;
    
    const date: DateTuple = [year, month, day];
    
    if (minDate && this.compareDates(date, minDate) < 0) return false;
    if (maxDate && this.compareDates(date, maxDate) > 0) return false;
    
    return true;
  }

  /**
   * Check if a date is disabled
   */
  static isDateDisabled(
    year: number, 
    month: number, 
    day: number, 
    disabledDatesFn: ((year: number, month: number, day: number) => boolean) | null
  ): boolean {
    if (!disabledDatesFn) return false;
    return disabledDatesFn(year, month, day);
  }

  /**
   * Convert a Jalali date tuple to an ISO string
   */
  static jalaliToISOString(date: DateTuple, persianDateClass: any): string {
    if (!date) return '';
    
    const gregorianDate = persianDateClass.jalaliToGregorian(date[0], date[1], date[2]);
    return new Date(
      gregorianDate[0], 
      gregorianDate[1] - 1, // Months are 0-indexed in JavaScript Date
      gregorianDate[2]
    ).toISOString();
  }

  /**
   * Validate date format string
   */
  static isValidFormat(format: string): boolean {
    // Check if format contains at least one of the required patterns
    const hasYear = format.includes('YYYY');
    const hasMonth = format.includes('MM');
    const hasDay = format.includes('DD');

    // Check for invalid patterns
    const invalidPatterns = /[^YMD\/\-\. dth]/g;
    const hasInvalidPatterns = invalidPatterns.test(format);

    // Allow special formats
    if (format === 'YYYY/MM' || format === 'DD/MM' || format === 'DD.MM.YYYY' || format === 'YYYY/MM/DDth') {
      return true;
    }

    // For other formats, require at least two components
    const componentCount = [hasYear, hasMonth, hasDay].filter(Boolean).length;
    return componentCount >= 2 && !hasInvalidPatterns;
  }

  /**
   * Get weekday name in Persian
   */
  static getWeekdayName(year: number, month: number, day: number): string {
    const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const date = new Date(year, month - 1, day);
    const weekday = date.getDay();
    return weekdays[weekday];
  }

  /**
   * Get today's Jalali date
   */
  static getTodayJalali(persianDateClass: any): DateTuple {
    const today = new Date();
    return persianDateClass.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
  }

  /**
   * Get tomorrow's Jalali date
   */
  static getTomorrowJalali(persianDateClass: any): DateTuple {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return persianDateClass.gregorianToJalali(
      tomorrow.getFullYear(),
      tomorrow.getMonth() + 1,
      tomorrow.getDate()
    );
  }
} 