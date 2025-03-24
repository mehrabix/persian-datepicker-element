# React Persian Datepicker Element

A React wrapper for the Persian Datepicker Web Component, providing a beautiful and fully customizable Jalali (Shamsi) date picker for React applications.

![Persian Datepicker Screenshot](https://raw.githubusercontent.com/mehrabhossain1/persian-datepicker-element/main/docs/assets/react-datepicker-screenshot.png)

## Features

- 🌙 Jalali (Solar Hijri) calendar system
- 🎨 Highly customizable with CSS variables
- 🌈 Multiple themes with light/dark mode support
- 🔄 Two-way binding for controlled components
- 📅 Show and customize holidays and events
- 📱 Responsive and mobile-friendly
- 🌐 RTL support by default
- 🛠️ Imperative API via React refs

## Installation

```bash
# Using npm
npm install react-persian-datepicker-element persian-datepicker-element

# Using Yarn
yarn add react-persian-datepicker-element persian-datepicker-element

# Using pnpm
pnpm add react-persian-datepicker-element persian-datepicker-element
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const handleDateChange = (event) => {
    console.log('Selected date (Jalali):', event.jalali); // [year, month, day]
    console.log('Gregorian date:', event.gregorian);
    console.log('Is holiday:', event.isHoliday);
    console.log('Events:', event.events);
  };

  return (
    <div>
      <h1>Persian Datepicker Example</h1>
      <PersianDatepicker
        placeholder="انتخاب تاریخ"
        format="YYYY/MM/DD"
        showHolidays={true}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default App;
```

## Customizing with Themes

You can customize the appearance using CSS variables:

```tsx
import React from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  // Define your theme using CSS variables
  const blueTheme = {
    '--jdp-primary': '#3b82f6',
    '--jdp-primary-hover': '#2563eb',
    '--jdp-ring': '#60a5fa',
    '--jdp-border-radius': '0.5rem'
  };

  return (
    <div>
      <h1>Customized Persian Datepicker</h1>
      <PersianDatepicker 
        placeholder="انتخاب تاریخ با تم آبی"
        cssVariables={blueTheme}
      />
    </div>
  );
}
```

## Dark Mode Support

```tsx
import React, { useState } from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Light theme
  const lightTheme = {
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490'
  };
  
  // Dark theme
  const darkTheme = {
    // Base colors
    '--jdp-background': '#1e1e2f',
    '--jdp-foreground': '#e2e8f0',
    '--jdp-muted': '#334155',
    '--jdp-muted-foreground': '#94a3b8',
    '--jdp-border': '#475569',
    '--jdp-input-border-color': '#475569',
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490',
    
    // Input field
    '--jdp-input-bg': '#1e1e2f',
    '--jdp-input-text': '#e2e8f0',
    
    // Calendar body
    '--jdp-calendar-bg': '#0f172a',
    '--jdp-day-text': '#e2e8f0'
  };

  return (
    <div>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      
      <PersianDatepicker
        placeholder="تاریخ را انتخاب کنید"
        cssVariables={isDarkMode ? darkTheme : lightTheme}
      />
    </div>
  );
}
```

## Using with Ref (Imperative API)

```tsx
import React, { useRef } from 'react';
import { PersianDatepicker, PersianDatepickerMethods } from 'react-persian-datepicker-element';

function App() {
  const datepickerRef = useRef<PersianDatepickerMethods>(null);

  const handleGetValue = () => {
    // Get current value
    const value = datepickerRef.current?.getValue();
    console.log('Current value:', value);
  };

  const handleSetValue = () => {
    // Set a value programmatically (e.g., set to 15 Dey 1402)
    datepickerRef.current?.setValue(1402, 10, 15);
  };

  const handleOpenCalendar = () => {
    datepickerRef.current?.open();
  };

  const handleCloseCalendar = () => {
    datepickerRef.current?.close();
  };

  return (
    <div>
      <PersianDatepicker ref={datepickerRef} placeholder="از دکمه‌ها استفاده کنید" />
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleGetValue}>Get Value</button>
        <button onClick={handleSetValue}>Set to 15 Dey 1402</button>
        <button onClick={handleOpenCalendar}>Open Calendar</button>
        <button onClick={handleCloseCalendar}>Close Calendar</button>
      </div>
    </div>
  );
}
```

## Holiday Types

You can specify which types of holidays to display:

```tsx
<PersianDatepicker
  holidayTypes="Iran,Religious"
  placeholder="تعطیلات ایران و مذهبی"
/>

<PersianDatepicker
  holidayTypes="Afghanistan"
  placeholder="تعطیلات افغانستان"
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `placeholder` | string | Input placeholder text |
| `format` | string | Date format (e.g., "YYYY/MM/DD") |
| `showHolidays` | boolean | Whether to show holiday indicators |
| `holidayTypes` | string | Types of holidays to show (comma-separated: "Iran", "Religious", "Afghanistan") |
| `rtl` | boolean | Right-to-left layout |
| `value` | [number, number, number] | Initial date value as [year, month, day] |
| `onChange` | function | Callback when date changes |
| `disabled` | boolean | Disable the datepicker |
| `min` | [number, number, number] | Minimum selectable date as [year, month, day] |
| `max` | [number, number, number] | Maximum selectable date as [year, month, day] |
| `className` | string | Custom class for the container |
| `style` | object | Custom styles for the container |
| `id` | string | HTML id attribute |

### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `primaryColor` | string | Primary color for selected dates |
| `primaryHover` | string | Hover color for dates |
| `backgroundColor` | string | Background color |
| `foregroundColor` | string | Text color |
| `borderColor` | string | Border color |
| `borderRadius` | string | Border radius |
| `fontFamily` | string | Font family |
| `holidayColor` | string | Holiday text color |
| `holidayBg` | string | Holiday background color |

## CSS Variables for Styling

All CSS variables use the `--jdp-` prefix (Jalali DatePicker):

| CSS Variable | Description |
|--------------|-------------|
| `--jdp-primary` | Primary color for selected dates and focus states |
| `--jdp-primary-hover` | Color for hover states |
| `--jdp-primary-foreground` | Text color on primary background |
| `--jdp-background` | Main background color |
| `--jdp-foreground` | Main text color |
| `--jdp-muted` | Muted background color for alternate elements |
| `--jdp-muted-foreground` | Text color for muted elements |
| `--jdp-border` | Border color |
| `--jdp-input-border-color` | Input field border color |
| `--jdp-input-bg` | Input field background color |
| `--jdp-input-text` | Input field text color |
| `--jdp-input-placeholder` | Input placeholder text color |
| `--jdp-calendar-bg` | Calendar dropdown background color |
| `--jdp-day-hover-bg` | Background color when hovering over a day |
| `--jdp-holiday-color` | Holiday text color |
| `--jdp-holiday-bg` | Holiday background color |
| `--jdp-font-size` | Base font size |
| `--jdp-font-family` | Font family |
| `--jdp-border-radius` | Base border radius |
| `--jdp-input-border-radius` | Input field border radius |
| `--jdp-calendar-border-radius` | Calendar dropdown border radius |
| `--jdp-day-cell-border-radius` | Day cell border radius |

## Ref Methods

| Method | Description |
|--------|-------------|
| `getValue()` | Get current date value as [year, month, day] |
| `setValue(year, month, day)` | Set date value programmatically |
| `open()` | Open the datepicker dropdown |
| `close()` | Close the datepicker dropdown |
| `getElement()` | Get the underlying web component element |

## TypeScript Support

This library includes TypeScript definitions for all features:

```tsx
import { 
  PersianDatepicker, 
  PersianDatepickerMethods, 
  PersianDateChangeEvent,
  DateTuple
} from 'react-persian-datepicker-element';

// Type for the onChange event
const handleChange = (event: PersianDateChangeEvent) => {
  const jalaliDate: DateTuple = event.jalali;
  const gregorianDate: DateTuple = event.gregorian;
};
```

## Browser Support

This component uses Web Components and is compatible with all modern browsers. 

## License

MIT
