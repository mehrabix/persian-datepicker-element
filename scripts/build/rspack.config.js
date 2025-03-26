const path = require('path');
const fs = require('fs');

// Root project directory (two levels up from scripts/build)
const rootDir = path.resolve(__dirname, '../..');

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const outputFileName = process.env.OUTPUT_FILE || (isProduction ? 'persian-datepicker-element.min.js' : 'persian-datepicker-element.js');
const shouldMinify = process.env.MINIFY !== 'false';
const moduleType = process.env.MODULE_TYPE || 'umd';
const shouldAnalyze = process.env.BUNDLE_ANALYZE === 'true';

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