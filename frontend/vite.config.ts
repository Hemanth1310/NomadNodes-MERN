import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
 plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0', // Allow Docker network access
    port: 5173,
    watch: {
      usePolling: true, // Crucial for file changes to be detected in Docker
    },
  },
})
