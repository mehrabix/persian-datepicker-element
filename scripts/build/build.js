const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { minify } = require('terser');
const zlib = require('zlib');

// Root project directory
const rootDir = path.resolve(__dirname, '../..');

async function runBuild() {
  console.log('🚀 Starting build process...');
  
  try {
    // Clean the dist directory if it exists
    console.log('🧹 Cleaning dist directory...');
    const distPath = path.resolve(rootDir, 'dist');
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
    }
    
    // Build minified ESM version
    console.log('🏗️ Building persian-datepicker-element.min.esm.js...');
    process.env.NODE_ENV = 'production';
    process.env.OUTPUT_FILE = 'persian-datepicker-element.min.esm.js';
    process.env.MODULE_TYPE = 'module';
    process.env.MINIFY = 'true';
    console.log('Running rspack for ESM build...');
    execSync('npx rspack build --config scripts/build/rspack.config.js', { stdio: 'inherit' });
    console.log('ESM build completed');
    
    // Build minified UMD version
    console.log('🏗️ Building persian-datepicker-element.min.js...');
    process.env.NODE_ENV = 'production';
    process.env.OUTPUT_FILE = 'persian-datepicker-element.min.js';
    process.env.MODULE_TYPE = 'umd';
    process.env.MINIFY = 'true';
    console.log('Running rspack for UMD build...');
    execSync('npx rspack build --config scripts/build/rspack.config.js', { stdio: 'inherit' });
    console.log('UMD build completed');
    
    // Check if files were created
    const esmFile = path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js');
    const umdFile = path.resolve(rootDir, 'dist/persian-datepicker-element.min.js');
    
    if (!fs.existsSync(esmFile)) {
      console.error('❌ ESM file was not created!');
      throw new Error('ESM file was not created');
    } else {
      console.log(`✅ ESM file created: ${esmFile}`);
    }
    
    if (!fs.existsSync(umdFile)) {
      console.error('❌ UMD file was not created!');
      throw new Error('UMD file was not created');
    } else {
      console.log(`✅ UMD file created: ${umdFile}`);
    }
    
    // Optimize CSS in the built files
    console.log('🔧 Optimizing CSS in built files...');
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
      return /^:host\s*{/.test(str) || 
             /\s*{\s*[^}]*}\s*/.test(str) ||
             /--[a-zA-Z]/.test(str);
    }

    // Function to optimize CSS within JavaScript
    async function optimizeCSS(content) {
      const cssRegex = /`([^`]*)`/g;
      let match;
      let optimizedContent = content;
      
      while ((match = cssRegex.exec(content)) !== null) {
        const cssString = match[1];
        if (isCSSContent(cssString)) {
          const minifiedCSS = cssString
            .replace(/\s+/g, ' ')
            .replace(/:\s+/g, ':')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/;\s*/g, ';')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .trim();
          
          optimizedContent = optimizedContent.replace(match[0], `\`${minifiedCSS}\``);
        }
      }
      
      const minified = await minify(optimizedContent, cssOptimizationOptions);
      return minified.code;
    }

    const filesToOptimize = [
      path.resolve(rootDir, 'dist/persian-datepicker-element.min.js'),
      path.resolve(rootDir, 'dist/persian-datepicker-element.min.esm.js')
    ];

    for (const file of filesToOptimize) {
      console.log(`Optimizing CSS in ${path.basename(file)}...`);
      
      try {
        const backupFile = `${file}.backup`;
        fs.copyFileSync(file, backupFile);
        
        const originalContent = fs.readFileSync(file, 'utf8');
        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        
        const optimizedContent = await optimizeCSS(originalContent);
        const optimizedSize = Buffer.byteLength(optimizedContent, 'utf8');
        
        if (optimizedSize < originalSize) {
          fs.writeFileSync(file, optimizedContent);
          console.log(`  Size reduced: ${originalSize} -> ${optimizedSize} bytes (${Math.round((1 - optimizedSize/originalSize) * 100)}% reduction)`);
          fs.unlinkSync(backupFile);
        } else {
          console.log('  No size reduction achieved, keeping original file');
          fs.copyFileSync(backupFile, file);
          fs.unlinkSync(backupFile);
        }
      } catch (error) {
        console.error(`Error optimizing ${path.basename(file)}:`, error);
        const backupFile = `${file}.backup`;
        if (fs.existsSync(backupFile)) {
          fs.copyFileSync(backupFile, file);
          fs.unlinkSync(backupFile);
        }
      }
    }
    
    // Run extreme optimization
    console.log('🔥 Running extreme optimization...');
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

    for (const file of filesToOptimize) {
      if (fs.existsSync(file)) {
        console.log(`\n📦 Optimizing ${path.basename(file)}...`);
        
        try {
          const backupFile = `${file}.backup`;
          fs.copyFileSync(file, backupFile);
          
          const code = fs.readFileSync(file, 'utf8');
          const originalSize = Buffer.byteLength(code, 'utf8');
          console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
          
          const isESM = file.includes('.esm.');
          
          console.log('Running first pass optimization...');
          const pass1 = await minify(code, getExtremeOptions(isESM));
          
          console.log('Running second pass optimization...');
          let optimizedCode = pass1.code
            .replace(/\btrue\b/g, '!0')
            .replace(/\bfalse\b/g, '!1')
            .replace(/\bundefined\b/g, 'void 0')
            .replace(/\bnull\b/g, '""[0]')
            .replace(/function\s*\(\)/g, 'function()')
            .replace(/{\s*return\s+([^;]+?)\s*}/g, '{return $1}')
            .replace(/([^\\])"([^"]+?)"\s*\+\s*"([^"]+?)"/g, '$1"$2$3"')
            .replace(/;(\}|\))/g, '$1')
            .replace(/\s*([-+*/%|&])\s*/g, '$1');
          
          console.log('Running final pass optimization...');
          const finalPass = await minify(optimizedCode, getExtremeOptions(isESM));
          optimizedCode = finalPass.code;
          
          const optimizedSize = Buffer.byteLength(optimizedCode, 'utf8');
          const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
          
          // Always write the optimized code and create compressed versions
          const finalCode = optimizedSize < originalSize ? optimizedCode : code;
          fs.writeFileSync(file, finalCode);
          
          if (optimizedSize < originalSize) {
            console.log(`✅ Size reduced: ${(originalSize / 1024).toFixed(2)} KB -> ${(optimizedSize / 1024).toFixed(2)} KB (${reduction}% reduction)`);
          } else {
            console.log('⚠️ Warning: Optimization did not reduce file size, keeping original');
          }
          
          // Always create compressed versions
          const gzipped = zlib.gzipSync(finalCode, {
            level: 9,
            memLevel: 9,
            strategy: zlib.constants.Z_DEFAULT_STRATEGY
          });
          
          const brotli = zlib.brotliCompressSync(finalCode, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
              [zlib.constants.BROTLI_PARAM_LGWIN]: 24,
              [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]: Buffer.byteLength(finalCode, 'utf8')
            }
          });
          
          fs.writeFileSync(`${file}.gz`, gzipped);
          fs.writeFileSync(`${file}.br`, brotli);
          
          console.log(`📦 Gzip size: ${(gzipped.length / 1024).toFixed(2)} KB`);
          console.log(`📦 Brotli size: ${(brotli.length / 1024).toFixed(2)} KB`);
          
          if (fs.existsSync(backupFile)) {
            fs.unlinkSync(backupFile);
          }
        } catch (error) {
          console.error(`❌ Error optimizing ${path.basename(file)}:`, error);
          const backupFile = `${file}.backup`;
          if (fs.existsSync(backupFile)) {
            fs.copyFileSync(backupFile, file);
            fs.unlinkSync(backupFile);
          }
        }
      } else {
        console.log(`⚠️ File not found: ${file}`);
      }
    }
    
    // Generate TypeScript declaration files
    console.log('Generating TypeScript declaration files...');
    execSync('npx tsc --emitDeclarationOnly --declaration --outDir dist/types --excludeDirectories "**/__tests__"', { stdio: 'inherit' });
    
    // Clean up unnecessary declaration files
    console.log('Cleaning up unnecessary declaration files...');
    const typesDir = path.resolve(rootDir, 'dist/types');
    const filesToKeep = ['index.d.ts', 'persian-datepicker-element.d.ts', 'persian-date.d.ts'];
    
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
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed with error:', error);
    process.exit(1);
  }
}

runBuild().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
}); 