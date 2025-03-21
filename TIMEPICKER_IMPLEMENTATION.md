# Persian Time Picker Implementation Details

This document provides details about the implementation of the Persian Time Picker component.

## Component Structure

The Persian Time Picker component is implemented using the following files:

1. `src/components/persian-timepicker-element/persian-timepicker-element.ts` - Main component implementation
2. `src/components/persian-timepicker-element/index.ts` - Export and custom element registration
3. `src/components/persian-timepicker-element/types.ts` - TypeScript types and interfaces

## Core Features

### Time Management

- Supports both 12-hour and 24-hour formats
- Hour, minute, and optional seconds input
- AM/PM toggle for 12-hour format
- Keyboard navigation for accessibility
- Time incrementation and decrementation with validation

### UI Elements

- Input field for displaying selected time
- Popup panel with spinner controls for each time unit
- Increment/decrement buttons for each time unit
- AM/PM toggle button (when in 12-hour mode)
- Mobile-friendly touch interactions

### Customization

- Extensive CSS variables for styling customization
- Configurable time format (12/24 hour)
- Optional seconds display
- Custom labels and placeholders
- Disabled state support

## Implementation Details

### Class Structure

The main `PersianTimePickerElement` class extends `HTMLElement` and implements all time picker functionality:

- **Properties**:
  - Time state management (hour, minute, second, isAM)
  - UI state (isOpen, isDragging)
  - Options (showSeconds, use24HourFormat, etc.)
  - DOM references to created elements

- **Lifecycle Methods**:
  - `constructor()`: Initializes component and shadow DOM
  - `connectedCallback()`: Sets up events when element is added to DOM
  - `disconnectedCallback()`: Cleans up events when element is removed
  - `attributeChangedCallback()`: Handles attribute changes

- **Rendering Methods**:
  - `render()`: Creates the complete time picker UI
  - `renderStyles()`: Applies the component styles
  - `renderSpinners()`: Creates time spinners for hour, minute, and second
  - `createTimeSpinner()`: Helper to create individual spinner elements

- **Event Handlers**:
  - `togglePopup()`: Shows/hides the popup panel
  - `handleTimeIncrement()`: Increases a time value (hour, minute, or second)
  - `handleTimeDecrement()`: Decreases a time value
  - `handleInputClick()`: Shows the popup when input is clicked
  - `handleClickOutside()`: Hides popup when clicking outside
  - `handleDragStart()`, `handleDrag()`, `handleDragEnd()`: Manages touch/mouse drag interactions

- **Utility Methods**:
  - `updateTimeDisplay()`: Updates the input field with current time
  - `formatTimeForDisplay()`: Formats time according to current format settings
  - `dispatchTimeChangeEvent()`: Notifies about time changes
  - `applyOptions()`: Applies user options to the component

### Shadow DOM

The component uses Shadow DOM to encapsulate its styles and DOM structure, ensuring it doesn't conflict with the page's styles.

### CSS Variables

The component defines a comprehensive set of CSS variables for customization:

```css
--tp-primary-color
--tp-text-color
--tp-bg-color
--tp-border-color
--tp-input-border-radius
--tp-font-size
--tp-font-family
--tp-popup-width
--tp-popup-bg
--tp-popup-border-radius
--tp-item-hover-bg
--tp-box-shadow
...
```

### Events

The component dispatches the `timeChange` custom event when the time value changes, providing details about the new time:

```javascript
{
  hour: number,       // 0-23
  minute: number,     // 0-59
  second: number,     // 0-59
  timeString: string, // Formatted time string
  isAM: boolean       // For 12-hour format
}
```

## Accessibility Considerations

- Keyboard navigation support for all controls
- ARIA attributes for improved screen reader support
- Focus management for keyboard users
- High-contrast color scheme options through CSS variables
- Responsive design for all screen sizes

## Browser Compatibility

The implementation uses standard Web Components APIs with support in all modern browsers:

- Custom Elements
- Shadow DOM
- ES6 features (classes, template literals, etc.)

## Performance Optimizations

- Efficient rendering by minimizing DOM manipulations
- Throttled event handlers for drag operations
- Lazy initialization of popup elements
- Cleanup of event listeners in disconnectedCallback

## Future Improvements

Potential areas for enhancement:

1. Add time range validation (min/max time)
2. Integration with date picker for datetime selection
3. More animation options
4. Timezone support
5. More localization options for Persian time formats 