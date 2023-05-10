import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  // server
})
