/**
 * Dist Directory Cleanup Script
 * Cleans up filenames in the dist directory and removes temporary files.
 */

const fs = require('fs');
const path = require('path');

// Get the dist directory path
const cwd = process.cwd();
const distPath = path.resolve(cwd, 'dist');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error(`Error: Dist directory not found at ${distPath}`);
  process.exit(1);
}

console.log('Cleaning up filenames in dist directory...');

// Check for files with spaces in their names
let filesCleaned = false;
fs.readdirSync(distPath).forEach(file => {
  if (file.includes(' ')) {
    const newFileName = file.replace(/\s+/g, '');
    fs.renameSync(
      path.join(distPath, file),
      path.join(distPath, newFileName)
    );
    console.log(`Renamed: "${file}" -> "${newFileName}"`);
    filesCleaned = true;
  }
});

if (!filesCleaned) {
  console.log('No files needed cleaning. All filenames are already clean.');
}

// Remove any placeholder or temporary files
const filesToRemove = [
  'placeholder.js',
  'placeholder.js.map'
];

filesToRemove.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed temporary file: ${file}`);
  }
});

// List all files in the dist directory with their sizes
console.log('\nCurrent files in dist directory:');
fs.readdirSync(distPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    console.log(`- ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  }); 