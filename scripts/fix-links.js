import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlDir = path.join(__dirname, '..', 'Html');

function addBaseTag(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if base tag already exists
    if (content.includes('<base href=')) {
        console.log(`  Skipping (base tag already exists): ${path.basename(filePath)}`);
        return;
    }
    
    // Pattern to match the head tag with meta tags
    const pattern = /(<head>\s*<meta charset="UTF-8">\s*<meta name="viewport" content="width=device-width, initial-scale=1.0">)/i;
    
    if (pattern.test(content)) {
        content = content.replace(pattern, '$1\n    <base href="../">');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  Updated: ${path.basename(filePath)}`);
    } else {
        console.log(`  Skipping (pattern not found): ${path.basename(filePath)}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.html')) {
            addBaseTag(filePath);
        }
    });
}

console.log('Adding <base href="../"> to all HTML files...\n');
processDirectory(htmlDir);
console.log('\nDone!');

