// Import the custom element class
import { JalaliDatePicker } from './jalali-date-picker';
// Import the utility class
import { JalaliDate } from './jalali-date';
// Import types directly
import type { JalaliDatePickerOptions, JalaliDateChangeEvent } from './jalali-date-picker';

// Define the custom element
if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', JalaliDatePicker);
}

// Export the classes and types
export { JalaliDatePicker, JalaliDate };
export type { JalaliDatePickerOptions, JalaliDateChangeEvent };

// Default export for convenient usage
export default JalaliDatePicker; 