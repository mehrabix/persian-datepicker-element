# دیت‌پیکر فارسی برای انگولار

کامپوننت انگولار برای دیت‌پیکر فارسی، یک تقویم زیبای فارسی (جلالی) همراه با پشتیبانی از انواع تعطیلات.

## ویژگی‌ها

✅ کامپوننت انگولار ساده برای استفاده  
✅ پشتیبانی از سیگنال‌های انگولار (انگولار ۱۷+)  
✅ یکپارچه‌سازی با فرم‌های ری‌اکتیو  
✅ تقویم فارسی (جلالی)  
✅ پشتیبانی از انواع تعطیلات (ایران، افغانستان، مذهبی و غیره)  
✅ امکان شخصی‌سازی ظاهر  
✅ پشتیبانی کامل از تایپ‌اسکریپت  
✅ بدون نیاز به CDN - کامپوننت وب به همراه کتابخانه ارائه می‌شود

## نصب

```bash
npm install ngx-persian-datepicker-element
# یا
yarn add ngx-persian-datepicker-element
# یا
pnpm add ngx-persian-datepicker-element
```

## نحوه استفاده

وارد کردن `NgxPersianDatepickerModule` در ماژول انگولار:

```typescript
import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [
    NgxPersianDatepickerModule
  ]
})
export class AppModule { }
```

یا برای کامپوننت‌های مستقل:

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

### استفاده با فرم‌های ری‌اکتیو

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

### استفاده با انواع تعطیلات

شما می‌توانید از نام‌های مستقیم ورودی یا نام‌های قدیمی (با پسوند "Input") استفاده کنید:

```html
<!-- استفاده از ورودی‌های مبتنی بر سیگنال (توصیه شده برای انگولار ۱۷+) -->
<ngx-persian-datepicker-element 
  placeholder="انتخاب تاریخ" 
  format="YYYY/MM/DD" 
  [showHolidays]="true" 
  [holidayTypes]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)">
</ngx-persian-datepicker-element>

<!-- استفاده از نام‌های قدیمی (سازگار با تمام نسخه‌های انگولار) -->
<ngx-persian-datepicker-element 
  placeholder="انتخاب تاریخ" 
  format="YYYY/MM/DD" 
  [showHolidaysInput]="true" 
  [holidayTypesInput]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)">
</ngx-persian-datepicker-element>
```

> نکته: اگر از ورودی‌های مستقیم استفاده می‌کنید و با خطای binding مواجه شدید، `CUSTOM_ELEMENTS_SCHEMA` را به schemas کامپوننت خود اضافه کنید:
>
> ```typescript
> import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> 
> @Component({
>   // ...
>   schemas: [CUSTOM_ELEMENTS_SCHEMA],
>   // ...
> })
> export class YourComponent { }
> ```

### شخصی‌سازی ظاهر

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
  [showHolidays]="true">
</ngx-persian-datepicker-element>
```

## API

### ورودی‌ها (Inputs)

| ویژگی | نوع | توضیحات |
|----------|------|-------------|
| `placeholder` / `placeholderInput` | `string` | متن راهنما برای ورودی |
| `format` / `formatInput` | `string` | قالب تاریخ (به عنوان مثال 'YYYY/MM/DD') |
| `showHolidays` / `showHolidaysInput` | `boolean` | نمایش تعطیلات در تقویم |
| `holidayTypes` / `holidayTypesInput` | `string` یا `string[]` | انواع تعطیلات برای نمایش (مانند 'Iran'، 'Religious'، 'National'، 'Afghanistan' یا 'all') |
| `rtl` / `rtlInput` | `boolean` | استفاده از چینش راست به چپ |
| `primaryColor` / `primaryColorInput` | `string` | رنگ اصلی دیت‌پیکر |
| `primaryHover` / `primaryHoverInput` | `string` | رنگ هاور اصلی دیت‌پیکر |
| `backgroundColor` / `backgroundColorInput` | `string` | رنگ پس‌زمینه دیت‌پیکر |
| `foregroundColor` / `foregroundColorInput` | `string` | رنگ متن دیت‌پیکر |
| `borderColor` / `borderColorInput` | `string` | رنگ حاشیه دیت‌پیکر |
| `borderRadius` / `borderRadiusInput` | `string` | شعاع حاشیه دیت‌پیکر |
| `fontFamily` / `fontFamilyInput` | `string` | فونت دیت‌پیکر |
| `holidayColor` / `holidayColorInput` | `string` | رنگ متن تعطیلات |
| `holidayBg` / `holidayBgInput` | `string` | رنگ پس‌زمینه تعطیلات |
| `cssVariables` / `cssVariablesInput` | `CSSVariableMap` | متغیرهای CSS سفارشی برای استایل‌دهی |

### رویدادهای خروجی (Outputs)

| رویداد | نوع | توضیحات |
|-------|------|-------------|
| `dateChange` | `EventEmitter<DateChangeEvent>` | زمانی که تاریخ انتخاب می‌شود منتشر می‌شود |

### ساختار رویداد DateChangeEvent

```typescript
interface DateChangeEvent {
  jalali: [number, number, number]; // [سال، ماه، روز]
  gregorian: [number, number, number]; // [سال، ماه، روز]
  isHoliday: boolean;
  events?: any[];
}
```

## پشتیبانی از سیگنال‌های انگولار

این کامپوننت از سیگنال‌های انگولار برای ورودی‌ها استفاده می‌کند، که باعث بهبود کارایی در انگولار ۱۷+ می‌شود. برای حفظ سازگاری با نسخه‌های قبلی، هم نام اصلی خاصیت (مانند `showHolidays`) و هم نام قدیمی با پسوند (مانند `showHolidaysInput`) پشتیبانی می‌شوند.

## مجوز

MIT 