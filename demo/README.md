# Persian Date Picker Element Demo | نمایش تقویم تاریخ شمسی

This directory contains a simple demo of the Persian Date Picker Element component.

این دایرکتوری شامل یک نمایش ساده از کامپوننت تقویم تاریخ شمسی است.

## Persian/Arabic Numbers Display | نمایش اعداد فارسی/عربی

The demo demonstrates how to properly display Persian/Arabic numbers using the Vazir font:

- Uses the `font-feature-settings: "ss02"` CSS property to activate the Persian digits feature
- Applies consistent font-weight settings (400 for normal text, 700 for headings)
- Ensures all HTML elements inherit the proper font settings
- Uses JavaScript functions to convert any numbers to Persian digits format

<div dir="rtl">

این دمو نحوه نمایش صحیح اعداد فارسی/عربی با استفاده از فونت وزیر را نشان می‌دهد:

- استفاده از خاصیت CSS با نام `font-feature-settings: "ss02"` برای فعال‌سازی ویژگی ارقام فارسی
- اعمال تنظیمات وزن فونت به صورت یکنواخت (400 برای متن عادی، 700 برای عناوین)
- اطمینان از اینکه تمام عناصر HTML تنظیمات فونت مناسب را به ارث می‌برند
- استفاده از توابع جاوااسکریپت برای تبدیل هر عدد به قالب ارقام فارسی

</div>

## Features Demonstrated | ویژگی‌های نمایش داده شده

- Basic usage of the component
- Theme switching with CSS variables
- Dark mode support
- Multiple theme options:
  - Default
  - Blue
  - Green
  - Purple
  - Red
  - Orange
  - Minimal
  - Rounded

<div dir="rtl">

- استفاده پایه از کامپوننت
- تغییر تم با متغیرهای CSS
- پشتیبانی از حالت تاریک
- گزینه‌های تم متعدد:
  - پیش‌فرض
  - آبی
  - سبز
  - بنفش
  - قرمز
  - نارنجی
  - مینیمال
  - گرد

</div>

## Running the Demo | اجرای نمایش

1. Build the component with `npm run build` or `pnpm run build`
2. Open `index.html` in a browser, or start a local server:
   ```
   npx http-server -o /demo
   ```

<div dir="rtl">

1. کامپوننت را با `npm run build` یا `pnpm run build` بسازید
2. فایل `index.html` را در مرورگر باز کنید، یا یک سرور محلی راه‌اندازی کنید:
   ```
   npx http-server -o /demo
   ```

</div>

## Framework Integration | یکپارچه‌سازی با فریمورک‌ها

### React

You can use this datepicker with React using our official wrapper:

```bash
npm install react-persian-datepicker-element persian-datepicker-element
```

```jsx
import React, { useState } from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const handleDateChange = (event) => {
    console.log('Selected date (Jalali):', event.jalali);
    console.log('Gregorian date:', event.gregorian);
    console.log('Is holiday:', event.isHoliday);
  };

  return (
    <div>
      <h1>Persian Datepicker Example</h1>
      <PersianDatepicker
        placeholder="انتخاب تاریخ"
        format="YYYY/MM/DD"
        showEvents={true}
        onChange={handleDateChange}
        cssVariables={{
          '--jdp-primary': '#3b82f6',
          '--jdp-font-feature-settings': '"ss02"',
          '--jdp-font-family': "'Vazir', sans-serif"
        }}
      />
    </div>
  );
}
```

### Vue

For Vue applications, use our Vue wrapper:

```bash
npm install vue-persian-datepicker-element persian-datepicker-element
```

```vue
<template>
  <div>
    <h1>Persian Datepicker Example</h1>
    <PersianDatepicker
      v-model="date"
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      :show-holidays="true"
      @change="handleDateChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const date = ref([1402, 12, 15]);

const handleDateChange = (event) => {
  console.log('Selected date (Jalali):', event.jalali);
  console.log('Gregorian date:', event.gregorian);
  console.log('Is holiday:', event.isHoliday);
};
</script>

<style>
:root {
  --jdp-primary: #3b82f6;
  --jdp-font-feature-settings: "ss02";
  --jdp-font-family: 'Vazir', sans-serif;
}
</style>
```

### Angular

For Angular applications, use our Angular wrapper:

```bash
npm install ngx-persian-datepicker-element persian-datepicker-element
```

```typescript
// In your component (Angular 17+)
import { NgxPersianDatepickerComponent } from 'ngx-persian-datepicker-element';

@Component({
  selector: 'app-my-component',
  template: `
    <ngx-persian-datepicker-element
      placeholderInput="انتخاب تاریخ"
      formatInput="YYYY/MM/DD"
      [showEventsInput]="true"
      [primaryColorInput]="'#3b82f6'"
      [fontFamilyInput]="'Vazir, sans-serif'"
      (dateChange)="onDateChange($event)">
    </ngx-persian-datepicker-element>
  `,
  styles: [`
    ngx-persian-datepicker-element {
      --jdp-font-feature-settings: "ss02";
    }
  `],
  imports: [NgxPersianDatepickerComponent],
  standalone: true
})
export class MyComponent {
  onDateChange(event: any) {
    console.log('Selected date (Jalali):', event.jalali);
    console.log('Gregorian date:', event.gregorian);
    console.log('Is holiday:', event.isHoliday);
  }
}
```

Or for traditional Angular module approach:

```typescript
// In your module
import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';

@NgModule({
  imports: [
    NgxPersianDatepickerModule
  ],
  // ...
})
export class YourModule { }
```

## More Examples | نمونه‌های بیشتر

For more comprehensive examples, check the [examples directory](../examples/).

برای نمونه‌های جامع‌تر، [دایرکتوری نمونه‌ها](../examples/) را بررسی کنید. 