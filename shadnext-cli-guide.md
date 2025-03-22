# ShadNext CLI - Wrapper Generator Guide

This guide explains how to use the ShadNext CLI tool to automatically generate React and Angular wrapper components for your web components.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Generating Wrappers](#generating-wrappers)
4. [Customizing Templates](#customizing-templates)
5. [Advanced Usage](#advanced-usage)

## Installation

Install the ShadNext CLI tool globally:

```bash
npm install -g @shadnext/cli
```

Or use it directly with npx:

```bash
npx @shadnext/cli [command] [options]
```

## Configuration

### Basic Configuration

Create a `shadnext.config.js` file in your project root:

```javascript
module.exports = {
  // The name of your web component (without the element suffix)
  componentName: 'persian-datepicker',
  
  // The npm package name
  packageName: 'persian-datepicker-element',
  
  // Output directories for generated wrappers
  outputDirs: {
    react: './wrappers/react',
    angular: './wrappers/angular',
    vue: './wrappers/vue' // Optional
  },
  
  // Framework options
  frameworks: ['react', 'angular'], // Which frameworks to generate for
  
  // Component properties/attributes
  props: [
    { name: 'date', type: 'string', description: 'Selected date in YYYY/MM/DD format' },
    { name: 'placeholder', type: 'string', default: 'انتخاب تاریخ', description: 'Input placeholder text' },
    { name: 'theme', type: 'string', options: ['light', 'dark'], default: 'light', description: 'Component theme' },
    { name: 'rtl', type: 'boolean', default: true, description: 'Right-to-left text direction' },
    { name: 'primaryColor', type: 'string', default: '#3b82f6', description: 'Primary color for highlights and selections' }
  ],
  
  // Events emitted by the component
  events: [
    { name: 'dateSelected', type: 'CustomEvent<string>', description: 'Triggered when a date is selected' }
  ]
};
```

### Extended Configuration

For more control, you can extend the configuration:

```javascript
module.exports = {
  // ...basic config from above,
  
  // Styling options
  styling: {
    react: 'styled-components', // Options: 'styled-components', 'css-modules', 'css'
    angular: 'scss', // Options: 'scss', 'css'
  },
  
  // Templates directory (if you want to use custom templates)
  templatesDir: './custom-templates',
  
  // Dependencies to include in the generated packages
  dependencies: {
    react: {
      'styled-components': '^6.0.0'
    },
    angular: {
      '@angular/core': '^16.0.0'
    }
  }
};
```

## Generating Wrappers

Once configured, you can generate wrappers with a single command:

```bash
npx @shadnext/cli generate
```

This will:

1. Read your configuration
2. Process the templates
3. Generate wrapper components for the specified frameworks
4. Create necessary package.json files for publishing

### Specific Framework

Generate wrappers for a specific framework:

```bash
npx @shadnext/cli generate --framework=react
```

### Output Location

Specify a custom output location:

```bash
npx @shadnext/cli generate --output=./my-wrappers
```

## Customizing Templates

The CLI uses Handlebars templates to generate wrapper code. You can customize these templates to match your project's needs.

### Default Template Location

The default templates are located within the CLI package, but you can override them by creating your own in a custom directory.

### Creating Custom Templates

1. Create a templates directory in your project:

```
my-project/
└── custom-templates/
    ├── react/
    │   ├── component.tsx.hbs
    │   ├── styles.ts.hbs
    │   └── index.ts.hbs
    └── angular/
        ├── component.ts.hbs
        ├── component.html.hbs
        ├── component.scss.hbs
        └── index.ts.hbs
```

2. Copy the default templates as a starting point
3. Modify them according to your needs
4. Update your configuration to use the custom templates:

```javascript
module.exports = {
  // ...other config,
  templatesDir: './custom-templates'
};
```

### Available Template Variables

In your templates, you can use these variables:

- `{{componentName}}` - The camelCase component name (e.g., "PersianDatePicker")
- `{{originalName}}` - The original web component name (e.g., "persian-datepicker-element")
- `{{kebabCase componentName}}` - The kebab-case version (e.g., "persian-date-picker")
- `{{props}}` - Array of component properties
- `{{events}}` - Array of component events
- `{{styled}}` - Boolean for styled components (React)
- `{{standalone}}` - Boolean for standalone components (Angular)

## Advanced Usage

### Publishing Wrappers

You can automatically publish the generated wrappers to npm:

```bash
npx @shadnext/cli publish --framework=react
```

This will:
1. Generate the wrapper components
2. Create a package.json with proper dependencies
3. Build the package
4. Publish to npm with the name format `@shadnext/react-persian-datepicker`

### Versioning

Control the version of your wrapper packages:

```bash
npx @shadnext/cli generate --version=1.2.0
```

### TypeScript Type Definitions

Generate TypeScript definitions for your component:

```bash
npx @shadnext/cli generate --types
```

### Multiple Components

Generate wrappers for multiple components at once:

```javascript
// shadnext.config.js
module.exports = {
  components: [
    {
      componentName: 'persian-datepicker',
      packageName: 'persian-datepicker-element',
      // ...component specific config
    },
    {
      componentName: 'persian-timepicker',
      packageName: 'persian-timepicker-element',
      // ...component specific config
    }
  ],
  // ...shared config
};
```

## Example Usage Workflow

Here's a complete workflow example:

1. Create your web component and publish it to npm
2. Install the ShadNext CLI:

```bash
npm install -g @shadnext/cli
```

3. Create configuration:

```bash
npx @shadnext/cli init
```

4. Edit the generated `shadnext.config.js` file
5. Generate wrappers:

```bash
npx @shadnext/cli generate
```

6. Test the generated wrappers:

```bash
npx @shadnext/cli test
```

7. Publish to npm:

```bash
npx @shadnext/cli publish
```

8. Your wrappers are now available as:
   - `@shadnext/react-persian-datepicker`
   - `@shadnext/angular-persian-datepicker`

---

For more information and detailed API documentation, visit the [ShadNext CLI GitHub repository](https://github.com/shadnext/cli). 