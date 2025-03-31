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
    const response = await fetch('data/events.json');
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

class EventUtils {
  static async initialize(): Promise<void> {
    await loadEventsData();
  }

  static getEvents(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => 
      event.month === month && 
      event.day === day
    );
  }

  static getEvent(month: number, day: number): PersianEvent | undefined {
    return mappedEvents.find(event => 
      event.month === month && event.day === day
    );
  }

  static getEventsForMonth(month: number): PersianEvent[] {
    return mappedEvents.filter(event => event.month === month);
  }

  static getEventsForYear(): PersianEvent[] {
    return mappedEvents;
  }

  static isHoliday(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): boolean {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.some(event => event.holiday === true);
  }

  static getHolidayTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events
      .filter(event => event.holiday === true)
      .map(event => event.title);
  }

  static getAllEventTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.map(event => event.title);
  }

  static getAllEvents(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    if (includeAllTypes) {
      return [...mappedEvents];
    }
    return mappedEvents.filter(event => 
      eventTypes?.includes(event.type) ?? true
    );
  }

  static getEventsByType(type: string, includeAllTypes: boolean = false, holidaysOnly: boolean = false): PersianEvent[] {
    const events = includeAllTypes 
      ? mappedEvents 
      : mappedEvents.filter(event => event.type === type);
    
    return holidaysOnly 
      ? events.filter(event => event.holiday === true) 
      : events;
  }

  static getAllHolidays(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => event.holiday === true);
  }

  static getEventTypes(): string[] {
    const types = new Set<string>();
    mappedEvents.forEach(event => types.add(event.type));
    return Array.from(types);
  }

  static getSourceMetadata(): { [key: string]: string } {
    return persianCalendarData.Source || {};
  }

  static async refreshEvents(): Promise<PersianEvent[]> {
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
}

export { EventUtils }; 