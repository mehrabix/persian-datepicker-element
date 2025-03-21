const path = require('path');
const fs = require('fs');

// Get the list of files in the dist directory
const distPath = path.resolve(__dirname, 'dist');

if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory not found');
  process.exit(1);
}

console.log("Cleaning up filenames in dist directory...");

// Create a temporary directory
const tempPath = path.resolve(__dirname, 'temp');
if (fs.existsSync(tempPath)) {
  fs.rmSync(tempPath, { recursive: true, force: true });
}
fs.mkdirSync(tempPath);

// Copy all files to temp directory with clean names
let renamedCount = 0;
const files = fs.readdirSync(distPath);

files.forEach(file => {
  const filePath = path.join(distPath, file);
  const fileStats = fs.statSync(filePath);
  
  if (fileStats.isFile()) {
    // Remove all spaces from filenames
    const cleanName = file.replace(/\s+/g, '');
    
    // Copy the file to the temp directory with the clean name
    const tempFilePath = path.join(tempPath, cleanName);
    fs.copyFileSync(filePath, tempFilePath);
    
    if (cleanName !== file) {
      console.log(`Cleaned: "${file}" -> "${cleanName}"`);
      renamedCount++;
    }
  }
});

// Replace dist with temp directory
if (renamedCount > 0) {
  // Remove the original dist directory
  fs.rmSync(distPath, { recursive: true, force: true });
  
  // Rename temp to dist
  fs.renameSync(tempPath, distPath);
  
  console.log(`Successfully cleaned ${renamedCount} filenames.`);
} else {
  // Clean up temp directory if no changes
  fs.rmSync(tempPath, { recursive: true, force: true });
  console.log("No files needed cleaning. All filenames are already clean.");
}

// List all files in dist directory after cleanup
console.log("\nCurrent files in dist directory:");
const finalFileList = fs.readdirSync(distPath);
finalFileList.forEach(file => {
  const stats = fs.statSync(path.join(distPath, file));
  console.log(`- ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
}); 