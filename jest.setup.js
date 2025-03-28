// Import jest-dom for extended DOM matchers
require('@testing-library/jest-dom');

// Mock for custom elements to work in the test environment
if (!window.customElements) {
  window.customElements = {
    define: jest.fn(),
    get: jest.fn(),
    upgrade: jest.fn(),
    whenDefined: jest.fn(() => Promise.resolve()),
  };
}

// Mock for Shadow DOM
Element.prototype.attachShadow =
  Element.prototype.attachShadow ||
  function () {
    const shadow = document.createElement('div');
    shadow.innerHTML = '';
    this.shadowRoot = shadow;
    return shadow;
  };
