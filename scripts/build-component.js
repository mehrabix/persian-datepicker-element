/**
 * Generic Component Build Script
 * 
 * This script builds any Persian UI component with correct output file names.
 * Usage: Set COMPONENT_NAME environment variable before running.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get component name from environment or use default
const componentName = process.env.COMPONENT_NAME || 'persian-datepicker-element';

// Remove any spaces that might be in the component name
const cleanComponentName = componentName.trim();

console.log(`Building ${cleanComponentName} component...`);

try {
  // First, clear previous component files
  const distDir = path.join(__dirname, '..', 'dist');
  const componentFiles = [
    `${cleanComponentName}.js`,
    `${cleanComponentName}.min.js`,
    `${cleanComponentName}.esm.js`,
    `${cleanComponentName}.js.map`,
    `${cleanComponentName}.min.js.map`,
    `${cleanComponentName}.esm.js.map`
  ];
  
  console.log('Cleaning up previous component files...');
  componentFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Removing: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  });

  // Build production minified version
  console.log('Building production version...');
  execSync(
    `set NODE_ENV=production && set COMPONENT_NAME=${cleanComponentName} && set OUTPUT_FILE=${cleanComponentName}.min.js && set MINIFY=true && npx rspack`,
    { stdio: 'inherit' }
  );

  // Build development non-minified version
  console.log('Building development version...');
  execSync(
    `set NODE_ENV=development && set COMPONENT_NAME=${cleanComponentName} && set OUTPUT_FILE=${cleanComponentName}.js && set MINIFY=false && npx rspack`,
    { stdio: 'inherit' }
  );

  // Build ESM version
  console.log('Building ESM version...');
  execSync(
    `set NODE_ENV=production && set COMPONENT_NAME=${cleanComponentName} && set OUTPUT_FILE=${cleanComponentName}.esm.js && set MODULE_TYPE=module && set MINIFY=true && npx rspack`,
    { stdio: 'inherit' }
  );

  // Clean up file names to remove any spaces
  console.log('Fixing file names in dist directory...');
  fs.readdirSync(distDir).forEach(file => {
    if (file.includes(' ')) {
      const newFileName = file.replace(/\s+/g, '');
      fs.renameSync(path.join(distDir, file), path.join(distDir, newFileName));
      console.log(`Renamed: "${file}" -> "${newFileName}"`);
    }
  });

  // Minify the files if needed
  console.log('Minifying files...');
  execSync(`node ${path.join(__dirname, 'minify.js')} "${cleanComponentName}"`, {
    env: { ...process.env, COMPONENT_NAME: cleanComponentName },
    stdio: 'inherit'
  });
  
  // Clean up temporary files
  execSync(`node ${path.join(__dirname, 'cleanup-dist.js')}`);
  
  console.log(`✓ ${cleanComponentName} component built successfully!`);
  console.log('Files available in dist directory:');
  
  // List final component files
  fs.readdirSync(distDir)
    .filter(file => file.startsWith(cleanComponentName) && file.endsWith('.js') && !file.endsWith('.map'))
    .forEach(file => {
      const filePath = path.join(distDir, file);
      const stats = fs.statSync(filePath);
      console.log(`- ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
} catch (error) {
  console.error(`Build failed: ${error}`);
  process.exit(1);
} 