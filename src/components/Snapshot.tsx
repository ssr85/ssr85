import { useState } from "react";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target, Sparkles, ChevronRight } from "lucide-react";
import { motion, LayoutGroup } from "motion/react";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Briefcase: { icon: <Briefcase className="h-6 w-6" />, color: "text-primary", bg: "bg-primary/10" },
  Code: { icon: <Code className="h-6 w-6" />, color: "text-secondary", bg: "bg-secondary/10" },
  TrendingUp: { icon: <TrendingUp className="h-6 w-6" />, color: "text-success", bg: "bg-success/10" },
  Target: { icon: <Target className="h-6 w-6" />, color: "text-primary", bg: "bg-primary/10" },
};

const springTransition = { type: "spring" as const, stiffness: 350, damping: 30 };

export const Snapshot = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
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
              <span>Core Architecture</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
              Executive Snapshot
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl font-normal">
              16+ years bridging complex industrial business logic with autonomous agentic systems.
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
              const isLarge = index === 0 || index === 3;

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
                      "double-bezel group cursor-pointer h-full transition-all duration-300 active:scale-[0.985]",
                      isExpanded ? "ring-2 ring-primary/40" : "hover:border-primary/40 hover:shadow-2xl"
                    )}
                  >
                    <div className="double-bezel-inner h-full flex flex-col justify-between p-6 md:p-8">
                      {/* Top Bar: Icon + Monospace Badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                          iconData.bg,
                          iconData.color
                        )}>
                          {iconData.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/70 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5">
                          {card.focus}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2 mt-auto">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "font-bold text-foreground tracking-tight transition-colors group-hover:text-primary",
                            isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                          )}>
                            {card.title}
                          </h3>
                          <ChevronRight className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary shrink-0 ml-2",
                            isExpanded ? "rotate-90 text-primary" : ""
                          )} />
                        </div>
                        <p className={cn(
                          "text-muted-foreground leading-relaxed font-normal",
                          isLarge ? "text-sm md:text-base max-w-xl" : "text-xs md:text-sm"
                        )}>
                          {card.description}
                        </p>
                      </div>
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
