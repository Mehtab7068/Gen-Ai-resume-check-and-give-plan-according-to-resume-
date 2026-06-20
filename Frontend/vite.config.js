import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['color-functions'],
        quietDeps: true
      }
    }
  },
  build: {
    outDir: 'public', // Change this from 'dist' or 'build' to 'public'
    emptyOutDir: true
  }
})