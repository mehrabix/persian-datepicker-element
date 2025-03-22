# Persian Date Picker for React

This directory contains a React implementation of the Persian Date Picker that has been created by directly adapting the original web component code.

## Why Copy Instead of Using the Web Component?

While you can use the `@shadnext/persian-datepicker-element` web component directly in React, there are several advantages to copying and adapting the code:

1. **Full Customization**: You have complete control over every aspect of the component
2. **React Patterns**: Use React's state management, context, and hooks
3. **Framework Integration**: Better integration with React's ecosystem (forms, routing, state management)
4. **Performance**: Avoid the overhead of communicating between React and Custom Elements
5. **TypeScript**: Better type safety and intellisense with direct React components

## Files in this Example

- `PersianDatePickerReact.jsx` - The main component implementation
- `App.jsx` - A demo application showing how to use the component
- `README.md` - This documentation file

## How to Use in Your Project

1. Copy the `PersianDatePickerReact.jsx` file to your project
2. Import and use it like any other React component:

```jsx
import PersianDatePickerReact from './path/to/PersianDatePickerReact';

function MyForm() {
  const handleDateChange = (dateInfo) => {
    console.log('Selected date:', dateInfo);
  };

  return (
    <form>
      <label>Birth Date:</label>
      <PersianDatePickerReact
        onChange={handleDateChange}
        placeholder="تاریخ تولد"
        primaryColor="#8b5cf6"
      />
    </form>
  );
}
```

## Customization Options

### Props

The component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | String, Date, PersianDate | `null` | Initial value |
| `onChange` | Function | `undefined` | Called when date changes |
| `placeholder` | String | `"انتخاب تاریخ"` | Input placeholder |
| `rtl` | Boolean | `true` | Right-to-left layout |
| `primaryColor` | String | `"#3b82f6"` | Primary theme color |
| `className` | String | `""` | Additional CSS classes |

### Styling

Styles are defined as a template literal in the component. You can modify them directly in the component file:

```jsx
const styles = `
  .persian-datepicker-container {
    /* Your custom styles here */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  /* Override other styles as needed */
`;
```

### Adding Features

Since you have the full source code, you can add features like:

- Date range selection
- Time selection
- Custom validation
- Multiple calendars
- Animations and transitions
- Advanced keyboard navigation

## How This Was Created

This React component was created by:

1. Analyzing the original web component structure
2. Converting Shadow DOM styles to React inline styles or CSS-in-JS
3. Replacing custom element lifecycle methods with React hooks
4. Converting imperative DOM manipulation to React's declarative rendering
5. Adapting the event system to use React's synthetic events

## License

This adaptation is available under the same MIT license as the original component. 