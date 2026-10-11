import React, { CSSProperties } from 'react';
import type { PersianDatePickerElementOptions, PersianDateChangeEvent, DateTuple, TimeTuple, TimeValue } from 'persian-datepicker-element';
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
    scrollbarWidth?: string;
    scrollbarThumbColor?: string;
    scrollbarThumbHoverColor?: string;
    scrollbarTrackColor?: string;
    scrollbarBorderRadius?: string;
    darkMode?: boolean;
    minDate?: DateTuple;
    maxDate?: DateTuple;
    disabledDates?: string | ((year: number, month: number, day: number) => boolean);
    rangeMode?: boolean;
    rangeStart?: DateTuple;
    rangeEnd?: DateTuple;
    showTime?: boolean;
    timeFormat?: string;
    defaultTime?: TimeTuple;
    minuteStep?: number;
}
export interface PersianDatepickerMethods {
    getValue: () => DateTuple;
    setValue: (year: number, month: number, day: number) => void;
    open: () => void;
    close: () => void;
    getElement: () => HTMLElement | null;
    setRange: (start: DateTuple, end: DateTuple) => void;
    getRange: () => {
        start: DateTuple | null;
        end: DateTuple | null;
    };
    clear: () => void;
    setDisabledDatesFn: (fn: (year: number, month: number, day: number) => boolean) => void;
    setTime: (hour: number, minute: number, second?: number) => void;
    getTime: () => TimeValue;
}
export declare const PersianDatepicker: React.ForwardRefExoticComponent<PersianDatepickerProps & React.RefAttributes<PersianDatepickerMethods>>;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'persian-datepicker-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                value?: string;
                placeholder?: string;
                format?: string;
                'show-holidays'?: boolean;
                rtl?: boolean;
                'min-date'?: string;
                'max-date'?: string;
                'disabled-dates'?: string;
                'disabled-dates-fn'?: ((year: number, month: number, day: number) => boolean);
                disabled?: boolean;
                'range-mode'?: boolean;
                'range-start'?: string;
                'range-end'?: string;
                'show-time'?: boolean;
                'time-format'?: string;
                'default-time'?: string;
                'minute-step'?: number;
            }, HTMLElement>;
        }
    }
}
