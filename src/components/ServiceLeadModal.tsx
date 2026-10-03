import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  Calendar,
  Mail,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/data/content";
import { trackGoogleAdsConversion } from "@/lib/conversion";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

interface ServiceLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  serviceTitle?: string;
  initialService?: string;
  initialRequirement?: string;
}

export const ServiceLeadModal: React.FC<ServiceLeadModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  serviceTitle,
  initialService,
  initialRequirement = "",
}) => {
  const effectiveTitle = serviceTitle || initialService || "Custom Engineering Consultation";
  const effectiveService = defaultService || initialService || serviceTitle || "custom-engineering";

  const [activeTab, setActiveTab] = useState<"form" | "call">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [requirement, setRequirement] = useState(initialRequirement);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setActiveTab("form");
      if (initialRequirement && !requirement) {
        setRequirement(initialRequirement);
      }
    }
  }, [isOpen, initialRequirement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !requirement.trim()) {
      toast.error("Please fill in your name, email, and project requirement.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture UTM parameters from URL if present
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

      // Send lead through unified backend capture engine
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || "N/A",
          companyName: company.trim() || undefined,
          requirement: requirement.trim(),
          targetService: effectiveService,
          leadType: "CONSULTATION",
          leadStatus: "NEW",
          sourceUrl: currentPath,
          gclid: urlParams.get("gclid") || undefined,
          utmSource: urlParams.get("utm_source") || undefined,
          utmMedium: urlParams.get("utm_medium") || undefined,
          utmCampaign: urlParams.get("utm_campaign") || undefined,
          referringQuery: urlParams.get("q") || urlParams.get("query") || undefined,
          recaptchaToken: "DIRECT_SERVICE_LEAD",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      // 3. Dispatch GA4 & Google Ads "Book appointment" conversion event
      trackGoogleAdsConversion({
        eventLabel: `service_modal_${effectiveService}`,
        value: 1.0,
      });

      setIsSuccess(true);
      toast.success("Inquiry received! Sarabjeet will review your project within 24 hours.");
    } catch (err: unknown) {
      console.error("Submission error:", err);
      toast.error("Failed to send inquiry. Please email directly at sarabjitrattan@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-2 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Engineering Inquiry
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
              {effectiveTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mt-1">
              Discuss your architecture, technical bottlenecks, or custom software requirements directly with Sarabjeet Rattan.
            </DialogDescription>
          </DialogHeader>

          {/* Tabs */}
          {!isSuccess && (
            <div className="flex rounded-xl bg-muted/60 p-1 mb-6 border border-border/40">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "form"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                Submit Project Scope
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("call")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "call"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                1-on-1 Strategy Discussion
              </button>
            </div>
          )}

          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Inquiry Successfully Dispatched</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Thank you, {name}. Your technical requirements have been received. Sarabjeet will review your scope within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border/80 text-left space-y-3 max-w-sm mx-auto">
                <div className="text-xs font-mono font-bold text-primary uppercase">Prefer to pick a live calendar slot?</div>
                <p className="text-xs text-muted-foreground">
                  Lock in a dedicated 20-minute architecture discovery call directly on my calendar.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setActiveTab("call");
                    }}
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Select a Live Time Slot Now
                  </button>
                  <div className="flex gap-2">
                    <a
                      href="mailto:sarabjitrattan@gmail.com?subject=Priority%20Engineering%20Discussion"
                      className="flex-1 text-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                    >
                      Email Direct
                    </a>
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <Button onClick={onClose} className="mt-2 w-full max-w-sm">
                Close Window
              </Button>
            </div>
          ) : activeTab === "call" ? (
            <div className="py-2 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Select a Convenient 20-Min Slot
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Real-time availability directly synced with Sarabjeet's calendar.
                  </p>
                </div>
                <a
                  href="/book"
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 shrink-0 font-medium"
                >
                  Full booking page <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Interactive Calendly Widget */}
              <CalendlyEmbed
                minHeight="540px"
                prefill={{
                  name: name.trim() || undefined,
                  email: email.trim() || undefined,
                }}
                onBookingComplete={() => {
                  toast.success("Meeting confirmed! Looking forward to discussing your project.");
                  setIsSuccess(true);
                }}
              />

              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Zero sales reps. Direct, confidential 1-on-1 architectural assessment.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-name" className="text-xs font-medium text-foreground">
                    Your Name *
                  </Label>
                  <Input
                    id="lead-name"
                    required
                    placeholder="e.g. Alex Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 bg-background/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-email" className="text-xs font-medium text-foreground">
                    Work Email *
                  </Label>
                  <Input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 bg-background/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-phone" className="text-xs font-medium text-foreground">
                    Phone / WhatsApp (Optional)
                  </Label>
                  <Input
                    id="lead-phone"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 bg-background/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-company" className="text-xs font-medium text-foreground">
                    Company / Website (Optional)
                  </Label>
                  <Input
                    id="lead-company"
                    placeholder="e.g. Acme Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-10 bg-background/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lead-requirement" className="text-xs font-medium text-foreground">
                  Project Details & Bottlenecks *
                </Label>
                <Textarea
                  id="lead-requirement"
                  required
                  rows={4}
                  placeholder="Describe what you want built (e.g. custom AI plugin, local LLM setup, automated CRM sync engine)..."
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="bg-background/60 resize-none text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Confidential • Direct Engineer Access</span>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 h-10 font-medium shadow-md shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
