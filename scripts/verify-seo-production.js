import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('======================================================================');
console.log('   PRODUCTION GSC & SEO COMPLIANCE AUTOMATED AUDIT SUITE             ');
console.log('======================================================================\n');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found! Run pnpm build first.');
  process.exit(1);
}

// Find all HTML files in dist
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.')) {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`📁 Found ${htmlFiles.length} generated production HTML pages in dist/\n`);

let totalPassed = 0;
let totalWarnings = 0;
let totalErrors = 0;

const auditResults = [];

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath);
  const html = fs.readFileSync(filePath, 'utf8');

  const pageReport = {
    file: relPath,
    title: '',
    titleLen: 0,
    desc: '',
    descLen: 0,
    canonical: '',
    robots: '',
    hasJsonLd: false,
    jsonLdTypes: [],
    faqParity: true,
    faqCount: 0,
    ogTitle: '',
    ogDesc: '',
    errors: [],
    warnings: [],
  };

  // 1. Title Tag
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    pageReport.title = titleMatch[1].replace(/&amp;/g, '&');
    pageReport.titleLen = pageReport.title.length;
    if (pageReport.titleLen < 30) {
      pageReport.warnings.push(`Short title (${pageReport.titleLen} chars)`);
    } else if (pageReport.titleLen > 65) {
      pageReport.warnings.push(`Title slightly long (${pageReport.titleLen} chars) - may truncate in some SERPs`);
    }
  } else {
    pageReport.errors.push('Missing <title> tag');
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  if (descMatch) {
    pageReport.desc = descMatch[1].replace(/&amp;/g, '&');
    pageReport.descLen = pageReport.desc.length;
    if (pageReport.descLen < 80) {
      pageReport.warnings.push(`Short description (${pageReport.descLen} chars)`);
    } else if (pageReport.descLen > 165) {
      pageReport.warnings.push(`Description slightly long (${pageReport.descLen} chars)`);
    }
  } else {
    pageReport.errors.push('Missing meta description');
  }

  // 3. Canonical Tag
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
  if (canonicalMatch) {
    pageReport.canonical = canonicalMatch[1];
  } else {
    pageReport.errors.push('Missing canonical link tag');
  }

  // 4. Robots Tag
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([\s\S]*?)["']/i);
  if (robotsMatch) {
    pageReport.robots = robotsMatch[1];
  }

  // 5. Open Graph
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["']/i);
  if (ogTitleMatch) pageReport.ogTitle = ogTitleMatch[1];
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i);
  if (ogDescMatch) pageReport.ogDesc = ogDescMatch[1];

  // 6. JSON-LD Structured Data
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches) {
    pageReport.hasJsonLd = true;
    for (const block of jsonLdMatches) {
      const jsonContent = block.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      try {
        const parsed = JSON.parse(jsonContent);
        if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          for (const item of parsed['@graph']) {
            if (item['@type']) {
              pageReport.jsonLdTypes.push(item['@type']);
              
              // FAQ parity check
              if (item['@type'] === 'FAQPage' && Array.isArray(item.mainEntity)) {
                pageReport.faqCount = item.mainEntity.length;
                for (const faq of item.mainEntity) {
                  const qText = faq.name || (faq.question ? faq.question.name : '');
                  if (qText && !html.includes(qText.slice(0, 25))) {
                    pageReport.faqParity = false;
                    pageReport.warnings.push(`FAQ Schema question "${qText.slice(0, 30)}..." not found in visible HTML body!`);
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        pageReport.errors.push(`Invalid JSON-LD syntax: ${err.message}`);
      }
    }
  } else {
    pageReport.warnings.push('No JSON-LD structured data block found');
  }

  auditResults.push(pageReport);

  if (pageReport.errors.length > 0) {
    totalErrors += pageReport.errors.length;
  } else if (pageReport.warnings.length > 0) {
    totalWarnings += pageReport.warnings.length;
    totalPassed++;
  } else {
    totalPassed++;
  }
}

// Print detailed report table
console.log('---------------------------------------------------------------------------------------------------------');
console.log('| Page File                                 | Title (Chars) | Desc (Chars) | Schemas Count | Status       |');
console.log('---------------------------------------------------------------------------------------------------------');

for (const r of auditResults) {
  const fileCol = r.file.padEnd(41).slice(0, 41);
  const titleCol = `${r.titleLen} chars`.padEnd(13);
  const descCol = `${r.descLen} chars`.padEnd(12);
  const schemaCol = `${r.jsonLdTypes.length} types (${r.jsonLdTypes.join(', ').slice(0, 20)}...)`.padEnd(20).slice(0, 20);
  const statusCol = r.errors.length > 0 ? '❌ FAIL' : (r.warnings.length > 0 ? '⚠️ PASS (WARN)' : '✅ PASS');
  console.log(`| ${fileCol} | ${titleCol} | ${descCol} | ${schemaCol} | ${statusCol} |`);
}
console.log('---------------------------------------------------------------------------------------------------------\n');

// Sitemap verification
console.log('--- XML SITEMAP AUDIT ---');
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  console.log(`✅ sitemap.xml exists with ${urlCount} indexed URLs.`);
} else {
  console.error('❌ sitemap.xml missing in dist/');
  totalErrors++;
}

// Robots.txt verification
console.log('\n--- ROBOTS.TXT AUDIT ---');
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  console.log('✅ robots.txt exists.');
  if (robotsContent.includes('Sitemap:')) {
    console.log('✅ robots.txt references sitemap index correctly.');
  } else {
    console.warn('⚠️ robots.txt missing Sitemap reference.');
    totalWarnings++;
  }
} else {
  console.error('❌ robots.txt missing in dist/');
  totalErrors++;
}

console.log('\n======================================================================');
console.log(`   AUDIT COMPLETE: ${totalPassed}/${htmlFiles.length} Pages Passed | Total Errors: ${totalErrors} | Total Warnings: ${totalWarnings}`);
console.log('======================================================================');

if (totalErrors > 0) {
  process.exit(1);
}
