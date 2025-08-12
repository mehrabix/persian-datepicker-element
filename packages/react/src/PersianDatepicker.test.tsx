import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PersianDatepicker } from './PersianDatepicker';
import type { PersianDateChangeEvent } from 'persian-datepicker-element';

describe('PersianDatepicker onChange Event', () => {
  it('should properly handle onChange event with correct types', () => {
    const mockOnChange = jest.fn();
    
    render(
      <PersianDatepicker
        onChange={mockOnChange}
        data-testid="datepicker"
      />
    );

    const datepicker = screen.getByTestId('datepicker');
    
    // Simulate a change event with the correct structure
    const mockEvent = new CustomEvent('change', {
      detail: {
        jalali: [1402, 1, 1],
        gregorian: [2023, 3, 21],
        isHoliday: false,
        events: [],
        formattedDate: '1402/01/01',
        isoString: '2023-03-21T00:00:00.000Z'
      }
    });

    // Fire the event
    datepicker.dispatchEvent(mockEvent);

    // Verify that the onChange was called with the correct data structure
    expect(mockOnChange).toHaveBeenCalledWith({
      jalali: [1402, 1, 1],
      gregorian: [2023, 3, 21],
      isHoliday: false,
      events: [],
      formattedDate: '1402/01/01',
      isoString: '2023-03-21T00:00:00.000Z'
    });

    // Verify that we can access the properties correctly
    const eventData = mockOnChange.mock.calls[0][0] as PersianDateChangeEvent;
    expect(eventData.jalali).toEqual([1402, 1, 1]);
    expect(eventData.gregorian).toEqual([2023, 3, 21]);
    expect(eventData.isoString).toBe('2023-03-21T00:00:00.000Z');
    expect(eventData.formattedDate).toBe('1402/01/01');
  });

  it('should handle range selection events correctly', () => {
    const mockOnChange = jest.fn();
    
    render(
      <PersianDatepicker
        onChange={mockOnChange}
        rangeMode={true}
        data-testid="datepicker"
      />
    );

    const datepicker = screen.getByTestId('datepicker');
    
    // Simulate a range selection event
    const mockEvent = new CustomEvent('change', {
      detail: {
        jalali: [1402, 1, 1],
        gregorian: [2023, 3, 21],
        isHoliday: false,
        events: [],
        isRange: true,
        range: {
          start: [1402, 1, 1],
          end: [1402, 1, 5],
          startISOString: '2023-03-21T00:00:00.000Z',
          endISOString: '2023-03-25T00:00:00.000Z',
          startGregorian: [2023, 3, 21],
          endGregorian: [2023, 3, 25]
        }
      }
    });

    datepicker.dispatchEvent(mockEvent);

    const eventData = mockOnChange.mock.calls[0][0] as PersianDateChangeEvent;
    expect(eventData.isRange).toBe(true);
    expect(eventData.range?.start).toEqual([1402, 1, 1]);
    expect(eventData.range?.end).toEqual([1402, 1, 5]);
    expect(eventData.range?.startISOString).toBe('2023-03-21T00:00:00.000Z');
    expect(eventData.range?.endISOString).toBe('2023-03-25T00:00:00.000Z');
  });
}); 