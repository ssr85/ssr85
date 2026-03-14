import { ArrowRight, Sparkles } from "lucide-react";
import { v2SiteConfig } from "@/data/v2Content";
import { useEffect, useState } from "react";

interface V2HeroProps {
  onOpenEnquiry: () => void;
}

export const V2Hero = ({ onOpenEnquiry }: V2HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div
              className={`transition-all duration-1000 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <h1 className="text-6xl md:text-[7.5rem] font-bold tracking-tight text-black leading-[0.85] mb-10 whitespace-pre-line">
                {v2SiteConfig.tagline}
              </h1>
            </div>

            <div
              className={`flex flex-col md:flex-row gap-8 md:gap-16 transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-xl font-medium">
                {v2SiteConfig.heroSubtext}
              </p>
              <div className="flex flex-col justify-end pt-4">
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em] mb-3">
                  System Architecture
                </p>
                <p className="text-lg text-black/80 max-w-[200px] font-semibold leading-snug">
                  {v2SiteConfig.experienceText}
                </p>
              </div>
            </div>

            <div
              className={`mt-12 md:mt-16 flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <button 
                onClick={scrollToProjects}
                className="bg-black text-white px-10 py-5 rounded-full font-bold flex items-center group hover:bg-black/90 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95"
              >
                Explore the Engine
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onOpenEnquiry}
                className="bg-transparent text-black border-2 border-black/5 px-10 py-5 rounded-full font-bold hover:bg-black/5 transition-all active:scale-95"
              >
                Start a Project
              </button>
            </div>
          </div>

          {/* AI Graphic Placeholder - High End Abstract 3D style */}
          <div className={`hidden lg:block lg:col-span-4 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-12"
          }`}>
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent rounded-full blur-3xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Abstract "Engine" SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-black/5 animate-slow-spin">
                  <path fill="currentColor" d="M40,-68.2C51.1,-61.1,58.8,-48.1,65.6,-35C72.4,-21.9,78.3,-8.6,76.5,4.1C74.6,16.8,65.1,28.9,55.1,39.6C45.1,50.3,34.7,59.5,22.3,64.4C9.9,69.3,-4.5,69.9,-18.3,66.1C-32.1,62.3,-45.3,54.1,-55.8,43C-66.3,31.9,-74,18,-75.6,3.6C-77.2,-10.8,-72.7,-25.6,-64.3,-38.3C-55.9,-51,-43.6,-61.7,-30.3,-67.7C-17,-73.7,-2.6,-75,11.3,-71.5C25.2,-68,31.1,-75.3,40,-68.2Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center justify-center group hover:rotate-6 transition-transform duration-500">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-1/4 right-0 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 left-0 w-6 h-6 border-2 border-black/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
    </section>
  );
};
