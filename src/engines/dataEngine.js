import XLSX from 'xlsx';
import path from 'path';
export const convertData = async (filePath, targetExt) => {
  const absPath = path.resolve(filePath);
  const outputFileName = `${path.parse(absPath).name}.${targetExt}`;
  const outputPath = path.join(path.dirname(absPath), outputFileName);

  try {
    const workbook = XLSX.readFile(absPath);
    XLSX.writeFile(workbook, outputPath, { bookType: targetExt === 'csv' ? 'csv' : 'xlsx' });
    return outputPath;
  } catch (error) {
    throw new Error(`Data engine failed: ${error.message}`);
  }
};