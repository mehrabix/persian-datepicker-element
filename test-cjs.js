const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Register helpers
Handlebars.registerHelper('kebabCase', (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
});

// Test templates
console.log('Testing templates...');

// Template data
const data = {
  componentName: 'PersianDatePicker',
  originalName: 'persian-datepicker-element',
  standalone: false
};

// Template path
const templatePath = './packages/shadnext-cli/templates/angular/component.html.hbs';

try {
  // Read template
  console.log(`Reading template: ${templatePath}`);
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  
  // Compile template
  console.log('Compiling template...');
  const template = Handlebars.compile(templateContent);
  const output = template(data);
  
  // Write output
  const outputPath = './output/test-output.html';
  console.log(`Writing output to: ${outputPath}`);
  fs.writeFileSync(outputPath, output);
  
  console.log('Success!');
} catch (err) {
  console.error('Error:', err);
} 