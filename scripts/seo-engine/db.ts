import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { KeywordMetric, ContentQueueItem, PagePerformance } from './types.js';

// Load environment variables from .env or .env.local using native fs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function loadEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env.local'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
];

for (const envPath of possibleEnvPaths) {
  loadEnvFile(envPath);
}

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.VITE_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ [SEO-Engine DB] Supabase URL or Key missing in environment.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function upsertKeywordMetrics(metrics: KeywordMetric[]) {
  if (!metrics || metrics.length === 0) return;
  const { data, error } = await supabase
    .from('keyword_metrics')
    .upsert(metrics, { onConflict: 'query,page_url,country,recorded_date' });

  if (error) {
    console.error('❌ Error upserting keyword metrics:', error.message);
    throw error;
  }
  return data;
}

export async function getStrikingDistanceKeywords(minImpressions = 50) {
  const { data, error } = await supabase
    .from('keyword_metrics')
    .select('*')
    .gte('average_position', 4.5)
    .lte('average_position', 20.5)
    .gte('impressions', minImpressions)
    .order('impressions', { ascending: false });

  if (error) {
    console.error('❌ Error querying striking distance keywords:', error.message);
    throw error;
  }
  return data as KeywordMetric[];
}

export async function upsertContentQueueItem(item: ContentQueueItem) {
  const { data, error } = await supabase
    .from('content_queue')
    .upsert(item)
    .select()
    .single();

  if (error) {
    console.error('❌ Error saving content queue item:', error.message);
    throw error;
  }
  return data as ContentQueueItem;
}

export async function getPendingContentQueue() {
  const { data, error } = await supabase
    .from('content_queue')
    .select('*')
    .in('status', ['DISCOVERED', 'PLANNED', 'DRAFTED', 'IN_REVIEW'])
    .order('priority_score', { ascending: false });

  if (error) {
    console.error('❌ Error fetching content queue:', error.message);
    throw error;
  }
  return data as ContentQueueItem[];
}
