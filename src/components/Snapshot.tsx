import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target, ChevronDown } from "lucide-react";
import { motion, LayoutGroup } from "motion/react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Briefcase: { icon: <Briefcase className="h-8 w-8" />, color: "from-primary to-primary/60" },
  Code: { icon: <Code className="h-8 w-8" />, color: "from-secondary to-secondary/60" },
  TrendingUp: { icon: <TrendingUp className="h-8 w-8" />, color: "from-accent to-accent/60" },
  Target: { icon: <Target className="h-8 w-8" />, color: "from-primary to-secondary" },
};

const springTransition = { type: "spring" as const, stiffness: 350, damping: 30 };

export const Snapshot = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="snapshot" className="py-20 md:py-28 px-4 bg-background relative overflow-hidden border-y border-border/40">
      <EngineeringGrid />

      <div className="container mx-auto relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium tracking-wide">
              Focus Areas
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              At a Glance
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              A snapshot of my professional journey and current focus areas
            </p>
          </div>
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-primary/5 border border-primary/20 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI is my Co-Pilot
          </div>
        </div>

        {/* Unified Bento Grid: always-rendered 4 cards, layout-animated expand/collapse */}
        <LayoutGroup>
          <motion.div
            layout
            transition={springTransition}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
            style={expandedIndex !== null ? { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" } : undefined}
          >
            {snapshotCards.map((card, index) => {
              const iconData = iconMap[card.icon];
              const isExpanded = expandedIndex === index;
              const isThumb = expandedIndex !== null && !isExpanded;
              const isLargeBento = (index === 0 || index === 3) && !isExpanded && !isThumb;

              const colSpan = isExpanded
                ? "col-span-3"
                : isLargeBento
                ? "col-span-1 md:col-span-2"
                : "col-span-1";

              return (
                <motion.div
                  key={card.title}
                  layout
                  transition={springTransition}
                  className={colSpan}
                >
                  <StaggeredCard index={index} className="h-full">
                    <Card
                      onClick={() => handleExpand(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={isExpanded ? `Collapse ${card.title}` : `Expand ${card.title}`}
                      aria-expanded={isExpanded}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleExpand(index);
                        }
                      }}
                      className={cn(
                        "bg-card/40 backdrop-blur-sm border-border/80 hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary group h-full relative overflow-hidden flex flex-col justify-center cursor-pointer",
                        isExpanded
                          ? "p-5 md:p-7 border-primary/40 shadow-xl shadow-primary/5"
                          : isThumb
                          ? "p-3"
                          : isLargeBento
                          ? "p-7 md:p-8"
                          : "p-5 md:p-6"
                      )}
                    >
                      {/* Corner brackets */}
                      <div
                        className={cn(
                          "absolute border-muted-foreground/20 border-t border-l",
                          isExpanded || isLargeBento
                            ? "top-2 left-2 w-1.5 h-1.5"
                            : "top-1 left-1 w-1 h-1"
                        )}
                      />
                      <div
                        className={cn(
                          "absolute border-muted-foreground/20 border-b border-r",
                          isExpanded || isLargeBento
                            ? "bottom-2 right-2 w-1.5 h-1.5"
                            : "bottom-1 right-1 w-1 h-1"
                        )}
                      />

                      {/* Hover glow */}
                      <div
                        className={cn(
                          `absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${iconData.color} rounded-full blur-3xl transition-opacity duration-700 pointer-events-none`,
                          isExpanded ? "opacity-10" : "opacity-0 group-hover:opacity-10"
                        )}
                      />

                      {/* Expanded: full content */}
                      {isExpanded && (
                        <CardContent className="p-0 text-left relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${iconData.color} text-white shadow-md w-12 h-12`}>
                              {iconData.icon}
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground/50 tracking-tighter uppercase">
                              {card.focus}
                            </span>
                          </div>
                          <div className="space-y-2 mt-auto">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                                {card.focus}
                              </span>
                              <h3 className="font-bold text-foreground text-xl tracking-tight leading-tight">
                                {card.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground/90 text-base leading-relaxed font-medium">
                              {card.description}
                            </p>
                          </div>
                        </CardContent>
                      )}

                      {/* Thumbnail: small icon + title */}
                      {isThumb && (
                        <div className="flex flex-col items-center justify-center gap-1.5 text-center relative z-10 h-full min-h-[70px]">
                          <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${iconData.color} text-white shadow-sm w-8 h-8`}>
                            {iconData.icon}
                          </div>
                          <h3 className="font-bold text-foreground text-[10px] leading-tight">
                            {card.title}
                          </h3>
                        </div>
                      )}

                      {/* Default collapsed: mobile compact OR desktop full bento */}
                      {!isExpanded && !isThumb && (
                        <>
                          {/* Mobile compact view */}
                          <div className="md:hidden flex flex-col items-center justify-center gap-2 text-center relative z-10 h-full min-h-[100px]">
                            <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${iconData.color} text-white shadow-sm w-11 h-11`}>
                              {iconData.icon}
                            </div>
                            <h3 className="font-bold text-foreground text-sm leading-tight">
                              {card.title}
                            </h3>
                            <ChevronDown className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/60 transition-all duration-300 group-hover:translate-y-0.5" />
                          </div>

                          {/* Desktop full bento view */}
                          <CardContent className="hidden md:flex p-0 text-left relative z-10 flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={cn(
                                  `inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${iconData.color} text-white shadow-md group-hover:scale-105 transition-transform duration-500 ease-out`,
                                  isLargeBento ? "w-12 h-12" : "w-10 h-10"
                                )}
                              >
                                {iconData.icon}
                              </div>
                              <span className="text-[10px] font-mono text-muted-foreground/50 tracking-tighter uppercase">
                                {card.focus}
                              </span>
                            </div>
                            <div className="mt-auto space-y-2">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                                  {card.focus}
                                </span>
                                <h3
                                  className={cn(
                                    "font-bold text-foreground tracking-tight leading-tight",
                                    isLargeBento ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                                  )}
                                >
                                  {card.title}
                                </h3>
                              </div>
                              <p
                                className={cn(
                                  "text-muted-foreground/90 leading-relaxed font-medium",
                                  isLargeBento ? "text-base max-w-md" : "text-sm"
                                )}
                              >
                                {card.description}
                              </p>
                            </div>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  </StaggeredCard>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};
