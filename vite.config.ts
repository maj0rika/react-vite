import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react',
  //define
  define: {
    //.env file
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
  },
})
