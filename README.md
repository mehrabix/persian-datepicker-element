# Persian Date Picker Element

A modern, customizable Persian (Jalali) date picker web component with framework integrations.

## Features

- 🎨 Fully customizable with CSS variables
- 🌙 Dark mode support
- 📱 Mobile-friendly with touch gestures
- 🎯 Framework integrations (React, Vue, Angular)
- 📅 Holiday support with multiple event types (Iran, Afghanistan, Ancient Iran, International)
- 🔄 RTL support
- 🎨 Multiple theme options
- 📦 Zero dependencies
- 🎯 TypeScript support
- 📊 Range selection mode
- 🚫 Disabled dates support
- 🎨 Customizable UI elements visibility

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
        showEvents
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

#### 1. Using the NgModule (Traditional Angular)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPersianDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-persian-datepicker-element
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      [showEvents]="true"
      [rtl]="true"
      (dateChange)="onDateChange($event)"
    ></ngx-persian-datepicker-element>
  `
})
export class AppComponent {
  onDateChange(event: any) {
    console.log('تاریخ شمسی:', event.jalali); // [year, month, day]
    console.log('تاریخ میلادی:', event.gregorian);
    console.log('آیا تعطیل است:', event.isHoliday);
    console.log('رویدادها:', event.events);
  }
}
```

#### 2. As a Standalone Component (Angular 17+)

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxPersianDatepickerComponent],
  template: `
    <ngx-persian-datepicker-element
      placeholder="تاریخ را انتخاب کنید"
      format="YYYY/MM/DD"
      [showEvents]="true"
      (dateChange)="onDateChange($event)"
    ></ngx-persian-datepicker-element>
  `
})
export class AppComponent {
  onDateChange(event: any) {
    console.log('تاریخ شمسی:', event.jalali); // [سال, ماه, روز]
    console.log('تاریخ میلادی:', event.gregorian);
    console.log('آیا تعطیل است:', event.isHoliday);
    console.log('رویدادها:', event.events);
  }
}
```


#### 3. With Reactive Forms

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxPersianDatepickerComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="dateForm">
      <ngx-persian-datepicker-element 
        formControlName="date"
        placeholder="تاریخ را انتخاب کنید"
        format="YYYY/MM/DD">
      </ngx-persian-datepicker-element>
    </form>
  `
})
export class AppComponent {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: [1403, 6, 15] // Initial value: [year, month, day]
    });
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
| disabled-dates | string | - | The name of a function that determines if a date should be disabled |
| disabled | boolean | false | Disable the datepicker |
| dark-mode | boolean | false | Enable dark mode |
| range-mode | boolean | false | Enable date range selection mode |
| show-month-selector | boolean | true | Show month selector dropdown |
| show-year-selector | boolean | true | Show year selector dropdown |
| show-prev-button | boolean | true | Show previous month button |
| show-next-button | boolean | true | Show next month button |
| show-today-button | boolean | true | Show today button |
| show-tomorrow-button | boolean | true | Show tomorrow button |
| today-button-text | string | "امروز" | Custom text for today button |
| tomorrow-button-text | string | "فردا" | Custom text for tomorrow button |
| today-button-class | string | "" | Additional CSS classes for today button |
| tomorrow-button-class | string | "" | Additional CSS classes for tomorrow button |

## Events

| Event | Detail Type | Description |
|-------|-------------|-------------|
| change | { jalali: [number, number, number], gregorian: [number, number, number], isHoliday: boolean, events: Array, formattedDate: string, isoString: string } | Fired when a date is selected |
| change | { range: { start: [number, number, number], end: [number, number, number], startISOString: string, endISOString: string, startGregorian: [number, number, number], endGregorian: [number, number, number] }, isRange: true } | Fired when a date range is selected (in range mode) |

### Examples for accessing ISO strings

#### For single date selection:
```javascript
datepicker.addEventListener('change', (event) => {
  // ISO string for the selected date
  console.log('Selected date ISO string:', event.detail.isoString);
  
  // Access ISO strings from events (like holidays)
  if (event.detail.events.length > 0) {
    event.detail.events.forEach(eventItem => {
      console.log(`Event: ${eventItem.title}, ISO date: ${eventItem.isoString}`);
    });
  }
});
```

#### For range selection:
```javascript
rangePicker.addEventListener('change', (event) => {
  if (event.detail.isRange) {
    // ISO strings for range start and end
    console.log('Range start ISO:', event.detail.range.startISOString);
    console.log('Range end ISO:', event.detail.range.endISOString);
  }
});
```

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| setValue | (year: number, month: number, day: number) | void | Sets the datepicker value |
| getValue | () | [number, number, number] \| null | Gets the current selected date as a tuple |
| open | () | void | Opens the datepicker calendar |
| close | () | void | Closes the datepicker calendar |
| setMinDate | (year: number, month: number, day: number) | void | Sets the minimum allowed date |
| setMaxDate | (year: number, month: number, day: number) | void | Sets the maximum allowed date |
| setDisabledDatesFn | (fn: (year: number, month: number, day: number) => boolean) | void | Sets a function to determine disabled dates |
| setRange | (start: [number, number, number], end: [number, number, number]) | void | Sets a date range (in range mode) |
| getRange | () | { start: [number, number, number] \| null, end: [number, number, number] \| null } | Gets the current selected range |
| clear | () | void | Clears the selected date or range |
| seteventTypes | (types: string \| string[]) | void | Sets the holiday types to display |
| geteventTypes | () | string[] | Gets the current holiday types |
| isShowingAllTypes | () | boolean | Checks if all holiday types are being shown |
| isSelectedDateHoliday | () | boolean | Checks if the currently selected date is a holiday |
| getSelectedDateEvents | () | any[] | Gets events for the currently selected date |

## Advanced Usage

### Date Range Selection

To enable date range selection mode:

```html
<persian-datepicker-element range-mode></persian-datepicker-element>
```

In React:
```tsx
<PersianDatepicker rangeMode />
```

In Vue:
```vue
<PersianDatepicker :range-mode="true" />
```

In Angular:
```html
<ngx-persian-datepicker-element [rangeMode]="true"></ngx-persian-datepicker-element>
```

### Customizing UI Elements

You can control the visibility of various UI elements:

```html
<persian-datepicker-element
  show-month-selector="false"
  show-year-selector="true"
  show-prev-button="true"
  show-next-button="true"
  show-today-button="false"
  show-tomorrow-button="true"
></persian-datepicker-element>
```

### Custom Button Text and Styling

```html
<persian-datepicker-element
  today-button-text="Go to Today"
  tomorrow-button-text="Next Day"
  today-button-class="primary rounded"
  tomorrow-button-class="secondary rounded"
></persian-datepicker-element>
```

### Dark Mode

```html
<persian-datepicker-element dark-mode></persian-datepicker-element>
```

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

## Framework-Specific Features

### React
- Full TypeScript support
- Ref forwarding for imperative methods
- React event handling
- Controlled and uncontrolled modes
- Custom hooks for date manipulation

### Vue
- Vue 3 Composition API support
- TypeScript support
- Vue event handling
- v-model support
- Custom directives for date formatting

### Angular
- Angular Ivy and Angular Signals support
- TypeScript support
- Angular event binding
- Reactive Forms and Template-driven Forms integration
- Customization using CSS variables and direct inputs
- Zero configuration required
- Both module-based and standalone component support

## Mobile Support

The component includes built-in support for mobile devices:

- Touch swipe gestures for month navigation
- Mobile-optimized tooltips
- Responsive design
- Touch-friendly UI elements

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Component not rendering**: Make sure you've imported the component correctly and that the script is loaded before using the component.

2. **Events not firing**: Check that you're using the correct event name and that the event handler is properly attached.

3. **Styling issues**: Verify that your CSS variables are correctly defined and that there are no conflicting styles.

4. **Date format issues**: Ensure that the format string is valid and that the date is in the correct format.

5. **Holidays not showing**: Check that the `show-holidays` attribute is set to `true` and that the `holiday-types` attribute includes the desired holiday types.

### Debugging

For debugging purposes, you can enable verbose logging:

```javascript
const picker = document.getElementById('my-picker');
picker.setAttribute('debug', 'true');
```

This will log additional information to the console, which can help identify issues.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
