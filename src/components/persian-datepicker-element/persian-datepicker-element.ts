import { PersianDate } from '../../utils/persian-date';
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
  top: calc(100% + 5px);
  right: 0;
  width: var(--jdp-calendar-width);
  background: var(--jdp-background);
  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);
  border-radius: var(--jdp-calendar-border-radius);
  box-shadow: var(--jdp-calendar-shadow);
  padding: var(--jdp-calendar-padding);
  text-align: center;
  z-index: var(--jdp-calendar-z-index);
}

.calendar.visible {
  display: block;
  animation: fadeIn var(--jdp-transition-duration) ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }
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

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
`;

/**
 * Jalali Date Picker Web Component
 * 
 * A customizable date picker that follows the Jalali (Persian) calendar.
 * 
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-datepicker-element></persian-datepicker-element>
 * 
 * <!-- With attributes -->
 * <persian-datepicker-element placeholder="انتخاب تاریخ" format="YYYY/MM/DD"></persian-datepicker-element>
 * 
 * <!-- With styling customization -->
 * <persian-datepicker-element style="--jdp-primary: #3b82f6; --jdp-font-family: 'Vazir', sans-serif;"></persian-datepicker-element>
 * ```
 * 
 * @element persian-datepicker-element
 */
export class PersianDatePickerElement extends HTMLElement {
  private input: HTMLInputElement;
  private calendar: HTMLDivElement;
  private monthYearLabel: HTMLSpanElement;
  private daysContainer: HTMLDivElement;
  private dayNamesContainer: HTMLDivElement;
  private jalaliYear: number;
  private jalaliMonth: number;
  private jalaliDay: number;
  private selectedDate: DateTuple | null;
  private options: PersianDatePickerElementOptions;

  static get observedAttributes() {
    return [
      'placeholder', 
      'rtl', 
      'format', 
      // CSS variable attributes
      'primary-color', 
      'primary-hover',
      'background-color',
      'foreground-color',
      'border-color',
      'border-radius',
      'font-family'
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

    // Get DOM references
    this.input = shadow.getElementById("date-input") as HTMLInputElement;
    this.calendar = shadow.getElementById("calendar") as HTMLDivElement;
    this.monthYearLabel = shadow.getElementById("month-year") as HTMLSpanElement;
    this.daysContainer = shadow.getElementById("days-container") as HTMLDivElement;
    this.dayNamesContainer = shadow.getElementById("day-names") as HTMLDivElement;

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

    // Set placeholder if provided in options
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    }

    // Event listeners
    this.input.addEventListener("click", () => this.toggleCalendar());
    shadow.getElementById("prev-month")!.addEventListener("click", () => this.changeMonth(-1));
    shadow.getElementById("next-month")!.addEventListener("click", () => this.changeMonth(1));

    // Close calendar when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.composedPath().includes(this) && this.calendar.classList.contains("visible")) {
        this.toggleCalendar();
      }
    });

    this.renderCalendar();
  }

  /**
   * Apply custom CSS variables to the component
   */
  private applyCustomCssVariables(variables: CSSVariableMap): void {
    if (!variables) return;
    
    Object.entries(variables).forEach(([key, value]) => {
      this.style.setProperty(key, value);
    });
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
      'font-family': '--jdp-font-family'
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
    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
          <div class="header">
            <button id="prev-month" type="button" class="nav-button prev"></button>
            <span class="month-year" id="month-year"></span>
            <button id="next-month" type="button" class="nav-button next"></button>
          </div>
          <div class="day-names" id="day-names"></div>
          <div class="days" id="days-container"></div>
        </div>
      </div>
    `;
  }

  toggleCalendar() {
    this.calendar.classList.toggle("visible");
  }

  changeMonth(direction: number) {
    this.jalaliMonth = Number(this.jalaliMonth) + direction;
    if (this.jalaliMonth < 1) {
      this.jalaliMonth = 12;
      this.jalaliYear--;
    } else if (this.jalaliMonth > 12) {
      this.jalaliMonth = 1;
      this.jalaliYear++;
    }
    this.renderCalendar();
  }

  renderCalendar() {
    // Display month and year in Persian format
    this.monthYearLabel.textContent = `${PersianDate.getMonthName(this.jalaliMonth)} ${this.jalaliYear}`;

    // Clear previous days
    this.daysContainer.innerHTML = "";

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
      dayElement.addEventListener("click", () => this.selectDate(i));
      
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
      
      this.daysContainer.appendChild(dayElement);
    }
  }

  selectDate(day: number) {
    this.jalaliDay = day;
    this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay];
    
    // Format date as YYYY/MM/DD or custom format
    this.formatAndSetValue();
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        jalali: this.selectedDate,
        gregorian: PersianDate.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay)
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

  public clear() {
    this.selectedDate = null;
    this.input.value = '';
    this.renderCalendar();
  }
} 