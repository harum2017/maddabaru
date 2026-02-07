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

/**
 * Helper untuk mendapatkan Supabase credentials
 * Mendukung berbagai nama env variable yang mungkin digunakan oleh Lovable Cloud
 */
export const getSupabaseCredentials = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  // Support both key naming conventions
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY 
           || import.meta.env.VITE_SUPABASE_ANON_KEY;
  return { url, key };
};

/**
 * Check if backend credentials are available
 */
export const hasBackendCredentials = () => {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
};

export const getDataSourceType = (): DataSourceType => {
  // Prioritas 1: Environment variable explicit
  const envSource = import.meta.env.VITE_DATA_SOURCE as DataSourceType;
  if (envSource && ['DEV', 'PROD'].includes(envSource)) {
    return envSource;
  }
  
  // Prioritas 2: Check if Supabase is available
  if (hasBackendCredentials()) {
    return 'PROD';
  }
  
  // Fallback: DEV mode if Supabase not configured
  console.warn('[Config] Supabase credentials not found, falling back to DEV mode');
  return 'DEV';
};

/**
 * Environment Variable Reference:
 * 
 * Development:
 * VITE_DATA_SOURCE=DEV
 * 
 * Production:
 * VITE_DATA_SOURCE=PROD (optional, auto-detected from credentials)
 * VITE_SUPABASE_URL=https://...
 * VITE_SUPABASE_PUBLISHABLE_KEY=... (or VITE_SUPABASE_ANON_KEY)
 */

export const DATA_SOURCE = getDataSourceType();

export const isDevMode = () => DATA_SOURCE === 'DEV';
export const isProdMode = () => DATA_SOURCE === 'PROD';

// Debug log untuk troubleshooting
if (typeof window !== 'undefined') {
  console.log(`[Config] Data Source: ${DATA_SOURCE}, hasCredentials: ${hasBackendCredentials()}`);
}
