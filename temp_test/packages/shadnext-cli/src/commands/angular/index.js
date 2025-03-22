import chalk from 'chalk';
import addCommand from './add.js';

export default function angularCommands(program) {
  // Add the base angular command
  const angularCommand = program
    .command('angular')
    .description('Commands for integrating with Angular projects')
    .action(() => {
      console.log(chalk.blue('Shadnext CLI - Angular Commands'));
      console.log(chalk.yellow('\nAvailable Commands:'));
      console.log(`  ${chalk.cyan('add')} - Add a Shadnext web component to an Angular project`);
      console.log(chalk.yellow('\nExamples:'));
      console.log(`  ${chalk.green('shadnext angular add persian-datepicker-element')}`);
      console.log(`  ${chalk.green('shadnext angular add persian-datepicker-element --standalone')}`);
      console.log(chalk.yellow('\nFor more information:'));
      console.log(`  Run ${chalk.cyan('shadnext angular add --help')} for detailed usage`);
    });

  // Register subcommands
  addCommand(angularCommand);

  return angularCommand;
} 