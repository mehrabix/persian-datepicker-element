const path = require('path');
const fs = require('fs');

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const outputFileName = process.env.OUTPUT_FILE || (isProduction ? 'persian-timepicker-element.min.js' : 'persian-timepicker-element.js');
const shouldMinify = process.env.MINIFY !== 'false';
const moduleType = process.env.MODULE_TYPE || 'umd';

// Clean the dist directory if this is the first build step
if (process.env.CLEAN_DIST === 'true') {
  fs.rmdirSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });
}

// Create a clean version of the output filename without any spaces
const cleanOutputFileName = outputFileName.trim();

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: cleanOutputFileName,
    // Ensure proper source map file names
    sourceMapFilename: '[file].map',
    library: moduleType === 'module' 
      ? { type: 'module' }
      : {
          name: 'PersianTimepickerElement',
          type: 'umd',
          export: 'default',
        },
    globalObject: 'this',
    clean: process.env.CLEAN_DIST === 'true', // Only clean on the first build
    assetModuleFilename: '[name][ext]', // Ensure no spaces in asset filenames
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
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../../'),
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
  }
};

// Add experimental features for ESM output
if (moduleType === 'module') {
  config.experiments = {
    outputModule: true,
  };
  config.output.environment = {
    module: true,
  };
}

module.exports = config; 