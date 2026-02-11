import { useState } from "react";
import { siteConfig } from "@/data/content";
import { Linkedin, Mail, FileText } from "lucide-react";
import { ResumeDownloadModal } from "@/components/ResumeDownloadModal";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-gradient-to-t from-primary/5 to-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm story-link">
            <a href="#strengths" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Strengths
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Projects
            </a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Services
            </a>
            <a href="#beyond-work" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Beyond Work
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Download PDF Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FileText size={16} />
            <span>Download PDF Resume</span>
          </button>
        </div>

        <ResumeDownloadModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground/70">
            © {currentYear} {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};
