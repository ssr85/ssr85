-- Drop the existing policy that doesn't enforce authentication
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a new policy that only allows authenticated users to view their own roles
CREATE POLICY "Authenticated users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());