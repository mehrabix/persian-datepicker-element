# Jalali Date Picker

A modern and customizable Jalali (Persian/Shamsi) date picker web component with shadcn-like styling.

## Features

- Clean, modern UI similar to shadcn components
- Accurate Jalali (Shamsi) calendar with proper month lengths and leap years
- Full RTL support
- Highly customizable styling with CSS variables
- Lightweight and dependency-free
- Works with any framework or vanilla JavaScript
- TypeScript support

## Installation

```bash
npm install jalali-date-picker
```

## Usage

### Basic Usage

```html
<!-- Include the script -->
<script src="node_modules/jalali-date-picker/dist/jalali-date-picker.min.js"></script>

<!-- Use the component -->
<jalali-date-picker></jalali-date-picker>
```

### With ES Modules

```javascript
// Import the component
import 'jalali-date-picker';

// Use it in your HTML
// <jalali-date-picker></jalali-date-picker>
```

### With TypeScript

```typescript
import { JalaliDatePicker, JalaliDate } from 'jalali-date-picker';

// Access to the class for type checking or programmatic usage
const datePicker = document.querySelector('jalali-date-picker') as JalaliDatePicker;

// Programmatically set a date (year, month, day)
datePicker.setValue(1402, 12, 25);

// Get the selected date
const selectedDate = datePicker.getValue(); // Returns [year, month, day] or null
```

## Attributes

You can customize the date picker using the following attributes:

```html
<jalali-date-picker
  placeholder="انتخاب تاریخ تولد"
  format="YYYY/MM/DD"
  primary-color="#0891b2"
  primary-hover="#0e7490"
  background-color="#ffffff"
  foreground-color="#1e293b"
  border-color="#e2e8f0"
  border-radius="0.5rem"
  font-family="Vazir, sans-serif"
  rtl="true"
></jalali-date-picker>
```

| Attribute          | Type    | Default       | Description                              |
|--------------------|---------|---------------|------------------------------------------|
| `placeholder`      | String  | "انتخاب تاریخ"  | Input placeholder text                    |
| `format`           | String  | "YYYY/MM/DD"  | Date format                              |
| `primary-color`    | String  | "#0891b2"     | Primary color for selections             |
| `primary-hover`    | String  | "#0e7490"     | Hover color for interactive elements     |
| `background-color` | String  | "#ffffff"     | Background color of the component        |
| `foreground-color` | String  | "#1e293b"     | Text color of the component              |
| `border-color`     | String  | "#e2e8f0"     | Border color for elements                |
| `border-radius`    | String  | "0.5rem"      | Border radius for rounded corners        |
| `font-family`      | String  | System fonts  | Font family for text                     |
| `rtl`              | Boolean | true          | Right-to-left support                    |

## Events

The component dispatches a `change` event when a date is selected:

```javascript
document.querySelector('jalali-date-picker').addEventListener('change', (event) => {
  const { jalali, gregorian } = event.detail;
  console.log('Selected Jalali date:', jalali); // [year, month, day]
  console.log('Equivalent Gregorian date:', gregorian); // [year, month, day]
});
```

## JalaliDate Utility

The package also exports a `JalaliDate` utility for converting between Jalali and Gregorian dates:

```javascript
import { JalaliDate } from 'jalali-date-picker';

// Convert Gregorian to Jalali
const jalaliDate = JalaliDate.gregorianToJalali(2023, 3, 21); // [1402, 1, 1]

// Convert Jalali to Gregorian
const gregorianDate = JalaliDate.jalaliToGregorian(1402, 1, 1); // [2023, 3, 21]
```

## Advanced Styling

The component uses CSS variables for comprehensive styling. You can override any of these variables to customize the appearance:

```css
jalali-date-picker {
  /* Color scheme */
  --jdp-primary: #3b82f6;
  --jdp-primary-hover: #2563eb;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Typography */
  --jdp-font-family: 'Vazir', sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
}
```

### All Available CSS Variables

| Category | Variable | Description |
|----------|----------|-------------|
| **Color scheme** | `--jdp-primary` | Primary color for selected items |
| | `--jdp-primary-hover` | Hover state color for primary elements |
| | `--jdp-primary-foreground` | Text color on primary background |
| **Neutral colors** | `--jdp-background` | Background color |
| | `--jdp-foreground` | Text color |
| | `--jdp-muted` | Muted background color |
| | `--jdp-muted-foreground` | Muted text color |
| | `--jdp-border` | Border color |
| | `--jdp-ring` | Focus ring color |
| **Typography** | `--jdp-font-family` | Font family |
| | `--jdp-font-size` | Base font size |
| | `--jdp-line-height` | Line height |
| | `--jdp-font-weight` | Normal font weight |
| | `--jdp-font-weight-medium` | Medium font weight |
| | `--jdp-day-name-font-size` | Day name font size |
| | `--jdp-day-name-font-weight` | Day name font weight |
| | `--jdp-day-font-size` | Day cell font size |
| | `--jdp-day-font-weight` | Day cell font weight |
| | `--jdp-month-year-font-size` | Month/year header font size |
| | `--jdp-month-year-font-weight` | Month/year header font weight |
| **Input field** | `--jdp-input-padding-x` | Horizontal padding |
| | `--jdp-input-padding-y` | Vertical padding |
| | `--jdp-input-border-width` | Border width |
| | `--jdp-input-border-color` | Border color |
| | `--jdp-input-border-radius` | Border radius |
| | `--jdp-input-focus-ring-width` | Focus ring width |
| | `--jdp-input-focus-ring-color` | Focus ring color |
| **Calendar popup** | `--jdp-calendar-width` | Calendar popup width |
| | `--jdp-calendar-padding` | Calendar padding |
| | `--jdp-calendar-border-width` | Calendar border width |
| | `--jdp-calendar-border-color` | Calendar border color |
| | `--jdp-calendar-border-radius` | Calendar border radius |
| | `--jdp-calendar-shadow` | Calendar shadow |
| | `--jdp-calendar-z-index` | Calendar z-index |
| **Navigation buttons** | `--jdp-nav-button-size` | Size of nav buttons |
| | `--jdp-nav-button-bg` | Button background |
| | `--jdp-nav-button-bg-hover` | Button hover background |
| | `--jdp-nav-arrow-size` | Arrow size |
| | `--jdp-nav-arrow-thickness` | Arrow thickness |
| | `--jdp-nav-arrow-color` | Arrow color |
| **Day grid** | `--jdp-day-cell-size` | Size of day cells |
| | `--jdp-day-cell-margin` | Margin between day cells |
| | `--jdp-day-cell-border-radius` | Border radius of day cells |
| **States** | `--jdp-day-hover-bg` | Day hover background |
| | `--jdp-day-selected-bg` | Selected day background |
| | `--jdp-day-selected-color` | Selected day text color |
| | `--jdp-day-today-border-color` | Today indicator border color |
| | `--jdp-day-today-border-width` | Today indicator border width |
| | `--jdp-day-disabled-opacity` | Opacity for disabled days |
| **Animations** | `--jdp-transition-duration` | Duration of transitions |
| | `--jdp-fade-from-y` | Vertical offset for fade animations |

## Example: Custom Theme

Here's an example of a custom theme with a dark mode appearance:

```css
/* Dark Mode Theme */
jalali-date-picker.dark-theme {
  --jdp-primary: #4f46e5;
  --jdp-primary-hover: #6366f1;
  --jdp-primary-foreground: #ffffff;
  
  --jdp-background: #1e1e2f;
  --jdp-foreground: #e2e8f0;
  --jdp-muted: #334155;
  --jdp-muted-foreground: #94a3b8;
  --jdp-border: #475569;
  --jdp-ring: #4f46e5;
  
  --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
  --jdp-day-hover-bg: #334155;
  
  --jdp-font-family: 'Samim', 'Vazir', sans-serif;
}
```

## License

MIT 