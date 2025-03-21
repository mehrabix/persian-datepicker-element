/**
 * Cleanup Dist Directory
 * 
 * This script removes temporary/placeholder files from the dist directory
 * and ensures proper file structure.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('Dist directory does not exist, nothing to clean up.');
  process.exit(0);
}

console.log('Cleaning up dist directory...');

// Files to remove
const filesToRemove = [
  'placeholder.js',
  'placeholder.js.map'
];

// Remove temporary files
let removedCount = 0;
filesToRemove.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Removed: ${file}`);
      removedCount++;
    } catch (err) {
      console.error(`Error removing ${file}: ${err.message}`);
    }
  }
});

// Check for and fix any map file references
const jsFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.js'));
let fixedMapCount = 0;

jsFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Look for sourcemap comment and ensure it points to the correct file
    const sourceMappingMatch = content.match(/\/\/# sourceMappingURL=(.+)$/m);
    if (sourceMappingMatch) {
      const currentMapFile = sourceMappingMatch[1];
      const expectedMapFile = `${file}.map`;
      
      if (currentMapFile !== expectedMapFile) {
        // Fix the source map URL
        content = content.replace(
          /\/\/# sourceMappingURL=.+$/m,
          `//# sourceMappingURL=${expectedMapFile}`
        );
        fs.writeFileSync(filePath, content);
        console.log(`Fixed sourcemap reference in ${file}`);
        fixedMapCount++;
      }
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
});

console.log(`\nCleanup complete! Removed ${removedCount} temporary files and fixed ${fixedMapCount} sourcemap references.`); 