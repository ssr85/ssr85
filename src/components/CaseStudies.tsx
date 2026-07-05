import { useState, useEffect } from "react";
import { caseStudies } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, AlertCircle, Cpu, ChevronDown } from "lucide-react";

const cardAccents = [
  "from-primary to-primary/60",
  "from-secondary to-secondary/60",
  "from-accent to-accent/60",
  "from-primary to-secondary",
  "from-secondary to-accent",
];

export const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);
  const desktopProject = caseStudies.find((p) => p.id === activeTab)!;
  const [painPointIndex, setPainPointIndex] = useState(0);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    setPainPointIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPainPointIndex((prev) => (prev + 1) % desktopProject.painPoints.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [desktopProject.painPoints.length, activeTab]);

  return (
    <section id="case-studies" className="py-20 md:py-28 px-4 bg-muted/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 animate-hero-fade">
          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
              Work
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">Case Studies</h2>
            <p className="text-muted-foreground text-lg font-light max-w-lg">
              Deep dives into agentic engines built for B2B scale.
            </p>
          </div>

          {/* Desktop: Segmented Control (unchanged) */}
          <div className="hidden md:block w-full md:w-auto overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="inline-flex p-1 bg-background/50 backdrop-blur-md border border-border/50 rounded-full shadow-inner h-fit whitespace-nowrap">
              {caseStudies.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveTab(project.id)}
                  className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 ${
                    activeTab === project.id
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Project Detail Card (unchanged) */}
        <div
          key={activeTab}
          className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-card/50 backdrop-blur-xl border border-border/40 p-8 md:p-12 rounded-[2rem] shadow-2xl animate-scale-in"
        >
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4 uppercase tracking-widest text-[10px] py-1 px-3">
                {desktopProject.category}
              </Badge>
              <h3 className="text-4xl font-bold mb-4 tracking-tight">{desktopProject.name}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                {desktopProject.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
                  <Target size={14} />
                  <span>Target Audience</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{desktopProject.audience}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
                  <AlertCircle size={14} />
                  <span>Pain Points Solved</span>
                </div>
                <div className="h-8 md:h-6 overflow-hidden relative">
                  <div
                    key={`${activeTab}-${painPointIndex}`}
                    className="flex items-start gap-2 text-xs text-foreground/80 font-medium leading-relaxed animate-slide-up"
                  >
                    <span className="text-accent mt-1 text-[8px]">&#9679;</span>
                    <span>{desktopProject.painPoints[painPointIndex]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:pl-12 lg:border-l border-border/40 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-secondary font-bold text-[11px] uppercase tracking-wider">
                  <Cpu size={16} />
                  <span>Agent Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {desktopProject.techStack.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-background/40 border-border/40 text-[10px] py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Impact Metrics</div>
                <div className="grid grid-cols-1 gap-3">
                  {desktopProject.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/20 group hover:border-primary/30 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-semibold text-foreground/80">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: 2x2 Grid with Hover/Tap Expansion (< md) — matches Snapshot pattern */}
        <div className="md:hidden">
          {expandedIndex === null ? (
            <div className="grid grid-cols-2 gap-3">
              {caseStudies.map((project, i) => (
                <Card
                  key={project.id}
                  onClick={() => handleExpand(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Expand ${project.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleExpand(i); } }}
                  className="bg-card/40 backdrop-blur-sm border-border/80 hover:border-primary/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-all duration-300 p-4 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-muted-foreground/20" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-muted-foreground/20" />
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${cardAccents[i % cardAccents.length]} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />
                  <div className="flex flex-col items-center justify-center gap-3 text-center relative z-10 h-full min-h-[90px]">
                    <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${cardAccents[i % cardAccents.length]}`} />
                    <h3 className="font-bold text-foreground text-sm leading-tight">
                      {project.name}
                    </h3>
                    <ChevronDown className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/60 transition-all duration-300 group-hover:translate-y-0.5" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {(() => {
                const project = caseStudies[expandedIndex];
                return (
                  <Card
                    key={project.id}
                    onClick={() => setExpandedIndex(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Collapse ${project.name}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedIndex(null); } }}
                    className="bg-card backdrop-blur-sm border-primary/40 shadow-xl shadow-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-all duration-300 p-5 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-muted-foreground/20" />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-muted-foreground/20" />
                    <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${cardAccents[expandedIndex % cardAccents.length]} rounded-full blur-3xl opacity-10 transition-opacity duration-700 pointer-events-none`} />
                    <CardContent className="p-0 text-left relative z-10 space-y-5">
                      <div>
                        <Badge variant="secondary" className="mb-3 uppercase tracking-widest text-[10px] py-1 px-3">
                          {project.category}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">{project.name}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm font-light">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-border/40">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
                            <Target size={14} />
                            <span>Target Audience</span>
                          </div>
                          <p className="text-sm text-muted-foreground font-medium">{project.audience}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
                            <AlertCircle size={14} />
                            <span>Pain Points Solved</span>
                          </div>
                          <ul className="space-y-1">
                            {project.painPoints.slice(0, 3).map((pp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                                <span className="text-accent mt-1 text-[8px] shrink-0">&#9679;</span>
                                <span>{pp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-border/40">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-secondary font-bold text-[11px] uppercase tracking-wider">
                            <Cpu size={16} />
                            <span>Agent Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, i) => (
                              <Badge key={i} variant="outline" className="bg-background/40 border-border/40 text-[10px] py-0.5">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Impact Metrics</div>
                          <div className="grid grid-cols-1 gap-2">
                            {project.stats.map((stat, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/20 transition-colors">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                <span className="text-sm font-semibold text-foreground/80">{stat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              <div className="grid grid-cols-2 gap-2">
                {caseStudies
                  .filter((_, i) => i !== expandedIndex)
                  .map((project) => {
                    const originalIndex = caseStudies.findIndex((c) => c.id === project.id);
                    return (
                      <Card
                        key={project.id}
                        onClick={() => handleExpand(originalIndex)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Expand ${project.name}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleExpand(originalIndex); } }}
                        className="bg-card/40 backdrop-blur-sm border-border/80 hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-all duration-300 p-3 cursor-pointer relative overflow-hidden group"
                      >
                        <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-muted-foreground/20" />
                        <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-muted-foreground/20" />
                        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${cardAccents[originalIndex % cardAccents.length]} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />
                        <div className="flex flex-col items-center justify-center gap-1.5 text-center relative z-10 h-full min-h-[65px]">
                          <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${cardAccents[originalIndex % cardAccents.length]}`} />
                          <h3 className="font-bold text-foreground text-[10px] leading-tight">
                            {project.name}
                          </h3>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
