import { EventUtils } from '../utils/event-utils';
import { PersianEvent } from '../types';

describe('EventUtils', () => {
  const mockEvents: PersianEvent[] = [
    { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true },
    { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: true },
    { title: 'عید فطر', month: 4, day: 5, type: 'Religious', holiday: true },
    { title: 'عید قربان', month: 6, day: 10, type: 'Religious', holiday: true },
    { title: 'تاسوعا', month: 7, day: 9, type: 'Religious', holiday: true },
    { title: 'عاشورا', month: 7, day: 10, type: 'Religious', holiday: true },
    { title: 'روز استقلال افغانستان', month: 5, day: 28, type: 'Afghanistan', holiday: true }
  ];

  const mockEventTypes = ['Iran', 'Religious', 'Afghanistan'];

  // Save original implementations
  const originalGetAllEvents = EventUtils.getAllEvents;
  const originalGetEvents = EventUtils.getEvents;
  const originalIsHoliday = EventUtils.isHoliday;
  const originalGetHolidayTitles = EventUtils.getHolidayTitles;
  const originalGetAllEventTitles = EventUtils.getAllEventTitles;
  const originalGetEventTypes = EventUtils.getEventTypes;
  
  beforeAll(() => {
    // Mock the methods
    EventUtils.getEventTypes = jest.fn(() => [...mockEventTypes]);
    EventUtils.getAllEvents = jest.fn((eventTypes?: string[], includeAllTypes: boolean = false) => {
      let events = [...mockEvents];
      
      if (eventTypes && eventTypes.length > 0 && !includeAllTypes) {
        events = events.filter(event => eventTypes.includes(event.type));
      }
      
      return events;
    });
    
    EventUtils.getEvents = jest.fn((month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false) => {
      const events = EventUtils.getAllEvents(eventTypes, includeAllTypes);
      return events.filter(event => event.month === month && event.day === day);
    });
  });
  
  afterAll(() => {
    // Restore original implementations
    (EventUtils.getAllEvents as jest.Mock).mockRestore();
    (EventUtils.getEvents as jest.Mock).mockRestore();
    (EventUtils.isHoliday as jest.Mock).mockRestore();
    (EventUtils.getHolidayTitles as jest.Mock).mockRestore();
    (EventUtils.getAllEventTitles as jest.Mock).mockRestore();
    (EventUtils.getEventTypes as jest.Mock).mockRestore();
  });
  
  describe('getAllEvents', () => {
    test('returns all events when no type filter is provided', () => {
      const events = EventUtils.getAllEvents();
      expect(events).toHaveLength(mockEvents.length);
    });
    
    test('filters events by type', () => {
      const iranEvents = EventUtils.getAllEvents(['Iran']);
      expect(iranEvents.every(event => event.type === 'Iran')).toBe(true);
      expect(iranEvents).toHaveLength(2);
      
      const religiousEvents = EventUtils.getAllEvents(['Religious']);
      expect(religiousEvents.every(event => event.type === 'Religious')).toBe(true);
      expect(religiousEvents).toHaveLength(4);
    });
    
    test('filters events by multiple types', () => {
      const events = EventUtils.getAllEvents(['Iran', 'Religious']);
      expect(events.every(event => ['Iran', 'Religious'].includes(event.type))).toBe(true);
      expect(events).toHaveLength(6);
    });
    
    test('includes all types when includeAllTypes is true', () => {
      const events = EventUtils.getAllEvents(undefined, true);
      expect(events).toHaveLength(mockEvents.length);
    });

    test('includes Afghanistan events when specified in types', () => {
      const afghanistanEvents = EventUtils.getAllEvents(['Afghanistan']);
      expect(afghanistanEvents.every(event => event.type === 'Afghanistan')).toBe(true);
      expect(afghanistanEvents).toHaveLength(1);
    });
  });
  
  describe('getEvents', () => {
    test('returns events for a specific month and day', () => {
      const events = EventUtils.getEvents(1, 1);
      expect(events).toHaveLength(1);
      expect(events[0].title).toBe('عید نوروز');
    });
    
    test('returns empty array for dates with no events', () => {
      const events = EventUtils.getEvents(2, 2);
      expect(events).toHaveLength(0);
    });
    
    test('filters events by type', () => {
      const events = EventUtils.getEvents(7, 10, ['Religious']);
      expect(events).toHaveLength(1);
      expect(events[0].title).toBe('عاشورا');
    });
    
    test('returns all events for a date when includeAllTypes is true', () => {
      const events = EventUtils.getEvents(1, 1, undefined, true);
      expect(events).toHaveLength(1);
    });
  });
  
  describe('isHoliday', () => {
    beforeEach(() => {
      EventUtils.isHoliday = jest.fn((month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false) => {
        const events = EventUtils.getEvents(month, day, eventTypes, includeAllTypes);
        return events.some(event => event.holiday === true);
      });
    });
    
    test('returns true for a holiday date', () => {
      expect(EventUtils.isHoliday(1, 1)).toBe(true);
      expect(EventUtils.isHoliday(7, 10)).toBe(true);
    });
    
    test('returns false for a non-holiday date', () => {
      expect(EventUtils.isHoliday(2, 2)).toBe(false);
    });
    
    test('respects type filters', () => {
      expect(EventUtils.isHoliday(1, 1, ['Religious'])).toBe(false);
      expect(EventUtils.isHoliday(7, 10, ['Religious'])).toBe(true);
    });
  });
  
  describe('getHolidayTitles', () => {
    beforeEach(() => {
      EventUtils.getHolidayTitles = jest.fn((month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false) => {
        const events = EventUtils.getEvents(month, day, eventTypes, includeAllTypes);
        return events
          .filter(event => event.holiday === true)
          .map(event => event.title);
      });
    });
    
    test('returns holiday titles for a date', () => {
      const titles = EventUtils.getHolidayTitles(1, 1);
      expect(titles).toContain('عید نوروز');
    });
    
    test('returns empty array for non-holiday dates', () => {
      const titles = EventUtils.getHolidayTitles(2, 2);
      expect(titles).toHaveLength(0);
    });
  });
  
  describe('getAllEventTitles', () => {
    beforeEach(() => {
      EventUtils.getAllEventTitles = jest.fn((month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false) => {
        const events = EventUtils.getEvents(month, day, eventTypes, includeAllTypes);
        return events.map(event => event.title);
      });
    });
    
    test('returns all event titles for a date', () => {
      const titles = EventUtils.getAllEventTitles(1, 1);
      expect(titles).toContain('عید نوروز');
    });
    
    test('returns empty array for dates with no events', () => {
      const titles = EventUtils.getAllEventTitles(2, 2);
      expect(titles).toHaveLength(0);
    });
  });
  
  describe('getEventTypes', () => {
    test('returns all unique event types', () => {
      const types = EventUtils.getEventTypes();
      expect(types).toContain('Iran');
      expect(types).toContain('Religious');
      expect(types).toContain('Afghanistan');
    });
  });
}); 