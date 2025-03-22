import React, { useState } from 'react';
import PersianDatePickerReact from './PersianDatePickerReact';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [theme, setTheme] = useState('default');
  
  // Theme color options
  const themes = {
    default: '#3b82f6', // blue
    purple: '#8b5cf6',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f97316',
    pink: '#ec4899'
  };
  
  // Handle date change
  const handleDateChange = (dateInfo) => {
    setSelectedDate(dateInfo);
    console.log('Selected date:', dateInfo);
  };
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        React Persian Date Picker Example
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Selection</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
          {Object.entries(themes).map(([name, color]) => (
            <button
              key={name}
              onClick={() => setTheme(name)}
              style={{
                padding: '8px 16px',
                backgroundColor: theme === name ? color : '#ffffff',
                color: theme === name ? '#ffffff' : '#333333',
                border: `2px solid ${color}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: theme === name ? 'bold' : 'normal',
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h2>Date Picker</h2>
          <PersianDatePickerReact
            onChange={handleDateChange}
            primaryColor={themes[theme]}
            rtl={true}
            placeholder="انتخاب تاریخ"
          />
        </div>
        
        <div style={{ 
          direction: 'rtl',
          textAlign: 'right',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          backgroundColor: '#f8fafc',
        }}>
          <h2 style={{ color: themes[theme] }}>اطلاعات تاریخ انتخاب شده</h2>
          {selectedDate ? (
            <div>
              <p><strong>تاریخ: </strong>{selectedDate.formatted}</p>
              <p><strong>سال: </strong>{selectedDate.year}</p>
              <p><strong>ماه: </strong>{selectedDate.month}</p>
              <p><strong>روز: </strong>{selectedDate.day}</p>
              <p><strong>تاریخ میلادی: </strong>{new Date(selectedDate.iso).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>لطفاً یک تاریخ انتخاب کنید</p>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
        <h2>How to Customize</h2>
        <p>
          This component has been created by directly adapting the web component code to React. 
          You can modify any part of the code to fit your specific needs:
        </p>
        <ul>
          <li>Change the styling by modifying the CSS in the styles template literal</li>
          <li>Adjust the calendar generation logic in the generateCalendarDays function</li>
          <li>Add new features like date range selection or time selection</li>
          <li>Integrate with form libraries like Formik or React Hook Form</li>
        </ul>
        <p>
          Since you have the complete source code in your project, you have full control
          over how the component works and looks.
        </p>
      </div>
    </div>
  );
};

export default App; 