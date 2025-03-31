const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const inputFile = path.resolve(__dirname, '../../dist/persian-datepicker-element.min.js');
const outputFile = inputFile;

async function compress() {
  try {
    const code = fs.readFileSync(inputFile, 'utf8');
    const result = await minify(code, {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 1,
        unsafe: false,
        unsafe_math: false,
        unsafe_proto: false,
        unsafe_regexp: false,
        unsafe_undefined: false,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        sequences: true,
        unused: true,
        collapse_vars: true,
        conditionals: true,
        inline: false,
        negate_iife: true,
        properties: false,
        reduce_funcs: false,
        switches: true,
        toplevel: false,
        typeofs: true,
        booleans: true,
        loops: true
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        toplevel: false,
        safari10: true,
        reserved: ['PersianDatePickerElement']
      },
      output: {
        comments: false,
        ascii_only: true,
        beautify: false
      }
    });

    fs.writeFileSync(outputFile, result.code);
    console.log('Safe compression completed successfully!');
  } catch (error) {
    console.error('Safe compression failed:', error);
    process.exit(1);
  }
}

compress(); 