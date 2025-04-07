// Register the web component first
// Use a more explicit import path to help bundlers resolve the package
import 'persian-datepicker-element/dist/persian-datepicker-element.min.js';

// Then export the Angular components
export * from './persian-datepicker-types';
export * from './ngx-persian-datepicker.component';
export * from './ngx-persian-datepicker.module'; 