import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Linkedin } from "lucide-react";
import { siteConfig } from "@/data/content";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero = ({ onOpenEnquiry }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="container mx-auto text-center">
        {/* Large Initials */}
        <div className="mb-8 animate-fade-in">
          <span className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-primary/10 select-none">
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
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <MapPin size={14} />
            {siteConfig.location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Mail size={14} />
            {siteConfig.email}
          </Badge>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            <Badge
              variant="secondary"
              className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <Linkedin size={14} />
              LinkedIn
            </Badge>
          </a>
        </div>

        {/* CTA */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" onClick={onOpenEnquiry} className="px-8">
            Let's Connect
          </Button>
        </div>
      </div>
    </section>
  );
};
