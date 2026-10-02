import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Database,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  RefreshCw,
  Search,
  Server,
  Activity,
} from "lucide-react";

export const CustomSessionEngines = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [prospectsPerMonth, setProspectsPerMonth] = useState(1500);

  // ROI estimation calculations
  const manualResearchHours = Math.round((prospectsPerMonth * 12) / 60); // 12 mins per lead
  const automatedMinutes = Math.round((prospectsPerMonth * 0.25)); // 15 sec per lead
  const hoursSaved = Math.max(1, manualResearchHours - Math.round(automatedMinutes / 60));
  const estimatedCostSaved = hoursSaved * 35; // $35/hr BDR cost

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="High-Velocity Scraping & Custom Session Engines | Sarabjeet Rattan"
        description="Eliminate manual research and IP bans. We build bespoke session caching engines, distributed scrapers, and automated CRM enrichment pipelines."
        keywords={[
          "b2b lead scraping engine",
          "custom session cache api",
          "high velocity web scraping without blocking",
          "distributed prospect enrichment engine",
          "supabase edge function web scraping",
          "automated prospect research",
          "crm deduplication engine",
          "high velocity web scraping architecture",
          "lead og architecture",
        ]}
        url="https://sarabjeetrattan.com/insights/custom-session-storage-engines"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/custom-ai-solutions" className="text-primary hover:underline">
              Custom AI Solutions
            </Link>
            <span>/</span>
            <span>Commercial Solution</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              High-Throughput Scraping • Custom Session Architecture
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              High-Velocity Data Scraping & Bespoke Session Engines
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When standard scraping APIs hit Cloudflare blocks, session timeouts, and duplicate records, we build custom distributed session managers and enrichment pipelines that deliver verified prospect data straight to your CRM in seconds.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Custom Scraping Pipeline
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. THE PROBLEM */}
          <section id="scraping-bottlenecks-and-bans" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> The Business Problem
            </div>
            <h2 id="why-manual-bdr-research-stalls" className="text-2xl font-bold text-foreground">
              Why Off-The-Shelf Scraping & Manual BDR Research Stalls Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> BDR Time Sink
                </div>
                <p>Sales reps spend 12–15 minutes per prospect manually hunting LinkedIn, corporate websites, and phone lines instead of closing deals.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Aggressive Rate Bans
                </div>
                <p>Generic web scrapers trigger Cloudflare anti-bot blocks, captchas, and IP blacklists within minutes of scale.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> CRM Data Pollution
                </div>
                <p>Third-party scrapers inject unverified emails and duplicate leads into your CRM, degrading domain reputation and deliverability.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & ARCHITECTURE */}
          <section id="session-cache-solution-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4" /> The Engineered Solution (Lead OG Engine)
            </div>
            <h2 id="distributed-session-cache-pipeline" className="text-2xl sm:text-3xl font-bold text-foreground">
              Distributed Session Cache & AI Agentic Research Pipeline
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We engineered the Lead OG engine—detailed in our <Link to="/case-studies/lead-og" className="text-primary font-semibold hover:underline">Lead OG Case Study</Link>—a multi-layered architecture featuring distributed headless browser pools, in-memory session recycling, AI contact enrichment, and atomic CRM deduplication integrated with <Link to="/custom-ai-solutions" className="text-primary font-semibold hover:underline">Custom AI Solutions</Link>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Server className="w-4 h-4" /> 1. Session Recycling
                </div>
                <div className="text-muted-foreground font-sans">
                  Persistent in-memory session cache recycles authenticated browser fingerprints and cookies to eliminate 98% of CAPTCHAs.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-500 font-bold">
                  <Search className="w-4 h-4" /> 2. AI Enrichment
                </div>
                <div className="text-muted-foreground font-sans">
                  Autonomous AI workers perform multi-source cross-referencing (Tavily, Crunchbase, Company Registry) for verified direct dials.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="flex items-center gap-2 text-success font-bold">
                  <RefreshCw className="w-4 h-4" /> 3. Atomic CRM Sync
                </div>
                <div className="text-muted-foreground font-sans">
                  Real-time synchronization into Freshsales/HubSpot with strict cryptographic deduplication via <Link to="/insights/custom-crm-sync-engines" className="text-foreground underline">custom CRM sync engines</Link> or <Link to="/n8n-workflows" className="text-foreground underline">n8n webhooks</Link>.
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE ROI / EFFICIENCY CALCULATOR */}
          <section id="automated-prospecting-calculator" className="p-8 rounded-2xl border border-primary/30 bg-primary/[0.03] space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                  <Activity className="w-4 h-4" /> Efficiency Impact
                </div>
                <h3 id="prospecting-roi-calculator" className="text-xl font-bold text-foreground mt-1">
                  Automated Prospecting ROI Calculator
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-extrabold text-primary">
                  ${estimatedCostSaved.toLocaleString()} / mo
                </div>
                <div className="text-xs text-muted-foreground">Estimated BDR bandwidth saved</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor="prospect-slider" className="text-muted-foreground">Monthly Target Prospects: <span className="text-foreground font-bold">{prospectsPerMonth.toLocaleString()}</span></label>
                <span className="text-success font-bold">~{hoursSaved} Hours Saved / mo</span>
              </div>
              <input
                id="prospect-slider"
                type="range"
                min="200"
                max="10000"
                step="100"
                value={prospectsPerMonth}
                onChange={(e) => setProspectsPerMonth(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
              />
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/60">
                  <div className="text-muted-foreground text-[10px]">Manual Research Time</div>
                  <div className="font-bold text-red-500 text-sm">{manualResearchHours} hrs</div>
                </div>
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/60">
                  <div className="text-muted-foreground text-[10px]">Lead OG Engine Time</div>
                  <div className="font-bold text-success text-sm">~{Math.round(automatedMinutes / 60)} hrs</div>
                </div>
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/60">
                  <div className="text-muted-foreground text-[10px]">Response Acceleration</div>
                  <div className="font-bold text-primary text-sm">70% Faster</div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. HOW WE HELP */}
          <section id="custom-scraping-deliverables" className="p-8 rounded-2xl border border-border/80 bg-card/60 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" /> Engagement Deliverables
            </div>
            <h2 id="scraping-pipeline-engineering-phases" className="text-2xl font-bold text-foreground">
              How We Engineer Your Custom Data Scraping Pipeline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-primary font-bold">Phase 1: Target Ingestion</div>
                <h3 className="font-bold text-foreground text-sm">Scraping Engine & Proxy Pool</h3>
                <p className="text-xs text-muted-foreground">
                  Custom headless browser architecture, residential IP rotation, and session cache storage to prevent blocks.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-500 font-bold">Phase 2: AI Enrichment</div>
                <h3 className="font-bold text-foreground text-sm">Agentic Entity Verification</h3>
                <p className="text-xs text-muted-foreground">
                  Automated validation of verified decision-maker emails, phone numbers, tech stack signals, and revenue metrics.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-success font-bold">Phase 3: Real-Time CRM Relay</div>
                <h3 className="font-bold text-foreground text-sm">Deduplication & Direct Sync</h3>
                <p className="text-xs text-muted-foreground">
                  Bi-directional integration with your CRM (HubSpot, Freshsales, Salesforce) with 0% duplication guarantee.
                </p>
              </div>
            </div>
          </section>

          {/* 4. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Ready to Automate Your B2B Data & Prospecting Pipeline?"
              subtitle="Let's build a dedicated, high-velocity scraping and enrichment engine customized to your exact Ideal Customer Profile."
              buttonText="Request Custom Scraping Consultation"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="custom-scraping-session-engine"
        serviceTitle="Custom Scraping & Session Engine Consultation"
      />
    </div>
  );
};

export default CustomSessionEngines;
