import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Configuration from environment variables
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://bwpemzjwrrszygszuitc.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// In-memory rate limiting store (resets on cold start, per function instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 30 minute window
const BLOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour block for abusers

function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return (Array.isArray(forwarded) ? forwarded[0] : forwarded).split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(clientIP: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (record?.blocked && now < record.resetTime) {
    return { limited: true, remaining: 0 };
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS, blocked: false });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    record.blocked = true;
    record.resetTime = now + BLOCK_DURATION_MS;
    console.warn(`Rate limit exceeded, blocking IP: ${clientIP}`);
    return { limited: true, remaining: 0 };
  }

  record.count++;
  return { limited: false, remaining: RATE_LIMIT_MAX - record.count };
}

export interface EnquiryRequest {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  requirement?: string;
  targetService?: string;
  leadType?: 'CONSULTATION' | 'GENERAL_ENQUIRY' | 'RESUME_DOWNLOAD' | 'NEWSLETTER' | 'CALENDLY_BOOKING';
  leadStatus?: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referringQuery?: string;
  recaptchaToken?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  const origin = req.headers.origin as string | undefined;
  const allowedOrigins = [
    'https://sarabjeetrattan.com',
    'https://www.sarabjeetrattan.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://sarabjeetrattan.com');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    if (rateLimit.limited) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      res.setHeader('Retry-After', '1800');
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const {
      name,
      email,
      phone,
      companyName,
      requirement,
      targetService,
      leadType = 'GENERAL_ENQUIRY',
      leadStatus = 'NEW',
      sourceUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      referringQuery,
      recaptchaToken,
    } = req.body as EnquiryRequest;

    // 1. Basic Validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const cleanName = (name || 'Anonymous Visitor').trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone?.trim() || 'N/A';
    const cleanRequirement = (requirement || `Inquiry from ${sourceUrl || 'Portfolio'}`).trim();
    const cleanTargetService = targetService?.trim() || null;
    const cleanLeadType = leadType || 'GENERAL_ENQUIRY';

    // 2. Verify reCAPTCHA (if token provided and not an internal direct action token)
    let recaptchaScore = 1.0;
    const isDirectBypass =
      recaptchaToken &&
      (recaptchaToken.startsWith('DIRECT_') ||
        recaptchaToken === 'DIRECT_SERVICE_LEAD' ||
        recaptchaToken === 'DIRECT_NEWSLETTER_SUBSCRIBE' ||
        recaptchaToken === 'DIRECT_RESUME_DOWNLOAD' ||
        recaptchaToken === 'EMBEDDED_CALENDLY_EVENT');

    if (recaptchaToken && !isDirectBypass && RECAPTCHA_SECRET_KEY) {
      try {
        const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });

        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < RECAPTCHA_SCORE_THRESHOLD) {
          console.warn('reCAPTCHA check rejected — success:', recaptchaData.success, '| score:', recaptchaData.score);
          return res.status(403).json({ error: 'Security check failed. Please try again.' });
        }
        recaptchaScore = recaptchaData.score;
      } catch (recaptchaErr) {
        console.warn('reCAPTCHA verification error:', recaptchaErr);
      }
    }

    // 3. Send Notification Email via Gmail
    let emailPromise: Promise<unknown> = Promise.resolve();
    try {
      if (GMAIL_USER && GMAIL_APP_PASSWORD) {
        const mailOptions = {
          from: GMAIL_USER,
          to: 'sarabjit.rattan@gmail.com',
          subject: `[${cleanLeadType}] ${cleanTargetService ? `(${cleanTargetService}) ` : ''}Lead from ${cleanName}`,
          replyTo: cleanEmail,
          text: `
Lead Type: ${cleanLeadType}
Target Service: ${cleanTargetService || 'N/A'}
Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Company: ${companyName || 'N/A'}

Source URL: ${sourceUrl || 'N/A'}
UTM Source: ${utmSource || 'N/A'} | Medium: ${utmMedium || 'N/A'} | Campaign: ${utmCampaign || 'N/A'}
Referring Query: ${referringQuery || 'N/A'}

Requirement / Details:
${cleanRequirement}

---
Client IP: ${clientIP}
Timestamp: ${new Date().toISOString()}
Sent via Portfolio Vercel Backend Engine
          `.trim(),
        };

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_APP_PASSWORD,
          },
        });
        emailPromise = transporter.sendMail(mailOptions).catch((mailErr) => {
          console.warn('Mail send failed:', mailErr);
        });
      }
    } catch (transErr) {
      console.warn('Nodemailer setup error:', transErr);
    }

    // 4. Save to Google Sheets (Webhook)
    const sheetData = {
      leadType: cleanLeadType,
      targetService: cleanTargetService,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      companyName: companyName || null,
      requirement: cleanRequirement,
      sourceUrl: sourceUrl || null,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
      referringQuery: referringQuery || null,
      clientIP,
      recaptchaScore,
      timestamp: new Date().toISOString(),
    };

    const sheetPromise = GOOGLE_SHEETS_WEBHOOK_URL
      ? fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData),
        })
      : Promise.resolve(null);

    // 5. Save directly to Supabase tables (service role bypasses RLS safely)
    let dbInsertPromise: Promise<unknown> = Promise.resolve(null);
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      const phoneForEnquiries = cleanPhone !== 'N/A' && cleanPhone.trim() ? cleanPhone : '+91-0000000000';
      const formattedRequirement = `[${cleanLeadType}] ${cleanTargetService ? `(${cleanTargetService}) ` : ''}${cleanRequirement}`;

      dbInsertPromise = Promise.allSettled([
        // Table 1: enquiries
        supabaseAdmin.from('enquiries').insert({
          name: cleanName,
          email: cleanEmail,
          phone: phoneForEnquiries,
          company_name: companyName || null,
          requirement: formattedRequirement,
          client_ip: clientIP,
          recaptcha_score: recaptchaScore,
        }),
        // Table 2: service_leads
        supabaseAdmin.from('service_leads').insert({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone !== 'N/A' ? cleanPhone : null,
          company_name: companyName || null,
          target_service: cleanTargetService || 'general-consultation',
          requirement: formattedRequirement,
          source_url: sourceUrl || null,
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
          referring_query: referringQuery || null,
          lead_status: leadStatus || 'NEW',
          client_ip: clientIP,
        }),
      ]);
    }

    // Execute email, sheet, and DB write concurrently
    const [emailResult, sheetResult, dbResult] = await Promise.allSettled([
      emailPromise,
      sheetPromise,
      dbInsertPromise,
    ]);

    if (emailResult.status === 'rejected') {
      console.error('Email sending failed:', emailResult.reason);
    }

    if (sheetResult.status === 'rejected') {
      console.error('Google Sheets saving failed:', sheetResult.reason);
    }

    if (dbResult.status === 'rejected') {
      console.error('Supabase insert failed:', dbResult.reason);
    }

    return res.status(200).json({ success: true, message: 'Enquiry received successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
}
