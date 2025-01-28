import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rfxabyatlekcmoagehdd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeGFieWF0bGVrY21vYWdlaGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNTI1MDIsImV4cCI6MjA1MzYyODUwMn0.mtyTT_JBSBB2qb3Gswzhr8pMEJi19P77IyZWge1qpC4';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
