import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
<<<<<<< HEAD
      '/api':'https://jiomusicbackend.onrender.com',
=======
      '/api':'http://localhost:5456',
>>>>>>> 5b65384121267311c76f7fbc622d5c1db13e9be7
    }
  },
  plugins: [react()],
})
