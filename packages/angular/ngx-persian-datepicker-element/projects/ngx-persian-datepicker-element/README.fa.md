# دیت‌پیکر فارسی برای انگولار

کامپوننت انگولار برای دیت‌پیکر فارسی، یک تقویم زیبای فارسی (جلالی) همراه با پشتیبانی از انواع تعطیلات.

## ویژگی‌ها

✅ کامپوننت انگولار ساده برای استفاده  
✅ پشتیبانی از سیگنال‌های انگولار (انگولار ۱۷+)  
✅ یکپارچه‌سازی با فرم‌های ری‌اکتیو  
✅ تقویم فارسی (جلالی)  
✅ پشتیبانی از انواع تعطیلات (ایران، افغانستان، مذهبی و غیره)  
✅ پشتیبانی از حالت تاریک  
✅ پشتیبانی کامل از چینش راست به چپ (RTL)  
✅ امکان شخصی‌سازی ظاهر  
✅ پشتیبانی کامل از تایپ‌اسکریپت  
✅ بدون نیاز به CDN - کامپوننت وب به همراه کتابخانه ارائه می‌شود

## نصب

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# یا
yarn add ngx-persian-datepicker-element persian-datepicker-element
# یا
pnpm add ngx-persian-datepicker-element persian-datepicker-element
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
  placeholderInput="انتخاب تاریخ" 
  formatInput="YYYY/MM/DD" 
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
  placeholderInput="انتخاب تاریخ" 
  formatInput="YYYY/MM/DD" 
  [showEventsInput]="true" 
  [eventTypesInput]="['Iran', 'Religious']"
  (dateChange)="onDateChange($event)">
</ngx-persian-datepicker-element>

<!-- استفاده از نام‌های قدیمی (سازگار با تمام نسخه‌های انگولار) -->
<ngx-persian-datepicker-element 
  placeholderInput="انتخاب تاریخ" 
  formatInput="YYYY/MM/DD" 
  [showEventsInput]="true" 
  [eventTypesInput]="['Iran', 'Religious']"
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

### پشتیبانی از حالت تاریک

دیت‌پیکر به طور کامل از حالت تاریک پشتیبانی می‌کند و شما می‌توانید آن را به دو روش پیاده‌سازی کنید:

#### روش ۱: استفاده از کلاس‌های CSS

```css
/* استایل‌های حالت روشن (پیش‌فرض) */
:root {
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  /* سایر متغیرها */
}

/* استایل‌های حالت تاریک */
.dark persian-datepicker-element {
  --jdp-background: #1e1e2f;
  --jdp-foreground: #e2e8f0;
  --jdp-muted: #334155;
  --jdp-muted-foreground: #94a3b8;
  --jdp-border: #475569;
  --jdp-input-border-color: #475569;
  --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
  --jdp-day-hover-bg: #334155;
  /* سایر متغیرهای حالت تاریک */
}
```

```html
<div [ngClass]="{'dark': isDarkMode}">
  <button (click)="toggleDarkMode()">تغییر حالت تاریک</button>
  <ngx-persian-datepicker-element></ngx-persian-datepicker-element>
</div>
```

#### روش ۲: تغییر برنامه‌ای استایل‌ها

```typescript
@Component({
  // ...
})
export class AppComponent implements AfterViewInit {
  @ViewChild('datepicker') datepicker!: NgxPersianDatepickerComponent;
  isDarkMode = false;

  // متغیرهای حالت تاریک
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

  // متغیرهای حالت روشن
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
    
    // اعمال متغیرها به دیت‌پیکر
    if (this.datepicker) {
      this.datepicker.applyThemeVariables(themeVars);
    }
  }
}
```

#### تشخیص خودکار حالت تاریک سیستم

```typescript
constructor() {
  // بررسی ترجیحات سیستم
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  this.isDarkMode = mediaQuery.matches;
  
  // گوش دادن به تغییرات
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

### پشتیبانی از راست به چپ (RTL)

دیت‌پیکر به طور کامل از چینش راست به چپ برای زبان‌های فارسی و عربی پشتیبانی می‌کند:

#### استفاده از ویژگی rtlInput

```html
<ngx-persian-datepicker-element
  [rtlInput]="true"
  placeholderInput="انتخاب تاریخ">
</ngx-persian-datepicker-element>
```

#### تنظیم RTL برای کل برنامه

```html
<!-- در app.component.html -->
<div dir="rtl">
  <!-- محتوای برنامه -->
  <ngx-persian-datepicker-element></ngx-persian-datepicker-element>
</div>
```

یا با استفاده از binding انگولار:

```html
<div [dir]="'rtl'">
  <!-- محتوای برنامه -->
</div>
```

### شخصی‌سازی ظاهر

```html
<ngx-persian-datepicker-element 
  placeholderInput="تاریخ سفارشی" 
  formatInput="YYYY/MM/DD"
  primaryColorInput="#9c27b0" 
  primaryHoverInput="#7b1fa2"
  backgroundColorInput="#f5f0fa"
  foregroundColorInput="#333"
  borderColorInput="#ddd"
  borderRadiusInput="12px"
  holidayColorInput="#e91e63"
  holidayBgInput="#ffe6ec"
  [showEventsInput]="true">
</ngx-persian-datepicker-element>
```

## API

### ورودی‌ها (Inputs)

| ویژگی | نوع | توضیحات |
|----------|------|-------------|
| `placeholder` / `placeholderInput` | `string` | متن راهنما برای ورودی |
| `format` / `formatInput` | `string` | قالب تاریخ (به عنوان مثال 'YYYY/MM/DD') |
| `showEvents` / `showEventsInput` | `boolean` | نمایش تعطیلات در تقویم |
| `eventTypes` / `eventTypesInput` | `string` یا `string[]` | انواع تعطیلات برای نمایش (مانند 'Iran'، 'Religious'، 'National'، 'Afghanistan' یا 'all') |
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

این کامپوننت از سیگنال‌های انگولار برای ورودی‌ها استفاده می‌کند، که باعث بهبود کارایی در انگولار ۱۷+ می‌شود. برای حفظ سازگاری با نسخه‌های قبلی، هم نام اصلی خاصیت (مانند `showEvents`) و هم نام قدیمی با پسوند (مانند `showEventsInput`) پشتیبانی می‌شوند.

## مجوز

MIT 