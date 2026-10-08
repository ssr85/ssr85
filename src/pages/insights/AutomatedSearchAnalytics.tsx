import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LineChart,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Mail,
  Search,
  Terminal,
  Database,
  Clock,
  HelpCircle,
  Layers,
  BarChart3,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AutomatedSearchAnalytics = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const searchFaqs = [
    {
      question: "What are striking-distance keywords and why should they be tracked?",
      answer: "Striking-distance keywords rank on Google Search Positions 4 to 20. Because Google already recognizes topical relevance for these queries, minor content, title, or internal link optimizations can lift them into the Top 3 for exponential organic traffic growth.",
    },
    {
      question: "How frequently does the automated search analytics ingestion script run?",
      answer: "Ingestion jobs run daily on a serverless cron schedule to extract fresh Google Search Console search analytics and GA4 event data into a central PostgreSQL/Supabase database.",
    },
    {
      question: "What metrics are included in the automated executive alert email?",
      answer: "Alerts highlight week-over-week impression and click trends, newly ranking queries in the top 20, high-impression low-CTR anomalies, and prioritized weekly content optimization action items.",
    },
    {
      question: "Does automated GSC data extraction impact website loading speed?",
      answer: "No. The ingestion script runs completely out-of-band on external cloud workers querying Google APIs directly, placing zero load on your website server or CMS database.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Automated Google Search Console & GA4 Reporting Pipeline"
        description="Automate daily Google Search Console and GA4 data ingestion. Detect striking-distance keywords (Positions 4-20) and receive scheduled executive email alerts."
        keywords={[
          "automated google search console reporting",
          "gsc striking distance automation",
          "ga4 automated email alerts",
          "google search console api script",
          "automated search analytics reporting",
          "rankmath striking distance intelligence",
        ]}
        faqItems={searchFaqs}
        url="https://sarabjeetrattan.com/insights/automated-search-analytics-reporting"
        type="article"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/ai-wordpress-development" className="text-primary hover:underline">
              AI WordPress Development
            </Link>
            <span>/</span>
            <span>Search Intelligence</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Growth Intelligence • Automated Data Ingestion
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Automated Search Console &amp; GA4 Intelligence: Proactive Revenue Alerts
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop wasting 10+ hours every month manually exporting CSVs from Google Search Console and GA4. We engineer automated data pipelines that detect striking-distance revenue opportunities (positions 5–20) and deliver weekly action items straight to your inbox.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Search Intelligence Setup
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* AEO DIRECT ANSWER BLOCK */}
          <section className="p-6 rounded-2xl border border-primary/20 bg-primary/[0.02] space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" /> What is Automated Search Console and GA4 Ingestion?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automated Search Console and GA4 ingestion is a scheduled backend pipeline that queries official Google APIs daily, storing raw search performance in a database. It identifies striking-distance keywords (Positions 4 to 20), tracks click-through rate anomalies, and sends automated executive email summaries without manual spreadsheet exports.
            </p>
          </section>

          {/* DOM-BASED ARCHITECTURE INFOGRAPHIC */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <BarChart3 className="w-4 h-4 text-primary" /> Autonomous Search Analytics Pipeline
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Database className="w-4 h-4 text-primary" /> 1. Daily Ingestion Cron
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Queries GSC and GA4 APIs daily with JWT service accounts, storing normalized query metrics into PostgreSQL / Supabase.
                </p>
                <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                  Automated Daily Fetch
                </div>
              </div>

              <div className="p-5 rounded-xl border border-primary/40 bg-primary/[0.04] space-y-2 relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <TrendingUp className="w-4 h-4 text-primary" /> 2. Striking-Distance Math
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Opportunity scoring engine isolates keywords in positions 4–20 with high impressions and calculates prioritization weights.
                </p>
                <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                  Pos 4–20 Opportunity Scoring
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border/80 bg-card/60 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <Mail className="w-4 h-4 text-primary" /> 3. Executive Email Digests
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dispatches concise weekly HTML emails with 3 prioritized content optimizations and weekly impression deltas.
                </p>
                <div className="text-[10px] font-mono text-success bg-success/10 px-2 py-0.5 rounded w-fit">
                  Weekly Executive Action
                </div>
              </div>
            </div>
          </section>

          {/* 1. THE PROBLEM */}
          <section id="search-analytics-challenges" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> 1. The Critical Problem Solved
            </div>
            <h2 id="why-manual-seo-reporting-fails" className="text-2xl font-bold text-foreground">
              Why Manual SEO Reporting Fails Growth Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Wasted Operational Hours
                </div>
                <p>Teams spend hours every week pulling manual spreadsheets instead of taking strategic action on high-intent content gaps.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Missed "Striking Distance" Wins
                </div>
                <p>Keywords ranking in positions 5–20 with thousands of monthly impressions get lost in massive, unfiltered data dumps.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Database Bloat from Plugins
                </div>
                <p>Bulky analytics plugins store millions of raw visitor hits directly in MySQL tables, degrading website performance.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & WHAT WE ENGINEER */}
          <section id="search-analytics-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Terminal className="w-4 h-4" /> 2. What We Engineered (The Solution)
            </div>
            <h2 id="autonomous-search-flywheel" className="text-2xl sm:text-3xl font-bold text-foreground">
              Autonomous Search Flywheel Architecture
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We connect directly to Google Search Console and GA4 APIs using lightweight serverless cron jobs or <Link to="/n8n-workflows" className="text-primary font-semibold hover:underline">automated n8n webhook nodes</Link>, calculate opportunity priority scores, and dispatch weekly prioritized executive action summaries. Reports can stream directly into <Link to="/insights/google-sheets-apps-script-enterprise" className="text-primary font-semibold hover:underline">Google Sheets Enterprise systems</Link> or pair with <Link to="/ai-wordpress-development" className="text-primary font-semibold hover:underline">AI WordPress infrastructure</Link>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-primary font-bold font-mono flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" /> Daily Automated API Sync
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Automated scripts query GSC and GA4 APIs daily, storing normalized aggregates in temporary cache layers with zero database strain.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-blue-500 font-bold font-mono flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4" /> Opportunity Math
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Custom algorithms isolate high-impression search queries ranking between positions 5.0 and 20.0 with above-average click-through potential.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-success font-bold font-mono flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" /> Prioritized Executive Digests
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Delivers a concise email every Monday morning with 3 prioritized, high-leverage content optimizations for the week.
                </div>
              </div>
            </div>
          </section>

          {/* 3. MEASURABLE BUSINESS BENEFITS */}
          <section id="measurable-seo-benefits" className="p-8 rounded-2xl border border-success/20 bg-success/[0.02] space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <TrendingUp className="w-4 h-4" /> 3. Measurable Business Benefits
            </div>
            <h2 id="growth-acceleration-metrics" className="text-2xl font-bold text-foreground">
              Growth Acceleration &amp; Operational Efficiency
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">15+ Hours Saved Monthly</div>
                <p className="text-muted-foreground leading-relaxed">
                  Completely eliminates manual spreadsheet pulling and data formatting via our <Link to="/custom-business-automation" className="text-primary hover:underline">business automation pipelines</Link>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Fast Organic Traffic Wins</div>
                <p className="text-muted-foreground leading-relaxed">
                  Targeting striking-distance keywords (pos 5–20) yields faster ranking and traffic gains than creating content from scratch.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Zero Site Performance Impact</div>
                <p className="text-muted-foreground leading-relaxed">
                  Execution happens completely out-of-band via external cloud APIs, adding 0ms of latency to visitor page loads.
                </p>
              </div>
            </div>
          </section>

          {/* 4. VISIBLE FREQUENTLY ASKED QUESTIONS (MIRRORED IN FAQ SCHEMA) */}
          <section id="search-faqs" className="p-8 rounded-2xl border border-border bg-card/40 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Automated Search Console &amp; GA4 Intelligence FAQ
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {searchFaqs.map((faq, idx) => (
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
              title="Ready to Automate Your Search Intelligence?"
              subtitle="Transform raw Google Search Console and GA4 data into high-converting organic traffic opportunities automatically."
              buttonText="Schedule Search Intelligence Consultation"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="automated-search-analytics-reporting"
        serviceTitle="Automated Search Console & Analytics Consultation"
      />
    </div>
  );
};

export default AutomatedSearchAnalytics;
