/**
 * Data Service Factory
 * 
 * Menggabungkan DEV dan PROD implementations dan memilih berdasarkan config.
 * Ini adalah single point di mana DEV/PROD switch terjadi.
 */

import { IDataService } from './types';
import { createDevDataService } from './dev';
import { DATA_SOURCE, isDevMode, isProdMode, hasBackendCredentials } from '../config';

let dataServiceInstance: IDataService | null = null;

/**
 * Membuat data service sesuai dengan config
 * Uses dynamic import for prod to avoid loading Supabase when not needed
 */
async function createDataServiceAsync(): Promise<IDataService> {
  if (isDevMode()) {
    console.log('[Data Service] Using DEV mode (Dummy Data)');
    return createDevDataService();
  } else if (isProdMode()) {
    if (!hasBackendCredentials()) {
      console.warn('[Data Service] PROD requested but credentials missing; falling back to DEV');
      return createDevDataService();
    }
    console.log('[Data Service] Using PROD mode (Real Database)');
    try {
      const { createProdDataService } = await import('./prod');
      return createProdDataService();
    } catch (error) {
      console.error('[Data Service] Failed to load PROD service, falling back to DEV:', error);
      return createDevDataService();
    }
  } else {
    console.log('[Data Service] Falling back to DEV mode');
    return createDevDataService();
  }
}

/**
 * Membuat data service sync - uses DEV as immediate fallback while PROD loads
 */
function createDataServiceSync(): IDataService {
  if (isDevMode()) {
    console.log('[Data Service] Using DEV mode (Dummy Data)');
    return createDevDataService();
  } else if (isProdMode()) {
    if (!hasBackendCredentials()) {
      console.warn('[Data Service] PROD requested but credentials missing; using DEV');
      return createDevDataService();
    }
    console.log('[Data Service] Using PROD mode - loading...');
    // Return DEV service immediately, then replace with PROD when ready
    const devService = createDevDataService();
    
    // Async load PROD service
    import('./prod').then(({ createProdDataService }) => {
      console.log('[Data Service] PROD service loaded successfully');
      dataServiceInstance = createProdDataService();
    }).catch((error) => {
      console.error('[Data Service] Failed to load PROD service:', error);
    });
    
    return devService;
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
    dataServiceInstance = createDataServiceSync();
  }
  return dataServiceInstance;
}

/**
 * Get data service async - ensures PROD is fully loaded
 */
export async function getDataServiceAsync(): Promise<IDataService> {
  if (!dataServiceInstance || (isProdMode() && dataServiceInstance.constructor.name === 'DevDataService')) {
    dataServiceInstance = await createDataServiceAsync();
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
