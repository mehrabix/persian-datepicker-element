const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Set up root directory path (two levels up from scripts/optimize)
const rootDir = path.resolve(__dirname, '../..');

/**
 * Super-optimizer for Persian Datepicker Element
 *
 * This script applies additional aggressive but safe optimizations to
 * further reduce bundle size. Run this after the main build process.
 */

console.log('🔍 Starting super optimization process...');

// The minified files to optimize
const filesToOptimize = [
  'dist/persian-datepicker-element.min.js',
  'dist/persian-datepicker-element.esm.js',
];

// Helper to check if the file size increased and revert if necessary
function safeMinify(filePath, terserCmd, label) {
  // Backup the original file
  const backupPath = `${filePath}.backup`;
  fs.copyFileSync(filePath, backupPath);

  // Get original size
  const statsBefore = fs.statSync(filePath);
  const sizeBefore = statsBefore.size;

  console.log(`Applying ${label} to ${path.basename(filePath)}...`);

  try {
    // Run terser command
    execSync(terserCmd, { stdio: 'inherit' });

    // Check if the file size increased
    const statsAfter = fs.statSync(filePath);
    const sizeAfter = statsAfter.size;

    if (sizeAfter > sizeBefore) {
      console.log(
        `⚠️ Warning: File size increased (${(sizeBefore / 1024).toFixed(2)}KB -> ${(sizeAfter / 1024).toFixed(2)}KB)`
      );
      console.log('↩️ Reverting to original file...');
      fs.copyFileSync(backupPath, filePath);
      return {
        size: sizeBefore,
        reduced: false,
      };
    } else {
      // Success - file was reduced in size
      const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(2);
      console.log(
        `✅ File size reduced by ${reduction}% (${(sizeBefore / 1024).toFixed(2)}KB -> ${(sizeAfter / 1024).toFixed(2)}KB)`
      );
      return {
        size: sizeAfter,
        reduced: true,
        reduction,
      };
    }
  } catch (error) {
    console.error(`❌ Error during optimization: ${error.message}`);
    console.log('↩️ Reverting to original file...');
    fs.copyFileSync(backupPath, filePath);
    return {
      size: sizeBefore,
      reduced: false,
      error: error.message,
    };
  } finally {
    // Clean up backup
    if (fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
  }
}

// Process each file with different optimization techniques
filesToOptimize.forEach(file => {
  const filePath = path.resolve(rootDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${file}`);
    return;
  }

  console.log(`\n📦 Super-optimizing ${path.basename(file)}...`);

  // Original file size
  const origSize = fs.statSync(filePath).size;
  console.log(`Original size: ${(origSize / 1024).toFixed(2)}KB`);

  // First optimization pass: collapse_vars=true
  let cmd1 = `pnpm exec terser "${filePath}" --compress collapse_vars=true,evaluate=true,booleans=true,if_return=true,sequences=true,conditionals=true --mangle --format comments=false --output "${filePath}"`;
  let result = safeMinify(filePath, cmd1, 'structural optimizations');

  // Second optimization pass: specialized functions
  if (result.reduced) {
    let cmd2 = `pnpm exec terser "${filePath}" --compress reduce_vars=true,reduce_funcs=true,join_vars=true --mangle --format comments=false --output "${filePath}"`;
    result = safeMinify(filePath, cmd2, 'variable reduction optimizations');
  }

  // Third optimization pass: remove unused code
  if (result.reduced) {
    let cmd3 = `pnpm exec terser "${filePath}" --compress dead_code=true,unused=true,drop_console=true,drop_debugger=true --mangle --format comments=false --output "${filePath}"`;
    result = safeMinify(filePath, cmd3, 'dead code elimination');
  }

  // Final report
  const finalSize = fs.statSync(filePath).size;
  const totalReduction = ((1 - finalSize / origSize) * 100).toFixed(2);
  console.log(`\n🎯 Final result for ${path.basename(file)}:`);
  console.log(`Original size: ${(origSize / 1024).toFixed(2)}KB`);
  console.log(`Final size: ${(finalSize / 1024).toFixed(2)}KB`);
  console.log(`Total reduction: ${totalReduction}%`);
});

console.log('\n🎉 Super optimization process completed!');
