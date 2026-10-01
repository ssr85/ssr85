import { useRef, useState, useEffect } from "react";
import { ArrowRight, Globe, Zap, BrainCircuit, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, heroTags } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { useThrottledScroll } from "@/hooks/use-throttle";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [tagIndex, setTagIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % heroTags.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
      className="min-h-[92vh] flex items-center justify-center pt-28 md:pt-36 pb-20 px-4 bg-background relative overflow-hidden font-sans"
    >
      <EngineeringGrid size="4rem 4rem" opacity={0.25} />

      {/* Luminous Ambient Mesh Glows */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/[0.07] dark:bg-primary/[0.09] rounded-full blur-[140px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <div
        className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-secondary/[0.06] dark:bg-secondary/[0.08] rounded-full blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.03}px)` }}
      />

      <div
        className="container mx-auto relative z-10 max-w-5xl"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        {/* Eyebrow Status Badge */}
        <div className="animate-hero-fade flex items-center gap-3 mb-6">
          <div className="badge-eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>B2B AI Specialist &bull; {siteConfig.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start justify-between min-h-full">
            <div className="space-y-6 md:space-y-8">
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.12] tracking-tight animate-hero-fade"
                style={{ animationDelay: "0.15s" }}
              >
                Engineering <br />
                <span className="relative inline-flex items-center h-[1.3em] overflow-hidden align-top">
                  {isMounted ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroTags[tagIndex]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-secondary whitespace-nowrap py-1"
                      >
                        {heroTags[tagIndex]}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <span className="inline-block text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary whitespace-nowrap py-1">
                      {heroTags[0]}
                    </span>
                  )}
                </span>
                <br />for B2B Scale.
              </h1>

              <p
                className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl animate-hero-fade font-normal"
                style={{ animationDelay: "0.3s" }}
              >
                B2B AI Strategy & Agentic Systems Consultant bridging enterprise operations with autonomous LLM orchestration and custom software pipelines.
              </p>
            </div>

            {/* Haptic Island Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-8 animate-hero-fade mt-auto w-full sm:w-auto" style={{ animationDelay: "0.45s" }}>
              <button
                onClick={onOpenEnquiry}
                className="group relative inline-flex items-center justify-between sm:justify-start gap-4 pl-6 pr-2 py-2 rounded-full bg-foreground text-background dark:bg-primary dark:text-primary-foreground font-semibold text-sm md:text-base shadow-xl shadow-foreground/10 dark:shadow-primary/20 transition-all duration-300 hover:opacity-95 active:scale-[0.98]"
              >
                <span>Let's Connect</span>
                <span className="w-8 h-8 rounded-full bg-background/20 dark:bg-background/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-[0.5px]">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <button
                onClick={scrollToCaseStudies}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm md:text-base font-semibold border border-black/10 dark:border-white/10 hover:bg-muted/50 transition-all duration-200 active:scale-[0.98] text-foreground"
              >
                View Work
              </button>
            </div>
          </div>

          {/* Desktop Double-Bezel Hardware Panel */}
          <div className="lg:col-span-5 lg:pl-4 flex flex-col justify-between hidden lg:flex animate-hero-fade" style={{ animationDelay: "0.5s" }}>
            <div className="double-bezel">
              <div className="double-bezel-inner space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground">
                      Capabilities Matrix
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    Q4 Available
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "B2B AI Strategy & Roadmaps", detail: "Translating ops logic to agents" },
                    { label: "Autonomous Agentic Builds", detail: "CrewAI & LangGraph with HITL" },
                    { label: "WordPress AI Engineering", detail: "Bespoke plugins & Headless SSG" },
                    { label: "Operations Sync Engines", detail: "Freshsales & HubSpot 2-way sync" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-xl border border-black/5 dark:border-white/10 bg-background/50 flex items-start gap-3 transition-colors hover:border-primary/40"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-center">
                    <Globe className="h-5 w-5 text-primary mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-foreground">Global Reach</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">4 Continents</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-center">
                    <Zap className="h-5 w-5 text-primary mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-foreground">High Leverage</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Zero Bloat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Capabilities Grid */}
        <div className="lg:hidden mt-8 animate-hero-fade" style={{ animationDelay: "0.5s" }}>
          <div className="double-bezel">
            <div className="double-bezel-inner p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Core Focus Areas
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>AI Strategy & Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Agentic Systems Builds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Custom WordPress Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Two-Way CRM Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-hero-fade hidden md:flex z-20" style={{ animationDelay: "1.2s" }}>
        <div className="animate-smooth-bounce">
          <button
            onClick={scrollToContent}
            className="w-8 h-12 rounded-full border border-primary/40 flex items-start justify-center p-1.5 transition-all duration-300 bg-background/20 hover:border-primary/80"
            aria-label="Scroll down"
          >
            <div className="w-1.5 h-2.5 bg-primary/80 rounded-full" />
          </button>
        </div>
      </div>
    </section>
  );
};
