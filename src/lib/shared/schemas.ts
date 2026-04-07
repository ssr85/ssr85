import { z } from "zod";

/**
 * Shared EnrichedData schema - now local to SSR_Website.
 */
export const EnrichedDataSchema = z.object({
  companyOverview: z.string(),
  industry: z.string(),
  companySize: z.string(),
  productInterest: z.string(),
  pains: z.string(),
  signals: z.string(),
  recommendation: z.string(),
  sources: z.array(z.string()),
});

export type EnrichedData = z.infer<typeof EnrichedDataSchema>;

/**
 * Base Contact schema - now local to SSR_Website.
 */
export const ContactSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  email: z.string().email().or(z.string()),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  mobile: z.string().optional(),
  tags: z.array(z.string()).default([]),
  enriched: z.boolean().default(false),
  enrichedData: EnrichedDataSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Contact = z.infer<typeof ContactSchema>;

/**
 * Common Audit Status - now local to SSR_Website.
 */
export const AuditStatusSchema = z.enum(["pending", "running", "completed", "failed"]);
export type AuditStatus = z.infer<typeof AuditStatusSchema>;
