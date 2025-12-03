import { Card, CardContent } from "@/components/ui/card";
import { beyondWork } from "@/data/content";
import { Plane, BookOpen, Dumbbell, GraduationCap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
  Dumbbell: <Dumbbell className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
};

export const BeyondWork = () => {
  return (
    <section id="beyond-work" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Beyond Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interests and activities that keep me balanced and inspired
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {beyondWork.map((item, index) => (
            <Card
              key={item.title}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  {iconMap[item.icon]}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
