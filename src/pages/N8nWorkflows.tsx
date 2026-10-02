import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Bot,
  Mail,
  Share2,
  LifeBuoy,
  CreditCard,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Bell,
  HelpCircle,
  Calculator,
  Sliders,
  Terminal,
  Database,
  Lock,
} from "lucide-react";

export const N8nWorkflows = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("n8n-workflow-automation");

  // Interactive ROI Calculator state
  const [teamSize, setTeamSize] = useState(6);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(45);

  const annualHoursSaved = Math.round(teamSize * manualHoursPerWeek * 50 * 0.8); // 80% automated
  const annualDollarSavings = Math.round(annualHoursSaved * hourlyRate);

  const handleOpenModal = (serviceName = "n8n-workflow-automation") => {
    setSelectedService(serviceName);
    setIsLeadModalOpen(true);
  };

  const n8nWorkflowsList = [
    {
      number: "01",
      title: "Lead Ingestion + Autonomous AI Agent Follow-Up",
      icon: Bot,
      category: "Sales & SDR Pipeline",
      objective: "Instantly capture, enrich with Apollo/Tavily, and trigger hyper-personalized outbound draft responses.",
      trigger: "Webhook from Landing Page, Typeform, or LinkedIn Lead Form",
      action: "Enrich via Apollo API → Score Ideal Customer Profile → Generate Custom Copy with OpenAI/Claude",
      outcome: "Push enriched prospect to CRM (HubSpot/Freshsales) & alert SDRs in Slack with sub-60s latency.",
      linkUrl: "/insights/custom-session-storage-engines",
      linkText: "Explore Session & Enrichment Architecture",
    },
    {
      number: "02",
      title: "Event-Driven Multi-Tier Customer Onboarding Drip",
      icon: Mail,
      category: "Growth & Retention",
      objective: "Send dynamic onboarding sequences adapted to actual in-app user milestones rather than fixed time delays.",
      trigger: "User signup event from Supabase / Auth0 webhook",
      action: "Poll product database for activation milestones → Filter drop-off events → Render dynamic Resend emails",
      outcome: "3x higher activation rate with personalized checklist reminders based on real feature usage.",
      linkUrl: "/custom-business-automation",
      linkText: "Learn about Business Process Automation",
    },
    {
      number: "03",
      title: "Multi-Channel Social Content Engine & Publishing",
      icon: Share2,
      category: "Marketing Automation",
      objective: "Orchestrate topic research, outline synthesis, and Human-in-the-Loop approval before social broadcast.",
      trigger: "New blog post published / Notion content calendar card moved to 'Approved'",
      action: "Format LinkedIn post & X thread with strict character constraints → Create preview draft in Trello",
      outcome: "100% on-schedule multi-platform distribution with zero manual copy-pasting.",
      linkUrl: "/case-studies/linked-in",
      linkText: "View Trello + CrewAI Case Study",
    },
    {
      number: "04",
      title: "Intelligent Support Ticket Routing & Sentiment Triage",
      icon: LifeBuoy,
      category: "Customer Support Ops",
      objective: "Analyze incoming customer tickets for urgency, sentiment, and intent to route instantly to senior engineers.",
      trigger: "New email or Intercom / Zendesk ticket received",
      action: "LLM classifies urgency (P0/P1/P2) & sentiment → Extracts account tier from CRM database",
      outcome: "Critical VIP issues ping on-call Slack channels immediately; routine queries receive automated cited answers.",
      linkUrl: "/insights/multi-agent-orchestration-from-scratch",
      linkText: "See Multi-Agent Triage Workflows",
    },
    {
      number: "05",
      title: "Automated Invoicing, Stripe Payments & Accounting Sync",
      icon: CreditCard,
      category: "Finance & Operations",
      objective: "Eliminate manual bookkeeping by bridging Stripe charge events directly to QuickBooks/Xero and Google Sheets.",
      trigger: "Stripe invoice.payment_succeeded webhook event",
      action: "Generate branded PDF invoice via Google Apps Script → Calculate tax breakdowns → Reconcile ledger",
      outcome: "Zero duplicate invoices, instant customer receipt dispatch, and real-time revenue dashboard updates.",
      linkUrl: "/insights/google-sheets-apps-script-enterprise",
      linkText: "Read Google Sheets ERP Guide",
    },
    {
      number: "06",
      title: "Event-Driven Task Delegation & Linear/Jira Sync",
      icon: CheckSquare,
      category: "Engineering & Product Ops",
      objective: "Automatically convert customer bug reports or enterprise contract triggers into organized sprint tasks.",
      trigger: "CRM stage updated to 'Closed Won' or Sentry critical bug alarm fired",
      action: "Parse technical payload → Create formatted Linear issue with assignees and tags → Add Google Drive client folder",
      outcome: "Automates 100% of project onboarding checklists without manual project manager friction.",
      linkUrl: "/custom-business-automation",
      linkText: "Explore Operational Software Services",
    },
    {
      number: "07",
      title: "User Feedback Aggregation & Churn Risk Alarms",
      icon: MessageSquare,
      category: "Product Intelligence",
      objective: "Consolidate NPS surveys, Trustpilot reviews, and app ratings into a unified sentiment intelligence vector stream.",
      trigger: "Survey response submitted / Webhook from review platform",
      action: "Extract key feature feedback → Run semantic clustering in Supabase pgvector → Flag negative sentiment",
      outcome: "Proactive alert sent to Account Executive with context before the customer decides to churn.",
      linkUrl: "/custom-ai-solutions",
      linkText: "Discover Custom RAG & Vector Pipelines",
    },
    {
      number: "08",
      title: "Product Telemetry, Usage Milestones & Two-Way CRM Sync",
      icon: BarChart3,
      category: "Product-Led Growth (PLG)",
      objective: "Sync real in-app database events bi-directionally with Freshsales and HubSpot without Zapier task limits.",
      trigger: "User reaches 80% usage limit or completes trial checklist in Postgres database",
      action: "Transform database payload → Upsert CRM contact and deal status with idempotent transaction queue",
      outcome: "SDRs receive real-time intent notifications to close enterprise expansion deals at peak engagement.",
      linkUrl: "/insights/custom-crm-sync-engines",
      linkText: "See Two-Way CRM Sync Engine Guide",
    },
    {
      number: "09",
      title: "Daily Executive KPI Digest & Anomaly Alarms in Slack",
      icon: Bell,
      category: "Executive Intelligence",
      objective: "Aggregate daily GSC rankings, Stripe MRR, and marketing spend into a crisp executive morning brief.",
      trigger: "Scheduled Cron trigger at 08:00 AM UTC",
      action: "Query Google Search Console API + GA4 BigQuery + Stripe API → Detect striking-distance shifts and anomalies",
      outcome: "One clean executive brief delivered to Slack/Email with zero manual dashboard compilation.",
      linkUrl: "/insights/automated-search-analytics-reporting",
      linkText: "Read Automated Search Intelligence Guide",
    },
    {
      number: "10",
      title: "RAG Knowledge Base & Voice/Chat Customer Resolution",
      icon: Cpu,
      category: "Autonomous AI Systems",
      objective: "Connect documentation, Notion SOPs, and help center articles to self-hostable n8n AI agent workflows.",
      trigger: "Customer inquiry from website widget or WhatsApp Business webhook",
      action: "Perform vector search in pgvector → Retrieve exact cited documentation → Formulate verified answer",
      outcome: "Resolves 70%+ of routine inquiries accurately with zero human agent escalation.",
      linkUrl: "/insights/local-llm-lm-studio-workflow",
      linkText: "Explore Local LLM & Self-Hosted AI",
    },
  ];

  const n8nFaqs = [
    {
      question: "Why should our startup use n8n instead of Zapier or Make?",
      answer: "n8n offers self-hosted enterprise control, native JavaScript/Python node functions, multi-step branching loops, and zero per-task execution costs. While Zapier becomes exorbitantly expensive at 50,000+ tasks/month, n8n runs on your own secure VPS with unlimited executions and total data privacy.",
    },
    {
      question: "How do you ensure n8n workflows do not fail or enter infinite loops?",
      answer: "We engineer enterprise error-handling triggers, dead-letter queues, idempotent webhook verification, and stateful retry proxies with timeout guards. Every critical business workflow is built with deterministic error notifications in Slack/Email.",
    },
    {
      question: "Can n8n integrate with custom AI agents and private LLMs?",
      answer: "Yes. We integrate n8n directly with OpenAI, Claude, LangChain, local LM Studio instances, and custom Supabase pgvector endpoints, allowing your workflows to act as autonomous agentic reasoning pipelines.",
    },
    {
      question: "How long does it take to design and deploy custom n8n workflows?",
      answer: "Standard startup automation packages (such as CRM two-way sync, lead enrichment, and automated invoice dispatch) are typically engineered, tested, and deployed to your self-hosted instance within 1 to 2 weeks.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="n8n Workflow Automation Consultant | Sarabjeet Rattan"
        description="Cut SaaS costs with self-hosted n8n workflows, custom API integrations, and automated lead routing. Production-ready automation in 14 days."
        keywords={[
          "n8n workflow automation",
          "n8n consultant",
          "hire n8n expert",
          "n8n enterprise automation",
          "zapier alternative n8n",
          "n8n crm sync",
        ]}
        faqItems={n8nFaqs}
        url="https://sarabjeetrattan.com/n8n-workflows"
      />

      <Header onOpenEnquiry={() => handleOpenModal("n8n-workflow-automation")} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Workflow className="w-3.5 h-3.5" />
            Engineering Pillar • High-Velocity Automation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Top 10 n8n Workflows{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
              Every Startup Should Automate.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Eliminate repetitive SaaS overhead and brittle manual processes. We architect bespoke,
            self-hosted <strong className="text-foreground font-semibold">n8n workflow engines</strong> that
            orchestrate lead research, AI follow-ups, two-way CRM synchronization, and multi-channel publishing
            with unlimited task execution and zero licensing traps.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all rounded-full"
              onClick={() => handleOpenModal("n8n-workflow-automation")}
            >
              Book n8n Architecture Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-full"
              asChild
            >
              <a href="#workflows-grid">
                Explore The 10 Workflows
              </a>
            </Button>
          </div>

          {/* Visual Node Diagram Component */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Terminal className="w-4 h-4 text-primary" />
                <span>n8n_enterprise_runtime.flow</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Deterministic Execution • Self-Hosted
              </div>
            </div>

            {/* Workflow Node Graph */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
                <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider">1. Trigger Node</div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Webhook / CRM Event
                </div>
                <p className="text-xs text-muted-foreground">Captures verified inbound payloads with HMAC signature checks.</p>
              </div>

              <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-2">
                <div className="text-xs font-mono text-blue-500 font-bold uppercase tracking-wider">2. AI Logic Node</div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-500" /> LLM Reasoning & RAG
                </div>
                <p className="text-xs text-muted-foreground">Enriches data via vector search & drafts context-aware responses.</p>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-2">
                <div className="text-xs font-mono text-purple-500 font-bold uppercase tracking-wider">3. Branch / Gate</div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-500" /> Validation & HITL
                </div>
                <p className="text-xs text-muted-foreground">Applies enterprise business rules and human approval checkpoints.</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                <div className="text-xs font-mono text-emerald-500 font-bold uppercase tracking-wider">4. Action Sink</div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" /> Direct CRM / Slack
                </div>
                <p className="text-xs text-muted-foreground">Commits data to PostgreSQL, Freshsales, and instant alert channels.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is n8n Overview */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-foreground">100% Data Sovereignty</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Self-host on your own AWS/Hetzner infrastructure. Your sensitive customer data, API keys, and internal CRM records never pass through third-party SaaS servers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Unlimited Task Execution</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Say goodbye to tiered pricing traps where Zapier bills you thousands for high-frequency polling. Run millions of executions at zero incremental task cost.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Native AI & Python Nodes</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Embed custom LangChain agents, OpenAI tool-calling, pgvector embeddings, and complex JavaScript functions directly inside your execution pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* 10 Workflows Grid Section */}
        <section id="workflows-grid" className="container mx-auto px-4 max-w-5xl mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> High-Impact Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              The 10 Startup Workflows We Build
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Engineered with deterministic safeguards, automated retries, and seamless CRM integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {n8nWorkflowsList.map((wf) => {
              const IconComponent = wf.icon;
              return (
                <div
                  key={wf.number}
                  className="p-6 rounded-2xl border border-border/80 bg-card/60 hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-muted-foreground uppercase">
                          {wf.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                        #{wf.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground leading-snug">
                      {wf.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {wf.objective}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/40 text-xs font-mono">
                      <div className="text-muted-foreground">
                        <strong className="text-primary">Trigger:</strong> {wf.trigger}
                      </div>
                      <div className="text-muted-foreground">
                        <strong className="text-blue-500">Pipeline:</strong> {wf.action}
                      </div>
                      <div className="text-muted-foreground">
                        <strong className="text-emerald-500">Outcome:</strong> {wf.outcome}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border/40">
                    <Link
                      to={wf.linkUrl}
                      className="text-xs text-primary hover:underline font-mono inline-flex items-center gap-1"
                    >
                      {wf.linkText}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-semibold text-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => handleOpenModal(`n8n-workflow-${wf.number}`)}
                    >
                      Build This Workflow →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="container mx-auto px-4 max-w-5xl mt-24">
          <div className="p-8 sm:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/50 to-primary/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-4 h-4" /> Operational ROI Estimator
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Calculate What n8n Workflow Automation Saves Your Startup
              </h2>
              <p className="text-sm text-muted-foreground">
                See how replacing manual repetitive workflows with deterministic n8n pipelines accelerates your bottom line.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Operations / SDR Team Size</span>
                    <span className="text-primary font-mono font-bold">{teamSize} People</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Manual Repetitive Hours (Per Person / Week)</span>
                    <span className="text-primary font-mono font-bold">{manualHoursPerWeek} Hours/wk</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={manualHoursPerWeek}
                    onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Blended Hourly Team Cost</span>
                    <span className="text-primary font-mono font-bold">${hourlyRate} / Hour</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Metrics Output */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-background/80 border border-primary/20 space-y-4 text-center">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Estimated Annual Hours Reclaimed
                  </div>
                  <div className="text-4xl font-extrabold text-foreground font-mono">
                    {annualHoursSaved.toLocaleString()} <span className="text-lg text-primary">hrs/yr</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Direct Annual Labor Value Saved
                  </div>
                  <div className="text-4xl font-black text-emerald-500 font-mono">
                    ${annualDollarSavings.toLocaleString()}
                  </div>
                </div>

                <Button
                  className="w-full h-11 text-sm font-bold mt-2 shadow-lg shadow-primary/20 rounded-xl"
                  onClick={() => handleOpenModal("n8n-roi-consultation")}
                >
                  Claim Your Automation Blueprint
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why SSR Section */}
        <section className="container mx-auto px-4 max-w-5xl mt-24">
          <div className="p-8 sm:p-12 rounded-3xl border border-border/80 bg-card/40 space-y-8">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                Consultant Advantage • Production Rigor
              </div>
              <h2 className="text-3xl font-extrabold text-foreground">
                Why Work With Sarabjeet on n8n Workflow Automation?
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unlike freelancers who simply link basic pre-built templates, I engineer custom, fault-tolerant operational pipelines backed by 16+ years of systems architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Idempotent Webhook Processing</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Zero duplicate charges, zero ghost contacts. We implement state caching and deduplication keys across all incoming payloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Full-Stack AI Integration</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Direct integration with OpenAI, Claude, LangChain, and Supabase pgvector for deep intelligent synthesis and smart tool-calling.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Self-Hosted Hardened VPS Deployments</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Complete Docker Compose setups on Hetzner, AWS, or DigitalOcean with automatic SSL, daily PostgreSQL backups, and Prometheus monitoring.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Zero Vendor Lock-In</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    100% code and workflow JSON ownership. Everything is committed directly to your private GitHub repository with comprehensive documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="container mx-auto px-4 max-w-4xl mt-24">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know about custom n8n workflow engineering.</p>
          </div>

          <div className="space-y-4">
            {n8nFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/80 bg-card/50 space-y-2"
              >
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="container mx-auto px-4 max-w-5xl mt-24">
          <LeadCaptureBanner
            title="Ready to Automate Your Startup's Critical Workflows?"
            subtitle="Stop burning engineering and SDR hours on manual tasks. Let's engineer a resilient n8n automation engine tailored to your exact stack."
            buttonText="Schedule n8n Strategy Session"
            onOpenLeadModal={() => handleOpenModal("n8n-workflow-automation")}
          />
        </section>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={selectedService}
        serviceTitle="n8n Workflow Automation Consultation"
      />
    </div>
  );
};

export default N8nWorkflows;
