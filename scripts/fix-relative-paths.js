import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlDir = path.join(__dirname, '..', 'Html');

function fixRelativePaths(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix CSS links: /css/... -> css/...
    if (content.includes('href="/css/')) {
        content = content.replace(/href="\/css\//g, 'href="css/');
        modified = true;
    }
    
    // Fix JS scripts: /js/... -> js/...
    if (content.includes('src="/js/')) {
        content = content.replace(/src="\/js\//g, 'src="js/');
        modified = true;
    }
    
    // Fix image sources: /img/... -> ../img/... (for files in Html folder)
    if (content.includes('src="/img/')) {
        content = content.replace(/src="\/img\//g, 'src="../img/');
        modified = true;
    }
    
    // Fix HTML links: /Html/... -> ... (remove /Html/ prefix)
    if (content.includes('href="/Html/')) {
        content = content.replace(/href="\/Html\//g, 'href="');
        modified = true;
    }
    
    // Remove the base tag if it exists (we're using relative paths now)
    if (content.includes('<base href=')) {
        content = content.replace(/\s*<base href="\.\.\/">\s*/g, '\n    ');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  Updated: ${path.basename(filePath)}`);
    } else {
        console.log(`  No changes: ${path.basename(filePath)}`);
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
            fixRelativePaths(filePath);
        }
    });
}

console.log('Converting absolute paths to relative paths...\n');
processDirectory(htmlDir);
console.log('\nDone!');

