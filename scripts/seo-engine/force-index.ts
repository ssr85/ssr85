import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JWT } from 'google-auth-library';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, '../../public/sitemap.xml');

function findServiceAccountKey(): string | null {
  const files = fs.readdirSync(__dirname);
  const jsonFile = files.find(
    (f) => f.endsWith('.json') && (f.includes('seo') || f.includes('credentials') || f.includes('service-account'))
  );
  return jsonFile ? path.join(__dirname, jsonFile) : null;
}

function parseSitemapUrls(sitemapContent: string): string[] {
  const urls: string[] = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    if (match[1] && !match[1].endsWith('.txt')) {
      urls.push(match[1]);
    }
  }
  return Array.from(new Set(urls));
}

async function getIndexingClient(keyFilePath: string) {
  const keyFile = JSON.parse(fs.readFileSync(keyFilePath, 'utf-8'));
  const client = new JWT({
    email: keyFile.client_email,
    key: keyFile.private_key,
    scopes: [
      'https://www.googleapis.com/auth/indexing',
      'https://www.googleapis.com/auth/webmasters',
    ],
  });

  await client.authorize();
  return client;
}

export async function forceIndexUrls() {
  console.log('⚡ [Instant Indexer] Starting force-indexing routine...\n');

  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`Sitemap not found at: ${SITEMAP_PATH}`);
  }

  const sitemapRaw = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const urls = parseSitemapUrls(sitemapRaw);
  console.log(`📄 Found ${urls.length} live site URLs from sitemap.xml:\n`);
  urls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));

  const keyPath = findServiceAccountKey();
  if (!keyPath) {
    throw new Error('❌ Service Account key not found in scripts/seo-engine/');
  }

  console.log(`\n🔑 Authenticating with: ${path.basename(keyPath)}`);
  const client = await getIndexingClient(keyPath);
  console.log('✅ Google API Authenticated successfully!\n');

  // 1. Google Indexing API (URL Notifications)
  console.log('====================================================');
  console.log('🚀 SUBMITTING TO GOOGLE INDEXING API (Instant Crawl)');
  console.log('====================================================');

  let googleSuccess = 0;
  let googleSkipped = 0;

  for (const url of urls) {
    try {
      const response = await client.request<{
        urlNotificationMetadata?: { latestUpdate?: { notifyTime?: string } };
      }>({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: {
          url: url,
          type: 'URL_UPDATED',
        },
      });

      console.log(`  ✅ [Google Indexing API] Pushed: ${url}`);
      googleSuccess++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('PERMISSION_DENIED') || msg.includes('has not been used in project') || msg.includes('disabled')) {
        console.warn(`  ⚠️ Google Indexing API needs activation: ${msg.slice(0, 120)}`);
        googleSkipped++;
        break; // API not enabled in Cloud Console yet
      } else {
        console.warn(`  ⚠️ [Google Indexing API] ${url} -> ${msg.slice(0, 100)}`);
        googleSkipped++;
      }
    }
  }

  // 2. Google Search Console Sitemap Submission
  console.log('\n====================================================');
  console.log('📡 PINGING GOOGLE SEARCH CONSOLE SITEMAP');
  console.log('====================================================');

  const sitemapUrl = 'https://sarabjeetrattan.com/sitemap.xml';
  const siteProperty = 'sc-domain:sarabjeetrattan.com';

  try {
    const sitemapEndpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      siteProperty
    )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

    await client.request({
      url: sitemapEndpoint,
      method: 'PUT',
    });
    console.log(`  ✅ Successfully pinged & submitted sitemap: ${sitemapUrl}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`  ⚠️ Sitemap ping notice: ${msg.slice(0, 120)}`);
  }

  // 3. IndexNow Submission (Bing, Yandex, Naver, Seznam)
  console.log('\n====================================================');
  console.log('🌐 SUBMITTING TO INDEXNOW (Bing / Yandex / Copilot)');
  console.log('====================================================');

  const indexNowKey = 'ssr85indexnowkey2026';
  const keyLocation = path.resolve(__dirname, `../../public/${indexNowKey}.txt`);

  // Ensure key file exists for verification
  if (!fs.existsSync(keyLocation)) {
    fs.writeFileSync(keyLocation, indexNowKey, 'utf-8');
    console.log(`  📝 Created IndexNow key file: public/${indexNowKey}.txt`);
  }

  try {
    const indexNowRes = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: 'sarabjeetrattan.com',
        key: indexNowKey,
        keyLocation: `https://sarabjeetrattan.com/${indexNowKey}.txt`,
        urlList: urls,
      }),
    });

    if (indexNowRes.ok || indexNowRes.status === 200 || indexNowRes.status === 202) {
      console.log(`  ✅ Successfully pushed ${urls.length} URLs to IndexNow network (Bing/Yandex/Copilot)!`);
    } else {
      const errText = await indexNowRes.text();
      console.warn(`  ⚠️ IndexNow response [${indexNowRes.status}]: ${errText}`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`  ⚠️ IndexNow network error: ${msg}`);
  }

  console.log('\n====================================================');
  console.log('🎉 Force-Indexing Routine Finished!');
  console.log('====================================================\n');
}

forceIndexUrls().catch(console.error);
