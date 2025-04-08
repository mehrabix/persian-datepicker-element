import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  input,
  InputSignal,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

// Import local type definitions
import { DateTuple } from './persian-datepicker-types';

// Import the web component
// This import ensures the web component script is included in the bundle
import 'persian-datepicker-element/dist/persian-datepicker-element.min.js';

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
 *   [showEventsInput]="true" 
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
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxPersianDatepickerComponent),
      multi: true
    }
  ]
})
export class NgxPersianDatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // Dependency injection using inject() function
  private readonly elRef = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly injector = inject(Injector);

  // Web component reference - expose it to be accessed from parent components
  readonly elementSignal = signal<HTMLElement | null>(null);

  // Form control implementation as signals
  private readonly onChangeSignal = signal<(value: any) => void>(() => {});
  private readonly onTouchSignal = signal<() => void>(() => {});
  private readonly valueSignal = signal<DateTuple | null>(null);
  private readonly disabledSignal = signal<boolean>(false);

  // #region Input Signals
  readonly placeholder = input<string | undefined>(undefined);
  readonly format = input<string | undefined>(undefined);
  readonly showEvents = input<boolean | undefined>(undefined);
  readonly eventTypes = input<string | string[] | undefined>(undefined);
  readonly rtl = input<boolean | undefined>(undefined);
  readonly minDate = input<DateTuple | undefined>(undefined);
  readonly maxDate = input<DateTuple | undefined>(undefined);
  readonly disabledDates = input<string | ((year: number, month: number, day: number) => boolean) | undefined>(undefined);
  readonly rangeMode = input<boolean | undefined>(undefined);
  readonly rangeStart = input<DateTuple | undefined>(undefined);
  readonly rangeEnd = input<DateTuple | undefined>(undefined);
  readonly defaultDate = input<DateTuple | undefined>(undefined);
  // #endregion

  // #region Outputs
  @Output() change = new EventEmitter<any>();
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
      const value = this.placeholder();
      if (value !== undefined) {
        this.updateAttribute('placeholder', value);
      }
    });

    // Format
    effect(() => {
      const value = this.format();
      if (value !== undefined) {
        this.updateAttribute('format', value);
      }
    });

    // Show Holidays
    effect(() => {
      const value = this.showEvents();
      if (value !== undefined) {
        this.updateAttribute('show-holidays', String(value));
      }
    });

    // Holiday Types
    effect(() => {
      const value = this.eventTypes();
      if (value !== undefined) {
        this.updateeventTypesAttribute(value);
      }
    });

    // RTL
    effect(() => {
      const value = this.rtl();
      if (value !== undefined) {
        this.updateAttribute('rtl', String(value));
      }
    });

    // Range picker effects
    effect(() => {
      const value = this.rangeMode();
      if (value !== undefined) {
        this.updateAttribute('range-mode', String(value));
      }
    });

    effect(() => {
      const value = this.rangeStart();
      if (value !== undefined) {
        this.updateAttribute('range-start', JSON.stringify(value));
      }
    });

    effect(() => {
      const value = this.rangeEnd();
      if (value !== undefined) {
        this.updateAttribute('range-end', JSON.stringify(value));
      }
    });

    // Add effects for new inputs
    effect(() => {
      const value = this.minDate();
      if (value !== undefined) {
        this.updateAttribute('min-date', JSON.stringify(value));
      }
    });

    effect(() => {
      const value = this.maxDate();
      if (value !== undefined) {
        this.updateAttribute('max-date', JSON.stringify(value));
      }
    });

    effect(() => {
      const value = this.disabledDates();
      if (value !== undefined) {
        if (typeof value === 'function') {
          const element = this.elementSignal();
          if (element && 'setDisabledDatesFn' in element) {
            (element as any).setDisabledDatesFn(value);
          }
        } else {
          this.updateAttribute('disabled-dates', value);
        }
      }
    });

    effect(() => {
      const value = this.defaultDate();
      if (value !== undefined) {
        this.updateAttribute('default-date', JSON.stringify(value));
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
          console.warn('persian-datepicker-element not found in custom elements registry. The import should have registered it.');
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
  private updateeventTypesAttribute(value: string | string[] | undefined) {
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
   * Handle change events from the web component
   */
  private handleChangeEvent = (event: any) => {
    // Use NgZone to ensure the change is detected by Angular
    this.zone.run(() => {
      // Get the selected date from the event detail
      const { jalali, gregorian, isHoliday, events, isRange, range } = event.detail;
      
      // Emit the change event
      this.change.emit({
        jalali,
        gregorian,
        isHoliday,
        events,
        isRange,
        range
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
    
    // Set attributes based on input signals
    const placeholder = this.placeholder();
    if (placeholder !== undefined) {
      element.setAttribute('placeholder', placeholder);
    }
    
    const format = this.format();
    if (format !== undefined) {
      element.setAttribute('format', format);
    }
    
    const showEvents = this.showEvents();
    if (showEvents !== undefined) {
      element.setAttribute('show-holidays', String(showEvents));
    }
    
    const eventTypes = this.eventTypes();
    if (eventTypes !== undefined) {
      this.updateeventTypesAttribute(eventTypes);
    }
    
    const rtl = this.rtl();
    if (rtl !== undefined) {
      element.setAttribute('rtl', String(rtl));
    }

    const minDate = this.minDate();
    if (minDate !== undefined) {
      element.setAttribute('min-date', JSON.stringify(minDate));
    }

    const maxDate = this.maxDate();
    if (maxDate !== undefined) {
      element.setAttribute('max-date', JSON.stringify(maxDate));
    }

    const disabledDates = this.disabledDates();
    if (disabledDates !== undefined) {
      if (typeof disabledDates === 'function') {
        (element as any).setDisabledDatesFn(disabledDates);
      } else {
        element.setAttribute('disabled-dates', disabledDates);
      }
    }

    const rangeMode = this.rangeMode();
    if (rangeMode !== undefined) {
      element.setAttribute('range-mode', String(rangeMode));
    }

    const rangeStart = this.rangeStart();
    if (rangeStart !== undefined) {
      element.setAttribute('range-start', JSON.stringify(rangeStart));
    }

    const rangeEnd = this.rangeEnd();
    if (rangeEnd !== undefined) {
      element.setAttribute('range-end', JSON.stringify(rangeEnd));
    }

    const defaultDate = this.defaultDate();
    if (defaultDate !== undefined) {
      element.setAttribute('default-date', JSON.stringify(defaultDate));
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
      (element as any).setValue(year, month, day);
    } else if (element) {
      // Clear the value
      (element as any).clear();
    }
  }

  /**
   * Register change callback (used by Angular forms)
   */
  registerOnChange(fn: any): void {
    this.onChangeSignal.set(fn);
  }

  /**
   * Register touch callback (used by Angular forms)
   */
  registerOnTouched(fn: any): void {
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

  // Add range picker methods
  public setRange(start: DateTuple, end: DateTuple): void {
    const element = this.elementSignal();
    if (element) {
      (element as any).setRange(start, end);
    }
  }

  public getRange(): { start: DateTuple | null; end: DateTuple | null } {
    const element = this.elementSignal();
    if (element) {
      return (element as any).getRange() || { start: null, end: null };
    }
    return { start: null, end: null };
  }

  public clear(): void {
    const element = this.elementSignal();
    if (element) {
      (element as any).clear();
    }
  }
}

