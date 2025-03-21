# Build Process for Persian UI Components

This document explains the build process for Persian UI Components.

## Available Build Commands

The project has been structured to support building each component separately or all together.

### Main Commands

- `npm run build` - Builds all components (both date picker and time picker)
- `npm run build:datepicker` - Builds only the Persian Date Picker component
- `npm run build:timepicker` - Builds only the Persian Time Picker component
- `npm run serve` - Starts a local development server to test the components

### How the Build Works

Each component build process:

1. Cleans up any previous component files
2. Builds production (minified) version
3. Builds development (non-minified) version 
4. Builds ESM (ES Module) version
5. Minifies the files for optimal size
6. Cleans up temporary files

### Output Files

For each component, the following files are generated in the `dist` directory:

- `persian-{component}-element.js` - Development version with comments and source maps
- `persian-{component}-element.min.js` - Production minified version
- `persian-{component}-element.esm.js` - ES Modules version
- Corresponding `.map` files for debugging

## Development Process

When developing new components:

1. Create a new component directory under `src/components/persian-{component}-element`
2. Implement your component's main code and types
3. Add an export to `src/index.ts`
4. Ensure proper registration in the component's `index.ts` file
5. Build with `npm run build:{component}`
6. Test with `npm run serve`

## Component Structure

Each component should have:

1. Main implementation file (e.g., `persian-timepicker-element.ts`)
2. Types file for TypeScript declarations
3. Index file that exports the component and registers the custom element 