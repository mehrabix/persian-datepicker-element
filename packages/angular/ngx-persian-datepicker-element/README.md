# ngx-persian-datepicker-element

An Angular wrapper for the Persian DatePicker Web Component. This package provides Angular bindings for the `persian-datepicker-element` web component, making it easy to use in Angular applications.

## Features

- Full integration with Angular's form system (Reactive Forms and Template-driven Forms)
- Support for RTL layout
- Customizable styling
- Dark mode support
- Holiday display support with multiple region options
- Various date formatting options
- Selection of different holiday types
- Optimized with Angular Signals for better performance

## Installation

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
```

### Zero Configuration Required

The package seamlessly bundles the Persian DatePicker web component (`persian-datepicker-element`) directly, so you don't need to:
- Add any scripts to your angular.json file
- Import the web component separately
- Configure any additional assets

Just install and import the module or component and you're ready to go!

### Browser Compatibility

This package works with all modern browsers. The web component is automatically registered when the package is imported.

## Usage

You can use the Persian DatePicker component in two ways:

### 1. As a standalone component (Angular 17+)

```typescript
// In your component
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  // ...
  imports: [NgxPersianDatepickerComponent],
  // ...
})
export class YourComponent { }
```

### 2. Using the NgModule (Traditional Angular)

```typescript
// In your module
import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [
    // ... other imports
    NgxPersianDatepickerModule
  ],
  // ... declarations, etc.
})
export class YourModule { }
```

### Basic Usage with Signals (Recommended)

The component uses Angular Signals for better performance. Use the input properties with "Input" suffix:

```html
<ngx-persian-datepicker-element
  placeholderInput="انتخاب تاریخ"
  formatInput="YYYY/MM/DD"
  [showEventsInput]="true"
  (change)="onDateChange($event)">
</ngx-persian-datepicker-element>
```

### With Angular Forms

#### Reactive Forms

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="date">تاریخ:</label>
        <ngx-persian-datepicker-element formControlName="date"></ngx-persian-datepicker-element>
      </div>
      <button type="submit">ثبت</button>
    </form>
  `
})
export class MyFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      date: [1403, 6, 15] // Initial value: [year, month, day]
    });

    // Subscribe to value changes
    this.myForm.valueChanges.subscribe(value => {
      console.log('Form values changed:', value);
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.myForm.value);
  }
}
```

#### Template-driven Forms

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm.value)">
  <div>
    <label for="date">تاریخ:</label>
    <ngx-persian-datepicker-element [(ngModel)]="model.date" name="date"></ngx-persian-datepicker-element>
  </div>
  <button type="submit">ثبت</button>
</form>
```

```typescript
// In your component
model = {
  date: [1403, 6, 15] // [year, month, day]
};

onSubmit(formValues) {
  console.log('Form submitted:', formValues);
}
```

## Advanced Configuration

### Styling Customization

You can customize the appearance of the datepicker using the style inputs:

```html
<ngx-persian-datepicker-element
  primaryColorInput="#3b82f6"
  primaryHoverInput="#2563eb"
  borderRadiusInput="0.5rem"
  fontFamilyInput="'Vazir', sans-serif">
</ngx-persian-datepicker-element>
```

Or by using the `cssVariablesInput` input:

```html
<ngx-persian-datepicker-element
  [cssVariablesInput]="{
    '--jdp-primary': '#3b82f6',
    '--jdp-primary-hover': '#2563eb',
    '--jdp-border-radius': '0.5rem',
    '--jdp-font-family': '\'Vazir\', sans-serif'
  }">
</ngx-persian-datepicker-element>
```

## Holiday Types

The Persian DatePicker supports displaying various types of holidays in the calendar. You can control which holiday types are shown:

### Available Holiday Types

The component supports the following holiday types:

- `Iran` - Official holidays in Iran
- `Religious` - Religious holidays and observances
- `National` - National celebrations and events
- `Afghanistan` - Official holidays in Afghanistan

### Setting Holiday Types

You can specify which holiday types to display:

```html
<!-- Show only Iran holidays -->
<ngx-persian-datepicker-element eventTypesInput="Iran"></ngx-persian-datepicker-element>

<!-- Show Iran and Religious holidays -->
<ngx-persian-datepicker-element eventTypesInput="Iran,Religious"></ngx-persian-datepicker-element>

<!-- Show all holiday types -->
<ngx-persian-datepicker-element eventTypesInput="all"></ngx-persian-datepicker-element>

<!-- Or using an array -->
<ngx-persian-datepicker-element [eventTypesInput]="['Iran', 'Religious', 'Afghanistan']"></ngx-persian-datepicker-element>
```

### Dynamic Holiday Types Selection

You can implement a UI that lets users select which holiday types to display:

```typescript
// In your component
type HolidayTypeKey = 'Iran' | 'Religious' | 'National' | 'Afghanistan';

// Define checkbox states for the UI
checkboxStates: Record<HolidayTypeKey, boolean> = {
  'Iran': true,
  'Religious': true,
  'National': false,
  'Afghanistan': false
};

// The selected holiday types (initially Iran and Religious)
eventTypes = ['Iran', 'Religious'];

// Update holiday types based on user selection
updateeventTypes(type: HolidayTypeKey, event: any) {
  // Update checkbox state
  this.checkboxStates[type] = event.target.checked;
  
  // Rebuild the eventTypes array based on checked boxes
  this.eventTypes = Object.keys(this.checkboxStates).filter(
    key => this.checkboxStates[key as HolidayTypeKey]
  ) as HolidayTypeKey[];
  
  // If no types are selected, ensure we have at least one to prevent errors
  if (this.eventTypes.length === 0) {
    this.eventTypes = ['Iran'];
    this.checkboxStates['Iran'] = true;
  }
}
```

```html
<!-- In your template -->
<div class="checkbox-group">
  <label>
    <input type="checkbox" [checked]="checkboxStates['Iran']" (change)="updateeventTypes('Iran', $event)">
    Show Iran Holidays
  </label>
  <label>
    <input type="checkbox" [checked]="checkboxStates['Religious']" (change)="updateeventTypes('Religious', $event)">
    Show Religious Holidays
  </label>
  <label>
    <input type="checkbox" [checked]="checkboxStates['National']" (change)="updateeventTypes('National', $event)">
    Show National Holidays
  </label>
  <label>
    <input type="checkbox" [checked]="checkboxStates['Afghanistan']" (change)="updateeventTypes('Afghanistan', $event)">
    Show Afghanistan Holidays
  </label>
</div>

<ngx-persian-datepicker-element 
  [eventTypesInput]="eventTypes"
  [showEventsInput]="true">
</ngx-persian-datepicker-element>
```

## Event Handling

### Date Change Event

```html
<ngx-persian-datepicker-element (change)="onDateChange($event)"></ngx-persian-datepicker-element>
```

```typescript
onDateChange(event) {
  console.log('Selected date (Jalali):', event.jalali); // [year, month, day]
  console.log('Selected date (Gregorian):', event.gregorian); // [year, month, day]
  console.log('Is holiday:', event.isHoliday);
  console.log('Events on this date:', event.events);
}
```

## Configuration Options

### Inputs (with Signal Approach)

| Input | Type | Description |
|-------|------|-------------|
| `placeholderInput` | string | Placeholder text for the input field |
| `formatInput` | string | Date format string (e.g., 'YYYY/MM/DD') |
| `showEventsInput` | boolean | Whether to show holidays in the calendar |
| `eventTypesInput` | string \| string[] | Holiday types to display (comma-separated or array) |
| `rtlInput` | boolean | Whether the component should use RTL layout |
| `primaryColorInput` | string | Primary color for the datepicker |
| `primaryHoverInput` | string | Primary hover color for the datepicker |
| `backgroundColorInput` | string | Background color for the datepicker |
| `foregroundColorInput` | string | Foreground (text) color for the datepicker |
| `borderColorInput` | string | Border color for the datepicker |
| `borderRadiusInput` | string | Border radius for the datepicker |
| `fontFamilyInput` | string | Font family for the datepicker |
| `holidayColorInput` | string | Holiday text color for the datepicker |
| `holidayBgInput` | string | Holiday background color for the datepicker |
| `cssVariablesInput` | object | CSS variables for custom styling |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `change` | `EventEmitter<DateChangeEvent>` | Emitted when a date is selected |

## License

MIT

## Dark Mode Support

The datepicker fully supports dark mode. You can implement dark mode using CSS variables:

### Method 1: CSS Class Approach

Add a `dark` class to your container, and define CSS variables for dark mode:

```css
/* Light mode (default) variables */
:root {
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  /* Add other variables as needed */
}

/* Dark mode variables */
.dark persian-datepicker-element {
  --jdp-background: #1e1e2f;
  --jdp-foreground: #e2e8f0;
  --jdp-muted: #334155;
  --jdp-muted-foreground: #94a3b8;
  --jdp-border: #475569;
  --jdp-input-border-color: #475569;
  --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
  --jdp-day-hover-bg: #334155;
  /* Add other dark mode variables */
}
```

### Method 2: Programmatic Approach

You can dynamically update the CSS variables when toggling dark mode:

```typescript
@Component({
  // ...
})
export class AppComponent implements AfterViewInit {
  @ViewChild('datepicker') datepicker!: NgxPersianDatepickerComponent;
  isDarkMode = false;

  // Dark theme variables
  darkThemeVars = {
    '--jdp-background': '#1e1e2f',
    '--jdp-foreground': '#e2e8f0',
    '--jdp-muted': '#334155',
    '--jdp-muted-foreground': '#94a3b8',
    '--jdp-border': '#475569',
    '--jdp-input-border-color': '#475569',
    '--jdp-calendar-shadow': '0px 10px 30px -5px rgba(2, 6, 23, 0.5)',
    '--jdp-day-hover-bg': '#334155'
  };

  // Light theme variables
  lightThemeVars = {
    '--jdp-background': '#ffffff',
    '--jdp-foreground': '#1e293b',
    '--jdp-muted': '#f1f5f9',
    '--jdp-muted-foreground': '#64748b',
    '--jdp-border': '#e2e8f0',
    '--jdp-input-border-color': '#e2e8f0'
  };

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const themeVars = this.isDarkMode ? this.darkThemeVars : this.lightThemeVars;
    
    // Apply variables to the datepicker
    if (this.datepicker) {
      this.datepicker.applyThemeVariables(themeVars);
    }
  }
}
```

```html
<div [ngClass]="{'dark': isDarkMode}">
  <button (click)="toggleDarkMode()">Toggle Dark Mode</button>
  <ngx-persian-datepicker-element #datepicker></ngx-persian-datepicker-element>
</div>
```

### System Dark Mode Detection

You can also detect and respond to the user's system preference:

```typescript
constructor() {
  // Check system preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  this.isDarkMode = mediaQuery.matches;
  
  // Listen for changes
  mediaQuery.addEventListener('change', (e) => {
    this.isDarkMode = e.matches;
    this.applyTheme();
  });
}

applyTheme() {
  const themeVars = this.isDarkMode ? this.darkThemeVars : this.lightThemeVars;
  if (this.datepicker) {
    this.datepicker.applyThemeVariables(themeVars);
  }
}
```

## RTL Support

The datepicker has built-in RTL (Right-to-Left) support for Persian and Arabic languages:

### Using the rtlInput property

```html
<ngx-persian-datepicker-element
  rtlInput="true"
  placeholderInput="انتخاب تاریخ">
</ngx-persian-datepicker-element>
```

### Setting RTL for the entire application

You can set RTL direction for your entire application:

```html
<!-- In app.component.html -->
<div dir="rtl">
  <!-- Your app content -->
  <ngx-persian-datepicker-element></ngx-persian-datepicker-element>
</div>
```

Or using Angular binding:

```html
<div [dir]="'rtl'">
  <!-- Your app content -->
</div>
```

## CSS Variables Reference

The datepicker uses CSS variables for styling. Here's a complete list of the available variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `--jdp-primary` | Primary color | `#0891b2` |
| `--jdp-primary-hover` | Primary hover color | `#0e7490` |
| `--jdp-primary-foreground` | Text color on primary background | `#ffffff` |
| `--jdp-background` | Background color | `#ffffff` |
| `--jdp-foreground` | Text color | `#1e293b` |
| `--jdp-muted` | Muted background color | `#f1f5f9` |
| `--jdp-muted-foreground` | Text color on muted background | `#64748b` |
| `--jdp-border` | Border color | `#e2e8f0` |
| `--jdp-input-border-color` | Input border color | `var(--jdp-border)` |
| `--jdp-holiday-color` | Holiday text color | `#ef4444` |
| `--jdp-holiday-bg` | Holiday background color | `#fee2e2` |
| `--jdp-holiday-hover-bg` | Holiday hover background color | `#fecaca` |
| `--jdp-border-radius` | Border radius for elements | `0.5rem` |
| `--jdp-direction` | Text direction | `rtl` |

For a full list of all CSS variables, check out the [component implementation](projects/ngx-persian-datepicker-element/src/lib/ngx-persian-datepicker.component.ts).
