const fs = require('fs');
const path = require('path');
const { brotliCompressSync, constants } = require('zlib');

const inputFile = path.resolve(__dirname, '../../dist/persian-datepicker-element.min.js');
const outputFile = inputFile + '.br';

function compress() {
  try {
    const code = fs.readFileSync(inputFile);
    const compressed = brotliCompressSync(code, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
        [constants.BROTLI_PARAM_SIZE_HINT]: code.length,
        [constants.BROTLI_PARAM_LGWIN]: 24, // Maximum window size
        [constants.BROTLI_PARAM_LGBLOCK]: 24, // Maximum block size
        [constants.BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING]: 0,
        [constants.BROTLI_PARAM_LARGE_WINDOW]: 1,
      }
    });

    fs.writeFileSync(outputFile, compressed);
    console.log('Brotli compression completed successfully!');
    
    // Log compression ratio
    const originalSize = code.length;
    const compressedSize = compressed.length;
    const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    console.log(`Compression ratio: ${ratio}% (${originalSize} bytes → ${compressedSize} bytes)`);
  } catch (error) {
    console.error('Brotli compression failed:', error);
    process.exit(1);
  }
}

compress(); 