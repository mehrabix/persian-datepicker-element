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
        passes: 3,
        unsafe: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        sequences: true,
        unused: true,
        collapse_vars: true,
        conditionals: true,
        inline: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: true,
        switches: true,
        toplevel: true,
        typeofs: true,
        booleans: true,
        loops: true
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        toplevel: true,
        safari10: true
      },
      output: {
        comments: false,
        ascii_only: true,
        beautify: false
      }
    });

    fs.writeFileSync(outputFile, result.code);
    console.log('Extreme compression completed successfully!');
  } catch (error) {
    console.error('Extreme compression failed:', error);
    process.exit(1);
  }
}

compress(); 