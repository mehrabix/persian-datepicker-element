/**
 * @jest-environment jsdom
 */
import { PersianDatePickerElement } from '../persian-datepicker-element';
import { EventUtils } from '../utils/event-utils';
import { PersianEvent } from '../types';

// Mock EventUtils
jest.mock('../utils/event-utils', () => ({
  EventUtils: {
    isHoliday: jest.fn().mockImplementation((month, day) => {
      // Mock some holidays for testing
      if (month === 1 && day === 1) return true; // Nowruz
      if (month === 1 && day === 13) return true; // Nature Day
      return false;
    }),
    getHolidayTitles: jest.fn().mockImplementation((month, day) => {
      if (month === 1 && day === 1) return ['عید نوروز'];
      if (month === 1 && day === 13) return ['روز طبیعت'];
      return [];
    }),
    getAllEventTitles: jest.fn().mockImplementation((month, day) => {
      if (month === 1 && day === 1) return ['عید نوروز'];
      if (month === 1 && day === 13) return ['روز طبیعت'];
      if (month === 2 && day === 10) return ['روز کار'];
      return [];
    }),
    getAllHolidays: jest.fn().mockReturnValue([
      { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true },
      { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: true }
    ])
  }
}));

describe('PersianDatePickerElement', () => {
  let element: PersianDatePickerElement;

  beforeEach(() => {
    // Clear mock call history before each test
    jest.clearAllMocks();
    
    // Define the custom element if not already defined
    if (!customElements.get('persian-datepicker-element')) {
      customElements.define('persian-datepicker-element', PersianDatePickerElement);
    }
    
    // Create a new element for each test
    element = document.createElement('persian-datepicker-element') as PersianDatePickerElement;
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up after each test
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  it('should render without crashing', () => {
    expect(element).toBeTruthy();
    expect(element.shadowRoot).toBeTruthy();
    expect(element.shadowRoot?.querySelector('input')).toBeTruthy();
  });

  it('should toggle calendar visibility when clicking the input', () => {
    const input = element.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
    
    // Initially, calendar should be hidden
    let calendar = element.shadowRoot?.querySelector('.calendar');
    expect(calendar?.classList.contains('visible')).toBe(false);
    
    // Click the input to show calendar
    if (input) {
      input.click();
    }
    
    // Calendar should now be visible after click
    calendar = element.shadowRoot?.querySelector('.calendar');
    expect(calendar?.classList.contains('visible')).toBe(true);
    
    // Click again to hide
    if (input) {
      input.click();
    }
    
    // Should be hidden again
    calendar = element.shadowRoot?.querySelector('.calendar');
    expect(calendar?.classList.contains('visible')).toBe(false);
  });

  it('should set a date programmatically', () => {
    // Get a sample holiday from our mock data
    const holidayEvent = { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true };
    
    // Set the date programmatically
    element.setValue(1402, holidayEvent.month, holidayEvent.day);
    
    // Verify that the correct date was set
    const value = element.getValue();
    expect(value).not.toBeNull();
    expect(value).toEqual([1402, holidayEvent.month, holidayEvent.day]);
    
    // Check if the input displays the formatted date
    const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.value).toBeTruthy();
    expect(input.value).toContain('1402'); // Should contain the year
  });

  it('should emit a change event when a date is selected', () => {
    // Mock the event listener
    const mockCallback = jest.fn();
    element.addEventListener('change', mockCallback);
    
    // Select a date
    element.setValue(1402, 1, 1);
    
    // Verify the callback was called
    expect(mockCallback).toHaveBeenCalled();
    
    // Check the event details
    const eventDetail = mockCallback.mock.calls[0][0].detail;
    expect(eventDetail).toHaveProperty('jalali');
    expect(eventDetail.jalali).toEqual([1402, 1, 1]);
    expect(eventDetail).toHaveProperty('isHoliday');
    expect(eventDetail.isHoliday).toBe(true);
  });

  it('should pick up holidays from EventUtils', () => {
    // Show the calendar
    const input = element.shadowRoot?.querySelector('input');
    if (input) {
      input.click();
    }
    
    // Check that isHoliday was called during rendering
    expect(EventUtils.isHoliday).toHaveBeenCalled();
    
    // Select a date that is a holiday
    element.setValue(1402, 1, 1);
    
    // Should have called getHolidayTitles to get the holiday information
    expect(EventUtils.getHolidayTitles).toHaveBeenCalledWith(1, 1);
  });

  it('should add holiday classes to holiday dates', () => {
    // Show the calendar
    const input = element.shadowRoot?.querySelector('input');
    if (input) {
      input.click();
    }
    
    // Set to a month with holidays
    element.setValue(1402, 1, 15); // Setting to a non-holiday date in month 1
    
    // We're checking for elements with classes that denote holidays
    // This would typically be specific to your implementation
    const dateElements = element.shadowRoot?.querySelectorAll('.day');
    expect(dateElements?.length).toBeGreaterThan(0);
    
    // There should be at least one day with the holiday class
    const holidayElements = element.shadowRoot?.querySelectorAll('.day.holiday');
    expect(holidayElements?.length).toBeGreaterThan(0);
  });
}); 