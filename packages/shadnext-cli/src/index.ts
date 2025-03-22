#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Handlebars from 'handlebars';

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  .option('-d, --directory <directory>', 'Directory to add component to', './output/react')
  .option('-f, --force', 'Force overwrite existing files', false)
  .option('-s, --styled', 'Use styled components', false)
  .action(async (options) => {
    try {
      const { component, directory = './output/react', force = false, styled = false } = options;
      
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
      const indexFile = path.join(componentDir, 'index.ts');
      
      // Check if files exist and handle force option
      const filesToCheck = [componentFile, indexFile];
      const existingFiles = filesToCheck.filter(file => fs.existsSync(file));
      
      if (existingFiles.length > 0 && !force) {
        console.error(chalk.red(`Error: The following files already exist:\n${existingFiles.join('\n')}\nUse --force to overwrite.`));
        process.exit(1);
      }
      
      // Read and compile templates
      const templateDir = path.join(__dirname, '../templates/react');
      const templatePaths = {
        component: path.join(templateDir, 'component.tsx.hbs'),
        index: path.join(templateDir, 'index.ts.hbs')
      };
      
      // Check if template files exist
      for (const [key, filePath] of Object.entries(templatePaths)) {
        if (!fs.existsSync(filePath)) {
          console.error(chalk.red(`Error: Template file not found: ${filePath}`));
          process.exit(1);
        }
      }
      
      // Compile and write component template
      const componentTemplateContent = fs.readFileSync(templatePaths.component, 'utf-8');
      const componentTemplate = Handlebars.compile(componentTemplateContent);
      
      const componentOutput = componentTemplate({
        componentName: pascalCaseName,
        styled: styled
      });
      
      // Write component file
      fs.writeFileSync(componentFile, componentOutput);
      console.log(chalk.green(`Created ${componentFile}`));
      
      // Compile and write index template if it exists
      if (fs.existsSync(templatePaths.index)) {
        const indexTemplateContent = fs.readFileSync(templatePaths.index, 'utf-8');
        const indexTemplate = Handlebars.compile(indexTemplateContent);
        
        const indexOutput = indexTemplate({
          componentName: pascalCaseName,
          kebabCaseName: kebabCaseName
        });
        
        // Write index file
        fs.writeFileSync(indexFile, indexOutput);
        console.log(chalk.green(`Created ${indexFile}`));
      }
      
      console.log(chalk.blue(`\nReact component ${pascalCaseName} created in ${componentDir}`));
    } catch (error: unknown) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });

// Angular command
program
  .command('angular')
  .description('Generate Angular components')
  .command('add')
  .description('Add Angular component')
  .option('-c, --component <name>', 'Component name')
  .option('-d, --directory <directory>', 'Output directory base path', './output/angular')
  .option('-f, --force', 'Force overwrite existing files', false)
  .option('-s, --standalone', 'Generate standalone component', false)
  .action(async (options) => {
    try {
      const { component, directory = './output/angular', force = false, standalone = false } = options;
      
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
      const componentTsFile = path.join(componentDir, `${kebabCaseName}.component.ts`);
      const componentHtmlFile = path.join(componentDir, `${kebabCaseName}.component.html`);
      const componentScssFile = path.join(componentDir, `${kebabCaseName}.component.scss`);
      const indexFile = path.join(componentDir, 'index.ts');
      
      // Check if files exist and handle force option
      const filesToCheck = [componentTsFile, componentHtmlFile, componentScssFile, indexFile];
      const existingFiles = filesToCheck.filter(file => fs.existsSync(file));
      
      if (existingFiles.length > 0 && !force) {
        console.error(chalk.red(`Error: The following files already exist:\n${existingFiles.join('\n')}\nUse --force to overwrite.`));
        process.exit(1);
      }
      
      // Read and compile templates
      const templateDir = path.join(__dirname, '../templates/angular');
      const templatePaths = {
        ts: path.join(templateDir, 'component.ts.hbs'),
        html: path.join(templateDir, 'component.html.hbs'),
        scss: path.join(templateDir, 'component.scss.hbs'),
        index: path.join(templateDir, 'index.ts.hbs')
      };
      
      // Check if template files exist
      for (const [key, filePath] of Object.entries(templatePaths)) {
        if (!fs.existsSync(filePath)) {
          console.error(chalk.red(`Error: Template file not found: ${filePath}`));
          process.exit(1);
        }
      }
      
      // Compile and write each template
      for (const [type, templatePath] of Object.entries(templatePaths)) {
        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(templateContent);
        
        const output = template({
          componentName: pascalCaseName,
          kebabCaseName: kebabCaseName,
          camelCaseName: kebabCaseName.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()),
          standalone: standalone
        });
        
        // Determine output file
        let outputFile;
        switch (type) {
          case 'ts':
            outputFile = componentTsFile;
            break;
          case 'html':
            outputFile = componentHtmlFile;
            break;
          case 'scss':
            outputFile = componentScssFile;
            break;
          case 'index':
            outputFile = indexFile;
            break;
          default:
            continue;
        }
        
        // Write output to file
        fs.writeFileSync(outputFile, output);
        console.log(chalk.green(`Created ${outputFile}`));
      }
      
      console.log(chalk.blue(`\nAngular component ${pascalCaseName} created in ${componentDir}`));
      
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