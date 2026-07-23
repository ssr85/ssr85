import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, ArrowRight, Globe, Zap, BrainCircuit, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig, heroTags } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { useThrottledScroll } from "@/hooks/use-throttle";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);

  useThrottledScroll(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        const current = window.scrollY;
        if (Math.abs(current - scrollYRef.current) > 2) {
          scrollYRef.current = current;
          setScrollY(current);
        }
      }
    }
  }, []);

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCaseStudies = () => scrollToSection("#case-studies", 35);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 bg-background relative overflow-hidden font-sans"
    >
      <EngineeringGrid size="4rem 4rem" />

      {/* Subtle Mesh Gradient */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[100px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      />
      <div
        className="container mx-auto relative z-10 max-w-5xl"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        {/* Top Tagline - Now explicitly separate to allow sub-grid alignment */}
        <div className="animate-hero-fade flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary/40" />
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-primary">
            {siteConfig.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Alignment Area: Left (Headline to CTAs) and Right (Boxes) */}
          <div className="lg:col-span-8 flex flex-col items-start justify-between min-h-full">
            <div className="space-y-8">
              {/* Headline */}
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight animate-hero-fade"
                style={{ animationDelay: "0.15s" }}
              >
                Engineering <br />
                <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                  <span className="tagline-track">
                    {heroTags.map((tag) => (
                      <span key={tag} className="tagline-item text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <br />for B2B Scale.
              </h1>

              {/* Value Proposition */}
              <p
                className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl animate-hero-fade font-light"
                style={{ animationDelay: "0.3s" }}
              >
                B2B AI Strategy & Agentic Systems Consultant bridging industry operations with autonomous engines.
              </p>
            </div>

            {/* CTAs - This is the bottom anchor for alignment */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-8 animate-hero-fade mt-auto w-full sm:w-auto" style={{ animationDelay: "0.45s" }}>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  onClick={onOpenEnquiry}
                  className="w-full px-6 sm:px-8 py-5 sm:py-7 text-sm sm:text-base rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/10 font-semibold group border border-transparent whitespace-nowrap"
                >
                  Let's Connect
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToCaseStudies}
                  className="w-full px-6 sm:px-8 py-5 sm:py-7 text-sm sm:text-base rounded-full border-border/50 hover:bg-muted/50 hover:border-primary/30 font-medium whitespace-nowrap"
                >
                  Portfolio
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Value Highlights / Availability Column */}
          <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-between hidden lg:flex animate-hero-fade" style={{ animationDelay: "0.5s" }}>
            {/* Open For card */}
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-2xl shadow-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BrainCircuit size={80} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Open For</p>
              </div>
              <ul className="space-y-3 border-t border-border/50 pt-4">
                {["AI Strategy & Roadmap", "B2B Agentic Builds", "Ops Transformation"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 flex flex-col justify-center">
                <Globe className="h-6 w-6 text-secondary mb-3" />
                <p className="font-bold text-foreground">Global</p>
                <p className="text-xs text-muted-foreground mt-1">4 Continents</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 flex flex-col justify-center">
                <Zap className="h-6 w-6 text-accent mb-3" />
                <p className="font-bold text-foreground">Efficiency</p>
                <p className="text-xs text-muted-foreground mt-1">Tech-enabled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only: Open For + Micro Stats */}
        <div className="lg:hidden grid grid-cols-1 gap-4 mt-10 animate-hero-fade" style={{ animationDelay: "0.5s" }}>
          <div className="p-5 rounded-2xl bg-card border border-border/50 flex items-center gap-4">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Open For</span>
              </div>
              <ul className="space-y-1">
                {["AI Strategy & Roadmap", "B2B Agentic Builds", "Ops Transformation"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <Globe className="h-5 w-5 text-secondary shrink-0" />
              <div>
                <p className="font-bold text-foreground text-sm">Global</p>
                <p className="text-[11px] text-muted-foreground">4 Continents</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <Zap className="h-5 w-5 text-accent shrink-0" />
              <div>
                <p className="font-bold text-foreground text-sm">Efficiency</p>
                <p className="text-[11px] text-muted-foreground">Tech-enabled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact details */}
        <div
          className="flex flex-wrap items-center gap-6 pt-8 animate-hero-fade border-t border-border/40 mt-12"
          style={{ animationDelay: "0.55s" }}
        >
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Mail size={16} className="text-primary" />
            {siteConfig.email}
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" className="text-primary" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            {siteConfig.location}
          </span>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-hero-fade hidden md:flex z-20" style={{ animationDelay: "1.2s" }}>
        <div className="animate-smooth-bounce">
          <button
            onClick={scrollToContent}
            className="w-10 h-16 rounded-full border border-primary/50 flex items-start justify-center p-2 transition-all duration-300 bg-background/10 hover:border-primary/80"
            aria-label="Scroll down"
          >
            <div className="w-1.5 h-3 bg-primary/80 rounded-full" />
          </button>
        </div>
      </div>
    </section>
  );
};
