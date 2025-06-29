import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// No need for tailwindcss plugin here if you're using PostCSS
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true, // 👈 Helps only during local dev
  }
})
