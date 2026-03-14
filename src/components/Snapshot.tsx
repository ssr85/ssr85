import { Card, CardContent } from "@/components/ui/card";
import { snapshotCards } from "@/data/content";
import { Briefcase, Code, TrendingUp, Target, ArrowRight } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
import { cn } from "@/lib/utils";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Briefcase: { icon: <Briefcase className="h-8 w-8" />, color: "from-primary to-primary/60" },
  Code: { icon: <Code className="h-8 w-8" />, color: "from-secondary to-secondary/60" },
  TrendingUp: { icon: <TrendingUp className="h-8 w-8" />, color: "from-accent to-accent/60" },
  Target: { icon: <Target className="h-8 w-8" />, color: "from-primary to-secondary" },
};

export const Snapshot = () => {
  return (
    <section id="snapshot" className="py-20 md:py-32 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            At a Glance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            A snapshot of my professional journey and current focus areas
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min max-w-5xl mx-auto">
          {snapshotCards.map((card, index) => {
            const iconData = iconMap[card.icon];

            // Bento sizing logic
            const isLarge = index === 0 || index === 3;
            const spanClass = isLarge ? "md:col-span-2" : "md:col-span-1";

            return (
              <StaggeredCard key={card.title} index={index} className={spanClass}>
                <Card className={cn(
                  "bg-card/50 backdrop-blur-sm border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group h-full relative overflow-hidden flex flex-col justify-center",
                  isLarge ? "p-8 md:p-10" : "p-6 md:p-8"
                )}>
                  {/* Subtle noise texture or gradient background for bento aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-muted/40 z-0 pointer-events-none" />

                  {/* Corner glow effect on hover */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${iconData.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />

                  <CardContent className="p-0 text-left relative z-10 flex flex-col h-full">
<<<<<<< HEAD
                    <div className={cn(`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${iconData.color} text-primary-foreground mb-6 shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`, isLarge ? "w-16 h-16" : "w-14 h-14")}>
=======
                    <div className={cn(
                      "inline-flex items-center justify-center rounded-2xl bg-gradient-to-br text-primary-foreground mb-6 shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out",
                      iconData.color,
                      isLarge ? "w-16 h-16" : "w-14 h-14"
                    )}>
>>>>>>> 4ca5f0c (feat: implement a new minimalist V2 landing page with dedicated components, content, and design plans, alongside minor adjustments to the existing homepage.)
                      {iconData.icon}
                    </div>
                    <div className="mt-auto">
                      <h3 className={cn("font-bold text-foreground mb-3 tracking-tight", isLarge ? "text-2xl" : "text-xl")}>
                        {card.title}
                      </h3>
                      <p className={cn("text-muted-foreground leading-relaxed", isLarge ? "text-base max-w-md" : "text-sm")}>
                        {card.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredCard>
            );
          })}
        </div>

        {/* New See Evidence CTA */}
        <div className="mt-16 text-center animate-hero-fade" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={() => document.querySelector("#evidence")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            See Evidence of Impact
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
