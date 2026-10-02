import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/data/content";

interface ServiceLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  serviceTitle?: string;
}

export const ServiceLeadModal: React.FC<ServiceLeadModalProps> = ({
  isOpen,
  onClose,
  defaultService = "custom-ai-solutions",
  serviceTitle = "Custom Engineering Consultation",
}) => {
  const [activeTab, setActiveTab] = useState<"form" | "call">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setActiveTab("form");
    }
  }, [isOpen]);

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

      const leadPayload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        company_name: company.trim() || null,
        target_service: defaultService,
        requirement: requirement.trim(),
        source_url: currentPath,
        utm_source: urlParams.get("utm_source") || null,
        utm_medium: urlParams.get("utm_medium") || null,
        utm_campaign: urlParams.get("utm_campaign") || null,
        referring_query: urlParams.get("q") || urlParams.get("query") || null,
        lead_status: "NEW",
      };

      // 1. Insert lead directly into Supabase service_leads table
      const { error: dbError } = await supabase.from("service_leads").insert([leadPayload]);
      if (dbError) {
        console.warn("Direct Supabase insert note:", dbError.message);
      }

      // 2. Also send notification through enquiry API for instant email delivery
      try {
        await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || "N/A",
            companyName: company.trim() || undefined,
            requirement: `[Target Service: ${defaultService} | Source: ${currentPath}]\n\n${requirement.trim()}`,
            recaptchaToken: "DIRECT_SERVICE_LEAD",
          }),
        });
      } catch (apiErr) {
        console.warn("Enquiry API relay note:", apiErr);
      }

      // 3. Dispatch GA4 / Google Ads conversion event
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "generate_lead", {
          event_category: "Service Consultation",
          event_label: defaultService,
          value: 1,
        });
      }

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
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-2 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Engineering Inquiry
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
              {serviceTitle}
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
                  <a
                    href="https://calendly.com/srt10/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book 20-Min on Calendly
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
            <div className="py-4 space-y-5">
              {/* Primary Calendly Booking Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 space-y-4 shadow-lg shadow-primary/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-mono uppercase font-bold tracking-wider">
                      <Sparkles className="w-3 h-3" /> Instant Schedule
                    </div>
                    <h4 className="font-bold text-foreground text-base">20-Minute Architecture Discovery</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Discuss your technical stack, AI agent requirements, or custom automation architecture 1-on-1 with Sarabjeet.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>

                <a
                  href="https://calendly.com/srt10/20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all group"
                >
                  <span>Select Time on Calendly</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Alternative Direct Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:sarabjitrattan@gmail.com?subject=Architecture%20Discovery%20Call%20Request"
                  className="p-3.5 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-foreground">Email Scheduler</div>
                      <div className="text-[10px] text-muted-foreground">sarabjitrattan@gmail.com</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-card border border-border/70 hover:border-blue-500/50 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-foreground">LinkedIn Message</div>
                      <div className="text-[10px] text-muted-foreground">Direct Chat with Builder</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Zero sales reps. Direct, confidential architectural assessment with the engineer.</span>
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
