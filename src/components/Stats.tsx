import { motion } from "motion/react";
import { stats } from "@/data/content";

export const Stats = () => {
  return (
    <section className="px-4 bg-background border-y border-border/60">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center py-8 md:py-10 px-2"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 [text-shadow:0_0_24px_hsl(var(--glow)/0.35)]">
                {stat.value}{stat.suffix}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
