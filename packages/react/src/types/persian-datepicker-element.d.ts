declare module 'persian-datepicker-element' {
  export interface DateTuple extends Array<number> {
    0: number; // year
    1: number; // month
    2: number; // day
  }

  export interface PersianEvent {
    title: string;
    type: string;
    holiday: boolean;
  }

  export interface PersianDateChangeEvent {
    jalali: DateTuple;
    gregorian: DateTuple;
    isHoliday: boolean;
    events: PersianEvent[];
  }

  export interface CSSVariableMap {
    [key: string]: string;
  }

  export interface PersianDatePickerElementOptions {
    placeholder?: string;
    format?: string;
    showEvents?: boolean;
    rtl?: boolean;
    value?: DateTuple;
    min?: DateTuple;
    max?: DateTuple;
    disabled?: boolean;
    eventTypes?: string;
  }
}
