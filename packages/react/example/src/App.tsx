import React, { useState, useRef } from 'react';
import { PersianDatepicker, PersianDateChangeEvent } from 'react-persian-datepicker-element';
import './App.css';

// Type definitions for theme properties to ensure type safety
interface ThemeProperties {
  [key: string]: string;
}

// Pre-defined themes
const themes: Record<string, ThemeProperties> = {
  default: {
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490',
    '--jdp-border-radius': '0.5rem',
    '--jdp-font-size': '14px'
  },
  blue: {
    '--jdp-primary': '#3b82f6',
    '--jdp-primary-hover': '#2563eb',
    '--jdp-ring': '#60a5fa',
    '--jdp-border-radius': '0.5rem'
  },
  green: {
    '--jdp-primary': '#10b981',
    '--jdp-primary-hover': '#059669',
    '--jdp-ring': '#34d399',
    '--jdp-border-radius': '0.5rem'
  },
  purple: {
    '--jdp-primary': '#8b5cf6',
    '--jdp-primary-hover': '#7c3aed',
    '--jdp-ring': '#a78bfa',
    '--jdp-border-radius': '0.5rem'
  },
  red: {
    '--jdp-primary': '#ef4444',
    '--jdp-primary-hover': '#dc2626',
    '--jdp-ring': '#fca5a5',
    '--jdp-border-radius': '0.5rem'
  },
  orange: {
    '--jdp-primary': '#f97316',
    '--jdp-primary-hover': '#ea580c',
    '--jdp-ring': '#fdba74',
    '--jdp-border-radius': '0.5rem'
  },
  minimal: {
    '--jdp-primary': '#000000',
    '--jdp-primary-hover': '#333333',
    '--jdp-primary-foreground': '#ffffff',
    '--jdp-border-radius': '2px',
    '--jdp-input-border-width': '1px',
    '--jdp-day-cell-border-radius': '0',
    '--jdp-nav-button-border-radius': '0'
  },
  rounded: {
    '--jdp-primary': '#0891b2',
    '--jdp-primary-hover': '#0e7490',
    '--jdp-border-radius': '1rem',
    '--jdp-input-border-radius': '1rem',
    '--jdp-day-cell-border-radius': '1rem',
    '--jdp-nav-button-border-radius': '1rem',
    '--jdp-calendar-border-radius': '1.5rem'
  }
};

// Dark mode theme with complete styles for calendar mode
const darkTheme: ThemeProperties = {
  // Base colors
  '--jdp-background': '#1e1e2f',
  '--jdp-foreground': '#e2e8f0',
  '--jdp-muted': '#334155',
  '--jdp-muted-foreground': '#94a3b8',
  '--jdp-border': '#475569',
  '--jdp-input-border-color': '#475569',
  '--jdp-calendar-shadow': '0px 10px 30px -5px rgba(2, 6, 23, 0.5)',
  '--jdp-day-hover-bg': '#334155',
  
  // Input field styles
  '--jdp-input-bg': '#1e1e2f',
  '--jdp-input-text': '#e2e8f0',
  '--jdp-input-placeholder': '#94a3b8',
  
  // Calendar body styles
  '--jdp-calendar-bg': '#0f172a',
  '--jdp-selected-day-bg': 'var(--jdp-primary)',
  '--jdp-selected-day-text': '#ffffff',
  '--jdp-today-text': 'var(--jdp-primary)',
  '--jdp-day-text': '#e2e8f0',
  '--jdp-header-bg': '#1e293b',
  '--jdp-header-text': '#e2e8f0',
  '--jdp-day-name-text': '#94a3b8',
  
  // Month and year selectors
  '--jdp-month-year-bg': '#1e293b',
  '--jdp-month-year-text': '#e2e8f0',
  '--jdp-month-year-hover-bg': '#334155',
  
  // Holiday/event indicators
  '--jdp-holiday-color': '#f87171',
  '--jdp-holiday-bg': 'rgba(239, 68, 68, 0.1)',
  
  // Other elements
  '--jdp-disabled-day': '#475569',
  '--jdp-outside-day-text': '#64748b'
};

// Format events for display
function formatEvents(events: Array<{title: string, type: string, holiday: boolean}> | undefined) {
  if (!events || events.length === 0) return 'هیچ رویدادی وجود ندارد';
  
  return events.map(event => {
    const holidayMark = event.holiday ? '🔴 ' : '';
    return `${holidayMark}${event.title} (${event.type})`;
  }).join(' | ');
}

function App() {
  // State for dark mode and theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  
  // State for dates
  const [selectedJalali, setSelectedJalali] = useState<string>('-');
  const [selectedGregorian, setSelectedGregorian] = useState<string>('-');
  const [selectedEvents, setSelectedEvents] = useState<string>('-');

  // Apply the current theme and dark mode
  const getThemeStyles = () => {
    const baseTheme = themes[activeTheme] || themes.default;
    
    if (isDarkMode) {
      // Create a merged theme
      const mergedTheme: ThemeProperties = { ...darkTheme };
      
      // Copy primary, hover and other specific properties from the active theme
      if (baseTheme['--jdp-primary']) {
        mergedTheme['--jdp-primary'] = baseTheme['--jdp-primary'];
      }
      
      if (baseTheme['--jdp-primary-hover']) {
        mergedTheme['--jdp-primary-hover'] = baseTheme['--jdp-primary-hover'];
      }
      
      if (baseTheme['--jdp-primary-foreground']) {
        mergedTheme['--jdp-primary-foreground'] = baseTheme['--jdp-primary-foreground'];
      } else {
        mergedTheme['--jdp-primary-foreground'] = '#ffffff';
      }
      
      if (baseTheme['--jdp-ring']) {
        mergedTheme['--jdp-ring'] = baseTheme['--jdp-ring'];
      } else if (baseTheme['--jdp-primary']) {
        mergedTheme['--jdp-ring'] = baseTheme['--jdp-primary'];
      }
      
      // Copy all radius properties
      ['--jdp-border-radius', '--jdp-input-border-radius', '--jdp-day-cell-border-radius',
       '--jdp-nav-button-border-radius', '--jdp-calendar-border-radius', '--jdp-input-border-width',
       '--jdp-font-size'].forEach(prop => {
        if (baseTheme[prop]) {
          mergedTheme[prop] = baseTheme[prop];
        }
      });
      
      return mergedTheme;
    }
    
    return baseTheme;
  };

  // Handle date selection
  const handleDateChange = (event: PersianDateChangeEvent) => {
    const jalaliDate = event.jalali;
    const gregorianDate = event.gregorian;
    const events = event.events;
    
    setSelectedJalali(
      `${jalaliDate[0]}/${jalaliDate[1].toString().padStart(2, '0')}/${jalaliDate[2].toString().padStart(2, '0')}`
    );
    
    setSelectedGregorian(
      `${gregorianDate[0]}/${gregorianDate[1].toString().padStart(2, '0')}/${gregorianDate[2].toString().padStart(2, '0')}`
    );
    
    setSelectedEvents(formatEvents(events));
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <h1>Persian Date Picker Element</h1>
        <p>این مثال قابلیت‌های شخصی‌سازی ظاهری تقویم شمسی را نشان می‌دهد</p>

        <div className="theme-container">
          <div className="theme-toggles">
            <h2 style={{ margin: 0 }}>حالت تاریک</h2>
            <label className="theme-switch">
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <h2>تم‌های آماده</h2>
          <div className="theme-options">
            {Object.keys(themes).map((themeName) => (
              <div 
                key={themeName}
                className={`theme-btn ${activeTheme === themeName ? 'active' : ''}`}
                onClick={() => setActiveTheme(themeName)}
              >
                <div 
                  className="color-dot" 
                  style={{ 
                    backgroundColor: themes[themeName]['--jdp-primary'],
                    borderRadius: themeName === 'rounded' ? '12px' : '50%',
                    border: themeName === 'minimal' ? '1px solid #e2e8f0' : 'none'
                  }}
                ></div>
                <span className="theme-name">
                  {themeName === 'default' ? 'پیش‌فرض' : 
                   themeName === 'blue' ? 'آبی' :
                   themeName === 'green' ? 'سبز' :
                   themeName === 'purple' ? 'بنفش' :
                   themeName === 'red' ? 'قرمز' :
                   themeName === 'orange' ? 'نارنجی' :
                   themeName === 'minimal' ? 'مینیمال' :
                   themeName === 'rounded' ? 'گرد' : themeName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">تاریخ تولد:</label>
          <PersianDatepicker 
            id="birthdate" 
            placeholder="انتخاب تاریخ تولد"
            onChange={handleDateChange}
            cssVariables={getThemeStyles()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="joinDate">تاریخ عضویت:</label>
          <PersianDatepicker 
            id="joinDate" 
            format="YYYY/MM/DD" 
            placeholder="تاریخ عضویت"
            onChange={handleDateChange}
            cssVariables={getThemeStyles()}
          />
        </div>
        
        <div className="holiday-options">
          <h2>انواع تعطیلات</h2>
          <p>با استفاده از ویژگی holiday-types می‌توانید نوع تعطیلات نمایش داده شده را مشخص کنید</p>
          
          <div className="holiday-types-container">
            <div className="form-group">
              <label htmlFor="iran-holidays">فقط تعطیلات ایران:</label>
              <PersianDatepicker 
                id="iran-holidays" 
                holidayTypes="Iran" 
                placeholder="فقط تعطیلات ایران"
                onChange={handleDateChange}
                cssVariables={getThemeStyles()}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="religious-holidays">فقط تعطیلات مذهبی:</label>
              <PersianDatepicker 
                id="religious-holidays" 
                holidayTypes="Religious" 
                placeholder="فقط تعطیلات مذهبی"
                onChange={handleDateChange}
                cssVariables={getThemeStyles()}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="afghanistan-holidays">تعطیلات افغانستان:</label>
              <PersianDatepicker 
                id="afghanistan-holidays" 
                holidayTypes="Afghanistan" 
                placeholder="تعطیلات افغانستان"
                onChange={handleDateChange}
                cssVariables={getThemeStyles()}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="all-holidays">همه تعطیلات:</label>
              <PersianDatepicker 
                id="all-holidays" 
                holidayTypes="Iran,Religious,Afghanistan" 
                placeholder="همه تعطیلات"
                onChange={handleDateChange}
                cssVariables={getThemeStyles()}
              />
            </div>
          </div>
        </div>

        <div className="result">
          <p><strong>تاریخ انتخاب شده (شمسی):</strong> <span id="jalali-result">{selectedJalali}</span></p>
          <p><strong>تاریخ میلادی معادل:</strong> <span id="gregorian-result">{selectedGregorian}</span></p>
          <p><strong>رویدادها:</strong> <span id="events-result">{selectedEvents}</span></p>
        </div>
      </div>
    </div>
  );
}

export default App; 