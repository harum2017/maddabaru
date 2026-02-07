/**
 * Safe Supabase Client Wrapper
 * 
 * This module provides a safe way to access the Supabase client that:
 * 1. Handles missing environment variables gracefully
 * 2. Supports both VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_ANON_KEY
 * 3. Uses lazy loading to prevent initialization crashes
 * 
 * Usage:
 *   const supabase = await getSupabaseClient();
 *   if (!supabase) { handle no-backend case }
 */

import { getSupabaseCredentials, hasBackendCredentials } from '@/services/config';

type SupabaseClient = Awaited<typeof import('@/integrations/supabase/client')>['supabase'];

let clientInstance: SupabaseClient | null = null;
let initPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Get the Supabase client lazily and safely.
 * Returns null if credentials are not available.
 */
export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  // Fast path: already initialized
  if (clientInstance) {
    return clientInstance;
  }

  // Check credentials before attempting to load
  if (!hasBackendCredentials()) {
    console.warn('[Supabase] No backend credentials available');
    return null;
  }

  // Ensure we only initialize once
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        clientInstance = supabase;
        console.log('[Supabase] Client initialized successfully');
        return clientInstance;
      } catch (error) {
        console.error('[Supabase] Failed to initialize client:', error);
        return null;
      }
    })();
  }

  return initPromise;
}

/**
 * Synchronous check if Supabase is available
 */
export function isSupabaseAvailable(): boolean {
  return hasBackendCredentials();
}

/**
 * Get credentials for direct use (e.g., in edge function calls)
 */
export function getCredentials() {
  return getSupabaseCredentials();
}
