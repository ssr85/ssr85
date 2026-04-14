import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Phone, Mail, Linkedin, Github, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { scrollToSection } from "@/lib/scroll";
import { navLinks, siteConfig } from "@/data/content";
import logo from "@/assets/SR_LOGO_no_bg.png";

interface HeaderProps {
  onOpenEnquiry: () => void;
}

export const Header = ({ onOpenEnquiry }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeSection = useScrollSpy(navLinks.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm shadow-foreground/[0.03]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-24 transition-all duration-500">
          {/* Logo */}
          <a
            href="#"
            className="group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              src={logo} 
              alt="SR Logo"
              width={48}
              height={48}
              className="h-10 md:h-12 w-auto transition-all duration-500 group-hover:scale-110 dark:invert"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-500 relative group overflow-hidden rounded-full whitespace-nowrap ${
                    isActive 
                      ? "text-primary scale-105" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Gradual Lighting Effect Underlink */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-all duration-700 ease-in-out transform ${
                    isActive ? "scale-x-75 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
                  }`} />
                  
                  {/* Subtle Glow Background */}
                  <span className={`absolute inset-0 bg-primary/5 rounded-full transition-all duration-1000 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`} />
                </button>
              );
            })}
            <div className="hidden xl:flex items-center gap-0.5 mr-4">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                title="Phone"
              >
                <Phone size={18} />
              </a>
              <a 
                href={`mailto:${siteConfig.email}`}
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={siteConfig.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                title="Website"
              >
                <Globe size={18} />
              </a>
              <a 
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            <Button 
              onClick={onOpenEnquiry} 
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/5 rounded-full px-6 transition-all duration-500 hover:scale-105 group"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors bg-muted/20 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isMobileMenuOpen ? <X size={24} className="animate-in fade-in spin-in-90 duration-300" /> : <Menu size={24} className="animate-in fade-in spin-in--90 duration-300" />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Side Sheet */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-background/20 backdrop-blur-md z-[55] lg:hidden animate-in fade-in duration-500" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <nav className="fixed top-0 right-0 bottom-0 w-[300px] z-[60] lg:hidden bg-background/98 backdrop-blur-3xl shadow-[-10px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500 ease-out">
              {/* Header inside Side Sheet */}
              <div className="flex items-center justify-between h-16 lg:h-24 px-6 border-b border-border/10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Navigation</span>
                <button
                  className="p-2 text-foreground hover:text-primary transition-all hover:bg-muted/30 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Nav Links */}
                <div className="py-4">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`flex items-center justify-between w-full px-8 py-4 text-sm font-bold transition-all duration-300 group ${
                          isActive 
                            ? "text-primary bg-primary/5" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />}
                      </button>
                    );
                  })}
                </div>
                
                {/* Social Group */}
                <div className="mt-auto px-8 py-8 border-t border-border/10 bg-muted/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-5">Digital Presence</p>
                  <div className="grid grid-cols-5 gap-2">
                    <a href={`tel:${siteConfig.phone}`} className="flex items-center justify-center aspect-square rounded-xl bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:scale-105 shadow-sm">
                      <Phone size={18} />
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center justify-center aspect-square rounded-xl bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:scale-105 shadow-sm">
                      <Mail size={18} />
                    </a>
                    <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center aspect-square rounded-xl bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:scale-105 shadow-sm">
                      <Linkedin size={18} />
                    </a>
                    <a href={siteConfig.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center aspect-square rounded-xl bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:scale-105 shadow-sm">
                      <Globe size={18} />
                    </a>
                    <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center aspect-square rounded-xl bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all hover:scale-105 shadow-sm">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                
                {/* Bottom Actions */}
                <div className="px-8 pb-8 pt-4 flex flex-col gap-4">
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenEnquiry();
                    }} 
                    className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-2xl py-7 font-black text-xs uppercase tracking-widest shadow-xl shadow-foreground/10 group"
                  >
                    Start Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dark Mode</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};
