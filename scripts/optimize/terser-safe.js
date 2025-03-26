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

// Safer Terser options that still provide good compression
const terserOptions = {
  compress: {
    ecma: 2020,
    toplevel: true,
    passes: 2,
    pure_getters: true,
    drop_console: true,
    drop_debugger: true,
    if_return: true,
    join_vars: true,
    collapse_vars: true,
    conditionals: true,
    dead_code: true,
    evaluate: true,
    booleans: true,
    loops: true,
    reduce_vars: true,
    unused: true,
    sequences: true,
    side_effects: true,
    comparisons: true,
    inline: 1, // More conservative inlining
    negate_iife: true,
  },
  mangle: {
    toplevel: true,
    // Don't mangle properties, as it often increases size
    reserved: ['PersianDatePickerElement'],
    keep_classnames: true, // Keep class names for compatibility
    keep_fnames: false,
    safari10: false
  },
  ecma: 2020,
  format: {
    ecma: 2020,
    comments: false,
    // Don't use ascii_only to reduce size
    beautify: false,
    indent_level: 0,
    wrap_iife: true,
    // Use smaller max_line_len for better gzip compression
    max_line_len: 512
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
    
    // Minify with Terser - incremental approach for better results
    console.log('1. Running basic Terser pass...');
    
    // First pass with safer options
    const basicOptions = {
      ...options,
      compress: {
        ...options.compress,
        passes: 1,
        unsafe: false,
        toplevel: false
      },
      mangle: {
        ...options.mangle,
        toplevel: false
      }
    };
    
    let result = await minify(code, basicOptions);
    
    if (result.error) {
      console.error(`Error during first pass: ${result.error}`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return;
    }
    
    // Check intermediate results
    let intermediateSize = Buffer.byteLength(result.code, 'utf8');
    let reduction = ((1 - intermediateSize / originalSize) * 100).toFixed(2);
    console.log(`First pass reduction: ${reduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(intermediateSize / 1024).toFixed(2)} KB)`);
    
    if (intermediateSize >= originalSize) {
      console.log('⚠️ First pass did not reduce size, restoring original...');
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return;
    }
    
    // Second pass with more aggressive options
    console.log('2. Running second Terser pass...');
    result = await minify(result.code, options);
    
    if (result.error) {
      console.error(`Error during second pass: ${result.error}`);
      // Write the intermediate result since it was smaller
      fs.writeFileSync(filePath, result.code);
      fs.unlinkSync(backupPath);
      return;
    }
    
    // Check final results
    const finalSize = Buffer.byteLength(result.code, 'utf8');
    reduction = ((1 - finalSize / originalSize) * 100).toFixed(2);
    
    if (finalSize >= originalSize) {
      console.log(`⚠️ Final minification did not reduce size (${(originalSize / 1024).toFixed(2)} KB -> ${(finalSize / 1024).toFixed(2)} KB)`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
    } else {
      // Write the minified code
      fs.writeFileSync(filePath, result.code);
      console.log(`✅ Size reduced by ${reduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(finalSize / 1024).toFixed(2)} KB)`);
      
      // Try to create a .min.max version that uses advanced settings for comparison
      // This helps to determine if aggressive settings are effective
      try {
        const aggressiveOptions = {
          ...options,
          compress: {
            ...options.compress,
            unsafe: true,
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_regexp: true,
            passes: 3
          }
        };
        
        console.log('3. Attempting advanced optimization for comparison...');
        const advancedResult = await minify(result.code, aggressiveOptions);
        
        if (!advancedResult.error) {
          const advancedSize = Buffer.byteLength(advancedResult.code, 'utf8');
          const advancedReduction = ((1 - advancedSize / finalSize) * 100).toFixed(2);
          
          if (advancedSize < finalSize) {
            fs.writeFileSync(filePath, advancedResult.code);
            console.log(`🔥 Advanced settings reduced size by an additional ${advancedReduction}% (${(finalSize / 1024).toFixed(2)} KB -> ${(advancedSize / 1024).toFixed(2)} KB)`);
          } else {
            console.log('Advanced settings did not improve compression further');
          }
        }
      } catch (error) {
        console.log('Advanced optimization attempt failed, using standard optimization result');
      }
    }
    
    // Remove backup
    fs.unlinkSync(backupPath);
    
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

async function main() {
  console.log('🔨 Starting safe Terser optimization...');
  
  for (const file of files) {
    const filePath = path.resolve(rootDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${file}`);
      continue;
    }
    
    const isEsmModule = file.includes('.esm.');
    await optimizeFile(filePath, isEsmModule);
  }
  
  console.log('\n🎉 Safe Terser optimization completed!');
  
  // Display final sizes
  console.log('\n📊 Final file sizes:');
  for (const file of files) {
    const filePath = path.resolve(rootDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    }
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 