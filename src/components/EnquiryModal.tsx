import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const RECAPTCHA_SITE_KEY = "6LeVgjIsAAAAAN6e8q-EldrjmBTN2n1rVPj5aGEv";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

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
      "Phone must start with + followed by country code and 10-15 digits (e.g., +919876543210)"
    ),
  companyName: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
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

  const executeRecaptcha = async (): Promise<string | null> => {
    try {
      return new Promise((resolve) => {
        if (!window.grecaptcha) {
          console.error("reCAPTCHA not loaded");
          resolve(null);
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: "submit_enquiry",
            });
            resolve(token);
          } catch (err) {
            console.error("reCAPTCHA execution error:", err);
            resolve(null);
          }
        });
      });
    } catch (err) {
      console.error("reCAPTCHA error:", err);
      return null;
    }
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha();
      
      if (!recaptchaToken) {
        toast({
          title: "Security Check Failed",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { data: responseData, error } = await supabase.functions.invoke("send-enquiry", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName || "",
          requirement: data.requirement,
          recaptchaToken,
        },
      });

      if (error) {
        console.error("Server error:", error);
        
        let errorTitle = "Error";
        let errorMessage = "Something went wrong. Please try again or email directly.";
        
        try {
          const errorBody = error.context;
          if (errorBody?.details && Array.isArray(errorBody.details)) {
            errorTitle = "Validation Error";
            errorMessage = errorBody.details
              .map((e: { field: string; message: string }) => `• ${e.field.charAt(0).toUpperCase() + e.field.slice(1)}: ${e.message}`)
              .join("\n");
          } else if (errorBody?.error) {
            errorMessage = errorBody.error;
          }
        } catch (parseError) {
          console.error("Error parsing server response:", parseError);
        }

        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (responseData?.error) {
        console.error("Response error:", responseData);
        
        let errorTitle = "Error";
        let errorMessage = responseData.error;
        
        if (responseData.details && Array.isArray(responseData.details)) {
          errorTitle = "Validation Error";
          errorMessage = responseData.details
            .map((e: { field: string; message: string }) => `• ${e.field.charAt(0).toUpperCase() + e.field.slice(1)}: ${e.message}`)
            .join("\n");
        }

        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Enquiry Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-xl">Get In Touch</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Fill out the form below and I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name")}
              aria-invalid={!!errors.name}
              className="border-border focus:border-primary"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              className="border-border focus:border-primary"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="+91XXXXXXXXXX"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              className="border-border focus:border-primary"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Company Name (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Your company (optional)"
              {...register("companyName")}
              aria-invalid={!!errors.companyName}
              className="border-border focus:border-primary"
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          {/* Requirement */}
          <div className="space-y-2">
            <Label htmlFor="requirement">
              Brief Requirement <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="requirement"
              placeholder="Describe what you're looking for..."
              rows={4}
              {...register("requirement")}
              aria-invalid={!!errors.requirement}
              className="border-border focus:border-primary"
            />
            {errors.requirement && (
              <p className="text-sm text-destructive">{errors.requirement.message}</p>
            )}
          </div>

          {/* reCAPTCHA Notice */}
          <p className="text-xs text-muted-foreground">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            apply.
          </p>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Enquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
