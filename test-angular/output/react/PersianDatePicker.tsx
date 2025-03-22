import React, { useState, useEffect, useRef } from 'react';
import { Container, WebComponentWrapper } from './PersianDatePicker.styles';

// Import the web component
import '@shadnext/persian-datepicker-element';

/**
 * PersianDatePicker - A React component version of the persian-datepicker-element web component
 * 
 * This component was generated using the shadnext CLI.
 * It provides the same functionality as the original web component but with a React API.
 * This version uses styled-components for styling.
 */

interface PersianDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  rtl?: boolean;
  primaryColor?: string;
  theme?: 'light' | 'dark';
  className?: string;
  [key: string]: any;
}

export const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  rtl = true,
  primaryColor = '#3b82f6',
  theme = 'light',
  className = '',
  ...props
}) => {
  // State
  const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
  const elementRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize web component
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial properties
    if (value) element.setAttribute('date', value);
    if (placeholder) element.setAttribute('placeholder', placeholder);
    element.setAttribute('theme', theme);
    
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
  }, [value, placeholder, theme, onChange]);
  
  return (
    <Container 
      ref={containerRef} 
      rtl={rtl} 
      primaryColor={primaryColor}
      theme={theme}
      className={className} 
      {...props}
    >
      <WebComponentWrapper>
        <shadnext-persian-datepicker 
          ref={elementRef as React.RefObject<HTMLElement>}
        />
      </WebComponentWrapper>
    </Container>
  );
}; 