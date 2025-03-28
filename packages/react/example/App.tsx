import React, { useEffect } from 'react';

import DatepickerDemo from './components/DatepickerDemo';
import './styles/demo.css';

const App: React.FC = () => {
  // Toggle dark mode when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle('dark', e.matches);
    };

    // Set initial state
    document.body.classList.toggle('dark', mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return <DatepickerDemo />;
};

export default App;
