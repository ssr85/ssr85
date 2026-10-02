# Unified Lead Capture & Single-Table ('enquiries') Pipeline Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load `executing-plans` to implement this plan task-by-task.

**Goal:** Route all CTA interactions (general enquiries, service consultation modals, newsletter subscribers, and resume downloads) through a single, secure backend capture engine into the Supabase `enquiries` table with full attribution context (lead type, target service, UTMs, referrer, and source page).

**Architecture:** 
1. **Database Layer:** Enhance the existing `public.enquiries` table with attribution columns (`target_service`, `lead_type`, `lead_status`, `source_url`, `utm_source`, `utm_medium`, `utm_campaign`, `referring_query`) with admin-manageable RLS policies.
2. **Backend Engine (`/api/enquiry`):** Centralize all lead intake into the Vercel serverless function using the Supabase Service Role Key (bypassing client RLS safely). The engine simultaneously sends Gmail alerts via Nodemailer, pushes to Google Sheets, and writes directly to `enquiries`.
3. **Frontend Modals & Docks:** Update `ServiceLeadModal`, `EnquiryModal`, `ResumeDownloadModal`, `SubtleNewsletterCollector`, and `UnifiedActionDock` to send clean contextual payloads to `/api/enquiry`.
4. **Admin Dashboard:** Update `AdminDashboard.tsx` to read, filter, and manage all leads directly from `enquiries`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Supabase PostgreSQL, Vercel Serverless Functions (`@vercel/node`), Nodemailer, Lucide React.

---

## Proposed Changes

### Component 1: Supabase Database Schema & Types

#### [NEW] `supabase/migrations/20261002000000_unify_leads_to_enquiries.sql`
- Add context & attribution columns to `public.enquiries`:
  - `target_service TEXT` (e.g. `'custom-ai-solutions'`, `'ai-wordpress-dev'`, `'n8n-automation'`, `'engineering-newsletter'`, etc.)
  - `lead_type TEXT NOT NULL DEFAULT 'GENERAL_ENQUIRY'` (`'CONSULTATION'`, `'GENERAL_ENQUIRY'`, `'RESUME_DOWNLOAD'`, `'NEWSLETTER'`)
  - `lead_status TEXT NOT NULL DEFAULT 'NEW'` (`'NEW'`, `'CONTACTED'`, `'QUALIFIED'`, `'CLOSED'`, `'ARCHIVED'`)
  - `source_url TEXT`
  - `referring_query TEXT`
  - `utm_source TEXT`
  - `utm_medium TEXT`
  - `utm_campaign TEXT`
- Create indexes for fast filtering on `lead_type`, `lead_status`, `target_service`, `created_at`.
- Add RLS policy for authenticated admins to perform `ALL` (select, update, delete) operations on `enquiries`.

#### [MODIFY] `src/integrations/supabase/types.ts`
- Update TypeScript schema definition for `enquiries` table with the new columns.

---

### Component 2: Backend Lead Capture Engine

#### [MODIFY] `api/enquiry.ts`
- Extend `EnquiryRequest` interface:
  ```typescript
  interface EnquiryRequest {
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
    requirement?: string;
    targetService?: string;
    leadType?: 'CONSULTATION' | 'GENERAL_ENQUIRY' | 'RESUME_DOWNLOAD' | 'NEWSLETTER';
    leadStatus?: string;
    sourceUrl?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referringQuery?: string;
    recaptchaToken?: string;
  }
  ```
- Make `phone` optional for newsletter signups (defaulting to `'N/A'`).
- Handle reCAPTCHA validation gracefully: verify when a client token is provided, or support internal direct action tokens for zero-friction docks/newsletter.
- Insert all context fields into `enquiries` table via Supabase Service Role client.
- Format the Gmail notification email with structured badges:
  - Lead Type
  - Target Service
  - Source URL & UTM Campaign
  - Company & Requirement
- Pass full contextual metadata to the Google Sheets webhook.

---

### Component 3: Frontend CTAs & Modals

#### [MODIFY] `src/components/ServiceLeadModal.tsx`
- Remove direct client-side call to `supabase.from("service_leads").insert(...)`.
- Execute reCAPTCHA or send direct payload to `/api/enquiry` with:
  - `leadType: "CONSULTATION"`
  - `targetService: defaultService`
  - `sourceUrl: currentPath`
  - `utmSource`, `utmMedium`, `utmCampaign`, `referringQuery`
  - `companyName`, `name`, `email`, `phone`, `requirement`

#### [MODIFY] `src/components/EnquiryModal.tsx`
- Attach `sourceUrl: window.location.pathname`, `leadType: "GENERAL_ENQUIRY"`, and current URL UTM parameters to the `/api/enquiry` payload.

#### [MODIFY] `src/components/ResumeDownloadModal.tsx`
- Attach `leadType: "RESUME_DOWNLOAD"`, `targetService: "executive-resume"`, and `sourceUrl` to the `/api/enquiry` payload.

#### [MODIFY] `src/components/SubtleNewsletterCollector.tsx` & `src/components/UnifiedActionDock.tsx`
- Remove direct client-side call to `supabase.from("service_leads").insert(...)`.
- Send payload to `/api/enquiry` with:
  - `name: "Newsletter Subscriber"`
  - `email: cleanEmail`
  - `phone: "N/A"`
  - `leadType: "NEWSLETTER"`
  - `targetService: "engineering-newsletter"`
  - `sourceUrl: currentPath`

---

### Component 4: Admin Dashboard

#### [MODIFY] `src/pages/AdminDashboard.tsx`
- Update `fetchDashboardData()`:
  - Change `supabase.from("service_leads").select("*")` to `supabase.from("enquiries").select("*").order("created_at", { ascending: false })`.
- Update the Lead interface and Table view:
  - Render `lead_type` badge (`CONSULTATION`, `GENERAL_ENQUIRY`, `RESUME_DOWNLOAD`, `NEWSLETTER`).
  - Render `target_service` pill and `source_url`.
  - Display `requirement` and `company_name`.
  - Add status dropdown/toggle (`NEW` -> `CONTACTED` -> `QUALIFIED`) that updates the row in `enquiries`.

---

## Verification Plan

### Automated Verification
- Run TypeScript type checks and production bundle build:
  ```bash
  pnpm build
  ```
- Run unit tests if any exist:
  ```bash
  npx vitest run
  ```

### Manual Verification
1. **General Contact Form:** Open Homepage -> Click "Let's Connect" -> Submit `EnquiryModal` -> Verify `/api/enquiry` response 200 and Supabase `enquiries` record created with `lead_type = 'GENERAL_ENQUIRY'`.
2. **Service Consultation CTA:** Visit `/n8n-workflows` -> Click "Request Workflow Audit" -> Submit `ServiceLeadModal` -> Verify Supabase record created in `enquiries` with `target_service = 'n8n-automation'` and `lead_type = 'CONSULTATION'`.
3. **Action Dock Newsletter:** Click newsletter icon in `UnifiedActionDock` -> Enter email -> Verify record created in `enquiries` with `lead_type = 'NEWSLETTER'`.
4. **Admin Dashboard:** Navigate to `/admin` -> Verify all types of leads render seamlessly with full context, timestamps, and status badges.
