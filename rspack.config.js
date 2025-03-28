const path = require('path');
const fs = require('fs');

// Root project directory
const rootDir = path.resolve(__dirname);

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const outputFileName = process.env.OUTPUT_FILE || (isProduction ? 'persian-datepicker-element.min.js' : 'persian-datepicker-element.js');
const shouldMinify = process.env.MINIFY !== 'false';
const moduleType = process.env.MODULE_TYPE || 'umd';

// Clean the dist directory if this is the first build step
if (process.env.CLEAN_DIST === 'true') {
  fs.rmdirSync(path.resolve(rootDir, 'dist'), { recursive: true, force: true });
}

// Create a clean version of the output filename without any spaces
const cleanOutputFileName = outputFileName.trim();

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: path.resolve(rootDir, 'src/index.ts'),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: cleanOutputFileName,
    // Ensure proper source map file names
    sourceMapFilename: '[file].map',
    library: moduleType === 'module' 
      ? { type: 'module' }
      : {
          name: 'PersianDatePickerElement',
          type: 'umd',
          export: 'default',
        },
    // Use a safer globalObject expression that handles different environments properly
    globalObject: 'typeof self !== \'undefined\' ? self : typeof window !== \'undefined\' ? window : typeof global !== \'undefined\' ? global : this',
    clean: process.env.CLEAN_DIST === 'true', // Only clean on the first build
    assetModuleFilename: '[name][ext]', // Ensure no spaces in asset filenames
    environment: {
      // Optimize for modern browsers
      arrowFunction: true,
      const: true,
      destructuring: true,
      dynamicImport: true,
      forOf: true,
      module: moduleType === 'module', // Enable for ESM output
    },
  },
  plugins: [
    // Add a plugin to copy the data directory to the output
    {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap('CopyAssetsPlugin', (compilation) => {
          // Create an array of files to copy
          const filesToCopy = [
            {
              source: path.resolve(rootDir, 'src/data/persian-calendar-repo/PersianCalendar/data/events.json'),
              target: path.resolve(rootDir, 'dist/data/persian-calendar-repo/PersianCalendar/data/events.json')
            },
            {
              source: path.resolve(rootDir, 'src/data/events-fallback.json'),
              target: path.resolve(rootDir, 'dist/data/events-fallback.json')
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
              // Add target for tree shaking
              target: 'es2020',
              // Explicitly set module to ESM for better tree shaking
              module: 'esnext',
            },
          }
        },
        exclude: /node_modules/,
      },
      // Add JSON loader to handle the events.json file
      {
        test: /\.json$/,
        type: 'json',
        // Don't exclude any files so node_modules and data files are included
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // Enforce resolution of ES modules for better tree shaking
    mainFields: ['module', 'main'],
    // Add conditions to prefer newer module formats
    conditionNames: ['import', 'module', 'require', 'default'],
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction && shouldMinify ? false : 'source-map',
  optimization: {
    // Disable rspack's built-in minimizer, we'll use terser separately
    minimize: false,
    usedExports: true,
    sideEffects: true,
    providedExports: true,
    concatenateModules: true,
    // Add advanced tree shaking
    innerGraph: true,
    mangleExports: isProduction ? 'size' : false,
    // Improve bundle splitting for larger apps (not as helpful for a single component)
    splitChunks: isProduction ? {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        default: false,
        defaultVendors: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        }
      }
    } : false,
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

module.exports = config; 