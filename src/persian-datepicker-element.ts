import { PersianDate } from './persian-date';
import EventUtils from './utils/event-utils';
import { 
  PersianDatePickerElementOptions, 
  PersianDateChangeEvent,
  DateTuple
} from './types';

// Complete CSS style definition with all variables
const styles = `:host {
  /* Color scheme */
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Holiday colors */
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
  --jdp-holiday-hover-bg: #fecaca;
  
  /* Range selection colors */
  --jdp-range-bg: rgba(8, 145, 178, 0.1);
  --jdp-range-color: var(--jdp-foreground);
  --jdp-range-start-bg: var(--jdp-primary);
  --jdp-range-start-color: var(--jdp-primary-foreground);
  --jdp-range-end-bg: var(--jdp-primary);
  --jdp-range-end-color: var(--jdp-primary-foreground);
  
  /* Typography */
  --jdp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  --jdp-font-weight-medium: 500;
  --jdp-day-name-font-size: 12px;
  --jdp-day-name-font-weight: 400;
  --jdp-day-font-size: 13px;
  --jdp-day-font-weight: 400;
  --jdp-month-year-font-size: 14px;
  --jdp-month-year-font-weight: 500;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Input field */
  --jdp-input-padding-x: 14px;
  --jdp-input-padding-y: 10px;
  --jdp-input-border-width: 1px;
  --jdp-input-border-color: var(--jdp-border);
  --jdp-input-border-radius: var(--jdp-border-radius);
  --jdp-input-focus-ring-width: 2px;
  --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
  
  /* Calendar popup */
  --jdp-calendar-width: 280px;
  --jdp-calendar-padding: var(--jdp-spacing-md);
  --jdp-calendar-border-width: 1px;
  --jdp-calendar-border-color: var(--jdp-border);
  --jdp-calendar-border-radius: var(--jdp-border-radius);
  --jdp-calendar-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  --jdp-calendar-z-index: 10;
  
  /* Navigation buttons */
  --jdp-nav-button-size: 30px;
  --jdp-nav-button-bg: var(--jdp-muted);
  --jdp-nav-button-bg-hover: var(--jdp-border);
  --jdp-nav-button-border-radius: var(--jdp-border-radius);
  --jdp-nav-arrow-size: 8px;
  --jdp-nav-arrow-thickness: 2px;
  --jdp-nav-arrow-color: var(--jdp-foreground);
  
  /* Day grid */
  --jdp-day-cell-size: 32px;
  --jdp-day-cell-margin: 1px;
  --jdp-day-cell-border-radius: var(--jdp-border-radius);
  
  /* States */
  --jdp-day-hover-bg: var(--jdp-muted);
  --jdp-day-selected-bg: var(--jdp-primary);
  --jdp-day-selected-color: var(--jdp-primary-foreground);
  --jdp-day-today-border-color: var(--jdp-primary);
  --jdp-day-today-border-width: 1px;
  --jdp-day-disabled-opacity: 0.4;
  
  /* Animations */
  --jdp-transition-duration: 0.2s;
  --jdp-fade-from-y: -4px;
  --jdp-fade-from-y-reverse: 4px;
  --jdp-month-transition-duration: 0.3s;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
  --jdp-header-gap: var(--jdp-spacing-xs);

  /* Select boxes - default values that can be overridden */
  --jdp-select-container-gap: 8px;
  --jdp-select-trigger-height: var(--jdp-nav-button-size);
  --jdp-select-trigger-bg: var(--jdp-muted);
  --jdp-select-trigger-max-width: 110px;
  --jdp-select-month-trigger-max-width: var(--jdp-select-trigger-max-width);
  --jdp-select-year-trigger-max-width: var(--jdp-select-trigger-max-width);
  --jdp-select-dropdown-width: auto;
  --jdp-select-text-overflow: ellipsis;
  
  /* Scrollbar styling - thin and subtle */
  --jdp-scrollbar-width: 4px;
  --jdp-scrollbar-track: transparent;
  --jdp-scrollbar-thumb: rgba(0, 0, 0, 0.15);
  --jdp-scrollbar-thumb-hover: rgba(0, 0, 0, 0.25);
  --jdp-scrollbar-border-radius: 4px;
}

* {
  box-sizing: border-box;
  direction: var(--jdp-direction);
}

.picker-container {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--jdp-font-family);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-weight: var(--jdp-font-weight);
}

input {
  width: 100%;
  padding: var(--jdp-input-padding-y) var(--jdp-input-padding-x);
  border-radius: var(--jdp-input-border-radius);
  border: var(--jdp-input-border-width) solid var(--jdp-input-border-color);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-family: inherit;
  background-color: var(--jdp-background);
  color: var(--jdp-foreground);
  cursor: pointer;
  outline: none;
  transition: all var(--jdp-transition-duration) ease;
  text-align: right;
}

input:focus {
  border-color: var(--jdp-ring);
  box-shadow: 0 0 0 var(--jdp-input-focus-ring-width) var(--jdp-input-focus-ring-color);
}

.calendar {
  display: none;
  position: absolute;
  right: 0;
  width: var(--jdp-calendar-width);
  background: var(--jdp-background);
  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);
  border-radius: var(--jdp-calendar-border-radius);
  box-shadow: var(--jdp-calendar-shadow);
  padding: var(--jdp-calendar-padding);
  text-align: center;
  z-index: var(--jdp-calendar-z-index);
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  contain: layout style;
}

.calendar.position-bottom {
  top: calc(100% + 5px);
  animation: fadeInFromTop var(--jdp-transition-duration) ease;
}

.calendar.position-top {
  bottom: calc(100% + 5px);
  animation: fadeInFromBottom var(--jdp-transition-duration) ease;
}

.calendar.visible {
  display: block;
}

@keyframes fadeInFromTop {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInFromBottom {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y-reverse)); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--jdp-spacing-md);
  gap: var(--jdp-header-gap, var(--jdp-spacing-xs));
}

.month-year {
  font-weight: var(--jdp-month-year-font-weight);
  font-size: var(--jdp-month-year-font-size);
  color: var(--jdp-foreground);
  transition: opacity var(--jdp-transition-duration) ease;
}

.month-year.fade {
  opacity: 0;
}

.days-wrapper {
  position: relative;
  touch-action: pan-y;
  overflow: visible;
  z-index: 1;
  contain: layout;
  isolation: isolate;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  transition: transform var(--jdp-month-transition-duration) ease, opacity var(--jdp-month-transition-duration) ease;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  position: relative;
  contain: layout;
}

.days.slide-left {
  animation: slideInLeft var(--jdp-month-transition-duration) ease;
}

.days.slide-right {
  animation: slideInRight var(--jdp-month-transition-duration) ease;
}

@keyframes slideInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-10%) translateZ(0);
    pointer-events: none;
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto;
  }
}

@keyframes slideInRight {
  from { 
    opacity: 0; 
    transform: translateX(10%) translateZ(0); 
    pointer-events: none;
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto;
  }
}

.day {
  position: relative;
  z-index: 1;
  touch-action: manipulation;
  isolation: isolate;
}

.day:hover {
  z-index: 2;
}

.nav-button {
  background: var(--jdp-nav-button-bg);
  border: none;
  border-radius: var(--jdp-nav-button-border-radius);
  width: var(--jdp-nav-button-size);
  height: var(--jdp-nav-button-size);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--jdp-transition-duration) ease;
  position: relative;
  touch-action: manipulation;
  will-change: transform, background-color;
}

.nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.nav-button:active {
  transform: translateY(1px);
}

.nav-button::before {
  content: '';
  display: block;
  width: var(--jdp-nav-arrow-size);
  height: var(--jdp-nav-arrow-size);
  border-top: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  border-right: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  position: absolute;
}

.nav-button.prev::before {
  transform: rotate(45deg);
  right: 11px;
  left: auto;
}

.nav-button.next::before {
  transform: rotate(225deg);
  left: 11px;
  right: auto;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--jdp-spacing-sm);
}

.day-name {
  font-size: var(--jdp-day-name-font-size);
  font-weight: var(--jdp-day-name-font-weight);
  color: var(--jdp-muted-foreground);
  padding: var(--jdp-spacing-xs) 0;
  text-align: center;
}

.day {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--jdp-day-cell-border-radius);
  font-size: var(--jdp-day-font-size);
  font-weight: var(--jdp-day-font-weight);
  cursor: pointer;
  transition: var(--jdp-transition-duration) ease;
  margin: var(--jdp-day-cell-margin);
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}

.day:hover:not(.empty):not(.disabled) {
  background: var(--jdp-day-hover-bg);
}

.day.selected {
  background: var(--jdp-day-selected-bg);
  color: var(--jdp-day-selected-color);
}

.day.today:not(.selected) {
  border: var(--jdp-day-today-border-width) solid var(--jdp-day-today-border-color);
}

.day.empty {
  cursor: default;
}

.day.disabled {
  opacity: var(--jdp-day-disabled-opacity);
  cursor: not-allowed;
}

/* Holiday styles */
.day.holiday:not(.selected) {
  color: var(--jdp-holiday-color);
  background-color: var(--jdp-holiday-bg);
  font-weight: var(--jdp-font-weight-medium);
}

.day.holiday:hover:not(.selected):not(.disabled) {
  background-color: var(--jdp-holiday-hover-bg);
}

/* Special styling for holidays within a range */
.day.holiday.in-range {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
}

.day.holiday.range-start,
.day.holiday.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
}

.day.friday {
  color: var(--jdp-holiday-color);
}

.event-tooltip {
  position: absolute;
  background: var(--jdp-background);
  border: 1px solid var(--jdp-border);
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-sm);
  width: 200px;
  box-shadow: var(--jdp-calendar-shadow);
  text-align: right;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--jdp-transition-duration) ease, visibility var(--jdp-transition-duration) ease;
  pointer-events: none;
  bottom: 120%;
  right: 0;
  transform: translateY(-5px);
  z-index: 9999;
}

.event-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  background: var(--jdp-background);
}

/* Mobile-specific tooltip positioning */
@media (max-width: 768px) {
  .event-tooltip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    bottom: auto;
    right: auto;
    background: var(--jdp-background);
    z-index: 9999;
  }

  .event-tooltip::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}

.event-item {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--jdp-border);
  color: var(--jdp-foreground);
  background: var(--jdp-background);
}

.event-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.event-item.holiday {
  color: var(--jdp-holiday-color);
}

.event-type-label {
  display: inline-block;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  margin-right: 4px;
  background-color: var(--jdp-muted);
  color: var(--jdp-muted-foreground);
}

/* Today button styling */
.footer {
  margin-top: var(--jdp-spacing-md);
  display: flex;
  justify-content: space-between;
}

.date-nav-button {
  background: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-md);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  color: var(--jdp-foreground);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.date-nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.date-nav-button:active {
  transform: translateY(1px);
}

/* Month/Year selectors - scoped to the component */
:host .selectors-container {
  display: flex;
  gap: var(--jdp-select-container-gap, 8px);
  position: relative;
  align-items: var(--jdp-select-container-align, center);
  justify-content: var(--jdp-select-container-justify, space-between);
  width: 100%;
  max-width: calc(100% - var(--jdp-nav-button-size) * 2 - var(--jdp-spacing-sm));
  margin: 0 var(--jdp-spacing-xs);
}

:host .custom-select {
  position: relative;
  user-select: none;
  width: 100%;
  margin: 0 var(--jdp-spacing-xs, 2px);
}

:host .month-select {
  margin-left: var(--jdp-month-select-margin-left, 0);
  margin-right: var(--jdp-month-select-margin-right, 0);
}

:host .year-select {
  margin-left: var(--jdp-year-select-margin-left, 0);
  margin-right: var(--jdp-year-select-margin-right, 0);
}

:host .select-trigger {
  display: flex;
  align-items: center;
  justify-content: var(--jdp-select-trigger-justify, center);
  gap: 0 4px;
  width: 100%;
  height: var(--jdp-select-trigger-height, var(--jdp-nav-button-size));
  min-height: var(--jdp-nav-button-size);
  background-color: var(--jdp-select-trigger-bg, var(--jdp-muted));
  border: var(--jdp-select-trigger-border-width, 1px) solid var(--jdp-select-trigger-border-color, var(--jdp-border));
  border-radius: var(--jdp-select-trigger-border-radius, var(--jdp-border-radius));
  color: var(--jdp-select-trigger-color, var(--jdp-foreground));
  font-family: inherit;
  font-size: var(--jdp-select-trigger-font-size, var(--jdp-font-size));
  line-height: 1;
  padding: 0 var(--jdp-select-trigger-padding-x, 0);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  text-align: var(--jdp-select-trigger-text-align, center);
  min-width: var(--jdp-select-trigger-min-width, initial);
  outline: none;
  font-weight: var(--jdp-select-trigger-font-weight, 500);
  box-sizing: border-box;
  max-width: var(--jdp-select-trigger-max-width, 110px);
}

:host .month-select .select-trigger {
  max-width: var(--jdp-select-month-trigger-max-width, var(--jdp-select-trigger-max-width));
}

:host .year-select .select-trigger {
  max-width: var(--jdp-select-year-trigger-max-width, var(--jdp-select-trigger-max-width));
}

:host .select-trigger span:first-child {
  white-space: nowrap;
  overflow: var(--jdp-select-trigger-overflow, visible);
  text-overflow: var(--jdp-select-text-overflow, ellipsis);
  max-width: calc(100% - 24px);
  display: inline-block;
  text-align: center;
  flex: 1;
}

:host .select-trigger:hover {
  background-color: var(--jdp-select-trigger-bg-hover, rgba(0, 0, 0, 0.05));
  border-color: var(--jdp-select-trigger-border-hover, var(--jdp-border));
}

:host .select-trigger:focus-visible {
  outline: 2px solid var(--jdp-select-trigger-focus-ring-color, var(--jdp-ring));
  outline-offset: var(--jdp-select-trigger-focus-ring-offset, 2px);
}

:host .select-icon {
  margin-left: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));
  display: var(--jdp-select-icon-display, none);
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  width: var(--jdp-select-icon-size, 12px);
  height: var(--jdp-select-icon-size, 12px);
  opacity: var(--jdp-select-icon-opacity, 0.7);
  flex-shrink: 0;
}

:host .select-icon svg {
  width: var(--jdp-select-icon-size, 12px);
  height: var(--jdp-select-icon-size, 12px);
}

:host .select-content.open .select-icon {
  transform: rotate(180deg);
}

:host .select-content {
  position: var(--jdp-select-content-position, absolute);
  top: calc(100% + var(--jdp-select-content-top-offset, 5px));
  left: 0;
  width: var(--jdp-select-dropdown-width, 100%);
  min-width: 100%;
  background-color: var(--jdp-select-content-bg, var(--jdp-background));
  border: var(--jdp-select-content-border-width, 1px) solid var(--jdp-select-content-border-color, var(--jdp-border));
  border-radius: var(--jdp-select-content-border-radius, var(--jdp-border-radius));
  box-shadow: var(--jdp-select-content-shadow, 0 4px 8px rgba(0,0,0,0.1));
  z-index: var(--jdp-select-content-z-index, 20);
  overflow-y: auto;
  max-height: var(--jdp-select-content-max-height, 200px);
  display: none;
  padding: var(--jdp-select-content-padding-y, 0.25rem) var(--jdp-select-content-padding-x, 0);
  scroll-behavior: smooth;
  
  /* Custom scrollbar styling */
  scrollbar-width: var(--jdp-scrollbar-width-size, none);
  scrollbar-color: var(--jdp-scrollbar-thumb, rgba(0, 0, 0, 0.15)) var(--jdp-scrollbar-track, transparent);
}

/* Webkit-based browsers (Chrome, Safari, Edge) */
:host .select-content::-webkit-scrollbar {
  width: var(--jdp-scrollbar-width, 4px);
}

:host .select-content::-webkit-scrollbar-track {
  background: var(--jdp-scrollbar-track, transparent);
  border-radius: var(--jdp-scrollbar-border-radius, 4px);
}

:host .select-content::-webkit-scrollbar-thumb {
  background-color: var(--jdp-scrollbar-thumb, rgba(0, 0, 0, 0.15));
  border-radius: var(--jdp-scrollbar-border-radius, 4px);
}

:host .select-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--jdp-scrollbar-thumb-hover, rgba(0, 0, 0, 0.25));
}

:host .select-content.open {
  display: block;
  animation: fadeInSelect var(--jdp-select-content-animation-duration, var(--jdp-transition-duration)) ease;
}

:host .month-select-content {
  width: var(--jdp-select-month-width, var(--jdp-select-dropdown-width, auto));
  min-width: 100%;
}

:host .year-select-content {
  width: var(--jdp-select-year-width, var(--jdp-select-dropdown-width, auto));
  min-width: 100%;
}

:host .select-item {
  padding: var(--jdp-select-item-padding-y, 0.5rem) var(--jdp-select-item-padding-x, 0.75rem);
  cursor: pointer;
  transition: background-color var(--jdp-transition-duration) ease;
  border-radius: var(--jdp-select-item-border-radius, var(--jdp-select-trigger-border-radius, var(--jdp-border-radius)));
  margin: var(--jdp-select-item-margin, 0 0.25rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: var(--jdp-select-item-max-width, 100%);
  box-sizing: border-box;
  text-align: var(--jdp-select-item-text-align, center);
}

:host .select-item:hover {
  background-color: var(--jdp-select-item-hover-bg, var(--jdp-day-hover-bg));
}

:host .select-item.selected {
  background-color: var(--jdp-select-item-selected-bg, var(--jdp-primary));
  color: var(--jdp-select-item-selected-color, var(--jdp-primary-foreground));
  font-weight: var(--jdp-select-item-selected-font-weight, var(--jdp-font-weight-medium));
  border-radius: var(--jdp-select-item-selected-border-radius, var(--jdp-select-trigger-border-radius, var(--jdp-border-radius)));
}

@keyframes fadeInSelect {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* RTL specific styles */
:host([rtl="true"]) .select-icon,
:host([dir="rtl"]) .select-icon {
  margin-left: 0;
  margin-right: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));
}

:host([rtl="true"]) .select-item,
:host([dir="rtl"]) .select-item {
  text-align: var(--jdp-select-item-text-align, right);
}

/* Dark mode support using CSS media query for scrollbar */
@media (prefers-color-scheme: dark) {
  :host {
    --jdp-scrollbar-thumb: rgba(124, 124, 124, 0.15);
    --jdp-scrollbar-thumb-hover: rgba(41, 41, 41, 0.25);
  }
}

/* Allow manual dark mode toggle via class-based approach */
:host(.dark-theme) {
    --jdp-scrollbar-thumb: rgba(124, 124, 124, 0.15);
    --jdp-scrollbar-thumb-hover: rgba(41, 41, 41, 0.25);
}

/* Range selection styles */
.day.in-range {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
  position: relative;
  z-index: 1;
  border-radius: 0;
}

.day.range-start,
.day.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
  position: relative;
  z-index: 2;
}

.day.range-start {
  border-radius: 0 var(--jdp-border-radius) var(--jdp-border-radius) 0;
}

.day.range-end {
  border-radius: var(--jdp-border-radius) 0 0 var(--jdp-border-radius);
}

/* RTL specific range styles */
:host([rtl="true"]) .day.range-start,
:host([dir="rtl"]) .day.range-start {
  border-radius: var(--jdp-border-radius) 0 0 var(--jdp-border-radius);
}

:host([rtl="true"]) .day.range-end,
:host([dir="rtl"]) .day.range-end {
  border-radius: 0 var(--jdp-border-radius) var(--jdp-border-radius) 0;
}

/* Special handling for single day range */
.day.range-start.range-end {
  border-radius: var(--jdp-border-radius);
}

/* Ensure range styles take precedence over other styles */
.day.in-range:not(.range-start):not(.range-end) {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
  border-radius: 0;
}

/* Handle disabled dates in range */
.day.disabled.in-range {
  opacity: 0.4;
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
  border-radius: 0;
}

/* Handle holidays in range */
.day.holiday.in-range:not(.range-start):not(.range-end) {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
  border-radius: 0;
}

.day.holiday.range-start,
.day.holiday.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
}
`;

// Default holiday types
const DEFAULT_HOLIDAY_TYPES = ['Iran', 'AncientIran', 'International'];

/**
 * Jalali Date Picker Web Component
 * 
 * A customizable date picker that follows the Jalali (Persian) calendar.
 * Features include:
 * - Month and year dropdown navigation with 150-year range
 * - Quick today and tomorrow navigation buttons
 * - Touch gesture support for swiping between months
 * - Holiday highlighting with customizable types
 * - Full RTL support
 * - Customizable styling with global CSS variables
 * - Shadcn-like UI with ability to toggle visibility of UI elements
 * - Consistent UI sizing with properly aligned select boxes and buttons
 * 
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-datepicker-element></persian-datepicker-element>
 * 
 * <!-- With attributes -->
 * <persian-datepicker-element placeholder="انتخاب تاریخ" format="YYYY/MM/DD"></persian-datepicker-element>
 * 
 * <!-- With holiday types -->
 * <persian-datepicker-element holiday-types="Iran,Afghanistan,AncientIran,International"></persian-datepicker-element>
 * 
 * <!-- With all holiday types -->
 * <persian-datepicker-element holiday-types="all"></persian-datepicker-element>
 * 
 * <!-- With custom Today button text -->
 * <persian-datepicker-element today-button-text="Go to Today"></persian-datepicker-element>
 * 
 * <!-- With custom Tomorrow button text -->
 * <persian-datepicker-element tomorrow-button-text="Next Day"></persian-datepicker-element>
 * 
 * <!-- With custom button styling -->
 * <persian-datepicker-element today-button-class="primary rounded" tomorrow-button-class="secondary rounded"></persian-datepicker-element>
 * 
 * <!-- With styling customization -->
 * <persian-datepicker-element style="--jdp-primary: #3b82f6; --jdp-font-family: 'Vazir', sans-serif;"></persian-datepicker-element>
 *
 * <!-- Hiding specific UI elements -->
 * <persian-datepicker-element 
 *   show-prev-button="false"
 *   show-next-button="false"
 *   show-tomorrow-button="false"
 * ></persian-datepicker-element>
 * ```
 * 
 * @element persian-datepicker-element
 * 
 * @attr {string} placeholder - Placeholder text for the input field
 * @attr {string} format - Date format (e.g., "YYYY/MM/DD")
 * @attr {boolean} rtl - Whether to use RTL direction
 * @attr {boolean} show-holidays - Whether to highlight holidays
 * @attr {string} holiday-types - Comma-separated list of holiday types to display (e.g., "Iran,Afghanistan,AncientIran,International" or "all" to show all available types)
 * @attr {string} event-types - Comma-separated list of event types to display (e.g., "Iran,Afghanistan,AncientIran,International" or "all" to show all available types)
 * @attr {string} today-button-text - Custom text for the Today button (default: "امروز")
 * @attr {string} today-button-class - Additional CSS classes for the Today button
 * @attr {string} tomorrow-button-text - Custom text for the Tomorrow button (default: "فردا")
 * @attr {string} tomorrow-button-class - Additional CSS classes for the Tomorrow button
 * 
 * @attr {boolean} show-month-selector - Whether to show the month selector (default: true)
 * @attr {boolean} show-year-selector - Whether to show the year selector (default: true)
 * @attr {boolean} show-prev-button - Whether to show the previous month button (default: true)
 * @attr {boolean} show-next-button - Whether to show the next month button (default: true)
 * @attr {boolean} show-today-button - Whether to show the Today button (default: true)
 * @attr {boolean} show-tomorrow-button - Whether to show the Tomorrow button (default: true)
 * 
 * Styling:
 * The component can be styled using CSS variables. These can be set globally in your CSS
 * or directly on the element using the style attribute. See the component's CSS file
 * for the complete list of available CSS variables.
 */
export class PersianDatePickerElement extends HTMLElement {
  // Private DOM elements
  private input!: HTMLInputElement;
  private calendar!: HTMLDivElement;
  private daysContainer!: HTMLDivElement;
  private dayNamesContainer!: HTMLDivElement;
  private eventUtils: EventUtils;
  
  // Date state
  private jalaliYear: number = 0;
  private jalaliMonth: number = 0;
  private jalaliDay: number = 0;
  private selectedDate: DateTuple | null = null;
  
  // Range selection state
  private isRangeMode: boolean = false;
  private rangeStart: DateTuple | null = null;
  private rangeEnd: DateTuple | null = null;
  private isSelectingRange: boolean = false;
  
  // Configuration
  private options: PersianDatePickerElementOptions;
  private showEvents: boolean = true;
  private eventTypes: string[] = [...DEFAULT_HOLIDAY_TYPES];
  private includeAllTypes: boolean = false;
  private isTransitioning: boolean = false;
  private _documentClickHandler: EventListener = () => {};
  
  // Static property to track currently open calendar instance
  private static openCalendarInstance: PersianDatePickerElement | null = null;
  
  // Persian month names - defined once to avoid recreation
  private readonly persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  // Add mapping for holiday type labels
  private readonly holidayTypeLabels: { [key: string]: string } = {
    'Iran': 'ایران',
    'Afghanistan': 'افغانستان',
    'AncientIran': 'ایران باستان',
    'International': 'بین‌المللی'
  };

  // Add format and limits properties
  private format: string = 'YYYY/MM/DD';
  private minDate: DateTuple | null = null;
  private maxDate: DateTuple | null = null;
  private disabledDatesFn: ((year: number, month: number, day: number) => boolean) | null = null;

  // Add helper function to convert numbers to Persian numerals
  private toPersianNum(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => persianDigits[parseInt(x)]);
  }

  static get observedAttributes() {
    return [
      'placeholder', 
      'rtl', 
      'format', 
      'show-holidays',
      'holiday-types',
      'event-types',
      'show-events',
      'today-button-text',
      'today-button-class',
      'tomorrow-button-text',
      'tomorrow-button-class',
      'min-date',
      'max-date',
      'disabled-dates',
      'range-mode',
      // UI visibility props
      'show-month-selector',
      'show-year-selector',
      'show-prev-button',
      'show-next-button',
      'show-today-button',
      'show-tomorrow-button'
    ];
  }

  constructor(options: PersianDatePickerElementOptions = {}) {
    super();
    this.options = options;
    this.eventUtils = EventUtils.getInstance();
    
    // Set showE from options if provided
    if (options.showEvents !== undefined) {
      this.showEvents = options.showEvents;
    }
    
    // Set format from options if provided
    if (options.format) {
      this.format = options.format;
    }
    
    // Set RTL from options if provided
    if (options.rtl !== undefined) {
      this.style.setProperty('--jdp-direction', options.rtl ? 'rtl' : 'ltr');
    }
    
    // Set range mode from options if provided
    if (options.rangeMode !== undefined) {
      this.isRangeMode = options.rangeMode;
    }
    
    // Set range start and end from options if provided
    if (options.rangeStart) {
      this.rangeStart = options.rangeStart;
    }
    
    if (options.rangeEnd) {
      this.rangeEnd = options.rangeEnd;
    }
    
    // Set min and max dates from options if provided
    if (options.minDate) {
      this.minDate = options.minDate;
    }
    
    if (options.maxDate) {
      this.maxDate = options.maxDate;
    }
    
    // Set disabled dates function from options if provided
    if (options.disabledDates) {
      if (typeof options.disabledDates === 'function') {
        this.disabledDatesFn = options.disabledDates;
      } else if (typeof options.disabledDates === 'string') {
        // Try to find the function in the global scope
        const disabledFn = (window as any)[options.disabledDates];
        if (typeof disabledFn === 'function') {
          this.disabledDatesFn = disabledFn;
        }
      }
    }
    
    // Set default date from options if provided
    if (options.defaultDate) {
      this.selectedDate = options.defaultDate;
      this.jalaliYear = options.defaultDate[0];
      this.jalaliMonth = options.defaultDate[1];
      this.jalaliDay = options.defaultDate[2];
    }

    // Create shadow DOM and render initial structure
    const shadow = this.attachShadow({ mode: "open" });
    this.render(shadow);
    
    // Set holiday types if provided in options
    if (options.showEvents && options.eventTypes) {
      this.seteventTypes(options.eventTypes);
    }
  }

  async connectedCallback() {
    try {
      if (!this.shadowRoot) {
        console.error("Shadow root not available");
        return;
      }

      // Initialize DOM references
      this.initializeDomReferences();
      
      // Initialize with today's date
      this.initializeCurrentDate();
      
      // Initialize events data using the singleton
      EventUtils.initialize();
      
      // Get the EventUtils instance to be used throughout the component
      this.eventUtils = EventUtils.getInstance();
      
      // Setup initial UI components
      this.initializeUIComponents();
      
      // Set up event listeners
      this.addEventListeners();
      
      // Initialize touch gesture support
      this.initTouchGestures();
      
      // Update the UI with the current date
      this.renderCalendar();
      
      // Add a slight delay and re-render after initialization to ensure events are loaded
      setTimeout(() => {
        if (this.calendar) {
          console.log('Events loaded, updating calendar after delay');
          this.renderCalendar();
        }
      }, 100);
    } catch (error) {
      console.error("Error in connectedCallback:", error);
    }
  }

  disconnectedCallback() {
    // Clean up event listeners to prevent memory leaks
    if (this._documentClickHandler) {
      document.removeEventListener("click", this._documentClickHandler);
    }
    
    // Clean up the openCalendarInstance if this element is being removed
    if (PersianDatePickerElement.openCalendarInstance === this) {
      PersianDatePickerElement.openCalendarInstance = null;
    }
    
    // Remove all event listeners from the shadow DOM elements
    if (this.shadowRoot) {
      // Remove input event listener
      if (this.input) {
        this.input.removeEventListener("click", this.handleInputClick);
      }
      
      // Remove calendar event listeners
      if (this.calendar) {
        this.calendar.removeEventListener("click", (e) => e.stopPropagation());
      }
      
      // Remove days container event listener
      if (this.daysContainer) {
        this.daysContainer.removeEventListener("click", this.handleDayClick.bind(this));
      }
      
      // Remove navigation button event listeners
      const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
      const nextMonthBtn = this.shadowRoot.getElementById("next-month");
      const todayBtn = this.shadowRoot.getElementById("today-button");
      const tomorrowBtn = this.shadowRoot.getElementById("tomorrow-button");
      
      if (prevMonthBtn) {
        prevMonthBtn.removeEventListener("click", () => this.changeMonth(-1));
        prevMonthBtn.removeEventListener("touchstart", (e) => e.stopPropagation());
      }
      
      if (nextMonthBtn) {
        nextMonthBtn.removeEventListener("click", () => this.changeMonth(1));
        nextMonthBtn.removeEventListener("touchstart", (e) => e.stopPropagation());
      }
      
      if (todayBtn) {
        todayBtn.removeEventListener("click", () => this.goToToday());
      }
      
      if (tomorrowBtn) {
        tomorrowBtn.removeEventListener("click", () => this.goToTomorrow());
      }
      
      // Remove touch event listeners
      if (this.calendar) {
        this.calendar.removeEventListener("touchstart", this.handleTouchStart as EventListener);
        this.calendar.removeEventListener("touchmove", this.handleTouchMove as EventListener);
        this.calendar.removeEventListener("touchend", this.handleTouchEnd as EventListener);
        this.calendar.removeEventListener("touchcancel", this.handleTouchCancel as EventListener);
      }
    }
  }

  /**
   * Handle attribute changes
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    // Early return if element is not fully initialized
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'placeholder':
        if (this.input) this.input.placeholder = newValue || '';
        break;
        
      case 'rtl':
        const rtl = newValue !== null && newValue !== 'false';
        this.style.setProperty('--jdp-direction', rtl ? 'rtl' : 'ltr');
        break;
        
      case 'show-holidays':
      case 'show-events':
        this.showEvents = newValue !== null && newValue !== 'false';
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'holiday-types':
      case 'event-types':
        if (newValue) {
          this.seteventTypes(newValue);
        } else {
          this.eventTypes = [...DEFAULT_HOLIDAY_TYPES];
          this.includeAllTypes = false;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'format':
        if (newValue && this.isValidFormat(newValue)) {
          this.format = newValue;
          // Ensure the format is applied immediately
          if (this.selectedDate) {
            this.formatAndSetValue();
          }
        }
        break;

      case 'min-date':
        if (newValue) {
          try {
            const [year, month, day] = JSON.parse(newValue);
            this.setMinDate(year, month, day);
          } catch (e) {
            console.error('Invalid min-date format');
          }
        } else {
          this.minDate = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;

      case 'max-date':
        if (newValue) {
          try {
            const [year, month, day] = JSON.parse(newValue);
            this.setMaxDate(year, month, day);
          } catch (e) {
            console.error('Invalid max-date format');
          }
        } else {
          this.maxDate = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;

      case 'disabled-dates':
        if (newValue) {
          // First try to see if the function is a property of this element
          let disabledFn = null;
          
          try {
            // Try to evaluate as a function expression
            if (typeof newValue === 'function') {
              // Direct function assignment (React use case)
              disabledFn = newValue;
            } else if (typeof this[newValue as keyof this] === 'function') {
              // Function is a method on this element
              disabledFn = this[newValue as keyof this] as unknown as ((year: number, month: number, day: number) => boolean);
            } else {
              // Look in window scope as fallback for backward compatibility
              disabledFn = (window as any)[newValue];
            }
          } catch (e) {
            console.error('Error accessing disabled dates function:', e);
          }
          
          if (typeof disabledFn === 'function') {
            this.disabledDatesFn = disabledFn;
          } else {
            console.warn(`Disabled dates function '${newValue}' not found. Function should be provided directly, as a method on the element, or available in the global scope.`);
          }
        } else {
          this.disabledDatesFn = null;
        }
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      case 'today-button-text':
      case 'tomorrow-button-text':
        this.updateButtonText(name, newValue);
        break;
        
      case 'today-button-class':
      case 'tomorrow-button-class':
        this.updateButtonClass(name, newValue);
        break;
        
      case 'range-mode':
        this.isRangeMode = newValue !== null && newValue !== 'false';
        if (this.calendar) {
          this.renderCalendar();
        }
        break;
        
      // Visibility attributes that require re-rendering
      case 'show-month-selector':
      case 'show-year-selector':
      case 'show-prev-button':
      case 'show-next-button':
      case 'show-today-button':
      case 'show-tomorrow-button':
        // Re-create the shadow DOM with updated visibility settings
        if (this.shadowRoot) {
          this.render(this.shadowRoot);
          // Re-initialize after re-rendering
          this.initializeDomReferences();
          this.initializeUIComponents();
          this.addEventListeners();
          this.renderCalendar();
        }
        break;
    }
  }

  /**
   * Helper to update button text from attributes
   */
  private updateButtonText(attrName: string, newValue: string): void {
    if (!this.shadowRoot) return;
    
    const buttonId = attrName === 'today-button-text' ? 'today-button' : 'tomorrow-button';
    const defaultText = attrName === 'today-button-text' ? 'امروز' : 'فردا';
    
    const button = this.shadowRoot.getElementById(buttonId);
    if (button) {
      button.textContent = newValue || defaultText;
    }
  }

  /**
   * Helper to update button class from attributes
   */
  private updateButtonClass(attrName: string, newValue: string): void {
    if (!this.shadowRoot) return;
    
    const buttonId = attrName === 'today-button-class' ? 'today-button' : 'tomorrow-button';
    const baseClass = attrName === 'today-button-class' ? 'today-button' : 'tomorrow-button';
    
    const button = this.shadowRoot.getElementById(buttonId);
    if (button) {
      // Reset to base class
      button.className = `date-nav-button ${baseClass}`;
      
      // Add new classes if provided
      if (newValue) {
        newValue.split(' ').forEach(className => {
          if (className.trim()) {
            button.classList.add(className.trim());
          }
        });
      }
    }
  }

  /**
   * Initialize DOM references for the component
   */
  private initializeDomReferences(): void {
    if (!this.shadowRoot) return;
    
    // Get required DOM elements
    this.input = this.shadowRoot.getElementById("date-input") as HTMLInputElement;
    this.calendar = this.shadowRoot.getElementById("calendar") as HTMLDivElement;
    this.daysContainer = this.shadowRoot.getElementById("days-container") as HTMLDivElement;
    this.dayNamesContainer = this.shadowRoot.getElementById("day-names") as HTMLDivElement;

    if (!this.input || !this.calendar || !this.daysContainer || !this.dayNamesContainer) {
      throw new Error("Failed to initialize required elements");
    }
    
    // Set placeholder if provided in options
    if (this.options.placeholder) {
      this.input.placeholder = this.options.placeholder;
    } else {
      // Apply placeholder from attribute if set
      const placeholder = this.getAttribute('placeholder');
      if (placeholder) {
        this.input.placeholder = placeholder;
      }
    }
  }

  /**
   * Initialize the current date to today's Jalali date
   */
  private initializeCurrentDate(): void {
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    this.jalaliYear = jalaliToday[0];
    this.jalaliMonth = jalaliToday[1];
    this.jalaliDay = jalaliToday[2];
    this.selectedDate = null;
  }

  /**
   * Initialize UI components like day names and selectors
   */
  private initializeUIComponents(): void {
    // Initialize day names
    this.initializeDayNames();
    
    // Setup month and year selectors
    this.setupMonthYearSelectors();
  }

  /**
   * Helper to initialize day names
   */
  private initializeDayNames(): void {
    if (!this.dayNamesContainer) return;
    
    // Clear any existing content
    this.dayNamesContainer.innerHTML = "";
    
    // Initialize the day names (Saturday to Friday in Persian)
    const dayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
    dayNames.forEach(name => {
      const dayNameEl = document.createElement("div");
      dayNameEl.classList.add("day-name");
      dayNameEl.textContent = name;
      this.dayNamesContainer.appendChild(dayNameEl);
    });
  }

  /**
   * Setup month and year selector dropdowns
   */
  private setupMonthYearSelectors(): void {
    if (!this.shadowRoot) return;
    
    // Get elements
    const monthSelectTrigger = this.shadowRoot.getElementById("month-select-trigger") as HTMLButtonElement | null;
    const yearSelectTrigger = this.shadowRoot.getElementById("year-select-trigger") as HTMLButtonElement | null;
    const monthSelectValue = this.shadowRoot.getElementById("month-select-value") as HTMLSpanElement | null;
    const yearSelectValue = this.shadowRoot.getElementById("year-select-value") as HTMLSpanElement | null;
    const monthSelectContent = this.shadowRoot.getElementById("month-select-content") as HTMLDivElement | null;
    const yearSelectContent = this.shadowRoot.getElementById("year-select-content") as HTMLDivElement | null;
    
    // Exit early if any element is missing
    if (!monthSelectTrigger || !yearSelectTrigger || !monthSelectValue || 
        !yearSelectValue || !monthSelectContent || !yearSelectContent) {
      console.error("Failed to initialize month/year selectors");
      return;
    }
    
    // Clear existing options
    monthSelectContent.innerHTML = "";
    yearSelectContent.innerHTML = "";
    
    // Create document fragments for better performance
    const monthFragment = document.createDocumentFragment();
    const yearFragment = document.createDocumentFragment();
    
    // Setup month options
    this.persianMonths.forEach((month, index) => {
      const monthValue = index + 1;
      const monthItem = document.createElement("div");
      monthItem.classList.add("select-item");
      monthItem.textContent = month;
      monthItem.dataset.value = monthValue.toString();
      
      if (monthValue === this.jalaliMonth) {
        monthItem.classList.add("selected");
        monthSelectValue.textContent = month;
      }
      
      monthItem.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop event propagation
        this.handleMonthChange(monthValue, month);
        this.closeAllDropdowns();
      });
      
      monthFragment.appendChild(monthItem);
    });
    
    // Setup year options
    // Get current year range
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(), 
      today.getMonth() + 1, 
      today.getDate()
    );
    
    const currentJalaliYear = jalaliToday[0];
    const startYear = currentJalaliYear - 100;
    const endYear = currentJalaliYear + 50;
    
    for (let year = startYear; year <= endYear; year++) {
      const yearItem = document.createElement("div");
      yearItem.classList.add("select-item");
      yearItem.textContent = this.toPersianNum(year);
      yearItem.dataset.value = year.toString();
      
      if (year === this.jalaliYear) {
        yearItem.classList.add("selected");
        yearSelectValue.textContent = this.toPersianNum(year);
      }
      
      yearItem.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop event propagation
        this.handleYearChange(year);
        this.closeAllDropdowns();
      });
      
      yearFragment.appendChild(yearItem);
    }
    
    // Append fragments to DOM
    monthSelectContent.appendChild(monthFragment);
    yearSelectContent.appendChild(yearFragment);
    
    // Add toggle event listeners to triggers
    monthSelectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown(monthSelectContent);
    });
    
    yearSelectTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown(yearSelectContent);
    });
    
    // Prevent event bubbling from the content containers
    monthSelectContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    
    yearSelectContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Add all needed event listeners
  private addEventListeners(): void {
    if (!this.shadowRoot || !this.input || !this.calendar) return;
    
    // Input click event to toggle calendar
    this.input.addEventListener("click", this.handleInputClick);
    
    // Button event listeners
    this.setupNavigationButtons();
    
    // Prevent clicks inside the calendar from bubbling up
    this.calendar.addEventListener("click", e => e.stopPropagation());
    
    // Use event delegation for day elements instead of adding individual listeners
    this.daysContainer.addEventListener("click", this.handleDayClick.bind(this));
    
    // Close dropdowns when clicking on empty space in calendar
    this.calendar.addEventListener("click", e => {
      const target = e.target as HTMLElement;
      // If the click was not on a select-trigger element or select-content element, close all dropdowns
      if (!target.closest('.select-trigger') && !target.closest('.select-content')) {
        this.closeAllDropdowns();
      }
    });
    
    // Document click handler to close calendar when clicking outside
    this._documentClickHandler = this.handleDocumentClick.bind(this);
    document.addEventListener("click", this._documentClickHandler);
  }

  /**
   * Handle day click using event delegation
   */
  private handleDayClick(e: Event): void {
    const target = e.target as HTMLElement;
    const dayElement = target.closest('.day') as HTMLElement;
    
    // Early return for any invalid or disabled dates
    if (!dayElement || 
        dayElement.classList.contains('empty') || 
        dayElement.classList.contains('disabled') ||
        this.isDateDisabled(this.jalaliYear, this.jalaliMonth, parseInt(dayElement.textContent || '0'))) {
      return;
    }
    
    e.stopPropagation();
    
    // Get the day number from the element
    const dayText = dayElement.textContent;
    if (!dayText) return;
    
    // Convert Persian numerals to standard numbers if needed
    const day = this.fromPersianNum(dayText);
    if (isNaN(day)) return;
    
    // Handle range or single selection
    this.handleRangeSelection(day);
  }

  /**
   * Convert Persian numerals to standard numbers
   */
  private fromPersianNum(persianNum: string): number {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return parseInt(persianNum.replace(/[۰-۹]/g, d => persianDigits.indexOf(d).toString()));
  }

  /**
   * Handle input field click
   */
  private handleInputClick = (e: MouseEvent): void => {
    e.stopPropagation();
    this.toggleCalendar();
  }

  /**
   * Handle document clicks to close the calendar when clicking outside
   */
  private handleDocumentClick = (e: Event): void => {
    if (!this.calendar || !this.calendar.classList.contains("visible")) return;
    
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closeAllDropdowns();
      this.toggleCalendar();
    }
  }

  /**
   * Setup navigation buttons (prev, next, today, tomorrow)
   */
  private setupNavigationButtons(): void {
    if (!this.shadowRoot) return;
    
    const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
    const nextMonthBtn = this.shadowRoot.getElementById("next-month");
    const todayBtn = this.shadowRoot.getElementById("today-button");
    const tomorrowBtn = this.shadowRoot.getElementById("tomorrow-button");
    
    // Helper function to add click handler with stopPropagation
    const addClickHandler = (element: HTMLElement | null, handler: () => void): void => {
      if (element) {
        element.addEventListener("click", (e) => {
          e.stopPropagation();
          
          // Close any open dropdowns when navigation buttons are clicked
          this.closeAllDropdowns();
          
          handler();
        });
      }
    };
    
    addClickHandler(prevMonthBtn, () => this.changeMonth(-1));
    addClickHandler(nextMonthBtn, () => this.changeMonth(1));
    addClickHandler(todayBtn, () => this.goToToday());
    addClickHandler(tomorrowBtn, () => this.goToTomorrow());
  }

  /**
   * Sets the holiday types to be displayed
   * @param types - Comma-separated string or array of holiday types (e.g., "Iran,Afghanistan,AncientIran,International")
   */
  seteventTypes(types: string | string[]): void {
    if (typeof types === 'string') {
      // Special case for "all" which includes all types
      if (types.toLowerCase() === 'all') {
        this.includeAllTypes = true;
        this.eventTypes = [...this.eventUtils.getEventTypes()]; // Get all available types
        return;
      }
      
      try {
        // Try to parse as JSON first
        const parsed = JSON.parse(types);
        if (Array.isArray(parsed)) {
          this.eventTypes = parsed;
        } else {
          // Fallback to comma-separated values if not a JSON array
          this.eventTypes = types.split(',').map(t => t.trim()).filter(Boolean);
        }
      } catch (e) {
        // If JSON parsing fails, treat as comma-separated values
        this.eventTypes = types.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(types)) {
      this.eventTypes = [...types];
    } else {
      this.eventTypes = [...DEFAULT_HOLIDAY_TYPES];
    }
    
    // Set includeAllTypes to false by default
    this.includeAllTypes = false;
    
    // If the calendar is already rendered, update it
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Gets the current holiday types being displayed
   */
  geteventTypes(): string[] {
    return [...this.eventTypes];
  }

  /**
   * Checks if all types are being shown
   */
  isShowingAllTypes(): boolean {
    return this.includeAllTypes;
  }

  /**
   * Render the initial component HTML
   */
  private render(shadow: ShadowRoot) {
    // Get button text from attributes or use defaults
    const todayButtonText = this.getAttribute('today-button-text') || 'امروز';
    const todayButtonClass = this.getAttribute('today-button-class') || '';
    const tomorrowButtonText = this.getAttribute('tomorrow-button-text') || 'فردا';
    const tomorrowButtonClass = this.getAttribute('tomorrow-button-class') || '';
    
    // Check visibility attributes (defaults to true if not specified)
    const showMonthSelector = this.getAttribute('show-month-selector') !== 'false';
    const showYearSelector = this.getAttribute('show-year-selector') !== 'false';
    const showPrevButton = this.getAttribute('show-prev-button') !== 'false';
    const showNextButton = this.getAttribute('show-next-button') !== 'false';
    const showTodayButton = this.getAttribute('show-today-button') !== 'false';
    const showTomorrowButton = this.getAttribute('show-tomorrow-button') !== 'false';
    
    // SVG for dropdown icon
    const chevronSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
    
    shadow.innerHTML = `
      <style>${styles}</style>
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
   <div class="header">
            ${showPrevButton ? `<button id="prev-month" type="button" class="nav-button prev"></button>` : ''}
            <div class="selectors-container">
              ${showMonthSelector ? `
              <div class="custom-select month-select" id="month-select-container">
                <button type="button" class="select-trigger" id="month-select-trigger">
                  <span id="month-select-value"></span>
                  <span class="select-icon">${chevronSVG}</span>
                </button>
                <div class="select-content month-select-content" id="month-select-content"></div>
              </div>
              ` : ''}
              ${showYearSelector ? `
              <div class="custom-select year-select" id="year-select-container">
                <button type="button" class="select-trigger" id="year-select-trigger">
                  <span id="year-select-value"></span>
                  <span class="select-icon">${chevronSVG}</span>
                </button>
                <div class="select-content year-select-content" id="year-select-content"></div>
              </div>
              ` : ''}
            </div>
            ${showNextButton ? `<button id="next-month" type="button" class="nav-button next"></button>` : ''}
          </div>
          <div class="day-names" id="day-names"></div>
          <div class="days-wrapper">
            <div class="days" id="days-container"></div>
          </div>
          <div class="footer">
            ${showTodayButton ? `<button id="today-button" type="button" class="date-nav-button today-button ${todayButtonClass}">${todayButtonText}</button>` : ''}
            ${showTomorrowButton ? `<button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${tomorrowButtonClass}">${tomorrowButtonText}</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Toggle calendar visibility
   */
  toggleCalendar() {
    // First close any open dropdowns
    this.closeAllDropdowns();
    
    // Check if this calendar is already open
    if (this.calendar.classList.contains("visible")) {
      // Hide calendar
      this.calendar.classList.remove("visible", "position-bottom", "position-top");
      
      // Clear the static reference if this instance is being closed
      if (PersianDatePickerElement.openCalendarInstance === this) {
        PersianDatePickerElement.openCalendarInstance = null;
      }
    } else {
      // Close any already open calendar instance
      if (PersianDatePickerElement.openCalendarInstance && 
          PersianDatePickerElement.openCalendarInstance !== this) {
        PersianDatePickerElement.openCalendarInstance.toggleCalendar();
      }
      
      // Show calendar with position calculation
      this.positionCalendar();
      this.calendar.classList.add("visible");
      
      // Set this as the currently open instance
      PersianDatePickerElement.openCalendarInstance = this;
    }
  }

  /**
   * Calculate and set the optimal position for the calendar
   */
  private positionCalendar(): void {
    if (!this.input || !this.calendar) return;
    
    // Reset position classes
    this.calendar.classList.remove("position-bottom", "position-top");
    
    // Get measurements without causing reflow
    const inputRect = this.input.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Default to position-bottom (most common)
    this.calendar.classList.add("position-bottom");
    
    // Set display block but with visibility hidden to measure without showing
    const originalVisibility = this.calendar.style.visibility;
    const originalDisplay = this.calendar.style.display;
    this.calendar.style.visibility = 'hidden';
    this.calendar.style.display = 'block';
    
    // Now we can measure once display is set
    const calendarHeight = this.calendar.offsetHeight;
    
    // Check if there's enough space below
    const spaceBelow = windowHeight - inputRect.bottom;
    if (spaceBelow < calendarHeight) {
      // Not enough space below, check if there's more space above
      const spaceAbove = inputRect.top;
      if (spaceAbove > spaceBelow || spaceAbove >= calendarHeight) {
        // Switch to position-top
        this.calendar.classList.remove("position-bottom");
        this.calendar.classList.add("position-top");
      }
    }
    
    // Restore original styles
    this.calendar.style.visibility = originalVisibility;
    this.calendar.style.display = originalDisplay;
  }

  /**
   * Change to previous or next month
   */
  changeMonth(direction: number) {
    // Prevent multiple transitions at once
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Cache reference to calendar elements
    const daysContainer = this.daysContainer;
    
    // Add transition class based on direction
    const slideClass = direction > 0 ? 'slide-left' : 'slide-right';
    daysContainer.classList.add(slideClass);
    
    // Update month and year values
    this.jalaliMonth = Number(this.jalaliMonth) + direction;
    if (this.jalaliMonth < 1) {
      this.jalaliMonth = 12;
      this.jalaliYear--;
    } else if (this.jalaliMonth > 12) {
      this.jalaliMonth = 1;
      this.jalaliYear++;
    }
    
    // Use requestAnimationFrame for better timing and smoother animation
    requestAnimationFrame(() => {
      // Set a timeout to actually update the calendar
      setTimeout(() => {
        // Update month/year selectors
        this.updateMonthYearSelectors();
        
        // Clear days container and render new content
        daysContainer.innerHTML = "";
        this.renderCalendarContent();
        
        // Remove slide class after the animation duration
        requestAnimationFrame(() => {
          daysContainer.classList.remove(slideClass);
          
          // Set a brief timeout to ensure animation is truly done
          setTimeout(() => {
            this.isTransitioning = false;
          }, 50);
        });
      }, 200); // Shorter than the CSS animation duration for better feel
    });
  }

  /**
   * Update the month and year selector UI elements
   */
  private updateMonthYearSelectors(): void {
    if (!this.shadowRoot) return;
    
    const monthSelectValue = this.shadowRoot.getElementById("month-select-value") as HTMLSpanElement;
    const yearSelectValue = this.shadowRoot.getElementById("year-select-value") as HTMLSpanElement;
    
    if (monthSelectValue) {
      monthSelectValue.textContent = this.persianMonths[this.jalaliMonth - 1];
    }
    
    if (yearSelectValue) {
      yearSelectValue.textContent = this.toPersianNum(this.jalaliYear);
    }
    
    // Update selected items in dropdowns
    const monthItems = this.shadowRoot.querySelectorAll(".month-select-content .select-item");
    monthItems.forEach(item => {
      if (item.getAttribute("data-value") === this.jalaliMonth.toString()) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
    
    const yearItems = this.shadowRoot.querySelectorAll(".year-select-content .select-item");
    yearItems.forEach(item => {
      if (item.getAttribute("data-value") === this.jalaliYear.toString()) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  }

  /**
   * Render the calendar with current month/year
   */
  renderCalendar() {
    if (!this.shadowRoot || !this.daysContainer) return;
      
    // Update month and year selectors
    this.updateMonthYearSelectors();

    // Clear previous days
    this.daysContainer.innerHTML = "";
      
    // Render the calendar content
    this.renderCalendarContent();
    
    // Remove footer if in range mode
    if (this.isRangeMode) {
      const footer = this.shadowRoot.querySelector('.footer');
      if (footer) {
        footer.remove();
      }
    }
  }

  /**
   * Renders the calendar content for the current month
   */
  private renderCalendarContent(): void {
    if (!this.daysContainer) return;
    
    // Get first day of month and number of days
    const firstDayOfMonth = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, 1);
    const daysInMonth = PersianDate.getDaysInMonth(this.jalaliYear, this.jalaliMonth);
    
    // Get today's date for highlighting
    const today = new Date();
    const jalaliToday = PersianDate.gregorianToJalali(
      today.getFullYear(), 
      today.getMonth() + 1, 
      today.getDate()
    );
    
    // Adjust first day of month for Persian calendar (Saturday is first day of week)
    const adjustedFirstDay = (firstDayOfMonth + 1) % 7;
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < adjustedFirstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day", "empty");
      fragment.appendChild(emptyDay);
    }

    // Generate days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = this.toPersianNum(i);
      dayElement.dataset.day = i.toString();
            
      // Check if date is in range and not disabled
      const isInRange = this.isDateInRange(this.jalaliYear, this.jalaliMonth, i);
      const isDisabled = this.isDateDisabled(this.jalaliYear, this.jalaliMonth, i);
            
      if (!isInRange || isDisabled) {
        dayElement.classList.add("disabled");
        dayElement.style.opacity = "0.4";
        dayElement.style.cursor = "not-allowed";
      }
            
      // Highlight today
      if (this.jalaliYear === jalaliToday[0] && this.jalaliMonth === jalaliToday[1] && i === jalaliToday[2]) {
        dayElement.classList.add("today");
      }
            
      // Handle range selection highlighting
      if (this.isRangeMode) {
        const currentDate: DateTuple = [this.jalaliYear, this.jalaliMonth, i];
        
        // First remove any existing range classes
        dayElement.classList.remove("in-range", "range-start", "range-end");
        
        if (this.rangeStart && this.rangeEnd) {
          // Complete range - check if current date is between start and end
          const isInRange = this.compareDates(currentDate, this.rangeStart) >= 0 && 
                           this.compareDates(currentDate, this.rangeEnd) <= 0;
          
          // Handle start date
          if (this.compareDates(currentDate, this.rangeStart) === 0) {
            dayElement.classList.add("range-start");
            // If start and end are the same date, add both classes
            if (this.compareDates(currentDate, this.rangeEnd) === 0) {
              dayElement.classList.add("range-end");
            }
          }
          // Handle end date
          else if (this.compareDates(currentDate, this.rangeEnd) === 0) {
            dayElement.classList.add("range-end");
          }
          // Handle dates in between
          else if (isInRange) {
            dayElement.classList.add("in-range");
          }
        } else if (this.rangeStart && !this.rangeEnd) {
          // Selecting range - only highlight start date
          if (this.compareDates(currentDate, this.rangeStart) === 0) {
            dayElement.classList.add("range-start");
          }
        }
      } else if (this.selectedDate && 
          this.jalaliYear === this.selectedDate[0] && 
          this.jalaliMonth === this.selectedDate[1] && 
          i === this.selectedDate[2]) {
        dayElement.classList.add("selected");
      }
            
      // Add holiday information if enabled
      if (this.showEvents) {
        this.addHolidayInfo(dayElement, i);
      }

      // Setup tooltip and click handlers
      this.setupDayTooltips(dayElement);
      this.setupDayClickHandler(dayElement, i);
      
      fragment.appendChild(dayElement);
    }
    
    // Append all days at once for better performance
    this.daysContainer.appendChild(fragment);
  }

  /**
   * Compare two dates in [year, month, day] format
   * Returns -1 if date1 < date2, 0 if date1 = date2, 1 if date1 > date2
   */
  private compareDates(date1: DateTuple, date2: DateTuple): number {
    // First compare years
    if (date1[0] !== date2[0]) {
      return date1[0] - date2[0];
    }
    
    // Then compare months
    if (date1[1] !== date2[1]) {
      return date1[1] - date2[1];
    }
    
    // Finally compare days
    return date1[2] - date2[2];
  }

  /**
   * Set up tooltip handling for a day element
   */
  private setupDayTooltips(dayElement: HTMLElement): void {
    // Add hover handler for desktop tooltips
    dayElement.addEventListener("mouseenter", () => {
      const tooltip = dayElement.querySelector('.event-tooltip');
      if (tooltip) {
        tooltip.classList.add("tooltip-visible");
      }
    });
    
    dayElement.addEventListener("mouseleave", () => {
      const tooltip = dayElement.querySelector('.event-tooltip');
      if (tooltip) {
        tooltip.classList.remove("tooltip-visible");
      }
    });
  }

  /**
   * Set up click handling for a day element
   */
  private setupDayClickHandler(dayElement: HTMLElement, day: number): void {
    let lastTapTime = 0;
    
    dayElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;
        
        // Handle touch events differently
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          if (tapLength < 500 && tapLength > 0) {
            // Double tap detected - show tooltip
            const tooltip = dayElement.querySelector('.event-tooltip');
            if (tooltip) {
              const tooltips = this.shadowRoot?.querySelectorAll('.event-tooltip.tooltip-visible');
              tooltips?.forEach(t => t.classList.remove("tooltip-visible"));
              tooltip.classList.add("tooltip-visible");
            }
          } else {
            // Single tap - handle range or single selection
            this.handleRangeSelection(day);
          }
        } else {
          // For non-mobile, handle range or single selection
          this.handleRangeSelection(day);
        }
        
        lastTapTime = currentTime;
    });
  }

  /**
   * Add holiday information to a day element
   * Returns true if the day is a holiday
   */
  private addHolidayInfo(dayElement: HTMLElement, day: number): boolean {
    let isHoliday = false;
    
    // Check if it's Friday (6th day in JavaScript's getDay, where 0 is Sunday)
    const dayOfWeek = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, day);
    if (dayOfWeek === 5) { // Friday
      dayElement.classList.add("friday");
      isHoliday = true;
    }
    
    // Always try to check for holidays from events data
    // Check if it's a holiday from events.json based on holiday types
    if (this.eventUtils.isHoliday(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes)) {
      dayElement.classList.add("holiday");
      isHoliday = true;
      
      // Add tooltip with event titles
      const events = this.eventUtils.getEvents(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes);
      if (events.length > 0) {
        const tooltip = this.createEventTooltip(events);
        dayElement.appendChild(tooltip);
      }
    }
    
    return isHoliday;
  }

  /**
   * Create tooltip element for events
   */
  private createEventTooltip(events: any[]): HTMLElement {
    const tooltip = document.createElement("div");
    tooltip.classList.add("event-tooltip");
    
    events.forEach(event => {
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-item");
      
      // Add 'holiday' class for holiday events
      if (event.holiday) {
        eventItem.classList.add("holiday");
      }
      
      // Add type label with Persian text
      const typeLabel = document.createElement("span");
      typeLabel.classList.add("event-type-label");
      typeLabel.textContent = this.holidayTypeLabels[event.type] || event.type;
      eventItem.appendChild(typeLabel);
      
      // Add event title
      const titleSpan = document.createElement("span");
      titleSpan.textContent = event.title;
      eventItem.appendChild(titleSpan);
      
      tooltip.appendChild(eventItem);
    });
    
    return tooltip;
  }

  /**
   * Navigate to a specific date (today or tomorrow)
   */
  private navigateToDate(dateToUse: Date): void {
    // Convert to Jalali date
    const jalaliDate = PersianDate.gregorianToJalali(
      dateToUse.getFullYear(),
      dateToUse.getMonth() + 1,
      dateToUse.getDate()
    );
    
    const previousYear = this.jalaliYear;
    
    // Update current view to the specified date's month/year
    this.jalaliYear = jalaliDate[0];
    this.jalaliMonth = jalaliDate[1];
    
    // If the year has changed, refresh the events
    if (previousYear !== this.jalaliYear) {
      this.eventUtils.refreshEvents();
    }
    
    // Render the calendar with the new month/year
    this.renderCalendar();
    
    // Select the date
    this.selectDate(jalaliDate[2]);
  }

  /**
   * Navigate to today's date and select it
   */
  private goToToday(): void {
    this.navigateToDate(new Date());
  }

  /**
   * Navigate to tomorrow's date and select it
   */
  private goToTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.navigateToDate(tomorrow);
  }

  /**
   * Select a specific date
   */
  selectDate(day: number) {
    // Validate date before proceeding with selection
    if (this.isDateDisabled(this.jalaliYear, this.jalaliMonth, day) || 
        !this.isDateInRange(this.jalaliYear, this.jalaliMonth, day)) {
      return;
    }

    this.jalaliDay = day;
    this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay];
    
    // Format and display the date
    this.formatAndSetValue();
    
    // Get all events for the selected date
    const events = this.eventUtils.getEvents(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes);
    
    // Format the date according to the current format
    const formattedDate = this.formatDate(this.selectedDate, this.format);
    
    // Convert to Gregorian date
    const gregorianDate = PersianDate.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay);
    
    // Create ISO string from Gregorian date
    const isoString = this.jalaliToISOString(this.selectedDate);
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        jalali: this.selectedDate,
        gregorian: gregorianDate,
        isHoliday: this.eventUtils.isHoliday(this.jalaliMonth, day, this.eventTypes, this.includeAllTypes),
        events: events,
        formattedDate: formattedDate,
        isoString: isoString
      },
      bubbles: true
    }) as PersianDateChangeEvent);
    
    // Close any open dropdowns before hiding the calendar
    this.closeAllDropdowns();
    
    this.toggleCalendar();
    this.renderCalendar();
  }

  /**
   * Format the selected date and set input value
   */
  private formatAndSetValue() {
    if (this.isRangeMode) {
      if (!this.rangeStart || !this.rangeEnd) {
        this.input.value = '';
        return;
      }

      const formatRange = (date: DateTuple) => {
        const [year, month, day] = date;
        return this.formatDate(date, this.format);
      };

      this.input.value = `${formatRange(this.rangeStart)} - ${formatRange(this.rangeEnd)}`;
      return;
    }

    if (!this.selectedDate) {
      this.input.value = '';
      return;
    }

    this.input.value = this.formatDate(this.selectedDate, this.format);
  }

  /**
   * Format a date tuple according to the specified format
   */
  private formatDate(date: DateTuple, format: string): string {
    if (!date) return '';
    
    const [year, month, day] = date;
    
    // Handle special formats first
    const specialFormat = this.handleSpecialFormat(format, year, month, day);
    if (specialFormat !== null) {
      return specialFormat;
    }
    
    // Handle general format
    return this.handleGeneralFormat(format, year, month, day);
  }

  /**
   * Handle special predefined formats
   */
  private handleSpecialFormat(format: string, year: number, month: number, day: number): string | null {
    type SpecialFormat = 'YYYY/MM/DD' | 'YYYY-MM-DD' | 'YYYY/MM/DDth';
    const specialFormats: Record<SpecialFormat, () => string> = {
      'YYYY/MM/DD': () => `${this.toPersianNum(year)}/${this.toPersianNum(month.toString().padStart(2, '0'))}/${this.toPersianNum(day.toString().padStart(2, '0'))}`,
      'YYYY-MM-DD': () => `${this.toPersianNum(year)}-${this.toPersianNum(month.toString().padStart(2, '0'))}-${this.toPersianNum(day.toString().padStart(2, '0'))}`,
      'YYYY/MM/DDth': () => `${this.toPersianNum(year)}/${this.toPersianNum(month.toString().padStart(2, '0'))}/${this.toPersianNum(day)}ام`
    };

    return (specialFormats[format as SpecialFormat]?.() || null);
  }

  /**
   * Handle general format with tokens
   */
  private handleGeneralFormat(format: string, year: number, month: number, day: number): string {
    // Split format into components while preserving spaces
    const components = format.split(/(\s+)/);
    const parts: string[] = [];
    
    // Process each component in order
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      
      if (!component.trim()) {
        parts.push(component);
        continue;
      }
      
      let processedComponent = this.replaceFormatTokens(component, year, month, day);
      parts.push(processedComponent);
      
      // Add space between components if needed
      if (i < components.length - 1 && components[i + 1].trim()) {
        parts.push(' ');
      }
    }
    
    return parts.join('');
  }

  /**
   * Replace format tokens in a component
   */
  private replaceFormatTokens(component: string, year: number, month: number, day: number): string {
    let processed = component;
    
    // Replace format tokens in the correct order for RTL
    if (processed.includes('dddd')) {
      processed = processed.replace('dddd', this.getWeekdayName(year, month, day));
    }
    
    if (processed.includes('MMMM')) {
      processed = processed.replace('MMMM', this.persianMonths[month - 1]);
    } else if (processed.includes('MMM')) {
      processed = processed.replace('MMM', this.persianMonths[month - 1].substring(0, 3));
    }
    
    processed = processed.replace('YYYY', this.toPersianNum(year));
    processed = processed.replace('MM', this.toPersianNum(month.toString().padStart(2, '0')));
    processed = processed.replace('DD', this.toPersianNum(day.toString().padStart(2, '0')));
    
    // Handle ordinal suffix
    if (processed.includes('th')) {
      processed = processed.replace('th', 'ام');
    }
    
    return processed;
  }

  private isValidFormat(format: string): boolean {
    // Check if format contains at least one of the required patterns
    const hasYear = format.includes('YYYY');
    const hasMonth = format.includes('MM');
    const hasDay = format.includes('DD');

    // Check for invalid patterns
    const invalidPatterns = /[^YMD\/\-\. dth]/g;
    const hasInvalidPatterns = invalidPatterns.test(format);

    // Allow special formats
    if (format === 'YYYY/MM' || format === 'DD/MM' || format === 'DD.MM.YYYY' || format === 'YYYY/MM/DDth') {
      return true;
    }

    // For other formats, require at least two components
    const componentCount = [hasYear, hasMonth, hasDay].filter(Boolean).length;
    return componentCount >= 2 && !hasInvalidPatterns;
  }

  private getWeekdayName(year: number, month: number, day: number): string {
    const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const date = new Date(year, month - 1, day);
    const weekday = date.getDay();
    return weekdays[weekday];
  }

  /**
   * Handle month change from dropdown
   */
  private handleMonthChange(month: number, monthName: string): void {
    if (this.jalaliMonth === month) return;
    
    this.jalaliMonth = month;
    this.renderCalendar();
  }

  /**
   * Handle year change from dropdown
   */
  private handleYearChange(year: number): void {
    if (this.jalaliYear === year) return;
    
    const previousYear = this.jalaliYear;
    this.jalaliYear = year;
    
    // If the year has changed, refresh the events
    if (previousYear !== year) {
      this.eventUtils.refreshEvents();
    }
    
    this.renderCalendar();
  }

  /**
   * Sets the date value programmatically
   */
  public setValue(year: number, month: number, day: number): void {
    this.selectedDate = [year, month, day];
    this.jalaliYear = year;
    this.jalaliMonth = month;
    this.jalaliDay = day;
    this.formatAndSetValue();
    this.renderCalendar();
  }

  /**
   * Gets the currently selected date as a tuple [year, month, day]
   */
  public getValue(): DateTuple | null {
    return this.selectedDate ? [...this.selectedDate] : null;
  }

  /**
   * Checks if the currently selected date is a holiday
   */
  public isSelectedDateHoliday(): boolean {
    if (!this.selectedDate) return false;
    return this.eventUtils.isHoliday(
      this.selectedDate[1],
      this.selectedDate[2],
      this.eventTypes,
      this.includeAllTypes
    );
  }

  /**
   * Gets events for the currently selected date
   */
  public getSelectedDateEvents(): any[] {
    if (!this.selectedDate) return [];
    return [...this.eventUtils.getEvents(
      this.selectedDate[1],
      this.selectedDate[2],
      this.eventTypes,
      this.includeAllTypes
    )];
  }

  /**
   * Clears the selected date
   */
  public clear(): void {
    if (this.isRangeMode) {
      this.rangeStart = null;
      this.rangeEnd = null;
    } else {
      this.selectedDate = null;
    }
    this.input.value = '';
    this.renderCalendar();
  }

  /**
   * Initialize touch gesture support for the calendar
   */
  private initTouchGestures(): void {
    if (!this.calendar || !this.shadowRoot) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let canPreventScroll = true;
    
    const handleTouchStart = (e: TouchEvent): void => {
      if (!this.calendar?.classList.contains("visible")) return;
      
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      isScrolling = false;
      canPreventScroll = true;
    };
    
    const handleTouchMove = (e: TouchEvent): void => {
      if (!this.calendar?.classList.contains("visible")) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      
      // Determine if user is trying to scroll vertically
      if (!isScrolling) {
        isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
      }
      
      // If user is scrolling vertically, don't try to prevent default
      if (isScrolling) {
        canPreventScroll = false;
        return;
      }
      
      // Only try to prevent default for significant horizontal swipes
      if (Math.abs(deltaX) > 10 && canPreventScroll) {
        try {
          e.preventDefault();
        } catch (err) {
          // If we can't prevent default, mark it for future reference
          canPreventScroll = false;
        }
      }
    };
    
    const handleTouchEnd = (e: TouchEvent): void => {
      if (!this.calendar?.classList.contains("visible") || isScrolling) return;
      
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const touchDuration = Date.now() - touchStartTime;
      
      // Process swipe only if:
      // 1. The swipe was fast enough (under 300ms)
      // 2. The distance was significant (over 50px)
      // 3. Not currently transitioning between months
      if (touchDuration < 300 && Math.abs(deltaX) > 50 && !this.isTransitioning) {
        const isRTL = getComputedStyle(this).getPropertyValue('--jdp-direction').trim() === 'rtl';
        
        if ((isRTL && deltaX < 0) || (!isRTL && deltaX > 0)) {
          this.changeMonth(1); // Next month
        } else if ((isRTL && deltaX > 0) || (!isRTL && deltaX < 0)) {
          this.changeMonth(-1); // Previous month
        }
      }
    };
    
    const handleTouchCancel = (): void => {
      isScrolling = false;
      canPreventScroll = true;
    };
    
    // Add event listeners with correct passive options
    this.calendar.addEventListener('touchstart', handleTouchStart, { passive: true });
    this.calendar.addEventListener('touchmove', handleTouchMove, { passive: false });
    this.calendar.addEventListener('touchend', handleTouchEnd, { passive: true });
    this.calendar.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    
    // Update CSS to improve touch handling
    this.calendar.style.touchAction = 'pan-y pinch-zoom';
    
    // Prevent touch event propagation on navigation buttons
    const prevMonthBtn = this.shadowRoot.getElementById("prev-month");
    const nextMonthBtn = this.shadowRoot.getElementById("next-month");
    
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('touchstart', (e: Event) => e.stopPropagation(), { passive: true });
    }
    
    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('touchstart', (e: Event) => e.stopPropagation(), { passive: true });
    }
  }

  /**
   * Helper method to close all dropdowns
   */
  private closeAllDropdowns(): void {
    if (!this.shadowRoot) return;
    
    const dropdowns = this.shadowRoot.querySelectorAll(".select-content");
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("open");
    });
  }

  /**
   * Helper method to toggle dropdown visibility
   */
  private toggleDropdown(dropdown: HTMLElement | null): void {
    if (!dropdown) return;
    
    // Check if this dropdown is already open
    const isCurrentlyOpen = dropdown.classList.contains("open");
    
    // Close all dropdowns
    this.closeAllDropdowns();
    
    // If the dropdown wasn't open, open it now
    // This creates a toggle effect
    if (!isCurrentlyOpen) {
      // Open the dropdown
      dropdown.classList.add("open");
      
      // Find the selected item in this dropdown and scroll to it
      // Use requestAnimationFrame for better timing with rendering
      requestAnimationFrame(() => {
        const selectedItem = dropdown.querySelector(".select-item.selected") as HTMLElement;
        if (selectedItem) {
          // Calculate the optimal scroll position - center the selected item
          const scrollTop = selectedItem.offsetTop - 
            (dropdown.clientHeight / 2) + (selectedItem.clientHeight / 2);
          
          // Apply the scroll position
          dropdown.scrollTop = Math.max(0, scrollTop);
        }
      });
    }
  }

  /**
   * Programmatically open the calendar
   * Will close any other open calendar instances
   */
  public open(): void {
    if (!this.calendar.classList.contains("visible")) {
      this.toggleCalendar();
    }
  }

  /**
   * Programmatically close the calendar
   */
  public close(): void {
    if (this.calendar.classList.contains("visible")) {
      this.toggleCalendar();
    }
  }

  /**
   * Set minimum date
   */
  public setMinDate(year: number, month: number, day: number): void {
    this.minDate = [year, month, day];
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Set maximum date
   */
  public setMaxDate(year: number, month: number, day: number): void {
    this.maxDate = [year, month, day];
    if (this.calendar) {
      this.renderCalendar();
    }
  }

  /**
   * Check if a date is within the allowed range
   */
  private isDateInRange(year: number, month: number, day: number): boolean {
    if (!this.minDate && !this.maxDate) return true;
    
    const date: DateTuple = [year, month, day];
    
    if (this.minDate && this.compareDates(date, this.minDate) < 0) return false;
    if (this.maxDate && this.compareDates(date, this.maxDate) > 0) return false;
    
    return true;
  }

  /**
   * Check if a date is disabled
   */
  private isDateDisabled(year: number, month: number, day: number): boolean {
    if (!this.disabledDatesFn) return false;
    return this.disabledDatesFn(year, month, day);
  }

  /**
   * Convert a Jalali date tuple to an ISO string
   */
  private jalaliToISOString(date: DateTuple): string {
    if (!date) return '';
    
    const gregorianDate = PersianDate.jalaliToGregorian(date[0], date[1], date[2]);
    return new Date(
      gregorianDate[0], 
      gregorianDate[1] - 1, // Months are 0-indexed in JavaScript Date
      gregorianDate[2]
    ).toISOString();
  }

  private handleRangeSelection(day: number): void {
    if (!this.isRangeMode) {
      // For single date selection, check if date is valid
      if (this.isDateDisabled(this.jalaliYear, this.jalaliMonth, day)) {
        return;
      }
      this.selectDate(day);
      return;
    }

    const currentDate: DateTuple = [this.jalaliYear, this.jalaliMonth, day];

    // Check if date is within min/max range and not disabled
    if (!this.isDateInRange(this.jalaliYear, this.jalaliMonth, day) || 
        this.isDateDisabled(this.jalaliYear, this.jalaliMonth, day)) {
      // Don't allow selection of invalid dates
      return;
    }

    if (!this.isSelectingRange) {
      // Start new range
      this.rangeStart = currentDate;
      this.rangeEnd = null;
      this.isSelectingRange = true;
    } else {
      // Complete range
      this.rangeEnd = currentDate;
      this.isSelectingRange = false;

      // Ensure range is in correct order (start before end)
      if (this.rangeStart && this.rangeEnd) {
        const comparison = this.compareDates(this.rangeStart, this.rangeEnd);
        if (comparison > 0) {
          // Swap start and end if they're in wrong order
          [this.rangeStart, this.rangeEnd] = [this.rangeEnd, this.rangeStart];
        }
      }

      // Format and display the range
      this.formatAndSetValue();
      
      // Create ISO strings for start and end dates
      const startISOString = this.rangeStart ? this.jalaliToISOString(this.rangeStart) : null;
      const endISOString = this.rangeEnd ? this.jalaliToISOString(this.rangeEnd) : null;
      
      // Convert to Gregorian dates
      const startGregorian = this.rangeStart ? PersianDate.jalaliToGregorian(this.rangeStart[0], this.rangeStart[1], this.rangeStart[2]) : null;
      const endGregorian = this.rangeEnd ? PersianDate.jalaliToGregorian(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) : null;
      
      // Dispatch change event with range data
      this.dispatchEvent(new CustomEvent("change", {
        detail: {
          range: {
            start: this.rangeStart,
            end: this.rangeEnd,
            startISOString: startISOString,
            endISOString: endISOString,
            startGregorian: startGregorian,
            endGregorian: endGregorian
          },
          isRange: true
        },
        bubbles: true
      }));
      
      // Close calendar
      this.closeAllDropdowns();
      this.toggleCalendar();
    }

    // Force a re-render of the calendar to update the range highlighting
    this.renderCalendar();
  }

  // Add new methods for range selection
  public setRange(start: DateTuple, end: DateTuple): void {
    this.rangeStart = start;
    this.rangeEnd = end;
    this.isRangeMode = true;
    
    // Navigate to the start date's month and year
    this.jalaliYear = start[0];
    this.jalaliMonth = start[1];
    
    // Update the month and year selectors
    this.updateMonthYearSelectors();
    
    // Format and display the range
    this.formatAndSetValue();
    
    // Force a re-render of the calendar
    this.renderCalendar();
  }

  public getRange(): { start: DateTuple | null; end: DateTuple | null } {
    return {
      start: this.rangeStart ? [...this.rangeStart] : null,
      end: this.rangeEnd ? [...this.rangeEnd] : null
    };
  }

  /**
   * Set a function that determines if a date should be disabled
   * @param fn Function that takes year, month, day and returns boolean (true if date should be disabled)
   */
  public setDisabledDatesFn(fn: (year: number, month: number, day: number) => boolean): void {
    this.disabledDatesFn = fn;
    this.renderCalendar();
  }

  /**
   * Handle touch start event for swipe detection
   */
  private handleTouchStart(e: TouchEvent): void {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    this._touchStartX = touch.clientX;
    this._touchStartY = touch.clientY;
    this._isDragging = true;
    this._isSwiping = false;
  }

  /**
   * Handle touch move event for swipe detection
   */
  private handleTouchMove(e: TouchEvent): void {
    if (!this._isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - this._touchStartX;
    const deltaY = touch.clientY - this._touchStartY;
    
    // If we haven't determined if this is a swipe yet
    if (!this._isSwiping) {
      // If horizontal movement is greater than vertical and exceeds threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        this._isSwiping = true;
        e.preventDefault(); // Prevent default only if we're swiping
      }
    } else {
      // If we're swiping, prevent default to stop page scrolling
      e.preventDefault();
    }
  }

  /**
   * Handle touch end event for swipe detection
   */
  private handleTouchEnd(e: TouchEvent): void {
    if (!this._isDragging) return;
    
    if (this._isSwiping) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - this._touchStartX;
      
      // If swipe distance is significant enough
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.changeMonth(-1); // Swipe right -> previous month
        } else {
          this.changeMonth(1); // Swipe left -> next month
        }
      }
    }
    
    // Reset touch state
    this._isDragging = false;
    this._isSwiping = false;
  }

  /**
   * Handle touch cancel event
   */
  private handleTouchCancel(): void {
    // Reset touch state
    this._isDragging = false;
    this._isSwiping = false;
  }

  // Touch event properties
  private _touchStartX: number = 0;
  private _touchStartY: number = 0;
  private _isDragging: boolean = false;
  private _isSwiping: boolean = false;
}

// Register the custom element with the browser
// Note: This is intentionally commented out because registration is handled in index.ts
// Uncomment if you need standalone registration without index.ts
// if (typeof window !== 'undefined' && !customElements.get('persian-datepicker-element')) {
//   customElements.define('persian-datepicker-element', PersianDatePickerElement);
// }

// Export the class for direct usage
