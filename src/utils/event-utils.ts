import { PersianEvent } from '../types';
import HijriUtils from './hijri-utils';
import { PersianDate } from '../persian-date';

// Fallback events in case JSON loading fails
const fallbackEvents: PersianEvent[] = [];

class EventUtils {
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

  /**
   * Maps events from the Persian Calendar repo format to our PersianEvent format
   */
  private mapPersianCalendarEvents(): PersianEvent[] {
    try {
      let allEvents: PersianEvent[] = [];
      
      // Process Persian Calendar events
      if (this.persianCalendarData && this.persianCalendarData["Persian Calendar"] && Array.isArray(this.persianCalendarData["Persian Calendar"])) {
        console.log('Processing Persian Calendar events:', {
          eventCount: this.persianCalendarData["Persian Calendar"].length,
          sampleEvent: this.persianCalendarData["Persian Calendar"][0]
        });
        
        allEvents = this.persianCalendarData["Persian Calendar"].map((event: any) => ({
          title: event.title || '',
          month: event.month || 1,
          day: event.day || 1,
          type: event.type || 'Iran',
          holiday: event.holiday || false
        }));
      }
      
      console.log('Final mapped events:', {
        totalEvents: allEvents.length,
        eventTypes: [...new Set(allEvents.map(e => e.type))],
        holidayCount: allEvents.filter(e => e.holiday).length
      });
      
      return allEvents;
    } catch (error) {
      console.error('Error mapping calendar events:', error);
      return [...fallbackEvents];
    }
  }

  /**
   * Loads events data from the external JSON file
   */
  private async loadEventsData(): Promise<void> {
    // If already loading, return the existing promise
    if (this.isLoading) {
      return this.fetchPromise!;
    }

    // Get current year
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    const currentYear = jalaliToday[0];

    // Only use cache if we've already initialized and it's the same year
    if (this.isInitialized && this.lastFetchYear === currentYear) {
      console.log('Using cached events data for year:', currentYear);
      return;
    }

    this.isLoading = true;
    
    try {
      console.log('Attempting to load events.json...');
      // Try to load the events.json file
      const response = await fetch('data/events.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.persianCalendarData = await response.json();
      console.log('Successfully loaded events.json:', {
        hasData: !!this.persianCalendarData,
        keys: Object.keys(this.persianCalendarData),
        sampleMonth: Object.entries(this.persianCalendarData).find(([key]) => key !== 'Source' && key !== '#meta')
      });
      
      // Update mapped events with the new data
      const newEvents = this.mapPersianCalendarEvents();
      console.log('Mapped events:', {
        totalEvents: newEvents.length,
        sampleEvent: newEvents[0],
        eventTypes: [...new Set(newEvents.map(e => e.type))]
      });
      this.mappedEvents = [...newEvents];
      
      // Update last fetch year and mark as initialized
      this.lastFetchYear = currentYear;
      this.isInitialized = true;
    } catch (error) {
      console.error('Error loading events data:', error);
      // Keep using fallback events
      this.mappedEvents = [...fallbackEvents];
    } finally {
      this.isLoading = false;
      this.fetchPromise = null;
    }
  }

  async initialize(): Promise<void> {
    // Always try to load data on initialize
    await this.loadEventsData();
  }

  getEvents(month: number, day: number, eventTypes?: string[], includeAllTypes: boolean = false): PersianEvent[] {
    const events = this.getAllEvents(eventTypes, includeAllTypes);
    return events.filter(event => 
      event.month === month && 
      event.day === day
    );
  }

  getEvent(month: number, day: number): PersianEvent | undefined {
    return this.mappedEvents.find(event => 
      event.month === month && event.day === day
    );
  }

  getEventsForMonth(month: number): PersianEvent[] {
    return this.mappedEvents.filter(event => event.month === month);
  }

  getEventsForYear(): PersianEvent[] {
    return this.mappedEvents;
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
    if (includeAllTypes) {
      return [...this.mappedEvents];
    }
    return this.mappedEvents.filter(event => 
      eventTypes?.includes(event.type) ?? true
    );
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
    // Reset initialization flag to force reload
    this.isInitialized = false;
    await this.loadEventsData();
    return [...this.mappedEvents];
  }
}

export default EventUtils; 