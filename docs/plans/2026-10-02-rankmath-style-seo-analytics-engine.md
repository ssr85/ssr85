# RankMath-Style SEO & Striking Distance Keyword Intelligence Engine Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Build a RankMath-inspired SEO Analytics and Striking Distance Keyword Intelligence Engine that ingests Google Search Console / GA4 data, scores striking-distance queries (Pos 4–20), evaluates on-page Content Scores (0–100), and provides an actionable optimization command center in the Admin Dashboard.

**Architecture:** A TypeScript-driven SEO engine running inside the Vite/React application and Node CLI. Search performance metrics are ingested from GSC (CSV exports or direct API), scored using a RankMath-style positioning & CTR algorithm in `opportunity-analyzer.ts`, saved to Supabase `keyword_metrics`, and analyzed against page source code to calculate Content Scores and generate targeted on-page recommendations in `AdminDashboard.tsx`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Supabase JS Client, Vitest for test-driven validation.

---

### Task 1: Clean Test Data & Implement RankMath Keyword Tier Categorization

**Files:**
- Create: `src/lib/seo/rankmath-analyzer.ts`
- Create: `src/lib/seo/__tests__/rankmath-analyzer.test.ts`
- Modify: `scripts/seo-engine/data/Queries.csv`
- Modify: `scripts/seo-engine/opportunity-analyzer.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/seo/__tests__/rankmath-analyzer.test.ts
import { describe, it, expect } from 'vitest';
import { categorizeKeywordTier, calculateRankMathScore } from '../rankmath-analyzer';

describe('RankMath Keyword Categorizer', () => {
  it('correctly assigns RankMath position tiers', () => {
    expect(categorizeKeywordTier(2.1)).toBe('TOP_3');
    expect(categorizeKeywordTier(6.4)).toBe('STRIKING_PAGE_1');
    expect(categorizeKeywordTier(14.8)).toBe('STRIKING_PAGE_2');
    expect(categorizeKeywordTier(35.0)).toBe('FAIR');
    expect(categorizeKeywordTier(75.0)).toBe('POOR');
  });

  it('calculates opportunity score weighting striking distance queries highest', () => {
    const page1Score = calculateRankMathScore({ position: 7.0, impressions: 1000, ctr: 0.02, clicks: 20 });
    const poorScore = calculateRankMathScore({ position: 80.0, impressions: 1000, ctr: 0.001, clicks: 1 });
    expect(page1Score).toBeGreaterThan(poorScore);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/lib/seo/__tests__/rankmath-analyzer.test.ts`
Expected: FAIL with "Cannot find module '../rankmath-analyzer'"

**Step 3: Write minimal implementation**

```typescript
// src/lib/seo/rankmath-analyzer.ts
export type KeywordTier = 'TOP_3' | 'STRIKING_PAGE_1' | 'STRIKING_PAGE_2' | 'FAIR' | 'POOR';

export interface KeywordData {
  position: number;
  impressions: number;
  ctr: number;
  clicks: number;
}

export function categorizeKeywordTier(position: number): KeywordTier {
  if (position <= 3.5) return 'TOP_3';
  if (position <= 10.5) return 'STRIKING_PAGE_1';
  if (position <= 20.5) return 'STRIKING_PAGE_2';
  if (position <= 50.5) return 'FAIR';
  return 'POOR';
}

export function calculateRankMathScore(data: KeywordData): number {
  const { position, impressions, ctr } = data;
  let tierMultiplier = 1.0;

  if (position > 3.5 && position <= 10.5) {
    tierMultiplier = 3.0; // Prime striking distance
  } else if (position > 10.5 && position <= 20.5) {
    tierMultiplier = 2.0; // Secondary striking distance
  } else if (position <= 3.5) {
    tierMultiplier = 1.2; // Defend & maintain
  } else {
    tierMultiplier = 0.5;
  }

  const ctrGap = ctr < 0.03 ? 1.5 : 1.0;
  const baseVolume = Math.log10(Math.max(impressions, 10)) * 25;
  return Math.round(baseVolume * tierMultiplier * ctrGap * 10) / 10;
}
```

**Step 4: Run test to verify it passes**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/lib/seo/__tests__/rankmath-analyzer.test.ts`
Expected: PASS

**Step 5: Clean test data in `scripts/seo-engine/data/Queries.csv` and Commit**

```bash
git add src/lib/seo/ scripts/seo-engine/
git commit -m "feat(seo): add RankMath keyword tier scoring and clean sample queries"
```

---

### Task 2: Implement On-Page Content Score Checker (RankMath 0–100 Algorithm)

**Files:**
- Create: `src/lib/seo/content-scorer.ts`
- Create: `src/lib/seo/__tests__/content-scorer.test.ts`

**Step 1: Write the failing test**

```typescript
// src/lib/seo/__tests__/content-scorer.test.ts
import { describe, it, expect } from 'vitest';
import { calculateContentScore } from '../content-scorer';

describe('RankMath On-Page Content Scorer', () => {
  it('computes 0-100 score based on focus keyword presence and on-page criteria', () => {
    const pageHtml = `
      <html>
        <head><title>Best n8n Workflow Automation Consultant</title></head>
        <body>
          <h1>n8n Workflow Automation Consultant</h1>
          <p>Looking for an expert n8n workflow automation consultant to streamline your operations?</p>
          <h2>Why Choose Our n8n Workflow Automation Services</h2>
          <p>${'Sample text content describing automated pipelines in detail. '.repeat(40)}</p>
          <a href="/case-studies">View Case Studies</a>
        </body>
      </html>
    `;

    const result = calculateContentScore({
      focusKeyword: 'n8n workflow automation',
      title: 'Best n8n Workflow Automation Consultant',
      description: 'Hire an n8n workflow automation consultant to scale your operations with custom webhooks.',
      urlSlug: '/n8n-workflows',
      content: pageHtml,
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.checks.keywordInTitle).toBe(true);
    expect(result.checks.keywordInH1).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/lib/seo/__tests__/content-scorer.test.ts`
Expected: FAIL with "Cannot find module '../content-scorer'"

**Step 3: Write minimal implementation**

```typescript
// src/lib/seo/content-scorer.ts
export interface ContentScoreInput {
  focusKeyword: string;
  title: string;
  description: string;
  urlSlug: string;
  content: string;
}

export interface ContentScoreResult {
  score: number;
  grade: 'GOOD' | 'FAIR' | 'POOR';
  checks: {
    keywordInTitle: boolean;
    keywordInMetaDesc: boolean;
    keywordInH1: boolean;
    keywordInH2: boolean;
    keywordInFirst10Percent: boolean;
    keywordInSlug: boolean;
    wordCountSufficient: boolean;
    hasInternalLinks: boolean;
  };
  recommendations: string[];
}

export function calculateContentScore(input: ContentScoreInput): ContentScoreResult {
  const kw = input.focusKeyword.toLowerCase().trim();
  const title = (input.title || '').toLowerCase();
  const desc = (input.description || '').toLowerCase();
  const slug = (input.urlSlug || '').toLowerCase();
  const rawContent = (input.content || '').toLowerCase();
  const textOnly = rawContent.replace(/<[^>]*>/g, ' ');
  const words = textOnly.split(/\s+/).filter(Boolean);

  const keywordInTitle = title.includes(kw);
  const keywordInMetaDesc = desc.includes(kw);
  const keywordInH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(input.content) && 
    (input.content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].toLowerCase().includes(kw) ?? false);
  const keywordInH2 = /<h2[^>]*>([\s\S]*?)<\/h2>/i.test(input.content) && 
    (input.content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1].toLowerCase().includes(kw) ?? false);
  
  const first10PercentText = textOnly.slice(0, Math.floor(textOnly.length * 0.15));
  const keywordInFirst10Percent = first10PercentText.includes(kw);
  const keywordInSlug = slug.includes(kw.replace(/\s+/g, '-'));
  const wordCountSufficient = words.length >= 400;
  const hasInternalLinks = /<a[^>]+href=["'][^"']+["'][^>]*>/i.test(input.content);

  const checks = {
    keywordInTitle,
    keywordInMetaDesc,
    keywordInH1,
    keywordInH2,
    keywordInFirst10Percent,
    keywordInSlug,
    wordCountSufficient,
    hasInternalLinks,
  };

  let score = 0;
  if (checks.keywordInTitle) score += 20;
  if (checks.keywordInMetaDesc) score += 15;
  if (checks.keywordInH1) score += 15;
  if (checks.keywordInH2) score += 15;
  if (checks.keywordInFirst10Percent) score += 10;
  if (checks.keywordInSlug) score += 10;
  if (checks.wordCountSufficient) score += 10;
  if (checks.hasInternalLinks) score += 5;

  const recommendations: string[] = [];
  if (!checks.keywordInTitle) recommendations.push(`Add "${input.focusKeyword}" to your Page Title Tag.`);
  if (!checks.keywordInH1) recommendations.push(`Ensure your main <h1> heading includes "${input.focusKeyword}".`);
  if (!checks.keywordInFirst10Percent) recommendations.push(`Introduce "${input.focusKeyword}" within the first 100 words.`);
  if (!checks.wordCountSufficient) recommendations.push(`Expand content depth (current: ${words.length} words, target: 600+ words).`);
  if (!checks.hasInternalLinks) recommendations.push('Add contextual internal links to related case studies or insights.');

  const grade = score >= 80 ? 'GOOD' : score >= 50 ? 'FAIR' : 'POOR';

  return { score, grade, checks, recommendations };
}
```

**Step 4: Run test to verify it passes**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/lib/seo/__tests__/content-scorer.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/seo/
git commit -m "feat(seo): implement RankMath 0-100 on-page content score algorithm"
```

---

### Task 3: Build RankMath-Style Striking Distance Command Center in Admin Dashboard

**Files:**
- Modify: `src/pages/AdminDashboard.tsx:640-720`
- Modify: `src/types/database.ts` (or Supabase keyword types)

**Step 1: Write UI component tests or verification**

Verify `AdminDashboard.tsx` compiles with new tier filters:
1. Top 3 (Positions 1-3)
2. Striking Distance (Page 1: Pos 4-10)
3. Striking Distance (Page 2: Pos 11-20)
4. Opportunity Pool (Pos 21-50)
5. RankMath Content Scorer modal for any selected keyword.

**Step 2: Implement UI in `src/pages/AdminDashboard.tsx`**

- Add tier summary pills (with colored badges for Top 3, Striking Distance Pos 4-10, Pos 11-20).
- Add filter toggle (`All`, `Striking Distance`, `Top 3`, `Needs Review`).
- Add "Analyze On-Page Score" button per query which checks target URL metadata against the query.
- Add CSV Drag & Drop zone directly into the Keywords tab so any GSC `Queries.csv` export can be dragged straight into the browser to parse and sync without terminal commands.

**Step 3: Verify build**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; pnpm build`
Expected: Build succeeds with 0 errors.

**Step 4: Commit**

```bash
git add src/pages/AdminDashboard.tsx
git commit -m "feat(dashboard): add RankMath-style striking distance command center and CSV dropzone"
```

---

### Task 4: Complete Verification & End-to-End Test

**Step 1: Run all tests**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run`
Expected: All tests pass.

**Step 2: Run production build**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; pnpm build`
Expected: Clean build.
