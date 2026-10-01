import { Link } from "react-router-dom";
import { services } from "@/data/content";
import { Settings, Code, Globe, Compass, ArrowUpRight, ArrowRight, Sparkles, Wrench, CheckCircle2, Shield, Zap } from "lucide-react";
import { ScrollAnimationWrapper, StaggeredCard } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { Button } from "@/components/ui/button";

interface ServicesProps {
  onOpenEnquiry: () => void;
}

interface ServiceCardData {
  title: string;
  scope: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  deliverables: string[];
  link?: string;
}

const serviceCards: ServiceCardData[] = [
  {
    title: "Custom AI & Agentic Systems",
    scope: "Autonomous LLM Ops",
    description: "Multi-agent orchestration, local LLM deployments via LM Studio, and high-velocity proprietary scraping pipelines built from scratch.",
    icon: <Code className="h-6 w-6 text-primary" />,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    deliverables: ["CrewAI & LangGraph Multi-Agents", "Local LLM Deployments (LM Studio)", "High-Velocity Scraping Engines"],
    link: "/custom-ai-solutions",
  },
  {
    title: "AI WordPress & Plugin Engineering",
    scope: "Headless & Custom PHP",
    description: "Bespoke PHP plugins, lightweight executive admin dashboards, and headless React/Vite frontends with sub-500ms TTFB.",
    icon: <Settings className="h-6 w-6 text-secondary" />,
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    deliverables: ["Bespoke Enterprise Plugins", "Executive Admin Dashboards", "Headless React + Vite Frontends"],
    link: "/ai-wordpress-development",
  },
  {
    title: "Bespoke Business & CRM Automation",
    scope: "Two-Way Sync & ERP",
    description: "Two-way Freshsales/HubSpot CRM sync engines, enterprise Google Apps Script workflows, and automated quotation pipelines.",
    icon: <Globe className="h-6 w-6 text-accent" />,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    deliverables: ["Freshsales & HubSpot Sync Engines", "Google Apps Script ERP Workflows", "Automated Quotation Pipelines"],
    link: "/custom-business-automation",
  },
  {
    title: "Operations & Architecture Strategy",
    scope: "Audits & Scale Roadmaps",
    description: "Comprehensive technical and operational audits yielding actionable blueprints to eliminate manual bottlenecks and accelerate scale.",
    icon: <Compass className="h-6 w-6 text-primary" />,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    deliverables: ["Operational Bottleneck Audits", "Scalable Tech Architecture", "Unit Economics Calibration"],
  },
];

export const Services = ({ onOpenEnquiry }: ServicesProps) => {
  return (
    <section id="services" className="py-24 md:py-36 px-4 bg-background relative border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container mx-auto relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <ScrollAnimationWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="badge-eyebrow">
              <Wrench size={11} className="text-primary" />
              Specialist Capabilities & Scopes
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Services & Deployments.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
              Targeted architectural engagements designed to eliminate operational debt, deploy agentic intelligence, and scale B2B systems.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* 4-Tier Standout Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {serviceCards.map((service, index) => {
            return (
              <StaggeredCard key={service.title} index={index}>
                <div className="double-bezel p-1.5 rounded-[2rem] h-full group hover:scale-[1.02] transition-all duration-300">
                  <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-6 md:p-7 h-full flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      {/* Card Header Telemetry */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl border ${service.bg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                          0{index + 1} //
                        </span>
                      </div>

                      {/* Scope Badge */}
                      <div className="inline-block">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-primary font-bold">
                          {service.scope}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Deliverables List */}
                      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                        <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider block">
                          Key Deliverables:
                        </span>
                        {service.deliverables.map((del, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-tight">
                            <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      {service.link ? (
                        <Link
                          to={service.link}
                          className="inline-flex w-full items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-xs font-mono font-medium text-foreground transition-all group/link"
                        >
                          <span>View Blueprint</span>
                          <span className="btn-icon-pod bg-primary/15 text-primary">
                            <ArrowUpRight size={12} />
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={onOpenEnquiry}
                          className="inline-flex w-full items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-xs font-mono font-medium text-foreground transition-all group/btn"
                        >
                          <span>Request Audit</span>
                          <span className="btn-icon-pod bg-primary/15 text-primary">
                            <ArrowRight size={12} />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </StaggeredCard>
            );
          })}
        </div>

        {/* Grand High-Visibility Floating CTA Banner */}
        <ScrollAnimationWrapper delay={200}>
          <div className="double-bezel p-2 rounded-[2.5rem] shadow-2xl shadow-primary/5">
            <div className="double-bezel-inner rounded-[calc(2.5rem-0.5rem)] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-primary/[0.04]">
              <div className="space-y-3 text-center lg:text-left max-w-xl">
                <span className="badge-eyebrow">
                  <Zap size={11} className="text-primary" />
                  Initiate Engagement
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Ready to engineer an autonomous edge or eliminate operational bottlenecks?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Available for custom agentic AI systems, enterprise WordPress architectures, and high-velocity workflow automation.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  size="lg"
                  onClick={onOpenEnquiry}
                  className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-2xl shadow-primary/25 group inline-flex items-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <span>Discuss Your Requirements</span>
                  <span className="btn-icon-pod bg-black/20 text-primary-foreground">
                    <ArrowRight size={15} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

      </div>
    </section>
  );
};
