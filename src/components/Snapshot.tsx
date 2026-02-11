import { Card, CardContent } from "@/components/ui/card";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Briefcase: { icon: <Briefcase className="h-7 w-7" />, color: "from-primary to-primary/60" },
  Code: { icon: <Code className="h-7 w-7" />, color: "from-secondary to-secondary/60" },
  TrendingUp: { icon: <TrendingUp className="h-7 w-7" />, color: "from-accent to-accent/60" },
  Target: { icon: <Target className="h-7 w-7" />, color: "from-primary to-secondary" },
};

export const Snapshot = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            At a Glance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A snapshot of my professional journey and current focus areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {snapshotCards.map((card, index) => {
            const iconData = iconMap[card.icon];
            return (
              <StaggeredCard key={card.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 group h-full relative overflow-hidden">
                  {/* Accent top border */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${iconData.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="p-6 text-left">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${iconData.color} text-primary-foreground mb-5 group-hover:scale-105 transition-transform duration-300`}>
                      {iconData.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
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
