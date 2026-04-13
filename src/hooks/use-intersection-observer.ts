import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  once?: boolean;
}

/**
 * Returns a [ref, isVisible] tuple. When `once` is true (default) the observer
 * disconnects after the element first enters the viewport.
 */
export const useIntersectionObserver = <T extends Element = HTMLDivElement>(
  { threshold = 0.1, once = true }: Options = {}
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isVisible];
};
