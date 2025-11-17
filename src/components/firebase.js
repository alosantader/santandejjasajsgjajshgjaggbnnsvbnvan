import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sqhtdjsxtwmcyznmjjjv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxaHRkanN4dHdtY3l6bm1qamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MTg1OTcsImV4cCI6MjA1MjQ5NDU5N30.xQ97CFSEcOjNcjZKTM5rxuLLxtptEt8SzgBMmDR3X_0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
