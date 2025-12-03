import { Card, CardContent } from "@/components/ui/card";
import { strengths } from "@/data/content";
import { Compass, Settings, Users, Rocket, Cpu, Leaf } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Rocket: <Rocket className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Leaf: <Leaf className="h-6 w-6" />,
};

export const Strengths = () => {
  return (
    <section id="strengths" className="py-10 md:py-14 px-4 bg-gradient-to-r from-primary/5 via-muted/30 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Strengths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core competencies that drive results across every engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((strength, index) => (
            <Card
              key={strength.title}
              className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center">
                    {iconMap[strength.icon]}
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
          ))}
        </div>
      </div>
    </section>
  );
};
