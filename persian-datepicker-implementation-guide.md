# Persian Date Picker Component Implementation Guide

This guide provides specific steps for implementing the Persian Date Picker component, building it, publishing it to npm, and generating React and Angular wrappers.

## Table of Contents

1. [Setting Up the Project](#setting-up-the-project)
2. [Building the Component](#building-the-component)
3. [Publishing to npm](#publishing-to-npm)
4. [Generating Framework Wrappers](#generating-framework-wrappers)
5. [Usage Examples](#usage-examples)

## Setting Up the Project

1. **Create a new project**:

```bash
mkdir persian-datepicker-element
cd persian-datepicker-element
npm init -y
```

2. **Install development dependencies**:

```bash
npm install --save-dev typescript rspack ts-loader
```

3. **Create the component structure**:

```
persian-datepicker-element/
├── src/
│   ├── components/
│   │   └── persian-datepicker-element/
│   │       ├── index.ts
│   │       └── persian-datepicker.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── rspack.config.js
```

4. **Implement the Persian Date Picker component**:

In `src/components/persian-datepicker-element/persian-datepicker.ts`:

```typescript
class PersianDatePicker extends HTMLElement {
  private shadow: ShadowRoot;
  private selectedDate: string | null = null;
  
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['date', 'placeholder', 'theme'];
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === 'date') {
        this.selectedDate = newValue;
      }
      this.render();
    }
  }
  
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }
  
  private attachEventListeners() {
    // Add event listeners for date selection
    const dateContainer = this.shadow.querySelector('.date-container');
    if (dateContainer) {
      dateContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('date-item')) {
          const date = target.getAttribute('data-date');
          if (date) {
            this.selectedDate = date;
            this.render();
            
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('dateSelected', {
              detail: date,
              bubbles: true,
              composed: true
            }));
          }
        }
      });
    }
  }
  
  private render() {
    const placeholder = this.getAttribute('placeholder') || 'انتخاب تاریخ';
    const theme = this.getAttribute('theme') || 'light';
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif;
        }
        
        .persian-datepicker {
          --primary-color: #3b82f6;
          --background-color: ${theme === 'dark' ? '#1e293b' : '#ffffff'};
          --text-color: ${theme === 'dark' ? '#e2e8f0' : '#0f172a'};
          --border-color: ${theme === 'dark' ? '#475569' : '#e2e8f0'};
          --hover-color: ${theme === 'dark' ? '#334155' : '#f1f5f9'};
          
          width: 100%;
          direction: rtl;
        }
        
        .input-container {
          position: relative;
          width: 100%;
        }
        
        .date-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 14px;
          color: var(--text-color);
          background-color: var(--background-color);
        }
        
        .date-container {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-top: 8px;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--background-color);
        }
        
        .date-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          cursor: pointer;
          border-radius: 50%;
          color: var(--text-color);
        }
        
        .date-item:hover {
          background-color: var(--hover-color);
        }
        
        .date-item.selected {
          background-color: var(--primary-color);
          color: white;
        }
        
        .weekday {
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          color: var(--text-color);
          opacity: 0.7;
        }
      </style>
      
      <div class="persian-datepicker">
        <div class="input-container">
          <input type="text" class="date-input" placeholder="${placeholder}" value="${this.selectedDate || ''}" readonly>
        </div>
        <div class="date-container">
          <div class="weekday">ش</div>
          <div class="weekday">ی</div>
          <div class="weekday">د</div>
          <div class="weekday">س</div>
          <div class="weekday">چ</div>
          <div class="weekday">پ</div>
          <div class="weekday">ج</div>
          
          <!-- Generate date items dynamically -->
          ${this.generateDateItems()}
        </div>
      </div>
    `;
  }
  
  private generateDateItems() {
    // Simplified example - in a real component, you would use a proper Persian calendar library
    const currentDate = new Date();
    let html = '';
    
    // Generate 31 days (simplified example)
    for (let i = 1; i <= 31; i++) {
      const dateValue = `1402/${currentDate.getMonth() + 1}/${i}`;
      const isSelected = this.selectedDate === dateValue;
      
      html += `
        <div class="date-item ${isSelected ? 'selected' : ''}" data-date="${dateValue}">
          ${i}
        </div>
      `;
    }
    
    return html;
  }
}

customElements.define('persian-datepicker', PersianDatePicker);

export default PersianDatePicker;
```

In `src/components/persian-datepicker-element/index.ts`:

```typescript
import PersianDatePicker from './persian-datepicker';
export default PersianDatePicker;
```

In `src/index.ts`:

```typescript
import PersianDatePicker from './components/persian-datepicker-element';
export default PersianDatePicker;
```

## Building the Component

1. **Create a TypeScript configuration**:

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

2. **Set up Rspack configuration**:

Create an `rspack.config.js` file:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'persian-datepicker-element.js',
    library: {
      name: 'PersianDatepickerElement',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'production'
};
```

3. **Add build scripts to package.json**:

```json
{
  "scripts": {
    "build": "rspack",
    "dev": "rspack --watch"
  }
}
```

4. **Build the component**:

```bash
npm run build
```

## Publishing to npm

1. **Update package.json**:

```json
{
  "name": "persian-datepicker-element",
  "version": "1.0.0",
  "description": "A web component for Persian (Jalali) date selection",
  "main": "dist/persian-datepicker-element.js",
  "module": "dist/persian-datepicker-element.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "keywords": [
    "web-components",
    "persian-calendar",
    "jalali-date",
    "datepicker"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

2. **Create a README.md**:

```markdown
# Persian Date Picker Element

A web component for selecting dates using the Persian (Jalali) calendar.

## Installation

```bash
npm install persian-datepicker-element
```

## Usage

```html
<script src="node_modules/persian-datepicker-element/dist/persian-datepicker-element.js"></script>
<persian-datepicker placeholder="انتخاب تاریخ" theme="light"></persian-datepicker>
```

## Attributes

- `date`: The selected date in format YYYY/MM/DD
- `placeholder`: Placeholder text for the input (default: "انتخاب تاریخ")
- `theme`: Color theme, either "light" or "dark" (default: "light")

## Events

- `dateSelected`: Triggered when a date is selected, with the date as detail
```

3. **Publish to npm**:

```bash
npm login
npm publish
```

## Generating Framework Wrappers

### Creating Templates

1. **Set up a templates directory**:

```
persian-datepicker-element/
└── templates/
    ├── angular/
    │   ├── component.ts.hbs
    │   ├── component.html.hbs
    │   ├── component.scss.hbs
    │   └── index.ts.hbs
    └── react/
        ├── component.tsx.styled.hbs
        ├── styles.ts.hbs
        └── index.ts.hbs
```

2. **React wrapper templates**:

In `templates/react/component.tsx.styled.hbs`:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, WebComponentWrapper } from './{{componentName}}.styles';

// Import the web component
import 'persian-datepicker-element';

/**
 * {{componentName}} - A React component version of the persian-datepicker-element web component
 * 
 * This component was generated using the shadnext CLI.
 * It provides the same functionality as the original web component but with a React API.
 * This version uses styled-components for styling.
 */

interface {{componentName}}Props {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  rtl?: boolean;
  primaryColor?: string;
  theme?: 'light' | 'dark';
  className?: string;
  [key: string]: any;
}

export const {{componentName}}: React.FC<{{componentName}}Props> = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  rtl = true,
  primaryColor = '#3b82f6',
  theme = 'light',
  className = '',
  ...props
}) => {
  // State
  const [selectedDate, setSelectedDate] = useState<string | null>(value || null);
  const elementRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize web component
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial properties
    if (value) element.setAttribute('date', value);
    if (placeholder) element.setAttribute('placeholder', placeholder);
    element.setAttribute('theme', theme);
    
    // Add event listener
    const handleDateSelected = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSelectedDate(customEvent.detail);
      if (onChange) onChange(customEvent.detail);
    };

    element.addEventListener('dateSelected', handleDateSelected);
    
    return () => {
      element.removeEventListener('dateSelected', handleDateSelected);
    };
  }, [value, placeholder, theme, onChange]);
  
  return (
    <Container 
      ref={containerRef} 
      rtl={rtl} 
      primaryColor={primaryColor}
      theme={theme}
      className={className} 
      {...props}
    >
      <WebComponentWrapper>
        <persian-datepicker 
          ref={elementRef as React.RefObject<HTMLElement>}
        />
      </WebComponentWrapper>
    </Container>
  );
};
```

In `templates/react/styles.ts.hbs`:

```typescript
import styled from 'styled-components';

interface ContainerProps {
  rtl?: boolean;
  primaryColor?: string;
  theme?: 'light' | 'dark';
}

// Main container for the component
export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif;
  direction: ${props => props.rtl ? 'rtl' : 'ltr'};

  // Theme variables
  --primary-color: ${props => props.primaryColor || '#3b82f6'};
  --background-color: ${props => props.theme === 'dark' ? '#1e293b' : '#ffffff'};
  --text-color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#0f172a'};
  --border-color: ${props => props.theme === 'dark' ? '#475569' : '#e2e8f0'};
  --hover-color: ${props => props.theme === 'dark' ? '#334155' : '#f1f5f9'};
  --border-radius: 0.375rem;
`;

// Wrapper for the web component to apply styled-components styles
export const WebComponentWrapper = styled.div`
  width: 100%;
  
  // Apply styles to the web component shadow DOM elements via CSS variables
  & > * {
    --primary-color: var(--primary-color);
    --background-color: var(--background-color);
    --text-color: var(--text-color);
    --border-color: var(--border-color);
    --hover-color: var(--hover-color);
    width: 100%;
  }
`;
```

In `templates/react/index.ts.hbs`:

```typescript
export { {{componentName}} } from './{{componentName}}';
```

3. **Angular wrapper templates**:

In `templates/angular/component.ts.hbs`:

```typescript
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-{{kebabCase componentName}}',
  templateUrl: './{{kebabCase componentName}}.component.html',
  styleUrls: ['./{{kebabCase componentName}}.component.scss']
})
export class {{componentName}}Component implements AfterViewInit, OnChanges {
  @ViewChild('datepicker') datepickerRef!: ElementRef<HTMLElement>;
  
  @Input() date: string | null = null;
  @Input() placeholder: string = 'انتخاب تاریخ';
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() rtl: boolean = true;
  @Input() primaryColor: string = '#3b82f6';
  
  @Output() dateSelected = new EventEmitter<string>();
  
  ngAfterViewInit() {
    this.updateDatepicker();
    this.setupEventListeners();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (this.datepickerRef?.nativeElement) {
      this.updateDatepicker();
    }
  }
  
  private updateDatepicker() {
    const element = this.datepickerRef.nativeElement;
    
    if (this.date) {
      element.setAttribute('date', this.date);
    }
    
    element.setAttribute('placeholder', this.placeholder);
    element.setAttribute('theme', this.theme);
  }
  
  private setupEventListeners() {
    const element = this.datepickerRef.nativeElement;
    
    element.addEventListener('dateSelected', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.date = customEvent.detail;
      this.dateSelected.emit(customEvent.detail);
    });
  }
}
```

In `templates/angular/component.html.hbs`:

```html
<div class="shadnext-persian-datepicker-wrapper" [ngClass]="{'rtl': rtl, 'dark-theme': theme === 'dark'}" [style.--primary-color]="primaryColor">
  <persian-datepicker #datepicker></persian-datepicker>
</div>
```

In `templates/angular/component.scss.hbs`:

```scss
:host {
  display: block;
  width: 100%;
  font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif;
}

.shadnext-persian-datepicker-wrapper {
  position: relative;
  width: 100%;
  
  // Default theme variables
  --primary-color: #3b82f6;
  --background-color: #ffffff;
  --text-color: #0f172a;
  --border-color: #e2e8f0;
  --hover-color: #f1f5f9;
  --border-radius: 0.375rem;
  
  &.rtl {
    direction: rtl;
  }
  
  &.dark-theme {
    --background-color: #1e293b;
    --text-color: #e2e8f0;
    --border-color: #475569;
    --hover-color: #334155;
  }
  
  // Pass the CSS variables to the web component
  persian-datepicker {
    --primary-color: var(--primary-color);
    --background-color: var(--background-color);
    --text-color: var(--text-color);
    --border-color: var(--border-color);
    --hover-color: var(--hover-color);
    width: 100%;
    display: block;
  }
}
```

In `templates/angular/index.ts.hbs`:

```typescript
export { {{componentName}}Component } from './{{kebabCase componentName}}.component';
export { {{componentName}}Module } from './{{kebabCase componentName}}.module';
```

## Usage Examples

### Using the Web Component Directly

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Persian Date Picker Example</title>
  <script src="node_modules/persian-datepicker-element/dist/persian-datepicker-element.js"></script>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .container {
      margin-bottom: 2rem;
    }
  </style>
</head>
<body>
  <h1>Persian Date Picker Examples</h1>
  
  <div class="container">
    <h2>Light Theme</h2>
    <persian-datepicker placeholder="انتخاب تاریخ" theme="light"></persian-datepicker>
  </div>
  
  <div class="container">
    <h2>Dark Theme</h2>
    <persian-datepicker placeholder="انتخاب تاریخ" theme="dark"></persian-datepicker>
  </div>
  
  <script>
    // Add event listeners
    document.querySelectorAll('persian-datepicker').forEach(picker => {
      picker.addEventListener('dateSelected', e => {
        console.log('Selected date:', e.detail);
      });
    });
  </script>
</body>
</html>
```

### Using in React

After generating React wrappers:

```jsx
import React, { useState } from 'react';
import { PersianDatePicker } from './components/PersianDatePicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };
  
  return (
    <div className="App">
      <header>
        <h1>React Persian Date Picker Example</h1>
      </header>
      
      <main>
        <div className="picker-container">
          <h2>Light Theme</h2>
          <PersianDatePicker 
            value={selectedDate}
            onChange={handleDateChange}
            theme="light"
          />
        </div>
        
        <div className="picker-container">
          <h2>Dark Theme</h2>
          <PersianDatePicker 
            value={selectedDate}
            onChange={handleDateChange}
            theme="dark"
            primaryColor="#8b5cf6"
          />
        </div>
        
        {selectedDate && (
          <div className="selected-date">
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

### Using in Angular

After generating Angular wrappers:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersianDatePickerModule } from './components/persian-date-picker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PersianDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Angular Persian Date Picker Example</h1>
      
      <div class="picker-container">
        <h2>Light Theme</h2>
        <app-persian-date-picker
          [date]="selectedDate"
          (dateSelected)="onDateSelected($event)"
          theme="light"
        ></app-persian-date-picker>
      </div>
      
      <div class="picker-container">
        <h2>Dark Theme</h2>
        <app-persian-date-picker
          [date]="selectedDate"
          (dateSelected)="onDateSelected($event)"
          theme="dark"
          primaryColor="#8b5cf6"
        ></app-persian-date-picker>
      </div>
      
      <div *ngIf="selectedDate" class="selected-date">
        <p>Selected date: {{ selectedDate }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .picker-container {
      margin-bottom: 2rem;
    }
    
    .selected-date {
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 8px;
      margin-top: 2rem;
    }
  `]
})
export class AppComponent {
  selectedDate: string | null = null;
  
  onDateSelected(date: string) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
```

---

By following this guide, you can create, build, and publish a Persian Date Picker web component to npm, along with generating React and Angular wrappers for easier integration with those frameworks. 