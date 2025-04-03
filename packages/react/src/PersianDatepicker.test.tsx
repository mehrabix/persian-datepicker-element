import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PersianDatepicker } from './PersianDatepicker';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock the web component registration
jest.mock('persian-datepicker-element', () => {
  return {};
});

describe('PersianDatepicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with default props', () => {
    const { container } = render(<PersianDatepicker />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('persian-datepicker-element')).toBeInTheDocument();
  });

  test('applies props to the web component', () => {
    const { container } = render(
      <PersianDatepicker 
        placeholder="Test Placeholder"
        format="YYYY-MM-DD"
        showEvents={true}
        rtl={true}
        minDate={[1400, 1, 1]}
        maxDate={[1402, 12, 29]}
        disabledDates="isWeekend"
        disabled={false}
      />
    );
    
    const element = container.querySelector('persian-datepicker-element');
    expect(element).toBeInTheDocument();
    expect(element?.getAttribute('placeholder')).toBe('Test Placeholder');
    expect(element?.getAttribute('format')).toBe('YYYY-MM-DD');
    expect(element?.getAttribute('show-holidays')).toBe('true');
    expect(element?.getAttribute('rtl')).toBe('true');
    expect(element?.getAttribute('min-date')).toBe('[1400,1,1]');
    expect(element?.getAttribute('max-date')).toBe('[1402,12,29]');
    expect(element?.getAttribute('disabled-dates')).toBe('isWeekend');
    expect(element?.getAttribute('disabled')).toBe('false');
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    const { container } = render(<PersianDatepicker onChange={handleChange} />);
    
    const element = container.querySelector('persian-datepicker-element');
    expect(element).toBeInTheDocument();
    
    // Simulate the change event
    const changeEvent = new CustomEvent('change', {
      detail: {
        jalali: [1401, 6, 15],
        gregorian: [2022, 9, 6],
        isHoliday: false,
        events: []
      }
    });
    
    act(() => {
      element?.dispatchEvent(changeEvent);
    });
    
    expect(handleChange).toHaveBeenCalledWith({
      jalali: [1401, 6, 15],
      gregorian: [2022, 9, 6],
      isHoliday: false,
      events: []
    });
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<any>();
    
    // Create mock functions
    const mockSetValue = jest.fn();
    const mockGetValue = jest.fn().mockReturnValue([1401, 6, 15]);
    const mockOpen = jest.fn();
    const mockClose = jest.fn();
    
    // Create a mock element that extends HTMLElement
    class MockPersianDatepickerElement extends HTMLElement {
      getValue = mockGetValue;
      setValue = mockSetValue;
      open = mockOpen;
      close = mockClose;
      addEventListener = jest.fn();
      removeEventListener = jest.fn();
      setAttribute = jest.fn();
    }
    
    // Define the custom element
    if (!customElements.get('persian-datepicker-element')) {
      customElements.define('persian-datepicker-element', MockPersianDatepickerElement);
    }
    
    // Render component
    render(<PersianDatepicker ref={ref} />);
    
    // Test setValue
    act(() => {
      ref.current.setValue(1401, 7, 1);
    });
    expect(mockSetValue).toHaveBeenCalledWith(1401, 7, 1);
    
    // Test getValue
    act(() => {
      const value = ref.current.getValue();
      expect(value).toEqual([1401, 6, 15]);
    });
    expect(mockGetValue).toHaveBeenCalled();
    
    // Test open/close
    act(() => {
      ref.current.open();
      ref.current.close();
    });
    expect(mockOpen).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
    
    // Test getElement
    const element = ref.current.getElement();
    expect(element).toBeInstanceOf(MockPersianDatepickerElement);
  });

  test('applies className and style to container div', () => {
    class MockPersianDatepickerElement extends HTMLElement {
      addEventListener = jest.fn();
      removeEventListener = jest.fn();
      setAttribute = jest.fn();
    }
    
    if (!customElements.get('persian-datepicker-element')) {
      customElements.define('persian-datepicker-element', MockPersianDatepickerElement);
    }
    
    const { container } = render(
      <PersianDatepicker 
        className="custom-class"
        style={{ width: '300px', margin: '10px' }}
      />
    );
    
    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-class');
    expect(div).toHaveStyle({
      width: '300px',
      margin: '10px'
    });
  });

  test('cleans up event listeners on unmount', () => {
    const handleChange = jest.fn();
    
    // Create a mock element that extends HTMLElement
    class MockPersianDatepickerElement extends HTMLElement {
      addEventListener = jest.fn();
      removeEventListener = jest.fn();
      setAttribute = jest.fn();
    }
    
    if (!customElements.get('persian-datepicker-element')) {
      customElements.define('persian-datepicker-element', MockPersianDatepickerElement);
    }
    
    // Render component
    const { unmount } = render(<PersianDatepicker onChange={handleChange} />);
    
    // Get the element instance
    const element = document.querySelector('persian-datepicker-element');
    
    // Verify event listener was added
    expect(element?.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    
    // Unmount component
    unmount();
    
    // Verify cleanup
    expect(element?.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
}); 