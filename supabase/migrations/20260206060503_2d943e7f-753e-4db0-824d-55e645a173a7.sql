-- Create storage buckets for school assets

-- 1. School logos bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('school-logos', 'school-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 2. Hero images bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('hero-images', 'hero-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 3. Staff photos bucket (public read for public staff)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('staff-photos', 'staff-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 4. Gallery images bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('gallery-images', 'gallery-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 5. Post images bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('post-images', 'post-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 6. Profile images bucket (for user avatars)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('profile-images', 'profile-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RLS Policies for school-logos bucket
-- =====================================================

-- Public can view all logos
CREATE POLICY "Public can view school logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'school-logos');

-- School users can upload logos for their school
CREATE POLICY "School users can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'school-logos' 
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- School users can update their school's logos
CREATE POLICY "School users can update logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'school-logos'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- School users can delete their school's logos
CREATE POLICY "School users can delete logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'school-logos'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- =====================================================
-- RLS Policies for hero-images bucket
-- =====================================================

CREATE POLICY "Public can view hero images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-images');

CREATE POLICY "School users can upload hero images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hero-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can update hero images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'hero-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can delete hero images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'hero-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- =====================================================
-- RLS Policies for staff-photos bucket
-- =====================================================

CREATE POLICY "Public can view staff photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'staff-photos');

CREATE POLICY "School users can upload staff photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'staff-photos'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can update staff photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'staff-photos'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can delete staff photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'staff-photos'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- =====================================================
-- RLS Policies for gallery-images bucket
-- =====================================================

CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "School users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- =====================================================
-- RLS Policies for post-images bucket
-- =====================================================

CREATE POLICY "Public can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "School users can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can update post images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

CREATE POLICY "School users can delete post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images'
  AND auth.role() = 'authenticated'
  AND (
    public.is_super_admin(auth.uid())
    OR (storage.foldername(name))[1]::integer = public.get_user_school_id(auth.uid())
  )
);

-- =====================================================
-- RLS Policies for profile-images bucket
-- =====================================================

CREATE POLICY "Public can view profile images"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload own profile image"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-images'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own profile image"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-images'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own profile image"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-images'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);