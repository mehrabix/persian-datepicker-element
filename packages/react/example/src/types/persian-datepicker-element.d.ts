declare module 'react-persian-datepicker-element' {
  import { ForwardRefExoticComponent, RefAttributes, CSSProperties } from 'react';

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
    showHolidays?: boolean;
    rtl?: boolean;
    value?: DateTuple;
    min?: DateTuple;
    max?: DateTuple;
    disabled?: boolean;
    holidayTypes?: string;
    disabledDates?: string | ((year: number, month: number, day: number) => boolean);
    rangeMode?: boolean;
    rangeStart?: DateTuple;
    rangeEnd?: DateTuple;
  }

  export interface PersianDatepickerMethods {
    getValue: () => DateTuple;
    setValue: (year: number, month: number, day: number) => void;
    open: () => void;
    close: () => void;
    getElement: () => HTMLElement | null;
    setRange: (start: DateTuple, end: DateTuple) => void;
    getRange: () => { start: DateTuple | null; end: DateTuple | null };
    clear: () => void;
    setDisabledDatesFn: (fn: (year: number, month: number, day: number) => boolean) => void;
  }

  export interface PersianDatepickerProps extends Omit<PersianDatePickerElementOptions, 'onChange'> {
    id?: string;
    onChange?: (event: PersianDateChangeEvent) => void;
    className?: string;
    style?: CSSProperties;
    primaryColor?: string;
    primaryHover?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    fontFamily?: string;
    holidayColor?: string;
    holidayBg?: string;
    cssVariables?: CSSVariableMap;
    minDate?: DateTuple;
    maxDate?: DateTuple;
    disabledDates?: string | ((year: number, month: number, day: number) => boolean);
    rangeMode?: boolean;
    rangeStart?: DateTuple;
    rangeEnd?: DateTuple;
  }

  export const PersianDatepicker: ForwardRefExoticComponent<
    PersianDatepickerProps & RefAttributes<PersianDatepickerMethods>
  >;
} 