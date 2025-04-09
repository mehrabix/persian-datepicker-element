import { PersianDate } from '../persian-date';
import { PersianEvent } from '../types';

/**
 * Convert a Jalali date to ISO string format
 * @param year The Jalali year
 * @param month The Jalali month (1-12)
 * @param day The Jalali day
 * @returns ISO string representation of the date
 */
function jalaliDateToISOString(year: number, month: number, day: number): string {
  const gregorianDate = PersianDate.jalaliToGregorian(year, month, day);
  return new Date(
    gregorianDate[0],
    gregorianDate[1] - 1, // JavaScript months are 0-indexed
    gregorianDate[2]
  ).toISOString();
}

// Get current year in Jalali calendar for events
const today = new Date();
const jalaliToday = PersianDate.gregorianToJalali(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate()
);
const currentJalaliYear = jalaliToday[0];

// Fallback events in case JSON loading fails
const fallbackEvents: PersianEvent[] = [
  // Add any default fallback events here
  // Example:
  // {
  //   title: "نوروز",
  //   month: 1,
  //   day: 1,
  //   type: "Iran",
  //   holiday: true,
  //   isoString: jalaliDateToISOString(currentJalaliYear, 1, 1)
  // }
];

class EventUtils {
  private static instance: EventUtils | null = null;
  private static initializationPromise: Promise<void> | null = null;
  private mappedEvents: PersianEvent[] = [...fallbackEvents];
  private persianCalendarData: any = {
    "Persian Calendar": [],
    "Hijri Calendar": [],
    "Source": { "name": "Fallback Data", "url": "" }
  };
  private isLoading = false;
  private lastFetchYear: number | null = null;
  private fetchPromise: Promise<void> | null = null;
  private isInitialized = false;
  private readonly CACHE_KEY = 'persian_calendar_events';
  private readonly CACHE_EXPIRY_DAYS = 7; // Cache events for 7 days

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  /**
   * Get the singleton instance of EventUtils
   */
  public static getInstance(): EventUtils {
    if (!EventUtils.instance) {
      EventUtils.instance = new EventUtils();
    }
    return EventUtils.instance;
  }

  /**
   * Check if EventUtils is initialized
   */
  public static isInitialized(): boolean {
    return EventUtils.instance?.isInitialized ?? false;
  }

  /**
   * Initialize the singleton instance
   * This ensures only one initialization happens across all instances
   */
  public static async initialize(): Promise<void> {
    if (EventUtils.initializationPromise) {
      return EventUtils.initializationPromise;
    }

    EventUtils.initializationPromise = EventUtils.getInstance().loadEventsData();
    try {
      await EventUtils.initializationPromise;
    } finally {
      EventUtils.initializationPromise = null;
    }
  }

  /**
   * Maps events from the Persian Calendar repo format to our PersianEvent format
   */
  private mapPersianCalendarEvents(): PersianEvent[] {
    try {
      let allEvents: PersianEvent[] = [];
      
      // Process Persian Calendar events
      if (this.persianCalendarData && this.persianCalendarData["Persian Calendar"] && Array.isArray(this.persianCalendarData["Persian Calendar"])) {
        
        allEvents = this.persianCalendarData["Persian Calendar"].map((event: any) => {
          // Create DateTuple for the event using current year
          const month = event.month || 1;
          const day = event.day || 1;
          
          return {
            title: event.title || '',
            month: month,
            day: day,
            type: event.type || 'Iran',
            holiday: event.holiday || false,
            isoString: jalaliDateToISOString(currentJalaliYear, month, day)
          };
        });
      }
      
      return allEvents;
    } catch (error) {
      return [...fallbackEvents];
    }
  }

  /**
   * Saves events data to localStorage with expiration
   */
  private saveToCache(data: any): void {
    try {
      const cacheData = {
        data,
        timestamp: new Date().getTime(),
        year: this.lastFetchYear
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save events to cache:', error);
    }
  }

  /**
   * Retrieves events data from localStorage if not expired
   */
  private getFromCache(): any | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp, year } = JSON.parse(cached);
      const now = new Date().getTime();
      const expiryTime = this.CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds

      // Check if cache is expired or year doesn't match
      if (now - timestamp > expiryTime || year !== this.lastFetchYear) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Failed to read events from cache:', error);
      return null;
    }
  }

  /**
   * Loads events data from the external JSON file with caching
   */
  private async loadEventsData(): Promise<void> {
    // If already loading, wait for the current fetch to complete
    if (this.fetchPromise) {
      await this.fetchPromise;
      return;
    }

    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    const currentYear = jalaliToday[0];

    // Try to get data from cache first
    const cachedData = this.getFromCache();
    if (cachedData) {
      this.persianCalendarData = cachedData;
      this.mappedEvents = this.mapPersianCalendarEvents();
      this.lastFetchYear = currentYear;
      this.isInitialized = true;
      return;
    }

    // Create the fetch promise
    this.fetchPromise = (async () => {
      this.isLoading = true;
      try {
        console.log('Attempting to load events.json...');
        // Try to load the events.json file with retry mechanism
        const response = await this.fetchWithRetry('data/events.json', 3);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.persianCalendarData = await response.json();
        
        // Save to cache
        this.saveToCache(this.persianCalendarData);
        
        // Update mapped events with the new data
        const newEvents = this.mapPersianCalendarEvents();
        this.mappedEvents = [...newEvents];
        
        // Update last fetch year and mark as initialized
        this.lastFetchYear = currentYear;
        this.isInitialized = true;
      } catch (error) {
        // Keep using fallback events
        this.mappedEvents = [...fallbackEvents];
      } finally {
        this.isLoading = false;
      }
    })();

    try {
      await this.fetchPromise;
    } finally {
      this.fetchPromise = null;
    }
  }

  /**
   * Fetches data with retry mechanism
   */
  private async fetchWithRetry(url: string, maxRetries: number): Promise<Response> {
    let lastError: Error | null = null;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) return response;
        throw new Error(`HTTP error! status: ${response.status}`);
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }
    
    throw lastError || new Error('Failed to fetch events data after multiple retries');
  }

  getEvents(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    const filteredEvents = events.filter(event => 
      event.month === month && 
      event.day === day
    );
    
    // Ensure all events have ISO strings
    return filteredEvents.map(event => {
      if (!event.isoString) {
        return {
          ...event,
          isoString: jalaliDateToISOString(currentJalaliYear, event.month, event.day)
        };
      }
      return event;
    });
  }

  getEvent(month: number, day: number): PersianEvent | undefined {
    const event = this.mappedEvents.find(event => 
      event.month === month && 
      event.day === day
    );
    
    if (event && !event.isoString) {
      return {
        ...event,
        isoString: jalaliDateToISOString(currentJalaliYear, event.month, event.day)
      };
    }
    
    return event;
  }

  getEventsForMonth(month: number): PersianEvent[] {
    const events = this.mappedEvents.filter(event => event.month === month);
    
    // Ensure all events have ISO strings
    return events.map(event => {
      if (!event.isoString) {
        return {
          ...event,
          isoString: jalaliDateToISOString(currentJalaliYear, event.month, event.day)
        };
      }
      return event;
    });
  }

  getEventsForYear(): PersianEvent[] {
    // Ensure all events have ISO strings
    return this.mappedEvents.map(event => {
      if (!event.isoString) {
        return {
          ...event,
          isoString: jalaliDateToISOString(currentJalaliYear, event.month, event.day)
        };
      }
      return event;
    });
  }

  isHoliday(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): boolean {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.some(event => event.holiday === true);
  }

  getHolidayTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events
      .filter(event => event.holiday === true)
      .map(event => event.title);
  }

  getAllEventTitles(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): string[] {
    const events = this.getEvents(month, day, eventTypes, includeAllTypes);
    return events.map(event => event.title);
  }

  getAllEvents(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    let events: PersianEvent[];
    
    if (includeAllTypes) {
      events = [...this.mappedEvents];
    } else {
      events = this.mappedEvents.filter(event => 
        eventTypes?.includes(event.type) ?? true
      );
    }
    
    // Ensure all events have ISO strings
    return events.map(event => {
      if (!event.isoString) {
        return {
          ...event,
          isoString: jalaliDateToISOString(currentJalaliYear, event.month, event.day)
        };
      }
      return event;
    });
  }

  getEventsByType(type: string, includeAllTypes: boolean = false, holidaysOnly: boolean = false): PersianEvent[] {
    const events = includeAllTypes 
      ? this.mappedEvents 
      : this.mappedEvents.filter(event => event.type === type);
    
    return holidaysOnly 
      ? events.filter(event => event.holiday === true) 
      : events;
  }

  getAllHolidays(eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => event.holiday === true);
  }

  getEventTypes(): string[] {
    const types = new Set<string>();
    this.mappedEvents.forEach(event => types.add(event.type));
    return Array.from(types);
  }

  getSourceMetadata(): { [key: string]: string } {
    return this.persianCalendarData.Source || {};
  }

  async refreshEvents(): Promise<PersianEvent[]> {
    // Only reload if not already loading
    if (!this.isLoading) {
      // Create the fetch promise
      this.fetchPromise = (async () => {
        this.isLoading = true;
        try {
          console.log('Refreshing events...');
          // Try to load the events.json file with retry mechanism
          const response = await this.fetchWithRetry('data/events.json', 3);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          this.persianCalendarData = await response.json();
          
          // Save to cache
          this.saveToCache(this.persianCalendarData);
          
          // Update mapped events with the new data
          const newEvents = this.mapPersianCalendarEvents();
          this.mappedEvents = [...newEvents];
          
          // Update last fetch year
          const today = new Date();
          const jalaliToday = PersianDate.gregorianToJalali(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
          );
          this.lastFetchYear = jalaliToday[0];
        } catch (error) {
          // Keep using existing events
          console.warn('Failed to refresh events:', error);
        } finally {
          this.isLoading = false;
        }
      })();

      try {
        await this.fetchPromise;
      } finally {
        this.fetchPromise = null;
      }
    }
    
    return [...this.mappedEvents];
  }
}

export default EventUtils; 