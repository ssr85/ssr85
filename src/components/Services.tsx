import { Link } from "react-router-dom";
import { services } from "@/data/content";
import { Settings, Code, Globe, Compass, ArrowUpRight, ArrowRight, Sparkles, Wrench } from "lucide-react";
import { StaggeredCard, ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EngineeringGrid } from "@/components/EngineeringGrid";
import { Button } from "@/components/ui/button";

interface ServicesProps {
  onOpenEnquiry: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-5 w-5 text-primary" />,
  Settings: <Settings className="h-5 w-5 text-secondary" />,
  Globe: <Globe className="h-5 w-5 text-accent" />,
  Compass: <Compass className="h-5 w-5 text-primary" />,
};

export const Services = ({ onOpenEnquiry }: ServicesProps) => {
  return (
    <section id="services" className="py-24 md:py-36 px-4 bg-background relative overflow-hidden border-t border-white/[0.06]">
      <EngineeringGrid />
      <div className="container mx-auto relative z-10 max-w-6xl">
        <ScrollAnimationWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="badge-eyebrow">
              <Wrench size={11} className="text-primary" />
              Specialist Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Services & Deployments.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
              Strategic architecture and full-cycle execution to engineer autonomous systems and accelerate enterprise throughput.
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const icon = iconMap[service.icon] || <Sparkles className="h-5 w-5 text-primary" />;
            const hasLink = 'link' in service && typeof service.link === 'string';

            return (
              <StaggeredCard key={service.title} index={index}>
                <div className="double-bezel p-1.5 rounded-[2rem] h-full group hover:scale-[1.01] transition-transform duration-300">
                  <div className="double-bezel-inner rounded-[calc(2rem-0.375rem)] p-8 h-full flex flex-col justify-between space-y-6">
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-inner group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                          {icon}
                        </div>
                        <span className="font-mono text-xs text-muted-foreground/60 tracking-wider">
                          0{index + 1} //
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      {hasLink ? (
                        <Link
                          to={service.link as string}
                          className="btn-icon-pod inline-flex w-full items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] text-xs font-mono font-medium text-foreground/90 transition-all group/link"
                        >
                          <span>Explore Architecture & Blueprint</span>
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                            <ArrowUpRight size={13} />
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={onOpenEnquiry}
                          className="btn-icon-pod inline-flex w-full items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] text-xs font-mono font-medium text-foreground/90 transition-all group/btn"
                        >
                          <span>Request Strategic Audit</span>
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform">
                            <ArrowRight size={13} />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </StaggeredCard>
            );
          })}
        </div>

        {/* Section Call to Action */}
        <ScrollAnimationWrapper delay={200}>
          <div className="mt-16 text-center">
            <div className="inline-block p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
              <Button
                size="lg"
                onClick={onOpenEnquiry}
                className="btn-icon-pod rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/20 group"
              >
                <span>Discuss Your Project Requirements</span>
                <span className="w-7 h-7 rounded-full bg-black/20 text-primary-foreground flex items-center justify-center group-hover:translate-x-1 transition-transform ml-3">
                  <ArrowRight size={15} />
                </span>
              </Button>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
