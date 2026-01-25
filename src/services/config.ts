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
  
  // Prioritas 2: Check if Supabase is available
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  // If Supabase credentials are available, use PROD
  if (supabaseUrl && supabaseKey) {
    return 'PROD';
  }
  
  // Fallback: DEV mode if Supabase not configured
  console.warn('Supabase credentials not found, falling back to DEV mode');
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
