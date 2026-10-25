import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    // The preview page is packed into a single HTML file, so it keeps one
    // JS bundle. The production build splits the style sheet into its own chunk.
    rolldownOptions: mode === 'artifact' ? { output: { inlineDynamicImports: true } } : {},
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
}))
