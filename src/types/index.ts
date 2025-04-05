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
  /** ISO string representation of the event date (e.g. "2023-04-01T00:00:00.000Z") */
  isoString?: string;
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
    /** Formatted date string according to the current format */
    formattedDate?: string;
    /** ISO string representation of the date (e.g. "2023-04-01T00:00:00.000Z") */
    isoString?: string;
    /** Whether this is a range selection */
    isRange?: boolean;
    /** Range selection details when in range mode */
    range?: {
      /** Start date in Jalali format */
      start: DateTuple | null;
      /** End date in Jalali format */
      end: DateTuple | null;
      /** Start date in ISO string format */
      startISOString?: string | null;
      /** End date in ISO string format */
      endISOString?: string | null;
      /** Start date in Gregorian format */
      startGregorian?: DateTuple | null;
      /** End date in Gregorian format */
      endGregorian?: DateTuple | null;
    };
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

export * from './persian-datepicker-options'