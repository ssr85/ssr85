import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, { bg: string, text: string, border: string, dot: string }> = {
  "Sustainable Enterprise": { bg: "bg-emerald-500/5", text: "text-emerald-500", border: "border-emerald-500/20", dot: "bg-emerald-500" },
  "Operations Optimization": { bg: "bg-blue-500/5", text: "text-blue-500", border: "border-blue-500/20", dot: "bg-blue-500" },
  "Technical Implementation": { bg: "bg-purple-500/5", text: "text-purple-500", border: "border-purple-500/20", dot: "bg-purple-500" },
  "Strategic Growth": { bg: "bg-amber-500/5", text: "text-amber-500", border: "border-amber-500/20", dot: "bg-amber-500" },
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Selected Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Engineering <span className="text-muted-foreground/30">Scale.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            A curated selection of industrial initiatives and agentic systems engineered to solve high-stakes operational bottlenecks.
          </p>
        </div>

        <div className="space-y-24 md:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const colors = categoryColors[project.category] || categoryColors["Strategic Growth"];
            
            return (
              <div 
                key={project.id}
                className={cn(
                  "flex flex-col lg:items-center gap-12 lg:gap-20",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <div className="w-full lg:w-3/5 group">
                  <div className="relative aspect-[16/10] lg:aspect-[16/9]">
                    {/* Secondary Image (Staggered Behind) */}
                    {project.images.length > 1 && (
                      <div className="absolute inset-0 translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8 rounded-[2rem] overflow-hidden border border-border/30 opacity-40 transition-all duration-700 group-hover:translate-x-6 group-hover:translate-y-6 lg:group-hover:translate-x-12 lg:group-hover:translate-y-12 shadow-xl">
                        <img
                          src={project.images[1]}
                          alt=""
                          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    )}

                    {/* Primary Image */}
                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-muted/30 border border-border/50 shadow-2xl transition-all duration-700 group-hover:shadow-primary/5 group-hover:border-primary/20 z-10">
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-muted/50');
                          const span = document.createElement('span');
                          span.className = "text-[10vw] font-black text-muted-foreground/10";
                          span.innerText = project.name.split(' ').map(w => w[0]).join('');
                          e.currentTarget.parentElement?.appendChild(span);
                        }}
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
                        <div className="flex items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl">
                              <ArrowUpRight size={24} />
                           </div>
                           <span className="text-sm font-bold tracking-widest uppercase text-white">Explore Case Study</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <div className={cn(
                    "inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border transition-all duration-300",
                    colors.bg,
                    colors.text,
                    colors.border
                  )}>
                    <span className={cn("w-2 h-2 rounded-full", colors.dot)} />
                    {project.category}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-[1.1] tracking-tighter">
                    {project.name}
                  </h3>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {project.highlights.map((highlight) => (
                      <div 
                        key={highlight}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/10 hover:border-primary/20 hover:bg-muted/50 transition-all duration-300 group/item"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-sm font-bold text-foreground/80 leading-normal">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
