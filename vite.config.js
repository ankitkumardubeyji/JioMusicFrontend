import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  server:{
    proxy:{
      '/api':'http://localhost:5456',
    }
  },
=======
>>>>>>> 6920270f652d1f50a812a9619f81ae5a87c140d5
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
