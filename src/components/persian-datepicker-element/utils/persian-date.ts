/**
 * Persian Date Utility
 * A utility class for converting between Gregorian and Jalali (Persian) dates
 */

export class PersianDate {
  // Days in Gregorian months (0-based, so January is index 0 with 31 days)
  private static g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  private static j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  /**
   * Convert Gregorian date to Jalali (Persian) date
   * @param g_y Gregorian year
   * @param g_m Gregorian month (1-12)
   * @param g_d Gregorian day
   * @returns Array of [jalaliYear, jalaliMonth, jalaliDay]
   */
  static gregorianToJalali(g_y: number, g_m: number, g_d: number): [number, number, number] {
    g_y = parseInt(g_y.toString());
    g_m = parseInt(g_m.toString());
    g_d = parseInt(g_d.toString());
    
    const gy = g_y - 1600;
    const gm = g_m - 1;
    const gd = g_d - 1;
    
    let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
    
    for (let i = 0; i < gm; ++i)
      g_day_no += this.g_days_in_month[i];
      
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
      g_day_no++;
      
    g_day_no += gd;
    
    let j_day_no = g_day_no - 79;
    const j_np = Math.floor(j_day_no / 12053);
    j_day_no = j_day_no % 12053;
    
    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
    
    j_day_no %= 1461;
    
    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }
    
    let i = 0;
    for (; i < 11 && j_day_no >= this.j_days_in_month[i]; ++i) {
      j_day_no -= this.j_days_in_month[i];
    }
    
    const jm = i + 1;
    const jd = j_day_no + 1;
    
    return [jy, jm, jd];
  }

  /**
   * Convert Jalali (Persian) date to Gregorian date
   * @param j_y Jalali year
   * @param j_m Jalali month (1-12)
   * @param j_d Jalali day
   * @returns Array of [gregorianYear, gregorianMonth, gregorianDay]
   */
  static jalaliToGregorian(j_y: number, j_m: number, j_d: number): [number, number, number] {
    j_y = parseInt(j_y.toString());
    j_m = parseInt(j_m.toString());
    j_d = parseInt(j_d.toString());
    
    const jy = j_y - 979;
    const jm = j_m - 1;
    const jd = j_d - 1;
    
    let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
    for (let i = 0; i < jm; ++i) j_day_no += this.j_days_in_month[i];
    
    j_day_no += jd;
    
    let g_day_no = j_day_no + 79;
    
    let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
    g_day_no = g_day_no % 146097;
    
    let leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524);
      g_day_no = g_day_no % 36524;
      
      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }
    
    gy += 4 * Math.floor(g_day_no / 1461);
    g_day_no %= 1461;
    
    if (g_day_no >= 366) {
      leap = false;
      g_day_no--;
      gy += Math.floor(g_day_no / 365);
      g_day_no = g_day_no % 365;
    }
    
    let i = 0;
    for (; g_day_no >= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0); i++) {
      g_day_no -= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0);
    }
      
    const gm = i + 1;
    const gd = g_day_no + 1;
    
    return [gy, gm, gd];
  }

  /**
   * Check if a Jalali year is a leap year
   * @param year Jalali year
   * @returns true if leap year, false otherwise
   */
  static isLeapJalaliYear(year: number): boolean {
    const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
    return breaks.includes(year % 33);
  }

  /**
   * Get number of days in a Jalali month
   * @param year Jalali year
   * @param month Jalali month (1-12)
   * @returns number of days in the month
   */
  static getDaysInMonth(year: number, month: number): number {
    if (month < 1 || month > 12) return 0;
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return this.isLeapJalaliYear(year) ? 30 : 29; // Esfand (month 12)
  }

  /**
   * Get Persian month name
   * @param month Month number (1-12)
   * @returns Persian month name
   */
  static getMonthName(month: number): string {
    const monthNames = [
      "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
      "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ];
    return monthNames[month - 1] || "";
  }

  /**
   * Get day of week for a Jalali date (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
   * @param jYear Jalali year
   * @param jMonth Jalali month
   * @param jDay Jalali day
   * @returns day of week (0-6)
   */
  static getDayOfWeek(jYear: number, jMonth: number, jDay: number): number {
    const gdate = this.jalaliToGregorian(jYear, jMonth, jDay);
    const date = new Date(gdate[0], gdate[1]-1, gdate[2]);
    return date.getDay();
  }

  /**
   * Check if a Jalali date is valid
   * @param year Jalali year
   * @param month Jalali month
   * @param day Jalali day
   * @returns true if valid, false otherwise
   */
  static isValidDate(year: number, month: number, day: number): boolean {
    if (year < 0 || month < 1 || month > 12 || day < 1) return false;
    return day <= this.getDaysInMonth(year, month);
  }
} 