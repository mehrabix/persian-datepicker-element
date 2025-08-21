import { PersianDate } from './persian-date';
import EventUtils from './utils/event-utils';
import { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple
} from './types';
import { persianDatepickerStyles } from './styles/persian-datepicker.styles';
import { DateUtils } from './utils/date-utils';
import { UIRenderer } from './utils/ui-renderer';
import { TouchGestureHandler } from './utils/touch-gesture-handler';
import { DateFormatter } from './utils/date-formatter';
import { CalendarRenderer } from './utils/calendar-renderer';

// Default holiday types
const DEFAULT_HOLIDAY_TYPES = ['Iran', 'AncientIran', 'International'];

/**
 * Jalali Date Picker Web Component
 * 
 * A customizable date picker that follows the Jalali (Persian) calendar.
 * Features include:
 * - Month and year dropdown navigation with 150-year range
 * - Quick today and tomorrow navigation buttons
 * - Touch gesture support for swiping between months
 * - Holiday highlighting with customizable types
 * - Full RTL support
 * - Customizable styling with global CSS variables
 * - Shadcn-like UI with ability to toggle visibility of UI elements
 * - Consistent UI sizing with properly aligned select boxes and buttons
 * 
 * @element persian-datepicker-element
 */
export class PersianDatePickerElement extends HTMLElement {
  // Private DOM elements
  private input!: HTMLInputElement;
  private calendar!: HTMLDivElement;
  private daysContainer!: HTMLDivElement;
  private dayNamesContainer!: HTMLDivElement;
  
  // Utility instances
  private eventUtils: EventUtils;
  private calendarRenderer: CalendarRenderer;
  private touchGestureHandler: TouchGestureHandler | null = null;
  
  // Date state
  private jalaliYear: number = 0;
  private jalaliMonth: number = 0;
  private jalaliDay: number = 0;
  private selectedDate: DateTuple | null = null;
  
  // Range selection state
  private isRangeMode: boolean = false;
  private rangeStart: DateTuple | null = null;
  private rangeEnd: DateTuple | null = null;
  private isSelectingRange: boolean = false;
  
  // Configuration
  private options: PersianDatePickerElementOptions;
  private showEvents: boolean = true;
  private eventTypes: string[] = [...DEFAULT_HOLIDAY_TYPES];
  private includeAllTypes: boolean = false;
  private isTransitioning: boolean = false;
  private _documentClickHandler: EventListener = () => {};
  
  // Static property to track currently open calendar instance
  private static openCalendarInstance: PersianDatePickerElement | null = null;
  
  // Add format and limits properties
  private format: string = 'YYYY/MM/DD';
  private minDate: DateTuple | null = null;
  private maxDate: DateTuple | null = null;
  private disabledDatesFn: ((year: number, month: number, day: number) => boolean) | null = null;

  static get observedAttributes() {
    return [
      'placeholder', 
      'rtl', 
      'format', 
      'show-holidays',
      'holiday-types',
      'event-types',
      'show-events',
      'today-button-text',
      'today-button-class',
      'tomorrow-button-text',
      'tomorrow-button-class',
      'min-date',
      'max-date',
      'disabled-dates',
      'range-mode',
      // UI visibility props
      'show-month-selector',
      'show-year-selector',
      'show-prev-button',
      'show-next-button',
      'show-today-button',
      'show-tomorrow-button'
    ];
  }

  constructor(options: PersianDatePickerElementOptions = {}) {
    super();
    this.options = options;
    this.eventUtils = EventUtils.getInstance();
    this.calendarRenderer = new CalendarRenderer(
      PersianDate,
      this.eventUtils,
      this.showEvents,
      this.eventTypes,
      this.includeAllTypes
    );
    
    this.initializeFromOptions(options);
    this.createShadowDOM();
  }

  /**
   * Initialize component from options
   */
  private initializeFromOptions(options: PersianDatePickerElementOptions): void {
    // Set showEvents from options if provided
    if (options.showEvents !== undefined) {
      this.showEvents = options.showEvents;
    }
    
    // Set format from options if provided
    if (options.format) {
      this.format = options.format;
    }
    
    // Set RTL from options if provided
    if (options.rtl !== undefined) {
      this.style.setProperty('--jdp-direction', options.rtl ? 'rtl' : 'ltr');
    }
    
    // Set range mode from options if provided
    if (options.rangeMode !== undefined) {
      this.isRangeMode = options.rangeMode;
    }
    
    // Set range start and end from options if provided
    if (options.rangeStart) {
      this.rangeStart = options.rangeStart;
    }
    
    if (options.rangeEnd) {
      this.rangeEnd = options.rangeEnd;
    }
    
    // Set min and max dates from options if provided
    if (options.minDate) {
      this.minDate = options.minDate;
    }
    
    if (options.maxDate) {
      this.maxDate = options.maxDate;
    }
    
    // Set disabled dates function from options if provided
    if (options.disabledDates) {
      if (typeof options.disabledDates === 'function') {
        this.disabledDatesFn = options.disabledDates;
      } else if (typeof options.disabledDates === 'string') {
        // Try to find the function in the global scope
        const disabledFn = (window as any)[options.disabledDates];
        if (typeof disabledFn === 'function') {
          this.disabledDatesFn = disabledFn;
        }
      }
    }
    
    // Set default date from options if provided
    if (options.defaultDate) {
      this.selectedDate = options.defaultDate;
      this.jalaliYear = options.defaultDate[0];
      this.jalaliMonth = options.defaultDate[1];
      this.jalaliDay = options.defaultDate[2];
    }

    // Set holiday types if provided in options
    if (options.showEvents && options.eventTypes) {
      this.seteventTypes(options.eventTypes);
    }
  }

  /**
   * Create shadow DOM and render initial structure
   */
  private createShadowDOM(): void {
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
  }

  /**
   * Render the initial component HTML
   */
  private render(shadow: ShadowRoot) {
    const buttonConfig = this.getButtonConfig();
    const visibilityConfig = this.getVisibilityConfig();

    shadow.innerHTML = `
      <style>${persianDatepickerStyles}</style>
      ${UIRenderer.generateComponentHTML(visibilityConfig, buttonConfig)}
    `;
  }

  async connectedCallback() {
    try {
      if (!this.shadowRoot) {
        console.error("Shadow root not available");
        return;
      }

      // Initialize DOM references
      this.initializeDomReferences();
      
      // Initialize with today's date
      this.initializeCurrentDate();
      
      // Initialize events data using the singleton
      if (!EventUtils.isInitialized()) {
        await EventUtils.initialize();
      }
      
      // Setup initial UI components
      this.initializeUIComponents();
      
      // Set up event listeners
      this.addEventListeners();
      
      // Initialize touch gesture support
      this.initTouchGestures();
      
      // Update the UI with the current date
      this.renderCalendar();
    } catch (error) {
      console.error("Error in connectedCallback:", error);
    }
  }

  disconnectedCallback() {
    // Clean up event listeners to prevent memory leaks
    if (this._documentClickHandler) {
      document.removeEventListener("click", this._documentClickHandler);
    }
    
    // Clean up the openCalendarInstance if this element is being removed
    if (PersianDatePickerElement.openCalendarInstance === this) {
      PersianDatePickerElement.openCalendarInstance = null;
    }
    
    // Clean up touch gesture handler
    if (this.touchGestureHandler) {
      this.touchGestureHandler.destroy();
    }
    
    // Remove all event listeners from the shadow DOM elements
    this.removeEventListeners();
  }

  /**
   * Remove all event listeners
   */
  private removeEventListeners(): void {
    if (!this.shadowRoot) return;
    
    // Remove input event listener
    if (this.input) {
      this.input.removeEventListener("click", this.handleInputClick);
    }
    
    // Remove calendar event listeners
    if (this.calendar) {
      this.calendar.removeEventListener("click", (e) => e.stopPropagation());
    }
    
    // Remove days container event listener
    if (this.daysContainer) {
      this.daysContainer.removeEventListener("click", this.handleDayClick.bind(this));
    }
    
    // Remove navigation button event listeners
    const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
    const nextMonthBtn = this.shadowRoot.getElementById("next-month");
    const todayBtn = this.shadowRoot.getElementById("today-button");
    const tomorrowBtn = this.shadowRoot.getElementById("tomorrow-button");
    
    if (prevMonthBtn) {
      prevMonthBtn.removeEventListener("click", () => this.changeMonth(-1));
      prevMonthBtn.removeEventListener("touchstart", (e) => e.stopPropagation());
    }
    
    if (nextMonthBtn) {
      nextMonthBtn.removeEventListener("click", () => this.changeMonth(1));
      nextMonthBtn.removeEventListener("touchstart", (e) => e.stopPropagation());
    }
    
    if (todayBtn) {
      todayBtn.removeEventListener("click", () => this.goToToday());
    }
    
    if (tomorrowBtn) {
      tomorrowBtn.removeEventListener("click", () => this.goToTomorrow());
    }
  }

  /**
   * Initialize DOM references for the component
   */
  private initializeDomReferences(): void {
    if (!this.shadowRoot) return;
    
    // Get required DOM elements
    this.input = this.shadowRoot.getElementById("date-input") as HTMLInputElement;
    this.calendar = this.shadowRoot.getElementById("calendar") as HTMLDivElement;
    this.daysContainer = this.shadowRoot.getElementById("days-container") as HTMLDivElement;
    this.dayNamesContainer = this.shadowRoot.getElementById("day-names") as HTMLDivElement;

    if (!this.input || !this.calendar || !this.daysContainer || !this.dayNamesContainer) {
      throw new Error("Failed to initialize required elements");
    }
    
    // Set placeholder if provided in options
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    } else {
      // Apply placeholder from attribute if set
      const placeholder = this.getAttribute('placeholder');
      if (placeholder) {
        this.input.placeholder = placeholder;
      }
    }
  }

  /**
   * Initialize the current date to today's Jalali date
   */
  private initializeCurrentDate(): void {
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    this.jalaliYear = jalaliToday[0];
    this.jalaliMonth = jalaliToday[1];
    this.jalaliDay = jalaliToday[2];
    this.selectedDate = null;
  }

  /**
   * Initialize UI components like day names and selectors
   */
  private initializeUIComponents(): void {
    // Initialize day names
    UIRenderer.initializeDayNames(this.dayNamesContainer);
    
    // Setup month and year selectors
    this.setupMonthYearSelectors();
  }

  /**
   * Setup month and year selector dropdowns
   */
  private setupMonthYearSelectors(): void {
    if (!this.shadowRoot) return;
    
    this.calendarRenderer.setupMonthYearSelectors(
      this.shadowRoot,
      this.jalaliYear,
      this.jalaliMonth,
      this.handleMonthChange.bind(this),
      this.handleYearChange.bind(this)
    );
  }

  /**
   * Initialize touch gesture support for the calendar
   */
  private initTouchGestures(): void {
    if (!this.calendar || !this.shadowRoot) return;
    
    this.touchGestureHandler = new TouchGestureHandler(
      this.calendar,
      this.changeMonth.bind(this),
      () => this.isTransitioning
    );
    
    // Prevent touch event propagation on navigation buttons
    const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
    const nextMonthBtn = this.shadowRoot.getElementById("next-month");
    
    if (prevMonthBtn) {
      TouchGestureHandler.preventTouchPropagation(prevMonthBtn);
    }
    
    if (nextMonthBtn) {
      TouchGestureHandler.preventTouchPropagation(nextMonthBtn);
    }
  }

  /**
   * Get button configuration from attributes
   */
  private getButtonConfig(): {
    todayButtonText: string;
    todayButtonClass: string;
    tomorrowButtonText: string;
    tomorrowButtonClass: string;
  } {
    return {
      todayButtonText: this.getAttribute('today-button-text') || 'امروز',
      todayButtonClass: this.getAttribute('today-button-class') || '',
      tomorrowButtonText: this.getAttribute('tomorrow-button-text') || 'فردا',
      tomorrowButtonClass: this.getAttribute('tomorrow-button-class') || ''
    };
  }

  /**
   * Get visibility configuration from attributes
   */
  private getVisibilityConfig(): {
    showMonthSelector: boolean;
    showYearSelector: boolean;
    showPrevButton: boolean;
    showNextButton: boolean;
    showTodayButton: boolean;
    showTomorrowButton: boolean;
  } {
    return {
      showMonthSelector: this.getAttribute('show-month-selector') !== 'false',
      showYearSelector: this.getAttribute('show-year-selector') !== 'false',
      showPrevButton: this.getAttribute('show-prev-button') !== 'false',
      showNextButton: this.getAttribute('show-next-button') !== 'false',
      showTodayButton: this.getAttribute('show-today-button') !== 'false',
      showTomorrowButton: this.getAttribute('show-tomorrow-button') !== 'false'
    };
  }

  /**
   * Render the calendar with current month/year
   */
  renderCalendar() {
    if (!this.shadowRoot || !this.daysContainer) return;
      
    // Update month and year selectors
    this.calendarRenderer.updateMonthYearSelectors(this.shadowRoot, this.jalaliYear, this.jalaliMonth);

    // Render the calendar
    this.calendarRenderer.renderCalendar(
      this.daysContainer,
      this.jalaliYear,
      this.jalaliMonth,
      this.selectedDate,
      this.rangeStart,
      this.rangeEnd,
      this.isRangeMode,
      this.minDate,
      this.maxDate,
      this.disabledDatesFn
    );
    
    // Remove footer if in range mode
    if (this.isRangeMode) {
      const footer = this.shadowRoot.querySelector('.footer');
      if (footer) {
        footer.remove();
      }
    }
  }

  /**
   * Change to previous or next month
   */
  changeMonth(direction: number) {
    // Prevent multiple transitions at once
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Cache reference to calendar elements
    const daysContainer = this.daysContainer;
    
    // Add transition class based on direction
    const slideClass = direction > 0 ? 'slide-left' : 'slide-right';
    daysContainer.classList.add(slideClass);
    
    // Update month and year values
    this.jalaliMonth = Number(this.jalaliMonth) + direction;
    if (this.jalaliMonth < 1) {
      this.jalaliMonth = 12;
      this.jalaliYear--;
    } else if (this.jalaliMonth > 12) {
      this.jalaliMonth = 1;
      this.jalaliYear++;
    }
    
    // Use requestAnimationFrame for better timing and smoother animation
    requestAnimationFrame(() => {
      // Set a timeout to actually update the calendar
      setTimeout(() => {
        // Update month/year selectors
        this.calendarRenderer.updateMonthYearSelectors(this.shadowRoot!, this.jalaliYear, this.jalaliMonth);
        
        // Clear days container and render new content
        daysContainer.innerHTML = "";
        this.renderCalendar();
        
        // Remove slide class after the animation duration
        requestAnimationFrame(() => {
          daysContainer.classList.remove(slideClass);
          
          // Set a brief timeout to ensure animation is truly done
          setTimeout(() => {
            this.isTransitioning = false;
          }, 50);
        });
      }, 200); // Shorter than the CSS animation duration for better feel
    });
  }

  /**
   * Handle month change from dropdown
   */
  private handleMonthChange(month: number, monthName: string): void {
    if (this.jalaliMonth === month) return;
    
    this.jalaliMonth = month;
    this.renderCalendar();
  }

  /**
   * Handle year change from dropdown
   */
  private handleYearChange(year: number): void {
    if (this.jalaliYear === year) return;
    
    const previousYear = this.jalaliYear;
    this.jalaliYear = year;
    
    // If the year has changed, refresh the events
    if (previousYear !== year) {
      this.eventUtils.refreshEvents();
    }
    
    this.renderCalendar();
  }

  /**
   * Navigate to a specific date (today or tomorrow)
   */
  private navigateToDate(dateToUse: Date): void {
    // Convert to Jalali date
    const jalaliDate = PersianDate.gregorianToJalali(
      dateToUse.getFullYear(),
      dateToUse.getMonth() + 1,
      dateToUse.getDate()
    );
    
    const previousYear = this.jalaliYear;
    
    // Update current view to the specified date's month/year
    this.jalaliYear = jalaliDate[0];
    this.jalaliMonth = jalaliDate[1];
    
    // If the year has changed, refresh the events
    if (previousYear !== this.jalaliYear) {
      this.eventUtils.refreshEvents();
    }
    
    // Render the calendar with the new month/year
    this.renderCalendar();
    
    // Select the date
    this.selectDate(jalaliDate[2]);
  }

  /**
   * Navigate to today's date and select it
   */
  private goToToday(): void {
    this.navigateToDate(new Date());
  }

  /**
   * Navigate to tomorrow's date and select it
   */
  private goToTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.navigateToDate(tomorrow);
  }

  /**
   * Select a specific date
   */
  selectDate(day: number) {
    // Validate date before proceeding with selection
    if (DateUtils.isDateDisabled(this.jalaliYear, this.jalaliMonth, day, this.disabledDatesFn) || 
        !DateUtils.isDateInRange(this.jalaliYear, this.jalaliMonth, day, this.minDate, this.maxDate)) {
      return;
    }

    this.jalaliDay = day;
    this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay];
    
    // Format and display the date
    this.formatAndSetValue();
    
    // Get all events for the selected date
    const events = this.eventUtils.getEvents(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes);
    
    // Format the date according to the current format
    const formattedDate = DateFormatter.formatDate(this.selectedDate, this.format);
    
    // Convert to Gregorian date
    const gregorianDate = PersianDate.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay);
    
    // Create ISO string from Jalali date
    const isoString = DateUtils.jalaliToISOString(this.selectedDate, PersianDate);
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        jalali: this.selectedDate,
        gregorian: gregorianDate,
        isHoliday: this.eventUtils.isHoliday(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes),
        events: events,
        formattedDate: formattedDate,
        isoString: isoString
      },
      bubbles: true
    }) as PersianDateChangeEvent);
    
    // Close any open dropdowns before hiding the calendar
    this.closeAllDropdowns();
    
    this.toggleCalendar();
    this.renderCalendar();
  }

  /**
   * Format the selected date and set input value
   */
  private formatAndSetValue() {
    if (this.isRangeMode) {
      if (!this.rangeStart || !this.rangeEnd) {
        this.input.value = '';
        return;
      }

      this.input.value = DateFormatter.formatDateRange(this.rangeStart, this.rangeEnd, this.format);
      return;
    }

    if (!this.selectedDate) {
      this.input.value = '';
      return;
    }

    this.input.value = DateFormatter.formatDate(this.selectedDate, this.format);
  }

  /**
   * Toggle calendar visibility
   */
  toggleCalendar() {
    // First close any open dropdowns
    this.closeAllDropdowns();
    
    // Check if this calendar is already open
    if (this.calendar.classList.contains("visible")) {
      // Hide calendar
      this.calendar.classList.remove("visible", "position-bottom", "position-top");
      
      // Clear the static reference if this instance is being closed
      if (PersianDatePickerElement.openCalendarInstance === this) {
        PersianDatePickerElement.openCalendarInstance = null;
      }
    } else {
      // Close any already open calendar instance
      if (PersianDatePickerElement.openCalendarInstance && 
          PersianDatePickerElement.openCalendarInstance !== this) {
        PersianDatePickerElement.openCalendarInstance.toggleCalendar();
      }
      
      // Show calendar with position calculation
      this.positionCalendar();
      this.calendar.classList.add("visible");
      
      // Set this as the currently open instance
      PersianDatePickerElement.openCalendarInstance = this;
    }
  }

  /**
   * Calculate and set the optimal position for the calendar
   */
  private positionCalendar(): void {
    if (!this.input || !this.calendar) return;
    
    // Reset position classes
    this.calendar.classList.remove("position-bottom", "position-top");
    
    // Get measurements without causing reflow
    const inputRect = this.input.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Default to position-bottom (most common)
    this.calendar.classList.add("position-bottom");
    
    // Set display block but with visibility hidden to measure without showing
    const originalVisibility = this.calendar.style.visibility;
    const originalDisplay = this.calendar.style.display;
    this.calendar.style.visibility = 'hidden';
    this.calendar.style.display = 'block';
    
    // Now we can measure once display is set
    const calendarHeight = this.calendar.offsetHeight;
    
    // Check if there's enough space below
    const spaceBelow = windowHeight - inputRect.bottom;
    if (spaceBelow < calendarHeight) {
      // Not enough space below, check if there's more space above
      const spaceAbove = inputRect.top;
      if (spaceAbove > spaceBelow || spaceAbove >= calendarHeight) {
        // Switch to position-top
        this.calendar.classList.remove("position-bottom");
        this.calendar.classList.add("position-top");
      }
    }
    
    // Restore original styles
    this.calendar.style.visibility = originalVisibility;
    this.calendar.style.display = originalDisplay;
  }

  /**
   * Sets the holiday types to be displayed
   */
  seteventTypes(types: string | string[]): void {
    if (typeof types === 'string') {
      // Special case for "all" which includes all types
      if (types.toLowerCase() === 'all') {
        this.includeAllTypes = true;
        this.eventTypes = [...this.eventUtils.getEventTypes()]; // Get all available types
        return;
      }
      
      try {
        // Try to parse as JSON first
        const parsed = JSON.parse(types);
        if (Array.isArray(parsed)) {
          this.eventTypes = parsed;
        } else {
          // Fallback to comma-separated values if not a JSON array
          this.eventTypes = types.split(',').map(t => t.trim()).filter(Boolean);
        }
      } catch (e) {
        // If JSON parsing fails, treat as comma-separated values
        this.eventTypes = types.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(types)) {
      this.eventTypes = [...types];
    } else {
      this.eventTypes = [...DEFAULT_HOLIDAY_TYPES];
    }
    
    // Set includeAllTypes to false by default
    this.includeAllTypes = false;
    
    // If the calendar is already rendered, update it
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Gets the current holiday types being displayed
   */
  geteventTypes(): string[] {
    return [...this.eventTypes];
  }

  /**
   * Checks if all types are being shown
   */
  isShowingAllTypes(): boolean {
    return this.includeAllTypes;
  }

  /**
   * Sets the date value programmatically
   */
  public setValue(year: number, month: number, day: number): void {
    this.selectedDate = [year, month, day];
    this.jalaliYear = year;
    this.jalaliMonth = month;
    this.jalaliDay = day;
    this.formatAndSetValue();
    this.renderCalendar();
  }

  /**
   * Gets the currently selected date as a tuple [year, month, day]
   */
  public getValue(): DateTuple | null {
    return this.selectedDate ? [...this.selectedDate] : null;
  }

  /**
   * Checks if the currently selected date is a holiday
   */
  public isSelectedDateHoliday(): boolean {
    if (!this.selectedDate) return false;
    return this.eventUtils.isHoliday(
      this.selectedDate[1],
      this.selectedDate[2],
      this.eventTypes,
      this.includeAllTypes
    );
  }

  /**
   * Gets events for the currently selected date
   */
  public getSelectedDateEvents(): any[] {
    if (!this.selectedDate) return [];
    return [...this.eventUtils.getEvents(
      this.selectedDate[1],
      this.selectedDate[2],
      this.eventTypes,
      this.includeAllTypes
    )];
  }

  /**
   * Clears the selected date
   */
  public clear(): void {
    if (this.isRangeMode) {
      this.rangeStart = null;
      this.rangeEnd = null;
    } else {
      this.selectedDate = null;
    }
    this.input.value = '';
    this.renderCalendar();
  }

  /**
   * Set minimum date
   */
  public setMinDate(year: number, month: number, day: number): void {
    this.minDate = [year, month, day];
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Set maximum date
   */
  public setMaxDate(year: number, month: number, day: number): void {
    this.maxDate = [year, month, day];
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Set a function that determines if a date should be disabled
   */
  public setDisabledDatesFn(fn: (year: number, month: number, day: number) => boolean): void {
    this.disabledDatesFn = fn;
    this.renderCalendar();
  }

  /**
   * Programmatically open the calendar
   */
  public open(): void {
    if (!this.calendar.classList.contains("visible")) {
      this.toggleCalendar();
    }
  }

  /**
   * Programmatically close the calendar
   */
  public close(): void {
    if (this.calendar.classList.contains("visible")) {
      this.toggleCalendar();
    }
  }

  /**
   * Add new methods for range selection
   */
  public setRange(start: DateTuple, end: DateTuple): void {
    this.rangeStart = start;
    this.rangeEnd = end;
    this.isRangeMode = true;
    
    // Navigate to the start date's month and year
    this.jalaliYear = start[0];
    this.jalaliMonth = start[1];
    
    // Update the month and year selectors
    this.calendarRenderer.updateMonthYearSelectors(this.shadowRoot!, this.jalaliYear, this.jalaliMonth);
    
    // Format and display the range
    this.formatAndSetValue();
    
    // Force a re-render of the calendar
    this.renderCalendar();
  }

  public getRange(): { start: DateTuple | null; end: DateTuple | null } {
    return {
      start: this.rangeStart ? [...this.rangeStart] : null,
      end: this.rangeEnd ? [...this.rangeEnd] : null
    };
  }

  /**
   * Helper method to close all dropdowns
   */
  private closeAllDropdowns(): void {
    if (!this.shadowRoot) return;
    
    const dropdowns = this.shadowRoot.querySelectorAll(".select-content");
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("open");
    });
  }

  /**
   * Add all needed event listeners
   */
  private addEventListeners(): void {
    if (!this.shadowRoot || !this.input || !this.calendar) return;
    
    // Input click event to toggle calendar
    this.input.addEventListener("click", this.handleInputClick);
    
    // Button event listeners
    this.setupNavigationButtons();
    
    // Prevent clicks inside the calendar from bubbling up
    this.calendar.addEventListener("click", e => e.stopPropagation());
    
    // Use event delegation for day elements instead of adding individual listeners
    this.daysContainer.addEventListener("click", this.handleDayClick.bind(this));
    
    // Close dropdowns when clicking on empty space in calendar
    this.calendar.addEventListener("click", e => {
      const target = e.target as HTMLElement;
      // If the click was not on a select-trigger element or select-content element, close all dropdowns
      if (!target.closest('.select-trigger') && !target.closest('.select-content')) {
        this.closeAllDropdowns();
      }
    });
    
    // Document click handler to close calendar when clicking outside
    this._documentClickHandler = this.handleDocumentClick.bind(this);
    document.addEventListener("click", this._documentClickHandler);
  }

  /**
   * Handle day click using event delegation
   */
  private handleDayClick(e: Event): void {
    const target = e.target as HTMLElement;
    const dayElement = target.closest('.day') as HTMLElement;
    
    // Early return for any invalid or disabled dates
    if (!dayElement || 
        dayElement.classList.contains('empty') || 
        dayElement.classList.contains('disabled') ||
        DateUtils.isDateDisabled(this.jalaliYear, this.jalaliMonth, parseInt(dayElement.textContent || '0'), this.disabledDatesFn)) {
      return;
    }
    
    e.stopPropagation();
    
    // Get the day number from the element
    const dayText = dayElement.textContent;
    if (!dayText) return;
    
    // Convert Persian numerals to standard numbers if needed
    const day = DateFormatter.fromPersianNum(dayText);
    if (isNaN(day)) return;
    
    // Handle range or single selection
    this.handleRangeSelection(day);
  }

  /**
   * Handle input field click
   */
  private handleInputClick = (e: MouseEvent): void => {
    e.stopPropagation();
    this.toggleCalendar();
  }

  /**
   * Handle document clicks to close the calendar when clicking outside
   */
  private handleDocumentClick = (e: Event): void => {
    if (!this.calendar || !this.calendar.classList.contains("visible")) return;
    
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closeAllDropdowns();
      this.toggleCalendar();
    }
  }

  /**
   * Setup navigation buttons (prev, next, today, tomorrow)
   */
  private setupNavigationButtons(): void {
    if (!this.shadowRoot) return;
    
    const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
    const nextMonthBtn = this.shadowRoot.getElementById("next-month");
    const todayBtn = this.shadowRoot.getElementById("today-button");
    const tomorrowBtn = this.shadowRoot.getElementById("tomorrow-button");
    
    // Helper function to add click handler with stopPropagation
    const addClickHandler = (element: HTMLElement | null, handler: () => void): void => {
      if (element) {
        element.addEventListener("click", (e) => {
          e.stopPropagation();
          
          // Close any open dropdowns when navigation buttons are clicked
          this.closeAllDropdowns();
          
          handler();
        });
      }
    };
    
    addClickHandler(prevMonthBtn, () => this.changeMonth(-1));
    addClickHandler(nextMonthBtn, () => this.changeMonth(1));
    addClickHandler(todayBtn, () => this.goToToday());
    addClickHandler(tomorrowBtn, () => this.goToTomorrow());
  }

  /**
   * Handle range selection
   */
  private handleRangeSelection(day: number): void {
    if (!this.isRangeMode) {
      // For single date selection, check if date is valid
      if (DateUtils.isDateDisabled(this.jalaliYear, this.jalaliMonth, day, this.disabledDatesFn)) {
        return;
      }
      this.selectDate(day);
      return;
    }

    const currentDate: DateTuple = [this.jalaliYear, this.jalaliMonth, day];

    // Check if date is within min/max range and not disabled
    if (!DateUtils.isDateInRange(this.jalaliYear, this.jalaliMonth, day, this.minDate, this.maxDate) || 
        DateUtils.isDateDisabled(this.jalaliYear, this.jalaliMonth, day, this.disabledDatesFn)) {
      // Don't allow selection of invalid dates
      return;
    }

    if (!this.isSelectingRange) {
      // Start new range
      this.rangeStart = currentDate;
      this.rangeEnd = null;
      this.isSelectingRange = true;
    } else {
      // Complete range
      this.rangeEnd = currentDate;
      this.isSelectingRange = false;

      // Ensure range is in correct order (start before end)
      if (this.rangeStart && this.rangeEnd) {
        const comparison = DateUtils.compareDates(this.rangeStart, this.rangeEnd);
        if (comparison > 0) {
          // Swap start and end if they're in wrong order
          [this.rangeStart, this.rangeEnd] = [this.rangeEnd, this.rangeStart];
        }
      }

      // Format and display the range
      this.formatAndSetValue();
      
      // Create ISO strings for start and end dates
      const startISOString = this.rangeStart ? DateUtils.jalaliToISOString(this.rangeStart, PersianDate) : null;
      const endISOString = this.rangeEnd ? DateUtils.jalaliToISOString(this.rangeEnd, PersianDate) : null;
      
      // Convert to Gregorian dates
      const startGregorian = this.rangeStart ? PersianDate.jalaliToGregorian(this.rangeStart[0], this.rangeStart[1], this.rangeStart[2]) : null;
      const endGregorian = this.rangeEnd ? PersianDate.jalaliToGregorian(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) : null;
      
      // Dispatch change event with range data
      this.dispatchEvent(new CustomEvent("change", {
        detail: {
          range: {
            start: this.rangeStart,
            end: this.rangeEnd,
            startISOString: startISOString,
            endISOString: endISOString,
            startGregorian: startGregorian,
            endGregorian: endGregorian
          },
          isRange: true
        },
        bubbles: true
      }));
      
      // Close calendar
      this.closeAllDropdowns();
      this.toggleCalendar();
    }

    // Force a re-render of the calendar to update the range highlighting
    this.renderCalendar();
  }

  /**
   * Handle attribute changes
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    // Early return if element is not fully initialized
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'placeholder':
        if (this.input) this.input.placeholder = newValue || '';
        break;
        
      case 'rtl':
        const rtl = newValue !== null && newValue !== 'false';
        this.style.setProperty('--jdp-direction', rtl ? 'rtl' : 'ltr');
        break;
        
      case 'show-holidays':
      case 'show-events':
        this.showEvents = newValue !== null && newValue !== 'false';
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'holiday-types':
      case 'event-types':
        if (newValue) {
          this.seteventTypes(newValue);
        } else {
          this.eventTypes = [...DEFAULT_HOLIDAY_TYPES];
          this.includeAllTypes = false;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'format':
        if (newValue && DateFormatter.isValidFormat(newValue)) {
          this.format = newValue;
          // Ensure the format is applied immediately
          if (this.selectedDate) {
            this.formatAndSetValue();
          }
        }
        break;

      case 'min-date':
        if (newValue) {
          try {
            const [year, month, day] = JSON.parse(newValue);
            this.setMinDate(year, month, day);
          } catch (e) {
            console.error('Invalid min-date format');
          }
        } else {
          this.minDate = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;

      case 'max-date':
        if (newValue) {
          try {
            const [year, month, day] = JSON.parse(newValue);
            this.setMaxDate(year, month, day);
          } catch (e) {
            console.error('Invalid max-date format');
          }
        } else {
          this.maxDate = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;

      case 'disabled-dates':
        if (newValue) {
          // First try to see if the function is a property of this element
          let disabledFn = null;
          
          try {
            // Try to evaluate as a function expression
            if (typeof newValue === 'function') {
              // Direct function assignment (React use case)
              disabledFn = newValue;
            } else if (typeof this[newValue as keyof this] === 'function') {
              // Function is a method on this element
              disabledFn = this[newValue as keyof this] as unknown as ((year: number, month: number, day: number) => boolean);
            } else {
              // Look in window scope as fallback for backward compatibility
              disabledFn = (window as any)[newValue];
            }
          } catch (e) {
            console.error('Error accessing disabled dates function:', e);
          }
          
          if (typeof disabledFn === 'function') {
            this.disabledDatesFn = disabledFn;
          } else {
            console.warn(`Disabled dates function '${newValue}' not found. Function should be provided directly, as a method on the element, or available in the global scope.`);
          }
        } else {
          this.disabledDatesFn = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'today-button-text':
      case 'tomorrow-button-text':
        this.updateButtonText(name, newValue);
        break;
        
      case 'today-button-class':
      case 'tomorrow-button-class':
        this.updateButtonClass(name, newValue);
        break;
        
      case 'range-mode':
        this.isRangeMode = newValue !== null && newValue !== 'false';
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      // Visibility attributes that require re-rendering
      case 'show-month-selector':
      case 'show-year-selector':
      case 'show-prev-button':
      case 'show-next-button':
      case 'show-today-button':
      case 'show-tomorrow-button':
        // Re-create the shadow DOM with updated visibility settings
        if (this.shadowRoot) {
          this.render(this.shadowRoot);
          // Re-initialize after re-rendering
          this.initializeDomReferences();
          this.initializeUIComponents();
          this.addEventListeners();
          this.renderCalendar();
        }
        break;
    }
  }

  /**
   * Helper to update button text from attributes
   */
  private updateButtonText(attrName: string, newValue: string): void {
    if (!this.shadowRoot) return;
    
    const buttonId = attrName === 'today-button-text' ? 'today-button' : 'tomorrow-button';
    const defaultText = attrName === 'today-button-text' ? 'امروز' : 'فردا';
    
    const button = this.shadowRoot.getElementById(buttonId);
    if (button) {
      button.textContent = newValue || defaultText;
    }
  }

  /**
   * Helper to update button class from attributes
   */
  private updateButtonClass(attrName: string, newValue: string): void {
    if (!this.shadowRoot) return;
    
    const buttonId = attrName === 'today-button-class' ? 'today-button' : 'tomorrow-button';
    const baseClass = attrName === 'today-button-class' ? 'today-button' : 'tomorrow-button';
    
    const button = this.shadowRoot.getElementById(buttonId);
    if (button) {
      // Reset to base class
      button.className = `date-nav-button ${baseClass}`;
      
      // Add new classes if provided
      if (newValue) {
        newValue.split(' ').forEach(className => {
          if (className.trim()) {
            button.classList.add(className.trim());
          }
        });
      }
    }
  }
}

// Register the custom element with the browser
// Note: This is intentionally commented out because registration is handled in index.ts
// Uncomment if you need standalone registration without index.ts
// if (typeof window !== 'undefined' && !customElements.get('persian-datepicker-element')) {
//   customElements.define('persian-datepicker-element', PersianDatePickerElement);
// }

// Export the class for direct usage 