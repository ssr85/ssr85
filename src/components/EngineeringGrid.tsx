interface EngineeringGridProps {
  size?: string;
}

const parseSize = (size: string) => {
  return size.replace(/(\d+(?:\.\d+)?)rem/g, (_, num) => {
    const val = parseFloat(num);
    const mobileVal = Math.max(1.5, val * 0.6);
    return `clamp(${mobileVal}rem, ${mobileVal}rem, ${val}rem)`;
  });
};

export const EngineeringGrid = ({ size = "2.5rem 2.5rem" }: EngineeringGridProps) => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: parseSize(size),
    }}
  />
);
