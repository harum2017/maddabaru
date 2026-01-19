/**
 * DEV Data Repositories - menggunakan Dummy Data
 * 
 * Implementasi ini menggunakan data dummy yang sudah ada.
 * Semua operasi di-wrap dalam Promise untuk konsistensi dengan PROD implementation.
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

import * as dummyData from '@/data/dummyData';

/**
 * DEV School Repository
 */
class DevSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number) {
    return dummyData.getSchoolById(id);
  }

  async getSchoolByDomain(domain: string) {
    return dummyData.getSchoolByDomain(domain);
  }

  async getAllSchools() {
    return dummyData.getActiveSchools();
  }

  async getActiveSchools() {
    return dummyData.getActiveSchools();
  }
}

/**
 * DEV Staff Repository
 */
class DevStaffRepository implements IStaffRepository {
  async getStaffBySchool(schoolId: number) {
    return dummyData.getStaffBySchool(schoolId);
  }

  async getAllStaffBySchool(schoolId: number) {
    return dummyData.getAllStaffBySchool(schoolId);
  }

  async getStaffById(id: number) {
    const allStaff = dummyData.staff;
    return allStaff.find(s => s.id === id);
  }
}

/**
 * DEV Student Repository
 */
class DevStudentRepository implements IStudentRepository {
  async getStudentsBySchool(schoolId: number) {
    return dummyData.getStudentsBySchool(schoolId);
  }

  async getStudentById(id: number) {
    const allStudents = dummyData.students;
    return allStudents.find(s => s.id === id);
  }

  async getStudentsByClass(schoolId: number, classId: string) {
    const students = dummyData.getStudentsBySchool(schoolId);
    return students.filter(s => s.class === classId);
  }
}

/**
 * DEV Post Repository
 */
class DevPostRepository implements IPostRepository {
  async getPostsBySchool(schoolId: number) {
    return dummyData.getPostsBySchool(schoolId);
  }

  async getPostById(id: number) {
    const allPosts = dummyData.posts;
    return allPosts.find(p => p.id === id);
  }

  async getPublishedPostsBySchool(schoolId: number) {
    const posts = dummyData.getPostsBySchool(schoolId);
    return posts.filter(p => p.status === 'published');
  }
}

/**
 * DEV Gallery Repository
 */
class DevGalleryRepository implements IGalleryRepository {
  async getGalleryBySchool(schoolId: number) {
    return dummyData.getGalleryBySchool(schoolId);
  }

  async getGalleryById(id: number) {
    const allGallery = dummyData.gallery;
    return allGallery.find(g => g.id === id);
  }

  async getGalleryByCategory(schoolId: number, category: string) {
    const gallery = dummyData.getGalleryBySchool(schoolId);
    return gallery.filter(g => g.category === category);
  }
}

/**
 * DEV Class Repository
 */
class DevClassRepository implements IClassRepository {
  async getDefaultGradeLevels(level) {
    return dummyData.getDefaultGradeLevels(level);
  }

  async getClassesByLevel(level) {
    return dummyData.getClassesByLevel(level);
  }

  async getGradeLevelsByLevel(level) {
    return dummyData.getGradeLevelsByLevel(level);
  }

  async getSubjectsByLevel(level) {
    return dummyData.getSubjectsByLevel(level);
  }
}

/**
 * DEV Registration Repository
 */
class DevRegistrationRepository implements IRegistrationRepository {
  async getRegistrations() {
    return dummyData.getSchoolRegistrations();
  }

  async getPendingRegistrations() {
    return dummyData.getPendingSchoolRegistrations();
  }

  async getRegistrationById(id: number) {
    const allReg = dummyData.getSchoolRegistrations();
    return allReg.find(r => r.id === id);
  }
}

/**
 * DEV Data Service Factory
 */
export class DevDataService implements IDataService {
  school = new DevSchoolRepository();
  staff = new DevStaffRepository();
  student = new DevStudentRepository();
  post = new DevPostRepository();
  gallery = new DevGalleryRepository();
  class = new DevClassRepository();
  registration = new DevRegistrationRepository();
}

export const createDevDataService = (): IDataService => new DevDataService();
