import { findByText, wait } from './test-utils';

describe('Test utilities', () => {
  test('wait should return a Promise', () => {
    const waitPromise = wait(10);
    expect(waitPromise).toBeInstanceOf(Promise);
  });

  test('findByText should find elements by their text content', () => {
    // Setup test DOM
    document.body.innerHTML = `
      <div>
        <span>First span</span>
        <span>Second span</span>
        <span>Third span</span>
      </div>
    `;

    const result = findByText(document.body, 'span', 'Second span');
    expect(result).toBeTruthy();
    expect(result?.textContent).toBe('Second span');

    const notFound = findByText(document.body, 'span', 'Fourth span');
    expect(notFound).toBeNull();
  });
});
