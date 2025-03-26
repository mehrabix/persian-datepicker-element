const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Set up root directory path (two levels up from scripts/optimize)
const rootDir = path.resolve(__dirname, '../..');

// Files to optimize
const files = [
  'dist/persian-datepicker-element.min.js',
  'dist/persian-datepicker-element.esm.js'
];

// Terser options for maximum compression
const terserOptions = {
  compress: {
    ecma: 2020,           // Use ECMAScript 2020 features
    toplevel: true,       // Transform top-level functions and variables
    passes: 3,            // Multiple optimization passes
    pure_getters: true,   // Assume getters are pure
    unsafe: true,         // Apply "unsafe" transformations
    unsafe_arrows: true,  // Convert arrow functions to regular functions if beneficial
    unsafe_comps: true,   // Unsafe comparisons
    unsafe_Function: true, // Unsafe Function transformations
    unsafe_math: true,    // Unsafe math optimizations
    unsafe_methods: true, // Assume methods don't have side effects
    unsafe_proto: true,   // Optimize prototype properties
    unsafe_regexp: true,  // Optimize RegExp literals
    unsafe_undefined: true, // Replace undefined with void 0
    drop_console: true,   // Remove console.* statements
    drop_debugger: true,  // Remove debugger statements
    hoist_funs: true,     // Hoist function declarations
    hoist_props: true,    // Hoist properties
    hoist_vars: true,     // Hoist variable declarations
    if_return: true,      // Optimize if-returns and if-continues
    join_vars: true,      // Join consecutive variable declarations
    collapse_vars: true,  // Collapse single-use variables
    computed_props: true, // Optimize computed property access
    conditionals: true,   // Optimize conditional expressions
    dead_code: true,      // Remove unreachable code
    evaluate: true,       // Evaluate constant expressions
    booleans: true,       // Optimize boolean expressions
    loops: true,          // Optimize loops
    reduce_vars: true,    // Improve optimization of variables
    typeofs: true,        // Optimize typeof expressions
    unused: true,         // Drop unused variables/functions
    sequences: true,      // Join consecutive statements with comma operator
    side_effects: true,   // Drop side-effect-free statements
    comparisons: true,    // Optimize comparisons
    directives: true,     // Optimize directive prologues
    inline: true,         // Inline calls to function with simple/return statement
    negate_iife: true,    // Negate immediately-invoked function expressions
    arguments: true,      // Optimize arguments usage
    keep_fargs: false,    // Remove unused arguments in function declarations
    keep_infinity: true,  // Keep Infinity in numeric comparisons
    booleans_as_integers: true // Convert booleans to integers when beneficial
  },
  mangle: {
    toplevel: true,       // Mangle top-level variables and functions
    properties: {         // Property mangling options
      keep_quoted: true,  // Keep quoted property names
      regex: /^_/         // Only mangle properties starting with underscore
    },
    reserved: ['PersianDatePickerElement'], // Don't mangle these names
    keep_classnames: false, // Allow mangling class names
    keep_fnames: false,   // Allow mangling function names
    safari10: false       // Disable Safari 10 workarounds
  },
  ecma: 2020,             // Use ECMAScript 2020 grammar
  format: {
    ecma: 2020,           // Format as ECMAScript 2020
    comments: false,      // Remove comments
    ascii_only: true,     // Encode non-ASCII characters as escaped unicode
    beautify: false,      // No code beautification
    braces: false,        // No extra braces
    indent_level: 0,      // No indentation
    keep_quoted_props: true, // Keep quotes around property names when mangling
    quote_style: 0,       // Use double quotes when needed
    wrap_iife: true,      // Wrap IIFEs
    preserve_annotations: false, // Don't preserve annotations
    max_line_len: false   // No line length limit
  }
};

// Special options for ESM module
const esmTerserOptions = {
  ...terserOptions,
  module: true,
  toplevel: true
};

async function optimizeFile(filePath, isModule = false) {
  try {
    console.log(`\n📦 Optimizing ${path.basename(filePath)}...`);
    
    // Backup the file
    const backupPath = `${filePath}.backup`;
    fs.copyFileSync(filePath, backupPath);
    
    // Read the file
    const code = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(code, 'utf8');
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Configure options based on module type
    const options = isModule ? esmTerserOptions : terserOptions;
    
    // Minify with Terser
    console.log('Running Terser minification with extreme optimization settings...');
    const result = await minify(code, options);
    
    if (result.error) {
      console.error(`Error during minification: ${result.error}`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
      return;
    }
    
    // Check if minification reduced the size
    const minifiedSize = Buffer.byteLength(result.code, 'utf8');
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
    
    if (minifiedSize >= originalSize) {
      console.log(`⚠️ Warning: Minification did not reduce file size (${(originalSize / 1024).toFixed(2)} KB -> ${(minifiedSize / 1024).toFixed(2)} KB)`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
    } else {
      // Write the minified code
      fs.writeFileSync(filePath, result.code);
      console.log(`✅ Size reduced by ${reduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(minifiedSize / 1024).toFixed(2)} KB)`);
    }
    
    // Remove backup
    fs.unlinkSync(backupPath);
    
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

async function main() {
  console.log('🔥 Starting extreme Terser optimization...');
  
  for (const file of files) {
    const filePath = path.resolve(rootDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${file}`);
      continue;
    }
    
    const isEsmModule = file.includes('.esm.');
    await optimizeFile(filePath, isEsmModule);
  }
  
  console.log('\n🎉 Terser optimization process completed!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 