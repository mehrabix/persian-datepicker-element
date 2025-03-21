const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// The file to minify is passed as a command line argument
const fileToMinify = process.argv[2];

if (!fileToMinify) {
  console.error('Error: No file specified for minification');
  process.exit(1);
}

// Get the list of files in the dist directory
const distPath = path.resolve(__dirname, 'dist');
const files = fs.readdirSync(distPath);

// Function to clean up filenames with spaces
function cleanupFilenames() {
  console.log("Cleaning up filenames in dist directory...");
  
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    if (file.includes(' ')) {
      // Remove trailing spaces and spaces before extension
      const cleanName = file.replace(/\s+(\.\w+)?$/g, '$1').replace(/\s+\./g, '.');
      const newPath = path.join(distPath, cleanName);
      
      try {
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: "${file}" -> "${cleanName}"`);
      } catch (err) {
        console.error(`Error renaming "${file}": ${err.message}`);
      }
    }
  });
  
  // Refresh the file list after renaming
  return fs.readdirSync(distPath);
}

// Clean up filenames first
const updatedFiles = cleanupFilenames();

// Find the file that matches our target (ignoring spaces in the name)
const targetFile = updatedFiles.find(file => 
  file.toLowerCase().replace(/\s+/g, '') === fileToMinify.toLowerCase().replace(/\s+/g, '')
);

if (!targetFile) {
  console.error(`Error: File ${fileToMinify} not found in dist directory after cleanup`);
  console.log('Available files:', updatedFiles);
  process.exit(1);
}

const outputPath = path.resolve(distPath, targetFile);

// Get file size before minification
const statsBefore = fs.statSync(outputPath);
const sizeBefore = (statsBefore.size / 1024).toFixed(2);

console.log(`\nMinifying ${targetFile}...`);
console.log(`Original size: ${sizeBefore} KB`);

try {
  // Use aggressive minification options for better results
  const terserCmd = `pnpm exec terser "${outputPath}" --compress passes=2,drop_console=true --mangle --output "${outputPath}"`;
  execSync(terserCmd, { stdio: 'inherit' });
  
  // Get file size after minification
  const statsAfter = fs.statSync(outputPath);
  const sizeAfter = (statsAfter.size / 1024).toFixed(2);
  const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(2);
  
  console.log(`Minification complete!`);
  console.log(`New size: ${sizeAfter} KB (${reduction}% reduction)`);
} catch (error) {
  console.error('Error during minification:', error.message);
  process.exit(1);
} 