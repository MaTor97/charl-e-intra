import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://intradev.acc-vdc.be',
        changeOrigin: true,
        secure: false, // pour les connexions HTTPS
      },
    },
  },
})
