# Persian DatePicker for Angular

An Angular wrapper for the persian-datepicker-element web component, providing a beautiful Persian (Jalali) calendar with holiday support.

## Features

✅ Easy to use Angular component  
✅ Angular Signals support (Angular 17+)  
✅ Reactive forms integration  
✅ Persian (Jalali) calendar  
✅ Holiday highlighting and customization  
✅ Range picker mode  
✅ Min/Max date restrictions  
✅ Disabled dates support  
✅ Full TypeScript support  
✅ Customizable theme via CSS variables

## Installation

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# or
yarn add ngx-persian-datepicker-element persian-datepicker-element
```

## Usage

For standalone components (recommended):

```typescript
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  // ...
  imports: [NgxPersianDatepickerComponent]
  // ...
})
export class YourStandaloneComponent { }
```

### Basic Usage

```html
<ngx-persian-datepicker-element 
  placeholder="انتخاب تاریخ" 
  format="YYYY/MM/DD" 
  (dateChange)="onDateChange($event)">
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
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      date: [null]
    });
  }
}
```

### Range Picker Example

```html
<ngx-persian-datepicker-element 
  [rangeMode]="true"
  [rangeStart]="[1402, 1, 1]"
  [rangeEnd]="[1402, 1, 15]"
  (dateChange)="onRangeChange($event)">
</ngx-persian-datepicker-element>
```

### With Holiday Types

```html
<ngx-persian-datepicker-element 
  [showEvents]="true" 
  [eventTypes]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)">
</ngx-persian-datepicker-element>
```

## API

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | '' | Placeholder text for the input field |
| `format` | `string` | 'YYYY/MM/DD' | Date format pattern |
| `showEvents` | `boolean` | true | Whether to show holidays in the calendar |
| `eventTypes` | `string \| string[]` | - | Types of holidays to display |
| `rtl` | `boolean` | true | Right-to-left layout |
| `minDate` | `[number, number, number]` | - | Minimum selectable date [year, month, day] |
| `maxDate` | `[number, number, number]` | - | Maximum selectable date [year, month, day] |
| `disabledDates` | `string \| Function` | - | Dates to disable (string pattern or function) |
| `rangeMode` | `boolean` | false | Enable range selection mode |
| `rangeStart` | `[number, number, number]` | - | Start date for range selection |
| `rangeEnd` | `[number, number, number]` | - | End date for range selection |
| `defaultDate` | `[number, number, number]` | - | Initial date to display |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `dateChange` | `EventEmitter<DateChangeEvent>` | Emitted when a date is selected |

### DateChangeEvent Interface

```typescript
interface DateChangeEvent {
  jalali: [number, number, number]; // [year, month, day]
  gregorian: [number, number, number]; // [year, month, day]
  isHoliday: boolean;
  events?: any[];
  range?: {
    start: [number, number, number];
    end: [number, number, number];
  };
}
```

## Theme Customization

You can customize the appearance using CSS variables:

```css
ngx-persian-datepicker-element {
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
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
}
```

## License

MIT

---

<div dir="rtl">

# کامپوننت تقویم شمسی برای Angular

یک wrapper برای کامپوننت وب تقویم شمسی در Angular، با پشتیبانی از تقویم جلالی و نمایش تعطیلات.

## ویژگی‌ها

✅ کامپوننت Angular ساده و کاربردی  
✅ پشتیبانی از Angular Signals (نسخه ۱۷+)  
✅ یکپارچه‌سازی با Reactive Forms  
✅ تقویم شمسی (جلالی)  
✅ نمایش و شخصی‌سازی تعطیلات  
✅ حالت انتخاب بازه  
✅ محدودیت حداقل/حداکثر تاریخ  
✅ پشتیبانی از تاریخ‌های غیرفعال  
✅ پشتیبانی کامل از TypeScript  
✅ قابلیت شخصی‌سازی ظاهر با متغیرهای CSS

## نصب

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# یا
yarn add ngx-persian-datepicker-element persian-datepicker-element
```

## نحوه استفاده

برای کامپوننت‌های standalone (توصیه شده):

```typescript
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  // ...
  imports: [NgxPersianDatepickerComponent]
  // ...
})
export class YourStandaloneComponent { }
```

### استفاده پایه

```html
<ngx-persian-datepicker-element 
  placeholder="انتخاب تاریخ" 
  format="YYYY/MM/DD" 
  (dateChange)="onDateChange($event)">
</ngx-persian-datepicker-element>
```

### استفاده با Reactive Forms

```html
<form [formGroup]="myForm">
  <ngx-persian-datepicker-element formControlName="date"></ngx-persian-datepicker-element>
</form>
```

### مثال انتخاب بازه

```html
<ngx-persian-datepicker-element 
  [rangeMode]="true"
  [rangeStart]="[1402, 1, 1]"
  [rangeEnd]="[1402, 1, 15]"
  (dateChange)="onRangeChange($event)">
</ngx-persian-datepicker-element>
```

## ورودی‌ها

| ورودی | نوع | پیش‌فرض | توضیحات |
|-------|-----|---------|----------|
| `placeholder` | `string` | '' | متن پیش‌فرض ورودی |
| `format` | `string` | 'YYYY/MM/DD' | الگوی نمایش تاریخ |
| `showEvents` | `boolean` | true | نمایش تعطیلات |
| `eventTypes` | `string \| string[]` | - | انواع تعطیلات برای نمایش |
| `rtl` | `boolean` | true | چیدمان راست به چپ |
| `minDate` | `[number, number, number]` | - | حداقل تاریخ قابل انتخاب [سال، ماه، روز] |
| `maxDate` | `[number, number, number]` | - | حداکثر تاریخ قابل انتخاب [سال، ماه، روز] |
| `disabledDates` | `string \| Function` | - | تاریخ‌های غیرفعال (الگو یا تابع) |
| `rangeMode` | `boolean` | false | فعال‌سازی حالت انتخاب بازه |
| `rangeStart` | `[number, number, number]` | - | تاریخ شروع بازه |
| `rangeEnd` | `[number, number, number]` | - | تاریخ پایان بازه |
| `defaultDate` | `[number, number, number]` | - | تاریخ اولیه برای نمایش |

## خروجی‌ها

| رویداد | نوع | توضیحات |
|--------|-----|----------|
| `dateChange` | `EventEmitter<DateChangeEvent>` | هنگام انتخاب تاریخ فراخوانی می‌شود |

## شخصی‌سازی ظاهر

می‌توانید با استفاده از متغیرهای CSS، ظاهر تقویم را شخصی‌سازی کنید:

```css
ngx-persian-datepicker-element {
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
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
}
```

</div>
