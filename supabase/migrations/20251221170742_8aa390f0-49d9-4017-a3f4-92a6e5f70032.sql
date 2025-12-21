-- Allow authenticated users to read enquiries (for admin/owner access)
CREATE POLICY "Authenticated users can view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);

-- Note: INSERT is handled by edge function using service role (bypasses RLS)
-- No public insert policy needed as we don't want direct client inserts