import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdoyibcvlcxmbdwayrcu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb3lpYmN2bGN4bWJkd2F5cmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTUxMDEsImV4cCI6MjA5MTczMTEwMX0.vda8nsoejezo7Ryx606rBXTvQ6JQQZhvPsrF-NQwEC8'

export const supabase = createClient(supabaseUrl, supabaseKey)