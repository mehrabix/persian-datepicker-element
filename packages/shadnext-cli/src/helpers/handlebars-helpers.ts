import Handlebars from 'handlebars';

/**
 * Helper to check if an array includes a value
 * 
 * @param array The array to check
 * @param value The value to check for
 * @returns True if the array includes the value
 * 
 * @example {{#if (includes utilities "PersianDate")}} ... {{/if}}
 */
export function includesHelper(array: string[], value: string): boolean {
  return Array.isArray(array) && array.includes(value);
}

/**
 * Helper to convert a kebab-case string to camelCase
 * 
 * @param str The string to convert
 * @returns The camelCased string
 * 
 * @example {{camelCase "hello-world"}} -> "helloWorld"
 */
export function camelCaseHelper(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Helper to convert a kebab-case string to PascalCase
 * 
 * @param str The string to convert
 * @returns The PascalCased string
 * 
 * @example {{pascalCase "hello-world"}} -> "HelloWorld"
 */
export function pascalCaseHelper(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Register all Handlebars helpers
 */
export function registerHelpers(): void {
  Handlebars.registerHelper('includes', includesHelper);
  Handlebars.registerHelper('camelCase', camelCaseHelper);
  Handlebars.registerHelper('pascalCase', pascalCaseHelper);
} 