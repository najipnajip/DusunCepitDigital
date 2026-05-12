import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are not set. Supabase client will not work correctly.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
