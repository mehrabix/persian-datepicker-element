const path = require('path');
const fs = require('fs');
const { minify } = require('terser');
const zlib = require('zlib');

// Root project directory
const rootDir = path.resolve(__dirname);

// Helper functions for CSS optimization
function isCSSContent(str) {
  return /^:host\s*{/.test(str) || 
         /\s*{\s*[^}]*}\s*/.test(str) ||
         /--[a-zA-Z]/.test(str);
}

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
  
  const minified = await minify(optimizedContent, cssOptimizationOptions);
  return minified.code;
}

// Function to get extreme optimization options
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
    wrap_iife: false
  }
});

// Post-build optimization plugin
class PostBuildOptimizationPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('PostBuildOptimizationPlugin', async (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      
      // Ensure the dist directory exists
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      const filesToOptimize = [
        path.resolve(outputPath, compilation.outputOptions.filename)
      ];
      
      // Only optimize the current file that was emitted
      for (const file of filesToOptimize) {
        if (fs.existsSync(file)) {
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
            
            // Apply extreme optimization
            const isESM = file.includes('.esm.js');
            const extremeOptions = getExtremeOptions(isESM);
            
            try {
              const extremeOptimized = await minify(fs.readFileSync(file, 'utf8'), extremeOptions);
              if (extremeOptimized.code) {
                const extremeSize = Buffer.byteLength(extremeOptimized.code, 'utf8');
                if (extremeSize < optimizedSize) {
                  fs.writeFileSync(file, extremeOptimized.code);
                  console.log(`  Extreme optimization: ${optimizedSize} -> ${extremeSize} bytes (${Math.round((1 - extremeSize/optimizedSize) * 100)}% reduction)`);
                } else {
                  console.log('  No additional size reduction from extreme optimization');
                }
              }
            } catch (error) {
              console.error(`Error during extreme optimization for ${path.basename(file)}:`, error);
            }
            
            // Create gzipped version
            const gzipped = zlib.gzipSync(fs.readFileSync(file), { level: 9 });
            fs.writeFileSync(`${file}.gz`, gzipped);
            console.log(`  Created gzipped version: ${Buffer.byteLength(gzipped, 'utf8')} bytes`);
            
            // Create brotli compressed version
            try {
              const brotliParams = {
                [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
                [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
                [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(file).size
              };
              
              const fileContent = fs.readFileSync(file);
              const brotliData = zlib.brotliCompressSync(fileContent, brotliParams);
              fs.writeFileSync(`${file}.br`, brotliData);
              console.log(`  Created brotli version: ${Buffer.byteLength(brotliData)} bytes`);
            } catch (error) {
              console.error(`  Error during brotli compression: ${error.message}`);
            }
            
          } catch (error) {
            console.error(`Error optimizing ${path.basename(file)}:`, error);
            const backupFile = `${file}.backup`;
            if (fs.existsSync(backupFile)) {
              fs.copyFileSync(backupFile, file);
              fs.unlinkSync(backupFile);
            }
          }
        } else {
          console.warn(`File not found for optimization: ${file}`);
        }
      }
      
      callback();
    });
  }
}

// Copy assets plugin
class CopyAssetsPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CopyAssetsPlugin', (compilation) => {
      // Create an array of files to copy
      const filesToCopy = [
        {
          source: path.resolve(rootDir, 'src/data/persian-calendar-repo/PersianCalendar/data/events.json'),
          target: path.resolve(rootDir, 'dist/data/events.json')
        }
      ];
      
      // Copy each file
      filesToCopy.forEach(({source, target}) => {
        // Create the directory structure if it doesn't exist
        const targetDir = path.dirname(target);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        
        // Copy the file if it exists
        if (fs.existsSync(source)) {
          try {
            fs.copyFileSync(source, target);
            console.log(`Successfully copied ${path.basename(source)} to ${targetDir}`);
          } catch (error) {
            console.error(`Error copying ${path.basename(source)}:`, error);
          }
        } else {
          console.warn(`Source file not found: ${source}`);
        }
      });
    });
  }
}

// Create a factory function to generate configurations for different build targets
function createConfig(options = {}) {
  const {
    isProduction = true,
    moduleType = 'umd',
    outputFileName = moduleType === 'module' ? 'persian-datepicker-element.min.esm.js' : 'persian-datepicker-element.min.js',
    shouldMinify = true
  } = options;

  /**
   * @type {import('@rspack/cli').Configuration}
   */
  const config = {
    entry: path.resolve(rootDir, 'src/index.ts'),
    output: {
      path: path.resolve(rootDir, 'dist'),
      filename: outputFileName,
      sourceMapFilename: '[file].map',
      library: moduleType === 'module' 
        ? { type: 'module' }
        : {
            name: 'PersianDatePickerElement',
            type: 'umd',
            export: 'default',
          },
      globalObject: 'typeof self !== \'undefined\' ? self : typeof window !== \'undefined\' ? window : typeof global !== \'undefined\' ? global : this',
      clean: false, // Don't clean on each build to allow multiple configs to run
      assetModuleFilename: 'assets/[name][ext]',
      environment: {
        arrowFunction: true,
        const: true,
        destructuring: true,
        dynamicImport: true,
        forOf: true,
        module: moduleType === 'module',
      },
    },
    plugins: [
      new CopyAssetsPlugin(),
      new PostBuildOptimizationPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                sourceMap: !isProduction || !shouldMinify,
                target: 'es2020',
                module: 'esnext',
              },
            }
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
                sourceMap: !isProduction || !shouldMinify,
              }
            }
          ]
        },
        {
          test: /\.json$/,
          type: 'json',
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.mjs'],
      mainFields: ['module', 'main', 'browser'],
      conditionNames: ['import', 'module', 'require', 'default', 'browser'],
      fallback: {
        "path": false,
        "fs": false
      }
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction && shouldMinify ? false : 'source-map',
    optimization: {
      minimize: shouldMinify,
      usedExports: true,
      sideEffects: true,
      providedExports: true,
      concatenateModules: true,
      innerGraph: true,
      mangleExports: isProduction ? 'deterministic' : false,
      splitChunks: false,
      runtimeChunk: false,
      moduleIds: isProduction ? 'deterministic' : 'named',
      chunkIds: isProduction ? 'deterministic' : 'named',
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      minimizer: [
        {
          apply(compiler) {
            compiler.hooks.compilation.tap('CustomMinimizer', (compilation) => {
              compilation.hooks.processAssets.tap(
                {
                  name: 'CustomMinimizer',
                  stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE
                },
                (assets) => {
                  Object.keys(assets).forEach(file => {
                    if (file.endsWith('.js')) {
                      let source = assets[file].source();
                      
                      // Replace common patterns with shorter versions
                      source = source
                        .replace(/\btrue\b/g, '!0')
                        .replace(/\bfalse\b/g, '!1')
                        .replace(/\bundefined\b/g, 'void 0')
                        .replace(/\bnull\b/g, '""[0]');
                      
                      assets[file] = {
                        source: () => source,
                        size: () => source.length
                      };
                    }
                  });
                }
              );
            });
          }
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(rootDir, './'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };

  // Add experimental features for ESM output
  if (moduleType === 'module') {
    config.experiments = {
      outputModule: true,
    };
  }

  return config;
}

// Export multiple configurations for different build targets
module.exports = [
  createConfig({ moduleType: 'module', outputFileName: 'persian-datepicker-element.min.esm.js' }),
  createConfig({ moduleType: 'umd', outputFileName: 'persian-datepicker-element.min.js' })
]; 