# Testing Guide for Persian Date Picker Element

This document provides comprehensive information about testing the Persian Date Picker component, including unit tests, integration tests, and framework-specific tests.

## Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Framework-Specific Tests](#framework-specific-tests)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Troubleshooting](#troubleshooting)

## Overview

The Persian Date Picker component uses Jest as its testing framework, with additional tools for framework-specific testing:

- **Jest**: For unit and integration testing
- **Testing Library**: For DOM testing utilities
- **JSDOM**: For browser environment simulation
- **Vitest**: For Vue-specific testing
- **Jest DOM**: For DOM-specific assertions

## Test Structure

The test suite is organized as follows:

```
├── src/
│   ├── __tests__/
│   │   ├── core/
│   │   │   ├── persian-datepicker-element.test.ts
│   │   │   ├── utils.test.ts
│   │   │   └── holidays.test.ts
│   │   ├── react/
│   │   │   └── persian-datepicker.test.tsx
│   │   ├── vue/
│   │   │   └── persian-datepicker.test.ts
│   │   └── angular/
│   │       └── persian-datepicker.component.spec.ts
│   └── ...
├── packages/
│   ├── react/
│   │   └── test/
│   ├── vue/
│   │   └── test/
│   └── angular/
│       └── test/
└── ...
```

## Running Tests

### Core Tests

```bash
# Run all tests
npm test

# Run core tests only
npm run test:core

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run tests in a specific file
npm test -- path/to/file.test.ts
```

### Framework-Specific Tests

```bash
# React tests
npm run test:react

# Vue tests
npm run test:vue

# Angular tests
npm run test:angular
```

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions and methods in isolation. Here's an example:

```typescript
import { PersianDatepickerElement } from '../src/persian-datepicker-element';

describe('PersianDatepickerElement', () => {
  let element: PersianDatepickerElement;

  beforeEach(() => {
    element = document.createElement('persian-datepicker-element') as PersianDatepickerElement;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should initialize with default values', () => {
    expect(element.value).toBe('');
    expect(element.format).toBe('YYYY/MM/DD');
    expect(element.showHolidays).toBe(false);
    expect(element.rtl).toBe(false);
  });

  it('should update value when setValue is called', () => {
    element.setValue(1402, 1, 1);
    expect(element.value).toBe('1402/01/01');
  });

  it('should emit change event when a date is selected', () => {
    const changeHandler = jest.fn();
    element.addEventListener('change', changeHandler);
    
    element.setValue(1402, 1, 1);
    
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          jalali: [1402, 1, 1],
          isHoliday: expect.any(Boolean),
          events: expect.any(Array)
        })
      })
    );
  });
});
```

### Integration Tests

Integration tests verify that different parts of the component work together correctly:

```typescript
describe('PersianDatepickerElement Integration', () => {
  it('should update calendar when month/year changes', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    // Open the calendar
    element.open();
    
    // Change month
    const nextButton = element.shadowRoot.querySelector('.next-month-button');
    nextButton.click();
    
    // Verify calendar updated
    const currentMonth = element.shadowRoot.querySelector('.current-month');
    expect(currentMonth.textContent).toMatch(/فروردین/);
    
    document.body.removeChild(element);
  });
  
  it('should handle range selection correctly', () => {
    const element = document.createElement('persian-datepicker-element');
    element.setAttribute('range-mode', '');
    document.body.appendChild(element);
    
    // Open calendar
    element.open();
    
    // Select start date
    const startDate = element.shadowRoot.querySelector('[data-day="1"]');
    startDate.click();
    
    // Select end date
    const endDate = element.shadowRoot.querySelector('[data-day="5"]');
    endDate.click();
    
    // Verify range selected
    const range = element.getRange();
    expect(range.start).toEqual([1402, 1, 1]);
    expect(range.end).toEqual([1402, 1, 5]);
    
    document.body.removeChild(element);
  });
});
```

### Accessibility Tests

```typescript
describe('PersianDatepickerElement Accessibility', () => {
  it('should have correct ARIA attributes', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    const input = element.shadowRoot.querySelector('input');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    
    document.body.removeChild(element);
  });
  
  it('should handle keyboard navigation', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    // Open calendar with keyboard
    element.focus();
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    // Navigate with arrow keys
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    
    // Verify focus moved
    const focusedDay = element.shadowRoot.querySelector(':focus');
    expect(focusedDay).toHaveAttribute('data-day', '2');
    
    document.body.removeChild(element);
  });
});
```

## Framework-Specific Tests

### React Tests

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { PersianDatepicker } from '../src/react';

describe('PersianDatepicker React Component', () => {
  it('should render correctly', () => {
    render(<PersianDatepicker placeholder="Select date" />);
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });
  
  it('should handle controlled mode', () => {
    const onChange = jest.fn();
    render(
      <PersianDatepicker
        value="1402/01/01"
        onChange={onChange}
      />
    );
    
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: '1402/01/02' } });
    
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          jalali: [1402, 1, 2]
        })
      })
    );
  });
});
```

### Vue Tests

```typescript
import { mount } from '@vue/test-utils';
import { PersianDatepicker } from '../src/vue';

describe('PersianDatepicker Vue Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(PersianDatepicker, {
      props: {
        placeholder: 'Select date'
      }
    });
    
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select date');
  });
  
  it('should handle v-model', async () => {
    const wrapper = mount(PersianDatepicker, {
      props: {
        modelValue: '1402/01/01',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    });
    
    await wrapper.find('input').setValue('1402/01/02');
    expect(wrapper.props('modelValue')).toBe('1402/01/02');
  });
});
```

### Angular Tests

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersianDatepickerComponent } from '../src/angular';

describe('PersianDatepickerComponent', () => {
  let component: PersianDatepickerComponent;
  let fixture: ComponentFixture<PersianDatepickerComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersianDatepickerComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should handle form control', () => {
    component.writeValue('1402/01/01');
    expect(component.value).toBe('1402/01/01');
    
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    
    component.value = '1402/01/02';
    component.onChange();
    
    expect(onChange).toHaveBeenCalledWith('1402/01/02');
  });
});
```

## Test Coverage

The test coverage report is generated after running tests with the `--coverage` flag. The current coverage targets are:

- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

To improve coverage:

1. Identify uncovered code paths in the coverage report
2. Write additional tests for edge cases
3. Add tests for error handling
4. Test framework-specific features

## Continuous Integration

Tests are automatically run on:

- Pull requests
- Merges to main branch
- Nightly builds

The CI pipeline includes:

1. Linting
2. Type checking
3. Unit tests
4. Integration tests
5. Framework-specific tests
6. Coverage reporting

## Troubleshooting

### Common Test Issues

1. **Shadow DOM Access**: When testing web components, remember to use `shadowRoot` to access elements inside the shadow DOM.

2. **Async Operations**: Use `async/await` or `done` callback for tests involving asynchronous operations.

3. **Event Handling**: For custom events, use `CustomEvent` and include the correct `detail` property.

4. **Framework Integration**: When testing framework wrappers, ensure you're testing both the wrapper functionality and the underlying web component.

### Debugging Tests

1. Use `console.log` or `debugger` statements in tests
2. Run tests in watch mode with `--watch`
3. Use `--verbose` flag for detailed output
4. Check test coverage report for uncovered code

### Performance Considerations

1. Use `beforeAll` for expensive setup
2. Clean up DOM elements in `afterEach`
3. Mock external dependencies
4. Use `jest.mock()` for complex modules

## Best Practices

1. **Test Organization**:
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Test Isolation**:
   - Each test should be independent
   - Clean up after each test
   - Don't rely on test order

3. **Assertions**:
   - Use specific assertions
   - Include meaningful error messages
   - Test both positive and negative cases

4. **Code Coverage**:
   - Aim for high coverage
   - Focus on critical paths
   - Test edge cases and error conditions

5. **Maintenance**:
   - Keep tests up to date with code changes
   - Refactor tests when refactoring code
   - Document complex test setups
