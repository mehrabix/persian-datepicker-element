import { PersianDate } from './persian-date';
import { EventUtils } from './utils/event-utils';
import { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple,
  CSSVariableMap
} from './types';

// Import the CSS as a string
const styles = `:host {
  /* Color scheme */
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Holiday colors */
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
  --jdp-holiday-hover-bg: #fecaca;
  
  /* Typography */
  --jdp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  --jdp-font-weight-medium: 500;
  
  /* Day name typography */
  --jdp-day-name-font-size: 12px;
  --jdp-day-name-font-weight: 400;
  
  /* Day cell typography */
  --jdp-day-font-size: 13px;
  --jdp-day-font-weight: 400;
  
  /* Month year typography */
  --jdp-month-year-font-size: 14px;
  --jdp-month-year-font-weight: 500;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Input field */
  --jdp-input-padding-x: 14px;
  --jdp-input-padding-y: 10px;
  --jdp-input-border-width: 1px;
  --jdp-input-border-color: var(--jdp-border);
  --jdp-input-border-radius: var(--jdp-border-radius);
  --jdp-input-focus-ring-width: 2px;
  --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
  
  /* Calendar popup */
  --jdp-calendar-width: 280px;
  --jdp-calendar-padding: var(--jdp-spacing-md);
  --jdp-calendar-border-width: 1px;
  --jdp-calendar-border-color: var(--jdp-border);
  --jdp-calendar-border-radius: var(--jdp-border-radius);
  --jdp-calendar-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  --jdp-calendar-z-index: 10;
  
  /* Navigation buttons */
  --jdp-nav-button-size: 30px;
  --jdp-nav-button-bg: var(--jdp-muted);
  --jdp-nav-button-bg-hover: var(--jdp-border);
  --jdp-nav-button-border-radius: var(--jdp-border-radius);
  --jdp-nav-arrow-size: 8px;
  --jdp-nav-arrow-thickness: 2px;
  --jdp-nav-arrow-color: var(--jdp-foreground);
  
  /* Day grid */
  --jdp-day-cell-size: 32px;
  --jdp-day-cell-margin: 1px;
  --jdp-day-cell-border-radius: var(--jdp-border-radius);
  
  /* States */
  --jdp-day-hover-bg: var(--jdp-muted);
  --jdp-day-selected-bg: var(--jdp-primary);
  --jdp-day-selected-color: var(--jdp-primary-foreground);
  --jdp-day-today-border-color: var(--jdp-primary);
  --jdp-day-today-border-width: 1px;
  --jdp-day-disabled-opacity: 0.4;
  
  /* Animations */
  --jdp-transition-duration: 0.2s;
  --jdp-fade-from-y: -4px;
  --jdp-fade-from-y-reverse: 4px;
  --jdp-month-transition-duration: 0.3s;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
}

* {
  box-sizing: border-box;
  direction: var(--jdp-direction);
}

.picker-container {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--jdp-font-family);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-weight: var(--jdp-font-weight);
}

input {
  width: 100%;
  padding: var(--jdp-input-padding-y) var(--jdp-input-padding-x);
  border-radius: var(--jdp-input-border-radius);
  border: var(--jdp-input-border-width) solid var(--jdp-input-border-color);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-family: inherit;
  background-color: var(--jdp-background);
  color: var(--jdp-foreground);
  cursor: pointer;
  outline: none;
  transition: all var(--jdp-transition-duration) ease;
  text-align: right;
}

input:focus {
  border-color: var(--jdp-ring);
  box-shadow: 0 0 0 var(--jdp-input-focus-ring-width) var(--jdp-input-focus-ring-color);
}

.calendar {
  display: none;
  position: absolute;
  right: 0;
  width: var(--jdp-calendar-width);
  background: var(--jdp-background);
  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);
  border-radius: var(--jdp-calendar-border-radius);
  box-shadow: var(--jdp-calendar-shadow);
  padding: var(--jdp-calendar-padding);
  text-align: center;
  z-index: var(--jdp-calendar-z-index);
  touch-action: manipulation; /* Allow pan-y but prevent browser handling of horizontal swipes */
  -webkit-overflow-scrolling: none; /* Prevent iOS scrolling */
  -webkit-user-select: none; /* Prevent text selection during swipe */
  user-select: none;
  transform: translateZ(0); /* Hardware acceleration */
  will-change: transform; /* Hint to browser */
  backface-visibility: hidden; /* Prevent flickering */
  contain: layout style; /* Improve performance by isolating the container */
}

.calendar.position-bottom {
  top: calc(100% + 5px);
  animation: fadeInFromTop var(--jdp-transition-duration) ease;
}

.calendar.position-top {
  bottom: calc(100% + 5px);
  animation: fadeInFromBottom var(--jdp-transition-duration) ease;
}

.calendar.visible {
  display: block;
}

@keyframes fadeInFromTop {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInFromBottom {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y-reverse)); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--jdp-spacing-md);
}

.month-year {
  font-weight: var(--jdp-month-year-font-weight);
  font-size: var(--jdp-month-year-font-size);
  color: var(--jdp-foreground);
  transition: opacity var(--jdp-transition-duration) ease;
}

.month-year.fade {
  opacity: 0;
}

.days-wrapper {
  position: relative;
  touch-action: pan-y; /* Allow vertical scrolling but handle horizontal ourselves */
  overflow: visible; /* Allow event tooltips to be visible outside the container */
  z-index: 1; /* Ensure tooltips are visible above other elements */
  contain: layout; /* Improve performance */
  isolation: isolate; /* Create new stacking context */
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  transition: transform var(--jdp-month-transition-duration) ease, opacity var(--jdp-month-transition-duration) ease;
  will-change: transform, opacity; /* Hint to browser */
  transform: translateZ(0); /* Hardware acceleration */
  backface-visibility: hidden; /* Prevent flickering */
  position: relative; /* Position for correct animation */
  contain: layout; /* Improve performance */
}

.days.slide-left, .days.slide-right {
  /* Keep animation isolated within container without cutting off tooltips */
  isolation: isolate;
}

.days.slide-left {
  animation: slideInLeft var(--jdp-month-transition-duration) ease;
}

.days.slide-right {
  animation: slideInRight var(--jdp-month-transition-duration) ease;
}

@keyframes slideInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-10%) translateZ(0);
    pointer-events: none; /* Don't capture events during animation */ 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto; /* Restore events after animation */  
  }
}

@keyframes slideInRight {
  from { 
    opacity: 0; 
    transform: translateX(10%) translateZ(0); 
    pointer-events: none; /* Don't capture events during animation */
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto; /* Restore events after animation */ 
  }
}

/* Ensure tooltips stay visible even during animations */
.day {
  position: relative; /* Required for tooltip positioning */
  z-index: 1; /* Base z-index */
  touch-action: manipulation; /* Improve touch behavior */
  isolation: isolate; /* Create new stacking context for each day */
}

.day:hover {
  z-index: 2; /* Raise z-index on hover to keep tooltip on top */
}

.nav-button {
  background: var(--jdp-nav-button-bg);
  border: none;
  border-radius: var(--jdp-nav-button-border-radius);
  width: var(--jdp-nav-button-size);
  height: var(--jdp-nav-button-size);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--jdp-transition-duration) ease;
  position: relative;
  touch-action: manipulation; /* Improve touch behavior */
  will-change: transform, background-color; /* Optimize navigation button animations */
}

.nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.nav-button:active {
  transform: translateY(1px);
}

.nav-button::before {
  content: '';
  display: block;
  width: var(--jdp-nav-arrow-size);
  height: var(--jdp-nav-arrow-size);
  border-top: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  border-right: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  position: absolute;
}

.nav-button.prev::before {
  transform: rotate(45deg);
  right: 11px;
  left: auto;
}

.nav-button.next::before {
  transform: rotate(225deg);
  left: 11px;
  right: auto;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--jdp-spacing-sm);
}

.day-name {
  font-size: var(--jdp-day-name-font-size);
  font-weight: var(--jdp-day-name-font-weight);
  color: var(--jdp-muted-foreground);
  padding: var(--jdp-spacing-xs) 0;
  text-align: center;
}

.day {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--jdp-day-cell-border-radius);
  font-size: var(--jdp-day-font-size);
  font-weight: var(--jdp-day-font-weight);
  cursor: pointer;
  transition: var(--jdp-transition-duration) ease;
  margin: var(--jdp-day-cell-margin);
  position: relative;
  touch-action: manipulation; /* Add touch action manipulation */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight color on mobile */
  -webkit-user-select: none; /* Prevent text selection */
  user-select: none;
}

.day:hover:not(.empty):not(.disabled) {
  background: var(--jdp-day-hover-bg);
}

.day.selected {
  background: var(--jdp-day-selected-bg);
  color: var(--jdp-day-selected-color);
}

.day.today:not(.selected) {
  border: var(--jdp-day-today-border-width) solid var(--jdp-day-today-border-color);
}

.day.empty {
  cursor: default;
}

.day.disabled {
  opacity: var(--jdp-day-disabled-opacity);
  cursor: not-allowed;
}

/* Holiday styles */
.day.holiday:not(.selected) {
  color: var(--jdp-holiday-color);
  background-color: var(--jdp-holiday-bg);
  font-weight: var(--jdp-font-weight-medium);
}

.day.holiday:hover:not(.selected):not(.disabled) {
  background-color: var(--jdp-holiday-hover-bg);
}

.day.friday {
  color: var(--jdp-holiday-color);
}

.event-tooltip {
  position: absolute;
  background: var(--jdp-background);
  border: 1px solid var(--jdp-border);
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-sm);
  width: 200px;
  box-shadow: var(--jdp-calendar-shadow);
  text-align: right;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--jdp-transition-duration) ease, visibility var(--jdp-transition-duration) ease;
  pointer-events: none;
  bottom: 120%;
  right: 0;
  transform: translateY(-5px);
  z-index: 9999; /* Increased z-index to ensure it's always on top */
}

.event-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  background: var(--jdp-background);
}

/* Mobile-specific tooltip positioning */
@media (max-width: 768px) {
  .event-tooltip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    bottom: auto;
    right: auto;
    background: var(--jdp-background);
    z-index: 9999; /* Ensure high z-index on mobile too */
  }

  /* Add a semi-transparent overlay behind the tooltip */
  .event-tooltip::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  /* Style the close button */
  .tooltip-close-button {
    margin-top: 8px;
    padding: 6px 12px;
    background: var(--jdp-muted);
    border: 1px solid var(--jdp-border);
    border-radius: var(--jdp-border-radius);
    font-size: 12px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    color: var(--jdp-foreground);
    transition: all var(--jdp-transition-duration) ease;
  }

  .tooltip-close-button:hover {
    background: var(--jdp-nav-button-bg-hover);
  }

  .tooltip-close-button:active {
    transform: translateY(1px);
  }
}

.event-item {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--jdp-border);
  color: var(--jdp-foreground);
  background: var(--jdp-background); /* Ensure event items have white background */
}

.event-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.event-item.holiday {
  color: var(--jdp-holiday-color);
}

.event-type-label {
  display: inline-block;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  margin-right: 4px;
  background-color: var(--jdp-muted);
  color: var(--jdp-muted-foreground);
}

/* Today button styling */
.footer {
  margin-top: var(--jdp-spacing-md);
  display: flex;
  justify-content: space-between;
}

.date-nav-button {
  background: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-md);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  color: var(--jdp-foreground);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.date-nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.date-nav-button:active {
  transform: translateY(1px);
}

.today-button {
  /* Inherits from date-nav-button */
}

.tomorrow-button {
  /* Inherits from date-nav-button */
}

/* Month/Year selectors */
.selectors-container {
  display: flex;
  gap: var(--jdp-spacing-xs);
}

.date-select {
  background-color: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  color: var(--jdp-foreground);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-sm);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none'%3E%3Cpath fill='%2364748b' d='M0 0h12L6 6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 8px center;
  padding-left: 24px;
  text-align: center;
  transition: background-color var(--jdp-transition-duration) ease;
}

.date-select:hover {
  background-color: var(--jdp-nav-button-bg-hover);
}

.month-select {
  width: 100px;
}

.year-select {
  width: 70px;
}

/* RTL specific styles for selectors */
:host([rtl="true"]) .date-select,
:host([dir="rtl"]) .date-select {
  background-position: right 8px center;
  padding-right: 24px;
  padding-left: var(--jdp-spacing-sm);
}
`;

/**
 * Default holiday types to show in the datepicker
 */
const DEFAULT_HOLIDAY_TYPES = ['Iran', 'Religious'];

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
 * - Customizable styling
 * 
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-datepicker-element></persian-datepicker-element>
 * 
 * <!-- With attributes -->
 * <persian-datepicker-element placeholder="انتخاب تاریخ" format="YYYY/MM/DD"></persian-datepicker-element>
 * 
 * <!-- With holiday types -->
 * <persian-datepicker-element holiday-types="Iran,Religious"></persian-datepicker-element>
 * 
 * <!-- With all holiday types -->
 * <persian-datepicker-element holiday-types="all"></persian-datepicker-element>
 * 
 * <!-- With custom Today button text -->
 * <persian-datepicker-element today-button-text="Go to Today"></persian-datepicker-element>
 * 
 * <!-- With custom Tomorrow button text -->
 * <persian-datepicker-element tomorrow-button-text="Next Day"></persian-datepicker-element>
 * 
 * <!-- With custom button styling -->
 * <persian-datepicker-element today-button-class="primary rounded" tomorrow-button-class="secondary rounded"></persian-datepicker-element>
 * 
 * <!-- With styling customization -->
 * <persian-datepicker-element style="--jdp-primary: #3b82f6; --jdp-font-family: 'Vazir', sans-serif;"></persian-datepicker-element>
 * ```
 * 
 * @element persian-datepicker-element
 * 
 * @attr {string} placeholder - Placeholder text for the input field
 * @attr {string} format - Date format (e.g., "YYYY/MM/DD")
 * @attr {boolean} rtl - Whether to use RTL direction
 * @attr {boolean} show-holidays - Whether to highlight holidays
 * @attr {string} holiday-types - Comma-separated list of holiday types to display
 * @attr {string} today-button-text - Custom text for the Today button (default: "امروز")
 * @attr {string} today-button-class - Additional CSS classes for the Today button
 * @attr {string} tomorrow-button-text - Custom text for the Tomorrow button (default: "فردا")
 * @attr {string} tomorrow-button-class - Additional CSS classes for the Tomorrow button
 * @attr {string} primary-color - Primary color for selected dates
 * @attr {string} primary-hover - Hover color for interactive elements
 * @attr {string} background-color - Background color for the calendar
 * @attr {string} foreground-color - Text color
 * @attr {string} border-color - Border color
 * @attr {string} border-radius - Border radius for rounded corners
 * @attr {string} font-family - Font family
 * @attr {string} holiday-color - Text color for holidays
 * @attr {string} holiday-bg - Background color for holidays
 */
export class PersianDatePickerElement extends HTMLElement {
  private input: HTMLInputElement;
  private calendar: HTMLDivElement;
  private monthYearLabel: HTMLSelectElement;
  private daysContainer: HTMLDivElement;
  private dayNamesContainer: HTMLDivElement;
  private jalaliYear: number;
  private jalaliMonth: number;
  private jalaliDay: number;
  private selectedDate: DateTuple | null;
  private options: PersianDatePickerElementOptions;
  private showHolidays: boolean = true;
  private holidayTypes: string[] = [...DEFAULT_HOLIDAY_TYPES];
  private includeAllTypes: boolean = false;
  private isTransitioning: boolean = false;

  static get observedAttributes() {
    return [
      'placeholder', 
      'rtl', 
      'format', 
      'show-holidays',
      'holiday-types',
      'today-button-text',
      'today-button-class',
      'tomorrow-button-text',
      'tomorrow-button-class',
      // CSS variable attributes
      'primary-color', 
      'primary-hover',
      'background-color',
      'foreground-color',
      'border-color',
      'border-radius',
      'font-family',
      'holiday-color',
      'holiday-bg'
    ];
  }

  constructor(options: PersianDatePickerElementOptions = {}) {
    super();
    this.options = options;
    const shadow = this.attachShadow({ mode: "open" });

    // Create the component's HTML structure
    this.render(shadow);

    // Apply any custom CSS variables provided in options
    if (options.cssVariables) {
      this.applyCustomCssVariables(options.cssVariables);
    }

    // Set holiday types if provided in options
    if (options.holidayTypes) {
      this.setHolidayTypes(options.holidayTypes);
    }

    // Get DOM references
    this.input = shadow.getElementById("date-input") as HTMLInputElement;
    this.calendar = shadow.getElementById("calendar") as HTMLDivElement;
    this.monthYearLabel = shadow.getElementById("month-select") as HTMLSelectElement;
    this.daysContainer = shadow.getElementById("days-container") as HTMLDivElement;
    this.dayNamesContainer = shadow.getElementById("day-names") as HTMLDivElement;
    
    // Setup month and year selectors
    this.setupMonthYearSelectors();

    // Initialize the day names (Saturday to Friday in Persian)
    const dayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
    dayNames.forEach(name => {
      const dayNameEl = document.createElement("div");
      dayNameEl.classList.add("day-name");
      dayNameEl.textContent = name;
      this.dayNamesContainer.appendChild(dayNameEl);
    });

    // Get today's Jalali date
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
    
    // Refresh events to ensure Hijri events are mapped to correct Jalali dates
    EventUtils.refreshEvents();

    // Set placeholder if provided in options
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    }

    // Event listeners
    this.input.addEventListener("click", () => this.toggleCalendar());
    shadow.getElementById("prev-month")!.addEventListener("click", () => this.changeMonth(-1));
    shadow.getElementById("next-month")!.addEventListener("click", () => this.changeMonth(1));
    shadow.getElementById("today-button")!.addEventListener("click", () => this.goToToday());
    shadow.getElementById("tomorrow-button")!.addEventListener("click", () => this.goToTomorrow());
    
    // Add event listeners for month and year select dropdowns
    const monthSelect = shadow.getElementById("month-select") as HTMLSelectElement;
    const yearSelect = shadow.getElementById("year-select") as HTMLSelectElement;
    
    monthSelect.addEventListener("change", () => {
      this.jalaliMonth = parseInt(monthSelect.value);
      this.renderCalendar();
    });
    
    yearSelect.addEventListener("change", () => {
      const previousYear = this.jalaliYear;
      this.jalaliYear = parseInt(yearSelect.value);
      
      // If the year has changed, refresh the Hijri events
      if (previousYear !== this.jalaliYear) {
        EventUtils.refreshEvents();
      }
      
      this.renderCalendar();
    });

    // Close calendar when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.composedPath().includes(this) && this.calendar.classList.contains("visible")) {
        this.toggleCalendar();
      }
    });

    // Touch swipe gestures for calendar navigation
    this.initTouchGestures();

    this.renderCalendar();
  }

  /**
   * Apply custom CSS variables to the component
   */
  private applyCustomCssVariables(variables: CSSVariableMap): void {
    if (!variables) return;
    
    Object.entries(variables).forEach(([key, value]) => {
      this.style.setProperty(key, String(value));
    });
  }

  /**
   * Sets the holiday types to be displayed
   * @param types Holiday types as a string (comma-separated) or an array of strings
   */
  setHolidayTypes(types: string | string[]): void {
    if (typeof types === 'string') {
      // Special case for "all" which includes all types
      if (types.toLowerCase() === 'all') {
        this.includeAllTypes = true;
        this.holidayTypes = [...EventUtils.getEventTypes()]; // Get all available types
        return;
      }
      
      // Parse comma-separated values
      this.holidayTypes = types.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(types)) {
      this.holidayTypes = [...types];
    } else {
      this.holidayTypes = [...DEFAULT_HOLIDAY_TYPES];
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
  getHolidayTypes(): string[] {
    return [...this.holidayTypes];
  }
  
  /**
   * Checks if all types (including excluded ones) are being shown
   */
  isShowingAllTypes(): boolean {
    return this.includeAllTypes;
  }

  // Handle attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    // Map of attribute names to CSS variable names
    const cssVarMap: Record<string, string> = {
      'primary-color': '--jdp-primary',
      'primary-hover': '--jdp-primary-hover',
      'background-color': '--jdp-background',
      'foreground-color': '--jdp-foreground',
      'border-color': '--jdp-border',
      'border-radius': '--jdp-border-radius',
      'font-family': '--jdp-font-family',
      'holiday-color': '--jdp-holiday-color',
      'holiday-bg': '--jdp-holiday-bg'
    };
    
    switch (name) {
      case 'placeholder':
        if (this.input) this.input.placeholder = newValue;
        break;
      case 'rtl':
        if (this.shadowRoot) {
          const rtl = newValue !== null && newValue !== 'false';
          // Type cast 'this' to HTMLElement to access style property
          (this as unknown as HTMLElement).style.setProperty('--jdp-direction', rtl ? 'rtl' : 'ltr');
        }
        break;
      case 'show-holidays':
        this.showHolidays = newValue !== null && newValue !== 'false';
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
      case 'holiday-types':
        if (newValue) {
          this.setHolidayTypes(newValue);
        } else {
          this.holidayTypes = [...DEFAULT_HOLIDAY_TYPES];
          this.includeAllTypes = false;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
      case 'today-button-text':
        // Update Today button text if it exists
        if (this.shadowRoot) {
          const todayButton = this.shadowRoot.getElementById('today-button');
          if (todayButton) {
            todayButton.textContent = newValue || 'امروز';
          }
        }
        break;
      case 'today-button-class':
        // Update Today button class if it exists
        if (this.shadowRoot) {
          const todayButton = this.shadowRoot.getElementById('today-button');
          if (todayButton) {
            // Remove all classes except the base today-button class
            todayButton.className = 'today-button';
            // Add new classes if provided
            if (newValue) {
              newValue.split(' ').forEach(className => {
                if (className.trim()) {
                  todayButton.classList.add(className.trim());
                }
              });
            }
          }
        }
        break;
      case 'tomorrow-button-text':
        // Update Tomorrow button text if it exists
        if (this.shadowRoot) {
          const tomorrowButton = this.shadowRoot.getElementById('tomorrow-button');
          if (tomorrowButton) {
            tomorrowButton.textContent = newValue || 'فردا';
          }
        }
        break;
      case 'tomorrow-button-class':
        // Update Tomorrow button class if it exists
        if (this.shadowRoot) {
          const tomorrowButton = this.shadowRoot.getElementById('tomorrow-button');
          if (tomorrowButton) {
            // Remove all classes except the base tomorrow-button class
            tomorrowButton.className = 'tomorrow-button';
            // Add new classes if provided
            if (newValue) {
              newValue.split(' ').forEach(className => {
                if (className.trim()) {
                  tomorrowButton.classList.add(className.trim());
                }
              });
            }
          }
        }
        break;
      default:
        // Handle CSS variable attributes
        if (cssVarMap[name] && this.shadowRoot) {
          // Type cast 'this' to HTMLElement to access style property
          (this as unknown as HTMLElement).style.setProperty(cssVarMap[name], newValue);
        }
        break;
    }
  }

  private render(shadow: ShadowRoot) {
    // Get today button text from attribute or use default "امروز"
    const todayButtonText = this.getAttribute('today-button-text') || 'امروز';
    // Get any additional classes for the today button
    const todayButtonClass = this.getAttribute('today-button-class') || '';
    // Get tomorrow button text from attribute or use default "فردا"
    const tomorrowButtonText = this.getAttribute('tomorrow-button-text') || 'فردا';
    // Get any additional classes for the tomorrow button
    const tomorrowButtonClass = this.getAttribute('tomorrow-button-class') || '';
    
    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
          <div class="header">
            <button id="prev-month" type="button" class="nav-button prev"></button>
            <div class="selectors-container">
              <select id="month-select" class="date-select month-select"></select>
              <select id="year-select" class="date-select year-select"></select>
            </div>
            <button id="next-month" type="button" class="nav-button next"></button>
          </div>
          <div class="day-names" id="day-names"></div>
          <div class="days-wrapper">
          <div class="days" id="days-container"></div>
          </div>
          <div class="footer">
            <button id="today-button" type="button" class="date-nav-button today-button ${todayButtonClass}">${todayButtonText}</button>
            <button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${tomorrowButtonClass}">${tomorrowButtonText}</button>
          </div>
        </div>
      </div>
    `;
  }

  toggleCalendar() {
    if (this.calendar.classList.contains("visible")) {
      // Hide calendar
      this.calendar.classList.remove("visible", "position-bottom", "position-top");
    } else {
      // Show calendar with position calculation
      this.positionCalendar();
      this.calendar.classList.add("visible");
    }
  }

  /**
   * Calculate and set the optimal position for the calendar
   */
  private positionCalendar(): void {
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

  changeMonth(direction: number) {
    // Prevent multiple transitions at once
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Cache reference to calendar elements
    const daysContainer = this.daysContainer;
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
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
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        // Set a timeout to actually update the calendar
        setTimeout(() => {
          // Update month and year selects
          if (this.shadowRoot) {
            const monthSelect = this.shadowRoot.getElementById("month-select") as HTMLSelectElement;
            const yearSelect = this.shadowRoot.getElementById("year-select") as HTMLSelectElement;
            
            if (monthSelect) monthSelect.value = this.jalaliMonth.toString();
            if (yearSelect) yearSelect.value = this.jalaliYear.toString();
          }
          
          // Clear days container and render new content
          daysContainer.innerHTML = "";
          this.renderCalendarContent();
          
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
    });
  }

  renderCalendar() {
    const shadow = this.shadowRoot!;
    
    // Update month and year select values
    const monthSelect = shadow.getElementById("month-select") as HTMLSelectElement;
    const yearSelect = shadow.getElementById("year-select") as HTMLSelectElement;
    
    monthSelect.value = this.jalaliMonth.toString();
    yearSelect.value = this.jalaliYear.toString();

    // Clear previous days
    this.daysContainer.innerHTML = "";

    // Render the calendar content
    this.renderCalendarContent();
  }
  
  /**
   * Renders the calendar content for the current month
   */
  private renderCalendarContent(): void {
    // Get first day of month and number of days
    const firstDayOfMonth = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, 1);
    const daysInMonth = PersianDate.getDaysInMonth(this.jalaliYear, this.jalaliMonth);
    
    // Get today's date for highlighting
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(), 
      today.getMonth() + 1, 
      today.getDate()
    );
    
    // Adjust first day of month for Persian calendar (Saturday is first day of week)
    const adjustedFirstDay = (firstDayOfMonth + 1) % 7;
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < adjustedFirstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day", "empty");
      this.daysContainer.appendChild(emptyDay);
    }

    // Generate days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i.toString();
      
      // Improve touch behavior on day elements
      dayElement.addEventListener("touchstart", (e) => {
        // Just let it propagate to handle in the calendar's touch handlers
      }, { passive: true });
      
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
      
      // Add click listener with proper event handling
      let lastTapTime = 0;
      dayElement.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;
        
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          if (tapLength < 500 && tapLength > 0) {
            // Double tap detected - show tooltip
            const tooltip = dayElement.querySelector('.event-tooltip');
            if (tooltip) {
              const tooltips = this.shadowRoot?.querySelectorAll('.event-tooltip.tooltip-visible');
              tooltips?.forEach(t => t.classList.remove("tooltip-visible"));
              tooltip.classList.add("tooltip-visible");
            }
          } else {
            // Single tap - select the date
            this.selectDate(i);
          }
        } else {
          // For non-mobile, just select the date
          this.selectDate(i);
        }
        
        lastTapTime = currentTime;
      });
      
      // Highlight today
      if (this.jalaliYear === jalaliToday[0] && this.jalaliMonth === jalaliToday[1] && i === jalaliToday[2]) {
        dayElement.classList.add("today");
      }
      
      // Highlight selected date
      if (this.selectedDate && 
          this.jalaliYear === this.selectedDate[0] && 
          this.jalaliMonth === this.selectedDate[1] && 
          i === this.selectedDate[2]) {
        dayElement.classList.add("selected");
      }
      
      // Check if the day is a holiday
      if (this.showHolidays) {
        // Check if it's Friday (6th day in JavaScript's getDay, where 0 is Sunday)
        const dayOfWeek = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, i);
        if (dayOfWeek === 5) { // Friday
          dayElement.classList.add("friday");
        }
        
        // Check if it's a holiday from events.json based on holiday types
        if (EventUtils.isHoliday(this.jalaliMonth, i, this.holidayTypes, this.includeAllTypes)) {
          dayElement.classList.add("holiday");
          
          // Add tooltip with event titles
          const events = EventUtils.getEvents(this.jalaliMonth, i, this.holidayTypes, this.includeAllTypes);
          if (events.length > 0) {
            const tooltip = document.createElement("div");
            tooltip.classList.add("event-tooltip");
            
            events.forEach(event => {
              const eventItem = document.createElement("div");
              eventItem.classList.add("event-item");
              
              // Add 'holiday' class to highlight holiday events
              if (event.holiday) {
                eventItem.classList.add("holiday");
              }
              
              // Add type label
              const typeLabel = document.createElement("span");
              typeLabel.classList.add("event-type-label");
              typeLabel.textContent = event.type;
              
              eventItem.appendChild(typeLabel);
              
              // Add event title
              const titleSpan = document.createElement("span");
              titleSpan.textContent = event.title;
              eventItem.appendChild(titleSpan);
              
              tooltip.appendChild(eventItem);
            });
            
            // Add focus handling to maintain tooltip styling
            tooltip.addEventListener("focusin", () => {
              tooltip.style.background = "var(--jdp-background)";
            });
            
            tooltip.addEventListener("focusout", () => {
              tooltip.style.background = "var(--jdp-background)";
            });
            
            dayElement.appendChild(tooltip);
          }
        }
      }
      
      this.daysContainer.appendChild(dayElement);
    }
  }

  selectDate(day: number) {
    this.jalaliDay = day;
    this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay];
    
    // Format date as YYYY/MM/DD or custom format
    this.formatAndSetValue();
    
    // Get all events for the selected date
    const events = EventUtils.getEvents(this.jalaliMonth, day, this.holidayTypes, this.includeAllTypes);
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        jalali: this.selectedDate,
        gregorian: PersianDate.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay),
        isHoliday: EventUtils.isHoliday(this.jalaliMonth, day, this.holidayTypes, this.includeAllTypes),
        events: events
      },
      bubbles: true
    }) as PersianDateChangeEvent);
    
    this.toggleCalendar();
    this.renderCalendar();
  }

  private formatAndSetValue() {
    if (!this.selectedDate) return;
    
    const format = this.getAttribute('format') || this.options.format || 'YYYY/MM/DD';
    
    let formattedDate = format
      .replace('YYYY', this.selectedDate[0].toString())
      .replace('MM', this.selectedDate[1].toString().padStart(2, '0'))
      .replace('DD', this.selectedDate[2].toString().padStart(2, '0'));
      
    this.input.value = formattedDate;
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
    return this.selectedDate;
  }

  /**
   * Checks if the currently selected date is a holiday
   */
  public isSelectedDateHoliday(): boolean {
    if (!this.selectedDate) return false;
    return EventUtils.isHoliday(this.selectedDate[1], this.selectedDate[2], this.holidayTypes, this.includeAllTypes);
  }

  /**
   * Gets events for the currently selected date
   */
  public getSelectedDateEvents(): any[] {
    if (!this.selectedDate) return [];
    return EventUtils.getEvents(this.selectedDate[1], this.selectedDate[2], this.holidayTypes, this.includeAllTypes);
  }

  /**
   * Clears the selected date
   */
  public clear() {
    this.selectedDate = null;
    this.input.value = '';
    this.renderCalendar();
  }

  /**
   * Initialize touch gesture support for the calendar
   */
  private initTouchGestures(): void {
    let startX: number = 0;
    let startY: number = 0;
    let isDragging: boolean = false;
    const threshold = 20; // Even lower threshold for more responsive swipes
    let touchStartTime: number = 0;
    let isSwiping = false;
    
    // Handle touch start - capture initial position
    this.calendar.addEventListener('touchstart', (e: TouchEvent) => {
      // Only handle touches when calendar is visible
      if (!this.calendar.classList.contains("visible")) return;
      
      // Store initial touch position
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = false;
      isSwiping = false;
      touchStartTime = Date.now();
    }, { passive: true });
    
    // For the entire calendar, capture touchmove events
    this.calendar.addEventListener('touchmove', (e: TouchEvent) => {
      // Only process if calendar is visible
      if (!this.calendar.classList.contains("visible")) return;
      
      // Calculate how far we've moved
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      
      // If we're already swiping, always prevent default
      if (isSwiping) {
        e.preventDefault();
        return;
      }
      
      // If horizontal movement is greater than vertical movement and significant
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        // We have a horizontal swipe inside the calendar - prevent page scrolling
        e.preventDefault();
        isDragging = true;
        isSwiping = true;
      }
    }, { passive: false });
    
    // Handle touch end - determine if it was a swipe
    this.calendar.addEventListener('touchend', (e: TouchEvent) => {
      if (!this.calendar.classList.contains("visible")) return;
      
      // Reset swiping state
      const wasSwiping = isSwiping;
      isSwiping = false;
      
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;
      
      // Only process if the touch was quick (< 300ms) or we detected dragging
      if ((touchDuration < 300 || isDragging) && !this.isTransitioning) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = endX - startX;
        const diffY = endY - startY;
        
        // Only consider horizontal movements that are larger than vertical movements
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
          // Determine direction based on RTL mode
          const isRTL = getComputedStyle(this).getPropertyValue('--jdp-direction').trim() === 'rtl';
          
          // In RTL mode, swipe left moves to next month, swipe right moves to previous month
          // In LTR mode, it's the opposite
          if ((isRTL && diffX < 0) || (!isRTL && diffX > 0)) {
            e.preventDefault(); // Prevent any default actions
            e.stopPropagation(); // Stop event from propagating
            this.changeMonth(1); // Next month
          } else if ((isRTL && diffX > 0) || (!isRTL && diffX < 0)) {
            e.preventDefault(); // Prevent any default actions
            e.stopPropagation(); // Stop event from propagating
            this.changeMonth(-1); // Previous month
          }
        }
      }
      
      // If we were swiping, prevent any click events
      if (wasSwiping) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Add a touchcancel handler to reset state
    this.calendar.addEventListener('touchcancel', () => {
      isSwiping = false;
      isDragging = false;
    });
    
    // Improve performance by preventing events from being processed by the whole document
    this.calendar.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    }, { passive: true });
    
    // Improve month navigation performance
    this.shadowRoot?.getElementById("prev-month")?.addEventListener("touchstart", (e) => {
      e.stopPropagation();
    }, { passive: true });
    
    this.shadowRoot?.getElementById("next-month")?.addEventListener("touchstart", (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  /**
   * Navigate to today's date and select it
   */
  private goToToday(): void {
    // Get today's date
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    
    const previousYear = this.jalaliYear;
    
    // Update current view to today's month/year
    this.jalaliYear = jalaliToday[0];
    this.jalaliMonth = jalaliToday[1];
    
    // If the year has changed, refresh the Hijri events
    if (previousYear !== this.jalaliYear) {
      EventUtils.refreshEvents();
    }
    
    // Render the calendar with the new month/year
    this.renderCalendar();
    
    // Select today's date
    this.selectDate(jalaliToday[2]);
  }

  /**
   * Navigate to tomorrow's date and select it
   */
  private goToTomorrow(): void {
    // Get tomorrow's date (add 1 day to today)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const jalaliTomorrow = PersianDate.gregorianToJalali(
        tomorrow.getFullYear(),
        tomorrow.getMonth() + 1,
        tomorrow.getDate()
    );
    
    const previousYear = this.jalaliYear;
    
    // Update current view to tomorrow's month/year
    this.jalaliYear = jalaliTomorrow[0];
    this.jalaliMonth = jalaliTomorrow[1];
    
    // If the year has changed, refresh the Hijri events
    if (previousYear !== this.jalaliYear) {
      EventUtils.refreshEvents();
    }
    
    // Render the calendar with the new month/year
    this.renderCalendar();
    
    // Select tomorrow's date
    this.selectDate(jalaliTomorrow[2]);
  }

  /**
   * Setup month and year selector dropdowns
   */
  private setupMonthYearSelectors(): void {
    const shadow = this.shadowRoot!;
    const monthSelect = shadow.getElementById("month-select") as HTMLSelectElement;
    const yearSelect = shadow.getElementById("year-select") as HTMLSelectElement;
    
    // Clear existing options
    monthSelect.innerHTML = "";
    yearSelect.innerHTML = "";
    
    // Add month options (1-12)
    const persianMonths = [
      "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
      "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ];
    
    persianMonths.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = (index + 1).toString();
      option.textContent = month;
      monthSelect.appendChild(option);
    });
    
    // Add year options (current year - 100 to current year + 50)
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(), 
      today.getMonth() + 1, 
      today.getDate()
    );
    
    const currentJalaliYear = jalaliToday[0];
    const startYear = currentJalaliYear - 100;
    const endYear = currentJalaliYear + 50;
    
    for (let year = startYear; year <= endYear; year++) {
      const option = document.createElement("option");
      option.value = year.toString();
      option.textContent = year.toString();
      yearSelect.appendChild(option);
    }
  }
} 