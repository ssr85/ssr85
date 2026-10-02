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
import { Send, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from "lucide-react";

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

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Inquiry Successfully Dispatched</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Thank you, {name}. Your requirements have been logged. I will analyze your scope and get back to you with an architecture assessment.
              </p>
              <Button onClick={onClose} className="mt-4">
                Close Window
              </Button>
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
