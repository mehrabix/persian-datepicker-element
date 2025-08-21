/**
 * Persian Datepicker Component Styles
 * 
 * This file contains all the CSS styles for the Persian Datepicker component.
 * Styles are defined as a template string that can be injected into the shadow DOM.
 */

export const persianDatepickerStyles = `:host {
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
}`; 