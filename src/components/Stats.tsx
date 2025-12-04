import { siteConfig } from "@/data/content";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "4", label: "Industries" },
  { value: "Global", label: "Reach" },
];

export const Stats = () => {
  return (
    <section className="py-8 px-4 bg-primary">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
