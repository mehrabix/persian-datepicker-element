const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { minify } = require('terser');

// Get command-line arguments
const args = process.argv.slice(2);
const targetFile = args[0] || 'persian-datepicker-element.esm.js';

// Set paths
const rootDir = path.resolve(__dirname, '../..');
const distPath = path.join(rootDir, 'dist');
const filePath = path.join(distPath, targetFile);

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

// Create backup
const backupPath = `${filePath}.backup`;
fs.copyFileSync(filePath, backupPath);

// Get original file size
const originalSize = fs.statSync(filePath).size;
console.log(`Original ${targetFile} size: ${(originalSize / 1024).toFixed(2)} KB`);

async function run() {
  try {
    // Use Terser to minify
    const code = fs.readFileSync(filePath, 'utf8');
    
    // First, try with standard options
    const result = await minify(code, {
      parse: { module: true }, compress: { module: true,
        ecma: 2020,
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        pure_getters: true,
        drop_console: true,
        hoist_funs: true,
        hoist_vars: true,
        toplevel: true,
        reduce_vars: true,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        ecma: 2020,
        comments: false,
      },
    });
    
    if (result.code) {
      fs.writeFileSync(filePath, result.code);
      
      // Check the size after minification
      const minifiedSize = fs.statSync(filePath).size;
      console.log(`Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);
      
      // Create gzip version for reference
      const gzipped = zlib.gzipSync(result.code, { level: 9 });
      fs.writeFileSync(`${filePath}.gz`, gzipped);
      console.log(`Gzipped size: ${(gzipped.length / 1024).toFixed(2)} KB`);
      
      // Check if minification increased the file size
      if (minifiedSize > originalSize) {
        console.warn(`Warning: Minification increased file size! Restoring original file.`);
        fs.copyFileSync(backupPath, filePath);
      } else {
        const reduction = ((1 - (minifiedSize / originalSize)) * 100).toFixed(2);
        console.log(`Size reduction: ${reduction}%`);
      }
    }
    
    // Remove backup file
    if (fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
    
    console.log('Done!');
  } catch (err) {
    console.error('Minification error:', err);
    // Restore original on error
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
    }
  }
}

// Run the async function
run();
