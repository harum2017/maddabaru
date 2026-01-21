/**
 * Repository Interface Definitions
 * 
 * Mendefinisikan kontrak (interface) untuk semua repository.
 * Ini memastikan DEV dan PROD implementation punya method signature yang sama.
 */

import {
  School,
  Staff,
  Student,
  Post,
  GalleryItem,
  SchoolRegistration,
  SchoolLevel,
  GradeLevel,
} from '@/data/dummyData';

/**
 * School Repository - untuk semua operasi terkait sekolah
 */
export interface ISchoolRepository {
  // Read operations
  getSchoolById(id: number): Promise<School | undefined>;
  getSchoolByDomain(domain: string): Promise<School | undefined>;
  getAllSchools(): Promise<School[]>;
  getActiveSchools(): Promise<School[]>;
}

/**
 * Staff Repository - untuk semua operasi terkait staff/guru
 */
export interface IStaffRepository {
  // Read operations
  getStaffBySchool(schoolId: number): Promise<Staff[]>;
  getAllStaffBySchool(schoolId: number): Promise<Staff[]>;
  getStaffById(id: number): Promise<Staff | undefined>;
  
  // Future: Create, Update, Delete operations
  // createStaff(data: Omit<Staff, 'id'>): Promise<Staff>;
  // updateStaff(id: number, data: Partial<Staff>): Promise<Staff>;
  // deleteStaff(id: number): Promise<void>;
}

/**
 * Student Repository - untuk semua operasi terkait siswa
 */
export interface IStudentRepository {
  // Read operations
  getStudentsBySchool(schoolId: number): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | undefined>;
  getStudentsByClass(schoolId: number, classId: string): Promise<Student[]>;
  
  // Future: Create, Update, Delete operations
  // createStudent(data: Omit<Student, 'id'>): Promise<Student>;
  // updateStudent(id: number, data: Partial<Student>): Promise<Student>;
  // deleteStudent(id: number): Promise<void>;
}

/**
 * Post/News Repository - untuk berita dan artikel
 */
export interface IPostRepository {
  // Read operations
  getPostsBySchool(schoolId: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPublishedPostsBySchool(schoolId: number): Promise<Post[]>;
  
  // Future: Create, Update, Delete operations
  // createPost(data: Omit<Post, 'id'>): Promise<Post>;
  // updatePost(id: number, data: Partial<Post>): Promise<Post>;
  // publishPost(id: number): Promise<void>;
  // deletePost(id: number): Promise<void>;
}

/**
 * Gallery Repository - untuk galeri/foto
 */
export interface IGalleryRepository {
  // Read operations
  getGalleryBySchool(schoolId: number): Promise<GalleryItem[]>;
  getGalleryById(id: number): Promise<GalleryItem | undefined>;
  getGalleryByCategory(schoolId: number, category: string): Promise<GalleryItem[]>;
  
  // Future: Create, Update, Delete operations
  // createGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem>;
  // deleteGalleryItem(id: number): Promise<void>;
}

/**
 * Class/Curriculum Repository - untuk kelas dan struktur akademik
 */
export interface IClassRepository {
  // Read operations
  getDefaultGradeLevels(level: SchoolLevel): Promise<GradeLevel[]>;
  getClassesByLevel(level: SchoolLevel): Promise<string[]>;
  getGradeLevelsByLevel(level: SchoolLevel): Promise<string[]>;
  getSubjectsByLevel(level: SchoolLevel): Promise<string[]>;
  
  // Future: Create, Update, Delete operations
}

/**
 * Registration Repository - untuk pendaftaran sekolah baru
 */
export interface IRegistrationRepository {
  // Read operations
  getRegistrations(): Promise<SchoolRegistration[]>;
  getPendingRegistrations(): Promise<SchoolRegistration[]>;
  getRegistrationById(id: number): Promise<SchoolRegistration | undefined>;
  
  // Future: Create, Update, Delete operations
  // createRegistration(data: Omit<SchoolRegistration, 'id'>): Promise<SchoolRegistration>;
  // approveRegistration(id: number): Promise<void>;
  // rejectRegistration(id: number): Promise<void>;
}

/**
 * Data Service Factory - menggabungkan semua repositories
 */
export interface IDataService {
  school: ISchoolRepository;
  staff: IStaffRepository;
  student: IStudentRepository;
  post: IPostRepository;
  gallery: IGalleryRepository;
  class: IClassRepository;
  registration: IRegistrationRepository;
}
