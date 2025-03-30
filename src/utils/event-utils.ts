import { PersianEvent } from '../types';
import HijriUtils from './hijri-utils';
import { PersianDate } from '../persian-date';

// Fallback events in case JSON loading fails
const fallbackEvents: PersianEvent[] = [];

// Initialize empty events array
let mappedEvents: PersianEvent[] = [...fallbackEvents];
let persianCalendarData: any = {
  "Persian Calendar": [],
  "Hijri Calendar": [],
  "Source": { "name": "Fallback Data", "url": "" }
};

// Add cache and loading state
let isLoading = false;
let lastFetchYear: number | null = null;
let fetchPromise: Promise<void> | null = null;

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
    
    // Process Hijri Calendar events
    if (persianCalendarData && Array.isArray(persianCalendarData["Hijri Calendar"])) {
      const hijriEvents = persianCalendarData["Hijri Calendar"].map((event: any) => {
        // Convert Hijri date to Jalali
        const jalaliDate = HijriUtils.hijriToJalali(
          event.year,
          event.month,
          event.day
        );
        
        return {
          title: event.title,
          month: jalaliDate[1],
          day: jalaliDate[2],
          type: event.type,
          holiday: event.holiday,
          hijri: {
            year: event.year,
            month: event.month,
            day: event.day
          }
        };
      });
      
      allEvents = [...allEvents, ...hijriEvents];
    }
    
    return allEvents;
  } catch (error) {
    console.error('Error mapping calendar events:', error);
    return [...fallbackEvents];
  }
}

/**
 * Loads events data from the external JSON file
 */
async function loadEventsData(): Promise<void> {
  // If already loading, return the existing promise
  if (isLoading) {
    return fetchPromise!;
  }

  // Get current year
  const today = new Date();
  const jalaliToday = PersianDate.gregorianToJalali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const currentYear = jalaliToday[0];

  // If we already have data for this year, don't fetch again
  if (lastFetchYear === currentYear) {
    return;
  }

  isLoading = true;
  
  try {
    // Try to load the events.json file
    const response = await fetch('src/data/persian-calenda-repo/PersianCalendar/data/events.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    persianCalendarData = await response.json();
    
    // Update mapped events with the new data
    const newEvents = mapPersianCalendarEvents();
    mappedEvents = [...newEvents];
    
    // Update last fetch year
    lastFetchYear = currentYear;
  } catch (error) {
    console.error('Error loading events data:', error);
    // Keep using fallback events
    mappedEvents = [...fallbackEvents];
  } finally {
    isLoading = false;
    fetchPromise = null;
  }
}

/**
 * Event utilities for working with Persian calendar events
 */
export const EventUtils = {
  /**
   * Returns all Persian calendar events mapped from the original JSON data
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
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
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
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
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
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
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
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
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
   * @param includeAllTypes If true, includes all event types regardless of filtering
   */
  getAllEventTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.map(event => event.title);
  },
  
  /**
   * Gets events of a specific type
   * @param type The event type (e.g., 'Iran', 'Afghanistan', 'AncientIran', 'International')
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
   * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Afghanistan', 'AncientIran', 'International'])
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
  },
  
  /**
   * Initialize the events data by loading from external JSON
   */
  async initialize(): Promise<void> {
    await loadEventsData();
  },

  /**
   * Refresh the events data to update Hijri calendar events for the current year
   * This should be called when the component is initialized or the year changes
   */
  async refreshEvents(): Promise<PersianEvent[]> {
    // Only refresh if we don't have data for the current year
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    const currentYear = jalaliToday[0];

    if (lastFetchYear !== currentYear) {
      await loadEventsData();
    }
    
    return [...mappedEvents];
  }
};

export default EventUtils; 