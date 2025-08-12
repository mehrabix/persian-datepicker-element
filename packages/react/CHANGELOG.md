# Changelog

All notable changes to the `react-persian-datepicker-element` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.9] - 2025-01-08

### Fixed
- **BREAKING FIX**: Fixed TypeScript types for `onChange` event handler
  - Added missing properties to `PersianDateChangeEvent` interface: `formattedDate`, `isoString`, `isRange`, and `range`
  - Resolved issue where TypeScript couldn't access properties like `isoString` from the event object
  - Fixed issue [#60](https://github.com/mehrabix/persian-datepicker-element/issues/60)
  - Now `event.isoString` and other properties are properly typed and accessible

## [1.0.17] - 2024-06-21

### Added
- Enhanced dark mode support with comprehensive documentation
- Improved RTL (Right-to-Left) implementation for better Persian language support
- New CSS variables for more granular styling control

### Fixed
- Fixed event handling in React components
- Resolved issues with value prop binding in datepicker instances
- Improved TypeScript definitions for better developer experience

### Changed
- Removed `cssVariables` prop in favor of using CSS variables directly in the document or component CSS
- Simplified theming approach for easier integration with design systems

## [1.0.16] - 2024-06-19

### Added
- Initial release with React wrapper for Persian DatePicker web component
- Support for value prop and onChange handler
- Holiday type customization (Iran, Afghanistan, Religious)
- Extensive styling options with CSS variables
- RTL support by default

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release of the React wrapper for the Persian Datepicker web component
- Support for all properties of the underlying web component
- Added TypeScript types for better developer experience
- Added ref forwarding for controlling the datepicker programmatically
- Support for React-specific styling via `className` and `style` props
- Direct CSS variable customization via props
- Comprehensive documentation and examples
- Full test coverage

### Changed
- Automatically imports the persian-datepicker-element to ensure it's registered

### Fixed
- Proper cleanup of event listeners when component unmounts
- Handle CSS customization properly through React's virtual DOM 