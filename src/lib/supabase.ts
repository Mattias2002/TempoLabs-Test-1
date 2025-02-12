import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfdwyaaoukrtfypuobrv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZHd5YWFvdWtydGZ5cHVvYnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMzE0NzIsImV4cCI6MjA1NDgwNzQ3Mn0.BPpQ1Vnzuzc63HZTwmnyWOaw8pw22C6UbzigRYSaS1k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
