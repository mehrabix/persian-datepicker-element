/**
 * Persian Datepicker Production Build Script
 * 
 * This script combines rspack compilation with optimized Terser compression 
 * to produce the smallest possible bundle files while ensuring compatibility.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { minify } = require('terser');

// Set up root directory path (two levels up from scripts/build)
const rootDir = path.resolve(__dirname, '../..');

// Output configurations for different distribution files
const outputs = [
  {
    file: 'persian-datepicker-element.min.js',
    moduleType: 'umd',
    env: 'production'
  },
  {
    file: 'persian-datepicker-element.esm.js',
    moduleType: 'module',
    env: 'production'
  },
  {
    file: 'persian-datepicker-element.js',
    moduleType: 'umd',
    env: 'development',
    skipTerser: true // Skip Terser for development build
  }
];

// Terser optimization options
const terserBaseOptions = {
  ecma: 2020,
  format: {
    comments: false,
    beautify: false,
    indent_level: 0,
    ecma: 2020,
    wrap_iife: true
  }
};

// Basic optimization options
const terserBasicOptions = {
  ...terserBaseOptions,
  compress: {
    ecma: 2020,
    passes: 1,
    drop_console: true,
    drop_debugger: true,
    booleans: true,
    conditionals: true,
    if_return: true,
    sequences: true,
    unused: true,
    evaluate: true,
    reduce_vars: true,
    collapse_vars: true
  },
  mangle: {
    reserved: ['PersianDatePickerElement'],
    keep_classnames: true
  }
};

// Advanced optimization options
const terserAdvancedOptions = {
  ...terserBaseOptions,
  compress: {
    ecma: 2020,
    toplevel: true,
    passes: 2,
    pure_getters: true,
    drop_console: true,
    drop_debugger: true,
    booleans: true,
    conditionals: true,
    if_return: true,
    join_vars: true,
    collapse_vars: true,
    dead_code: true,
    evaluate: true,
    unused: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    comparisons: true,
    negate_iife: true,
    inline: 1
  },
  mangle: {
    toplevel: true,
    reserved: ['PersianDatePickerElement'],
    keep_classnames: true,
    keep_fnames: false
  }
};

// Add module flag for ESM builds
function getModuleOptions(options, isModule) {
  if (!isModule) return options;
  
  return {
    ...options,
    module: true,
    toplevel: true
  };
}

// Run the rspack build for a specific output
function runRspackBuild(output) {
  console.log(`\n🏗️ Building ${output.file}...`);
  
  try {
    const cmd = `set NODE_ENV=${output.env} && set OUTPUT_FILE=${output.file} && set MODULE_TYPE=${output.moduleType} && set MINIFY=false && npx rspack --config ${path.join(__dirname, 'rspack.config.js')}`;
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error during build: ${error.message}`);
    return false;
  }
}

// Optimize a file with incremental Terser passes
async function optimizeWithTerser(filePath, isModule) {
  console.log(`\n🔧 Optimizing ${path.basename(filePath)}...`);
  
  try {
    // Create backup
    const backupPath = `${filePath}.backup`;
    fs.copyFileSync(filePath, backupPath);
    
    // Read file
    const code = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(code, 'utf8');
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // First pass with basic options
    console.log('1️⃣ Running basic optimization pass...');
    const basicOptions = getModuleOptions(terserBasicOptions, isModule);
    let result = await minify(code, basicOptions);
    
    if (result.error) {
      console.error(`Error in basic pass: ${result.error}`);
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return { success: false, size: originalSize };
    }
    
    // Check intermediate results
    let intermediateSize = Buffer.byteLength(result.code, 'utf8');
    let reduction = ((1 - intermediateSize / originalSize) * 100).toFixed(2);
    console.log(`Basic pass reduction: ${reduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(intermediateSize / 1024).toFixed(2)} KB)`);
    
    if (intermediateSize >= originalSize) {
      console.log('⚠️ Basic pass did not reduce size, will try advanced pass on original...');
    } else {
      // Keep the intermediate result
      fs.writeFileSync(filePath, result.code);
    }
    
    // Second pass with advanced options
    console.log('2️⃣ Running advanced optimization pass...');
    const advancedOptions = getModuleOptions(terserAdvancedOptions, isModule);
    
    // Use the best input we have so far
    const inputCode = intermediateSize < originalSize ? result.code : code;
    result = await minify(inputCode, advancedOptions);
    
    if (result.error) {
      console.error(`Error in advanced pass: ${result.error}`);
      
      // If we have a successful basic pass, use that
      if (intermediateSize < originalSize) {
        console.log('Using results from basic pass...');
        return { success: true, size: intermediateSize };
      }
      
      // Otherwise restore original
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return { success: false, size: originalSize };
    }
    
    // Check final results
    const finalSize = Buffer.byteLength(result.code, 'utf8');
    const finalReduction = ((1 - finalSize / originalSize) * 100).toFixed(2);
    
    if (finalSize >= originalSize) {
      console.log(`⚠️ Advanced pass did not reduce size (${(originalSize / 1024).toFixed(2)} KB -> ${(finalSize / 1024).toFixed(2)} KB)`);
      
      // If basic pass was successful, use that
      if (intermediateSize < originalSize) {
        console.log('Using results from basic pass...');
        return { success: true, size: intermediateSize };
      }
      
      // Otherwise restore original
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return { success: false, size: originalSize };
    }
    
    // Write the final optimized code
    fs.writeFileSync(filePath, result.code);
    console.log(`✅ Size reduced by ${finalReduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(finalSize / 1024).toFixed(2)} KB)`);
    
    // Clean up
    fs.unlinkSync(backupPath);
    return { success: true, size: finalSize, reduction: finalReduction };
    
  } catch (error) {
    console.error(`Error optimizing ${filePath}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🚀 Starting production build process...');
  
  // Step 1: Clean the dist directory
  console.log('🧹 Cleaning dist directory...');
  execSync(`set CLEAN_DIST=true && set NODE_ENV=development && set OUTPUT_FILE=placeholder.js && npx rspack --config ${path.join(__dirname, 'rspack.config.js')}`, 
    { stdio: 'inherit' });
  
  // Results collection
  const results = [];
  
  // Step 2: Process each output
  for (const output of outputs) {
    // Run rspack build
    const buildSuccess = runRspackBuild(output);
    if (!buildSuccess) continue;
    
    const filePath = path.resolve(rootDir, 'dist', output.file);
    const originalSize = fs.statSync(filePath).size;
    let finalSize = originalSize;
    let reduction = "0.00";
    
    // Apply Terser optimization if not skipped
    if (!output.skipTerser) {
      const isModule = output.moduleType === 'module';
      const optimizeResult = await optimizeWithTerser(filePath, isModule);
      
      if (optimizeResult.success) {
        finalSize = optimizeResult.size;
        reduction = optimizeResult.reduction || ((1 - finalSize / originalSize) * 100).toFixed(2);
      }
    } else {
      console.log(`\n⏩ Skipping optimization for ${output.file} (development build)`);
    }
    
    // Store results
    results.push({
      file: output.file,
      originalSize,
      finalSize,
      reduction
    });
  }
  
  // Step 3: Clean up and final steps
  console.log('\n🧹 Running final cleanup...');
  execSync(`node ${path.join(__dirname, '../utils/cleanup-dist.js')}`, { stdio: 'inherit' });
  
  // Generate report
  console.log('\n📊 Production Build Results:');
  console.log('==========================');
  
  results.forEach(result => {
    console.log(`\n${result.file}:`);
    console.log(`Original size: ${(result.originalSize / 1024).toFixed(2)} KB`);
    console.log(`Final size: ${(result.finalSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${result.reduction}%`);
  });
  
  console.log('\n✨ Production build completed successfully! ✨');
}

// Run the main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 