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
    <section id="beyond-work" className="py-20 md:py-28 px-4 bg-muted/30 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />
      <div className="container mx-auto relative z-10 max-w-5xl">
        <div className="text-left mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 tracking-wide">
            Personal
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Beyond Work
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Interests and activities that keep me balanced and inspired
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl">
          {beyondWork.map((item, index) => {
            const iconData = iconMap[item.icon];
            return (
              <StaggeredCard key={item.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group h-full overflow-hidden">
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <div className="flex-grow flex flex-col items-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${iconData.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {iconData.icon}
                      </div>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-80">
                        {item.description}
                      </p>
                    </div>

                    {/* Expandable Section */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <div className="pt-4 mt-4 border-t border-border/50">
                          <ul className="flex flex-wrap justify-center gap-1.5">
                            {item.details?.map((detail) => (
                              <li 
                                key={detail} 
                                className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground font-medium border border-border/30"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
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
