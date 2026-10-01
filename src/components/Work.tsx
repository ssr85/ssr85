import { useState } from "react";
import { Link } from "react-router-dom";
import { workItems, type WorkItem } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { Target, AlertCircle, Cpu, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkProps {
  onOpenEnquiry: () => void;
}

const tabs = [
  { id: "all", label: "All" },
  { id: "case-study", label: "AI Builds" },
  { id: "project", label: "Business Impact" },
] as const;

type TabId = typeof tabs[number]["id"];

export const Work = ({ onOpenEnquiry }: WorkProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const filteredItems = activeTab === "all"
    ? workItems
    : workItems.filter((item) => item.type === activeTab);

  const activeItem = filteredItems[mobileActiveIndex];

  const renderMobileCard = (_: WorkItem, index: number, isActive: boolean) => {
    const item = filteredItems[index];
    return (
      <Card
        className={cn(
          "bg-card border-border/50 transition-all duration-300 cursor-pointer",
          isActive ? "shadow-xl border-primary/20" : "opacity-60"
        )}
      >
        <CardContent className="p-6 space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3 uppercase tracking-widest text-[10px] py-1 px-3">
              {item.category}
            </Badge>
            <h3 className="text-2xl font-bold text-foreground mb-2">{item.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
              <Cpu size={14} />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.techStack.slice(0, 4).map((tech, i) => (
                <Badge key={i} variant="outline" className="bg-background/60 border-border/40 text-[10px] py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border/40">
            {item.stats.slice(0, 2).map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {stat}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {item.type === "case-study" && item.hasDetailPage && item.slug ? (
              <Link
                to={`/case-studies/${item.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors"
              >
                Read More <ChevronRight size={14} />
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={onOpenEnquiry}
                className="rounded-full text-xs"
              >
                Let's Discuss <ArrowRight size={14} className="ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="case-studies" className="py-20 md:py-28 px-4 bg-muted/30 overflow-hidden">
      <EngineeringGrid />
      <div className="container mx-auto max-w-5xl relative z-10">
        <ScrollAnimationWrapper>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
                Work
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Selected Work
              </h2>
              <p className="text-muted-foreground text-lg font-light max-w-lg">
                Deep dives into agentic engines and business impact built for B2B scale.
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={100}>
          <div className="flex justify-start md:justify-center mb-10 overflow-x-auto scrollbar-hide">
            <div className="inline-flex p-1 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileActiveIndex(0);
                  }}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={200}>
          <div className="hidden md:block">
            <DesktopGrid activeItem={activeItem} onOpenEnquiry={onOpenEnquiry} />
          </div>

          <div className="md:hidden -mx-4 px-4">
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

function DesktopGrid({ activeItem, onOpenEnquiry }: { activeItem: WorkItem; onOpenEnquiry: () => void }) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card/60 backdrop-blur-xl border border-border/40 p-8 md:p-12 rounded-2xl shadow-lg">
      <div className="space-y-8">
        <div>
          <Badge variant="secondary" className="mb-4 uppercase tracking-widest text-[10px] py-1 px-3">
            {activeItem.category}
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{activeItem.name}</h3>
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            {activeItem.description}
          </p>
        </div>

        {activeItem.type === "case-study" && activeItem.audience && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
              <Target size={14} />
              <span>Target Audience</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{activeItem.audience}</p>
          </div>
        )}

        {activeItem.painPoints && activeItem.painPoints.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
              <AlertCircle size={14} />
              <span>Pain Points Solved</span>
            </div>
            <div className="space-y-1.5">
              {activeItem.painPoints.slice(0, 4).map((pp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-foreground/80 font-medium leading-relaxed">
                  <span className="text-accent mt-1 text-[8px] shrink-0">●</span>
                  <span>{pp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8 lg:pl-8 lg:border-l border-border/40 h-full flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-secondary font-bold text-[11px] uppercase tracking-wider">
              <Cpu size={16} />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeItem.techStack.map((tech, i) => (
                <Badge key={i} variant="outline" className="bg-background/60 border-border/40 text-[10px] py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Impact</div>
            <div className="space-y-2">
              {activeItem.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/20 group hover:border-primary/30 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-semibold text-foreground/80">{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          {activeItem.type === "case-study" && activeItem.hasDetailPage && activeItem.slug ? (
            <Link
              to={`/case-studies/${activeItem.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Read Full Case Study
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Button
              onClick={onOpenEnquiry}
              size="lg"
              className="rounded-full px-8"
            >
              Let's Discuss <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
