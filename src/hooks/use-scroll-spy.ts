import { useState, useEffect, useRef } from "react";

export const useScrollSpy = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>("");
  // Stable ref so the effect only re-runs when the serialized list changes,
  // not on every render when the caller passes an inline array literal.
  const idsKey = ids.join(",");
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    idsRef.current.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY < 180) setActiveId("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
};


