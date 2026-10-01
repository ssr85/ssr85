# Commercial Service Pages & Problem-Solution-CTA Architecture Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Remove the public custom admin dashboard insight page and transform all topic/insight pages into high-converting commercial service pages structured around: (1) The Problem / Business Bottleneck, (2) The Engineered Solution & Architecture, (3) How We Help / Engagement Deliverables, and (4) High-Converting CTA & Attributed Lead Capture.

**Architecture:** Transform informational guides into authoritative commercial service landing pages. Each page features structured sections (Problem, Solution Architecture, Engagement Roadmap, FAQ, and CTA) styled with Tailwind CSS, Lucide icons, and pre-rendered with `vite-react-ssg`.

**Tech Stack:** React 18, Vite, `vite-react-ssg`, Tailwind CSS v3.4, `@supabase/supabase-js`, `lucide-react`, `motion/react`, `sonner`.

---

### Task 1: Delete Public `/insights/custom-wordpress-admin-dashboard` & Clean References

**Files:**
- Delete: `src/pages/insights/CustomWpAdminDashboard.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/pages/AiWordPressDevelopment.tsx`

**Step 1: Remove Route & References**
- Remove route `/insights/custom-wordpress-admin-dashboard` from `src/App.tsx`.
- Update `src/components/Footer.tsx` and `src/pages/AiWordPressDevelopment.tsx` to remove links to the removed route.

---

### Task 2: Refactor `/insights/local-llm-lm-studio-workflow` to Commercial Service Architecture

**Files:**
- Modify: `src/pages/insights/LocalLlmStudio.tsx`

**Structure:**
1. **Hero**: "Private Local LLM Engineering & Workstation Agent Setup"
2. **The Problem**: Runaway cloud API token costs ($10k+/mo), data confidentiality risks with proprietary codebases, rate limits, and network latency.
3. **The Solution**: On-premise / workstation local inference via LM Studio & quantized open-weight models (Qwen 2.5 Coder, DeepSeek-R1) with sub-15ms local latency and 100% data residency.
4. **How We Help**: Hardware specification & VRAM sizing, automated model orchestration, IDE/Agent integration (Cline, Cursor, custom Python agent loops), and performance benchmarking.
5. **Interactive Tool & CTA**: VRAM Estimator & "Book Local AI Architecture Consultation" modal trigger.

---

### Task 3: Refactor `/insights/ai-wordpress-plugin-development` to Commercial Service Architecture

**Files:**
- Modify: `src/pages/insights/AiWordPressPlugins.tsx`

**Structure:**
1. **Hero**: "Bespoke AI WordPress Plugin Development from Scratch"
2. **The Problem**: Fragile marketplace plugins bloat databases, expose API keys, cause vendor lock-in, and cannot connect to custom business databases.
3. **The Solution**: Dedicated PHP/React plugin architecture with server-side nonce verification, LLM rate-limiting, custom post type generators, and zero third-party licensing fees.
4. **How We Help**: Scope definition, custom REST endpoint development, background queue workers, and automated schema injection.
5. **Interactive Tool & CTA**: Plugin Scope Configurator & "Request Custom Plugin Build" modal trigger.

---

### Task 4: Refactor `/insights/automated-search-analytics-reporting` to Commercial Service Architecture

**Files:**
- Modify: `src/pages/insights/AutomatedSearchAnalytics.tsx`

**Structure:**
1. **Hero**: "Automated Search Intelligence & Executive Growth Reporting"
2. **The Problem**: Marketing teams waste 10+ hours/week manually pulling GSC and GA4 reports, missing high-value striking-distance opportunities (positions 5–20).
3. **The Solution**: Autonomous data ingestion pipeline that syncs search performance daily, isolates revenue opportunities, and delivers proactive executive email alerts.
4. **How We Help**: Cloud Service Account integration, custom scoring algorithms, automated weekly digest scheduling, and Supabase growth tracking.
5. **Interactive Tool & CTA**: Striking Distance ROI Preview & "Deploy Search Intelligence Pipeline" CTA.

---

### Task 5: Refactor `/insights/custom-crm-sync-engines` to Commercial Service Architecture

**Files:**
- Modify: `src/pages/insights/CustomCrmSync.tsx`

**Structure:**
1. **Hero**: "Custom Two-Way CRM Synchronization & Webhook Relays"
2. **The Problem**: No-code tools (Zapier, Make) fail silently on payload timeouts, create duplicate CRM contacts, and charge exorbitant task-based monthly fees.
3. **The Solution**: Resilient stateful sync engines connecting Freshsales, HubSpot, Pipedrive, and custom databases with atomic transaction guarantees and automated conflict resolution.
4. **How We Help**: API schema mapping, webhook replay queuing, dead-letter logging, and 24/7 self-healing sync monitoring.
5. **Interactive Tool & CTA**: Lead Sync Volume Estimator & "Schedule CRM Integration Assessment" CTA.

---

### Task 6: Refactor `/insights/google-sheets-apps-script-enterprise` to Commercial Service Architecture

**Files:**
- Modify: `src/pages/insights/SheetsAppsScript.tsx`

**Structure:**
1. **Hero**: "Enterprise Google Apps Script & Spreadsheets-as-an-ERP Systems"
2. **The Problem**: Manual spreadsheet copying causes errors in pricing calculations, slow quotation turnaround, and untracked manager approvals.
3. **The Solution**: Custom Apps Script automation turning standard Google Sheets into an automated quotation, PDF invoice, and email approval machine.
4. **How We Help**: Template automation, Drive archiving, Gmail 1-click approvals, and ERP database synchronization.
5. **Interactive Tool & CTA**: Team Manual Hours Calculator & "Request Spreadsheet Automation Scope" CTA.

---

### Task 7: Refactor `/insights/headless-wordpress-vite-architecture` & `/insights/custom-session-storage-engines`

**Files:**
- Modify: `src/pages/insights/HeadlessWordPressVite.tsx`
- Modify: `src/pages/insights/CustomSessionEngines.tsx`

**Structure:**
- Apply the Problem $\rightarrow$ Solution $\rightarrow$ How We Help $\rightarrow$ CTA framework with performance benchmarks and lead capture.

---

### Task 8: Production Build Verification & Static Pre-rendering

**Command:**
```bash
export PATH=/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH
pnpm build
```
Expected: All pages compile cleanly to static HTML with zero dead links.
