/**
 * Utility functions for testing
 */

/**
 * Wait for a specific time to allow for DOM updates and event handling
 * @param ms Time to wait in milliseconds
 */
export function wait(ms: number = 10): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Dispatch an event on an element and wait for it to be processed
 * @param element The element to dispatch the event on
 * @param eventType The type of event to dispatch
 * @param options Event options
 */
export async function dispatchEvent(
  element: Element,
  eventType: string,
  options: any = {}
): Promise<void> {
  const event = new Event(eventType, {
    bubbles: true,
    cancelable: true,
    ...options
  });
  element.dispatchEvent(event);
  await wait();
}

/**
 * Simulate a key event on an element
 * @param element The element to simulate the key event on
 * @param key The key to simulate
 * @param eventType The type of keyboard event (keydown, keyup, keypress)
 */
export async function simulateKeyEvent(
  element: Element,
  key: string,
  eventType: 'keydown' | 'keyup' | 'keypress' = 'keydown'
): Promise<void> {
  const event = new KeyboardEvent(eventType, {
    key,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(event);
  await wait();
}

/**
 * Find an element by its content text
 * @param container The container to search in
 * @param selector The selector to use
 * @param text The text to search for
 */
export function findByText(
  container: Element,
  selector: string,
  text: string
): Element | null {
  const elements = Array.from(container.querySelectorAll(selector));
  return elements.find(el => el.textContent?.trim() === text) || null;
} 