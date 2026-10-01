import type { KeywordMetric, ContentQueueItem } from './types.js';

/**
 * Calculates priority score based on search volume/impressions, CTR gap, and ranking position.
 * Positions between 5 and 15 have the highest marginal uplift if pushed to top 3.
 */
export function calculatePriorityScore(metric: KeywordMetric): number {
  const { impressions, average_position, ctr } = metric;

  // Striking distance multiplier (peaks around position 6-12)
  let positionMultiplier = 1.0;
  if (average_position >= 4.0 && average_position <= 10.0) {
    positionMultiplier = 2.5;
  } else if (average_position > 10.0 && average_position <= 20.0) {
    positionMultiplier = 1.8;
  } else {
    positionMultiplier = 0.8;
  }

  // Low CTR bonus (indicates high impressions but missed clicks -> high optimization potential)
  const ctrBonus = ctr < 0.03 ? 1.5 : 1.0;

  // Base score from volume
  const volumeScore = Math.log10(Math.max(impressions, 10)) * 20;

  return Math.round((volumeScore * positionMultiplier * ctrBonus) * 10) / 10;
}

/**
 * Analyzes keyword metrics and groups them into actionable content recommendations
 */
export function analyzeOpportunities(
  metrics: KeywordMetric[],
  existingSiteRoutes: string[] = []
): ContentQueueItem[] {
  const recommendations: ContentQueueItem[] = [];
  const groupedByPage: Record<string, KeywordMetric[]> = {};

  for (const item of metrics) {
    if (!groupedByPage[item.page_url]) {
      groupedByPage[item.page_url] = [];
    }
    groupedByPage[item.page_url].push(item);
  }

  for (const [pageUrl, pageKeywords] of Object.entries(groupedByPage)) {
    // Sort keywords for this page by impressions
    pageKeywords.sort((a, b) => b.impressions - a.impressions);
    const topKeyword = pageKeywords[0];
    const totalImpressions = pageKeywords.reduce((acc, k) => acc + k.impressions, 0);

    const primaryKeywords = pageKeywords.slice(0, 3).map((k) => k.query);
    const secondaryKeywords = pageKeywords.slice(3, 10).map((k) => k.query);

    const priorityScore = calculatePriorityScore({
      ...topKeyword,
      impressions: totalImpressions,
    });

    const isExistingRoute = existingSiteRoutes.some((route) => pageUrl.includes(route));

    if (isExistingRoute && topKeyword.average_position >= 4.0 && topKeyword.average_position <= 20.0) {
      // IMPROVE: Existing page already has traction
      recommendations.push({
        target_topic: `Optimize ${topKeyword.query} on ${pageUrl}`,
        target_slug: new URL(pageUrl, 'https://sarabjeetrattan.com').pathname,
        action_type: 'IMPROVE',
        status: 'DISCOVERED',
        priority_score: priorityScore,
        primary_keywords: primaryKeywords,
        secondary_keywords: secondaryKeywords,
        existing_page_url: pageUrl,
        brief_data: {
          reason: `Striking distance (Avg Pos: ${topKeyword.average_position.toFixed(1)}, Impressions: ${totalImpressions}). Needs FAQ expansion, updated schema, and intent-rich subheadings.`,
          detectedMetrics: {
            topQuery: topKeyword.query,
            avgPosition: topKeyword.average_position,
            totalImpressions,
          },
        },
      });
    } else if (!isExistingRoute && totalImpressions >= 50) {
      // CREATE: Search demand exists for queries without a dedicated landing page
      const topicSlug = topKeyword.query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      recommendations.push({
        target_topic: topKeyword.query.replace(/\b\w/g, (c) => c.toUpperCase()),
        target_slug: `/services/${topicSlug}`,
        action_type: 'CREATE',
        status: 'DISCOVERED',
        priority_score: priorityScore,
        primary_keywords: primaryKeywords,
        secondary_keywords: secondaryKeywords,
        brief_data: {
          reason: `New high-intent topic cluster detected with ${totalImpressions} impressions. Dedicated pillar/service page recommended.`,
          targetService: topicSlug,
        },
      });
    }
  }

  // Sort overall recommendations by highest priority score
  recommendations.sort((a, b) => b.priority_score - a.priority_score);
  return recommendations;
}
