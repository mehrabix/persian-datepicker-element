import { PersianDate } from '../../../utils/persian-date';
import { PersianDatePickerElement } from '../persian-datepicker-element';
import { dispatchEvent, wait } from '../../../__test-utils__';

// Define the custom element before running tests
if (!customElements.get('persian-datepicker-element')) {
  customElements.define('persian-datepicker-element', PersianDatePickerElement);
}

describe('PersianDatePickerElement', () => {
  let picker: PersianDatePickerElement;
  
  beforeEach(() => {
    // Create a new instance for each test
    document.body.innerHTML = '';
    picker = document.createElement('persian-datepicker-element') as PersianDatePickerElement;
    document.body.appendChild(picker);
  });
  
  afterEach(() => {
    document.body.removeChild(picker);
  });
  
  describe('initialization', () => {
    test('creates a shadow DOM with required elements', () => {
      const shadow = picker.shadowRoot;
      expect(shadow).not.toBeNull();
      
      // Check for key elements
      expect(shadow?.querySelector('input')).not.toBeNull();
      expect(shadow?.querySelector('.calendar')).not.toBeNull();
      expect(shadow?.querySelector('.day-names')).not.toBeNull();
      expect(shadow?.querySelector('.days')).not.toBeNull();
    });
    
    test('initializes with today as the default calendar view', () => {
      const today = new Date();
      const jalaliToday = PersianDate.gregorianToJalali(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      
      const monthYearText = picker.shadowRoot?.querySelector('.month-year')?.textContent;
      expect(monthYearText).toContain(PersianDate.getMonthName(jalaliToday[1]));
      expect(monthYearText).toContain(jalaliToday[0].toString());
    });
    
    test('applies custom options passed to constructor', () => {
      document.body.removeChild(picker);
      
      picker = new PersianDatePickerElement({
        placeholder: 'تست تاریخ',
        cssVariables: {
          '--jdp-primary': '#ff0000'
        }
      });
      document.body.appendChild(picker);
      
      const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input.placeholder).toBe('تست تاریخ');
      
      // Check if custom CSS variable was applied
      expect(picker.style.getPropertyValue('--jdp-primary')).toBe('#ff0000');
    });
  });
  
  describe('calendar navigation', () => {
    test('changes month when clicking prev/next buttons', async () => {
      // Get current month displayed
      const monthYearLabel = picker.shadowRoot?.querySelector('.month-year') as HTMLElement;
      const initialText = monthYearLabel.textContent;
      
      // Click next month button
      const nextButton = picker.shadowRoot?.querySelector('.nav-button.next') as HTMLElement;
      await dispatchEvent(nextButton, 'click');
      
      // Month should have changed
      expect(monthYearLabel.textContent).not.toBe(initialText);
      
      // Click previous month button to go back
      const prevButton = picker.shadowRoot?.querySelector('.nav-button.prev') as HTMLElement;
      await dispatchEvent(prevButton, 'click');
      
      // Should be back to initial month/year
      expect(monthYearLabel.textContent).toBe(initialText);
    });
    
    test('handles year boundary correctly when navigating months', async () => {
      // Set up a test case with the last month of a year
      const jalaliDate = [1403, 12, 1]; // Year 1403, month 12 (Esfand)
      (picker as any).jalaliYear = jalaliDate[0];
      (picker as any).jalaliMonth = jalaliDate[1];
      (picker as any).renderCalendar();
      
      // Get initial year and month
      const initialYear = (picker as any).jalaliYear;
      const initialMonth = (picker as any).jalaliMonth;
      
      // Click next month (should go to next year)
      const nextButton = picker.shadowRoot?.querySelector('.nav-button.next') as HTMLElement;
      await dispatchEvent(nextButton, 'click');
      
      // Year should increase by 1
      expect((picker as any).jalaliYear).toBe(initialYear + 1);
      expect((picker as any).jalaliMonth).toBe(1); // Should be first month of new year
      
      // Click previous month (should go back to original year and month)
      const prevButton = picker.shadowRoot?.querySelector('.nav-button.prev') as HTMLElement;
      await dispatchEvent(prevButton, 'click');
      
      expect((picker as any).jalaliYear).toBe(initialYear);
      expect((picker as any).jalaliMonth).toBe(initialMonth);
    });
  });
  
  describe('date selection', () => {
    test('selects a date when clicking on a day', async () => {
      // Open calendar
      const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
      await dispatchEvent(input, 'click');
      
      // Calendar should be visible
      const calendar = picker.shadowRoot?.querySelector('.calendar') as HTMLElement;
      expect(calendar.classList.contains('visible')).toBe(true);
      
      // Click on day 15 of current month
      const days = picker.shadowRoot?.querySelectorAll('.day:not(.empty)');
      const day15 = Array.from(days || []).find(el => el.textContent === '15');
      expect(day15).not.toBeUndefined();
      
      await dispatchEvent(day15!, 'click');
      
      // Calendar should close
      expect(calendar.classList.contains('visible')).toBe(false);
      
      // Selected date should be set
      const selectedDate = picker.getValue();
      expect(selectedDate).not.toBeNull();
      expect(selectedDate![2]).toBe(15); // Day should be 15
      
      // Input should have a formatted date
      expect(input.value).not.toBe('');
    });
    
    test('formats date according to format option', async () => {
      // Set a custom format
      picker.setAttribute('format', 'YYYY-MM-DD');
      
      // Select date programmatically
      picker.setValue(1400, 7, 15);
      
      // Check formatted value
      const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('1400-07-15');
    });
    
    test('clears selected date with clear method', async () => {
      // First set a date
      picker.setValue(1400, 7, 15);
      
      // Verify it's set
      expect(picker.getValue()).not.toBeNull();
      
      // Clear the date
      picker.clear();
      
      // Verify it's cleared
      expect(picker.getValue()).toBeNull();
      
      // Input should be empty
      const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });
  
  describe('event handling', () => {
    test('dispatches change event when date is selected', async () => {
      const changeHandler = jest.fn();
      picker.addEventListener('change', changeHandler);
      
      // Open calendar
      const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
      await dispatchEvent(input, 'click');
      
      // Click on day 15 of current month
      const days = picker.shadowRoot?.querySelectorAll('.day:not(.empty)');
      const day15 = Array.from(days || []).find(el => el.textContent === '15');
      
      if (day15) {
        await dispatchEvent(day15, 'click');
        
        // Event should be fired
        expect(changeHandler).toHaveBeenCalled();
        
        // The event detail should contain the selected date
        const eventDetail = changeHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty('jalali');
        expect(eventDetail).toHaveProperty('gregorian');
        expect(eventDetail.jalali[2]).toBe(15); // Day should be 15
      } else {
        fail('Could not find day 15 in the calendar');
      }
    });
  });
}); 