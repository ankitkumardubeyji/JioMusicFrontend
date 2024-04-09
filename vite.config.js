import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://jiomusicbackend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => `/api${path}` // Add the '/api' prefix
      }
    }
  },
  plugins: [react()]
});
