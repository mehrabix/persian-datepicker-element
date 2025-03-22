import { PersianEvent } from '../types';
// Import the original JSON file from the Persian Calendar repo
import persianCalendarData from '../data/persian-calendar-repo/PersianCalendar/data/events.json';

// Fallback events in case JSON loading fails
const fallbackEvents: PersianEvent[] = [
  { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true },
  { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: true },
  { title: 'عید فطر', month: 4, day: 5, type: 'Religious', holiday: true },
  { title: 'عید قربان', month: 6, day: 10, type: 'Religious', holiday: true },
  { title: 'تاسوعا', month: 7, day: 9, type: 'Religious', holiday: true },
  { title: 'عاشورا', month: 7, day: 10, type: 'Religious', holiday: true },
];

/**
 * Maps events from the Persian Calendar repo format to our PersianEvent format
 */
function mapPersianCalendarEvents(): PersianEvent[] {
  try {
    let allEvents: PersianEvent[] = [];
    
    // Process Persian Calendar events
    if (persianCalendarData && Array.isArray(persianCalendarData["Persian Calendar"])) {
      const persianEvents = persianCalendarData["Persian Calendar"].map((event: any) => ({
        title: event.title,
        month: event.month,
        day: event.day,
        type: event.type,
        holiday: event.holiday
      }));
      
      allEvents = [...persianEvents];
    }
    
    // Process Hijri Calendar events - Note: these are configured for the current year
    // In a real app, these should be calculated each year based on Hijri-to-Persian conversion
    if (persianCalendarData && Array.isArray(persianCalendarData["Hijri Calendar"])) {
      const hijriEvents = persianCalendarData["Hijri Calendar"].map((event: any) => ({
        title: event.title,
        month: event.month,
        day: event.day,
        type: event.type,
        holiday: event.holiday
      }));
      
      allEvents = [...allEvents, ...hijriEvents];
    }
    
    if (allEvents.length === 0) {
      console.warn('Persian Calendar data not found in expected format, using fallback events');
      return fallbackEvents;
    }
    
    return allEvents;
  } catch (error) {
    console.error('Error mapping Persian Calendar events:', error);
    return fallbackEvents;
  }
}

// Cache the mapped events to avoid reprocessing on every call
const mappedEvents = mapPersianCalendarEvents();

/**
 * Event utilities for working with Persian calendar events
 */
export const EventUtils = {
  /**
   * Returns all Persian calendar events mapped from the original JSON data
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getAllEvents(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    let filteredEvents = [...mappedEvents];
    
    // If specific event types are provided and we're not including all types, filter by those types
    if (eventTypes && eventTypes.length > 0 && !includeAllTypes) {
      filteredEvents = filteredEvents.filter(event => eventTypes.includes(event.type));
    }
    
    return filteredEvents;
  },

  /**
   * Returns all events for a given month and day
   * @param month The month number (1-12)
   * @param day The day number (1-31)
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getEvents(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => 
      event.month === month && 
      event.day === day
    );
  },

  /**
   * Checks if the specified date is a holiday
   * @param month The month number (1-12)
   * @param day The day number (1-31)
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  isHoliday(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): boolean {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.some(event => event.holiday === true);
  },

  /**
   * Gets holiday event titles for a specific date
   * @param month The month number (1-12)
   * @param day The day number (1-31)
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getHolidayTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events
      .filter(event => event.holiday === true)
      .map(event => event.title);
  },

  /**
   * Gets all event titles for a specific date
   * @param month The month number (1-12)
   * @param day The day number (1-31)
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getAllEventTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.map(event => event.title);
  },
  
  /**
   * Gets events of a specific type
   * @param type The event type (e.g., 'Iran', 'Religious')
   * @param includeAllTypes If true, includes all event types
   * @param holidaysOnly If true, only returns holiday events
   */
  getEventsByType(type: string, includeAllTypes: boolean = false, holidaysOnly: boolean = false): PersianEvent[] {
    const events = includeAllTypes 
      ? mappedEvents 
      : mappedEvents.filter(event => event.type === type);
    
    return holidaysOnly 
      ? events.filter(event => event.holiday === true) 
      : events;
  },
  
  /**
   * Get all holidays
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getAllHolidays(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => event.holiday === true);
  },

  /**
   * Get available event types
   */
  getEventTypes(): string[] {
    const types = new Set<string>();
    mappedEvents.forEach(event => types.add(event.type));
    return Array.from(types);
  },

  /**
   * Get the source data metadata
   */
  getSourceMetadata(): { [key: string]: string } {
    return persianCalendarData.Source || {};
  }
};

export default EventUtils; 