import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error('Error fetching gallery:', error);
    return;
  }

  console.log('Gallery data sample:');
  console.log(JSON.stringify(data, null, 2));
}

checkGallery();
