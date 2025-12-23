#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { bootstrap } from '../src/main.js';

const program = new Command();

program
    .name('flex-conv')
    .description(' Professional-grade local file converter for Images, Docs, and Data.')
    .version('1.1.0')
    .addHelpText('after', `
${chalk.bold.cyan('\nExample Usage:')}
  ${chalk.dim('# Enter interactive mode')}
  $ flex-conv

  ${chalk.dim('# Convert a single image')}
  $ flex-conv image.png -t webp

  ${chalk.dim('# Batch convert a folder to PDF')}
  $ flex-conv ./my_folder -t pdf

  ${chalk.dim('# Start Watch Mode on a folder')}
  $ flex-conv ./input -t jpg --watch

${chalk.bold.yellow('Engines Used:')}
  • ${chalk.bold('Sharp')}: Image processing (JPG, PNG, WEBP)
  • ${chalk.bold('LibreOffice')}: High-quality Document/PDF rendering
  • ${chalk.bold('SheetJS')}: Spreadsheet & Data parsing
  `);

program
    .argument('[path]', 'The file or folder location to convert')
    .option('-t, --target <ext>', 'Target output format (e.g., pdf, webp, docx)')
    .option('-w, --watch', 'Enable Watch Mode for the specified location', false)
    .action(async (pathArg, options) => {
        try {
            console.log(chalk.bold.blue('\n Flex-Conv Professional'));
            console.log(chalk.dim('---------------------------------------'));

            const isInteractive = !pathArg;

            if (isInteractive) {
                await bootstrap(true);
            } else {
                await bootstrap(false, {
                    file: pathArg,
                    target: options.target,
                    watch: options.watch
                });
            }
        } catch (error) {
            if (error.name === 'ExitPromptError' || error.message.includes('SIGINT')) {
                console.log(chalk.yellow('\n\n Conversion cancelled by user. Exiting...'));
                process.exit(0);
            } else {
                console.error(chalk.red('\n Unexpected Error:'), error.message);
                process.exit(1);
            }
        }
    });

program.parse(process.argv);