/**
 * PROD Data Repositories - menggunakan Real Database
 * 
 * Implementasi ini akan menggunakan Supabase atau database asli.
 * Saat ini hanya skeleton/placeholder.
 * 
 * Setup Supabase nanti akan dilakukan di sini tanpa touching rest of app.
 */

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

/**
 * PROD School Repository - akan implement Supabase later
 */
class ProdSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number): Promise<School | undefined> {
    // TODO: Call Supabase API
    // const { data, error } = await supabase
    //   .from('schools')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getSchoolByDomain(domain: string): Promise<School | undefined> {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getAllSchools(): Promise<School[]> {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getActiveSchools(): Promise<School[]> {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Staff Repository - akan implement Supabase later
 */
class ProdStaffRepository implements IStaffRepository {
  async getStaffBySchool(schoolId: number): Promise<Staff[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getAllStaffBySchool(schoolId: number): Promise<Staff[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStaffById(id: number): Promise<Staff | undefined> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Student Repository - akan implement Supabase later
 */
class ProdStudentRepository implements IStudentRepository {
  async getStudentsBySchool(schoolId: number): Promise<Student[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStudentsByClass(schoolId: number, classId: string): Promise<Student[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Post Repository - akan implement Supabase later
 */
class ProdPostRepository implements IPostRepository {
  async getPostsBySchool(schoolId: number): Promise<Post[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPostById(id: number): Promise<Post | undefined> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPublishedPostsBySchool(schoolId: number): Promise<Post[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Gallery Repository - akan implement Supabase later
 */
class ProdGalleryRepository implements IGalleryRepository {
  async getGalleryBySchool(schoolId: number): Promise<GalleryItem[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGalleryById(id: number): Promise<GalleryItem | undefined> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGalleryByCategory(schoolId: number, category: string): Promise<GalleryItem[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Class Repository - akan implement Supabase later
 */
class ProdClassRepository implements IClassRepository {
  async getDefaultGradeLevels(level: SchoolLevel): Promise<GradeLevel[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getClassesByLevel(level: SchoolLevel): Promise<string[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGradeLevelsByLevel(level: SchoolLevel): Promise<string[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getSubjectsByLevel(level: SchoolLevel): Promise<string[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Registration Repository - akan implement Supabase later
 */
class ProdRegistrationRepository implements IRegistrationRepository {
  async getRegistrations(): Promise<SchoolRegistration[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPendingRegistrations(): Promise<SchoolRegistration[]> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getRegistrationById(id: number): Promise<SchoolRegistration | undefined> {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
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
