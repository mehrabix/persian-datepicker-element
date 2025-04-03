/**
 * Type declarations for persian-datepicker-element
 */
declare module 'persian-datepicker-element' {
  // The module exports the default class and some types
  export class PersianDatePickerElement extends HTMLElement {
    // Common methods and properties
    setValue(year: number, month: number, day: number): void;
    getValue(): [number, number, number] | null;
    clear(): void;
    seteventTypes(types: string | string[]): void;
    geteventTypes(): string[];
    isSelectedDateHoliday(): boolean;
    getSelectedDateEvents(): any[];
  }
  
  // Add any additional exports if needed
  
  export default PersianDatePickerElement;
} 