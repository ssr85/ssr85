export const GOOGLE_ADS_ID = "AW-18490594666";
export const GOOGLE_ADS_CONVERSION_LABEL = "AW-18490594666/4vO3CLOwm48dEOqqgPFE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface TrackConversionOptions {
  eventLabel?: string;
  value?: number;
  currency?: string;
}

/**
 * Dispatch Google Ads "Book appointment" conversion and GA4 lead event.
 */
export function trackGoogleAdsConversion(options: TrackConversionOptions = {}) {
  if (typeof window === "undefined") return;

  const { eventLabel = "direct_inquiry", value = 1.0, currency = "INR" } = options;

  if (typeof window.gtag === "function") {
    // 1. Google Ads Primary Conversion Event: "Book appointment"
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_LABEL,
      value,
      currency,
    });

    // 2. GA4 Standard Lead Event
    window.gtag("event", "generate_lead", {
      event_category: "Leads",
      event_label: eventLabel,
      value,
    });
  }
}
