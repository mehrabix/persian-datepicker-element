// Type definitions for Persian DatePicker element
export interface DateTuple extends Array<number> {
  0: number; // year
  1: number; // month
  2: number; // day
  length: 3;
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
  isRange?: boolean;
  range?: {
    start: DateTuple | null;
    end: DateTuple | null;
  };
}

export interface CSSVariableMap {
  [key: string]: string;
}

export interface PersianDatePickerElementOptions {
  defaultDate?: DateTuple;
  placeholder?: string;
  format?: string;
  showEvents?: boolean;
  eventTypes?: string | string[];
  cssVariables?: CSSVariableMap;
  rtl?: boolean;
  rangeMode?: boolean;
  rangeStart?: DateTuple;
  rangeEnd?: DateTuple;
} 