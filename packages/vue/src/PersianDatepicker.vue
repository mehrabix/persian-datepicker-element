<template>
  <div ref="container" :class="className" :style="style">
    <persian-datepicker-element
      ref="elementRef"
      :value="formattedValue"
      :placeholder="placeholder"
      :format="format"
      :show-holidays="showHolidays"
      :rtl="rtl"
      :disabled="disabled"
      :min="min"
      :max="max"
      :holiday-types="holidayTypes"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, nextTick, computed } from 'vue';

  import type { DateTuple, PersianDateChangeEvent } from 'persian-datepicker-element';

  // Define props
  const props = defineProps({
    modelValue: {
      type: [Array, String],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    showHolidays: {
      type: Boolean,
      default: true,
    },
    rtl: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Array as () => DateTuple,
      default: undefined,
    },
    max: {
      type: Array as () => DateTuple,
      default: undefined,
    },
    holidayTypes: {
      type: String,
      default: undefined,
    },
    className: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      default: () => ({}),
    },
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
  watch(
    () => props.modelValue,
    newValue => {
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
    },
    { immediate: false }
  );

  // Watch for min/max changes
  watch([() => props.min, () => props.max], ([newMin, newMax]) => {
    nextTick(() => {
      if (elementRef.value) {
        if (newMin) {
          (elementRef.value as any).min = newMin;
        }
        if (newMax) {
          (elementRef.value as any).max = newMax;
        }
      }
    });
  });

  onMounted(() => {
    nextTick(() => {
      if (props.modelValue && elementRef.value) {
        if (Array.isArray(props.modelValue) && props.modelValue.length === 3) {
          try {
            (elementRef.value as any).setValue(
              props.modelValue[0],
              props.modelValue[1],
              props.modelValue[2]
            );
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
    getValue: () => (elementRef.value as any)?.getValue(),
    setValue: (year: number, month: number, day: number) => {
      (elementRef.value as any)?.setValue(year, month, day);
    },
    open: () => (elementRef.value as any)?.open(),
    close: () => (elementRef.value as any)?.close(),
  });
</script>

<style>
  /* Add any additional styles here */
</style>
