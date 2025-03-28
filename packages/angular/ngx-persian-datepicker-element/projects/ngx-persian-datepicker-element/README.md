# Persian DatePicker for Angular

An Angular wrapper for the persian-datepicker-element web component, providing a beautiful Persian (Jalali) calendar with holiday support.

## Features

✅ Easy to use Angular component  
✅ Angular Signals support (Angular 17+)  
✅ Reactive forms integration  
✅ Persian (Jalali) calendar  
✅ Holiday types support (Iran, Afghanistan, Religious, etc.)  
✅ Customizable styling  
✅ Full TypeScript support  
✅ No CDN required - the web component is bundled with the library

## Installation

```bash
npm install ngx-persian-datepicker-element
# or
yarn add ngx-persian-datepicker-element
# or
pnpm add ngx-persian-datepicker-element
```

## Usage

Import the `NgxPersianDatepickerModule` in your Angular module:

```typescript
import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [NgxPersianDatepickerModule],
})
export class AppModule {}
```

Or for standalone components:

```typescript
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  // ...
  imports: [NgxPersianDatepickerComponent],
  // ...
})
export class YourStandaloneComponent {}
```

### Basic Usage

```html
<ngx-persian-datepicker-element
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
  (dateChange)="onDateChange($event)"
>
</ngx-persian-datepicker-element>
```

### With Reactive Forms

```html
<form [formGroup]="myForm">
  <ngx-persian-datepicker-element formControlName="date"></ngx-persian-datepicker-element>
</form>
```

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      date: [null],
    });
  }
}
```

### With Holiday Types

You can use either the direct property names or the legacy alias name (with "Input" suffix):

```html
<!-- Using signal-based inputs directly (Angular 17+ recommended) -->
<ngx-persian-datepicker-element
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
  [showHolidays]="true"
  [holidayTypes]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)"
>
</ngx-persian-datepicker-element>

<!-- Using alias names (compatible with all Angular versions) -->
<ngx-persian-datepicker-element
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
  [showHolidaysInput]="true"
  [holidayTypesInput]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)"
>
</ngx-persian-datepicker-element>
```

> Note: If you're using direct input properties and getting binding errors, add `CUSTOM_ELEMENTS_SCHEMA` to your component's schemas:
>
> ```typescript
> import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @Component({
>   // ...
>   schemas: [CUSTOM_ELEMENTS_SCHEMA],
>   // ...
> })
> export class YourComponent {}
> ```

### Custom Styling

```html
<ngx-persian-datepicker-element
  placeholder="تاریخ سفارشی"
  format="YYYY/MM/DD"
  primaryColor="#9c27b0"
  primaryHover="#7b1fa2"
  backgroundColor="#f5f0fa"
  foregroundColor="#333"
  borderColor="#ddd"
  borderRadius="12px"
  holidayColor="#e91e63"
  holidayBg="#ffe6ec"
  [showHolidays]="true"
>
</ngx-persian-datepicker-element>
```

## API

### Input Properties

| Property                                   | Type                   | Description                                                                               |
| ------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------- |
| `placeholder` / `placeholderInput`         | `string`               | Placeholder text for the input field                                                      |
| `format` / `formatInput`                   | `string`               | Date format string (e.g., 'YYYY/MM/DD')                                                   |
| `showHolidays` / `showHolidaysInput`       | `boolean`              | Whether to show holidays in the calendar                                                  |
| `holidayTypes` / `holidayTypesInput`       | `string` or `string[]` | Holiday types to display (e.g., 'Iran', 'Religious', 'National', 'Afghanistan', or 'all') |
| `rtl` / `rtlInput`                         | `boolean`              | Whether the component should use RTL layout                                               |
| `primaryColor` / `primaryColorInput`       | `string`               | Primary color for the datepicker                                                          |
| `primaryHover` / `primaryHoverInput`       | `string`               | Primary hover color for the datepicker                                                    |
| `backgroundColor` / `backgroundColorInput` | `string`               | Background color for the datepicker                                                       |
| `foregroundColor` / `foregroundColorInput` | `string`               | Foreground (text) color for the datepicker                                                |
| `borderColor` / `borderColorInput`         | `string`               | Border color for the datepicker                                                           |
| `borderRadius` / `borderRadiusInput`       | `string`               | Border radius for the datepicker                                                          |
| `fontFamily` / `fontFamilyInput`           | `string`               | Font family for the datepicker                                                            |
| `holidayColor` / `holidayColorInput`       | `string`               | Holiday text color for the datepicker                                                     |
| `holidayBg` / `holidayBgInput`             | `string`               | Holiday background color for the datepicker                                               |
| `cssVariables` / `cssVariablesInput`       | `CSSVariableMap`       | Custom CSS variables map for styling                                                      |

### Output Events

| Event        | Type                            | Description                     |
| ------------ | ------------------------------- | ------------------------------- |
| `dateChange` | `EventEmitter<DateChangeEvent>` | Emitted when a date is selected |

### DateChangeEvent Interface

```typescript
interface DateChangeEvent {
  jalali: [number, number, number]; // [year, month, day]
  gregorian: [number, number, number]; // [year, month, day]
  isHoliday: boolean;
  events?: any[];
}
```

## Angular Signals Support

This component uses Angular Signals for its inputs, making it more efficient with Angular 17+. Both the property name (e.g., `showHolidays`) and alias name (e.g., `showHolidaysInput`) are supported for backward compatibility.

## License

MIT
