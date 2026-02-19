// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://hybqmfuznvncyigegmhp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnFtZnV6bnZuY3lpZ2VnbWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzk1MTcsImV4cCI6MjA4NjkxNTUxN30.lAlg9y8nuPSVwJ0oayK5VTEWZm7sjLP6ecMK09S1_K0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
