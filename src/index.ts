// Import the custom element class
import { PersianDatePickerElement } from './persian-datepicker-element';
// Import the utility class
import { PersianDate } from './persian-date';
// Import types from types directory
import type {
  PersianDatePickerElementOptions,
  PersianDateChangeEvent,
  DateTuple,
  PersianEvent,
} from './types';

// Declare global window interface extension for TypeScript
declare global {
  interface Window {
    PersianDatePickerElement?: typeof PersianDatePickerElement;
  }
}

// Try to register the custom element with the browser
// First check if we're in a browser environment and if customElements API exists
const isBrowser = typeof window !== 'undefined';
const hasCustomElements = isBrowser && typeof customElements !== 'undefined';

if (hasCustomElements) {
  // Only register if it's not already registered
  if (!customElements.get('persian-datepicker-element')) {
    try {
      customElements.define('persian-datepicker-element', PersianDatePickerElement);
      console.info('persian-datepicker-element registered successfully');
    } catch (error) {
      console.error('Error registering persian-datepicker-element:', error);
    }
  }
}

// Export the classes and types
export { PersianDatePickerElement, PersianDate };
export type { PersianDatePickerElementOptions, PersianDateChangeEvent, DateTuple, PersianEvent };

// Default export for convenient usage
export default PersianDatePickerElement;
