import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions : {
        enabled: true,
      },
      manifest: {
        name: 'Charleroi Intranet',
        short_name: 'Charl-e',
        description: 'Une Progressive Web App créée avec Vite et React.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        "screenshots": [
          {
            "src": "/screenshots/home.png",
            "sizes": "390x844",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Accueil de l'application"
          },
          {
            "src": "/screenshots/mobile.png",
            "sizes": "390x844",
            "type": "image/png",
            "label": "Vue mobile"
          }
        ]
      },
      includeAssets: ['offline.html'],
      workbox: {
        navigateFallback: '/offline.html',
      } 
    }),
  ],
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
