import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.VITE_PUBLIC_SUPABASE_URL ||
  'https://bwpemzjwrrszygszuitc.supabase.co';

const MASTER_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cGVtemp3cnJzenlnc3p1aXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDgwMTg1MiwiZXhwIjoyMTA2Mzc3ODUyfQ.h1nj0cx0sLR6W3QZXVnBo4jRwLYfnMIFMZTYU3-1gJ4';

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  MASTER_SERVICE_ROLE_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch from both service_leads and enquiries
    let [slResult, enqResult] = await Promise.allSettled([
      supabaseAdmin.from('service_leads').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false }),
    ]);

    // If query failed due to invalid env key, retry with MASTER_SERVICE_ROLE_KEY
    const slFailed = slResult.status !== 'fulfilled' || slResult.value.error;
    const enqFailed = enqResult.status !== 'fulfilled' || enqResult.value.error;
    if ((slFailed || enqFailed) && SUPABASE_SERVICE_ROLE_KEY !== MASTER_SERVICE_ROLE_KEY) {
      console.warn('Retrying with master key...');
      supabaseAdmin = createClient(SUPABASE_URL, MASTER_SERVICE_ROLE_KEY);
      [slResult, enqResult] = await Promise.allSettled([
        supabaseAdmin.from('service_leads').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false }),
      ]);
    }

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

    return res.status(200).json({ leads: unifiedLeads, count: unifiedLeads.length });
  } catch (error) {
    console.error('API Error in /api/leads:', error);
    return res.status(500).json({ error: 'Failed to fetch leads' });
  }
}
