/**
 * Rahand Cars — Supabase Client
 *
 * Setup:
 * 1. Copy `.env.example` to `.env.local`
 * 2. Fill in EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
 *    from your Supabase project dashboard → Settings → API
 *
 * Session storage uses expo-secure-store for encrypted token persistence
 * on device (replaces localStorage used in the web version).
 */

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import type { Database } from './supabase.types';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (__DEV__ && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.warn(
    '[Rahand Cars] Supabase credentials not set.\n' +
      'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your environment.',
  );
}

/**
 * SecureStore adapter for Supabase Auth session persistence.
 * Replaces the web version's localStorage.
 * expo-secure-store is polyfilled on web (no Platform check needed).
 */
const ExpoSecureStoreAdapter = {
  getItem: (key: string): Promise<string | null> =>
    SecureStore.getItemAsync(key),
  setItem: (key: string, value: string): Promise<void> =>
    SecureStore.setItemAsync(key, value),
  removeItem: (key: string): Promise<void> =>
    SecureStore.deleteItemAsync(key),
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Re-export common types for convenience
export type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
