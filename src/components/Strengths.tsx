import { useState, useEffect, useRef } from "react";
import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf, Zap, ArrowUpRight, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface StrengthDetail {
  title: string;
  description: string;
  icon: string;
  focus: string;
  pillars: string[];
  metricLabel: string;
  metricValue: string;
}

const detailedStrengths: StrengthDetail[] = [
  {
    title: "Strategic Architecture",
    description: "Translating abstract vision into executable roadmaps: market entry modeling, precise product positioning, and scaling milestones that bridge operational logic with modern technology.",
    icon: "Compass",
    focus: "Roadmaps & Go-To-Market",
    pillars: ["Market Entry Modeling", "Product-Market Fit Calibration", "Multi-Year Milestone Architecture"],
    metricLabel: "Strategic Foresight",
    metricValue: "16+ Yrs",
  },
  {
    title: "Operational Rigor",
    description: "Engineering resilient process design, aggressive cost optimization, and systemic controls to eliminate bottlenecks and maximize throughput across high-growth B2B ventures.",
    icon: "Settings",
    focus: "Efficiency & Throughput",
    pillars: ["Bottleneck Elimination", "Aggressive Cost Optimization", "Systemic KPI Telemetry"],
    metricLabel: "Throughput Gain",
    metricValue: "Exponential",
  },
  {
    title: "Executive Leadership",
    description: "Assembling, mentoring, and aligning high-performance cross-functional engineering, sales, and operations teams to deliver against ambitious multi-year targets.",
    icon: "Users",
    focus: "Team Alignment & Scale",
    pillars: ["Cross-Functional Mentorship", "High-Trust Cadence & OKRs", "Talent & Culture Scaling"],
    metricLabel: "Global Alignments",
    metricValue: "250+ Engagements",
  },
  {
    title: "Global Expansion",
    description: "Unlocking new revenue channels and securing strategic partnerships for aggressive domestic and international market expansion across 4 continents.",
    icon: "Rocket",
    focus: "International B2B Scale",
    pillars: ["Cross-Border Distribution", "Strategic Partner Ecosystems", "Regulatory & GTM Compliance"],
    metricLabel: "Market Reach",
    metricValue: "4 Continents",
  },
  {
    title: "System Integration",
    description: "Replacing operational debt with highly repeatable systems, utilizing modern SaaS architectures, two-way CRM sync engines, and bespoke AI workflows.",
    icon: "Cpu",
    focus: "SaaS & Bespoke Automation",
    pillars: ["Two-Way CRM Sync Engines", "API & Webhook Orchestration", "Zero-Debt Cloud Architectures"],
    metricLabel: "Pipeline Automation",
    metricValue: "100% Custom",
  },
  {
    title: "Sustainable Economics",
    description: "Designing modern business models that rigorously balance aggressive unit-level profitability with long-term environmental and operational sustainability.",
    icon: "Leaf",
    focus: "Profitability & Resilience",
    pillars: ["Circular Supply Chain Optimization", "Unit Economic Viability", "Carbon-Aware Product Development"],
    metricLabel: "Margin Resilience",
    metricValue: "Long-Term",
  },
];

const iconMap: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Compass: { icon: <Compass className="h-5 w-5 text-primary" />, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  Settings: { icon: <Settings className="h-5 w-5 text-secondary" />, color: "text-secondary", bg: "bg-secondary/10 border-secondary/20" },
  Users: { icon: <Users className="h-5 w-5 text-accent" />, color: "text-accent", bg: "bg-accent/10 border-accent/20" },
  Rocket: { icon: <Rocket className="h-5 w-5 text-primary" />, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  Cpu: { icon: <Cpu className="h-5 w-5 text-secondary" />, color: "text-secondary", bg: "bg-secondary/10 border-secondary/20" },
  Leaf: { icon: <Leaf className="h-5 w-5 text-accent" />, color: "text-accent", bg: "bg-accent/10 border-accent/20" },
};

export const Strengths = () => {
  const [selectedStrengthIndex, setSelectedStrengthIndex] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeStrength = detailedStrengths[selectedStrengthIndex] || detailedStrengths[0];

  // Calculate top-alignment with the card PREVIOUS to the selected card
  useEffect(() => {
    const updateTargetPosition = () => {
      const previousIndex = Math.max(0, selectedStrengthIndex - 1);
      const targetEl = cardRefs.current[previousIndex];
      if (targetEl) {
        setTargetY(targetEl.offsetTop);
      }
    };

    updateTargetPosition();
    window.addEventListener("resize", updateTargetPosition);
    return () => window.removeEventListener("resize", updateTargetPosition);
  }, [selectedStrengthIndex]);

  // Scroll-linked Intersection Observer for LHS cards
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSelectedStrengthIndex(index);
            }
          });
        },
        {
          rootMargin: "-20% 0px -40% 0px",
          threshold: 0.2,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToStrength = (index: number) => {
    setSelectedStrengthIndex(index);
    const target = cardRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderMobileStrength = (item: StrengthDetail, index: number, isActive: boolean) => {
    const iconData = iconMap[item.icon] || { icon: <Zap className="h-5 w-5 text-primary" />, color: "text-primary", bg: "bg-primary/10 border-primary/20" };

    return (
      <div
        className={cn(
          "double-bezel p-1.5 rounded-[2rem] transition-all duration-300",
          isActive ? "opacity-100 scale-[1.01] shadow-2xl shadow-primary/10" : "opacity-60 scale-[0.98]"
        )}
      >
        <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="badge-eyebrow text-[10px]">
              0{index + 1} // {item.focus}
            </span>
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              {item.metricValue}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl border ${iconData.bg} flex items-center justify-center shrink-0`}>
              {iconData.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.focus}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {item.description}
          </p>

          <div className="space-y-1.5 pt-3 border-t border-white/[0.08]">
            {item.pillars.map((pillar, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                <CheckCircle2 size={13} className="text-primary shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="strengths" className="py-24 md:py-36 px-4 bg-background relative border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollAnimationWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <span className="badge-eyebrow">
                <Zap size={11} className="text-primary" />
                Execution Framework
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Core Strengths.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light max-w-xl">
                Competencies forged over 16+ years of operational leadership, bridging strategic foresight with hands-on systems architecture.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 px-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xl font-bold font-mono text-primary">16+</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Years Rigor</div>
              </div>
              <div className="p-3 px-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xl font-bold font-mono text-secondary">250+</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Engagements</div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Desktop Top-Aligned Dynamic Tracking Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start relative min-h-[600px] pb-20">
          
          {/* Left Column: Natural Scrolling Stream of Strength Cards */}
          <div className="col-span-5 space-y-6">
            {detailedStrengths.map((strength, idx) => {
              const isSelected = idx === selectedStrengthIndex;
              const iconData = iconMap[strength.icon] || { icon: <Zap className="h-5 w-5 text-primary" />, color: "text-primary", bg: "bg-primary/10 border-primary/20" };

              return (
                <div
                  key={strength.title}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  onClick={() => scrollToStrength(idx)}
                  className={cn(
                    "p-6 rounded-[1.75rem] transition-all duration-500 cursor-pointer border relative group",
                    isSelected
                      ? "bg-white/[0.08] border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/30 scale-[1.02] opacity-100"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] opacity-45 hover:opacity-85 scale-[0.99]"
                  )}
                >
                  {/* Header Telemetry */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        isSelected ? "bg-primary animate-pulse" : "bg-muted-foreground/40"
                      )} />
                      0{idx + 1} // {strength.focus}
                    </span>
                    <span className={cn(
                      "font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors",
                      isSelected 
                        ? "text-primary bg-primary/15 border-primary/30" 
                        : "text-muted-foreground bg-white/[0.03] border-white/[0.06]"
                    )}>
                      {strength.metricValue}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border ${iconData.bg} flex items-center justify-center shrink-0`}>
                        {iconData.icon}
                      </div>
                      <h4 className={cn(
                        "text-xl font-bold tracking-tight transition-colors",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {strength.title}
                      </h4>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={cn(
                        "transition-transform duration-300",
                        isSelected
                          ? "text-primary translate-x-0.5 -translate-y-0.5 scale-110"
                          : "text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5"
                      )}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {strength.description}
                  </p>

                  {/* Pillars Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.05]">
                    {strength.pillars.slice(0, 2).map((pillar, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-foreground/70"
                      >
                        {pillar}
                      </span>
                    ))}
                    {strength.pillars.length > 2 && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md text-muted-foreground">
                        +{strength.pillars.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Gliding Top-Aligned Inspector Window */}
          <div className="col-span-7 relative h-full">
            <motion.div
              animate={{ y: targetY }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
                mass: 0.7,
              }}
              className="will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStrength.title}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="double-bezel p-1.5 rounded-[2.25rem] shadow-2xl shadow-black/60"
                >
                  <div className="double-bezel-inner rounded-[calc(2.25rem-0.375rem)] p-7 md:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="badge-eyebrow text-[10px]">
                            {activeStrength.focus}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                            {activeStrength.metricLabel}: <strong className="text-foreground">{activeStrength.metricValue}</strong>
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                          {activeStrength.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-light">
                          {activeStrength.description}
                        </p>
                      </div>

                      {/* Execution Pillars Board */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-1.5 text-primary font-mono text-[10px] uppercase tracking-wider">
                          <ShieldCheck size={13} />
                          <span>Execution Pillars & Deliverables</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeStrength.pillars.map((pillar, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5"
                            >
                              <CheckCircle2 size={15} className="text-primary shrink-0" />
                              <span className="text-xs font-semibold text-foreground/85">{pillar}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real-World Impact telemetry */}
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <TrendingUp size={13} className="text-secondary" />
                            Operational Value Added
                          </span>
                          <span className="font-mono text-xs font-bold text-secondary">
                            High ROI
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Applied systematically to ensure scalable governance, predictable margins, and repeatable systems across all client engagements.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>Executive Leadership // Sarabjeet Rattan</span>
                      <span>Pillar 0{selectedStrengthIndex + 1} of {detailedStrengths.length}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden -mx-4 px-4">
          <Carousel
            items={detailedStrengths}
            renderItem={renderMobileStrength}
            className="pb-2"
          />
        </div>
      </div>
    </section>
  );
};
