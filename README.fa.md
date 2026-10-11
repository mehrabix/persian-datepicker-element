# کامپوننت انتخاب تاریخ شمسی

یک کامپوننت وب مدرن و قابل شخصی‌سازی برای انتخاب تاریخ شمسی (جلالی) با پشتیبانی از فریم‌ورک‌های مختلف.

## ویژگی‌ها

- 🎨 کاملاً قابل شخصی‌سازی با متغیرهای CSS
- 🌙 پشتیبانی از حالت تاریک
- 📱 سازگار با موبایل و پشتیبانی از لمس
- 🎯 یکپارچه‌سازی با فریم‌ورک‌ها (React، Vue، Angular)
- 📅 پشتیبانی از تعطیلات با انواع مختلف رویدادها (ایران، افغانستان، ایران باستان، بین‌المللی)
- 🔄 پشتیبانی از راست به چپ (RTL)
- 🎨 گزینه‌های متعدد تم
- 📦 بدون وابستگی
- 🎯 پشتیبانی از TypeScript
- 📊 حالت انتخاب بازه تاریخ
- 🚫 پشتیبانی از تاریخ‌های غیرفعال
- 🎨 قابلیت شخصی‌سازی نمایش عناصر رابط کاربری

## نصب

### کامپوننت وب

```bash
npm install persian-datepicker-element
# یا
yarn add persian-datepicker-element
# یا
pnpm add persian-datepicker-element
```

### یکپارچه‌سازی با فریم‌ورک‌ها

#### React
```bash
npm install react-persian-datepicker-element persian-datepicker-element
# یا
yarn add react-persian-datepicker-element persian-datepicker-element
# یا
pnpm add react-persian-datepicker-element persian-datepicker-element
```

#### Vue
```bash
npm install vue-persian-datepicker-element persian-datepicker-element
# یا
yarn add vue-persian-datepicker-element persian-datepicker-element
# یا
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

#### Angular
```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
# یا
yarn add ngx-persian-datepicker-element persian-datepicker-element
# یا
pnpm add ngx-persian-datepicker-element persian-datepicker-element
```

## نحوه استفاده

### کامپوننت وب

```html
<!-- وارد کردن کامپوننت -->
<script type="module" src="node_modules/persian-datepicker-element/dist/persian-datepicker-element.min.js"></script>

<!-- استفاده از کامپوننت -->
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

## ویژگی‌ها و خصوصیات

| ویژگی/خصوصیت | نوع | پیش‌فرض | توضیحات |
|---------------|------|---------|-------------|
| value | string \| [number, number, number] | - | مقدار تاریخ انتخاب شده |
| placeholder | string | - | متن راهنما |
| format | string | "YYYY/MM/DD" | فرمت تاریخ |
| show-holidays | boolean | false | نمایش نشانگرهای تعطیلی |
| holiday-types | string | "Iran,Afghanistan,AncientIran,International" | لیست انواع تعطیلات با کاما جدا شده. از "all" برای نمایش همه انواع تعطیلات استفاده کنید |
| rtl | boolean | false | چیدمان راست به چپ |
| min-date | [number, number, number] | - | حداقل تاریخ قابل انتخاب |
| max-date | [number, number, number] | - | حداکثر تاریخ قابل انتخاب |
| disabled-dates | string | - | نام تابعی که تعیین می‌کند آیا یک تاریخ باید غیرفعال باشد |
| disabled | boolean | false | غیرفعال کردن انتخابگر تاریخ |
| dark-mode | boolean | false | فعال کردن حالت تاریک |
| range-mode | boolean | false | فعال کردن حالت انتخاب بازه تاریخ |
| show-month-selector | boolean | true | نمایش انتخابگر ماه |
| show-year-selector | boolean | true | نمایش انتخابگر سال |
| show-prev-button | boolean | true | نمایش دکمه ماه قبل |
| show-next-button | boolean | true | نمایش دکمه ماه بعد |
| show-today-button | boolean | true | نمایش دکمه امروز |
| show-tomorrow-button | boolean | true | نمایش دکمه فردا |
| today-button-text | string | "امروز" | متن سفارشی برای دکمه امروز |
| tomorrow-button-text | string | "فردا" | متن سفارشی برای دکمه فردا |
| today-button-class | string | "" | کلاس‌های CSS اضافی برای دکمه امروز |
| tomorrow-button-class | string | "" | کلاس‌های CSS اضافی برای دکمه فردا |
| show-time | boolean | false | نمایش انتخابگر ساعت در کنار تقویم |
| time-format | string | "HH:mm" | الگوی نمایش ساعت. توکن‌ها: `HH` (۲۴ ساعته)، `hh` (۱۲ ساعته)، `mm`، `ss`، `A` (ق.ظ/ب.ظ) |
| default-time | `[number, number]` \| `[number, number, number]` | `[0,0,0]` | ساعت پیش‌فرض به صورت `[ساعت, دقیقه]` یا `[ساعت, دقیقه, ثانیه]` |
| minute-step | number | 1 | فاصله بین گزینه‌های دقیقه (بر حسب دقیقه) |

## رویدادها

| رویداد | نوع جزئیات | توضیحات |
|-------|-------------|-------------|
| change | { jalali: [number, number, number], gregorian: [number, number, number], isHoliday: boolean, events: Array, formattedDate: string } | در زمان انتخاب تاریخ |
| change | { range: { start: [number, number, number], end: [number, number, number] }, isRange: true } | در زمان انتخاب بازه تاریخ (در حالت بازه) |

## متدها

| متد | پارامترها | نوع برگشتی | توضیحات |
|--------|------------|-------------|-------------|
| setValue | (year: number, month: number, day: number) | void | تنظیم مقدار انتخابگر تاریخ |
| getValue | () | [number, number, number] \| null | دریافت تاریخ انتخاب شده فعلی به صورت تاپل |
| open | () | void | باز کردن تقویم انتخابگر تاریخ |
| close | () | void | بستن تقویم انتخابگر تاریخ |
| setMinDate | (year: number, month: number, day: number) | void | تنظیم حداقل تاریخ مجاز |
| setMaxDate | (year: number, month: number, day: number) | void | تنظیم حداکثر تاریخ مجاز |
| setDisabledDatesFn | (fn: (year: number, month: number, day: number) => boolean) | void | تنظیم تابعی برای تعیین تاریخ‌های غیرفعال |
| setRange | (start: [number, number, number], end: [number, number, number]) | void | تنظیم بازه تاریخ (در حالت بازه) |
| getRange | () | { start: [number, number, number] \| null, end: [number, number, number] \| null } | دریافت بازه انتخاب شده فعلی |
| clear | () | void | پاک کردن تاریخ یا بازه انتخاب شده |
| seteventTypes | (types: string \| string[]) | void | تنظیم انواع تعطیلات برای نمایش |
| geteventTypes | () | string[] | دریافت انواع تعطیلات فعلی |
| isShowingAllTypes | () | boolean | بررسی نمایش همه انواع تعطیلات |
| isSelectedDateHoliday | () | boolean | بررسی تعطیلی تاریخ انتخاب شده فعلی |
| getSelectedDateEvents | () | any[] | دریافت رویدادهای تاریخ انتخاب شده فعلی |
| setTime | (hour: number, minute: number, second?: number) | void | تنظیم مقدار ساعت |
| getTime | () | `{ hour: number, minute: number, second: number }` | دریافت مقدار ساعت فعلی |

## استفاده پیشرفته

### انتخاب بازه تاریخ

برای فعال کردن حالت انتخاب بازه تاریخ:

```html
<persian-datepicker-element range-mode></persian-datepicker-element>
```

در React:
```tsx
<PersianDatepicker rangeMode />
```

در Vue:
```vue
<PersianDatepicker :range-mode="true" />
```

در Angular:
```html
<persian-datepicker [rangeMode]="true"></persian-datepicker>
```

### شخصی‌سازی عناصر رابط کاربری

می‌توانید نمایش عناصر مختلف رابط کاربری را کنترل کنید:

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

### متن و استایل سفارشی دکمه‌ها

```html
<persian-datepicker-element
  today-button-text="برو به امروز"
  tomorrow-button-text="روز بعد"
  today-button-class="primary rounded"
  tomorrow-button-class="secondary rounded"
></persian-datepicker-element>
```

### حالت تاریک

```html
<persian-datepicker-element dark-mode></persian-datepicker-element>
```

### انتخاب تاریخ و ساعت

با ویژگی `show-time` می‌توانید انتخابگر ساعت را در کنار تقویم فعال کنید. ساعت را می‌توانید از فهرست‌های کشویی ساعت/دقیقه (و در صورت نیاز ثانیه و ق.ظ/ب.ظ) انتخاب کنید یا مستقیماً در فیلد ساعت تایپ کنید.

```html
<persian-datepicker-element
  show-time
  time-format="HH:mm"
  default-time="[13, 30]"
></persian-datepicker-element>
```

- `time-format` از توکن‌های `HH` (۲۴ ساعته)، `hh` (۱۲ ساعته)، `mm`، `ss` و `A` پشتیبانی می‌کند. برای مثال `hh:mm A` یک ساعت ۱۲ ساعته همراه با برچسب ق.ظ/ب.ظ نمایش می‌دهد.
- `minute-step` فاصله بین گزینه‌های دقیقه را تعیین می‌کند (مثلاً `15`).
- وقتی ساعت فعال است، با کلیک روی روز، تقویم باز می‌ماند تا ساعت تنظیم شود و با کلیک بیرون بسته می‌شود.
- زمان در جزئیات رویداد `change` به صورت `time` و `formattedDateTime` ارائه می‌شود و `isoString` شامل ساعت است.

```javascript
picker.addEventListener('change', (event) => {
  const { time, formattedDateTime, isoString } = event.detail;
  console.log(time);              // { hour: 13, minute: 30, second: 0 }
  console.log(formattedDateTime); // "۱۴۰۴/۰۱/۰۵ ۱۳:۳۰"
});

// دسترسی برنامه‌ای
picker.setTime(9, 45, 30);
picker.getTime(); // { hour: 9, minute: 45, second: 30 }
```

### استایل CSS سفارشی

```html
<style>
  persian-datepicker-element {
    --jdp-primary: #3b82f6;
    --jdp-font-family: 'Vazir', sans-serif;
  }
</style>
```

## تاریخ‌های غیرفعال

سه روش برای مشخص کردن تاریخ‌های غیرفعال وجود دارد:

### ۱. تابع سراسری

تعریف یک تابع در محدوده سراسری و ارجاع به آن با نام:

```html
<script>
  function isWeekend(year, month, day) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6; // غیرفعال کردن جمعه و شنبه (تعطیلات هفتگی)
  }
</script>

<persian-datepicker-element disabled-dates="isWeekend"></persian-datepicker-element>
```

### ۲. متد المان

تعریف یک متد مستقیماً روی المان پس از دریافت آن:

```html
<persian-datepicker-element id="my-picker"></persian-datepicker-element>

<script>
  const picker = document.getElementById('my-picker');
  
  // اضافه کردن یک متد به المان
  picker.isHoliday = function(year, month, day) {
    // منطق سفارشی برای تعیین تعطیلات
    return day === 13; // غیرفعال کردن روز ۱۳ هر ماه به عنوان مثال
  };
  
  // ارجاع به متد با نام
  picker.setAttribute('disabled-dates', 'isHoliday');
</script>
```

### ۳. انتساب مستقیم تابع (توصیه شده برای کاربران فریم‌ورک)

برای React، Vue یا سایر کاربران فریم‌ورک، می‌توانید مستقیماً یک تابع را ارسال کنید:

```tsx
// مثال React
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  // تعریف تابع به صورت محلی
  const isEvenDay = (year, month, day) => {
    return day % 2 === 0; // غیرفعال کردن روزهای زوج
  };

  return (
    <PersianDatepicker 
      placeholder="انتخاب تاریخ" 
      disabledDates={isEvenDay}
    />
  );
}
```

همچنین می‌توانید از متد `setDisabledDatesFn` مستقیماً استفاده کنید:

```javascript
const picker = document.getElementById('my-picker');
picker.setDisabledDatesFn((year, month, day) => {
  return day % 2 === 0; // غیرفعال کردن روزهای زوج
});
```

## متغیرهای CSS

| متغیر | پیش‌فرض | توضیحات |
|----------|---------|-------------|
| --jdp-primary | #0891b2 | رنگ اصلی |
| --jdp-primary-hover | #0e7490 | رنگ اصلی در حالت هاور |
| --jdp-primary-foreground | #ffffff | رنگ متن اصلی |
| --jdp-background | #ffffff | رنگ پس‌زمینه |
| --jdp-foreground | #1e293b | رنگ متن |
| --jdp-muted | #f1f5f9 | رنگ پس‌زمینه کمرنگ |
| --jdp-muted-foreground | #64748b | رنگ متن کمرنگ |
| --jdp-border | #e2e8f0 | رنگ حاشیه |
| --jdp-ring | #0284c7 | رنگ حلقه فوکوس |
| --jdp-holiday-color | #ef4444 | رنگ متن تعطیلات |
| --jdp-holiday-bg | #fee2e2 | رنگ پس‌زمینه تعطیلات |
| --jdp-holiday-hover-bg | #fecaca | رنگ پس‌زمینه تعطیلات در حالت هاور |
| --jdp-range-bg | rgba(8, 145, 178, 0.1) | رنگ پس‌زمینه انتخاب بازه |
| --jdp-range-color | var(--jdp-foreground) | رنگ متن انتخاب بازه |
| --jdp-range-start-bg | var(--jdp-primary) | رنگ پس‌زمینه شروع بازه |
| --jdp-range-start-color | var(--jdp-primary-foreground) | رنگ متن شروع بازه |
| --jdp-range-end-bg | var(--jdp-primary) | رنگ پس‌زمینه پایان بازه |
| --jdp-range-end-color | var(--jdp-primary-foreground) | رنگ متن پایان بازه |
| --jdp-border-radius | 0.5rem | گردی حاشیه |
| --jdp-font-family | system-ui | خانواده فونت |
| --jdp-font-size | 14px | اندازه فونت |
| --jdp-line-height | 1.5 | ارتفاع خط |
| --jdp-font-weight | 400 | وزن فونت |
| --jdp-font-weight-medium | 500 | وزن فونت متوسط |
| --jdp-day-name-font-size | 12px | اندازه فونت نام روز |
| --jdp-day-name-font-weight | 400 | وزن فونت نام روز |
| --jdp-day-font-size | 13px | اندازه فونت روز |
| --jdp-day-font-weight | 400 | وزن فونت روز |
| --jdp-month-year-font-size | 14px | اندازه فونت ماه/سال |
| --jdp-month-year-font-weight | 500 | وزن فونت ماه/سال |
| --jdp-nav-button-size | 30px | اندازه دکمه‌های ناوبری |
| --jdp-day-cell-size | 32px | اندازه سلول روز |
| --jdp-day-cell-margin | 1px | فاصله سلول روز |
| --jdp-day-cell-border-radius | var(--jdp-border-radius) | گردی حاشیه سلول روز |
| --jdp-day-hover-bg | var(--jdp-muted) | رنگ پس‌زمینه روز در حالت هاور |
| --jdp-day-selected-bg | var(--jdp-primary) | رنگ پس‌زمینه روز انتخاب شده |
| --jdp-day-selected-color | var(--jdp-primary-foreground) | رنگ متن روز انتخاب شده |
| --jdp-day-today-border-color | var(--jdp-primary) | رنگ حاشیه امروز |
| --jdp-day-today-border-width | 1px | ضخامت حاشیه امروز |
| --jdp-day-disabled-opacity | 0.4 | شفافیت روز غیرفعال |
| --jdp-transition-duration | 0.2s | مدت زمان انیمیشن |
| --jdp-direction | rtl | جهت متن (rtl یا ltr) |

## ویژگی‌های خاص فریم‌ورک‌ها

### React
- پشتیبانی کامل از TypeScript
- ارسال ref برای متدهای دستوری
- مدیریت رویدادهای React
- حالت‌های کنترل شده و کنترل نشده
- هوک‌های سفارشی برای دستکاری تاریخ

### Vue
- پشتیبانی از Vue 3 Composition API
- پشتیبانی از TypeScript
- مدیریت رویدادهای Vue
- پشتیبانی از v-model
- دستورات سفارشی برای فرمت‌بندی تاریخ

### Angular
- پشتیبانی از Angular Ivy
- پشتیبانی از TypeScript
- اتصال رویدادهای Angular
- یکپارچه‌سازی با فرم‌های واکنشی
- لوله‌های سفارشی برای فرمت‌بندی تاریخ

## پشتیبانی از موبایل

کامپوننت شامل پشتیبانی داخلی برای دستگاه‌های موبایل است:

- ژست‌های لمس برای ناوبری ماه
- راهنماهای بهینه‌شده برای موبایل
- طراحی واکنش‌گرا
- عناصر رابط کاربری مناسب برای لمس

## پشتیبانی از مرورگرها

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## عیب‌یابی

### مشکلات رایج

۱. **عدم نمایش کامپوننت**: مطمئن شوید که کامپوننت را به درستی وارد کرده‌اید و اسکریپت قبل از استفاده از کامپوننت بارگذاری شده است.

۲. **عدم اجرای رویدادها**: بررسی کنید که از نام رویداد صحیح استفاده می‌کنید و مدیریت‌کننده رویداد به درستی متصل شده است.

۳. **مشکلات استایل**: تأیید کنید که متغیرهای CSS شما به درستی تعریف شده‌اند و هیچ استایل متضادی وجود ندارد.

۴. **مشکلات فرمت تاریخ**: اطمینان حاصل کنید که رشته فرمت معتبر است و تاریخ در فرمت صحیح است.

۵. **عدم نمایش تعطیلات**: بررسی کنید که ویژگی `show-holidays` روی `true` تنظیم شده است و ویژگی `holiday-types` شامل انواع تعطیلات مورد نظر است.

### اشکال‌زدایی

برای اهداف اشکال‌زدایی، می‌توانید ثبت‌نویسی دقیق را فعال کنید:

```javascript
const picker = document.getElementById('my-picker');
picker.setAttribute('debug', 'true');
```

این کار اطلاعات اضافی را در کنسول ثبت می‌کند که می‌تواند به شناسایی مشکلات کمک کند.

## مشارکت

مشارکت‌ها مورد استقبال هستند! لطفاً [راهنمای مشارکت](CONTRIBUTING.md) ما را برای جزئیات کد رفتار و فرآیند ارسال درخواست‌های pull بخوانید.

## مجوز

این پروژه تحت مجوز MIT مجوز دارد - برای جزئیات به فایل [LICENSE](LICENSE) مراجعه کنید. 