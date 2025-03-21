# Persian Date Picker & Time Picker Web Components

A collection of Web Components for Persian (Jalali) calendar date and time selection.

## Features

### Persian Date Picker
- Fully customizable Persian (Jalali) calendar date picker
- Built as a native Web Component for maximum compatibility
- Lightweight with no dependencies
- Extensive CSS customization options
- Date conversion utilities included

### Persian Time Picker
- Customizable time picker for Persian UI
- 12-hour and 24-hour format support
- Optional seconds display
- Keyboard navigation
- Full RTL support
- Multiple styling options through CSS variables

## Installation

```bash
npm install persian-datepicker-webcomponents
```

## Usage

### Date Picker

```html
<!-- Import as script -->
<script type="module" src="path/to/persian-datepicker-element.js"></script>

<!-- Basic usage -->
<persian-datepicker-element></persian-datepicker-element>

<!-- With attributes -->
<persian-datepicker-element 
  placeholder="تاریخ تولد" 
  format="YYYY/MM/DD">
</persian-datepicker-element>
```

```javascript
// Import in JavaScript
import { PersianDatePickerElement } from 'persian-datepicker-webcomponents';

// Listen for date change events
const datePicker = document.querySelector('persian-datepicker-element');
datePicker.addEventListener('change', (e) => {
  console.log('Selected date (Jalali):', e.detail.jalali);
  console.log('Selected date (Gregorian):', e.detail.gregorian);
});
```

### Time Picker

```html
<!-- Import as script -->
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

```javascript
// Import in JavaScript
import { PersianTimePickerElement } from 'persian-datepicker-webcomponents';

// Listen for time change events
const timePicker = document.querySelector('persian-timepicker-element');
timePicker.addEventListener('timeChange', (e) => {
  console.log('Selected time:', e.detail.timeString);
  console.log('Hour:', e.detail.hour);
  console.log('Minute:', e.detail.minute);
});
```

## Configuration

### Date Picker Attributes

| Attribute    | Type    | Default    | Description                                  |
|--------------|---------|------------|----------------------------------------------|
| placeholder  | string  | "انتخاب تاریخ" | Placeholder text for the input              |
| format       | string  | "YYYY/MM/DD" | Format for the displayed date                |
| value        | string  | null       | Initial value (e.g., "1402/04/24")            |
| disabled     | boolean | false      | Whether the date picker is disabled           |
| min-date     | string  | null       | Minimum selectable date (e.g., "1400/01/01")  |
| max-date     | string  | null       | Maximum selectable date (e.g., "1410/12/29")  |

### Time Picker Attributes

| Attribute           | Type    | Default        | Description                             |
|---------------------|---------|----------------|-----------------------------------------|
| placeholder         | string  | "انتخاب زمان"    | Placeholder text for the input          |
| hour                | number  | Current hour   | Initial hour value                      |
| minute              | number  | Current minute | Initial minute value                    |
| second              | number  | Current second | Initial second value                    |
| use-24-hour-format  | boolean | false          | Whether to use 24-hour format           |
| show-seconds        | boolean | false          | Whether to show seconds selection       |
| disabled            | boolean | false          | Whether the time picker is disabled      |
| rtl                 | boolean | true           | Whether to use RTL layout               |
| default-time        | string  | null           | Initial time (e.g., "14:30" or "02:30 ب.ظ") |

## Styling

Both components support extensive customization through CSS variables.

### Date Picker CSS Variables

```css
persian-datepicker-element {
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  --jdp-border-radius: 6px;
  --jdp-font-family: Tahoma, Arial, sans-serif;
}
```

### Time Picker CSS Variables

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

## Project Structure

The project is organized as follows:

```
/
├── dist/                  # Built components
│   ├── persian-datepicker-element.js
│   ├── persian-datepicker-element.min.js
│   ├── persian-datepicker-element.esm.js
│   ├── persian-timepicker-element.js
│   ├── persian-timepicker-element.min.js
│   └── persian-timepicker-element.esm.js
├── src/
│   ├── components/        # Component source code
│   │   ├── persian-datepicker-element/
│   │   └── persian-timepicker-element/
│   ├── utils/             # Shared utilities
│   └── __test-utils__/    # Test utilities
├── examples/              # Usage examples
└── tests/                 # Tests
```

## Examples

See the `/examples` directory for complete usage examples:
- `datepicker-example.html` - Examples of using the date picker
- `timepicker-example.html` - Examples of using the time picker

## Development

Requirements:
- Node.js 14+
- npm 7+

```bash
# Install dependencies
npm install

# Build all components
npm run build

# Build individual components
npm run build:datepicker
npm run build:timepicker

# Run the development server
npm run serve

# Run tests
npm test
```

## Browser Support

- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+
- Opera 54+

## License

MIT 