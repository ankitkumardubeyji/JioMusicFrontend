import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:5456',
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://jiomusicbackend.onrender.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
