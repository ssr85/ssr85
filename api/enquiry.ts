import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Configuration from environment variables
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// In-memory rate limiting store (resets on cold start, per function instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
const RATE_LIMIT_MAX = 3; // Max requests per window
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

interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  requirement: string;
  recaptchaToken: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    const { name, email, phone, companyName, requirement, recaptchaToken } = req.body as EnquiryRequest;

    // 1. Basic Validation
    if (!name || !email || !phone || !requirement || !recaptchaToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Verify reCAPTCHA
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error. Please try again later.' });
    }

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < RECAPTCHA_SCORE_THRESHOLD) {
      console.warn('reCAPTCHA failed — success:', recaptchaData.success, '| score:', recaptchaData.score, '| error-codes:', recaptchaData['error-codes']);
      return res.status(403).json({ error: 'Security check failed. Please try again.' });
    }

    // 3. Send Email via Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: GMAIL_USER,
      to: 'sarabjit.rattan@gmail.com', // Explicitly set recipient as requested
      subject: `Portfolio Enquiry from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${companyName || 'N/A'}
Requirement: ${requirement}

---
Sent via Portfolio Vercel Backend
      `.trim(),
    };

    // 4. Save to Google Sheets (Webhook)
    const sheetData = {
      name,
      email,
      phone,
      companyName,
      requirement,
      clientIP,
      recaptchaScore: recaptchaData.score
    };

    // 5. Save to Supabase (service role bypasses RLS)
    const dbInsert = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
      ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).from('enquiries').insert({
          name,
          email,
          phone,
          company_name: companyName || null,
          requirement,
          client_ip: clientIP,
          recaptcha_score: recaptchaData.score,
        })
      : Promise.resolve(null);

    // We run email, sheet, and DB write in parallel to speed up response
    const [emailResult, sheetResult, dbResult] = await Promise.allSettled([
      transporter.sendMail(mailOptions),
      fetch(GOOGLE_SHEETS_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      }),
      dbInsert,
    ]);

    if (emailResult.status === 'rejected') {
      console.error('Email sending failed:', emailResult.reason);
    }

    if (sheetResult.status === 'rejected') {
      console.error('Google Sheets saving failed:', sheetResult.reason);
    }

    if (dbResult.status === 'rejected') {
      console.error('Supabase insert failed:', dbResult.reason);
    } else if (dbResult.value?.error) {
      console.error('Supabase insert error:', dbResult.value.error);
    }

    return res.status(200).json({ success: true, message: 'Enquiry received' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
