/**
 * Types for Persian Date Picker
 */
/**
 * Event data for Persian calendar
 */
export interface PersianEvent {
    /** Title of the event in Persian */
    title: string;
    /** Month number (1-12) */
    month: number;
    /** Day number (1-31) */
    day: number;
    /** Category or type of the event (e.g., "Iran", "Religious") */
    type: string;
    /** Whether this event is a holiday */
    holiday?: boolean;
    /** Original Hijri month for converted events */
    originalHijriMonth?: number;
    /** Original Hijri day for converted events */
    originalHijriDay?: number;
}
/**
 * A date represented as [year, month, day]
 */
export type DateTuple = [number, number, number];
/**
 * Options for the Persian date picker element
 */
/**
 * Event dispatched when a date is selected
 */
export interface PersianDateChangeEvent extends CustomEvent {
    detail: {
        /** Selected date in Jalali calendar format */
        jalali: DateTuple;
        /** Selected date converted to Gregorian format */
        gregorian: DateTuple;
        /** Whether the selected date is a holiday */
        isHoliday: boolean;
        /** Events associated with the selected date */
        events: PersianEvent[];
    };
}
export interface PersianDate {
    year: number;
    month: number;
    day: number;
}
export interface EventsData {
    meta: {
        version: string;
        source: string;
    };
    events: PersianEvent[];
}
export * from './persian-datepicker-options';
