import React from 'react';
import { PersianDatepicker } from './PersianDatepicker';
export type { PersianDatepickerProps, PersianDatepickerMethods } from './PersianDatepicker';

// Export types from the base web component
export type {
  PersianDatePickerElementOptions,
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableMap,
  PersianEvent
} from 'persian-datepicker-element';

// Export the component as default and named export
export { PersianDatepicker };
export default PersianDatepicker; 