import { PersianDatePickerElement } from './persian-datepicker-element';
import type { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableKey,
  CSSVariableMap
} from './types';

// Define the custom element if it hasn't been registered yet
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatePickerElement);
}

// Export the component class and types
export { PersianDatePickerElement };
export type {
  PersianDatePickerElementOptions,
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableKey,
  CSSVariableMap
};

// Default export for convenient usage
export default PersianDatePickerElement; 