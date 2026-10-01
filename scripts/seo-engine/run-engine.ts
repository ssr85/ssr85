import { supabase, upsertKeywordMetrics, getStrikingDistanceKeywords, upsertContentQueueItem, getPendingContentQueue } from './db.js';
import { analyzeOpportunities } from './opportunity-analyzer.js';
import type { KeywordMetric } from './types.js';

// Seed demo data for cold-start testing if no live GSC connection is passed yet
const SAMPLE_GSC_METRICS: KeywordMetric[] = [
  {
    query: 'ai wordpress development',
    page_url: 'https://sarabjeetrattan.com/case-studies/ai-wordpress-development',
    impressions: 1420,
    clicks: 42,
    ctr: 0.029,
    average_position: 11.4,
    country: 'USA',
    recorded_date: new Date().toISOString().split('T')[0],
  },
  {
    query: 'n8n workflow automation consultant',
    page_url: 'https://sarabjeetrattan.com/n8n-workflows',
    impressions: 980,
    clicks: 58,
    ctr: 0.059,
    average_position: 7.8,
    country: 'USA',
    recorded_date: new Date().toISOString().split('T')[0],
  },
  {
    query: 'google sheets apps script crm automation',
    page_url: 'https://sarabjeetrattan.com/case-studies/crm-automation',
    impressions: 650,
    clicks: 18,
    ctr: 0.027,
    average_position: 14.2,
    country: 'GBR',
    recorded_date: new Date().toISOString().split('T')[0],
  },
  {
    query: 'ai website maintenance services',
    page_url: 'https://sarabjeetrattan.com/services/ai-website-maintenance',
    impressions: 520,
    clicks: 8,
    ctr: 0.015,
    average_position: 16.5,
    country: 'USA',
    recorded_date: new Date().toISOString().split('T')[0],
  },
];

async function main() {
  console.log('🚀 [Antigravity SEO Engine] Starting diagnostics & pipeline run...\n');

  // 1. Verify Supabase connectivity
  try {
    const { count, error } = await supabase.from('keyword_metrics').select('*', { count: 'exact', head: true });
    if (error) {
      console.warn(`⚠️ Note: keyword_metrics table query returned: ${error.message}`);
      console.log('👉 Make sure you have executed the migration in Supabase SQL editor: supabase/migrations/20261001000000_ai_seo_growth_engine.sql\n');
    } else {
      console.log(`✅ Supabase Connected! Current tracked keyword records in DB: ${count ?? 0}`);
    }
  } catch (err: unknown) {
    console.error('❌ Supabase connection failed:', err instanceof Error ? err.message : err);
  }

  // 2. Run Opportunity Analyzer on Dataset
  console.log('\n🔍 [Opportunity Analyzer] Analyzing search metrics for striking-distance targets (Pos 5-20)...');
  const existingRoutes = ['/', '/resume', '/n8n-workflows', '/case-studies/ai-wordpress-development', '/case-studies/crm-automation'];
  const opportunities = analyzeOpportunities(SAMPLE_GSC_METRICS, existingRoutes);

  console.log(`📊 Found ${opportunities.length} prioritized content opportunities:`);
  console.table(
    opportunities.map((opp) => ({
      Action: opp.action_type,
      Topic: opp.target_topic.slice(0, 35),
      Slug: opp.target_slug,
      Priority: opp.priority_score,
      Keywords: opp.primary_keywords.join(', ').slice(0, 30),
    }))
  );

  console.log('\n🎯 [Next Action] To activate autonomous live ingestion:');
  console.log('1. Run the SQL migration in your Supabase project dashboard.');
  console.log('2. Provide your Google Cloud Service Account key to connect live GSC & GA4 APIs.');
  console.log('3. Antigravity can now ingest, score, draft, and optimize service pages directly from this pipeline.');
}

main().catch(console.error);
