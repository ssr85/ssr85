import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  items: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem: (item: any, index: number, isActive: boolean) => ReactNode;
  autoScroll?: boolean;
  interval?: number;
  className?: string;
  dotClassName?: string;
  activeDotClassName?: string;
}

export function Carousel({
  items,
  renderItem,
  autoScroll = false,
  interval = 5000,
  className,
  dotClassName,
  activeDotClassName,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoScroll, interval, items.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    };
    container.addEventListener("scrollend", handleScroll);
    return () => container.removeEventListener("scrollend", handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const itemWidth = container.offsetWidth;
    container.scrollTo({ left: activeIndex * itemWidth, behavior: "smooth" });
  }, [activeIndex]);

  const scrollTo = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex w-full shrink-0">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full shrink-0 snap-center"
              onClick={() => scrollTo(index)}
            >
              {renderItem(item, index, activeIndex === index)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? cn("bg-primary w-6", activeDotClassName)
                : cn("bg-muted-foreground/30 hover:bg-muted-foreground/50", dotClassName)
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
