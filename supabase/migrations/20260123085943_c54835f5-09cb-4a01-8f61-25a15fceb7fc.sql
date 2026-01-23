-- ============================================
-- MIGRATION: Complete Database Schema for Multi-Tenant School Platform
-- ============================================

-- ============================================
-- STEP 1: ENUMS
-- ============================================

-- Jenjang sekolah
CREATE TYPE public.school_level AS ENUM ('SD', 'SMP', 'SMA', 'SMK');

-- Role pengguna
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin_sekolah', 'operator');

-- Status kepegawaian
CREATE TYPE public.employment_status AS ENUM ('PNS', 'PPPK', 'Honorer', 'Tetap Yayasan', 'Tidak Tetap Yayasan');

-- Jenis kelamin
CREATE TYPE public.gender_type AS ENUM ('L', 'P');

-- Status post
CREATE TYPE public.post_status AS ENUM ('draft', 'published');

-- Status pendaftaran
CREATE TYPE public.registration_status AS ENUM ('pending', 'approved', 'rejected');

-- Status siswa
CREATE TYPE public.student_status AS ENUM ('aktif', 'pindah', 'lulus', 'keluar');

-- ============================================
-- STEP 2: HELPER FUNCTIONS (before tables for RLS)
-- ============================================

-- Function untuk update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 3: CORE TABLES
-- ============================================

-- Schools Table
CREATE TABLE public.schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE NOT NULL,
  level school_level NOT NULL,
  logo TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  theme_color VARCHAR(20) DEFAULT '#2563eb',
  hero_images TEXT[] DEFAULT '{}',
  profile_image TEXT,
  vision TEXT,
  mission TEXT[] DEFAULT '{}',
  about TEXT,
  is_active BOOLEAN DEFAULT true,
  founded_year INTEGER,
  accreditation VARCHAR(10),
  student_count INTEGER DEFAULT 0,
  npsn VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles Table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  school_id INTEGER REFERENCES public.schools(id) ON DELETE SET NULL,
  staff_id INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Roles Table (WAJIB terpisah untuk keamanan)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Staff Table
CREATE TABLE public.staff (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100),
  class_or_subject VARCHAR(100),
  nip VARCHAR(30),
  nik VARCHAR(20),
  nuptk VARCHAR(30),
  phone VARCHAR(20),
  email VARCHAR(100),
  email_personal VARCHAR(100),
  address TEXT,
  photo_url TEXT,
  is_public BOOLEAN DEFAULT true,
  employment_status employment_status,
  rank_grade VARCHAR(50),
  tmt_employment DATE,
  sk_number VARCHAR(50),
  gender gender_type,
  birth_place VARCHAR(100),
  birth_date DATE,
  education_level VARCHAR(10),
  major VARCHAR(100),
  marriage_status VARCHAR(20),
  npwp VARCHAR(30),
  taspen VARCHAR(30),
  bpjs_ketenagakerjaan VARCHAR(30),
  bpjs_kesehatan VARCHAR(30),
  spouse_name VARCHAR(255),
  children_count INTEGER DEFAULT 0,
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students Table
CREATE TABLE public.students (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class VARCHAR(50),
  nis VARCHAR(20),
  nisn VARCHAR(20),
  gender gender_type,
  birth_place VARCHAR(100),
  birth_date DATE,
  religion VARCHAR(50),
  address TEXT,
  parent_name VARCHAR(255),
  parent_phone VARCHAR(20),
  father_name VARCHAR(255),
  father_occupation VARCHAR(100),
  mother_name VARCHAR(255),
  mother_occupation VARCHAR(100),
  guardian_name VARCHAR(255),
  guardian_phone VARCHAR(20),
  previous_school VARCHAR(255),
  entry_year VARCHAR(10),
  entry_semester VARCHAR(20),
  status student_status DEFAULT 'aktif',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts Table
CREATE TABLE public.posts (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  category VARCHAR(50),
  status post_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE public.gallery (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- School Registrations Table
CREATE TABLE public.school_registrations (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  level school_level,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  contact_person VARCHAR(255),
  contact_phone VARCHAR(50),
  status registration_status DEFAULT 'pending',
  notes TEXT,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STEP 4: SECURITY DEFINER FUNCTIONS
-- ============================================

-- Function untuk cek role user
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function untuk mendapatkan school_id user
CREATE OR REPLACE FUNCTION public.get_user_school_id(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id FROM public.profiles WHERE id = _user_id
$$;

-- Function untuk cek apakah user adalah Super Admin
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'super_admin')
$$;

-- Function untuk cek akses ke sekolah tertentu
CREATE OR REPLACE FUNCTION public.can_access_school(_user_id UUID, _school_id INTEGER)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    public.is_super_admin(_user_id) 
    OR public.get_user_school_id(_user_id) = _school_id
$$;

-- ============================================
-- STEP 5: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_registrations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 6: RLS POLICIES
-- ============================================

-- SCHOOLS POLICIES
CREATE POLICY "Public can view active schools"
  ON public.schools FOR SELECT
  USING (is_active = true);

CREATE POLICY "Super admin full access to schools"
  ON public.schools FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "School admin can update own school"
  ON public.schools FOR UPDATE
  TO authenticated
  USING (public.can_access_school(auth.uid(), id));

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Super admin can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "School admin can view school profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin_sekolah') 
    AND school_id = public.get_user_school_id(auth.uid())
  );

-- USER ROLES POLICIES
CREATE POLICY "Super admin full access to user_roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- STAFF POLICIES
CREATE POLICY "Public can view public staff"
  ON public.staff FOR SELECT
  USING (is_public = true);

CREATE POLICY "School users can manage own school staff"
  ON public.staff FOR ALL
  TO authenticated
  USING (public.can_access_school(auth.uid(), school_id));

-- STUDENTS POLICIES
CREATE POLICY "School users can manage own school students"
  ON public.students FOR ALL
  TO authenticated
  USING (public.can_access_school(auth.uid(), school_id));

-- POSTS POLICIES
CREATE POLICY "Public can view published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "School users can view all school posts"
  ON public.posts FOR SELECT
  TO authenticated
  USING (public.can_access_school(auth.uid(), school_id));

CREATE POLICY "Super admin can manage all posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "School admin can manage school posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin_sekolah')
    AND public.can_access_school(auth.uid(), school_id)
  );

CREATE POLICY "Operators can create posts in their school"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'operator')
    AND public.can_access_school(auth.uid(), school_id)
    AND author_id = auth.uid()
  );

CREATE POLICY "Operators can update own posts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'operator')
    AND author_id = auth.uid()
  );

CREATE POLICY "Operators can delete own posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'operator')
    AND author_id = auth.uid()
  );

-- GALLERY POLICIES
CREATE POLICY "Public can view gallery"
  ON public.gallery FOR SELECT
  USING (true);

CREATE POLICY "School users can manage gallery"
  ON public.gallery FOR ALL
  TO authenticated
  USING (public.can_access_school(auth.uid(), school_id));

-- SCHOOL REGISTRATIONS POLICIES
CREATE POLICY "Anyone can submit registration"
  ON public.school_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Super admin can manage registrations"
  ON public.school_registrations FOR ALL
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- ============================================
-- STEP 7: TRIGGERS
-- ============================================

CREATE TRIGGER set_updated_at_schools
  BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_staff
  BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_students
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_posts
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_registrations
  BEFORE UPDATE ON public.school_registrations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STEP 8: INDEXES
-- ============================================

CREATE INDEX idx_schools_domain ON public.schools(domain);
CREATE INDEX idx_schools_level ON public.schools(level);
CREATE INDEX idx_schools_is_active ON public.schools(is_active);

CREATE INDEX idx_profiles_school_id ON public.profiles(school_id);
CREATE INDEX idx_profiles_email ON public.profiles(email);

CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

CREATE INDEX idx_staff_school_id ON public.staff(school_id);
CREATE INDEX idx_staff_is_public ON public.staff(is_public);

CREATE INDEX idx_students_school_id ON public.students(school_id);
CREATE INDEX idx_students_class ON public.students(class);

CREATE INDEX idx_posts_school_id ON public.posts(school_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);

CREATE INDEX idx_gallery_school_id ON public.gallery(school_id);
CREATE INDEX idx_gallery_category ON public.gallery(category);

CREATE INDEX idx_registrations_status ON public.school_registrations(status);