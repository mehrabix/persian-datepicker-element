/**
 * Type declarations for persian-datepicker-element
 */
import { DateTuple } from '../lib/persian-datepicker-types';

declare module 'persian-datepicker-element' {
  // The module exports the default class and some types
  export class PersianDatePickerElement extends HTMLElement {
    // Common methods and properties
    setValue(year: number, month: number, day: number): void;
    getValue(): DateTuple;
    clear(): void;
    open(): void;
    close(): void;
    setHolidayTypes(types: string | string[]): void;
    getHolidayTypes(): string[];
    isSelectedDateHoliday(): boolean;
    getSelectedDateEvents(): any[];
  }
  
  // Add any additional exports if needed
  
  export interface PersianDatePickerElementOptions {
    defaultDate?: DateTuple;
    placeholder?: string;
    format?: string;
    showHolidays?: boolean;
    holidayTypes?: string | string[];
    cssVariables?: Record<string, string>;
    rtl?: boolean;
  }

  export interface PersianDateChangeEvent {
    detail: {
      jalali: DateTuple;
      gregorian: DateTuple;
      isHoliday: boolean;
      events?: string[];
    };
  }

  export default PersianDatePickerElement;
} 