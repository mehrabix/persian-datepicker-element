import { PersianDatePickerElementOptions, DateTuple } from './types';
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
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-datepicker-element></persian-datepicker-element>
 *
 * <!-- With attributes -->
 * <persian-datepicker-element placeholder="انتخاب تاریخ" format="YYYY/MM/DD"></persian-datepicker-element>
 *
 * <!-- With holiday types -->
 * <persian-datepicker-element holiday-types="Iran,Afghanistan,AncientIran,International"></persian-datepicker-element>
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
 *
 * <!-- Hiding specific UI elements -->
 * <persian-datepicker-element
 *   show-prev-button="false"
 *   show-next-button="false"
 *   show-tomorrow-button="false"
 * ></persian-datepicker-element>
 * ```
 *
 * @element persian-datepicker-element
 *
 * @attr {string} placeholder - Placeholder text for the input field
 * @attr {string} format - Date format (e.g., "YYYY/MM/DD")
 * @attr {boolean} rtl - Whether to use RTL direction
 * @attr {boolean} show-holidays - Whether to highlight holidays
 * @attr {string} holiday-types - Comma-separated list of holiday types to display (e.g., "Iran,Afghanistan,AncientIran,International" or "all" to show all available types)
 * @attr {string} today-button-text - Custom text for the Today button (default: "امروز")
 * @attr {string} today-button-class - Additional CSS classes for the Today button
 * @attr {string} tomorrow-button-text - Custom text for the Tomorrow button (default: "فردا")
 * @attr {string} tomorrow-button-class - Additional CSS classes for the Tomorrow button
 *
 * @attr {boolean} show-month-selector - Whether to show the month selector (default: true)
 * @attr {boolean} show-year-selector - Whether to show the year selector (default: true)
 * @attr {boolean} show-prev-button - Whether to show the previous month button (default: true)
 * @attr {boolean} show-next-button - Whether to show the next month button (default: true)
 * @attr {boolean} show-today-button - Whether to show the Today button (default: true)
 * @attr {boolean} show-tomorrow-button - Whether to show the Tomorrow button (default: true)
 *
 * Styling:
 * The component can be styled using CSS variables. These can be set globally in your CSS
 * or directly on the element using the style attribute. See the component's CSS file
 * for the complete list of available CSS variables.
 */
export declare class PersianDatePickerElement extends HTMLElement {
    private input;
    private calendar;
    private daysContainer;
    private dayNamesContainer;
    private eventUtils;
    private jalaliYear;
    private jalaliMonth;
    private jalaliDay;
    private selectedDate;
    private isRangeMode;
    private rangeStart;
    private rangeEnd;
    private isSelectingRange;
    private options;
    private showHolidays;
    private holidayTypes;
    private includeAllTypes;
    private isTransitioning;
    private _documentClickHandler;
    private static openCalendarInstance;
    private readonly persianMonths;
    private readonly holidayTypeLabels;
    private format;
    private minDate;
    private maxDate;
    private disabledDatesFn;
    private toPersianNum;
    static get observedAttributes(): string[];
    constructor(options?: PersianDatePickerElementOptions);
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    /**
     * Handle attribute changes
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * Helper to update button text from attributes
     */
    private updateButtonText;
    /**
     * Helper to update button class from attributes
     */
    private updateButtonClass;
    /**
     * Initialize DOM references for the component
     */
    private initializeDomReferences;
    /**
     * Initialize the current date to today's Jalali date
     */
    private initializeCurrentDate;
    /**
     * Initialize UI components like day names and selectors
     */
    private initializeUIComponents;
    /**
     * Helper to initialize day names
     */
    private initializeDayNames;
    /**
     * Setup month and year selector dropdowns
     */
    private setupMonthYearSelectors;
    private addEventListeners;
    /**
     * Handle day click using event delegation
     */
    private handleDayClick;
    /**
     * Convert Persian numerals to standard numbers
     */
    private fromPersianNum;
    /**
     * Handle input field click
     */
    private handleInputClick;
    /**
     * Handle document clicks to close the calendar when clicking outside
     */
    private handleDocumentClick;
    /**
     * Setup navigation buttons (prev, next, today, tomorrow)
     */
    private setupNavigationButtons;
    /**
     * Sets the holiday types to be displayed
     * @param types - Comma-separated string or array of holiday types (e.g., "Iran,Afghanistan,AncientIran,International")
     */
    setHolidayTypes(types: string | string[]): void;
    /**
     * Gets the current holiday types being displayed
     */
    getHolidayTypes(): string[];
    /**
     * Checks if all types are being shown
     */
    isShowingAllTypes(): boolean;
    /**
     * Render the initial component HTML
     */
    private render;
    /**
     * Toggle calendar visibility
     */
    toggleCalendar(): void;
    /**
     * Calculate and set the optimal position for the calendar
     */
    private positionCalendar;
    /**
     * Change to previous or next month
     */
    changeMonth(direction: number): void;
    /**
     * Update the month and year selector UI elements
     */
    private updateMonthYearSelectors;
    /**
     * Render the calendar with current month/year
     */
    renderCalendar(): void;
    /**
     * Renders the calendar content for the current month
     */
    private renderCalendarContent;
    /**
     * Compare two dates in [year, month, day] format
     * Returns -1 if date1 < date2, 0 if date1 = date2, 1 if date1 > date2
     */
    private compareDates;
    /**
     * Set up tooltip handling for a day element
     */
    private setupDayTooltips;
    /**
     * Set up click handling for a day element
     */
    private setupDayClickHandler;
    /**
     * Add holiday information to a day element
     * Returns true if the day is a holiday
     */
    private addHolidayInfo;
    /**
     * Create tooltip element for events
     */
    private createEventTooltip;
    /**
     * Navigate to a specific date (today or tomorrow)
     */
    private navigateToDate;
    /**
     * Navigate to today's date and select it
     */
    private goToToday;
    /**
     * Navigate to tomorrow's date and select it
     */
    private goToTomorrow;
    /**
     * Select a specific date
     */
    selectDate(day: number): void;
    /**
     * Format the selected date and set input value
     */
    private formatAndSetValue;
    /**
     * Format a date tuple according to the specified format
     */
    private formatDate;
    /**
     * Handle special predefined formats
     */
    private handleSpecialFormat;
    /**
     * Handle general format with tokens
     */
    private handleGeneralFormat;
    /**
     * Replace format tokens in a component
     */
    private replaceFormatTokens;
    private isValidFormat;
    private getWeekdayName;
    /**
     * Handle month change from dropdown
     */
    private handleMonthChange;
    /**
     * Handle year change from dropdown
     */
    private handleYearChange;
    /**
     * Sets the date value programmatically
     */
    setValue(year: number, month: number, day: number): void;
    /**
     * Gets the currently selected date as a tuple [year, month, day]
     */
    getValue(): DateTuple | null;
    /**
     * Checks if the currently selected date is a holiday
     */
    isSelectedDateHoliday(): boolean;
    /**
     * Gets events for the currently selected date
     */
    getSelectedDateEvents(): any[];
    /**
     * Clears the selected date
     */
    clear(): void;
    /**
     * Initialize touch gesture support for the calendar
     */
    private initTouchGestures;
    /**
     * Helper method to close all dropdowns
     */
    private closeAllDropdowns;
    /**
     * Helper method to toggle dropdown visibility
     */
    private toggleDropdown;
    /**
     * Programmatically open the calendar
     * Will close any other open calendar instances
     */
    open(): void;
    /**
     * Programmatically close the calendar
     */
    close(): void;
    /**
     * Set minimum date
     */
    setMinDate(year: number, month: number, day: number): void;
    /**
     * Set maximum date
     */
    setMaxDate(year: number, month: number, day: number): void;
    /**
     * Check if a date is within the allowed range
     */
    private isDateInRange;
    /**
     * Check if a date is disabled
     */
    private isDateDisabled;
    private handleRangeSelection;
    setRange(start: DateTuple, end: DateTuple): void;
    getRange(): {
        start: DateTuple | null;
        end: DateTuple | null;
    };
    /**
     * Set a function that determines if a date should be disabled
     * @param fn Function that takes year, month, day and returns boolean (true if date should be disabled)
     */
    setDisabledDatesFn(fn: (year: number, month: number, day: number) => boolean): void;
    /**
     * Handle touch start event for swipe detection
     */
    private handleTouchStart;
    /**
     * Handle touch move event for swipe detection
     */
    private handleTouchMove;
    /**
     * Handle touch end event for swipe detection
     */
    private handleTouchEnd;
    /**
     * Handle touch cancel event
     */
    private handleTouchCancel;
    private _touchStartX;
    private _touchStartY;
    private _isDragging;
    private _isSwiping;
}
