import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  calculateProjectEstimate,
  ProjectType,
  ComplexityLevel,
} from "@/lib/calculator/estimator-engine";
import { siteConfig } from "@/data/content";
import { trackGoogleAdsConversion } from "@/lib/conversion";
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
} from "lucide-react";

interface ArchitectureEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: ProjectType;
}

const PROJECT_TYPE_OPTIONS: {
  id: ProjectType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: "N8N_AUTOMATION",
    title: "n8n Workflow Automation",
    subtitle: "Self-hosted Docker pipelines & webhooks",
    icon: Zap,
  },
  {
    id: "AI_WORDPRESS",
    title: "Custom AI WordPress Plugin",
    subtitle: "Bespoke PHP plugin with OpenAI / Gemini API",
    icon: Code2,
  },
  {
    id: "CUSTOM_AI_AGENT",
    title: "Multi-Agent AI System",
    subtitle: "LangGraph / CrewAI state machines with pgvector",
    icon: Cpu,
  },
  {
    id: "CRM_SYNC_ENGINE",
    title: "Two-Way CRM Sync Engine",
    subtitle: "HubSpot, Freshsales, custom DB sync with no loops",
    icon: RefreshCw,
  },
  {
    id: "APPS_SCRIPT_ERP",
    title: "Google Apps Script ERP",
    subtitle: "Automated quotes, PDF invoices & manager approvals",
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
  { id: "slack", label: "Slack / Telegram Alerts" },
  { id: "custom-api", label: "Custom REST API" },
];

export const ArchitectureEstimatorModal = ({
  isOpen,
  onClose,
  defaultProjectType = "N8N_AUTOMATION",
}: ArchitectureEstimatorModalProps) => {
  const [projectType, setProjectType] = useState<ProjectType>(defaultProjectType);
  const [complexity, setComplexity] = useState<ComplexityLevel>("GROWTH");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    "postgresql",
    "openai",
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
- **Custom Auth/Security**: ${hasCustomAuth ? "Required" : "Standard"}

Generated from https://sarabjeetrattan.com/tools/architecture-scope-estimator`;

    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    toast.success("Architecture scope copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const bookingUrl = `/book?a1=${encodeURIComponent(estimate.calendlyPayload)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto p-0 border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl">
        <div className="p-6 sm:p-8 space-y-6">
          <DialogHeader className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Scope & Architecture Calculator
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Self-Serve Architecture & Delivery Estimator
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure your requirements below to instantly receive an architectural blueprint, recommended stack, and estimated timeline.
            </p>
          </DialogHeader>

          {/* STEP 1: SELECT ARCHITECTURE TYPE */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground">
              1. Select Solution Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROJECT_TYPE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = projectType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProjectType(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-card/60 border-border/70 hover:border-border hover:bg-card"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-xs text-foreground truncate">
                        {opt.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                        {opt.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: COMPLEXITY & INTEGRATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Complexity */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground">
                2. System Complexity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "STARTER", label: "Starter", desc: "Single Pipeline" },
                  { id: "GROWTH", label: "Growth", desc: "Multi-Route" },
                  { id: "ENTERPRISE_MULTI_SYSTEM", label: "Enterprise", desc: "Full Failover" },
                ].map((c) => {
                  const isSelected = complexity === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setComplexity(c.id as ComplexityLevel)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-primary/10 border-primary text-primary font-bold"
                          : "bg-card/60 border-border/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="text-xs font-bold">{c.label}</div>
                      <div className="text-[10px] text-muted-foreground">{c.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Integrations */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground">
                3. Connected Systems ({selectedIntegrations.length})
              </label>
              <div className="flex flex-wrap gap-1.5">
                {INTEGRATION_OPTIONS.map((item) => {
                  const isSelected = selectedIntegrations.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleIntegration(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-primary/15 border-primary/40 text-primary font-semibold"
                          : "bg-card/60 border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 3: INSTANT CALCULATED ARCHITECTURE BLUEPRINT */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 space-y-4 shadow-lg shadow-primary/5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground">
                  Estimated Build Timeline
                </span>
                <div className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  ~{estimate.estimatedWeeks} Weeks Delivery
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyScope}
                  className="text-xs h-9 gap-1.5"
                >
                  {isCopied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {isCopied ? "Copied" : "Copy Scope"}
                </Button>
              </div>
            </div>

            {/* Recommended Stack */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-bold">
                Recommended Production Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {estimate.recommendedStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-background/80 border border-border text-xs font-mono font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-muted-foreground uppercase font-bold">
                Key Deliverables & Safety Controls
              </div>
              <ul className="space-y-1">
                {estimate.keyDeliverables.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <Link
                to={bookingUrl}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 hover:bg-primary/90 transition-all group text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 20-Min Discovery (Scope Pre-Attached)</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-card border border-border/80 hover:border-blue-500/50 text-foreground font-semibold text-xs sm:text-sm transition-all text-center"
              >
                <ExternalLink className="w-4 h-4 text-blue-500" />
                <span>Discuss on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
