import { PersianDatePickerElement } from './persian-datepicker-element';
import { PersianDate } from './persian-date';
import type { PersianDatePickerElementOptions, PersianDateChangeEvent, DateTuple, PersianEvent } from './types';
declare global {
    interface Window {
        PersianDatePickerElement?: typeof PersianDatePickerElement;
    }
}
export { PersianDatePickerElement, PersianDate };
export type { PersianDatePickerElementOptions, PersianDateChangeEvent, DateTuple, PersianEvent };
export default PersianDatePickerElement;
