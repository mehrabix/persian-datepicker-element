import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy, NgModule } from '@angular/core';

// Import the web component
import '@shadnext/time-picker-element';

/**
 * TimePicker - An Angular component version of the time-picker web component
 * 
 * This component was generated using the shadnext CLI.
 * It provides the same functionality as the original web component but with an Angular API.
 */
@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** Selected date value */
  @Input() value: string | null = null;
  
  /** Placeholder text for the input */
  @Input() placeholder: string = 'انتخاب تاریخ';
  
  /** Primary color for the component */
  @Input() primaryColor: string = '#3b82f6';
  
  /** Whether to use right-to-left layout */
  @Input() rtl: boolean = true;
  
  /** Theme for the component */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /** CSS class to apply to the component */
  @Input() className: string = '';
  
  /** Event emitted when a date is selected */
  @Output() dateSelected = new EventEmitter<string>();
  
  /**
   * Reference to the web component element
   */
  @ViewChild('timePickerElement') elementRef!: ElementRef;
  
  /**
   * Event handler function reference for cleanup
   */
  private dateSelectedHandler: ((e: Event) => void) | null = null;
  
  /**
   * After the view is initialized, set up the web component
   */
  ngAfterViewInit(): void {
    this.setupWebComponent();
  }
  
  /**
   * When inputs change, update the web component
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.elementRef?.nativeElement) return;
    
    const element = this.elementRef.nativeElement;
    
    if (changes['value'] && this.value) {
      element.setAttribute('date', this.value);
    }
    
    if (changes['placeholder']) {
      element.setAttribute('placeholder', this.placeholder);
    }
    
    if (changes['theme']) {
      element.setAttribute('theme', this.theme);
    }
  }
  
  /**
   * Clean up event listeners when the component is destroyed
   */
  ngOnDestroy(): void {
    this.removeEventListeners();
  }
  
  /**
   * Set up the web component and add event listeners
   */
  private setupWebComponent(): void {
    const element = this.elementRef.nativeElement;
    
    // Set initial properties
    if (this.value) element.setAttribute('date', this.value);
    element.setAttribute('placeholder', this.placeholder);
    element.setAttribute('theme', this.theme);
    
    // Add event listener
    this.dateSelectedHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      this.value = customEvent.detail;
      this.dateSelected.emit(customEvent.detail);
    };
    
    element.addEventListener('dateSelected', this.dateSelectedHandler);
  }
  
  /**
   * Remove event listeners
   */
  private removeEventListeners(): void {
    const element = this.elementRef?.nativeElement;
    if (element && this.dateSelectedHandler) {
      element.removeEventListener('dateSelected', this.dateSelectedHandler);
      this.dateSelectedHandler = null;
    }
  }
}

/**
 * Module for the TimePicker component
 */
@NgModule({
  declarations: [TimePickerComponent],
  imports: [],
  exports: [TimePickerComponent],
})
export class TimePickerModule {}
