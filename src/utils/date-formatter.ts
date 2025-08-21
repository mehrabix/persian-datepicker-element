import { DateTuple } from '../types';

/**
 * Date Formatter for Persian Datepicker
 * 
 * Handles all date formatting operations including custom formats and Persian numerals
 */
export class DateFormatter {
  // Persian month names
  private static readonly persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  // Weekday names in Persian
  private static readonly weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

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
   * Format a date tuple according to the specified format
   */
  static formatDate(date: DateTuple, format: string): string {
    if (!date) return '';
    
    const [year, month, day] = date;
    
    // Handle special formats first
    const specialFormat = this.handleSpecialFormat(format, year, month, day);
    if (specialFormat !== null) {
      return specialFormat;
    }
    
    // Handle general format
    return this.handleGeneralFormat(format, year, month, day);
  }

  /**
   * Handle special predefined formats
   */
  private static handleSpecialFormat(format: string, year: number, month: number, day: number): string | null {
    type SpecialFormat = 'YYYY/MM/DD' | 'YYYY-MM-DD' | 'YYYY/MM/DDth';
    const specialFormats: Record<SpecialFormat, () => string> = {
      'YYYY/MM/DD': () => `${this.toPersianNum(year)}/${this.toPersianNum(month.toString().padStart(2, '0'))}/${this.toPersianNum(day.toString().padStart(2, '0'))}`,
      'YYYY-MM-DD': () => `${this.toPersianNum(year)}-${this.toPersianNum(month.toString().padStart(2, '0'))}-${this.toPersianNum(day.toString().padStart(2, '0'))}`,
      'YYYY/MM/DDth': () => `${this.toPersianNum(year)}/${this.toPersianNum(month.toString().padStart(2, '0'))}/${this.toPersianNum(day)}ام`
    };

    return (specialFormats[format as SpecialFormat]?.() || null);
  }

  /**
   * Handle general format with tokens
   */
  private static handleGeneralFormat(format: string, year: number, month: number, day: number): string {
    // Split format into components while preserving spaces
    const components = format.split(/(\s+)/);
    const parts: string[] = [];
    
    // Process each component in order
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      
      if (!component.trim()) {
        parts.push(component);
        continue;
      }
      
      let processedComponent = this.replaceFormatTokens(component, year, month, day);
      parts.push(processedComponent);
      
      // Add space between components if needed
      if (i < components.length - 1 && components[i + 1].trim()) {
        parts.push(' ');
      }
    }
    
    return parts.join('');
  }

  /**
   * Replace format tokens in a component
   */
  private static replaceFormatTokens(component: string, year: number, month: number, day: number): string {
    let processed = component;
    
    // Replace format tokens in the correct order for RTL
    if (processed.includes('dddd')) {
      processed = processed.replace('dddd', this.getWeekdayName(year, month, day));
    }
    
    if (processed.includes('MMMM')) {
      processed = processed.replace('MMMM', this.persianMonths[month - 1]);
    } else if (processed.includes('MMM')) {
      processed = processed.replace('MMM', this.persianMonths[month - 1].substring(0, 3));
    }
    
    processed = processed.replace('YYYY', this.toPersianNum(year));
    processed = processed.replace('MM', this.toPersianNum(month.toString().padStart(2, '0')));
    processed = processed.replace('DD', this.toPersianNum(day.toString().padStart(2, '0')));
    
    // Handle ordinal suffix
    if (processed.includes('th')) {
      processed = processed.replace('th', 'ام');
    }
    
    return processed;
  }

  /**
   * Get weekday name in Persian
   */
  private static getWeekdayName(year: number, month: number, day: number): string {
    const date = new Date(year, month - 1, day);
    const weekday = date.getDay();
    return this.weekdays[weekday];
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
   * Get Persian month names
   */
  static getPersianMonths(): readonly string[] {
    return this.persianMonths;
  }

  /**
   * Format a range of dates
   */
  static formatDateRange(start: DateTuple, end: DateTuple, format: string): string {
    const startFormatted = this.formatDate(start, format);
    const endFormatted = this.formatDate(end, format);
    return `${startFormatted} - ${endFormatted}`;
  }
} 