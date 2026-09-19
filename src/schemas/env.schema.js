import { z } from 'zod';

export const envSchema = z.object({
  VITE_AUTH_MODE: z.string().default('localstorage'),
  VITE_API_URL: z.string().default('http://localhost:3000/api'),
});

export const env = envSchema.parse(import.meta.env);