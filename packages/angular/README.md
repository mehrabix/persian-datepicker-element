# ngx-persian-datepicker-element

Angular integration for the Persian Date Picker web component.

## Installation

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# or
yarn add ngx-persian-datepicker-element persian-datepicker-element
# or
pnpm add ngx-persian-datepicker-element persian-datepicker-element
```

## Usage

1. Import the module in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { PersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [
    PersianDatepickerModule
  ]
})
export class AppModule { }
```

2. Use the component in your templates:

```typescript
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
    console.log('Selected date:', event.detail);
  }
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
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

## Outputs

| Output | Event Type | Description |
|--------|------------|-------------|
| change | { jalali: [number, number, number], gregorian: [number, number, number], isHoliday: boolean, events: Array } | Emitted when a date is selected |

## ViewChild/ViewChildren

You can access the component's methods using ViewChild:

```typescript
import { Component, ViewChild } from '@angular/core';
import { PersianDatepickerComponent } from '@persian-datepicker/angular';

@Component({
  template: `
    <persian-datepicker #datepicker></persian-datepicker>
  `
})
export class AppComponent {
  @ViewChild('datepicker') datepicker!: PersianDatepickerComponent;

  setDate() {
    this.datepicker.setValue(1401, 7, 1);
  }

  getDate() {
    const date = this.datepicker.getValue();
    console.log('Current date:', date);
  }

  openCalendar() {
    this.datepicker.open();
  }

  closeCalendar() {
    this.datepicker.close();
  }

  getElement() {
    const element = this.datepicker.getElement();
    console.log('Element:', element);
  }
}
```

## TypeScript Support

The package includes full TypeScript support:

```typescript
import { Component } from '@angular/core';
import { PersianDatepickerComponent, PersianDatepickerChangeEvent } from '@persian-datepicker/angular';

@Component({
  template: `
    <persian-datepicker
      [placeholder]="placeholder"
      [format]="format"
      [showHolidays]="showHolidays"
      [rtl]="rtl"
      (change)="handleChange($event)"
    ></persian-datepicker>
  `
})
export class AppComponent {
  placeholder = "انتخاب تاریخ";
  format = "YYYY/MM/DD";
  showHolidays = true;
  rtl = true;

  handleChange(event: PersianDatepickerChangeEvent) {
    const { jalali, gregorian, isHoliday, events } = event.detail;
    console.log('Jalali:', jalali);
    console.log('Gregorian:', gregorian);
    console.log('Is Holiday:', isHoliday);
    console.log('Events:', events);
  }
}
```

## Styling

You can style the component using CSS variables:

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker class="custom-datepicker"></persian-datepicker>
  `,
  styles: [`
    .custom-datepicker {
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
  `]
})
export class AppComponent {}
```

## Examples

### Basic Usage

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
    ></persian-datepicker>
  `
})
export class AppComponent {}
```

### With Event Handling

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker (change)="handleChange($event)"></persian-datepicker>
  `
})
export class AppComponent {
  handleChange(event: any) {
    const { jalali, gregorian, isHoliday, events } = event.detail;
    console.log('Jalali:', jalali);
    console.log('Gregorian:', gregorian);
    console.log('Is Holiday:', isHoliday);
    console.log('Events:', events);
  }
}
```

### With Date Limits

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker
      [minDate]="[1400, 1, 1]"
      [maxDate]="[1402, 12, 29]"
      disabledDates="isWeekend"
    ></persian-datepicker>
  `
})
export class AppComponent {}
```

### With Custom Styling

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker class="custom-datepicker"></persian-datepicker>
  `,
  styles: [`
    .custom-datepicker {
      width: 300px;
      --jdp-primary: #3b82f6;
      --jdp-primary-hover: #2563eb;
    }
  `]
})
export class AppComponent {}
```

## License

MIT 