import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  Linkedin,
  Github,
  ChevronDown,
  Code2,
  Zap,
  Sparkles,
  Bot,
  Search,
  Workflow,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandMenu } from "@/components/CommandMenu";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useThrottledScroll } from "@/hooks/use-throttle";
import { scrollToSection } from "@/lib/scroll";
import { siteConfig } from "@/data/content";
import logo from "@/assets/SR_LOGO_no_bg.webp";

interface HeaderProps {
  onOpenEnquiry: () => void;
}

const solutions = [
  {
    title: "Custom AI Systems",
    description: "Autonomous multi-agent orchestration, local LLMs & high-speed B2B scraping pipelines.",
    href: "/custom-ai-solutions",
    icon: Bot,
    tag: "Autonomous AI",
    sublinks: [
      { label: "Multi-Agent Orchestration", href: "/insights/multi-agent-orchestration-from-scratch" },
      { label: "Local LLMs & LM Studio", href: "/insights/local-llm-lm-studio-workflow" },
      { label: "High-Velocity Scraping", href: "/insights/custom-session-storage-engines" },
    ],
  },
  {
    title: "AI WordPress Engineering",
    description: "Bespoke AI plugins from scratch, headless React frontends & search intelligence.",
    href: "/ai-wordpress-development",
    icon: Code2,
    tag: "Full-Stack WP",
    sublinks: [
      { label: "Custom AI Plugins", href: "/insights/ai-wordpress-plugin-development" },
      { label: "Headless Vite Architecture", href: "/insights/headless-wordpress-vite-architecture" },
      { label: "Automated Search Analytics", href: "/insights/automated-search-analytics-reporting" },
    ],
  },
  {
    title: "n8n Workflow Automation",
    description: "Self-hosted enterprise workflows, AI agent pipelines, and unlimited zero-task-fee automations.",
    href: "/n8n-workflows",
    icon: Workflow,
    tag: "Self-Hosted",
    sublinks: [
      { label: "Top 10 Startup Workflows", href: "/n8n-workflows#workflows-grid" },
      { label: "Interactive Node Graph", href: "/n8n-workflows#enterprise-architecture" },
      { label: "Self-Hosted ROI Calculator", href: "/n8n-workflows#savings-calculator" },
    ],
  },
  {
    title: "Business Automation",
    description: "Self-healing two-way CRM sync engines, enterprise Google Sheets & data pipelines.",
    href: "/custom-business-automation",
    icon: Zap,
    tag: "Operations",
    sublinks: [
      { label: "Two-Way CRM Sync", href: "/insights/custom-crm-sync-engines" },
      { label: "Sheets Apps Script", href: "/insights/google-sheets-apps-script-enterprise" },
    ],
  },
];

export const Header = ({ onOpenEnquiry }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const activeSection = useScrollSpy(["snapshot", "case-studies", "strengths"]);

  useThrottledScroll(() => {
    setIsScrolled(window.scrollY > 20);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  // Close solutions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (typeof window !== "undefined") {
      if (!href || href === "" || href === "/") {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else if (href.startsWith("#")) {
        if (window.location.pathname !== "/") {
          window.location.href = `/${href}`;
        } else {
          scrollToSection(href);
        }
      } else {
        window.location.href = href;
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-3 md:top-5 left-0 right-0 z-[101] px-3 md:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <div className={`flex items-center justify-between px-3 md:px-4 py-2 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-background/85 dark:bg-card/85 backdrop-blur-2xl border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/70"
              : "bg-background/60 dark:bg-card/60 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-lg shadow-black/5"
          }`}>
            
            {/* Mobile Left: Menu Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                className="p-2 text-foreground hover:text-primary transition-colors bg-muted/40 border border-border/40 rounded-full active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <a
                href="/"
                className="group flex items-center gap-2.5 pr-2"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <img
                  src={logo}
                  alt="Sarabjeet Rattan Logo"
                  width={36}
                  height={36}
                  // @ts-expect-error -- React 18 DOM only recognizes lowercase fetchpriority
                  fetchpriority="high"
                  className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105 dark:invert"
                />
              </a>
            </div>

            {/* Desktop Center Navigation Island */}
            <nav className="hidden lg:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 px-2 py-1 rounded-full">
              {/* Home Link */}
              <button
                type="button"
                onClick={() => handleNavClick("")}
                className="px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
              >
                Home
              </button>

              {/* Solutions Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 active:scale-95 ${
                    isSolutionsOpen
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-expanded={isSolutionsOpen}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSolutionsOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[860px] max-w-[95vw] z-50 pointer-events-auto"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="double-bezel">
                        <div className="double-bezel-inner p-5 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-border/50 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                            <span className="flex items-center gap-1.5 text-foreground font-semibold">
                              <Sparkles className="w-3.5 h-3.5 text-primary" /> Engineering Pillars
                            </span>
                            <span className="badge-eyebrow">100% Custom Architecture</span>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {solutions.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <div
                                  key={item.href}
                                  className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-background/50 hover:bg-muted/40 hover:border-primary/40 transition-all group flex flex-col justify-between"
                                >
                                  <div>
                                    <a
                                      href={item.href}
                                      onClick={() => setIsSolutionsOpen(false)}
                                      className="block"
                                    >
                                      <div className="flex items-center justify-between mb-2.5">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                          <IconComponent className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-primary/90 uppercase">
                                          {item.tag}
                                        </span>
                                      </div>
                                      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                        {item.title}
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                      </h3>
                                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                                        {item.description}
                                      </p>
                                    </a>

                                    {/* Sublinks */}
                                    <div className="mt-3 pt-2.5 border-t border-border/40 space-y-1">
                                      {item.sublinks.map((sub) => (
                                        <a
                                          key={sub.href}
                                          href={sub.href}
                                          onClick={() => setIsSolutionsOpen(false)}
                                          className="block text-[10px] text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all py-0.5 truncate"
                                        >
                                          • {sub.label}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Bottom Flyout Banner */}
                          <div className="p-3 px-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground text-[11px]">
                              Need a custom AI or automation system tailored to your operations?
                            </span>
                            <button
                              onClick={() => {
                                setIsSolutionsOpen(false);
                                onOpenEnquiry();
                              }}
                              className="font-bold text-primary hover:underline flex items-center gap-1.5 text-[11px]"
                            >
                              Discuss Requirements <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Section Links */}
              <button
                onClick={() => handleNavClick("#case-studies")}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 active:scale-95 ${
                  activeSection === "case-studies"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                Case Studies
              </button>

              <button
                onClick={() => handleNavClick("#snapshot")}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 active:scale-95 ${
                  activeSection === "snapshot"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                Experience
              </button>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Cmd+K Quick Search Button */}
              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="flex items-center gap-2 px-3 py-1 text-xs text-muted-foreground hover:text-foreground bg-black/[0.03] dark:bg-white/[0.04] hover:bg-muted/60 border border-black/5 dark:border-white/10 rounded-full transition-all duration-200 group shadow-sm active:scale-95"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[11px] font-medium">Search</span>
                <kbd className="text-[9px] font-mono font-bold bg-background/80 border border-border/80 px-1.5 py-0.5 rounded text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              <div className="flex items-center gap-0.5 border-r border-border/50 pr-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors active:scale-90"
                  aria-label="GitHub Profile"
                >
                  <Github size={15} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors active:scale-90"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={15} />
                </a>
                <ThemeToggle />
              </div>

              {/* Button-in-Button CTA */}
              <button
                onClick={onOpenEnquiry}
                className="group inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1 rounded-full text-xs font-semibold bg-foreground text-background dark:bg-primary dark:text-primary-foreground hover:opacity-95 shadow-md shadow-primary/10 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get In Touch</span>
                <span className="w-6 h-6 rounded-full bg-background/20 dark:bg-background/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>

            {/* Mobile Right: Quick Search */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground bg-muted/40 border border-border/40 rounded-full transition-colors active:scale-95"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[110] lg:hidden pointer-events-auto"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Side Drawer */}
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[88vw] z-[120] lg:hidden bg-card/95 border-l border-border/80 backdrop-blur-2xl shadow-2xl flex flex-col pointer-events-auto"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-border/60">
                  <span className="badge-eyebrow">
                    Navigation
                  </span>
                  <button
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Search trigger inside drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCommandMenuOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground hover:text-foreground transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Search size={14} className="text-primary" />
                      <span>Search services & insights...</span>
                    </div>
                    <kbd className="text-[9px] font-mono font-bold bg-background px-1.5 py-0.5 rounded">⌘K</kbd>
                  </button>

                  {/* Primary Links */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavClick("")}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted/50 text-foreground transition-colors"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleNavClick("#case-studies")}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted/50 text-foreground transition-colors"
                    >
                      Case Studies
                    </button>
                    <button
                      onClick={() => handleNavClick("#snapshot")}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted/50 text-foreground transition-colors"
                    >
                      Experience
                    </button>
                  </div>

                  {/* Solutions Section */}
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-3">
                      Solutions & Capabilities
                    </p>
                    <div className="space-y-2">
                      {solutions.map((sol) => (
                        <a
                          key={sol.href}
                          href={sol.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/50 transition-all"
                        >
                          <div className="text-xs font-bold text-foreground flex items-center justify-between">
                            <span>{sol.title}</span>
                            <span className="text-[9px] font-mono text-primary uppercase">{sol.tag}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{sol.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer CTA */}
                <div className="p-5 border-t border-border/60">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/25"
                  >
                    <span>Get In Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Command Palette (Cmd+K) Modal */}
      <CommandMenu
        open={isCommandMenuOpen}
        onOpenChange={setIsCommandMenuOpen}
        onOpenLeadModal={onOpenEnquiry}
      />
    </>
  );
};
