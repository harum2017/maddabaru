/**
 * PROD Data Repositories - menggunakan Supabase Database
 * 
 * Implementasi ini menggunakan Supabase client untuk akses database.
 * NOTE: This module is dynamically imported only when PROD mode is active
 * and Supabase credentials are verified in config.ts
 */

import { supabase } from '@/integrations/supabase/client';
import {
  ISchoolRepository,
  IStaffRepository,
  IStudentRepository,
  IPostRepository,
  IGalleryRepository,
  IClassRepository,
  IRegistrationRepository,
  IDataService,
} from './types';

import type { 
  School, 
  Staff, 
  Student, 
  Post, 
  GalleryItem, 
  SchoolRegistration, 
  SchoolLevel, 
  GradeLevel 
} from '@/data/dummyData';

// Helper untuk convert database row ke app types
const mapSchoolFromDB = (row: any): School => ({
  id: row.id,
  name: row.name,
  domain: row.domain,
  level: row.level as SchoolLevel,
  email: row.email || '',
  phone: row.phone || '',
  address: row.address || '',
  logo: row.logo || '',
  theme_color: row.theme_color || '#2563eb',
  hero_images: row.hero_images || [],
  about: row.about || '',
  vision: row.vision || '',
  mission: row.mission || [],
  accreditation: row.accreditation || '',
  founded_year: row.founded_year || new Date().getFullYear(),
  student_count: row.student_count || 0,
  is_active: row.is_active ?? true,
  profile_image: row.profile_image || '',
});

const mapStaffFromDB = (row: any): Staff => ({
  id: row.id,
  school_id: row.school_id,
  name: row.name,
  position: row.position || '',
  class_or_subject: row.class_or_subject || '',
  nip: row.nip || '',
  nik: row.nik || '',
  nuptk: row.nuptk || '',
  phone: row.phone || '',
  email: row.email || '',
  email_personal: row.email_personal || '',
  address: row.address || '',
  photo: row.photo_url || '',
  is_public: row.is_public ?? true,
  employment_status: row.employment_status || 'PNS',
  sk_number: row.sk_number || '',
  tmt_employment: row.tmt_employment || '',
  rank_grade: row.rank_grade || '',
  gender: row.gender || 'L',
  birth_place: row.birth_place || '',
  birth_date: row.birth_date || '',
  education_level: row.education_level || '',
  major: row.major || '',
  marriage_status: row.marriage_status || '',
  children_count: row.children_count || 0,
  npwp: row.npwp || '',
  taspen: row.taspen || '',
  bpjs_ketenagakerjaan: row.bpjs_ketenagakerjaan || '',
  bpjs_kesehatan: row.bpjs_kesehatan || '',
  spouse_name: row.spouse_name || '',
  father_name: row.father_name || '',
  mother_name: row.mother_name || '',
});

const mapStudentFromDB = (row: any): Student => ({
  id: row.id,
  school_id: row.school_id,
  name: row.name,
  class: row.class || '',
  nis: row.nis || '',
  nisn: row.nisn || '',
  gender: row.gender || 'L',
  birth_place: row.birth_place || '',
  birth_date: row.birth_date || '',
  religion: row.religion || '',
  address: row.address || '',
  parent_name: row.parent_name || '',
  parent_phone: row.parent_phone || '',
  father_name: row.father_name || '',
  father_occupation: row.father_occupation || '',
  mother_name: row.mother_name || '',
  mother_occupation: row.mother_occupation || '',
  guardian_name: row.guardian_name || '',
  guardian_phone: row.guardian_phone || '',
  previous_school: row.previous_school || '',
  entry_year: row.entry_year || '',
  entry_semester: row.entry_semester || '',
  status: row.status || 'aktif',
});

const mapPostFromDB = (row: any): Post => ({
  id: row.id,
  school_id: row.school_id,
  title: row.title,
  excerpt: row.excerpt || '',
  content: row.content || '',
  image: row.image_url || '',
  category: row.category || 'Berita',
  status: row.status || 'draft',
  author: row.author_id || '',
  created_at: row.created_at || new Date().toISOString(),
});

const mapGalleryFromDB = (row: any): GalleryItem => ({
  id: row.id,
  school_id: row.school_id,
  title: row.title,
  image: row.image_url,
  category: row.category || 'Kegiatan',
  created_at: row.created_at || new Date().toISOString(),
});

const mapRegistrationFromDB = (row: any): SchoolRegistration => ({
  id: row.id,
  school_name: row.school_name,
  domain: row.domain || '',
  level: row.level as SchoolLevel,
  email: row.email || '',
  phone: row.phone || '',
  address: row.address || '',
  contact_person: row.contact_person || '',
  contact_phone: row.contact_phone || '',
  status: row.status || 'pending',
  notes: row.notes || '',
  registration_date: row.registration_date || new Date().toISOString(),
});

/**
 * PROD School Repository - menggunakan Supabase
 */
class ProdSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number): Promise<School | undefined> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdSchoolRepository] Error getting school by id:', error);
      return undefined;
    }
    
    return data ? mapSchoolFromDB(data) : undefined;
  }

  async getSchoolByDomain(domain: string): Promise<School | undefined> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('domain', domain.toLowerCase())
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdSchoolRepository] Error getting school by domain:', error);
      return undefined;
    }
    
    return data ? mapSchoolFromDB(data) : undefined;
  }

  async getAllSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('[ProdSchoolRepository] Error getting all schools:', error);
      return [];
    }
    
    return (data || []).map(mapSchoolFromDB);
  }

  async getActiveSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('[ProdSchoolRepository] Error getting active schools:', error);
      return [];
    }
    
    return (data || []).map(mapSchoolFromDB);
  }
}

/**
 * PROD Staff Repository - menggunakan Supabase
 */
class ProdStaffRepository implements IStaffRepository {
  async getStaffBySchool(schoolId: number): Promise<Staff[]> {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_public', true)
      .order('name');
    
    if (error) {
      console.error('[ProdStaffRepository] Error getting staff by school:', error);
      return [];
    }
    
    return (data || []).map(mapStaffFromDB);
  }

  async getAllStaffBySchool(schoolId: number): Promise<Staff[]> {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('school_id', schoolId)
      .order('name');
    
    if (error) {
      console.error('[ProdStaffRepository] Error getting all staff by school:', error);
      return [];
    }
    
    return (data || []).map(mapStaffFromDB);
  }

  async getStaffById(id: number): Promise<Staff | undefined> {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdStaffRepository] Error getting staff by id:', error);
      return undefined;
    }
    
    return data ? mapStaffFromDB(data) : undefined;
  }
}

/**
 * PROD Student Repository - menggunakan Supabase
 */
class ProdStudentRepository implements IStudentRepository {
  async getStudentsBySchool(schoolId: number): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('school_id', schoolId)
      .order('name');
    
    if (error) {
      console.error('[ProdStudentRepository] Error getting students by school:', error);
      return [];
    }
    
    return (data || []).map(mapStudentFromDB);
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdStudentRepository] Error getting student by id:', error);
      return undefined;
    }
    
    return data ? mapStudentFromDB(data) : undefined;
  }

  async getStudentsByClass(schoolId: number, classId: string): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('school_id', schoolId)
      .eq('class', classId)
      .order('name');
    
    if (error) {
      console.error('[ProdStudentRepository] Error getting students by class:', error);
      return [];
    }
    
    return (data || []).map(mapStudentFromDB);
  }
}

/**
 * PROD Post Repository - menggunakan Supabase
 */
class ProdPostRepository implements IPostRepository {
  async getPostsBySchool(schoolId: number): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('[ProdPostRepository] Error getting posts by school:', error);
      return [];
    }
    
    return (data || []).map(mapPostFromDB);
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdPostRepository] Error getting post by id:', error);
      return undefined;
    }
    
    return data ? mapPostFromDB(data) : undefined;
  }

  async getPublishedPostsBySchool(schoolId: number): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('[ProdPostRepository] Error getting published posts:', error);
      return [];
    }
    
    return (data || []).map(mapPostFromDB);
  }
}

/**
 * PROD Gallery Repository - menggunakan Supabase
 */
class ProdGalleryRepository implements IGalleryRepository {
  async getGalleryBySchool(schoolId: number): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('[ProdGalleryRepository] Error getting gallery by school:', error);
      return [];
    }
    
    return (data || []).map(mapGalleryFromDB);
  }

  async getGalleryById(id: number): Promise<GalleryItem | undefined> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdGalleryRepository] Error getting gallery by id:', error);
      return undefined;
    }
    
    return data ? mapGalleryFromDB(data) : undefined;
  }

  async getGalleryByCategory(schoolId: number, category: string): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('[ProdGalleryRepository] Error getting gallery by category:', error);
      return [];
    }
    
    return (data || []).map(mapGalleryFromDB);
  }
}

/**
 * PROD Class Repository - static data based on school level
 */
class ProdClassRepository implements IClassRepository {
  async getDefaultGradeLevels(level: SchoolLevel): Promise<GradeLevel[]> {
    const gradeConfig: Record<SchoolLevel, GradeLevel[]> = {
      'SD': [
        { id: '1', name: 'Kelas I', romanNumeral: 'I', sections: [{ id: '1a', name: 'A' }, { id: '1b', name: 'B' }] },
        { id: '2', name: 'Kelas II', romanNumeral: 'II', sections: [{ id: '2a', name: 'A' }, { id: '2b', name: 'B' }] },
        { id: '3', name: 'Kelas III', romanNumeral: 'III', sections: [{ id: '3a', name: 'A' }, { id: '3b', name: 'B' }] },
        { id: '4', name: 'Kelas IV', romanNumeral: 'IV', sections: [{ id: '4a', name: 'A' }, { id: '4b', name: 'B' }] },
        { id: '5', name: 'Kelas V', romanNumeral: 'V', sections: [{ id: '5a', name: 'A' }, { id: '5b', name: 'B' }] },
        { id: '6', name: 'Kelas VI', romanNumeral: 'VI', sections: [{ id: '6a', name: 'A' }, { id: '6b', name: 'B' }] },
      ],
      'SMP': [
        { id: '7', name: 'Kelas VII', romanNumeral: 'VII', sections: Array.from({ length: 7 }, (_, i) => ({ id: `7${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
        { id: '8', name: 'Kelas VIII', romanNumeral: 'VIII', sections: Array.from({ length: 7 }, (_, i) => ({ id: `8${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
        { id: '9', name: 'Kelas IX', romanNumeral: 'IX', sections: Array.from({ length: 7 }, (_, i) => ({ id: `9${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
      ],
      'SMA': [
        { id: 'x', name: 'Kelas X', romanNumeral: 'X', sections: [
          { id: 'x-ipa1', name: 'IPA 1' }, { id: 'x-ipa2', name: 'IPA 2' }, { id: 'x-ipa3', name: 'IPA 3' },
          { id: 'x-ips1', name: 'IPS 1' }, { id: 'x-ips2', name: 'IPS 2' },
        ]},
        { id: 'xi', name: 'Kelas XI', romanNumeral: 'XI', sections: [
          { id: 'xi-ipa1', name: 'IPA 1' }, { id: 'xi-ipa2', name: 'IPA 2' }, { id: 'xi-ipa3', name: 'IPA 3' },
          { id: 'xi-ips1', name: 'IPS 1' }, { id: 'xi-ips2', name: 'IPS 2' },
        ]},
        { id: 'xii', name: 'Kelas XII', romanNumeral: 'XII', sections: [
          { id: 'xii-ipa1', name: 'IPA 1' }, { id: 'xii-ipa2', name: 'IPA 2' }, { id: 'xii-ipa3', name: 'IPA 3' },
          { id: 'xii-ips1', name: 'IPS 1' }, { id: 'xii-ips2', name: 'IPS 2' },
        ]},
      ],
      'SMK': [
        { id: 'x', name: 'Kelas X', romanNumeral: 'X', sections: [
          { id: 'x-tkj1', name: 'TKJ 1' }, { id: 'x-tkj2', name: 'TKJ 2' },
          { id: 'x-rpl1', name: 'RPL 1' }, { id: 'x-rpl2', name: 'RPL 2' },
        ]},
        { id: 'xi', name: 'Kelas XI', romanNumeral: 'XI', sections: [
          { id: 'xi-tkj1', name: 'TKJ 1' }, { id: 'xi-tkj2', name: 'TKJ 2' },
          { id: 'xi-rpl1', name: 'RPL 1' }, { id: 'xi-rpl2', name: 'RPL 2' },
        ]},
        { id: 'xii', name: 'Kelas XII', romanNumeral: 'XII', sections: [
          { id: 'xii-tkj1', name: 'TKJ 1' }, { id: 'xii-tkj2', name: 'TKJ 2' },
          { id: 'xii-rpl1', name: 'RPL 1' }, { id: 'xii-rpl2', name: 'RPL 2' },
        ]},
      ],
    };
    
    return gradeConfig[level] || [];
  }

  async getClassesByLevel(level: SchoolLevel): Promise<string[]> {
    const classConfig: Record<SchoolLevel, string[]> = {
      'SD': ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'],
      'SMP': ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'],
      'SMA': ['10 IPA 1', '10 IPA 2', '10 IPS 1', '10 IPS 2', '11 IPA 1', '11 IPA 2', '11 IPS 1', '11 IPS 2', '12 IPA 1', '12 IPA 2', '12 IPS 1', '12 IPS 2'],
      'SMK': ['10 TKJ 1', '10 TKJ 2', '10 RPL 1', '11 TKJ 1', '11 TKJ 2', '11 RPL 1', '12 TKJ 1', '12 TKJ 2', '12 RPL 1'],
    };
    
    return classConfig[level] || [];
  }

  async getGradeLevelsByLevel(level: SchoolLevel): Promise<string[]> {
    const gradeConfig: Record<SchoolLevel, string[]> = {
      'SD': ['1', '2', '3', '4', '5', '6'],
      'SMP': ['7', '8', '9'],
      'SMA': ['10', '11', '12'],
      'SMK': ['10', '11', '12'],
    };
    
    return gradeConfig[level] || [];
  }

  async getSubjectsByLevel(level: SchoolLevel): Promise<string[]> {
    const subjectConfig: Record<SchoolLevel, string[]> = {
      'SD': ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'PKN', 'Agama', 'PJOK', 'SBdP'],
      'SMP': ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'PKN', 'Agama', 'PJOK', 'Seni Budaya', 'Prakarya', 'TIK'],
      'SMA': ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi', 'Geografi', 'Sosiologi', 'Sejarah', 'PKN', 'Agama', 'PJOK'],
      'SMK': ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Fisika', 'Kimia', 'PKN', 'Agama', 'PJOK', 'Produktif'],
    };
    
    return subjectConfig[level] || [];
  }
}

/**
 * PROD Registration Repository - menggunakan Supabase
 */
class ProdRegistrationRepository implements IRegistrationRepository {
  async getRegistrations(): Promise<SchoolRegistration[]> {
    const { data, error } = await supabase
      .from('school_registrations')
      .select('*')
      .order('registration_date', { ascending: false });
    
    if (error) {
      console.error('[ProdRegistrationRepository] Error getting registrations:', error);
      return [];
    }
    
    return (data || []).map(mapRegistrationFromDB);
  }

  async getPendingRegistrations(): Promise<SchoolRegistration[]> {
    const { data, error } = await supabase
      .from('school_registrations')
      .select('*')
      .eq('status', 'pending')
      .order('registration_date', { ascending: false });
    
    if (error) {
      console.error('[ProdRegistrationRepository] Error getting pending registrations:', error);
      return [];
    }
    
    return (data || []).map(mapRegistrationFromDB);
  }

  async getRegistrationById(id: number): Promise<SchoolRegistration | undefined> {
    const { data, error } = await supabase
      .from('school_registrations')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('[ProdRegistrationRepository] Error getting registration by id:', error);
      return undefined;
    }
    
    return data ? mapRegistrationFromDB(data) : undefined;
  }
}

/**
 * PROD Data Service Factory
 */
export class ProdDataService implements IDataService {
  school = new ProdSchoolRepository();
  staff = new ProdStaffRepository();
  student = new ProdStudentRepository();
  post = new ProdPostRepository();
  gallery = new ProdGalleryRepository();
  class = new ProdClassRepository();
  registration = new ProdRegistrationRepository();
}

export const createProdDataService = (): IDataService => new ProdDataService();
