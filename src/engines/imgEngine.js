import sharp from 'sharp';
import path from 'path';
export const convertImage = async (filePath, targetExt) => {
    const absPath = path.resolve(filePath);
    const outputFileName = `${path.parse(absPath).name}.${targetExt}`;
    const outputPath = path.join(path.dirname(absPath), outputFileName);
    try {
        console.log(`\n[Engine] Sharp processing: ${path.basename(absPath)} -> ${targetExt}`);
        await sharp(absPath)
            .toFormat(targetExt, { quality: 90 })
            .toFile(outputPath);

        return outputPath;
    } catch (error) {
        throw new Error(`Image engine failed: ${error.message}`);
    }
};