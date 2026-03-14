import { useState, useEffect } from "react";
import { caseStudies } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Target, AlertCircle, Cpu } from "lucide-react";

export const CaseStudies = () => {
    const [activeTab, setActiveTab] = useState(caseStudies[0].id);
    const activeProject = caseStudies.find((p) => p.id === activeTab)!;
    const [painPointIndex, setPainPointIndex] = useState(0);

    useEffect(() => {
        setPainPointIndex(0);
    }, [activeTab]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPainPointIndex((prev) => (prev + 1) % activeProject.painPoints.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [activeProject.painPoints.length, activeTab]);

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

                    {/* Segmented Control Moved into Header RHS */}
                    <div className="inline-flex p-1 bg-background/50 backdrop-blur-md border border-border/50 rounded-full shadow-inner h-fit">
                        {caseStudies.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setActiveTab(project.id)}
                                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeTab === project.id
                                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`}
                            >
                                {project.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Detail Card */}
                <div
                    key={activeTab}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-card/50 backdrop-blur-xl border border-border/40 p-8 md:p-12 rounded-[2rem] shadow-2xl animate-scale-in"
                >
                    <div className="space-y-8">
                        <div>
                            <Badge variant="secondary" className="mb-4 uppercase tracking-widest text-[10px] py-1 px-3">
                                {activeProject.category}
                            </Badge>
                            <h3 className="text-4xl font-bold mb-4 tracking-tight">{activeProject.name}</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-light">
                                {activeProject.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-wider">
                                    <Target size={14} />
                                    <span>Target Audience</span>
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">{activeProject.audience}</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
                                    <AlertCircle size={14} />
                                    <span>Pain Points Solved</span>
                                </div>
                                <div className="h-10 md:h-6 overflow-hidden relative">
                                    <div
                                        key={`${activeTab}-${painPointIndex}`}
                                        className="flex items-start gap-2 text-xs text-foreground/80 font-medium leading-relaxed animate-slide-up"
                                    >
                                        <span className="text-accent mt-1 text-[8px]">●</span>
                                        <span>{activeProject.painPoints[painPointIndex]}</span>
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
                                    {activeProject.techStack.map((tech, i) => (
                                        <Badge key={i} variant="outline" className="bg-background/40 border-border/40 text-[10px] py-0.5">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Impact Metrics</div>
                                <div className="grid grid-cols-1 gap-3">
                                    {activeProject.stats.map((stat, i) => (
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
            </div>
        </section>
    );
};
