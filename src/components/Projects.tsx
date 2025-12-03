import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/content";

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);

  return (
    <section id="projects" className="py-10 md:py-14 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
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
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-lg"
              >
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id}>
              <Card className="bg-card border-border max-w-3xl mx-auto animate-fade-in">
                <CardContent className="p-8">
                  <Badge variant="outline" className="mb-4">
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
                      <Badge key={highlight} variant="secondary">
                        {highlight}
                      </Badge>
                    ))}
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
