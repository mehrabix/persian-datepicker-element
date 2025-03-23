/**
 * Custom Elements declaration for TypeScript
 */
declare namespace JSX {
  interface IntrinsicElements {
    'persian-datepicker-element': any;
  }
}

// Define the global HTML elements
interface HTMLElementTagNameMap {
  'persian-datepicker-element': any;
}

// Declare web component methods
interface HTMLPersianDatepickerElement extends HTMLElement {
  setValue(year: number, month: number, day: number): void;
  getValue(): [number, number, number] | null;
  clear(): void;
  setHolidayTypes(types: string | string[]): void;
  getHolidayTypes(): string[];
  isSelectedDateHoliday(): boolean;
  getSelectedDateEvents(): any[];
} 