import { Card, CardContent } from "@/components/ui/card";
import { beyondWork } from "@/data/content";
import { Plane, BookOpen, Dumbbell, GraduationCap } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Plane: { icon: <Plane className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
  BookOpen: { icon: <BookOpen className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
  Dumbbell: { icon: <Dumbbell className="h-5 w-5" />, color: "bg-secondary/10 text-secondary" },
  GraduationCap: { icon: <GraduationCap className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
};

export const BeyondWork = () => {
  return (
    <section id="beyond-work" className="pt-20 pb-40 md:pt-28 md:pb-52 px-4 bg-muted/30 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />
      <div className="container mx-auto relative z-10 max-w-6xl">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl">
          {/* Rotating Earth Globe Card (just left to Global Travel) */}
          <StaggeredCard index={0}>
            <Card className="h-full transition-all duration-500 ease-out group hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 sm:hover:-translate-y-2 bg-card/80 backdrop-blur-md border border-border/50 overflow-hidden rounded-[2rem]">
              <CardContent className="p-8 text-center flex flex-col items-center justify-between h-full min-h-[320px]">
                <div className="relative w-full aspect-square max-w-[140px] mx-auto overflow-hidden flex items-center justify-center">
                  <div className="w-[120%] h-[120%] flex items-center justify-center transform rotate-[23.5deg]">
                    <RotatingEarth width={160} height={160} className="w-full h-full scale-[1.3]" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    Global Perspective
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-70">
                    Operating with an interconnected, borderless strategy mindset.
                  </p>
                </div>

                <div className="w-full pt-4 mt-4 border-t border-border/30">
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-primary/5 text-primary/80 border border-primary/10 font-semibold">
                      Global-First
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggeredCard>

          {beyondWork.map((item, index) => {
            const iconData = iconMap[item.icon];
            return (
              <StaggeredCard key={item.title} index={index + 1}>
                <Card className="h-full transition-all duration-500 ease-out group hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 sm:hover:-translate-y-2 bg-card/80 backdrop-blur-md border border-border/50 overflow-hidden rounded-[2rem]">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-between h-full min-h-[320px]">
                    <div className="flex flex-col items-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${iconData.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {iconData.icon}
                      </div>
                      
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed transition-opacity duration-300 group-hover:opacity-70">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Expandable Details - always visible on mobile, hover-reveal on desktop */}
                    <div className="w-full mt-4 pt-4 border-t border-border/30">
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.details?.map((detail) => (
                          <span 
                            key={detail} 
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-primary/5 text-primary/80 border border-primary/10 font-semibold"
                          >
                            {detail}
                          </span>
                        ))}
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
