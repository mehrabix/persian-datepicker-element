import React, { forwardRef, useRef, useEffect, useImperativeHandle, CSSProperties } from 'react';

import type {
  PersianDatePickerElementOptions,
  PersianDateChangeEvent,
  DateTuple,
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
      onChange,
      className,
      style,
      primaryColor,
      primaryHover,
      backgroundColor,
      foregroundColor,
      borderColor,
      borderRadius,
      fontFamily,
      holidayColor,
      holidayBg,
      scrollbarWidth,
      scrollbarThumbColor,
      scrollbarThumbHoverColor,
      scrollbarTrackColor,
      scrollbarBorderRadius,
      ...restProps
    } = props;

    // Reference to the web component element
    const elementRef = useRef<PersianDatepickerElement | null>(null);

    // Container div reference for styling
    const containerRef = useRef<HTMLDivElement>(null);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return elementRef.current?.getValue?.() || [0, 0, 0];
      },
      setValue: (year: number, month: number, day: number) => {
        elementRef.current?.setValue?.(year, month, day);
      },
      open: () => {
        elementRef.current?.open?.();
      },
      close: () => {
        elementRef.current?.close?.();
      },
      getElement: () => elementRef.current,
    }));

    // Create and configure the web component on mount
    useEffect(() => {
      if (containerRef.current) {
        // Create the element if it doesn't exist
        if (!elementRef.current) {
          const element = document.createElement(
            'persian-datepicker-element'
          ) as PersianDatepickerElement;
          elementRef.current = element;
          containerRef.current.appendChild(element);
        }

        // Set element properties from props
        const element = elementRef.current;

        // Apply all props as attributes
        Object.entries(restProps).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            const attributeName = toKebabCase(key);
            element.setAttribute(attributeName, convertValueToAttribute(value));
          }
        });

        // Apply CSS custom properties
        if (primaryColor) element.style.setProperty('--jdp-primary', primaryColor);
        if (primaryHover) element.style.setProperty('--jdp-primary-hover', primaryHover);
        if (backgroundColor) element.style.setProperty('--jdp-background', backgroundColor);
        if (foregroundColor) element.style.setProperty('--jdp-foreground', foregroundColor);
        if (borderColor) element.style.setProperty('--jdp-border', borderColor);
        if (borderRadius) element.style.setProperty('--jdp-border-radius', borderRadius);
        if (fontFamily) element.style.setProperty('--jdp-font-family', fontFamily);
        if (holidayColor) element.style.setProperty('--jdp-holiday-color', holidayColor);
        if (holidayBg) element.style.setProperty('--jdp-holiday-bg', holidayBg);
        if (scrollbarWidth) element.style.setProperty('--jdp-scrollbar-width', scrollbarWidth);
        if (scrollbarThumbColor)
          element.style.setProperty('--jdp-scrollbar-thumb-color', scrollbarThumbColor);
        if (scrollbarThumbHoverColor)
          element.style.setProperty('--jdp-scrollbar-thumb-hover-color', scrollbarThumbHoverColor);
        if (scrollbarTrackColor)
          element.style.setProperty('--jdp-scrollbar-track-color', scrollbarTrackColor);
        if (scrollbarBorderRadius)
          element.style.setProperty('--jdp-scrollbar-border-radius', scrollbarBorderRadius);

        // Add change event listener
        const handleDateChange = (event: any) => {
          const customEvent = event as CustomEvent<PersianDateChangeEvent>;
          if (onChange && customEvent.detail) {
            onChange(customEvent.detail);
          }
        };

        element.addEventListener('change', handleDateChange);
        return () => {
          element.removeEventListener('change', handleDateChange);
        };
      }
    }, [
      onChange,
      primaryColor,
      primaryHover,
      backgroundColor,
      foregroundColor,
      borderColor,
      borderRadius,
      fontFamily,
      holidayColor,
      holidayBg,
      scrollbarWidth,
      scrollbarThumbColor,
      scrollbarThumbHoverColor,
      scrollbarTrackColor,
      scrollbarBorderRadius,
      ...Object.values(restProps),
    ]);

    return <div ref={containerRef} className={className} style={style}></div>;
  }
);
