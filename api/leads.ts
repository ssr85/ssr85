import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://bwpemzjwrrszygszuitc.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ALLOWED_ADMIN_EMAILS = [
  'sarabjit.rattan@gmail.com',
  'sarabjitrattan@gmail.com',
];

function isEmailAllowed(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase().replace(/\./g, '').split('@')[0] + '@gmail.com';
  return ALLOWED_ADMIN_EMAILS.some((admin) => {
    const adminNorm = admin.toLowerCase().replace(/\./g, '').split('@')[0] + '@gmail.com';
    return normalized === adminNorm;
  });
}

async function authenticateAdmin(
  req: VercelRequest,
  supabaseAdmin: any
): Promise<{ authorized: boolean; reason?: string; status: number }> {
  const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminKeyHeader = req.headers['x-admin-key'] as string | undefined;

  // Support machine-to-machine admin secret key
  if (adminKeyHeader && adminSecret && adminKeyHeader === adminSecret) {
    return { authorized: true, status: 200 };
  }

  const authHeader = req.headers.authorization || (req.headers as Record<string, string | undefined>)['authorization'];
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, reason: 'Authentication required: missing or invalid Bearer token', status: 401 };
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return { authorized: false, reason: 'Authentication required: empty token', status: 401 };
  }

  try {
    const { data, error } = await (supabaseAdmin.auth as any).getUser(token);
    const user = data?.user;
    if (error || !user?.email) {
      return { authorized: false, reason: 'Invalid or expired session token', status: 403 };
    }

    if (!isEmailAllowed(user.email)) {
      return { authorized: false, reason: `Access denied: ${user.email} is not authorized`, status: 403 };
    }

    return { authorized: true, status: 200 };
  } catch (authErr) {
    console.error('Auth verification error in /api/leads:', authErr);
    return { authorized: false, reason: 'Token verification failed', status: 403 };
  }
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

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server configuration error: missing Supabase credentials' });
  }

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Authenticate executive credentials on all requests
  const auth = await authenticateAdmin(req, supabaseAdmin);
  if (!auth.authorized) {
    return res.status(auth.status).json({ error: auth.reason });
  }

  // Handle lead status updates via PATCH or POST
  if (req.method === 'PATCH' || req.method === 'POST') {
    try {
      const { id, lead_status, status } = req.body || {};
      const newStatus = lead_status || status;

      if (!id || !newStatus) {
        return res.status(400).json({ error: 'Missing lead id or lead_status' });
      }

      // Attempt update on both service_leads and enquiries tables
      const [slUpdate, enqUpdate] = await Promise.allSettled([
        supabaseAdmin.from('service_leads').update({ lead_status: newStatus }).eq('id', id),
        supabaseAdmin.from('enquiries').update({ lead_status: newStatus }).eq('id', id),
      ]);

      const isSlSuccess = slUpdate.status === 'fulfilled' && !slUpdate.value.error;
      const isEnqSuccess = enqUpdate.status === 'fulfilled' && !enqUpdate.value.error;

      if (!isSlSuccess && !isEnqSuccess) {
        const errDetail =
          (slUpdate.status === 'fulfilled' && slUpdate.value.error?.message) ||
          (enqUpdate.status === 'fulfilled' && enqUpdate.value.error?.message) ||
          'Failed to update lead in database';
        return res.status(500).json({ error: errDetail });
      }

      return res.status(200).json({
        success: true,
        message: `Lead status updated to ${newStatus}`,
        updatedId: id,
        newStatus,
      });
    } catch (updateErr) {
      console.error('Error updating lead status in /api/leads:', updateErr);
      return res.status(500).json({
        error: 'Failed to update lead',
        details: updateErr instanceof Error ? updateErr.message : String(updateErr),
      });
    }
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch from both service_leads and enquiries
    const [slResult, enqResult] = await Promise.allSettled([
      supabaseAdmin.from('service_leads').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false }),
    ]);

    const serviceLeads = slResult.status === 'fulfilled' && slResult.value.data ? slResult.value.data : [];
    const rawEnquiries = enqResult.status === 'fulfilled' && enqResult.value.data ? enqResult.value.data : [];

    // Map enquiries to uniform format if they don't already exist in serviceLeads
    const seenEmailsAndDates = new Set(serviceLeads.map((l) => `${l.email}_${new Date(l.created_at).toISOString().slice(0, 16)}`));

    const extraEnquiries = rawEnquiries
      .filter((e) => !seenEmailsAndDates.has(`${e.email}_${new Date(e.created_at).toISOString().slice(0, 16)}`))
      .map((e) => {
        // Extract leadType if embedded in requirement e.g. "[CALENDLY_BOOKING] ..."
        let leadType = 'GENERAL_ENQUIRY';
        let targetService = 'general-enquiry';
        if (e.requirement?.includes('[CALENDLY_BOOKING]')) {
          leadType = 'CALENDLY_BOOKING';
          targetService = 'architecture-discovery-call';
        } else if (e.requirement?.includes('[CONSULTATION]')) {
          leadType = 'CONSULTATION';
        } else if (e.requirement?.includes('[RESUME_DOWNLOAD]')) {
          leadType = 'RESUME_DOWNLOAD';
          targetService = 'executive-resume';
        } else if (e.requirement?.includes('[NEWSLETTER]')) {
          leadType = 'NEWSLETTER';
          targetService = 'engineering-newsletter';
        }

        return {
          id: e.id,
          name: e.name,
          email: e.email,
          phone: e.phone,
          company_name: e.company_name,
          requirement: e.requirement,
          target_service: targetService,
          lead_type: leadType,
          lead_status: 'NEW',
          source_url: '/',
          created_at: e.created_at,
        };
      });

    const unifiedLeads = [...serviceLeads, ...extraEnquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return res.status(200).json({
      leads: unifiedLeads,
      count: unifiedLeads.length,
    });
  } catch (error) {
    console.error('API Error in /api/leads:', error);
    return res.status(500).json({ error: 'Failed to fetch leads', details: error instanceof Error ? error.message : String(error) });
  }
}
