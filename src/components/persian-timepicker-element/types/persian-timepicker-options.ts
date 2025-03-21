/**
 * Configuration options for the Persian Time Picker Element
 */
export interface PersianTimePickerElementOptions {
  /** 24-hour time format (true) or 12-hour (false) */
  use24Hours?: boolean;
  
  /** Show seconds input */
  showSeconds?: boolean;
  
  /** Text direction (true for RTL, false for LTR) */
  rtl?: boolean;
  
  /** Placeholder text for the input field */
  placeholder?: string;
  
  /** Default time (HH:MM or HH:MM:SS) */
  defaultTime?: string;
  
  /** Custom CSS variables to override default styling */
  cssVariables?: Record<string, string>;
} 