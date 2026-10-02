import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll";

export const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow brief moment for target DOM node to mount if navigating between pages
      const timer = setTimeout(() => {
        scrollToSection(hash, 80);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      // Instant reset to the top of the viewport when changing pages
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};
