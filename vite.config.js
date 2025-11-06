import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path für GitHub Pages
  // WICHTIG: Muss dem Repository-Namen entsprechen!
  // Beispiel: Repository "athlethe_game" → base: '/athlethe_game/'
  // Für lokale Entwicklung: base: '/'
  // Für GitHub Pages: base: '/REPOSITORY-NAME/'
  base: process.env.VITE_BASE || '/',
})
