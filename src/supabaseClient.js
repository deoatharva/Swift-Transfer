// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://lrersdaloppcufyxcwlj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZXJzZGFsb3BwY3VmeXhjd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTUxMTUsImV4cCI6MjA4OTU5MTExNX0.vtD1y16tBu60OCok_3jtc-N4YRa5ez2UA-KnDhQn03A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
