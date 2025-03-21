import { PersianTimePickerElement } from './persian-timepicker-element';
import type {
  PersianTimePickerElementOptions,
  PersianTimeChangeEvent,
  CSSVariableMap as TimePickerCSSVariableMap
} from './types';

/**
 * Register the persian-timepicker-element custom element
 */
if (!customElements.get('persian-timepicker-element')) {
  customElements.define('persian-timepicker-element', PersianTimePickerElement);
}

export { PersianTimePickerElement }; 