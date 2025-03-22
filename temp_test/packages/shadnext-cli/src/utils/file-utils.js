import fs from 'fs';
import path from 'path';

/**
 * Check if a file exists
 * @param {string} filePath - The path to check
 * @returns {boolean} True if the file exists, false otherwise
 */
export function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

/**
 * Create a directory if it doesn't exist
 * @param {string} dirPath - The directory path to create
 */
export function createDirectoryIfNotExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.error(`Error creating directory ${dirPath}:`, err);
    throw err;
  }
}

/**
 * Read a file as a string
 * @param {string} filePath - The path to the file
 * @returns {string} The file contents
 */
export function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    throw err;
  }
}

/**
 * Write a string to a file
 * @param {string} filePath - The path to write to
 * @param {string} content - The content to write
 */
export function writeFile(filePath, content) {
  try {
    // Ensure the directory exists
    const dirname = path.dirname(filePath);
    createDirectoryIfNotExists(dirname);
    
    // Write the file
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
    throw err;
  }
} 