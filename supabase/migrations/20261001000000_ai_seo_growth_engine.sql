-- Migration: AI SEO & Growth Intelligence Engine Tables
-- Date: 2026-10-01

-- 1. Create Enums for Content Lifecycle & Actions
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_action_type') THEN
        CREATE TYPE public.content_action_type AS ENUM ('CREATE', 'IMPROVE', 'CONSOLIDATE');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_lifecycle_status') THEN
        CREATE TYPE public.content_lifecycle_status AS ENUM ('DISCOVERED', 'PLANNED', 'DRAFTED', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED');
    END IF;
END $$;

-- 2. Keyword Search Analytics Table (GSC & Google Ads data)
CREATE TABLE IF NOT EXISTS public.keyword_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT NOT NULL,
    page_url TEXT NOT NULL,
    impressions INT NOT NULL DEFAULT 0,
    clicks INT NOT NULL DEFAULT 0,
    ctr NUMERIC(6,4) NOT NULL DEFAULT 0,
    average_position NUMERIC(5,2) NOT NULL DEFAULT 0,
    ads_monthly_volume INT,
    country TEXT DEFAULT 'global',
    device TEXT DEFAULT 'all',
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(query, page_url, country, recorded_date)
);

-- Indexes for performance queries & striking distance lookups
CREATE INDEX IF NOT EXISTS idx_km_query ON public.keyword_metrics(query);
CREATE INDEX IF NOT EXISTS idx_km_page_url ON public.keyword_metrics(page_url);
CREATE INDEX IF NOT EXISTS idx_km_striking_distance ON public.keyword_metrics(average_position, impressions DESC);
CREATE INDEX IF NOT EXISTS idx_km_recorded_date ON public.keyword_metrics(recorded_date DESC);

-- 3. Page Analytics Performance Table (GA4 engagement metrics)
CREATE TABLE IF NOT EXISTS public.page_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path TEXT NOT NULL,
    page_views INT NOT NULL DEFAULT 0,
    active_users INT NOT NULL DEFAULT 0,
    engagement_rate NUMERIC(5,4) DEFAULT 0,
    avg_engagement_time_sec NUMERIC(8,2) DEFAULT 0,
    bounce_rate NUMERIC(5,4) DEFAULT 0,
    conversions INT DEFAULT 0,
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(page_path, recorded_date)
);

CREATE INDEX IF NOT EXISTS idx_pp_page_path ON public.page_performance(page_path);
CREATE INDEX IF NOT EXISTS idx_pp_recorded_date ON public.page_performance(recorded_date DESC);

-- 4. Autonomous Content Queue Table
CREATE TABLE IF NOT EXISTS public.content_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_topic TEXT NOT NULL,
    target_slug TEXT,
    action_type public.content_action_type NOT NULL DEFAULT 'CREATE',
    status public.content_lifecycle_status NOT NULL DEFAULT 'DISCOVERED',
    priority_score NUMERIC(6,2) NOT NULL DEFAULT 0,
    primary_keywords TEXT[] NOT NULL DEFAULT '{}',
    secondary_keywords TEXT[] DEFAULT '{}',
    existing_page_url TEXT,
    brief_data JSONB DEFAULT '{}'::jsonb,
    draft_content_markdown TEXT,
    published_post_id TEXT,
    published_url TEXT,
    seo_meta JSONB DEFAULT '{}'::jsonb,
    review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cq_status ON public.content_queue(status);
CREATE INDEX IF NOT EXISTS idx_cq_priority ON public.content_queue(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_cq_action_type ON public.content_queue(action_type);

-- 5. Extend or create Service Leads & Attribution Table
CREATE TABLE IF NOT EXISTS public.service_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    target_service TEXT NOT NULL, -- e.g. 'n8n-automation', 'ai-wordpress-dev', 'crm-sheets-sync'
    requirement TEXT NOT NULL,
    source_url TEXT,
    referring_query TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    lead_status TEXT NOT NULL DEFAULT 'NEW',
    client_ip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sl_email ON public.service_leads(email);
CREATE INDEX IF NOT EXISTS idx_sl_target_service ON public.service_leads(target_service);
CREATE INDEX IF NOT EXISTS idx_sl_created_at ON public.service_leads(created_at DESC);

-- 6. Row Level Security Policies
ALTER TABLE public.keyword_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_leads ENABLE ROW LEVEL SECURITY;

-- Admins can view & manage everything; Service Role has full bypass for backend/worker agents
CREATE POLICY "Admins can view keyword metrics" ON public.keyword_metrics
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view page performance" ON public.page_performance
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage content queue" ON public.content_queue
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view service leads" ON public.service_leads
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
