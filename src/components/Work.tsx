import { useState } from "react";
import { Link } from "react-router-dom";
import { workItems, type WorkItem } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { Target, AlertCircle, Cpu, ArrowUpRight, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface WorkProps {
  onOpenEnquiry: () => void;
}

const tabs = [
  { id: "all", label: "All Engineering" },
  { id: "case-study", label: "AI & Agentic Builds" },
  { id: "project", label: "Business Scale Impact" },
] as const;

type TabId = typeof tabs[number]["id"];

export const Work = ({ onOpenEnquiry }: WorkProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [selectedDesktopIndex, setSelectedDesktopIndex] = useState(0);

  const filteredItems = activeTab === "all"
    ? workItems
    : workItems.filter((item) => item.type === activeTab);

  // Keep index within bounds when switching tabs
  const safeDesktopIndex = Math.min(selectedDesktopIndex, filteredItems.length - 1);
  const activeItem = filteredItems[safeDesktopIndex] || filteredItems[0];

  const renderMobileCard = (_: WorkItem, index: number, isActive: boolean) => {
    const item = filteredItems[index];
    if (!item) return null;

    return (
      <div
        className={cn(
          "double-bezel p-1.5 rounded-[2rem] transition-all duration-300",
          isActive ? "opacity-100 scale-[1.01] shadow-2xl shadow-primary/10" : "opacity-60 scale-[0.98]"
        )}
      >
        <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="badge-eyebrow text-[10px]">
              {item.category}
            </span>
            {item.keyMetrics?.[0] && (
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                {item.keyMetrics[0].label}: {item.keyMetrics[0].value}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">{item.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-primary/90 font-mono text-[11px] uppercase tracking-wider">
              <Cpu size={13} />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.techStack.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/[0.08]">
            {item.stats.slice(0, 2).map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{stat}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            {item.type === "case-study" && item.hasDetailPage && item.slug ? (
              <Link
                to={`/case-studies/${item.slug}`}
                className="btn-icon-pod inline-flex w-full items-center justify-between px-5 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-foreground text-xs font-semibold transition-all group"
              >
                <span>Read Full Case Study</span>
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={onOpenEnquiry}
                className="w-full rounded-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5"
              >
                Let's Discuss Requirements <ChevronRight size={14} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="case-studies" className="py-24 md:py-36 px-4 bg-background relative overflow-hidden border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollAnimationWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="badge-eyebrow">
                <Layers size={11} className="text-primary" />
                Selected Case Studies
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Engineered for Scale.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light max-w-xl">
                Deep dives into agentic workflows, autonomous systems, and enterprise business transformations.
              </p>
            </div>

            {/* Segmented Filter Pills */}
            <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-inner self-start md:self-end">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedDesktopIndex(0);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 shrink-0 whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Desktop Interactive Layout */}
        <ScrollAnimationWrapper delay={150}>
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            {/* Left Column: Project Selector List */}
            <div className="col-span-5 space-y-3">
              {filteredItems.map((item, idx) => {
                const isSelected = idx === safeDesktopIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDesktopIndex(idx)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl transition-all duration-300 border relative group",
                      isSelected
                        ? "bg-white/[0.06] border-primary/40 shadow-xl shadow-primary/5"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        0{idx + 1} // {item.category}
                      </span>
                      {item.keyMetrics?.[0] && (
                        <span className="font-mono text-[11px] font-bold text-primary">
                          {item.keyMetrics[0].value}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        "text-lg font-bold tracking-tight transition-colors",
                        isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                      )}>
                        {item.name}
                      </h4>
                      <ArrowUpRight
                        size={16}
                        className={cn(
                          "transition-transform duration-300",
                          isSelected
                            ? "text-primary translate-x-0.5 -translate-y-0.5"
                            : "text-muted-foreground opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
                        )}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Deep-Dive Inspector (Double-Bezel) */}
            <div className="col-span-7 sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="double-bezel p-2 rounded-[2.25rem] shadow-2xl shadow-black/40"
                >
                  <div className="double-bezel-inner rounded-[calc(2.25rem-0.5rem)] p-8 md:p-10 space-y-8">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="badge-eyebrow text-[10px]">
                          {activeItem.category}
                        </span>
                        {activeItem.duration && (
                          <span className="font-mono text-xs text-muted-foreground">
                            Cycle: <strong className="text-foreground">{activeItem.duration}</strong>
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        {activeItem.name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    {activeItem.keyMetrics && activeItem.keyMetrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeItem.keyMetrics.map((km, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
                          >
                            <div className="text-xl md:text-2xl font-black font-mono tracking-tight text-primary">
                              {km.value}
                            </div>
                            <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mt-1">
                              {km.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Target Audience & Pain Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/[0.06]">
                      {activeItem.audience && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-primary font-mono text-[11px] uppercase tracking-wider">
                            <Target size={13} />
                            <span>Target Audience</span>
                          </div>
                          <p className="text-xs text-foreground/80 font-medium leading-relaxed">
                            {activeItem.audience}
                          </p>
                        </div>
                      )}

                      {activeItem.painPoints && activeItem.painPoints.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-accent font-mono text-[11px] uppercase tracking-wider">
                            <AlertCircle size={13} />
                            <span>Pain Points Solved</span>
                          </div>
                          <ul className="space-y-1">
                            {activeItem.painPoints.slice(0, 3).map((pp, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                <span className="text-primary mt-0.5 text-[8px]">●</span>
                                <span>{pp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                        <Cpu size={13} />
                        <span>Architecture & Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground/90 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 flex items-center gap-4">
                      {activeItem.type === "case-study" && activeItem.hasDetailPage && activeItem.slug ? (
                        <Link
                          to={`/case-studies/${activeItem.slug}`}
                          className="btn-icon-pod inline-flex items-center gap-4 px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all duration-300 group shadow-lg shadow-primary/20"
                        >
                          <span>Explore Technical Architecture</span>
                          <span className="w-6 h-6 rounded-full bg-black/20 text-primary-foreground flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            <ArrowUpRight size={14} />
                          </span>
                        </Link>
                      ) : (
                        <Button
                          onClick={onOpenEnquiry}
                          size="lg"
                          className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        >
                          Discuss Your Project <ChevronRight size={16} className="ml-1.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Carousel View */}
          <div className="lg:hidden -mx-4 px-4">
            <Carousel
              items={filteredItems}
              renderItem={renderMobileCard}
              className="pb-2"
            />
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
