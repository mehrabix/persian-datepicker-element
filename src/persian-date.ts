/**
 * Jalali (Shamsi) Calendar utilities
 */
export const PersianDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],

  jalaliToGregorian: function (j_y: number, j_m: number, j_d: number): [number, number, number] {
    j_y = parseInt(j_y.toString());
    j_m = parseInt(j_m.toString());
    j_d = parseInt(j_d.toString());

    const jy = j_y - 979;
    const jm = j_m - 1;
    const jd = j_d - 1;

    let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
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
  },

  gregorianToJalali: function (g_y: number, g_m: number, g_d: number): [number, number, number] {
    g_y = parseInt(g_y.toString());
    g_m = parseInt(g_m.toString());
    g_d = parseInt(g_d.toString());

    const gy = g_y - 1600;
    const gm = g_m - 1;
    const gd = g_d - 1;

    let g_day_no =
      365 * gy +
      Math.floor((gy + 3) / 4) -
      Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) g_day_no += this.g_days_in_month[i];

    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) g_day_no++;

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
  },

  isLeapJalaliYear: function (year: number): boolean {
    const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
    return breaks.includes(year % 33);
  },

  getDaysInMonth: function (year: number, month: number): number {
    if (month < 1 || month > 12) return 0;
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    // Month 12 (Esfand)
    return this.isLeapJalaliYear(year) ? 30 : 29;
  },

  getMonthName: function (month: number): string {
    const monthNames = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];
    return monthNames[month - 1];
  },

  getDayOfWeek: function (jYear: number, jMonth: number, jDay: number): number {
    const gdate = this.jalaliToGregorian(jYear, jMonth, jDay);
    const date = new Date(gdate[0], gdate[1] - 1, gdate[2]);
    return date.getDay();
  },

  /**
   * Returns the number of days in a Jalali year
   */
  getDaysInYear: function (year: number): number {
    return this.isLeapJalaliYear(year) ? 366 : 365;
  },

  /**
   * Validates a Jalali date
   */
  isValidDate: function (year: number, month: number, day: number): boolean {
    if (year < 0 || month < 1 || month > 12 || day < 1) return false;
    return day <= this.getDaysInMonth(year, month);
  },
};
