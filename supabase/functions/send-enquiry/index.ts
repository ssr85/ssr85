import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  requirement: string;
  recaptchaToken?: string;
}

// In-memory rate limiting store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
const RATE_LIMIT_MAX = 3; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 30 minute window
const BLOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour block for abusers

const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
const RECAPTCHA_SCORE_THRESHOLD = 0.5; // Reject scores below this

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

function checkRateLimit(clientIP: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  // Check if IP is blocked
  if (record?.blocked && now < record.resetTime) {
    console.warn(`Blocked IP attempted request: ${clientIP}`);
    return { limited: true, remaining: 0 };
  }

  if (!record || now > record.resetTime) {
    // First request or window expired - start new window
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS, blocked: false });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    // Block the IP for longer duration on repeated violations
    record.blocked = true;
    record.resetTime = now + BLOCK_DURATION_MS;
    console.warn(`Rate limit exceeded, blocking IP: ${clientIP}`);
    return { limited: true, remaining: 0 };
  }

  // Increment count
  record.count++;
  return { limited: false, remaining: RATE_LIMIT_MAX - record.count };
}

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number; action: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return { success: false, score: 0, action: "" };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    console.log("reCAPTCHA verification result:", { success: data.success, score: data.score, action: data.action });
    
    return {
      success: data.success === true,
      score: data.score || 0,
      action: data.action || "",
    };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, score: 0, action: "" };
  }
}

// Validation helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+[1-9]\d{9,14}$/;

interface ValidationError {
  field: string;
  message: string;
}

function validateInput(data: EnquiryRequest): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || typeof data.name !== "string") {
    errors.push({ field: "name", message: "Name is required" });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  } else if (data.name.length > 100) {
    errors.push({ field: "name", message: "Name must be less than 100 characters" });
  }

  // Email validation
  if (!data.email || typeof data.email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else if (data.email.length > 255) {
    errors.push({ field: "email", message: "Email must be less than 255 characters" });
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Phone validation
  if (!data.phone || typeof data.phone !== "string") {
    errors.push({ field: "phone", message: "Phone is required" });
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.push({ field: "phone", message: "Phone must start with + followed by country code and 10-15 digits (e.g., +919876543210)" });
  }

  // Company name validation (optional but limited)
  if (data.companyName && typeof data.companyName === "string" && data.companyName.length > 100) {
    errors.push({ field: "companyName", message: "Company name must be less than 100 characters" });
  }

  // Requirement validation
  if (!data.requirement || typeof data.requirement !== "string") {
    errors.push({ field: "requirement", message: "Requirement is required" });
  } else if (data.requirement.trim().length < 10) {
    errors.push({ field: "requirement", message: "Requirement must be at least 10 characters" });
  } else if (data.requirement.length > 2000) {
    errors.push({ field: "requirement", message: "Requirement must be less than 2000 characters" });
  }

  return errors;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);
    
    if (rateLimit.limited) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": "1800",
            ...corsHeaders 
          },
        }
      );
    }

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail credentials not configured");
      throw new Error("Email service not configured");
    }

    const requestData: EnquiryRequest = await req.json();

    // Verify reCAPTCHA token
    if (!requestData.recaptchaToken) {
      console.warn("No reCAPTCHA token provided");
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: [{ field: "captcha", message: "Security verification is required. Please refresh and try again." }]
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const recaptchaResult = await verifyRecaptcha(requestData.recaptchaToken);
    
    if (!recaptchaResult.success) {
      console.warn(`reCAPTCHA verification failed for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: [{ field: "captcha", message: "Security verification failed. Please refresh and try again." }]
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
      console.warn(`Low reCAPTCHA score (${recaptchaResult.score}) for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: [{ field: "captcha", message: "Request flagged as suspicious. Please try again or contact directly." }]
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Server-side validation
    const validationErrors = validateInput(requestData);
    if (validationErrors.length > 0) {
      console.warn("Validation failed:", validationErrors);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validationErrors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const name = requestData.name.trim();
    const email = requestData.email.trim().toLowerCase();
    const phone = requestData.phone.trim();
    const companyName = requestData.companyName?.trim() || "";
    const requirement = requestData.requirement.trim();

    console.log(`Processing enquiry from: ${email}, IP: ${clientIP}, reCAPTCHA score: ${recaptchaResult.score}, remaining requests: ${rateLimit.remaining}`);

    // Create SMTP client for Gmail
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: gmailUser,
          password: gmailAppPassword,
        },
      },
    });

    // Compose email content
    const emailBody = `
New Enquiry from Portfolio Website

-----------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${companyName || "Not provided"}
Client IP: ${clientIP}
reCAPTCHA Score: ${recaptchaResult.score}
-----------------------------------

Requirement:
${requirement}

-----------------------------------
This email was sent from the portfolio website contact form.
    `.trim();

    // Send email
    await client.send({
      from: gmailUser,
      to: gmailUser,
      subject: `Portfolio Enquiry from ${name}`,
      content: emailBody,
      replyTo: email,
    });

    await client.close();

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Enquiry sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-enquiry function:", errorMessage);
    return new Response(JSON.stringify({ error: "Failed to send enquiry. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
