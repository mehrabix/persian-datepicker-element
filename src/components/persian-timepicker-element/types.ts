/**
 * Types for the Persian Time Picker Element
 */

/**
 * Configuration options for the Persian Time Picker Element
 */
export interface PersianTimePickerElementOptions {
  /**
   * Default hour value (0-23 for 24-hour format, 1-12 for 12-hour format)
   */
  hour?: number;
  
  /**
   * Default minute value (0-59)
   */
  minute?: number;
  
  /**
   * Default second value (0-59)
   */
  second?: number;
  
  /**
   * Whether to show seconds
   */
  showSeconds?: boolean;
  
  /**
   * Whether to use 24-hour format (default: true)
   */
  use24HourFormat?: boolean;
  
  /**
   * Alternate property name for 24-hour format
   */
  use24Hours?: boolean;
  
  /**
   * Default time in string format (HH:MM:SS or HH:MM)
   */
  defaultTime?: string;
  
  /**
   * Whether the time picker is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom label for the time picker input
   */
  label?: string;
  
  /**
   * Placeholder text for the time input
   */
  placeholder?: string;
  
  /**
   * Custom CSS variables
   */
  cssVariables?: CSSVariableMap;
}

/**
 * CSS variable map for the Persian Time Picker Element
 */
export interface CSSVariableMap {
  [key: string]: string;
}

/**
 * Time change event details
 */
export interface PersianTimeChangeEvent {
  /**
   * Hour value (0-23)
   */
  hour: number;
  
  /**
   * Minute value (0-59)
   */
  minute: number;
  
  /**
   * Second value (0-59)
   */
  second: number;
  
  /**
   * Formatted time string
   */
  timeString: string;
  
  /**
   * Whether it's AM or PM in 12-hour format
   */
  isAM?: boolean;
} 