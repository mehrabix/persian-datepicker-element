<template>
  <div ref="container" :class="className" :style="style">
    <persian-datepicker-element
      ref="elementRef"
      :value="formattedValue"
      :placeholder="placeholder"
      :format="format"
      :show-holidays="showEvents"
      :rtl="rtl"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled-dates="disabledDates"
      :holiday-types="eventTypes"
      :range-mode="rangeMode"
      :range-start="rangeStart"
      :range-end="rangeEnd"
      :default-date="defaultDate"
      :show-time="showTime"
      :time-format="timeFormat"
      :default-time="defaultTime"
      :minute-step="minuteStep"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import type { DateTuple, TimeTuple, PersianDateChangeEvent } from 'persian-datepicker-element';

// Define props
const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: undefined
  },
  placeholder: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'YYYY/MM/DD'
  },
  showEvents: {
    type: Boolean,
    default: true
  },
  rtl: {
    type: Boolean,
    default: true
  },
  minDate: {
    type: Array as () => DateTuple,
    default: undefined
  },
  maxDate: {
    type: Array as () => DateTuple,
    default: undefined
  },
  disabledDates: {
    type: [String, Function] as PropType<string | ((year: number, month: number, day: number) => boolean)>,
    default: undefined
  },
  eventTypes: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined
  },
  className: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  },
  rangeMode: {
    type: Boolean,
    default: false
  },
  rangeStart: {
    type: Array as () => DateTuple,
    default: undefined
  },
  rangeEnd: {
    type: Array as () => DateTuple,
    default: undefined
  },
  defaultDate: {
    type: Array as () => DateTuple,
    default: undefined
  },
  showTime: {
    type: Boolean,
    default: false
  },
  timeFormat: {
    type: String,
    default: ''
  },
  defaultTime: {
    type: Array as () => TimeTuple,
    default: undefined
  },
  minuteStep: {
    type: Number,
    default: undefined
  }
});

// Define emits
const emit = defineEmits(['update:modelValue', 'change']);

// Define refs
const container = ref<HTMLElement | null>(null);
const elementRef = ref<HTMLElement | null>(null);

// Computed property for formatted value
const formattedValue = computed(() => {
  if (!props.modelValue) return '';
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.join('/');
  }
  return String(props.modelValue);
});

// Handle date change
const handleChange = (event: CustomEvent) => {
  const detail = event.detail as PersianDateChangeEvent;
  emit('update:modelValue', detail.jalali);
  emit('change', detail);
};

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (Array.isArray(newValue) && newValue.length === 3) {
        try {
          (elementRef.value as any).setValue(newValue[0], newValue[1], newValue[2]);
        } catch (error) {
          console.error('Failed to set value:', error);
        }
      } else if (typeof newValue === 'string') {
        elementRef.value.setAttribute('value', newValue);
      }
    }
  });
}, { immediate: false });

// Watch for min/max date changes
watch(() => props.minDate, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('min-date', JSON.stringify(newValue));
      }
    }
  });
});

// Watch for max date changes
watch(() => props.maxDate, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('max-date', JSON.stringify(newValue));
      }
    }
  });
});

// Watch for disabled dates changes
watch(() => props.disabledDates, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('disabled-dates', JSON.stringify(newValue));
      } else {
        elementRef.value.removeAttribute('disabled-dates');
      }
    }
  });
});

// Watch for range mode changes
watch(() => props.rangeMode, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      elementRef.value.setAttribute('range-mode', String(newValue));
    }
  });
});

// Watch for range start changes
watch(() => props.rangeStart, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('range-start', JSON.stringify(newValue));
      }
    }
  });
});

// Watch for range end changes
watch(() => props.rangeEnd, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('range-end', JSON.stringify(newValue));
      }
    }
  });
});

// Watch for time picker props
watch(() => props.showTime, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      elementRef.value.setAttribute('show-time', String(newValue));
    }
  });
});

watch(() => props.timeFormat, (newValue) => {
  nextTick(() => {
    if (elementRef.value && newValue) {
      elementRef.value.setAttribute('time-format', newValue);
    }
  });
});

watch(() => props.defaultTime, (newValue) => {
  nextTick(() => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('default-time', JSON.stringify(newValue));
      } else {
        elementRef.value.removeAttribute('default-time');
      }
    }
  });
});

watch(() => props.minuteStep, (newValue) => {
  nextTick(() => {
    if (elementRef.value && newValue !== undefined) {
      elementRef.value.setAttribute('minute-step', String(newValue));
    }
  });
});

onMounted(() => {
  nextTick(() => {
    if (props.modelValue && elementRef.value) {
      if (Array.isArray(props.modelValue) && props.modelValue.length === 3) {
        try {
          (elementRef.value as any).setValue(props.modelValue[0], props.modelValue[1], props.modelValue[2]);
        } catch (error) {
          console.error('Failed to set initial value:', error);
        }
      } else if (typeof props.modelValue === 'string') {
        elementRef.value.setAttribute('value', props.modelValue);
      }
    }
  });
});

// Define methods to expose
defineExpose({
  getValue: () => {
    try {
      return (elementRef.value as any)?.getValue();
    } catch (error) {
      console.error('Failed to get value:', error);
      return null;
    }
  },
  setValue: (year: number, month: number, day: number) => {
    try {
      (elementRef.value as any)?.setValue(year, month, day);
    } catch (error) {
      console.error('Failed to set value:', error);
    }
  },
  open: () => {
    try {
      (elementRef.value as any)?.open();
    } catch (error) {
      console.error('Failed to open datepicker:', error);
    }
  },
  close: () => {
    try {
      (elementRef.value as any)?.close();
    } catch (error) {
      console.error('Failed to close datepicker:', error);
    }
  },
  setRange: (start: DateTuple, end: DateTuple) => {
    try {
      (elementRef.value as any)?.setRange(start, end);
    } catch (error) {
      console.error('Failed to set range:', error);
    }
  },
  getRange: () => {
    try {
      return (elementRef.value as any)?.getRange() || { start: null, end: null };
    } catch (error) {
      console.error('Failed to get range:', error);
      return { start: null, end: null };
    }
  },
  clear: () => {
    try {
      (elementRef.value as any)?.clear();
    } catch (error) {
      console.error('Failed to clear datepicker:', error);
    }
  },
  setTime: (hour: number, minute: number, second: number = 0) => {
    try {
      (elementRef.value as any)?.setTime(hour, minute, second);
    } catch (error) {
      console.error('Failed to set time:', error);
    }
  },
  getTime: () => {
    try {
      return (elementRef.value as any)?.getTime() || { hour: 0, minute: 0, second: 0 };
    } catch (error) {
      console.error('Failed to get time:', error);
      return { hour: 0, minute: 0, second: 0 };
    }
  }
});
</script>

<style>
/* Add any additional styles here */
</style> 