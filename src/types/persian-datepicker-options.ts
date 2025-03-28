/**
 * Configuration options for the Persian Date Picker Element
 */
export interface PersianDatePickerElementOptions {
  /** Color for selected dates and highlights */
  primaryColor?: string;

  /** Text direction (true for RTL, false for LTR) */
  rtl?: boolean;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Date format pattern (YYYY = year, MM = month, DD = day) */
  format?: string;

  /** Custom CSS variables to override default styling */
  cssVariables?: Record<string, string>;

  /** Types of holidays to display (e.g. 'Iran', 'Religious') */
  holidayTypes?: string[] | string;
}
