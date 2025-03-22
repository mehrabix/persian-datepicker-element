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

// Map component names to React component names
const COMPONENT_NAMES: Record<ComponentName, string> = {
  'persian-datepicker-element': 'PersianDatePicker',
  'persian-timepicker-element': 'PersianTimePicker'
};

// Utility classes needed by components
const UTILITIES: Record<ComponentName, string[]> = {
  'persian-datepicker-element': ['PersianDate'],
  'persian-timepicker-element': ['PersianDate', 'TimeUtils']
};

interface ReactOptions {
  typescript?: boolean;
  styled?: boolean;
  directory?: string;
  force?: boolean;
}

export async function reactCommand(componentName: string | undefined, options: ReactOptions): Promise<void> {
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

  // If no typescript option provided, ask for one
  if (options.typescript === undefined) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        default: true
      }
    ]);
    options.typescript = answers.typescript;
  }

  // If no styled option provided, ask for one
  if (options.styled === undefined) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'styled',
        message: 'Use styled-components?',
        default: false
      }
    ]);
    options.styled = answers.styled;
  }

  // If no directory provided, ask for one
  if (!options.directory) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message: 'Where would you like to add the component?',
        default: `src/components/${COMPONENT_NAMES[componentName as ComponentName]}`
      }
    ]);
    options.directory = answers.directory;
  }

  // Generate component
  await generateReactComponent(componentName as ComponentName, options);
}

async function generateReactComponent(componentName: ComponentName, options: ReactOptions): Promise<void> {
  const spinner = ora(`Generating React component for ${componentName}...`).start();
  
  try {
    // Create output directory if it doesn't exist
    const fullPath = path.resolve(process.cwd(), options.directory || '');
    await fs.ensureDir(fullPath);
    
    // Define file names based on React conventions
    const pascalCaseName = COMPONENT_NAMES[componentName]; // e.g., PersianDatePicker
    
    const componentFileName = `${pascalCaseName}.${options.typescript ? 'tsx' : 'jsx'}`;
    const styleFileName = options.styled ? 
      `${pascalCaseName}.styles.${options.typescript ? 'ts' : 'js'}` : 
      `${pascalCaseName}.css`;
    
    // Check if files already exist
    const filesToCheck = [componentFileName, styleFileName];
    
    if (!options.force && (await Promise.all(filesToCheck.map(file => fs.pathExists(file)))).some(exists => exists)) {
      spinner.fail('Component files already exist. Use --force to overwrite.');
      return;
    }
    
    // Get template paths
    const templateDir = path.resolve(__dirname, '../../templates/react');
    const componentTemplatePath = path.join(
      templateDir, 
      options.typescript ? 
        (options.styled ? 'component.tsx.styled.hbs' : 'component.tsx.hbs') : 
        (options.styled ? 'component.jsx.styled.hbs' : 'component.jsx.hbs')
    );
    
    const styleTemplatePath = options.styled ? 
      path.join(templateDir, options.typescript ? 'styles.ts.hbs' : 'styles.js.hbs') : 
      path.join(templateDir, 'styles.css.hbs');
    
    // Read templates
    const componentTemplate = await fs.readFile(componentTemplatePath, 'utf8');
    const styleTemplate = await fs.readFile(styleTemplatePath, 'utf8');
    
    // Compile templates
    const compileComponent = Handlebars.compile(componentTemplate);
    const compileStyle = Handlebars.compile(styleTemplate);
    
    // Generate content
    const componentContent = compileComponent({
      componentName: pascalCaseName,
      originalName: componentName,
      utilities: UTILITIES[componentName],
      typescript: options.typescript,
      styled: options.styled
    });
    
    const styleContent = compileStyle({
      componentName: pascalCaseName,
      originalName: componentName
    });
    
    // Write files
    await fs.writeFile(path.join(fullPath, componentFileName), componentContent);
    await fs.writeFile(path.join(fullPath, styleFileName), styleContent);
    const indexPath = await updateIndexFile(pascalCaseName, pascalCaseName, options);
    
    // Get npm install command
    const installCommand = getNpmInstallCommand(componentName, options);
    
    spinner.succeed(`${chalk.green('✅ Successfully generated React component:')} ${pascalCaseName}`);
    console.log(`
${chalk.cyan('Location:')} ${chalk.white(fullPath)}
${chalk.cyan('Files created:')}
  ${chalk.white(componentFileName)}
  ${chalk.white(styleFileName)}
  ${chalk.white(indexPath)}

${chalk.yellow('Next steps:')}
1. Install the component: ${chalk.gray(installCommand)}
2. Import the component: ${chalk.gray(`import { ${pascalCaseName} } from '${options.directory}';`)}
3. Use it in your JSX: ${chalk.gray(`<${pascalCaseName} />`)}
`);

  } catch (error: unknown) {
    spinner.fail(`Failed to generate component: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
  }
}

function getNpmInstallCommand(componentName: string, options: ReactOptions): string {
  const packageName = `@shadnext/${componentName}`;
  
  if (options.styled) {
    return `npm install ${packageName} styled-components${options.typescript ? ' @types/styled-components' : ''}`;
  }
  
  return `npm install ${packageName}`;
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
      
      if (exportNames.includes(componentName) && 
          (normalizedPath === normalizedKebabName || normalizedPath === './' + normalizedKebabName)) {
        alreadyExported = true;
      }
      
      existingExports.push(match[0]);
    }
  }
  
  // Add new export if not already present
  const newExport = `export { ${componentName} } from './${kebabName}';`;
  if (!alreadyExported) {
    existingExports.push(newExport);
  }
  
  // Write back all exports
  fs.writeFileSync(indexFilePath, existingExports.join('\n') + '\n');
  
  return indexFilePath;
} 