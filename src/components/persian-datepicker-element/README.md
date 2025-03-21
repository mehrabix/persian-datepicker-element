# Persian Date Picker Element

A web component for selecting dates in the Persian (Jalali) calendar system.

## Features

- Full Persian (Jalali) calendar support
- Customizable using CSS variables
- Responsive design
- Shadow DOM encapsulation for style isolation
- SSR friendly

## Installation

```bash
npm install persian-datepicker-element
```

## Usage

```html
<!-- Import the component -->
<script type="module" src="path/to/persian-datepicker-element.js"></script>

<!-- Basic usage -->
<persian-datepicker-element></persian-datepicker-element>

<!-- With attributes -->
<persian-datepicker-element 
  placeholder="تاریخ تولد" 
  format="YYYY/MM/DD">
</persian-datepicker-element>
```

## Attributes

| Attribute    | Type    | Default    | Description                                  |
|--------------|---------|------------|----------------------------------------------|
| placeholder  | string  | "انتخاب تاریخ" | Placeholder text for the input              |
| format       | string  | "YYYY/MM/DD" | Format for the displayed date                |
| value        | string  | null       | Initial value (e.g., "1402/04/24")            |
| disabled     | boolean | false      | Whether the date picker is disabled           |
| min-date     | string  | null       | Minimum selectable date (e.g., "1400/01/01")  |
| max-date     | string  | null       | Maximum selectable date (e.g., "1410/12/29")  |

## Events

- `change`: Fired when a date is selected.

```javascript
const datePicker = document.querySelector('persian-datepicker-element');
datePicker.addEventListener('change', (e) => {
  console.log('Selected date (Jalali):', e.detail.jalali);
  console.log('Selected date (Gregorian):', e.detail.gregorian);
});
```

## JavaScript API

```javascript
// Get the selected date
const selectedDate = datePicker.getValue();

// Set a date programmatically
datePicker.setValue(1402, 4, 24);

// Clear the selected date
datePicker.clear();
```

## Styling

The component can be styled using CSS variables:

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

## Development

Requirements:
- Node.js 14+
- npm 7+

```bash
# Install dependencies
npm install

# Build the component
npm run build

# Run the development server
npm run serve

# Run tests
npm test
```

## License

MIT 