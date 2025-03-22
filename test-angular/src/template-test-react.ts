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
const outputDir = path.resolve(__dirname, '../output/react');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template data
const data = {
  componentName: 'PersianDatePicker',
  originalName: 'persian-datepicker-element',
  styled: true  // This is needed for component.tsx.styled.hbs
};

// Define template paths
const templatesDir = path.resolve(__dirname, '../../temp_test/packages/shadnext-cli/templates/react');
const templateFiles = [
  { name: 'component.tsx.styled.hbs', output: 'PersianDatePicker.tsx' },
  { name: 'styles.ts.hbs', output: 'PersianDatePicker.styles.ts' },
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
    console.log(`Read ${templateContent.length} bytes from template ${template.name}`);
    
    // Compile template
    const compiledTemplate = Handlebars.compile(templateContent);
    const output = compiledTemplate(data);
    console.log(`Generated ${output.length} bytes of output for ${template.output}`);
    
    // Write output
    fs.writeFileSync(outputPath, output);
    console.log(`Saved output to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${template.name}:`, error);
  }
});

// Now let's read the output files to verify they were generated correctly
console.log('\nVerifying generated files:');
templateFiles.forEach(template => {
  try {
    const outputPath = path.join(outputDir, template.output);
    const fileContent = fs.readFileSync(outputPath, 'utf8');
    const firstLine = fileContent.split('\n')[0];
    console.log(`${template.output}: First line: ${firstLine}`);
  } catch (error) {
    console.error(`Error verifying ${template.output}:`, error);
  }
});

console.log('React template test completed'); 