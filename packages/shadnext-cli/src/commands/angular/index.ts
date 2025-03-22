import { Command, Flags } from '@oclif/core';
import * as chalk from 'chalk';

export default class Angular extends Command {
  static description = 'Commands for integrating with Angular projects';

  static examples = [
    '<%= config.bin %> <%= command.id %> add persian-datepicker-element',
    '<%= config.bin %> <%= command.id %> add persian-datepicker-element --standalone',
  ];

  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  async run() {
    const { args, flags } = await this.parse(Angular);

    this.log(chalk.blue('Shadnext CLI - Angular Commands'));
    this.log(chalk.yellow('\nAvailable Commands:'));
    this.log(`  ${chalk.cyan('add')} - Add a Shadnext web component to an Angular project`);
    this.log(chalk.yellow('\nExamples:'));
    this.log(`  ${chalk.green('shadnext angular add persian-datepicker-element')}`);
    this.log(`  ${chalk.green('shadnext angular add persian-datepicker-element --standalone')}`);
    this.log(chalk.yellow('\nFor more information:'));
    this.log(`  Run ${chalk.cyan('shadnext angular add --help')} for detailed usage`);
  }
} 