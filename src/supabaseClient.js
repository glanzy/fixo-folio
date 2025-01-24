import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ykabyjmtmodmnwuvuxju.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYWJ5am10bW9kbW53dXZ1eGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDczNDUsImV4cCI6MjA1MzMyMzM0NX0.Nl3pDfjnDotoyjdCtIX-rRnzLctCqTIEsCLRx9cphV0';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
