import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { v2Navigation } from "@/data/v2Content";
import logo from "@/assets/SR_LOGO_no_bg.png";

interface V2HeaderProps {
  onOpenEnquiry: () => void;
}

export const V2Header = ({ onOpenEnquiry }: V2HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple Scroll Spy
      const sections = v2Navigation.map(link => link.href.substring(1));
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="group transition-transform active:scale-95"
        >
          <img src={logo} alt="SR Logo" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {v2Navigation.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm font-semibold transition-all relative py-1 ${
                activeSection === link.href ? "text-primary" : "text-black/40 hover:text-black/80"
              }`}
            >
              {link.name}
              {activeSection === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-left-2 duration-300" />
              )}
            </button>
          ))}
          <button 
            onClick={onOpenEnquiry}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-black/90 transition-all hover:shadow-lg hover:shadow-black/10 active:scale-95"
          >
            Get in Touch
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-black p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-white z-40 p-8 flex flex-col space-y-8 animate-in fade-in duration-300">
          {v2Navigation.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-3xl font-bold text-left transition-colors ${
                activeSection === link.href ? "text-primary" : "text-black"
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={onOpenEnquiry}
            className="w-full bg-black text-white py-4 rounded-2xl text-xl font-bold mt-4"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
};
