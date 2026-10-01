import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  Linkedin,
  Github,
  ChevronDown,
  Cpu,
  Code2,
  Zap,
  Sparkles,
  Layers,
  FileText,
  Bot,
  Search,
  ExternalLink,
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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const activeSection = useScrollSpy(["snapshot", "case-studies", "strengths"]);

  useThrottledScroll(() => {
    setIsScrolled(window.scrollY > 25);
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
      if (window.location.pathname !== "/") {
        window.location.href = `/${href}`;
      } else {
        scrollToSection(href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[101]">
        {/* Backdrop layer */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled
              ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm shadow-foreground/[0.02]"
              : "bg-transparent"
          }`}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto flex items-center justify-between h-16 lg:h-20 transition-all duration-300 relative">
            
            {/* Mobile Left: Menu Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                className="p-2 text-foreground hover:text-primary transition-colors bg-muted/30 border border-border/40 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Brand Logo Container (Centered on mobile/tablet, left-aligned on desktop) */}
            <div className="lg:flex-none absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <a
                href="/"
                className="group flex items-center gap-3"
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
                  width={40}
                  height={40}
                  // @ts-expect-error -- React 18 DOM only recognizes lowercase fetchpriority
                  fetchpriority="high"
                  className="h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105 dark:invert"
                />
              </a>
            </div>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-card/60 border border-border/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
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
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isSolutionsOpen
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
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
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[720px] z-50 pointer-events-auto"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-4 rounded-2xl border border-border/80 bg-popover/95 backdrop-blur-2xl shadow-2xl space-y-3.5">
                        <div className="flex items-center justify-between px-2 pb-2 border-b border-border/50 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary" /> Engineering Pillars
                          </span>
                          <span className="text-primary font-bold">100% Custom Architecture</span>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {solutions.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <div
                                key={item.href}
                                className="p-3.5 rounded-xl border border-border/60 bg-card/60 hover:bg-muted/40 hover:border-primary/40 transition-all group flex flex-col justify-between"
                              >
                                <div>
                                  <a
                                    href={item.href}
                                    onClick={() => setIsSolutionsOpen(false)}
                                    className="block"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-4 h-4" />
                                      </div>
                                      <span className="text-[10px] font-mono font-bold text-primary/80 uppercase">
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
                        <div className="p-2.5 px-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground text-[11px]">
                            Need a custom AI or automation system tailored to your tech stack?
                          </span>
                          <button
                            onClick={() => {
                              setIsSolutionsOpen(false);
                              onOpenEnquiry();
                            }}
                            className="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]"
                          >
                            Discuss Requirements <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Section Links */}
              <button
                onClick={() => handleNavClick("#case-studies")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  activeSection === "case-studies"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                Case Studies
              </button>

              <button
                onClick={() => handleNavClick("#snapshot")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  activeSection === "snapshot"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                Experience
              </button>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Cmd+K Quick Search Button */}
              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-card/60 hover:bg-muted/60 border border-border/60 rounded-full transition-all duration-200 group shadow-sm"
                aria-label="Search site (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[11px] font-medium">Search</span>
                <kbd className="text-[9px] font-mono font-bold bg-background/80 border border-border/80 px-1.5 py-0.5 rounded text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              <div className="flex items-center gap-1 border-r border-border/50 pr-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <ThemeToggle />
              </div>

              <Button
                onClick={onOpenEnquiry}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 rounded-full px-4 text-xs font-semibold group whitespace-nowrap h-8"
              >
                Get In Touch
                <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

            {/* Mobile Right: Quick Search */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground bg-muted/30 border border-border/40 rounded-full transition-colors"
                aria-label="Search site (Cmd+K)"
              >
                <Search size={18} />
              </button>
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
                  className="fixed inset-0 bg-background/60 backdrop-blur-md z-[110] lg:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Side Drawer */}
                <motion.nav
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] z-[120] lg:hidden bg-card/98 border-l border-border/80 backdrop-blur-2xl shadow-2xl flex flex-col"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between h-16 px-6 border-b border-border/60">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                      Navigation
                    </span>
                    <button
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
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
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border/60 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Search size={14} className="text-primary" />
                        <span>Search services & insights...</span>
                      </div>
                      <kbd className="text-[9px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
                    </button>

                    {/* Solutions Section */}
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold px-1">
                        Solutions
                      </div>
                      <div className="space-y-2">
                        {solutions.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block p-3 rounded-xl bg-background/60 border border-border/60 hover:border-primary/40 transition-all"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-foreground">{item.title}</div>
                                  <div className="text-[10px] text-muted-foreground line-clamp-1">{item.description}</div>
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Direct Pages */}
                    <div className="space-y-1 pt-2 border-t border-border/50">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold px-1 pb-1">
                        Explore
                      </div>
                      <button
                        onClick={() => handleNavClick("#case-studies")}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        Case Studies
                      </button>
                      <button
                        onClick={() => handleNavClick("#snapshot")}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        Experience & Background
                      </button>
                    </div>

                    {/* Drawer Footer Actions */}
                    <div className="pt-4 border-t border-border/50 space-y-3">
                      <Button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onOpenEnquiry();
                        }}
                        className="w-full bg-primary text-primary-foreground font-semibold text-xs py-5 rounded-xl shadow-lg shadow-primary/20"
                      >
                        Get In Touch
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-background/60 border border-border/60">
                        <div className="flex items-center gap-1">
                          <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground rounded-lg"
                          >
                            <Github size={16} />
                          </a>
                          <a
                            href={siteConfig.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground rounded-lg"
                          >
                            <Linkedin size={16} />
                          </a>
                        </div>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Bar at bottom of sticky header */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary transition-all duration-100 ease-out origin-left"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Global Cmd+K Command Palette */}
      <CommandMenu
        open={isCommandMenuOpen}
        onOpenChange={setIsCommandMenuOpen}
        onOpenLeadModal={onOpenEnquiry}
      />
    </>
  );
};
