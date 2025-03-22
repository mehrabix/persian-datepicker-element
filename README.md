# Persian Date Picker Element | تقویم انتخاب تاریخ شمسی

یک کامپوننت وب مدرن و قابل شخصی‌سازی برای انتخاب تاریخ شمسی با طراحی مشابه کامپوننت‌های shadcn.

## Features | ویژگی‌ها

- Clean, modern UI similar to shadcn components
- Accurate Persian (Shamsi) calendar with proper month lengths and leap years
- Full RTL support
- Iranian holidays and events display with customization options
- Highly customizable styling with CSS variables
- Lightweight and dependency-free
- Works with any framework or vanilla JavaScript
- TypeScript support

<div dir="rtl">

- رابط کاربری تمیز و مدرن مشابه کامپوننت‌های shadcn
- تقویم شمسی دقیق با طول ماه‌های صحیح و سال‌های کبیسه
- پشتیبانی کامل از راست به چپ (RTL)
- نمایش تعطیلات و رویدادهای ایران با قابلیت شخصی‌سازی
- قابلیت شخصی‌سازی بالا با متغیرهای CSS
- سبک و بدون وابستگی
- سازگار با هر فریم‌ورک یا جاوااسکریپت خالص
- پشتیبانی از TypeScript

</div>

## Installation | نصب

Install with npm:
```bash
npm install persian-datepicker-element
```

Or with yarn:
```bash
yarn add persian-datepicker-element
```

Or with pnpm:
```bash
pnpm add persian-datepicker-element
```

<div dir="rtl">

### نصب با npm:
```bash
npm install persian-datepicker-element
```

### یا با yarn:
```bash
yarn add persian-datepicker-element
```

### یا با pnpm:
```bash
pnpm add persian-datepicker-element
```
</div>

## Usage

### Basic Usage

```html
<!-- Include the script -->
<script src="node_modules/persian-datepicker-element/dist/persian-datepicker-element.min.js"></script>

<!-- Use the component -->
<persian-datepicker-element></persian-datepicker-element>
```

### With ES Modules

```javascript
// Import the component
import 'persian-datepicker-element';

// Use it in your HTML
// <persian-datepicker-element></persian-datepicker-element>
```

### With TypeScript

```typescript
import { PersianDatePickerElement, PersianDate } from 'persian-datepicker-element';

// Access to the class for type checking or programmatic usage
const datePicker = document.querySelector('persian-datepicker-element') as PersianDatePickerElement;

// Programmatically set a date (year, month, day)
datePicker.setValue(1402, 12, 25);

// Get the selected date
const selectedDate = datePicker.getValue(); // Returns [year, month, day] or null
```

### Using DateTuple Type

```typescript
import { PersianDate, type DateTuple } from 'persian-datepicker-element';

// Convert Gregorian to Persian
const gregorianDate = new Date(2023, 11, 25); // December 25, 2023
const [year, month, day]: DateTuple = PersianDate.gregorianToPersian(
  gregorianDate.getFullYear(), 
  gregorianDate.getMonth() + 1, 
  gregorianDate.getDate()
);
console.log(`Persian date: ${year}/${month}/${day}`); // Output: Persian date: 1402/10/4

// Convert Persian to Gregorian
const persianDate: DateTuple = [1402, 12, 25]; // 1402/12/25 (Persian)
const [gYear, gMonth, gDay] = PersianDate.persianToGregorian(...persianDate);
const date = new Date(gYear, gMonth - 1, gDay);
console.log(`Gregorian date: ${date.toLocaleDateString()}`); // Output: Gregorian date: 3/15/2024
```

## Attributes

You can customize the date picker using the following attributes:

```html
<persian-datepicker-element
  placeholder="انتخاب تاریخ تولد"
  format="YYYY/MM/DD"
  primary-color="#0891b2"
  primary-hover="#0e7490"
  background-color="#ffffff"
  foreground-color="#1e293b"
  border-color="#e2e8f0"
  border-radius="0.5rem"
  font-family="Vazir, sans-serif"
  rtl="true"
  holiday-types="Iran,Religious"
  show-holidays="true"
></persian-datepicker-element>
```

| Attribute          | Type    | Default         | Description                              |
|--------------------|---------|-----------------|------------------------------------------|
| `placeholder`      | String  | "انتخاب تاریخ"    | Input placeholder text                   |
| `format`           | String  | "YYYY/MM/DD"    | Date format                              |
| `primary-color`    | String  | "#0891b2"       | Primary color for selections             |
| `primary-hover`    | String  | "#0e7490"       | Hover color for interactive elements     |
| `background-color` | String  | "#ffffff"       | Background color of the component        |
| `foreground-color` | String  | "#1e293b"       | Text color of the component              |
| `border-color`     | String  | "#e2e8f0"       | Border color for elements                |
| `border-radius`    | String  | "0.5rem"        | Border radius for rounded corners        |
| `font-family`      | String  | System fonts    | Font family for text                     |
| `rtl`              | Boolean | true            | Right-to-left support                    |
| `show-holidays`    | Boolean | true            | Show holiday indicators                  |
| `holiday-types`    | String  | "Iran,Religious"| Comma-separated list of holiday types    |

## Events

The component dispatches a `change` event when a date is selected:

```javascript
document.querySelector('persian-datepicker-element').addEventListener('change', (event) => {
  const { jalali, gregorian, isHoliday, events } = event.detail;
  console.log('Selected Jalali date:', jalali); // [year, month, day]
  console.log('Equivalent Gregorian date:', gregorian); // [year, month, day]
  console.log('Is this date a holiday?', isHoliday);
  console.log('Events on this date:', events);
});
```

## Holiday Types Feature

The datepicker supports filtering holidays by type:

```html
<!-- Show only Iranian holidays -->
<persian-datepicker-element holiday-types="Iran"></persian-datepicker-element>

<!-- Show only religious holidays -->
<persian-datepicker-element holiday-types="Religious"></persian-datepicker-element>

<!-- Show multiple holiday types -->
<persian-datepicker-element holiday-types="Iran,Religious,International"></persian-datepicker-element>

<!-- Show all holiday types, including those normally excluded (like Afghanistan) -->
<persian-datepicker-element holiday-types="all"></persian-datepicker-element>
```

By default, the component shows holidays of types "Iran" and "Religious", and excludes "Afghanistan" holidays. You can customize this behavior programmatically:

```javascript
// Set holiday types
datePicker.setHolidayTypes(['Iran', 'Religious']); // Array format
datePicker.setHolidayTypes('Iran,Religious');      // String format
datePicker.setHolidayTypes('all');                 // Special value to include all types

// Get current holiday types
const types = datePicker.getHolidayTypes();

// Check if all types are being shown (including excluded types)
const showingAll = datePicker.isShowingAllTypes();
```

### Available Holiday Types

The component includes the following holiday types:

- `Iran`: Official Iranian holidays
- `Religious`: Islamic religious occasions
- `International`: International days and events
- `Afghanistan`: Afghanistan-specific holidays (excluded by default)

## PersianDate Utility

The package also exports a `PersianDate` utility for converting between Jalali and Gregorian dates:

```javascript
import { PersianDate } from 'persian-datepicker-element';

// Convert Gregorian to Jalali
const persianDate = PersianDate.gregorianToJalali(2023, 3, 21); // [1402, 1, 1]

// Convert Jalali to Gregorian
const gregorianDate = PersianDate.jalaliToGregorian(1402, 1, 1); // [2023, 3, 21]
```

## Advanced Styling | شخصی‌سازی پیشرفته

The component uses CSS variables for comprehensive styling. You can override any of these variables to customize the appearance:

این کامپوننت از متغیرهای CSS برای شخصی‌سازی جامع استفاده می‌کند. شما می‌توانید هر یک از این متغیرها را برای تغییر ظاهر بازنویسی کنید:

```css
persian-datepicker-element {
  /* Color scheme */
  --jdp-primary: #3b82f6;
  --jdp-primary-hover: #2563eb;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Holiday colors */
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
  --jdp-holiday-hover-bg: #fecaca;
  
  /* Typography */
  --jdp-font-family: 'Vazir', sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
}
```

### All Available CSS Variables | تمام متغیرهای CSS موجود

| Category | Variable | Description | توضیحات |
|----------|----------|-------------|---------|
| **Color scheme** | `--jdp-primary` | Primary color for selected items | رنگ اصلی برای آیتم‌های انتخاب شده |
| | `--jdp-primary-hover` | Hover state color for primary elements | رنگ حالت هاور برای عناصر اصلی |
| | `--jdp-primary-foreground` | Text color on primary background | رنگ متن روی پس‌زمینه اصلی |
| **Neutral colors** | `--jdp-background` | Background color | رنگ پس‌زمینه |
| | `--jdp-foreground` | Text color | رنگ متن |
| | `--jdp-muted` | Muted background color | رنگ پس‌زمینه کمرنگ |
| | `--jdp-muted-foreground` | Muted text color | رنگ متن کمرنگ |
| | `--jdp-border` | Border color | رنگ حاشیه |
| | `--jdp-ring` | Focus ring color | رنگ حلقه فوکوس |
| **Holiday colors** | `--jdp-holiday-color` | Holiday text color | رنگ متن تعطیلات |
| | `--jdp-holiday-bg` | Holiday background color | رنگ پس‌زمینه تعطیلات |
| | `--jdp-holiday-hover-bg` | Holiday hover background | رنگ پس‌زمینه هاور تعطیلات |
| **Typography** | `--jdp-font-family` | Font family | خانواده فونت |
| | `--jdp-font-size` | Base font size | اندازه پایه فونت |
| | `--jdp-line-height` | Line height | ارتفاع خط |
| | `--jdp-font-weight` | Normal font weight | وزن عادی فونت |
| | `--jdp-font-weight-medium` | Medium font weight | وزن متوسط فونت |
| | `--jdp-day-name-font-size` | Day name font size | اندازه فونت نام روز |
| | `--jdp-day-name-font-weight` | Day name font weight | وزن فونت نام روز |
| | `--jdp-day-font-size` | Day cell font size | اندازه فونت سلول روز |
| | `--jdp-day-font-weight` | Day cell font weight | وزن فونت سلول روز |
| | `--jdp-month-year-font-size` | Month/year header font size | اندازه فونت سرصفحه ماه/سال |
| | `--jdp-month-year-font-weight` | Month/year header font weight | وزن فونت سرصفحه ماه/سال |
| **Input field** | `--jdp-input-padding-x` | Horizontal padding | فاصله‌گذاری افقی |
| | `--jdp-input-padding-y` | Vertical padding | فاصله‌گذاری عمودی |
| | `--jdp-input-border-width` | Border width | عرض حاشیه |
| | `--jdp-input-border-color` | Border color | رنگ حاشیه |
| | `--jdp-input-border-radius` | Border radius | شعاع گوشه حاشیه |
| | `--jdp-input-focus-ring-width` | Focus ring width | عرض حلقه فوکوس |
| | `--jdp-input-focus-ring-color` | Focus ring color | رنگ حلقه فوکوس |
| **Calendar popup** | `--jdp-calendar-width` | Calendar popup width | عرض تقویم بازشو |
| | `--jdp-calendar-padding` | Calendar padding | فاصله‌گذاری تقویم |
| | `--jdp-calendar-border-width` | Calendar border width | عرض حاشیه تقویم |
| | `--jdp-calendar-border-color` | Calendar border color | رنگ حاشیه تقویم |
| | `--jdp-calendar-border-radius` | Calendar border radius | شعاع گوشه حاشیه تقویم |
| | `--jdp-calendar-shadow` | Calendar shadow | سایه تقویم |
| | `--jdp-calendar-z-index` | Calendar z-index | شاخص z تقویم |
| **Navigation buttons** | `--jdp-nav-button-size` | Size of nav buttons | اندازه دکمه‌های ناوبری |
| | `--jdp-nav-button-bg` | Button background | پس‌زمینه دکمه |
| | `--jdp-nav-button-bg-hover` | Button hover background | پس‌زمینه دکمه در حالت هاور |
| | `--jdp-nav-arrow-size` | Arrow size | اندازه فلش |
| | `--jdp-nav-arrow-thickness` | Arrow thickness | ضخامت فلش |
| | `--jdp-nav-arrow-color` | Arrow color | رنگ فلش |
| **Day grid** | `--jdp-day-cell-size` | Size of day cells | اندازه سلول‌های روز |
| | `--jdp-day-cell-margin` | Margin between day cells | حاشیه بین سلول‌های روز |
| | `--jdp-day-cell-border-radius` | Border radius of day cells | شعاع گوشه سلول‌های روز |
| **States** | `--jdp-day-hover-bg` | Day hover background | پس‌زمینه روز در حالت هاور |
| | `--jdp-day-selected-bg` | Selected day background | پس‌زمینه روز انتخاب شده |
| | `--jdp-day-selected-color` | Selected day text color | رنگ متن روز انتخاب شده |
| | `--jdp-day-today-border-color` | Today indicator border color | رنگ حاشیه نشانگر امروز |
| | `--jdp-day-today-border-width` | Today indicator border width | عرض حاشیه نشانگر امروز |
| | `--jdp-day-disabled-opacity` | Opacity for disabled days | شفافیت برای روزهای غیرفعال |
| **Animations** | `--jdp-transition-duration` | Duration of transitions | مدت‌زمان انتقال‌ها |
| | `--jdp-fade-from-y` | Vertical offset for fade animations | آفست عمودی برای انیمیشن‌های محو |

## Example: Custom Theme | مثال: تم سفارشی

Here's an example of a custom theme with a dark mode appearance:

در اینجا مثالی از یک تم سفارشی با ظاهر حالت تاریک آورده شده است:

```css
/* Dark Mode Theme */
persian-datepicker-element.dark-theme {
  --jdp-primary: #4f46e5;
  --jdp-primary-hover: #6366f1;
  --jdp-primary-foreground: #ffffff;
  
  --jdp-background: #1e1e2f;
  --jdp-foreground: #e2e8f0;
  --jdp-muted: #334155;
  --jdp-muted-foreground: #94a3b8;
  --jdp-border: #475569;
  --jdp-ring: #4f46e5;
  
  --jdp-holiday-color: #f87171;
  --jdp-holiday-bg: rgba(239, 68, 68, 0.15);
  --jdp-holiday-hover-bg: rgba(239, 68, 68, 0.25);
  
  --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
  --jdp-day-hover-bg: #334155;
  
  --jdp-font-family: 'Samim', 'Vazir', sans-serif;
}
```

## Advanced Customization

You can also customize the component using CSS Variable types in TypeScript:

```typescript
import { 
  PersianDatePickerElement, 
  type CSSVariableKey, 
  type CSSVariableMap 
} from 'persian-datepicker-element';

const picker = document.querySelector('persian-datepicker-element') as PersianDatePickerElement;

// Using CSSVariableKey for specific variables
picker.style.setProperty('--jdp-primary' as CSSVariableKey, '#3b82f6');

// Using CSSVariableMap to set multiple variables
const customTheme: Partial<CSSVariableMap> = {
  '--jdp-primary': '#3b82f6',
  '--jdp-primary-hover': '#2563eb',
  '--jdp-background': '#f8fafc',
  '--jdp-font-family': '"Vazir", sans-serif'
};

Object.entries(customTheme).forEach(([key, value]) => {
  picker.style.setProperty(key as CSSVariableKey, value);
});

// Setting holiday types programmatically
picker.setHolidayTypes(['Iran', 'Religious']);
```

## License | مجوز

MIT