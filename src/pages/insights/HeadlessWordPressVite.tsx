import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Terminal,
  TrendingUp,
  Gauge,
  Lock,
} from "lucide-react";

export const HeadlessWordPressVite = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Headless WordPress & React/Vite SSG Engineering | Sarabjeet Rattan"
        description="Achieve sub-500ms TTFB and 100/100 Core Web Vitals with decoupled Headless WordPress powered by React, Vite Static Site Generation (SSG), and Edge CDNs."
        keywords={[
          "headless wordpress react",
          "vite headless wordpress setup",
          "decoupled wordpress nextjs vs vite",
          "sub 500ms wordpress speed",
          "sub second wordpress page load",
          "headless cms performance",
          "headless wordpress ssg setup",
          "decoupled wordpress vite",
        ]}
        url="https://sarabjeetrattan.com/insights/headless-wordpress-vite-architecture"
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
            <span>Frontend Engineering</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Frontend Architecture • Sub-500ms Speed
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Headless WordPress with Vite & React SSG: Instant Sub-Second Load Times
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Retain the familiar WordPress CMS backend for your editorial team while completely decoupling the frontend with pre-rendered React and Vite Static Site Generation for perfect 100/100 Core Web Vitals and zero security attack surface.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Headless Architecture
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. THE PROBLEM */}
          <section id="monolithic-wordpress-flaws" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> 1. The Critical Problem Solved
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Why Traditional WordPress Themes Harm Conversion Rates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Slow TTFB & Server Lag
                </div>
                <p>Monolithic PHP themes render pages on-the-fly with 40+ database queries per visit, causing 1.5s–3.5s Time-to-First-Byte.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Public Attack Surfaces
                </div>
                <p>Direct exposure of PHP frontend files and theme vulnerabilities account for the vast majority of WordPress security breaches.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Core Web Vitals Penalties
                </div>
                <p>Render-blocking stylesheets and slow Largest Contentful Paint (LCP) directly damage organic search rankings and ad conversions.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & WHAT WE ENGINEER */}
          <section id="headless-ssg-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Terminal className="w-4 h-4" /> 2. What We Engineered (The Solution)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Decoupled Headless SSG Architecture
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineered as part of our core{" "}
              <Link to="/ai-wordpress-development" className="text-primary font-semibold hover:underline">
                AI WordPress development practice
              </Link>
              , we decouple WordPress into a headless CMS API. Pre-rendering every page into pure static HTML + React bundles that load in under 300ms from global edge CDNs, this architecture integrates seamlessly with{" "}
              <Link to="/insights/ai-wordpress-plugin-development" className="text-primary font-semibold hover:underline">
                bespoke AI WordPress plugins
              </Link>{" "}
              and{" "}
              <Link to="/insights/automated-search-analytics-reporting" className="text-primary font-semibold hover:underline">
                automated Google Search Console intelligence
              </Link>{" "}
              for measurable traffic velocity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-primary font-bold font-mono flex items-center gap-2 text-sm">
                  <Gauge className="w-4 h-4" /> Sub-500ms Edge TTFB
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Zero render-blocking scripts, asynchronous font preloading, and instantaneous HTML distribution from global edge nodes.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-blue-500 font-bold font-mono flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" /> Zero Frontend DB Load
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Visitors interact strictly with pre-rendered static assets. Your MySQL database experiences zero load during traffic spikes.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-success font-bold font-mono flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4" /> Total CMS Isolation
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  WordPress administration is locked behind private network controls, completely eliminating public PHP exploit vectors.
                </div>
              </div>
            </div>
          </section>

          {/* 3. MEASURABLE BUSINESS BENEFITS */}
          <section id="performance-gains" className="p-8 rounded-2xl border border-success/20 bg-success/[0.02] space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <TrendingUp className="w-4 h-4" /> 3. Measurable Business Benefits
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Commercial Impact & Performance Gains
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">100/100 Core Web Vitals</div>
                <p className="text-muted-foreground leading-relaxed">
                  Instantaneous paint metrics directly boost organic search rankings and improve paid ad landing page quality scores.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Near-Zero Server Costs</div>
                <p className="text-muted-foreground leading-relaxed">
                  Edge caching reduces server infrastructure requirements by over 80%, effortlessly handling sudden viral traffic surges.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Editorial Continuity</div>
                <p className="text-muted-foreground leading-relaxed">
                  Your content creators and marketing team keep using the familiar WordPress admin UI without needing developer assistance.
                </p>
              </div>
            </div>
          </section>

          {/* 4. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Ready to Modernize Your WordPress Performance?"
              subtitle="Get sub-500ms global load times and impenetrable security while keeping your existing WordPress editorial workflow."
              buttonText="Plan Headless Decoupled Migration"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="headless-wordpress-vite-ssg"
        serviceTitle="Headless WordPress & React/Vite Consultation"
        initialRequirement="Looking to modernize our legacy WordPress site into a decoupled Headless React/Vite architecture with sub-500ms TTFB and perfect Core Web Vitals."
      />
    </div>
  );
};

export default HeadlessWordPressVite;
