import { describe, it, expect } from 'vitest';
import { calculateProjectEstimate } from '../estimator-engine';

describe('Project Estimator Engine', () => {
  it('computes realistic delivery timeline and recommended architectural stack for n8n', () => {
    const estimate = calculateProjectEstimate({
      projectType: 'N8N_AUTOMATION',
      complexity: 'ENTERPRISE_MULTI_SYSTEM',
      integrations: ['hubspot', 'postgresql', 'openai', 'slack'],
      hasCustomAuth: true,
    });

    expect(estimate.estimatedWeeks).toBeGreaterThanOrEqual(3);
    expect(estimate.recommendedStack).toContain('Self-Hosted n8n (Docker)');
    expect(estimate.architectureSummary).toBeDefined();
    expect(estimate.calendlyPayload).toContain('n8n');
  });

  it('handles lightweight starter scope appropriately', () => {
    const estimate = calculateProjectEstimate({
      projectType: 'APPS_SCRIPT_ERP',
      complexity: 'STARTER',
      integrations: ['google-sheets'],
    });

    expect(estimate.estimatedWeeks).toBe(1);
    expect(estimate.recommendedStack).toContain('Google Apps Script');
  });
});
