import { Card, CardContent } from "@/components/ui/card";
import { beyondWork } from "@/data/content";
import { Plane, BookOpen, Dumbbell, GraduationCap } from "lucide-react";
import { StaggeredCard } from "@/components/ScrollAnimationWrapper";
const iconMap: Record<string, {
  icon: React.ReactNode;
  color: string;
}> = {
  Plane: {
    icon: <Plane className="h-6 w-6" />,
    color: "bg-accent/15 text-accent"
  },
  BookOpen: {
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-primary/15 text-primary"
  },
  Dumbbell: {
    icon: <Dumbbell className="h-6 w-6" />,
    color: "bg-secondary/15 text-secondary"
  },
  GraduationCap: {
    icon: <GraduationCap className="h-6 w-6" />,
    color: "bg-accent/15 text-accent"
  }
};
export const BeyondWork = () => {
  return <section id="beyond-work" className="py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Personal</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Beyond Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interests and activities that keep me balanced and inspired
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {beyondWork.map((item, index) => {
          const iconData = iconMap[item.icon];
          return <StaggeredCard key={item.title} index={index}>
                <Card className="bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconData.color} mb-3 group-hover:scale-110 transition-transform`}>
                      {iconData.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggeredCard>;
        })}
        </div>
      </div>
    </section>;
};