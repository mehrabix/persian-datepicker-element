import React, { CSSProperties } from 'react';
import type { PersianDatePickerElementOptions, PersianDateChangeEvent, DateTuple, CSSVariableMap } from 'persian-datepicker-element';
export interface PersianDatepickerProps extends Omit<PersianDatePickerElementOptions, 'onChange'> {
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
export interface PersianDatepickerMethods {
    getValue: () => DateTuple;
    setValue: (year: number, month: number, day: number) => void;
    open: () => void;
    close: () => void;
    getElement: () => HTMLElement | null;
}
export declare const PersianDatepicker: React.ForwardRefExoticComponent<PersianDatepickerProps & React.RefAttributes<PersianDatepickerMethods>>;
