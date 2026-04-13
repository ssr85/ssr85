import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
  "Sustainable Enterprise": { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/30" },
  "Operations Optimization": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  "Technical Implementation": { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
  "Strategic Growth": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);

  return (
    <section id="projects" className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-5 tracking-wide">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Initiatives that showcase my approach to building and scaling resilient businesses.
          </p>
        </div>

        <Tabs value={activeProject} onValueChange={setActiveProject} className="w-full">
          {/* Custom Tabs List */}
          <TabsList className="flex flex-wrap justify-center gap-3 bg-transparent h-auto mb-12 p-0">
            {projects.map((project) => (
              <TabsTrigger
                key={project.id}
                value={project.id}
                className={cn(
                  "px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-muted-foreground font-medium transition-all duration-300",
                  "data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20",
                  "data-[state=inactive]:hover:border-primary/50 data-[state=inactive]:hover:bg-primary/5 data-[state=inactive]:hover:text-foreground"
                )}
              >
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          <div className="relative min-h-[500px]">
            {projects.map((project) => (
              <TabsContent 
                key={project.id} 
                value={project.id} 
                className="absolute inset-0 transition-all duration-500 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=active]:opacity-100 animate-in fade-in zoom-in-95 data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out-95"
              >
                <Card className="bg-card/60 backdrop-blur-md border-border/50 shadow-2xl shadow-black/5 overflow-hidden h-full rounded-2xl group">
                  <div className="flex flex-col lg:flex-row h-full">
                    
                    {/* Content Side */}
                    <CardContent className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-0 lg:block hidden" />
                      
                      <div className="relative z-10">
                        {/* Category Badge */}
                        <div className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border",
                          categoryColors[project.category]?.bg || "bg-muted",
                          categoryColors[project.category]?.text || "text-muted-foreground",
                          categoryColors[project.category]?.border || "border-border"
                        )}>
                          {project.category}
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </h3>
                        
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                          {project.description}
                        </p>
                        
                        {/* Highlights (Pills) */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest opacity-80">Highlights</h4>
                          <div className="flex flex-wrap gap-2.5">
                            {project.highlights.map((highlight) => (
                              <span 
                                key={highlight} 
                                className="px-4 py-2 rounded-lg bg-secondary/5 border border-secondary/20 text-secondary text-sm font-medium hover:bg-secondary/10 hover:border-secondary/40 transition-colors cursor-default"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Image / Visual Side */}
                    <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-muted/30 relative overflow-hidden order-1 lg:order-2 flex items-center justify-center p-8">
                       {/* Subtle animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50 block" />
                      
                      {project.images && project.images.length > 0 ? (
                        <div className="relative w-full aspect-video lg:aspect-square flex items-center justify-center">
                           {/* Main Image */}
                           <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl z-20 group-hover:scale-[1.02] transition-transform duration-700 ease-in-out border border-white/10">
                              <img
                                src={project.images[0]}
                                alt={`${project.name} preview`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement!.classList.add('bg-muted/80', 'flex', 'items-center', 'justify-center');
                                  e.currentTarget.parentElement!.innerHTML = `<span class="text-6xl font-bold text-muted-foreground/30">${project.name.charAt(0)}</span>`;
                                }}
                              />
                           </div>
                           
                           {/* Secondary Images (Decorative staggered behind) */}
                           {project.images.length > 1 && (
                             <div className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-10 translate-x-4 translate-y-4 rotate-2 opacity-60 transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-3 border border-white/5">
                               <img src={project.images[1]} alt="" className="w-full h-full object-cover" />
                             </div>
                           )}
                           {project.images.length > 2 && (
                             <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg z-0 -translate-x-4 -translate-y-4 -rotate-2 opacity-30 transition-all duration-500 group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:-rotate-3 border border-white/5">
                               <img src={project.images[2]} alt="" className="w-full h-full object-cover" />
                             </div>
                           )}
                        </div>
                      ) : (
                        <div className="w-full aspect-video rounded-2xl bg-muted/50 border border-border flex flex-col items-center justify-center text-muted-foreground">
                          <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border/50">
                            <span className="text-3xl font-bold text-primary/50">{project.name.charAt(0)}</span>
                          </div>
                          <span className="text-sm tracking-widest uppercase opacity-50 font-medium">Concept Preview</span>
                        </div>
                      )}
                      
                      {/* Decorative Link Icon */}
                      <div className="absolute top-6 right-6 w-12 h-12 bg-background/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-30 ring-1 ring-border">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};
