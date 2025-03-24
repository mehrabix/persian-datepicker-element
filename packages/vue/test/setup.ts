import '@testing-library/jest-dom';
import { config } from '@vue/test-utils';

// Mock the custom element
class PersianDatepickerElement extends HTMLElement {
  constructor() {
    super();
  }

  setValue(year: number, month: number, day: number) {
    this.setAttribute('value', `${year}/${month}/${day}`);
  }

  getValue() {
    return [1403, 1, 1];
  }

  open() {}
  close() {}

  // Add min and max properties
  get min() {
    return this.getAttribute('min')?.split('/').map(Number) || null;
  }

  set min(value: number[] | null) {
    this.setAttribute('min', value ? value.join('/') : '');
  }

  get max() {
    return this.getAttribute('max')?.split('/').map(Number) || null;
  }

  set max(value: number[] | null) {
    this.setAttribute('max', value ? value.join('/') : '');
  }
}

// Register the custom element
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatepickerElement);
}

// Configure Vue Test Utils
config.global.mocks = {
  // Add any global mocks here
}; 