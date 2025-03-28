import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPersianDatepickerComponent } from '../../../ngx-persian-datepicker-element/src/lib/ngx-persian-datepicker.component';
import {
  PersianDateChangeEvent,
  DateTuple,
} from '../../../ngx-persian-datepicker-element/src/lib/persian-datepicker-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPersianDatepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'Persian DatePicker Demo';

  // Datepicker references through query list
  @ViewChildren(NgxPersianDatepickerComponent)
  datepickers!: QueryList<NgxPersianDatepickerComponent>;

  // Individual datepicker references
  @ViewChild('datepicker1') datepicker1!: NgxPersianDatepickerComponent;
  @ViewChild('datepicker2') datepicker2!: NgxPersianDatepickerComponent;
  @ViewChild('datepicker3') datepicker3!: NgxPersianDatepickerComponent;
  @ViewChild('datepicker4') datepicker4!: NgxPersianDatepickerComponent;
  @ViewChild('datepicker5') datepicker5!: NgxPersianDatepickerComponent;
  @ViewChild('datepicker6') datepicker6!: NgxPersianDatepickerComponent;

  // Date values
  birthdate: DateTuple | null = null;
  joinDate: DateTuple | null = null;
  iranHolidays: DateTuple | null = null;
  religiousHolidays: DateTuple | null = null;
  afghanistanHolidays: DateTuple | null = null;
  allHolidays: DateTuple | null = null;

  // Results display
  selectedJalali: string = '';
  selectedGregorian: string = '';
  selectedEvents: string = '';

  // RTL direction - always true for Persian
  rtlDirection = true;

  // Show holidays - true for holiday datepickers
  showHolidays = true;

  // Dark mode toggle
  isDarkMode: boolean = false;

  // Dark theme variables
  darkThemeVars = {
    '--jdp-background': '#1e1e2f',
    '--jdp-foreground': '#e2e8f0',
    '--jdp-muted': '#334155',
    '--jdp-muted-foreground': '#94a3b8',
    '--jdp-border': '#475569',
    '--jdp-input-border-color': '#475569',
    '--jdp-calendar-shadow': '0px 10px 30px -5px rgba(2, 6, 23, 0.5)',
    '--jdp-day-hover-bg': '#334155',
    '--jdp-input-bg': '#1e1e2f',
    '--jdp-input-text': '#e2e8f0',
    '--jdp-input-placeholder': '#94a3b8',
    '--jdp-calendar-bg': '#0f172a',
    '--jdp-day-text': '#e2e8f0',
    '--jdp-day-name-text': '#94a3b8',
    '--jdp-header-bg': '#1e293b',
    '--jdp-header-text': '#e2e8f0',
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490',
    '--jdp-primary-foreground': '#ffffff',
    '--jdp-ring': '#0891b2',
  };

  // Light theme variables (default)
  lightThemeVars = {
    '--jdp-background': '#ffffff',
    '--jdp-foreground': '#1e293b',
    '--jdp-muted': '#f1f5f9',
    '--jdp-muted-foreground': '#64748b',
    '--jdp-border': '#e2e8f0',
    '--jdp-input-border-color': '#e2e8f0',
    '--jdp-calendar-shadow':
      '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    '--jdp-day-hover-bg': '#f1f5f9',
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490',
    '--jdp-primary-foreground': '#ffffff',
    '--jdp-ring': '#0284c7',
  };

  constructor(private elementRef: ElementRef) {
    // Check system dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = mediaQuery.matches;

    // Add listener for system theme changes
    mediaQuery.addEventListener('change', e => {
      this.isDarkMode = e.matches;
      this.applyThemeToDatepickers();
    });
  }

  ngAfterViewInit() {
    // Apply theme to datepickers after view has been initialized
    setTimeout(() => {
      this.applyThemeToDatepickers();
      this.setupDatepickerProperties();
    }, 100);

    // Listen for changes in the QueryList
    this.datepickers.changes.subscribe(() => {
      this.applyThemeToDatepickers();
      this.setupDatepickerProperties();
    });
  }

  /**
   * Set up common properties for all datepickers
   */
  setupDatepickerProperties() {
    // Apply RTL direction to all datepickers
    this.datepickers.forEach(datepicker => {
      const element = datepicker.elementSignal?.();
      if (element) {
        element.setAttribute('rtl', 'true');
      }
    });

    // Apply show-holidays to holiday datepickers
    [this.datepicker3, this.datepicker4, this.datepicker5, this.datepicker6].forEach(datepicker => {
      if (datepicker) {
        const element = datepicker.elementSignal?.();
        if (element) {
          element.setAttribute('show-holidays', 'true');
        }
      }
    });
  }

  applyThemeToDatepickers() {
    const themeVars = this.isDarkMode ? this.darkThemeVars : this.lightThemeVars;

    // Use individual references for more reliable targeting
    [
      this.datepicker1,
      this.datepicker2,
      this.datepicker3,
      this.datepicker4,
      this.datepicker5,
      this.datepicker6,
    ].forEach(datepicker => {
      if (datepicker) {
        this.applyVariablesToDatepicker(datepicker, themeVars);
      }
    });

    // Also apply through QueryList as a fallback
    if (this.datepickers) {
      this.datepickers.forEach(datepicker => {
        this.applyVariablesToDatepicker(datepicker, themeVars);
      });
    }

    // Directly access the native web components
    const datepickerElements = document.querySelectorAll('persian-datepicker-element');
    datepickerElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      for (const [prop, value] of Object.entries(themeVars)) {
        htmlElement.style.setProperty(prop, value);
      }
    });
  }

  applyVariablesToDatepicker(
    datepicker: NgxPersianDatepickerComponent,
    variables: Record<string, string>
  ) {
    if (!datepicker) return;

    // Use the exposed applyThemeVariables method
    datepicker.applyThemeVariables(variables);

    // Also try to directly access the element
    const element = datepicker.elementSignal?.();
    if (element) {
      for (const [prop, value] of Object.entries(variables)) {
        element.style.setProperty(prop, value);
      }
    }
  }

  handleDateChange(event: PersianDateChangeEvent): void {
    console.log('Date changed:', event);

    const jalaliDate = event.detail.jalali;
    const gregorianDate = event.detail.gregorian;
    const events = event.detail.events || [];

    this.selectedJalali = `${jalaliDate[0]}/${jalaliDate[1].toString().padStart(2, '0')}/${jalaliDate[2].toString().padStart(2, '0')}`;
    this.selectedGregorian = `${gregorianDate[0]}/${gregorianDate[1].toString().padStart(2, '0')}/${gregorianDate[2].toString().padStart(2, '0')}`;
    this.selectedEvents = this.formatEvents(events);
  }

  private formatEvents(events: string[]): string {
    return events.join(', ');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyThemeToDatepickers();
  }
}
