declare module 'persian-datepicker-element' {
  export interface DateTuple extends Array<number> {
    0: number; // year
    1: number; // month
    2: number; // day
  }

  export type TimeTuple = [number, number] | [number, number, number];

  export interface TimeValue {
    hour: number;
    minute: number;
    second: number;
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
    formattedDate?: string;
    isoString?: string;
    time?: TimeValue;
    formattedDateTime?: string;
    isRange?: boolean;
    range?: {
      start: DateTuple | null;
      end: DateTuple | null;
    };
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
    showTime?: boolean;
    timeFormat?: string;
    defaultTime?: TimeTuple;
    minuteStep?: number;
  }
} 