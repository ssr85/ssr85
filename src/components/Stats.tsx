import { motion } from "motion/react";
import { stats } from "@/data/content";

export const Stats = () => {
  return (
    <section className="px-4 py-8 bg-background relative z-20">
      <div className="container mx-auto max-w-5xl">
        <div className="double-bezel">
          <div className="double-bezel-inner p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-4 md:py-2 px-3 flex flex-col items-center justify-center group"
                >
                  <div className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-primary dark:from-white dark:via-white dark:to-primary">
                      {stat.value}{stat.suffix}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
