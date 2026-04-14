import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, { bg: string, text: string, border: string, dot: string }> = {
  "Sustainable Enterprise": { bg: "bg-emerald-500/5", text: "text-emerald-500", border: "border-emerald-500/20", dot: "bg-emerald-500" },
  "Operations Optimization": { bg: "bg-blue-500/5", text: "text-blue-500", border: "border-blue-500/20", dot: "bg-blue-500" },
  "Technical Implementation": { bg: "bg-purple-500/5", text: "text-purple-500", border: "border-purple-500/20", dot: "bg-purple-500" },
  "Strategic Growth": { bg: "bg-amber-500/5", text: "text-amber-500", border: "border-amber-500/20", dot: "bg-amber-500" },
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState(projects[0].id);
  const project = projects.find((p) => p.id === activeTab)!;
  const colors = categoryColors[project.category] || categoryColors["Strategic Growth"];

  return (
    <section id="projects" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Selected Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 tracking-tight">
              Engineering <span className="text-muted-foreground/30">Scale.</span>
            </h2>
          </div>
  
          {/* Tab Navigation */}
          <div className="w-full overflow-x-auto scrollbar-hide mb-16">
            <div className="inline-flex p-1 bg-background/50 backdrop-blur-md border border-border/50 rounded-full shadow-inner h-fit whitespace-nowrap">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shrink-0",
                    activeTab === p.id
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
  
          {/* Active Project Detail */}
          <div 
            key={activeTab}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center animate-in fade-in slide-in-from-bottom-12 duration-700"
          >
            {/* Interactive Image Gallery Side */}
            <div className="relative group cursor-pointer w-full aspect-[16/10] lg:aspect-[14/9]">
              {/* Secondary Image (Behind) - Swaps to Front on Hover */}
              <div className={cn(
                "absolute inset-0 translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8 rounded-[2rem] overflow-hidden border border-border/30 transition-all duration-700 ease-out shadow-xl z-0",
                "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:z-20 group-hover:scale-[1.02]"
              )}>
                <img
                  src={project.images[1] || project.images[0]}
                  alt=""
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0",
                    !project.images[1] && "scale-110"
                  )}
                />
              </div>
  
              {/* Primary Image (Front) - Swaps to Back on Hover */}
              <div className={cn(
                "relative h-full w-full overflow-hidden rounded-[2rem] bg-muted/30 border border-border/50 shadow-2xl transition-all duration-700 ease-out z-10",
                "group-hover:translate-x-4 group-hover:translate-y-4 lg:group-hover:translate-x-8 lg:group-hover:translate-y-8 group-hover:z-0 group-hover:opacity-60 group-hover:grayscale-[0.8]"
              )}>
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-500 flex items-end p-8 md:p-12">
                  <div className="flex items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl">
                        <ArrowUpRight size={24} />
                     </div>
                     <span className="text-sm font-bold tracking-widest uppercase text-white">View Details</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Content side */}
            <div className="flex flex-col">
              <div className={cn(
                "inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border transition-all duration-300 w-fit",
                colors.bg,
                colors.text,
                colors.border
              )}>
                <span className={cn("w-2 h-2 rounded-full", colors.dot)} />
                {project.category}
              </div>
  
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tighter">
                {project.name}
              </h3>
  
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl font-light">
                {project.description}
              </p>
  
              <div className="grid grid-cols-1 gap-4 max-w-md">
                {project.highlights.map((highlight) => (
                  <div 
                    key={highlight}
                    className="flex items-start gap-3 p-5 rounded-2xl bg-muted/30 border border-border/10 hover:border-primary/20 hover:bg-muted/50 transition-all duration-300 group/item"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                    <span className="text-sm font-bold text-foreground/80 leading-normal">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
