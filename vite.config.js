import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Practica20260912/', // Debe ser exactamente /Practica20260912/ con P mayúscula
})