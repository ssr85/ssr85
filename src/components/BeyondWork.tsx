import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { beyondWork } from "@/data/content";
import { Plane, BookOpen, Dumbbell, GraduationCap, Compass } from "lucide-react";
import { StaggeredCard, ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const RotatingEarth = lazy(() => import("@/components/ui/wireframe-dotted-globe"));

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Plane: { icon: <Plane className="h-5 w-5 text-primary" />, color: "bg-primary/10 border-primary/20" },
  BookOpen: { icon: <BookOpen className="h-5 w-5 text-secondary" />, color: "bg-secondary/10 border-secondary/20" },
  Dumbbell: { icon: <Dumbbell className="h-5 w-5 text-accent" />, color: "bg-accent/10 border-accent/20" },
  GraduationCap: { icon: <GraduationCap className="h-5 w-5 text-primary" />, color: "bg-primary/10 border-primary/20" },
};

export const BeyondWork = () => {
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only load globe for larger viewports (> 1024px) when approaching viewport
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="beyond-work" className="py-24 md:py-36 px-4 bg-background relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <ScrollAnimationWrapper>
            <div className="text-left max-w-xl space-y-4">
              <span className="badge-eyebrow">
                <Compass size={11} className="text-primary" />
                Personal Ethos
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Beyond Work.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                Disciplines, endurance routines, and intellectual curiosity that anchor daily focus and leadership.
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          {/* Rotating Dotted Globe Canvas Container - Desktop only, lazy-mounted */}
          <div className="hidden lg:flex justify-start items-center select-none pointer-events-none">
            <div 
              className="w-36 h-36 md:w-48 md:h-48 transform" 
              style={{ transform: "rotate(336.5deg)" }}
            >
              {shouldLoadGlobe ? (
                <Suspense fallback={<div className="w-[200px] h-[200px]" />}>
                  <RotatingEarth 
                    width={200} 
                    height={200} 
                    className="w-full h-full pointer-events-none" 
                    transparent={true} 
                    hideControls={true} 
                  />
                </Suspense>
              ) : (
                <div className="w-[200px] h-[200px]" />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {beyondWork.map((item, index) => {
            const iconData = iconMap[item.icon] || { icon: <Compass className="h-5 w-5 text-primary" />, color: "bg-primary/10 border-primary/20" };
            
            return (
              <StaggeredCard key={item.title} index={index}>
                <div className="double-bezel p-1.5 rounded-[2rem] h-full group hover:scale-[1.02] transition-transform duration-300">
                  <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-7 text-center flex flex-col items-center justify-between h-full space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${iconData.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        {iconData.icon}
                      </div>
                      
                      <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags / Details */}
                    {item.details && item.details.length > 0 && (
                      <div className="w-full pt-4 border-t border-white/[0.06]">
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {item.details.map((detail) => (
                            <span 
                              key={detail} 
                              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] text-foreground/80 border border-white/[0.06]"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </StaggeredCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
