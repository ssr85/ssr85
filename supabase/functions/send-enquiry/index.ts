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
}

// In-memory rate limiting store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

function getClientIP(req: Request): string {
  // Check common headers for client IP
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

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    // First request or window expired - start new window
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  // Increment count
  record.count++;
  return false;
}

// Validation helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+()]{10,20}$/;

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
    errors.push({ field: "phone", message: "Phone must be 10-20 digits" });
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
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
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

    console.log("Sending enquiry email from:", email);

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
