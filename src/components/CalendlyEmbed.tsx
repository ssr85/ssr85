import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { submitLead } from "@/lib/leadSubmission";
import { Loader2 } from "lucide-react";

interface CalendlyEmbedProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  onBookingComplete?: (eventData: unknown) => void;
  className?: string;
  minHeight?: string;
  height?: string;
}

export const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({
  url = "https://calendly.com/srt10/20",
  prefill,
  onBookingComplete,
  className = "",
  minHeight = "720px",
  height = "100%",
}) => {
  const { resolvedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Format theme colors for Calendly widget
  const isDark = resolvedTheme === "dark";
  const backgroundColor = isDark ? "090d14" : "ffffff";
  const textColor = isDark ? "f8fafc" : "0f172a";
  const primaryColor = isDark ? "38bdf8" : "2563eb";

  // Build parameterized Calendly URL
  const embedUrl = React.useMemo(() => {
    try {
      const parsed = new URL(url);
      if (typeof window !== "undefined") {
        parsed.searchParams.set("embed_domain", window.location.hostname);
        
        // Pass through any custom answers like ?a1=... or UTMs from page URL
        const pageParams = new URLSearchParams(window.location.search);
        pageParams.forEach((val, key) => {
          if (!parsed.searchParams.has(key)) {
            parsed.searchParams.set(key, val);
          }
        });
      }
      parsed.searchParams.set("embed_type", "Inline");
      parsed.searchParams.set("hide_gdpr_banner", "1");
      parsed.searchParams.set("background_color", backgroundColor);
      parsed.searchParams.set("text_color", textColor);
      parsed.searchParams.set("primary_color", primaryColor);

      if (prefill?.name) parsed.searchParams.set("name", prefill.name);
      if (prefill?.email) parsed.searchParams.set("email", prefill.email);
      if (prefill?.customAnswers) {
        Object.entries(prefill.customAnswers).forEach(([key, val]) => {
          parsed.searchParams.set(key, val);
        });
      }

      return parsed.toString();
    } catch {
      return `${url}?background_color=${backgroundColor}&text_color=${textColor}&primary_color=${primaryColor}&hide_gdpr_banner=1`;
    }
  }, [url, backgroundColor, textColor, primaryColor, prefill]);

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      // Security & event verification
      if (!e.origin.includes("calendly.com")) return;

      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (!data || typeof data !== "object") return;

      const eventName = data.event || data.action || data.type;

      if (eventName === "calendly.event_scheduled") {
        console.log("[Calendly] Event Scheduled successfully!", data.payload);

        // Extract invitee details from Calendly event payload if available
        const payloadObj = (data.payload && typeof data.payload === "object") ? (data.payload as Record<string, any>) : {};
        const invitee = payloadObj.invitee || {};
        const eventInfo = payloadObj.event || {};

        const extractedName =
          invitee.name ||
          (invitee.first_name ? `${invitee.first_name} ${invitee.last_name || ""}`.trim() : null) ||
          prefill?.name ||
          "Calendly Scheduled Client";

        const extractedEmail =
          invitee.email ||
          prefill?.email ||
          "calendly-appointment@sarabjeetrattan.com";

        const eventUri = eventInfo.uri || payloadObj.event_uri || "";
        const requirementText = eventUri
          ? `1-on-1 Architecture Discovery call scheduled via Calendly. Event: ${eventUri}`
          : "1-on-1 Architecture Discovery call scheduled via embedded Calendly widget.";

        // Submit lead through unified dual-layer intake engine
        try {
          await submitLead({
            name: extractedName,
            email: extractedEmail,
            phone: "CALENDLY_CONFIRMED",
            requirement: requirementText,
            leadType: "CALENDLY_BOOKING",
            leadStatus: "QUALIFIED",
            targetService: "architecture-discovery-call",
            recaptchaToken: "EMBEDDED_CALENDLY_EVENT",
            conversionLabel: "calendly_appointment_confirmed",
          });
        } catch (err) {
          console.error("[Calendly] Error processing lead:", err);
        }

        // Trigger parent callback if provided
        if (onBookingComplete) {
          onBookingComplete(data.payload);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [prefill, onBookingComplete]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-inner ${className}`}
      style={{ minHeight, height }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-10 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-xs font-mono text-muted-foreground">
            Loading real-time availability calendar...
          </span>
        </div>
      )}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule 20-Min Architecture Discovery with Sarabjeet Rattan"
        className="w-full h-full border-0"
        style={{ minHeight, height }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
