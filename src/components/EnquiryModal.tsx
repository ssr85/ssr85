import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Sparkles, X, Calendar, ExternalLink } from "lucide-react";
import { executeRecaptcha } from "@/lib/recaptcha";

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^\+[1-9]\d{9,14}$/,
      "Phone must start with + followed by country code and 10-15 digits (e.g., +919876543210)",
    ),
  companyName: z.string().trim().max(100, "Company name must be less than 100 characters").optional().or(z.literal("")),
  requirement: z
    .string()
    .trim()
    .min(10, "Requirement must be at least 10 characters")
    .max(2000, "Requirement must be less than 2000 characters"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal = ({ isOpen, onClose }: EnquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      requirement: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha("submit_enquiry");

      if (!recaptchaToken) {
        toast({
          title: "Security Check Failed",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName || "",
          requirement: data.requirement,
          recaptchaToken,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to send enquiry");
      }

      // Dispatch GA4 / Google Ads conversion event
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "generate_lead", {
          event_category: "Direct Contact Form",
          event_label: "homepage_enquiry_modal",
          value: 1,
        });
      }

      toast({
        title: "Enquiry Received",
        description: "Thank you for reaching out. I will review your requirements and get back to you shortly.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or email me directly at sarabjit.rattan@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-[#070a0f] border border-white/[0.12] shadow-2xl rounded-[2rem]">
        {/* Double Bezel Outer / Header */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-white/[0.04] to-transparent border-b border-white/[0.08]">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge-eyebrow text-[10px]">
                <Sparkles size={11} className="text-primary" />
                Direct Inquiry
              </span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Initiate Discussion.
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs md:text-sm font-light leading-relaxed">
              Share your project or architectural requirements. I typically respond within 24 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-8 pt-4">
          {/* Quick Calendly Shortcut */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground font-medium">Prefer to pick a live 20-min slot?</span>
            </div>
            <a
              href="https://calendly.com/srt10/20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline shrink-0"
            >
              Book on Calendly <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Name & Phone in 2-col on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono text-muted-foreground">
                Your Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. Alex Walker"
                {...register("name")}
                aria-invalid={!!errors.name}
                className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
              />
              {errors.name && <p className="text-[11px] text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-mono text-muted-foreground">
                Phone (+Country Code) <span className="text-primary">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="+14155552671"
                {...register("phone")}
                aria-invalid={!!errors.phone}
                className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl font-mono"
              />
              {errors.phone && <p className="text-[11px] text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono text-muted-foreground">
                Work Email <span className="text-primary">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@enterprise.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
              />
              {errors.email && <p className="text-[11px] text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-xs font-mono text-muted-foreground">
                Company / Organization
              </Label>
              <Input
                id="companyName"
                placeholder="Enterprise Inc."
                {...register("companyName")}
                aria-invalid={!!errors.companyName}
                className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
              />
              {errors.companyName && <p className="text-[11px] text-destructive">{errors.companyName.message}</p>}
            </div>
          </div>

          {/* Requirement */}
          <div className="space-y-1.5">
            <Label htmlFor="requirement" className="text-xs font-mono text-muted-foreground">
              Project Architecture or Problem Scope <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="requirement"
              placeholder="Outline your current operational bottlenecks, scale objectives, or required agentic capabilities..."
              rows={4}
              {...register("requirement")}
              aria-invalid={!!errors.requirement}
              className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl resize-none"
            />
            {errors.requirement && <p className="text-[11px] text-destructive">{errors.requirement.message}</p>}
          </div>

          {/* reCAPTCHA Notice */}
          <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
            Protected by Google reCAPTCHA.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-primary"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full px-5 text-xs border-white/[0.1] hover:bg-white/[0.05]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20 transition-all group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Requirements</span>
                  <span className="btn-icon-pod bg-black/20 text-primary-foreground ml-2">
                    <Send size={11} />
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
