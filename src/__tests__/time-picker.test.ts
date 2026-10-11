/**
 * @jest-environment jsdom
 */
import { PersianDatePickerElement } from '../persian-datepicker-element';
import { PersianDate } from '../persian-date';
import { DateUtils } from '../utils/date-utils';

// Create a mock implementation of EventUtils
class MockEventUtils {
  private static instance: MockEventUtils | null = null;

  initialize = jest.fn().mockResolvedValue(undefined);
  refreshEvents = jest.fn().mockImplementation(() => []);
  isHoliday = jest.fn().mockImplementation((month, day) => {
    if (month === 1 && day === 1) return true;
    return false;
  });
  getEvents = jest.fn().mockImplementation((month, day) => {
    if (month === 1 && day === 1) return [{ title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true }];
    return [];
  });
  getHolidayTitles = jest.fn().mockImplementation(() => []);
  getAllEventTitles = jest.fn().mockImplementation(() => []);
  getAllHolidays = jest.fn().mockImplementation(() => []);
  getEventTypes = jest.fn().mockReturnValue(['Iran', 'AncientIran', 'International']);

  private constructor() {}

  public static getInstance(): MockEventUtils {
    if (!MockEventUtils.instance) {
      MockEventUtils.instance = new MockEventUtils();
    }
    return MockEventUtils.instance;
  }

  public static initialize(): Promise<void> {
    return MockEventUtils.getInstance().initialize();
  }
}

jest.mock('../utils/event-utils', () => {
  return {
    getInstance: jest.fn().mockImplementation(() => MockEventUtils.getInstance()),
    initialize: jest.fn().mockImplementation(() => MockEventUtils.initialize()),
    isInitialized: jest.fn().mockReturnValue(false)
  };
});

const wait = (ms = 10): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const createPicker = (attrs: Record<string, string> = {}): PersianDatePickerElement => {
  const element = document.createElement('persian-datepicker-element') as PersianDatePickerElement;
  Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
  document.body.appendChild(element);
  return element;
};

describe('PersianDatePickerElement - Time Picker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    if (!customElements.get('persian-datepicker-element')) {
      customElements.define('persian-datepicker-element', PersianDatePickerElement);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    test('does not render the time picker by default', async () => {
      const element = createPicker();
      await wait();

      expect(element.shadowRoot?.querySelector('.time-picker')).toBeNull();
      expect(element.shadowRoot?.querySelector('#hour-select-trigger')).toBeNull();
    });

    test('renders the time picker when show-time is set', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();

      const shadow = element.shadowRoot!;
      expect(shadow.querySelector('.time-picker')).toBeTruthy();
      expect(shadow.getElementById('time-input')).toBeTruthy();
      expect(shadow.getElementById('hour-select-trigger')).toBeTruthy();
      expect(shadow.getElementById('minute-select-trigger')).toBeTruthy();
      // No seconds / AM-PM for the default HH:mm format
      expect(shadow.getElementById('second-select-trigger')).toBeNull();
      expect(shadow.getElementById('ampm-select-trigger')).toBeNull();
    });

    test('populates the hour and minute dropdowns', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();

      const shadow = element.shadowRoot!;
      expect(shadow.querySelectorAll('#hour-select-content .select-item').length).toBe(24);
      expect(shadow.querySelectorAll('#minute-select-content .select-item').length).toBe(60);
    });

    test('renders 12-hour hour list and AM/PM selector for hh:mm A', async () => {
      const element = createPicker({ 'show-time': '', 'time-format': 'hh:mm A' });
      await wait();

      const shadow = element.shadowRoot!;
      expect(shadow.getElementById('ampm-select-trigger')).toBeTruthy();
      expect(shadow.querySelectorAll('#hour-select-content .select-item').length).toBe(12);
      expect(shadow.querySelectorAll('#ampm-select-content .select-item').length).toBe(2);
    });

    test('renders the seconds selector for HH:mm:ss', async () => {
      const element = createPicker({ 'show-time': '', 'time-format': 'HH:mm:ss' });
      await wait();

      const shadow = element.shadowRoot!;
      expect(shadow.getElementById('second-select-trigger')).toBeTruthy();
      expect(shadow.querySelectorAll('#second-select-content .select-item').length).toBe(60);
    });
  });

  describe('selection via dropdowns', () => {
    test('updates the value and dispatches change with time details', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.setValue(1404, 1, 5);

      const changeSpy = jest.fn();
      element.addEventListener('change', changeSpy);

      const shadow = element.shadowRoot!;
      (shadow.querySelector('#hour-select-content .select-item[data-value="10"]') as HTMLElement).click();
      (shadow.querySelector('#minute-select-content .select-item[data-value="30"]') as HTMLElement).click();

      expect(element.getTime()).toEqual({ hour: 10, minute: 30, second: 0 });

      const input = shadow.getElementById('date-input') as HTMLInputElement;
      expect(input.value).toContain('۱۰:۳۰');

      expect(changeSpy).toHaveBeenCalled();
      const detail = changeSpy.mock.calls[changeSpy.mock.calls.length - 1][0].detail;
      expect(detail.time).toEqual({ hour: 10, minute: 30, second: 0 });
      expect(detail.formattedDateTime).toContain('۱۰:۳۰');
      expect(new Date(detail.isoString).getHours()).toBe(10);
    });

    test('handles AM/PM selection in 12-hour mode', async () => {
      const element = createPicker({ 'show-time': '', 'time-format': 'hh:mm A' });
      await wait();
      element.setValue(1404, 1, 5);

      const shadow = element.shadowRoot!;
      (shadow.querySelector('#hour-select-content .select-item[data-value="2"]') as HTMLElement).click();
      (shadow.querySelector('#minute-select-content .select-item[data-value="5"]') as HTMLElement).click();
      (shadow.querySelector('#ampm-select-content .select-item[data-value="pm"]') as HTMLElement).click();

      expect(element.getTime()).toEqual({ hour: 14, minute: 5, second: 0 });
    });
  });

  describe('typing the time', () => {
    test('applies a typed time on change', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.setValue(1404, 1, 5);

      const shadow = element.shadowRoot!;
      const timeInput = shadow.getElementById('time-input') as HTMLInputElement;

      timeInput.value = '14:30';
      timeInput.dispatchEvent(new Event('change'));

      expect(element.getTime()).toEqual({ hour: 14, minute: 30, second: 0 });
      expect((shadow.getElementById('date-input') as HTMLInputElement).value).toContain('۱۴:۳۰');
      // Re-formats the typed value to Persian numerals
      expect(timeInput.value).toBe('۱۴:۳۰');
    });

    test('accepts a typed AM/PM time', async () => {
      const element = createPicker({ 'show-time': '', 'time-format': 'hh:mm A' });
      await wait();
      element.setValue(1404, 1, 5);

      const timeInput = element.shadowRoot!.getElementById('time-input') as HTMLInputElement;
      timeInput.value = '2:30 ب.ظ';
      timeInput.dispatchEvent(new Event('change'));

      expect(element.getTime()).toEqual({ hour: 14, minute: 30, second: 0 });
    });

    test('ignores invalid typed input and restores the last value', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.setValue(1404, 1, 5);
      element.setTime(8, 15, 0);

      const timeInput = element.shadowRoot!.getElementById('time-input') as HTMLInputElement;
      timeInput.value = '99:99';
      timeInput.dispatchEvent(new Event('change'));

      expect(element.getTime()).toEqual({ hour: 8, minute: 15, second: 0 });
      expect(timeInput.value).toBe('۰۸:۱۵');
    });
  });

  describe('configuration', () => {
    test('applies default-time on initialization', async () => {
      const element = createPicker({ 'show-time': '', 'default-time': '[13, 30]' });
      await wait();

      expect(element.getTime()).toEqual({ hour: 13, minute: 30, second: 0 });
    });

    test('respects minute-step', async () => {
      const element = createPicker({ 'show-time': '', 'minute-step': '15' });
      await wait();

      expect(element.shadowRoot!.querySelectorAll('#minute-select-content .select-item').length).toBe(4);
    });

    test('hides the time picker in range mode', async () => {
      const element = createPicker({ 'show-time': '', 'range-mode': '' });
      await wait();

      expect(element.shadowRoot?.querySelector('.time-picker')).toBeNull();
    });
  });

  describe('public methods', () => {
    test('setTime and getTime round-trip', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.setValue(1404, 1, 5);

      element.setTime(9, 45, 30);
      expect(element.getTime()).toEqual({ hour: 9, minute: 45, second: 30 });
      expect((element.shadowRoot!.getElementById('date-input') as HTMLInputElement).value).toContain('۰۹:۴۵');
    });

    test('clear resets the time', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.setValue(1404, 1, 5);
      element.setTime(9, 45, 30);

      element.clear();

      expect(element.getTime()).toEqual({ hour: 0, minute: 0, second: 0 });
      expect((element.shadowRoot!.getElementById('date-input') as HTMLInputElement).value).toBe('');
    });
  });

  describe('day click behaviour', () => {
    test('keeps the calendar open when time is enabled', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      element.open();

      const shadow = element.shadowRoot!;
      const calendar = shadow.getElementById('calendar')!;
      expect(calendar.classList.contains('visible')).toBe(true);

      const day = shadow.querySelector('#days-container .day:not(.empty):not(.disabled)') as HTMLElement;
      day.click();

      expect(calendar.classList.contains('visible')).toBe(true);
      expect(element.getValue()).not.toBeNull();
    });

    test('closes the calendar on day click when time is disabled', async () => {
      const element = createPicker();
      await wait();
      element.open();

      const shadow = element.shadowRoot!;
      const day = shadow.querySelector('#days-container .day:not(.empty):not(.disabled)') as HTMLElement;
      day.click();

      expect(shadow.getElementById('calendar')!.classList.contains('visible')).toBe(false);
    });
  });

  describe('attribute changes', () => {
    test('toggling show-time adds and removes the time picker', async () => {
      const element = createPicker();
      await wait();
      expect(element.shadowRoot?.querySelector('.time-picker')).toBeNull();

      element.setAttribute('show-time', '');
      expect(element.shadowRoot?.querySelector('.time-picker')).toBeTruthy();

      element.removeAttribute('show-time');
      expect(element.shadowRoot?.querySelector('.time-picker')).toBeNull();
    });

    test('changing time-format rebuilds the time controls', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();
      expect(element.shadowRoot?.getElementById('second-select-trigger')).toBeNull();

      element.setAttribute('time-format', 'HH:mm:ss');
      expect(element.shadowRoot?.getElementById('second-select-trigger')).toBeTruthy();

      element.setAttribute('time-format', 'hh:mm A');
      expect(element.shadowRoot?.getElementById('ampm-select-trigger')).toBeTruthy();
    });

    test('changing default-time updates the selected time', async () => {
      const element = createPicker({ 'show-time': '' });
      await wait();

      element.setAttribute('default-time', '[22, 10, 5]');
      expect(element.getTime()).toEqual({ hour: 22, minute: 10, second: 5 });
    });
  });

  describe('ISO string', () => {
    test('includes the time component', () => {
      const iso = DateUtils.jalaliToISOString([1404, 1, 5], PersianDate, 14, 30, 0);
      const date = new Date(iso);
      expect(date.getHours()).toBe(14);
      expect(date.getMinutes()).toBe(30);
    });
  });
});
