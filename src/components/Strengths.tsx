import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf, Zap } from "lucide-react";
import { StaggeredCard, ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Compass: { icon: <Compass className="h-6 w-6 text-primary" />, color: "bg-primary/10 border-primary/20" },
  Settings: { icon: <Settings className="h-6 w-6 text-secondary" />, color: "bg-secondary/10 border-secondary/20" },
  Users: { icon: <Users className="h-6 w-6 text-accent" />, color: "bg-accent/10 border-accent/20" },
  Rocket: { icon: <Rocket className="h-6 w-6 text-primary" />, color: "bg-primary/10 border-primary/20" },
  Cpu: { icon: <Cpu className="h-6 w-6 text-secondary" />, color: "bg-secondary/10 border-secondary/20" },
  Leaf: { icon: <Leaf className="h-6 w-6 text-accent" />, color: "bg-accent/10 border-accent/20" },
};

export const Strengths = () => {
  return (
    <section id="strengths" className="py-24 md:py-36 px-4 bg-background relative overflow-hidden border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Sticky Left Column -> Title & Context */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 space-y-6 shrink-0">
            <ScrollAnimationWrapper>
              <div className="space-y-4">
                <span className="badge-eyebrow">
                  <Zap size={11} className="text-primary" />
                  Execution Framework
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                  Core<br className="hidden lg:block"/> Strengths.
                </h2>
                <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                  Competencies forged over 16+ years of operational leadership, bridging strategic foresight with hands-on systems architecture.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-2xl font-bold font-mono text-primary">16+</div>
                    <div className="text-[11px] font-mono uppercase text-muted-foreground mt-0.5">Years Rigor</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-2xl font-bold font-mono text-secondary">250+</div>
                    <div className="text-[11px] font-mono uppercase text-muted-foreground mt-0.5">Engagements</div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>

          {/* Scrolling Right Column -> Strength Cards */}
          <div className="lg:w-7/12 flex flex-col gap-5 w-full">
            {strengths.map((strength, index) => {
              const iconData = iconMap[strength.icon] || { icon: <Zap className="h-6 w-6 text-primary" />, color: "bg-primary/10 border-primary/20" };
              return (
                <StaggeredCard key={strength.title} index={index}>
                  <div className="double-bezel p-1.5 rounded-2xl group transition-transform duration-300 hover:scale-[1.01]">
                    <div className="double-bezel-inner rounded-[calc(1rem+0.25rem)] p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 shadow-inner",
                        iconData.color
                      )}>
                        {iconData.icon}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                            {strength.title}
                          </h3>
                          <span className="font-mono text-[10px] text-muted-foreground/50 tracking-wider">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggeredCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
