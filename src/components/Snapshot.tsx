import { Card, CardContent } from "@/components/ui/card";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Briefcase: { icon: <Briefcase className="h-8 w-8" />, color: "from-primary to-primary/60" },
  Code: { icon: <Code className="h-8 w-8" />, color: "from-secondary to-secondary/60" },
  TrendingUp: { icon: <TrendingUp className="h-8 w-8" />, color: "from-accent to-accent/60" },
  Target: { icon: <Target className="h-8 w-8" />, color: "from-primary to-secondary" },
};

export const Snapshot = () => {
  return (
    <section id="snapshot" className="py-20 md:py-28 px-4 bg-background relative overflow-hidden border-y border-border/40">
      {/* Subtle Engineering Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '2.5rem 2.5rem'
        }}
      />
      
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

        {/* Bento Grid Layout - Removed mx-auto to ensure strict left alignment if container allows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-min">
          {snapshotCards.map((card, index) => {
            const iconData = iconMap[card.icon];
            
            // Bento sizing logic
            const isLarge = index === 0 || index === 3;
            const spanClass = isLarge ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <StaggeredCard key={card.title} index={index} className={spanClass}>
                <Card className={cn(
                  "bg-card/40 backdrop-blur-sm border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group h-full relative overflow-hidden flex flex-col justify-center",
                  isLarge ? "p-7 md:p-8" : "p-5 md:p-6"
                )}>
                  {/* Subtle technical corner markers */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-muted-foreground/20" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-muted-foreground/20" />
                  
                  {/* Corner glow effect on hover */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${iconData.color} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />

                  <CardContent className="p-0 text-left relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${iconData.color} text-white shadow-md group-hover:scale-105 transition-transform duration-500 ease-out`, isLarge ? "w-12 h-12" : "w-10 h-10")}>
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
                        <h3 className={cn("font-bold text-foreground tracking-tight leading-tight", isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
                          {card.title}
                        </h3>
                      </div>
                      <p className={cn("text-muted-foreground/90 leading-relaxed font-medium", isLarge ? "text-base max-w-md" : "text-sm")}>
                        {card.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
