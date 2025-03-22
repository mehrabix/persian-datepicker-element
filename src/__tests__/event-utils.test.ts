import { EventUtils } from '../utils/event-utils';
import { PersianEvent } from '../types';
import persianCalendarData from '../data/persian-calendar-repo/PersianCalendar/data/events.json';

/**
 * Mock of Persian calendar events for testing
 */
const mockEvents: PersianEvent[] = [
  { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true },
  { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: true },
  { title: 'روز کار', month: 2, day: 10, type: 'International', holiday: false },
  { title: 'عید فطر', month: 4, day: 5, type: 'Religious', holiday: true },
  { title: 'رحلت امام خمینی', month: 3, day: 14, type: 'Iran', holiday: true },
];

// Save the original implementation
const originalGetAllEvents = EventUtils.getAllEvents;

/**
 * Setup test environment before running tests
 */
beforeAll(() => {
  // Mock the EventUtils.getAllEvents method to return predictable test data
  EventUtils.getAllEvents = jest.fn(() => mockEvents);
});

/**
 * Restore original implementation after tests
 */
afterAll(() => {
  // Restore the original implementation
  (EventUtils.getAllEvents as jest.Mock).mockRestore();
  // Explicitly casting back to original type
  (EventUtils as any).getAllEvents = originalGetAllEvents;
});

/**
 * Test suite for EventUtils module
 */
describe('EventUtils', () => {
  /**
   * Test getAllEvents method
   */
  it('should return all events', () => {
    const events = EventUtils.getAllEvents();
    expect(events).toEqual(mockEvents);
    expect(events.length).toBe(mockEvents.length);
  });

  /**
   * Test getEvents method with specific date
   */
  it('should return events for a specific date', () => {
    // Test with a date that has events
    const events1 = EventUtils.getEvents(1, 1);
    expect(events1.length).toBe(1);
    expect(events1[0].title).toBe('عید نوروز');

    // Test with another date that has events
    const events2 = EventUtils.getEvents(1, 13);
    expect(events2.length).toBe(1);
    expect(events2[0].title).toBe('روز طبیعت');

    // Test with a date that has no events
    const events3 = EventUtils.getEvents(5, 5);
    expect(events3.length).toBe(0);
  });

  /**
   * Test isHoliday method
   */
  it('should correctly identify holidays', () => {
    // Test with a holiday date
    expect(EventUtils.isHoliday(1, 1)).toBe(true);
    
    // Test with a non-holiday date
    expect(EventUtils.isHoliday(2, 10)).toBe(false);
    
    // Test with a date that has no events
    expect(EventUtils.isHoliday(5, 5)).toBe(false);
  });

  /**
   * Test getHolidayTitles method
   */
  it('should return holiday titles for a specific date', () => {
    // Test with a holiday date
    const titles1 = EventUtils.getHolidayTitles(1, 1);
    expect(titles1.length).toBe(1);
    expect(titles1[0]).toBe('عید نوروز');
    
    // Test with a non-holiday date
    const titles2 = EventUtils.getHolidayTitles(2, 10);
    expect(titles2.length).toBe(0);
    
    // Test with a date that has no events
    const titles3 = EventUtils.getHolidayTitles(5, 5);
    expect(titles3.length).toBe(0);
  });

  /**
   * Test getAllEventTitles method
   */
  it('should return all event titles for a specific date', () => {
    // Test with a date that has events
    const titles1 = EventUtils.getAllEventTitles(1, 1);
    expect(titles1.length).toBe(1);
    expect(titles1[0]).toBe('عید نوروز');
    
    // Test with a date that has no events
    const titles2 = EventUtils.getAllEventTitles(5, 5);
    expect(titles2.length).toBe(0);
  });

  /**
   * Test actual JSON data - real integration test
   */
  it('should load actual events from Persian Calendar JSON', () => {
    // Restore original implementation for this test
    (EventUtils as any).getAllEvents = originalGetAllEvents;
    
    // Get all events from actual implementation
    const events = EventUtils.getAllEvents();
    
    // Verify we have events
    expect(events.length).toBeGreaterThan(0);
    
    // Check that the mapping structure works
    events.forEach((event: PersianEvent) => {
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('month');
      expect(event).toHaveProperty('day');
      expect(event).toHaveProperty('type');
      expect(event).toHaveProperty('holiday');
    });
    
    // Restore the mock for other tests
    EventUtils.getAllEvents = jest.fn(() => mockEvents);
  });

  /**
   * Test getEventsByType method
   */
  it('should return events by type', () => {
    const iranEvents = EventUtils.getEventsByType('Iran');
    expect(iranEvents.length).toBe(3);
    
    const religiousEvents = EventUtils.getEventsByType('Religious');
    expect(religiousEvents.length).toBe(1);
    
    const internationalEvents = EventUtils.getEventsByType('International');
    expect(internationalEvents.length).toBe(1);
  });

  /**
   * Test getAllHolidays method
   */
  it('should return all holidays', () => {
    const holidays = EventUtils.getAllHolidays();
    expect(holidays.length).toBe(4);
    
    // Verify that all returned events are holidays
    expect(holidays.every(event => event.holiday === true)).toBe(true);
  });

  /**
   * Test getSourceMetadata method
   */
  it('should return source metadata', () => {
    const metadata = EventUtils.getSourceMetadata();
    expect(metadata).toBeDefined();
    expect(metadata).toHaveProperty('Iran');
  });
}); 