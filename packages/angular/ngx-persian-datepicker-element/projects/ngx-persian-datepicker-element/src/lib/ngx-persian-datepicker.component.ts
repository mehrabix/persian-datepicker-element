import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  signal,
  effect,
  NgZone,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersianDatePickerElement } from 'persian-datepicker-element';

import { PersianDateChangeEvent, DateTuple } from './persian-datepicker-types';

// Import the web component
// This import ensures the web component script is included in the bundle
import 'persian-datepicker-element';

/**
 * Angular wrapper for the Persian DatePicker Web Component
 *
 * This component provides Angular bindings for the native Persian DatePicker web component,
 * allowing it to be used with Angular forms (both reactive and template-driven) and
 * custom event handling.
 *
 * Note: The component automatically imports and registers the persian-datepicker-element
 * web component, so you don't need to add any scripts to your angular.json file.
 *
 * @example
 * Basic usage:
 * ```html
 * <ngx-persian-datepicker-element
 *   placeholderInput="انتخاب تاریخ"
 *   formatInput="YYYY/MM/DD"
 *   [showHolidaysInput]="true"
 *   (dateChange)="onDateChange($event)">
 * </ngx-persian-datepicker-element>
 * ```
 *
 * With Angular forms:
 * ```html
 * <form [formGroup]="myForm">
 *   <ngx-persian-datepicker-element formControlName="date"></ngx-persian-datepicker-element>
 * </form>
 * ```
 */
@Component({
  selector: 'ngx-persian-datepicker-element',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<div #container></div>',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxPersianDatepickerComponent),
      multi: true,
    },
  ],
})
export class NgxPersianDatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // Dependency injection using inject() function
  private readonly elRef = inject(ElementRef);
  private readonly injector = inject(Injector);
  private readonly zone = inject(NgZone);

  // Web component reference - expose it to be accessed from parent components
  readonly elementSignal = signal<HTMLElement | null>(null);

  // Form control implementation as signals
  private readonly onChangeSignal = signal<(value: DateTuple | null) => void>(() => {});
  private readonly onTouchSignal = signal<() => void>(() => {});
  private readonly valueSignal = signal<DateTuple | null>(null);
  private readonly disabledSignal = signal<boolean>(false);

  // #region Input Signals - using the new input() syntax
  @Input('placeholderInput') placeholder?: string;
  @Input('formatInput') format?: string;
  @Input('showHolidaysInput') showHolidays?: boolean;
  @Input('holidayTypesInput') holidayTypes?: string | string[];
  @Input('rtlInput') rtl?: boolean;
  @Input('primaryColorInput') primaryColor?: string;
  @Input('primaryHoverInput') primaryHover?: string;
  @Input('backgroundColorInput') backgroundColor?: string;
  @Input('foregroundColorInput') foregroundColor?: string;
  @Input('borderColorInput') borderColor?: string;
  @Input('borderRadiusInput') borderRadius?: string;
  @Input('fontFamilyInput') fontFamily?: string;
  @Input('holidayColorInput') holidayColor?: string;
  @Input('holidayBgInput') holidayBg?: string;
  // #endregion

  // #region Outputs
  @Output() dateChange = new EventEmitter<PersianDateChangeEvent>();
  // #endregion

  /** Reference to the container where the web component will be attached */
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  constructor() {
    // Create an effect to respond to changes in the element signal
    effect(() => {
      const element = this.elementSignal();
      if (element) {
        // Apply initial attributes and styles when the element is created
        this.setInitialAttributes();
      }
    });

    // Create effects for each input to update attributes when they change
    this.setupInputEffects();
  }

  /**
   * Apply theme variables to the datepicker element
   * @param variables Object containing CSS variable names and values
   */
  applyThemeVariables(variables: Record<string, string>) {
    const element = this.elementSignal();
    if (!element) return;

    for (const [prop, value] of Object.entries(variables)) {
      element.style.setProperty(prop, value);
    }
  }

  /**
   * Set up effects for all inputs to update attributes/styles when they change
   */
  private setupInputEffects() {
    // Placeholder
    effect(() => {
      if (this.placeholder !== undefined) {
        this.updateAttribute('placeholder', this.placeholder);
      }
    });

    // Format
    effect(() => {
      if (this.format !== undefined) {
        this.updateAttribute('format', this.format);
      }
    });

    // Show Holidays
    effect(() => {
      if (this.showHolidays !== undefined) {
        this.updateAttribute('show-holidays', String(this.showHolidays));
      }
    });

    // Holiday Types
    effect(() => {
      if (this.holidayTypes !== undefined) {
        this.updateHolidayTypesAttribute(this.holidayTypes);
      }
    });

    // RTL
    effect(() => {
      if (this.rtl !== undefined) {
        this.updateAttribute('rtl', String(this.rtl));
      }
    });
  }

  ngOnInit() {
    // Create the web component instance
    this.createWebComponent();
  }

  /**
   * Create the web component instance
   */
  private createWebComponent() {
    // Create the element
    this.zone.runOutsideAngular(() => {
      try {
        // Make sure the web component is registered
        // This will typically happen from the import, but we check just in case
        if (typeof window !== 'undefined' && !customElements.get('persian-datepicker-element')) {
          console.warn(
            'persian-datepicker-element not found in custom elements registry. The import should have registered it.'
          );
        }

        // Create the web component
        const element = document.createElement('persian-datepicker-element');

        // Add the change event listener
        element.addEventListener('change', this.handleChangeEvent);

        // Store the element in the signal
        this.elementSignal.set(element);

        // Append to the container
        if (this.containerRef && this.containerRef.nativeElement) {
          this.containerRef.nativeElement.appendChild(element);
        } else {
          this.elRef.nativeElement.appendChild(element);
        }
      } catch (error) {
        console.error('Error creating persian-datepicker-element:', error);
      }
    });
  }

  // Helper method to update attributes
  private updateAttribute(name: string, value: string | undefined) {
    const element = this.elementSignal();
    if (element && value !== undefined) {
      element.setAttribute(name, value);
    }
  }

  // Helper method specifically for holiday types
  private updateHolidayTypesAttribute(value: string | string[] | undefined) {
    const element = this.elementSignal();
    if (element && value !== undefined) {
      const formattedValue = Array.isArray(value) ? value.join(',') : value;
      element.setAttribute('holiday-types', formattedValue);
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    const element = this.elementSignal();
    if (element) {
      element.removeEventListener('change', this.handleChangeEvent);
    }
  }

  /**
   * Handle date change events from the web component
   */
  private handleChangeEvent = (event: Event) => {
    // Use NgZone to ensure the change is detected by Angular
    this.zone.run(() => {
      // Cast the event to our custom event type
      const customEvent = event as CustomEvent<PersianDateChangeEvent['detail']>;
      const { jalali, gregorian, isHoliday, events } = customEvent.detail;

      // Emit the dateChange event
      this.dateChange.emit({
        detail: {
          jalali,
          gregorian,
          isHoliday,
          events,
        },
      });

      // Update form control value
      this.valueSignal.set(jalali);
      this.onChangeSignal()(jalali);
      this.onTouchSignal()();
    });
  };

  /**
   * Set initial attributes on the web component based on the signals
   */
  private setInitialAttributes() {
    const element = this.elementSignal();
    if (!element) return;

    // Set attributes based on input properties
    if (this.placeholder !== undefined) {
      element.setAttribute('placeholder', this.placeholder);
    }

    if (this.format !== undefined) {
      element.setAttribute('format', this.format);
    }

    if (this.showHolidays !== undefined) {
      element.setAttribute('show-holidays', String(this.showHolidays));
    }

    if (this.holidayTypes !== undefined) {
      this.updateHolidayTypesAttribute(this.holidayTypes);
    }

    if (this.rtl !== undefined) {
      element.setAttribute('rtl', String(this.rtl));
    }

    // Apply CSS custom properties
    if (this.primaryColor !== undefined) {
      element.style.setProperty('--jdp-primary', this.primaryColor);
    }

    if (this.primaryHover !== undefined) {
      element.style.setProperty('--jdp-primary-hover', this.primaryHover);
    }

    if (this.backgroundColor !== undefined) {
      element.style.setProperty('--jdp-background', this.backgroundColor);
    }

    if (this.foregroundColor !== undefined) {
      element.style.setProperty('--jdp-foreground', this.foregroundColor);
    }

    if (this.borderColor !== undefined) {
      element.style.setProperty('--jdp-border', this.borderColor);
    }

    if (this.borderRadius !== undefined) {
      element.style.setProperty('--jdp-border-radius', this.borderRadius);
    }

    if (this.fontFamily !== undefined) {
      element.style.setProperty('--jdp-font-family', this.fontFamily);
    }

    if (this.holidayColor !== undefined) {
      element.style.setProperty('--jdp-holiday-color', this.holidayColor);
    }

    if (this.holidayBg !== undefined) {
      element.style.setProperty('--jdp-holiday-bg', this.holidayBg);
    }

    // Set disabled state
    if (this.disabledSignal()) {
      element.setAttribute('disabled', '');
    }

    // Set initial value if needed
    if (this.valueSignal()) {
      this.writeValue(this.valueSignal());
    }
  }

  // #region ControlValueAccessor Implementation
  /**
   * Write value to the component (used by Angular forms)
   */
  writeValue(value: DateTuple | null): void {
    this.valueSignal.set(value);

    const element = this.elementSignal();
    if (element && value) {
      // Set the value on the web component
      const [year, month, day] = value;
      (element as PersianDatePickerElement).setValue(year, month, day);
    } else if (element) {
      // Clear the value
      (element as PersianDatePickerElement).clear();
    }
  }

  /**
   * Register change callback (used by Angular forms)
   */
  registerOnChange(fn: (value: DateTuple | null) => void): void {
    this.onChangeSignal.set(fn);
  }

  /**
   * Register touch callback (used by Angular forms)
   */
  registerOnTouched(fn: () => void): void {
    this.onTouchSignal.set(fn);
  }

  /**
   * Set disabled state (used by Angular forms)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabledSignal.set(isDisabled);

    const element = this.elementSignal();
    if (element) {
      if (isDisabled) {
        element.setAttribute('disabled', '');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }
  // #endregion
}
