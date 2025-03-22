import React, { useState, useEffect, useRef } from 'react';

/**
 * PersianDate Class - Copy from persian-date.ts
 * For this example, we're including a simplified version. In a real implementation,
 * you would copy the entire PersianDate class from the source.
 */
class PersianDate {
  constructor(year, month, day) {
    const now = new Date();
    this.year = year || 1402; // Default Persian year
    this.month = month !== undefined ? month : 1; // Default to Farvardin
    this.day = day || 1;
    this.gregorian = this.toGregorian();
  }

  // Simplified implementation
  static now() {
    return new PersianDate();
  }

  addMonths(count) {
    let m = this.month + count;
    let y = this.year;
    
    while (m > 12) {
      m -= 12;
      y += 1;
    }
    
    while (m < 1) {
      m += 12;
      y -= 1;
    }
    
    this.year = y;
    this.month = m;
    return this;
  }

  format(format) {
    // Simplified format implementation
    if (format === 'YYYY/MM/DD') {
      return `${this.year}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
    }
    if (format === 'MMMM YYYY') {
      const months = [
        'فروردین', 'اردیبهشت', 'خرداد', 
        'تیر', 'مرداد', 'شهریور', 
        'مهر', 'آبان', 'آذر', 
        'دی', 'بهمن', 'اسفند'
      ];
      return `${months[this.month - 1]} ${this.year}`;
    }
    return `${this.year}/${this.month}/${this.day}`;
  }

  // Helper method to get days in month
  static getDaysInMonth(year, month) {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    // Check for leap year in Esfand
    return PersianDate.isLeapYear(year) ? 30 : 29;
  }

  // Simplified leap year check
  static isLeapYear(year) {
    return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33);
  }

  // Simplified Gregorian conversion
  toGregorian() {
    // In a real implementation, include the actual conversion algorithm
    return new Date();
  }

  toISOString() {
    return this.gregorian.toISOString();
  }
}

/**
 * React Persian Date Picker Component
 * Adapted from the Web Component for React
 */
const PersianDatePickerReact = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  rtl = true,
  primaryColor = '#3b82f6',
  className = '',
  ...props
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(PersianDate.now());
  const containerRef = useRef(null);
  
  // CSS Styles - Copy from the web component CSS
  const styles = `
    .persian-datepicker-container {
      position: relative;
      width: 100%;
      font-family: 'Vazirmatn', Arial, sans-serif;
    }

    .persian-datepicker-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      outline: none;
      transition: border-color 0.15s ease-in-out;
    }

    .persian-datepicker-input:focus {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 1px ${primaryColor};
    }

    .calendar-popup {
      position: absolute;
      top: calc(100% + 4px);
      ${rtl ? 'right' : 'left'}: 0;
      width: 300px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 10;
      overflow: hidden;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: ${primaryColor};
      color: white;
    }

    .header button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .header button:hover {
      background: rgba(255,255,255,0.2);
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 8px;
    }

    .weekday {
      text-align: center;
      font-size: 0.75rem;
      color: #64748b;
      padding: 6px 0;
    }

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-size: 0.875rem;
      cursor: pointer;
      border-radius: 50%;
      margin: 2px;
    }

    .day:hover {
      background: #f1f5f9;
    }

    .day.selected {
      background: ${primaryColor};
      color: white;
    }

    .day.current-month {
      color: #0f172a;
    }

    .day.other-month {
      color: #94a3b8;
    }

    .day.today {
      font-weight: bold;
      border: 1px solid ${primaryColor};
    }
  `;

  // Initialize on mount
  useEffect(() => {
    // Handle outside clicks to close the calendar
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Update if value prop changes
  useEffect(() => {
    if (value) {
      try {
        if (typeof value === 'string') {
          // Parse date string in format YYYY/MM/DD
          const [year, month, day] = value.split('/').map(Number);
          setSelectedDate(new PersianDate(year, month, day));
        } else if (value instanceof Date) {
          // Convert from Gregorian Date
          // In a real implementation, add conversion logic
          setSelectedDate(new PersianDate());
        } else if (value instanceof PersianDate) {
          setSelectedDate(value);
        }
      } catch (error) {
        console.error('Invalid date value provided', error);
      }
    }
  }, [value]);

  // Navigation methods
  const goToNextMonth = () => {
    const newDate = new PersianDate(viewDate.year, viewDate.month);
    newDate.addMonths(1);
    setViewDate(newDate);
  };

  const goToPrevMonth = () => {
    const newDate = new PersianDate(viewDate.year, viewDate.month);
    newDate.addMonths(-1);
    setViewDate(newDate);
  };

  // Date selection handler
  const selectDay = (year, month, day) => {
    const newDate = new PersianDate(year, month, day);
    setSelectedDate(newDate);
    setIsOpen(false);
    
    if (onChange) {
      onChange({
        year,
        month,
        day,
        formatted: newDate.format('YYYY/MM/DD'),
        iso: newDate.toISOString(),
        persianDate: newDate
      });
    }
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const year = viewDate.year;
    const month = viewDate.month;
    
    // Get first day of month and days in month
    const daysInMonth = PersianDate.getDaysInMonth(year, month);
    
    // For simplicity, we'll assume the week starts on Saturday (6)
    // In a real implementation, calculate the exact first day
    const firstDayOfWeek = 6; // Saturday
    
    // Get days from previous month to fill the first row
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = PersianDate.getDaysInMonth(prevYear, prevMonth);
    
    const days = [];
    
    // Previous month days
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = daysInPrevMonth - firstDayOfWeek + i + 1;
      days.push({
        year: prevYear,
        month: prevMonth,
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
    
    // Current month days
    const today = PersianDate.now();
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        year,
        month,
        day,
        isCurrentMonth: true,
        isToday: today.year === year && today.month === month && today.day === day,
        isSelected: selectedDate && selectedDate.year === year && 
                   selectedDate.month === month && selectedDate.day === day
      });
    }
    
    // Next month days to complete the grid
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const remainingCells = 42 - days.length; // 6 rows of 7 days
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        year: nextYear,
        month: nextMonth,
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
    
    return days;
  };

  // Weekday headers
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  
  return (
    <div 
      className={`persian-datepicker-container ${className}`}
      ref={containerRef} 
      style={{ direction: rtl ? 'rtl' : 'ltr' }}
      {...props}
    >
      <style>{styles}</style>
      
      <input
        className="persian-datepicker-input"
        type="text"
        readOnly
        placeholder={placeholder}
        value={selectedDate ? selectedDate.format('YYYY/MM/DD') : ''}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <div className="calendar-popup">
          <div className="header">
            <button onClick={goToNextMonth}>{rtl ? '›' : '‹'}</button>
            <div>{viewDate.format('MMMM YYYY')}</div>
            <button onClick={goToPrevMonth}>{rtl ? '‹' : '›'}</button>
          </div>
          
          <div className="calendar-grid">
            {/* Weekday headers */}
            {weekDays.map((day, index) => (
              <div key={`weekday-${index}`} className="weekday">{day}</div>
            ))}
            
            {/* Calendar days */}
            {generateCalendarDays().map((dayObj, index) => (
              <div 
                key={`day-${index}`}
                className={`day ${dayObj.isCurrentMonth ? 'current-month' : 'other-month'} 
                            ${dayObj.isToday ? 'today' : ''} 
                            ${dayObj.isSelected ? 'selected' : ''}`}
                onClick={() => selectDay(dayObj.year, dayObj.month, dayObj.day)}
              >
                {dayObj.day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersianDatePickerReact; 