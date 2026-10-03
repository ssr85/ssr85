/**
 * RankMath-Inspired SEO & Striking-Distance Intelligence Engine
 */

export type KeywordTier =
  | "TOP_3"
  | "STRIKING_PAGE_1"
  | "STRIKING_PAGE_2"
  | "FAIR"
  | "POOR";

export interface KeywordMetric {
  id?: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  average_position: number;
  opportunity_score?: number;
  tier?: KeywordTier;
  target_url?: string;
}

export interface ContentScoreResult {
  score: number;
  passedChecks: string[];
  failedChecks: string[];
  recommendations: string[];
}

/**
 * Categorizes a search position into RankMath opportunity tiers
 */
export function categorizeKeywordTier(position: number): KeywordTier {
  if (position <= 3.5) return "TOP_3";
  if (position <= 10.5) return "STRIKING_PAGE_1";
  if (position <= 20.5) return "STRIKING_PAGE_2";
  if (position <= 50.5) return "FAIR";
  return "POOR";
}

/**
 * Calculates RankMath Opportunity Score (0–100 weighted index)
 */
export function calculateRankMathScore(data: {
  position: number;
  impressions: number;
  ctr: number;
  clicks: number;
}): number {
  const { position, impressions, ctr } = data;
  let tierMultiplier = 1.0;

  if (position > 3.5 && position <= 10.5) {
    tierMultiplier = 3.0; // Prime striking distance (Page 1 bottom)
  } else if (position > 10.5 && position <= 20.5) {
    tierMultiplier = 2.0; // Secondary striking distance (Page 2)
  } else if (position <= 3.5) {
    tierMultiplier = 1.2; // Defend & maintain
  } else {
    tierMultiplier = 0.5;
  }

  const ctrGap = ctr < 0.03 ? 1.5 : 1.0;
  const baseVolume = Math.log10(Math.max(impressions, 10)) * 25;
  return Math.round(baseVolume * tierMultiplier * ctrGap * 10) / 10;
}

/**
 * Parses Google Search Console Queries.csv export
 */
export function parseGscCsv(csvContent: string): KeywordMetric[] {
  const lines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const queryIdx = headers.findIndex((h) => h.includes("query") || h.includes("top queries"));
  const clicksIdx = headers.findIndex((h) => h.includes("click"));
  const impIdx = headers.findIndex((h) => h.includes("impression"));
  const ctrIdx = headers.findIndex((h) => h.includes("ctr"));
  const posIdx = headers.findIndex((h) => h.includes("position"));

  const results: KeywordMetric[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle CSV quoting
    const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((val) => val.replace(/(^"|"$)/g, "").trim());
    if (row.length < 5) continue;

    const query = row[queryIdx !== -1 ? queryIdx : 0];
    if (!query) continue;

    const clicks = parseInt(row[clicksIdx !== -1 ? clicksIdx : 1].replace(/,/g, ""), 10) || 0;
    const impressions = parseInt(row[impIdx !== -1 ? impIdx : 2].replace(/,/g, ""), 10) || 0;
    
    const ctrRaw = row[ctrIdx !== -1 ? ctrIdx : 3].replace(/%/g, "").trim();
    let ctr = parseFloat(ctrRaw) || 0;
    if (ctr > 1) ctr = ctr / 100;

    const average_position = parseFloat(row[posIdx !== -1 ? posIdx : 4]) || 0;
    const tier = categorizeKeywordTier(average_position);
    const opportunity_score = calculateRankMathScore({ position: average_position, impressions, ctr, clicks });

    results.push({
      query,
      clicks,
      impressions,
      ctr,
      average_position,
      opportunity_score,
      tier,
    });
  }

  return results.sort((a, b) => (b.opportunity_score || 0) - (a.opportunity_score || 0));
}

/**
 * Evaluates on-page SEO RankMath score (0–100)
 */
export function evaluateContentScore(params: {
  focusKeyword: string;
  title: string;
  description: string;
  headingsCount: number;
  wordCount?: number;
  hasFaqSchema?: boolean;
}): ContentScoreResult {
  const { focusKeyword, title, description, headingsCount, wordCount: _wordCount, hasFaqSchema } = params;
  const kw = focusKeyword.toLowerCase().trim();
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];
  const recommendations: string[] = [];

  let score = 0;

  // 1. Focus keyword in title (20 pts)
  if (title.toLowerCase().includes(kw)) {
    score += 20;
    passedChecks.push("Focus keyword appears in SEO title.");
  } else {
    failedChecks.push("Focus keyword missing from SEO title.");
    recommendations.push(`Include "${focusKeyword}" in the title.`);
  }

  // 2. Title length check (15 pts)
  if (title.length >= 40 && title.length <= 60) {
    score += 15;
    passedChecks.push(`Title length is optimal (${title.length} chars).`);
  } else {
    failedChecks.push(`Title length is ${title.length} chars (optimal: 45–60).`);
    recommendations.push("Adjust title length to 45–60 characters.");
  }

  // 3. Focus keyword in meta description (20 pts)
  if (description.toLowerCase().includes(kw)) {
    score += 20;
    passedChecks.push("Focus keyword appears in meta description.");
  } else {
    failedChecks.push("Focus keyword missing from meta description.");
    recommendations.push(`Add "${focusKeyword}" to the meta description.`);
  }

  // 4. Description length check (15 pts)
  if (description.length >= 120 && description.length <= 160) {
    score += 15;
    passedChecks.push(`Meta description length is optimal (${description.length} chars).`);
  } else {
    failedChecks.push(`Meta description is ${description.length} chars (optimal: 130–160).`);
    recommendations.push("Keep meta description between 130 and 160 characters.");
  }

  // 5. Headings structure (15 pts)
  if (headingsCount >= 4) {
    score += 15;
    passedChecks.push(`Well-structured heading hierarchy (${headingsCount} headings).`);
  } else {
    score += 8;
    failedChecks.push(`Low heading count (${headingsCount} headings).`);
    recommendations.push("Add more H2 and H3 subheadings for topic depth.");
  }

  // 6. Schema check (15 pts)
  if (hasFaqSchema) {
    score += 15;
    passedChecks.push("Structured FAQPage JSON-LD schema detected.");
  } else {
    failedChecks.push("Missing FAQPage schema.");
    recommendations.push("Add structured FAQ schema for SERP rich snippets.");
  }

  return {
    score: Math.min(score, 100),
    passedChecks,
    failedChecks,
    recommendations,
  };
}
