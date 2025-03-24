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
  }

  export interface PersianDatepickerMethods {
    getValue: () => DateTuple;
    setValue: (year: number, month: number, day: number) => void;
    open: () => void;
    close: () => void;
    getElement: () => HTMLElement | null;
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
  }

  export const PersianDatepicker: ForwardRefExoticComponent<
    PersianDatepickerProps & RefAttributes<PersianDatepickerMethods>
  >;
} 