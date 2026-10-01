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
  Cpu,
  Sparkles,
  ArrowRight,
  HardDrive,
  Database,
  ShieldCheck,
  Zap,
  Terminal,
  Server,
  Layers,
  CheckCircle2,
  Lock,
  Search,
} from "lucide-react";

export const CustomAiSolutions = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("custom-ai-solutions");

  // Local LLM & Agent Configurator state
  const [modelType, setModelType] = useState<"local" | "cloud" | "hybrid">("local");
  const [concurrencyTier, setConcurrencyTier] = useState<"small" | "medium" | "enterprise">("medium");

  const handleOpenModal = (serviceName = "custom-ai-solutions") => {
    setSelectedService(serviceName);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Custom AI Solutions & Autonomous Systems | Sarabjeet Rattan"
        description="Bespoke AI systems: Local LLM deployment with LM Studio, multi-agent orchestration, custom vector databases, and proprietary lead scraping engines."
        keywords={[
          "custom ai solutions",
          "hire ai engineer",
          "build ai agent from scratch",
          "local llm coding",
          "lm studio local ai setup",
          "multi agent orchestration",
          "custom session storage engine",
        ]}
        url="https://sarabjeetrattan.com/custom-ai-solutions"
      />

      <Header onOpenEnquiry={() => handleOpenModal("custom-ai-solutions")} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Pillar • Bespoke AI Architectures
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Custom AI & Agentic Systems <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-600">
              Engineered From Scratch.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
            Stop relying on generic AI wrappers with runaway cloud token bills. We build custom multi-agent orchestration frameworks, local LLM inference engines via LM Studio, and high-velocity proprietary scraping pipelines tailored to your enterprise data.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => handleOpenModal("custom-ai-consultation")}
              className="px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 group"
            >
              Discuss Custom AI Architecture
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a
              href="#cluster-guides"
              className="px-6 py-3 rounded-lg border border-border/80 hover:bg-muted/50 text-sm font-medium transition-colors"
            >
              View Local LLM & Agent Guides ↓
            </a>
          </div>
        </section>

        {/* Infographic: Local Inference vs Cloud API Cost */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="p-8 md:p-10 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Local LLM Inference vs. Cloud Token Tax
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Why modern engineering teams run quantized local models (Qwen, DeepSeek, Llama) with LM Studio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono font-bold">
                  $0
                </div>
                <h3 className="font-bold text-foreground text-base">Zero Recurring API Costs</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Local quantized models (GGUF 4-bit/8-bit) run on standard workstation GPUs (Apple Silicon / RTX 4090) with zero per-token cloud billing.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-mono font-bold">
                  100%
                </div>
                <h3 className="font-bold text-foreground text-base">Complete Data Residency</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Proprietary codebase snippets, sensitive client data, and CRM records never leave your local infrastructure or private VPC.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-mono font-bold">
                  &lt;15ms
                </div>
                <h3 className="font-bold text-foreground text-base">Zero Network Latency</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Direct local socket communication at <code className="text-primary font-mono text-[11px]">http://localhost:1234/v1</code> eliminates cloud cold starts and network jitter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Cluster Silos Grid */}
        <section id="cluster-guides" className="container mx-auto px-4 max-w-5xl mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
                Technical Blueprints & Silos
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Deep Custom AI Engineering Guides
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mt-2 md:mt-0">
              In-depth technical guides targeting real search demand and architecture blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guide 1: LM Studio Local LLM Workflow */}
            <Link
              to="/insights/local-llm-lm-studio-workflow"
              className="group p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <HardDrive className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  Running Local LLMs with LM Studio for Autonomous Coding
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  How to download quantized models (Qwen 2.5 Coder, DeepSeek-R1), configure local API servers, and wire IDEs for zero-cost private development.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-primary">
                Read Architectural Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Guide 2: Multi-Agent Systems From Scratch */}
            <Link
              to="/insights/multi-agent-orchestration-from-scratch"
              className="group p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  Multi-Agent Orchestration Built From Scratch
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Designing multi-agent decision trees, shared state stores, and human-in-the-loop review checkpoints that eliminate runaway agent loops.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-primary">
                Read Architectural Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Guide 3: Custom Session Storage & Scraping Engines */}
            <Link
              to="/insights/custom-session-storage-engines"
              className="group p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  High-Velocity Scraping & Custom Session Engines
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Case study breakdown of Lead OG: How custom session caching, rate-limit bypassing, and CRM deduplication algorithms accelerated lead processing by 70%.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-primary">
                Read Architectural Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* Lead Capture Banner */}
        <section className="container mx-auto px-4 max-w-5xl mt-20">
          <LeadCaptureBanner
            title="Need a Custom AI or Local Agentic Pipeline Built?"
            subtitle="Let's build a dedicated, private AI architecture tailored to your proprietary data with zero cloud vendor lock-in."
            buttonText="Schedule AI Architecture Review"
            onOpenLeadModal={() => handleOpenModal("custom-ai-pillar-banner")}
          />
        </section>
      </main>

      <Footer />

      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={selectedService}
        serviceTitle="Custom AI & Agentic Systems Consultation"
      />
    </div>
  );
};

export default CustomAiSolutions;
