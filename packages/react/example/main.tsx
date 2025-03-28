import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Custom CSS for the example app (optional)
import './styles.css';

// Import the persian-datepicker-element to register the web component
// In a real application, this would be imported from 'persian-datepicker-element'
import 'persian-datepicker-element';

// Render the app
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
