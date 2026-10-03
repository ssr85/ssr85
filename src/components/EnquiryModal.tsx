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
import { executeRecaptcha } from "@/lib/recaptcha";
import { submitLead } from "@/lib/leadSubmission";
import { Sparkles, Calendar, MessageSquare, ArrowRight, Send, Loader2, ShieldCheck } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

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
    .transform((val) => val.replace(/[\s().-]/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^\+[1-9]\d{8,14}$/,
          "Phone must include country code (e.g., +1 415 555 2671 or +91 98765 43210)",
        ),
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
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  const formData = watch();

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha("submit_enquiry");

      const result = await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName || undefined,
        requirement: data.requirement,
        leadType: "GENERAL_ENQUIRY",
        leadStatus: "NEW",
        recaptchaToken: recaptchaToken || "DIRECT_ENQUIRY_FALLBACK",
        conversionLabel: "enquiry_modal_submission",
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to send enquiry");
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
      <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden bg-background/95 backdrop-blur-2xl border border-border/80 shadow-2xl rounded-[2rem]">
        {/* Double Bezel Outer / Header */}
        <div className="p-6 md:p-8 pb-4 bg-gradient-to-b from-muted/50 to-transparent border-b border-border/60">
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
              Share your project or schedule a dedicated 20-minute architecture discovery call.
            </DialogDescription>
          </DialogHeader>

          {/* Modal Tabs */}
          <div className="flex rounded-xl bg-muted/60 p-1 mt-4 border border-border/40">
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
              Submit Scope Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("calendar")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "calendar"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              Live Calendar Booking
            </button>
          </div>
        </div>

        {activeTab === "calendar" ? (
          <div className="p-6 md:p-8 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                Select a slot below (syncs live with Sarabjeet's calendar)
              </span>
              <a
                href="/book"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                Full booking page <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <CalendlyEmbed
              minHeight="540px"
              prefill={{
                name: formData.name || undefined,
                email: formData.email || undefined,
              }}
              onBookingComplete={() => {
                toast({
                  title: "Appointment Confirmed!",
                  description: "Your session is locked in. Looking forward to our conversation.",
                });
                onClose();
              }}
            />

            <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-[11px] text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Conversions tracked automatically upon confirmed slot reservation.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 md:p-8 pt-4">

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
                className="bg-card border-border/80 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
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
                className="bg-card border-border/80 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl font-mono"
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
                className="bg-card border-border/80 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
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
                className="bg-card border-border/80 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl"
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
              className="bg-card border-border/80 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl resize-none"
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
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full px-5 text-xs"
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
        )}
      </DialogContent>
    </Dialog>
  );
};
