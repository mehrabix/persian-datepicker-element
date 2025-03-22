import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import chalk from 'chalk';

// Register Handlebars helpers
Handlebars.registerHelper('kebabCase', (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
});

// Test Angular templates
function testAngularTemplates() {
  console.log(chalk.blue('\n=== Testing Angular Templates ===\n'));
  
  const templatesDir = './packages/shadnext-cli/templates/angular';
  const outputDir = './temp_test/output/angular';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Template data
  const templateData = {
    componentName: 'PersianDatePicker',
    originalName: 'persian-datepicker-element',
    standalone: false
  };
  
  // List all template files
  const templateFiles = [
    { src: 'component.ts.hbs', dest: 'persian-date-picker.component.ts' },
    { src: 'component.html.hbs', dest: 'persian-date-picker.component.html' },
    { src: 'component.scss.hbs', dest: 'persian-date-picker.component.scss' },
    { src: 'index.ts.hbs', dest: 'index.ts' }
  ];
  
  // Process templates
  templateFiles.forEach(file => {
    try {
      const templatePath = path.join(templatesDir, file.src);
      const outputPath = path.join(outputDir, file.dest);
      
      if (!fs.existsSync(templatePath)) {
        console.error(chalk.red(`❌ Template file not found: ${file.src}`));
        return;
      }
      
      // Read template
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
      // Compile template
      const template = Handlebars.compile(templateContent);
      const output = template(templateData);
      
      // Write output
      fs.writeFileSync(outputPath, output);
      console.log(chalk.green(`✓ Generated ${file.dest}`));
    } catch (err) {
      console.error(chalk.red(`❌ Error processing ${file.src}:`), err);
    }
  });
}

// Test React templates
function testReactTemplates() {
  console.log(chalk.blue('\n=== Testing React Templates ===\n'));
  
  const templatesDir = './packages/shadnext-cli/templates/react';
  const outputDir = './temp_test/output/react';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Template data
  const templateData = {
    componentName: 'PersianDatePicker',
    originalName: 'persian-datepicker-element'
  };
  
  // List all template files
  const templateFiles = [
    { src: 'component.tsx.styled.hbs', dest: 'PersianDatePicker.tsx' },
    { src: 'styles.ts.hbs', dest: 'PersianDatePicker.styles.ts' },
    { src: 'index.ts.hbs', dest: 'index.ts' }
  ];
  
  // Process templates
  templateFiles.forEach(file => {
    try {
      const templatePath = path.join(templatesDir, file.src);
      const outputPath = path.join(outputDir, file.dest);
      
      if (!fs.existsSync(templatePath)) {
        console.error(chalk.red(`❌ Template file not found: ${file.src}`));
        return;
      }
      
      // Read template
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
      // Compile template
      const template = Handlebars.compile(templateContent);
      const output = template(templateData);
      
      // Write output
      fs.writeFileSync(outputPath, output);
      console.log(chalk.green(`✓ Generated ${file.dest}`));
    } catch (err) {
      console.error(chalk.red(`❌ Error processing ${file.src}:`), err);
    }
  });
}

// Run the tests
console.log(chalk.yellow('Testing template files...'));
testAngularTemplates();
testReactTemplates();
console.log(chalk.yellow('\nTemplate tests completed!')); 