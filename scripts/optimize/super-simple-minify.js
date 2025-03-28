const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { minify } = require('terser');
const rootDir = path.resolve(__dirname, '../..');
const fileArg = process.argv[2];
if (!fileArg) {
  console.error('No file specified');
  process.exit(1);
}
const filePath = path.resolve(rootDir, 'dist', fileArg);
async function run() {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = await minify(code);
    fs.writeFileSync(filePath, result.code);
    const gzipped = zlib.gzipSync(result.code);
    fs.writeFileSync(filePath + '.gz', gzipped);
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}
run();
