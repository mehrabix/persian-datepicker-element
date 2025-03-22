#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

// Register Handlebars helpers
Handlebars.registerHelper('kebabCase', (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
});

Handlebars.registerHelper('camelCase', (str: string) => {
  return str.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
});

Handlebars.registerHelper('pascalCase', (str: string) => {
  const camelCase = str.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
});

const program = new Command();

// Set up the main command
program
  .name('shadnext')
  .description('CLI for generating shadnext components')
  .version('0.1.0');

// React command
program
  .command('react')
  .description('Generate React components')
  .command('add')
  .description('Add React component')
  .option('-c, --component <name>', 'Component name')
  .option('-d, --directory <directory>', 'Directory to add component to', './components')
  .option('-f, --force', 'Force overwrite existing files', false)
  .option('-s, --styled', 'Use styled components', false)
  .action(async (options) => {
    try {
      const { component, directory = './components', force = false, styled = false } = options;
      
      if (!component) {
        console.error(chalk.red('Error: Component name is required'));
        process.exit(1);
      }
      
      const kebabCaseName = component.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const pascalCaseName = kebabCaseName
        .split('-')
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      // Create directory if it doesn't exist
      const componentDir = path.resolve(process.cwd(), directory);
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }
      
      // Define file paths
      const componentFile = path.join(componentDir, `${kebabCaseName}.tsx`);
      
      // Check if file exists and handle force option
      if (fs.existsSync(componentFile) && !force) {
        console.error(chalk.red(`Error: ${componentFile} already exists. Use --force to overwrite.`));
        process.exit(1);
      }
      
      // Read and compile template
      const templateDir = path.join(__dirname, '../templates/react');
      const templatePath = path.join(templateDir, 'component.tsx.hbs');
      
      if (!fs.existsSync(templatePath)) {
        console.error(chalk.red(`Error: Template file not found: ${templatePath}`));
        process.exit(1);
      }
      
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateContent);
      
      // Compile template with data
      const output = template({
        componentName: pascalCaseName,
        styled: styled
      });
      
      // Write output to file
      fs.writeFileSync(componentFile, output);
      
      console.log(chalk.green(`Component ${pascalCaseName} created at ${componentFile}`));
    } catch (error: unknown) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });

// Show help by default if no arguments
if (process.argv.length <= 2) {
  program.help();
}

program.parse(process.argv); 