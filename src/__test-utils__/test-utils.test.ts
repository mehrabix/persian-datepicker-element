import { wait, findByText } from './index';

describe('Test Utilities', () => {
  describe('wait function', () => {
    test('returns a promise that resolves', async () => {
      const result = wait();
      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toBeUndefined();
    });
    
    test('waits for the specified amount of time', async () => {
      const start = Date.now();
      await wait(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40); // Allow some margin for timer precision
    });
  });
  
  describe('findByText function', () => {
    test('finds an element by its text content', () => {
      // Setup test DOM
      document.body.innerHTML = `
        <div id="container">
          <p>First paragraph</p>
          <p>Second paragraph</p>
          <span>A span element</span>
        </div>
      `;
      
      const container = document.getElementById('container')!;
      
      // Find by exact text
      const result = findByText(container, 'p', 'Second paragraph');
      expect(result).not.toBeNull();
      expect(result?.textContent).toBe('Second paragraph');
      
      // Not found case
      const notFound = findByText(container, 'p', 'Does not exist');
      expect(notFound).toBeNull();
    });
  });
}); 