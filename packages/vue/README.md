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
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const handleChange = (event) => {
  const { jalali, gregorian, isHoliday } = event.detail;
  console.log('Selected date:', jalali);
};
</script>
```

## Advanced Examples

### With v-model

```vue
<template>
  <PersianDatepicker
    v-model="selectedDate"
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
  />
</template>

<script setup>
import { ref } from 'vue';
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const selectedDate = ref('');
</script>
```

### With Date Limits

```vue
<template>
  <PersianDatepicker
    :min-date="[1400, 1, 1]"
    :max-date="[1402, 12, 29]"
    :disabled-dates="isWeekend"
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
  />
</template>

<script setup>
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const isWeekend = (year, month, day) => {
  // Disable weekends (Friday and Saturday)
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6;
};
</script>
```

### With Range Selection

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
import { ref } from 'vue';
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const dateRange = ref({ start: null, end: null });

const handleRangeChange = (event) => {
  if (event.detail.isRange) {
    dateRange.value = {
      start: event.detail.range.start,
      end: event.detail.range.end
    };
  }
};
</script>
```

### With Custom Styling

```vue
<template>
  <PersianDatepicker
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
    class="custom-datepicker"
  />
</template>

<script setup>
import { PersianDatepicker } from 'vue-persian-datepicker-element';
</script>

<style>
.custom-datepicker {
  --jdp-primary: #3b82f6;
  --jdp-primary-hover: #2563eb;
  --jdp-border-radius: 0.5rem;
  --jdp-font-family: 'IRANSans', sans-serif;
}
</style>
```

### With Holiday Types

```vue
<template>
  <div>
    <PersianDatepicker
      event-types="Iran,Afghanistan,AncientIran,International"
      placeholder="نمایش همه تعطیلات"
    />

    <PersianDatepicker
      event-types="Afghanistan"
      placeholder="تعطیلات افغانستان"
    />

    <PersianDatepicker
      event-types="all"
      placeholder="نمایش همه انواع تعطیلات"
    />
  </div>
</template>

<script setup>
import { PersianDatepicker } from 'vue-persian-datepicker-element';
</script>
```

### With Ref Methods

```vue
<template>
  <div>
    <PersianDatepicker ref="datepicker" />
    
    <div style="margin-top: 1rem">
      <button @click="getValue">دریافت مقدار</button>
      <button @click="setValue">تنظیم به ۱۵ دی ۱۴۰۲</button>
      <button @click="openCalendar">باز کردن تقویم</button>
      <button @click="closeCalendar">بستن تقویم</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PersianDatepicker } from 'vue-persian-datepicker-element';

const datepicker = ref();

const getValue = () => {
  const value = datepicker.value?.getValue();
  console.log('مقدار فعلی:', value);
};

const setValue = () => {
  // تنظیم تاریخ به ۱۵ دی ۱۴۰۲
  datepicker.value?.setValue(1402, 10, 15);
};

const openCalendar = () => {
  datepicker.value?.open();
};

const closeCalendar = () => {
  datepicker.value?.close();
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
| showTime | boolean | false | Show the time picker inside the calendar |
| timeFormat | string | 'HH:mm' | Time format. Tokens: `HH` (24h), `hh` (12h), `mm`, `ss`, `A` (AM/PM) |
| defaultTime | TimeTuple | - | Default selected time |
| minuteStep | number | 1 | Interval in minutes for the minutes dropdown |

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
datepicker.value?.setTime(9, 45, 30);
datepicker.value?.getTime();
</script>
```

## Events

| Event | Description |
|-------|-------------|
| change | Fired when date selection changes |
| update:modelValue | v-model update event |

## Theme Customization

You can customize the appearance using standard CSS:

```vue
<style>
.persian-datepicker {
  /* Add your custom styles here */
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
import { PersianDatepicker } from 'vue-persian-datepicker-element';

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
| showTime | boolean | false | نمایش انتخابگر ساعت در کنار تقویم |
| timeFormat | string | 'HH:mm' | الگوی نمایش ساعت. توکن‌ها: `HH` (۲۴ ساعته)، `hh` (۱۲ ساعته)، `mm`، `ss`، `A` |
| defaultTime | TimeTuple | - | ساعت پیش‌فرض |
| minuteStep | number | 1 | فاصله بین گزینه‌های دقیقه |

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
datepicker.value?.setTime(9, 45, 30);
datepicker.value?.getTime();
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
  /* Add your custom styles here */
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