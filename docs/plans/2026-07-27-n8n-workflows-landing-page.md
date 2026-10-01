# n8n Workflows Landing Page — Implementation Plan

> **Next Session Reminder:** Build a service landing page offering "Top 10 n8n Workflows Every Startup Should Automate" — inspired by Varun Kamani's LinkedIn article (BOSC Tech Labs).

## Objective

Create a dedicated landing page offering n8n workflow automation services. Position SSR as an automation consultant who builds custom n8n workflows for startups. The page should mirror the structure of the BOSC article but framed as SSR's service offering.

## Route & Page

- **Path:** `/n8n-workflows` or `/automation/n8n-workflows`
- **Component:** `src/pages/N8nWorkflows.tsx`
- **Route:** Add to `App.tsx` routes array

## Page Sections

### 1. Hero Section
- Headline: "Top 10 n8n Workflows Every Startup Should Automate"
- Subhead: Position SSR as an n8n automation expert
- CTA: "Book a Free Consultation" / "Let's Automate"
- Visual: n8n-style node diagram or workflow illustration (use lucide-react nodes + connections)

### 2. What is n8n? (Quick Overview)
- Open-source, node-based workflow automation
- 200+ integrations, low-code, self-hostable
- Key differentiator vs Zapier/Make: conditions, loops, JS functions

### 3. The 10 Workflows (Grid/Card Layout)
Each workflow card should have:
- Number & title
- Objective (one-liner)
- Trigger → Action → Condition → Outcome flow
- "I can build this for you" CTA

```
1. Lead Capture + AI Agent Follow-Up
2. Automated Email Drip for Onboarding
3. Social Media Content Publishing
4. Support Ticket Routing & Triage
5. Invoicing, Payments & Accounting Integration
6. Internal Task Assignment from Events
7. User Feedback & Sentiment Tracking
8. Product Analytics & CRM Sync
9. Slack Alerts for Business KPIs
10. AI-Powered Knowledge Bot for Customer Queries
```

### 4. Why SSR? (Differentiation)
- Custom n8n workflow development
- AI agent integration (OpenAI, voice agents)
- End-to-end automation strategy
- Stripe, HubSpot, Notion, Supabase integrations
- Full-stack dev capability (React + n8n + AI)

### 5. Contact / CTA Section
- Book a consultation form or enquiry modal trigger
- "Stop wasting time on repetitive tasks. Start building a startup that scales without burning out your team."

## Content Source

The full article content (provided by user, from Varun Kamani / BOSC Tech Labs LinkedIn post) includes detailed descriptions for all 10 workflows. Adapt this content as SSR's service offering — rewrite in first-person as SSR services.

## Tech Stack Notes

- Same stack: React 18, TypeScript, Tailwind CSS v3, Framer Motion
- Statically import in router (no lazy for main content)
- Reuse `EnquiryModal` for the contact CTA
- SEO metadata via `<SEO>` component
- Follow existing shadcn component patterns and pathing

## Suggested Component Architecture

```
src/pages/N8nWorkflows.tsx         # Page component (static import in App.tsx)
src/components/n8n/               # or inline sections
  ├── N8nHero.tsx
  ├── N8nOverview.tsx
  ├── N8nWorkflowCard.tsx         # Reusable card for each workflow
  ├── N8nWorkflowsGrid.tsx        # Grid of 10 cards
  ├── N8nWhySSR.tsx
  └── N8nCTA.tsx
```

## Build & Verify

```bash
pnpm build   # Must succeed without errors
```

---

**Reminder for next session:** Start by scaffolding `src/pages/N8nWorkflows.tsx`, add the route to `App.tsx`, then build each section component.
