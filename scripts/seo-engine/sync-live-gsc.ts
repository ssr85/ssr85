import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JWT } from 'google-auth-library';
import { supabase, upsertKeywordMetrics, upsertContentQueueItem } from './db.js';
import { calculatePriorityScore, analyzeOpportunities } from './opportunity-analyzer.js';
import type { KeywordMetric } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Known possible property identifiers in GSC
const CANDIDATE_SITE_URLS = [
  'sc-domain:sarabjeetrattan.com',
  'https://sarabjeetrattan.com/',
  'https://sarabjeetrattan.com',
  'https://www.sarabjeetrattan.com/',
  'https://www.sarabjeetrattan.com',
];

interface GSCQueryResponseRow {
  keys: string[]; // [query, page, country, device]
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function findServiceAccountKey(): string | null {
  const files = fs.readdirSync(__dirname);
  const jsonFile = files.find(
    (f) => f.endsWith('.json') && (f.includes('seo') || f.includes('credentials') || f.includes('service-account'))
  );
  return jsonFile ? path.join(__dirname, jsonFile) : null;
}

async function getAuthenticatedClient(keyFilePath: string) {
  const keyFile = JSON.parse(fs.readFileSync(keyFilePath, 'utf-8'));
  const client = new JWT({
    email: keyFile.client_email,
    key: keyFile.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  await client.authorize();
  return client;
}

export async function syncLiveGSCData() {
  console.log('🚀 [Antigravity GSC Engine] Initializing live Search Console sync...\n');

  const keyPath = findServiceAccountKey();
  if (!keyPath) {
    throw new Error('❌ No Google Service Account JSON key found in scripts/seo-engine/');
  }

  console.log(`🔑 Using service account key: ${path.basename(keyPath)}`);
  const client = await getAuthenticatedClient(keyPath);
  console.log('✅ Google Cloud Authentication successful!');

  // Calculate Date range (last 90 days up to 2 days ago)
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() - 2);
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 92);

  const startDate = startDateObj.toISOString().split('T')[0];
  const endDate = endDateObj.toISOString().split('T')[0];

  console.log(`📅 Ingestion Date Range: ${startDate} to ${endDate}\n`);

  let successfulSiteUrl = '';
  let queryRows: GSCQueryResponseRow[] = [];

  for (const siteUrl of CANDIDATE_SITE_URLS) {
    console.log(`🌐 Testing property access for: ${siteUrl}...`);
    try {
      const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
      const response = await client.request<{ rows?: GSCQueryResponseRow[] }>({
        url: endpoint,
        method: 'POST',
        data: {
          startDate,
          endDate,
          dimensions: ['query', 'page', 'country', 'device'],
          rowLimit: 5000,
          dataState: 'all',
        },
      });

      successfulSiteUrl = siteUrl;
      queryRows = response.data.rows || [];
      console.log(`✅ Connected successfully to property: ${siteUrl}`);
      break;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('403') || msg.includes('Permission') || msg.includes('User does not have')) {
        console.warn(`   ↳ Permission not granted for ${siteUrl}`);
      } else {
        console.warn(`   ↳ Error probing ${siteUrl}: ${msg.slice(0, 100)}`);
      }
    }
  }

  if (!successfulSiteUrl) {
    console.error('\n❌ Could not connect to any candidate GSC property.');
    console.log('👉 Please ensure the service account email is added to GSC Users & Permissions for:');
    console.log('   sc-domain:sarabjeetrattan.com OR https://sarabjeetrattan.com/');
    return;
  }

  console.log(`\n📊 Ingested ${queryRows.length} total search query rows from GSC!`);

  if (queryRows.length === 0) {
    console.log('ℹ️ No search query impressions recorded in GSC during this date range yet.');
    return;
  }

  // Format into internal KeywordMetric objects
  const metrics: KeywordMetric[] = queryRows.map((r) => ({
    query: r.keys[0] || '',
    page_url: r.keys[1] || '',
    country: r.keys[2] || 'global',
    device: r.keys[3] || 'all',
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    average_position: Math.round(r.position * 10) / 10,
    recorded_date: endDate,
  }));

  // Analyze keyword tiers
  const top3 = metrics.filter((m) => m.average_position <= 3.5);
  const strikingPage1 = metrics.filter((m) => m.average_position > 3.5 && m.average_position <= 10.5);
  const strikingPage2 = metrics.filter((m) => m.average_position > 10.5 && m.average_position <= 20.5);
  const fair = metrics.filter((m) => m.average_position > 20.5 && m.average_position <= 50.5);

  console.log('\n🎯 --- RANKMATH SEARCH INTELLIGENCE BREAKDOWN ---');
  console.log(`🥇 Top 3 Positions: ${top3.length}`);
  console.log(`🔥 Striking Distance Page 1 (Pos 4-10): ${strikingPage1.length}`);
  console.log(`⚡ Striking Distance Page 2 (Pos 11-20): ${strikingPage2.length}`);
  console.log(`📈 Fair Opportunities (Pos 21-50): ${fair.length}`);

  const strikingCombined = [...strikingPage1, ...strikingPage2].sort((a, b) => b.impressions - a.impressions);

  if (strikingCombined.length > 0) {
    console.log('\n🚀 TOP STRIKING-DISTANCE KEYWORDS (Highest Traffic Potential):');
    console.table(
      strikingCombined.slice(0, 15).map((kw) => ({
        Query: kw.query,
        Position: `#${kw.average_position.toFixed(1)}`,
        Impressions: kw.impressions,
        Clicks: kw.clicks,
        CTR: `${(kw.ctr * 100).toFixed(1)}%`,
        PriorityScore: calculatePriorityScore(kw),
        Page: kw.page_url.replace('https://sarabjeetrattan.com', ''),
      }))
    );
  }

  // Sync to Supabase
  console.log('\n💾 Syncing live metrics to Supabase `keyword_metrics` table...');
  try {
    for (let i = 0; i < metrics.length; i += 100) {
      const batch = metrics.slice(i, i + 100);
      await upsertKeywordMetrics(batch);
    }
    console.log('✅ Supabase keyword metrics successfully updated!');
  } catch (err: unknown) {
    console.error('⚠️ Note on Supabase upsert:', err instanceof Error ? err.message : err);
  }

  // Generate Content Optimization Queue
  console.log('\n🧠 Generating optimization queue based on striking distance queries...');
  const existingRoutes = ['/', '/resume', '/n8n-workflows', '/insights', '/about'];
  const opportunities = analyzeOpportunities(metrics, existingRoutes);

  console.log(`💡 Generated ${opportunities.length} prioritized content optimization tasks.`);
  for (const opp of opportunities.slice(0, 5)) {
    try {
      await upsertContentQueueItem(opp);
    } catch {
      // ignore
    }
  }

  console.log('\n✨ GSC Sync & Striking Distance Analysis Complete!');
}

syncLiveGSCData().catch(console.error);
