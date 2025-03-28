/**
 * Represents a date as a tuple of [year, month, day]
 * Used for both Jalali and Gregorian dates
 *
 * @example
 * const jalaliDate: DateTuple = [1402, 12, 15]; // Year 1402, Month 12, Day 15
 * const gregorianDate: DateTuple = [2024, 3, 5]; // Year 2024, Month 3, Day 5
 */
export type DateTuple = [number, number, number];
