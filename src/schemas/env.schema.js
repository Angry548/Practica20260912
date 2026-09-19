import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_URL: z.string().url('VITE_API_URL debe ser una URL válida'),

  VITE_AUTH_MODE: z.enum(['localstorage', 'cookie'], {
    errorMap: () => ({
      message: 'VITE_AUTH_MODE debe ser "localstorage" o "cookie"'
    }),
  }).default('localstorage'),
});

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_AUTH_MODE:', import.meta.env.VITE_AUTH_MODE);

export const env = envSchema.parse(import.meta.env);