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

/**
 * PROD School Repository - akan implement Supabase later
 */
class ProdSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number) {
    // TODO: Call Supabase API
    // const { data, error } = await supabase
    //   .from('schools')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getSchoolByDomain(domain: string) {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getAllSchools() {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getActiveSchools() {
    // TODO: Call Supabase API
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Staff Repository - akan implement Supabase later
 */
class ProdStaffRepository implements IStaffRepository {
  async getStaffBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getAllStaffBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStaffById(id: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Student Repository - akan implement Supabase later
 */
class ProdStudentRepository implements IStudentRepository {
  async getStudentsBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStudentById(id: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getStudentsByClass(schoolId: number, classId: string) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Post Repository - akan implement Supabase later
 */
class ProdPostRepository implements IPostRepository {
  async getPostsBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPostById(id: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPublishedPostsBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Gallery Repository - akan implement Supabase later
 */
class ProdGalleryRepository implements IGalleryRepository {
  async getGalleryBySchool(schoolId: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGalleryById(id: number) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGalleryByCategory(schoolId: number, category: string) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Class Repository - akan implement Supabase later
 */
class ProdClassRepository implements IClassRepository {
  async getDefaultGradeLevels(level) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getClassesByLevel(level) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getGradeLevelsByLevel(level) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getSubjectsByLevel(level) {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }
}

/**
 * PROD Registration Repository - akan implement Supabase later
 */
class ProdRegistrationRepository implements IRegistrationRepository {
  async getRegistrations() {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getPendingRegistrations() {
    throw new Error('PROD mode not configured yet. Please use DEV mode.');
  }

  async getRegistrationById(id: number) {
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
