import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/data/content";
import { Mail, FileText, ChevronUp } from "lucide-react";
import { ResumeDownloadModal } from "@/components/ResumeDownloadModal";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [footerProgress, setFooterProgress] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const caseStudies = document.getElementById("case-studies");
      if (caseStudies) {
        const csRect = caseStudies.getBoundingClientRect();
        const triggerStart = window.innerHeight * 0.9;
        const triggerEnd = window.innerHeight * 0.4;
        
        let progress = (triggerStart - csRect.top) / (triggerStart - triggerEnd);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }

      if (footerRef.current) {
        const fRect = footerRef.current.getBoundingClientRect();
        // Start landing transition as footer enters
        const landingStart = window.innerHeight; 
        const landingEnd = window.innerHeight - 120; // Expanded range for smoother blend
        
        let fProgress = (landingStart - fRect.top) / (landingStart - landingEnd);
        setFooterProgress(Math.max(0, Math.min(1, fProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const baseOpacity = scrollProgress > 0 ? 0.1 + (scrollProgress * 0.7) : 0;
  const showButton = baseOpacity > 0;

  // Cross-fade logic: Ensure the transition is truly gradual
  const floatingOpacity = baseOpacity * (1 - footerProgress);
  const footerButtonOpacity = footerProgress;

  return (
    <footer ref={footerRef} className="py-12 px-4 border-t border-border/40 bg-background relative overflow-hidden">
      <EngineeringGrid />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
              className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            
            {/* Docked Back to Top Button slot */}
            <div className="w-10 h-10 relative">
              <button
                onClick={scrollToTop}
                style={{ opacity: footerButtonOpacity }}
                className={cn(
                  "absolute inset-0 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300",
                  footerProgress < 0.2 && "pointer-events-none"
                )}
                aria-label="Back to top"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Button aligned with its Footer slot */}
        <div className={cn(
          "fixed bottom-8 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300",
          footerProgress === 1 ? "opacity-0 invisible" : "opacity-100"
        )}>
          <div className="container mx-auto px-4 flex justify-end">
            {/* Using same horizontal structure as footer buttons row */}
            <div className="flex items-center gap-3">
              {/* Spacer divs to match width of Mail and LinkedIn buttons */}
              <div className="w-10 h-10" />
              <div className="w-10 h-10" />
              
              <button
                onClick={scrollToTop}
                style={{ opacity: floatingOpacity }}
                className={cn(
                  "pointer-events-auto w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 group border border-primary-foreground/10",
                  showButton ? "translate-y-0" : "translate-y-20 opacity-0"
                )}
                aria-label="Back to top"
              >
                <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

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

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground/70">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
