import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * Supabase client for server components (Next.js App Router).
 *
 * Typed against the Iriska database schema in lib/supabase/database.types.ts.
 * Re-generate types after schema changes:
 *   supabase gen types typescript --linked > lib/supabase/database.types.ts
 *
 * Use this in:
 *   - Server Components (default for files in app/)
 *   - Server Actions
 *   - Route Handlers (app/api/.../route.ts)
 *
 * Do NOT import this in 'use client' components — it will fail at build.
 * For client-side Supabase, create lib/supabase/client.ts later.
 */
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase env vars. Check .env.local has ' +
      'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  return createClient<Database>(url, anonKey, {
    auth: {
      // Server components don't manage user sessions client-side.
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}