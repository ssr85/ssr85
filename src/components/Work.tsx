import { useState } from "react";
import { Link } from "react-router-dom";
import { workItems, type WorkItem } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { Target, AlertCircle, Cpu, ArrowUpRight, ChevronRight, Layers, Terminal, Sparkles } from "lucide-react";
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
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

        {/* Desktop Interactive Studio Command Console (Height-Aligned) */}
        <ScrollAnimationWrapper delay={150}>
          <div className="hidden lg:grid grid-cols-12 gap-6 items-stretch h-[660px]">
            {/* Left Column: Scrollable System Directory */}
            <div className="col-span-5 flex flex-col h-full bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-4 backdrop-blur-md">
              {/* Directory Header / Telemetry Bar */}
              <div className="flex items-center justify-between px-3 py-2.5 mb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                    Directory ({filteredItems.length})
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Select System
                </span>
              </div>

              {/* Scrollable List Stream */}
              <div className="overflow-y-auto pr-1.5 space-y-2.5 flex-1 custom-scrollbar">
                {filteredItems.map((item, idx) => {
                  const isSelected = idx === safeDesktopIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDesktopIndex(idx)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl transition-all duration-200 border relative group",
                        isSelected
                          ? "bg-white/[0.08] border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                          : "bg-white/[0.015] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          0{idx + 1} // {item.category}
                        </span>
                        {item.keyMetrics?.[0] && (
                          <span className={cn(
                            "font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border",
                            isSelected 
                              ? "text-primary bg-primary/15 border-primary/30" 
                              : "text-muted-foreground bg-white/[0.03] border-white/[0.06]"
                          )}>
                            {item.keyMetrics[0].value}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className={cn(
                          "text-base font-bold tracking-tight transition-colors",
                          isSelected ? "text-primary" : "text-foreground group-hover:text-foreground"
                        )}>
                          {item.name}
                        </h4>
                        <ArrowUpRight
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            isSelected
                              ? "text-primary translate-x-0.5 -translate-y-0.5"
                              : "text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5"
                          )}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep-Dive Inspector Chassis */}
            <div className="col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="double-bezel p-1.5 rounded-[2rem] shadow-2xl h-full"
                >
                  <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-7 md:p-8 h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
                    <div className="space-y-6">
                      {/* Top Header */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="badge-eyebrow text-[10px]">
                            {activeItem.category}
                          </span>
                          {activeItem.duration && (
                            <span className="font-mono text-xs text-muted-foreground bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                              Deployment: <strong className="text-foreground">{activeItem.duration}</strong>
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                          {activeItem.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {activeItem.description}
                        </p>
                      </div>

                      {/* Key Metrics Grid */}
                      {activeItem.keyMetrics && activeItem.keyMetrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {activeItem.keyMetrics.map((km, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center shadow-inner"
                            >
                              <div className="text-lg md:text-xl font-black font-mono tracking-tight text-primary">
                                {km.value}
                              </div>
                              <div className="text-[9px] uppercase font-mono tracking-wider text-muted-foreground mt-0.5 truncate">
                                {km.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Audience & Pain Points */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/[0.06]">
                        {activeItem.audience && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-primary font-mono text-[10px] uppercase tracking-wider">
                              <Target size={12} />
                              <span>Target Audience</span>
                            </div>
                            <p className="text-xs text-foreground/85 font-medium leading-relaxed">
                              {activeItem.audience}
                            </p>
                          </div>
                        )}

                        {activeItem.painPoints && activeItem.painPoints.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] uppercase tracking-wider">
                              <AlertCircle size={12} />
                              <span>Bottlenecks Eliminated</span>
                            </div>
                            <ul className="space-y-1">
                              {activeItem.painPoints.slice(0, 3).map((pp, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5 leading-tight">
                                  <span className="text-primary text-[8px] mt-0.5">●</span>
                                  <span>{pp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                          <Cpu size={12} />
                          <span>Architecture & Integrations</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeItem.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-foreground/85"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Tray */}
                    <div className="pt-6 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                      {activeItem.type === "case-study" && activeItem.hasDetailPage && activeItem.slug ? (
                        <Link
                          to={`/case-studies/${activeItem.slug}`}
                          className="btn-icon-pod inline-flex items-center justify-between gap-4 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all duration-200 group shadow-lg shadow-primary/20"
                        >
                          <span>Explore Architecture Blueprint</span>
                          <span className="w-5 h-5 rounded-full bg-black/20 text-primary-foreground flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            <ArrowUpRight size={12} />
                          </span>
                        </Link>
                      ) : (
                        <Button
                          onClick={onOpenEnquiry}
                          size="sm"
                          className="rounded-full px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs"
                        >
                          Discuss Project Scope <ChevronRight size={14} className="ml-1" />
                        </Button>
                      )}

                      <span className="font-mono text-[11px] text-muted-foreground hidden sm:inline-block">
                        SSR Systems // Production Ready
                      </span>
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
