import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <section id="projects" className="py-12 md:py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Highlight Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selected initiatives that showcase my approach to building and scaling businesses
          </p>
        </div>

        <Tabs value={activeProject} onValueChange={setActiveProject} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            {projects.map((project) => (
              <TabsTrigger
                key={project.id}
                value={project.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 px-5 py-2.5 rounded-full border border-border data-[state=inactive]:bg-card data-[state=inactive]:hover:border-primary/50 transition-all"
              >
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id}>
              <Card className="bg-card border-border max-w-4xl mx-auto animate-fade-in shadow-xl shadow-primary/5 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section - 30% */}
                    <div className="w-full md:w-[30%] bg-muted/50 flex items-center justify-center min-h-[200px] md:min-h-[280px]">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`flex flex-col items-center justify-center text-muted-foreground ${project.image ? 'hidden' : ''}`}>
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                          <span className="text-2xl font-bold">{project.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm">Add image</span>
                      </div>
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
