import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Database,
  Layers,
  HelpCircle,
  Cpu,
  Workflow,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CustomCrmSync = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const crmFaqs = [
    {
      question: "How does the sync engine prevent duplicate contact records across CRMs?",
      answer: "Incoming records are matched against composite identifiers (normalized email, sanitized phone number, and company domain) and verified against a persistent record ledger before initiating creates or updates.",
    },
    {
      question: "How does the system recover from CRM API rate limits or network outages?",
      answer: "All incoming webhooks are stored in an append-only event queue. When a third-party API encounters a 429 rate limit or 5xx server error, the engine pauses and retries with exponential backoff and jitter without dropping payloads.",
    },
    {
      question: "Can the sync engine translate custom fields and different lifecycle stages?",
      answer: "Yes. Custom transformation schemas map complex nested attributes, picklist values, deal stage lifecycles, and ISO timestamps between disparate CRM data models.",
    },
    {
      question: "What is the maintenance and operational cost compared to Zapier or Make?",
      answer: "While Zapier costs $100–$500+ every month as task volumes rise, a custom serverless sync engine runs on lightweight cloud workers for less than $10/month with zero per-task execution fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Two-Way CRM Sync Engine: Bidirectional Webhook Pipeline"
        description="Engineer custom two-way CRM sync engines for Freshsales and HubSpot. Eliminate Zapier limits with composite key deduplication and stateful webhook queues."
        keywords={[
          "two way crm sync engine",
          "bidirectional crm sync without zapier",
          "freshsales hubspot sync api",
          "crm webhook deduplication",
          "custom crm integration architecture",
          "crm data deduplication script",
          "crm webhook replay queue",
        ]}
        faqItems={crmFaqs}
        url="https://sarabjeetrattan.com/insights/custom-crm-sync-engines"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/custom-business-automation" className="text-primary hover:underline">
              Business Automation
            </Link>
            <span>/</span>
            <span>Commercial Solution</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Operational Systems • Custom CRM Architecture
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Two-Way CRM Synchronization Without No-Code Limits
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When no-code tools like Zapier or Make hit payload timeouts, rate limits, and duplicate contact loops, we engineer dedicated, self-healing sync pipelines between Freshsales, HubSpot, Pipedrive, and your databases.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Custom CRM Sync
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* AEO DIRECT ANSWER BLOCK */}
          <section className="p-6 rounded-2xl border border-primary/20 bg-primary/[0.02] space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" /> How Does a Two-Way CRM Synchronization Engine Work?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A custom two-way CRM synchronization engine is a stateful backend service that orchestrates bi-directional data flow between CRMs (such as Freshsales and HubSpot) and internal databases. It uses composite key normalization, transaction ledgers, and retry queues to prevent circular sync loops, eliminate duplicate contacts, and maintain data consistency across systems.
            </p>
          </section>

          {/* DOM-BASED ARCHITECTURE INFOGRAPHIC */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Workflow className="w-4 h-4 text-primary" /> Stateful Bidirectional Relay Architecture
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Database className="w-4 h-4 text-primary" /> 1. Ingestion &amp; Deduplication
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real-time webhook listeners parse payloads and match composite keys (email, phone, domain) against persistent mapping tables.
                </p>
                <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                  Idempotent Ingestion
                </div>
              </div>

              <div className="p-5 rounded-xl border border-primary/40 bg-primary/[0.04] space-y-2 relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-primary" /> 2. Vector Clock Reconciliation
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prevents circular update loops and resolves simultaneous multi-user CRM edits automatically using state hashes.
                </p>
                <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                  Zero Circular Loops
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <RefreshCw className="w-4 h-4 text-primary" /> 3. Stateful Relay &amp; Retry
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Transforms schemas and dispatches API payloads with dead-letter retry queues and exponential backoff on 429 rate limits.
                </p>
                <div className="text-[10px] font-mono text-success bg-success/10 px-2 py-0.5 rounded w-fit">
                  99.99% Guaranteed Delivery
                </div>
              </div>
            </div>
          </section>

          {/* 1. THE PROBLEM */}
          <section id="no-code-breakdown" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> The Business Problem
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Why No-Code Tools Break at Scale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Silent Webhook Failures
                </div>
                <p>When third-party APIs experience downtime, webhooks fail without automated retry queues, causing lost leads.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Circular Update Loops
                </div>
                <p>Two-way sync setups in Zapier frequently trigger infinite update loops, creating duplicate contacts and corrupted deal values.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Aggressive Task Bills
                </div>
                <p>High-volume businesses end up paying $500–$2,000/mo just for basic webhook forwarding.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & ARCHITECTURE */}
          <section id="self-healing-sync-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4" /> The Engineered Solution
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Stateful, Self-Healing Sync Architecture
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built as part of our{" "}
              <Link to="/custom-business-automation" className="text-primary font-semibold hover:underline">
                Bespoke Business Automation practice
              </Link>
              , this approach powers our{" "}
              <Link to="/case-studies/lead-og" className="text-primary font-semibold hover:underline">
                Lead OG B2B lead enrichment case study
              </Link>
              . We engineer stateful sync engines that use cryptographic deduplication hashes, vector clocks to prevent circular updates, and dead-letter queues. For multi-app workflows, these connect directly to{" "}
              <Link to="/n8n-workflows" className="text-primary font-semibold hover:underline">
                n8n workflow automation engines
              </Link>{" "}
              and{" "}
              <Link to="/insights/google-sheets-apps-script-enterprise" className="text-primary font-semibold hover:underline">
                Google Sheets ERP automation
              </Link>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-primary font-bold">Vector Clock Reconciliation</div>
                <div className="text-muted-foreground font-sans">
                  Prevents circular update loops and resolves simultaneous multi-user CRM edits automatically.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-blue-500 font-bold">Dead-Letter Replay Queue</div>
                <div className="text-muted-foreground font-sans">
                  Failed payload deliveries are stored and automatically retried when target APIs recover.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-success font-bold">Flat Serverless Hosting</div>
                <div className="text-muted-foreground font-sans">
                  Zero per-task fees. Runs on lightweight serverless infrastructure with 99.99% uptime.
                </div>
              </div>
            </div>
          </section>

          {/* 3. HOW WE HELP */}
          <section id="custom-crm-deliverables" className="p-8 rounded-2xl border border-border/80 bg-card/60 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" /> Engagement Deliverables
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              How We Deliver Your Custom CRM Integration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-primary font-bold">Phase 1: Field Mapping</div>
                <h3 className="font-bold text-foreground text-sm">Schema & Conflict Audit</h3>
                <p className="text-xs text-muted-foreground">
                  We audit your custom CRM fields, lifecycle stages, and define bidirectional conflict rules.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-500 font-bold">Phase 2: Engine Build</div>
                <h3 className="font-bold text-foreground text-sm">Stateful Relay Engine</h3>
                <p className="text-xs text-muted-foreground">
                  Implementation of serverless listeners, rate-limit guards (429 handling), and retry queues.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-success font-bold">Phase 3: Live Verification</div>
                <h3 className="font-bold text-foreground text-sm">Historical Backfill & Sync</h3>
                <p className="text-xs text-muted-foreground">
                  Clean historical data migration, zero duplicate guarantees, and 24/7 monitoring alerts.
                </p>
              </div>
            </div>
          </section>

          {/* 4. VISIBLE FREQUENTLY ASKED QUESTIONS (MIRRORED IN FAQ SCHEMA) */}
          <section id="crm-faqs" className="p-8 rounded-2xl border border-border bg-card/40 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Custom Two-Way CRM Synchronization FAQ
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {crmFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-border/60">
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* 5. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Ready to Eliminate CRM Sync Failures & Zapier Limits?"
              subtitle="Let's build a dedicated, self-healing sync engine tailored to your exact sales and ERP workflows."
              buttonText="Request CRM Sync Consultation"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="custom-crm-sync"
        serviceTitle="Custom CRM Integration Consultation"
      />
    </div>
  );
};

export default CustomCrmSync;
