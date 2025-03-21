/**
 * Type definitions for Persian Date Picker Element
 */

// Export all types
export { PersianDatePickerElementOptions } from './persian-datepicker-options';
export { PersianDateChangeEvent } from './persian-date-change-event';
export { DateTuple } from './date-tuple';

// Export CSS variable types
export type CSSVariableKey = `--jdp-${string}`;
export type CSSVariableMap = Record<CSSVariableKey, string>; 