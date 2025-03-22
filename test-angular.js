import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// Register kebabCase helper
Handlebars.registerHelper('kebabCase', (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
});

// Test the HTML template
try {
  const templatePath = './packages/shadnext-cli/templates/angular/component.html.hbs';
  console.log(`Reading ${templatePath}...`);
  
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template file not found: ${templatePath}`);
    process.exit(1);
  }
  
  // Read template file
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  console.log(`Content length: ${templateContent.length} characters`);
  console.log('Content preview:', templateContent.substring(0, 100));
  
  // Compile template
  const template = Handlebars.compile(templateContent);
  const output = template({
    componentName: 'PersianDatePicker',
    className: 'my-class',
    rtl: true,
    theme: 'dark',
    primaryColor: '#3b82f6'
  });
  
  // Write output
  const outputPath = './output/test-component.html';
  fs.writeFileSync(outputPath, output);
  console.log(`✓ Generated ${outputPath}`);
  console.log('Output preview:', output.substring(0, 100));
} catch (err) {
  console.error('Error:', err);
} 