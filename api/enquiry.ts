import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Configuration from environment variables
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

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
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const sheetData = {
      name,
      email,
      phone,
      companyName,
      requirement,
      clientIP,
      recaptchaScore: recaptchaData.score
    };

    // We run email and sheet in parallel to speed up response
    const [emailResult, sheetResult] = await Promise.allSettled([
      transporter.sendMail(mailOptions),
      fetch(GOOGLE_SHEETS_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      })
    ]);

    if (emailResult.status === 'rejected') {
      console.error('Email sending failed:', emailResult.reason);
    }
    
    if (sheetResult.status === 'rejected') {
      console.error('Google Sheets saving failed:', sheetResult.reason);
    }

    return res.status(200).json({ success: true, message: 'Enquiry received' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
