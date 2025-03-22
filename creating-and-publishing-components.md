# Creating and Publishing Web Components with React and Angular Wrappers

This guide will walk you through the complete process of creating a web component, publishing it to npm, and generating React and Angular wrappers for easier integration with those frameworks.

## Table of Contents

1. [Creating a Web Component](#creating-a-web-component)
2. [Building Your Component](#building-your-component)
3. [Publishing to npm](#publishing-to-npm)
4. [Generating Framework Wrappers](#generating-framework-wrappers)
   - [React Wrappers](#react-wrappers)
   - [Angular Wrappers](#angular-wrappers)
5. [Usage Examples](#usage-examples)
   - [Using in a React Application](#using-in-a-react-application)
   - [Using in an Angular Application](#using-in-an-angular-application)
6. [Advanced Customization](#advanced-customization)
7. [Troubleshooting](#troubleshooting)

## Creating a Web Component

Web Components are custom HTML elements that encapsulate functionality and styling. Here's how to create one:

1. **Set up your project structure**:

```bash
mkdir my-web-component
cd my-web-component
npm init -y
```

2. **Install dependencies**:

```bash
npm install --save-dev typescript rspack ts-loader
```

3. **Create your component**:

Create a file `src/index.ts` with the following structure:

```typescript
class MyComponent extends HTMLElement {
  // Shadow DOM for encapsulation
  private shadow: ShadowRoot;
  
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  
  // Called when element is connected to the DOM
  connectedCallback() {
    this.render();
  }
  
  // Called when attributes change
  static get observedAttributes() {
    return ['color', 'size'];
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  // Render the component
  private render() {
    const color = this.getAttribute('color') || 'blue';
    const size = this.getAttribute('size') || 'medium';
    
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .my-component {
          background-color: ${color};
          padding: ${size === 'small' ? '8px' : size === 'large' ? '24px' : '16px'};
          border-radius: 4px;
          color: white;
        }
      </style>
      <div class="my-component">
        <slot></slot>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('my-component', MyComponent);

export default MyComponent;
```

## Building Your Component

1. **Configure TypeScript**:

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

2. **Configure Rspack**:

Create a `rspack.config.js` file:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-component.js',
    library: {
      name: 'MyComponent',
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

3. **Add build scripts**:

Update your `package.json` with build scripts:

```json
{
  "scripts": {
    "build": "rspack",
    "dev": "rspack --watch"
  }
}
```

4. **Build your component**:

```bash
npm run build
```

## Publishing to npm

1. **Prepare your package.json**:

```json
{
  "name": "my-web-component",
  "version": "1.0.0",
  "description": "A custom web component",
  "main": "dist/my-component.js",
  "module": "dist/my-component.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "keywords": [
    "web-components",
    "custom-elements"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

2. **Create a README.md**:

```markdown
# My Web Component

A custom web component that can be used in any web application.

## Installation

```bash
npm install my-web-component
```

## Usage

```html
<script src="node_modules/my-web-component/dist/my-component.js"></script>
<my-component color="red" size="large">Hello World</my-component>
```

## Attributes

- `color`: The background color (default: blue)
- `size`: The size (small, medium, large) (default: medium)
```

3. **Login to npm**:

```bash
npm login
```

4. **Publish your package**:

```bash
npm publish
```

## Generating Framework Wrappers

To make it easier for developers to use your web component in React and Angular applications, you can generate framework-specific wrappers.

### React Wrappers

1. **Create a template for React components**:

Create a file named `component.tsx.styled.hbs` in your templates directory:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, WebComponentWrapper } from './{{componentName}}.styles';

// Import the web component
import 'my-web-component';

/**
 * {{componentName}} - A React component version of the my-web-component web component
 * 
 * This component was generated using the shadnext CLI.
 * It provides the same functionality as the original web component but with a React API.
 * This version uses styled-components for styling.
 */

interface {{componentName}}Props {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: any;
}

export const {{componentName}}: React.FC<{{componentName}}Props> = ({
  color = 'blue',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  // Reference to the web component
  const elementRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize web component
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial properties
    if (color) element.setAttribute('color', color);
    if (size) element.setAttribute('size', size);
  }, [color, size]);
  
  return (
    <Container 
      ref={containerRef} 
      className={className} 
      {...props}
    >
      <WebComponentWrapper>
        <my-component 
          ref={elementRef as React.RefObject<HTMLElement>}
        >
          {children}
        </my-component>
      </WebComponentWrapper>
    </Container>
  );
};
```

2. **Create a styles template**:

Create a file named `styles.ts.hbs`:

```typescript
import styled from 'styled-components';

interface ContainerProps {
  // Add any props needed for styling
}

// Main container for the component
export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
`;

// Wrapper for the web component to apply styled-components styles
export const WebComponentWrapper = styled.div`
  width: 100%;
  
  // Apply styles to the web component shadow DOM elements via CSS variables
  & > * {
    width: 100%;
  }
`;
```

3. **Create an index template**:

Create a file named `index.ts.hbs`:

```typescript
export { {{componentName}} } from './{{componentName}}';
```

### Angular Wrappers

1. **Create a template for Angular components**:

Create a file named `component.ts.hbs`:

```typescript
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

// Import web component (this happens in .module.ts or main.ts in a real application)
// import 'my-web-component';

@Component({
  selector: 'app-{{kebabCase componentName}}',
  templateUrl: './{{kebabCase componentName}}.component.html',
  styleUrls: ['./{{kebabCase componentName}}.component.scss']
})
export class {{componentName}}Component implements AfterViewInit, OnChanges {
  @ViewChild('webComponent') webComponentRef!: ElementRef<HTMLElement>;
  
  @Input() color: string = 'blue';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  ngAfterViewInit() {
    this.updateWebComponent();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (this.webComponentRef?.nativeElement) {
      this.updateWebComponent();
    }
  }
  
  private updateWebComponent() {
    const element = this.webComponentRef.nativeElement;
    
    // Set attributes based on inputs
    element.setAttribute('color', this.color);
    element.setAttribute('size', this.size);
  }
}
```

2. **Create a template for the HTML**:

Create a file named `component.html.hbs`:

```html
<div class="shadnext-my-component-wrapper">
  <my-component #webComponent>
    <ng-content></ng-content>
  </my-component>
</div>
```

3. **Create a template for the SCSS**:

Create a file named `component.scss.hbs`:

```scss
:host {
  display: block;
  width: 100%;
}

.shadnext-my-component-wrapper {
  position: relative;
  width: 100%;
  
  // Custom styles can be added here
  my-component {
    width: 100%;
    display: block;
  }
}
```

4. **Create a barrel index template**:

Create a file named `index.ts.hbs`:

```typescript
export { {{componentName}}Component } from './{{kebabCase componentName}}.component';
export { {{componentName}}Module } from './{{kebabCase componentName}}.module';
```

## Usage Examples

### Using in a React Application

1. **Install the component**:

```bash
npm install my-web-component
```

2. **Generate React wrapper**:

Use the templates above to generate React wrapper components for your web component.

3. **Use the wrapper in your React app**:

```jsx
import React from 'react';
import { MyComponent } from './components/MyComponent';

function App() {
  return (
    <div className="App">
      <h1>My React App</h1>
      <MyComponent color="red" size="large">
        This is my custom component
      </MyComponent>
    </div>
  );
}

export default App;
```

### Using in an Angular Application

1. **Install the component**:

```bash
npm install my-web-component
```

2. **Generate Angular wrapper**:

Use the templates above to generate Angular wrapper components for your web component.

3. **Import in your module**:

```typescript
import { NgModule } from '@angular/core';
import { MyComponentModule } from './components/my-component';

@NgModule({
  imports: [
    MyComponentModule
  ],
  // ...
})
export class AppModule { }
```

4. **Use in your template**:

```html
<app-my-component color="red" size="large">
  This is my custom component
</app-my-component>
```

## Advanced Customization

### Custom Events

Your web component can dispatch custom events that can be captured by the wrapper components:

```typescript
// In the web component
this.dispatchEvent(new CustomEvent('valueChange', { 
  detail: { value: newValue },
  bubbles: true,
  composed: true
}));

// In React wrapper
<my-component
  ref={elementRef}
  onValueChange={(e) => {
    const customEvent = e as CustomEvent;
    // Handle the event
    console.log(customEvent.detail.value);
  }}
/>

// In Angular wrapper
<my-component
  #webComponent
  (valueChange)="handleValueChange($event)"
></my-component>
```

### Styling

Both React and Angular wrappers can provide custom styling options:

```typescript
// React with styled-components
const Container = styled.div`
  // Custom styles
  --my-component-primary-color: ${props => props.theme.primaryColor};
`;

// Angular with CSS variables
:host {
  --my-component-primary-color: #3b82f6;
}
```

## Troubleshooting

### Common Issues

1. **Web component not defined**: Ensure the web component is properly imported and defined before using it.

2. **Styling issues**: Check if the shadow DOM is preventing your styles from reaching the component.

3. **Event handling**: Verify that custom events are properly dispatched with `bubbles: true` and `composed: true`.

4. **Framework integration**: Make sure you're correctly wrapping the web component and passing props/attributes.

### Getting Help

If you encounter issues, check the following resources:

- [Web Components Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [React Integration Guide](https://reactjs.org/docs/web-components.html)
- [Angular Elements Documentation](https://angular.io/guide/elements)

---

This guide provides a complete workflow for creating, building, publishing, and integrating web components with popular frameworks. By following these steps, you can create reusable components that work across different web applications. 