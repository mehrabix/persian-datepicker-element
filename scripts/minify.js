/**
 * Minification Script
 * This script minifies JavaScript files using terser.
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Get the filename to minify
const filesToMinify = process.argv.slice(2);

if (filesToMinify.length === 0) {
  console.error('Error: Please provide at least one filename to minify');
  process.exit(1);
}

async function minifyFile(filename) {
  // Get the current working directory
  const cwd = process.cwd();
  const filePath = path.resolve(cwd, 'dist', filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    return;
  }
  
  console.log(`\nMinifying ${filename}...`);
  
  // Read the file
  const code = fs.readFileSync(filePath, 'utf8');
  const originalSize = (Buffer.byteLength(code, 'utf8') / 1024).toFixed(2);
  console.log(`Original size: ${originalSize} KB`);
  
  try {
    // Minify the code
    const result = await minify(code, {
      sourceMap: true,
      compress: {
        ecma: 2020,
        pure_getters: true,
        passes: 3,
      },
      format: {
        ecma: 2020,
        comments: false,
      },
    });
    
    if (!result.code) {
      throw new Error('Minification produced no output');
    }
    
    // Write the minified code back to the file
    fs.writeFileSync(filePath, result.code);
    
    // Write the source map if generated
    if (result.map) {
      fs.writeFileSync(`${filePath}.map`, result.map);
    }
    
    // Calculate the size reduction
    const newSize = (Buffer.byteLength(result.code, 'utf8') / 1024).toFixed(2);
    const reduction = (100 * (1 - newSize / originalSize)).toFixed(2);
    
    console.log('Minification complete!');
    console.log(`New size: ${newSize} KB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`Error minifying ${filename}:`, error);
  }
}

// Process each file
async function processFiles() {
  for (const file of filesToMinify) {
    await minifyFile(file);
  }
}

processFiles(); 