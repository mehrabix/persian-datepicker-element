import React, { forwardRef, useRef, useEffect, useImperativeHandle, CSSProperties } from 'react';
import type { 
  PersianDatePickerElementOptions,
  PersianDateChangeEvent,
  DateTuple,
  PersianEvent
} from 'persian-datepicker-element';

// Ensure the web component is registered globally when imported
if (typeof window !== 'undefined') {
  import('persian-datepicker-element');
}

// Props interface that extends the web component options
export interface PersianDatepickerProps extends Omit<PersianDatePickerElementOptions, 'onChange'> {
  // Override onChange to use proper React event handling
  onChange?: (event: PersianDateChangeEvent) => void;
  
  // Additional React-specific props
  className?: string;
  style?: CSSProperties;
  
  // CSS custom properties as direct props for easier styling
  primaryColor?: string;
  primaryHover?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontFamily?: string;
  holidayColor?: string;
  holidayBg?: string;
  
  // New dark mode and scrollbar related props
  scrollbarWidth?: string;
  scrollbarThumbColor?: string;
  scrollbarThumbHoverColor?: string;
  scrollbarTrackColor?: string;
  scrollbarBorderRadius?: string;
  
  // Dark mode helper prop
  darkMode?: boolean;

  // New props for format and limits
  minDate?: DateTuple;
  maxDate?: DateTuple;
  disabledDates?: string;
}

// Methods that will be available via ref
export interface PersianDatepickerMethods {
  getValue: () => DateTuple;
  setValue: (year: number, month: number, day: number) => void;
  open: () => void;
  close: () => void;
  getElement: () => HTMLElement | null;
}

// Define an extended HTMLElement interface with custom methods
interface PersianDatepickerElement extends HTMLElement {
  getValue?: () => DateTuple;
  setValue?: (year: number, month: number, day: number) => void;
  open?: () => void;
  close?: () => void;
  setAttribute(name: string, value: string): void;
}

// Helper to convert camelCase to kebab-case for HTML attributes
const toKebabCase = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

// Convert boolean and array values to strings for HTML attributes
const convertValueToAttribute = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return String(value);
};

// The actual component
export const PersianDatepicker = forwardRef<PersianDatepickerMethods, PersianDatepickerProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      placeholder,
      format,
      showHolidays,
      rtl,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      className,
      style,
      darkMode,
      ...rest
    } = props;

    const elementRef = useRef<PersianDatepickerElement | null>(null);
    const handleChange = useRef<((e: Event) => void) | null>(null);

    useImperativeHandle(ref, () => ({
      setValue: (year: number, month: number, day: number) => {
        elementRef.current?.setValue?.(year, month, day);
      },
      getValue: () => {
        const value = elementRef.current?.getValue?.();
        return value || [1400, 1, 1] as DateTuple;
      },
      open: () => {
        elementRef.current?.open?.();
      },
      close: () => {
        elementRef.current?.close?.();
      },
      getElement: () => elementRef.current
    }));

    // Create the event handler
    useEffect(() => {
      if (onChange) {
        handleChange.current = (e: Event) => {
          const customEvent = e as CustomEvent<PersianDateChangeEvent>;
          onChange(customEvent.detail);
        };
      }
    }, [onChange]);

    // Add/remove event listener
    useEffect(() => {
      const element = elementRef.current;
      const handler = handleChange.current;

      if (element && handler) {
        element.addEventListener('change', handler);
        return () => {
          element.removeEventListener('change', handler);
        };
      }
    }, []);

    // Convert DateTuple to string for attributes
    const convertDateTupleToString = (date: DateTuple | undefined): string => {
      if (!date) return '';
      return JSON.stringify(date);
    };

    useEffect(() => {
      if (elementRef.current) {
        if (value) elementRef.current.setAttribute('value', Array.isArray(value) ? value.join('/') : String(value));
        if (placeholder) elementRef.current.setAttribute('placeholder', placeholder);
        if (format) elementRef.current.setAttribute('format', format);
        if (showHolidays !== undefined) elementRef.current.setAttribute('show-holidays', String(showHolidays));
        if (rtl !== undefined) elementRef.current.setAttribute('rtl', String(rtl));
        if (minDate) elementRef.current.setAttribute('min-date', convertDateTupleToString(minDate));
        if (maxDate) elementRef.current.setAttribute('max-date', convertDateTupleToString(maxDate));
        if (disabledDates) elementRef.current.setAttribute('disabled-dates', disabledDates);
        if (disabled !== undefined) elementRef.current.setAttribute('disabled', String(disabled));
      }
    }, [value, placeholder, format, showHolidays, rtl, minDate, maxDate, disabledDates, disabled]);

    const minDateStr = convertDateTupleToString(minDate);
    const maxDateStr = convertDateTupleToString(maxDate);

    const elementProps = {
      value,
      placeholder,
      format,
      'show-holidays': showHolidays,
      rtl,
      'min-date': minDateStr,
      'max-date': maxDateStr,
      'disabled-dates': disabledDates,
      disabled,
      ...rest
    } as React.HTMLAttributes<HTMLElement>;

    return (
      <div className={className} style={style}>
        <persian-datepicker-element
          ref={elementRef}
          {...elementProps}
        />
      </div>
    );
  }
);

// Add custom element declaration
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
        disabled?: boolean;
      }, HTMLElement>;
    }
  }
} 