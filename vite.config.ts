import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { productsApi } from './vite/productsApi.ts'
import { usersApi } from './vite/usersApi.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), productsApi(), usersApi()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    open: true,
    watch: {
      ignored: ['**/public/database/**'],
    },
  },
})
