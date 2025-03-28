// Type definitions for Persian DatePicker element
export interface DateTuple extends Array<number> {
  0: number; // year
  1: number; // month
  2: number; // day
  length: 3;
}

export interface CSSVariableMap {
  [key: string]: string | number;
}

export interface PersianDatePickerElementOptions {
  defaultDate?: DateTuple;
  placeholder?: string;
  format?: string;
  showHolidays?: boolean;
  holidayTypes?: string | string[];
  cssVariables?: CSSVariableMap;
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
