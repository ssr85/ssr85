import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Cpu,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Layers,
  Sparkles,
  Lock,
  Code2,
  Terminal,
  Database,
  HelpCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

export const AiWordPressPlugins = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Custom AI WordPress Plugin Development | Sarabjeet Rattan"
        description="Eliminate plugin bloat. We engineer bespoke, production-grade AI WordPress plugins tailored to your proprietary data, APIs, and workflows."
        keywords={[
          "custom ai wordpress plugin development",
          "hire wordpress plugin developer",
          "bespoke wordpress php plugin",
          "wordpress openai rest api integration",
          "hire custom php developer wordpress",
          "wordpress openai api integration",
          "secure wordpress rest api plugin",
          "custom wordpress plugin development cost",
        ]}
        url="https://sarabjeetrattan.com/insights/ai-wordpress-plugin-development"
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
            <span>Bespoke Engineering</span>
          </div>

          {/* Hero */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Custom Engineering • Zero Bloat
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Bespoke AI WordPress Plugin Development: Engineered for Your Proprietary Workflows
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Why settle for generic, bloated marketplace plugins that slow down your database and expose API keys? We build custom, lightweight PHP plugins with OpenAI, Gemini, and Claude connectors tailored to your business.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Custom Plugin Scope
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. THE PROBLEM */}
          <section id="marketplace-plugin-flaws" className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> 1. The Critical Problem Solved
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              The Fatal Flaws of Off-the-Shelf Marketplace Plugins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Database Bloat & Latency
                </div>
                <p>Commercial plugins inject hundreds of unindexed transients, slowing down both frontend TTFB and wp-admin responsiveness.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Security Vulnerabilities
                </div>
                <p>Exposed API keys in frontend scripts and unauthenticated REST endpoints shared across thousands of public installs.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Rigid Vendor Lock-In
                </div>
                <p>Recurring $300–$1,000/yr licenses for rigid features where functionality is limited because you have less control over the underlying code.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & WHAT WE ENGINEER */}
          <section id="custom-plugin-architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Terminal className="w-4 h-4" /> 2. What We Engineered (The Solution)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Custom Plugin Architecture Built from Scratch
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              As part of our specialized{" "}
              <Link to="/ai-wordpress-development" className="text-primary font-semibold hover:underline">
                AI WordPress development practice
              </Link>
              , we engineer dedicated plugins tailored specifically to your data model and REST API endpoints. Paired with decoupled{" "}
              <Link to="/insights/headless-wordpress-vite-architecture" className="text-primary font-semibold hover:underline">
                Headless WordPress with Vite SSG
              </Link>
              , these custom backends can also trigger{" "}
              <Link to="/n8n-workflows" className="text-primary font-semibold hover:underline">
                n8n automated content workflows
              </Link>{" "}
              with zero third-party dependencies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-primary font-bold font-mono flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4" /> Server Nonce Security
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Every request authenticated via secure WordPress nonces (<code className="text-primary">wp_verify_nonce</code>) with encrypted LLM API keys safely stored on the server.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-blue-500 font-bold font-mono flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" /> Async Background Tasks
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Heavy generative pipelines and webhook relays execute asynchronously via ActionScheduler with zero UI freezes or page lag.
                </div>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
                <div className="text-success font-bold font-mono flex items-center gap-2 text-sm">
                  <Code2 className="w-4 h-4" /> Native Custom Post Types
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  Generates structured content directly into your custom post schemas, meta boxes, and REST API controllers with zero database bloat.
                </div>
              </div>
            </div>
          </section>

          {/* 3. MEASURABLE BUSINESS BENEFITS */}
          <section id="measurable-business-benefits" className="p-8 rounded-2xl border border-success/20 bg-success/[0.02] space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <TrendingUp className="w-4 h-4" /> 3. Measurable Business Benefits
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Commercial ROI & Operational Advantages
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">100% Code Ownership</div>
                <p className="text-muted-foreground leading-relaxed">
                  Zero annual subscription fees or vendor lock-in. Full source code delivered directly to your company repository.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Sub-50ms Execution</div>
                <p className="text-muted-foreground leading-relaxed">
                  No bloated third-party stylesheets or telemetry scripts injected into your frontend or admin dashboard.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-1.5">
                <div className="font-bold text-success text-sm">Tailored Integrations</div>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly connects to internal ERPs, proprietary databases, and custom AI models with strict data privacy.
                </p>
              </div>
            </div>
          </section>

          {/* 4. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Ready to Build Your Custom AI WordPress Plugin?"
              subtitle="Eliminate marketplace plugin bloat and recurring license fees with a dedicated, high-performance solution built for your exact specifications."
              buttonText="Request Custom Plugin Scope"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="custom-ai-wordpress-plugin"
        serviceTitle="Custom AI WordPress Plugin Consultation"
      />
    </div>
  );
};

export default AiWordPressPlugins;
