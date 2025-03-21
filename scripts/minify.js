const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Get component name from environment or from command line
const componentName = process.argv[2] || process.env.COMPONENT_NAME;

if (!componentName) {
  console.error('Error: No component specified for minification');
  console.error('Usage: node minify.js <component-name> or set COMPONENT_NAME environment variable');
  process.exit(1);
}

// Clean component name
const cleanComponentName = componentName.trim().replace(/\.js$/, '');

// Files to minify
const filesToMinify = [
  `${cleanComponentName}.min.js`,
  `${cleanComponentName}.esm.js`
];

// Get the list of files in the dist directory
const distPath = path.resolve(__dirname, '..', 'dist');
const files = fs.readdirSync(distPath);

// Function to find a file ignoring spaces
const findFileIgnoringSpaces = (targetName) => {
  // First try exact match
  if (files.includes(targetName)) {
    return targetName;
  }
  
  // Then try ignoring spaces
  const normalizedTarget = targetName.replace(/\s+/g, '');
  return files.find(file => 
    file.replace(/\s+/g, '') === normalizedTarget
  );
};

// Minify each file
filesToMinify.forEach(fileToMinify => {
  const targetFile = findFileIgnoringSpaces(fileToMinify);

  if (!targetFile) {
    console.error(`Warning: File ${fileToMinify} not found in dist directory`);
    console.log('Available files:', files);
    return;
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
    console.error(`Error during minification of ${targetFile}:`, error.message);
  }
}); 