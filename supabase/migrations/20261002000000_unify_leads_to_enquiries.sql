-- Migration: Unify Leads into Single Enquiries Table with Full Attribution Context
-- Date: 2026-10-02

-- 1. Alter public.enquiries table to add attribution & context columns
ALTER TABLE public.enquiries
    ADD COLUMN IF NOT EXISTS target_service TEXT,
    ADD COLUMN IF NOT EXISTS lead_type TEXT NOT NULL DEFAULT 'GENERAL_ENQUIRY',
    ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'NEW',
    ADD COLUMN IF NOT EXISTS source_url TEXT,
    ADD COLUMN IF NOT EXISTS referring_query TEXT,
    ADD COLUMN IF NOT EXISTS utm_source TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- 2. Create performance indexes for filtering on admin dashboard
CREATE INDEX IF NOT EXISTS idx_enquiries_lead_type ON public.enquiries(lead_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_lead_status ON public.enquiries(lead_status);
CREATE INDEX IF NOT EXISTS idx_enquiries_target_service ON public.enquiries(target_service);

-- 3. Ensure admins can view, update (status), and delete enquiries
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'enquiries' AND policyname = 'Admins can manage enquiries'
    ) THEN
        CREATE POLICY "Admins can manage enquiries"
        ON public.enquiries
        FOR ALL
        TO authenticated
        USING (public.has_role(auth.uid(), 'admin'))
        WITH CHECK (public.has_role(auth.uid(), 'admin'));
    END IF;
END $$;
