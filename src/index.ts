// Import the custom element class
import { PersianDatePickerElement } from './persian-datepicker-element';
// Import the utility class
import { PersianDate } from './persian-date';
// Import types from types directory
import type { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableKey,
  CSSVariableMap
} from './types';

// Define the custom element
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatePickerElement);
}

// Export the classes and types
export { PersianDatePickerElement, PersianDate };
export type { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableKey,
  CSSVariableMap
};

// Default export for convenient usage
export default PersianDatePickerElement; 