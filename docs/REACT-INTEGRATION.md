# Using Persian Components in React

This guide explains how to integrate the Persian Date Picker and Time Picker components directly into your React codebase by copying the source code, allowing for maximum customization.

## Option 1: Using the React Wrapper (Easiest)

If you just want to use the components as-is in React without modifying them:

```jsx
import React, { useRef, useEffect } from 'react';
import '@shadnext/persian-datepicker-element';

const PersianDatePicker = (props) => {
  const datePickerRef = useRef(null);
  
  useEffect(() => {
    // Forward any props to the web component
    const element = datePickerRef.current;
    if (element) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === 'onChange') {
          element.addEventListener('value-changed', (e) => {
            props.onChange(e.detail);
          });
        } else if (typeof value === 'function') {
          element.addEventListener(key.toLowerCase(), value);
        } else {
          element.setAttribute(key, value);
        }
      });
    }
    
    // Cleanup
    return () => {
      if (element && props.onChange) {
        element.removeEventListener('value-changed', props.onChange);
      }
    };
  }, [props]);
  
  return <persian-datepicker-element ref={datePickerRef} />;
};

export default PersianDatePicker;
```

## Option 2: Copy Source Code for Full Customization

For complete control over the component, you can copy the source code directly into your React project:

### Step 1: Create the Component in Your React Project

1. Create a directory for the component in your project:

```bash
mkdir -p src/components/PersianDatePicker
```

2. Copy the core files from the source code:

* Copy the `src/components/persian-datepicker-element/index.ts` file
* Copy the `src/utils/persian-date.ts` file

### Step 2: Convert to a React Component

Here's an example of how to adapt the web component to a React component:

```jsx
// src/components/PersianDatePicker/ReactPersianDatePicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { PersianDate } from './persian-date'; // Copied utility

// Copy the styles from the web component
const styles = `
  .persian-datepicker-container {
    /* Copy styles from the web component's CSS */
  }
`;

const ReactPersianDatePicker = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  rtl = true,
  primaryColor = '#3b82f6',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new PersianDate());
  const containerRef = useRef(null);
  
  // Convert the copied web component logic to React hooks and handlers
  useEffect(() => {
    // Initialize logic
    if (value) {
      // Parse and set initial value
    }
    
    // Event listeners for outside clicks
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
  
  // Handle month navigation
  const goToNextMonth = () => {
    const newDate = new PersianDate(viewDate);
    newDate.addMonths(1);
    setViewDate(newDate);
  };
  
  const goToPrevMonth = () => {
    const newDate = new PersianDate(viewDate);
    newDate.addMonths(-1);
    setViewDate(newDate);
  };
  
  // Build calendar based on current viewDate
  const buildCalendar = () => {
    // Copy logic from the web component to generate calendar days
  };
  
  // Handle day selection
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
        iso: newDate.toISOString()
      });
    }
  };
  
  // Render calendar UI
  return (
    <div className="persian-datepicker-container" ref={containerRef} style={{ direction: rtl ? 'rtl' : 'ltr' }} {...props}>
      <style>{styles}</style>
      
      <input
        type="text"
        readOnly
        placeholder={placeholder}
        value={selectedDate ? selectedDate.format('YYYY/MM/DD') : ''}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <div className="calendar-popup">
          <div className="header">
            <button onClick={goToPrevMonth}>‹</button>
            <div>{viewDate.format('MMMM YYYY')}</div>
            <button onClick={goToNextMonth}>›</button>
          </div>
          
          <div className="calendar-grid">
            {/* Copy render logic for days of week */}
            {/* Copy render logic for calendar days */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactPersianDatePicker;
```

### Step 3: Migrate the Full Component

To completely migrate the webcomponent to React:

1. Identify state variables in the original component
2. Convert attribute change handlers to prop changes
3. Convert event listeners to React event handlers 
4. Convert DOM manipulation to React's declarative rendering
5. Use React's ref system instead of direct DOM queries

## Full Example Repository

We've created a template repository with the Persian Date Picker fully converted to React:

[GitHub: react-persian-datepicker-template](https://github.com/mehrabix/react-persian-datepicker-template)

This repository includes:
- The complete conversion of the web component to a React component
- TypeScript definitions
- All styles properly ported
- Examples of customization
- Storybook stories showcasing different configurations

## Customization

When using the copied code approach, you have full control to customize:

- Styling: Change the CSS directly in your React component
- Behavior: Modify the calendar generation algorithms
- UI: Restructure the component's JSX to match your design system
- Add new features: Integrate with your state management or form libraries

## Sharing Improvements

If you make improvements to the component, consider:

1. Sharing it with the community
2. Contributing back to the original project
3. Publishing your version as a separate React-specific package

By copying the source code, you have the freedom to modify anything while still benefiting from the core Persian calendar algorithms and UI structure. 