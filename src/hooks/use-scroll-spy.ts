import { useState, useEffect } from "react";

export const useScrollSpy = (ids: string[], offset: number = 0) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // We use a small observer to detect when sections enter the top-middle of the screen
    const observerOptions = {
      root: null,
      // Focus the "active zone" in the top 30% of the viewport
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each specified section
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Special handler for the top of the page (Hero/Banner)
    const handleScroll = () => {
      if (window.scrollY < 180) {
        setActiveId("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids]);

  return activeId;
};


