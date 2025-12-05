import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Linkedin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/content";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center justify-center pt-16 pb-10 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <div 
        className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/15 rounded-full blur-2xl transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      
      <div 
        className="container mx-auto text-center relative z-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        {/* Large Initials */}
        <div className="mb-6 animate-fade-in">
          <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent select-none">
            {siteConfig.initials}
          </span>
        </div>

        {/* Name and Tagline */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-secondary/20 text-foreground border border-secondary/30">
            <MapPin size={14} className="text-secondary" />
            {siteConfig.location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-foreground border border-primary/30">
            <Mail size={14} className="text-primary" />
            {siteConfig.email}
          </Badge>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            <Badge
              variant="secondary"
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-foreground border border-accent/30 hover:bg-accent/20 transition-colors cursor-pointer"
            >
              <Linkedin size={14} className="text-accent" />
              LinkedIn
            </Badge>
          </a>
        </div>

        {/* CTA */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button 
            size="lg" 
            onClick={onOpenEnquiry} 
            className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg shadow-primary/25 group"
          >
            Let's Connect
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
