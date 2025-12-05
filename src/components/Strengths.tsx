import { Card, CardContent } from "@/components/ui/card";
import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Compass: { icon: <Compass className="h-6 w-6" />, color: "bg-primary/15 text-primary" },
  Settings: { icon: <Settings className="h-6 w-6" />, color: "bg-secondary/15 text-secondary" },
  Users: { icon: <Users className="h-6 w-6" />, color: "bg-accent/15 text-accent" },
  Rocket: { icon: <Rocket className="h-6 w-6" />, color: "bg-primary/15 text-primary" },
  Cpu: { icon: <Cpu className="h-6 w-6" />, color: "bg-secondary/15 text-secondary" },
  Leaf: { icon: <Leaf className="h-6 w-6" />, color: "bg-accent/15 text-accent" },
};

export const Strengths = () => {
  return (
    <section id="strengths" className="py-12 md:py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What I Bring
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Strengths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core competencies that drive results across every engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength, index) => {
            const iconData = iconMap[strength.icon];
            return (
              <StaggeredCard key={strength.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${iconData.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {iconData.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {strength.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
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
