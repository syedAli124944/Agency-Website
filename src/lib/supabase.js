import { createClient } from '@supabase/supabase-js';

// ── Replace these with your Supabase project credentials ──────────────────────
// Go to: https://supabase.com → your project → Settings → API
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || 'https://your-project.supabase.co';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
