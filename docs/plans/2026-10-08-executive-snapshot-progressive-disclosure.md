# Executive Snapshot Career Progressive Disclosure Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Transform the Executive Snapshot section from static cards into an authentic 16+ year career progressive disclosure system, precisely aligned with Sarabjeet Rattan's career span, BITS Pilani Agentic AI foundation, real-world connected data engines, decoupled plugin architectures, and 12-country global industrial operations.

**Architecture:** Update `snapshotCards` in `src/data/content.ts` with structured career data across the 4 pillars and redesign `src/components/Snapshot.tsx` with smooth `motion/react` layout and `AnimatePresence` animations.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, motion/react (Framer Motion), Lucide React.

---

### Task 1: Update Data Structure & Career Content in `src/data/content.ts`

**Files:**
- Modify: `src/data/content.ts:50-80`

**Step 1: Define `SnapshotCard` Interface & populate authentic career data**
```typescript
export interface SnapshotCard {
  title: string;
  focus: string;
  description: string;
  icon: string;
  extendedSummary: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  ctaText: string;
  ctaHref: string;
  ctaType?: "link" | "enquiry";
}
```

Populate the 4 refined career pillars:

1. **B2B Agentic Systems** (`Auto-ReAct / LLM Ops`)
   - **Collapsed**: "Building autonomous agents for automating insight-based content production, real-time market and traffic analysis, and actionable strategic recommendations."
   - **Extended Summary**: Grounded in BITS Pilani Product Management in Generative & Agentic AI. Architecting deterministic multi-agent swarms with human-in-the-loop oversight to convert raw market signals into strategic intelligence and high-ranking content.
   - **Capabilities**:
     - Multi-agent research-to-publish orchestration with Human-in-the-Loop (HITL) approval gates.
     - Real-time search & traffic trend extraction with automated competitive gap analysis.
     - Deterministic self-correcting tool calling and structured schema validation.
   - **Metrics**:
     - `{ label: "Task Determinism", value: "99.4%" }`
     - `{ label: "Academic Foundation", value: "BITS Pilani AI PM" }`
     - `{ label: "Research Time Saved", value: "70%" }`
   - **Technologies**: `["LangGraph", "CrewAI", "Python", "FastAPI", "Claude 3.7 / GPT-4o", "pgvector", "n8n"]`
   - **CTA**: `Explore Agentic Architecture →` (`#case-studies`)

2. **Technical Leverage** (`Systems & Decoupled Ops`)
   - **Collapsed**: "Engineering high-throughput AI engines, resilient operation queues, and decoupled architectures for legacy systems/websites."
   - **Extended Summary**: Engineering custom solutions as decoupled micro-services and lightweight plugins that integrate seamlessly into existing websites, legacy databases, and operations without costly rip-and-replace overhauls.
   - **Capabilities**:
     - Autonomous content engines grounded in real-world connected data and search intelligence.
     - Resilient asynchronous job queues (BullMQ/Redis) with automatic retries and dead-letter recovery.
     - Decoupled headless web architectures and plugins modernizing legacy platforms with sub-second performance.
   - **Metrics**:
     - `{ label: "Data Pipeline Sync", value: "100% Real-Time" }`
     - `{ label: "Edge Performance", value: "Sub-Second" }`
     - `{ label: "Integration Model", value: "Decoupled / Zero Debt" }`
   - **Technologies**: `["Node.js / TypeScript", "Next.js / React", "BullMQ / Redis", "Supabase / PostgreSQL", "REST / Webhooks"]`
   - **CTA**: `View Technical Case Studies →` (`#case-studies`)

3. **Global Industrial Operations** (`12 Countries / Sales`)
   - **Collapsed**: "Directing cross-border B2B expansion across 12 countries in 4 continents, optimizing industrial workflows & unit economics."
   - **Extended Summary**: Grounded in scaling OG Hemp across 12 international markets and Skaizen Technotrades industrial water & process automation, driving end-to-end supply chain margins and international compliance.
   - **Capabilities**:
     - Cross-border GTM execution and regulatory compliance across North America, Europe, Asia, and Australasia.
     - Industrial workflow & resource optimization (achieved 30-40% cost and water consumption reductions).
     - High-stakes B2B partnership negotiations and white-labelled sustainable product development.
   - **Metrics**:
     - `{ label: "Global Reach", value: "12 Countries Supplied" }`
     - `{ label: "B2B Clients", value: "250+ Engagements" }`
     - `{ label: "Client Loyalty", value: "60% Repeat Rate" }`
   - **Technologies**: `["Global GTM", "Industrial Automation", "Supply Chain Optimization", "B2B Compliance", "Unit Economics"]`
   - **CTA**: `View Full Career Resume →` (`/resume`)

4. **Strategic AI Advisory** (`Leadership & Roadmap`)
   - **Collapsed**: "Advising forward-thinking founders and enterprises on AI readiness, executive roadmaps, and transforming legacy workflows into high-margin agentic operations."
   - **Extended Summary**: 16+ years bridging commercial business acumen (MIB London, B.E. Engineering, Symbiosis Design Thinking) with bleeding-edge AI transformation and executive leadership.
   - **Capabilities**:
     - Enterprise AI Readiness Audits and bespoke multi-year agentic transformation roadmaps.
     - Monolith-to-Agentic Deconstruction: converting manual operational handoffs into autonomous micro-agents.
     - Strict Data Governance, GDPR/compliance safeguards, and privacy-first model deployments.
   - **Metrics**:
     - `{ label: "Career Span", value: "16+ Yrs" }`
     - `{ label: "Rapid MVP", value: "2–4 Wks" }`
     - `{ label: "Bottleneck Decimation", value: "40%" }`
   - **Technologies**: `["Fractional AI Leadership", "Architecture Design", "GDPR & Governance", "Design Thinking", "PRD & Roadmapping"]`
   - **CTA**: `Book Strategic Consultation →` (`#services`)

**Step 2: Run type check**
Run: `pnpm build`
Expected: Type check passes.

**Step 3: Commit**
```bash
git add src/data/content.ts
git commit -m "feat(content): update executive snapshot cards with exact user career specs"
```

---

### Task 2: Implement Progressive Disclosure & Interactive Animation in `src/components/Snapshot.tsx`

**Files:**
- Modify: `src/components/Snapshot.tsx`

**Step 1: Enhance `Snapshot.tsx` with Collapsed/Expanded layout rendering**
- In **Collapsed State**: Render clean headline, focus badge, punchy summary, and a subtle "+ View Career Evidence & Metrics" affordance.
- In **Expanded State**: Smoothly animate the card to full-width (`col-span-1 md:col-span-2 lg:col-span-3`) and render:
  - Left panel: Extended career context, focus tag, and prominent action CTA.
  - Right panel:
    - **Core Capabilities** with bullet icons.
    - **3 High-Contrast Proof Metrics** in double-bezel metric cards.
    - **Core Technologies & Protocols** pill badges.
  - Collapse button / toggle for seamless UX.

**Step 2: Verify build and accessibility**
Run: `pnpm build`
Expected: Clean build with zero TypeScript or lint errors.

**Step 3: Commit**
```bash
git add src/components/Snapshot.tsx
git commit -m "feat(ui): implement progressive disclosure for executive snapshot"
```

---

### Task 3: Interactive & Responsive Verification

**Files:**
- Test: Build and visual inspection

**Step 1: Run production build verification**
Run: `pnpm build`
Expected: Build passes with all chunks intact and under budget.

**Step 2: Manual interactive flow check**
Verify expanding and collapsing each of the 4 cards, checking mobile/desktop layout behavior, and validating CTA navigation.
