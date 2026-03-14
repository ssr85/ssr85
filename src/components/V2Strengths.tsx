import { CheckCircle2 } from "lucide-react";
import { v2Strengths } from "@/data/v2Content";
import { StaggeredCard } from "./ScrollAnimationWrapper";

export const V2Strengths = () => {
  return (
    <section id="strengths" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start text-black">
          <div className="lg:w-1/3 sticky top-32">
            <p className="text-sm font-medium uppercase tracking-widest text-black/40 mb-2">Core Strengths</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for results.</h2>
            <p className="text-lg text-black/60 leading-relaxed">
              Competencies that drive sustainable results across every operational and strategic engagement.
            </p>
          </div>

          <div className="lg:w-2/3 space-y-16">
            {v2Strengths.map((strength, index) => (
              <StaggeredCard
                key={strength.title}
                index={index}
                className="group border-b border-black/5 pb-16 last:border-0"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{strength.title}</h3>
                    <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </StaggeredCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
