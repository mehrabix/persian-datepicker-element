# Persian Date Picker Element

A modern, customizable Persian (Jalali) date picker web component with framework integrations.

## Features

- 🎨 Fully customizable with CSS variables
- 🌙 Dark mode support
- 📱 Mobile-friendly
- 🎯 Framework integrations (React, Vue, Angular)
- 📅 Holiday support with multiple event types (Iran, Afghanistan, Ancient Iran, International)
- 🔄 RTL support
- 🎨 Multiple theme options
- 📦 Zero dependencies
- 🎯 TypeScript support

## Installation

### Web Component

```bash
npm install persian-datepicker-element
# or
yarn add persian-datepicker-element
# or
pnpm add persian-datepicker-element
```

### Framework Integrations

#### React
```bash
npm install react-persian-datepicker-element persian-datepicker-element
# or
yarn add react-persian-datepicker-element persian-datepicker-element
# or
pnpm add react-persian-datepicker-element persian-datepicker-element
```

#### Vue
```bash
npm install vue-persian-datepicker-element persian-datepicker-element
# or
yarn add vue-persian-datepicker-element persian-datepicker-element
# or
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

#### Angular
```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# or
yarn add ngx-persian-datepicker-element persian-datepicker-element
# or
pnpm add ngx-persian-datepicker-element persian-datepicker-element
```

## Usage

### Web Component

```html
<!-- Import the component -->
<script type="module" src="node_modules/persian-datepicker-element/dist/persian-datepicker-element.min.js"></script>

<!-- Use the component -->
<persian-datepicker-element
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
  show-holidays
  rtl
></persian-datepicker-element>
```

### React

```tsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const handleChange = (event) => {
    console.log('تاریخ انتخاب شده:', event.detail);
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

### Vue

```vue
<template>
    <PersianDatepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      :show-holidays="true"
    :rtl="true"
    @change="handleChange"
    />
</template>

<script setup>
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const handleChange = (event) => {
  console.log('تاریخ انتخاب شده:', event.detail);
};
</script>
```

### Angular

```typescript
// app.module.ts
import { PersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [
    PersianDatepickerModule
  ]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <persian-datepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      [showHolidays]="true"
      [rtl]="true"
      (change)="handleChange($event)"
    ></persian-datepicker>
  `
})
export class AppComponent {
  handleChange(event: any) {
    console.log('تاریخ انتخاب شده:', event.detail);
  }
}
```

## Props & Attributes

| Prop/Attribute | Type | Default | Description |
|---------------|------|---------|-------------|
| value | string \| [number, number, number] | - | The selected date value |
| placeholder | string | - | Placeholder text |
| format | string | "YYYY/MM/DD" | Date format string |
| show-holidays | boolean | false | Show holiday indicators |
| holiday-types | string | "Iran,Afghanistan,AncientIran,International" | Comma-separated list of holiday types to display. Use "all" to show all available holiday types |
| rtl | boolean | false | Right-to-left layout |
| min-date | [number, number, number] | - | Minimum selectable date |
| max-date | [number, number, number] | - | Maximum selectable date |
| disabled-dates | string | - | The name of a function that determines if a date should be disabled. Can reference: 1) a global function, 2) a method on the element itself, or 3) for framework users, a function passed directly |
| disabled | boolean | false | Disable the datepicker |
| dark-mode | boolean | false | Enable dark mode |

## Events

| Event | Detail Type | Description |
|-------|-------------|-------------|
| change | { jalali: [number, number, number], gregorian: [number, number, number], isHoliday: boolean, events: Array } | Fired when a date is selected |

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| setValue | (year: number, month: number, day: number) | void | Sets the datepicker value |
| getValue | () | [number, number, number] | Gets the current selected date as a tuple |
| open | () | void | Opens the datepicker calendar |
| close | () | void | Closes the datepicker calendar |
| setMinDate | (year: number, month: number, day: number) | void | Sets the minimum allowed date |
| setMaxDate | (year: number, month: number, day: number) | void | Sets the maximum allowed date |
| setDisabledDatesFn | (fn: (year: number, month: number, day: number) => boolean) | void | Sets a function to determine disabled dates |
| setRange | (start: [number, number, number], end: [number, number, number]) | void | Sets a date range (in range mode) |
| getRange | () | { start: [number, number, number] \| null, end: [number, number, number] \| null } | Gets the current selected range |
| clear | () | void | Clears the selected date or range |

## Disabled Dates

There are three ways to specify which dates should be disabled:

### 1. Global Function

Define a function in the global scope and reference it by name:

```html
<script>
  function isWeekend(year, month, day) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6; // Disable Friday and Saturday (Persian weekend)
  }
</script>

<persian-datepicker-element disabled-dates="isWeekend"></persian-datepicker-element>
```

### 2. Element Method

Define a method directly on the element after retrieving it:

```html
<persian-datepicker-element id="my-picker"></persian-datepicker-element>

<script>
  const picker = document.getElementById('my-picker');
  
  // Add a method to the element
  picker.isHoliday = function(year, month, day) {
    // Custom logic to determine holidays
    return day === 13; // Disable 13th of each month as an example
  };
  
  // Reference the method by name
  picker.setAttribute('disabled-dates', 'isHoliday');
</script>
```

### 3. Direct Function Assignment (Recommended for Framework Users)

For React, Vue, or other framework users, you can pass a function directly:

```tsx
// React example
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  // Define the function locally
  const isEvenDay = (year, month, day) => {
    return day % 2 === 0; // Disable even days
  };

  return (
    <PersianDatepicker 
      placeholder="Select date" 
      disabledDates={isEvenDay}
    />
  );
}
```

You can also use the `setDisabledDatesFn` method directly:

```javascript
const picker = document.getElementById('my-picker');
picker.setDisabledDatesFn((year, month, day) => {
  return day % 2 === 0; // Disable even days
});
```

## CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| --jdp-primary | #0891b2 | Primary color |
| --jdp-primary-hover | #0e7490 | Primary hover color |
| --jdp-primary-foreground | #ffffff | Primary text color |
| --jdp-background | #ffffff | Background color |
| --jdp-foreground | #1e293b | Text color |
| --jdp-border | #e2e8f0 | Border color |
| --jdp-border-radius | 0.5rem | Border radius |
| --jdp-font-family | system-ui | Font family |
| --jdp-font-size | 14px | Font size |
| --jdp-nav-button-size | 38px | Navigation button size |
| --jdp-day-cell-size | 36px | Day cell size |

## Framework-Specific Features

### React
- Full TypeScript support
- Ref forwarding for imperative methods
- React event handling

### Vue
- Vue 3 Composition API support
- TypeScript support
- Vue event handling

### Angular
- Angular Ivy support
- TypeScript support
- Angular event binding

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.