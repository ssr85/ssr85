import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface LeadCaptureBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onOpenLeadModal: () => void;
  badgeText?: string;
}

export const LeadCaptureBanner: React.FC<LeadCaptureBannerProps> = ({
  title = "Need a Custom Solution Built for Your Specific Workflow?",
  subtitle = "Discuss your architecture, custom plugin scope, or automation requirements directly with Sarabjeet Rattan.",
  buttonText = "Schedule Architecture Consultation",
  onOpenLeadModal,
  badgeText = "Direct Engineering Access",
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-gradient-to-br from-card/90 via-card/50 to-primary/5 p-8 md:p-12 shadow-xl">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {badgeText}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground/90 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" /> Rapid 24h Assessment
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> NDA & Full Code Ownership
            </span>
          </div>
        </div>

        <Button
          onClick={onOpenLeadModal}
          size="lg"
          className="w-full md:w-auto px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 group shrink-0"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
