import { siteConfig } from "@/data/content";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border bg-gradient-to-t from-muted/50 to-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">{siteConfig.initials}</div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="#strengths"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Strengths
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#beyond-work"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Beyond Work
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
