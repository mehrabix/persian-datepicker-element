import { PersianEvent } from '../types';
import { PersianDatePickerElement } from '../persian-datepicker-element';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

// Register the custom element before running tests
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatePickerElement);
}

// Mock requestAnimationFrame and cancelAnimationFrame
window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 0);
};

window.cancelAnimationFrame = (handle: number): void => {
  clearTimeout(handle);
};

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = MockResizeObserver as any;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver as any;

// Mock fetch function
window.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

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

// Mock getComputedStyle
window.getComputedStyle = jest.fn().mockImplementation(() => ({
  getPropertyValue: jest.fn(),
}));

/**
 * @jest-environment jsdom
 */

describe('Test Setup', () => {
  test('should have a valid test environment', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });
});

// Helper function to wait for element to be ready
export async function waitForElement(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (element.shadowRoot) {
      resolve();
      return;
    }
    
    const observer = new MutationObserver(() => {
      if (element.shadowRoot) {
        observer.disconnect();
        resolve();
      }
    });
    
    observer.observe(element, { childList: true, subtree: true });
  });
}

// Helper function to wait for a condition
export async function waitFor(condition: () => boolean, timeout = 1000): Promise<void> {
  const start = Date.now();
  
  while (!condition()) {
    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
} 