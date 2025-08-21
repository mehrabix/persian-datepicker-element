import { DateTuple } from '../types';
import { DateUtils } from './date-utils';
import { UIRenderer } from './ui-renderer';
import { DateFormatter } from './date-formatter';

/**
 * Calendar Renderer for Persian Datepicker
 * 
 * Handles all calendar rendering operations including days, months, and events
 */
export class CalendarRenderer {
  constructor(
    private persianDateClass: any,
    private eventUtils: any,
    private showEvents: boolean,
    private eventTypes: string[],
    private includeAllTypes: boolean
  ) {}

  /**
   * Render the calendar with current month/year
   */
  renderCalendar(
    daysContainer: HTMLElement,
    jalaliYear: number,
    jalaliMonth: number,
    selectedDate: DateTuple | null,
    rangeStart: DateTuple | null,
    rangeEnd: DateTuple | null,
    isRangeMode: boolean,
    minDate: DateTuple | null,
    maxDate: DateTuple | null,
    disabledDatesFn: ((year: number, month: number, day: number) => boolean) | null
  ): void {
    if (!daysContainer) return;
      
    // Clear previous days
    daysContainer.innerHTML = "";
      
    // Render the calendar content
    this.renderCalendarContent(
      daysContainer,
      jalaliYear,
      jalaliMonth,
      selectedDate,
      rangeStart,
      rangeEnd,
      isRangeMode,
      minDate,
      maxDate,
      disabledDatesFn
    );
  }

  /**
   * Renders the calendar content for the current month
   */
  private renderCalendarContent(
    daysContainer: HTMLElement,
    jalaliYear: number,
    jalaliMonth: number,
    selectedDate: DateTuple | null,
    rangeStart: DateTuple | null,
    rangeEnd: DateTuple | null,
    isRangeMode: boolean,
    minDate: DateTuple | null,
    maxDate: DateTuple | null,
    disabledDatesFn: ((year: number, month: number, day: number) => boolean) | null
  ): void {
    // Get first day of month and number of days
    const firstDayOfMonth = this.persianDateClass.getDayOfWeek(jalaliYear, jalaliMonth, 1);
    const daysInMonth = this.persianDateClass.getDaysInMonth(jalaliYear, jalaliMonth);
    
    // Get today's date for highlighting
    const today = new Date();
    const jalaliToday = this.persianDateClass.gregorianToJalali(
      today.getFullYear(), 
      today.getMonth() + 1, 
      today.getDate()
    );
    
    // Adjust first day of month for Persian calendar (Saturday is first day of week)
    const adjustedFirstDay = (firstDayOfMonth + 1) % 7;
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < adjustedFirstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day", "empty");
      fragment.appendChild(emptyDay);
    }

    // Generate days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = DateFormatter.toPersianNum(i);
      dayElement.dataset.day = i.toString();
            
      // Check if date is in range and not disabled
      const isInRange = DateUtils.isDateInRange(jalaliYear, jalaliMonth, i, minDate, maxDate);
      const isDisabled = DateUtils.isDateDisabled(jalaliYear, jalaliMonth, i, disabledDatesFn);
            
      if (!isInRange || isDisabled) {
        dayElement.classList.add("disabled");
        dayElement.style.opacity = "0.4";
        dayElement.style.cursor = "not-allowed";
      }
            
      // Highlight today
      if (jalaliYear === jalaliToday[0] && jalaliMonth === jalaliToday[1] && i === jalaliToday[2]) {
        dayElement.classList.add("today");
      }
            
      // Handle range selection highlighting
      if (isRangeMode) {
        this.applyRangeHighlighting(dayElement, jalaliYear, jalaliMonth, i, rangeStart, rangeEnd);
      } else if (selectedDate && 
          jalaliYear === selectedDate[0] && 
          jalaliMonth === selectedDate[1] && 
          i === selectedDate[2]) {
        dayElement.classList.add("selected");
      }
            
      // Add holiday information if enabled
      if (this.showEvents) {
        this.addHolidayInfo(dayElement, jalaliYear, jalaliMonth, i);
      }

      // Setup tooltip and click handlers
      this.setupDayTooltips(dayElement);
      
      fragment.appendChild(dayElement);
    }
    
    // Append all days at once for better performance
    daysContainer.appendChild(fragment);
  }

  /**
   * Apply range highlighting to a day element
   */
  private applyRangeHighlighting(
    dayElement: HTMLElement,
    year: number,
    month: number,
    day: number,
    rangeStart: DateTuple | null,
    rangeEnd: DateTuple | null
  ): void {
    const currentDate: DateTuple = [year, month, day];
    
    // First remove any existing range classes
    dayElement.classList.remove("in-range", "range-start", "range-end");
    
    if (rangeStart && rangeEnd) {
      // Complete range - check if current date is between start and end
      const isInRange = DateUtils.compareDates(currentDate, rangeStart) >= 0 && 
                       DateUtils.compareDates(currentDate, rangeEnd) <= 0;
      
      // Handle start date
      if (DateUtils.compareDates(currentDate, rangeStart) === 0) {
        dayElement.classList.add("range-start");
        // If start and end are the same date, add both classes
        if (DateUtils.compareDates(currentDate, rangeEnd) === 0) {
          dayElement.classList.add("range-end");
        }
      }
      // Handle end date
      else if (DateUtils.compareDates(currentDate, rangeEnd) === 0) {
        dayElement.classList.add("range-end");
      }
      // Handle dates in between
      else if (isInRange) {
        dayElement.classList.add("in-range");
      }
    } else if (rangeStart && !rangeEnd) {
      // Selecting range - only highlight start date
      if (DateUtils.compareDates(currentDate, rangeStart) === 0) {
        dayElement.classList.add("range-start");
      }
    }
  }

  /**
   * Add holiday information to a day element
   * Returns true if the day is a holiday
   */
  private addHolidayInfo(dayElement: HTMLElement, year: number, month: number, day: number): boolean {
    let isHoliday = false;
    
    // Check if it's Friday (6th day in JavaScript's getDay, where 0 is Sunday)
    const dayOfWeek = this.persianDateClass.getDayOfWeek(year, month, day);
    if (dayOfWeek === 5) { // Friday
      dayElement.classList.add("friday");
      isHoliday = true;
    }
    
    // Check if it's a holiday from events.json based on holiday types
    if (this.eventUtils.isHoliday(month, day, this.eventTypes, this.includeAllTypes)) {
      dayElement.classList.add("holiday");
      isHoliday = true;
      
      // Add tooltip with event titles
      const events = this.eventUtils.getEvents(month, day, this.eventTypes, this.includeAllTypes);
      if (events.length > 0) {
        const tooltip = UIRenderer.createEventTooltip(events);
        dayElement.appendChild(tooltip);
      }
    }
    
    return isHoliday;
  }

  /**
   * Set up tooltip handling for a day element
   */
  private setupDayTooltips(dayElement: HTMLElement): void {
    // Add hover handler for desktop tooltips
    dayElement.addEventListener("mouseenter", () => {
      const tooltip = dayElement.querySelector('.event-tooltip');
      if (tooltip) {
        tooltip.classList.add("tooltip-visible");
      }
    });
    
    dayElement.addEventListener("mouseleave", () => {
      const tooltip = dayElement.querySelector('.event-tooltip');
      if (tooltip) {
        tooltip.classList.remove("tooltip-visible");
      }
    });
  }

  /**
   * Update the month and year selector UI elements
   */
  updateMonthYearSelectors(
    shadowRoot: ShadowRoot,
    jalaliYear: number,
    jalaliMonth: number
  ): void {
    if (!shadowRoot) return;
    
    const monthSelectValue = shadowRoot.getElementById("month-select-value") as HTMLSpanElement;
    const yearSelectValue = shadowRoot.getElementById("year-select-value") as HTMLSpanElement;
    
    if (monthSelectValue) {
      monthSelectValue.textContent = UIRenderer.getPersianMonths()[jalaliMonth - 1];
    }
    
    if (yearSelectValue) {
      yearSelectValue.textContent = DateFormatter.toPersianNum(jalaliYear);
    }
    
    // Update selected items in dropdowns
    const monthItems = shadowRoot.querySelectorAll(".month-select-content .select-item");
    monthItems.forEach(item => {
      if (item.getAttribute("data-value") === jalaliMonth.toString()) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
    
    const yearItems = shadowRoot.querySelectorAll(".year-select-content .select-item");
    yearItems.forEach(item => {
      if (item.getAttribute("data-value") === jalaliYear.toString()) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  }

  /**
   * Setup month and year selector dropdowns
   */
  setupMonthYearSelectors(
    shadowRoot: ShadowRoot,
    jalaliYear: number,
    jalaliMonth: number,
    onMonthChange: (month: number, monthName: string) => void,
    onYearChange: (year: number) => void
  ): void {
    if (!shadowRoot) return;
    
    // Get elements
    const monthSelectTrigger = shadowRoot.getElementById("month-select-trigger") as HTMLButtonElement | null;
    const yearSelectTrigger = shadowRoot.getElementById("year-select-trigger") as HTMLButtonElement | null;
    const monthSelectValue = shadowRoot.getElementById("month-select-value") as HTMLSpanElement | null;
    const yearSelectValue = shadowRoot.getElementById("year-select-value") as HTMLSpanElement | null;
    const monthSelectContent = shadowRoot.getElementById("month-select-content") as HTMLDivElement | null;
    const yearSelectContent = shadowRoot.getElementById("year-select-content") as HTMLDivElement | null;
    
    // Exit early if any element is missing
    if (!monthSelectTrigger || !yearSelectTrigger || !monthSelectValue || 
        !yearSelectValue || !monthSelectContent || !yearSelectContent) {
      console.error("Failed to initialize month/year selectors");
      return;
    }
    
    // Clear existing options
    monthSelectContent.innerHTML = "";
    yearSelectContent.innerHTML = "";
    
    // Create month options
    const monthFragment = UIRenderer.createMonthOptions(jalaliMonth, onMonthChange);
    monthSelectContent.appendChild(monthFragment);
    
    // Create year options
    const yearFragment = UIRenderer.createYearOptions(jalaliYear, onYearChange, DateFormatter.toPersianNum);
    yearSelectContent.appendChild(yearFragment);
    
    // Add toggle event listeners to triggers
    monthSelectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown(monthSelectContent, shadowRoot);
    });
    
    yearSelectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown(yearSelectContent, shadowRoot);
    });
    
    // Prevent event bubbling from the content containers
    monthSelectContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    
    yearSelectContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /**
   * Helper method to toggle dropdown visibility
   */
  private toggleDropdown(dropdown: HTMLElement | null, shadowRoot: ShadowRoot): void {
    if (!dropdown) return;
    
    // Check if this dropdown is already open
    const isCurrentlyOpen = dropdown.classList.contains("open");
    
    // Close all dropdowns
    this.closeAllDropdowns(shadowRoot);
    
    // If the dropdown wasn't open, open it now
    // This creates a toggle effect
    if (!isCurrentlyOpen) {
      // Open the dropdown
      dropdown.classList.add("open");
      
      // Find the selected item in this dropdown and scroll to it
      // Use requestAnimationFrame for better timing with rendering
      requestAnimationFrame(() => {
        const selectedItem = dropdown.querySelector(".select-item.selected") as HTMLElement;
        if (selectedItem) {
          // Calculate the optimal scroll position - center the selected item
          const scrollTop = selectedItem.offsetTop - 
            (dropdown.clientHeight / 2) + (selectedItem.clientHeight / 2);
          
          // Apply the scroll position
          dropdown.scrollTop = Math.max(0, scrollTop);
        }
      });
    }
  }

  /**
   * Helper method to close all dropdowns
   */
  private closeAllDropdowns(shadowRoot: ShadowRoot | null): void {
    if (!shadowRoot) return;
    
    const dropdowns = shadowRoot.querySelectorAll(".select-content");
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("open");
    });
  }
} 