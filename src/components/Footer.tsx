import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/content";
import { Mail, FileText, ChevronUp, Phone, Linkedin, Github, Terminal } from "lucide-react";
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

  return (
    <footer ref={footerRef} className="py-20 md:py-28 px-4 border-t border-white/[0.08] bg-background relative overflow-hidden">
      <EngineeringGrid />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
            {/* Column 1: Core Pillars */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Core Systems
              </div>
              <ul className="space-y-2.5 text-muted-foreground text-xs">
                <li>
                  <Link to="/custom-ai-solutions" className="hover:text-primary transition-colors">
                    Custom AI Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/ai-wordpress-development" className="hover:text-primary transition-colors">
                    AI WordPress Engineering
                  </Link>
                </li>
                <li>
                  <Link to="/custom-business-automation" className="hover:text-primary transition-colors">
                    Business & CRM Automation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: WordPress Insights */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                WP Engineering
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
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

            {/* Column 3: AI & Automation */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Autonomous Tech
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/insights/local-llm-lm-studio-workflow" className="hover:text-primary transition-colors">
                    Local LLMs with LM Studio
                  </Link>
                </li>
                <li>
                  <Link to="/insights/multi-agent-orchestration-from-scratch" className="hover:text-primary transition-colors">
                    Multi-Agent Orchestration
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

            {/* Column 4: Connect & Telemetry */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Connect
              </div>
              
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="Phone"
                >
                  <Phone size={14} />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={14} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={14} />
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="/resume"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] text-xs text-muted-foreground hover:text-foreground transition-all font-mono"
                >
                  <FileText size={12} className="text-primary" />
                  <span>Executive Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start font-mono text-[11px]">
              <span>© {currentYear} {siteConfig.name}</span>
              <span>•</span>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="hover:text-primary transition-colors"
              >
                Resume PDF
              </button>
              <span>•</span>
              <a href="/sitemap.xml" target="_blank" className="hover:text-primary transition-colors">
                Sitemap
              </a>
              <span>•</span>
              <a href="/llms.txt" target="_blank" className="hover:text-primary transition-colors">
                llms.txt
              </a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-foreground/80 hover:text-foreground text-xs font-mono transition-all group"
            >
              <span>Back to Top</span>
              <ChevronUp size={13} className="text-primary group-hover:-translate-y-0.5 transition-transform" />
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
