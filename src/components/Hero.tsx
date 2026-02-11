import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Linkedin, ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/content";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

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
      ref={heroRef}
      className="min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-4 bg-gradient-to-br from-primary/8 via-background to-secondary/8 relative overflow-hidden"
    >
      {/* Refined parallax blobs — fewer, larger, more diffused */}
      <div 
        className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div 
        className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[120px] will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] will-change-transform"
        style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` }}
      />
      
      <div 
        className="container mx-auto text-center relative z-10 max-w-3xl"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      >
        {/* Watermark initials — subtle background element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10" aria-hidden="true">
          <span className="text-[16rem] md:text-[20rem] font-bold text-primary/[0.04] leading-none">
            {siteConfig.initials}
          </span>
        </div>

        {/* Name — small, elegant, appears first */}
        <p 
          className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-primary mb-6 animate-hero-fade"
        >
          {siteConfig.name}
        </p>

        {/* Headline — benefit-oriented, clear value */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-hero-fade"
          style={{ animationDelay: "0.15s" }}
        >
          Building Scalable Operations & Sustainable Businesses
        </h1>

        {/* Subheading — specific value statement */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-hero-fade"
          style={{ animationDelay: "0.3s" }}
        >
          16+ years turning complex operations into growth engines — from supply chain optimisation to market expansion across 4 continents.
        </p>

        {/* CTA — prominent with breathing room */}
        <div className="animate-hero-fade" style={{ animationDelay: "0.45s" }}>
          <Button 
            size="lg" 
            onClick={onOpenEnquiry} 
            className="px-10 py-6 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg shadow-primary/20 group"
          >
            Let's Connect
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Contact badges — understated, supportive */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-10 animate-hero-fade"
          style={{ animationDelay: "0.55s" }}
        >
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} className="text-primary/60" />
            {siteConfig.location}
          </span>
          <span className="text-border">·</span>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Mail size={14} className="text-primary/60" />
            {siteConfig.email}
          </a>
          <span className="text-border">·</span>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={14} className="text-primary/60" />
            LinkedIn
          </a>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="mt-16 inline-flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-primary/60 transition-colors animate-hero-fade"
          style={{ animationDelay: "0.7s" }}
          aria-label="Scroll to content"
        >
          <span className="text-xs tracking-wider uppercase">Explore</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};
