import { createSupabaseClient } from '@shared/db';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * SSR_Website's supabase client is now instantiated using the shared @shared/db factory.
 * This maintains the local Database types while sharing the initialization logic.
 */
export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});