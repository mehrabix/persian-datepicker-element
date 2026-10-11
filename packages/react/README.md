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
npm install react-persian-datepicker-element persian-datepicker-element
# or
yarn add react-persian-datepicker-element persian-datepicker-element
# or
pnpm add react-persian-datepicker-element persian-datepicker-element
```

## Basic Usage

```jsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

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

## Advanced Examples

### With Two-way Binding

```jsx
import { useState } from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <PersianDatepicker
      value={selectedDate}
      onChange={(event) => setSelectedDate(event.detail.formattedDate)}
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
    />
  );
}
```

### With Date Limits

```jsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  return (
    <PersianDatepicker
      minDate={[1400, 1, 1]}
      maxDate={[1402, 12, 29]}
      disabledDates={(year, month, day) => {
        // Disable weekends (Friday and Saturday)
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 5 || dayOfWeek === 6;
      }}
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
    />
  );
}
```

### With Range Selection

```jsx
import { useState } from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleRangeChange = (event) => {
    if (event.detail.isRange) {
      setDateRange({
        start: event.detail.range.start,
        end: event.detail.range.end
      });
    }
  };

  return (
    <PersianDatepicker
      rangeMode={true}
      onChange={handleRangeChange}
      placeholder="انتخاب بازه تاریخ"
      format="YYYY/MM/DD"
    />
  );
}
```

### With Custom Styling

```jsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  return (
    <PersianDatepicker
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      className="custom-datepicker"
    />
  );
}
```

### With Holiday Types

```jsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

function App() {
  return (
    <div>
      <PersianDatepicker
        eventTypes="Iran,Afghanistan,AncientIran,International"
        placeholder="نمایش همه تعطیلات"
      />

      <PersianDatepicker
        eventTypes="Afghanistan"
        placeholder="تعطیلات افغانستان"
      />

      <PersianDatepicker
        eventTypes="all"
        placeholder="نمایش همه انواع تعطیلات"
      />
    </div>
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
| showTime | boolean | false | Show the time picker inside the calendar |
| timeFormat | string | 'HH:mm' | Time format. Tokens: `HH` (24h), `hh` (12h), `mm`, `ss`, `A` (AM/PM) |
| defaultTime | [number, number] \| [number, number, number] | [0,0,0] | Default selected time |
| minuteStep | number | 1 | Interval in minutes for the minutes dropdown |

## Theme Customization

You can customize the appearance using standard CSS:

```jsx
<PersianDatepicker
  className="custom-datepicker"
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
/>
```

With CSS:
```css
.custom-datepicker {
  /* Add your custom styles here */
}
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
datepickerRef.current.setTime(9, 45, 30);
datepickerRef.current.getTime();
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
npm install react-persian-datepicker-element persian-datepicker-element
# یا
yarn add react-persian-datepicker-element persian-datepicker-element
# یا
pnpm add react-persian-datepicker-element persian-datepicker-element
```

## استفاده پایه

```jsx
import { PersianDatepicker } from 'react-persian-datepicker-element';

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
| showTime | boolean | false | نمایش انتخابگر ساعت در کنار تقویم |
| timeFormat | string | 'HH:mm' | الگوی نمایش ساعت. توکن‌ها: `HH` (۲۴ ساعته)، `hh` (۱۲ ساعته)، `mm`، `ss`، `A` |
| defaultTime | [number, number] \| [number, number, number] | [0,0,0] | ساعت پیش‌فرض |
| minuteStep | number | 1 | فاصله بین گزینه‌های دقیقه |

## شخصی‌سازی ظاهر

شما می‌توانید ظاهر کامپوننت را با استفاده از CSS استاندارد شخصی‌سازی کنید:

```jsx
<PersianDatepicker
  className="custom-datepicker"
  placeholder="انتخاب تاریخ"
  format="YYYY/MM/DD"
/>
```

با CSS:
```css
.custom-datepicker {
  /* استایل‌های سفارشی خود را اینجا اضافه کنید */
}
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
datepickerRef.current.setTime(9, 45, 30);
datepickerRef.current.getTime();
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
