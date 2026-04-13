import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { scrollToSection } from "@/lib/scroll";
import { navLinks } from "@/data/content";
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
        <div className="flex items-center justify-between h-16 md:h-24 transition-all duration-500">
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
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-500 relative group overflow-hidden rounded-full ${
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
            <div className="h-6 w-[1px] bg-border/40 mx-2" />
            <Button 
              onClick={onOpenEnquiry} 
              size="sm"
              className="ml-2 bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/5 rounded-full px-6 transition-all duration-500 hover:scale-105 group"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors bg-muted/20 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isMobileMenuOpen ? <X size={24} className="animate-in fade-in spin-in-90 duration-300" /> : <Menu size={24} className="animate-in fade-in spin-in--90 duration-300" />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/20 animate-in slide-in-from-top-4 duration-500 bg-background/95 backdrop-blur-2xl rounded-b-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center justify-between px-6 py-4 text-base font-semibold transition-all duration-300 ${
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                  </button>
                );
              })}
              <div className="px-6 pt-4 flex items-center gap-4">
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenEnquiry();
                  }} 
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full py-6 font-bold"
                >
                  Get In Touch
                </Button>
                <div className="p-3 bg-muted/20 rounded-full">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
