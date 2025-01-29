import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ofxjlgqwxpflchfdimom.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meGpsZ3F3eHBmbGNoZmRpbW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjk4MjcsImV4cCI6MjA1MzcwNTgyN30.nT_7dBhywGBB1uO5evg3ByuBeIR_0k3EWyl9kocIhIY';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
