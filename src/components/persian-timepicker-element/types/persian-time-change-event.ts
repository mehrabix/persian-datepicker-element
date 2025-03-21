/**
 * Custom event type for time change events
 */
export interface PersianTimeChangeEvent extends CustomEvent {
  detail: {
    /** Time value as string (HH:MM:SS or HH:MM) */
    time: string;
    
    /** Time as object with hour, minute and optional seconds */
    timeValues: {
      hour: number;
      minute: number;
      second?: number;
      isAM?: boolean;
    };
  };
} 