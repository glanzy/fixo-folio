import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://boigkznvkdpoeyqiumkj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvaWdrem52a2Rwb2V5cWl1bWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MTY0MjUsImV4cCI6MjA1MzI5MjQyNX0.qjVX6uZjftNXsrpdUPBvvCMAUM5BG9PJZiSP3WwDXcY';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
