import React, { useState, useRef } from 'react';
import { PersianDatepicker, PersianDatepickerMethods, PersianDateChangeEvent } from 'react-persian-datepicker-element';

const DatepickerDemo: React.FC = () => {
  // State for basic example
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGregorian, setSelectedGregorian] = useState<string>('');
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  
  // State for controlled example
  const [controlledValue, setControlledValue] = useState<[number, number, number]>([1401, 6, 15]);
  
  // State for theme toggle
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Refs
  const basicRef = useRef<PersianDatepickerMethods>(null);
  const customRef = useRef<PersianDatepickerMethods>(null);
  
  // Theme colors
  const theme = {
    light: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      background: '#ffffff',
      foreground: '#333333',
      border: '#e5e7eb',
      holidayColor: '#ef4444',
      holidayBg: '#fee2e2'
    },
    dark: {
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      background: '#1f2937',
      foreground: '#f3f4f6',
      border: '#374151',
      holidayColor: '#f87171',
      holidayBg: '#7f1d1d'
    }
  };
  
  const currentTheme = darkMode ? theme.dark : theme.light;
  
  // Handle date change for basic example
  const handleDateChange = (event: PersianDateChangeEvent) => {
    const { jalali, gregorian, isHoliday, events } = event;
    
    setSelectedDate(`${jalali[0]}/${jalali[1]}/${jalali[2]}`);
    setSelectedGregorian(`${gregorian[0]}-${gregorian[1]}-${gregorian[2]}`);
    setIsHoliday(isHoliday);
    setEvents(events || []);
    
    console.log('Date changed:', event);
  };
  
  // Handle date change for controlled example
  const handleControlledDateChange = (event: PersianDateChangeEvent) => {
    setControlledValue(event.jalali);
  };
  
  // Set to today
  const handleSetToday = () => {
    const today = new Date();
    basicRef.current?.setValue(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
  };
  
  // Get current value
  const handleGetValue = () => {
    const value = basicRef.current?.getValue();
    if (value) {
      alert(`Current value: ${value.join('/')}`);
    }
  };
  
  // Toggle calendar
  const handleToggleCalendar = () => {
    const element = basicRef.current?.getElement();
    if (element?.hasAttribute('open')) {
      basicRef.current?.close();
    } else {
      basicRef.current?.open();
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`demo-container ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Persian Datepicker Demo</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      
      <div className="demo-section">
        <h2>Basic Example</h2>
        <div className="datepicker-wrapper">
          <PersianDatepicker
            ref={basicRef}
            placeholder="انتخاب تاریخ"
            format="YYYY/MM/DD"
            showEvents={true}
            onChange={handleDateChange}
            primaryColor={currentTheme.primary}
            primaryHover={currentTheme.primaryHover}
            backgroundColor={currentTheme.background}
            foregroundColor={currentTheme.foreground}
            borderColor={currentTheme.border}
            holidayColor={currentTheme.holidayColor}
            holidayBg={currentTheme.holidayBg}
          />
          
          <div className="actions">
            <button onClick={handleSetToday}>Today</button>
            <button onClick={handleGetValue}>Get Value</button>
            <button onClick={handleToggleCalendar}>Toggle Calendar</button>
          </div>
          
          {selectedDate && (
            <div className="selected-info">
              <div className="info-row">
                <span className="info-label">Jalali Date:</span>
                <span className="info-value">{selectedDate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Gregorian Date:</span>
                <span className="info-value">{selectedGregorian}</span>
              </div>
              {isHoliday && (
                <div className="info-row holiday">
                  <span className="info-value">
                    <span className="holiday-icon">🎉</span> This is a holiday!
                  </span>
                </div>
              )}
              
              {events.length > 0 && (
                <div className="events">
                  <h4>Events on this day:</h4>
                  <ul>
                    {events.map((event, index) => (
                      <li key={index}>
                        <span className="event-title">{event.title}</span>
                        {event.description && (
                          <span className="event-description">{event.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Controlled Component</h2>
        <div className="datepicker-wrapper">
          <div className="controlled-value">
            <span>Current value: {controlledValue.join('/')}</span>
            <div className="controlled-buttons">
              <button onClick={() => setControlledValue([1400, 1, 1])}>
                Set to 1400/1/1
              </button>
              <button onClick={() => setControlledValue([1401, 6, 15])}>
                Set to 1401/6/15
              </button>
              <button onClick={() => setControlledValue([1402, 12, 29])}>
                Set to 1402/12/29
              </button>
            </div>
          </div>
          
          <PersianDatepicker
            value={controlledValue}
            onChange={handleControlledDateChange}
            placeholder="Controlled datepicker"
            showEvents={true}
            primaryColor={currentTheme.primary}
            backgroundColor={currentTheme.background}
            foregroundColor={currentTheme.foreground}
            borderColor={currentTheme.border}
          />
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Range Limitation</h2>
        <div className="datepicker-wrapper">
          <PersianDatepicker
            placeholder="محدوده ۱۴۰۰/۱/۱ تا ۱۴۰۲/۱۲/۲۹"
            min={[1400, 1, 1]}
            max={[1402, 12, 29]}
            showEvents={true}
            primaryColor={currentTheme.primary}
            backgroundColor={currentTheme.background}
            foregroundColor={currentTheme.foreground}
            borderColor={currentTheme.border}
          />
          <div className="helper-text">
            This datepicker is limited to dates between 1 Farvardin 1400 and 29 Esfand 1402.
          </div>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Custom Styling</h2>
        <div className="datepicker-wrapper">
          <PersianDatepicker
            ref={customRef}
            placeholder="Custom Styled"
            showEvents={true}
            rtl={true}
            primaryColor="#8b5cf6"
            primaryHover="#7c3aed"
            backgroundColor={darkMode ? '#2d3748' : '#f8fafc'}
            foregroundColor={darkMode ? '#e2e8f0' : '#334155'}
            borderColor={darkMode ? '#4a5568' : '#cbd5e1'}
            borderRadius="16px"
            fontFamily="Tahoma, Arial, sans-serif"
            holidayColor="#ec4899"
            holidayBg={darkMode ? '#831843' : '#fbcfe8'}
            className="custom-datepicker"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '300px'
            }}
          />
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Disabled State</h2>
        <div className="datepicker-wrapper">
          <PersianDatepicker
            placeholder="Disabled Datepicker"
            disabled={true}
            primaryColor={currentTheme.primary}
            backgroundColor={currentTheme.background}
            foregroundColor={currentTheme.foreground}
            borderColor={currentTheme.border}
          />
        </div>
      </div>
      
      <footer>
        <p>
          react-persian-datepicker-element © {new Date().getFullYear()} - MIT License
        </p>
      </footer>
    </div>
  );
};

export default DatepickerDemo; 