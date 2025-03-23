declare module 'persian-datepicker-element' {
  export class PersianDatePickerElement extends HTMLElement {
    constructor(options?: any);
    setValue(year: number, month: number, day: number): void;
    getValue(): [number, number, number] | null;
    setHolidayTypes(types: string | string[]): void;
    getHolidayTypes(): string[];
    isSelectedDateHoliday(): boolean;
    getSelectedDateEvents(): any[];
    clear(): void;
  }
} 