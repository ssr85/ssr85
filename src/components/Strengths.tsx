import { Card, CardContent } from "@/components/ui/card";
import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Compass: { icon: <Compass className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
  Settings: { icon: <Settings className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
  Users: { icon: <Users className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
  Rocket: { icon: <Rocket className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
  Cpu: { icon: <Cpu className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
  Leaf: { icon: <Leaf className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
};

export const Strengths = () => {
  return (
    <section id="strengths" className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary/3 via-background to-secondary/3">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 tracking-wide">
            What I Bring
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Key Strengths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Core competencies that drive results across every engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {strengths.map((strength, index) => {
            const iconData = iconMap[strength.icon];
            return (
              <StaggeredCard key={strength.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${iconData.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        {iconData.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {strength.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
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
