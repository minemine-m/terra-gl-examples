import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const examplesDir = path.join(__dirname, 'src', 'examples');

const files = fs.readdirSync(examplesDir);

files.forEach(file => {
    if (file.endsWith('.source.ts') && file !== 'LayerPropertiesExample.source.ts') {
        const filePath = path.join(examplesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Regex to match the content inside backticks
        // Matches: export const code = (optional /* html */) ` (content) `; (optional semicolon)
        const match = content.match(/export const code = (?:(?:\/\* html \*\/ )?)`([\s\S]*?)`[;]?/);
        
        if (match && match[1]) {
            const htmlContent = match[1];
            const htmlFileName = file.replace('.source.ts', '.html');
            const htmlFilePath = path.join(examplesDir, htmlFileName);
            
            // Write HTML file
            fs.writeFileSync(htmlFilePath, htmlContent);
            console.log(`Created ${htmlFileName}`);
            
            // Update source.ts file
            const newTsContent = `import code from './${htmlFileName}?raw';\nexport { code };`;
            fs.writeFileSync(filePath, newTsContent);
            console.log(`Updated ${file}`);
        } else {
            console.log(`Skipped ${file} (no match)`);
        }
    }
});
