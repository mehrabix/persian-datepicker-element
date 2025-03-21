# Persian Time Picker Element

A web component for selecting time in both 12-hour and 24-hour formats with Persian (Jalali) localization.

## Features

- Support for both 12-hour and 24-hour time formats
- AM/PM selection with Persian localization (ق.ظ/ب.ظ)
- Optional seconds display
- Customizable using CSS variables
- Spinner-based time selection
- Shadow DOM encapsulation for style isolation
- SSR friendly

## Installation

```bash
npm install persian-timepicker-element
```

## Usage

```html
<!-- Import the component -->
<script type="module" src="path/to/persian-timepicker-element.js"></script>

<!-- Basic usage -->
<persian-timepicker-element></persian-timepicker-element>

<!-- With attributes -->
<persian-timepicker-element 
  placeholder="زمان جلسه"
  use-24-hour-format="true" 
  show-seconds="true">
</persian-timepicker-element>
```

## Attributes

| Attribute           | Type    | Default        | Description                             |
|---------------------|---------|----------------|-----------------------------------------|
| placeholder         | string  | "انتخاب زمان"    | Placeholder text for the input          |
| hour                | number  | Current hour   | Initial hour value                      |
| minute              | number  | Current minute | Initial minute value                    |
| second              | number  | Current second | Initial second value                    |
| use-24-hour-format  | boolean | false          | Whether to use 24-hour format           |
| use-24-hours        | boolean | false          | Alias for use-24-hour-format            |
| show-seconds        | boolean | false          | Whether to show seconds selection       |
| disabled            | boolean | false          | Whether the time picker is disabled      |
| rtl                 | boolean | true           | Whether to use RTL layout               |
| default-time        | string  | null           | Initial time (e.g., "14:30" or "02:30 ب.ظ") |

## Events

- `timeChange`: Fired when a time is selected or changed.

```javascript
const timePicker = document.querySelector('persian-timepicker-element');
timePicker.addEventListener('timeChange', (e) => {
  console.log('Selected hour:', e.detail.hour);
  console.log('Selected minute:', e.detail.minute);
  console.log('Selected second:', e.detail.second);
  console.log('Is AM:', e.detail.isAM);
  console.log('Formatted time:', e.detail.timeString);
});
```

## JavaScript API

```javascript
// Get the selected time
const timeValues = timePicker.getValue();

// Set time programmatically (24-hour format)
timePicker.setValue(14, 30, 0);

// Clear the selected time
timePicker.clear();
```

## Styling

The component can be styled using CSS variables:

```css
persian-timepicker-element {
  --jtp-primary: #0891b2;
  --jtp-primary-hover: #0e7490;
  --jtp-primary-foreground: #ffffff;
  --jtp-background: #ffffff;
  --jtp-foreground: #1e293b;
  --jtp-muted: #f1f5f9;
  --jtp-muted-foreground: #64748b;
  --jtp-border: #e2e8f0;
  --jtp-ring: #0284c7;
  --jtp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jtp-font-size: 14px;
  --jtp-border-radius: 6px;
}
```

## Development

Requirements:
- Node.js 14+
- npm 7+

```bash
# Install dependencies
npm install

# Build the component
npm run build:timepicker

# Run the development server
npm run serve

# Run tests
npm test
```

## License

MIT 