# Changelog

All notable changes to the `react-persian-datepicker-element` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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