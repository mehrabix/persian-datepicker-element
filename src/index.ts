// Import the custom element class
import { PersianDatePickerElement } from './persian-datepicker-element';
// Import the utility class
import { PersianDate } from './persian-date';
// Import types directly
import type { PersianDatePickerElementOptions, PersianDateChangeEvent } from './persian-datepicker-element';

// Define the custom element
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatePickerElement);
}

// Export the classes and types
export { PersianDatePickerElement, PersianDate };
export type { PersianDatePickerElementOptions, PersianDateChangeEvent };

// Default export for convenient usage
export default PersianDatePickerElement; 