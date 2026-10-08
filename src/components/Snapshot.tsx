import { useState } from "react";
import { snapshotCards, type SnapshotCard } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target, Sparkles, ChevronRight, CheckCircle2, ArrowRight, Layers, Minus } from "lucide-react";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const iconMap: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  Briefcase: { icon: <Briefcase className="h-5 w-5" />, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  Code: { icon: <Code className="h-5 w-5" />, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" },
  TrendingUp: { icon: <TrendingUp className="h-5 w-5" />, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  Target: { icon: <Target className="h-5 w-5" />, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
};

const springTransition = { type: "spring" as const, stiffness: 320, damping: 28 };

interface SnapshotProps {
  onOpenEnquiry?: () => void;
}

export const Snapshot = ({ onOpenEnquiry }: SnapshotProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleCtaClick = (e: React.MouseEvent, card: SnapshotCard) => {
    e.stopPropagation();
    if (card.ctaHref === "#services" && onOpenEnquiry) {
      e.preventDefault();
      onOpenEnquiry();
      return;
    }
    if (card.ctaHref.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(card.ctaHref);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="snapshot" className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      <EngineeringGrid />

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/[0.04] dark:bg-primary/[0.06] blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Section Header with Eyebrow Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="badge-eyebrow">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>16+ Year Career Span</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
              Executive Snapshot
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl font-normal">
              A progressive overview of technical leadership, agentic AI architecture, and global industrial scale.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>Zero AI Hallucinations</span>
          </div>
        </div>

        {/* Double-Bezel Bento Grid */}
        <LayoutGroup>
          <motion.div
            layout
            transition={springTransition}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {snapshotCards.map((card, index) => {
              const iconData = iconMap[card.icon] || iconMap.Briefcase;
              const isExpanded = expandedIndex === index;
              const isLarge = (index === 0 || index === 3) && !isExpanded;

              return (
                <motion.div
                  key={card.title}
                  layout
                  transition={springTransition}
                  className={cn(
                    "transition-all duration-300",
                    isExpanded ? "col-span-1 md:col-span-2 lg:col-span-3" : isLarge ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1"
                  )}
                >
                  <div
                    onClick={() => handleExpand(index)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleExpand(index);
                      }
                    }}
                    className={cn(
                      "double-bezel group cursor-pointer h-full transition-all duration-300 active:scale-[0.99]",
                      isExpanded
                        ? "ring-2 ring-primary/50 shadow-2xl bg-card/90"
                        : "hover:border-primary/40 hover:shadow-xl"
                    )}
                  >
                    <div className="double-bezel-inner h-full flex flex-col justify-between p-6 md:p-8">
                      {/* Top Bar: Icon + Monospace Badge + Expand Indicator */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border",
                            iconData.bg,
                            iconData.color,
                            iconData.border,
                            "group-hover:scale-105"
                          )}>
                            {iconData.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/80 bg-foreground/[0.04] px-2.5 py-0.5 rounded-full border border-foreground/10">
                              {card.focus}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[11px] font-medium transition-colors hidden sm:inline-block",
                            isExpanded ? "text-primary font-semibold" : "text-muted-foreground/70 group-hover:text-foreground"
                          )}>
                            {isExpanded ? "Collapse Spec" : "Expand Spec"}
                          </span>
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border border-foreground/10",
                            isExpanded
                              ? "bg-primary text-primary-foreground rotate-180"
                              : "bg-foreground/[0.03] text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
                          )}>
                            {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                          </div>
                        </div>
                      </div>

                      {/* Header Title */}
                      <div className="space-y-2">
                        <h3 className={cn(
                          "font-bold text-foreground tracking-tight transition-colors group-hover:text-primary",
                          isExpanded ? "text-2xl md:text-3xl" : isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                        )}>
                          {card.title}
                        </h3>
                        <p className={cn(
                          "text-muted-foreground leading-relaxed font-normal",
                          isExpanded ? "text-base md:text-lg max-w-3xl" : isLarge ? "text-sm md:text-base" : "text-xs md:text-sm"
                        )}>
                          {card.description}
                        </p>
                      </div>

                      {/* ═══════════════════ EXPANDED CAREER DEEP-DIVE ═══════════════════ */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="border-t border-border/60 pt-6 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                              {/* Left Column: Context Narrative & Action CTA */}
                              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                                <div className="space-y-4">
                                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                                    <Layers className="w-3.5 h-3.5" />
                                    <span>Career Context &amp; Architecture</span>
                                  </div>
                                  <div className="p-4 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/5 text-sm text-foreground/90 leading-relaxed">
                                    {card.extendedSummary}
                                  </div>
                                </div>

                                <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                                  {card.ctaHref.startsWith("/") ? (
                                    <Link
                                      to={card.ctaHref}
                                      onClick={(e) => handleCtaClick(e, card)}
                                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:gap-3"
                                    >
                                      <span>{card.ctaText}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                  ) : (
                                    <a
                                      href={card.ctaHref}
                                      onClick={(e) => handleCtaClick(e, card)}
                                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:gap-3"
                                    >
                                      <span>{card.ctaText}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </div>

                              {/* Right Column: Capabilities, Metrics & Stack */}
                              <div className="lg:col-span-7 space-y-6">
                                {/* Metrics Strip */}
                                <div>
                                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5 font-semibold">
                                    Quantified Career Metrics
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {card.metrics.map((metric, idx) => (
                                      <div
                                        key={idx}
                                        className="p-3 rounded-xl bg-card border border-border/80 flex flex-col justify-center text-center shadow-xs"
                                      >
                                        <div className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                                          {metric.value}
                                        </div>
                                        <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 leading-tight font-medium">
                                          {metric.label}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Core Capabilities */}
                                <div className="space-y-2.5">
                                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                                    Execution Capabilities
                                  </div>
                                  <ul className="space-y-2">
                                    {card.capabilities.map((cap, idx) => (
                                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span>{cap}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technology & Protocols Stack */}
                                <div className="space-y-2">
                                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                                    Tooling &amp; Frameworks
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {card.technologies.map((tech) => (
                                      <span
                                        key={tech}
                                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-foreground/[0.04] dark:bg-white/[0.04] border border-foreground/10 text-muted-foreground"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Collapsed Footer Affordance */}
                      {!isExpanded && (
                        <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground/80 group-hover:text-primary transition-colors">
                          <span className="font-mono text-[11px] font-medium tracking-wide">
                            + View Career Evidence &amp; Metrics
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

