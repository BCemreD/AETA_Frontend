import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend domain Railway 
const BACKEND_URL = 'https://aeta-production.up.railway.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // development, localhost
      '/api': {
        target: BACKEND_URL, // HTTPS Railway domain
        changeOrigin: true,
        secure: true, // because HTTPS 
      },
    },
  },
})
