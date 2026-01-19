/**
 * Data Source Configuration
 * 
 * Menentukan source data yang digunakan:
 * - DEV: Menggunakan Dummy Data (hardcoded)
 * - PROD: Menggunakan Real Database (API/Supabase)
 * 
 * Perubahan di satu tempat ini akan affect seluruh aplikasi
 */

export type DataSourceType = 'DEV' | 'PROD';

export const getDataSourceType = (): DataSourceType => {
  // Prioritas 1: Environment variable
  const envSource = import.meta.env.VITE_DATA_SOURCE as DataSourceType;
  if (envSource && ['DEV', 'PROD'].includes(envSource)) {
    return envSource;
  }
  
  // Prioritas 2: Development mode
  if (import.meta.env.DEV) {
    return 'DEV';
  }
  
  // Default: DEV (aman)
  return 'DEV';
};

/**
 * Contoh environment setup di .env:
 * 
 * Development:
 * VITE_DATA_SOURCE=DEV
 * 
 * Production (nanti):
 * VITE_DATA_SOURCE=PROD
 * VITE_SUPABASE_URL=https://...
 * VITE_SUPABASE_KEY=...
 */

export const DATA_SOURCE = getDataSourceType();

export const isDevMode = () => DATA_SOURCE === 'DEV';
export const isProdMode = () => DATA_SOURCE === 'PROD';
