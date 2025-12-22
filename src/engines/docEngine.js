import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import chalk from 'chalk';

const execPromise = promisify(exec);

export const convertDoc = async (filePath, targetExt) => {
    const absPath = path.resolve(filePath);
    const outputDir = path.dirname(absPath);
    const winDefaultPath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;
    const cmdPath = `soffice --headless --convert-to ${targetExt} --outdir "${outputDir}" "${absPath}"`;
    const fallbackCmd = `${winDefaultPath} --headless --convert-to ${targetExt} --outdir "${outputDir}" "${absPath}"`;

    try {
        await execPromise(cmdPath);
        return true;
    } catch (error) {
        try {
            console.log(chalk.dim(`\n[Engine] 'soffice' not in PATH. Trying default install location...`));
            await execPromise(fallbackCmd);
            return true;
        } catch (fallbackError) {
            throw new Error(
                'LibreOffice (soffice) not found. Please install it or check C:\\Program Files\\LibreOffice'
            );
        }
    }
};