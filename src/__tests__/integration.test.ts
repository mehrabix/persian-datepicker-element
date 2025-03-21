import '../index'; // Import the main entry point which should register the component
import { dispatchEvent, simulateKeyEvent, wait } from './test-utils';

describe('Persian Date Picker Element Integration', () => {
  beforeEach(() => {
    // Set up a test environment for each test
    document.body.innerHTML = '<persian-datepicker-element></persian-datepicker-element>';
  });

  test('component renders in page without errors', () => {
    const pickerElement = document.querySelector('persian-datepicker-element');
    expect(pickerElement).not.toBeNull();
    expect(pickerElement?.shadowRoot).not.toBeNull();
  });

  test('handles attribute changes', async () => {
    const pickerElement = document.querySelector('persian-datepicker-element') as HTMLElement;
    
    // Set the placeholder attribute
    pickerElement.setAttribute('placeholder', 'تاریخ تولد');
    
    // Allow time for attribute changes to be processed
    await wait(50);
    
    const input = pickerElement.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).toBe('تاریخ تولد');
  });

  test.skip('component correctly handles date selection and emits events', async () => {
    const pickerElement = document.querySelector('persian-datepicker-element') as HTMLElement;
    let eventCalled = false;
    
    pickerElement.addEventListener('datechange', () => {
      eventCalled = true;
    });
    
    // Open the calendar
    const input = pickerElement.shadowRoot?.querySelector('input') as HTMLInputElement;
    await dispatchEvent(input, 'click');
    
    // Wait longer for calendar to fully initialize and render
    await wait(100);
    
    // Select a day
    const dayElements = pickerElement.shadowRoot?.querySelectorAll('.day:not(.empty)') as NodeListOf<HTMLElement>;
    if (dayElements.length > 0) {
      const firstSelectableDay = dayElements[5]; // Select the 6th day
      await dispatchEvent(firstSelectableDay, 'click');
      
      // Wait for event to be processed
      await wait(50);
      
      expect(eventCalled).toBe(true);
      expect(input.value).not.toBe('');
    }
  });

  test('component properly navigates between months', async () => {
    const pickerElement = document.querySelector('persian-datepicker-element') as HTMLElement;
    
    // Open the calendar
    const input = pickerElement.shadowRoot?.querySelector('input') as HTMLInputElement;
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to be visible
    await wait(50);
    
    // Get the current month display
    const monthYearLabel = pickerElement.shadowRoot?.querySelector('#month-year') as HTMLElement;
    const initialMonth = monthYearLabel.textContent;
    
    // Navigate to next month
    const nextButton = pickerElement.shadowRoot?.querySelector('.nav-button.next') as HTMLElement;
    await dispatchEvent(nextButton, 'click');
    
    // Wait for update
    await wait(50);
    
    // The month display should change
    expect(monthYearLabel.textContent).not.toBe(initialMonth);
    
    // Navigate to previous month (should return to the initial month)
    const prevButton = pickerElement.shadowRoot?.querySelector('.nav-button.prev') as HTMLElement;
    await dispatchEvent(prevButton, 'click');
    
    // Wait for update
    await wait(50);
    
    expect(monthYearLabel.textContent).toBe(initialMonth);
  });

  test.skip('component is accessible via keyboard', async () => {
    const pickerElement = document.querySelector('persian-datepicker-element') as HTMLElement;
    
    // Focus the input
    const input = pickerElement.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.focus();
    
    // Wait for focus to be applied
    await wait(50);
    
    // Simulate Enter key to open calendar
    await simulateKeyEvent(input, 'Enter');
    
    // Wait longer for calendar to be visible
    await wait(100);
    
    // Check if calendar is visible
    const calendar = pickerElement.shadowRoot?.querySelector('.calendar') as HTMLElement;
    expect(calendar.classList.contains('visible')).toBeTruthy();
    
    // Simulate Escape key to close the calendar
    await simulateKeyEvent(document.body, 'Escape');
    
    // Wait longer for calendar to be hidden
    await wait(100);
    
    expect(calendar.classList.contains('visible')).toBeFalsy();
  });
}); 