const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const zlib = require('zlib');

const rootDir = path.resolve(__dirname, '../..');
const filesToOptimize = [
  path.resolve(rootDir, 'dist/persian-datepicker-element.min.js'),
  path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js')
];

// Super aggressive Terser options
const getExtremeOptions = (isESM) => ({
  compress: {
    arguments: true,
    arrows: true,
    booleans_as_integers: true,
    booleans: true,
    collapse_vars: true,
    comparisons: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    defaults: true,
    directives: true,
    drop_console: true,
    drop_debugger: true,
    ecma: 2020,
    evaluate: true,
    expression: true,
    global_defs: {
      DEBUG: false,
      PRODUCTION: true
    },
    hoist_funs: true,
    hoist_props: true,
    hoist_vars: true,
    if_return: true,
    inline: true,
    join_vars: true,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: true,
    loops: true,
    module: isESM,
    negate_iife: true,
    passes: 3,
    properties: true,
    pure_funcs: [],
    pure_getters: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    switches: true,
    toplevel: isESM,
    typeofs: true,
    unsafe: true,
    unsafe_arrows: true,
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_methods: true,
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    unused: true
  },
  mangle: {
    eval: true,
    keep_classnames: false,
    keep_fnames: false,
    module: isESM,
    properties: {
      builtins: false,
      debug: false,
      keep_quoted: true,
      reserved: [],
      regex: /^(__|_|\\$)/
    },
    safari10: false,
    toplevel: isESM
  },
  module: isESM,
  sourceMap: false,
  format: {
    ascii_only: true,
    beautify: false,
    braces: false,
    comments: false,
    ecma: 2020,
    indent_level: 0,
    inline_script: true,
    keep_numbers: true,
    keep_quoted_props: false,
    max_line_len: false,
    preamble: undefined,
    quote_keys: false,
    quote_style: 0,
    semicolons: true,
    shebang: true,
    webkit: false,
    wrap_iife: true,
    wrap_func_args: true
  },
  ecma: 2020,
  keep_classnames: false,
  keep_fnames: false,
  ie8: false,
  safari10: false,
  toplevel: isESM
});

// Function to optimize a single file
async function optimizeFile(file) {
  console.log(`\n📦 Optimizing ${path.basename(file)}...`);
  
  try {
    // Create backup
    const backupFile = `${file}.backup`;
    fs.copyFileSync(file, backupFile);
    
    // Read and get original size
    const code = fs.readFileSync(file, 'utf8');
    const originalSize = Buffer.byteLength(code, 'utf8');
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Determine if this is an ESM file
    const isESM = file.includes('.esm.');
    
    // First pass: Terser with extreme settings
    console.log('Running first pass optimization...');
    const pass1 = await minify(code, getExtremeOptions(isESM));
    
    // Second pass: Additional string optimizations
    console.log('Running second pass optimization...');
    let optimizedCode = pass1.code
      // Replace true/false with shorter versions when safe
      .replace(/\btrue\b/g, '!0')
      .replace(/\bfalse\b/g, '!1')
      // Replace common patterns with shorter versions
      .replace(/\bundefined\b/g, 'void 0')
      .replace(/\bnull\b/g, '""[0]')
      // Optimize common function patterns
      .replace(/function\s*\(\)/g, 'function()')
      .replace(/{\s*return\s+([^;]+?)\s*}/g, '{return $1}')
      // Optimize string concatenation
      .replace(/([^\\])"([^"]+?)"\s*\+\s*"([^"]+?)"/g, '$1"$2$3"')
      // Remove unnecessary semicolons in certain cases
      .replace(/;(\}|\))/g, '$1')
      // Remove whitespace around operators
      .replace(/\s*([-+*/%|&])\s*/g, '$1');
    
    // Third pass: Final Terser pass with module-specific options
    console.log('Running final pass optimization...');
    const finalPass = await minify(optimizedCode, getExtremeOptions(isESM));
    optimizedCode = finalPass.code;
    
    // Calculate size reduction
    const optimizedSize = Buffer.byteLength(optimizedCode, 'utf8');
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    if (optimizedSize < originalSize) {
      // Write optimized file
      fs.writeFileSync(file, optimizedCode);
      console.log(`✅ Size reduced: ${(originalSize / 1024).toFixed(2)} KB -> ${(optimizedSize / 1024).toFixed(2)} KB (${reduction}% reduction)`);
      
      // Create compressed versions with maximum settings
      const gzipped = zlib.gzipSync(optimizedCode, {
        level: 9,
        memLevel: 9,
        strategy: zlib.constants.Z_DEFAULT_STRATEGY
      });
      
      const brotli = zlib.brotliCompressSync(optimizedCode, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_LGWIN]: 24,
          [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: optimizedSize
        }
      });
      
      fs.writeFileSync(`${file}.gz`, gzipped);
      fs.writeFileSync(`${file}.br`, brotli);
      
      console.log(`📦 Gzip size: ${(gzipped.length / 1024).toFixed(2)} KB`);
      console.log(`📦 Brotli size: ${(brotli.length / 1024).toFixed(2)} KB`);
      
      // Remove backup
      fs.unlinkSync(backupFile);
    } else {
      console.log('⚠️ Warning: Optimization did not reduce file size');
      fs.copyFileSync(backupFile, file);
      fs.unlinkSync(backupFile);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(file)}:`, error);
    // Restore from backup if it exists
    const backupFile = `${file}.backup`;
    if (fs.existsSync(backupFile)) {
      fs.copyFileSync(backupFile, file);
      fs.unlinkSync(backupFile);
    }
  }
}

// Main function
async function main() {
  console.log('🔥 Starting extreme optimization process...\n');
  
  for (const file of filesToOptimize) {
    if (fs.existsSync(file)) {
      await optimizeFile(file);
    } else {
      console.log(`⚠️ File not found: ${file}`);
    }
  }
  
  console.log('\n🎉 Extreme optimization process completed!');
}

main().catch(console.error); 