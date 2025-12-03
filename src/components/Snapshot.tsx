import { Card, CardContent } from "@/components/ui/card";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="h-8 w-8" />,
  Code: <Code className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  Target: <Target className="h-8 w-8" />,
};

export const Snapshot = () => {
  return (
    <section className="py-10 md:py-14 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            At a Glance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my professional journey and current focus areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {snapshotCards.map((card, index) => (
            <Card
              key={card.title}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4">
                  {iconMap[card.icon]}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
