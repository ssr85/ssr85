-- Create enquiries table to store form submissions
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  requirement TEXT NOT NULL,
  client_ip TEXT,
  recaptcha_score NUMERIC(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- No public read access - only service role can read enquiries
-- This protects PII (email, phone, etc.) from being publicly accessible

-- Allow inserts from edge functions using service role key
-- The edge function will use service role to insert, so no public insert policy needed

-- Create index for faster lookups by email
CREATE INDEX idx_enquiries_email ON public.enquiries(email);

-- Create index for created_at for sorting
CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at DESC);