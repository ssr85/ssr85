import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimationWrapper = ({ children, className = "", delay = 0 }: ScrollAnimationWrapperProps) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-[0.98]"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredCardProps {
  children: ReactNode;
  className?: string;
  index: number;
  baseDelay?: number;
}

export const StaggeredCard = ({ children, className = "", index, baseDelay = 120 }: StaggeredCardProps) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-[0.98]"
      } ${className}`}
      style={{
        transitionDelay: `${index * baseDelay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};
