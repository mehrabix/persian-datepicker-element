const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Set up root directory path (two levels up from scripts/optimize)
const rootDir = path.resolve(__dirname, '../..');

console.log('🚀 Starting maximum compression build process...');

// Define the output filenames for different module types
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
  }
];

// Helper to check if the file size increased and revert if necessary
function safeMinify(filePath, terserCmd) {
  // Backup the original file
  const backupPath = `${filePath}.backup`;
  fs.copyFileSync(filePath, backupPath);
  
  // Get original size
  const statsBefore = fs.statSync(filePath);
  const sizeBefore = statsBefore.size;
  
  try {
    // Run terser command
    execSync(terserCmd, { stdio: 'inherit' });
    
    // Check if the file size increased
    const statsAfter = fs.statSync(filePath);
    const sizeAfter = statsAfter.size;
    
    if (sizeAfter > sizeBefore) {
      console.log(`⚠️ Warning: File size increased after minification (${(sizeBefore / 1024).toFixed(2)}KB -> ${(sizeAfter / 1024).toFixed(2)}KB)`);
      console.log('↩️ Reverting to original file...');
      fs.copyFileSync(backupPath, filePath);
      return {
        size: sizeBefore,
        reduced: false
      };
    } else {
      // Success - file was reduced in size
      const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(2);
      console.log(`✅ File size reduced by ${reduction}% (${(sizeBefore / 1024).toFixed(2)}KB -> ${(sizeAfter / 1024).toFixed(2)}KB)`);
      return {
        size: sizeAfter,
        reduced: true,
        reduction
      };
    }
  } catch (error) {
    console.error(`❌ Error during minification: ${error.message}`);
    console.log('↩️ Reverting to original file...');
    fs.copyFileSync(backupPath, filePath);
    return {
      size: sizeBefore,
      reduced: false,
      error: error.message
    };
  } finally {
    // Clean up backup
    if (fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
  }
}

try {
  // Step 1: Clean the dist directory
  console.log('🧹 Cleaning dist directory...');
  execSync(`set CLEAN_DIST=true && set NODE_ENV=development && set OUTPUT_FILE=placeholder.js && npx rspack --config ${path.resolve(rootDir, 'scripts/build/rspack.config.js')}`, 
    { stdio: 'inherit' });

  // Step 2: Build each output format with maximum optimization
  for (const output of outputs) {
    console.log(`\n🔨 Building ${output.file} with maximum optimization...`);
    
    const cmd = `set NODE_ENV=${output.env} && set OUTPUT_FILE=${output.file} && set MODULE_TYPE=${output.moduleType} && set MINIFY=true && npx rspack --config ${path.resolve(rootDir, 'scripts/build/rspack.config.js')}`;
    execSync(cmd, { stdio: 'inherit' });

    // Step 3: Apply ultra-aggressive terser settings
    console.log(`\n📦 Applying maximum compression to ${output.file}...`);
    
    const outputPath = path.resolve(rootDir, 'dist', output.file);
    
    // Get file size before compression
    const statsBefore = fs.statSync(outputPath);
    const sizeBefore = (statsBefore.size / 1024).toFixed(2);
    console.log(`Original size: ${sizeBefore} KB`);
    
    // Apply ultra-aggressive terser settings - split into multiple steps
    console.log('Stage 1: Basic minification...');
    
    // Start with safer options
    const terserCmd1 = `pnpm exec terser "${outputPath}" --compress drop_console=true,drop_debugger=true,pure_getters=true --mangle --format comments=false --output "${outputPath}"`;
    let result = safeMinify(outputPath, terserCmd1);
    
    // If the first stage worked, try more aggressive options
    if (result.reduced) {
      console.log('\nStage 2: Advanced minification...');
      const terserCmd2 = `pnpm exec terser "${outputPath}" --compress toplevel=true,passes=2,ecma=2020,pure_getters=true,unsafe=true --mangle toplevel=true --format comments=false,ecma=2020 --output "${outputPath}"`;
      result = safeMinify(outputPath, terserCmd2);
    }
    
    // Try to create a Brotli compressed version for reference
    try {
      if (output.file === 'persian-datepicker-element.min.js') {
        console.log(`\n📏 Creating compressed reference files...`);
        
        // Create a temporary copy for compression tools
        const tempJsPath = path.resolve(rootDir, 'temp.js');
        fs.copyFileSync(outputPath, tempJsPath);
        
        // Try powershell compression commands for Windows
        try {
          console.log('Trying PowerShell compression...');
          execSync(`powershell -Command "Get-Content '${tempJsPath}' | Compress-Archive -DestinationPath '${outputPath}.zip' -Force"`, 
            { stdio: 'inherit' });
          
          if (fs.existsSync(`${outputPath}.zip`)) {
            const statsZip = fs.statSync(`${outputPath}.zip`);
            const sizeZip = (statsZip.size / 1024).toFixed(2);
            console.log(`Zip compressed size: ${sizeZip} KB`);
          }
        } catch (e) {
          console.log('PowerShell compression not available');
        }
        
        // Clean up temp file
        if (fs.existsSync(tempJsPath)) {
          fs.unlinkSync(tempJsPath);
        }
      }
    } catch (compressError) {
      console.log('Note: Could not create compressed reference files');
    }
  }
  
  // Step 4: Run the cleanup script to handle any additional cleanup tasks
  console.log('\n🧽 Running final cleanup...');
  execSync(`node ${path.resolve(rootDir, 'scripts/utils/cleanup-dist.js')}`, { stdio: 'inherit' });
  
  console.log('\n🎉 Maximum compression build process completed successfully!');
  
  // Display the final output sizes
  const distPath = path.resolve(rootDir, 'dist');
  const files = fs.readdirSync(distPath);
  
  console.log('\n📊 Final output sizes:');
  files.forEach(file => {
    if (file.endsWith('.js') && !file.includes('placeholder')) {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const size = (stats.size / 1024).toFixed(2);
      console.log(`${file}: ${size} KB`);
    }
  });
  
} catch (error) {
  console.error('\n❌ Error during build process:', error.message);
  process.exit(1);
} 