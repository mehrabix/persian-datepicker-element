# Fix for onChange Event Types Issue

## Problem
The issue reported in [#60](https://github.com/mehrabix/persian-datepicker-element/issues/60) was that the `onChange` event in the React package was not properly typed. Users were getting TypeScript errors when trying to access properties like `isoString` from the event object.

## Root Cause
The React package had its own type definitions that were not properly aligned with the core package's event structure. The event was being handled correctly in JavaScript (`e.detail.isoString`), but TypeScript couldn't recognize the properties.

## Solution
1. **Updated Type Definitions**: Modified `packages/react/src/types/persian-datepicker-element.d.ts` to include all the missing properties in the `PersianDateChangeEvent` interface:
   - `formattedDate?: string`
   - `isoString?: string`
   - `isRange?: boolean`
   - `range?: { ... }` with all range-related properties

2. **Fixed Event Handling**: The event handling in `PersianDatepicker.tsx` was already correct, but the types now properly reflect the actual event structure.

## Usage Example

```tsx
import React from 'react';
import { PersianDatepicker } from 'react-persian-datepicker-element';
import type { PersianDateChangeEvent } from 'persian-datepicker-element';

const MyComponent = () => {
  const handleDateChange = (event: PersianDateChangeEvent) => {
    // Now all properties are properly typed and accessible
    console.log('Jalali date:', event.jalali);
    console.log('Gregorian date:', event.gregorian);
    console.log('ISO string:', event.isoString); // ✅ Now works correctly
    console.log('Formatted date:', event.formattedDate);
    console.log('Is holiday:', event.isHoliday);
    console.log('Events:', event.events);
    
    // Range selection properties
    if (event.isRange && event.range) {
      console.log('Range start:', event.range.start);
      console.log('Range end:', event.range.end);
      console.log('Range start ISO:', event.range.startISOString);
      console.log('Range end ISO:', event.range.endISOString);
    }
  };

  return (
    <PersianDatepicker
      onChange={handleDateChange}
      placeholder="انتخاب تاریخ"
      format="YYYY/MM/DD"
      showEvents={true}
      rtl={true}
    />
  );
};
```

## Available Properties

The `PersianDateChangeEvent` now includes all these properties:

- `jalali: [number, number, number]` - Jalali date as [year, month, day]
- `gregorian: [number, number, number]` - Gregorian date as [year, month, day]
- `isHoliday: boolean` - Whether the selected date is a holiday
- `events: PersianEvent[]` - Events associated with the selected date
- `formattedDate?: string` - Formatted date string according to the current format
- `isoString?: string` - ISO string representation of the date
- `isRange?: boolean` - Whether this is a range selection
- `range?: { ... }` - Range selection details when in range mode

## Range Selection Properties

When `isRange` is true, the `range` object contains:

- `start: [number, number, number] | null` - Start date in Jalali format
- `end: [number, number, number] | null` - End date in Jalali format
- `startISOString?: string | null` - Start date in ISO string format
- `endISOString?: string | null` - End date in ISO string format
- `startGregorian?: [number, number, number] | null` - Start date in Gregorian format
- `endGregorian?: [number, number, number] | null` - End date in Gregorian format

## Testing

The fix has been tested to ensure that:
1. All properties are properly typed and accessible
2. Range selection properties work correctly
3. TypeScript compilation passes without errors
4. The event structure matches the actual web component output 