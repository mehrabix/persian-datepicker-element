# Persian UI Components | کامپوننت‌های UI فارسی

A collection of modern UI components for Persian (Shamsi) calendar and time selection with shadcn-like styling.

## Components

This monorepo contains the following components:

- [@shadnext/persian-datepicker-element](./packages/persian-datepicker-element) - Persian Date Picker
- [@shadnext/persian-timepicker-element](./packages/persian-timepicker-element) - Persian Time Picker

## Features | ویژگی‌ها

- Clean, modern UI similar to shadcn components
- Accurate Persian (Shamsi) calendar with proper month lengths and leap years
- Full RTL support
- Highly customizable styling with CSS variables
- Lightweight and dependency-free
- Works with any framework or vanilla JavaScript
- TypeScript support

<div dir="rtl">

- رابط کاربری تمیز و مدرن مشابه کامپوننت‌های shadcn
- تقویم شمسی دقیق با طول ماه‌های صحیح و سال‌های کبیسه
- پشتیبانی کامل از راست به چپ (RTL)
- قابلیت شخصی‌سازی بالا با متغیرهای CSS
- سبک و بدون وابستگی
- سازگار با هر فریم‌ورک یا جاوااسکریپت خالص
- پشتیبانی از TypeScript

</div>

## Installation | نصب

### Date Picker

```bash
npm install @shadnext/persian-datepicker-element
```

### Time Picker

```bash
npm install @shadnext/persian-timepicker-element
```

<div dir="rtl">

### نصب انتخابگر تاریخ:
```bash
npm install @shadnext/persian-datepicker-element
```

### نصب انتخابگر زمان:
```bash
npm install @shadnext/persian-timepicker-element
```
</div>

## Usage

### Date Picker

```html
<!-- Include the script -->
<script src="node_modules/@shadnext/persian-datepicker-element/dist/persian-datepicker-element.min.js"></script>

<!-- Use the component -->
<persian-datepicker-element></persian-datepicker-element>
```

### Time Picker

```html
<!-- Include the script -->
<script src="node_modules/@shadnext/persian-timepicker-element/dist/persian-timepicker-element.min.js"></script>

<!-- Use the component -->
<persian-timepicker-element></persian-timepicker-element>
```

### With ES Modules

```javascript
// Import the Date Picker component
import '@shadnext/persian-datepicker-element';

// Import the Time Picker component
import '@shadnext/persian-timepicker-element';
```

### With TypeScript

```typescript
import { PersianDatePickerElement, PersianDate } from '@shadnext/persian-datepicker-element';
import { PersianTimePickerElement } from '@shadnext/persian-timepicker-element';

// Access to the class for type checking or programmatic usage
const datePicker = document.querySelector('persian-datepicker-element') as PersianDatePickerElement;
const timePicker = document.querySelector('persian-timepicker-element') as PersianTimePickerElement;

// Programmatically set a date (year, month, day)
datePicker.setValue(1402, 12, 25);

// Get the selected date
const selectedDate = datePicker.getValue();

// Set time
timePicker.setValue(14, 30, 0);
```

## React Integration

You can use these components with React in several ways:

### Option 1: Use as Web Components

```jsx
import React, { useRef, useEffect } from 'react';
import '@shadnext/persian-datepicker-element';

function MyDatePicker(props) {
  const pickerRef = useRef(null);
  
  useEffect(() => {
    if (pickerRef.current && props.onChange) {
      pickerRef.current.addEventListener('value-changed', (e) => {
        props.onChange(e.detail);
      });
      
      return () => {
        pickerRef.current.removeEventListener('value-changed', props.onChange);
      };
    }
  }, [props.onChange]);
  
  return <persian-datepicker-element ref={pickerRef} />;
}
```

### Option 2: Copy Source Code for Full Customization

For complete control, you can copy the source code and convert it to a React component:

```bash
# Use our conversion script
node scripts/convert-to-react.js

# This will create a react-components directory with the extracted code
```

See the [React Integration Guide](./docs/REACT-INTEGRATION.md) for detailed instructions and examples.

### CLI Tool for React Integration

Use our CLI tool to easily add Persian UI components to your React project:

```bash
# Use npx to run without installing
npx @shadnext/cli react add persian-datepicker-element

# Or install globally
npm install -g @shadnext/cli
shadnext react add persian-datepicker-element
```

Options:
- `--typescript` - Generate TypeScript files
- `--styled` - Use styled-components instead of CSS
- `--directory` - Specify a custom directory for the component (e.g. `--directory src/components/DatePicker`)

The CLI will generate optimized React components that wrap the web components with a React-friendly API.

### CLI Tool for Angular Integration

Use our CLI tool to easily add Persian UI components to your Angular project:

```bash
# Use npx to run without installing
npx @shadnext/cli angular add persian-datepicker-element

# Or install globally
npm install -g @shadnext/cli
shadnext angular add persian-datepicker-element
```

Options:
- `--standalone` - Generate a standalone component (Angular 14+)
- `--module` - Specify an Angular module to add the component to
- `--directory` - Specify a custom directory for the component (e.g. `--directory src/app/components/date-picker`)

The CLI will generate optimized Angular components that wrap the web components with an Angular-friendly API, including proper bindings, template files, and styles.

## License | مجوز

MIT 