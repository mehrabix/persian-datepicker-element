/**
 * @jest-environment jsdom
 */
import { PersianDatePickerElement } from '../persian-datepicker-element';
import { EventUtils } from '../utils/event-utils';
import { waitForElement, waitFor } from './setup';

// Mock EventUtils
jest.mock('../utils/event-utils', () => ({
  EventUtils: {
    isHoliday: jest.fn().mockReturnValue(true),
    getEvents: jest.fn().mockReturnValue([
      { type: 'Iran', title: 'Test Holiday', holiday: true }
    ]),
    initialize: jest.fn().mockResolvedValue(undefined),
    refreshEvents: jest.fn(),
    getEventTypes: jest.fn().mockReturnValue(['Iran', 'AncientIran'])
  }
}));

describe('PersianDatePickerElement', () => {
  let element: PersianDatePickerElement;

  beforeEach(async () => {
    // Create element using document.createElement
    element = document.createElement('persian-datepicker-element') as PersianDatePickerElement;
    document.body.appendChild(element);
    // Wait for element to be ready
    await waitForElement(element);
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  test('should render without crashing', () => {
    expect(element).toBeTruthy();
    expect(element.shadowRoot).toBeTruthy();
  });

  test('should toggle calendar visibility when clicking the input', async () => {
    const input = element.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
    
    // Click input to show calendar
    input?.click();
    await waitFor(() => {
      const calendar = element.shadowRoot?.querySelector('.calendar.visible');
      return calendar !== null;
    });
    const calendar = element.shadowRoot?.querySelector('.calendar');
    expect(calendar).toBeTruthy();
    expect(calendar?.classList.contains('visible')).toBe(true);
    
    // Click input again to hide calendar
    input?.click();
    await waitFor(() => {
      const calendar = element.shadowRoot?.querySelector('.calendar.visible');
      return calendar === null;
    });
    expect(calendar?.classList.contains('visible')).toBe(false);
  });

  test('should set a date programmatically', async () => {
    element.setValue(1404, 1, 15);
    await waitFor(() => {
      const input = element.shadowRoot?.querySelector('input');
      return input?.value === '۱۴۰۴/۰۱/۱۵';
    });
    const input = element.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.value).toBe('۱۴۰۴/۰۱/۱۵');
  });

  test('should emit a change event when a date is selected', async () => {
    const changeHandler = jest.fn();
    element.addEventListener('change', changeHandler);
    
    element.setValue(1404, 1, 15);
    await waitFor(() => changeHandler.mock.calls.length > 0);
    
    expect(changeHandler).toHaveBeenCalled();
    const event = changeHandler.mock.calls[0][0];
    expect(event.detail.jalali).toEqual([1404, 1, 15]);
  });

  test('should pick up holidays from EventUtils', async () => {
    // Initialize the element
    element.connectedCallback();
    
    // Force a calendar render
    element.renderCalendar();
    await waitFor(() => {
      const days = element.shadowRoot?.querySelectorAll('.day');
      return days ? days.length > 0 : false;
    });

    // Check that isHoliday was called during rendering
    expect(EventUtils.isHoliday).toHaveBeenCalled();
    
    // Select a date that is a holiday
    element.setValue(1404, 1, 1);
    await waitFor(() => {
      const selectedDay = element.shadowRoot?.querySelector('.day.selected');
      return selectedDay?.classList.contains('holiday') === true;
    });
    
    // Check if the selected date is marked as a holiday
    const selectedDay = element.shadowRoot?.querySelector('.day.selected');
    expect(selectedDay).toBeTruthy();
    expect(selectedDay?.classList.contains('holiday')).toBe(true);
  });

  test('should add holiday classes to holiday dates', async () => {
    // Initialize the element
    element.connectedCallback();
    
    // Mock isHoliday to return true for specific dates
    (EventUtils.isHoliday as jest.Mock).mockImplementation((month, day) => {
      return month === 1 && day === 1;
    });
    
    // Force a calendar render
    element.renderCalendar();
    await waitFor(() => {
      const days = element.shadowRoot?.querySelectorAll('.day');
      return days ? days.length > 0 : false;
    });

    // Get all day elements
    const dateElements = element.shadowRoot?.querySelectorAll('.day');
    expect(dateElements).toBeTruthy();
    expect(dateElements?.length).toBeGreaterThan(0);
    
    // There should be at least one day with the holiday class
    const holidayElements = element.shadowRoot?.querySelectorAll('.day.holiday');
    expect(holidayElements).toBeTruthy();
    expect(holidayElements?.length).toBeGreaterThan(0);
  });

  test('should allow setting holiday types', async () => {
    element.setHolidayTypes(['Iran']);
    await waitFor(() => {
      const types = element.getHolidayTypes();
      return types.length === 1 && types[0] === 'Iran';
    });
    expect(element.getHolidayTypes()).toEqual(['Iran']);
    
    element.setHolidayTypes('all');
    await waitFor(() => element.isShowingAllTypes());
    expect(element.isShowingAllTypes()).toBe(true);
  });

  test('should support scrolling to selected items in dropdowns', async () => {
    // Initialize the element
    element.connectedCallback();
    
    // Set a date to trigger dropdown content creation
    element.setValue(1404, 1, 15);
    await waitFor(() => {
      const monthDropdown = element.shadowRoot?.querySelector('.month-select-content');
      const yearDropdown = element.shadowRoot?.querySelector('.year-select-content');
      return monthDropdown !== null && yearDropdown !== null;
    });
    
    // Get dropdown elements
    const monthDropdown = element.shadowRoot?.querySelector('.month-select-content');
    const yearDropdown = element.shadowRoot?.querySelector('.year-select-content');
    
    expect(monthDropdown).toBeTruthy();
    expect(yearDropdown).toBeTruthy();
    
    // Check if selected items exist
    const selectedMonth = monthDropdown?.querySelector('.select-item.selected');
    const selectedYear = yearDropdown?.querySelector('.select-item.selected');
    
    expect(selectedMonth).toBeTruthy();
    expect(selectedYear).toBeTruthy();
  });
}); 