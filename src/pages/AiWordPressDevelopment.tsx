import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  LineChart,
  Terminal,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Database,
  Search,
  Server,
  Calculator,
  ShieldAlert,
  Bot,
  RefreshCw,
  Gauge,
  Lock,
} from "lucide-react";

export const AiWordPressDevelopment = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("ai-wordpress-development");

  // Interactive scope estimator state
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "lead-engine",
    "aeo-geo-engine",
  ]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const featureOptions = [
    {
      id: "lead-engine",
      name: "Enterprise Invariant Lead & CRM Sync Engine",
      time: "1-2 Weeks",
      impact: "Critical",
      desc: "Permanent zero-deletion audit log, direct server-side GA4 dispatch & direct CRM webhook sync.",
    },
    {
      id: "aeo-geo-engine",
      name: "Autonomous AEO/GEO & /llms.txt Schema Engine",
      time: "1-2 Weeks",
      impact: "Very High",
      desc: "Dynamic multi-tier JSON-LD graphs, real-time IndexNow pings, and AI crawler vector feeds.",
    },
    {
      id: "headless-vite",
      name: "Decoupled Headless SSG (Vite/React/Next.js)",
      time: "3-4 Weeks",
      impact: "Very High",
      desc: "Sub-500ms TTFB, 100/100 Core Web Vitals, zero frontend DB queries, and full CMS isolation.",
    },
    {
      id: "b2b-calc-engine",
      name: "Bespoke B2B Dynamic Pricing & Quote Engine",
      time: "2-3 Weeks",
      impact: "High",
      desc: "Multi-variable dimensional algorithms, custom file pipeline, and async ActionScheduler workers.",
    },
    {
      id: "custom-ai-plugin",
      name: "Bespoke LLM In-Admin Assistant Plugin",
      time: "2-3 Weeks",
      impact: "High",
      desc: "Secure OpenAI/Gemini/Claude integration with transient caching and custom post type generation.",
    },
    {
      id: "search-alerts",
      name: "Automated GSC/GA4 Search Intelligence Engine",
      time: "1 Week",
      impact: "High",
      desc: "Daily API ingestion, striking-distance query detection (Pos 5-20), and executive email alerts.",
    },
  ];

  const handleOpenModal = (serviceName = "ai-wordpress-development") => {
    setSelectedService(serviceName);
    setIsLeadModalOpen(true);
  };

  const caseStudies = [
    {
      category: "Enterprise Invariant Architecture",
      icon: Database,
      title: "Omnichannel Lead Invariant Hub & Direct CRM Sync",
      tag: "Zero Data Loss",
      whatWeDid: {
        title: "What We Engineered",
        points: [
          "Engineered a dedicated PHP lead engine (`/wp-content/plugins/*`) enforcing strict Zero-Deletion invariants.",
          "Implemented In-Place GDPR scrubbing to anonymize PII upon request while preserving aggregate conversion telemetry.",
          "Bypassed client-side ad-blockers via direct Server-Side GA4 Measurement Protocol HTTP dispatches.",
          "Established direct, non-blocking webhook connections to enterprise CRMs (Freshsales/HubSpot) with zero third-party SaaS middleware.",
        ],
      },
      problemSolved: {
        title: "The Critical Problem Solved",
        points: [
          "Eliminated silent lead loss caused by fragile third-party automation tools (Zapier/Make) and client-side ad-blockers.",
          "Prevented database bloat by removing multiple overlapping contact form logging plugins.",
          "Resolved GDPR compliance risks with automated, non-destructive PII anonymization routines.",
        ],
      },
      businessBenefits: {
        title: "Measurable Business Benefits",
        points: [
          "100% audit-proof lead capture reliability across all web and chat channels.",
          "Sub-50ms lead dispatch latency directly into executive sales pipelines.",
          "Saved $300–$800/mo in recurring automation subscriptions and middleware overhead.",
        ],
      },
      ctaText: "Discuss Custom Lead Infrastructure",
      ctaService: "enterprise-lead-invariant-hub",
    },
    {
      category: "Autonomous Search & GEO",
      icon: Search,
      title: "Autonomous AEO / GEO Schema & /llms.txt AI Engine",
      tag: "AI & Search Visibility",
      whatWeDid: {
        title: "What We Engineered",
        points: [
          "Engineered dynamic multi-tier JSON-LD schema generation for Articles, FAQs, How-Tos, and Products without bloated plugins.",
          "Integrated automated real-time IndexNow protocol pings triggered immediately on post publish/update.",
          "Generated continuous `/llms.txt` and markdown vector feeds optimized specifically for LLM search engines (Perplexity, ChatGPT Search, Claude).",
          "Structured programmatic topic cluster silos with strict internal linking hierarchies.",
        ],
      },
      problemSolved: {
        title: "The Critical Problem Solved",
        points: [
          "Replaced resource-heavy commercial SEO plugins injecting hundreds of unindexed transients into `wp_options`.",
          "Solved sluggish indexing cycles where new pages took weeks to be discovered and indexed.",
          "Overcame invisibility in modern generative AI search overviews and answer engines.",
        ],
      },
      businessBenefits: {
        title: "Measurable Business Benefits",
        points: [
          "Under-15-minute search indexing latency from the moment content is published.",
          "Elevated citation frequency across generative AI search platforms.",
          "Zero database latency and zero frontend render-blocking scripts.",
        ],
      },
      ctaText: "Explore Autonomous Search Architecture",
      ctaService: "autonomous-aeo-geo-engine",
    },
    {
      category: "Decoupled Modern Frontend",
      icon: Zap,
      title: "Decoupled Headless WordPress with Vite & React SSG",
      tag: "Sub-500ms Speed",
      whatWeDid: {
        title: "What We Engineered",
        points: [
          "Decoupled WordPress into a dedicated headless editorial backend behind an authenticated REST/GraphQL API.",
          "Deployed a high-performance React/Vite Static Site Generated (SSG) frontend distributed across edge CDNs.",
          "Configured automated webhook-driven Incremental Static Regeneration (ISR) on content updates.",
          "Applied Chromium Speculation Rules for instantaneous predictive page prerendering in modern browsers.",
        ],
      },
      problemSolved: {
        title: "The Critical Problem Solved",
        points: [
          "Eliminated 3–5 second server response times (TTFB) common to monolithic, heavily-plugged WordPress themes.",
          "Completely insulated the database and CMS administration panels from public frontend attack surfaces.",
          "Solved fragile visual page builder breakdowns during core WordPress version updates.",
        ],
      },
      businessBenefits: {
        title: "Measurable Business Benefits",
        points: [
          "Consistent sub-500ms global TTFB and perfect 100/100 Google Core Web Vitals scores.",
          "Near-zero server hosting compute costs due to edge-cached static distribution.",
          "Zero disruptions to the editorial team, who continue using the familiar WordPress admin.",
        ],
      },
      ctaText: "Plan Headless Decoupled Migration",
      ctaService: "headless-wordpress-vite-ssg",
    },
    {
      category: "B2B Commerce & Algorithms",
      icon: Calculator,
      title: "Bespoke B2B Dynamic Pricing & Quote Calculation Engine",
      tag: "Custom Algorithms",
      whatWeDid: {
        title: "What We Engineered",
        points: [
          "Engineered mathematical dimensional algorithms (custom material weight, sheet yield, packaging dimensions, tiered MOQs).",
          "Integrated live multi-currency conversion APIs and custom secure client artwork upload pipelines.",
          "Delegated CPU-heavy calculation tasks to asynchronous WordPress `ActionScheduler` background workers.",
          "Constructed high-speed native executive quoting dashboards within the WordPress admin.",
        ],
      },
      problemSolved: {
        title: "The Critical Problem Solved",
        points: [
          "Replaced off-the-shelf e-commerce plugins that crashed or lagged when evaluating complex multi-variable matrices.",
          "Eliminated multi-hour manual quote preparation cycles by enterprise sales teams.",
          "Prevented frontend checkout blocking during complex order configuration.",
        ],
      },
      businessBenefits: {
        title: "Measurable Business Benefits",
        points: [
          "Instant real-time quote generation for complex custom manufacturing and wholesale orders.",
          "Massive reduction in sales cycle turnaround times from days to seconds.",
          "100% custom codebase tailored strictly to proprietary pricing logic with zero licensing fees.",
        ],
      },
      ctaText: "Engineer Custom Calculation Engine",
      ctaService: "b2b-dynamic-pricing-engine",
    },
  ];

  const faqs = [
    {
      q: "Why build a custom AI WordPress plugin instead of using off-the-shelf plugins?",
      a: "Generic marketplace plugins load dozens of unnecessary scripts, store credentials insecurely in option tables, and offer limited functionality because you have less control over their underlying codebase. A bespoke plugin gives you full control, is 100% lightweight, uses secure nonce-verified REST endpoints, and is tailored directly to your business logic with zero recurring licensing fees.",
    },
    {
      q: "How does the Enterprise Lead Invariant architecture prevent lead loss?",
      a: "Standard setups rely on client-side scripts and third-party SaaS middleware that silently fail during API disruptions or when ad-blockers intercept tracking. Our invariant engine commits leads directly to an immutable database ledger first, dispatches conversions via Server-Side GA4 Measurement Protocol, and queues CRM synchronization with automatic retry policies.",
    },
    {
      q: "Can you modernize our existing WordPress site into a Headless Vite/React frontend?",
      a: "Yes. We preserve your existing WordPress admin for effortless content editing by your editorial team while deploying an ultra-fast React/Vite SSG frontend that achieves sub-500ms TTFB and perfect 100/100 Core Web Vitals.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="AI WordPress Development & Custom Plugins | Sarabjeet Rattan"
        description="Scale WordPress with custom AI plugins, OpenAI embeddings, and REST API overhauls. Fixed-scope diagnostic and enterprise engineering from $500."
        keywords={[
          "ai wordpress development",
          "custom wordpress plugins",
          "wordpress rest api",
          "headless wordpress react",
          "wordpress core web vitals",
          "woocommerce performance",
        ]}
        faqItems={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        url="https://sarabjeetrattan.com/ai-wordpress-development"
      />

      <Header onOpenEnquiry={() => handleOpenModal("ai-wordpress-development")} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Pillar • Custom Full-Stack WordPress
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Bespoke WordPress Engineering <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-600">
              For Scale, Speed & Autonomous AI.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            Move beyond fragile drag-and-drop builders and bloated 40-plugin stacks. We engineer production-grade custom PHP plugin architectures, immutable lead invariant hubs, autonomous AEO/GEO indexing engines, and sub-500ms headless frontends built for serious commercial scale.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => handleOpenModal("custom-wordpress-build")}
              className="px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 group"
            >
              Discuss a Custom WordPress Build
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a
              href="#case-studies"
              className="px-6 py-3 rounded-lg border border-border/80 hover:bg-muted/50 text-sm font-medium transition-colors"
            >
              Explore Architectural Solutions ↓
            </a>
          </div>
        </section>

        {/* Infographic: Custom Engineering vs Generic Plugins */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="p-8 md:p-10 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                The Architecture Difference
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Why high-growth enterprises replace generic marketplace plugins with bespoke engineered solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Generic Plugins */}
              <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-semibold">
                  <XCircle className="w-4 h-4" /> Generic Marketplace Plugin Stack
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>
                      <strong>Severe Database Bloat:</strong> Hundreds of unindexed transients, slow SQL queries, and bloated options tables that degrade wp-admin and frontend speed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>
                      <strong>Fragile Third-Party Middleware:</strong> Reliance on external SaaS connectors that silently break during schema changes, dropping critical sales leads.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>
                      <strong>Security & Update Risks:</strong> Exposed REST endpoints and unvetted codebases shared across tens of thousands of public installations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>
                      <strong>Compounding SaaS Tax:</strong> Ongoing monthly subscription fees for dozens of plugins with zero proprietary code ownership.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right: Custom AI Engineering */}
              <div className="p-6 rounded-xl border border-success/30 bg-success/[0.03] space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Bespoke Engineering (Sarabjeet Rattan)
                </div>
                <ul className="space-y-3 text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>
                      <strong>Zero Bloat, Pure Speed:</strong> Single focused PHP plugin namespaces with sub-50ms execution times and native ActionScheduler background workers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>
                      <strong>Guaranteed Lead Invariants:</strong> Immutable database ledgers, Server-Side GA4 Measurement Protocol, and direct bi-directional CRM syncing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>
                      <strong>Autonomous AI & Search Engines:</strong> Native `/llms.txt` vector feeds, real-time IndexNow pings, and rich JSON-LD graph generation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>
                      <strong>100% Code Ownership:</strong> Tailored strictly to your exact business logic with zero recurring plugin licensing fees.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Standardized Architectural Solutions */}
        <section id="case-studies" className="container mx-auto px-4 max-w-5xl mt-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-3">
              Production Architectures
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Four Core Bespoke WordPress Solutions
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              How we engineer critical enterprise workflows from scratch, eliminate technical debt, and maximize commercial return.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, idx) => {
              const IconComponent = study.icon;
              return (
                <div
                  key={idx}
                  className="p-8 md:p-10 rounded-2xl border border-border/80 bg-card/40 hover:border-primary/40 transition-all duration-300 shadow-lg space-y-8"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {study.category}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {study.title}
                        </h3>
                      </div>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold border border-primary/20">
                      {study.tag}
                    </span>
                  </div>

                  {/* 3-Column Grid: What We Did | Problem Solved | Business Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    {/* 1. What We Did */}
                    <div className="p-5 rounded-xl bg-background/60 border border-border/60 space-y-3">
                      <div className="font-semibold text-primary flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                        <Terminal className="w-4 h-4" />
                        {study.whatWeDid.title}
                      </div>
                      <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                        {study.whatWeDid.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5 font-bold">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2. Problem Solved */}
                    <div className="p-5 rounded-xl bg-red-500/[0.02] border border-red-500/20 space-y-3">
                      <div className="font-semibold text-red-500 flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" />
                        {study.problemSolved.title}
                      </div>
                      <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                        {study.problemSolved.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3. Business Benefits */}
                    <div className="p-5 rounded-xl bg-success/[0.02] border border-success/20 space-y-3">
                      <div className="font-semibold text-success flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        {study.businessBenefits.title}
                      </div>
                      <ul className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                        {study.businessBenefits.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-success mt-0.5">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-muted-foreground font-mono">
                      Production-tested architecture • Zero client dependencies • Ready for deployment
                    </div>
                    <Button
                      onClick={() => handleOpenModal(study.ctaService)}
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10 text-xs font-semibold group"
                    >
                      {study.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Pillar Silos Grid */}
        <section id="cluster-guides" className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
                Knowledge Silos & Architecture Teardowns
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Deep WordPress Engineering Guides
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mt-2 md:mt-0">
              Technical breakdowns, code blueprints, and actionable implementation patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offering 1: Custom AI WordPress Plugin Dev */}
            <Link
              to="/insights/ai-wordpress-plugin-development"
              className="group p-8 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Bespoke AI WordPress Plugin Development
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Engineered PHP plugins with OpenAI/Gemini connectors, background cron workers, and custom post type generation tailored to your exact business logic.
                </p>
              </div>
              <div className="pt-6 flex items-center text-sm font-semibold text-primary">
                View Architecture & Scope <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Offering 2: Automated Search & GA4 Alerts */}
            <Link
              to="/insights/automated-search-analytics-reporting"
              className="group p-8 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Automated Search Console & GA4 Intelligence
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Automate daily search data ingestion, detect striking-distance opportunities (Pos 5–20), and schedule weekly prioritized executive email digests.
                </p>
              </div>
              <div className="pt-6 flex items-center text-sm font-semibold text-primary">
                View Architecture & Scope <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Offering 3: Headless WordPress + Vite */}
            <Link
              to="/insights/headless-wordpress-vite-architecture"
              className="group p-8 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Headless WordPress with Vite & React SSG
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Achieve sub-500ms TTFB and perfect 100/100 Core Web Vitals while retaining standard WordPress backend content publishing workflows.
                </p>
              </div>
              <div className="pt-6 flex items-center text-sm font-semibold text-primary">
                View Architecture & Scope <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* Interactive Scope & Feature Estimator */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="p-8 md:p-10 rounded-2xl border border-border/80 bg-gradient-to-br from-card to-background shadow-xl">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
                Interactive Engineering Estimator
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Configure Your Custom WordPress Architecture
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Select the bespoke capabilities your organization requires to estimate turnaround and technical scope.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {featureOptions.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 bg-card/40 hover:border-border"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">{feat.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{feat.desc}</div>
                      <div className="text-[11px] text-primary font-mono mt-1">
                        Timeline: {feat.time} • Priority: {feat.impact}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs shrink-0 ${
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-xl bg-background border border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Configured Scope: {selectedFeatures.length} Architecture Modules Selected
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">
                  Ready to architect and implement your custom solution.
                </div>
              </div>
              <Button
                onClick={() => handleOpenModal("custom-wordpress-estimator")}
                className="w-full sm:w-auto px-6 font-medium shadow-md shadow-primary/20"
              >
                Request Custom Scope Review
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/80 bg-card/50 space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Banner */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <LeadCaptureBanner
            title="Have a Custom WordPress Architecture or Plugin Project?"
            subtitle="Let's build a dedicated, high-performance solution with zero plugin bloat, complete data invariants, and 100% code ownership."
            buttonText="Discuss Your WordPress Architecture"
            onOpenLeadModal={() => handleOpenModal("ai-wordpress-pillar-banner")}
          />
        </section>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={selectedService}
        serviceTitle="WordPress Engineering & Custom Plugin Consultation"
        initialRequirement="Looking for custom full-stack WordPress engineering, bespoke AI plugin development, or custom REST API infrastructure."
      />
    </div>
  );
};

export default AiWordPressDevelopment;
