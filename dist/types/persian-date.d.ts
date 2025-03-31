/**
 * Jalali (Shamsi) Calendar utilities
 */
export declare const PersianDate: {
    g_days_in_month: number[];
    j_days_in_month: number[];
    jalaliToGregorian: (j_y: number, j_m: number, j_d: number) => [number, number, number];
    gregorianToJalali: (g_y: number, g_m: number, g_d: number) => [number, number, number];
    isLeapJalaliYear: (year: number) => boolean;
    getDaysInMonth: (year: number, month: number) => number;
    getMonthName: (month: number) => string;
    getDayOfWeek: (jYear: number, jMonth: number, jDay: number) => number;
    /**
     * Returns the number of days in a Jalali year
     */
    getDaysInYear: (year: number) => number;
    /**
     * Validates a Jalali date
     */
    isValidDate: (year: number, month: number, day: number) => boolean;
};
