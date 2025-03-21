import { DateTuple } from './date-tuple';

/**
 * Custom event type for date change events
 * Includes both Jalali (Persian) and Gregorian date values
 */
export interface PersianDateChangeEvent extends CustomEvent {
  detail: {
    /** Jalali (Persian) date as [year, month, day] */
    jalali: DateTuple;
    
    /** Gregorian date as [year, month, day] */
    gregorian: DateTuple;
  };
} 