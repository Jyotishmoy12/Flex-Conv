#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { bootstrap } from '../src/main.js';

const program = new Command();

program
    .name('flex-conv')
    .description('Professional CLI File Converter')
    .version('1.1.0');

program
    .argument('[path]', 'The file or folder location to convert')
    .option('-t, --target <ext>', 'Target output format')
    .option('-w, --watch', 'Enable Watch Mode', false)
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