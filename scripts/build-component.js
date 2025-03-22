/**
 * Component Build Script
 * This script manages the build process for individual components.
 */

const { spawn } = require('child_process');
const path = require('path');

// Execute a command with proper error handling
function executeCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const childProcess = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    childProcess.on('error', (err) => {
      reject(err);
    });
  });
}

async function buildComponent() {
  try {
    // Get component name from environment
    const componentName = process.env.COMPONENT_NAME;
    if (!componentName) {
      throw new Error('COMPONENT_NAME environment variable must be set');
    }
    
    console.log(`Building component: ${componentName}`);
    
    // Execute build steps in sequence
    await executeCommand('npm', ['run', 'build:clean']);
    await executeCommand('npm', ['run', 'build:prod']);
    await executeCommand('npm', ['run', 'build:dev']);
    await executeCommand('npm', ['run', 'build:esm']);
    await executeCommand('npm', ['run', 'minify']);
    await executeCommand('npm', ['run', 'cleanup']);
    
    console.log(`Successfully built ${componentName}`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
buildComponent(); 