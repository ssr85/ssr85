import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const siteUrl = 'https://sarabjeetrattan.com';
const today = new Date().toISOString().split('T')[0];

const knownRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  { loc: '/resume', priority: '0.9', changefreq: 'monthly' },
  { loc: '/llms.txt', priority: '0.9', changefreq: 'weekly' },
  { loc: '/llms-full.txt', priority: '0.9', changefreq: 'weekly' },
  { loc: '/#snapshot', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#case-studies', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#projects', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#services', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#faq', priority: '0.5', changefreq: 'monthly' },
  { loc: '/#beyond', priority: '0.5', changefreq: 'monthly' },
];

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

function getRenderedPages(dir, baseDir = dir) {
  const pages = [];
  if (!fs.existsSync(dir)) return pages;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      pages.push(...getRenderedPages(fullPath, baseDir));
    } else if (file.endsWith('.html') && file !== 'index.html') {
      const relativePath = path.relative(baseDir, fullPath);
      const route = '/' + relativePath.replace(/\/?index\.html$/, '').replace(/\.html$/, '');
      pages.push({ loc: route, priority: '0.9', changefreq: 'monthly' });
    }
  }
  return pages;
}

function generateSitemap() {
  const renderedPages = getRenderedPages(distDir);
  const seen = new Set();
  const allRoutes = [...knownRoutes, ...renderedPages].filter(route => {
    if (seen.has(route.loc)) return false;
    seen.add(route.loc);
    return true;
  });

  const urls = allRoutes.map(route => `  <url>
    <loc>${siteUrl}${route.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`Generated sitemap: ${sitemapPath} (${allRoutes.length} URLs)`);
}

function optimizeHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const styleRegex = /<link[^>]*rel="stylesheet"[^>]*>/g;
  const styleTags = content.match(styleRegex);

  const fontPreloadRegex = /<link[^>]*rel="preload"[^>]*as="style"[^>]*onload="[^"]*"[^>]*\/?>/g;
  const fontPreloadTags = content.match(fontPreloadRegex);

  const noscriptRegex = /<noscript>\s*<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*>\s*<\/noscript>/g;
  const noscriptTags = content.match(noscriptRegex);

  if (!styleTags && !fontPreloadTags && !noscriptTags) return;

  if (styleTags) content = content.replace(styleRegex, '');
  if (fontPreloadTags) content = content.replace(fontPreloadRegex, '');
  if (noscriptTags) content = content.replace(noscriptRegex, '');

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
generateSitemap();
console.log('Post-build complete!');
