import fs from 'fs-extra';
import path from 'path';

export function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

export function createDirectoryIfNotExists(dirPath: string): void {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.error(`Error creating directory ${dirPath}:`, err);
    throw err;
  }
} 