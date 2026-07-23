import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function processHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      optimizeHtml(fullPath);
    }
  }
}

function optimizeHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all stylesheet link tags
  const styleRegex = /<link[^>]*rel="stylesheet"[^>]*>/g;
  const styleTags = content.match(styleRegex);
  
  // Find preload/noscript tags for fonts and move them to the top too
  const fontPreloadRegex = /<link[^>]*rel="preload"[^>]*as="style"[^>]*onload="[^"]*"[^>]*\/?>/g;
  const fontPreloadTags = content.match(fontPreloadRegex);
  
  const noscriptRegex = /<noscript>\s*<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*>\s*<\/noscript>/g;
  const noscriptTags = content.match(noscriptRegex);
  
  if (!styleTags && !fontPreloadTags && !noscriptTags) return;
  
  // Remove them from their original positions
  if (styleTags) {
    content = content.replace(styleRegex, '');
  }
  if (fontPreloadTags) {
    content = content.replace(fontPreloadRegex, '');
  }
  if (noscriptTags) {
    content = content.replace(noscriptRegex, '');
  }

  // Insert them at the top of the <head>
  const headStart = content.indexOf('<head>');
  if (headStart === -1) return;
  
  const insertIndex = headStart + '<head>'.length;
  
  const tagsToInsert = [
    ...(fontPreloadTags || []),
    ...(noscriptTags || []),
    ...(styleTags || [])
  ].map(tag => tag.trim()).join('\n    ');
  
  content = content.slice(0, insertIndex) + '\n    ' + tagsToInsert + '\n' + content.slice(insertIndex);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Optimized tag order for: ${filePath}`);
}

processHtmlFiles(distDir);
console.log('Post-build HTML optimization complete!');
