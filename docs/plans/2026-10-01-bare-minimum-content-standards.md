# Custom Engineering, Local LLMs & Programmatic Knowledge Platform Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Build a high-converting, GSC keyword-targeted Programmatic Knowledge & Custom Engineering Platform on sarabjeetrattan.com featuring 3 Core Pillars, 7 Deep Cluster Guides (including Custom WP Admin Dashboards, Local LLM workflows with LM Studio, AI WordPress Plugins, and Automated Search Intelligence), high-fidelity SVG/Canvas infographics on every page, interactive utility tools, and attributed inbound lead capture into Supabase.

**Architecture:** Build static-first React pages with `vite-react-ssg`, Tailwind CSS v3.4, and interactive tool widgets (calculators, schema checkers, local LLM hardware estimators, and bespoke dashboard mockups). Route pillars at root (`/custom-ai-solutions`, `/ai-wordpress-development`, `/custom-business-automation`) and deep technical silos under `/insights/*`. Inbound client inquiries are attributed to search queries/UTMs and stored in Supabase `service_leads`.

**Tech Stack:** React 18, Vite, `vite-react-ssg`, Tailwind CSS v3.4, `@supabase/supabase-js`, `lucide-react`, `motion/react`, `sonner`, `recharts` / SVG infographics.

---

## Keyword-Targeted Content Silos & Infographic Matrix

| Pillar & URL | Cluster Insights Guide & Slug | Primary Target Keywords | Search Intent & Infographic Type |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Custom AI Systems**<br>`/custom-ai-solutions` | **1.1 Local LLMs with LM Studio**<br>`/insights/local-llm-lm-studio-workflow` | `local llm coding`, `lm studio local ai setup`, `run local models for development`, `lm studio api integration` | **Infographic:** Local Host API vs Cloud Architecture schematic, Quantization & VRAM Allocation Flowchart. |
| | **1.2 Multi-Agent Systems From Scratch**<br>`/insights/multi-agent-orchestration-from-scratch` | `custom ai agent development`, `build multi agent system from scratch`, `langgraph crewai architecture` | **Infographic:** Multi-Agent State Machine & Human-in-the-Loop decision tree. |
| | **1.3 Custom Scraping & Session Engines**<br>`/insights/custom-session-storage-engines` | `b2b lead scraping engine`, `custom session cache api`, `automated prospect research` | **Infographic:** High-Velocity Caching, Rate-Limit Bypassing & Deduplication Pipeline. |
| **Pillar 2: AI WordPress Engineering**<br>`/ai-wordpress-development` | **2.1 Custom AI WordPress Plugins**<br>`/insights/ai-wordpress-plugin-development` | `custom ai wordpress plugin development`, `build wordpress ai plugin from scratch`, `wordpress openai api integration` | **Infographic:** Custom Plugin Architecture (Admin Hooks, Background Cron, Nonce Auth & LLM Relays). |
| | **2.2 Custom WP Admin Performance Dashboard**<br>`/insights/custom-wordpress-admin-dashboard` | `custom wordpress admin dashboard`, `wordpress executive dashboard widget`, `custom wp admin analytics overview` | **Infographic:** Interactive Live WP Admin Executive Mockup vs. Bloated Plugin Comparison Infographic. |
| | **2.3 Automated Search Console & Analytics Alerts**<br>`/insights/automated-search-analytics-reporting` | `automated search console reporting`, `automated google analytics email alerts`, `gsc striking distance automation` | **Infographic:** GSC + GA4 Opportunity Flywheel & Automated Email Digest Pipeline. |
| | **2.4 Headless WordPress + Vite/React**<br>`/insights/headless-wordpress-vite-architecture` | `headless wordpress react`, `vite headless wordpress setup`, `sub 500ms wordpress speed` | **Infographic:** Decoupled Architecture, Edge Caching & Sub-500ms TTFB Benchmark. |
| **Pillar 3: Custom Business Automation**<br>`/custom-business-automation` | **3.1 Custom CRM Sync Engines**<br>`/insights/custom-crm-sync-engines` | `custom crm synchronization`, `freshsales hubspot api sync`, `two way crm integration without zapier` | **Infographic:** Two-Way State Sync, Webhook Replay & Conflict Resolution Flow. |
| | **3.2 Google Apps Script & Sheets ERP**<br>`/insights/google-sheets-apps-script-enterprise` | `google apps script development`, `google sheets automated workflows`, `automated quote generation sheets` | **Infographic:** Spreadsheets-as-an-Engine: Invoicing, PDF Generation & Multi-Tier Approval Flow. |

---

### Task 1: Scaffolding `/ai-wordpress-development` Pillar & WordPress Cluster Guides

**Files:**
- Create: `src/pages/AiWordPressDevelopment.tsx`
- Create: `src/pages/insights/AiWordPressPlugins.tsx`
- Create: `src/pages/insights/CustomWpAdminDashboard.tsx`
- Create: `src/pages/insights/AutomatedSearchAnalytics.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/SEO.tsx`

**Step 1: Build `/ai-wordpress-development` Pillar Page**
- **Hero & Capabilities**: Custom plugin development, custom admin dashboards, headless engineering, and autonomous maintenance.
- **Interactive Tool**: **WordPress Custom Plugin & Dashboard Scope Estimator**.
- **Visual Infographic**: Custom Architecture vs. Bloated Plugin Stacks.

**Step 2: Build Cluster Guide `/insights/custom-wordpress-admin-dashboard`**
- In-depth engineering blueprint: Replacing heavy third-party dashboard plugins with a custom, ultra-lightweight executive dashboard widget in WordPress Admin using `wp_add_dashboard_widget`, REST API endpoints, transient caching, and direct GSC/GA4 metric cards.
- **Visual Infographic**: Interactive mockup of the custom executive WP admin dashboard with performance gauges and opportunity tables.

**Step 3: Build Cluster Guide `/insights/ai-wordpress-plugin-development`**
- Blueprint for custom PHP plugins with OpenAI/Gemini connectors, secure nonce authentication, and background workers.
- **Visual Infographic**: Plugin Lifecycle & API Request Flow.

**Step 4: Build Cluster Guide `/insights/automated-search-analytics-reporting`**
- Automating Search Console, GA4, and Google Ads ingestion with striking-distance detection (Pos 5-20) and scheduled email digests.
- **Visual Infographic**: Search Flywheel Ingestion Pipeline.

**Step 5: Run build verification**
```bash
export PATH=/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH
pnpm build
```

---

### Task 2: Scaffolding `/custom-ai-solutions` Pillar & Local LLM Guides

**Files:**
- Create: `src/pages/CustomAiSolutions.tsx`
- Create: `src/pages/insights/LocalLlmStudio.tsx`
- Create: `src/pages/insights/MultiAgentSystems.tsx`
- Modify: `src/App.tsx`

**Step 1: Build `/custom-ai-solutions` Pillar Page**
- Hero targeting custom AI systems, local LLMs, and multi-agent systems built from scratch.
- **Interactive Tool**: **AI Agent & Local LLM Hardware Estimator**.

**Step 2: Build Cluster Guide `/insights/local-llm-lm-studio-workflow`**
- Step-by-step setup: Downloading quantized models (Qwen 2.5 Coder, DeepSeek-R1, Llama 3.3) via LM Studio, configuring local API servers (`http://localhost:1234/v1`), and connecting local agents for 100% private, zero-cloud-cost development.
- **Visual Infographic**: Local LLM Token Pipeline & VRAM Allocation Diagram.

**Step 3: Build Cluster Guide `/insights/multi-agent-orchestration-from-scratch`**
- Architectural teardown: Multi-agent coordination patterns and human-in-the-loop validation.
- **Visual Infographic**: Multi-Agent State Machine & Routing Diagram.

**Step 4: Run build verification**
```bash
export PATH=/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH
pnpm build
```

---

### Task 3: Scaffolding `/custom-business-automation` Pillar & Teardowns

**Files:**
- Create: `src/pages/CustomBusinessAutomation.tsx`
- Create: `src/pages/insights/CustomCrmSync.tsx`
- Create: `src/pages/insights/SheetsAppsScript.tsx`
- Modify: `src/App.tsx`

**Step 1: Build `/custom-business-automation` Pillar Page**
- Hero targeting custom CRM engines, Apps Script ERP systems, and webhook infrastructure.
- **Interactive Tool**: **Operational Bottleneck & Hours-Saved Calculator**.

**Step 2: Build Cluster Guides `/insights/custom-crm-sync-engines` & `/insights/google-sheets-apps-script-enterprise`**
- Engineering blueprints with visual infographics for two-way CRM sync and automated spreadsheet invoicing engines.

**Step 3: Run build verification**
```bash
export PATH=/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH
pnpm build
```

---

### Task 4: Inbound Lead Capture Component (`ServiceLeadModal`)

**Files:**
- Create: `src/components/ServiceLeadModal.tsx`
- Create: `src/components/ServiceLeadCard.tsx`
- Modify: `api/enquiry.ts`

**Step 1: Build the attributed lead modal**
- Captures: Name, Work Email, WhatsApp/Phone, Target Service (auto-filled), Project Scope/Bottleneck, Budget/Timeline.
- Automatically captures current URL path, referring search query, and UTM parameters.
- Inserts directly into Supabase `service_leads` table and triggers email notification via `/api/enquiry`.

---

### Task 5: Updating Homepage, Navigation & Footer

**Files:**
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/data/content.ts`

**Step 1: Re-align Homepage & Navigation**
- Add "Solutions & Insights" dropdown in Header linking to the 3 Pillars and top Insights.
- Add dedicated Solution Columns and Insight Silo links in Footer.
- Update Homepage Snapshot cards to feature Custom AI, AI WordPress Plugins, and Business Automation with direct gateway buttons.

---

### Task 6: Comprehensive SSG & SEO Schema Verification

**Files:**
- Modify: `scripts/postbuild.js`
- Test: Full SSG production build

**Step 1: Run end-to-end verification**
```bash
export PATH=/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:$PATH
pnpm build
```
Expected: All 12+ pages compile into static HTML with valid JSON-LD schemas (`Service`, `TechArticle`, `FAQPage`, `BreadcrumbList`) and updated `sitemap.xml`.
