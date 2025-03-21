const path = require('path');
const fs = require('fs');

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const outputFileName = process.env.OUTPUT_FILE || (isProduction ? 'persian-datepicker-element.min.js' : 'persian-datepicker-element.js');
const shouldMinify = process.env.MINIFY !== 'false';
const moduleType = process.env.MODULE_TYPE || 'umd';
const shouldAnalyze = process.env.BUNDLE_ANALYZE === 'true';

// The component that is being built (default to main package)
const componentName = process.env.COMPONENT_NAME || 'persian-datepicker-element';

// Clean the dist directory if this is the first build step
if (process.env.CLEAN_DIST === 'true') {
  fs.rmdirSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });
}

// Create component-specific output filename
const getOutputFileName = () => {
  // Format: component-name.min.js or component-name.js
  const baseFileName = outputFileName.startsWith(componentName) 
    ? outputFileName 
    : outputFileName.replace(/^(.*?)(\.min)?\.js$/, `${componentName}$2.js`);
  
  return baseFileName.trim(); // Ensure no spaces
};

// Get the proper entry point based on component name
const getEntryPoint = () => {
  // Remove any extra spaces that might be in the component name
  const cleanComponentName = componentName.trim();
  
  if (cleanComponentName === 'persian-datepicker-element') {
    return './src/index.ts'; // Main package entry point
  }
  
  // Individual component entry points - specific component imports
  if (cleanComponentName === 'persian-timepicker-element') {
    console.log('Building the Persian Time Picker component individually');
    return './src/components/persian-timepicker-element/index.ts';
  }
  
  // Generic component path
  const componentPath = `./src/components/${cleanComponentName}/index.ts`;
  
  // Log for debugging
  console.log(`Component path: ${componentPath}`);
  console.log(`Checking if exists: ${path.resolve(__dirname, componentPath)}`);
  
  // Verify the component path exists
  if (!fs.existsSync(path.resolve(__dirname, componentPath))) {
    console.error(`Error: Component path not found: ${componentPath}`);
    process.exit(1);
  }
  
  return componentPath;
};

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: getEntryPoint(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getOutputFileName(),
    // Ensure proper source map file names
    sourceMapFilename: '[file].map',
    library: moduleType === 'module' 
      ? { type: 'module' }
      : {
          name: componentName.split('-').map(part => 
            part.charAt(0).toUpperCase() + part.slice(1)
          ).join(''),
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
      directory: path.join(__dirname, './'),
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