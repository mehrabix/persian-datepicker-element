#!/usr/bin/env node
/**
 * Web Component to React Converter Script
 * 
 * This script helps you extract the Persian Date Picker web component
 * and convert it to a React component.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const outputDir = path.join(process.cwd(), 'react-components');
const targetComponents = [
  {
    name: 'PersianDatePicker',
    sourceComponent: 'src/components/persian-datepicker-element',
    reactComponentName: 'PersianDatePickerReact',
    utilities: ['src/utils/persian-date.ts']
  },
  {
    name: 'PersianTimePicker',
    sourceComponent: 'src/components/persian-timepicker-element',
    reactComponentName: 'PersianTimePickerReact',
    utilities: []
  }
];

// Create output directory
console.log(`Creating output directory: ${outputDir}`);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy React examples
console.log('Copying React examples...');
fs.cpSync(
  path.join(process.cwd(), 'examples/react-component'),
  outputDir,
  { recursive: true }
);

// Extract components
targetComponents.forEach(component => {
  const componentDir = path.join(outputDir, component.name);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Copy component source
  console.log(`Extracting ${component.name} component...`);
  try {
    // Copy main component file
    const sourceComponentPath = path.join(process.cwd(), component.sourceComponent);
    const targetPath = path.join(componentDir, 'source-component');
    
    if (fs.existsSync(sourceComponentPath)) {
      fs.cpSync(sourceComponentPath, targetPath, { recursive: true });
      console.log(`- Copied component source to ${targetPath}`);
    } else {
      console.error(`⚠️ Source component directory not found: ${sourceComponentPath}`);
    }
    
    // Copy utilities
    component.utilities.forEach(utilPath => {
      const sourceUtilPath = path.join(process.cwd(), utilPath);
      const utilFileName = path.basename(utilPath);
      const targetUtilPath = path.join(componentDir, utilFileName);
      
      if (fs.existsSync(sourceUtilPath)) {
        fs.copyFileSync(sourceUtilPath, targetUtilPath);
        console.log(`- Copied utility: ${utilPath} -> ${targetUtilPath}`);
      } else {
        console.error(`⚠️ Utility file not found: ${sourceUtilPath}`);
      }
    });
  } catch (error) {
    console.error(`Error extracting ${component.name}:`, error);
  }
});

// Create readme
const readmePath = path.join(outputDir, 'README.md');
console.log(`Creating README at ${readmePath}...`);
fs.writeFileSync(readmePath, `# Persian Components React Conversion

This directory contains the extracted web components and their React conversions.

## Directory Structure

- \`PersianDatePicker/\` - Contains the date picker component and utilities
- \`PersianTimePicker/\` - Contains the time picker component
- \`App.jsx\` - Example React application using the components
- \`PersianDatePickerReact.jsx\` - The React implementation of the date picker

## How to Use

1. Copy the desired component files to your React project
2. Import and use them like any other React component
3. Customize as needed

See the individual component directories for more information about each component.

## Customization

Since you have the full source code, you can customize:

- Styling and appearance
- Behavior and functionality
- Integration with your app's state management
- Adding new features

## Further Documentation

See \`examples/react-component/README.md\` for detailed documentation on how to use
and customize these components in your React project.
`);

// Final instructions
console.log('\n✅ Extraction complete!');
console.log(`
The web components have been extracted to: ${outputDir}

To use them in your React project:
1. Copy the desired components to your project
2. Import and use them like any other React component:

   import PersianDatePickerReact from './path/to/PersianDatePickerReact';
   
   function MyComponent() {
     return <PersianDatePickerReact onChange={(date) => console.log(date)} />;
   }

3. Customize as needed

See the README.md files for more information.
`);

/**
 * Note: This script provides the files needed for manual conversion.
 * Automatic conversion is complex and would require parsing the TypeScript/JavaScript
 * and converting it to React patterns.
 */ 