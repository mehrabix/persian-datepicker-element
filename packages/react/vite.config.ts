import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/demo.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'ReactPersianDatepickerElement',
      fileName: (format) => `react-persian-datepicker-element.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'persian-datepicker-element'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'persian-datepicker-element': 'PersianDatePickerElement',
        },
      },
    },
  },
}); 