
-- Fix 1: Prevent privilege escalation via profile school_id manipulation
-- Drop existing policy and recreate with WITH CHECK that prevents school_id changes
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() 
    AND (
      school_id IS NOT DISTINCT FROM (SELECT p.school_id FROM public.profiles p WHERE p.id = auth.uid())
    )
  );

-- Fix 2: Replace broad public staff SELECT with restricted column access
-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Public can view public staff" ON public.staff;

-- Create a restrictive policy that only allows public access to safe columns
-- Since RLS cannot restrict columns, we use a view approach
-- Create a secure view for public staff data
CREATE OR REPLACE VIEW public.staff_public AS
SELECT id, school_id, name, position, class_or_subject, photo_url
FROM public.staff
WHERE is_public = true;

-- Grant access to the view for anonymous users
GRANT SELECT ON public.staff_public TO anon;
GRANT SELECT ON public.staff_public TO authenticated;
