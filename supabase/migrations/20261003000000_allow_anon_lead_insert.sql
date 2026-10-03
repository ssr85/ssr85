-- Migration: Allow Public/Anon Insert for Enquiries and Service Leads (Fallback Layer)
-- Date: 2026-10-03

-- 1. Ensure phone allows NULL for lead types without mandatory phone (e.g. newsletter, resume download)
ALTER TABLE public.enquiries ALTER COLUMN phone DROP NOT NULL;

-- 2. Allow anonymous and authenticated visitors to submit enquiries
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enquiries' AND policyname = 'Allow public insert on enquiries'
  ) THEN
    CREATE POLICY "Allow public insert on enquiries" 
    ON public.enquiries 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'service_leads' AND policyname = 'Allow public insert on service_leads'
  ) THEN
    CREATE POLICY "Allow public insert on service_leads" 
    ON public.service_leads 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);
  END IF;
END $$;
