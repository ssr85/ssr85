import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Mail,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export const SubtleNewsletterCollector = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed or subscribed
    const isSubscribed = localStorage.getItem("ssr_newsletter_subscribed");
    const dismissedAt = localStorage.getItem("ssr_newsletter_dismissed_at");

    if (isSubscribed) return;

    if (dismissedAt) {
      const daysSinceDismiss =
        (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 7) return; // Snooze for 7 days if dismissed
    }

    // Gentle delayed reveal after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("ssr_newsletter_dismissed_at", Date.now().toString());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      const urlParams = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      );

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: cleanEmail,
          phone: "N/A",
          requirement: `Newsletter subscription initiated from ${currentPath}`,
          targetService: "engineering-newsletter",
          leadType: "NEWSLETTER",
          leadStatus: "NEW",
          sourceUrl: currentPath,
          utmSource: urlParams.get("utm_source") || undefined,
          utmMedium: urlParams.get("utm_medium") || undefined,
          utmCampaign: urlParams.get("utm_campaign") || undefined,
          referringQuery: urlParams.get("q") || urlParams.get("query") || undefined,
          recaptchaToken: "DIRECT_NEWSLETTER_SUBSCRIBE",
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Subscription failed");
      }

      // 3. Dispatch GA4 event
      if (
        typeof window !== "undefined" &&
        /* eslint-disable @typescript-eslint/no-explicit-any */
        typeof (window as any).gtag === "function"
      ) {
        (window as any).gtag("event", "newsletter_signup", {
          event_category: "Engagement",
          event_label: currentPath,
        });
      }

      setIsSuccess(true);
      localStorage.setItem("ssr_newsletter_subscribed", "true");
      toast.success("Welcome aboard! You're on the priority insights list.");

      // Auto hide after 5 seconds of success
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    } catch (err) {
      console.error("Newsletter error:", err);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Newsletter Subscription"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-[340px] transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="relative p-5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl shadow-primary/5 space-y-3">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {isSuccess ? (
          <div className="py-2 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">You're Subscribed!</h4>
              <p className="text-[11px] text-muted-foreground">
                Latest architecture blueprints will land straight in your inbox.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header Hook */}
            <div className="space-y-1 pr-4">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Architecture & AI
              </div>
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                Get our latest, in your inbox.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Autonomous workflows, n8n blueprints & enterprise AI breakdowns. No spam.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5 bg-background/80 border border-border/70 rounded-xl p-1 focus-within:border-primary/60 transition-colors shadow-inner">
                <div className="pl-2.5 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="border-0 shadow-none focus-visible:ring-0 text-xs px-2 py-1.5 h-8 placeholder:text-muted-foreground/60 bg-transparent text-foreground"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="h-8 px-3 rounded-lg font-semibold text-xs shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-between px-1 text-[10px] text-muted-foreground/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary/80" /> 100% Privacy
                </span>
                <span>Unsubscribe anytime</span>
              </div>
            </form>
          </>
        )}
      </div>
    </aside>
  );
};
