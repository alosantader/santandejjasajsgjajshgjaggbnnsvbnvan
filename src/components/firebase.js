import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tqjaalzhbhjlqnxrzqrv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxamFhbHpoYmhqbHFueHJ6cXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjgwMDUsImV4cCI6MjA1NzA0NDAwNX0.kU6Ob163_J1v9k1hwVrjsELxbFx7rXsy4EWhQ-BYiYM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
