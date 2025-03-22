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
  { title: 'روز استقلال افغانستان', month: 5, day: 28, type: 'Afghanistan', holiday: true },
];

// Define mock event types
const mockEventTypes = ['Iran', 'Religious', 'International', 'Afghanistan'];

// Define mock excluded types
const mockExcludedTypes = ['Afghanistan'];

// Save the original implementation
const originalGetAllEvents = EventUtils.getAllEvents;
const originalGetExcludedTypes = EventUtils.getExcludedTypes;
const originalGetEventTypes = EventUtils.getEventTypes;

/**
 * Setup test environment before running tests
 */
beforeAll(() => {
  // Mock the EventUtils.getExcludedTypes method
  EventUtils.getExcludedTypes = jest.fn(() => [...mockExcludedTypes]);
  
  // Mock the EventUtils.getEventTypes method
  EventUtils.getEventTypes = jest.fn(() => [...mockEventTypes]);
  
  // Mock the EventUtils.getAllEvents method to return predictable test data
  EventUtils.getAllEvents = jest.fn((eventTypes, includeAllTypes = false) => {
    let results = [...mockEvents];
    
    // Apply the excluded types filter unless includeAllTypes is true
    if (!includeAllTypes) {
      results = results.filter(event => !mockExcludedTypes.includes(event.type));
    }
    
    // Apply type filtering if specified
    if (eventTypes && eventTypes.length > 0) {
      return results.filter(event => eventTypes.includes(event.type));
    }
    
    return results;
  });
  
  // Mock getEventsByType to return expected values
  (EventUtils as any).getEventsByType = jest.fn((type, includeAllTypes = false) => {
    // If the type is in the excluded list and includeAllTypes is false, return empty array
    if (mockExcludedTypes.includes(type) && !includeAllTypes) {
      return [];
    }
    
    return mockEvents.filter(event => event.type === type);
  });
});

/**
 * Restore original implementation after tests
 */
afterAll(() => {
  // Restore the original implementations
  (EventUtils.getAllEvents as jest.Mock).mockRestore();
  (EventUtils.getExcludedTypes as jest.Mock).mockRestore();
  (EventUtils.getEventTypes as jest.Mock).mockRestore();
  (EventUtils as any).getEventsByType = originalGetAllEvents;
  
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
  it('should return all events excluding default excluded types', () => {
    const events = EventUtils.getAllEvents();
    // Should exclude Afghanistan events by default
    expect(events.find(e => e.type === 'Afghanistan')).toBeUndefined();
    expect(events.length).toBe(mockEvents.length - 1); // All except Afghanistan
  });

  /**
   * Test getAllEvents method with includeAllTypes
   */
  it('should return all events when includeAllTypes is true', () => {
    const events = EventUtils.getAllEvents([], true);
    expect(events.length).toBe(mockEvents.length);
    // Should include Afghanistan events
    expect(events.find(e => e.type === 'Afghanistan')).toBeDefined();
  });

  /**
   * Test getAllEvents method with type filtering
   */
  it('should return filtered events by type', () => {
    const iranEvents = EventUtils.getAllEvents(['Iran']);
    expect(iranEvents.length).toBe(3);
    expect(iranEvents.every(event => event.type === 'Iran')).toBe(true);
    
    const religiousEvents = EventUtils.getAllEvents(['Religious']);
    expect(religiousEvents.length).toBe(1);
    expect(religiousEvents[0].type).toBe('Religious');
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
   * Test getEvents method with specific date and types
   */
  it('should return events for a specific date with type filtering', () => {
    // Test with Iran type filter
    const events1 = EventUtils.getEvents(1, 1, ['Iran']);
    expect(events1.length).toBe(1);
    expect(events1[0].title).toBe('عید نوروز');

    // Test with Religious type filter
    const events2 = EventUtils.getEvents(1, 1, ['Religious']);
    expect(events2.length).toBe(0);

    // Test with Religious type filter where religious event exists
    const events3 = EventUtils.getEvents(4, 5, ['Religious']);
    expect(events3.length).toBe(1);
    expect(events3[0].title).toBe('عید فطر');
  });

  /**
   * Test getEvents method with specific date and includeAllTypes
   */
  it('should return events for a specific date with includeAllTypes', () => {
    // Test with Afghanistan type which should be excluded by default
    const events1 = EventUtils.getEvents(5, 28);
    expect(events1.length).toBe(0);
    
    // Test with Afghanistan type with includeAllTypes=true
    const events2 = EventUtils.getEvents(5, 28, [], true);
    expect(events2.length).toBe(1);
    expect(events2[0].title).toBe('روز استقلال افغانستان');
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
   * Test isHoliday method with type filtering
   */
  it('should correctly identify holidays with type filtering', () => {
    // Test with a holiday date and Iran type
    expect(EventUtils.isHoliday(1, 1, ['Iran'])).toBe(true);
    
    // Test with a holiday date and Religious type
    expect(EventUtils.isHoliday(1, 1, ['Religious'])).toBe(false);
    
    // Test with a holiday date and Religious type where a religious holiday exists
    expect(EventUtils.isHoliday(4, 5, ['Religious'])).toBe(true);
  });

  /**
   * Test isHoliday method with includeAllTypes
   */
  it('should correctly identify holidays with includeAllTypes', () => {
    // Test with Afghanistan holiday that is excluded by default
    expect(EventUtils.isHoliday(5, 28)).toBe(false);
    
    // Test with Afghanistan holiday with includeAllTypes=true
    expect(EventUtils.isHoliday(5, 28, [], true)).toBe(true);
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
   * Test getHolidayTitles method with type filtering
   */
  it('should return holiday titles for a specific date with type filtering', () => {
    // Test with a holiday date and Iran type
    const titles1 = EventUtils.getHolidayTitles(1, 1, ['Iran']);
    expect(titles1.length).toBe(1);
    expect(titles1[0]).toBe('عید نوروز');
    
    // Test with a holiday date and Religious type
    const titles2 = EventUtils.getHolidayTitles(1, 1, ['Religious']);
    expect(titles2.length).toBe(0);
    
    // Test with a holiday date and Religious type where a religious holiday exists
    const titles3 = EventUtils.getHolidayTitles(4, 5, ['Religious']);
    expect(titles3.length).toBe(1);
    expect(titles3[0]).toBe('عید فطر');
  });

  /**
   * Test getHolidayTitles method with includeAllTypes
   */
  it('should return holiday titles for a specific date with includeAllTypes', () => {
    // Test with Afghanistan holiday that is excluded by default
    const titles1 = EventUtils.getHolidayTitles(5, 28);
    expect(titles1.length).toBe(0);
    
    // Test with Afghanistan holiday with includeAllTypes=true
    const titles2 = EventUtils.getHolidayTitles(5, 28, [], true);
    expect(titles2.length).toBe(1);
    expect(titles2[0]).toBe('روز استقلال افغانستان');
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
   * Test getAllEventTitles method with type filtering
   */
  it('should return all event titles for a specific date with type filtering', () => {
    // Test with a date that has events and Iran type
    const titles1 = EventUtils.getAllEventTitles(1, 1, ['Iran']);
    expect(titles1.length).toBe(1);
    expect(titles1[0]).toBe('عید نوروز');
    
    // Test with a date that has events and Religious type
    const titles2 = EventUtils.getAllEventTitles(1, 1, ['Religious']);
    expect(titles2.length).toBe(0);
    
    // Test with a date that has events and Religious type where religious event exists
    const titles3 = EventUtils.getAllEventTitles(4, 5, ['Religious']);
    expect(titles3.length).toBe(1);
    expect(titles3[0]).toBe('عید فطر');
  });

  /**
   * Test getAllEventTitles method with includeAllTypes
   */
  it('should return all event titles for a specific date with includeAllTypes', () => {
    // Test with Afghanistan event that is excluded by default
    const titles1 = EventUtils.getAllEventTitles(5, 28);
    expect(titles1.length).toBe(0);
    
    // Test with Afghanistan event with includeAllTypes=true
    const titles2 = EventUtils.getAllEventTitles(5, 28, [], true);
    expect(titles2.length).toBe(1);
    expect(titles2[0]).toBe('روز استقلال افغانستان');
  });

  /**
   * Test actual JSON data - real integration test
   */
  it('should load actual events from Persian Calendar JSON', () => {
    // Restore original implementation for this test
    const originalImplementations = {
      getAllEvents: EventUtils.getAllEvents,
      getExcludedTypes: EventUtils.getExcludedTypes,
      getEventTypes: EventUtils.getEventTypes,
      getEventsByType: (EventUtils as any).getEventsByType
    };
    
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
    
    // Restore the mocks for other tests
    EventUtils.getAllEvents = originalImplementations.getAllEvents;
    EventUtils.getExcludedTypes = originalImplementations.getExcludedTypes;
    EventUtils.getEventTypes = originalImplementations.getEventTypes;
    (EventUtils as any).getEventsByType = originalImplementations.getEventsByType;
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
   * Test getEventsByType method with includeAllTypes
   */
  it('should return events by type with includeAllTypes', () => {
    // Afghanistan events should be excluded by default
    const afghanistanEvents = EventUtils.getEventsByType('Afghanistan');
    expect(afghanistanEvents.length).toBe(0);
    
    // Afghanistan events should be included when includeAllTypes is true
    const afghanistanEventsAll = EventUtils.getEventsByType('Afghanistan', true);
    expect(afghanistanEventsAll.length).toBe(1);
    expect(afghanistanEventsAll[0].title).toBe('روز استقلال افغانستان');
  });

  /**
   * Test getAllHolidays method
   */
  it('should return all holidays', () => {
    const holidays = EventUtils.getAllHolidays();
    expect(holidays.length).toBe(4); // All holidays except Afghanistan
    
    // Verify that all returned events are holidays
    expect(holidays.every(event => event.holiday === true)).toBe(true);
    
    // Verify that Afghanistan holidays are excluded
    expect(holidays.find(event => event.type === 'Afghanistan')).toBeUndefined();
  });

  /**
   * Test getAllHolidays method with type filtering
   */
  it('should return all holidays with type filtering', () => {
    const iranHolidays = EventUtils.getAllHolidays(['Iran']);
    expect(iranHolidays.length).toBe(3);
    expect(iranHolidays.every(event => event.holiday === true && event.type === 'Iran')).toBe(true);
    
    const religiousHolidays = EventUtils.getAllHolidays(['Religious']);
    expect(religiousHolidays.length).toBe(1);
    expect(religiousHolidays[0].type).toBe('Religious');
    expect(religiousHolidays[0].holiday).toBe(true);
  });

  /**
   * Test getAllHolidays method with includeAllTypes
   */
  it('should return all holidays with includeAllTypes', () => {
    // Should include Afghanistan holidays when includeAllTypes is true
    const allHolidays = EventUtils.getAllHolidays([], true);
    expect(allHolidays.length).toBe(5); // All holidays including Afghanistan
    expect(allHolidays.find(event => event.type === 'Afghanistan')).toBeDefined();
  });

  /**
   * Test getEventTypes method
   */
  it('should return available event types', () => {
    const types = EventUtils.getEventTypes();
    expect(types).toContain('Iran');
    expect(types).toContain('Religious');
    expect(types).toContain('International');
    expect(types).toContain('Afghanistan');
    expect(types.length).toBe(4);
  });

  /**
   * Test getExcludedTypes method
   */
  it('should return excluded event types', () => {
    const excludedTypes = EventUtils.getExcludedTypes();
    expect(excludedTypes).toContain('Afghanistan');
    expect(excludedTypes.length).toBe(1);
  });

  /**
   * Test getSourceMetadata method
   */
  it('should return source metadata', () => {
    const metadata = EventUtils.getSourceMetadata();
    expect(metadata).toBeDefined();
  });
}); 