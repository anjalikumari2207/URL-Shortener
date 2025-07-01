import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ Clean import paths
    },
  },
  build: {
    outDir: 'dist', // ✅ Output folder for static deployment
  },
  base: '/', // ✅ Important: Keeps React Router routes working on refresh
})
