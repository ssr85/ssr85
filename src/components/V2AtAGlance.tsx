import { v2AtAGlance } from "@/data/v2Content";
import { StaggeredCard } from "./ScrollAnimationWrapper";

export const V2AtAGlance = () => {
  return (
    <section id="at-a-glance" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-white/40 mb-2">Snapshot</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">At a Glance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {v2AtAGlance.map((item, index) => (
            <StaggeredCard
              key={item.title}
              index={index}
              className="flex flex-col group p-8 rounded-3xl hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/10"
            >
              <span className="text-primary text-2xl font-bold mb-4 block group-hover:translate-x-1 transition-transform">0{index + 1}</span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </StaggeredCard>
          ))}
        </div>
      </div>
    </section>
  );
};
