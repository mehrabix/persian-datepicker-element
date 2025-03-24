// Add Jest DOM matchers
require('@testing-library/jest-dom');

// Mock the web component
class PersianDatepickerElement extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'format', 'show-holidays', 'rtl', 'value', 'min', 'max', 'disabled'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  // Mock methods
  setValue = jest.fn();
  getValue = jest.fn().mockReturnValue([1401, 6, 15]);
  open = jest.fn();
  close = jest.fn();
}

// Define the custom element before tests run
customElements.define('persian-datepicker-element', PersianDatepickerElement);

// Mock the module import
jest.mock('persian-datepicker-element', () => ({
  // Export any types or functions that might be used directly from the module
}), { virtual: true });

// Suppress console errors for custom elements during tests
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    (args[0].includes('The tag <persian-datepicker-element> is unrecognized in this browser') || 
     args[0].includes('Custom elements'))
  ) {
    return;
  }
  originalError(...args);
}; 