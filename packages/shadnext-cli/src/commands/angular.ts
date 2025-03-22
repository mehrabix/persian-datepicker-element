import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// List of available components
const AVAILABLE_COMPONENTS = [
  'persian-datepicker-element',
  'persian-timepicker-element'
] as const;

type ComponentName = typeof AVAILABLE_COMPONENTS[number];

// Map component names to Angular component names
const COMPONENT_NAMES: Record<ComponentName, string> = {
  'persian-datepicker-element': 'PersianDatePicker',
  'persian-timepicker-element': 'PersianTimePicker'
};

// Utility classes needed by components
const UTILITIES: Record<ComponentName, string[]> = {
  'persian-datepicker-element': ['PersianDate'],
  'persian-timepicker-element': ['PersianDate', 'TimeUtils']
};

interface AngularOptions {
  module?: string;
  standalone?: boolean;
  directory?: string;
  force?: boolean;
}

export async function angularCommand(componentName: string | undefined, options: AngularOptions): Promise<void> {
  // If no component name provided, ask for one
  if (!componentName) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'componentName',
        message: 'Which component would you like to add?',
        choices: AVAILABLE_COMPONENTS
      }
    ]);
    componentName = answers.componentName;
  }

  // Validate component name
  if (!AVAILABLE_COMPONENTS.includes(componentName as ComponentName)) {
    console.log(chalk.red(`❌ Invalid component: ${componentName}`));
    console.log(`Available components: ${AVAILABLE_COMPONENTS.join(', ')}`);
    return;
  }

  // If no directory provided, ask for one
  if (!options.directory) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message: 'Where would you like to add the component?',
        default: `src/app/components/${COMPONENT_NAMES[componentName as ComponentName].toLowerCase()}`
      }
    ]);
    options.directory = answers.directory;
  }

  // If no standalone option provided, ask for one
  if (options.standalone === undefined) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'standalone',
        message: 'Generate as a standalone component?',
        default: true
      }
    ]);
    options.standalone = answers.standalone;
  }

  // Generate component
  await generateAngularComponent(componentName as ComponentName, options);
}

async function generateAngularComponent(componentName: ComponentName, options: AngularOptions): Promise<void> {
  const spinner = ora(`Generating Angular component for ${componentName}...`).start();
  
  try {
    // Create output directory if it doesn't exist
    const fullPath = path.resolve(process.cwd(), options.directory || '');
    await fs.ensureDir(fullPath);
    
    // Define file names based on Angular conventions
    const pascalCaseName = COMPONENT_NAMES[componentName]; // e.g., PersianDatePicker
    const kebabCaseName = pascalCaseName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(); // e.g., persian-date-picker
    
    const componentFileName = `${kebabCaseName}.component.ts`;
    const templateFileName = `${kebabCaseName}.component.html`;
    const styleFileName = `${kebabCaseName}.component.scss`;
    const moduleFileName = options.standalone ? undefined : `${kebabCaseName}.module.ts`;
    
    const componentPath = path.join(fullPath, componentFileName);
    const templatePath = path.join(fullPath, templateFileName);
    const stylePath = path.join(fullPath, styleFileName);
    const modulePath = moduleFileName ? path.join(fullPath, moduleFileName) : undefined;
    
    // Check if files already exist
    const filesToCheck = [componentPath, templatePath, stylePath];
    if (modulePath) filesToCheck.push(modulePath);
    
    if (!options.force && (await Promise.all(filesToCheck.map(file => fs.pathExists(file)))).some(exists => exists)) {
      spinner.fail('Component files already exist. Use --force to overwrite.');
      return;
    }
    
    // Get template paths
    const templateDir = path.resolve(__dirname, '../../templates/angular');
    const componentTemplatePath = path.join(templateDir, options.standalone ? 'component.standalone.ts.hbs' : 'component.ts.hbs');
    const htmlTemplatePath = path.join(templateDir, 'component.html.hbs');
    const styleTemplatePath = path.join(templateDir, 'component.scss.hbs');
    const moduleTemplatePath = options.standalone ? undefined : path.join(templateDir, 'module.ts.hbs');
    
    // Read templates
    const componentTemplate = await fs.readFile(componentTemplatePath, 'utf8');
    const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf8');
    const styleTemplate = await fs.readFile(styleTemplatePath, 'utf8');
    let moduleTemplate = undefined;
    if (moduleTemplatePath) {
      moduleTemplate = await fs.readFile(moduleTemplatePath, 'utf8');
    }
    
    // Compile templates
    const compileComponent = Handlebars.compile(componentTemplate);
    const compileHtml = Handlebars.compile(htmlTemplate);
    const compileStyle = Handlebars.compile(styleTemplate);
    let compileModule = undefined;
    if (moduleTemplate) {
      compileModule = Handlebars.compile(moduleTemplate);
    }
    
    // Generate content
    const componentContent = compileComponent({
      componentName: pascalCaseName,
      kebabCaseName,
      selector: `shadnext-${kebabCaseName}`,
      originalName: componentName,
      utilities: UTILITIES[componentName],
      standalone: options.standalone
    });
    
    const htmlContent = compileHtml({
      componentName: pascalCaseName,
      kebabCaseName,
      originalName: componentName
    });
    
    const styleContent = compileStyle({
      componentName: pascalCaseName,
      kebabCaseName,
      originalName: componentName
    });
    
    let moduleContent = undefined;
    if (compileModule) {
      moduleContent = compileModule({
        componentName: pascalCaseName,
        kebabCaseName,
        originalName: componentName
      });
    }
    
    // Write files
    await fs.writeFile(componentPath, componentContent);
    await fs.writeFile(templatePath, htmlContent);
    await fs.writeFile(stylePath, styleContent);
    if (moduleContent && modulePath) {
      await fs.writeFile(modulePath, moduleContent);
    }
    
    // Get npm install command
    const installCommand = getNpmInstallCommand(componentName);
    
    spinner.succeed(`${chalk.green('✅ Successfully generated Angular component:')} ${pascalCaseName}`);
    console.log(`
${chalk.cyan('Location:')} ${chalk.white(fullPath)}
${chalk.cyan('Files created:')}
  ${chalk.white(componentFileName)}
  ${chalk.white(templateFileName)}
  ${chalk.white(styleFileName)}
  ${moduleFileName ? chalk.white(moduleFileName) : ''}

${chalk.yellow('Next steps:')}
1. Install the component: ${chalk.gray(installCommand)}
2. ${options.standalone 
     ? `Import the component: ${chalk.gray(`import { ${pascalCaseName}Component } from '${options.directory}/${kebabCaseName}.component';`)}`
     : `Import the module: ${chalk.gray(`import { ${pascalCaseName}Module } from '${options.directory}/${kebabCaseName}.module';`)}`}
3. ${options.standalone
     ? `Add it to your imports: ${chalk.gray(`imports: [${pascalCaseName}Component]`)}`
     : `Add it to your imports: ${chalk.gray(`imports: [${pascalCaseName}Module]`)}`}
4. Use it in your template: ${chalk.gray(`<shadnext-${kebabCaseName}></shadnext-${kebabCaseName}>`)}`);

    // If a specific module was provided, suggest how to import
    if (options.module) {
      console.log(`
5. Import the ${options.standalone ? 'component' : 'module'} in ${options.module}:
   ${chalk.gray(`import { ${options.standalone ? pascalCaseName + 'Component' : pascalCaseName + 'Module'} } from '${(options.directory || './components').replace(/^src\/app\//, './')}/${kebabCaseName}.${options.standalone ? 'component' : 'module'}';`)}
`);
    }
  } catch (error: unknown) {
    spinner.fail(`Failed to generate component: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
  }
}

function getNpmInstallCommand(componentName: string): string {
  const packageName = `@shadnext/${componentName}`;
  return `npm install ${packageName}`;
} 