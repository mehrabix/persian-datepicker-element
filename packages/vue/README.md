# vue-persian-datepicker-element

Vue 3 integration for the Persian Date Picker web component.

## Installation

```bash
npm install vue-persian-datepicker-element persian-datepicker-element
# or
yarn add vue-persian-datepicker-element persian-datepicker-element
# or
pnpm add vue-persian-datepicker-element persian-datepicker-element
```

## Usage

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
  console.log('Selected date:', event.detail);
};
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \| [number, number, number] | - | The selected date value |
| placeholder | string | - | Placeholder text |
| format | string | "YYYY/MM/DD" | Date format string |
| show-holidays | boolean | false | Show holiday indicators |
| rtl | boolean | false | Right-to-left layout |
| min-date | [number, number, number] | - | Minimum selectable date |
| max-date | [number, number, number] | - | Maximum selectable date |
| disabled-dates | string | - | Disabled dates expression |
| disabled | boolean | false | Disable the datepicker |
| dark-mode | boolean | false | Enable dark mode |

## Events

| Event | Detail Type | Description |
|-------|-------------|-------------|
| change | { jalali: [number, number, number], gregorian: [number, number, number], isHoliday: boolean, events: Array } | Fired when a date is selected |

## Template Refs

The component supports template refs with the following methods:

```vue
<template>
  <PersianDatepicker ref="datepicker" />
</template>

<script setup>
import { ref } from 'vue';
import { PersianDatepicker } from '@persian-datepicker/vue';

const datepicker = ref(null);

// Set a date
datepicker.value?.setValue(1401, 7, 1);

// Get current date
const date = datepicker.value?.getValue();

// Open the datepicker
datepicker.value?.open();

// Close the datepicker
datepicker.value?.close();

// Get the underlying element
const element = datepicker.value?.getElement();
</script>
```

## TypeScript Support

The package includes full TypeScript support:

```vue
<template>
  <PersianDatepicker
    :placeholder="placeholder"
    :format="format"
    :show-holidays="showHolidays"
    :rtl="rtl"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PersianDatepicker, PersianDatepickerProps, PersianDatepickerMethods } from '@persian-datepicker/vue';

const props: PersianDatepickerProps = {
  placeholder: "انتخاب تاریخ",
  format: "YYYY/MM/DD",
  showHolidays: true,
  rtl: true
};

const datepicker = ref<PersianDatepickerMethods | null>(null);

const handleChange = (event: CustomEvent<{
  jalali: [number, number, number];
  gregorian: [number, number, number];
  isHoliday: boolean;
  events: Array<any>;
}>) => {
  console.log('Selected date:', event.detail);
};
</script>
```

## Styling

You can style the component using CSS variables:

```vue
<template>
  <PersianDatepicker class="custom-datepicker" />
</template>

<style>
.custom-datepicker {
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
}
</style>
```

## Examples

### Basic Usage

```vue
<template>
  <PersianDatepicker
    placeholder="انتخاب تاریخ"
    format="YYYY/MM/DD"
  />
</template>

<script setup>
import { PersianDatepicker } from '@persian-datepicker/vue';
</script>
```

### With Event Handling

```vue
<template>
  <PersianDatepicker @change="handleChange" />
</template>

<script setup>
import { PersianDatepicker } from '@persian-datepicker/vue';

const handleChange = (event) => {
  const { jalali, gregorian, isHoliday, events } = event.detail;
  console.log('Jalali:', jalali);
  console.log('Gregorian:', gregorian);
  console.log('Is Holiday:', isHoliday);
  console.log('Events:', events);
};
</script>
```

### With Date Limits

```vue
<template>
  <PersianDatepicker
    :min-date="[1400, 1, 1]"
    :max-date="[1402, 12, 29]"
    disabled-dates="isWeekend"
  />
</template>

<script setup>
import { PersianDatepicker } from '@persian-datepicker/vue';
</script>
```

### With Custom Styling

```vue
<template>
  <PersianDatepicker class="custom-datepicker" />
</template>

<script setup>
import { PersianDatepicker } from '@persian-datepicker/vue';
</script>

<style>
.custom-datepicker {
  width: 300px;
  --jdp-primary: #3b82f6;
  --jdp-primary-hover: #2563eb;
}
</style>
```

## License

MIT 