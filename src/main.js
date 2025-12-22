import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { convertDoc } from './engines/docEngine.js';
import { convertImage } from './engines/imgEngine.js';
import { convertData } from './engines/dataEngine.js';
export const bootstrap = async (isInteractive, config = {}) => {
  if (isInteractive) {
    const answers = await showInteractiveMenu();
    await handleTask(answers.file, answers.target, answers.watch);
  } else {
    await handleTask(config.file, config.target, config.watch);
  }
};
async function handleTask(inputPath, target, watchMode = false) {
  const absPath = path.resolve(inputPath);

  if (!fs.existsSync(absPath)) {
    console.error(chalk.red(`\nError: Path does not exist -> ${absPath}`));
    return;
  }

  const stats = fs.lstatSync(absPath);

  if (watchMode) {
    startWatchMode(absPath, target);
  } else if (stats.isDirectory()) {
    await processBatch(absPath, target);
  } else {
    await runConversion(absPath, target);
  }
}
async function showInteractiveMenu() {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'file',
      message: 'Enter file or folder path:',
      validate: (input) => fs.existsSync(path.resolve(input)) ? true : 'Invalid path!'
    },
    {
      type: 'list',
      name: 'target',
      message: 'Select target format:',
      choices: ['pdf', 'png', 'jpg', 'webp', 'xlsx', 'csv', 'docx']
    },
    {
      type: 'confirm',
      name: 'watch',
      message: 'Enable Watch Mode? (Auto-convert new files)',
      default: false
    }
  ]);
}
async function processBatch(dirPath, target) {
  const items = fs.readdirSync(dirPath);
  const files = items.filter(item => fs.lstatSync(path.join(dirPath, item)).isFile());

  console.log(chalk.blue(`\n Batch Mode: Found ${files.length} files in ${dirPath}`));

  for (const file of files) {
    await runConversion(path.join(dirPath, file), target, true);
  }
  console.log(chalk.bold.green('\n Batch processing complete.'));
}
function startWatchMode(watchPath, target) {
  console.log(chalk.magenta(`\n Watch Mode Active: Monitoring ${watchPath}...`));
  console.log(chalk.dim('Press Ctrl+C to exit.'));
  const watcher = chokidar.watch(watchPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 } // Wait for file to finish writing
  });

  watcher.on('add', async (filePath) => {
    console.log(chalk.yellow(`\n✨ New file detected: ${path.basename(filePath)}`));
    await runConversion(filePath, target);
  });

  watcher.on('error', error => console.error(chalk.red(`Watcher Error: ${error}`)));
}
async function runConversion(file, target, silent = false) {
  const fileName = path.basename(file);
  const spinner = ora(`Converting ${fileName}...`).start();

  try {
    const ext = path.extname(file).toLowerCase();

    if (target === 'pdf') await convertDoc(file, target);
    else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) await convertImage(file, target);
    else if (['.xlsx', '.csv'].includes(ext)) await convertData(file, target);
    else if (['.docx', '.txt'].includes(ext)) await convertDoc(file, target);
    else throw new Error('Unsupported format');

    spinner.succeed(chalk.green(` Done: ${fileName}`));
  } catch (error) {
    spinner.fail(chalk.red(` Failed: ${fileName} (${error.message})`));
  }
}