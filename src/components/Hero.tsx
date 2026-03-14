import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Linkedin, ArrowRight, ChevronDown, Activity, Globe, Zap } from "lucide-react";
import { siteConfig } from "@/data/content";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const tags = [
    "Agentic Systems",
    "AI Driven Efficiency",
    "Auto ReAct Engines",
    "Intelligent Workflows",
    "Multi-Agent Systems",
    "Resilient Intelligence"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % tags.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 bg-background relative overflow-hidden font-sans"
    >
      {/* Sophisticated Background - Engineering/Operations grid vibe */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Subtle Mesh Gradient */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px] will-change-transform pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[100px] will-change-transform pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      />

      <div
        className="container mx-auto relative z-10 max-w-5xl"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Content Area */}
          <div className="lg:col-span-8 text-left space-y-8">
            {/* Tagline / Name introduction */}
            <div className="animate-hero-fade flex items-center gap-4">
              <div className="h-[1px] w-12 bg-primary/40" />
              <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-primary">
                {siteConfig.name}
              </p>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight animate-hero-fade"
              style={{ animationDelay: "0.15s" }}
            >
<<<<<<< HEAD
              Architecting <br /><span className="inline-block min-h-[1.2em] pb-1 text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transition-all duration-500">
                {tags[currentTagIndex]}
              </span> <br />for B2B Scale.
=======
              <span className="block mb-2 text-foreground/90">Architecting</span>
              <span className="block text-2xl md:text-4xl lg:text-5xl py-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {tags[currentTagIndex]}
              </span>
              <span className="block mt-2 text-foreground/90">for B2B Scale.</span>
>>>>>>> 4ca5f0c (feat: implement a new minimalist V2 landing page with dedicated components, content, and design plans, alongside minor adjustments to the existing homepage.)
            </h1>

            {/* Value Proposition */}
            <p
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-hero-fade font-light"
              style={{ animationDelay: "0.3s" }}
            >
              Building autonomous B2B engines that think, act, and scale. Bridging the gap between complex B2B operations and AI-driven efficiency.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 animate-hero-fade" style={{ animationDelay: "0.45s" }}>
              <Button
                size="lg"
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto px-8 py-7 text-base rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] shadow-xl shadow-foreground/10 transition-all font-semibold group border border-transparent"
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.querySelector("#evidence")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-7 text-base rounded-full border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all font-medium"
              >
                View Portfolio
              </Button>
            </div>

            {/* Contact details */}
            <div
              className="flex flex-wrap items-center gap-6 pt-8 animate-hero-fade border-t border-border/40 mt-8"
              style={{ animationDelay: "0.55s" }}
            >
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                {siteConfig.email}
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={16} className="text-primary" />
                LinkedIn
              </a>
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                {siteConfig.location}
              </span>
            </div>
          </div>

          {/* Value Highlights / Stats Column */}
          <div className="lg:col-span-4 lg:pl-8 space-y-6 hidden lg:block animate-hero-fade" style={{ animationDelay: "0.5s" }}>

            {/* The "16+ Years" Callout */}
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-2xl shadow-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={80} />
              </div>
              <h2 className="text-6xl font-black text-foreground tracking-tighter mb-2">16<span className="text-primary">+</span></h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Years Experience</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4 border-t border-border/50 pt-4">
                Optimizing supply chains, expanding across 4 continents, and scaling businesses from the ground up.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 flex flex-col justify-center">
                <Globe className="h-6 w-6 text-secondary mb-3" />
                <h4 className="font-bold text-foreground">Global Reach</h4>
                <p className="text-xs text-muted-foreground mt-1">4 Continents</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 flex flex-col justify-center">
                <Zap className="h-6 w-6 text-accent mb-3" />
                <h4 className="font-bold text-foreground">Efficiency</h4>
                <p className="text-xs text-muted-foreground mt-1">Tech-enabled</p>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-hero-fade hidden md:flex" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={scrollToContent}
            className="w-10 h-16 rounded-full border border-border flex items-start justify-center p-2 hover:border-primary/50 transition-colors group"
            aria-label="Scroll down"
          >
            <div className="w-1.5 h-3 bg-muted-foreground rounded-full animate-bounce group-hover:bg-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};
