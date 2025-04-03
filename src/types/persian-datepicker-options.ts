import { DateTuple } from "./date-tuple";

/**
 * Configuration options for the Persian Date Picker Element
 */
export interface PersianDatePickerElementOptions {
  /** Placeholder text for the date input */
  placeholder?: string;
  /** Format string for displaying the date */
  format?: string;
  /** Whether the date picker should use RTL layout */
  rtl?: boolean;
  /** Whether to enable range selection mode */
  rangeMode?: boolean;
  /** Start date for range selection */
  rangeStart?: DateTuple;
  /** End date for range selection */
  rangeEnd?: DateTuple;
  /** Minimum selectable date */
  minDate?: DateTuple;
  /** Maximum selectable date */
  maxDate?: DateTuple;
  /** Function or name of function to determine disabled dates */
  disabledDates?: string | ((year: number, month: number, day: number) => boolean);
  /** Default date to select when the component is initialized */
  defaultDate?: DateTuple;
  /** Whether to show events in the calendar */
  showEvents?: boolean;
  /** Types of events to display (e.g. 'Iran', 'Religious') */
  eventTypes?: string[] | string;
}