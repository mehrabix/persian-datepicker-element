import { PersianEvent } from '../types';
// Import the original JSON file from the Persian Calendar repo
import persianCalendarData from '../data/persian-calendar-repo/PersianCalendar/data/events.json';

// Fallback events in case JSON loading fails
const fallbackEvents: PersianEvent[] = [
  { title: 'عید نوروز', month: 1, day: 1, type: 'holiday', holiday: true },
  { title: 'روز طبیعت', month: 1, day: 13, type: 'holiday', holiday: true },
  { title: 'عید فطر', month: 4, day: 5, type: 'holiday', holiday: true },
  { title: 'عید قربان', month: 6, day: 10, type: 'holiday', holiday: true },
  { title: 'تاسوعا', month: 7, day: 9, type: 'holiday', holiday: true },
  { title: 'عاشورا', month: 7, day: 10, type: 'holiday', holiday: true },
];

/**
 * Maps events from the Persian Calendar repo format to our PersianEvent format
 */
function mapPersianCalendarEvents(): PersianEvent[] {
  try {
    // The Persian Calendar repo has events under the "Persian Calendar" key
    if (persianCalendarData && Array.isArray(persianCalendarData["Persian Calendar"])) {
      return persianCalendarData["Persian Calendar"].map((event: any) => ({
        title: event.title,
        month: event.month,
        day: event.day,
        type: event.type,
        holiday: event.holiday
      }));
    }
    console.warn('Persian Calendar data not found in expected format, using fallback events');
    return fallbackEvents;
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
   */
  getAllEvents(): PersianEvent[] {
    return mappedEvents;
  },

  /**
   * Returns all events for a given month and day
   */
  getEvents(month: number, day: number): PersianEvent[] {
    const events = this.getAllEvents();
    return events.filter(event => 
      event.month === month && 
      event.day === day
    );
  },

  /**
   * Checks if the specified date is a holiday
   */
  isHoliday(month: number, day: number): boolean {
    const events = this.getEvents(month, day);
    return events.some(event => event.holiday === true);
  },

  /**
   * Gets holiday event titles for a specific date
   */
  getHolidayTitles(month: number, day: number): string[] {
    const events = this.getEvents(month, day);
    return events
      .filter(event => event.holiday === true)
      .map(event => event.title);
  },

  /**
   * Gets all event titles for a specific date
   */
  getAllEventTitles(month: number, day: number): string[] {
    const events = this.getEvents(month, day);
    return events.map(event => event.title);
  },
  
  /**
   * Gets events of a specific type
   */
  getEventsByType(type: string): PersianEvent[] {
    const events = this.getAllEvents();
    return events.filter(event => event.type === type);
  },
  
  /**
   * Get all holidays
   */
  getAllHolidays(): PersianEvent[] {
    const events = this.getAllEvents();
    return events.filter(event => event.holiday === true);
  },

  /**
   * Get the source data metadata
   */
  getSourceMetadata(): { [key: string]: string } {
    return persianCalendarData.Source || {};
  }
};

export default EventUtils; 