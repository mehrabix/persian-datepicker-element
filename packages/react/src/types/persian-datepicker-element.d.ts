// Re-export types from the core package to ensure compatibility
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

  // This interface represents the detail property of the CustomEvent
  export interface PersianDateChangeEvent {
    jalali: DateTuple;
    gregorian: DateTuple;
    isHoliday: boolean;
    events: PersianEvent[];
    formattedDate?: string;
    isoString?: string;
    isRange?: boolean;
    range?: {
      start: DateTuple | null;
      end: DateTuple | null;
      startISOString?: string | null;
      endISOString?: string | null;
      startGregorian?: DateTuple | null;
      endGregorian?: DateTuple | null;
    };
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
