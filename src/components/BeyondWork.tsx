import { Card, CardContent } from "@/components/ui/card";
import { beyondWork } from "@/data/content";
import { Plane, BookOpen, Dumbbell, GraduationCap } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Plane: { icon: <Plane className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
  BookOpen: { icon: <BookOpen className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
  Dumbbell: { icon: <Dumbbell className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
  GraduationCap: { icon: <GraduationCap className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
};

export const BeyondWork = () => {
  return (
    <section id="beyond-work" className="py-16 md:py-24 px-4 bg-muted/30 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 tracking-wide">
            Personal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Beyond Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Interests and activities that keep me balanced and inspired
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {beyondWork.map((item, index) => {
            const iconData = iconMap[item.icon];
            return (
              <StaggeredCard key={item.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${iconData.color} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                      {iconData.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
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
