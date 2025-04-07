# Persian Datepicker Vue Component

A modern, fully-featured Persian (Jalali) date picker component for Vue 3 applications.

## Features

- 🎨 Fully customizable theme via CSS variables
- 📱 Responsive design
- 🔤 RTL support
- 📅 Holiday highlighting
- 🎯 Range picker mode
- ⌨️ Keyboard navigation
- 🎭 Custom holiday types
- 🚫 Disabled dates support
- 📋 Min/Max date restrictions

## Installation

```bash
npm install vue-persian-datepicker-element persian-datepicker-element
# or
yarn add vue-persian-datepicker-element persian-datepicker-element
# or
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

## Basic Usage

```vue
<template>
  <PersianDatepicker
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
    @change="handleChange"
  />
</template>

<script setup>
import { PersianDatepicker } from 'persian-datepicker-vue';

const handleChange = (event) => {
  const { jalali, gregorian, isHoliday } = event.detail;
  console.log('Selected date:', jalali);
};
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string \| DateTuple | - | v-model value |
| placeholder | string | '' | Input placeholder text |
| format | string | 'YYYY/MM/DD' | Date format pattern |
| showEvents | boolean | true | Show holiday indicators |
| rtl | boolean | true | Right-to-left layout |
| minDate | DateTuple | - | Minimum selectable date [year, month, day] |
| maxDate | DateTuple | - | Maximum selectable date [year, month, day] |
| disabledDates | string \| Function | - | Dates to disable (string pattern or function) |
| eventTypes | string \| string[] | - | Types of holidays to highlight |
| rangeMode | boolean | false | Enable range selection mode |
| rangeStart | DateTuple | - | Start date for range selection |
| rangeEnd | DateTuple | - | End date for range selection |
| defaultDate | DateTuple | - | Initial date to display |

## Methods

Access component methods using a ref:

```vue
<template>
  <PersianDatepicker ref="datepicker" />
</template>

<script setup>
const datepicker = ref();

// Available methods
datepicker.value?.getValue();
datepicker.value?.setValue(year, month, day);
datepicker.value?.open();
datepicker.value?.close();
datepicker.value?.setRange(startDate, endDate);
datepicker.value?.getRange();
datepicker.value?.clear();
</script>
```

## Events

| Event | Description |
|-------|-------------|
| change | Fired when date selection changes |
| update:modelValue | v-model update event |

## Theme Customization

Customize the appearance using CSS variables:

```vue
<style>
.persian-datepicker {
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
</style>
```

## Range Picker Example

```vue
<template>
  <PersianDatepicker
    range-mode
    :range-start="[1402, 1, 1]"
    :range-end="[1402, 1, 15]"
    @change="handleRangeChange"
  />
</template>

<script setup>
const handleRangeChange = (event) => {
  const { range } = event.detail;
  console.log('Selected range:', range);
};
</script>
```

---

<div dir="rtl">

# کامپوننت Vue تقویم شمسی

یک کامپوننت مدرن و کامل انتخاب تاریخ شمسی (جلالی) برای برنامه‌های Vue 3

## ویژگی‌ها

- 🎨 قابلیت شخصی‌سازی کامل ظاهر با متغیرهای CSS
- 📱 طراحی واکنش‌گرا
- 🔤 پشتیبانی از RTL
- 📅 نمایش تعطیلات
- 🎯 حالت انتخاب بازه
- ⌨️ پیمایش با کیبورد
- 🎭 انواع تعطیلات سفارشی
- 🚫 پشتیبانی از تاریخ‌های غیرفعال
- 📋 محدودیت حداقل/حداکثر تاریخ

## نصب

```bash
npm install vue-persian-datepicker-element persian-datepicker-element
# یا
yarn add vue-persian-datepicker-element persian-datepicker-element
# یا
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

## استفاده پایه

```vue
<template>
  <PersianDatepicker
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
    @change="handleChange"
  />
</template>

<script setup>
import { PersianDatepicker } from 'persian-datepicker-vue';

const handleChange = (event) => {
  const { jalali, gregorian, isHoliday } = event.detail;
  console.log('تاریخ انتخاب شده:', jalali);
};
</script>
```

## پراپ‌ها

| پراپ | نوع | پیش‌فرض | توضیحات |
|------|------|---------|-------------|
| modelValue | string \| DateTuple | - | مقدار v-model |
| placeholder | string | '' | متن پیش‌فرض ورودی |
| format | string | 'YYYY/MM/DD' | الگوی نمایش تاریخ |
| showEvents | boolean | true | نمایش نشانگر تعطیلات |
| rtl | boolean | true | چیدمان راست به چپ |
| minDate | DateTuple | - | حداقل تاریخ قابل انتخاب [سال، ماه، روز] |
| maxDate | DateTuple | - | حداکثر تاریخ قابل انتخاب [سال، ماه، روز] |
| disabledDates | string \| Function | - | تاریخ‌های غیرفعال (الگو یا تابع) |
| eventTypes | string \| string[] | - | انواع تعطیلات برای نمایش |
| rangeMode | boolean | false | فعال‌سازی حالت انتخاب بازه |
| rangeStart | DateTuple | - | تاریخ شروع بازه |
| rangeEnd | DateTuple | - | تاریخ پایان بازه |
| defaultDate | DateTuple | - | تاریخ اولیه برای نمایش |

## متدها

دسترسی به متدهای کامپوننت با استفاده از ref:

```vue
<template>
  <PersianDatepicker ref="datepicker" />
</template>

<script setup>
const datepicker = ref();

// متدهای در دسترس
datepicker.value?.getValue();
datepicker.value?.setValue(year, month, day);
datepicker.value?.open();
datepicker.value?.close();
datepicker.value?.setRange(startDate, endDate);
datepicker.value?.getRange();
datepicker.value?.clear();
</script>
```

## رویدادها

| رویداد | توضیحات |
|--------|----------|
| change | هنگام تغییر تاریخ انتخاب شده |
| update:modelValue | رویداد به‌روزرسانی v-model |

## شخصی‌سازی ظاهر

شخصی‌سازی ظاهر با استفاده از متغیرهای CSS:

```vue
<style>
.persian-datepicker {
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
</style>
```

## مثال انتخاب بازه

```vue
<template>
  <PersianDatepicker
    range-mode
    :range-start="[1402, 1, 1]"
    :range-end="[1402, 1, 15]"
    @change="handleRangeChange"
  />
</template>

<script setup>
const handleRangeChange = (event) => {
  const { range } = event.detail;
  console.log('بازه انتخاب شده:', range);
};
</script>
```

</div> 