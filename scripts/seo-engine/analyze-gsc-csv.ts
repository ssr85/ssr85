import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase, upsertKeywordMetrics, upsertContentQueueItem } from './db.js';
import { calculatePriorityScore } from './opportunity-analyzer.js';
import type { KeywordMetric, ContentQueueItem } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, './data');

interface RawCSVRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function parseGSCQueriesCSV(csvContent: string): RawCSVRow[] {
  const lines = csvContent.split('\n');
  const rows: RawCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV quoting
    const match = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!match || match.length < 5) {
      const parts = line.split(',');
      if (parts.length >= 5) {
        rows.push({
          query: parts[0].replace(/^"|"$/g, '').trim(),
          clicks: parseInt(parts[1], 10) || 0,
          impressions: parseInt(parts[2], 10) || 0,
          ctr: parseFloat(parts[3].replace('%', '')) / (parts[3].includes('%') ? 100 : 1) || 0,
          position: parseFloat(parts[4]) || 0,
        });
      }
      continue;
    }

    const query = match[0].replace(/^"|"$/g, '').trim();
    const clicks = parseInt(match[1].replace(/,/g, ''), 10) || 0;
    const impressions = parseInt(match[2].replace(/,/g, ''), 10) || 0;
    const ctrRaw = match[3].replace(/%/g, '').trim();
    const ctr = parseFloat(ctrRaw) / 100 || 0;
    const position = parseFloat(match[4]) || 0;

    rows.push({ query, clicks, impressions, ctr, position });
  }

  return rows;
}

export async function analyzeLocalGSCFiles() {
  console.log('🔍 [GSC CSV Analyzer] Checking for exported Search Console data in:', DATA_DIR);

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`📁 Created data directory at: ${DATA_DIR}`);
    console.log('👉 Drop your exported "Queries.csv" or "Pages.csv" into this directory to analyze.');
    return;
  }

  const files = fs.readdirSync(DATA_DIR);
  const queryFile = files.find((f) => f.toLowerCase().includes('quer') && f.endsWith('.csv'));

  if (!queryFile) {
    console.log('ℹ️ No Queries.csv file found in scripts/seo-engine/data/ yet.');
    console.log('👉 Export from Search Console (Performance -> Export -> CSV) and drop Queries.csv here.');
    return;
  }

  const fullPath = path.join(DATA_DIR, queryFile);
  console.log(`📄 Reading GSC export: ${queryFile}...`);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const rows = parseGSCQueriesCSV(content);

  console.log(`📊 Successfully parsed ${rows.length} search queries from GSC!`);

  // Categorize queries
  const strikingDistance = rows.filter((r) => r.position >= 4.5 && r.position <= 20.5 && r.impressions >= 10);
  const topPerformers = rows.filter((r) => r.position < 4.5 && r.clicks > 0);
  const highImpressionGaps = rows.filter((r) => r.impressions >= 100 && r.ctr < 0.02);

  console.log('\n🎯 --- GSC AUDIT & OPPORTUNITY SUMMARY ---');
  console.log(`⚡ Top Performing Queries (Positions 1-4): ${topPerformers.length}`);
  console.log(`🔥 Striking-Distance Opportunities (Positions 5-20): ${strikingDistance.length}`);
  console.log(`💡 High Impression / CTR Gap Queries: ${highImpressionGaps.length}`);

  console.log('\n🚀 TOP 10 HIGH-IMPACT OPPORTUNITIES (Striking Distance):');
  console.table(
    strikingDistance
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10)
      .map((r) => ({
        Query: r.query,
        Position: r.position.toFixed(1),
        Impressions: r.impressions,
        Clicks: r.clicks,
        CTR: `${(r.ctr * 100).toFixed(1)}%`,
        PriorityScore: calculatePriorityScore({
          query: r.query,
          page_url: 'https://sarabjeetrattan.com',
          impressions: r.impressions,
          clicks: r.clicks,
          ctr: r.ctr,
          average_position: r.position,
        }),
      }))
  );

  // Sync to Supabase
  const keywordMetrics: KeywordMetric[] = rows.map((r) => ({
    query: r.query,
    page_url: 'https://sarabjeetrattan.com',
    impressions: r.impressions,
    clicks: r.clicks,
    ctr: r.ctr,
    average_position: r.position,
    recorded_date: new Date().toISOString().split('T')[0],
  }));

  console.log('\n💾 Syncing parsed queries to Supabase `keyword_metrics` table...');
  try {
    // Batch upsert 100 at a time
    for (let i = 0; i < keywordMetrics.length; i += 100) {
      const batch = keywordMetrics.slice(i, i + 100);
      await upsertKeywordMetrics(batch);
    }
    console.log('✅ All GSC queries synced to Supabase database!');
  } catch (err: unknown) {
    console.error('⚠️ Note on Supabase sync:', err instanceof Error ? err.message : err);
  }
}

// Execute if run directly
analyzeLocalGSCFiles().catch(console.error);
