import React, { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { LeadCaptureBanner } from "@/components/LeadCaptureBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bot,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  GitBranch,
} from "lucide-react";

export const MultiAgentSystems = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Custom Multi-Agent Orchestration & Systems | Sarabjeet Rattan"
        description="We architect deterministic multi-agent systems: Specialized research, extraction, synthesis, and human-in-the-loop validation with zero infinite loops."
        keywords={[
          "custom ai agent development",
          "multi agent system from scratch",
          "langgraph crewai architecture",
          "hire ai agent developer",
          "human in the loop ai agent",
        ]}
        url="https://sarabjeetrattan.com/insights/multi-agent-orchestration-from-scratch"
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
              Agentic Engineering • Deterministic Workflows
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Custom Multi-Agent Systems: Autonomous Execution with Full Human Control
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop deploying fragile, single-prompt AI wrappers that hallucinate and loop indefinitely. We engineer structured, deterministic multi-agent state machines with specialized roles, state persistence, and human-in-the-loop review checkpoints.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-6 font-semibold shadow-xl shadow-primary/20 group"
              >
                Discuss Multi-Agent Architecture
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </header>

          {/* 1. THE PROBLEM */}
          <section className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4" /> The Business Problem
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Why Naive Single-Agent Scripts Fail in Production
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Infinite Reasoning Loops
                </div>
                <p>Uncontrolled agents get trapped in endless API calls, burning thousands of dollars in cloud tokens without completing the task.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Context Pollution & Hallucination
                </div>
                <p>Stuffing 50 different instructions into one prompt causes the model to ignore critical constraints and invent fake data.</p>
              </div>
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 space-y-2">
                <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Zero Human Safeguards
                </div>
                <p>Lack of approval gates means autonomous agents can execute irreversible database mutations or email clients without review.</p>
              </div>
            </div>
          </section>

          {/* 2. THE SOLUTION & ARCHITECTURE */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-success font-mono text-xs uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-4 h-4" /> The Engineered Solution
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Role-Specialized Multi-Agent State Machine
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We divide complex business operations into focused, single-responsibility agents coordinated through a persistent state graph with explicit gating rules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-primary font-bold">1. Research & Extraction</div>
                <div className="text-muted-foreground font-sans">
                  Gathers live data, searches web sources, and parses messy schemas into clean JSON.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-blue-500 font-bold">2. Synthesis & Logic</div>
                <div className="text-muted-foreground font-sans">
                  Executes deterministic business logic, calculates pricing, and drafts proposals.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/80 space-y-1.5">
                <div className="text-success font-bold">3. Validation & Sign-off</div>
                <div className="text-muted-foreground font-sans">
                  Validates schemas against strict type definitions and gates external execution for human approval.
                </div>
              </div>
            </div>
          </section>

          {/* 3. HOW WE HELP */}
          <section className="p-8 rounded-2xl border border-border/80 bg-card/60 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
              <Zap className="w-4 h-4" /> Engagement Deliverables
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              How We Deliver Your Agentic System
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-primary font-bold">Stage 1: Workflow Design</div>
                <h3 className="font-bold text-foreground text-sm">Decision Trees & State Graph</h3>
                <p className="text-xs text-muted-foreground">
                  Mapping out exact agent roles, data schemas, transition conditions, and timeout bounds.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-500 font-bold">Stage 2: Custom Engine</div>
                <h3 className="font-bold text-foreground text-sm">Full Implementation & Tooling</h3>
                <p className="text-xs text-muted-foreground">
                  Building custom tool integrations (CRM, APIs, databases) with localized retry loops.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-success font-bold">Stage 3: Safeguards</div>
                <h3 className="font-bold text-foreground text-sm">Human-in-the-Loop Gateways</h3>
                <p className="text-xs text-muted-foreground">
                  Interactive dashboard or Slack/Email approval triggers for complete operational safety.
                </p>
              </div>
            </div>
          </section>

          {/* 4. CALL TO ACTION */}
          <section className="pt-4">
            <LeadCaptureBanner
              title="Need a Custom Multi-Agent System Engineered for Your Business?"
              subtitle="Let's build a dedicated, reliable agentic system with deterministic execution and full auditability."
              buttonText="Discuss Multi-Agent Architecture"
              onOpenLeadModal={() => setIsLeadModalOpen(true)}
            />
          </section>
        </article>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="multi-agent-systems"
        serviceTitle="Multi-Agent System Architecture Consultation"
      />
    </div>
  );
};

export default MultiAgentSystems;
