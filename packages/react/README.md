# react-persian-datepicker-element

React integration for the Persian Date Picker web component.

## Installation

```bash
npm install react-persian-datepicker-element persian-datepicker-element
# or
yarn add react-persian-datepicker-element persian-datepicker-element
# or
pnpm add react-persian-datepicker-element persian-datepicker-element
```

## Usage

```tsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const handleChange = (event) => {
    console.log('Selected date:', event.detail);
  };

  return (
      <PersianDatepicker
        placeholder="انتخاب تاریخ"
        format="YYYY/MM/DD"
      showHolidays
      rtl
      onChange={handleChange}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \| [number, number, number] | - | The selected date value |
| placeholder | string | - | Placeholder text |
| format | string | "YYYY/MM/DD" | Date format string |
| showHolidays | boolean | false | Show holiday indicators |
| rtl | boolean | false | Right-to-left layout |
| minDate | [number, number, number] | - | Minimum selectable date |
| maxDate | [number, number, number] | - | Maximum selectable date |
| disabledDates | string | - | Disabled dates expression |
| disabled | boolean | false | Disable the datepicker |
| darkMode | boolean | false | Enable dark mode |
| className | string | - | Additional CSS class |
| style | CSSProperties | - | Inline styles |

## Ref Methods

The component supports ref forwarding with the following methods:

```tsx
const ref = useRef<PersianDatepickerMethods>(null);

// Set a date
ref.current?.setValue(1401, 7, 1);

// Get current date
const date = ref.current?.getValue();

// Open the datepicker
ref.current?.open();

// Close the datepicker
ref.current?.close();

// Get the underlying element
const element = ref.current?.getElement();
```

## TypeScript Support

The package includes full TypeScript support:

```tsx
import { PersianDatepicker, PersianDatepickerProps, PersianDatepickerMethods } from '@persian-datepicker/react';

// Props type
const props: PersianDatepickerProps = {
  placeholder: "انتخاب تاریخ",
  format: "YYYY/MM/DD",
  showHolidays: true,
  rtl: true
};

// Ref type
const ref = useRef<PersianDatepickerMethods>(null);
```

## Styling

You can style the component using CSS variables:

```css
persian-datepicker-element {
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-border: #e2e8f0;
  --jdp-border-radius: 0.5rem;
  --jdp-font-family: system-ui;
  --jdp-font-size: 14px;
  --jdp-nav-button-size: 38px;
  --jdp-day-cell-size: 36px;
}
```

## Examples

### Basic Usage

```tsx
import { PersianDatepicker } from '@persian-datepicker/react';

function BasicExample() {
  return (
      <PersianDatepicker 
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      />
  );
}
```

### With Event Handling

```tsx
import { PersianDatepicker } from '@persian-datepicker/react';

function EventExample() {
  const handleChange = (event) => {
    const { jalali, gregorian, isHoliday, events } = event.detail;
    console.log('Jalali:', jalali);
    console.log('Gregorian:', gregorian);
    console.log('Is Holiday:', isHoliday);
    console.log('Events:', events);
  };

  return (
      <PersianDatepicker
      onChange={handleChange}
      />
  );
}
```

### With Date Limits

```tsx
import { PersianDatepicker } from '@persian-datepicker/react';

function DateLimitsExample() {
  return (
    <PersianDatepicker
      minDate={[1400, 1, 1]}
      maxDate={[1402, 12, 29]}
      disabledDates="isWeekend"
    />
  );
}
```

### With Custom Styling

```tsx
import { PersianDatepicker } from '@persian-datepicker/react';

function StyledExample() {
  return (
<PersianDatepicker
      className="custom-datepicker"
      style={{ width: '300px' }}
    />
  );
}
```

## License

MIT
