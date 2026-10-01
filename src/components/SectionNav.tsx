import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "snapshot", label: "Expertise" },
  { id: "case-studies", label: "Work" },
  { id: "strengths", label: "Strengths" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
  { id: "beyond-work", label: "Beyond Work" },
];

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>("snapshot");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
              setIsVisible(true);
            }
          });
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    const handleScroll = () => {
      const hasScrolled = window.scrollY > 300;
      setIsVisible(hasScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    scrollToSection(`#${id}`, -100);
  };

  return (
    <nav
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      )}
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "absolute right-6 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 text-xs font-semibold whitespace-nowrap transition-all duration-300",
                isActive
                  ? "opacity-100 translate-x-0 text-foreground"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground group-hover:text-foreground"
              )}
            >
              {section.label}
            </span>
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full border-2 transition-all duration-300",
                isActive
                  ? "bg-primary border-primary scale-125"
                  : "bg-transparent border-muted-foreground/40 group-hover:border-primary/60"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
};
