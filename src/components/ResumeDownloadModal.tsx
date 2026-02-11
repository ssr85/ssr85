import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileDown } from "lucide-react";

const RECAPTCHA_SITE_KEY = "6LeVgjIsAAAAAN6e8q-EldrjmBTN2n1rVPj5aGEv";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const downloadSchema = z.object({
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
});

type DownloadFormData = z.infer<typeof downloadSchema>;

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDownloadModal = ({ isOpen, onClose }: ResumeDownloadModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
              action: "download_resume",
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

  const onSubmit = async (data: DownloadFormData) => {
    setIsSubmitting(true);

    try {
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
          companyName: "",
          requirement: "Resume PDF Download Request",
          recaptchaToken,
        },
      });

      if (error) {
        console.error("Server error:", error);

        let errorMessage = "Something went wrong. Please try again.";

        try {
          let errorBody = null;
          if (error.context && typeof error.context.json === "function") {
            errorBody = await error.context.json();
          } else if (error.context) {
            errorBody = error.context;
          }

          if (errorBody?.details && Array.isArray(errorBody.details)) {
            errorMessage = errorBody.details
              .map(
                (e: { field: string; message: string }) =>
                  `• ${e.field.charAt(0).toUpperCase() + e.field.slice(1)}: ${e.message}`,
              )
              .join("\n");
          } else if (errorBody?.error) {
            errorMessage = errorBody.error;
          }
        } catch (parseError) {
          console.error("Error parsing server response:", parseError);
        }

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (responseData?.error) {
        toast({
          title: "Error",
          description: responseData.error,
          variant: "destructive",
        });
        return;
      }

      // Success - close modal and navigate to resume page
      reset();
      onClose();
      navigate("/resume");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Failed to Submit",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-xl">Download Resume</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Please fill in your details to download the PDF resume.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="dl-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dl-name"
              placeholder="Your full name"
              {...register("name")}
              aria-invalid={!!errors.name}
              className="border-border focus:border-primary"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dl-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dl-email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              className="border-border focus:border-primary"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dl-phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dl-phone"
              placeholder="+91XXXXXXXXXX"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              className="border-border focus:border-primary"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>

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
                  Submitting...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Resume
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
