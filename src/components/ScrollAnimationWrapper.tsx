import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimationWrapper = ({ children, className = "", delay = 0 }: ScrollAnimationWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={isMounted ? { opacity: 0, y: 24, scale: 0.98 } : undefined}
      whileInView={isMounted ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredCardProps {
  children: ReactNode;
  className?: string;
  index: number;
  baseDelay?: number;
}

export const StaggeredCard = ({ children, className = "", index, baseDelay = 100 }: StaggeredCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={isMounted ? { opacity: 0, y: 16, scale: 0.98 } : undefined}
      whileInView={isMounted ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: (index * baseDelay) / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

