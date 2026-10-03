import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const siteUrl = 'https://sarabjeetrattan.com';
const today = new Date().toISOString().split('T')[0];

const knownRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/book', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ai-wordpress-development', priority: '0.9', changefreq: 'weekly' },
  { loc: '/custom-ai-solutions', priority: '0.9', changefreq: 'weekly' },
  { loc: '/custom-business-automation', priority: '0.9', changefreq: 'weekly' },
  { loc: '/n8n-workflows', priority: '0.9', changefreq: 'weekly' },
  { loc: '/resume', priority: '0.8', changefreq: 'monthly' },
  { loc: '/tools/architecture-scope-estimator', priority: '0.8', changefreq: 'monthly' },
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
      if (
        route !== '/admin' &&
        route !== '/404' &&
        route !== '/schedule' &&
        !route.startsWith('/admin/')
      ) {
        const isPillar = [
          '/ai-wordpress-development',
          '/custom-ai-solutions',
          '/custom-business-automation',
          '/n8n-workflows',
          '/book',
        ].includes(route);
        pages.push({
          loc: route,
          priority: isPillar ? '0.9' : '0.8',
          changefreq: isPillar ? 'weekly' : 'monthly',
        });
      }
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

  // Find linked CSS files and inline them to eliminate render-blocking requests
  const styleHrefRegex = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*\/?>/g;
  let inlinedStyles = '';
  let match;

  while ((match = styleHrefRegex.exec(content)) !== null) {
    const cssPath = match[1];
    if (cssPath.startsWith('/assets/') && cssPath.endsWith('.css')) {
      const localCssPath = path.join(distDir, cssPath.replace(/^\//, ''));
      if (fs.existsSync(localCssPath)) {
        const cssContent = fs.readFileSync(localCssPath, 'utf8');
        inlinedStyles += `<style>${cssContent}</style>`;
      }
    }
  }

  const styleRegex = /<link[^>]*rel="stylesheet"[^>]*\/?>/g;
  const fontPreloadRegex = /<link[^>]*rel="preload"[^>]*as="style"[^>]*onload="[^"]*"[^>]*\/?>/g;
  const fontPreloadTags = content.match(fontPreloadRegex);
  const noscriptRegex = /<noscript>\s*<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*>\s*<\/noscript>/g;
  const noscriptTags = content.match(noscriptRegex);

  // Remove external stylesheet link if inlined
  if (inlinedStyles) {
    content = content.replace(styleRegex, '');
  }
  if (fontPreloadTags) content = content.replace(fontPreloadRegex, '');
  if (noscriptTags) content = content.replace(noscriptRegex, '');

  const headStart = content.indexOf('<head>');
  if (headStart === -1) return;

  const tagsToInsert = [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    inlinedStyles || '',
    ...(fontPreloadTags || []),
    ...(noscriptTags || [])
  ].filter(Boolean).map(tag => tag.trim()).join('\n    ');

  // Remove duplicate charset/viewport if present further down
  content = content.replace(/<meta charset="UTF-8">/g, '');
  content = content.replace(/<meta name="viewport" content="width=device-width, initial-scale=1.0">/g, '');

  const insertIndex = headStart + '<head>'.length;
  content = content.slice(0, insertIndex) + '\n    ' + tagsToInsert + '\n' + content.slice(insertIndex);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Optimized and inlined CSS for: ${filePath}`);
}

processHtmlFiles(distDir);
generateSitemap();
console.log('Post-build complete!');
