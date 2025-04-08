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
      [showEvents]="true"
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

## Standalone Component Usage

You can also use the component in standalone components:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { PersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersianDatepickerComponent],
  template: `
    <persian-datepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      [showEvents]="true"
      [rtl]="true"
      (dateChange)="onDateChange($event)"
    ></persian-datepicker>
  `
})
export class AppComponent {
  onDateChange(event: PersianDateChangeEvent) {
    console.log('تاریخ شمسی:', event.jalali); // [سال, ماه, روز]
    console.log('تاریخ میلادی:', event.gregorian);
    console.log('آیا تعطیل است:', event.isHoliday);
    console.log('رویدادها:', event.events);
  }
}
```

## Reactive Forms Integration

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersianDatepickerComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="dateForm">
      <persian-datepicker 
        formControlName="date"
        placeholder="تاریخ را انتخاب کنید"
        format="YYYY/MM/DD">
      </persian-datepicker>
    </form>
  `
})
export class AppComponent {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: ['']
    });
  }
}
```

## Two-way Binding

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersianDatepickerComponent, FormsModule],
  template: `
    <persian-datepicker 
      [(ngModel)]="selectedDate"
      placeholder="تاریخ را انتخاب کنید"
      format="YYYY/MM/DD">
    </persian-datepicker>
  `
})
export class AppComponent {
  selectedDate: string = '';
}
```

## ViewChild Usage

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { PersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersianDatepickerComponent],
  template: `
    <persian-datepicker 
      #datepicker
      placeholder="تاریخ را انتخاب کنید"
      format="YYYY/MM/DD">
    </persian-datepicker>
    <button (click)="clearDate()">پاک کردن تاریخ</button>
  `
})
export class AppComponent {
  @ViewChild('datepicker') datepicker!: PersianDatepickerComponent;

  clearDate() {
    this.datepicker.setValue('');
  }
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| value | string \| [number, number, number] | - | The selected date value |
| placeholder | string | - | Placeholder text |
| format | string | "YYYY/MM/DD" | Date format string |
| showEvents | boolean | false | Show holiday indicators |
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
      [showEvents]="showEvents"
      [rtl]="rtl"
      (change)="handleChange($event)"
    ></persian-datepicker>
  `
})
export class AppComponent {
  placeholder = "انتخاب تاریخ";
  format = "YYYY/MM/DD";
  showEvents = true;
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

You can style the component using standard CSS:

```typescript
// app.component.ts
@Component({
  template: `
    <persian-datepicker class="custom-datepicker"></persian-datepicker>
  `,
  styles: [`
    .custom-datepicker {
      /* Add your custom styles here */
    }
  `]
})
export class AppComponent {}
```