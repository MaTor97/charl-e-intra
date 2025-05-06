// Importation des fonctions nécessaires depuis les packages
import { defineConfig } from 'vite' // Permet de définir la configuration de Vite
import react from '@vitejs/plugin-react' // Plugin pour supporter React avec Vite
import { VitePWA } from 'vite-plugin-pwa' // Plugin pour transformer l'app en PWA (Progressive Web App)

// Export de la configuration
export default defineConfig({
  plugins: [
    // Ajoute le support React dans Vite
    react(),

    // Configuration du plugin VitePWA
    VitePWA({
      registerType: 'autoUpdate', // Met à jour automatiquement le service worker à chaque changement
      manifest: {
        // Configuration du manifest.json (utilisé pour l'installation de l'app comme PWA)
        name: 'Charleroi Intranet', // Nom complet de l'application
        short_name: 'Charl-e', // Nom court affiché sous l'icône
        description: 'Application Intranet de la ville de Charleroi.', // Description de l'app
        theme_color: '#ffffff', // Couleur de la barre d'adresse mobile
        background_color: '#ffffff', // Couleur de fond au chargement
        display: 'standalone', // Affichage sans barre de navigation du navigateur (comme une app native)
        icons: [
          // Icônes utilisées pour l'application (ex: écran d'accueil)
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
        screenshots: [
          // Captures d'écran de l'application pour l'affichage sur les stores (ou informations du manifest)
          {
            src: '/screenshots/home.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'wide', // Forme de l'écran (large ou mobile)
            label: 'Accueil de l\'application',
          },
          {
            src: '/screenshots/mobile.png',
            sizes: '390x844',
            type: 'image/png',
            label: 'Vue mobile',
          }
        ]
      },
      includeAssets: ['offline.html'], // Fichier à inclure dans le cache (en cas d'absence de connexion)
      workbox: {
        navigateFallback: '/offline.html', // Fallback si l'utilisateur navigue hors-ligne
        navigateFallbackDenylist: [
          /^\/wp-json\//, // Ne pas intercepter les requêtes API vers WP-JSON
          /\/assets\//,   // Ne pas intercepter les fichiers d'assets (images, JS, CSS, etc.)
        ],
      }
    }),
  ],

  // Configuration du serveur de développement
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://intradev.acc-vdc.be', // Redirige les appels API vers le serveur WordPress distant
        changeOrigin: true, // Modifie l'en-tête `origin` pour correspondre au domaine cible
        secure: false, // Autorise les connexions HTTPS non sécurisées (utile en développement)
      },
    },
  },
})
