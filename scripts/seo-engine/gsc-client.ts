import type { KeywordMetric } from './types.js';

interface GSCQueryResponseRow {
  keys: string[]; // [query, page, country?, device?]
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/**
 * Fetches search performance data from Google Search Console API.
 * Uses an OAuth2 access token or Google Service Account JWT.
 */
export async function fetchGSCSearchAnalytics(options: {
  siteUrl: string;
  accessToken: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  rowLimit?: number;
}): Promise<KeywordMetric[]> {
  const { siteUrl, accessToken, startDate, endDate, rowLimit = 500 } = options;

  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

  const requestBody = {
    startDate,
    endDate,
    dimensions: ['query', 'page', 'country', 'device'],
    rowLimit,
    dataState: 'all',
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GSC API request failed [${response.status}]: ${errorBody}`);
  }

  const json = await response.json();
  const rows: GSCQueryResponseRow[] = json.rows || [];

  return rows.map((row) => ({
    query: row.keys[0] || '',
    page_url: row.keys[1] || '',
    country: row.keys[2] || 'global',
    device: row.keys[3] || 'all',
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    average_position: Math.round(row.position * 10) / 10,
    recorded_date: endDate,
  }));
}
