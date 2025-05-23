import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PersianDatepicker from './PersianDatepicker.vue';

// NOTE: The custom element is already registered in test/setup.ts
// No need to define it again here

// Add type declaration for the custom element
declare global {
  interface HTMLElementTagNameMap {
    'persian-datepicker-element': HTMLElement & {
      min: number[] | null;
      max: number[] | null;
      getValue(): number[];
      setValue(year: number, month: number, day: number): void;
      open(): void;
      close(): void;
    };
  }
}

describe('PersianDatepicker', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(PersianDatepicker, {
      props: {
        modelValue: [1403, 1, 1],
        placeholder: 'Select a date',
        format: 'YYYY/MM/DD',
        showEvents: true,
        rtl: true,
        disabled: false
      }
    });
  });

  it('renders correctly with default props', () => {
    expect(wrapper.exists()).toBe(true);
    const datepicker = wrapper.find('persian-datepicker-element');
    expect(datepicker.exists()).toBe(true);
    expect(datepicker.attributes('placeholder')).toBe('Select a date');
    expect(datepicker.attributes('format')).toBe('YYYY/MM/DD');
    expect(datepicker.attributes('show-holidays')).toBe('true');
    expect(datepicker.attributes('rtl')).toBe('true');
    expect(datepicker.attributes('disabled')).toBe('false');
  });

  it('applies props to the web component', () => {
    const datepicker = wrapper.find('persian-datepicker-element');
    expect(datepicker.attributes('value')).toBe('1403/1/1');
    expect(datepicker.attributes('min-date')).toBe('[1403,1,1]');
    expect(datepicker.attributes('max-date')).toBe('[1403,12,29]');
    expect(datepicker.attributes('disabled-dates')).toBe('isWeekend');
  });

  it('handles onChange event', async () => {
    const datepicker = wrapper.find('persian-datepicker-element');
    const event = new CustomEvent('change', {
      detail: {
        jalali: [1403, 1, 1],
        gregorian: [2024, 3, 21],
        isHoliday: false,
        events: []
      }
    });
    await datepicker.element.dispatchEvent(event);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('handles min and max date constraints', async () => {
    const minDate = [1403, 1, 1];
    const maxDate = [1403, 12, 29];
    await wrapper.setProps({ minDate, maxDate });
    const datepicker = wrapper.find('persian-datepicker-element');
    expect(datepicker.attributes('min-date')).toBe('[1403,1,1]');
    expect(datepicker.attributes('max-date')).toBe('[1403,12,29]');
  });

  it('handles disabled dates function', async () => {
    const disabledDates = 'isWeekend';
    await wrapper.setProps({ disabledDates });
    const datepicker = wrapper.find('persian-datepicker-element');
    expect(datepicker.attributes('disabled-dates')).toBe('isWeekend');
  });
}); 