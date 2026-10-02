import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArchitectureEstimatorModal } from "@/components/tools/ArchitectureEstimatorModal";
import { ProjectType } from "@/lib/calculator/estimator-engine";
import { supabase } from "@/integrations/supabase/client";
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
  ChevronRight,
} from "lucide-react";

export const UnifiedActionDock = () => {
  const location = useLocation();
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(false);

  useEffect(() => {
    // Check if previously subscribed or dismissed
    const subscribed = localStorage.getItem("ssr_newsletter_subscribed");
    if (subscribed) setIsSubscribed(true);

    const dismissedAt = localStorage.getItem("ssr_action_dock_dismissed_at");
    if (dismissedAt) {
      const daysSinceDismiss =
        (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 3) return; // Snooze for 3 days
    }

    // Reveal gently after 2.5 seconds
    const timer = setTimeout(() => {
      setIsDockVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDockVisible(false);
    localStorage.setItem("ssr_action_dock_dismissed_at", Date.now().toString());
  };

  // Determine contextual action based on path
  const { actionLabel, defaultProjectType, icon: ActionIcon } = (() => {
    const path = location.pathname;

    if (path.includes("n8n")) {
      return {
        actionLabel: "Estimate n8n Setup Scope",
        defaultProjectType: "N8N_AUTOMATION" as ProjectType,
        icon: Zap,
      };
    }
    if (path.includes("wordpress") || path.includes("ai-wordpress")) {
      return {
        actionLabel: "Custom AI Plugin Architecture",
        defaultProjectType: "AI_WORDPRESS" as ProjectType,
        icon: Code2,
      };
    }
    if (path.includes("multi-agent") || path.includes("custom-ai")) {
      return {
        actionLabel: "Multi-Agent System Blueprint",
        defaultProjectType: "CUSTOM_AI_AGENT" as ProjectType,
        icon: Cpu,
      };
    }
    if (path.includes("crm") || path.includes("sync")) {
      return {
        actionLabel: "2-Way CRM Sync Blueprint",
        defaultProjectType: "CRM_SYNC_ENGINE" as ProjectType,
        icon: RefreshCw,
      };
    }
    if (path.includes("sheets") || path.includes("apps-script")) {
      return {
        actionLabel: "Google Sheets ERP Scope",
        defaultProjectType: "APPS_SCRIPT_ERP" as ProjectType,
        icon: FileSpreadsheet,
      };
    }

    return {
      actionLabel: "Estimate Architecture & Timeline",
      defaultProjectType: "N8N_AUTOMATION" as ProjectType,
      icon: Sparkles,
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
      setIsNewsletterOpen(false);
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
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-fit animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-card/90 backdrop-blur-2xl border border-border/80 shadow-2xl shadow-black/15 text-xs text-foreground">
          {/* 1. Contextual Interactive Tool Trigger */}
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all border border-primary/25 shadow-sm group"
          >
            <ActionIcon className="w-3.5 h-3.5 text-primary" />
            <span className="truncate max-w-[180px] sm:max-w-none">{actionLabel}</span>
            <ChevronRight className="w-3 h-3 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <div className="h-4 w-px bg-border/80 mx-0.5" />

          {/* 2. Subtle Newsletter Popover / Trigger */}
          {isNewsletterOpen ? (
            <form onSubmit={handleSubscribe} className="flex items-center gap-1">
              <Input
                type="email"
                placeholder="name@company.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                autoFocus
                className="h-7 text-xs px-2.5 w-40 sm:w-48 rounded-full border-border/70 bg-background/80"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-7 px-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsNewsletterOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsNewsletterOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {isSubscribed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  <span className="hidden sm:inline">Subscribed</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Get Insights</span>
                </>
              )}
            </button>
          )}

          {/* Close / Dismiss Dock */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss dock"
            className="p-1.5 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Estimator Dialog */}
      <ArchitectureEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        defaultProjectType={defaultProjectType}
      />
    </>
  );
};
