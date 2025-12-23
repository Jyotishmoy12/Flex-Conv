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
    console.clear();
    const answers = await showInteractiveMenu();
    await handleTask(answers.path, answers.target, answers.watch);
  } else {
    await handleTask(config.file, config.target, config.watch);
  }
};
async function handleTask(inputPath, target, watchMode = false) {
  const absPath = path.resolve(inputPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Path not found: ${absPath}`);
  }

  const stats = fs.lstatSync(absPath);

  if (watchMode) {
    const watchDir = stats.isDirectory() ? absPath : path.dirname(absPath);
    startWatchMode(watchDir, target);
  }
  else if (stats.isDirectory()) {
    await processBatch(absPath, target);
  }
  else {
    await runSingleConversion(absPath, target);
  }
}

async function showInteractiveMenu() {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: 'Enter file or folder path:',
      validate: (input) => fs.existsSync(path.resolve(input)) ? true : 'Path does not exist!'
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
      message: 'Enable Watch Mode?',
      default: false
    }
  ]);
}

async function processBatch(dirPath, target) {
  const items = fs.readdirSync(dirPath);
  const files = items.filter(item => {
    const fullPath = path.join(dirPath, item);
    return fs.lstatSync(fullPath).isFile();
  });

  console.log(chalk.blue(`\n Batch: Processing ${files.length} files in ${path.basename(dirPath)}`));

  for (const file of files) {
    await runSingleConversion(path.join(dirPath, file), target, true);
  }
}

function startWatchMode(watchPath, target) {
  console.log(chalk.magenta(`\n👀 Watching: ${watchPath}...`));

  const watcher = chokidar.watch(watchPath, {
    ignored: [
      /(^|[\/\\])\../,
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**'
    ],
    persistent: true,
    ignoreInitial: true,
    depth: 1,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });

  watcher.on('add', async (filePath) => {
    console.log(chalk.yellow(`\n✨ New file: ${path.basename(filePath)}`));
    await runSingleConversion(filePath, target);
  });
  watcher.on('error', (error) => {
    if (error.code === 'EMFILE') {
      console.error(chalk.red('\n System Limit: Too many files in this folder to watch.'));
      console.log(chalk.yellow('Tip: Try watching a specific sub-folder instead of the whole Desktop.'));
    } else {
      console.error(chalk.red(`\n Watcher Error: ${error.message}`));
    }
  });
}

async function runSingleConversion(file, target, isBatch = false) {
  const fileName = path.basename(file);
  const spinner = ora(`${isBatch ? ' ⤷ ' : ''}Converting ${fileName}...`).start();

  try {
    const ext = path.extname(file).toLowerCase();
    if (['.xlsx', '.xls', '.csv'].includes(ext) && (target === 'docx' || target === 'doc')) {
      spinner.text = 'Bridging Spreadsheet to Document (Table Mode)...';
      await convertDoc(file, target);
    }
    else if (target === 'pdf') {
      await convertDoc(file, target);
    }
    else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      await convertImage(file, target);
    }
    else if (['.xlsx', '.csv'].includes(ext)) {
      await convertData(file, target);
    }
    else if (['.docx', '.txt', '.doc', '.pdf'].includes(ext)) {
      await convertDoc(file, target);
    }
    else {
      throw new Error(`Unsupported input format: ${ext}`);
    }

    spinner.succeed(chalk.green(` Done: ${fileName}`));
  } catch (error) {
    spinner.fail(chalk.red(` Failed: ${fileName} (${error.message})`));
  }
}