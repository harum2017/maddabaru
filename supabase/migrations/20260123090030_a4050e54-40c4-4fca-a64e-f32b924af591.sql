-- ============================================
-- FIX SECURITY WARNINGS
-- ============================================

-- FIX 1 & 2: Set search_path on plpgsql functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- FIX 3: Replace overly permissive INSERT policy on school_registrations
-- Drop the old permissive policy
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.school_registrations;

-- Create a more restrictive policy that still allows public submissions
-- but requires basic validation (all required fields must be non-null)
CREATE POLICY "Public can submit registration with required fields"
  ON public.school_registrations FOR INSERT
  WITH CHECK (
    school_name IS NOT NULL 
    AND email IS NOT NULL
  );