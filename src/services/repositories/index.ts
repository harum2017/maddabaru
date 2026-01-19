/**
 * Data Service Factory
 * 
 * Menggabungkan DEV dan PROD implementations dan memilih berdasarkan config.
 * Ini adalah single point di mana DEV/PROD switch terjadi.
 */

import { IDataService } from './types';
import { createDevDataService } from './dev';
import { createProdDataService } from './prod';
import { DATA_SOURCE, isDevMode, isProdMode } from '../config';

let dataServiceInstance: IDataService | null = null;

/**
 * Membuat data service sesuai dengan config
 */
function createDataService(): IDataService {
  if (isDevMode()) {
    console.log('[Data Service] Using DEV mode (Dummy Data)');
    return createDevDataService();
  } else if (isProdMode()) {
    console.log('[Data Service] Using PROD mode (Real Database)');
    return createProdDataService();
  } else {
    console.log('[Data Service] Falling back to DEV mode');
    return createDevDataService();
  }
}

/**
 * Get singleton instance dari data service
 */
export function getDataService(): IDataService {
  if (!dataServiceInstance) {
    dataServiceInstance = createDataService();
  }
  return dataServiceInstance;
}

/**
 * Export types untuk digunakan di komponen
 */
export type { IDataService } from './types';
export type {
  ISchoolRepository,
  IStaffRepository,
  IStudentRepository,
  IPostRepository,
  IGalleryRepository,
  IClassRepository,
  IRegistrationRepository,
} from './types';

/**
 * Export config untuk debugging
 */
export { DATA_SOURCE, isDevMode, isProdMode } from '../config';
