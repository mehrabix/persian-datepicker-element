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

  // #region Input Signals - using the new input() syntax
  readonly placeholder = input<string | undefined>(undefined, { alias: 'placeholderInput' });
  readonly format = input<string | undefined>(undefined, { alias: 'formatInput' });
  readonly showHolidays = input<boolean | undefined>(undefined, { alias: 'showHolidaysInput' });
  readonly holidayTypes = input<string | string[] | undefined>(undefined, { alias: 'holidayTypesInput' });
  readonly rtl = input<boolean | undefined>(undefined, { alias: 'rtlInput' });
  readonly primaryColor = input<string | undefined>(undefined, { alias: 'primaryColorInput' });
  readonly primaryHover = input<string | undefined>(undefined, { alias: 'primaryHoverInput' });
  readonly backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColorInput' });
  readonly foregroundColor = input<string | undefined>(undefined, { alias: 'foregroundColorInput' });
  readonly borderColor = input<string | undefined>(undefined, { alias: 'borderColorInput' });
  readonly borderRadius = input<string | undefined>(undefined, { alias: 'borderRadiusInput' });
  readonly fontFamily = input<string | undefined>(undefined, { alias: 'fontFamilyInput' });
  readonly holidayColor = input<string | undefined>(undefined, { alias: 'holidayColorInput' });
  readonly holidayBg = input<string | undefined>(undefined, { alias: 'holidayBgInput' });
  
  // #endregion

  // #region Outputs
  @Output() dateChange = new EventEmitter<any>();
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
      const value = this.showHolidays();
      if (value !== undefined) {
        this.updateAttribute('show-holidays', String(value));
      }
    });

    // Holiday Types
    effect(() => {
      const value = this.holidayTypes();
      if (value !== undefined) {
        this.updateHolidayTypesAttribute(value);
      }
    });

    // RTL
    effect(() => {
      const value = this.rtl();
      if (value !== undefined) {
        this.updateAttribute('rtl', String(value));
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
   * Handle change events from the web component
   */
  private handleChangeEvent = (event: any) => {
    // Use NgZone to ensure the change is detected by Angular
    this.zone.run(() => {
      // Get the selected date from the event detail
      const { jalali, gregorian, isHoliday, events } = event.detail;
      
      // Emit the dateChange event
      this.dateChange.emit({
        jalali,
        gregorian,
        isHoliday,
        events
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
    
    const showHolidays = this.showHolidays();
    if (showHolidays !== undefined) {
      element.setAttribute('show-holidays', String(showHolidays));
    }
    
    const holidayTypes = this.holidayTypes();
    if (holidayTypes !== undefined) {
      this.updateHolidayTypesAttribute(holidayTypes);
    }
    
    const rtl = this.rtl();
    if (rtl !== undefined) {
      element.setAttribute('rtl', String(rtl));
    }
    
    // Apply CSS custom properties
    const primaryColor = this.primaryColor();
    if (primaryColor !== undefined) {
      element.style.setProperty('--jdp-primary', primaryColor);
    }
    
    const primaryHover = this.primaryHover();
    if (primaryHover !== undefined) {
      element.style.setProperty('--jdp-primary-hover', primaryHover);
    }
    
    const backgroundColor = this.backgroundColor();
    if (backgroundColor !== undefined) {
      element.style.setProperty('--jdp-background', backgroundColor);
    }
    
    const foregroundColor = this.foregroundColor();
    if (foregroundColor !== undefined) {
      element.style.setProperty('--jdp-foreground', foregroundColor);
    }
    
    const borderColor = this.borderColor();
    if (borderColor !== undefined) {
      element.style.setProperty('--jdp-border', borderColor);
    }
    
    const borderRadius = this.borderRadius();
    if (borderRadius !== undefined) {
      element.style.setProperty('--jdp-border-radius', borderRadius);
    }
    
    const fontFamily = this.fontFamily();
    if (fontFamily !== undefined) {
      element.style.setProperty('--jdp-font-family', fontFamily);
    }
    
    const holidayColor = this.holidayColor();
    if (holidayColor !== undefined) {
      element.style.setProperty('--jdp-holiday-color', holidayColor);
    }
    
    const holidayBg = this.holidayBg();
    if (holidayBg !== undefined) {
      element.style.setProperty('--jdp-holiday-bg', holidayBg);
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
}

