const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Root project directory (three levels up from scripts/optimize)
const rootDir = path.resolve(__dirname, '../..');

// Files to optimize
const filesToOptimize = [
  path.resolve(rootDir, 'dist/persian-datepicker-element.min.js'),
  path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js')
];

// CSS-specific optimization options for Terser
const cssOptimizationOptions = {
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true,
    drop_debugger: true,
    properties: true,
    reduce_vars: true,
    collapse_vars: true,
    pure_getters: true,
    unsafe: true,
    pure_funcs: [],
    global_defs: {},
    passes: 3
  },
  mangle: {
    properties: {
      regex: /^--jdp-/ // Only mangle CSS custom properties
    }
  },
  format: {
    comments: false,
    beautify: false
  }
};

// Function to check if a string resembles CSS content
function isCSSContent(str) {
  // Look for CSS-like patterns
  return /^:host\s*{/.test(str) || 
         /\s*{\s*[^}]*}\s*/.test(str) ||
         /--[a-zA-Z]/.test(str); // CSS custom properties
}

// Function to optimize CSS within JavaScript
async function optimizeCSS(content) {
  // Find template literals that contain CSS
  const cssRegex = /`([^`]*)`/g;
  let match;
  let optimizedContent = content;
  
  while ((match = cssRegex.exec(content)) !== null) {
    const cssString = match[1];
    if (isCSSContent(cssString)) {
      // Minify CSS string
      const minifiedCSS = cssString
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/:\s+/g, ':') // Remove space after colons
        .replace(/\s*{\s*/g, '{') // Remove space around braces
        .replace(/\s*}\s*/g, '}') // Remove space around braces
        .replace(/;\s*/g, ';') // Remove space after semicolons
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .trim();
      
      // Replace original CSS with minified version
      optimizedContent = optimizedContent.replace(match[0], `\`${minifiedCSS}\``);
    }
  }
  
  // Further optimize the entire file with Terser
  const minified = await minify(optimizedContent, cssOptimizationOptions);
  return minified.code;
}

// Main optimization function
async function optimizeFiles() {
  for (const file of filesToOptimize) {
    console.log(`Optimizing CSS in ${path.basename(file)}...`);
    
    try {
      // Create backup
      const backupFile = `${file}.backup`;
      fs.copyFileSync(file, backupFile);
      
      // Read and optimize
      const originalContent = fs.readFileSync(file, 'utf8');
      const originalSize = Buffer.byteLength(originalContent, 'utf8');
      
      const optimizedContent = await optimizeCSS(originalContent);
      const optimizedSize = Buffer.byteLength(optimizedContent, 'utf8');
      
      // Only write if size was reduced
      if (optimizedSize < originalSize) {
        fs.writeFileSync(file, optimizedContent);
        console.log(`  Size reduced: ${originalSize} -> ${optimizedSize} bytes (${Math.round((1 - optimizedSize/originalSize) * 100)}% reduction)`);
        // Remove backup
        fs.unlinkSync(backupFile);
      } else {
        console.log('  No size reduction achieved, keeping original file');
        // Restore from backup
        fs.copyFileSync(backupFile, file);
        fs.unlinkSync(backupFile);
      }
    } catch (error) {
      console.error(`Error optimizing ${path.basename(file)}:`, error);
      // Restore from backup if it exists
      const backupFile = `${file}.backup`;
      if (fs.existsSync(backupFile)) {
        fs.copyFileSync(backupFile, file);
        fs.unlinkSync(backupFile);
      }
    }
  }
}

// Run optimization
optimizeFiles().catch(console.error); 