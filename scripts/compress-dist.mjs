import AdmZip from 'adm-zip';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(root, 'dist');
const outDir = join(root, 'dl');
const outFile = join(outDir, 'jConveyorTicker.zip');

if (!existsSync(distDir)) {
    console.error('compress_dist ERROR: dist/ not found. Run "npm run build" first.');
    process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const zip = new AdmZip();
zip.addLocalFolder(distDir, 'jquery-conveyor-ticker');
zip.writeZip(outFile);

console.log('Created dl/jConveyorTicker.zip');
