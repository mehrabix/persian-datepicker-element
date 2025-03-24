# Testing Persian Datepicker Element

This document describes the test suite for the Persian Datepicker Element, including what's tested and how to run the tests.

## Overview

The test suite includes multiple types of tests:

1. **Unit Tests**: Testing individual functions and components
2. **Integration Tests**: Testing how multiple components work together
3. **Event Tests**: Specifically testing event handling for the Persian calendar year 1404
4. **Configuration Tests**: Testing different user configuration options
5. **Hijri-to-Jalali Conversion Tests**: Testing accurate mapping of Islamic to Persian calendar dates

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
npm test

# Run tests with watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Files

The test suite includes the following files:

- `src/__tests__/persian-datepicker-element.test.ts`: Basic component tests
- `src/__tests__/event-utils.test.ts`: Tests for event utility functions
- `src/__tests__/hijri-utils.test.ts`: Tests for Hijri-to-Jalali calendar conversion
- `src/__tests__/calendar-events-1404.test.ts`: Persian year 1404 events tests
- `src/__tests__/datepicker-config-1404.test.ts`: Configuration options tests 
- `src/__tests__/integration.test.ts`: Integration tests
- `src/__tests__/year-change-events.test.ts`: Tests for event updates on year changes

## What is Tested

### Basic Component Functionality

- Component rendering and initialization
- Date selection and formatting
- Calendar navigation
- Input field interaction

### Event Utilities

- Loading and parsing events from JSON
- Filtering events by type and date
- Holiday detection
- Event tooltips display

### Hijri-to-Jalali Conversion

- Accurate conversion between Islamic calendar dates and Persian calendar
- Religious event date mapping to current Jalali year
- Handling of date validation and edge cases
- Proper refreshing of events when year changes

### Year 1404 Events

- Calendar accurately shows holidays and events for Persian year 1404
- Religious events appear on the correct Jalali dates
- Tooltip information is accurate and complete

### User Configuration

Tests for various user configuration options:

- Holiday type filtering (`holiday-types` attribute)
- Date formatting (`format` attribute)
- RTL/LTR direction (`rtl` attribute)
- Custom CSS styling (various CSS attributes)
- Custom button text and styling

### Mobile Specific Features

- Touch event handling
- Mobile tooltip display
- Close button functionality on mobile

## Religious Events Testing

Special attention is given to religious events (mostly from the Hijri calendar) to ensure they appear on the correct Jalali (Persian) dates. This includes:

- Ashura
- Ramadan
- Eid al-Fitr
- Eid al-Adha
- Other religious holidays

## Expected Test Coverage

The test suite aims to provide over 90% code coverage, with particular focus on:

- Event handling logic
- Date calculations and conversions
- User configuration options
- Calendar UI components

## Adding New Tests

When adding new tests, please follow these guidelines:

1. Place tests in the `src/__tests__/` directory
2. Use descriptive test names that indicate what's being tested
3. Group related tests using `describe` blocks
4. Use setup and teardown hooks appropriately
5. Mock external dependencies when necessary

## Test Utilities

Custom test utilities are provided to make testing easier:

- `wait`: For waiting a specific time to allow for DOM updates
- `dispatchEvent`: For simulating events with proper async handling
- `simulateKeyEvent`: For simulating keyboard events

## Common Testing Issues

- **Time Zone Differences**: Some tests related to date calculations might fail if run in different time zones. Make sure to account for this in your test logic.
- **DOM Events**: When testing events, ensure that event propagation is properly handled.
- **Asynchronous Operations**: Use `async/await` or appropriate Jest matchers for async operations. 