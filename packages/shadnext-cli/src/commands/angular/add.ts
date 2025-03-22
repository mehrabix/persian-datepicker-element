import { Command, Flags } from '@oclif/core';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { kebabCase, camelCase, pascalCase } from '../../utils/string-utils';
import { fileExists, createDirectoryIfNotExists } from '../../utils/file-utils';

export default class AngularAdd extends Command {
  static description = 'Add a Shadnext web component to an Angular project';

  static examples = [
    '<%= config.bin %> <%= command.id %> persian-datepicker-element',
    '<%= config.bin %> <%= command.id %> persian-datepicker-element --standalone',
    '<%= config.bin %> <%= command.id %> persian-datepicker-element --module my-module',
    '<%= config.bin %> <%= command.id %> persian-datepicker-element --directory src/app/components/date-picker',
  ];

  static flags = {
    standalone: Flags.boolean({
      description: 'Generate a standalone component (Angular 14+)',
      default: false,
    }),
    module: Flags.string({
      description: 'Specify an Angular module to add the component to',
      required: false,
    }),
    directory: Flags.string({
      char: 'd',
      description: 'Directory to create the component in (relative to project root)',
      required: false,
    }),
    help: Flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'componentName',
      description: 'Name of the web component to add (e.g. persian-datepicker-element)',
      required: true,
    },
  ];

  // Register Handlebars helpers
  registerHelpers() {
    Handlebars.registerHelper('kebabCase', (str) => kebabCase(str));
    Handlebars.registerHelper('camelCase', (str) => camelCase(str));
    Handlebars.registerHelper('pascalCase', (str) => pascalCase(str));
  }

  async run() {
    const { args, flags } = await this.parse(AngularAdd);
    this.registerHelpers();

    // Validate component name
    const originalName = args.componentName;
    if (!originalName.includes('-')) {
      this.error(`Component name must include a hyphen to be a valid web component (e.g. persian-datepicker-element)`);
    }

    // Process component name
    const componentNameBase = originalName
      .replace(/\-element$/, '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const componentName = componentNameBase;
    
    // Determine output directory
    const outputDir = flags.directory || `src/app/components/${kebabCase(componentName)}`;
    
    // Create output directory if it doesn't exist
    createDirectoryIfNotExists(outputDir);
    
    // Create the Angular component files
    await this.generateComponent(outputDir, componentName, originalName, flags.standalone);
    
    // Report success
    this.log(chalk.green(`✓ Successfully created Angular component for ${originalName}`));
    this.log(`  Component class: ${chalk.cyan(componentName + 'Component')}`);
    this.log(`  Files created in: ${chalk.cyan(outputDir)}`);
    
    if (flags.module) {
      this.log(chalk.yellow(`\nManual step required:`));
      this.log(`Add the component to your module (${flags.module}):`);
      this.log(chalk.cyan(`
  import { ${componentName}${flags.standalone ? 'Component' : 'Module'} } from '${outputDir.replace(/^src\//, '@/')}/index';

  @NgModule({
    imports: [
      // ... other imports
      ${flags.standalone ? componentName + 'Component' : componentName + 'Module'},
    ],
  })
  export class ${flags.module} {}
      `));
    }
  }

  async generateComponent(
    outputDir: string, 
    componentName: string, 
    originalName: string, 
    standalone: boolean
  ) {
    // Get templates directory
    const templatesDir = path.join(__dirname, '../../../templates/angular');
    
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
        this.error(`Template file not found: ${templatePath}`);
      }
      
      // Read template file
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
      // Compile template
      const template = Handlebars.compile(templateContent);
      const output = template(templateData);
      
      // Write output file
      fs.writeFileSync(outputPath, output);
      this.log(`Created: ${outputPath}`);
    }
    
    // Handle index.ts separately using updateIndexFile
    const options = { directory: outputDir, standalone };
    const indexPath = await updateIndexFile(componentName, kebabCase(componentName), options);
    this.log(`Updated: ${indexPath}`);
  }
}

/**
 * Updates the index file, preserving existing exports and adding the new component
 */
async function updateIndexFile(componentName: string, kebabName: string, options: any) {
  const indexFileDir = path.join(process.cwd(), options.directory || './components');
  const indexFilePath = path.join(indexFileDir, 'index.ts');
  
  let indexContent = '';
  let existingExports: string[] = [];
  let alreadyExported = false;
  
  // Check if index file already exists
  if (fs.existsSync(indexFilePath)) {
    indexContent = fs.readFileSync(indexFilePath, 'utf8');
    
    // Extract existing exports using regex
    const exportRegex = /export\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = exportRegex.exec(indexContent)) !== null) {
      const exportNames = match[1].split(',').map(name => name.trim());
      const importPath = match[2];
      
      // Check if this component is already exported from the same path
      const normalizedPath = importPath.replace(/^\.\//, '').replace(/\.(js|ts)$/, '');
      const normalizedKebabName = kebabName.replace(/^\.\//, '').replace(/\.(js|ts)$/, '');
      const componentExportName = componentName + 'Component';
      const moduleExportName = componentName + 'Module';
      
      if ((exportNames.includes(componentExportName) || 
           (!options.standalone && exportNames.includes(moduleExportName))) && 
          (normalizedPath === normalizedKebabName || 
           normalizedPath === './' + normalizedKebabName ||
           normalizedPath === normalizedKebabName + '.component' ||
           normalizedPath === './' + normalizedKebabName + '.component')) {
        alreadyExported = true;
      }
      
      existingExports.push(match[0]);
    }
  }
  
  // Add new export if not already present
  const newExport = `export { ${componentName}Component${options.standalone ? '' : `, ${componentName}Module`} } from './${kebabName}.component';`;
  if (!alreadyExported) {
    existingExports.push(newExport);
  }
  
  // Write back all exports
  fs.writeFileSync(indexFilePath, existingExports.join('\n') + '\n');
  
  return indexFilePath;
} 