import { Card, CardContent } from "@/components/ui/card";
import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Compass: { icon: <Compass className="h-6 w-6" />, color: "bg-primary/10 text-primary" },
  Settings: { icon: <Settings className="h-6 w-6" />, color: "bg-secondary/10 text-secondary" },
  Users: { icon: <Users className="h-6 w-6" />, color: "bg-accent/10 text-accent" },
  Rocket: { icon: <Rocket className="h-6 w-6" />, color: "bg-primary/10 text-primary" },
  Cpu: { icon: <Cpu className="h-6 w-6" />, color: "bg-secondary/10 text-secondary" },
  Leaf: { icon: <Leaf className="h-6 w-6" />, color: "bg-accent/10 text-accent" },
};

export const Strengths = () => {
  return (
    <section id="strengths" className="py-24 px-4 bg-background relative">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Sticky Left Column -> Title & Context */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-6 shrink-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
              What I Bring
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Core<br className="hidden lg:block"/> Strengths
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Competencies that drive sustainable results across every operational and strategic engagement.
            </p>
          </div>

          {/* Scrolling Right Column -> Strength Cards */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {strengths.map((strength, index) => {
              const iconData = iconMap[strength.icon];
              return (
                <StaggeredCard key={strength.title} index={index}>
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                    {/* Subtle left border accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3",
                        iconData.color
                      )}>
                        {iconData.icon}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                          {strength.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </StaggeredCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
