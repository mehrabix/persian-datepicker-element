import '../index'; // Import the main entry point which should register all components
import { dispatchEvent, simulateKeyEvent, wait } from '../__test-utils__';

describe('Persian UI Components Integration', () => {
  describe('Date Picker Integration', () => {
    beforeEach(() => {
      // Set up a test environment for date picker
      document.body.innerHTML = '<persian-datepicker-element></persian-datepicker-element>';
    });

    test('date picker component renders in page without errors', () => {
      const pickerElement = document.querySelector('persian-datepicker-element');
      expect(pickerElement).not.toBeNull();
      expect(pickerElement?.shadowRoot).not.toBeNull();
    });

    test('date picker handles attribute changes', async () => {
      const pickerElement = document.querySelector('persian-datepicker-element') as HTMLElement;
      
      // Set the placeholder attribute
      pickerElement.setAttribute('placeholder', 'تاریخ تولد');
      
      // Allow time for the attribute change to be processed
      await wait();
      
      // Check if the placeholder was applied
      const input = pickerElement!.shadowRoot!.querySelector('input') as HTMLInputElement;
      expect(input.placeholder).toBe('تاریخ تولد');
    });

    test('date picker selects date correctly', async () => {
      const pickerElement = document.querySelector('persian-datepicker-element') as any;
      
      // Set up a change event listener
      const changeHandler = jest.fn();
      pickerElement.addEventListener('change', changeHandler);
      
      // Click the input to open calendar
      const input = pickerElement.shadowRoot.querySelector('input');
      await dispatchEvent(input, 'click');
      
      // Calendar should be visible
      const calendar = pickerElement.shadowRoot.querySelector('.calendar');
      expect(calendar.classList.contains('visible')).toBe(true);
      
      // Click on day 10 (or any visible day)
      const days = Array.from(pickerElement.shadowRoot.querySelectorAll('.day:not(.empty)')) as HTMLElement[];
      const dayToClick = days.find(day => day.textContent === '10') as HTMLElement;
      
      if (dayToClick) {
        await dispatchEvent(dayToClick, 'click');
        
        // Calendar should close
        expect(calendar.classList.contains('visible')).toBe(false);
        
        // Change event should be fired
        expect(changeHandler).toHaveBeenCalled();
        
        // Input should have a value
        expect(input.value).not.toBe('');
      }
    });
  });

  describe('Time Picker Integration', () => {
    beforeEach(() => {
      // Set up a test environment for time picker
      document.body.innerHTML = '<persian-timepicker-element></persian-timepicker-element>';
    });

    test('time picker component renders in page without errors', () => {
      const pickerElement = document.querySelector('persian-timepicker-element');
      expect(pickerElement).not.toBeNull();
      expect(pickerElement?.shadowRoot).not.toBeNull();
    });

    test('time picker handles attribute changes', async () => {
      const pickerElement = document.querySelector('persian-timepicker-element') as HTMLElement;
      
      // Set the placeholder attribute
      pickerElement.setAttribute('placeholder', 'زمان جلسه');
      
      // Allow time for the attribute change to be processed
      await wait();
      
      // Check if the placeholder was applied
      const input = pickerElement!.shadowRoot!.querySelector('#time-input') as HTMLInputElement;
      expect(input.placeholder).toBe('زمان جلسه');
    });

    test('time picker toggles AM/PM correctly', async () => {
      const pickerElement = document.querySelector('persian-timepicker-element') as any;
      
      // Click the input to open time popup
      const input = pickerElement.shadowRoot.querySelector('#time-input');
      await dispatchEvent(input, 'click');
      
      // Popup should be visible
      const popup = pickerElement.shadowRoot.querySelector('#popup');
      expect(popup.classList.contains('visible')).toBe(true);
      
      // Get initial AM/PM state
      const amOption = pickerElement.shadowRoot.querySelector('#am-option');
      const pmOption = pickerElement.shadowRoot.querySelector('#pm-option');
      const initialAMSelected = amOption.classList.contains('selected');
      
      // Click the opposite option
      if (initialAMSelected) {
        await dispatchEvent(pmOption, 'click');
      } else {
        await dispatchEvent(amOption, 'click');
      }
      
      // Selection should change
      if (initialAMSelected) {
        expect(pmOption.classList.contains('selected')).toBe(true);
        expect(amOption.classList.contains('selected')).toBe(false);
      } else {
        expect(amOption.classList.contains('selected')).toBe(true);
        expect(pmOption.classList.contains('selected')).toBe(false);
      }
    });
  });
}); 