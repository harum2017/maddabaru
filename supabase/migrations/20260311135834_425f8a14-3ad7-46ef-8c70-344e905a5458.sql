
-- Fix the security definer view issue by setting security_invoker
ALTER VIEW public.staff_public SET (security_invoker = true);
