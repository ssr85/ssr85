import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/content";
import { Mail, FileText, ChevronUp, Phone, Linkedin, Github } from "lucide-react";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { cn } from "@/lib/utils";
import { useThrottledScroll } from "@/hooks/use-throttle";

const ResumeDownloadModal = lazy(() =>
  import("@/components/ResumeDownloadModal").then((m) => ({ default: m.ResumeDownloadModal }))
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [footerProgress, setFooterProgress] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = () => {
    const caseStudies = document.getElementById("case-studies");
    if (caseStudies) {
      const csRect = caseStudies.getBoundingClientRect();
      const triggerStart = window.innerHeight * 0.9;
      const triggerEnd = window.innerHeight * 0.4;
      
      const progress = (triggerStart - csRect.top) / (triggerStart - triggerEnd);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }

    if (footerRef.current) {
      const fRect = footerRef.current.getBoundingClientRect();
      const landingStart = window.innerHeight; 
      const landingEnd = window.innerHeight - 120;
      
      const fProgress = (landingStart - fRect.top) / (landingStart - landingEnd);
      setFooterProgress(Math.max(0, Math.min(1, fProgress)));
    }
  };

  useThrottledScroll(handleScroll, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const baseOpacity = scrollProgress > 0 ? 0.1 + (scrollProgress * 0.7) : 0;
  const showButton = baseOpacity > 0;

  // Cross-fade logic: Ensure the transition is truly gradual
  const floatingOpacity = baseOpacity * (1 - footerProgress);
  const footerButtonOpacity = footerProgress;

  return (
    <footer ref={footerRef} className="py-16 px-4 border-t border-border/40 bg-background relative overflow-hidden">
      <EngineeringGrid />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">Core Pillars</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/custom-ai-solutions" className="hover:text-primary transition-colors">
                    Custom AI Systems
                  </Link>
                </li>
                <li>
                  <Link to="/ai-wordpress-development" className="hover:text-primary transition-colors">
                    AI WordPress Engineering
                  </Link>
                </li>
                <li>
                  <Link to="/custom-business-automation" className="hover:text-primary transition-colors">
                    Business Automation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">WordPress Insights</div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/insights/ai-wordpress-plugin-development" className="hover:text-primary transition-colors">
                    Custom AI Plugin Dev
                  </Link>
                </li>
                <li>
                  <Link to="/insights/automated-search-analytics-reporting" className="hover:text-primary transition-colors">
                    Automated GSC / GA4 Alerts
                  </Link>
                </li>
                <li>
                  <Link to="/insights/headless-wordpress-vite-architecture" className="hover:text-primary transition-colors">
                    Headless WordPress + Vite
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">AI & Automation</div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/insights/local-llm-lm-studio-workflow" className="hover:text-primary transition-colors">
                    Local LLMs with LM Studio
                  </Link>
                </li>
                <li>
                  <Link to="/insights/multi-agent-orchestration-from-scratch" className="hover:text-primary transition-colors">
                    Multi-Agent Systems
                  </Link>
                </li>
                <li>
                  <Link to="/insights/custom-session-storage-engines" className="hover:text-primary transition-colors">
                    High-Velocity Scraping
                  </Link>
                </li>
                <li>
                  <Link to="/insights/custom-crm-sync-engines" className="hover:text-primary transition-colors">
                    Two-Way CRM Sync
                  </Link>
                </li>
                <li>
                  <Link to="/insights/google-sheets-apps-script-enterprise" className="hover:text-primary transition-colors">
                    Google Apps Script ERP
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">Connect</div>
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label="Phone"
                >
                  <Phone size={14} />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={14} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={14} />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="/resume"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  <FileText size={12} /> View Executive Resume
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <span>© {currentYear} {siteConfig.name}. Built with React, Vite SSG & Supabase.</span>
              <span>•</span>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors font-mono"
              >
                <FileText size={12} /> Resume PDF
              </button>
              <span>•</span>
              <a href="/sitemap.xml" target="_blank" className="hover:text-primary transition-colors font-mono">Sitemap</a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              Back to Top <ChevronUp size={14} />
            </button>
          </div>

          {isResumeModalOpen && (
            <Suspense fallback={null}>
              <ResumeDownloadModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
              />
            </Suspense>
          )}
        </div>
      </div>
    </footer>
  );
};

