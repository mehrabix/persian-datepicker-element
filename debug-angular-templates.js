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
  console.log(chalk.blue('=== Testing Angular Templates ==='));
  
  const templatesDir = './packages/shadnext-cli/templates/angular';
  const outputDir = './output/angular';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(chalk.green(`Created output directory: ${outputDir}`));
  }
  
  // Template data
  const templateData = {
    componentName: 'PersianDatePicker',
    originalName: 'persian-datepicker-element',
    standalone: false
  };
  
  console.log('Template data:', templateData);
  
  // List all template files
  const templateFiles = [
    { src: 'component.ts.hbs', dest: 'persian-date-picker.component.ts' },
    { src: 'component.html.hbs', dest: 'persian-date-picker.component.html' },
    { src: 'component.scss.hbs', dest: 'persian-date-picker.component.scss' },
    { src: 'index.ts.hbs', dest: 'index.ts' }
  ];
  
  console.log('Files to process:', templateFiles);
  
  // Process templates
  templateFiles.forEach(file => {
    try {
      const templatePath = path.join(templatesDir, file.src);
      const outputPath = path.join(outputDir, file.dest);
      
      console.log(`Processing: ${templatePath} -> ${outputPath}`);
      
      if (!fs.existsSync(templatePath)) {
        console.error(chalk.red(`❌ Template file not found: ${templatePath}`));
        return;
      }
      
      console.log(`Template exists, reading content...`);
      
      // Read template
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
      console.log(`Content length: ${templateContent.length} characters`);
      
      // Compile template
      console.log(`Compiling template...`);
      const template = Handlebars.compile(templateContent);
      const output = template(templateData);
      
      console.log(`Compiled output length: ${output.length} characters`);
      
      // Write output
      console.log(`Writing to: ${outputPath}`);
      fs.writeFileSync(outputPath, output);
      console.log(chalk.green(`✓ Generated ${file.dest}`));
    } catch (err) {
      console.error(chalk.red(`❌ Error processing ${file.src}:`), err);
    }
  });
}

// Run the test
console.log(chalk.yellow('Testing Angular templates...'));
testAngularTemplates();
console.log(chalk.yellow('Angular template test completed!')); 