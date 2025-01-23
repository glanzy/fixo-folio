import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hdwpxkbusvauzltqrwfd.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3B4a2J1c3ZhdXpsdHFyd2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNTg1MzQsImV4cCI6MjA1MjkzNDUzNH0.bRrA3fRjaqj2cIDbeSCsn9sZsu2akDQnipz2tZu9AOcy'; // Replace with your Anon Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
