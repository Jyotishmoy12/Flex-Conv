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
    .option('-t, --target <ext>', 'Target output format (e.g., pdf, webp, png)')
    .option('-w, --watch', 'Enable Watch Mode for the specified location', false)
    .action(async (pathArg, options) => {
        const isInteractive = !pathArg;

        console.log(chalk.bold.blue('\n Flex-Conv Professional'));
        console.log(chalk.dim('---------------------------------------'));

        if (isInteractive) {
            await bootstrap(true);
        } else {
            await bootstrap(false, {
                file: pathArg,
                target: options.target,
                watch: options.watch
            });
        }
    });

program.parse(process.argv);