# Persian Datepicker React Component

A modern, fully-featured Persian (Jalali) date picker component for React applications.

## Features

- 🎨 Fully customizable theme
- 📱 Responsive design
- 🔤 RTL support
- 📅 Holiday highlighting
- 🎯 Range picker mode
- ⌨️ Keyboard navigation
- 🎭 Custom holiday types
- 🚫 Disabled dates support
- 📋 Min/Max date restrictions
- 🎨 Custom scrollbar styling

## Installation

```bash
npm install persian-datepicker-react
# or
yarn add persian-datepicker-react
```

## Basic Usage

```jsx
import { PersianDatepicker } from 'persian-datepicker-react';

function App() {
  const handleDateChange = (event) => {
    const { jalali, gregorian, isHoliday } = event.detail;
    console.log('Selected date:', jalali);
  };

  return (
    <PersianDatepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      onChange={handleDateChange}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \| number[] | - | Selected date value |
| placeholder | string | '' | Input placeholder text |
| format | string | 'YYYY/MM/DD' | Date format pattern |
| showEvents | boolean | true | Show holiday indicators |
| rtl | boolean | true | Right-to-left layout |
| disabled | boolean | false | Disable the datepicker |
| minDate | [number, number, number] | - | Minimum selectable date [year, month, day] |
| maxDate | [number, number, number] | - | Maximum selectable date [year, month, day] |
| disabledDates | string \| Function | - | Dates to disable (string pattern or function) |
| eventTypes | string \| string[] | - | Types of holidays to highlight |
| rangeMode | boolean | false | Enable range selection mode |
| rangeStart | [number, number, number] | - | Start date for range selection |
| rangeEnd | [number, number, number] | - | End date for range selection |

## Theme Customization

```jsx
<PersianDatepicker
  primaryColor="#1a73e8"
  primaryHover="#1557b0"
  backgroundColor="#ffffff"
  foregroundColor="#333333"
  borderColor="#e0e0e0"
  borderRadius="8px"
  fontFamily="IRANSans"
  holidayColor="#ff4d4f"
  holidayBg="#fff1f0"
  scrollbarWidth="8px"
  scrollbarThumbColor="#c1c1c1"
  scrollbarThumbHoverColor="#a8a8a8"
  scrollbarTrackColor="#f1f1f1"
  scrollbarBorderRadius="4px"
/>
```

## Methods

Access component methods using a ref:

```jsx
const datepickerRef = useRef();

// Available methods
datepickerRef.current.getValue();
datepickerRef.current.setValue(year, month, day);
datepickerRef.current.open();
datepickerRef.current.close();
datepickerRef.current.setRange(startDate, endDate);
datepickerRef.current.getRange();
datepickerRef.current.clear();
```

## Events

| Event | Description |
|-------|-------------|
| onChange | Fired when date selection changes |
| onOpen | Fired when datepicker opens |
| onClose | Fired when datepicker closes |

## Range Picker Example

```jsx
<PersianDatepicker
  rangeMode={true}
  rangeStart={[1402, 1, 1]}
  rangeEnd={[1402, 1, 15]}
  onChange={handleRangeChange}
/>
```

---

<div dir="rtl">

# کامپوننت React تقویم شمسی

یک کامپوننت مدرن و کامل انتخاب تاریخ شمسی (جلالی) برای برنامه‌های React

## ویژگی‌ها

- 🎨 قابلیت شخصی‌سازی کامل ظاهر
- 📱 طراحی واکنش‌گرا
- 🔤 پشتیبانی از RTL
- 📅 نمایش تعطیلات
- 🎯 حالت انتخاب بازه
- ⌨️ پیمایش با کیبورد
- 🎭 انواع تعطیلات سفارشی
- 🚫 پشتیبانی از تاریخ‌های غیرفعال
- 📋 محدودیت حداقل/حداکثر تاریخ
- 🎨 شخصی‌سازی نوار اسکرول

## نصب

```bash
npm install persian-datepicker-react
# یا
yarn add persian-datepicker-react
```

## استفاده پایه

```jsx
import { PersianDatepicker } from 'persian-datepicker-react';

function App() {
  const handleDateChange = (event) => {
    const { jalali, gregorian, isHoliday } = event.detail;
    console.log('تاریخ انتخاب شده:', jalali);
  };

  return (
    <PersianDatepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      onChange={handleDateChange}
    />
  );
}
```

## پراپ‌ها

| پراپ | نوع | پیش‌فرض | توضیحات |
|------|------|---------|-------------|
| value | string \| number[] | - | مقدار تاریخ انتخاب شده |
| placeholder | string | '' | متن پیش‌فرض ورودی |
| format | string | 'YYYY/MM/DD' | الگوی نمایش تاریخ |
| showEvents | boolean | true | نمایش نشانگر تعطیلات |
| rtl | boolean | true | چیدمان راست به چپ |
| disabled | boolean | false | غیرفعال کردن تقویم |
| minDate | [number, number, number] | - | حداقل تاریخ قابل انتخاب [سال، ماه، روز] |
| maxDate | [number, number, number] | - | حداکثر تاریخ قابل انتخاب [سال، ماه، روز] |
| disabledDates | string \| Function | - | تاریخ‌های غیرفعال (الگو یا تابع) |
| eventTypes | string \| string[] | - | انواع تعطیلات برای نمایش |
| rangeMode | boolean | false | فعال‌سازی حالت انتخاب بازه |
| rangeStart | [number, number, number] | - | تاریخ شروع بازه |
| rangeEnd | [number, number, number] | - | تاریخ پایان بازه |

## شخصی‌سازی ظاهر

```jsx
<PersianDatepicker
  primaryColor="#1a73e8"
  primaryHover="#1557b0"
  backgroundColor="#ffffff"
  foregroundColor="#333333"
  borderColor="#e0e0e0"
  borderRadius="8px"
  fontFamily="IRANSans"
  holidayColor="#ff4d4f"
  holidayBg="#fff1f0"
  scrollbarWidth="8px"
  scrollbarThumbColor="#c1c1c1"
  scrollbarThumbHoverColor="#a8a8a8"
  scrollbarTrackColor="#f1f1f1"
  scrollbarBorderRadius="4px"
/>
```

## متدها

دسترسی به متدهای کامپوننت با استفاده از ref:

```jsx
const datepickerRef = useRef();

// متدهای در دسترس
datepickerRef.current.getValue();
datepickerRef.current.setValue(year, month, day);
datepickerRef.current.open();
datepickerRef.current.close();
datepickerRef.current.setRange(startDate, endDate);
datepickerRef.current.getRange();
datepickerRef.current.clear();
```

## رویدادها

| رویداد | توضیحات |
|--------|----------|
| onChange | هنگام تغییر تاریخ انتخاب شده |
| onOpen | هنگام باز شدن تقویم |
| onClose | هنگام بسته شدن تقویم |

## مثال انتخاب بازه

```jsx
<PersianDatepicker
  rangeMode={true}
  rangeStart={[1402, 1, 1]}
  rangeEnd={[1402, 1, 15]}
  onChange={handleRangeChange}
/>
```

</div>
