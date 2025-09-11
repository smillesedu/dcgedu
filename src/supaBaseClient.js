import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY



// const supabase = createClient(supabaseUrl, supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,   // 👈 Mantém sessão no localStorage
    autoRefreshToken: true, // 👈 Atualiza o token automaticamente
    detectSessionInUrl: true,
  },
},)

export default supabase
