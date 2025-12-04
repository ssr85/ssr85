import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/content";
import { Settings, Leaf, Code, Globe, ArrowRight } from "lucide-react";

interface ServicesProps {
  onOpenEnquiry: () => void;
}

const iconMap: Record<string, { icon: React.ReactNode; gradient: string }> = {
  Settings: { icon: <Settings className="h-8 w-8" />, gradient: "from-primary to-primary/60" },
  Leaf: { icon: <Leaf className="h-8 w-8" />, gradient: "from-secondary to-secondary/60" },
  Code: { icon: <Code className="h-8 w-8" />, gradient: "from-accent to-accent/60" },
  Globe: { icon: <Globe className="h-8 w-8" />, gradient: "from-primary to-secondary" },
};

export const Services = ({ onOpenEnquiry }: ServicesProps) => {
  return (
    <section id="services" className="py-12 md:py-16 px-4 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How I Can Help
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategic consulting and implementation support to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const iconData = iconMap[service.icon];
            return (
              <Card
                key={service.title}
                className="bg-card border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconData.gradient} text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {iconData.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={onOpenEnquiry} 
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg shadow-accent/25 group"
          >
            Discuss Your Requirements
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
