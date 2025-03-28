const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const zlib = require('zlib');

function compressFile(filePath) {
  try {
    const originalSize = fs.statSync(filePath).size;
    const gzipPath = `${filePath}.gz`;
    const fileContent = fs.readFileSync(filePath);
    const compressed = zlib.gzipSync(fileContent, { level: 9 });
    fs.writeFileSync(gzipPath, compressed);
    const gzipSize = fs.statSync(gzipPath).size;
    const reduction = ((1 - gzipSize / originalSize) * 100).toFixed(2);
    return {
      success: true,
      method: 'zlib',
      size: (gzipSize / 1024).toFixed(2),
      reduction,
    };
  } catch (error) {
    return { success: false };
  }
}

module.exports = { compressFile };
