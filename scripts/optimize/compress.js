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
        passes: 2,
        unsafe: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        toplevel: true,
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    });

    fs.writeFileSync(outputFile, result.code);
    console.log('Compression completed successfully!');
  } catch (error) {
    console.error('Compression failed:', error);
    process.exit(1);
  }
}

compress(); 