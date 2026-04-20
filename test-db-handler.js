// Temporary test file to verify database connection
// Run this with: node test-db-handler.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) { console.error('Missing env vars'); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  try {
    console.log('Testing Supabase → menu_items...');
    const { data, error } = await supabase.from('menu_items').select('*').limit(5);
    if (error) { console.error('DB error:', error); process.exit(1); }
    console.log('OK — items:', data?.length || 0);
    if (data?.length) console.table(data);
  } catch (e) { console.error('Failed:', e); process.exit(1); }
})();
