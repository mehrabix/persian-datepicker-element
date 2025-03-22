import React, { useState, useEffect, useRef } from 'react';
import './date-picker.css';

/**
 * DatePicker - A React component wrapper for the Persian datepicker web component
 * 
 * This component was generated using the shadnext CLI.
 */

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  rtl?: boolean;
  primaryColor?: string;
  className?: string;
  [key: string]: any;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  rtl = true,
  primaryColor = '#3b82f6',
  className = '',
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
  const elementRef = useRef<HTMLElement>(null);
  
  // Initialize web component
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial properties
    if (value) element.setAttribute('date', value);
    if (placeholder) element.setAttribute('placeholder', placeholder);
    
    // Add event listener
    const handleDateSelected = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSelectedDate(customEvent.detail);
      if (onChange) onChange(customEvent.detail);
    };

    element.addEventListener('dateSelected', handleDateSelected);
    
    return () => {
      element.removeEventListener('dateSelected', handleDateSelected);
    };
  }, [value, placeholder, onChange]);
  
  return (
    <div className={`shadnext-persian-datepicker-wrapper ${className}`} {...props}>
      <shadnext-persian-datepicker 
        ref={elementRef as React.RefObject<HTMLElement>}
      />
    </div>
  );
}; 