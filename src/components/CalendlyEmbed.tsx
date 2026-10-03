import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { trackGoogleAdsConversion } from "@/lib/conversion";
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

      const data = e.data;
      if (!data || typeof data !== "object") return;

      const eventName = data.event;

      if (eventName === "calendly.event_scheduled") {
        console.log("[Calendly] Event Scheduled successfully!", data.payload);

        // 1. Dispatch Google Ads & GA4 conversion
        trackGoogleAdsConversion({
          eventLabel: "calendly_appointment_confirmed",
          value: 1.0,
        });

        // 2. Log conversion to Supabase /api/enquiry
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const currentPath = window.location.pathname;

          await fetch("/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: prefill?.name || "Calendly Scheduled Client",
              email: prefill?.email || "calendly-confirmed@booking.com",
              phone: "CALENDLY_CONFIRMED",
              requirement: "1-on-1 Architecture Discovery confirmed via embedded Calendly widget.",
              leadType: "CALENDLY_BOOKING",
              leadStatus: "QUALIFIED",
              targetService: "architecture-discovery-call",
              sourceUrl: currentPath,
              gclid: urlParams.get("gclid") || undefined,
              utmSource: urlParams.get("utm_source") || undefined,
              utmMedium: urlParams.get("utm_medium") || undefined,
              utmCampaign: urlParams.get("utm_campaign") || undefined,
              referringQuery: urlParams.get("q") || urlParams.get("query") || undefined,
              recaptchaToken: "EMBEDDED_CALENDLY_EVENT",
            }),
          });
        } catch (err) {
          console.error("Error logging Calendly lead:", err);
        }

        // 3. Trigger parent callback if provided
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
