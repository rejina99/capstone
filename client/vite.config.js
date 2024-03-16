import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    fs: {
      allow: ['..'],
    },
    historyApiFallback: true, 
  },
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        nested: '/nested/index.html',
      },
    },
  },
})
