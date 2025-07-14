import { createClient } from '@supabase/supabase-js';

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are not set!');
    console.log('Please create a .env.local file with your Supabase credentials.');
    console.log('See .env.local.example for reference.');
}

// Use dummy values if not set (for development)
const defaultUrl = supabaseUrl || 'https://your-project.supabase.co';
const defaultKey = supabaseAnonKey || 'your-anon-key';

export const supabase = createClient(defaultUrl, defaultKey);

// Export a flag to check if properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey); 