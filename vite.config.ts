import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
    server: {
    allowedHosts: [
      "unaiding-rapidly-elian.ngrok-free.dev" 
    ],
    host: true,
    port: 5173
  }
})
