import { PersianDate } from '../persian-date';

describe('PersianDate utility', () => {
  describe('gregorianToJalali', () => {
    test('converts 2023-07-15 to 1402-04-24', () => {
      const result = PersianDate.gregorianToJalali(2023, 7, 15);
      expect(result).toEqual([1402, 4, 24]);
    });

    test('converts 2000-01-01 to 1378-10-11', () => {
      const result = PersianDate.gregorianToJalali(2000, 1, 1);
      expect(result).toEqual([1378, 10, 11]);
    });

    test('handles leap years correctly', () => {
      const result = PersianDate.gregorianToJalali(2020, 2, 29);
      expect(result).toEqual([1398, 12, 10]);
    });
  });

  describe('jalaliToGregorian', () => {
    test('converts 1402-04-24 to 2023-07-15', () => {
      const result = PersianDate.jalaliToGregorian(1402, 4, 24);
      expect(result).toEqual([2023, 7, 15]);
    });

    test('converts 1378-10-11 to 2000-01-01', () => {
      const result = PersianDate.jalaliToGregorian(1378, 10, 11);
      expect(result).toEqual([2000, 1, 1]);
    });

    test('handles leap years correctly', () => {
      const result = PersianDate.jalaliToGregorian(1398, 12, 10);
      expect(result).toEqual([2020, 2, 29]);
    });
  });

  describe('isLeapJalaliYear', () => {
    test('identifies leap years correctly', () => {
      // Leap Jalali years
      expect(PersianDate.isLeapJalaliYear(1399)).toBeTruthy();
      expect(PersianDate.isLeapJalaliYear(1403)).toBeTruthy();

      // Non-leap Jalali years
      expect(PersianDate.isLeapJalaliYear(1400)).toBeFalsy();
      expect(PersianDate.isLeapJalaliYear(1401)).toBeFalsy();
    });
  });

  describe('getDaysInMonth', () => {
    test('first six months have 31 days', () => {
      for (let month = 1; month <= 6; month++) {
        expect(PersianDate.getDaysInMonth(1402, month)).toBe(31);
      }
    });

    test('next five months have 30 days', () => {
      for (let month = 7; month <= 11; month++) {
        expect(PersianDate.getDaysInMonth(1402, month)).toBe(30);
      }
    });

    test('Esfand has 29 days in normal year', () => {
      expect(PersianDate.getDaysInMonth(1402, 12)).toBe(29);
    });

    test('Esfand has 30 days in leap year', () => {
      expect(PersianDate.getDaysInMonth(1399, 12)).toBe(30);
    });
  });

  describe('getMonthName', () => {
    test('returns correct Persian month names', () => {
      const monthNames = [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ];

      for (let i = 1; i <= 12; i++) {
        expect(PersianDate.getMonthName(i)).toBe(monthNames[i - 1]);
      }
    });
  });

  describe('isValidDate', () => {
    test('validates normal dates', () => {
      expect(PersianDate.isValidDate(1402, 1, 15)).toBeTruthy();
      expect(PersianDate.isValidDate(1402, 7, 30)).toBeTruthy();
    });

    test('rejects invalid months', () => {
      expect(PersianDate.isValidDate(1402, 0, 15)).toBeFalsy();
      expect(PersianDate.isValidDate(1402, 13, 1)).toBeFalsy();
    });

    test('rejects invalid days', () => {
      expect(PersianDate.isValidDate(1402, 1, 32)).toBeFalsy();
      expect(PersianDate.isValidDate(1402, 7, 31)).toBeFalsy();
      expect(PersianDate.isValidDate(1402, 12, 30)).toBeFalsy();
      expect(PersianDate.isValidDate(1399, 12, 31)).toBeFalsy();
    });
  });
});
