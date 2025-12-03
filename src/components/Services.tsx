import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/content";
import { Settings, Leaf, Code, Globe, ArrowRight } from "lucide-react";

interface ServicesProps {
  onOpenEnquiry: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings className="h-8 w-8" />,
  Leaf: <Leaf className="h-8 w-8" />,
  Code: <Code className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
};

export const Services = ({ onOpenEnquiry }: ServicesProps) => {
  return (
    <section id="services" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategic consulting and implementation support to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" onClick={onOpenEnquiry} className="group">
            Discuss Your Requirements
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
