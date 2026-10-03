import React, { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadModal } from "@/components/ServiceLeadModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  calculateProjectEstimate,
  ProjectType,
  ComplexityLevel,
} from "@/lib/calculator/estimator-engine";
import { siteConfig } from "@/data/content";
import { trackGoogleAdsConversion } from "@/lib/conversion";
import { toast } from "sonner";
import {
  Sparkles,
  Zap,
  Calendar,
  Layers,
  Cpu,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock,
  Code2,
  HelpCircle,
  BarChart3,
  Bot,
} from "lucide-react";

const PROJECT_TYPE_OPTIONS: {
  id: ProjectType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: "N8N_AUTOMATION",
    title: "n8n Workflow Automation",
    subtitle: "Self-hosted Docker pipelines, webhook queues & error recovery",
    icon: Zap,
  },
  {
    id: "AI_WORDPRESS",
    title: "Custom AI WordPress Plugin",
    subtitle: "Bespoke PHP plugin with OpenAI / Gemini API & zero bloat",
    icon: Code2,
  },
  {
    id: "CUSTOM_AI_AGENT",
    title: "Multi-Agent AI System",
    subtitle: "LangGraph / CrewAI state machines with pgvector RAG",
    icon: Cpu,
  },
  {
    id: "CRM_SYNC_ENGINE",
    title: "Two-Way CRM Sync Engine",
    subtitle: "HubSpot, Freshsales & DB two-way sync with zero infinite loops",
    icon: RefreshCw,
  },
  {
    id: "APPS_SCRIPT_ERP",
    title: "Google Apps Script ERP",
    subtitle: "Automated quotation generation, PDF invoices & manager approvals",
    icon: FileSpreadsheet,
  },
];

const INTEGRATION_OPTIONS = [
  { id: "postgresql", label: "PostgreSQL / Supabase" },
  { id: "hubspot", label: "HubSpot CRM" },
  { id: "freshsales", label: "Freshsales CRM" },
  { id: "openai", label: "OpenAI / GPT-4o" },
  { id: "gemini", label: "Google Gemini 2.5/3" },
  { id: "google-drive", label: "Google Drive / Docs" },
  { id: "slack", label: "Slack / Telegram Webhooks" },
  { id: "custom-api", label: "Custom REST Endpoints" },
];

export const ScopeEstimator = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType>("N8N_AUTOMATION");
  const [complexity, setComplexity] = useState<ComplexityLevel>("GROWTH");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    "postgresql",
    "openai",
    "slack",
  ]);
  const [hasCustomAuth, setHasCustomAuth] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const estimate = useMemo(() => {
    return calculateProjectEstimate({
      projectType,
      complexity,
      integrations: selectedIntegrations,
      hasCustomAuth,
    });
  }, [projectType, complexity, selectedIntegrations, hasCustomAuth]);

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyScope = () => {
    const markdown = `# Architecture Blueprint & Delivery Estimate
- **Project Type**: ${projectType}
- **Complexity**: ${complexity}
- **Estimated Timeline**: ~${estimate.estimatedWeeks} Weeks
- **Recommended Stack**: ${estimate.recommendedStack.join(", ")}
- **Key Deliverables**:
${estimate.keyDeliverables.map((d) => `  - ${d}`).join("\n")}
- **Selected Integrations**: ${selectedIntegrations.join(", ") || "None"}

Generated from https://sarabjeetrattan.com/tools/architecture-scope-estimator`;

    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    toast.success("Architecture scope copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const calendlyUrl = `https://calendly.com/srt10/20?a1=${estimate.calendlyPayload}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <SEO
        title="Free System Architecture & Scope Estimator | Sarabjeet Rattan"
        description="Calculate delivery timelines, production tech stack, and safety controls for n8n automations, custom AI plugins, and CRM sync engines instantly."
        keywords={[
          "ai automation cost calculator",
          "n8n consulting project scope",
          "custom wordpress plugin development timeline",
          "crm sync engine cost",
          "multi agent system architecture estimator",
          "google apps script erp quote",
        ]}
        url="https://sarabjeetrattan.com/tools/architecture-scope-estimator"
        type="website"
      />

      <Header onOpenEnquiry={() => setIsLeadModalOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Developer Tools</span>
            <span>/</span>
            <span>Architecture Estimator</span>
          </div>

          {/* Hero */}
          <header className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Zero-Friction • 100% Free & Un-gated
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              System Architecture & Project Scope Estimator
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Select your solution type and connected integrations below to calculate recommended production stacks, safety architecture, and delivery timelines in real-time.
            </p>
          </header>

          {/* CALCULATOR CANVAS */}
          <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-2xl shadow-primary/5 space-y-8">
            {/* STEP 1: SOLUTION TYPE */}
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> 1. Select Solution Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PROJECT_TYPE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = projectType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setProjectType(opt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-md shadow-primary/5"
                          : "bg-background/60 border-border/70 hover:border-border hover:bg-background"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-foreground">
                          {opt.title}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {opt.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: COMPLEXITY & CONNECTED SYSTEMS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-border/60">
              {/* Complexity */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" /> 2. Complexity Tier
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "STARTER", label: "Starter", desc: "1-2 Core Flows" },
                    { id: "GROWTH", label: "Growth", desc: "Multi-Route Pipelines" },
                    { id: "ENTERPRISE_MULTI_SYSTEM", label: "Enterprise", desc: "Failover & Multi-DB" },
                  ].map((c) => {
                    const isSelected = complexity === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setComplexity(c.id as ComplexityLevel)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-primary/10 border-primary text-primary font-bold shadow-sm"
                            : "bg-background/60 border-border/70 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="text-xs font-bold">{c.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{c.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Integrations */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" /> 3. Connected Third-Party Systems ({selectedIntegrations.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEGRATION_OPTIONS.map((item) => {
                    const isSelected = selectedIntegrations.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleIntegration(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? "bg-primary/15 border-primary/50 text-primary font-semibold shadow-xs"
                            : "bg-background/60 border-border/60 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 3: CALCULATED BLUEPRINT CARD */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 space-y-6 shadow-xl shadow-primary/5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
                <div>
                  <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                    Calculated Delivery Estimate
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2.5 mt-1">
                    <Clock className="w-6 h-6 text-primary" />
                    ~{estimate.estimatedWeeks} Weeks to Production
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleCopyScope}
                  className="gap-2 text-xs font-semibold h-10"
                >
                  {isCopied ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {isCopied ? "Copied Markdown Scope" : "Copy Complete Scope"}
                </Button>
              </div>

              {/* Recommended Stack */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground uppercase font-bold">
                  Recommended Production Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {estimate.recommendedStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-background border border-border text-xs font-mono font-semibold text-foreground shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground uppercase font-bold">
                  Key Deliverables & Safety Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {estimate.keyDeliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-background/60 border border-border/60 text-xs text-muted-foreground flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGoogleAdsConversion({ eventLabel: "scope_estimator_page_calendly_click" })}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all group text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 20-Min Architecture Discovery (Scope Attached)</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 text-foreground font-semibold text-sm transition-all text-center"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  <span>Message Sarabjeet on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <section className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Architecture Questions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Transparent answers regarding delivery timelines, production deployments, and maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" /> How are timeline estimates calculated?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Estimates are based on production benchmarks for Docker containerization, webhook queue orchestration, error-recovery mechanisms, and end-to-end integration test coverage.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Do I own the full codebase and infrastructure?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Yes, 100%. All custom n8n workflows, Docker Compose files, custom WordPress plugins, and CRM sync scripts are deployed directly to your private servers or cloud accounts with zero vendor lock-in.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ServiceLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService="custom-automation"
        serviceTitle="System Architecture Consultation"
      />
    </div>
  );
};

export default ScopeEstimator;
