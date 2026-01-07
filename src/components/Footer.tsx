import { siteConfig } from "@/data/content";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 border-t border-border bg-gradient-to-t from-primary/5 to-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#strengths" className="text-muted-foreground hover:text-primary transition-colors">
              Strengths
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#beyond-work" className="text-muted-foreground hover:text-primary transition-colors">
              Beyond Work
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};
