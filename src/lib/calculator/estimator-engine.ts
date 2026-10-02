export type ProjectType =
  | 'N8N_AUTOMATION'
  | 'AI_WORDPRESS'
  | 'CUSTOM_AI_AGENT'
  | 'CRM_SYNC_ENGINE'
  | 'APPS_SCRIPT_ERP';

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
      deliverables.push(
        'Docker Compose deployment with healthchecks',
        'Automated retry & dead-letter queue routing',
        'Production secret management & auth validation'
      );
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 3 : input.complexity === 'GROWTH' ? 2 : 1;
      break;

    case 'AI_WORDPRESS':
      recommendedStack.push('Custom PHP Plugin', 'OpenAI / Gemini REST Endpoints', 'Transient Cache Layer');
      deliverables.push(
        'Zero-bloat custom plugin wrapper',
        'Encrypted API key vaulting & rate limiters',
        'Asynchronous streaming response handler'
      );
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 3.5 : input.complexity === 'GROWTH' ? 2 : 1.5;
      break;

    case 'CUSTOM_AI_AGENT':
      recommendedStack.push('LangGraph / CrewAI', 'Supabase pgvector', 'Human-in-the-Loop Review UI');
      deliverables.push(
        'Deterministic state machine & routing',
        'Semantic RAG retrieval pipeline',
        'Interactive approval checkpoint & fallbacks'
      );
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 4 : input.complexity === 'GROWTH' ? 2.5 : 1.5;
      break;

    case 'CRM_SYNC_ENGINE':
      recommendedStack.push('Node.js / Express Webhook Engine', 'Idempotency Key Store', 'Two-Way Diff Engine');
      deliverables.push(
        'Infinite-loop prevention & deduplication',
        'Historical backfill and retry script',
        'Automated alerting webhook'
      );
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 3 : input.complexity === 'GROWTH' ? 2 : 1.5;
      break;

    case 'APPS_SCRIPT_ERP':
      recommendedStack.push('Google Apps Script', 'Google Docs Template Engine', 'Drive API Webhooks');
      deliverables.push(
        '1-Click branded PDF invoice generator',
        'Interactive email approval buttons',
        'PostgreSQL two-way sync bridge'
      );
      baseWeeks = input.complexity === 'ENTERPRISE_MULTI_SYSTEM' ? 2.5 : input.complexity === 'GROWTH' ? 1.5 : 1;
      break;
  }

  const integrationCount = input.integrations.length;
  if (integrationCount > 3) baseWeeks += 1;
  if (input.hasCustomAuth) baseWeeks += 0.5;

  const projectTypeLabels: Record<ProjectType, string> = {
    N8N_AUTOMATION: 'n8n Workflow Automation',
    AI_WORDPRESS: 'Custom AI WordPress Plugin',
    CUSTOM_AI_AGENT: 'Multi-Agent AI System',
    CRM_SYNC_ENGINE: 'Two-Way CRM Sync Engine',
    APPS_SCRIPT_ERP: 'Google Apps Script ERP',
  };

  const calendlyPayload = encodeURIComponent(
    `Scope: ${projectTypeLabels[input.projectType]} (${input.complexity}) | Stack: ${recommendedStack.join(', ')} | Integrations: ${
      input.integrations.join(', ') || 'Core API'
    }`
  );

  return {
    estimatedWeeks: Math.max(1, Math.round(baseWeeks * 10) / 10),
    recommendedStack,
    architectureSummary: `Engineered for high throughput, sub-second latency, and zero ongoing vendor lock-in.`,
    keyDeliverables: deliverables,
    calendlyPayload,
  };
}
