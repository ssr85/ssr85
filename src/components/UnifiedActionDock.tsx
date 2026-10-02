import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArchitectureEstimatorModal } from "@/components/tools/ArchitectureEstimatorModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectType } from "@/lib/calculator/estimator-engine";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Zap,
  Sparkles,
  Code2,
  Cpu,
  RefreshCw,
  FileSpreadsheet,
  Mail,
  Send,
  X,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Calculator,
} from "lucide-react";

export const UnifiedActionDock = () => {
  const location = useLocation();
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem("ssr_newsletter_subscribed");
    if (subscribed) setIsSubscribed(true);

    const timer = setTimeout(() => {
      setIsDockVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Determine contextual action based on path
  const { actionLabel, defaultProjectType, icon: ActionIcon } = (() => {
    const path = location.pathname;

    if (path.includes("n8n")) {
      return {
        actionLabel: "Get Estimation",
        defaultProjectType: "N8N_AUTOMATION" as ProjectType,
        icon: Zap,
      };
    }
    if (path.includes("wordpress") || path.includes("ai-wordpress")) {
      return {
        actionLabel: "Get Estimation",
        defaultProjectType: "AI_WORDPRESS" as ProjectType,
        icon: Code2,
      };
    }
    if (path.includes("multi-agent") || path.includes("custom-ai")) {
      return {
        actionLabel: "Get Estimation",
        defaultProjectType: "CUSTOM_AI_AGENT" as ProjectType,
        icon: Cpu,
      };
    }
    if (path.includes("crm") || path.includes("sync")) {
      return {
        actionLabel: "Get Estimation",
        defaultProjectType: "CRM_SYNC_ENGINE" as ProjectType,
        icon: RefreshCw,
      };
    }
    if (path.includes("sheets") || path.includes("apps-script")) {
      return {
        actionLabel: "Get Estimation",
        defaultProjectType: "APPS_SCRIPT_ERP" as ProjectType,
        icon: FileSpreadsheet,
      };
    }

    return {
      actionLabel: "Get Estimation",
      defaultProjectType: "N8N_AUTOMATION" as ProjectType,
      icon: Calculator,
    };
  })();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentPath = location.pathname;
      const leadPayload = {
        name: "Subscriber",
        email: cleanEmail,
        phone: "N/A",
        service_category: "engineering-newsletter",
        budget_range: "N/A",
        estimated_start_timeline: "Newsletter Subscriber",
        requirement: `Newsletter subscription from ${currentPath}`,
        source_url: currentPath,
        lead_status: "NEW",
      };

      await supabase.from("service_leads").insert([leadPayload]);

      try {
        await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Newsletter Subscriber",
            email: cleanEmail,
            phone: "N/A",
            requirement: `[Newsletter Signup from: ${currentPath}]`,
            recaptchaToken: "DIRECT_NEWSLETTER_SUBSCRIBE",
          }),
        });
      } catch {
        // silent fallback
      }

      setIsSubscribed(true);
      localStorage.setItem("ssr_newsletter_subscribed", "true");
      setIsNewsletterModalOpen(false);
      setNewsletterEmail("");
      toast.success("Subscribed! Real engineering insights coming to your inbox.");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isDockVisible) return null;

  return (
    <>
      {/* Sleek Floating Dock on Bottom-Right */}
      <aside
        aria-label="Quick Tools & Updates"
        className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
      >
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-2xl border border-border/80 shadow-2xl shadow-black/15">
          {/* ICON 1: ESTIMATOR (Expands on Hover) */}
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            aria-label="Get Project Scope Estimation"
            className="group flex items-center gap-2 p-2.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-300 ease-out border border-primary/25 shadow-sm"
          >
            <ActionIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100 text-xs font-semibold pr-1">
              {actionLabel}
            </span>
          </button>

          {/* ICON 2: KEEP UPDATED (Expands on Hover) */}
          <button
            type="button"
            onClick={() => setIsNewsletterModalOpen(true)}
            aria-label="Keep Updated via Newsletter"
            className="group flex items-center gap-2 p-2.5 rounded-full bg-muted/80 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 ease-out border border-border/70 shadow-sm"
          >
            {isSubscribed ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
            ) : (
              <Mail className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            )}
            <span className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100 text-xs font-semibold pr-1">
              {isSubscribed ? "Subscribed" : "Keep Updated"}
            </span>
          </button>
        </div>
      </aside>

      {/* 1. ARCHITECTURE & SCOPE ESTIMATOR MODAL */}
      <ArchitectureEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        defaultProjectType={defaultProjectType}
      />

      {/* 2. NEWSLETTER MODAL ("Get our latest, in your inbox") */}
      <Dialog open={isNewsletterModalOpen} onOpenChange={setIsNewsletterModalOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl">
          <div className="p-6 sm:p-7 space-y-5">
            <DialogHeader className="text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Architecture & Engineering Insights
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Get our latest, in your inbox.
              </DialogTitle>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Autonomous workflows, n8n production blueprints, and enterprise AI teardowns. No spam. Unsubscribe anytime.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubscribe} className="space-y-4 pt-1">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                    autoFocus
                    className="pl-10 h-11 text-xs sm:text-sm rounded-xl border-border/80 bg-card focus-visible:ring-primary/40"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-primary/20 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Subscribe to Insights</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> 100% Privacy
                </span>
                <span>Zero Sales Spam</span>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
