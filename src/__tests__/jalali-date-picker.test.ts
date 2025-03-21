import { JalaliDatePicker, JalaliDateChangeEvent } from '../jalali-date-picker';
import { JalaliDate } from '../jalali-date';
import { wait, dispatchEvent, simulateKeyEvent } from './test-utils';

// Define the custom element before running tests
if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', JalaliDatePicker);
}

describe('JalaliDatePicker', () => {
  let picker: JalaliDatePicker;
  
  beforeEach(() => {
    // Create a new instance for each test
    document.body.innerHTML = '';
    picker = document.createElement('jalali-date-picker') as JalaliDatePicker;
    document.body.appendChild(picker);
  });
  
  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('component should be defined', () => {
    expect(customElements.get('jalali-date-picker')).toBeDefined();
    expect(picker).toBeInstanceOf(JalaliDatePicker);
  });
  
  test('should render the input field', () => {
    const input = picker.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
  });
  
  test('should have default placeholder text', () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.placeholder).toBe('انتخاب تاریخ');
  });
  
  test('should show calendar when input is clicked', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    const calendar = picker.shadowRoot?.querySelector('.calendar') as HTMLElement;
    
    expect(calendar.classList.contains('visible')).toBeFalsy();
    
    // Trigger click event
    await dispatchEvent(input, 'click');
    
    expect(calendar.classList.contains('visible')).toBeTruthy();
  });
  
  test('should hide calendar when clicking outside', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    const calendar = picker.shadowRoot?.querySelector('.calendar') as HTMLElement;
    
    // First show the calendar
    await dispatchEvent(input, 'click');
    expect(calendar.classList.contains('visible')).toBeTruthy();
    
    // Click outside
    await dispatchEvent(document.body, 'click');
    
    // Wait for event handling
    await wait(50);
    
    expect(calendar.classList.contains('visible')).toBeFalsy();
  });
  
  test('should render correct number of days for current month', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    // Show the calendar
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to render
    await wait(50);
    
    // Get the current month view
    const today = new Date();
    const jalaliToday = JalaliDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    
    const daysInMonth = JalaliDate.getDaysInMonth(jalaliToday[0], jalaliToday[1]);
    const daysElements = picker.shadowRoot?.querySelectorAll('.day:not(.empty)');
    
    expect(daysElements?.length).toBe(daysInMonth);
  });
  
  test('should update input value when a date is selected', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    // Show the calendar
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to render
    await wait(50);
    
    // Select the 15th day
    const dayElements = picker.shadowRoot?.querySelectorAll('.day:not(.empty)') as NodeListOf<HTMLElement>;
    if (dayElements.length >= 15) {
      const day15 = Array.from(dayElements).find(el => el.textContent?.trim() === '15');
      if (day15) {
        await dispatchEvent(day15, 'click');
        
        // Wait for selection to be processed
        await wait(50);
        
        // Check if the input has a value
        expect(input.value).not.toBe('');
        
        // The expected format is YYYY/MM/DD
        expect(input.value).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/);
      }
    }
  });
  
  test.skip('should emit change event when date is selected', async () => {
    let eventTriggered = false;
    let eventDetail: any = null;
    
    picker.addEventListener('datechange', (e: Event) => {
      eventTriggered = true;
      eventDetail = (e as CustomEvent).detail;
    });
    
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to render
    await wait(50);
    
    // Select the 10th day
    const dayElements = picker.shadowRoot?.querySelectorAll('.day:not(.empty)') as NodeListOf<HTMLElement>;
    if (dayElements.length >= 10) {
      const day10 = Array.from(dayElements).find(el => el.textContent?.trim() === '10');
      if (day10) {
        await dispatchEvent(day10, 'click');
        
        // Wait for event to be processed
        await wait(50);
        
        expect(eventTriggered).toBe(true);
        
        // Check the event details
        expect(eventDetail).toBeDefined();
        if (eventDetail) {
          expect(eventDetail.jalali).toBeDefined();
          expect(eventDetail.jalali.length).toBe(3);
          expect(eventDetail.gregorian).toBeDefined();
          expect(eventDetail.gregorian.length).toBe(3);
        }
      }
    }
  });
  
  test('should navigate to previous month when prev button is clicked', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to render
    await wait(50);
    
    // Get current month display
    const monthYearLabel = picker.shadowRoot?.querySelector('#month-year') as HTMLElement;
    const initialText = monthYearLabel.textContent;
    
    // Click prev button
    const prevButton = picker.shadowRoot?.querySelector('.nav-button.prev') as HTMLElement;
    await dispatchEvent(prevButton, 'click');
    
    // Wait for update
    await wait(50);
    
    // Check if the month display changed
    expect(monthYearLabel.textContent).not.toBe(initialText);
  });
  
  test('should navigate to next month when next button is clicked', async () => {
    const input = picker.shadowRoot?.querySelector('input') as HTMLInputElement;
    await dispatchEvent(input, 'click');
    
    // Wait for calendar to render
    await wait(50);
    
    // Get current month display
    const monthYearLabel = picker.shadowRoot?.querySelector('#month-year') as HTMLElement;
    const initialText = monthYearLabel.textContent;
    
    // Click next button
    const nextButton = picker.shadowRoot?.querySelector('.nav-button.next') as HTMLElement;
    await dispatchEvent(nextButton, 'click');
    
    // Wait for update
    await wait(50);
    
    // Check if the month display changed
    expect(monthYearLabel.textContent).not.toBe(initialText);
  });
}); 