/**
 * Convert a string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} The kebab-cased string
 */
export function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} The camelCased string
 */
export function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '')
    .replace(/[-_]+/g, '');
}

/**
 * Convert a string to PascalCase
 * @param {string} str - The string to convert
 * @returns {string} The PascalCased string
 */
export function pascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[-_]+/g, '');
} 