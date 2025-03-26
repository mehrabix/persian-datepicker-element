const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { minify } = require('terser');

// Set up root directory path (two levels up from scripts/build)
const rootDir = path.resolve(__dirname, '../..');

console.log('⚡ Starting extreme build and optimization process...');

// Output configurations
const outputs = [
  {
    file: 'persian-datepicker-element.min.js',
    moduleType: 'umd',
    env: 'production',
    isModule: false
  },
  {
    file: 'persian-datepicker-element.esm.js',
    moduleType: 'module',
    env: 'production',
    isModule: true
  },
  {
    file: 'persian-datepicker-element.js',
    moduleType: 'umd',
    env: 'development',
    isModule: false,
    skipTerser: true // Skip Terser for development build
  }
];

// Terser options for maximum compression
const terserOptions = {
  compress: {
    ecma: 2020,
    toplevel: true,
    passes: 3,
    pure_getters: true,
    unsafe: true,
    unsafe_arrows: true,
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_methods: true,
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    drop_console: true,
    drop_debugger: true,
    hoist_funs: true,
    hoist_props: true,
    hoist_vars: true,
    if_return: true,
    join_vars: true,
    collapse_vars: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    evaluate: true,
    booleans: true,
    loops: true,
    reduce_vars: true,
    typeofs: true,
    unused: true,
    sequences: true,
    side_effects: true,
    comparisons: true,
    directives: true,
    inline: true,
    negate_iife: true,
    arguments: true,
    keep_fargs: false,
    keep_infinity: true,
    booleans_as_integers: true
  },
  mangle: {
    toplevel: true,
    properties: {
      keep_quoted: true,
      regex: /^_/
    },
    reserved: ['PersianDatePickerElement'],
    keep_classnames: false,
    keep_fnames: false,
    safari10: false
  },
  ecma: 2020,
  format: {
    ecma: 2020,
    comments: false,
    ascii_only: true,
    beautify: false,
    braces: false,
    indent_level: 0,
    keep_quoted_props: true,
    quote_style: 0,
    wrap_iife: true,
    preserve_annotations: false,
    max_line_len: false
  }
};

// Special options for ESM module
const esmTerserOptions = {
  ...terserOptions,
  module: true,
  toplevel: true
};

// Function to run rspack build
function runBuild(output) {
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

// Function to optimize with Terser
async function optimizeWithTerser(filePath, isModule) {
  console.log(`\n🔧 Applying Terser optimization to ${path.basename(filePath)}...`);
  
  try {
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
    console.log('Running Terser with extreme compression settings...');
    const result = await minify(code, options);
    
    if (result.error) {
      console.error(`Error during minification: ${result.error}`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return originalSize;
    }
    
    // Check if minification reduced the size
    const minifiedSize = Buffer.byteLength(result.code, 'utf8');
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
    
    if (minifiedSize >= originalSize) {
      console.log(`⚠️ Warning: Minification did not reduce file size (${(originalSize / 1024).toFixed(2)} KB -> ${(minifiedSize / 1024).toFixed(2)} KB)`);
      console.log('Restoring original file...');
      fs.copyFileSync(backupPath, filePath);
      fs.unlinkSync(backupPath);
      return originalSize;
    } else {
      // Write the minified code
      fs.writeFileSync(filePath, result.code);
      console.log(`✅ Size reduced by ${reduction}% (${(originalSize / 1024).toFixed(2)} KB -> ${(minifiedSize / 1024).toFixed(2)} KB)`);
      fs.unlinkSync(backupPath);
      return minifiedSize;
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}: ${error.message}`);
    return null;
  }
}

// Function to create a gzipped version for analysis
function createCompressedVersion(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n📊 Creating compressed versions of ${fileName} for analysis...`);
  
  try {
    // Create a simpler zip file for Windows
    try {
      console.log('Attempting to create compressed file for reference...');
      // Using a simpler approach for Windows
      const zipPath = `${filePath}.zip`;
      const tempFolder = path.resolve(rootDir, 'temp_compress');
      
      // Create temp folder if it doesn't exist
      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder, { recursive: true });
      }
      
      // Copy file to temp folder
      const tempFile = path.join(tempFolder, fileName);
      fs.copyFileSync(filePath, tempFile);
      
      // Use PowerShell to create zip
      const cmd = `powershell -Command "Compress-Archive -Path '${tempFile}' -DestinationPath '${zipPath}' -Force"`;
      execSync(cmd, { stdio: 'inherit' });
      
      // Check if zip was created and report size
      if (fs.existsSync(zipPath)) {
        const stats = fs.statSync(zipPath);
        console.log(`ZIP compressed size: ${(stats.size / 1024).toFixed(2)} KB`);
      }
      
      // Clean up temp folder
      fs.rmSync(tempFolder, { recursive: true, force: true });
    } catch (e) {
      console.log(`PowerShell compression not available: ${e.message}`);
    }
  } catch (error) {
    console.log(`Note: Could not create compressed versions - ${error.message}`);
  }
}

// Main function to run the build process
async function main() {
  // Step 1: Clean the dist directory
  console.log('🧹 Cleaning dist directory...');
  execSync(`set CLEAN_DIST=true && set NODE_ENV=development && set OUTPUT_FILE=placeholder.js && npx rspack --config ${path.join(__dirname, 'rspack.config.js')}`, 
    { stdio: 'inherit' });

  // Results collection for report
  const results = [];
  
  // Step 2: Build and optimize each output
  for (const output of outputs) {
    // Build with rspack
    const buildSuccess = runBuild(output);
    if (!buildSuccess) continue;
    
    const filePath = path.resolve(rootDir, 'dist', output.file);
    
    // Skip Terser for development builds
    if (output.skipTerser) {
      console.log(`\n⏩ Skipping Terser optimization for ${output.file} (development build)`);
      const stats = fs.statSync(filePath);
      results.push({
        file: output.file,
        originalSize: stats.size,
        finalSize: stats.size,
        reduction: '0.00'
      });
      continue;
    }
    
    // Apply Terser optimization
    const originalSize = fs.statSync(filePath).size;
    const finalSize = await optimizeWithTerser(filePath, output.isModule);
    
    if (finalSize) {
      // Calculate reduction
      const reduction = ((1 - finalSize / originalSize) * 100).toFixed(2);
      
      // Create compressed versions for analysis
      createCompressedVersion(filePath);
      
      // Store results
      results.push({
        file: output.file,
        originalSize,
        finalSize,
        reduction
      });
    }
  }
  
  // Step 3: Run the cleanup script
  console.log('\n🧽 Running final cleanup...');
  execSync(`node ${path.join(__dirname, '../utils/cleanup-dist.js')}`, { stdio: 'inherit' });
  
  // Step 4: Generate report
  console.log('\n📝 Build and Optimization Report:');
  console.log('=================================');
  
  results.forEach(result => {
    console.log(`\n${result.file}:`);
    console.log(`Original size: ${(result.originalSize / 1024).toFixed(2)} KB`);
    console.log(`Final size: ${(result.finalSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${result.reduction}%`);
  });
  
  console.log('\n🎉 Extreme build and optimization process completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
}); 