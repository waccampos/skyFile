import { z } from 'zod'

const envSchema = z.object({
  VITE_RENDERER_URL_SUPABASE: z.string().url(),
  VITE_RENDERER_KEY_SUPABASE: z.string()
})

export const env = envSchema.parse(import.meta.env)
