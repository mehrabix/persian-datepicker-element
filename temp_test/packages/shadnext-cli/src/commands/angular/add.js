import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import chalk from 'chalk';
import { kebabCase, camelCase, pascalCase } from '../../utils/string-utils.js';
import { fileExists, createDirectoryIfNotExists } from '../../utils/file-utils.js';

/**
 * Add a Shadnext web component to an Angular project
 */
export default function addCommand(program) {
  program
    .command('add <componentName>')
    .description('Add a Shadnext web component to an Angular project')
    .option('--standalone', 'Generate a standalone component (Angular 14+)', false)
    .option('--module <name>', 'Specify an Angular module to add the component to')
    .option('-d, --directory <path>', 'Directory to create the component in (relative to project root)')
    .option('--force', 'Overwrite existing files', false)
    .action(async (componentName, options) => {
      // Validate component name
      if (!componentName.includes('-')) {
        console.error(chalk.red(`Component name must include a hyphen to be a valid web component (e.g. persian-datepicker-element)`));
        return;
      }

      // Process component name
      const componentNameBase = componentName
        .replace(/\-element$/, '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      const compName = componentNameBase;
      
      // Determine output directory
      const outputDir = options.directory || `src/app/components/${kebabCase(compName)}`;
      
      // Create output directory if it doesn't exist
      createDirectoryIfNotExists(outputDir);
      
      // Create the Angular component files
      await generateComponent(outputDir, compName, componentName, options.standalone, options.force);
      
      // Report success
      console.log(chalk.green(`✓ Successfully created Angular component for ${componentName}`));
      console.log(`  Component class: ${chalk.cyan(compName + 'Component')}`);
      console.log(`  Files created in: ${chalk.cyan(outputDir)}`);
      
      if (options.module) {
        console.log(chalk.yellow(`\nManual step required:`));
        console.log(`Add the component to your module (${options.module}):`);
        console.log(chalk.cyan(`
  import { ${compName}${options.standalone ? 'Component' : 'Module'} } from '${outputDir.replace(/^src\//, '@/')}/index';

  @NgModule({
    imports: [
      // ... other imports
      ${options.standalone ? compName + 'Component' : compName + 'Module'},
    ],
  })
  export class ${options.module} {}
        `));
      }
    });
}

/**
 * Generate an Angular component from the templates
 */
async function generateComponent(
  outputDir, 
  componentName, 
  originalName, 
  standalone,
  force
) {
  // Register Handlebars helpers
  Handlebars.registerHelper('kebabCase', (str) => kebabCase(str));
  Handlebars.registerHelper('camelCase', (str) => camelCase(str));
  Handlebars.registerHelper('pascalCase', (str) => pascalCase(str));
  
  // Get templates directory
  const templatesDir = path.resolve('./packages/shadnext-cli/templates/angular');
  
  // Define template files
  const templateFiles = [
    { 
      src: 'component.ts.hbs', 
      dest: `${kebabCase(componentName)}.component.ts`
    },
    { 
      src: 'component.html.hbs', 
      dest: `${kebabCase(componentName)}.component.html` 
    },
    { 
      src: 'component.scss.hbs', 
      dest: `${kebabCase(componentName)}.component.scss` 
    },
    { 
      src: 'index.ts.hbs', 
      dest: 'index.ts' 
    }
  ];
  
  // Template data
  const templateData = {
    componentName,
    originalName,
    standalone,
  };
  
  // Process each template file
  for (const file of templateFiles) {
    const templatePath = path.join(templatesDir, file.src);
    const outputPath = path.join(outputDir, file.dest);
    
    if (!fs.existsSync(templatePath)) {
      console.error(`Template file not found: ${templatePath}`);
      continue;
    }
    
    // Skip if file exists and not forced
    if (fs.existsSync(outputPath) && !force) {
      console.log(chalk.yellow(`Skipping ${outputPath} (already exists, use --force to overwrite)`));
      continue;
    }
    
    // Read template file
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile template
    const template = Handlebars.compile(templateContent);
    const output = template(templateData);
    
    // Write output file
    fs.writeFileSync(outputPath, output);
    console.log(`Created: ${outputPath}`);
  }
} 