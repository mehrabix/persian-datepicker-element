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
    test('correctly identifies leap years', () => {
      const leapYears = [1375, 1379, 1383, 1387, 1391, 1395, 1399, 1403];
      leapYears.forEach(year => {
        expect(PersianDate.isLeapJalaliYear(year)).toBe(true);
      });
    });
    
    test('correctly identifies non-leap years', () => {
      const nonLeapYears = [1376, 1377, 1378, 1380, 1381, 1382, 1384, 1402];
      nonLeapYears.forEach(year => {
        expect(PersianDate.isLeapJalaliYear(year)).toBe(false);
      });
    });
  });
  
  describe('getDaysInMonth', () => {
    test('returns 31 for months 1-6', () => {
      [1, 2, 3, 4, 5, 6].forEach(month => {
        expect(PersianDate.getDaysInMonth(1400, month)).toBe(31);
      });
    });
    
    test('returns 30 for months 7-11', () => {
      [7, 8, 9, 10, 11].forEach(month => {
        expect(PersianDate.getDaysInMonth(1400, month)).toBe(30);
      });
    });
    
    test('returns 29 for month 12 in non-leap year', () => {
      expect(PersianDate.getDaysInMonth(1401, 12)).toBe(29);
    });
    
    test('returns 30 for month 12 in leap year', () => {
      expect(PersianDate.getDaysInMonth(1399, 12)).toBe(30);
    });
    
    test('returns 0 for invalid months', () => {
      expect(PersianDate.getDaysInMonth(1400, 0)).toBe(0);
      expect(PersianDate.getDaysInMonth(1400, 13)).toBe(0);
    });
  });
  
  describe('getMonthName', () => {
    test('returns correct Persian month names', () => {
      const monthNames = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
      ];
      
      monthNames.forEach((name, index) => {
        expect(PersianDate.getMonthName(index + 1)).toBe(name);
      });
    });
  });
  
  describe('getDayOfWeek', () => {
    test('returns correct day of week', () => {
      // Saturday is 6, Sunday is 0, etc.
      expect(PersianDate.getDayOfWeek(1402, 4, 24)).toBe(6); // Saturday, July 15, 2023
      expect(PersianDate.getDayOfWeek(1402, 4, 25)).toBe(0); // Sunday, July 16, 2023
      expect(PersianDate.getDayOfWeek(1402, 4, 26)).toBe(1); // Monday, July 17, 2023
    });
  });
  
  describe('isValidDate', () => {
    test('returns true for valid dates', () => {
      expect(PersianDate.isValidDate(1400, 1, 1)).toBe(true);
      expect(PersianDate.isValidDate(1400, 6, 31)).toBe(true);
      expect(PersianDate.isValidDate(1400, 12, 29)).toBe(true);
      expect(PersianDate.isValidDate(1399, 12, 30)).toBe(true);
    });
    
    test('returns false for invalid dates', () => {
      expect(PersianDate.isValidDate(-1, 1, 1)).toBe(false);
      expect(PersianDate.isValidDate(1400, 0, 1)).toBe(false);
      expect(PersianDate.isValidDate(1400, 13, 1)).toBe(false);
      expect(PersianDate.isValidDate(1400, 1, 0)).toBe(false);
      expect(PersianDate.isValidDate(1400, 1, 32)).toBe(false);
      expect(PersianDate.isValidDate(1400, 7, 31)).toBe(false);
      expect(PersianDate.isValidDate(1400, 12, 30)).toBe(false);
    });
  });
}); 