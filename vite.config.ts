import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project sites are served from /<repo>/, the domain root stays the default.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
