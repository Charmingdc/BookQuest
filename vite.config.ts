import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@tp': path.resolve(__dirname, 'src/types'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@fb': path.resolve(__dirname, 'src/firebase')
    }
  }
})