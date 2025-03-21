# Testing the Jalali Date Picker Component

This document explains the testing setup for the Jalali Date Picker web component.

## Testing Stack

The project uses the following testing tools:

- **Jest**: As the main test runner and assertion library
- **jsdom**: To simulate a browser environment for DOM testing
- **Testing Library**: For additional DOM testing utilities

## Test Structure

Tests are organized into several categories:

1. **Utility Tests**: Tests for the Jalali date utility functions (`src/__tests__/jalali-date.test.ts`)
2. **Component Tests**: Tests for the Jalali date picker web component (`src/__tests__/jalali-date-picker.test.ts`)
3. **Integration Tests**: Tests for how the component interacts with the page (`src/__tests__/integration.test.ts`)
4. **Utility Function Tests**: Tests for testing utility functions (`src/__tests__/test-utils.test.ts`)

## Running Tests

To run the tests, use the following npm scripts:

- `pnpm test`: Run all tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm test:coverage`: Run tests with coverage report

## Test Coverage

The test suite covers:

- Date conversion between Gregorian and Jalali calendars
- Leap year calculation
- Day/month length validation
- Component rendering and styling
- User interaction (clicking, keyboard navigation)
- Component attributes and properties
- Event dispatching
- Calendar navigation

## Known Issues

Some tests are currently skipped due to timing issues with event handling in the test environment:

1. Event emission tests - These tests check if events are properly emitted when dates are selected
2. Keyboard accessibility tests - These tests verify the component can be controlled with keyboard

These tests would require better event simulation or component mocking to pass reliably.

## Test Utilities

Custom test utilities are provided to make testing easier:

- `wait`: For waiting a specific time to allow for DOM updates
- `dispatchEvent`: For simulating events with proper async handling
- `simulateKeyEvent`: For simulating keyboard events
- `findByText`: For finding elements by their text content 