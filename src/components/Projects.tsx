import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/content";

const categoryColors: Record<string, string> = {
  "Sustainable Business": "bg-secondary/10 text-secondary border-secondary/30",
  "Operations": "bg-primary/10 text-primary border-primary/30",
  "Technology": "bg-accent/10 text-accent border-accent/30",
  "Business Development": "bg-primary/10 text-primary border-primary/30",
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-5 tracking-wide">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Highlight Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Selected initiatives that showcase my approach to building and scaling businesses
          </p>
        </div>

        <Tabs value={activeProject} onValueChange={setActiveProject} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-10">
            {projects.map((project) => (
              <TabsTrigger
                key={project.id}
                value={project.id}
                className="px-5 py-2.5 rounded-lg border border-border bg-card text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:shadow-sm data-[state=inactive]:hover:border-primary/30 transition-all duration-200 relative"
              >
                {project.name}
                {/* Active bottom indicator */}
                <span className="absolute -bottom-px left-2 right-2 h-0.5 bg-primary rounded-full opacity-0 data-[state=active]:opacity-100 transition-opacity" />
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id} className="animate-fade-up">
              <Card className="bg-card border-border max-w-4xl mx-auto shadow-lg shadow-foreground/[0.03] overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Carousel Section - 30% */}
                    <div className="w-full md:w-[30%] bg-muted/30 flex items-center justify-center min-h-[200px] md:min-h-[280px] relative">
                      {project.images && project.images.length > 0 ? (
                        <Carousel className="w-full h-full">
                          <CarouselContent className="h-full">
                            {project.images.map((image, index) => (
                              <CarouselItem key={index} className="h-full">
                                <div className="w-full h-full min-h-[200px] md:min-h-[280px] flex items-center justify-center">
                                  <img
                                    src={image}
                                    alt={`${project.name} - Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.currentTarget;
                                      target.style.display = 'none';
                                      const fallback = target.nextElementSibling;
                                      if (fallback) fallback.classList.remove('hidden');
                                    }}
                                  />
                                  <div className="hidden flex-col items-center justify-center text-muted-foreground bg-muted/50 w-full h-full">
                                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-2">
                                      <span className="text-xl font-bold text-muted-foreground">{project.name.charAt(0)}</span>
                                    </div>
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {project.images.length > 1 && (
                            <>
                              <CarouselPrevious className="left-2 h-8 w-8 bg-background/80 hover:bg-background" />
                              <CarouselNext className="right-2 h-8 w-8 bg-background/80 hover:bg-background" />
                            </>
                          )}
                        </Carousel>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-2">
                            <span className="text-xl font-bold">{project.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Content Section - 70% */}
                    <div className="w-full md:w-[70%] p-8">
                      <Badge className={`mb-4 border ${categoryColors[project.category] || "bg-muted text-muted-foreground"}`}>
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="bg-muted text-foreground">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
