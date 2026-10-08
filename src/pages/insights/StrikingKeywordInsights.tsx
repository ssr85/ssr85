import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Target,
  Layers,
  Network,
  Database,
  Cpu,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  Search,
} from "lucide-react";

export const StrikingKeywordInsights = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Striking Distance Keywords Automation | Sarabjeet Rattan"
        description="Automate striking-distance keyword discovery (positions 8–20) and topic silos from Search Console data to accelerate organic traffic."
        keywords={[
          "striking distance keywords",
          "seo topic silos",
          "keyword insights system",
          "search console automation",
          "topical authority seo",
          "content optimization engine",
        ]}
        url="https://sarabjeetrattan.com/insights/striking-distance-keyword-insights-system"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/n8n-workflows" className="text-primary hover:underline">
              Automation & n8n
            </Link>
            <span>/</span>
            <span>SEO Intelligence</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Automated Organic Intelligence • Topic Silo Systems
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Informed Keyword Insights & Striking-Distance Topic Silo System
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Most content strategies fail because writers create articles based on guesses or high-difficulty volume tools. We build automated data ingestion engines that extract your actual <strong className="text-foreground">striking-distance queries (positions 8–20)</strong> directly from Google Search Console, organize them into mathematical topic silos, and feed structured semantic briefs into your content engine for guaranteed ranking lifts.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Engineer Your Keyword Intelligence Engine
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. The Core Bottleneck */}
          <section className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <Target className="w-4 h-4" /> 1. The Critical Flaw in Modern SEO Workflows
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Why 90% of Content Marketing Produces Zero Search Traffic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Target Blindness
                </div>
                <p>Writing for saturated KD 80+ head keywords instead of harvesting queries where Google already recognizes your topical authority.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Unlinked Content Islands
                </div>
                <p>Publishing articles in isolation without strict parent-child topical silos, bleeding PageRank and confusing semantic search crawlers.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Generic AI Output
                </div>
                <p>Using raw prompts without grounding in proprietary search intent data, leading to flat AI slop that search engines deprioritize.</p>
              </div>
            </div>
          </section>

          {/* 2. System Architecture */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" /> 2. The Informed Keyword Intelligence Architecture
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              How the Continuous Striking-Distance Data Loop Works
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Instead of static spreadsheets, our pipeline runs automated cron cycles using n8n and Python to ingest GSC API metrics, cluster queries into topical semantic nodes, and generate high-density execution briefs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  01
                </div>
                <h3 className="font-bold text-foreground text-base">Daily GSC API Ingestion & Filtering</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automated scripts query Google Search Console API daily, identifying search queries generating impressions in positions 8.0 to 19.9 with below-average CTR (&lt; 2.5%).
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  02
                </div>
                <h3 className="font-bold text-foreground text-base">Topical Vector Clustering & Silo Mapping</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Queries are grouped into semantic entity clusters using OpenAI embeddings. The system maps each cluster to a definitive Pillar URL and subsidiary Cluster Guides.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  03
                </div>
                <h3 className="font-bold text-foreground text-base">Dynamic Entity & Header Brief Generation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Generates an exact H2/H3 outline containing primary entity keywords, missing Wikidata concepts, and user search questions to fill semantic gaps.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  04
                </div>
                <h3 className="font-bold text-foreground text-base">Bidirectional Internal Link Enforcement</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ensures all cluster posts link back upward to the Pillar with exact-match anchors, concentrating PageRank and triggering rapid ranking jumps into positions 1–3.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Expected Outcomes */}
          <section className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldCheck className="w-4 h-4" /> 3. Verified Performance Impact
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Predictable Organic Growth Without Guesswork
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 text-center space-y-1">
                <div className="text-3xl font-extrabold text-emerald-500 font-mono">+180%</div>
                <div className="text-xs text-muted-foreground">Organic Click Growth in 60 Days</div>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 text-center space-y-1">
                <div className="text-3xl font-extrabold text-emerald-500 font-mono">&lt; 14 Days</div>
                <div className="text-xs text-muted-foreground">Striking-to-Top-3 Promotion Velocity</div>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 text-center space-y-1">
                <div className="text-3xl font-extrabold text-emerald-500 font-mono">100%</div>
                <div className="text-xs text-muted-foreground">Automated Weekly Execution Briefs</div>
              </div>
            </div>
          </section>

          {/* Related Silo Links */}
          <section className="pt-4 border-t border-border/60 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Connected Topical Silo Nodes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/insights/automated-search-analytics-reporting"
                className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group bg-card flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    GSC & GA4 Pipeline
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Automate daily search console telemetry and executive alerts.
                  </div>
                </div>
              </Link>
              <Link
                to="/n8n-workflows"
                className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group bg-card flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    n8n Automation
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Custom backend orchestration pipelines for operations.
                  </div>
                </div>
              </Link>
              <Link
                to="/tools/architecture-scope-estimator"
                className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group bg-card flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    Scope Estimator
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Calculate delivery timelines and safety controls.
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Final CTA Banner */}
          <LeadCaptureBanner
            title="Ready to Turn Striking Keywords into Compounding Traffic?"
            description="Let's engineer a customized keyword intelligence and topic silo system for your web ecosystem."
            buttonText="Get Your Keyword System Architecture"
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialService="Informed Keyword Insights & Striking Distance SEO System"
      />
    </div>
  );
};

export default StrikingKeywordInsights;
