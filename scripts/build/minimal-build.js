const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const zlib = require('zlib');

// Root project directory (two levels up from scripts/build)
const rootDir = path.resolve(__dirname, '../..');

// Clean the dist directory if it exists
console.log('Cleaning dist directory...');
const distPath = path.resolve(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

// Build minified ESM version
console.log('Building minified ESM version...');
process.env.NODE_ENV = 'production';
process.env.OUTPUT_FILE = 'persian-datepicker-element.min.esm.js';
process.env.MODULE_TYPE = 'module';
process.env.MINIFY = 'true';
execSync('npx rspack --config scripts/build/rspack.config.js', { stdio: 'inherit' });

// Build minified UMD version
console.log('Building minified UMD version...');
process.env.NODE_ENV = 'production';
process.env.OUTPUT_FILE = 'persian-datepicker-element.min.js';
process.env.MODULE_TYPE = 'umd';
process.env.MINIFY = 'true';
execSync('npx rspack --config scripts/build/rspack.config.js', { stdio: 'inherit' });

// Optimize CSS in the built files
console.log('Optimizing CSS in built files...');
execSync('node scripts/optimize/css-optimize.js', { stdio: 'inherit' });

// Generate TypeScript declaration files
console.log('Generating TypeScript declaration files...');
execSync('npx tsc --emitDeclarationOnly --declaration --outDir dist/types --excludeDirectories "**/__tests__"', { stdio: 'inherit' });

// Clean up unnecessary declaration files
console.log('Cleaning up unnecessary declaration files...');
const typesDir = path.resolve(rootDir, 'dist/types');
const filesToKeep = ['index.d.ts', 'persian-datepicker-element.d.ts', 'persian-date.d.ts'];

// Function to recursively remove files and directories
function cleanupDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item === '__tests__') {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        cleanupDirectory(fullPath);
      }
    } else if (!filesToKeep.includes(item) && item.endsWith('.d.ts')) {
      fs.unlinkSync(fullPath);
    }
  }
}

cleanupDirectory(typesDir);

// Create compressed versions
console.log('Creating compressed versions...');

// Function to compress a file
function compressFile(inputFile, outputFile, compressionType) {
  const contents = fs.readFileSync(inputFile);
  let compressed;
  
  if (compressionType === 'gzip') {
    compressed = zlib.gzipSync(contents, { level: 9 });
  } else if (compressionType === 'brotli') {
    compressed = zlib.brotliCompressSync(contents, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
  }
  
  fs.writeFileSync(outputFile, compressed);
  console.log(`Created ${compressionType} compressed version: ${path.basename(outputFile)}`);
}

// Compress ESM version
const esmInputFile = path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js');
compressFile(esmInputFile, path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js.gz'), 'gzip');
compressFile(esmInputFile, path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js.br'), 'brotli');

// Compress UMD version
const umdInputFile = path.resolve(rootDir, 'dist/persian-datepicker-element.min.js');
compressFile(umdInputFile, path.resolve(rootDir, 'dist/persian-datepicker-element.min.js.gz'), 'gzip');
compressFile(umdInputFile, path.resolve(rootDir, 'dist/persian-datepicker-element.min.js.br'), 'brotli');

console.log('Build completed successfully!'); 