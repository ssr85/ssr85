import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, EyeOff } from "lucide-react";
import { v2CaseStudies } from "@/data/v2Content";

interface V2CaseStudiesProps {
  onOpenEnquiry: () => void;
}

export const V2CaseStudies = ({ onOpenEnquiry }: V2CaseStudiesProps) => {
  const [activeTab, setActiveTab] = useState(v2CaseStudies[0].id);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeProject = v2CaseStudies.find((p) => p.id === activeTab) || v2CaseStudies[0];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeProject.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setCurrentSlide(0);
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/30 mb-4">Evidence</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight">Case Studies</h2>
          </div>
          
          {/* Custom Pill Tabs */}
          <div className="flex p-1.5 bg-black/5 rounded-full overflow-x-auto no-scrollbar">
            {v2CaseStudies.map((project) => (
              <button
                key={project.id}
                onClick={() => handleTabChange(project.id)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === project.id
                    ? "bg-white text-black shadow-xl shadow-black/5"
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Content */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[450px]">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full mb-6 inline-block">
                  {activeProject.category}
                </span>
                <h3 className="text-4xl font-bold mb-4">{activeProject.name}</h3>
                <p className="text-black/60 text-lg leading-relaxed mb-8">
                  {activeProject.description}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-black/20 mb-4">Target Audience</h4>
                  <p className="text-black/80 font-medium">{activeProject.audience}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-black/20 mb-4">Pain Points Addressed</h4>
                  <ul className="space-y-3">
                    {activeProject.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-black/70 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-black/5">
              <button 
                onClick={onOpenEnquiry}
                className="group inline-flex items-center text-lg font-bold hover:text-primary transition-colors active:scale-95"
              >
                Discuss this outcome
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Visuals */}
          <div className="lg:col-span-7">
            <div className="relative group/visual rounded-3xl overflow-hidden bg-black/[0.02] border border-black/[0.03] shadow-2xl shadow-black/5">
              {/* Carousel container */}
              <div className={`transition-all duration-500 h-[500px] flex items-center justify-center ${
                activeProject.scrollable ? "overflow-y-auto no-scrollbar scroll-smooth p-8" : ""
              }`}>
                {activeProject.scrollable ? (
                  <div className="space-y-4 w-full">
                    {activeProject.images.map((img, idx) => (
                      <div key={idx} className="relative w-full rounded-2xl overflow-hidden shadow-lg">
                        <img 
                          src={img} 
                          alt={`${activeProject.name} detail ${idx + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={activeProject.images[currentSlide]} 
                      alt={activeProject.name}
                      className="w-full h-full object-contain p-4 animate-in fade-in zoom-in-95 duration-500"
                    />
                    
                    {/* Privacy Blur (Lead OG specific) */}
                    {activeProject.specialLabel === "leadog" && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[30%] h-[10%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center animate-pulse">
                          <EyeOff className="w-4 h-4 text-white/40" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Arrows (for non-scrollable) */}
              {!activeProject.scrollable && activeProject.images.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between pointer-events-none opacity-0 group-hover/visual:opacity-100 transition-opacity">
                  <button 
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/90 shadow-xl pointer-events-auto hover:bg-white transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/90 shadow-xl pointer-events-auto hover:bg-white transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {/* Dot Indicators */}
              {!activeProject.scrollable && activeProject.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {activeProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? "bg-black w-4" : "bg-black/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              {activeProject.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-black/60 uppercase tracking-widest">{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
