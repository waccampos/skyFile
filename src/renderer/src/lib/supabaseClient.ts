import { createClient } from '@supabase/supabase-js'
import { env } from '../env/index'
const url = env.VITE_RENDERER_URL_SUPABASE
const key = env.VITE_RENDERER_KEY_SUPABASE
export const supabaseClient = createClient(url, key)
