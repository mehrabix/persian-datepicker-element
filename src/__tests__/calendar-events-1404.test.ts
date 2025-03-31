/**
 * @jest-environment jsdom
 */
import { PersianDatePickerElement } from '../persian-datepicker-element';
import { EventUtils } from '../utils/event-utils';
import { PersianEvent } from '../types';
import { waitForElement, waitFor } from './setup';

// Mock EventUtils
jest.mock('../utils/event-utils', () => ({
  EventUtils: {
    isHoliday: jest.fn().mockReturnValue(true),
    getEvents: jest.fn().mockReturnValue([
      { type: 'Iran', title: 'عید نوروز', holiday: true }
    ]),
    initialize: jest.fn().mockResolvedValue(undefined),
    refreshEvents: jest.fn(),
    getEventTypes: jest.fn().mockReturnValue(['Iran', 'AncientIran'])
  }
}));

describe('Persian Datepicker 1404 Events Tests', () => {
  let element: PersianDatePickerElement;
  const persianYear = 1404;

  beforeEach(async () => {
    // Create element using document.createElement
    element = document.createElement('persian-datepicker-element') as PersianDatePickerElement;
    document.body.appendChild(element);
    // Wait for element to be ready
    await waitForElement(element);
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  describe('Farvardin 1404 Events', () => {
    beforeEach(async () => {
      // Set to Farvardin 1404
      element.setValue(persianYear, 1, 1);
      await waitFor(() => {
        const days = element.shadowRoot?.querySelectorAll('.day');
        return days ? days.length > 0 : false;
      });
    });

    test('Nowruz (1st of Farvardin) should be marked as a holiday', async () => {
      // Mock isHoliday for Nowruz
      (EventUtils.isHoliday as jest.Mock).mockImplementation((month, day) => {
        return month === 1 && day === 1;
      });
      
      // Force calendar render
      element.renderCalendar();
      await waitFor(() => {
        const days = element.shadowRoot?.querySelectorAll('.day');
        return days ? days.length > 0 : false;
      });
      
      // Verify isHoliday was called with correct parameters
      expect(EventUtils.isHoliday).toHaveBeenCalledWith(1, 1, expect.any(Array), expect.any(Boolean));
      
      // Get all day elements
      const allDays = Array.from(element.shadowRoot?.querySelectorAll('.day') || []);
      
      // Log day elements for debugging
      console.log('All day elements:', allDays.map(day => ({
        text: day.textContent,
        empty: day.classList.contains('empty'),
        date: day.getAttribute('data-date'),
        holiday: day.classList.contains('holiday')
      })));
      
      // Find the day element for Nowruz
      const nowruzDay = allDays.find(day => {
        const date = day.getAttribute('data-date');
        return date === '1' && !day.classList.contains('empty');
      });
      
      expect(nowruzDay).toBeTruthy();
      expect(nowruzDay?.classList.contains('holiday')).toBe(true);
    });

    test('Nature Day (13th of Farvardin) should be marked as a holiday', async () => {
      // Mock isHoliday for Nature Day
      (EventUtils.isHoliday as jest.Mock).mockImplementation((month, day, types) => {
        return month === 1 && day === 13 && types.includes('AncientIran');
      });
      
      // Set holiday types to include AncientIran
      element.setHolidayTypes(['AncientIran']);
      
      // Set to 13th of Farvardin
      element.setValue(persianYear, 1, 13);
      
      // Force calendar render
      element.renderCalendar();
      
      // Wait for calendar to be rendered
      await waitFor(() => {
        const days = element.shadowRoot?.querySelectorAll('.day');
        return days ? days.length > 0 : false;
      });
      
      // Verify isHoliday was called with correct parameters
      expect(EventUtils.isHoliday).toHaveBeenCalledWith(1, 13, ['AncientIran'], false);
      
      // Get all day elements
      const allDays = Array.from(element.shadowRoot?.querySelectorAll('.day') || []);
      
      // Log day elements for debugging
      console.log('All day elements:', allDays.map(day => ({
        text: day.textContent,
        empty: day.classList.contains('empty'),
        date: day.getAttribute('data-date'),
        holiday: day.classList.contains('holiday')
      })));
      
      // Find the day element for Nature Day
      const natureDay = allDays.find(day => {
        const date = day.getAttribute('data-date');
        return date === '13' && !day.classList.contains('empty');
      });
      
      expect(natureDay).toBeTruthy();
      expect(natureDay?.classList.contains('holiday')).toBe(true);
    });
  });

  describe('Religious Holiday Tests', () => {
    test('should filter events by holiday type when attribute is set', async () => {
      // Mock getEvents to return different types of events
      (EventUtils.getEvents as jest.Mock).mockImplementation((month, day, types) => {
        if (types && types.includes('AncientIran')) {
          return [{ type: 'AncientIran', title: 'Ancient Holiday', holiday: true }];
        }
        return [
          { type: 'Iran', title: 'Iranian Holiday', holiday: true },
          { type: 'AncientIran', title: 'Ancient Holiday', holiday: true }
        ];
      });
      
      // Set initial date
      element.setValue(persianYear, 1, 15);
      
      // Force calendar render
      element.renderCalendar();
      
      // Wait for calendar to be rendered
      await waitFor(() => {
        const days = element.shadowRoot?.querySelectorAll('.day');
        return days ? days.length > 0 : false;
      });
      
      // Verify getEvents was called with default holiday types
      expect(EventUtils.getEvents).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        expect.arrayContaining(['Iran', 'AncientIran', 'International']),
        false
      );
      
      // Set holiday types to only include AncientIran
      element.setHolidayTypes(['AncientIran']);
      
      // Force calendar render again
      element.renderCalendar();
      
      // Wait for calendar to be rendered
      await waitFor(() => {
        const days = element.shadowRoot?.querySelectorAll('.day');
        return days ? days.length > 0 : false;
      });
      
      // Log day elements for debugging
      console.log('All day elements after setting holiday types:', Array.from(element.shadowRoot?.querySelectorAll('.day') || []).map(day => ({
        text: day.textContent,
        empty: day.classList.contains('empty'),
        date: day.getAttribute('data-date'),
        holiday: day.classList.contains('holiday')
      })));
      
      // Verify getEvents was called with updated holiday types
      expect(EventUtils.getEvents).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        ['AncientIran'],
        false
      );
    });
  });
}); 