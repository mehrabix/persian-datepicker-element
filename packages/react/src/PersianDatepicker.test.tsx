import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PersianDatepicker } from './PersianDatepicker';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

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
        showHolidays={true}
        rtl={true}
        min={[1400, 1, 1]}
        max={[1402, 12, 29]}
        disabled={false}
      />
    );
    
    const element = container.querySelector('persian-datepicker-element');
    expect(element).toBeInTheDocument();
    expect(element?.getAttribute('placeholder')).toBe('Test Placeholder');
    expect(element?.getAttribute('format')).toBe('YYYY-MM-DD');
    expect(element?.getAttribute('show-holidays')).toBe('true');
    expect(element?.getAttribute('rtl')).toBe('true');
    expect(element?.getAttribute('min')).toBe('[1400,1,1]');
    expect(element?.getAttribute('max')).toBe('[1402,12,29]');
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
    const { container } = render(<PersianDatepicker ref={ref} />);
    
    // Call setValue through ref
    act(() => {
      ref.current.setValue(1401, 7, 1);
    });
    
    const element = container.querySelector('persian-datepicker-element') as any;
    expect(element.setValue).toHaveBeenCalledWith(1401, 7, 1);
    
    // Call getValue through ref
    act(() => {
      const value = ref.current.getValue();
      expect(value).toEqual([1401, 6, 15]);
    });
    expect(element.getValue).toHaveBeenCalled();
    
    // Call open/close through ref
    act(() => {
      ref.current.open();
    });
    expect(element.open).toHaveBeenCalled();
    
    act(() => {
      ref.current.close();
    });
    expect(element.close).toHaveBeenCalled();
    
    // Test getElement
    expect(ref.current.getElement()).toBe(element);
  });

  test('applies CSS custom properties', () => {
    const { container } = render(
      <PersianDatepicker 
        primaryColor="#ff0000"
        backgroundColor="#ffffff"
        foregroundColor="#000000"
        borderColor="#cccccc"
        borderRadius="8px"
        fontFamily="Arial"
        holidayColor="#ff5555"
        holidayBg="#ffeeee"
      />
    );
    
    const element = container.querySelector('persian-datepicker-element') as HTMLElement;
    expect(element.style.getPropertyValue('--primary-color')).toBe('#ff0000');
    expect(element.style.getPropertyValue('--background-color')).toBe('#ffffff');
    expect(element.style.getPropertyValue('--foreground-color')).toBe('#000000');
    expect(element.style.getPropertyValue('--border-color')).toBe('#cccccc');
    expect(element.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(element.style.getPropertyValue('--font-family')).toBe('Arial');
    expect(element.style.getPropertyValue('--holiday-color')).toBe('#ff5555');
    expect(element.style.getPropertyValue('--holiday-bg')).toBe('#ffeeee');
  });

  test('applies additional CSS variables', () => {
    const { container } = render(
      <PersianDatepicker 
        cssVariables={{
          'custom-variable': 'custom-value',
          'another-variable': '10px'
        }}
      />
    );
    
    const element = container.querySelector('persian-datepicker-element') as HTMLElement;
    expect(element.style.getPropertyValue('--custom-variable')).toBe('custom-value');
    expect(element.style.getPropertyValue('--another-variable')).toBe('10px');
  });

  test('applies className and style to container div', () => {
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
    const { container, unmount } = render(<PersianDatepicker onChange={handleChange} />);
    
    const element = container.querySelector('persian-datepicker-element');
    expect(element).toBeInTheDocument();
    
    // Add spy to removeEventListener
    const removeEventListenerSpy = jest.spyOn(element as HTMLElement, 'removeEventListener');
    
    // Unmount the component
    unmount();
    
    // Check if removeEventListener was called for the change event
    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });
}); 