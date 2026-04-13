import { useEffect } from "react";
import { stats } from "@/data/content";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const useCountUp = (end: number, duration: number = 3000, startCounting: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

const StatItem = ({ value, suffix, label, delay, isVisible }: { value: number; suffix: string; label: string; delay: number; isVisible: boolean }) => {
  const count = useCountUp(value, 3000, isVisible);
  
  return (
    <div 
      className="text-center animate-fade-up" 
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-primary-foreground/70 tracking-wide">{label}</div>
    </div>
  );
};

export const Stats = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={sectionRef} className="py-14 md:py-16 px-4 bg-primary relative overflow-hidden">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem 
              key={stat.label} 
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
              delay={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
