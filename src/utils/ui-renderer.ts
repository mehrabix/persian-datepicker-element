/**
 * UI Renderer for Persian Datepicker
 * 
 * Handles all HTML generation and rendering logic
 */
export class UIRenderer {
  // Persian month names - defined once to avoid recreation
  private static readonly persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  // Day names (Saturday to Friday in Persian)
  private static readonly dayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  // Holiday type labels mapping
  private static readonly holidayTypeLabels: { [key: string]: string } = {
    'Iran': 'ایران',
    'Afghanistan': 'افغانستان',
    'AncientIran': 'ایران باستان',
    'International': 'بین‌المللی'
  };

  /**
   * Generate header HTML based on visibility configuration
   */
  static generateHeaderHTML(visibility: {
    showMonthSelector: boolean;
    showYearSelector: boolean;
    showPrevButton: boolean;
    showNextButton: boolean;
  }): string {
    const chevronSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

    return `
      <div class="header">
        ${visibility.showPrevButton ? `<button id="prev-month" type="button" class="nav-button prev"></button>` : ''}
        <div class="selectors-container">
          ${visibility.showMonthSelector ? `
          <div class="custom-select month-select" id="month-select-container">
            <button type="button" class="select-trigger" id="month-select-trigger">
              <span id="month-select-value"></span>
              <span class="select-icon">${chevronSVG}</span>
            </button>
            <div class="select-content month-select-content" id="month-select-content"></div>
          </div>
          ` : ''}
          ${visibility.showYearSelector ? `
          <div class="custom-select year-select" id="year-select-container">
            <button type="button" class="select-trigger" id="year-select-trigger">
              <span id="year-select-value"></span>
              <span class="select-icon">${chevronSVG}</span>
            </button>
            <div class="select-content year-select-content" id="year-select-content"></div>
          </div>
          ` : ''}
        </div>
        ${visibility.showNextButton ? `<button id="next-month" type="button" class="nav-button next"></button>` : ''}
      </div>
    `;
  }

  /**
   * Generate footer HTML based on visibility and button configuration
   */
  static generateFooterHTML(
    visibility: {
      showTodayButton: boolean;
      showTomorrowButton: boolean;
    },
    buttons: {
      todayButtonText: string;
      todayButtonClass: string;
      tomorrowButtonText: string;
      tomorrowButtonClass: string;
    }
  ): string {
    return `
      <div class="footer">
        ${visibility.showTodayButton ? 
          `<button id="today-button" type="button" class="date-nav-button today-button ${buttons.todayButtonClass}">${buttons.todayButtonText}</button>` 
          : ''}
        ${visibility.showTomorrowButton ? 
          `<button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${buttons.tomorrowButtonClass}">${buttons.tomorrowButtonText}</button>` 
          : ''}
      </div>
    `;
  }

  /**
   * Generate the complete component HTML
   */
  static generateComponentHTML(
    visibility: {
      showMonthSelector: boolean;
      showYearSelector: boolean;
      showPrevButton: boolean;
      showNextButton: boolean;
      showTodayButton: boolean;
      showTomorrowButton: boolean;
    },
    buttons: {
      todayButtonText: string;
      todayButtonClass: string;
      tomorrowButtonText: string;
      tomorrowButtonClass: string;
    }
  ): string {
    return `
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
          ${this.generateHeaderHTML(visibility)}
          <div class="day-names" id="day-names"></div>
          <div class="days-wrapper">
            <div class="days" id="days-container"></div>
          </div>
          ${this.generateFooterHTML(visibility, buttons)}
        </div>
      </div>
    `;
  }

  /**
   * Initialize day names in the container
   */
  static initializeDayNames(container: HTMLElement): void {
    container.innerHTML = "";
    
    this.dayNames.forEach(name => {
      const dayNameEl = document.createElement("div");
      dayNameEl.classList.add("day-name");
      dayNameEl.textContent = name;
      container.appendChild(dayNameEl);
    });
  }

  /**
   * Create month selector options
   */
  static createMonthOptions(
    currentMonth: number,
    onMonthChange: (month: number, monthName: string) => void
  ): DocumentFragment {
    const fragment = document.createDocumentFragment();
    
    this.persianMonths.forEach((month, index) => {
      const monthValue = index + 1;
      const monthItem = document.createElement("div");
      monthItem.classList.add("select-item");
      monthItem.textContent = month;
      monthItem.dataset.value = monthValue.toString();
      
      if (monthValue === currentMonth) {
        monthItem.classList.add("selected");
      }
      
      monthItem.addEventListener("click", (e) => {
        e.stopPropagation();
        onMonthChange(monthValue, month);
      });
      
      fragment.appendChild(monthItem);
    });
    
    return fragment;
  }

  /**
   * Create year selector options
   */
  static createYearOptions(
    currentYear: number,
    onYearChange: (year: number) => void,
    toPersianNum: (num: number) => string
  ): DocumentFragment {
    const fragment = document.createDocumentFragment();
    
    // Get current year range
    const startYear = currentYear - 100;
    const endYear = currentYear + 50;
    
    for (let year = startYear; year <= endYear; year++) {
      const yearItem = document.createElement("div");
      yearItem.classList.add("select-item");
      yearItem.textContent = toPersianNum(year);
      yearItem.dataset.value = year.toString();
      
      if (year === currentYear) {
        yearItem.classList.add("selected");
      }
      
      yearItem.addEventListener("click", (e) => {
        e.stopPropagation();
        onYearChange(year);
      });
      
      fragment.appendChild(yearItem);
    }
    
    return fragment;
  }

  /**
   * Create event tooltip element
   */
  static createEventTooltip(events: any[]): HTMLElement {
    const tooltip = document.createElement("div");
    tooltip.classList.add("event-tooltip");
    
    events.forEach(event => {
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-item");
      
      // Add 'holiday' class for holiday events
      if (event.holiday) {
        eventItem.classList.add("holiday");
      }
      
      // Add type label with Persian text
      const typeLabel = document.createElement("span");
      typeLabel.classList.add("event-type-label");
      typeLabel.textContent = this.holidayTypeLabels[event.type] || event.type;
      eventItem.appendChild(typeLabel);
      
      // Add event title
      const titleSpan = document.createElement("span");
      titleSpan.textContent = event.title;
      eventItem.appendChild(titleSpan);
      
      tooltip.appendChild(eventItem);
    });
    
    return tooltip;
  }

  /**
   * Get Persian month names
   */
  static getPersianMonths(): readonly string[] {
    return this.persianMonths;
  }

  /**
   * Get holiday type labels
   */
  static getHolidayTypeLabels(): { [key: string]: string } {
    return { ...this.holidayTypeLabels };
  }
} 