interface EngineeringGridProps {
  size?: string;
}

export const EngineeringGrid = ({ size = "2.5rem 2.5rem" }: EngineeringGridProps) => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: size,
    }}
  />
);
