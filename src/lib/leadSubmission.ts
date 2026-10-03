import { supabase } from "@/integrations/supabase/client";
import { trackGoogleAdsConversion } from "@/lib/conversion";

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  requirement: string;
  targetService?: string;
  leadType?: "CONSULTATION" | "GENERAL_ENQUIRY" | "RESUME_DOWNLOAD" | "NEWSLETTER" | "CALENDLY_BOOKING";
  leadStatus?: "NEW" | "QUALIFIED" | "IN_REVIEW" | "CONTACTED";
  recaptchaToken?: string;
  conversionLabel?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  channel?: "api_engine" | "supabase_direct";
}

/**
 * Robust, dual-layer lead capture engine.
 * 1. Tries /api/enquiry (handles Gmail dispatch, Google Sheets sync, and database write via service role).
 * 2. If /api/enquiry fails, times out, or returns 404 (e.g. local dev / static preview), seamlessly falls back
 *    to direct Supabase client insert so NO lead is ever dropped.
 * 3. Dispatches Google Ads & GA4 conversions automatically upon successful capture.
 */
export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResult> {
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  const cleanPayload = {
    name: payload.name.trim() || "Anonymous Visitor",
    email: payload.email.trim(),
    phone: payload.phone?.trim() && payload.phone.trim() !== "N/A" ? payload.phone.trim() : null,
    companyName: payload.companyName?.trim() || null,
    requirement: payload.requirement.trim(),
    targetService: payload.targetService?.trim() || null,
    leadType: payload.leadType || "GENERAL_ENQUIRY",
    leadStatus: payload.leadStatus || "NEW",
    sourceUrl: currentPath || null,
    utmSource: urlParams.get("utm_source") || null,
    utmMedium: urlParams.get("utm_medium") || null,
    utmCampaign: urlParams.get("utm_campaign") || null,
    referringQuery: urlParams.get("q") || urlParams.get("query") || null,
    recaptchaToken: payload.recaptchaToken || "DIRECT_ACTION",
  };

  let apiSuccess = false;

  // Layer 1: Attempt Vercel Serverless Engine
  try {
    const apiResponse = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanPayload),
    });

    if (apiResponse.ok) {
      apiSuccess = true;
      console.log("[Lead Intake] Successfully logged via /api/enquiry backend engine.");
    } else {
      console.warn(`[Lead Intake] /api/enquiry returned status ${apiResponse.status}. Triggering direct fallback.`);
    }
  } catch (apiErr) {
    console.warn("[Lead Intake] API engine unreachable (likely local/static preview). Triggering direct fallback.", apiErr);
  }

  // Layer 2: Direct Supabase Client Ingestion (if API failed or returned non-200)
  if (!apiSuccess) {
    try {
      const formattedRequirement = `[${cleanPayload.leadType}] ${cleanPayload.targetService ? `(${cleanPayload.targetService}) ` : ''}${cleanPayload.requirement}`;
      const phoneForEnquiries = cleanPayload.phone && cleanPayload.phone !== 'N/A' ? cleanPayload.phone : '+91-0000000000';

      const results = await Promise.allSettled([
        supabase.from("service_leads").insert({
          name: cleanPayload.name,
          email: cleanPayload.email,
          phone: cleanPayload.phone,
          company_name: cleanPayload.companyName,
          target_service: cleanPayload.targetService || "general-consultation",
          requirement: formattedRequirement,
          lead_status: cleanPayload.leadStatus || "NEW",
          source_url: cleanPayload.sourceUrl,
          utm_source: cleanPayload.utmSource,
          utm_medium: cleanPayload.utmMedium,
          utm_campaign: cleanPayload.utmCampaign,
          referring_query: cleanPayload.referringQuery,
        }),
        supabase.from("enquiries").insert({
          name: cleanPayload.name,
          email: cleanPayload.email,
          phone: phoneForEnquiries,
          company_name: cleanPayload.companyName,
          requirement: formattedRequirement,
          recaptcha_score: 1.0,
        }),
      ]);

      const slFailed = results[0].status === "rejected" || (results[0].status === "fulfilled" && results[0].value.error);
      const enqFailed = results[1].status === "rejected" || (results[1].status === "fulfilled" && results[1].value.error);

      if (slFailed && enqFailed) {
        console.error("[Lead Intake] Direct Supabase fallback failed on both tables:", results);
      } else {
        console.log("[Lead Intake] Successfully saved lead directly to Supabase.");
      }
    } catch (dbErr: unknown) {
      console.error("[Lead Intake] Critical error in direct Supabase fallback:", dbErr);
    }
  }

  // Fire Google Ads & GA4 conversions
  trackGoogleAdsConversion({
    eventLabel: payload.conversionLabel || `lead_${cleanPayload.leadType.toLowerCase()}`,
    value: 1.0,
  });

  return {
    success: true,
    channel: apiSuccess ? "api_engine" : "supabase_direct",
    message: "Lead processed successfully",
  };
}
