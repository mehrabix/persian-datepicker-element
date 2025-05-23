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
Element.prototype.attachShadow = Element.prototype.attachShadow || 
  function() { 
    const shadow = document.createElement('div');
    shadow.innerHTML = '';
    this.shadowRoot = shadow;
    return shadow;
  }; 

// Mock fetch function
window.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      "Persian Calendar": [],
      "Hijri Calendar": [],
      "Source": { "name": "Test Data", "url": "" }
    })
  })
);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver = MockIntersectionObserver;

// Mock getComputedStyle
window.getComputedStyle = jest.fn().mockImplementation(() => ({
  getPropertyValue: jest.fn(),
})); 