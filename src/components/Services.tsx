import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/content";
import { Settings, Leaf, Code, Globe, ArrowRight } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";

interface ServicesProps {
  onOpenEnquiry: () => void;
}

const iconMap: Record<string, { icon: React.ReactNode; gradient: string }> = {
  Settings: { icon: <Settings className="h-7 w-7" />, gradient: "from-primary to-primary/60" },
  Leaf: { icon: <Leaf className="h-7 w-7" />, gradient: "from-secondary to-secondary/60" },
  Code: { icon: <Code className="h-7 w-7" />, gradient: "from-accent to-accent/60" },
  Globe: { icon: <Globe className="h-7 w-7" />, gradient: "from-primary to-secondary" },
};

export const Services = ({ onOpenEnquiry }: ServicesProps) => {
  return (
    <section id="services" className="py-20 md:py-28 px-4 bg-background relative overflow-hidden border-y border-border/40">
      {/* Subtle Engineering Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '2.5rem 2.5rem'
        }}
      />
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-5 tracking-wide">
            How I Can Help
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Strategic consulting and implementation support to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const iconData = iconMap[service.icon];
            return (
              <StaggeredCard key={service.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      {/* Number indicator */}
                      <span className="text-xs font-mono text-muted-foreground/40 mt-1 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconData.gradient} text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                          {iconData.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredCard>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button
            size="lg"
            onClick={onOpenEnquiry}
            className="px-8 py-5 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg shadow-accent/20 group"
          >
            Discuss Your Requirements
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
};
