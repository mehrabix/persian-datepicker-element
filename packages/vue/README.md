# Vue Persian Datepicker Element

A Vue 3 wrapper for the Persian Datepicker Web Component, providing a beautiful and fully customizable Jalali (Shamsi) date picker for Vue applications.

![Persian Datepicker Screenshot](https://raw.githubusercontent.com/mehrabhossain1/persian-datepicker-element/main/docs/assets/react-datepicker-screenshot.png)

## Features

- 🌙 Jalali (Solar Hijri) calendar system
- 🎨 Highly customizable with native CSS variables
- 🌈 Supports light/dark mode via CSS variables
- 🔄 Two-way binding with v-model
- 📅 Show and customize holidays and events
- 📱 Responsive and mobile-friendly
- 🌐 RTL support by default
- 🛠️ Imperative API via refs

## Installation

```bash
# Using npm
npm install vue-persian-datepicker-element persian-datepicker-element

# Using Yarn
yarn add vue-persian-datepicker-element persian-datepicker-element

# Using pnpm
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

## Basic Usage

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
  import type { DateTuple, PersianDateChangeEvent } from 'persian-datepicker-element';

  const date = ref<DateTuple>([1402, 12, 15]);

  const handleDateChange = (event: PersianDateChangeEvent) => {
    console.log('Selected date (Jalali):', event.jalali);
    console.log('Gregorian date:', event.gregorian);
    console.log('Is holiday:', event.isHoliday);
    console.log('Events:', event.events);
  };
</script>
```

## Customizing with CSS Variables

You can customize the appearance using CSS variables directly in your CSS:

```css
/* In your CSS file or style block */
:root {
  --jdp-primary: #3b82f6;
  --jdp-primary-hover: #2563eb;
  --jdp-ring: #60a5fa;
  --jdp-border-radius: 0.5rem;
}

/* For dark mode */
.dark-theme persian-datepicker-element {
  --jdp-background: #1e1e2f;
  --jdp-foreground: #e2e8f0;
  --jdp-muted: #334155;
  --jdp-muted-foreground: #94a3b8;
  --jdp-border: #475569;
  --jdp-input-border-color: #475569;
  --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
  --jdp-day-hover-bg: #334155;

  /* Input field */
  --jdp-input-bg: #1e1e2f;
  --jdp-input-text: #e2e8f0;

  /* Calendar body */
  --jdp-calendar-bg: #0f172a;
  --jdp-day-text: #e2e8f0;
}
```

## Dark Mode Support

```vue
<template>
  <div :class="{ 'dark-theme': isDarkMode }">
    <button @click="isDarkMode = !isDarkMode">
      Toggle {{ isDarkMode ? 'Light' : 'Dark' }} Mode
    </button>

    <PersianDatepicker placeholder="تاریخ را انتخاب کنید" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PersianDatepicker } from 'vue-persian-datepicker-element';

  const isDarkMode = ref(false);
</script>

<style>
  /* Define your dark theme styles as shown in the previous example */
</style>
```

## Using with Ref (Imperative API)

```vue
<template>
  <div>
    <PersianDatepicker ref="datepickerRef" placeholder="از دکمه‌ها استفاده کنید" />

    <div style="margin-top: 1rem">
      <button @click="handleGetValue">Get Value</button>
      <button @click="handleSetValue">Set to 15 Dey 1402</button>
      <button @click="handleOpenCalendar">Open Calendar</button>
      <button @click="handleCloseCalendar">Close Calendar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PersianDatepicker } from 'vue-persian-datepicker-element';

  const datepickerRef = ref<InstanceType<typeof PersianDatepicker> | null>(null);

  const handleGetValue = () => {
    const value = datepickerRef.value?.getValue();
    console.log('Current value:', value);
  };

  const handleSetValue = () => {
    datepickerRef.value?.setValue(1402, 10, 15);
  };

  const handleOpenCalendar = () => {
    datepickerRef.value?.open();
  };

  const handleCloseCalendar = () => {
    datepickerRef.value?.close();
  };
</script>
```

## Holiday Types

You can specify which types of holidays to display:

```vue
<PersianDatepicker holiday-types="Iran,Religious" placeholder="تعطیلات ایران و مذهبی" />

<PersianDatepicker holiday-types="Afghanistan" placeholder="تعطیلات افغانستان" />
```

## Props

| Prop           | Type        | Description                                                                     |
| -------------- | ----------- | ------------------------------------------------------------------------------- |
| `modelValue`   | `DateTuple` | v-model binding for the selected date                                           |
| `placeholder`  | `string`    | Input placeholder text                                                          |
| `format`       | `string`    | Date format (e.g., "YYYY/MM/DD")                                                |
| `showHolidays` | `boolean`   | Whether to show holiday indicators                                              |
| `holidayTypes` | `string`    | Types of holidays to show (comma-separated: "Iran", "Religious", "Afghanistan") |
| `rtl`          | `boolean`   | Right-to-left layout                                                            |
| `disabled`     | `boolean`   | Disable the datepicker                                                          |
| `min`          | `DateTuple` | Minimum selectable date                                                         |
| `max`          | `DateTuple` | Maximum selectable date                                                         |
| `className`    | `string`    | Custom class for the container                                                  |
| `style`        | `object`    | Custom styles for the container                                                 |

## Events

| Event               | Type                     | Description                                           |
| ------------------- | ------------------------ | ----------------------------------------------------- |
| `update:modelValue` | `DateTuple`              | Emitted when the date value changes                   |
| `change`            | `PersianDateChangeEvent` | Emitted when the date changes with full event details |

## CSS Variables for Styling

All CSS variables use the `--jdp-` prefix (Jalali DatePicker). You can customize these variables in your CSS:

| CSS Variable                   | Description                                       |
| ------------------------------ | ------------------------------------------------- |
| `--jdp-primary`                | Primary color for selected dates and focus states |
| `--jdp-primary-hover`          | Color for hover states                            |
| `--jdp-primary-foreground`     | Text color on primary background                  |
| `--jdp-background`             | Main background color                             |
| `--jdp-foreground`             | Main text color                                   |
| `--jdp-muted`                  | Muted background color for alternate elements     |
| `--jdp-muted-foreground`       | Text color for muted elements                     |
| `--jdp-border`                 | Border color                                      |
| `--jdp-input-border-color`     | Input field border color                          |
| `--jdp-input-bg`               | Input field background color                      |
| `--jdp-input-text`             | Input field text color                            |
| `--jdp-input-placeholder`      | Input placeholder text color                      |
| `--jdp-calendar-bg`            | Calendar dropdown background color                |
| `--jdp-day-hover-bg`           | Background color when hovering over a day         |
| `--jdp-holiday-color`          | Holiday text color                                |
| `--jdp-holiday-bg`             | Holiday background color                          |
| `--jdp-font-size`              | Base font size                                    |
| `--jdp-font-family`            | Font family                                       |
| `--jdp-border-radius`          | Base border radius                                |
| `--jdp-input-border-radius`    | Input field border radius                         |
| `--jdp-calendar-border-radius` | Calendar dropdown border radius                   |
| `--jdp-day-cell-border-radius` | Day cell border radius                            |

## Browser Support

This component uses Web Components and is compatible with all modern browsers.

## License

MIT
