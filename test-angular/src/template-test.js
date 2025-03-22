"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var handlebars_1 = __importDefault(require("handlebars"));
// Register helpers
handlebars_1.default.registerHelper('kebabCase', function (str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
});
// Create output directory if it doesn't exist
var outputDir = path.resolve('./output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
// Template data
var data = {
    componentName: 'PersianDatePicker',
    originalName: 'persian-datepicker-element',
    standalone: false,
    primaryColor: '#3b82f6',
    className: 'test-class',
    rtl: true,
    theme: 'dark'
};
// Define template paths
var templatesDir = path.resolve('../temp_test/packages/shadnext-cli/templates/angular');
var templateFiles = [
    { name: 'component.ts.hbs', output: 'persian-date-picker.component.ts' },
    { name: 'component.html.hbs', output: 'persian-date-picker.component.html' },
    { name: 'component.scss.hbs', output: 'persian-date-picker.component.scss' },
    { name: 'index.ts.hbs', output: 'index.ts' }
];
// Process each template
templateFiles.forEach(function (template) {
    try {
        var templatePath = path.join(templatesDir, template.name);
        var outputPath = path.join(outputDir, template.output);
        console.log("Processing ".concat(template.name, "..."));
        // Check if template exists
        if (!fs.existsSync(templatePath)) {
            console.error("Error: Template file not found: ".concat(templatePath));
            return;
        }
        // Read template content
        var templateContent = fs.readFileSync(templatePath, 'utf8');
        console.log("Read ".concat(templateContent.length, " bytes from template"));
        // Compile template
        var compiledTemplate = handlebars_1.default.compile(templateContent);
        var output = compiledTemplate(data);
        console.log("Generated ".concat(output.length, " bytes of output"));
        // Write output
        fs.writeFileSync(outputPath, output);
        console.log("Saved output to ".concat(outputPath));
    }
    catch (error) {
        console.error("Error processing ".concat(template.name, ":"), error);
    }
});
console.log('Template test completed');
