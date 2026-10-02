# Zero-Friction Visitor Capture & Organic Search Growth Engine Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Build a frictionless, tool-driven organic acquisition and visitor engagement engine—featuring an interactive, un-gated **Self-Serve Architecture & Scope Estimator**, smart intent-aware subtle recommendation chips, and 1-click pre-filled Calendly/direct channel dispatching—driving top-of-funnel search traffic while converting technical decision makers without intrusive email gates.

**Architecture:** An interactive client-side interactive tool layer built with React & Lucide components in `src/components/tools/`. The **Interactive Scope & Architecture Estimator** allows visitors to configure their tech stack, automation bottlenecks, and scaling requirements to receive an instant on-screen architectural blueprint, cost/timeline calculation, and a dynamic 1-click Calendly link with their custom payload pre-populated in the URL parameters.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion / Motion, Next-Themes, Supabase telemetry.

---

### Task 1: Build the Interactive Scope & Architecture Estimator Component

**Files:**
- Create: `src/components/tools/ArchitectureEstimator.tsx`
- Create: `src/components/tools/__tests__/ArchitectureEstimator.test.ts`
- Create: `src/lib/calculator/estimator-engine.ts`

**Step 1: Write the failing test**

```typescript
// src/components/tools/__tests__/ArchitectureEstimator.test.ts
import { describe, it, expect } from 'vitest';
import { calculateProjectEstimate } from '../../../lib/calculator/estimator-engine';

describe('Project Estimator Engine', () => {
  it('computes realistic delivery timeline and recommended architectural stack', () => {
    const estimate = calculateProjectEstimate({
      projectType: 'N8N_AUTOMATION',
      complexity: 'ENTERPRISE_MULTI_SYSTEM',
      integrations: ['hubspot', 'postgresql', 'openai'],
      hasCustomAuth: true,
    });

    expect(estimate.estimatedWeeks).toBeGreaterThanOrEqual(2);
    expect(estimate.recommendedStack).toContain('Self-Hosted n8n (Docker)');
    expect(estimate.architectureSummary).toBeDefined();
    expect(estimate.calendlyPayload).toContain('N8N_AUTOMATION');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/components/tools/__tests__/ArchitectureEstimator.test.ts`
Expected: FAIL with "Cannot find module"

**Step 3: Implement calculation logic in `src/lib/calculator/estimator-engine.ts`**

```typescript
// src/lib/calculator/estimator-engine.ts
export type ProjectType = 'N8N_AUTOMATION' | 'AI_WORDPRESS' | 'CUSTOM_AI_AGENT' | 'CRM_SYNC_ENGINE' | 'APPS_SCRIPT_ERP';
export type ComplexityLevel = 'STARTER' | 'GROWTH' | 'ENTERPRISE_MULTI_SYSTEM';

export interface EstimatorInput {
  projectType: ProjectType;
  complexity: ComplexityLevel;
  integrations: string[];
  hasCustomAuth?: boolean;
}

export interface EstimatorResult {
  estimatedWeeks: number;
  recommendedStack: string[];
  architectureSummary: string;
  keyDeliverables: string[];
  calendlyPayload: string;
}

export function calculateProjectEstimate(input: EstimatorInput): EstimatorResult {
  let baseWeeks = 1;
  const recommendedStack: string[] = [];
  const deliverables: string[] = [];

  switch (input.projectType) {
    case 'N8N_AUTOMATION':
      recommendedStack.push('Self-Hosted n8n (Docker)', 'PostgreSQL / Redis Queue', 'Webhook Error Handler');
      deliverables.push('Docker Compose deployment with healthchecks', 'Automated retry & dead-letter queue routing', 'Production secret management');
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 3 : input.complexity === 'GROWTH' ? 2 : 1;
      break;
    case 'AI_WORDPRESS':
      recommendedStack.push('Custom PHP Plugin', 'OpenAI / Gemini REST Endpoints', 'Transient Cache Layer');
      deliverables.push('Zero-bloat custom plugin wrapper', 'Encrypted API key vaulting', 'Asynchronous streaming response handler');
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 4 : input.complexity === 'GROWTH' ? 2 : 1.5;
      break;
    case 'CUSTOM_AI_AGENT':
      recommendedStack.push('LangGraph / CrewAI', 'Supabase pgvector', 'Human-in-the-Loop Review UI');
      deliverables.push('Deterministic state machine', 'Semantic RAG retrieval pipeline', 'Interactive approval checkpoint');
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 4 : 2.5;
      break;
    case 'CRM_SYNC_ENGINE':
      recommendedStack.push('Node.js / Express Webhook Engine', 'Idempotency Key Store', 'Two-Way Diff Engine');
      deliverables.push('Infinite-loop prevention algorithm', 'Historical backfill script', 'Automated alerting webhook');
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 3.5 : 2;
      break;
    case 'APPS_SCRIPT_ERP':
      recommendedStack.push('Google Apps Script', 'Google Docs Template Engine', 'Drive API Webhooks');
      deliverables.push('1-Click branded PDF invoice generation', 'Interactive email approval buttons', 'PostgreSQL two-way sync');
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 2.5 : 1.5;
      break;
  }

  const integrationCount = input.integrations.length;
  if (integrationCount > 3) baseWeeks += 1;
  if (input.hasCustomAuth) baseWeeks += 0.5;

  const calendlyPayload = encodeURIComponent(
    `Scope: ${input.projectType} (${input.complexity}) | Stack: ${recommendedStack.join(', ')} | Integrations: ${input.integrations.join(', ')}`
  );

  return {
    estimatedWeeks: Math.max(1, Math.round(baseWeeks * 10) / 10),
    recommendedStack,
    architectureSummary: `Engineered for high throughput, sub-second latency, and zero ongoing vendor lock-in.`,
    keyDeliverables: deliverables,
    calendlyPayload,
  };
}
```

**Step 4: Run test to verify it passes**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx vitest run src/components/tools/__tests__/ArchitectureEstimator.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/calculator/ src/components/tools/__tests__/
git commit -m "feat(tools): implement architecture and scope estimation engine"
```

---

### Task 2: Implement the Interactive Estimator UI & Dedicated Organic Tool Route

**Files:**
- Create: `src/pages/ScopeEstimator.tsx`
- Create: `src/components/tools/ArchitectureEstimator.tsx`
- Modify: `src/App.tsx:75-80`
- Modify: `public/sitemap.xml`

**Step 1: Write UI component `src/components/tools/ArchitectureEstimator.tsx`**

- 3-step interactive selector:
  1. Select Problem / Architecture (n8n, Custom AI, WordPress Plugin, CRM Sync, Sheets ERP).
  2. Select Complexity & Target Integrations (PostgreSQL, HubSpot, OpenAI, Gemini, Freshsales, etc.).
  3. Instant Output: Architecture blueprint, delivery timeline estimate, system topology cards.
- Frictionless Actions:
  - Button 1: *"Open 20-Min Discovery on Calendly (Scope Pre-Attached)"* (no typing needed!).
  - Button 2: *"Copy Complete Scope Summary"* (copies structured Markdown to clipboard).
  - Button 3: *"Send Direct LinkedIn Message"* (linking with pre-filled context).

**Step 2: Create dedicated organic landing page `src/pages/ScopeEstimator.tsx`**

- Route: `/tools/architecture-scope-estimator` (Targets high-volume organic search queries: *ai automation cost estimator, n8n consulting project cost, custom wordpress plugin scope builder*).
- SEO Title: `Free System Architecture & Scope Estimator | Sarabjeet Rattan`
- Description: `Configure your automation, AI agent, or custom plugin requirements to receive an instant architectural blueprint, estimated delivery timeline, and recommended tech stack.`

**Step 3: Register route in `src/App.tsx` and add to `public/sitemap.xml`**

**Step 4: Verify build**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; pnpm build`
Expected: 18 SSG pages rendered cleanly.

**Step 5: Commit**

```bash
git add src/pages/ScopeEstimator.tsx src/components/tools/ src/App.tsx public/sitemap.xml
git commit -m "feat(tools): add dedicated Architecture Scope Estimator interactive tool"
```

---

### Task 3: Build Non-Intrusive Contextual Interest Anchors (Intent-Aware Recommendation Bar)

**Files:**
- Create: `src/components/ContextualIntentDock.tsx`
- Modify: `src/App.tsx` (Mount dock subtly on desktop/mobile scroll)

**Step 1: Implement Intent-Aware Floating Utility Dock**

- Monitors user's scroll depth and current article pillar without blocking reading flow.
- Features:
  - Non-modal, sleek floating pill at bottom-right of viewport.
  - Displays dynamic quick actions based on the current page:
    - On `/n8n-workflows`: `⚡ View 10 n8n Startup Blueprints` or `🛠️ Estimate n8n Setup Scope`.
    - On `/insights/ai-wordpress-plugin-development`: `📦 Custom AI Plugin Architecture Blueprint`.
    - On `/insights/custom-crm-sync-engines`: `🔄 Check Two-Way Sync Safety Checklist`.
  - Zero forced popups. Expanding opens the lightweight interactive estimator directly in a slide-over drawer without leaving the page!

**Step 2: Verify responsive rendering across mobile and desktop**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; pnpm build`
Expected: Build passes with 0 errors.

**Step 3: Commit**

```bash
git add src/components/ContextualIntentDock.tsx src/App.tsx
git commit -m "feat(ux): add non-intrusive contextual intent dock for zero-friction visitor capture"
```

---

### Task 4: End-to-End Verification & Search Ping

**Step 1: Run complete build**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; pnpm build`
Expected: All pages compile cleanly.

**Step 2: Force-index new tool route across search engines**

Run: `export PATH="/opt/homebrew/bin:/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH"; npx tsx scripts/seo-engine/force-index.ts`
Expected: Submits new tool URL to Google Search Console ping and IndexNow network.
