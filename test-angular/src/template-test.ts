import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

// Get current file and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register helpers
Handlebars.registerHelper('kebabCase', (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
});

// Create output directory if it doesn't exist
const outputDir = path.resolve(__dirname, '../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template data
const data = {
  componentName: 'PersianDatePicker',
  originalName: 'persian-datepicker-element',
  standalone: false,
  primaryColor: '#3b82f6',
  className: 'test-class',
  rtl: true,
  theme: 'dark'
};

// Define template paths
const templatesDir = path.resolve(__dirname, '../../temp_test/packages/shadnext-cli/templates/angular');
const templateFiles = [
  { name: 'component.ts.hbs', output: 'persian-date-picker.component.ts' },
  { name: 'component.html.hbs', output: 'persian-date-picker.component.html' },
  { name: 'component.scss.hbs', output: 'persian-date-picker.component.scss' },
  { name: 'index.ts.hbs', output: 'index.ts' }
];

console.log(`Templates directory: ${templatesDir}`);

// Process each template
templateFiles.forEach(template => {
  try {
    const templatePath = path.join(templatesDir, template.name);
    const outputPath = path.join(outputDir, template.output);
    
    console.log(`Processing ${template.name}...`);
    
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      console.error(`Error: Template file not found: ${templatePath}`);
      return;
    }
    
    // Read template content
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    console.log(`Read ${templateContent.length} bytes from template`);
    
    // Compile template
    const compiledTemplate = Handlebars.compile(templateContent);
    const output = compiledTemplate(data);
    console.log(`Generated ${output.length} bytes of output`);
    
    // Write output
    fs.writeFileSync(outputPath, output);
    console.log(`Saved output to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${template.name}:`, error);
  }
});

console.log('Template test completed'); 