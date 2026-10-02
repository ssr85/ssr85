import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/content";
import { Mail, FileText, ChevronUp, Phone, Linkedin, Github, Terminal, Calendar } from "lucide-react";
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
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Main Footer Links Columns - 2-col on mobile, 3-col on tablet, 5-col on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 text-sm">
            {/* Column 1: Quick Links */}
            <div className="space-y-4 text-center md:text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Quick Links
              </div>
              <ul className="space-y-2.5 text-muted-foreground text-xs">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/#case-studies" className="hover:text-primary transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="/#snapshot" className="hover:text-primary transition-colors">
                    Technical Expertise
                  </a>
                </li>
                <li>
                  <a href="/#strengths" className="hover:text-primary transition-colors">
                    Core Strengths
                  </a>
                </li>
                <li>
                  <Link to="/resume" className="hover:text-primary transition-colors">
                    Executive Resume
                  </Link>
                </li>
                <li>
                  <a
                    href="https://calendly.com/srt10/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Schedule 20-Min Call
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Engineering Pillars */}
            <div className="space-y-4 text-center md:text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
                  <Link to="/n8n-workflows" className="hover:text-primary transition-colors">
                    n8n Workflow Automation
                  </Link>
                </li>
                <li>
                  <Link to="/custom-business-automation" className="hover:text-primary transition-colors">
                    Business & CRM Automation
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies/lead-og" className="hover:text-primary transition-colors">
                    Case: Lead OG Engine
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies/linked-in" className="hover:text-primary transition-colors">
                    Case: LinkedIn Agentic AI
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: AI & Multi-Agent Tech */}
            <div className="space-y-4 text-center md:text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                AI Architecture
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/insights/multi-agent-orchestration-from-scratch" className="hover:text-primary transition-colors">
                    Multi-Agent Systems
                  </Link>
                </li>
                <li>
                  <Link to="/insights/local-llm-lm-studio-workflow" className="hover:text-primary transition-colors">
                    Local LLMs & LM Studio
                  </Link>
                </li>
                <li>
                  <Link to="/insights/custom-session-storage-engines" className="hover:text-primary transition-colors">
                    High-Velocity Scraping
                  </Link>
                </li>
                <li>
                  <Link to="/n8n-workflows#workflows-grid" className="hover:text-primary transition-colors">
                    Top 10 n8n Blueprints
                  </Link>
                </li>
                <li>
                  <Link to="/n8n-workflows#enterprise-architecture" className="hover:text-primary transition-colors">
                    Self-Hosted n8n Node Graph
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: WP & Operational Automation */}
            <div className="space-y-4 text-center md:text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                WP & Operations
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/insights/ai-wordpress-plugin-development" className="hover:text-primary transition-colors">
                    Custom AI Plugin Dev
                  </Link>
                </li>
                <li>
                  <Link to="/insights/automated-search-analytics-reporting" className="hover:text-primary transition-colors">
                    Automated GSC/GA4 Alerts
                  </Link>
                </li>
                <li>
                  <Link to="/insights/headless-wordpress-vite-architecture" className="hover:text-primary transition-colors">
                    Headless WP + Vite SSG
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

            {/* Column 5: Connect & Calendly */}
            <div className="space-y-4 text-center md:text-left col-span-2 sm:col-span-1 flex flex-col items-center md:items-start">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-center md:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Connect & Booking
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 pt-1 flex-wrap">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="Phone"
                  title={`Call: ${siteConfig.phone}`}
                >
                  <Phone size={13} />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="Email"
                  title={`Email: ${siteConfig.email}`}
                >
                  <Mail size={13} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={13} />
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  aria-label="GitHub"
                  title="GitHub Profile"
                >
                  <Github size={13} />
                </a>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary hover:bg-primary/25 flex items-center justify-center transition-all duration-200"
                  aria-label="Book a 20-min Call on Calendly"
                  title="Book a 20-min Call on Calendly"
                >
                  <Calendar size={13} />
                </a>
              </div>

              {/* Direct Booking Pill Card */}
              <div className="w-full pt-1">
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block p-3 rounded-xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/25 hover:border-primary/50 transition-all text-left group"
                >
                  <div className="text-[11px] font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>1-on-1 Discovery Call</span>
                    <span className="text-[9px] font-mono text-primary uppercase">20 Min</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Direct technical discussion with builder.</p>
                </a>
              </div>

              <div className="pt-1 flex justify-center md:justify-start">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] text-xs text-muted-foreground hover:text-foreground transition-all font-mono"
                >
                  <FileText size={12} className="text-primary" />
                  <span>Executive Resume</span>
                </Link>
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
              <span>•</span>
              <a href="/llms-full.txt" target="_blank" className="hover:text-primary transition-colors">
                llms-full.txt
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
